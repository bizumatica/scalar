/**
 * Engine Trigonométrica Completa - Lei dos Senos e Cossenos
 * Cobertura Total de Casos: SSS, SAS, ASA/AAS, SSA (com tratamento do caso ambíguo universal).
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('trig-tool-container');
    if (!container) return;

    const inputA = document.getElementById('trig-a');
    const inputB = document.getElementById('trig-b');
    const inputC = document.getElementById('trig-c');
    const inputAngA = document.getElementById('trig-A');
    const inputAngB = document.getElementById('trig-B');
    const inputAngC = document.getElementById('trig-C');

    const btnCalc = document.getElementById('trig-btn-calc');
    const btnClear = document.getElementById('trig-btn-clear');

    const errorBox = document.getElementById('trig-error-box');
    const resultBox = document.getElementById('trig-resultado-box');
    const resPerimetro = document.getElementById('res-perimetro');
    const resArea = document.getElementById('res-area');
    const txtPasso = document.getElementById('trig-passo-a-passo');

    const lang = (container.getAttribute('data-lang') || 'pt-br').toLowerCase();

    const i18n = {
      'pt-br': {
        err3Vals: "Erro: Insira exatamente 3 valores conhecidos.",
        errNeedSide: "Erro: Pelo menos um dos valores inseridos deve ser um Lado.",
        errSumAngles: "Erro: A soma dos ângulos fornecidos deve ser estritamente menor que 180°.",
        errTriangleIneq: "Erro Geométrico: A soma de dois lados deve ser maior que o terceiro (Desigualdade Triangular).",
        errImpossible: "Erro Geométrico: Impossível construir um triângulo válido com estes dados.",
        caseLLL: "✔ Caso Detectado: LLL (Três Lados Conhecidos).\n",
        caseLAL: "✔ Caso Detectado: LAL (Dois Lados e Ângulo Compreendido).\n",
        caseALA: "✔ Caso Detectado: ALA / AAL (Dois Ângulos e Um Lado).\n",
        caseLLA: "✔ Caso Detectado: LLA (Dois Lados e Ângulo Oposto via Lei dos Senos).\n"
      },
      'en': {
        err3Vals: "Error: Please enter exactly 3 known values.",
        errNeedSide: "Error: At least one of the entered values must be a Side.",
        errSumAngles: "Error: The sum of given angles must be strictly less than 180°.",
        errTriangleIneq: "Geometric Error: The sum of any two sides must be greater than the third side.",
        errImpossible: "Geometric Error: Impossible to construct a valid triangle with given parameters.",
        caseLLL: "✔ Detected Case: SSS (Three Known Sides).\n",
        caseLAL: "✔ Detected Case: SAS (Two Sides & Included Angle).\n",
        caseALA: "✔ Detected Case: ASA / AAS (Two Angles & One Side).\n",
        caseLLA: "✔ Detected Case: SSA (Two Sides & Opposite Angle via Law of Sines).\n"
      }
    };

    const dict = i18n[lang] || i18n['pt-br'];

    const rad = deg => (deg * Math.PI) / 180;
    const deg = rad => (rad * 180) / Math.PI;

    function parseVal(el) {
      if (!el || !el.value) return null;
      const clean = el.value.replace(',', '.').trim();
      const val = parseFloat(clean);
      return isNaN(val) || val <= 0 ? null : val;
    }

    function showError(msg) {
      errorBox.textContent = msg;
      errorBox.classList.remove('hidden');
      resultBox.classList.add('hidden');
      resultBox.classList.remove('flex');
    }

    function clearError() {
      errorBox.textContent = '';
      errorBox.classList.add('hidden');
    }

    function fmt(val) {
      return parseFloat(val.toFixed(4)).toLocaleString(lang.includes('pt') ? 'pt-BR' : 'en-US');
    }

    function resolver() {
      clearError();

      let a = parseVal(inputA);
      let b = parseVal(inputB);
      let c = parseVal(inputC);
      let A = parseVal(inputAngA);
      let B = parseVal(inputAngB);
      let C = parseVal(inputAngC);

      const countSides = (a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0);
      const countAngles = (A ? 1 : 0) + (B ? 1 : 0) + (C ? 1 : 0);
      const totalCount = countSides + countAngles;

      if (totalCount !== 3) {
        showError(dict.err3Vals);
        return;
      }

      if (countSides === 0) {
        showError(dict.errNeedSide);
        return;
      }

      let log = "";

      // -----------------------------------------------------------------
      // CASO 1: LLL (3 Lados)
      // -----------------------------------------------------------------
      if (countSides === 3) {
        if (a + b <= c || a + c <= b || b + c <= a) {
          showError(dict.errTriangleIneq);
          return;
        }
        log += dict.caseLLL;
        A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
        B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
        C = 180 - A - B;

        log += `• Lei dos Cossenos para Ângulo A:\n  cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c}) ➔ A = ${fmt(A)}°\n\n`;
        log += `• Lei dos Cossenos para Ângulo B:\n  cos(B) = (${a}² + ${c}² - ${b}²) / (2 × ${a} × ${c}) ➔ B = ${fmt(B)}°\n\n`;
        log += `• Diferença Angular:\n  C = 180° - A - B ➔ C = ${fmt(C)}°`;
      } 
      // -----------------------------------------------------------------
      // CASO 2: ALA / AAL (2 Ângulos e 1 Lado)
      // -----------------------------------------------------------------
      else if (countAngles === 2) {
        const sumGiven = (A || 0) + (B || 0) + (C || 0);
        if (sumGiven >= 180) {
          showError(dict.errSumAngles);
          return;
        }
        log += dict.caseALA;
        if (!A) A = 180 - B - C;
        if (!B) B = 180 - A - C;
        if (!C) C = 180 - A - B;

        const ratio = a ? a / Math.sin(rad(A)) : (b ? b / Math.sin(rad(B)) : c / Math.sin(rad(C)));
        a = ratio * Math.sin(rad(A));
        b = ratio * Math.sin(rad(B));
        c = ratio * Math.sin(rad(C));

        log += `• Soma dos Ângulos Internos = 180°:\n  A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°\n\n`;
        log += `• Lei dos Senos (Proporção Projeção):\n  a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}`;
      } 
      // -----------------------------------------------------------------
      // CASO 3 & 4: 2 Lados e 1 Ângulo (LAL ou LLA)
      // -----------------------------------------------------------------
      else if (countSides === 2 && countAngles === 1) {
        // Subcaso LAL (Ângulo entre os dois lados)
        if ((a && b && C) || (a && c && B) || (b && c && A)) {
          log += dict.caseLAL;
          if (C) {
            c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
            A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
            B = 180 - A - C;
          } else if (B) {
            b = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(rad(B)));
            A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
            C = 180 - A - B;
          } else if (A) {
            a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad(A)));
            B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
            C = 180 - A - B;
          }
          log += `• Lei dos Cossenos para o 3º Lado:\n  Lados: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}\n\n`;
          log += `• Ângulos Derivados:\n  A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°`;
        } 
        // Subcaso LLA Universal (Ângulo Oposto a um dos Lados)
        else {
          log += dict.caseLLA;
          let sideOpp, angOpp, sideOther;

          if (a && A) { sideOpp = a; angOpp = A; sideOther = b || c; }
          else if (b && B) { sideOpp = b; angOpp = B; sideOther = a || c; }
          else if (c && C) { sideOpp = c; angOpp = C; sideOther = a || b; }

          let sinCalc = (sideOther * Math.sin(rad(angOpp))) / sideOpp;
          
          if (sinCalc > 1 && sinCalc < 1.00001) sinCalc = 1; // Tolerância de Ponto Flutuante

          if (sinCalc > 1) {
            showError(dict.errImpossible);
            return;
          }

          const calculatedAngle = deg(Math.asin(sinCalc));

          if (a && b && A) { B = calculatedAngle; C = 180 - A - B; c = (a * Math.sin(rad(C))) / Math.sin(rad(A)); }
          else if (a && c && A) { C = calculatedAngle; B = 180 - A - C; b = (a * Math.sin(rad(B))) / Math.sin(rad(A)); }
          else if (b && a && B) { A = calculatedAngle; C = 180 - A - B; c = (b * Math.sin(rad(C))) / Math.sin(rad(B)); }
          else if (b && c && B) { C = calculatedAngle; A = 180 - B - C; a = (b * Math.sin(rad(A))) / Math.sin(rad(B)); }
          else if (c && a && C) { A = calculatedAngle; B = 180 - A - C; b = (c * Math.sin(rad(B))) / Math.sin(rad(C)); }
          else if (c && b && C) { B = calculatedAngle; A = 180 - A - B; a = (c * Math.sin(rad(A))) / Math.sin(rad(C)); }

          log += `• Lei dos Senos para Ângulo Oposto:\n  sin(X) = (${sideOther} × sin(${angOpp}°)) / ${sideOpp}\n\n`;
          log += `• Resultados Obtidos:\n  Lados: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}\n  Ângulos: A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°`;
        }
      }

      // Atualização dos inputs
      inputA.value = fmt(a);
      inputB.value = fmt(b);
      inputC.value = fmt(c);
      inputAngA.value = fmt(A);
      inputAngB.value = fmt(B);
      inputAngC.value = fmt(C);

      // Métricas Finais
      const perimetro = a + b + c;
      const s = perimetro / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      resPerimetro.textContent = fmt(perimetro);
      resArea.textContent = fmt(area);
      txtPasso.textContent = log;

      resultBox.classList.remove('hidden');
      resultBox.classList.add('flex');
    }

    function limpar() {
      clearError();
      [inputA, inputB, inputC, inputAngA, inputAngB, inputAngC].forEach(el => el.value = '');
      resultBox.classList.add('hidden');
      resultBox.classList.remove('flex');
    }

    btnCalc.addEventListener('click', resolver);
    btnClear.addEventListener('click', limpar);
  });
})();