/**
 * Scalar Engine - Solver de Regra de Três Simples e Composta
 * Autor: Julio Prata
 * Desempenho Zero-Overhead / Pure Vanilla JS
 */
(function () {
  'use strict';

  function initRuleOfThreeSolver() {
    const card = document.getElementById('r3-tool-card');
    if (!card) return; // Fail-fast se o componente não estiver na página

    let currentMode = 'simple';

    const els = {
      btnS: document.getElementById('mode-simple'),
      btnC: document.getElementById('mode-compound'),
      rowC: document.getElementById('row-compound'),
      resX: document.getElementById('result-x'),
      a1: document.getElementById('val-a1'),
      a2: document.getElementById('val-a2'),
      tA: document.getElementById('type-a'),
      b1: document.getElementById('val-b1'),
      c1: document.getElementById('val-c1'),
      c2: document.getElementById('val-c2'),
      tC: document.getElementById('type-c')
    };

    // Mapeamento dinâmico de internacionalização
    const lang = card.dataset.lang || document.documentElement.lang || 'pt';
    const localeMap = { pt: 'pt-BR', de: 'de-DE', ja: 'ja-JP', en: 'en-US' };
    const currentLocale = localeMap[lang] || 'pt-BR';

    const formatter = new Intl.NumberFormat(currentLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
      useGrouping: true
    });

    /**
     * Sanitizador e Parser numérico seguro
     * Converte vírgula para ponto e bloqueia NaN sem afetar o cursor do input
     */
    function parseValue(inputElement) {
      if (!inputElement || !inputElement.value) return NaN;
      
      let raw = inputElement.value.trim().replace(',', '.');
      // Trata caso onde o usuário digita múltiplos pontos
      const parts = raw.split('.');
      if (parts.length > 2) {
        raw = parts[0] + '.' + parts.slice(1).join('');
      }

      const val = parseFloat(raw);
      return isNaN(val) ? NaN : val;
    }

    /**
     * Resets do estado de exibição do resultado (X)
     */
    function resetResult(errorMessage) {
      els.resX.textContent = errorMessage || '?';
      els.resX.className = "w-full bg-blue-950/50 border border-blue-500/50 text-white p-2.5 rounded-lg font-mono min-h-[42px] flex items-center justify-center font-extrabold text-xl shadow-inner transition-colors";
    }

    /**
     * Motor de Cálculo Principal
     */
    function calculate() {
      const a1 = parseValue(els.a1);
      const a2 = parseValue(els.a2);
      const b1 = parseValue(els.b1);

      // Validação de presença e divisão por zero
      if (isNaN(a1) || isNaN(a2) || isNaN(b1) || a1 === 0 || a2 === 0) {
        resetResult('?');
        return;
      }

      // Proporção da Grandeza A em relação a X
      const ratioA = (els.tA.value === 'dir') ? (a2 / a1) : (a1 / a2);
      let result = b1 * ratioA;

      // Cálculo no Modo Composto (Grandeza C)
      if (currentMode === 'compound') {
        const c1 = parseValue(els.c1);
        const c2 = parseValue(els.c2);

        if (isNaN(c1) || isNaN(c2) || c1 === 0 || c2 === 0) {
          resetResult('?');
          return;
        }

        const ratioC = (els.tC.value === 'dir') ? (c2 / c1) : (c1 / c2);
        result *= ratioC;
      }

      // Validação final e exibição
      if (isFinite(result)) {
        els.resX.textContent = formatter.format(result);
        els.resX.className = "w-full bg-emerald-950/40 border border-emerald-500 text-emerald-400 p-2.5 rounded-lg font-mono min-h-[42px] flex items-center justify-center font-extrabold text-xl shadow-inner transition-colors";
      } else {
        resetResult('Erro');
      }
    }

    /**
     * Gerenciador do Estado da UI (Tabs)
     */
    function setMode(mode) {
      currentMode = mode;
      const isSimple = mode === 'simple';

      // Estilização das abas via utilitários do Tailwind
      els.btnS.className = isSimple
        ? 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
        : 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-transparent text-slate-400 hover:text-slate-200';

      els.btnC.className = !isSimple
        ? 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
        : 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-transparent text-slate-400 hover:text-slate-200';

      // Alterna exibição da linha adicional
      if (els.rowC) {
        if (isSimple) {
          els.rowC.classList.add('hidden');
          els.rowC.classList.remove('grid');
        } else {
          els.rowC.classList.remove('hidden');
          els.rowC.classList.add('grid');
        }
      }

      calculate();
    }

    // Registra Event Listeners sem acoplamento inline
    els.btnS.addEventListener('click', (e) => { e.preventDefault(); setMode('simple'); });
    els.btnC.addEventListener('click', (e) => { e.preventDefault(); setMode('compound'); });

    const watchList = [els.a1, els.a2, els.b1, els.c1, els.c2, els.tA, els.tC];
    watchList.forEach(element => {
      if (element) {
        element.addEventListener('input', calculate);
        element.addEventListener('change', calculate);
      }
    });

    // Inicialização
    setMode('simple');
  }

  // Suporte a carregamento assíncrono ou diferido (defer)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRuleOfThreeSolver);
  } else {
    initRuleOfThreeSolver();
  }
})();