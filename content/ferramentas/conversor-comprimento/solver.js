/**
 * Scalar - Engine Reativa do Conversor de Comprimento
 * Padrão: Multi-Input Grid Propagation (Strict Scope & High Precision)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Escopo Estreito: Captura estritamente os campos do conversor de comprimento
    const inputs = Array.from(document.querySelectorAll('input[id^="len-"]'));

    // Aborta silenciosamente se esta ferramenta não estiver presente no DOM da página
    if (inputs.length === 0) return;

    // 2. Fatores Oficiais de Conversão Normalizados (1 Unidade = X Metros)
    // Tabela direta sem divisões invertidas para evitar erros de ponto flutuante IEEE 754
    const FACTORS_IN_METERS = {
      'pm': 1e-12,     // Picômetro
      'nm': 1e-9,      // Nanômetro
      'um': 1e-6,      // Micrômetro
      'mm': 0.001,     // Milímetro
      'cm': 0.01,      // Centímetro
      'm': 1,          // Metro (Unidade Pivô)
      'km': 1000,      // Quilômetro
      'in': 0.0254,    // Polegada (Definição Internacional Exata)
      'ft': 0.3048,    // Pé
      'yd': 0.9144,    // Jarda
      'mi': 1609.344,  // Milha Terrestre
      'nmi': 1852      // Milha Náutica
    };

    // Controladora de estado para prevenir loops de eventos em massa
    let isCalculating = false;

    /**
     * Formata e limpa o valor numérico recalculado para exibição no input
     * @param {number} num 
     * @returns {string}
     */
    function formatOutput(num) {
      if (num === 0) return '0';

      // Notação científica para números extremos (subatômicos ou astronômicos)
      if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e12) {
        return num.toExponential(4);
      }

      // Elimina dízimas residuais de ponto flutuante arredondando em até 8 casas decimais
      const cleanNum = parseFloat(num.toFixed(8));
      return cleanNum.toString();
    }

    /**
     * Propaga o cálculo para todos os inputs do grid, exceto o campo que está sob digitação
     * @param {HTMLInputElement} sourceInput - Campo de origem digitado pelo usuário
     */
    function propagateConversion(sourceInput) {
      if (isCalculating) return;
      isCalculating = true;

      const originUnit = (sourceInput.getAttribute('data-unit') || sourceInput.id.replace('len-', '')).toLowerCase();
      let rawVal = sourceInput.value.trim();

      // Normalização: substitui vírgula por ponto para permitir parsing numérico limpo
      if (rawVal.includes(',')) {
        rawVal = rawVal.replace(',', '.');
      }

      // Se o campo estiver vazio ou for apagado, limpa todos os outros inputs passivos
      if (rawVal === '') {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      const parsedValue = parseFloat(rawVal);

      // Trata entrada inválida (ex: letras ou símbolos)
      if (isNaN(parsedValue)) {
        inputs.forEach(input => {
          if (input !== sourceInput) input.value = '';
        });
        isCalculating = false;
        return;
      }

      // 1. Converter Unidade de Origem -> Metros (Âncora)
      const sourceFactor = FACTORS_IN_METERS[originUnit] || 1;
      const meters = parsedValue * sourceFactor;

      // 2. Propagar Metros -> Demais Unidades do Grid
      inputs.forEach(targetInput => {
        // Ignora o próprio campo que está sendo editado ou focado pelo usuário
        if (targetInput === sourceInput || document.activeElement === targetInput) return;

        const targetUnit = (targetInput.getAttribute('data-unit') || targetInput.id.replace('len-', '')).toLowerCase();
        const targetFactor = FACTORS_IN_METERS[targetUnit] || 1;

        // Converte de Metros para a unidade de destino
        const targetResult = meters / targetFactor;
        targetInput.value = formatOutput(targetResult);
      });

      isCalculating = false;
    }

    // 3. Adiciona os event listeners de digitação em tempo real
    inputs.forEach(input => {
      input.addEventListener('input', () => propagateConversion(input));
    });
  });
})();