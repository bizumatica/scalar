/**
 * Scalar Engine - Conversor Universal de Decimais e Dízimas para Fração Geratriz
 * Suporta: Decimais Finitos (0.75), Dízimas com Reticências (0.333...) e Parênteses (0.1(6))
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('fracao-geratriz-container');
    if (!container) return;

    const inputEl = document.getElementById('input-decimal');
    const btnResolver = document.getElementById('btn-resolver');
    const btnLimpar = document.getElementById('btn-limpar');
    const displayFracao = document.getElementById('fracao-render-container');
    const displayLogica = document.getElementById('logica-detalhe');

    if (!inputEl || !btnResolver || !displayFracao || !displayLogica) return;

    const labels = {
      error: container.dataset.msgError || 'Formato decimal inválido.',
      typeExact: container.dataset.txtExact || 'Decimal Exato (Finito)',
      typeSimple: container.dataset.txtSimple || 'Dízima Periódica Simples',
      typeCompound: container.dataset.txtCompound || 'Dízima Periódica Composta',
      typeInteger: container.dataset.txtInteger || 'Número Inteiro',
      stepClass: container.dataset.txtStepClass || '1. Classificação:',
      stepBase: container.dataset.txtStepBase || '2. Montagem da Fração Geratriz:',
      stepSimp: container.dataset.txtStepSimp || '3. Simplificação pelo Algoritmo de Euclides:',
      gcd: container.dataset.txtGcd || 'Máximo Divisor Comum (MDC):',
      stepFinal: container.dataset.txtStepFinal || '4. Fração Irredutível Resultante:'
    };

    /**
     * Algoritmo de Euclides via BigInt
     */
    function calcularMDC(a, b) {
      let x = a < 0n ? -a : a;
      let y = b < 0n ? -b : b;
      while (y !== 0n) {
        let temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    }

    /**
     * Renderiza o HTML da fração em formato de fração matemática
     */
    function renderFracaoHTML(num, den) {
      if (den === 1n) {
        return `<span class="text-4xl font-extrabold font-mono text-white tracking-tight">${num.toString()}</span>`;
      }
      return `
        <div class="inline-flex flex-col items-center justify-center font-mono font-extrabold text-white text-3xl select-none">
          <span class="px-3 pb-1 border-b-2 border-indigo-500">${num.toString()}</span>
          <span class="px-3 pt-1">${den.toString()}</span>
        </div>
      `;
    }

    /**
     * Parseia strings numéricas
     */
    function parseDecimal(inputRaw) {
      let str = inputRaw.trim().replace(',', '.');
      
      let isNegative = false;
      if (str.startsWith('-')) {
        isNegative = true;
        str = str.substring(1);
      }

      // Sintaxe 1: Formato com Parênteses ex: 0.1(6)
      const matchParen = str.match(/^(\d+)?(?:\.(\d*)?\((.+)\))$/);
      if (matchParen) {
        return {
          isNegative,
          intPart: matchParen[1] || '0',
          nonPeriod: matchParen[2] || '',
          period: matchParen[3],
          type: matchParen[2] ? 'compound' : 'simple'
        };
      }

      // Sintaxe 2: Formato com Reticências ex: 0.333... ou 0.1666...
      if (str.includes('...')) {
        const cleanStr = str.replace(/\.\.\./g, '');
        const parts = cleanStr.split('.');
        if (parts.length === 2) {
          const intPart = parts[0] || '0';
          const dec = parts[1];
          if (dec.length === 0) return null;

          for (let len = 1; len <= Math.floor(dec.length / 2); len++) {
            const pattern = dec.slice(-len);
            const prev = dec.slice(-len * 2, -len);
            if (pattern === prev && pattern.length > 0) {
              const nonPeriod = dec.slice(0, dec.length - len * 2);
              return {
                isNegative,
                intPart,
                nonPeriod,
                period: pattern,
                type: nonPeriod.length > 0 ? 'compound' : 'simple'
              };
            }
          }

          const period = dec.slice(-1);
          const nonPeriod = dec.slice(0, -1);
          return {
            isNegative,
            intPart,
            nonPeriod,
            period,
            type: nonPeriod.length > 0 ? 'compound' : 'simple'
          };
        }
      }

      // Sintaxe 3: Decimal Exato ou Inteiro Padrão
      const matchExact = str.match(/^(\d+)(?:\.(\d+))?$/);
      if (matchExact) {
        return {
          isNegative,
          intPart: matchExact[1],
          nonPeriod: matchExact[2] || '',
          period: '',
          type: matchExact[2] ? 'exact' : 'integer'
        };
      }

      return null;
    }

    function resolver() {
      const rawVal = inputEl.value;
      const parsed = parseDecimal(rawVal);

      if (!parsed) {
        displayFracao.innerHTML = `<span class="text-slate-600 font-mono text-2xl">—</span>`;
        displayLogica.innerHTML = `<span class="text-rose-400 font-semibold">${labels.error}</span>`;
        return;
      }

      let num = 0n;
      let den = 1n;
      let logSteps = [];
      const signPrefix = parsed.isNegative ? '-' : '';

      if (parsed.type === 'integer') {
        num = BigInt(parsed.intPart);
        den = 1n;
        logSteps.push(`${labels.stepClass} ${labels.typeInteger}`);
        logSteps.push(`${labels.stepBase} ${signPrefix}${num.toString()} / 1`);

      } else if (parsed.type === 'exact') {
        const decLen = parsed.nonPeriod.length;
        const fullStr = parsed.intPart + parsed.nonPeriod;
        
        num = BigInt(fullStr);
        den = 10n ** BigInt(decLen);

        logSteps.push(`${labels.stepClass} ${labels.typeExact}`);
        logSteps.push(`${labels.stepBase} ${signPrefix}${fullStr} / 10^${decLen} = ${signPrefix}${num.toString()}/${den.toString()}`);

      } else {
        const countPeriod = parsed.period.length;
        const countNonPeriod = parsed.nonPeriod.length;

        const strDen = '9'.repeat(countPeriod) + '0'.repeat(countNonPeriod);
        den = BigInt(strDen);

        const strNumeratorFull = parsed.intPart + parsed.nonPeriod + parsed.period;
        const strNumeratorSub = parsed.intPart + parsed.nonPeriod;

        num = BigInt(strNumeratorFull) - BigInt(strNumeratorSub);

        const typeLabel = parsed.type === 'compound' ? labels.typeCompound : labels.typeSimple;
        logSteps.push(`${labels.stepClass} ${typeLabel}`);
        logSteps.push(`   - Período (P): "${parsed.period}" (${countPeriod} dig. → ${'9'.repeat(countPeriod)})`);
        if (parsed.type === 'compound') {
          logSteps.push(`   - Anti-período (A): "${parsed.nonPeriod}" (${countNonPeriod} dig. → ${'0'.repeat(countNonPeriod)})`);
        }
        logSteps.push(`${labels.stepBase} (${strNumeratorFull} - ${strNumeratorSub}) / ${strDen}`);
        logSteps.push(`   = ${signPrefix}${num.toString()} / ${den.toString()}`);
      }

      const commonDivisor = calcularMDC(num, den);
      let finalNum = num / commonDivisor;
      let finalDen = den / commonDivisor;

      if (parsed.isNegative) {
        finalNum = -finalNum;
      }

      logSteps.push(`${labels.stepSimp}`);
      logSteps.push(`   - ${labels.gcd} ${commonDivisor.toString()}`);
      logSteps.push(`${labels.stepFinal} ${finalNum.toString()} / ${finalDen.toString()}`);

      displayFracao.innerHTML = renderFracaoHTML(finalNum, finalDen);
      displayLogica.innerHTML = logSteps.map(step => `<p class="m-0 py-0.5">${step}</p>`).join('');
    }

    function limpar() {
      inputEl.value = '';
      displayFracao.innerHTML = `<span class="text-slate-600 font-mono text-2xl">—</span>`;
      displayLogica.innerHTML = `<span class="text-slate-400 font-mono text-sm">${container.querySelector('#logica-detalhe').dataset.defaultMsg || ''}</span>`;
    }

    btnResolver.addEventListener('click', resolver);
    if (btnLimpar) {
      btnLimpar.addEventListener('click', limpar);
    }

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        resolver();
      }
    });
  });
})();