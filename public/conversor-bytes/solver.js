// content/ferramentas/conversor-bytes/solver.js
function converterDados() {
    const valor = parseFloat(document.getElementById('input-valor').value);
    const unidadeOriginal = document.getElementById('select-unidade').value;
    const displayBinario = document.getElementById('resultado-binario');
    const displayDecimal = document.getElementById('resultado-decimal');

    if (isNaN(valor)) return;

    // Fatores de Base 2 (IEC - KiB, MiB...)
    const base2 = {
        'B': 1,
        'KiB': 1024,
        'MiB': Math.pow(1024, 2),
        'GiB': Math.pow(1024, 3),
        'TiB': Math.pow(1024, 4)
    };

    // Fatores de Base 10 (SI - kB, MB...)
    const base10 = {
        'B': 1,
        'kB': 1000,
        'MB': 1000000,
        'GB': 1000000000,
        'TB': 1000000000000
    };

    // Cálculo em Base 2
    const bytes2 = valor * base2[unidadeOriginal.replace('k','Ki').replace('M','Mi').replace('G','Gi').replace('T','Ti') || unidadeOriginal];
    let html2 = '<h4>Padrão Binário (IEC)</h4>';
    for (let u in base2) {
        let res = bytes2 / base2[u];
        html2 += `<p><strong>${res.toLocaleString('pt-BR')}</strong> ${u}</p>`;
    }

    // Cálculo em Base 10
    const bytes10 = valor * (base10[unidadeOriginal] || 1);
    let html10 = '<h4>Padrão Decimal (SI)</h4>';
    for (let u in base10) {
        let res = bytes10 / base10[u];
        html10 += `<p><strong>${res.toLocaleString('pt-BR')}</strong> ${u}</p>`;
    }

    displayBinario.innerHTML = html2;
    displayDecimal.innerHTML = html10;
}