import { GameEngine } from '../engine/game-engine.js';
import { playSound } from '../audio.js';

export class BubblePopGame extends GameEngine {
  constructor(containerId, letters) {
    super(containerId);
    this.letters = letters;
    this.bubbles = [];
    this.animationId = null;
    this.initUI();
  }

  initUI() {
    this.container.innerHTML = `
      <div style="text-align:center;">
        <h3>Bubble Pop</h3>
        <p>Pop the correct letter to match the sound (Mock)</p>
        <div style="position: relative; width: 100%; height: 400px; background: #e0f7fa; border-radius: 16px; overflow: hidden; border: 2px solid #b2ebf2;" id="bubble-area">
        </div>
      </div>
    `;
    this.area = document.getElementById('bubble-area');
    this.startSpawning();
  }

  startSpawning() {
    this.spawnInterval = setInterval(() => this.spawnBubble(), 1500);
    this.updateLoop();
  }

  spawnBubble() {
    if(!this.isActive) return;

    const char = this.letters[Math.floor(Math.random() * this.letters.length)];
    const bubble = document.createElement('div');
    const size = Math.random() * 40 + 40;

    bubble.style.position = 'absolute';
    bubble.style.bottom = '-60px';
    bubble.style.left = `${Math.random() * 80}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'rgba(28, 176, 246, 0.6)';
    bubble.style.border = '2px solid rgba(255, 255, 255, 0.8)';
    bubble.style.display = 'flex';
    bubble.style.justifyContent = 'center';
    bubble.style.alignItems = 'center';
    bubble.style.fontSize = '24px';
    bubble.style.color = '#fff';
    bubble.style.fontFamily = 'var(--font-telugu)';
    bubble.style.cursor = 'pointer';
    bubble.textContent = char;

    bubble.addEventListener('click', () => {
      this.popBubble(bubble, char);
    });

    this.area.appendChild(bubble);
    this.bubbles.push({ el: bubble, y: -60, speed: Math.random() * 2 + 1 });
  }

  updateLoop() {
    if (!this.isActive) return;

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.y += b.speed;
      b.el.style.bottom = `${b.y}px`;

      if (b.y > 450) {
        if(b.el.parentNode) b.el.parentNode.removeChild(b.el);
        this.bubbles.splice(i, 1);
      }
    }

    this.animationId = requestAnimationFrame(() => this.updateLoop());
  }

  popBubble(bubbleEl, char) {
    if(bubbleEl.parentNode) {
      playSound('click');
      this.addScore(5);
      bubbleEl.parentNode.removeChild(bubbleEl);
      this.bubbles = this.bubbles.filter(b => b.el !== bubbleEl);
    }
  }

  stop() {
    super.stop();
    clearInterval(this.spawnInterval);
    if(this.animationId) cancelAnimationFrame(this.animationId);
  }
}
