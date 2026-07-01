(function () {
  'use strict';

  // 🌍 Captura o idioma da página injetado pelo Hugo
  const currentLang = document.documentElement.lang || 'pt-BR';
  const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
  const currentLocale = localeMap[currentLang] || 'pt-BR';

  // 🗺️ Dicionário i18n para mensagens do Motor Trigonométrico
  const translations = {
    'pt-BR': {
      errCount: "Por favor, insira exatamente 3 valores!",
      errNoSide: "Pelo menos um dos valores inseridos deve ser um Lado!",
      errGeo: "❌ Erro geométrico: A soma de dois lados deve ser maior que o terceiro lado (Desigualdade Triangular).",
      errImpossible: "❌ Impossível construir triângulo com esses valores.",
      errComplex: "⚠ Combinação complexa. Para obter o passo a passo completo, utilize as estruturas LLL, LAL ou forneça 2 Ângulos.",
      caseLLL: "✔ Detetado Caso LLL (Três Lados).",
      caseLAL: "✔ Detetado Caso LAL (Dois lados e o ângulo interno correspondente).",
      caseALA: "✔ Detetado Caso com 2 Ângulos e 1 Lado (ALA/AAL).",
      caseLLA: "✔ Detetado Caso LLA adaptado via Lei dos Senos.",
      logCosA: "Aplicando Lei dos Cossenos para o Ângulo A:",
      logCosB: "Aplicando Lei dos Cossenos para o Ângulo B:",
      logSideOp: "Calculando Lado oposto '{side}' via Lei dos Cossenos:",
      logDiffAng: "Por diferença angular (180° - A - B):",
      logSumInt: "Determinando ângulo oculto pela soma interna de 180°.",
      logUnifiedAng: "Ângulos unificados:",
      logCalcAngles: "Ângulos calculados:",
      logLawSine: "Aplicando proporcionalidade da Lei dos Senos para os Lados faltantes:",
      logSidesObt: "Lados obtidos:"
    },
    'en-US': {
      errCount: "Please enter exactly 3 values!",
      errNoSide: "At least one of the entered values must be a Side!",
      errGeo: "❌ Geometric error: The sum of any two sides must be greater than the third side (Triangle Inequality).",
      errImpossible: "❌ Impossible to construct a triangle with these values.",
      errComplex: "⚠ Complex combination. To obtain the full step-by-step layout, use SSS, SAS structures or provide 2 Angles.",
      caseLLL: "✔ Detected Case SSS (Three Sides).",
      caseLAL: "✔ Detected Case SAS (Two sides and the included internal angle).",
      caseALA: "✔ Detected Case with 2 Angles and 1 Side (ASA/AAS).",
      caseLLA: "✔ Detected Case SSA adapted via Law of Sines.",
      logCosA: "Applying Law of Cosines for Angle A:",
      logCosB: "Applying Law of Cosines for Angle B:",
      logSideOp: "Calculating opposite Side '{side}' via Law of Cosines:",
      logDiffAng: "By angular difference (180° - A - B):",
      logSumInt: "Determining hidden angle by internal sum of 180°.",
      logUnifiedAng: "Unified angles:",
      logCalcAngles: "Calculated angles:",
      logLawSine: "Applying Law of Sines proportionality for the missing Sides:",
      logSidesObt: "Sides obtained:"
    },
    'de-DE': {
      errCount: "Bitte geben Sie genau 3 Werte ein!",
      errNoSide: "Mindestens einer der eingegebenen Werte muss eine Seite sein!",
      errGeo: "❌ Geometrischer Fehler: Die Summe zweier Seiten muss größer als die dritte Seite sein (Dreiecksungleichung).",
      errImpossible: "❌ Mit diesen Werten kann kein Dreieck konstruiert werden.",
      errComplex: "⚠ Komplexe Kombination. Um den vollständigen Lösungsweg zu sehen, nutzen Sie SSS, SWS oder geben Sie 2 Winkel an.",
      caseLLL: "✔ Fall SSS (Drei Seiten) erkannt.",
      caseLAL: "✔ Fall SWS (Zwei Seiten und der eingeschlossene Innenwinkel) erkannt.",
      caseALA: "✔ Fall mit 2 Winkeln und 1 Seite (WSW/WWS) erkannt.",
      caseLLA: "✔ Fall SSW angepasst über den Sinussatz erkannt.",
      logCosA: "Anwendung des Kosinussatzes für Winkel A:",
      logCosB: "Anwendung des Kosinussatzes für Winkel B:",
      logSideOp: "Berechnung der gegenüberliegenden Seite '{side}' über den Kosinussatz:",
      logDiffAng: "Durch Winkeldifferenz (180° - A - B):",
      logSumInt: "Bestimmung des fehlenden Winkels durch Innenwinkelsumme von 180°.",
      logUnifiedAng: "Vereinte Winkel:",
      logCalcAngles: "Berechnete Winkel:",
      logLawSine: "Anwendung des Sinussatzes für die fehlenden Seiten:",
      logSidesObt: "Erhaltene Seiten:"
    },
    'ja-JP': {
      errCount: "正確に3つの値を入力してください！",
      errNoSide: "入力する値のうち、少なくとも1つは「辺の長さ」である必要があります！",
      errGeo: "❌ 幾何学的エラー：任意の2辺の和は、残りの1辺よりも大きくなければなりません（三角不等式）。",
      errImpossible: "❌ これらの値では三角形を構成できません。",
      errComplex: "⚠ 複雑な組み合わせです。詳細なステップ解説を得るには、SSS（3辺）、SAS（2辺と挟む角）の構造を使用するか、2つの角度を入力してください。",
      caseLLL: "✔ SSS条件（3辺の長さ）が検出されました。",
      caseLAL: "✔ SAS条件（2辺とその挟む角）が検出されました。",
      caseALA: "✔ 2角と1辺の条件（ASA/AAS条件）が検出されました。",
      caseLLA: "✔ 正弦定理を応用したSSA条件が検出されました。",
      logCosA: "角度 A に対する余弦定理の適用:",
      logCosB: "角度 B に対する余弦定理の適用:",
      logSideOp: "余弦定理による対辺 '{side}' の計算:",
      logDiffAng: "内角の差（180° - A - B）による算出:",
      logSumInt: "内角の和（180°）から未知の角度を決定します。",
      logUnifiedAng: "統一された角度:",
      logCalcAngles: "計算された角度:",
      logLawSine: "不足している辺に対する正弦定理の適用:",
      logSidesObt: "算出された辺の長さ:"
    }
  };

  const text = translations[currentLocale] || translations['pt-BR'];

  window.limparCamposTrig = function() {
    document.getElementById('trig-a').value = '';
    document.getElementById('trig-b').value = '';
    document.getElementById('trig-c').value = '';
    document.getElementById('trig-A').value = '';
    document.getElementById('trig-B').value = '';
    document.getElementById('trig-C').value = '';
    document.getElementById('trig-resultado-box').style.display = 'none';
  };

  window.resolverTriangulo = function() {
    let a = parseFloat(document.getElementById('trig-a').value);
    let b = parseFloat(document.getElementById('trig-b').value);
    let c = parseFloat(document.getElementById('trig-c').value);
    let A = parseFloat(document.getElementById('trig-A').value);
    let B = parseFloat(document.getElementById('trig-B').value);
    let C = parseFloat(document.getElementById('trig-C').value);

    const box = document.getElementById('trig-resultado-box');
    const logs = document.getElementById('trig-passo-a-passo');

    let ladosCount = (!isNaN(a) ? 1 : 0) + (!isNaN(b) ? 1 : 0) + (!isNaN(c) ? 1 : 0);
    let angulosCount = (!isNaN(A) ? 1 : 0) + (!isNaN(B) ? 1 : 0) + (!isNaN(C) ? 1 : 0);
    let totalCount = ladosCount + angulosCount;

    if (totalCount !== 3) {
      alert(text.errCount);
      return;
    }
    if (ladosCount === 0) {
      alert(text.errNoSide);
      return;
    }

    const toRad = deg => deg * (Math.PI / 180);
    const toDeg = rad => rad * (180 / Math.PI);
    let textoPasso = "";

    // CASO 1: LLL (Três lados conhecidos)
    if (ladosCount === 3) {
      if ((a + b <= c) || (a + c <= b) || (b + c <= a)) {
        logs.innerHTML = text.errGeo;
        box.style.display = 'flex';
        return;
      }
      textoPasso += `${text.caseLLL}\n`;
      textoPasso += `${text.logCosA}\n`;
      let cosA = (b * b + c * c - a * a) / (2 * b * c);
      A = toDeg(Math.acos(cosA));
      textoPasso += `cos(A) = (b² + c² - a²) / (2bc) ➔ A = ${A.toFixed(2)}°\n\n`;

      textoPasso += `${text.logCosB}\n`;
      let cosB = (a * a + c * c - b * b) / (2 * a * c);
      B = toDeg(Math.acos(cosB));
      textoPasso += `cos(B) = (a² + c² - b²) / (2ac) ➔ B = ${B.toFixed(2)}°\n\n`;

      C = 180 - A - B;
      textoPasso += `${text.logDiffAng} C = ${C.toFixed(2)}°`;
    }
    // CASO 2: LAL (Dois lados e o ângulo central conhecido)
    else if ((!isNaN(a) && !isNaN(b) && !isNaN(C)) || (!isNaN(a) && !isNaN(c) && !isNaN(B)) || (!isNaN(b) && !isNaN(c) && !isNaN(A))) {
      textoPasso += `${text.caseLAL}\n`;
      if (!isNaN(b) && !isNaN(c) && !isNaN(A)) {
        textoPasso += `${text.logSideOp.replace('{side}', 'a')}\n`;
        a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(toRad(A)));
        textoPasso += `a² = b² + c² - 2bc·cos(A) ➔ a = ${a.toFixed(2)}\n\n`;
        let cosB = (a * a + c * c - b * b) / (2 * a * c); B = toDeg(Math.acos(cosB));
        C = 180 - A - B;
      } else if (!isNaN(a) && !isNaN(c) && !isNaN(B)) {
        textoPasso += `${text.logSideOp.replace('{side}', 'b')}\n`;
        b = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(toRad(B)));
        textoPasso += `b² = a² + c² - 2ac·cos(B) ➔ b = ${b.toFixed(2)}\n\n`;
        let cosA = (b * b + c * c - a * a) / (2 * b * c); A = toDeg(Math.acos(cosA));
        C = 180 - A - B;
      } else {
        textoPasso += `${text.logSideOp.replace('{side}', 'c')}\n`;
        c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(C)));
        textoPasso += `c² = a² + b² - 2ab·cos(C) ➔ c = ${c.toFixed(2)}\n\n`;
        let cosA = (b * b + c * c - a * a) / (2 * b * c); A = toDeg(Math.acos(cosA));
        B = 180 - A - C;
      }
      textoPasso += `${text.logCalcAngles} A = ${A.toFixed(2)}°, B = ${B.toFixed(2)}°, C = ${C.toFixed(2)}°`;
    }
    // CASO 3: Dois Ângulos e um Lado (ALA / AAL)
    else if (angulosCount === 2 && ladosCount === 1) {
      textoPasso += `${text.caseALA}\n`;
      if (isNaN(A)) { A = 180 - B - C; }
      else if (isNaN(B)) { B = 180 - A - C; }
      else if (isNaN(C)) { C = 180 - A - B; }
      
      textoPasso += `${text.logSumInt}\n`;
      textoPasso += `${text.logUnifiedAng} A = ${A.toFixed(2)}°, B = ${B.toFixed(2)}°, C = ${C.toFixed(2)}°\n\n`;
      textoPasso += `${text.logLawSine}\n`;

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
      textoPasso += `${text.logSidesObt} a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`;
    }
    // CASO 4: Caso Ambigúo / LLA Adaptado
    else {
      textoPasso += `${text.caseLLA}\n`;
      if (!isNaN(a) && !isNaN(b) && !isNaN(A)) {
        let sinB = (Math.sin(toRad(A)) * b) / a;
        if (sinB > 1) { 
          logs.textContent = text.errImpossible; 
          box.style.display = 'flex'; 
          return; 
        }
        B = toDeg(Math.asin(sinB)); C = 180 - A - B;
        c = a * Math.sin(toRad(C)) / Math.sin(toRad(A));
      } else {
        logs.textContent = text.errComplex;
        box.style.display = 'flex';
        return;
      }
    }

    // Área e Perímetro
    let s = (a + b + c) / 2;
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    let perimetro = a + b + c;

    // Atualização dos nós do DOM
    document.getElementById('trig-a').value = a.toFixed(2);
    document.getElementById('trig-b').value = b.toFixed(2);
    document.getElementById('trig-c').value = c.toFixed(2);
    document.getElementById('trig-A').value = A.toFixed(2);
    document.getElementById('trig-B').value = B.toFixed(2);
    document.getElementById('trig-C').value = C.toFixed(2);

    // Formatação regionalizada de milhares
    document.getElementById('res-perimetro').textContent = perimetro.toLocaleString(currentLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('res-area').textContent = area.toLocaleString(currentLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    logs.textContent = textoPasso;
    box.style.display = 'flex';
  };
})();