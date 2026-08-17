(() => {
  const storageKey = 'jason-v-theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const readPreference = () => {
    try { return localStorage.getItem(storageKey); } catch { return null; }
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
      try { localStorage.setItem(storageKey, next); } catch {}
      applyTheme(next);
    });
  }
  media.addEventListener?.('change', () => { if (!readPreference()) applyTheme(resolvedTheme()); });
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const path = window.location.pathname.replace(/\/+$/, '/');

  const researchSources = [
    { match:'/research/programmable-relationship/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails'],['Concord case study','../../work/concord/'],['Concord repository','https://github.com/etvjay/Concord']] },
    { match:'/research/workspace/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
    { match:'/research/path/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
    { match:'/research/pact/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
    { match:'/research/railscard/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
    { match:'/research/2d-nonce-lanes/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
    { match:'/research/dynamic-authorization-lanes/', links:[['OpenRails case study','../../work/openrails/'],['OpenRails repository','https://github.com/Jaydearcadian/mcosm-openrails']] },
  ];

  const source = researchSources.find((entry) => path.includes(entry.match));
  if (source && !document.querySelector('[data-implementation-source]')) {
    const aside = document.querySelector('.ed-aside');
    if (aside) {
      const box = document.createElement('div');
      box.className = 'ed-aside-box';
      box.dataset.implementationSource = '';
      const links = source.links.map(([label, href]) => `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>${label} ↗</a>`).join('');
      box.innerHTML = `<h3>Implementation source</h3><div class="ed-source-list">${links}</div>`;
      aside.prepend(box);
    }
  }

  const projectExperiments = [
    { match:'/work/openrails/', links:[['Governed Value','../../experiments/governed-value/'],['Bounded Autonomy','../../experiments/bounded-autonomy/']] },
    { match:'/work/concord/', links:[['Governed Value','../../experiments/governed-value/'],['Coordination Without Shared State','../../experiments/coordination-without-shared-state/']] },
    { match:'/work/noema/', links:[['Evidence & Understanding','../../experiments/evidence-and-understanding/'],['Behavioural Identity','../../experiments/behavioural-identity/']] },
    { match:'/work/engram/', links:[['Persistent Agency','../../experiments/persistent-agency/']] },
    { match:'/work/rjp/', links:[['Behavioural Identity','../../experiments/behavioural-identity/'],['Evidence & Understanding','../../experiments/evidence-and-understanding/']] },
    { match:'/work/nox-accord/', links:[['Coordination Without Shared State','../../experiments/coordination-without-shared-state/']] },
  ];

  const project = projectExperiments.find((entry) => path.includes(entry.match));
  if (project && !document.querySelector('[data-experiment-programmes]')) {
    const hero = document.querySelector('.case-hero .case-actions');
    if (hero) {
      project.links.forEach(([label, href]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = `${label} experiment ↗`;
        link.dataset.experimentProgrammes = '';
        hero.appendChild(link);
      });
    }
  }
})();