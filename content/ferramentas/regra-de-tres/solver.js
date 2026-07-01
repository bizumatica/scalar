(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    let mode = 'simple';

    const els = {
      btnS: document.getElementById('mode-simple'),
      btnC: document.getElementById('mode-compound'),
      rowC: document.getElementById('row-compound'),
      resX: document.getElementById('result-x'),
      // Inputs e Selects
      a1: document.getElementById('val-a1'), a2: document.getElementById('val-a2'), tA: document.getElementById('type-a'),
      b1: document.getElementById('val-b1'),
      c1: document.getElementById('val-c1'), c2: document.getElementById('val-c2'), tC: document.getElementById('type-c')
    };

    // Aborta silenciosamente se os elementos não estiverem no layout renderizado pelo Hugo
    if (!els.btnS || !els.btnC || !els.rowC || !els.resX || !els.a1 || !els.a2 || !els.b1) return;

    // 🌍 Captura dinâmica de idioma para formatação internacional
    const currentLang = document.documentElement.lang || 'pt';
    const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    // Formatador internacional inteligente limitado a 4 casas decimais
    const formatter = new Intl.NumberFormat(currentLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
      useGrouping: true
    });

    function parseVal(input) {
      if (!input || !input.value) return NaN;
      // Normaliza a vírgula de mercados PT/DE para ponto flutuante válido em JS
      let normalized = input.value.replace(',', '.').trim();
      return parseFloat(normalized);
    }

    function calculate() {
      // Sanitização em tempo real das caixas de entrada de texto
      const inputsParaSanitizar = [els.a1, els.a2, els.b1, els.c1, els.c2];
      inputsParaSanitizar.forEach(inp => {
        if (inp) {
          let raw = inp.value;
          let clean = raw.replace(/[^0-9.,-]/g, '');
          if (raw !== clean) inp.value = clean;
        }
      });

      const a1 = parseVal(els.a1);
      const a2 = parseVal(els.a2);
      const b1 = parseVal(els.b1);

      // Bloqueio de segurança aritmético
      if (isNaN(a1) || isNaN(a2) || isNaN(b1) || a1 === 0 || a2 === 0) {
        els.resX.innerText = "?";
        els.resX.style.color = "#fff";
        return;
      }

      // Razão da Grandeza A em relação à B
      // Se Direta: x = b1 * (a2/a1) | Se Inversa: x = b1 * (a1/a2)
      const ratioA = (els.tA.value === 'dir') ? (a2 / a1) : (a1 / a2);
      
      let result = b1 * ratioA;

      // Tratamento complementar para o modo Composto (Grandeza C)
      if (mode === 'compound') {
        const c1 = parseVal(els.c1);
        const c2 = parseVal(els.c2);

        if (!isNaN(c1) && !isNaN(c2) && c1 !== 0 && c2 !== 0) {
          const ratioC = (els.tC.value === 'dir') ? (c2 / c1) : (c1 / c2);
          result = result * ratioC;
        } else {
          // Mantém o placeholder neutro de espera caso C esteja parcial ou inválido
          els.resX.innerText = "?";
          els.resX.style.color = "#fff";
          return;
        }
      }

      // Impressão limpa formatada
      if (isFinite(result)) {
        els.resX.innerText = formatter.format(result);
        els.resX.style.color = "#60a5fa"; // Feedback visual de sucesso (Azul)
      } else {
        els.resX.innerText = "?";
        els.resX.style.color = "#fff";
      }
    }

    // Gerenciador de alternância visual de Abas (Modos)
    function switchMode(m) {
      mode = m;
      const active = m === 'simple' ? els.btnS : els.btnC;
      const inactive = m === 'simple' ? els.btnC : els.btnS;

      active.style.background = '#3b82f6';
      active.style.color = 'white';
      inactive.style.background = 'transparent';
      inactive.style.color = '#94a3b8';
      
      if (els.rowC) {
        els.rowC.style.display = m === 'simple' ? 'none' : 'grid';
      }
      calculate();
    }

    // Atribuição segura dos eventos nos botões de modo
    els.btnS.onclick = (e) => { e.preventDefault(); switchMode('simple'); };
    els.btnC.onclick = (e) => { e.preventDefault(); switchMode('compound'); };

    // Observadores unificados (input para digitação, change para os combos selects)
    const inputs = [els.a1, els.a2, els.b1, els.c1, els.c2];
    inputs.forEach(inEl => {
      if (inEl) inEl.addEventListener('input', calculate);
    });

    const selects = [els.tA, els.tC];
    selects.forEach(selEl => {
      if (selEl) {
        selEl.addEventListener('change', calculate);
        selEl.addEventListener('input', calculate); // Fallback móvel secundário
      }
    });

    // Força execução inicial de limpeza estrutural
    switchMode('simple');
  });
})();