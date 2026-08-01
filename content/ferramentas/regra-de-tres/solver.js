/**
 * Scalar Engine - Solver de Regra de Três Simples e Composta
 * Processamento Matemático Proporcional e Internacionalização Dinâmica
 * Autor: Julio Prata & Scalar Team
 */
(function () {
  'use strict';

  function initRuleOfThreeSolver() {
    const card = document.getElementById('r3-tool-card');
    if (!card) return;

    let currentMode = 'simple';

    const els = {
      btnS: document.getElementById('mode-simple'),
      btnC: document.getElementById('mode-compound'),
      btnClear: document.getElementById('btn-clear-r3'),
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
    const rawLang = card.dataset.lang || document.documentElement.lang || window.navigator.language || 'pt';
    const normalizedLang = rawLang.toLowerCase();

    const localeMap = {
      'pt': 'pt-BR', 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT',
      'en': 'en-US', 'en-us': 'en-US', 'en-gb': 'en-GB',
      'de': 'de-DE', 'de-de': 'de-DE',
      'es': 'es-ES', 'fr': 'fr-FR', 'ja': 'ja-JP'
    };
    const currentLocale = localeMap[normalizedLang] || 'pt-BR';

    const formatter = new Intl.NumberFormat(currentLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
      useGrouping: true
    });

    /**
     * Sanitizador e Parser numérico com suporte a ponto/vírgula decimal
     */
    function parseValue(inputElement) {
      if (!inputElement || !inputElement.value) return NaN;
      
      let raw = inputElement.value.trim().replace(',', '.');
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
      if (errorMessage && errorMessage !== '?') {
        els.resX.className = "w-full bg-red-950/40 border border-red-500/80 text-red-400 p-2.5 rounded-lg font-mono min-h-[42px] flex items-center justify-center font-bold text-sm shadow-inner transition-colors text-center";
      } else {
        els.resX.className = "w-full bg-blue-950/50 border border-blue-500/50 text-white p-2.5 rounded-lg font-mono min-h-[42px] flex items-center justify-center font-extrabold text-xl shadow-inner transition-colors";
      }
    }

    /**
     * Motor de Cálculo Principal
     */
    function calculate() {
      const a1 = parseValue(els.a1);
      const a2 = parseValue(els.a2);
      const b1 = parseValue(els.b1);

      // Se nenhum campo for preenchido, mantém estado neutro '?'
      if (isNaN(a1) && isNaN(a2) && isNaN(b1)) {
        resetResult('?');
        return;
      }

      // Preenchimento parcial incompleto
      if (isNaN(a1) || isNaN(a2) || isNaN(b1)) {
        resetResult('?');
        return;
      }

      // Validação de Divisão por Zero na Proporção A
      const isDirA = els.tA.value === 'dir';
      if ((isDirA && a1 === 0) || (!isDirA && a2 === 0)) {
        const errDivZeroMsg = card.getAttribute('data-err-div-zero') || 'Erro: Divisão por Zero';
        resetResult(errDivZeroMsg);
        return;
      }

      const ratioA = isDirA ? (a2 / a1) : (a1 / a2);
      let result = b1 * ratioA;

      // Cálculo no Modo Composto (Grandeza C)
      if (currentMode === 'compound') {
        const c1 = parseValue(els.c1);
        const c2 = parseValue(els.c2);

        if (isNaN(c1) || isNaN(c2)) {
          resetResult('?');
          return;
        }

        const isDirC = els.tC.value === 'dir';
        if ((isDirC && c1 === 0) || (!isDirC && c2 === 0)) {
          const errDivZeroMsg = card.getAttribute('data-err-div-zero') || 'Erro: Divisão por Zero';
          resetResult(errDivZeroMsg);
          return;
        }

        const ratioC = isDirC ? (c2 / c1) : (c1 / c2);
        result *= ratioC;
      }

      // Validação final e exibição do resultado formatado
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

      els.btnS.className = isSimple
        ? 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-blue-600 text-white shadow-lg shadow-blue-500/20 cursor-pointer'
        : 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-transparent text-slate-400 hover:text-slate-200 cursor-pointer';

      els.btnC.className = !isSimple
        ? 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-blue-600 text-white shadow-lg shadow-blue-500/20 cursor-pointer'
        : 'flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 bg-transparent text-slate-400 hover:text-slate-200 cursor-pointer';

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

    /**
     * Limpa e reseta todos os inputs
     */
    function clearAll() {
      els.a1.value = '';
      els.a2.value = '';
      els.b1.value = '';
      els.c1.value = '';
      els.c2.value = '';
      els.tA.value = 'dir';
      els.tC.value = 'dir';
      resetResult('?');
    }

    // Registradores de Eventos
    els.btnS.addEventListener('click', (e) => { e.preventDefault(); setMode('simple'); });
    els.btnC.addEventListener('click', (e) => { e.preventDefault(); setMode('compound'); });
    if (els.btnClear) els.btnClear.addEventListener('click', clearAll);

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRuleOfThreeSolver);
  } else {
    initRuleOfThreeSolver();
  }
})();