export class GameEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.score = 0;
    this.isActive = false;
  }

  start() {
    this.isActive = true;
    this.score = 0;
    this.render();
  }

  stop() {
    this.isActive = false;
  }

  addScore(points) {
    this.score += points;
    this.updateScoreDisplay();
  }

  render() {
    // Override in specific game classes
  }

  updateScoreDisplay() {
    // Logic to update score UI
  }
}
