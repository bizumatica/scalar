document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('mem-input-value');
    const fromUnit = document.getElementById('mem-from-unit');
    const toUnit = document.getElementById('mem-to-unit');
    const resultDisplay = document.getElementById('mem-result');
    const resultFullDisplay = document.getElementById('mem-result-full');

    // Definição precisa dos multiplicadores (Normalizado para Bytes)
    const Units = {
        'bit': 0.125, // 1 bit = 1/8 byte
        'B': 1,
        // SI (Base 10)
        'KB': 1000,
        'MB': 1000 ** 2,
        'GB': 1000 ** 3,
        'TB': 1000 ** 4,
        // IEC (Base 2)
        'KiB': 1024,
        'MiB': 1024 ** 2,
        'GiB': 1024 ** 3,
        'TiB': 1024 ** 4
    };

    function formatNumber(num) {
        if (num === 0) return '0';
        if (num < 0.001 || num > 1e12) {
            return num.toExponential(4);
        }
        // Retorna até 6 casas decimais
        return parseFloat(num.toFixed(6)).toString();
    }

    function calculate() {
        const value = parseFloat(inputValue.value);
        
        if (isNaN(value) || value === 0) {
            resultDisplay.textContent = '0';
            resultFullDisplay.textContent = '';
            return;
        }

        const fromMultiplier = Units[fromUnit.value];
        const toMultiplier = Units[toUnit.value];

        // Normaliza para Bytes
        const bytes = value * fromMultiplier;

        // Converte para unidade de destino
        const result = bytes / toMultiplier;

        // Exibe resultado formatado
        resultDisplay.textContent = formatNumber(result);
        
        // Exibe o valor total em Bytes para referência
        resultFullDisplay.textContent = `= ${bytes.toLocaleString('pt-BR')} Bytes`;
    }

    // Listeners
    [inputValue, fromUnit, toUnit].forEach(el => {
        el.addEventListener('input', calculate);
    });
});