(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const displayMDC = document.getElementById('resultMDC');
    const displayMMC = document.getElementById('resultMMC');

    // Aborta silenciosamente caso os elementos não estejam renderizados na página atual do Hugo
    if (!inputA || !inputB || !displayMDC || !displayMMC) return;

    // 🌍 Captura dinâmica do idioma e mapeamento de localizações regionais
    const currentLang = document.documentElement.lang || 'pt';
    const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    // Formatador robusto compatível com BigInt via Intl API
    const formatter = new Intl.NumberFormat(currentLocale);

    /**
     * Algoritmo de Euclides Iterativo (Seguro contra estouros de pilha)
     */
    function calcularMDC(a, b) {
      a = a < 0n ? -a : a;
      b = b < 0n ? -b : b;
      while (b > 0n) {
        a %= b;
        [a, b] = [b, a];
      }
      return a;
    }

    function calcular() {
      // Limpeza de caracteres não numéricos antes de processar no BigInt
      // Remove qualquer tentativa de digitação de pontos, vírgulas ou letras
      let valA = inputA.value.replace(/[^0-9-]/g, '').trim();
      let valB = inputB.value.replace(/[^0-9-]/g, '').trim();

      // Sincroniza o valor higienizado de volta para a caixa de input visual do usuário
      inputA.value = valA;
      inputB.value = valB;

      // Se algum campo estiver vazio, retorna os placeholders originais de espera
      if (!valA || !valB || valA === "-" || valB === "-") {
        displayMDC.textContent = "--";
        displayMMC.textContent = "--";
        return;
      }

      try {
        const a = BigInt(valA);
        const b = BigInt(valB);

        if (a === 0n && b === 0n) {
          displayMDC.textContent = "0";
          displayMMC.textContent = "0";
          return;
        }

        const mdc = calcularMDC(a, b);
        
        // Operação puramente baseada em BigInt
        // MMC = (|a * b|) / MDC
        const mmc = (a * b) / mdc;
        const mmcAbs = mmc < 0n ? -mmc : mmc;

        // Renderização com formatação de milhar regionalizada
        displayMDC.textContent = formatter.format(mdc);
        displayMMC.textContent = formatter.format(mmcAbs);

      } catch (e) {
        // Fallback resiliente para strings inválidas de colagem ou estouros
        displayMDC.textContent = "??";
        displayMMC.textContent = "??";
      }
    }

    // Configura listeners de tempo real em ambos os campos numéricos
    [inputA, inputB].forEach(el => {
      el.addEventListener('input', calcular);
    });
  });
})();