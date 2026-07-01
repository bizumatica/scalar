(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const inputs = {
      dec: document.getElementById('base-dec'),
      bin: document.getElementById('base-bin'),
      hex: document.getElementById('base-hex'),
      oct: document.getElementById('base-oct')
    };

    // Garante que o script só rode se os inputs existirem na página atual do Hugo
    if (!inputs.dec || !inputs.bin || !inputs.hex || !inputs.oct) return;

    // Regras de filtragem Regex para impedir caracteres corrompidos em cada base
    const validators = {
      10: /[^0-9]/g,          // Decimal: apenas dígitos de 0 a 9
      2:  /[^0-1]/g,          // Binário: apenas 0 e 1
      16: /[^0-9a-fA-F]/g,    // Hexadecimal: 0-9 e A-F (independente de caixa)
      8:  /[^0-7]/g           // Octal: apenas dígitos de 0 a 7
    };

    function convert(rawValue, fromBase) {
      // 1. Se o campo estiver vazio, limpa imediatamente todas as outras bases
      if (rawValue === "") {
        Object.values(inputs).forEach(input => input.value = "");
        return;
      }

      // 2. Sanitiza o input: remove caracteres que não pertencem à base selecionada
      let sanitizedValue = rawValue.replace(validators[fromBase], '');

      // Se após a limpeza o valor ficar vazio, redefine os campos e para
      if (sanitizedValue === "") {
        inputs[getBaseKey(fromBase)].value = "";
        return;
      }

      // 3. Atualiza o valor do próprio campo ativo caso o usuário tenha digitado um caractere inválido
      if (fromBase === 16) {
        sanitizedValue = sanitizedValue.toUpperCase();
      }
      inputs[getBaseKey(fromBase)].value = sanitizedValue;

      // 4. Executa o parse matemático seguro
      const parsed = parseInt(sanitizedValue, fromBase);
      if (isNaN(parsed)) return;

      // 5. Atualiza as bases remanescentes em tempo real
      if (fromBase !== 10) inputs.dec.value = parsed.toString(10);
      if (fromBase !== 2)  inputs.bin.value = parsed.toString(2);
      if (fromBase !== 16) inputs.hex.value = parsed.toString(16).toUpperCase();
      if (fromBase !== 8)  inputs.oct.value = parsed.toString(8);
    }

    // Função auxiliar para mapear a base numérica de volta para a chave do objeto
    function getBaseKey(base) {
      if (base === 10) return 'dec';
      if (base === 2)  return 'bin';
      if (base === 16) return 'hex';
      if (base === 8)  return 'oct';
    }

    // Listeners capturando o evento input para comportamento instantâneo
    inputs.dec.addEventListener('input', (e) => convert(e.target.value, 10));
    inputs.bin.addEventListener('input', (e) => convert(e.target.value, 2));
    inputs.hex.addEventListener('input', (e) => convert(e.target.value, 16));
    inputs.oct.addEventListener('input', (e) => convert(e.target.value, 8));
  });
})();