/**
 * Scalar Engine - Solver de MDC & MMC com BigInt, Prevenção de Overflow e Passos
 * Autor: Julio Prata & Scalar Team
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Isolamento de Contexto e Mapeamento do DOM
    const container = document.getElementById('mdc-mmc-container');
    if (!container) return;

    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const btnCalcular = document.getElementById('btn-calcular-mdc-mmc');
    const btnLimpar = document.getElementById('btn-limpar');
    const displayMDC = document.getElementById('resultMDC');
    const displayMMC = document.getElementById('resultMMC');
    const displayPassos = document.getElementById('passos-detalhe');

    if (!inputA || !inputB || !displayMDC || !displayMMC || !displayPassos) return;

    // 2. Resolução Robusta de Idioma
    const rawLang = container.dataset.lang || document.documentElement.lang || 'pt';
    const langNormalized = rawLang.toLowerCase();

    const localeMap = {
      'pt': 'pt-BR',
      'pt-br': 'pt-BR',
      'en': 'en-US',
      'en-us': 'en-US',
      'de': 'de-DE',
      'ja': 'ja-JP',
      'es': 'es-ES',
      'fr': 'fr-FR'
    };
    const currentLocale = localeMap[langNormalized] || 'pt-BR';
    const formatter = new Intl.NumberFormat(currentLocale);

    const msgError = container.dataset.msgError || 'Erro: Digite apenas números inteiros maiores que zero (> 0).';

    /**
     * Algoritmo de Euclides via BigInt gravando passos explicativos
     */
    function calcularMDCComPassos(a, b) {
      let x = a < 0n ? -a : a;
      let y = b < 0n ? -b : b;
      let passos = [];

      passos.push(`• Algoritmo de Euclides (Divisões Sucessivas):`);

      while (y !== 0n) {
        const quociente = x / y;
        const resto = x % y;
        passos.push(`  ${formatter.format(x)} = ${formatter.format(y)} × ${formatter.format(quociente)} + ${formatter.format(resto)}`);
        x = y;
        y = resto;
      }

      return { mdc: x, passos };
    }

    /**
     * Executa o cálculo e atualiza a interface
     */
    function calcular() {
      const rawA = inputA.value.trim().replace(/[^0-9]/g, '');
      const rawB = inputB.value.trim().replace(/[^0-9]/g, '');

      if (!rawA || !rawB) {
        displayMDC.textContent = '--';
        displayMMC.textContent = '--';
        displayPassos.innerHTML = `<span class="text-slate-400">${container.querySelector('#passos-detalhe').dataset.defaultMsg || ''}</span>`;
        return;
      }

      try {
        const a = BigInt(rawA);
        const b = BigInt(rawB);

        // MDC e MMC exigem estritamente inteiros positivos > 0
        if (a <= 0n || b <= 0n) {
          displayMDC.textContent = '—';
          displayMMC.textContent = '—';
          displayPassos.innerHTML = `<span class="text-rose-400 font-semibold">${msgError}</span>`;
          return;
        }

        // 1. Cálculo do MDC e rastreamento
        const resEuclides = calcularMDCComPassos(a, b);
        const mdc = resEuclides.mdc;

        // 2. Cálculo do MMC sem risco de estouro
        // Fórmula Segura: MMC = (A / MDC) * B
        const mmc = (a / mdc) * b;

        // 3. Montagem da explicação
        let logLines = [...resEuclides.passos];
        logLines.push(`\n• MDC (${formatter.format(a)}, ${formatter.format(b)}) = ${formatter.format(mdc)}`);
        logLines.push(`• Relação MMC: (${formatter.format(a)} / ${formatter.format(mdc)}) × ${formatter.format(b)}`);
        logLines.push(`• MMC (${formatter.format(a)}, ${formatter.format(b)}) = ${formatter.format(mmc)}`);

        // Renderização
        displayMDC.textContent = formatter.format(mdc);
        displayMMC.textContent = formatter.format(mmc);
        displayPassos.innerHTML = logLines.map(line => `<p class="m-0 py-0.5">${line}</p>`).join('');

      } catch (e) {
        displayMDC.textContent = '??';
        displayMMC.textContent = '??';
        displayPassos.innerHTML = `<span class="text-rose-400">${msgError}</span>`;
      }
    }

    function limpar() {
      inputA.value = '';
      inputB.value = '';
      displayMDC.textContent = '--';
      displayMMC.textContent = '--';
      displayPassos.innerHTML = `<span class="text-slate-500">—</span>`;
      inputA.focus();
    }

    // 3. Event Listeners Reativos
    [inputA, inputB].forEach((el) => {
      el.addEventListener('input', calcular);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          calcular();
        }
      });
    });

    if (btnCalcular) btnCalcular.addEventListener('click', calcular);
    if (btnLimpar) btnLimpar.addEventListener('click', limpar);
  });
})();