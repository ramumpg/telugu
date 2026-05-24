import { GameEngine } from '../engine/game-engine.js';
import { playSound } from '../audio.js';

export class MemoryMatchGame extends GameEngine {
  constructor(containerId, letters) {
    super(containerId);
    // Duplicate and shuffle letters for memory game
    const selectedLetters = letters.slice(0, 6);
    this.cards = [...selectedLetters, ...selectedLetters]
      .sort(() => Math.random() - 0.5);

    this.flippedIndices = [];
    this.matchedIndices = [];
    this.initUI();
  }

  initUI() {
    this.container.innerHTML = `
      <div style="text-align:center;">
        <h3>Memory Match</h3>
        <div class="grid-layout" style="max-width: 400px; margin: 0 auto; gap: 10px;">
          ${this.cards.map((char, index) => `
            <div class="letter-card" id="mem-card-${index}" data-index="${index}" style="cursor: pointer; background: var(--secondary-color); color: transparent; transition: all 0.3s;">
               ?
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.container.querySelectorAll('.letter-card').forEach(card => {
      card.addEventListener('click', (e) => this.flipCard(e.target));
    });
  }

  flipCard(cardEl) {
    const index = parseInt(cardEl.getAttribute('data-index'));

    if (this.flippedIndices.length === 2 || this.matchedIndices.includes(index) || this.flippedIndices.includes(index)) {
      return;
    }

    playSound('click');

    // Flip UI
    cardEl.style.background = 'var(--card-bg)';
    cardEl.style.color = 'var(--secondary-color)';
    cardEl.textContent = this.cards[index];

    this.flippedIndices.push(index);

    if (this.flippedIndices.length === 2) {
      setTimeout(() => this.checkMatch(), 1000);
    }
  }

  checkMatch() {
    const [idx1, idx2] = this.flippedIndices;
    const card1 = document.getElementById(`mem-card-${idx1}`);
    const card2 = document.getElementById(`mem-card-${idx2}`);

    if (this.cards[idx1] === this.cards[idx2]) {
      // Match
      this.matchedIndices.push(idx1, idx2);
      card1.style.background = 'var(--primary-color)';
      card2.style.background = 'var(--primary-color)';
      card1.style.color = 'white';
      card2.style.color = 'white';
      playSound('success');
      this.addScore(10);

      if (this.matchedIndices.length === this.cards.length) {
        setTimeout(() => {
          alert('You won Memory Match!');
          import('../ui/rewards.js').then(({showConfetti}) => showConfetti());
        }, 500);
      }
    } else {
      // No match
      card1.style.background = 'var(--secondary-color)';
      card2.style.background = 'var(--secondary-color)';
      card1.style.color = 'transparent';
      card2.style.color = 'transparent';
      card1.textContent = '?';
      card2.textContent = '?';
    }

    this.flippedIndices = [];
  }
}
