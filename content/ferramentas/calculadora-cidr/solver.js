(function () {
  'use strict';

  const ipInput = document.getElementById('ip-address');
  const maskSelect = document.getElementById('cidr-mask');
  const errorDiv = document.getElementById('cidr-error');
  const outputGrid = document.getElementById('subnet-output');

  const elNetwork = document.getElementById('res-network');
  const elMask = document.getElementById('res-mask');
  const elFirst = document.getElementById('res-first');
  const elLast = document.getElementById('res-last');
  const elBroadcast = document.getElementById('res-broadcast');
  const elHosts = document.getElementById('res-hosts');

  if (!ipInput || !maskSelect || !elNetwork) return;

  // 🌍 Captura dinamicamente o idioma da página injetado pelo Hugo
  const currentLang = document.documentElement.lang || 'pt-BR';
  const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
  const currentLocale = localeMap[currentLang] || 'pt-BR';

  // 🗺️ Dicionário de traduções internas do motor de cálculo
  const translations = {
    'pt-BR': {
      format: "Formato de IP Inválido (Use X.X.X.X).",
      range: "Cada octeto deve estar entre 0 e 255.",
      na: "N/A (RFC 3021)"
    },
    'en-US': {
      format: "Invalid IP Address format (Use X.X.X.X).",
      range: "Each octet must be between 0 and 255.",
      na: "N/A (RFC 3021)"
    },
    'de-DE': {
      format: "Ungültiges IP-Adressformat (Verwenden Sie X.X.X.X).",
      range: "Jedes Oktett muss zwischen 0 und 255 liegen.",
      na: "N/V (RFC 3021)"
    },
    'ja-JP': {
      format: "無効なIPアドレス形式です (X.X.X.X を使用してください)。",
      range: "各オクテットは0から255の間でなければなりません。",
      na: "該当なし (RFC 3021適用)"
    }
  };

  const text = translations[currentLocale] || translations['pt-BR'];

  function ipToLong(ip) {
    return ip.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0) >>> 0;
  }

  function longToIp(long) {
    return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.');
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.classList.remove('hidden');
    if (outputGrid) outputGrid.style.opacity = '0.3';
  }

  function clearError() {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    if (outputGrid) outputGrid.style.opacity = '1';
  }

  function calcular() {
    const ipStr = ipInput.value.trim();
    const ipPattern = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;

    if (!ipPattern.test(ipStr)) {
      showError(text.format);
      return;
    }

    const octets = ipStr.split('.');
    for (let i = 0; i < 4; i++) {
      const val = parseInt(octets[i], 10);
      if (isNaN(val) || val < 0 || val > 255) {
        showError(text.range);
        return;
      }
    }

    clearError();

    const prefix = parseInt(maskSelect.value, 10);
    const ipLong = ipToLong(ipStr);
    const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    const networkLong = (ipLong & maskLong) >>> 0;
    const broadcastLong = (networkLong | ~maskLong) >>> 0;

    let firstIp, lastIp, usableHosts;
    const totalHosts = Math.pow(2, 32 - prefix);

    if (prefix === 32) {
      firstIp = networkLong;
      lastIp = networkLong;
      usableHosts = 1;
    } else if (prefix === 31) {
      firstIp = networkLong;
      lastIp = broadcastLong;
      usableHosts = 2;
    } else {
      firstIp = networkLong + 1;
      lastIp = broadcastLong - 1;
      usableHosts = totalHosts - 2;
    }

    elNetwork.textContent = longToIp(networkLong);
    elMask.textContent = longToIp(maskLong);
    elFirst.textContent = longToIp(firstIp);
    elLast.textContent = longToIp(lastIp);
    elBroadcast.textContent = prefix >= 31 ? text.na : longToIp(broadcastLong);
    elHosts.textContent = usableHosts.toLocaleString(currentLocale);
  }

  ipInput.addEventListener('input', calcular);
  maskSelect.addEventListener('change', calcular);
  
  calcular();
})();