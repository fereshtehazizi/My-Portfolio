const githubProfile = 'https://github.com/fereshtehazizi';
// Each project ends with: live URL, GitHub repository URL. Replace the empty strings with your own links.
const projects = [
  ['project1.png', 'Brand identity collection', 'Graphic Design', 'A visual identity exploration balancing strong type, warm color, and memorable details.', '', ''],
  ['project2.png', 'Editorial poster design', 'Graphic Design', 'A clean poster composition created to make the message immediate and engaging.', '', ''],
  ['project3.png', 'Creative campaign artwork', 'Graphic Design', 'A campaign concept that pairs expressive visuals with a clear visual hierarchy.', '', ''],
  ['project4.png', 'Social media design', 'Digital Content', 'A bold, adaptable social graphic designed to stand out in a fast-moving feed.', '', ''],
  ['project5.png', 'Illustrated visual story', 'Illustration', 'An illustration-led project that brings personality and a sense of narrative to the design.', '', ''],
  ['project6.png', 'Modern web concept', 'Web Design', 'A responsive web interface focused on clarity, useful navigation, and visual balance.', '', ''],
  ['project7.png', 'Campaign layout system', 'Graphic Design', 'A flexible visual system for presenting information consistently.', '', ''],
  ['project8.png', 'Creative print series', 'Print Design', 'A polished print piece with thoughtful composition and visual details.', '', ''],
  ['project9.png', 'Digital showcase design', 'Digital Content', 'A high-impact digital layout crafted to communicate a focused message beautifully.', '', ''],
  ['port3.JPG', 'Featured visual work', 'Graphic Design', 'A featured visual project showcasing composition, color, and typography.', '', ''],
  ['port6.JPG', 'Portfolio highlight', 'Creative Direction', 'A portfolio highlight built around a distinct idea and confident visual presentation.', '', '']
];

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
const toggle = document.querySelector('.theme-toggle');
const syncTheme = () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  if (toggle) toggle.innerHTML = `<i class="fa-solid fa-${dark ? 'sun' : 'moon'}"></i>`;
};
syncTheme();
toggle?.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', document.documentElement.dataset.theme);
  syncTheme();
});

const actions = (project, index) => {
  const liveUrl = project[4]?.trim() || `project.html?id=${index}`;
  const githubUrl = project[5]?.trim() || githubProfile;
  return `<div class="project-actions"><a class="project-action" href="${liveUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live preview</a><a class="project-action" href="${githubUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a></div>`;
};

const grid = document.querySelector('#project-grid');
if (grid) grid.innerHTML = projects.map((p, i) => `<div class="project-wrap"><a href="project.html?id=${i}"><img src="projects/${p[0]}" alt="${p[1]}" loading="lazy"><div><p>${String(i + 1).padStart(2, '0')} · ${p[2]}</p><h3>${p[1]} <span>↗</span></h3></div></a>${actions(p, i)}</div>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu'), nav = document.querySelector('header > nav');
menu?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) return form.reportValidity();
  const data = new FormData(form);
  document.querySelector('#status').textContent = 'Opening your email app with your message…';
  location.href = 'mailto:fereshtehazizi710@gmail.com?subject=' + encodeURIComponent(data.get('subject')) + '&body=' + encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  form.reset();
});

setTimeout(() => {
  const detailCopy = document.querySelector('.project-copy');
  const id = +new URLSearchParams(location.search).get('id') || 0;
  if (detailCopy) detailCopy.insertAdjacentHTML('beforeend', `<div class="detail-actions">${actions(projects[id] || projects[0], id)}</div>`);
}, 0);
