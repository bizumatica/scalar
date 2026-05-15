/**
 * Scalar Rule of Three Engine - Revision 2.0
 * Validado para cálculos síncronos e modos dinâmicos.
 */

document.addEventListener('DOMContentLoaded', () => {
    let mode = 'simple';

    const els = {
        btnS: document.getElementById('mode-simple'),
        btnC: document.getElementById('mode-compound'),
        rowC: document.getElementById('row-compound'),
        resX: document.getElementById('result-x'),
        // Inputs
        a1: document.getElementById('val-a1'), a2: document.getElementById('val-a2'), tA: document.getElementById('type-a'),
        b1: document.getElementById('val-b1'),
        c1: document.getElementById('val-c1'), c2: document.getElementById('val-c2'), tC: document.getElementById('type-c')
    };

    function parseVal(input) {
        if (!input.value) return NaN;
        return parseFloat(input.value.replace(',', '.'));
    }

    function calculate() {
        const a1 = parseVal(els.a1);
        const a2 = parseVal(els.a2);
        const b1 = parseVal(els.b1);

        // Se os dados básicos de A e B não existirem, para aqui
        if (isNaN(a1) || isNaN(a2) || isNaN(b1) || a1 === 0) {
            els.resX.innerText = "?";
            return;
        }

        // Razão da Grandeza A em relação à B
        // Se Direta: x = b1 * (a2/a1) | Se Inversa: x = b1 * (a1/a2)
        const ratioA = (els.tA.value === 'dir') ? (a2 / a1) : (a1 / a2);
        
        let result = b1 * ratioA;

        // Se estiver no modo Composta, aplica a razão de C
        if (mode === 'compound') {
            const c1 = parseVal(els.c1);
            const c2 = parseVal(els.c2);

            // Só altera o resultado se os campos de C estiverem preenchidos e válidos
            if (!isNaN(c1) && !isNaN(c2) && c1 !== 0) {
                const ratioC = (els.tC.value === 'dir') ? (c2 / c1) : (c1 / c2);
                result = result * ratioC;
            } else {
                // Se o modo é composta mas C está incompleto, mostramos "?" para evitar erro de interpretação
                els.resX.innerText = "?";
                return;
            }
        }

        // Formatação final
        if (isFinite(result)) {
            // Limpa zeros à direita e limita a 4 casas
            let formatted = parseFloat(result.toFixed(4));
            els.resX.innerText = formatted.toLocaleString();
            els.resX.style.color = "#60a5fa"; // Feedback visual de sucesso
        } else {
            els.resX.innerText = "?";
            els.resX.style.color = "#fff";
        }
    }

    // Gerenciador de UI
    function switchMode(m) {
        mode = m;
        const active = m === 'simple' ? els.btnS : els.btnC;
        const inactive = m === 'simple' ? els.btnC : els.btnS;

        active.style.background = '#3b82f6';
        active.style.color = 'white';
        inactive.style.background = 'transparent';
        inactive.style.color = '#94a3b8';
        
        els.rowC.style.display = m === 'simple' ? 'none' : 'grid';
        calculate();
    }

    // Eventos
    els.btnS.onclick = () => switchMode('simple');
    els.btnC.onclick = () => switchMode('compound');

    const triggers = [els.a1, els.a2, els.b1, els.c1, els.c2, els.tA, els.tC];
    triggers.forEach(t => t.oninput = calculate);
});