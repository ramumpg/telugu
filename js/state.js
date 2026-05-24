import { Storage } from './storage.js';

const STATE_KEY = 'telugu_app_state';

export let AppState = {
  xp: 0,
  completedLessons: [],
  unlockedBadges: [],
  settings: {
    soundEnabled: true,
    bgmEnabled: false
  }
};

export function initState() {
  const savedState = Storage.load(STATE_KEY);
  if (savedState) {
    AppState = { ...AppState, ...savedState };
  }
  updateUI();
}

export function saveState() {
  Storage.save(STATE_KEY, AppState);
}

export function addXP(amount) {
  AppState.xp += amount;
  saveState();
  updateUI();

  // Trigger animation
  const xpEl = document.getElementById('xp-display');
  if (xpEl) {
    xpEl.classList.add('pulse');
    setTimeout(() => xpEl.classList.remove('pulse'), 1000);
  }
}

function updateUI() {
  const xpEl = document.getElementById('xp-display');
  if (xpEl) {
    xpEl.textContent = `XP: ${AppState.xp}`;
  }
}
