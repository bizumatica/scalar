/**
 * Scalar - Engine Reativa do Conversor de Comprimento
 * Padrão: Multi-Input Grid Propagation (Strict Scope & High Precision)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputs = Array.from(document.querySelectorAll('input[id^="len-"]'));
    const btnClear = document.getElementById('length-btn-clear');

    if (inputs.length === 0) return;

    const FACTORS_IN_METERS = {
      'pm': 1e-12,     // Picômetro
      'nm': 1e-9,      // Nanômetro
      'um': 1e-6,      // Micrômetro
      'mm': 0.001,     // Milímetro
      'cm': 0.01,      // Centímetro
      'm': 1,          // Metro (Unidade Pivô)
      'km': 1000,      // Quilômetro
      'in': 0.0254,    // Polegada
      'ft': 0.3048,    // Pé
      'yd': 0.9144,    // Jarda
      'mi': 1609.344,  // Milha Terrestre
      'nmi': 1852      // Milha Náutica
    };

    let isCalculating = false;

    function formatOutput(num) {
      if (num === 0) return '0';

      if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e12) {
        return num.toExponential(4);
      }

      return String(parseFloat(num.toFixed(8)));
    }

    function propagateConversion(sourceInput) {
      if (isCalculating) return;
      isCalculating = true;

      const originUnit = (sourceInput.getAttribute('data-unit') || sourceInput.id.replace('len-', '')).toLowerCase();
      let rawVal = sourceInput.value.trim();

      if (rawVal.includes(',')) {
        rawVal = rawVal.replace(',', '.');
      }

      if (rawVal === '') {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const parsedValue = parseFloat(rawVal);

      if (isNaN(parsedValue)) {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const sourceFactor = FACTORS_IN_METERS[originUnit] || 1;
      const meters = parsedValue * sourceFactor;

      inputs.forEach(targetInput => {
        if (targetInput === sourceInput) return;

        const targetUnit = (targetInput.getAttribute('data-unit') || targetInput.id.replace('len-', '')).toLowerCase();
        const targetFactor = FACTORS_IN_METERS[targetUnit] || 1;

        const targetResult = meters / targetFactor;
        targetInput.value = formatOutput(targetResult);
      });

      isCalculating = false;
    }

    function clearAllInputs() {
      inputs.forEach(input => {
        input.value = '';
      });
    }

    inputs.forEach(input => {
      input.addEventListener('input', () => propagateConversion(input));
    });

    if (btnClear) {
      btnClear.addEventListener('click', clearAllInputs);
    }
  });
})();