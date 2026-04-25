const inputs = {
    dec: document.getElementById('base-dec'),
    bin: document.getElementById('base-bin'),
    hex: document.getElementById('base-hex'),
    oct: document.getElementById('base-oct')
};

function updateBases(value, fromBase) {
    if (value === "") {
        Object.values(inputs).forEach(i => i.value = "");
        return;
    }

    try {
        const num = parseInt(value, fromBase);
        if (isNaN(num)) return;

         if (fromBase !== 2)  inputs.bin.value = num.toString(2);
	    if (fromBase !== 8)  inputs.oct.value = num.toString(8);
        if (fromBase !== 10) inputs.dec.value = num.toString(10);
        if (fromBase !== 16) inputs.hex.value = num.toString(16).toUpperCase();
    } catch (e) { console.error("Erro na conversão de base."); }
}

inputs.dec.addEventListener('input', (e) => updateBases(e.target.value, 10));
inputs.bin.addEventListener('input', (e) => updateBases(e.target.value, 2));
inputs.hex.addEventListener('input', (e) => updateBases(e.target.value, 16));
inputs.oct.addEventListener('input', (e) => updateBases(e.target.value, 8));