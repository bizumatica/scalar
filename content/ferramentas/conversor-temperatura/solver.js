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
     * Normaliza uma string de entrada numérica permitindo sinal negativo no início e um único ponto decimal.
     */
    function sanitizeInput(val) {
      if (!val) return '';
      
      // Substitui vírgula por ponto para suportar teclados pt-BR / de-DE
      let clean = val.replace(',', '.').replace(/[^0-9.-]/g, '');

      // Trata múltiplos sinais negativos
      const isNegative = clean.startsWith('-');
      clean = clean.replace(/-/g, '');
      if (isNegative) clean = '-' + clean;

      // Mantém apenas o primeiro ponto decimal
      const parts = clean.split('.');
      if (parts.length > 2) {
        clean = parts[0] + '.' + parts.slice(1).join('');
      }

      return clean;
    }

    /**
     * Converte o valor de qualquer unidade de origem para a escala pivot (Kelvin).
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
     * Formata o valor numérico eliminando dízimas de ponto flutuante sem corromper a digitação.
     */
    function formatValue(val) {
      if (val === null || isNaN(val)) return '';
      // Arredonda para no máximo 4 casas decimais e remove zeros desnecessários
      return parseFloat(val.toFixed(4)).toString();
    }

    /**
     * Recalcula e sincroniza todas as caixas de texto adjacentes.
     */
    function processConversion(activeInput) {
      const originUnit = activeInput.dataset.unit;
      const rawValue = activeInput.value;
      const sanitized = sanitizeInput(rawValue);

      // Corrige a caixa atual se o usuário digitou um caractere inválido
      if (activeInput.value !== sanitized) {
        activeInput.value = sanitized;
      }

      // Se o campo estiver vazio ou for apenas o sinal "-", limpa os demais campos
      if (sanitized === '' || sanitized === '-') {
        inputs.forEach(input => {
          if (input !== activeInput) input.value = '';
        });
        return;
      }

      const numValue = parseFloat(sanitized);
      if (isNaN(numValue)) return;

      const kelvinValue = toKelvin(numValue, originUnit);

      // Impede o cálculo se o valor estiver abaixo do Zero Absoluto (0 K)
      if (kelvinValue === null || kelvinValue < 0) return;

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
      inputs.forEach(input => input.value = '');
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