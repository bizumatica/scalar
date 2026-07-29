/**
 * Scalar Engine - Solver de MDC & MMC com BigInt e Prevenção de Overflow
 * Autor: Julio Prata
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Isolamento de Contexto e Mapeamento do DOM
    const container = document.getElementById('mdc-mmc-container');
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const displayMDC = document.getElementById('resultMDC');
    const displayMMC = document.getElementById('resultMMC');

    if (!inputA || !inputB || !displayMDC || !displayMMC) return;

    // 2. Resolução Robusta de Idioma (Prioriza data-lang do container, depois html lang)
    const rawLang = (container && container.dataset.lang) || document.documentElement.lang || 'pt';
    const langNormalized = rawLang.toLowerCase();

    const localeMap = {
      'pt': 'pt-BR',
      'pt-br': 'pt-BR',
      'en': 'en-US',
      'en-us': 'en-US',
      'de': 'de-DE',
      'ja': 'ja-JP'
    };
    const currentLocale = localeMap[langNormalized] || 'pt-BR';

    // Formatador de alta performance para exibição de BigInt com pontuação de milhar
    const formatter = new Intl.NumberFormat(currentLocale);

    /**
     * Algoritmo de Euclides via BigInt
     * @param {bigint} a 
     * @param {bigint} b 
     * @returns {bigint} MDC de A e B (Sempre Positivo)
     */
    function calcularMDC(a, b) {
      let x = a < 0n ? -a : a;
      let y = b < 0n ? -b : b;
      while (y !== 0n) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    }

    /**
     * Executa o cálculo e atualiza os displays no DOM
     */
    function calcular() {
      // Extração e sanitização limpa sem destruir o estado do cursor do input
      const rawA = inputA.value.trim().replace(/[^0-9]/g, '');
      const rawB = inputB.value.trim().replace(/[^0-9]/g, '');

      // Se qualquer campo estiver vazio, reseta os displays para o estado neutro
      if (!rawA || !rawB) {
        displayMDC.textContent = '--';
        displayMMC.textContent = '--';
        return;
      }

      try {
        const a = BigInt(rawA);
        const b = BigInt(rawB);

        // Regra de Borda: MDC e MMC exigem números inteiros positivos (maiores que zero)
        if (a === 0n || b === 0n) {
          displayMDC.textContent = '0';
          displayMMC.textContent = '0';
          return;
        }

        // 1. Cálculo do MDC
        const mdc = calcularMDC(a, b);

        // 2. Cálculo Otimizado do MMC: Divide primeiro pelo MDC para evitar estouro numérico
        // Formula Segura: MMC = (a / MDC) * b
        const mmc = (a / mdc) * b;

        // Renderização formatada
        displayMDC.textContent = formatter.format(mdc);
        displayMMC.textContent = formatter.format(mmc);

      } catch (e) {
        // Fallback gracioso em caso de entrada excepcionalmente grande ou corrompida
        displayMDC.textContent = '??';
        displayMMC.textContent = '??';
      }
    }

    // 3. Event Listeners Reativos (Invocação síncrona sem travar a main thread)
    [inputA, inputB].forEach((el) => {
      el.addEventListener('input', calcular);
      el.addEventListener('paste', () => setTimeout(calcular, 10));
    });
  });
})();