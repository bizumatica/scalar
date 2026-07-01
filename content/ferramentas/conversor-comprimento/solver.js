(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[data-unit]');
    
    // Aborta silenciosamente se os elementos não estiverem nesta página do Hugo
    if (inputs.length === 0) return;

    // 🌍 Captura de Idioma Dinâmica para tratamento regionalizado de inputs e outputs
    const currentLang = document.documentElement.lang || 'pt-BR';
    const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    // 📐 Fatores de conversão exatos baseados na definição oficial internacional de 1 Metro
    const factors = {
      mm: 1000,
      cm: 100,
      m: 1,
      km: 0.001,
      in: 1 / 0.0254,          // 1 metro = ~39.37007874 in (Exato por lei)
      ft: 1 / 0.3048,          // 1 metro = ~3.280839895 ft (Exato por lei)
      yd: 1 / 0.9144,          // 1 metro = ~1.093613298 yd (Exato por lei)
      mi: 1 / 1609.344         // 1 metro = ~0.000621371 mi (Exato por lei)
    };

    /**
     * Atualiza todos os campos exceto o que está sendo editado
     * @param {string} originUnit - ID da unidade de origem
     * @param {number} value - Valor numérico puro digitado
     */
    function updateAllFields(originUnit, value) {
      // Se o campo estiver vazio ou inválido, limpa todos os outros campos remanescentes
      if (isNaN(value)) {
        inputs.forEach(input => {
          if (input.dataset.unit !== originUnit) {
            input.value = "";
          }
        });
        return;
      }

      // 1. Converte a entrada para a unidade pivô (Metros)
      const meters = value / factors[originUnit];

      // 2. Converte de Metros para todas as outras unidades
      inputs.forEach(input => {
        const unit = input.dataset.unit;
        
        // Só atualiza se for um campo diferente e se o usuário não estiver com o cursor focado nele
        if (unit !== originUnit && document.activeElement !== input) {
          const result = meters * factors[unit];
          
          // Tratamento para evitar dízimas periódicas de arredondamento flutuante
          const roundedResult = parseFloat(result.toFixed(6));

          // 3. Formatação inteligente baseada na cultura regional
          // Se o valor for inteiro, joga direto. Se tiver decimal, formata preservando o separador local (, ou .)
          if (Number.isInteger(roundedResult)) {
            input.value = roundedResult;
          } else {
            // Usa o Intl do navegador para definir se a string conterá '.' ou ',' de acordo com o país
            input.value = roundedResult.toLocaleString(currentLocale, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 6,
              useGrouping: false // Evita colocar pontos de milhar dentro do input editável
            });
          }
        }
      });
    }

    // Adiciona o escutador de eventos em todos os inputs gerados dinamicamente pelas views
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        let val = e.target.value;

        if (val === "") {
          updateAllFields(e.target.dataset.unit, NaN);
          return;
        }

        // Normalização gramatical: Se o usuário do país digitar vírgula (,), 
        // substitui temporariamente por ponto (.) para o parseFloat do JS não quebrar o cálculo
        if (val.includes(',')) {
          val = val.replace(',', '.');
        }

        const parsedVal = parseFloat(val);
        updateAllFields(e.target.dataset.unit, parsedVal);
      });
    });
  });
})();