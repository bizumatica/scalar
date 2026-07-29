/**
 * Scalar - Engine Reativa do Conversor de Bytes / Memória
 * Padrão: Multi-Input Grid Propagation
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeamento de Fatores de Conversão (Normalizado para Bytes = 1)
    const UNITS = {
      'bit': 0.125,
      'b': 1,
      // SI (Base 10 - Decimais)
      'kb': 1e3,
      'mb': 1e6,
      'gb': 1e9,
      'tb': 1e12,
      'pb': 1e15,
      // IEC (Base 2 - Binários)
      'kib': 1024,
      'mib': 1024 ** 2,
      'gib': 1024 ** 3,
      'tib': 1024 ** 4,
      'pib': 1024 ** 5
    };

    // 2. Captura de todos os inputs do grid pertencentes a este conversor
    const inputs = Array.from(document.querySelectorAll('input[id^="byte-"]'));

    // Aborta se a ferramenta não estiver presente na página
    if (inputs.length === 0) return;

    // Detecta Locale para formatação decimal legível
    const currentLang = document.documentElement.lang || 'pt-BR';
    const localeMap = { 
      'en': 'en-US', 
      'de': 'de-DE', 
      'ja': 'ja-JP', 
      'es': 'es-ES', 
      'fr': 'fr-FR', 
      'pt': 'pt-BR', 
      'pt-br': 'pt-BR' 
    };
    const currentLocale = localeMap[currentLang.toLowerCase()] || 'pt-BR';

    let isCalculating = false;

    /**
     * Formata números para exibição limpa sem poluir a precisão
     */
    function formatValue(num) {
      if (num === 0) return '0';
      
      // Notação científica para valores extremos
      if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e15) {
        return num.toExponential(4);
      }

      // Trunca dízimas flutuantes do JS mantendo até 8 casas sem zeros à direita desnecessários
      const cleanNum = parseFloat(num.toFixed(8));
      return cleanNum.toLocaleString(currentLocale, {
        maximumFractionDigits: 8
      });
    }

    /**
     * Propaga a conversão a partir do campo modificado
     */
    function processConversion(sourceInput) {
      if (isCalculating) return;
      isCalculating = true;

      const unitId = sourceInput.getAttribute('data-unit') || sourceInput.id.replace('byte-', '');
      const rawValue = sourceInput.value.replace(',', '.').trim();

      // Se o campo for limpo, reseta todos os outros
      if (rawValue === '') {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const numericValue = parseFloat(rawValue);

      // Tratamento para entradas inválidas
      if (isNaN(numericValue)) {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      // Fator da unidade de origem
      const sourceFactor = UNITS[unitId.toLowerCase()] || 1;
      
      // 1. Converter Entrada -> Bytes
      const baseBytes = numericValue * sourceFactor;

      // 2. Propagar Bytes -> Todas as outras unidades
      inputs.forEach(targetInput => {
        if (targetInput === sourceInput) return; // Não altera o campo que o usuário está digitando

        const targetUnitId = (targetInput.getAttribute('data-unit') || targetInput.id.replace('byte-', '')).toLowerCase();
        const targetFactor = UNITS[targetUnitId] || 1;

        const convertedValue = baseBytes / targetFactor;
        targetInput.value = formatValue(convertedValue);
      });

      isCalculating = false;
    }

    // 3. Registrar Event Listeners em tempo real em cada Input do Grid
    inputs.forEach(input => {
      input.addEventListener('input', () => processConversion(input));
    });
  });
})();