(function () {
  'use strict';

  const ipInput = document.getElementById('vpc-cidr-ip');
  const maskSelect = document.getElementById('vpc-cidr-mask');
  const providerSelect = document.getElementById('vpc-provider');
  const errorDiv = document.getElementById('vpc-error');
  const outputContainer = document.getElementById('vpc-output');

  // Elementos Sub-rede A
  const elNetA = document.getElementById('suba-network');
  const elPrefixA = document.getElementById('suba-prefix');
  const elMaskA = document.getElementById('suba-mask');
  const elFirstA = document.getElementById('suba-first');
  const elLastA = document.getElementById('suba-last');
  const elBroadcastA = document.getElementById('suba-broadcast');
  const elHostsA = document.getElementById('suba-hosts');

  // Elementos Sub-rede B
  const elNetB = document.getElementById('subb-network');
  const elPrefixB = document.getElementById('subb-prefix');
  const elMaskB = document.getElementById('subb-mask');
  const elFirstB = document.getElementById('subb-first');
  const elLastB = document.getElementById('subb-last');
  const elBroadcastB = document.getElementById('subb-broadcast');
  const elHostsB = document.getElementById('subb-hosts');

  if (!ipInput || !maskSelect || !providerSelect || !elNetA || !elPrefixA) return;

  // 🌍 Internacionalização baseada no idioma renderizado pelo Hugo
  const currentLang = document.documentElement.lang || 'pt-BR';
  const localeMap = { 'en': 'en-US', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR' };
  const currentLocale = localeMap[currentLang] || 'pt-BR';

  // Fallbacks de texto para campos vazios/inválidos por idioma
  const naTexts = {
    'pt-BR': "N/A",
    'en-US': "N/A",
    'de-DE': "N/V",
    'ja-JP': "該当なし"
  };
  const txtNA = naTexts[currentLocale] || "N/A";

  function ipToLong(ip) {
    return ip.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0) >>> 0;
  }

  function longToIp(long) {
    return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.');
  }

  function showError(errorKey) {
    const fallbackMsg = "Invalid configuration.";
    const translatedMsg = errorDiv.getAttribute('data-err-' + errorKey) || fallbackMsg;
    errorDiv.textContent = translatedMsg;
    errorDiv.classList.remove('hidden');
    if (outputContainer) outputContainer.style.opacity = '0.25';
  }

  function clearError() {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    if (outputContainer) outputContainer.style.opacity = '1';
  }

  function calcularVPC() {
    const ipStr = ipInput.value.trim();
    const ipPattern = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;

    if (!ipPattern.test(ipStr)) {
      showError('format');
      return;
    }

    const octets = ipStr.split('.');
    for (let i = 0; i < 4; i++) {
      const val = parseInt(octets[i], 10);
      if (isNaN(val) || val < 0 || val > 255) {
        showError('range');
        return;
      }
    }

    clearError();

    const parentPrefix = parseInt(maskSelect.value, 10);
    if (parentPrefix >= 31) {
      showError('small');
      return;
    }

    const ipLong = ipToLong(ipStr);
    const parentMaskLong = parentPrefix === 0 ? 0 : (~0 << (32 - parentPrefix)) >>> 0;
    const parentNetworkLong = (ipLong & parentMaskLong) >>> 0;

    const childPrefix = parentPrefix + 1;
    const childMaskLong = (~0 << (32 - childPrefix)) >>> 0;
    const childBlockSize = Math.pow(2, 32 - childPrefix);

    const netALong = parentNetworkLong;
    const broadcastALong = (netALong + childBlockSize - 1) >>> 0;

    const netBLong = (parentNetworkLong + childBlockSize) >>> 0;
    const broadcastBLong = (netBLong + childBlockSize - 1) >>> 0;

    const provider = providerSelect.value;
    let reservedIPs = 2;
    let offsetFirst = 1;
    let offsetLast = 1;

    if (provider === 'aws' || provider === 'azure') {
      reservedIPs = 5;
      offsetFirst = 4;
      offsetLast = 1;
    } else if (provider === 'gcp') {
      reservedIPs = 4;
      offsetFirst = 1;
      offsetLast = 2; // Desloca omitindo o penúltimo IP reservado pelo Google
    }

    let usableHosts = childBlockSize - reservedIPs;
    if (usableHosts < 0) usableHosts = 0;

    // Formatação regionalizada de milhares baseada no Hugo Context remoto
    const formattedHosts = usableHosts.toLocaleString(currentLocale);

    // Renderização Limpa e Localizada
    elNetA.textContent = longToIp(netALong);
    elPrefixA.textContent = childPrefix;
    elMaskA.textContent = longToIp(childMaskLong);
    elFirstA.textContent = usableHosts > 0 ? longToIp(netALong + offsetFirst) : txtNA;
    elLastA.textContent = usableHosts > 0 ? longToIp(broadcastALong - offsetLast) : txtNA;
    elBroadcastA.textContent = longToIp(broadcastALong);
    elHostsA.textContent = formattedHosts;

    elNetB.textContent = longToIp(netBLong);
    elPrefixB.textContent = childPrefix;
    elMaskB.textContent = longToIp(childMaskLong);
    elFirstB.textContent = usableHosts > 0 ? longToIp(netBLong + offsetFirst) : txtNA;
    elLastB.textContent = usableHosts > 0 ? longToIp(broadcastBLong - offsetLast) : txtNA;
    elBroadcastB.textContent = longToIp(broadcastBLong);
    elHostsB.textContent = formattedHosts;
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const debouncedCalcular = debounce(calcularVPC, 50);

  ipInput.addEventListener('input', debouncedCalcular);
  maskSelect.addEventListener('change', calcularVPC);
  providerSelect.addEventListener('change', calcularVPC);

  calcularVPC();
})();