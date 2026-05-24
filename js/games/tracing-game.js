import { GameEngine } from '../engine/game-engine.js';

export class TracingGame extends GameEngine {
  constructor(containerId, letterData) {
    super(containerId);
    this.letterData = letterData;
    this.initUI();
  }

  initUI() {
    this.container.innerHTML = `
      <div style="text-align:center;">
        <h3>Trace the letter: ${this.letterData.char}</h3>
        <canvas id="tracing-canvas" width="300" height="300" style="border: 2px dashed #ccc; border-radius: 16px; background: #fafafa;"></canvas>
        <div style="margin-top: 1rem;">
          <button id="clear-tracing" class="btn btn-secondary">Clear</button>
          <button id="check-tracing" class="btn btn-primary">Check</button>
        </div>
      </div>
    `;

    // Lazy import the tracing engine
    import('../tracing/tracing.js').then(({TracingEngine}) => {
      this.tracingEngine = new TracingEngine('tracing-canvas');

      document.getElementById('clear-tracing').addEventListener('click', () => {
        this.tracingEngine.clear();
      });

      document.getElementById('check-tracing').addEventListener('click', () => {
        this.checkAccuracy();
      });
    });
  }

  checkAccuracy() {
    // Better placeholder for accuracy checking
    if (this.tracingEngine.points.length > 50) {
      this.addScore(10);
      import('../ui/rewards.js').then(({showConfetti}) => {
        showConfetti();
      });
      // Delay before clearing
      setTimeout(() => {
        this.tracingEngine.clear();
        alert('Excellent tracing!');
      }, 500);
    } else {
      alert('Trace a bit more of the letter!');
    }
  }
}
