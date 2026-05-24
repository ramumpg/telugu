import { playTeluguAudio, playSound } from '../audio.js';
import { addXP } from '../state.js';

export async function loadVarnamala(container, type) {
  try {
    const response = await fetch(`data/${type}.json`);
    const data = await response.json();

    container.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <a href="#home" class="btn btn-secondary" style="margin-bottom: 1rem;">&larr; Back</a>
        <h2 class="telugu-text">${data.title}</h2>
        <p>${data.description}</p>
      </div>
      <div class="grid-layout slide-up" id="letters-grid"></div>
    `;

    const grid = document.getElementById('letters-grid');

    if (data.letters) {
      // Vowels format
      data.letters.forEach(letter => {
        grid.appendChild(createLetterCard(letter));
      });
    } else if (data.groups) {
      // Consonants format
      data.groups.forEach(group => {
        group.letters.forEach(letter => {
          grid.appendChild(createLetterCard(letter));
        });
      });
    }
  } catch (error) {
    console.error('Error loading varnamala', error);
    container.innerHTML = `<p>Error loading data. Are you offline without cache?</p><a href="#home" class="btn btn-primary">Go Home</a>`;
  }
}

function createLetterCard(letterData) {
  const card = document.createElement('div');
  card.className = 'letter-card';
  card.textContent = letterData.char;

  card.addEventListener('click', () => {
    // Play GSAP animation
    if (window.gsap) {
      gsap.fromTo(card, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
    }

    // Play audio
    if (letterData.audio) {
      playTeluguAudio(letterData.audio);
    }
    playSound('click');

    // Add XP for interaction
    addXP(1);

    // Optional: Open modal with word/tracing info here
    showLetterDetails(letterData);
  });

  return card;
}

function showLetterDetails(letterData) {
  // Simple details implementation, could be expanded to a full modal
  console.log(`Clicked ${letterData.char}, word: ${letterData.word || 'N/A'}`);
}
