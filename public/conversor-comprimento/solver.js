/**
 * Scalar Length Engine
 * Base Unit: Meters (m)
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[data-unit]');
    
    // Fatores de conversão para 1 Metro
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

    function updateAllFields(originUnit, value) {
        if (value === "" || isNaN(value)) {
            inputs.forEach(input => input.value = "");
            return;
        }

        // 1. Converter entrada para Metro (Pivô)
        const meters = value / factors[originUnit];

        // 2. Converter de Metro para todas as outras unidades
        inputs.forEach(input => {
            const unit = input.dataset.unit;
            if (unit !== originUnit) {
                const result = meters * factors[unit];
                // Formatação: máx 6 casas decimais, remove zeros à direita
                input.value = parseFloat(result.toFixed(6));
            }
        });
    }

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            updateAllFields(e.target.dataset.unit, parseFloat(e.target.value));
        });
    });
});