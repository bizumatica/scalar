/**
 * Scalar Engine - Solver de Planejamento de Sub-redes VPC Multi-Cloud
 * Análise de Redes IPv4, Offsets de Nuvem (AWS, GCP, Azure, RFC) & Bitwise Math Unsigned
 * Autor: Julio Prata & Scalar Team
 */
(function () {
  'use strict';

  function initVPCSolver() {
    const container = document.getElementById('vpc-planner-container');
    if (!container) return;

    const ipInput = document.getElementById('vpc-cidr-ip');
    const maskSelect = document.getElementById('vpc-cidr-mask');
    const providerSelect = document.getElementById('vpc-provider');
    const btnReset = document.getElementById('btn-reset-vpc');
    const errorDiv = document.getElementById('vpc-error');
    const outputContainer = document.getElementById('vpc-output');

    // Mapeamento dos Elementos DOM das Sub-redes A e B
    const fields = {
      suba: {
        net: document.getElementById('suba-network'),
        prefix: document.getElementById('suba-prefix'),
        mask: document.getElementById('suba-mask'),
        first: document.getElementById('suba-first'),
        last: document.getElementById('suba-last'),
        broadcast: document.getElementById('suba-broadcast'),
        hosts: document.getElementById('suba-hosts')
      },
      subb: {
        net: document.getElementById('subb-network'),
        prefix: document.getElementById('subb-prefix'),
        mask: document.getElementById('subb-mask'),
        first: document.getElementById('subb-first'),
        last: document.getElementById('subb-last'),
        broadcast: document.getElementById('subb-broadcast'),
        hosts: document.getElementById('subb-hosts')
      }
    };

    if (!ipInput || !maskSelect || !providerSelect || !fields.suba.net || !fields.subb.net) return;

    // Resolução de Idioma e Regionalização
    const rawLang = container.dataset.lang || document.documentElement.lang || window.navigator.language || 'pt';
    const normalizedLang = rawLang.toLowerCase();

    const localeMap = {
      'pt': 'pt-BR', 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT',
      'en': 'en-US', 'en-us': 'en-US', 'en-gb': 'en-GB',
      'de': 'de-DE', 'de-de': 'de-DE',
      'es': 'es-ES', 'fr': 'fr-FR', 'ja': 'ja-JP'
    };
    const currentLocale = localeMap[normalizedLang] || 'pt-BR';
    const txtNA = 'N/A';

    /**
     * Converte String IPv4 (X.X.X.X) para Inteiro Unsigned 32-bit (Big-Endian)
     */
    function ipToLong(ipStr) {
      const octets = ipStr.split('.');
      if (octets.length !== 4) return null;
      
      let num = 0;
      for (let i = 0; i < 4; i++) {
        const oct = parseInt(octets[i], 10);
        if (isNaN(oct) || oct < 0 || oct > 255) return null;
        num = (num << 8) + oct;
      }
      return num >>> 0;
    }

    /**
     * Converte Inteiro Unsigned 32-bit para String Dotted-Decimal IPv4
     */
    function longToIp(longVal) {
      return [
        (longVal >>> 24) & 255,
        (longVal >>> 16) & 255,
        (longVal >>> 8) & 255,
        longVal & 255
      ].join('.');
    }

    /**
     * Gerenciador de Exibição de Erros
     */
    function showError(errorKey) {
      if (!errorDiv) return;
      const fallbackMsg = 'Erro na validação do bloco CIDR.';
      const translatedMsg = errorDiv.getAttribute('data-err-' + errorKey) || fallbackMsg;
      errorDiv.textContent = translatedMsg;
      errorDiv.classList.remove('hidden');
      if (outputContainer) outputContainer.style.opacity = '0.3';
    }

    function clearError() {
      if (!errorDiv) return;
      errorDiv.textContent = '';
      errorDiv.classList.add('hidden');
      if (outputContainer) outputContainer.style.opacity = '1';
    }

    /**
     * Engine Principal de Cálculo de Sub-roteamento VPC
     */
    function calcularVPC() {
      const ipStr = ipInput.value.trim();
      if (!ipStr) {
        clearError();
        return;
      }

      const ipLong = ipToLong(ipStr);
      if (ipLong === null) {
        showError('format');
        return;
      }

      const parentPrefix = parseInt(maskSelect.value, 10);
      
      // Trava: Bloco pai deve ser <= /30 para ser dividido em duas sub-redes
      if (parentPrefix >= 31) {
        showError('small');
        return;
      }

      clearError();

      // Cálculo da Máscara do Bloco Pai e Normalização do Endereço de Rede Base
      const parentMaskLong = parentPrefix === 0 ? 0 : (~0 << (32 - parentPrefix)) >>> 0;
      const parentNetworkLong = (ipLong & parentMaskLong) >>> 0;

      // Sub-redes Filhas: Prefixo Pai + 1
      const childPrefix = parentPrefix + 1;
      const childMaskLong = (~0 << (32 - childPrefix)) >>> 0;
      const childBlockSize = (1 << (32 - childPrefix)) >>> 0;

      // Sub-rede A (Metade Inferior)
      const netALong = parentNetworkLong;
      const broadcastALong = (netALong + childBlockSize - 1) >>> 0;

      // Sub-rede B (Metade Superior)
      const netBLong = (parentNetworkLong + childBlockSize) >>> 0;
      const broadcastBLong = (netBLong + childBlockSize - 1) >>> 0;

      // Resolução dos Offsets e Regras por Provedor Cloud
      const provider = providerSelect.value;
      let offsetFirst = 1;
      let offsetLast = 1;
      let usableHosts = 0;

      if (provider === 'aws' || provider === 'azure') {
        // AWS / Azure: Reservam 5 IPs (.0 Network, .1 Router, .2 DNS, .3 Reservado, .255 Broadcast)
        if (childBlockSize > 5) {
          offsetFirst = 4;
          offsetLast = 1;
          usableHosts = childBlockSize - 5;
        } else {
          usableHosts = 0;
        }
      } else if (provider === 'gcp') {
        // GCP: Reserva 4 IPs (.0 Network, .1 Gateway, .2 Reservado, .3 DNS Interno)
        if (childBlockSize > 4) {
          offsetFirst = 4;
          offsetLast = 1;
          usableHosts = childBlockSize - 4;
        } else {
          usableHosts = 0;
        }
      } else {
        // Standard RFC 1812 / RFC 3021
        if (childPrefix === 31) {
          offsetFirst = 0;
          offsetLast = 0;
          usableHosts = 2;
        } else if (childBlockSize > 2) {
          offsetFirst = 1;
          offsetLast = 1;
          usableHosts = childBlockSize - 2;
        } else {
          usableHosts = 0;
        }
      }

      // Renderização na Interface
      renderSubnetUi(fields.suba, netALong, broadcastALong, childPrefix, childMaskLong, usableHosts, offsetFirst, offsetLast, currentLocale, txtNA);
      renderSubnetUi(fields.subb, netBLong, broadcastBLong, childPrefix, childMaskLong, usableHosts, offsetFirst, offsetLast, currentLocale, txtNA);
    }

    /**
     * Atualiza o DOM de uma Sub-rede Específica
     */
    function renderSubnetUi(target, netLong, bcastLong, prefix, maskLong, usableHosts, offFirst, offLast, locale, txtNA) {
      target.net.textContent = longToIp(netLong);
      target.prefix.textContent = prefix;
      target.mask.textContent = longToIp(maskLong);
      target.broadcast.textContent = longToIp(bcastLong);

      if (usableHosts > 0) {
        const firstIpInt = (netLong + offFirst) >>> 0;
        const lastIpInt = (bcastLong - offLast) >>> 0;

        target.first.textContent = longToIp(firstIpInt);
        target.last.textContent = longToIp(lastIpInt);
        target.hosts.textContent = usableHosts.toLocaleString(locale);
        target.hosts.classList.remove('text-red-500');
      } else {
        target.first.textContent = txtNA;
        target.last.textContent = txtNA;
        target.hosts.textContent = '0';
        target.hosts.classList.add('text-red-500');
      }
    }

    function resetForm() {
      ipInput.value = '10.0.0.0';
      maskSelect.value = '16';
      providerSelect.value = 'standard';
      calcularVPC();
    }

    /**
     * Debounce para evitar Reflows no DOM durante a Digitação
     */
    function debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }

    const debouncedCalcular = debounce(calcularVPC, 60);

    // Registradores de Evento
    ipInput.addEventListener('input', debouncedCalcular);
    maskSelect.addEventListener('change', calcularVPC);
    providerSelect.addEventListener('change', calcularVPC);
    if (btnReset) btnReset.addEventListener('click', resetForm);

    // Processamento Inicial
    calcularVPC();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVPCSolver);
  } else {
    initVPCSolver();
  }
})();