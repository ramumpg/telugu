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
    <nav style="display: flex; justify-content: space-between; padding: 1rem; background: var(--primary-color); color: white; align-items: center;">
      <h2 class="telugu-text" style="margin:0;">తెలుగు నేర్చుకుందాం</h2>
      <div style="font-weight: bold; background: rgba(0,0,0,0.1); padding: 0.5rem 1rem; border-radius: var(--border-radius-full);">
        <span id="xp-display">⭐ 0 XP</span>
      </div>
    </nav>
  `;
}
