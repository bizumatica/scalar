(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-resolver');
    const inputEl = document.getElementById('input-decimal');
    const displayFracao = document.getElementById('fracao-final');
    const displayLogica = document.getElementById('logica-detalhe');
    const i18nLabel = document.getElementById('i18n-labels');

    if (!btn || !inputEl || !displayFracao || !displayLogica || !i18nLabel) return;

    const dataset = i18nLabel.dataset;
    const currentLang = document.documentElement.lang || 'pt';

    // Algoritmo de Euclides (MDC)
    const mdc = (a, b) => b === 0 ? a : mdc(b, a % b);

    // Dicionário Poliglota estruturado para as etapas da explicação técnica
    const i18nSteps = {
      pt: {
        error: dataset.errorPt || "Número inválido.",
        repeating: "Dízima periódica identificada.",
        exact: "Decimal exato identificado.",
        integer: "Número inteiro.",
        base: "Fração inicial gerada: ",
        gcd: "Máximo Divisor Comum (MDC): "
      },
      en: {
        error: dataset.errorEn || "Invalid number.",
        repeating: "Repeating decimal identified.",
        exact: "Exact decimal identified.",
        integer: "Integer number.",
        base: "Initial fraction generated: ",
        gcd: "Greatest Common Divisor (GCD): "
      },
      de: {
        error: dataset.errorDe || "Ungültige Nummer.",
        repeating: "Periodischer Dezimalbruch erkannt.",
        exact: "Endlicher Dezimalbruch erkannt.",
        integer: "Ganze Zahl.",
        base: "Erzeugter Basisbruch: ",
        gcd: "Größter gemeinsamer Teiler (ggT): "
      },
      ja: {
        error: dataset.errorJa || "無効な数値です。",
        repeating: "循環小数を検出しました。",
        exact: "有限小数を検出しました。",
        integer: "整数です。",
        base: "生成された初期の分数: ",
        gcd: "最大公約数 (GCD): "
      }
    };

    const text = i18nSteps[currentLang] || i18nSteps['en'];

    function resolver() {
      // Normaliza vírgulas internacionais e remove reticências textuais para o parse matemático
      let rawInput = inputEl.value.replace(',', '.').trim();
      const isRepeating = rawInput.includes('...');
      let cleanInput = rawInput.replace('...', '');

      let num = parseFloat(cleanInput);

      if (!rawInput || isNaN(num)) {
        displayLogica.innerHTML = `<span style="color: #ef4444;">${text.error}</span>`;
        displayFracao.innerHTML = "";
        return;
      }

      let numerador, denominador, etapa1 = "";

      // Caso A: O usuário inseriu ou o sistema detectou uma Dízima Periódica (...)
      if (isRepeating) {
        const partes = cleanInput.split('.');
        if (partes.length === 2) {
          const parteInteira = parseInt(partes[0]) || 0;
          const parteDecimal = partes[1];
          // Assume o último dígito repetido como a dízima ativa
          const periodo = parteDecimal.slice(-1);
          const antiPeriodo = parteDecimal.slice(0, -1);

          const d1 = Math.pow(10, antiPeriodo.length + 1);
          const d2 = Math.pow(10, antiPeriodo.length);
          denominador = d1 - d2;
          numerador = Math.round(num * d1) - Math.round(num * d2);
          
          etapa1 = `<p>1. <strong>${text.repeating}</strong></p>
                    <p>2. ${text.base} <strong>${numerador}/${denominador}</strong></p>`;
        } else {
          numerador = num;
          denominador = 1;
        }
      } else {
        // Caso B: Decimal Exato ou Inteiro
        const partes = cleanInput.split('.');
        if (partes.length === 1) {
          numerador = parseInt(partes[0]);
          denominador = 1;
          etapa1 = `<p>1. <strong>${text.integer}</strong></p>`;
        } else {
          const casas = partes[1].length;
          denominador = Math.pow(10, casas);
          numerador = Math.round(num * denominador);
          etapa1 = `<p>1. <strong>${text.exact}</strong></p>
                    <p>2. ${text.base} <strong>${numerador}/${denominador}</strong></p>`;
        }
      }

      // Simplificação pelo Algoritmo de Euclides (MDC / GCD / ggT)
      const comum = mdc(Math.abs(numerador), denominador);
      const numFinal = numerador / comum;
      const denFinal = denominador / comum;

      // Renderização do HTML com CSS Inline Cross-Browser
      displayFracao.innerHTML = `
        <div style="display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.1; font-family: monospace;">
          <span style="padding: 0 10px; font-size: 1.5rem; font-weight: bold; color: #fff;">${numFinal}</span>
          <div style="width: 100%; height: 2px; background: #3b82f6; margin: 4px 0;"></div>
          <span style="padding: 0 10px; font-size: 1.5rem; font-weight: bold; color: #fff;">${denFinal}</span>
        </div>
      `;

      displayLogica.innerHTML = etapa1 + `<p>3. ${text.gcd} <strong>${comum}</strong></p>`;
    }

    btn.addEventListener('click', resolver);
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') resolver();
    });
  });
})();