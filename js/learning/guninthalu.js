// Logic for Guninthalu interactive merge system
import { addXP } from '../state.js';
import { playSound } from '../audio.js';

export async function initGuninthaluMergeSystem(container) {
  try {
    const res = await fetch('data/guninthalu.json');
    const data = await res.json();

    // Pick the first one to test
    const consonant = data.baseConsonants[0];
    const targetSign = data.vowelSigns.find(s => s.sign === 'ు') || data.vowelSigns[1];

    container.innerHTML = `
      <div style="text-align:center; padding: 2rem;">
        <h2 class="telugu-text" style="color:var(--primary-color)">${data.title}</h2>
        <p>Interactive Merge Module - Drag the sign onto the consonant</p>

        <div style="display:flex; justify-content:center; gap: 2rem; margin-top:2rem; align-items:center;">
          <div class="letter-card" id="consonant-zone">${consonant}</div>
          <div style="font-size:2rem;">+</div>
          <div class="letter-card" id="vowel-sign-zone" draggable="true" data-sign="${targetSign.sign}" style="cursor:grab">${targetSign.sign || targetSign.name}</div>
          <div style="font-size:2rem;">=</div>
          <div class="letter-card" id="result-zone" style="background:var(--tertiary-color); color:var(--text-dark);">?</div>
        </div>
      </div>
    `;

    const signEl = document.getElementById('vowel-sign-zone');
    const resultEl = document.getElementById('result-zone');

    signEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', targetSign.sign);
    });

    resultEl.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    resultEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedData = e.dataTransfer.getData('text/plain');
      if (draggedData === targetSign.sign) {
        resultEl.textContent = consonant + targetSign.sign;
        resultEl.classList.add('bounce');
        playSound('success');
        addXP(5);
        if(window.gsap) {
          gsap.to(resultEl, {backgroundColor: 'var(--success-color)', color: 'white', duration: 0.5});
        }
      }
    });
  } catch(e) {
    container.innerHTML = `<p>Error loading data.</p>`;
  }
}
