/**
 * Algoritmo de Euclides para MDC e relação para MMC.
 * Scalar - Precisão em cada bit.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const displayMDC = document.getElementById('resultMDC');
    const displayMMC = document.getElementById('resultMMC');

    function calcular() {
        const a = Math.abs(parseInt(inputA.value));
        const b = Math.abs(parseInt(inputB.value));

        if (isNaN(a) || isNaN(b) || a === 0 || b === 0) {
            displayMDC.textContent = "--";
            displayMMC.textContent = "--";
            return;
        }

        const valorMDC = calcularMDC(a, b);
        const valorMMC = (a * b) / valorMDC;

        displayMDC.textContent = valorMDC;
        displayMMC.textContent = valorMMC;
    }

    /**
     * Implementação recursiva do Algoritmo de Euclides
     */
    function calcularMDC(a, b) {
        return b === 0 ? a : calcularMDC(b, a % b);
    }

    inputA.addEventListener('input', calcular);
    inputB.addEventListener('input', calcular);
});