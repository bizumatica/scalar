/**
 * Scalar Temperature Engine - Live Sync
 * Baseado na lógica de sincronização de bases numéricas.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        C: document.getElementById('temp-celsius'),
        F: document.getElementById('temp-fahrenheit'),
        K: document.getElementById('temp-kelvin')
    };

    function convert(sourceUnit, value) {
        if (value === "" || isNaN(value)) {
            Object.values(inputs).forEach(input => input.value = "");
            return;
        }

        let celsius;

        // 1. Normaliza para Celsius (Pivô)
        switch (sourceUnit) {
            case 'C': celsius = value; break;
            case 'F': celsius = (value - 32) * 5 / 9; break;
            case 'K': celsius = value - 273.15; break;
        }

        // 2. Despacha os valores formatados para os outros campos
        if (sourceUnit !== 'C') inputs.C.value = parseFloat(celsius.toFixed(4));
        if (sourceUnit !== 'F') inputs.F.value = parseFloat(((celsius * 9 / 5) + 32).toFixed(4));
        if (sourceUnit !== 'K') inputs.K.value = parseFloat((celsius + 273.15).toFixed(4));
    }

    // Adiciona o listener de input em todos os campos
    Object.keys(inputs).forEach(unit => {
        inputs[unit].addEventListener('input', (e) => {
            const val = e.target.value === "" ? "" : parseFloat(e.target.value);
            convert(unit, val);
        });
    });
});