(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const tempInputs = document.querySelectorAll('input[data-unit]');

    if (tempInputs.length === 0) return;

    // 🌍 Captura de Idioma Dinâmica para o motor de internacionalização de números
    const currentLang = document.documentElement.lang || 'pt-BR';
    const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    function calculate(originUnit, value) {
      // Se o valor for vazio, limpa todos os outros campos remanescentes na tela
      if (value === "" || value === null || isNaN(value)) {
        tempInputs.forEach(input => {
          if (input.dataset.unit !== originUnit) {
            input.value = "";
          }
        });
        return;
      }

      // 1. Normaliza qualquer entrada para a unidade Pivô (Celsius)
      let celsius;
      switch (originUnit) {
        case 'C': celsius = value; break;
        case 'F': celsius = (value - 32) * 5 / 9; break;
        case 'K': celsius = value - 273.15; break;
      }

      // 2. Transmite e converte o valor para as outras escalas
      tempInputs.forEach(input => {
        const targetUnit = input.dataset.unit;

        // SÓ atualiza as caixas adjacentes (evita sobrescrever o cursor ativo do usuário)
        if (targetUnit !== originUnit && document.activeElement !== input) {
          let result;
          if (targetUnit === 'C') result = celsius;
          else if (targetUnit === 'F') result = (celsius * 9 / 5) + 32;
          else if (targetUnit === 'K') result = celsius + 273.15;

          // Tratamento para remover dízimas periódicas de ponto flutuante do JS
          const roundedResult = parseFloat(result.toFixed(4));

          // 3. Formatação inteligente baseada na cultura local (, ou .)
          if (Number.isInteger(roundedResult)) {
            input.value = roundedResult;
          } else {
            input.value = roundedResult.toLocaleString(currentLocale, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
              useGrouping: false // Impede pontos de milhares (Ex: 1.200) dentro do input
            });
          }
        }
      });
    }

    tempInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        let rawValue = e.target.value;

        // 1. Se o usuário estiver no meio da digitação de um número negativo ou vazio, mantém o fluxo livre
        if (rawValue === "" || rawValue === "-") {
          calculate(input.dataset.unit, "");
          return; 
        }

        // 2. Sanitização cross-platform para móbile (Remove tudo que não for dígito, ponto, vírgula ou sinal de menos)
        // Isso descarta o keydown problemático e impede colagens de texto inválidas
        let sanitizedValue = rawValue.replace(/[^0-9.,-]/g, '');
        
        // Se houver mais de um sinal de menos por erro de digitação, preserva apenas o primeiro
        if ((sanitizedValue.match(/-/g) || []).length > 1) {
          sanitizedValue = '-' + sanitizedValue.replace(/-/g, '');
        }

        // Atualiza a visualização do próprio input com o filtro aplicado
        e.target.value = sanitizedValue;

        // 3. Normalização gramatical para o parseFloat rodar de forma idêntica globalmente
        let normalizedVal = sanitizedValue.replace(',', '.');
        let parsed = parseFloat(normalizedVal);

        // 4. Executa os cálculos termodinâmicos em tempo real
        if (!isNaN(parsed)) {
          calculate(input.dataset.unit, parsed);
        }
      });
    });
  });
})();