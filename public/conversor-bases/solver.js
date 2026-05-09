document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
        dec: document.getElementById('base-dec'),
        bin: document.getElementById('base-bin'),
        hex: document.getElementById('base-hex'),
        oct: document.getElementById('base-oct')
    };

    function convert(value, fromBase) {
        if (value === "") {
            Object.values(inputs).forEach(i => i.value = "");
            return;
        }

        // Tenta parsear o número na base de origem
        const parsed = parseInt(value, fromBase);
        
        if (isNaN(parsed)) return;

        // Atualiza todos os outros campos
        if (fromBase !== 10) inputs.dec.value = parsed.toString(10);
        if (fromBase !== 2)  inputs.bin.value = parsed.toString(2);
        if (fromBase !== 16) inputs.hex.value = parsed.toString(16).toUpperCase();
        if (fromBase !== 8)  inputs.oct.value = parsed.toString(8);
    }

    inputs.dec.addEventListener('input', (e) => convert(e.target.value, 10));
    inputs.bin.addEventListener('input', (e) => convert(e.target.value, 2));
    inputs.hex.addEventListener('input', (e) => convert(e.target.value, 16));
    inputs.oct.addEventListener('input', (e) => convert(e.target.value, 8));
});