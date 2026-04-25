function calcularGeratriz() {
    const input = document.getElementById('input-decimal').value.replace(',', '.');
    const displayFracao = document.getElementById('fracao-final');
    const displayLogica = document.getElementById('logica-detalhe');

    if (!input || isNaN(input)) {
        displayLogica.innerText = "Por favor, insira um número decimal válido.";
        return;
    }

    const partes = input.split('.');
    
    // Caso seja número inteiro
    if (partes.length === 1) {
        displayFracao.innerHTML = `${input}/1`;
        displayLogica.innerHTML = "Números inteiros têm denominador 1.";
        return;
    }

    const numDecimais = partes[1].length;
    const denominador = Math.pow(10, numDecimais);
    const numerador = Math.round(parseFloat(input) * denominador);

    // Função MDC (Algoritmo de Euclides)
    const mdc = (a, b) => b === 0 ? a : mdc(b, a % b);
    const divisorComum = mdc(numerador, denominador);

    const numSimplificado = numerador / divisorComum;
    const denSimplificado = denominador / divisorComum;

    // Renderização Visual
    displayFracao.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
            <span>${numSimplificado}</span>
            <div style="width: 100%; height: 2px; background: var(--primary);"></div>
            <span>${denSimplificado}</span>
        </div>
    `;

    displayLogica.innerHTML = `
        <p>1. Transformado em <strong>${numerador}/${denominador}</strong></p>
        <p>2. MDC encontrado: <strong>${divisorComum}</strong></p>
        <p>3. Fração simplificada com sucesso.</p>
    `;
}

document.getElementById('btn-resolver').addEventListener('click', calcularGeratriz);