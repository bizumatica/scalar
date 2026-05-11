document.addEventListener('DOMContentLoaded', () => {
    let mode = 'simple'; // 'simple' ou 'compound'

    const elements = {
        btnSimple: document.getElementById('mode-simple'),
        btnCompound: document.getElementById('mode-compound'),
        rowCompound: document.getElementById('row-compound'),
        resultX: document.getElementById('result-x'),
        // Inputs
        a1: document.getElementById('val-a1'), a2: document.getElementById('val-a2'), typeA: document.getElementById('type-a'),
        b1: document.getElementById('val-b1'),
        c1: document.getElementById('val-c1'), c2: document.getElementById('val-c2'), typeC: document.getElementById('type-c')
    };

    function calculate() {
        const a1 = parseFloat(elements.a1.value);
        const a2 = parseFloat(elements.a2.value);
        const b1 = parseFloat(elements.b1.value);
        
        if (isNaN(a1) || isNaN(a2) || isNaN(b1) || a1 === 0) {
            elements.resultX.innerText = "?";
            return;
        }

        let x;

        if (mode === 'simple') {
            // Regra de Três Simples
            // Direta: a1/a2 = b1/x -> x = (a2 * b1) / a1
            // Inversa: a1*a2 = b1*x -> x = (a1 * a2) / b1 (ou inverte a razão)
            if (elements.typeA.value === 'dir') {
                x = (a2 * b1) / a1;
            } else {
                x = (a1 * a2) / b1;
            }
        } else {
            // Regra de Três Composta (3 Grandezas)
            const c1 = parseFloat(elements.c1.value);
            const c2 = parseFloat(elements.c2.value);

            if (isNaN(c1) || isNaN(c2) || c1 === 0) {
                elements.resultX.innerText = "?";
                return;
            }

            // Lógica: x = b1 * (Razão A) * (Razão C)
            // Para Direta: usa-se (a2/a1)
            // Para Inversa: usa-se (a1/a2)
            let ratioA = (elements.typeA.value === 'dir') ? (a2 / a1) : (a1 / a2);
            let ratioC = (elements.typeC.value === 'dir') ? (c2 / c1) : (c1 / c2);
            
            x = b1 * ratioA * ratioC;
        }

        elements.resultX.innerText = Number.isInteger(x) ? x : x.toFixed(4).replace(/\.?0+$/, "");
    }

    // Alternar Modos
    elements.btnSimple.addEventListener('click', () => {
        mode = 'simple';
        elements.rowCompound.style.display = 'none';
        elements.btnSimple.style.background = '#3b82f6';
        elements.btnSimple.style.color = 'white';
        elements.btnCompound.style.background = 'transparent';
        elements.btnCompound.style.color = '#94a3b8';
        calculate();
    });

    elements.btnCompound.addEventListener('click', () => {
        mode = 'compound';
        elements.rowCompound.style.display = 'grid';
        elements.btnCompound.style.background = '#3b82f6';
        elements.btnCompound.style.color = 'white';
        elements.btnSimple.style.background = 'transparent';
        elements.btnSimple.style.color = '#94a3b8';
        calculate();
    });

    // Listeners para cálculo em tempo real
    [elements.a1, elements.a2, elements.b1, elements.c1, elements.c2, elements.typeA, elements.typeC].forEach(el => {
        el.addEventListener('input', calculate);
    });
});