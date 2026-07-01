(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('mem-input-value');
    const fromUnit = document.getElementById('mem-from-unit');
    const toUnit = document.getElementById('mem-to-unit');
    const resultDisplay = document.getElementById('mem-result');
    const resultFullDisplay = document.getElementById('mem-result-full');

    // Abortar silenciosamente se a ferramenta não pertencer à página atual do Hugo
    if (!inputValue || !fromUnit || !toUnit || !resultDisplay || !resultFullDisplay) return;

    // 🌍 Captura de Idioma Dinâmica
    const currentLang = document.documentElement.lang || 'pt-BR';
    const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    // Rótulo internacionalizado para a unidade fundamental de referência
    const unitLabelMap = {
      'en-US': 'Bytes',
      'de-DE': 'Bytes',
      'ja-JP': 'バイト (Bytes)',
      'pt-BR': 'Bytes'
    };
    const bytesLabel = unitLabelMap[currentLocale] || 'Bytes';

    // Definição precisa dos multiplicadores (Normalizado para Bytes)
    const Units = {
      'bit': 0.125, // 1 bit = 1/8 byte
      'B': 1,
      // SI (Base 10)
      'KB': 1000,
      'MB': 1000 ** 2,
      'GB': 1000 ** 3,
      'TB': 1000 ** 4,
      // IEC (Base 2)
      'KiB': 1024,
      'MiB': 1024 ** 2,
      'GiB': 1024 ** 3,
      'TiB': 1024 ** 4
    };

    function formatNumber(num) {
      if (num === 0) return '0';
      
      // Se for um valor decimal extremamente pequeno ou massivo, usa notação científica
      if (num < 0.001 || num > 1e15) {
        return num.toExponential(4);
      }

      // Evita problemas de arredondamento flutuante do JS limitando a 6 casas
      return parseFloat(num.toFixed(6)).toLocaleString(currentLocale, {
        maximumFractionDigits: 6
      });
    }

    function calculate() {
      const value = parseFloat(inputValue.value);
      
      if (isNaN(value) || value === 0) {
        resultDisplay.textContent = '0';
        resultFullDisplay.textContent = '';
        return;
      }

      const fromMultiplier = Units[fromUnit.value];
      const toMultiplier = Units[toUnit.value];

      // 1. Normaliza para a unidade fundamental (Bytes)
      const bytes = value * fromMultiplier;

      // 2. Converte para a unidade de destino
      const result = bytes / toMultiplier;

      // 3. Exibe o resultado principal formatado localmente
      resultDisplay.textContent = formatNumber(result);
      
      // 4. Exibe a linha de referência secundária respeitando o Locale e o sufixo traduzido
      resultFullDisplay.textContent = `= ${bytes.toLocaleString(currentLocale, { maximumFractionDigits: 4 })} ${bytesLabel}`;
    }

    // Registro unificado de Listeners nos nós de entrada
    [inputValue, fromUnit, toUnit].forEach(el => {
      el.addEventListener('input', calculate);
      // Suporte complementar para navegadores que escutam 'change' em tags <select>
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', calculate);
      }
    });
  });
})();