/**
 * Scalar Engine - Solver Reativo da Calculadora CIDR / Subnetting IPv4
 * Padrão: Multi-Input Event-Driven Propagation
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeamento de nós do DOM sincronizados com o HTML do partial
    const inputIp = document.getElementById('ip-address');
    const selectPrefix = document.getElementById('cidr-prefix');

    const txtMask = document.getElementById('res-mask');
    const txtNetwork = document.getElementById('res-network');
    const txtBroadcast = document.getElementById('res-broadcast');
    const txtRange = document.getElementById('res-range');
    const txtHosts = document.getElementById('res-hosts');
    const boxBroadcast = document.getElementById('box-broadcast');

    // Aborta se a ferramenta não pertencer à página atual do Hugo
    if (!inputIp || !selectPrefix || !txtNetwork) return;

    // 2. Detecção flexível de Locale (Atributo HTML ou data-lang)
    const container = document.getElementById('cidr-tool-container');
    const currentLang = (container?.getAttribute('data-lang') || document.documentElement.lang || 'pt-BR').toLowerCase();

    const localeMap = {
      'en': 'en-US',
      'de': 'de-DE',
      'ja': 'ja-JP',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'pt': 'pt-BR',
      'pt-br': 'pt-BR'
    };
    const currentLocale = localeMap[currentLang] || 'pt-BR';

    // 3. Dicionário Internacionalizado de Estados Especiais
    const translations = {
      'pt-BR': { singleHost: "N/A (Host único)", rfc: "2 (RFC 3021)" },
      'en-US': { singleHost: "N/A (Single host)", rfc: "2 (RFC 3021)" },
      'de-DE': { singleHost: "N/V (Einzelner Host)", rfc: "2 (RFC 3021)" },
      'ja-JP': { singleHost: "該当なし (単一ホスト)", rfc: "2 (RFC 3021適用)" },
      'es-ES': { singleHost: "N/A (Host único)", rfc: "2 (RFC 3021)" },
      'fr-FR': { singleHost: "N/A (Hôte unique)", rfc: "2 (RFC 3021)" }
    };

    const text = translations[currentLocale] || translations['pt-BR'];

    /**
     * Validação rigorosa de IP IPv4 (Octetos entre 0 e 255)
     */
    function isValidIPv4(ip) {
      const octets = ip.split('.');
      if (octets.length !== 4) return false;
      return octets.every(octet => {
        if (!/^\d+$/.test(octet)) return false;
        const num = parseInt(octet, 10);
        return num >= 0 && num <= 255;
      });
    }

    /**
     * Converte String IP para Long Inteiro Sem Sinal de 32 bits (Unsigned Integer)
     */
    function ipToLong(ip) {
      return ip.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0) >>> 0;
    }

    /**
     * Converte Long Inteiro Sem Sinal de 32 bits para String IP
     */
    function longToIp(long) {
      return [
        (long >>> 24) & 255,
        (long >>> 16) & 255,
        (long >>> 8) & 255,
        long & 255
      ].join('.');
    }

    /**
     * Recálculo Reativo dos Parâmetros do Subnetting
     */
    function calculate() {
      const ipStr = inputIp.value.trim();
      const prefix = parseInt(selectPrefix.value, 10);

      // Em caso de IP parcial ou inválido, redefine os resultados para o estado neutro
      if (!isValidIPv4(ipStr)) {
        txtMask.textContent = '-';
        txtNetwork.textContent = '-';
        txtBroadcast.textContent = '-';
        txtRange.textContent = '-';
        txtHosts.textContent = '-';
        return;
      }

      // Operações de Rede Bitwise
      const ipLong = ipToLong(ipStr);
      const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      const networkLong = (ipLong & maskLong) >>> 0;
      const broadcastLong = (networkLong | (~maskLong)) >>> 0;

      // Exibição da Máscara e ID de Rede
      txtMask.textContent = longToIp(maskLong);
      txtNetwork.textContent = longToIp(networkLong);

      // Tratamento de prefixos especiais de borda (/32 e /31)
      if (prefix === 32) {
        if (boxBroadcast) boxBroadcast.style.opacity = '0.4';
        txtBroadcast.textContent = text.singleHost;
        txtRange.textContent = longToIp(networkLong);
        txtHosts.textContent = '1';
      } else if (prefix === 31) {
        if (boxBroadcast) boxBroadcast.style.opacity = '1';
        txtBroadcast.textContent = longToIp(broadcastLong);
        txtRange.textContent = `${longToIp(networkLong)} - ${longToIp(broadcastLong)}`;
        txtHosts.textContent = text.rfc;
      } else {
        if (boxBroadcast) boxBroadcast.style.opacity = '1';
        txtBroadcast.textContent = longToIp(broadcastLong);

        const firstUsable = (networkLong + 1) >>> 0;
        const lastUsable = (broadcastLong - 1) >>> 0;
        txtRange.textContent = `${longToIp(firstUsable)} - ${longToIp(lastUsable)}`;

        const totalUsableHosts = Math.pow(2, 32 - prefix) - 2;
        txtHosts.textContent = totalUsableHosts.toLocaleString(currentLocale);
      }
    }

    // 4. Atribuição de Event Listeners em tempo real
    inputIp.addEventListener('input', calculate);
    selectPrefix.addEventListener('change', calculate);

    // Execução inicial para popular o grid padrão (/24)
    calculate();
  });
})();