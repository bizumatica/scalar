/**
 * Scalar Length Engine
 * Base Unit: Meters (m)
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[data-unit]');
    
    // Fatores de conversão para 1 Metro (Pivô)
    const factors = {
        mm: 1000,
        cm: 100,
        m: 1,
        km: 0.001,
        in: 39.37007874,
        ft: 3.280839895,
        yd: 1.093613298,
        mi: 0.000621371
    };

    /**
     * Atualiza todos os campos exceto o que está sendo editado
     * @param {string} originUnit - ID da unidade de origem
     * @param {number} value - Valor digitado
     */
    function updateAllFields(originUnit, value) {
        // Se o campo estiver vazio ou for inválido, limpa todos os outros
        if (isNaN(value)) {
            inputs.forEach(input => {
                if (input.dataset.unit !== originUnit) {
                    input.value = "";
                }
            });
            return;
        }

        // 1. Converte a entrada para a unidade base (Metros)
        const meters = value / factors[originUnit];

        // 2. Converte de Metros para todas as outras unidades
        inputs.forEach(input => {
            const unit = input.dataset.unit;
            
            // Só atualiza se for uma unidade diferente e se o usuário não estiver nela
            if (unit !== originUnit && document.activeElement !== input) {
                const result = meters * factors[unit];
                
                // Formatação: máx 6 casas decimais, remove zeros desnecessários
                // O uso de parseFloat(...toFixed(6)) garante um número limpo
                input.value = parseFloat(result.toFixed(6));
            }
        });
    }

    // Adiciona o escutador de eventos em todos os inputs gerados pelo Hugo
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            // Se o usuário apagar tudo, passamos NaN para limpar os campos
            const parsedVal = val === "" ? NaN : parseFloat(val);
            updateAllFields(e.target.dataset.unit, parsedVal);
        });
    });
});