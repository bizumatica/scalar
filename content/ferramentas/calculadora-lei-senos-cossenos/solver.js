/**
 * Engine Trigonométrica Completa - Lei dos Senos e Cossenos
 * Padronização $O(1)$ i18n - Project Scalar
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

    if (!inputA || !btnCalc) return;

    // Conexão i18n universal $O(1)$
    const dict = window.getSolverDict ? window.getSolverDict('trig-tool-container') : {};
    const lang = (container.getAttribute('data-lang') || 'pt-br').toLowerCase();

    const rad = deg => (deg * Math.PI) / 180;
    const deg = rad => (rad * 180) / Math.PI;

    function parseVal(el) {
      if (!el || !el.value) return null;
      const clean = el.value.replace(',', '.').trim();
      const val = parseFloat(clean);
      return isNaN(val) || val <= 0 ? null : val;
    }

    function showError(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.remove('hidden');
      if (resultBox) {
        resultBox.classList.add('hidden');
        resultBox.classList.remove('flex');
      }
    }

    function clearError() {
      if (!errorBox) return;
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
        showError(dict.err3vals || "Insira exatamente 3 valores.");
        return;
      }

      if (countSides === 0) {
        showError(dict.errneedside || "Pelo menos um dos valores deve ser um Lado.");
        return;
      }

      let log = "";

      // CASO 1: LLL
      if (countSides === 3) {
        if (a + b <= c || a + c <= b || b + c <= a) {
          showError(dict.errtriangleineq || "Erro Geométrico.");
          return;
        }
        log += (dict.caselll || "Caso Detectado: LLL") + "\n\n";
        A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
        B = deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
        C = 180 - A - B;

        log += `• cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c}) ➔ A = ${fmt(A)}°\n`;
        log += `• cos(B) = (${a}² + ${c}² - ${b}²) / (2 × ${a} × ${c}) ➔ B = ${fmt(B)}°\n`;
        log += `• C = 180° - A - B ➔ C = ${fmt(C)}°`;
      } 
      // CASO 2: ALA / AAL
      else if (countAngles === 2) {
        const sumGiven = (A || 0) + (B || 0) + (C || 0);
        if (sumGiven >= 180) {
          showError(dict.errsumangles || "A soma deve ser < 180°.");
          return;
        }
        log += (dict.caseala || "Caso Detectado: ALA / AAL") + "\n\n";
        if (!A) A = 180 - B - C;
        if (!B) B = 180 - A - C;
        if (!C) C = 180 - A - B;

        const ratio = a ? a / Math.sin(rad(A)) : (b ? b / Math.sin(rad(B)) : c / Math.sin(rad(C)));
        a = ratio * Math.sin(rad(A));
        b = ratio * Math.sin(rad(B));
        c = ratio * Math.sin(rad(C));

        log += `• A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°\n`;
        log += `• Lados: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}`;
      } 
      // CASO 3 & 4: LAL ou LLA
      else if (countSides === 2 && countAngles === 1) {
        if ((a && b && C) || (a && c && B) || (b && c && A)) {
          log += (dict.caselal || "Caso Detectado: LAL") + "\n\n";
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
          log += `• Lados: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}\n`;
          log += `• Ângulos: A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°`;
        } else {
          log += (dict.casella || "Caso Detectado: LLA") + "\n\n";
          let sideOpp, angOpp, sideOther;

          if (a && A) { sideOpp = a; angOpp = A; sideOther = b || c; }
          else if (b && B) { sideOpp = b; angOpp = B; sideOther = a || c; }
          else if (c && C) { sideOpp = c; angOpp = C; sideOther = a || b; }

          let sinCalc = (sideOther * Math.sin(rad(angOpp))) / sideOpp;
          if (sinCalc > 1 && sinCalc < 1.00001) sinCalc = 1;

          if (sinCalc > 1) {
            showError(dict.errimpossible || "Impossível construir triângulo.");
            return;
          }

          const calculatedAngle = deg(Math.asin(sinCalc));

          if (a && b && A) { B = calculatedAngle; C = 180 - A - B; c = (a * Math.sin(rad(C))) / Math.sin(rad(A)); }
          else if (a && c && A) { C = calculatedAngle; B = 180 - A - C; b = (a * Math.sin(rad(B))) / Math.sin(rad(A)); }
          else if (b && a && B) { A = calculatedAngle; C = 180 - A - B; c = (b * Math.sin(rad(C))) / Math.sin(rad(B)); }
          else if (b && c && B) { C = calculatedAngle; A = 180 - B - C; a = (b * Math.sin(rad(A))) / Math.sin(rad(B)); }
          else if (c && a && C) { A = calculatedAngle; B = 180 - A - C; b = (c * Math.sin(rad(B))) / Math.sin(rad(C)); }
          else if (c && b && C) { B = calculatedAngle; A = 180 - A - B; a = (c * Math.sin(rad(A))) / Math.sin(rad(C)); }

          log += `• Lados: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}\n`;
          log += `• Ângulos: A = ${fmt(A)}°, B = ${fmt(B)}°, C = ${fmt(C)}°`;
        }
      }

      // Atualiza visualização sem reescrever o value dos inputs (mantém a experiência limpa)
      const perimetro = a + b + c;
      const s = perimetro / 2;
      const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));

      resPerimetro.textContent = fmt(perimetro);
      resArea.textContent = fmt(area);
      txtPasso.textContent = log;

      resultBox.classList.remove('hidden');
      resultBox.classList.add('flex');
    }

    function limpar() {
      clearError();
      [inputA, inputB, inputC, inputAngA, inputAngB, inputAngC].forEach(el => {
        if (el) el.value = '';
      });
      if (resultBox) {
        resultBox.classList.add('hidden');
        resultBox.classList.remove('flex');
      }
    }

    btnCalc.addEventListener('click', resolver);
    btnClear.addEventListener('click', limpar);
  });
})();