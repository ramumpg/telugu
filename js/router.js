import { loadVarnamala } from './learning/varnamala.js';
import { initGuninthaluMergeSystem } from './learning/guninthalu.js';
import { renderDashboard } from './ui/dashboard.js';

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);

  // Handle initial route
  if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRoute();
  }
}

async function handleRoute() {
  const content = document.getElementById('content');
  const hash = window.location.hash.slice(1);

  content.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading...</div>';
  content.className = 'fade-in';

  // Simulate tiny delay for transition
  await new Promise(r => setTimeout(r, 100));

  if (hash === 'home') {
    renderHome(content);
  } else if (hash === 'learn-vowels') {
    loadVarnamala(content, 'vowels');
  } else if (hash === 'learn-consonants') {
    loadVarnamala(content, 'consonants');
  } else if (hash === 'learn-guninthalu') {
    initGuninthaluMergeSystem(content);
  } else if (hash === 'play-tracing') {
    content.innerHTML = `<h2>Tracing Game</h2><div id="game-container"></div><a href="#home" class="btn btn-secondary" style="margin-top:1rem;">Back</a>`;
    import('./games/tracing-game.js').then(({TracingGame}) => {
      const game = new TracingGame('game-container', {char: 'అ'});
      game.start();
    });
  } else if (hash === 'play-word-builder') {
    content.innerHTML = `<h2>Word Builder</h2><div id="game-container"></div><a href="#home" class="btn btn-secondary" style="margin-top:1rem;">Back</a>`;
    fetch('data/words.json').then(r => r.json()).then(data => {
      import('./games/word-builder.js').then(({WordBuilderGame}) => {
        const game = new WordBuilderGame('game-container', data);
        game.start();
      });
    });
  } else if (hash === 'dashboard') {
    renderDashboard(content);
  } else {
    content.innerHTML = `<h2>Page Not Found</h2><a href="#home" class="btn btn-primary">Go Home</a>`;
  }
}

function renderHome(container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <h1 class="telugu-text bounce">నమస్కారం!</h1>
      <p>Welcome to Telugu Learning App</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 2rem auto;">
        <a href="#learn-vowels" class="btn btn-primary">అచ్చులు</a>
        <a href="#learn-consonants" class="btn btn-primary">హల్లులు</a>
        <a href="#learn-guninthalu" class="btn btn-primary">గుణింతాలు</a>
        <a href="#play-tracing" class="btn btn-secondary">Tracing Game</a>
        <a href="#play-word-builder" class="btn btn-secondary">Word Builder</a>
        <a href="#dashboard" class="btn btn-secondary">Dashboard</a>
      </div>
    </div>
  `;
}
