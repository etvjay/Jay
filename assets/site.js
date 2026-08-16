(() => {
  const yearNodes = document.querySelectorAll('[data-year]');
  yearNodes.forEach((node) => node.textContent = new Date().getFullYear());
})();
