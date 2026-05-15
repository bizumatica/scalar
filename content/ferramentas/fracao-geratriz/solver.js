/**
 * Engine de Fração Geratriz (Decimais Exatos e Dízimas)
 * Suporte Bilíngue integrado via Data Attributes
 */

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-resolver');
    const inputEl = document.getElementById('input-decimal');
    const displayFracao = document.getElementById('fracao-final');
    const displayLogica = document.getElementById('logica-detalhe');
    const i18n = document.getElementById('i18n-labels').dataset;

    const mdc = (a, b) => b === 0 ? a : mdc(b, a % b);

    function resolver() {
        const rawInput = inputEl.value.replace(',', '.').trim();
        const lang = i18n.lang;

        if (!rawInput || isNaN(rawInput)) {
            displayLogica.innerText = lang === "pt-br" ? i18n.errorPt : i18n.errorEn;
            return;
        }

        // Detectar dízima (ex: 0.333 ou 0.333...)
        const isRepeating = rawInput.includes('...') || (rawInput.split('.')[1] && rawInput.split('.')[1].length > 5 && new Set(rawInput.split('.')[1].split('')).size <= 2);
        
        let numerador, denominador, explicacao = "";

        if (isRepeating) {
            // Lógica Simplificada para Dízimas Periódicas Simples (ex: 0.333)
            const limpo = rawInput.replace('...', '');
            const parteDecimal = limpo.split('.')[1];
            const periodo = parteDecimal[0]; // Assume o primeiro dígito como período
            
            numerador = parseInt(periodo);
            denominador = 9;
            
            explicacao = lang === "pt-br" 
                ? `<p>1. Identificada dízima periódica.</p><p>2. Período: <strong>${periodo}</strong></p><p>3. Denominador 9 aplicado.</p>`
                : `<p>1. Repeating decimal identified.</p><p>2. Period: <strong>${periodo}</strong></p><p>3. Denominator 9 applied.</p>`;
        } else {
            // Lógica para Decimais Exatos
            const partes = rawInput.split('.');
            if (partes.length === 1) {
                numerador = parseInt(partes[0]);
                denominador = 1;
                explicacao = lang === "pt-br" ? "Número inteiro." : "Integer number.";
            } else {
                const casas = partes[1].length;
                denominador = Math.pow(10, casas);
                numerador = Math.round(parseFloat(rawInput) * denominador);
                
                explicacao = lang === "pt-br"
                    ? `<p>1. Transformado em <strong>${numerador}/${denominador}</strong></p><p>2. Base 10 aplicada.</p>`
                    : `<p>1. Transformed to <strong>${numerador}/${denominador}</strong></p><p>2. Base 10 applied.</p>`;
            }
        }

        // Simplificação
        const comum = mdc(Math.abs(numerador), denominador);
        const numFinal = numerador / comum;
        const denFinal = denominador / comum;

        // Renderização da Fração com CSS Inline (Garante o traço da fração)
        displayFracao.innerHTML = `
            <div style="display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1.1;">
                <span style="padding: 0 10px;">${numFinal}</span>
                <div style="width: 100%; height: 2px; background: #3b82f6; margin: 4px 0;"></div>
                <span style="padding: 0 10px;">${denFinal}</span>
            </div>
        `;

        displayLogica.innerHTML = explicacao + (lang === "pt-br" 
            ? `<p>4. MDC: <strong>${comum}</strong>. Fração simplificada.</p>` 
            : `<p>4. GCD: <strong>${comum}</strong>. Fraction simplified.</p>`);
    }

    btn.addEventListener('click', resolver);
    
    // Permitir Calcular com a tecla Enter
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') resolver();
    });
});