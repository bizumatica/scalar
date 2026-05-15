/**
 * Scalar Engine: MDC & MMC
 * Implementação com BigInt para precisão absoluta em números grandes.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const displayMDC = document.getElementById('resultMDC');
    const displayMMC = document.getElementById('resultMMC');

    /**
     * Algoritmo de Euclides Iterativo (mais seguro contra estouro de pilha que recursão)
     */
    function calcularMDC(a, b) {
        a = a < 0n ? -a : a;
        b = b < 0n ? -b : b;
        while (b > 0n) {
            a %= b;
            [a, b] = [b, a];
        }
        return a;
    }

    function calcular() {
        const valA = inputA.value.trim();
        const valB = inputB.value.trim();

        // Se campos vazios, limpa o display
        if (!valA || !valB) {
            displayMDC.textContent = "--";
            displayMMC.textContent = "--";
            return;
        }

        try {
            // Convertemos para BigInt para suportar números gigantes
            const a = BigInt(valA);
            const b = BigInt(valB);

            if (a === 0n && b === 0n) {
                displayMDC.textContent = "0";
                displayMMC.textContent = "0";
                return;
            }

            const mdc = calcularMDC(a, b);
            
            // MMC = (|a * b|) / MDC
            // Usamos divisão de BigInt para manter precisão total
            const mmc = (a * b) / mdc;
            const mmcAbs = mmc < 0n ? -mmc : mmc;

            // Exibição formatada (ex: 1.250 em PT-BR ou 1,250 em EN)
            displayMDC.textContent = mdc.toLocaleString();
            displayMMC.textContent = mmcAbs.toLocaleString();

        } catch (e) {
            // Caso o usuário digite algo que não seja número inteiro
            displayMDC.textContent = "??";
            displayMMC.textContent = "??";
        }
    }

    // Listeners para cálculo em tempo real
    [inputA, inputB].forEach(el => {
        el.addEventListener('input', calcular);
    });
});