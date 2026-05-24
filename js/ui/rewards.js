import { playSound } from '../audio.js';

export function showConfetti() {
  playSound('success');

  // Using Canvas for confetti (or rely on GSAP/Lottie if preferred)
  // Basic implementation placeholder
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#4CAF50'];

  for(let i=0; i<50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

    container.appendChild(confetti);

    if (window.gsap) {
      gsap.to(confetti, {
        y: window.innerHeight + 20,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 2 + 1,
        ease: "power1.out",
        onComplete: () => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }
      });
    }
  }

  // Clean up container after animations end
  setTimeout(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  }, 4000);
}
