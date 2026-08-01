/**
 * Scalar Engine - Solver Reativo da Calculadora CIDR / Subnetting IPv4
 * Padrão: Multi-Input Event-Driven Propagation $O(1)$
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cidr-tool-container');
    if (!container) return;

    const inputIp = document.getElementById('ip-address');
    const selectPrefix = document.getElementById('cidr-prefix');
    const btnCalc = document.getElementById('btn-calculate');

    const txtMask = document.getElementById('res-mask');
    const txtNetwork = document.getElementById('res-network');
    const txtBroadcast = document.getElementById('res-broadcast');
    const txtRange = document.getElementById('res-range');
    const txtHosts = document.getElementById('res-hosts');
    const boxBroadcast = document.getElementById('box-broadcast');

    if (!inputIp || !selectPrefix || !txtNetwork) return;

    // 1. Extração de traduções via Ponte Universal Dataset
    const dict = window.getSolverDict ? window.getSolverDict('cidr-tool-container') : {};
    const lang = (container.getAttribute('data-lang') || 'pt-br').toLowerCase();

    // 2. Preenchimento automático dos Prefixos CIDR (/32 até /0) no Select
    function populatePrefixes() {
      if (selectPrefix.options.length > 0) return;
      
      const fragment = document.createDocumentFragment();
      for (let i = 32; i >= 0; i--) {
        const opt = document.createElement('option');
        opt.value = i;
        
        // Calcula a máscara equivalente para exibição amigável
        const maskLong = i === 0 ? 0 : (~0 << (32 - i)) >>> 0;
        const maskStr = longToIp(maskLong);
        
        opt.textContent = `/${i} (${maskStr})`;
        if (i === 24) opt.selected = true; // Padrão de mercado /24
        fragment.appendChild(opt);
      }
      selectPrefix.appendChild(fragment);
    }

    function isValidIPv4(ip) {
      const octets = ip.split('.');
      if (octets.length !== 4) return false;
      return octets.every(octet => {
        if (!/^\d+$/.test(octet)) return false;
        const num = parseInt(octet, 10);
        return num >= 0 && num <= 255;
      });
    }

    function ipToLong(ip) {
      return ip.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0) >>> 0;
    }

    function longToIp(long) {
      return [
        (long >>> 24) & 255,
        (long >>> 16) & 255,
        (long >>> 8) & 255,
        long & 255
      ].join('.');
    }

    function calculate() {
      const ipStr = inputIp.value.trim();
      const prefix = parseInt(selectPrefix.value, 10);

      if (!isValidIPv4(ipStr) || isNaN(prefix)) {
        txtMask.textContent = '-';
        txtNetwork.textContent = '-';
        txtBroadcast.textContent = '-';
        txtRange.textContent = '-';
        txtHosts.textContent = '-';
        return;
      }

      const ipLong = ipToLong(ipStr);
      const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      const networkLong = (ipLong & maskLong) >>> 0;
      const broadcastLong = (networkLong | (~maskLong)) >>> 0;

      txtMask.textContent = longToIp(maskLong);
      txtNetwork.textContent = longToIp(networkLong);

      // Tratamento de prefixos com chaves internacionalizadas
      if (prefix === 32) {
        if (boxBroadcast) boxBroadcast.style.opacity = '0.4';
        txtBroadcast.textContent = dict.singleHost || "N/A (Single host)";
        txtRange.textContent = longToIp(networkLong);
        txtHosts.textContent = '1';
      } else if (prefix === 31) {
        if (boxBroadcast) boxBroadcast.style.opacity = '1';
        txtBroadcast.textContent = longToIp(broadcastLong);
        txtRange.textContent = `${longToIp(networkLong)} - ${longToIp(broadcastLong)}`;
        txtHosts.textContent = dict.rfc3021 || "2 (RFC 3021)";
      } else {
        if (boxBroadcast) boxBroadcast.style.opacity = '1';
        txtBroadcast.textContent = longToIp(broadcastLong);

        const firstUsable = (networkLong + 1) >>> 0;
        const lastUsable = (broadcastLong - 1) >>> 0;
        txtRange.textContent = `${longToIp(firstUsable)} - ${longToIp(lastUsable)}`;

        const totalUsableHosts = Math.pow(2, 32 - prefix) - 2;
        
        // Formatação de números conforme locale ativo
        const localeMap = { 'de': 'de-DE', 'ja': 'ja-JP', 'es': 'es-ES', 'fr': 'fr-FR', 'pt': 'pt-BR' };
        const currentLocale = localeMap[lang.slice(0,2)] || 'en-US';
        
        txtHosts.textContent = totalUsableHosts.toLocaleString(currentLocale);
      }
    }

    // Inicialização da interface
    populatePrefixes();

    // Event Listeners Reativos
    inputIp.addEventListener('input', calculate);
    selectPrefix.addEventListener('change', calculate);
    if (btnCalc) btnCalc.addEventListener('click', calculate);

    // Render inicial
    calculate();
  });
})();