async function renderProjects() {
  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    const grid = document.getElementById('projectGrid');
    const q = (document.getElementById('search').value || '').toLowerCase();
    grid.innerHTML = '';
    projects
      .filter(p => !q || p.name.toLowerCase().includes(q) || (p.stack.join(' ').toLowerCase().includes(q)))
      .forEach(p => {
        const card = document.createElement('article');
        card.className = 'rounded-2xl border p-5 hover:shadow transition bg-white';
        card.innerHTML = `
          <h3 class="font-semibold text-lg">${p.name}</h3>
          <p class="mt-2 text-sm text-slate-600">${p.desc}</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">${p.stack.map(s=>`<span class="rounded-full border px-2 py-1">${s}</span>`).join('')}</div>
          <div class="mt-4 flex gap-3 text-sm">
            ${p.code ? `<a class="underline" target="_blank" href="${p.code}">Code</a>` : ''}
            ${p.demo ? `<a class="underline" target="_blank" href="${p.demo}">Demo</a>` : ''}
          </div>`;
        grid.appendChild(card);
      });
  } catch (e) {
    console.error(e);
  }
}
document.getElementById('search').addEventListener('input', renderProjects);
renderProjects();
