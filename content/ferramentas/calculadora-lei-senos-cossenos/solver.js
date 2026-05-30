function limparCamposTrig() {
    document.getElementById('trig-a').value = '';
    document.getElementById('trig-b').value = '';
    document.getElementById('trig-c').value = '';
    document.getElementById('trig-A').value = '';
    document.getElementById('trig-B').value = '';
    document.getElementById('trig-C').value = '';
    document.getElementById('trig-resultado-box').style.display = 'none';
}

function resolverTriangulo() {
    let a = parseFloat(document.getElementById('trig-a').value);
    let b = parseFloat(document.getElementById('trig-b').value);
    let c = parseFloat(document.getElementById('trig-c').value);
    let A = parseFloat(document.getElementById('trig-A').value);
    let B = parseFloat(document.getElementById('trig-B').value);
    let C = parseFloat(document.getElementById('trig-C').value);

    const box = document.getElementById('trig-resultado-box');
    const logs = document.getElementById('trig-passo-a-passo');

    // Contagem de parâmetros
    let ladosCount = (!isNaN(a)?1:0) + (!isNaN(b)?1:0) + (!isNaN(c)?1:0);
    let angulosCount = (!isNaN(A)?1:0) + (!isNaN(B)?1:0) + (!isNaN(C)?1:0);
    let totalCount = ladosCount + angulosCount;

    if (totalCount !== 3) {
        alert("Por favor, insira exatamente 3 valores!");
        return;
    }
    if (ladosCount === 0) {
        alert("Pelo menos um dos valores inseridos deve ser um Lado!");
        return;
    }

    const toRad = deg => deg * (Math.PI / 180);
    const toDeg = rad => rad * (180 / Math.PI);
    let textoPasso = "";

    // CASO 1: LLL (Três lados conhecidos)
    if (ladosCount === 3) {
        if ((a + b <= c) || (a + c <= b) || (b + c <= a)) {
            logs.innerHTML = "❌ Erro geométrico: A soma de dois lados deve ser maior que o terceiro lado (Desigualdade Triangular).";
            box.style.display = 'flex';
            return;
        }
        textoPasso += `✔ Detetado Caso LLL (Três Lados).\n`;
        textoPasso += `Aplicando Lei dos Cossenos para o Ângulo A:\n`;
        let cosA = (b*b + c*c - a*a) / (2 * b * c);
        A = toDeg(Math.acos(cosA));
        textoPasso += `cos(A) = (b² + c² - a²) / (2bc) ➔ A = ${A.toFixed(2)}°\n\n`;

        textoPasso += `Aplicando Lei dos Cossenos para o Ângulo B:\n`;
        let cosB = (a*a + c*c - b*b) / (2 * a * c);
        B = toDeg(Math.acos(cosB));
        textoPasso += `cos(B) = (a² + c² - b²) / (2ac) ➔ B = ${B.toFixed(2)}°\n\n`;

        C = 180 - A - B;
        textoPasso += `Por diferença angular (180° - A - B): C = ${C.toFixed(2)}°`;
    }
    // CASO 2: LAL (Dois lados e o ângulo central conhecido)
    else if ((!isNaN(a) && !isNaN(b) && !isNaN(C)) || (!isNaN(a) && !isNaN(c) && !isNaN(B)) || (!isNaN(b) && !isNaN(c) && !isNaN(A))) {
        textoPasso += `✔ Detetado Caso LAL (Dois lados e o ângulo interno correspondente).\n`;
        if (!isNaN(b) && !isNaN(c) && !isNaN(A)) {
            textoPasso += `Calculando Lado oposto 'a' via Lei dos Cossenos:\n`;
            a = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(toRad(A)));
            textoPasso += `a² = b² + c² - 2bc·cos(A) ➔ a = ${a.toFixed(2)}\n\n`;
            let cosB = (a*a + c*c - b*b) / (2 * a * c); B = toDeg(Math.acos(cosB));
            C = 180 - A - B;
        } else if (!isNaN(a) && !isNaN(c) && !isNaN(B)) {
            textoPasso += `Calculando Lado oposto 'b' via Lei dos Cossenos:\n`;
            b = Math.sqrt(a*a + c*c - 2*a*c*Math.cos(toRad(B)));
            textoPasso += `b² = a² + c² - 2ac·cos(B) ➔ b = ${b.toFixed(2)}\n\n`;
            let cosA = (b*b + c*c - a*a) / (2 * b * c); A = toDeg(Math.acos(cosA));
            C = 180 - A - B;
        } else {
            textoPasso += `Calculando Lado oposto 'c' via Lei dos Cossenos:\n`;
            c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(toRad(C)));
            textoPasso += `c² = a² + b² - 2ab·cos(C) ➔ c = ${c.toFixed(2)}\n\n`;
            let cosA = (b*b + c*c - a*a) / (2 * b * c); A = toDeg(Math.acos(cosA));
            B = 180 - A - C;
        }
        textoPasso += `Ângulos calculados: A = ${A.toFixed(2)}°, B = ${B.toFixed(2)}°, C = ${C.toFixed(2)}°`;
    }
    // CASO 3: Dois Ângulos e um Lado (ALA / AAL)
    else if (angulosCount === 2 && ladosCount === 1) {
        textoPasso += `✔ Detetado Caso com 2 Ângulos e 1 Lado (ALA/AAL).\n`;
        // Descobre o terceiro ângulo primeiro por dedução simples
        if (isNaN(A)) { A = 180 - B - C; }
        else if (isNaN(B)) { B = 180 - A - C; }
        else if (isNaN(C)) { C = 180 - A - B; }
        
        textoPasso += `Determinando ângulo oculto pela soma interna de 180°.\n`;
        textoPasso += `Ângulos unificados: A = ${A.toFixed(2)}°, B = ${B.toFixed(2)}°, C = ${C.toFixed(2)}°\n\n`;
        textoPasso += `Aplicando proporcionalidade da Lei dos Senos para os Lados faltantes:\n`;

        // Atribui via lei dos senos pura baseando-se no lado que o usuário deu
        if (!isNaN(a)) {
            b = a * Math.sin(toRad(B)) / Math.sin(toRad(A));
            c = a * Math.sin(toRad(C)) / Math.sin(toRad(A));
        } else if (!isNaN(b)) {
            a = b * Math.sin(toRad(A)) / Math.sin(toRad(B));
            c = b * Math.sin(toRad(C)) / Math.sin(toRad(B));
        } else {
            a = c * Math.sin(toRad(A)) / Math.sin(toRad(C));
            b = c * Math.sin(toRad(B)) / Math.sin(toRad(C));
        }
        textoPasso += `Lados obtidos: a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`;
    }
    // CASO 4: Dois lados e um ângulo não centralizado (Tratamento complementar de segurança)
    else {
        textoPasso += `✔ Detetado Caso LLA adaptado via Lei dos Senos.\n`;
        // Para simplificar a experiência do usuário e não gerar falsas respostas (caso ambíguo do seno), isolamos os lados:
        if (!isNaN(a) && !isNaN(b) && !isNaN(A)) {
            let sinB = (Math.sin(toRad(A)) * b) / a;
            if(sinB > 1) { logs.textContent = "❌ Impossível construir triângulo com esses valores."; box.style.display = 'flex'; return; }
            B = toDeg(Math.asin(sinB)); C = 180 - A - B;
            c = a * Math.sin(toRad(C)) / Math.sin(toRad(A));
        } else {
            logs.textContent = "⚠ Combinação complexa. Para obter o passo a passo completo, utilize as estruturas LLL, LAL ou forneça 2 Ângulos.";
            box.style.display = 'flex';
            return;
        }
    }

    // Cálculos Geométricos Finais de Área (Fórmula de Heron)
    let s = (a + b + c) / 2;
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    let perimetro = a + b + c;

    // Devolver os dados calculados para as caixas na tela
    document.getElementById('trig-a').value = a.toFixed(2);
    document.getElementById('trig-b').value = b.toFixed(2);
    document.getElementById('trig-c').value = c.toFixed(2);
    document.getElementById('trig-A').value = A.toFixed(2);
    document.getElementById('trig-B').value = B.toFixed(2);
    document.getElementById('trig-C').value = C.toFixed(2);

    document.getElementById('res-perimetro').textContent = perimetro.toFixed(2);
    document.getElementById('res-area').textContent = area.toFixed(2);
    logs.textContent = textoPasso;

    box.style.display = 'flex';
}