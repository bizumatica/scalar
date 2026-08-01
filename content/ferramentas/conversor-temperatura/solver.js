/**
 * Scalar Engine - Conversor Termodinâmico Reativo
 * Suporte a Celsius, Fahrenheit, Kelvin, Rankine e Réaumur.
 * Algoritmo de normalização de Ponto Central baseado no Zero Absoluto (Kelvin).
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('temp-converter-container');
    if (!container) return;

    const inputs = Array.from(container.querySelectorAll('input[data-unit]'));
    const btnClear = document.getElementById('temp-btn-clear');

    if (inputs.length === 0) return;

    /**
     * Converte o valor de qualquer unidade de origem para a escala pivô (Kelvin).
     */
    function toKelvin(val, unit) {
      switch (unit) {
        case 'celsius':
          return val + 273.15;
        case 'fahrenheit':
          return (val - 32) * (5 / 9) + 273.15;
        case 'kelvin':
          return val;
        case 'rankine':
          return val * (5 / 9);
        case 'reaumur':
          return val * 1.25 + 273.15;
        default:
          return null;
      }
    }

    /**
     * Converte o valor central em Kelvin para a unidade de destino.
     */
    function fromKelvin(kelvin, targetUnit) {
      switch (targetUnit) {
        case 'celsius':
          return kelvin - 273.15;
        case 'fahrenheit':
          return (kelvin - 273.15) * (9 / 5) + 32;
        case 'kelvin':
          return kelvin;
        case 'rankine':
          return kelvin * 1.8;
        case 'reaumur':
          return (kelvin - 273.15) * 0.8;
        default:
          return null;
      }
    }

    /**
     * Formata o valor numérico eliminando dízimas de ponto flutuante.
     */
    function formatValue(val) {
      if (val === null || isNaN(val)) return '';
      return String(parseFloat(val.toFixed(4)));
    }

    /**
     * Recalcula e sincroniza todas as caixas de texto adjacentes.
     */
    function processConversion(activeInput) {
      const originUnit = activeInput.dataset.unit;
      let rawVal = activeInput.value.trim();

      if (rawVal.includes(',')) {
        rawVal = rawVal.replace(',', '.');
      }

      // Limpa os demais campos se a entrada for vazia ou apenas um sinal
      if (rawVal === '' || rawVal === '-' || rawVal === '.') {
        inputs.forEach(input => {
          if (input !== activeInput) input.value = '';
        });
        return;
      }

      const numValue = parseFloat(rawVal);
      if (isNaN(numValue)) {
        inputs.forEach(input => {
          if (input !== activeInput) input.value = '';
        });
        return;
      }

      const kelvinValue = toKelvin(numValue, originUnit);

      // Limpa os campos se o valor informado estiver abaixo do Zero Absoluto (0 K)
      if (kelvinValue === null || kelvinValue < 0) {
        inputs.forEach(input => {
          if (input !== activeInput) input.value = '';
        });
        return;
      }

      // Sincroniza os demais campos
      inputs.forEach(input => {
        if (input !== activeInput) {
          const targetUnit = input.dataset.unit;
          const converted = fromKelvin(kelvinValue, targetUnit);
          input.value = formatValue(converted);
        }
      });
    }

    function clearAll() {
      inputs.forEach(input => {
        input.value = '';
      });
    }

    // Registra os escutadores reativos nos campos de entrada
    inputs.forEach(input => {
      input.addEventListener('input', () => processConversion(input));
    });

    if (btnClear) {
      btnClear.addEventListener('click', clearAll);
    }
  });
})();