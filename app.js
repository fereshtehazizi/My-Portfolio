const githubProfile = 'https://github.com/fereshtehazizi';
// Each project: [image, title, category, description, live URL, GitHub URL, tech stack, year].
// Image paths starting with http(s) are used as-is; anything else is loaded from the projects/ folder.
// Leave the live URL empty when a project has no working deployment — only the GitHub link will render.
const projects = [
  ['https://raw.githubusercontent.com/fereshtehazizi/KaarYab/main/public/screenshots/dash.png', 'KaarYab', 'Next.js application', 'A modern job portal connecting job seekers with jobs, scholarships, and internships — authentication, admin and user dashboards, and a responsive interface built on Next.js and PostgreSQL.', 'https://kaaryab.vercel.app', 'https://github.com/fereshtehazizi/KaarYab', 'Next.js, TypeScript, Tailwind CSS, Material UI, NextAuth, PostgreSQL', '2026'],
  ['https://raw.githubusercontent.com/fereshtehazizi/next-explorer/main/public/explore-screenshot.JPG', 'World Explorer', 'Next.js application', 'Explore countries around the world — flags, capitals, populations, currencies, and languages — with fast search, filters, and rich detail pages.', 'https://next-explorer-eosin.vercel.app', 'https://github.com/fereshtehazizi/next-explorer', 'Next.js, TypeScript, Tailwind CSS, Material UI', '2026'],
  ['project9.png', 'Goal Tracker', 'React dashboard', 'A personal productivity dashboard with goal categories, analytics charts, and a built-in calendar — styled with Material UI and backed by Firebase.', 'https://goal-tracker-ecru-chi.vercel.app', 'https://github.com/fereshtehazizi/goal-tracker', 'React, Material UI, Firebase, Recharts, FullCalendar, Tailwind CSS', '2026'],
  ['project8.png', 'Products Store', 'React e-commerce', 'A storefront with product listings and cart logic — global state managed by Redux Toolkit and data fetching with React Query and Axios.', '', 'https://github.com/fereshtehazizi/Product-Store', 'React, Redux Toolkit, React Query, Material UI, Tailwind CSS', '2026'],
  ['project6.png', 'Movie Watchlist', 'React app', 'Save movies to watch later and move them between your “to watch” and “watched” lists — a clean, fast interface built with React and Vite.', 'https://movie-watch-list-self.vercel.app', 'https://github.com/fereshtehazizi/Movie-watch-list', 'React, Vite', '2026'],
  ['project3.png', 'Clean the Park!', 'Browser game', 'An interactive recycling game — grab trash with your mouse or touch, throw it in the bin, and beat the clock across three difficulty levels, with sound and music.', 'https://fereshtehazizi.github.io/Park_Game.js/', 'https://github.com/fereshtehazizi/Park_Game.js', 'JavaScript, HTML, CSS', '2025'],
  ['project1.png', 'Pearls of Thoughts', 'Web app', 'A bilingual home for Afghan proverbs (Zarbul Masal) — search, a visual gallery, and community submissions that celebrate Afghan wisdom in Dari and English.', 'https://fereshtehazizi.github.io/Afghan-Proverbs-Pearls-of-thoughts/', 'https://github.com/fereshtehazizi/Afghan-Proverbs-Pearls-of-thoughts', 'HTML, CSS, JavaScript', '2025'],
  ['project4.png', 'Classroom Pocket', 'Study tool', 'A wallet full of study capsules — create notes, flashcards, and quizzes, then import and export them as JSON with local saving so no work is ever lost.', 'https://fereshtehazizi.github.io/classroom-pocket.js/', 'https://github.com/fereshtehazizi/classroom-pocket.js', 'JavaScript, JSON import/export', '2025'],
  ['port3.JPG', 'Foodie Hub', 'Restaurant website', 'A rich multi-section restaurant website for a Bangkok dining experience — menus, chef profiles, customer reviews, and image sliders.', 'https://fereshtehazizi.github.io/Foi-Thong-Hub/', 'https://github.com/fereshtehazizi/Foi-Thong-Hub', 'HTML, CSS, JavaScript', '2025'],
  ['port6.JPG', 'AnimeVerse', 'Anime showcase', 'A cinematic anime website with detail pages and ratings for hit series like Solo Leveling and Attack on Titan.', 'https://fereshtehazizi.github.io/AnimeVerse/', 'https://github.com/fereshtehazizi/AnimeVerse', 'HTML, CSS', '2025']
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

const imgSrc = src => (/^https?:\/\//.test(src) ? src : `projects/${src}`);

const actions = project => {
  const liveUrl = project[4]?.trim();
  const githubUrl = project[5]?.trim() || githubProfile;
  const liveLink = liveUrl ? `<a class="project-action" href="${liveUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live preview</a>` : '';
  return `<div class="project-actions">${liveLink}<a class="project-action" href="${githubUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a></div>`;
};

const chips = tech => tech ? `<div class="project-stack">${tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>` : '';

const grid = document.querySelector('#project-grid');
if (grid) grid.innerHTML = projects.map((p, i) => `<div class="project-wrap"><a href="project.html?id=${i}"><img src="${imgSrc(p[0])}" alt="${p[1]}" loading="lazy"><div><p>${String(i + 1).padStart(2, '0')} · ${p[2]}</p><h3>${p[1]} <span>↗</span></h3>${chips(p[6])}</div></a>${actions(p, i)}</div>`).join('');

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

// Detail-page action buttons are rendered by the inline script in project.html.
