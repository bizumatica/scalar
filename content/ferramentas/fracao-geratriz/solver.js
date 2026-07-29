/**
 * Scalar Engine - Conversor Universal de Decimais e Dízimas para Fração Geratriz
 * Suporta: Decimais Finitos (0.75), Dízimas com Reticências (0.333...) e Parênteses (0.1(6))
 * Autor: ⚙️ Engenheiro Dev
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeamento Elementar e Isolamento de Contexto
    const container = document.getElementById('fracao-geratriz-container');
    if (!container) return;

    const inputEl = document.getElementById('input-decimal');
    const btnResolver = document.getElementById('btn-resolver');
    const displayFracao = document.getElementById('fracao-render-container');
    const displayLogica = document.getElementById('logica-detalhe');

    if (!inputEl || !btnResolver || !displayFracao || !displayLogica) return;

    // Obtém o idioma normalizado e a mensagem de erro do container HTML/Hugo
    const lang = container.dataset.lang || 'pt';
    const msgErrorDefault = container.dataset.msgError || 'Número decimal inválido.';

    /**
     * Dicionário Poliglota Interno para Relatório da Lógica Algébrica
     */
    const i18n = {
      pt: {
        error: msgErrorDefault,
        typeExact: 'Decimal Exato (Finito)',
        typeSimple: 'Dízima Periódica Simples',
        typeCompound: 'Dízima Periódica Composta',
        typeInteger: 'Número Inteiro',
        stepType: '1. Classificação:',
        stepBase: '2. Montagem da Fração Geratriz:',
        stepSimplification: '3. Simplificação pelo Algoritmo de Euclides:',
        gcdText: 'Máximo Divisor Comum (MDC):',
        irreducibleText: '4. Fração Irredutível Resultante:'
      },
      en: {
        error: msgErrorDefault,
        typeExact: 'Exact Decimal (Finite)',
        typeSimple: 'Simple Repeating Decimal',
        typeCompound: 'Compound Repeating Decimal',
        typeInteger: 'Integer Number',
        stepType: '1. Classification:',
        stepBase: '2. Generating Fraction Assembly:',
        stepSimplification: '3. Euclidean Algorithm Simplification:',
        gcdText: 'Greatest Common Divisor (GCD):',
        irreducibleText: '4. Final Irreducible Fraction:'
      },
      de: {
        error: msgErrorDefault,
        typeExact: 'Endlicher Dezimalbruch',
        typeSimple: 'Einfacher periodischer Dezimalbruch',
        typeCompound: 'Gemischter periodischer Dezimalbruch',
        typeInteger: 'Ganze Zahl',
        stepType: '1. Klassifizierung:',
        stepBase: '2. Erzeugung des Basisbruchs:',
        stepSimplification: '3. Vereinfachung durch Euklidischen Algorithmus:',
        gcdText: 'Größter gemeinsamer Teiler (ggT):',
        irreducibleText: '4. Endgültiger unkürzbarer Bruch:'
      },
      ja: {
        error: msgErrorDefault,
        typeExact: '有限小数',
        typeSimple: '純循環小数',
        typeCompound: '混循環小数',
        typeInteger: '整数',
        stepType: '1. 小数の分類:',
        stepBase: '2. 生成分数の組み立て:',
        stepSimplification: '3. ユークリッドの互除法による約分:',
        gcdText: '最大公約数 (GCD):',
        irreducibleText: '4. 最終的な既約分数:'
      }
    };

    const dict = i18n[lang.startsWith('pt') ? 'pt' : (i18n[lang] ? lang : 'en')];

    /**
     * Algoritmo de Euclides via BigInt (Prevenção de Estouro em 64-bit)
     * @param {bigint} a 
     * @param {bigint} b 
     * @returns {bigint} MDC de A e B
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
     * Renderizador Visual com Estrutura Nativa Tailwind CSS
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
     * Analisador Sintático de Números Decimais e Dízimas (Parser Determinístico)
     */
    function parseDecimal(inputRaw) {
      let str = inputRaw.trim().replace(',', '.');
      
      let isNegative = false;
      if (str.startsWith('-')) {
        isNegative = true;
        str = str.substring(1);
      }

      // Sintaxe 1: Formato com Parênteses ex: 0.1(6) ou 0.(3) ou 12.34(56)
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
        const cleanStr = str.replace('...', '');
        const parts = cleanStr.split('.');
        if (parts.length === 2) {
          const intPart = parts[0] || '0';
          const dec = parts[1];
          if (dec.length === 0) return null;

          // Algoritmo de identificação da menor sequência periódica repetida
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
          // Caso a repetição seja de 1 dígito constante no final (ex: 0.1666)
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

      // Sintaxe 3: Decimal Exato ou Inteiro Padrão ex: 0.75 ou 12
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

      return null; // Expressão Inválida
    }

    /**
     * Executa a Solução Matemática da Fração Geratriz
     */
    function resolver() {
      const rawVal = inputEl.value;
      const parsed = parseDecimal(rawVal);

      if (!parsed) {
        displayFracao.innerHTML = `<span class="text-slate-600 font-mono text-2xl">—</span>`;
        displayLogica.innerHTML = `<span class="text-rose-400 font-semibold">${dict.error}</span>`;
        return;
      }

      let num = 0n;
      let den = 1n;
      let logSteps = [];
      const signPrefix = parsed.isNegative ? '-' : '';

      if (parsed.type === 'integer') {
        num = BigInt(parsed.intPart);
        den = 1n;
        logSteps.push(`${dict.stepType} ${dict.typeInteger}`);
        logSteps.push(`${dict.stepBase} ${signPrefix}${num.toString()} / 1`);

      } else if (parsed.type === 'exact') {
        const decLen = parsed.nonPeriod.length;
        const fullStr = parsed.intPart + parsed.nonPeriod;
        
        num = BigInt(fullStr);
        den = 10n ** BigInt(decLen);

        logSteps.push(`${dict.stepType} ${dict.typeExact}`);
        logSteps.push(`${dict.stepBase} ${signPrefix}${fullStr} / 10<sup>${decLen}</sup> = ${signPrefix}${num.toString()}/${den.toString()}`);

      } else {
        // Dízima Periódica (Simples ou Composta)
        const countPeriod = parsed.period.length;
        const countNonPeriod = parsed.nonPeriod.length;

        // Regra da Geratriz: Denominador é formado por 9s (período) seguidos de 0s (anti-período)
        const strDen = '9'.repeat(countPeriod) + '0'.repeat(countNonPeriod);
        den = BigInt(strDen);

        // Numerador = (Parte Inteira + AntiPeríodo + Período) - (Parte Inteira + AntiPeríodo)
        const strNumeratorFull = parsed.intPart + parsed.nonPeriod + parsed.period;
        const strNumeratorSub = parsed.intPart + parsed.nonPeriod;

        num = BigInt(strNumeratorFull) - BigInt(strNumeratorSub);

        const typeLabel = parsed.type === 'compound' ? dict.typeCompound : dict.typeSimple;
        logSteps.push(`${dict.stepType} ${typeLabel}`);
        logSteps.push(`   - Período (P): "${parsed.period}" (${countPeriod} dig. → ${'9'.repeat(countPeriod)})`);
        if (parsed.type === 'compound') {
          logSteps.push(`   - Anti-período (A): "${parsed.nonPeriod}" (${countNonPeriod} dig. → ${'0'.repeat(countNonPeriod)})`);
        }
        logSteps.push(`${dict.stepBase} (${strNumeratorFull} - ${strNumeratorSub}) / ${strDen}`);
        logSteps.push(`   = ${signPrefix}${num.toString()} / ${den.toString()}`);
      }

      // Aplicação da Simplificação Algébrica (MDC)
      const commonDivisor = calcularMDC(num, den);
      let finalNum = num / commonDivisor;
      let finalDen = den / commonDivisor;

      if (parsed.isNegative) {
        finalNum = -finalNum;
      }

      logSteps.push(`${dict.stepSimplification}`);
      logSteps.push(`   - ${dict.gcdText} ${commonDivisor.toString()}`);
      logSteps.push(`${dict.irreducibleText} ${finalNum.toString()} / ${finalDen.toString()}`);

      // Atualização Dinâmica da Interface
      displayFracao.innerHTML = renderFracaoHTML(finalNum, finalDen);
      displayLogica.innerHTML = logSteps.map(step => `<p class="m-0 py-0.5">${step}</p>`).join('');
    }

    // Vinculação de Eventos
    btnResolver.addEventListener('click', resolver);
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        resolver();
      }
    });
  });
})();