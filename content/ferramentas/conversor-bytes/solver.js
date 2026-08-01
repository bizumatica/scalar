/**
 * Scalar - Engine Reativa do Conversor de Bytes / Memória
 * Padrão: Multi-Input Grid Propagation
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const UNITS = {
      'bit': 0.125,
      'b': 1,
      // SI (Base 10)
      'kb': 1e3,
      'mb': 1e6,
      'gb': 1e9,
      'tb': 1e12,
      'pb': 1e15,
      // IEC (Base 2)
      'kib': 1024,
      'mib': 1024 ** 2,
      'gib': 1024 ** 3,
      'tib': 1024 ** 4,
      'pib': 1024 ** 5
    };

    const inputs = Array.from(document.querySelectorAll('input[id^="byte-"]'));
    const btnClear = document.getElementById('byte-btn-clear');

    if (inputs.length === 0) return;

    let isCalculating = false;

    function formatValue(num) {
      if (num === 0) return '0';
      
      if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e15) {
        return num.toExponential(4);
      }

      // Trunca para até 8 casas decimais mantendo a precisão limpa sem formatadores locais
      return String(parseFloat(num.toFixed(8)));
    }

    function processConversion(sourceInput) {
      if (isCalculating) return;
      isCalculating = true;

      const unitId = sourceInput.getAttribute('data-unit') || sourceInput.id.replace('byte-', '');
      const rawValue = sourceInput.value.replace(',', '.').trim();

      if (rawValue === '') {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const numericValue = parseFloat(rawValue);

      if (isNaN(numericValue)) {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const sourceFactor = UNITS[unitId.toLowerCase()] || 1;
      const baseBytes = numericValue * sourceFactor;

      inputs.forEach(targetInput => {
        if (targetInput === sourceInput) return;

        const targetUnitId = (targetInput.getAttribute('data-unit') || targetInput.id.replace('byte-', '')).toLowerCase();
        const targetFactor = UNITS[targetUnitId] || 1;

        const convertedValue = baseBytes / targetFactor;
        targetInput.value = formatValue(convertedValue);
      });

      isCalculating = false;
    }

    function clearAllInputs() {
      inputs.forEach(input => {
        input.value = '';
      });
    }

    inputs.forEach(input => {
      input.addEventListener('input', () => processConversion(input));
    });

    if (btnClear) {
      btnClear.addEventListener('click', clearAllInputs);
    }
  });
})();