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

    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

    function sanitizeForBase(str, base) {
      if (!str) return '';
      const allowedDigits = ALPHABET.slice(0, base);
      const regex = new RegExp(`[^${allowedDigits}]`, 'gi');
      return str.replace(regex, '');
    }

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

    function updateAllFields(sourceInput, base) {
      const rawValue = sourceInput.value.trim();
      const sanitized = sanitizeForBase(rawValue, base);
      
      if (sourceInput.value !== sanitized) {
        sourceInput.value = sanitized;
      }

      if (!sanitized) {
        clearAllInputs();
        return;
      }

      const decimalValue = parseToBigInt(sanitized, base);

      if (decimalValue === null) return;

      if (sourceInput !== inputDec && inputDec) inputDec.value = bigIntToString(decimalValue, 10);
      if (sourceInput !== inputBin && inputBin) inputBin.value = bigIntToString(decimalValue, 2);
      if (sourceInput !== inputHex && inputHex) inputHex.value = bigIntToString(decimalValue, 16).toUpperCase();
      if (sourceInput !== inputOct && inputOct) inputOct.value = bigIntToString(decimalValue, 8);
      
      if (selectCustomBase && inputCustom) {
        const customBase = parseInt(selectCustomBase.value, 10);
        if (sourceInput !== inputCustom) {
          const resCustom = bigIntToString(decimalValue, customBase);
          inputCustom.value = customBase > 10 ? resCustom.toUpperCase() : resCustom;
        }
      }
    }

    function clearAllInputs() {
      if (inputDec) inputDec.value = '';
      if (inputBin) inputBin.value = '';
      if (inputHex) inputHex.value = '';
      if (inputOct) inputOct.value = '';
      if (inputCustom) inputCustom.value = '';
    }

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