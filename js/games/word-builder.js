export class WordBuilderGame extends GameEngine {
  constructor(containerId, wordsData) {
    super(containerId);
    this.wordsData = wordsData;
    this.currentWordIndex = 0;
    this.initUI();
  }

  initUI() {
    this.renderCurrentWord();
  }

  renderCurrentWord() {
    if (this.currentWordIndex >= this.wordsData.words.length) {
      this.container.innerHTML = `<h3>You completed all words!</h3>`;
      return;
    }

    const wordObj = this.wordsData.words[this.currentWordIndex];
    const shuffledLetters = [...wordObj.letters].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div style="text-align:center;">
        <h3>Build the word: ${wordObj.meaning}</h3>
        <div id="drop-zone" style="min-height: 80px; border: 2px dashed #ccc; margin: 1rem; padding: 1rem; display: flex; gap: 0.5rem; justify-content: center;"></div>
        <div id="letters-pool" style="display: flex; gap: 0.5rem; justify-content: center;">
          ${shuffledLetters.map((l, i) => `<div class="letter-card" draggable="true" id="letter-${i}" data-letter="${l}" style="width:60px; height:60px;">${l}</div>`).join('')}
        </div>
        <button id="check-word" class="btn btn-primary" style="margin-top: 1rem;">Check</button>
      </div>
    `;

    this.setupDragDrop();

    document.getElementById('check-word').addEventListener('click', () => {
      this.checkWord(wordObj);
    });
  }

  setupDragDrop() {
    const dropZone = document.getElementById('drop-zone');
    const pool = document.getElementById('letters-pool');

    const draggables = pool.querySelectorAll('.letter-card');

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
      });
    });

    dropZone.addEventListener('dragover', e => e.preventDefault());
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const el = document.getElementById(id);
      if (el) dropZone.appendChild(el);
    });

    pool.addEventListener('dragover', e => e.preventDefault());
    pool.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const el = document.getElementById(id);
      if (el) pool.appendChild(el);
    });
  }

  checkWord(wordObj) {
    const dropZone = document.getElementById('drop-zone');
    const droppedLetters = Array.from(dropZone.children).map(el => el.getAttribute('data-letter'));
    const combined = droppedLetters.join('');

    if (combined === wordObj.word) {
      this.addScore(20);
      alert('Correct! XP +20');
      this.currentWordIndex++;
      this.renderCurrentWord();
    } else {
      alert('Try again!');
    }
  }
}
