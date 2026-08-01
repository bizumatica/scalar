/**
 * Universal i18n Bridge for Solvers (Project Scalar)
 * Converte automaticamente data-i18n-chave-exemplo em dict.chaveExemplo
 */
window.getSolverDict = function(containerId) {
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;

  if (!container) return {};

  const dict = {};
  const dataset = container.dataset;

  for (const key in dataset) {
    if (key.startsWith('i18n')) {
      // Remove o prefixo 'i18n' e descapitaliza a primeira letra do resto
      const rawKey = key.slice(4);
      const cleanKey = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
      dict[cleanKey] = dataset[key];
    }
  }

  return dict;
};