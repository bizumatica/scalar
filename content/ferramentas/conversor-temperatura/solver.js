/**
 * Scalar Temperature Engine - Final Polish
 */

document.addEventListener('DOMContentLoaded', () => {
    const tempInputs = document.querySelectorAll('input[data-unit]');

    if (tempInputs.length === 0) return;

    function calculate(originUnit, value) {
        // Se o valor for vazio (usuário apagou tudo), limpa todos os outros campos
        if (value === "" || value === null || isNaN(value)) {
            tempInputs.forEach(input => {
                if (input.dataset.unit !== originUnit) {
                    input.value = "";
                }
            });
            return;
        }

        let celsius;
        // 1. Normaliza para Celsius (Pivô)
        switch (originUnit) {
            case 'C': celsius = value; break;
            case 'F': celsius = (value - 32) * 5 / 9; break;
            case 'K': celsius = value - 273.15; break;
        }

        // 2. Atualiza os outros campos
        tempInputs.forEach(input => {
            const targetUnit = input.dataset.unit;

            // SÓ atualiza se não for o campo que o usuário está digitando
            if (targetUnit !== originUnit) {
                let result;
                if (targetUnit === 'C') result = celsius;
                else if (targetUnit === 'F') result = (celsius * 9 / 5) + 32;
                else if (targetUnit === 'K') result = celsius + 273.15;

                // Formatação com precisão de 4 casas, removendo zeros desnecessários
                input.value = parseFloat(result.toFixed(4));
            }
        });
    }

    tempInputs.forEach(input => {
        // Bloqueio de letras, mas PERMITE teclas de controle (Backspace, Delete, Setas)
        input.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Control', 'v', 'c', '.', ',', '-'];
            // Se não for uma tecla permitida e não for número, bloqueia
            if (!allowedKeys.includes(e.key) && isNaN(parseInt(e.key)) && !e.ctrlKey) {
                e.preventDefault();
            }
        });

        input.addEventListener('input', (e) => {
            let rawValue = e.target.value;

            // 1. Se o campo estiver vazio ou for apenas um sinal de menos (digitando negativo)
            // Não calculamos nada e deixamos o usuário continuar digitando
            if (rawValue === "" || rawValue === "-") {
                calculate(input.dataset.unit, "");
                return; 
            }

            // 2. Sanitização para garantir que o parseFloat funcione
            let normalizedVal = rawValue.replace(',', '.');
            let parsed = parseFloat(normalizedVal);

            // 3. Só dispara o cálculo se for um número válido
            if (!isNaN(parsed)) {
                calculate(input.dataset.unit, parsed);
            }
        });
    });
});