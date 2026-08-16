(() => {
  const storageKey = 'jason-v-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const readPreference = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const resolvedTheme = () => {
    const saved = readPreference();
    if (saved === 'light' || saved === 'dark') return saved;
    return media.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  applyTheme(resolvedTheme());

  const nav = document.querySelector('.ed-nav');
  if (nav && !document.querySelector('[data-theme-toggle]')) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.dataset.themeToggle = '';
    nav.appendChild(toggle);
    applyTheme(resolvedTheme());

    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, next);
      } catch {}
      applyTheme(next);
    });
  }

  media.addEventListener?.('change', () => {
    if (!readPreference()) applyTheme(resolvedTheme());
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
