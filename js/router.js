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
  } else if (hash === 'play-memory') {
    content.innerHTML = `<h2>Memory Match</h2><div id="game-container"></div><a href="#home" class="btn btn-secondary" style="margin-top:1rem;">Back</a>`;
    import('./games/memory-match.js').then(({MemoryMatchGame}) => {
      const letters = ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఎ', 'ఏ', 'ఐ', 'ఒ'];
      const game = new MemoryMatchGame('game-container', letters);
      game.start();
    });
  } else if (hash === 'play-bubble') {
    content.innerHTML = `<h2>Bubble Pop</h2><div id="game-container"></div><a href="#home" class="btn btn-secondary" style="margin-top:1rem;">Back</a>`;
    import('./games/bubble-pop.js').then(({BubblePopGame}) => {
      const letters = ['క', 'చ', 'ట', 'త', 'ప'];
      const game = new BubblePopGame('game-container', letters);
      game.start();
      // stop game when navigating away logic needs robust handling, but basic works
    });
  } else if (hash === 'pronunciation') {
    content.innerHTML = `
      <div style="text-align:center;">
        <h2>Pronunciation Practice</h2>
        <canvas id="pronunciation-canvas" width="300" height="150" style="background:#F7F7F7; border-radius:16px; margin: 1rem 0;"></canvas>
        <br>
        <button id="start-recording" class="btn btn-primary">Start Recording</button>
        <br><a href="#home" class="btn btn-secondary" style="margin-top:1rem;">Back</a>
      </div>
    `;
    import('./learning/pronunciation.js').then(({PronunciationSystem}) => {
      const system = new PronunciationSystem('pronunciation-canvas');
      document.getElementById('start-recording').addEventListener('click', (e) => {
        e.target.disabled = true;
        e.target.textContent = 'Recording (3s)...';
        system.startRecording().then(() => {
          setTimeout(() => {
            e.target.disabled = false;
            e.target.textContent = 'Start Recording';
          }, 3000);
        });
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
      <h1 class="telugu-text bounce" style="color: var(--primary-color);">నమస్కారం!</h1>
      <p style="color: var(--text-dark); margin-bottom: 2rem;">Welcome to the Telugu Learning App</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 500px; margin: 0 auto;">
        <a href="#learn-vowels" class="btn btn-primary telugu-text">అచ్చులు</a>
        <a href="#learn-consonants" class="btn btn-primary telugu-text">హల్లులు</a>
        <a href="#learn-guninthalu" class="btn btn-primary telugu-text">గుణింతాలు</a>
        <a href="#pronunciation" class="btn btn-primary">Pronunciation</a>

        <a href="#play-tracing" class="btn btn-secondary">Tracing Game</a>
        <a href="#play-word-builder" class="btn btn-secondary">Word Builder</a>
        <a href="#play-memory" class="btn btn-secondary">Memory Match</a>
        <a href="#play-bubble" class="btn btn-secondary">Bubble Pop</a>

        <a href="#dashboard" class="btn btn-secondary" style="grid-column: span 2; background: var(--tertiary-color); color: var(--text-dark); box-shadow: 0 4px 0 var(--tertiary-color-dark);">Parent Dashboard</a>
      </div>
    </div>
  `;
}
