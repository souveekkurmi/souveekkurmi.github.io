const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

const portrait = select('#portrait-image');
function showPortrait() {
  portrait.hidden = false;
  select('.portrait-fallback').hidden = true;
}
if (portrait.complete && portrait.naturalWidth > 0) showPortrait();
else portrait.addEventListener('load', showPortrait, { once: true });

function renderTags(tags) {
  return `<div class="tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
}

function renderHighlights(highlights) {
  return `<ul>${highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>`;
}

select('#skills').innerHTML = skills.map(skill => `
  <details class="skill">
    <summary>${skill.title}<span aria-hidden="true">+</span></summary>
    <div class="skill-body">
      <p class="summary">${skill.description}</p>
      ${renderTags(skill.tags)}
    </div>
  </details>
`).join('');

const projectCards = select('#project-cards');
projectCards.innerHTML = projects.map(project => `
  <button type="button" class="card project-card" data-category="${project.category}" data-project="${project.id}" data-color="${project.color}" aria-haspopup="dialog">
    <span class="project-metric">${project.metric}</span>
    <span class="card-body">
      <span class="eyebrow">${project.label}</span>
      <span class="card-title">${project.title}</span>
      <span class="summary">${project.summary}</span>
      <span class="card-more">View case study <span aria-hidden="true">↗</span></span>
    </span>
  </button>
`).join('');

const artwork = {
  terminal: '<span class="terminal">&gt; spring boot<br>&gt; ollama run <span>_</span></span>',
  chart: '<span class="chart"><i></i><i></i><i></i><i></i><i></i><i></i></span>',
  grid: '<span class="mini-grid"></span>'
};

const cards = select('#cards');
cards.innerHTML = articles.map(article => `
  <button type="button" class="card" data-category="${article.category}" data-article="${article.id}" aria-haspopup="dialog">
    <span class="card-art" aria-hidden="true">${artwork[article.art]}</span>
    <span class="card-body">
      <span class="eyebrow">${article.label}</span>
      <span class="card-title">${article.title}</span>
      <span class="summary">${article.summary}</span>
      <span class="card-more">Explore <span aria-hidden="true">↗</span></span>
    </span>
  </button>
`).join('');

function bindFilters(attribute, grid, results) {
  const buttons = selectAll(`[${attribute}]`);
  const items = selectAll('[data-category]', grid);
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const filter = button.getAttribute(attribute);
      buttons.forEach(item => item.setAttribute('aria-pressed', item === button));
      for (const item of items) {
        item.hidden = filter !== 'all' && item.dataset.category !== filter;
      }
      const count = items.filter(item => !item.hidden).length;
      results.textContent = `${count} ${count === 1 ? 'result' : 'results'}`;
    });
  }
}
bindFilters('data-filter', cards, select('#results'));
bindFilters('data-project-filter', projectCards, select('#project-results'));

const timeline = select('.timeline');
const journeyPanel = select('#journey-panel');
timeline.innerHTML = journey.map((entry, index) => `
  <button type="button" role="tab" id="journey-${index}" aria-controls="journey-panel">
    <span class="journey-logo" aria-hidden="true"><img src="${entry.logo}" alt=""></span>
    <span class="journey-tab-copy"><strong>${entry.org}</strong><span>${entry.label}</span></span>
  </button>
`).join('');

const tabs = selectAll('[role="tab"]', timeline);

function activateTab(index) {
  const entry = journey[index];
  tabs.forEach((tab, position) => {
    tab.setAttribute('aria-selected', position === index);
    tab.tabIndex = position === index ? 0 : -1;
  });
  journeyPanel.setAttribute('aria-labelledby', tabs[index].id);
  journeyPanel.innerHTML = `
    <div class="journey-content">
      <p class="eyebrow">${entry.org.toUpperCase()} · ${entry.label}</p>
      <h3>${entry.title}</h3>
      <p class="summary">${entry.summary}</p>
      ${entry.responsibilities?.map(({ title, description }) => `
        <div class="journey-responsibility">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      `).join('') ?? ''}
      ${renderHighlights(entry.highlights)}
      ${entry.tags ? renderTags(entry.tags) : ''}
    </div>
  `;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(index));
  tab.addEventListener('keydown', event => {
    const last = tabs.length - 1;
    const destinations = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last
    };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    const destination = destinations[event.key];
    activateTab(destination);
    tabs[destination].focus();
  });
});
activateTab(0);

const detail = select('#detail');
const palette = select('#palette');
const paletteTrigger = select('[data-open-palette]');
let detailOpener;
let navigationOpener;

function mountPipeline(root) {
  root.innerHTML = `
    <h3>Walk through a local request</h3>
    <div class="pipeline" aria-hidden="true"><span>Spring Boot</span><span>Spring AI</span><span>Ollama</span><span>Response</span></div>
    <output aria-live="polite"></output>
    <button class="button secondary" type="button">Next step →</button>
  `;
  const steps = selectAll('.pipeline span', root);
  const descriptions = [
    '1 / 4 · The application receives a prompt.',
    '2 / 4 · Spring AI passes the prompt to its Ollama integration.',
    '3 / 4 · Ollama runs the model on your machine.',
    '4 / 4 · The generated response returns to the application.'
  ];
  let step = 0;
  const button = select('button', root);
  function update() {
    steps.forEach((item, index) => item.classList.toggle('active', index === step));
    select('output', root).textContent = descriptions[step];
    button.textContent = step === steps.length - 1 ? 'Start over ↻' : 'Next step →';
  }
  button.addEventListener('click', () => {
    step = (step + 1) % steps.length;
    update();
  });
  update();
}

function mountElasticity(root) {
  root.innerHTML = `
    <h3>Explore a hypothetical response</h3>
    <p class="summary">This illustration starts with a baseline deviation of 100 units.</p>
    <label for="pressure">Deviation charge increase</label>
    <input id="pressure" type="range" min="0" max="100" value="35">
    <label for="elasticity">Responsiveness</label>
    <input id="elasticity" type="range" min="0" max="100" value="60">
    <div class="meter" aria-hidden="true"><span></span></div>
    <output for="pressure elasticity" aria-live="polite"></output>
  `;
  const pressure = select('#pressure', root);
  const elasticity = select('#elasticity', root);
  function update() {
    const remaining = Math.round(100 - pressure.valueAsNumber * elasticity.valueAsNumber / 100);
    pressure.setAttribute('aria-valuetext', `${pressure.value}% charge increase`);
    elasticity.setAttribute('aria-valuetext', `${elasticity.value}% responsiveness`);
    select('.meter span', root).style.width = `${remaining}%`;
    select('output', root).textContent = `+${pressure.value}% charge · ${elasticity.value}% responsiveness · ${remaining} units of deviation`;
  }
  root.addEventListener('input', update);
  update();
}

function mountLeadership(root) {
  root.innerHTML = `
    <h3>Explore the Managerial Grid</h3>
    <label for="people">Concern for people</label>
    <input id="people" type="range" min="1" max="9" value="5">
    <label for="production">Concern for production</label>
    <input id="production" type="range" min="1" max="9" value="5">
    <output for="people production" aria-live="polite"></output>
  `;
  const people = select('#people', root);
  const production = select('#production', root);
  const anchors = [
    { x: 1, y: 1, title: 'Impoverished management' },
    { x: 9, y: 1, title: 'Authority–compliance' },
    { x: 1, y: 9, title: 'Country club management' },
    { x: 5, y: 5, title: 'Middle-of-the-road management' },
    { x: 9, y: 9, title: 'Team management' }
  ];
  function update() {
    const x = production.valueAsNumber;
    const y = people.valueAsNumber;
    const distance = anchor => (anchor.x - x) ** 2 + (anchor.y - y) ** 2;
    const nearest = Math.min(...anchors.map(distance));
    const styles = anchors.filter(anchor => distance(anchor) === nearest);
    select('output', root).textContent = `Production ${x}/9 · People ${y}/9 · Closest: ${styles.map(style => style.title).join(' / ')}`;
  }
  root.addEventListener('input', update);
  update();
}

const demos = { pipeline: mountPipeline, elasticity: mountElasticity, leadership: mountLeadership };

function showArticle(article, opener) {
  showDetail(`
    <p class="eyebrow">${article.label}</p>
    <h2 id="detail-title">${article.title}</h2>
    <p class="summary">${article.body}</p>
    <div class="demo"></div>
    <a class="button primary" href="${article.url}" target="_blank" rel="noopener noreferrer">Read on LinkedIn ↗</a>
  `, opener, demos[article.demo]);
}

function showDetail(html, opener, mount) {
  detailOpener = opener;
  select('#detail-body').innerHTML = html;
  if (mount) mount(select('.demo', detail));
  detail.showModal();
}

function mountProjectFlow(root, flow) {
  root.innerHTML = `
    <h3>${flow.title}</h3>
    <div class="flow-buttons">${flow.stages.map(([title]) => `<button type="button" aria-pressed="false">${title}</button>`).join('')}</div>
    <p class="flow-output" role="status"></p>
  `;
  const buttons = selectAll('button', root);
  const output = select('.flow-output', root);
  function showStage(index) {
    buttons.forEach((button, position) => button.setAttribute('aria-pressed', position === index));
    output.textContent = flow.stages[index][1];
    if (motion.matches) {
      output.getAnimations().forEach(animation => animation.cancel());
      output.animate([{ opacity: .35, translate: '0 4px' }, { opacity: 1, translate: 'none' }], { duration: 230, easing: 'ease-out' });
    }
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => showStage(index)));
  showStage(0);
}

function showProject(project, opener) {
  showDetail(`
    <p class="eyebrow">${project.label}</p>
    <h2 id="detail-title">${project.title}</h2>
    <p class="summary">${project.summary}</p>
    ${renderHighlights(project.highlights)}
    ${project.flow ? '<div class="demo"></div>' : ''}
    ${renderTags(project.tags)}
  `, opener, project.flow && (root => mountProjectFlow(root, project.flow)));
}

selectAll('[data-project]', projectCards).forEach(button => button.addEventListener('click', () => {
  showProject(projects.find(project => project.id === button.dataset.project), button);
}));

selectAll('[data-article]', cards).forEach(button => button.addEventListener('click', () => {
  showArticle(articles.find(article => article.id === button.dataset.article), button);
}));

detail.addEventListener('close', () => detailOpener?.focus());
palette.addEventListener('close', () => {
  if (!detail.open && navigationOpener) navigationOpener.focus();
  navigationOpener = undefined;
});

for (const dialog of [detail, palette]) {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

const search = select('#nav-search');
const navigationResults = select('#nav-results');
const navigationItems = [
  { label: 'Home', section: 'top' },
  { label: 'Selected work', section: 'projects' },
  { label: 'Writing and explorations', section: 'work' },
  { label: 'Experience and education', section: 'journey' },
  { label: 'Tools and technologies', section: 'stack' },
  { label: 'Contact', section: 'contact' },
  ...articles.map(article => ({ label: article.title, open: opener => showArticle(article, opener) })),
  ...projects.map(project => ({ label: project.title, open: opener => showProject(project, opener) }))
];

function renderNavigation() {
  const query = search.value.trim().toLowerCase();
  const matches = navigationItems.filter(item => item.label.toLowerCase().includes(query));
  navigationResults.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'summary';
    empty.setAttribute('role', 'status');
    empty.textContent = 'No matching sections or articles.';
    navigationResults.append(empty);
  }
  for (const item of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.label;
    button.addEventListener('click', () => {
      const opener = navigationOpener;
      navigationOpener = undefined;
      palette.close();
      if (item.open) {
        item.open(opener);
      } else {
        const section = document.getElementById(item.section);
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
        window.location.hash = item.section;
      }
    });
    navigationResults.append(button);
  }
}

function openNavigation() {
  if (palette.open || detail.open) return;
  navigationOpener = document.activeElement instanceof HTMLElement ? document.activeElement : paletteTrigger;
  if (navigationOpener === document.body) navigationOpener = paletteTrigger;
  search.value = '';
  renderNavigation();
  palette.showModal();
}

search.addEventListener('input', renderNavigation);
paletteTrigger.addEventListener('click', openNavigation);
palette.addEventListener('keydown', event => {
  const buttons = selectAll('button', navigationResults);
  const index = buttons.indexOf(document.activeElement);
  if (event.key === 'Enter' && document.activeElement === search && buttons.length) {
    event.preventDefault();
    buttons[0].click();
  }
  if (!['ArrowDown', 'ArrowUp'].includes(event.key) || !buttons.length) return;
  event.preventDefault();
  if (event.key === 'ArrowUp' && index <= 0) {
    search.focus();
  } else {
    buttons[(index + (event.key === 'ArrowDown' ? 1 : -1)) % buttons.length].focus();
  }
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !detail.open) {
    event.preventDefault();
    if (palette.open) palette.close();
    else openNavigation();
  }
});

const motion = matchMedia('(prefers-reduced-motion: no-preference)');
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        entry.target.classList.remove('visible');
      } else if (entry.intersectionRatio >= .15) {
        entry.target.classList.add('visible');
      }
    }
  }, { threshold: [0, .15] });
  selectAll('.hero, .reveal, .card').forEach(element => observer.observe(element));
}

const progress = select('.progress');
const sections = selectAll('.nav nav a').map(link => ({
  link,
  target: document.getElementById(link.hash.slice(1))
})).reverse();
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const range = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
  const active = sections.find(({ target }) => target.getBoundingClientRect().top <= innerHeight * .38);
  sections.forEach(item => {
    if (item === active) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
}
function queueScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', queueScroll, { passive: true });
addEventListener('resize', queueScroll);
updateScroll();

const hero = select('.hero');
const precisePointer = matchMedia('(hover: hover) and (pointer: fine)');

function bindPointerMotion(target, update, reset) {
  let frame = 0;
  let x;
  let y;
  target.addEventListener('pointermove', event => {
    if (!motion.matches || !precisePointer.matches || event.pointerType === 'touch') return;
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const bounds = target.getBoundingClientRect();
      update((x - bounds.left) / bounds.width, (y - bounds.top) / bounds.height);
    });
  }, { passive: true });
  function clearMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    reset();
  }
  target.addEventListener('pointerleave', clearMotion);
  target.addEventListener('pointercancel', clearMotion);
  motion.addEventListener('change', clearMotion);
}

const heroArt = select('.hero-art');
bindPointerMotion(hero, (x, y) => {
  heroArt.style.setProperty('--x', `${(x - .5) * 36}px`);
  heroArt.style.setProperty('--y', `${(y - .5) * 30}px`);
}, () => {
  heroArt.style.removeProperty('--x');
  heroArt.style.removeProperty('--y');
});

selectAll('.project-card').forEach(card => {
  bindPointerMotion(card, (x, y) => {
    card.style.setProperty('--light-x', `${x * 100}%`);
    card.style.setProperty('--light-y', `${y * 100}%`);
  }, () => {
    card.style.removeProperty('--light-x');
    card.style.removeProperty('--light-y');
  });
});
