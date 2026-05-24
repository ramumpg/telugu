import { AppState } from '../state.js';

export function renderDashboard(container) {
  const xp = AppState.xp;

  container.innerHTML = `
    <div class="fade-in" style="padding: 1rem;">
      <h2>Parent Dashboard</h2>
      <div class="card">
        <h3>Learning Stats</h3>
        <p><strong>Total XP:</strong> ${xp}</p>
        <p><strong>Completed Lessons:</strong> ${AppState.completedLessons.length}</p>
        <p><strong>Badges Unlocked:</strong> ${AppState.unlockedBadges.length}</p>
      </div>

      <div class="card">
        <h3>Settings</h3>
        <label style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
          Sound Effects
          <input type="checkbox" id="toggle-sound" ${AppState.settings.soundEnabled ? 'checked' : ''}>
        </label>
      </div>
    </div>
  `;

  // Example of binding events
  document.getElementById('toggle-sound')?.addEventListener('change', (e) => {
    AppState.settings.soundEnabled = e.target.checked;
    import('../state.js').then(({saveState}) => saveState());
  });
}
