import { initRouter } from './router.js';
import { initState } from './state.js';
import { initAudio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed', err));
  }

  // Initialize App Modules
  initState();
  initAudio();
  initRouter();

  // Render initial layout
  renderApp();
});

function renderApp() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <nav style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary-color); color: white;">
      <h2>తెలుగు నేర్చుకుందాం</h2>
      <div>
        <span id="xp-display">XP: 0</span>
      </div>
    </nav>
  `;
}
