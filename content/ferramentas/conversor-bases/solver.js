/**
 * Scalar Engine - Conversor de Bases Numéricas Multi-Base (2 a 36)
 * Suporte a inteiros extensos via BigInt para precisão em Engenharia/AdTech
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('base-converter-container');
    if (!container) return;

    const inputDec = document.getElementById('base-dec');
    const inputBin = document.getElementById('base-bin');
    const inputHex = document.getElementById('base-hex');
    const inputOct = document.getElementById('base-oct');
    const inputCustom = document.getElementById('base-custom-num');
    const selectCustomBase = document.getElementById('base-custom-sel');
    const btnClear = document.getElementById('base-btn-clear');

    // Tabela completa de numeração até a Base 36
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

    /**
     * Sanitiza a string removendo caracteres que não pertencem à base.
     */
    function sanitizeForBase(str, base) {
      if (!str) return '';
      const allowedDigits = ALPHABET.slice(0, base);
      const regex = new RegExp(`[^${allowedDigits}]`, 'gi');
      return str.replace(regex, '');
    }

    /**
     * Converte uma string genérica em uma dada base para BigInt sem estouro IEEE 754.
     */
    function parseToBigInt(str, base) {
      if (!str) return null;
      const clean = str.toLowerCase();
      
      try {
        let result = 0n;
        const b = BigInt(base);
        for (let i = 0; i < clean.length; i++) {
          const char = clean[i];
          const digitValue = BigInt(ALPHABET.indexOf(char));
          if (digitValue < 0n || digitValue >= b) return null;
          result = result * b + digitValue;
        }
        return result;
      } catch (e) {
        return null;
      }
    }

    /**
     * Converte um valor BigInt para uma string em qualquer base (2 a 36).
     */
    function bigIntToString(bigintVal, base) {
      if (bigintVal === null || bigintVal === undefined) return '';
      if (bigintVal === 0n) return '0';

      let num = bigintVal;
      let result = '';
      const b = BigInt(base);

      while (num > 0n) {
        const remainder = Number(num % b);
        result = ALPHABET[remainder] + result;
        num = num / b;
      }

      return result;
    }

    /**
     * Atualiza dinamicamente todos os inputs exceto aquele que disparou o evento.
     */
    function updateAllFields(sourceInput, base) {
      const rawValue = sourceInput.value.trim();
      const sanitized = sanitizeForBase(rawValue, base);
      
      // Ajusta o valor se houver caracteres inválidos digitados
      if (sourceInput.value !== sanitized) {
        sourceInput.value = sanitized;
      }

      if (!sanitized) {
        clearAllInputs();
        return;
      }

      const decimalValue = parseToBigInt(sanitized, base);

      if (decimalValue === null) return;

      // Sincronização e formatação dos campos remanescentes
      if (sourceInput !== inputDec) inputDec.value = bigIntToString(decimalValue, 10);
      if (sourceInput !== inputBin) inputBin.value = bigIntToString(decimalValue, 2);
      if (sourceInput !== inputHex) inputHex.value = bigIntToString(decimalValue, 16).toUpperCase();
      if (sourceInput !== inputOct) inputOct.value = bigIntToString(decimalValue, 8);
      
      const customBase = parseInt(selectCustomBase.value, 10);
      if (sourceInput !== inputCustom) {
        const resCustom = bigIntToString(decimalValue, customBase);
        inputCustom.value = customBase > 10 ? resCustom.toUpperCase() : resCustom;
      }
    }

    function clearAllInputs() {
      if (inputDec) inputDec.value = '';
      if (inputBin) inputBin.value = '';
      if (inputHex) inputHex.value = '';
      if (inputOct) inputOct.value = '';
      if (inputCustom) inputCustom.value = '';
    }

    // Registra os escutadores de evento reativos
    if (inputDec) inputDec.addEventListener('input', () => updateAllFields(inputDec, 10));
    if (inputBin) inputBin.addEventListener('input', () => updateAllFields(inputBin, 2));
    if (inputHex) inputHex.addEventListener('input', () => updateAllFields(inputHex, 16));
    if (inputOct) inputOct.addEventListener('input', () => updateAllFields(inputOct, 8));
    
    if (inputCustom && selectCustomBase) {
      inputCustom.addEventListener('input', () => {
        updateAllFields(inputCustom, parseInt(selectCustomBase.value, 10));
      });

      selectCustomBase.addEventListener('change', () => {
        if (inputDec && inputDec.value) {
          updateAllFields(inputDec, 10);
        } else if (inputCustom && inputCustom.value) {
          updateAllFields(inputCustom, parseInt(selectCustomBase.value, 10));
        }
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', clearAllInputs);
    }
  });
})();