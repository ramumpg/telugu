// Tracing Engine using Canvas API
export class TracingEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.points = [];

    this.initEvents();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', this.start.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stop.bind(this));
    this.canvas.addEventListener('mouseout', this.stop.bind(this));

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      const mouseEvent = new MouseEvent('mouseup', {});
      this.canvas.dispatchEvent(mouseEvent);
    });
  }

  start(e) {
    this.isDrawing = true;
    this.points = [];
    this.addPoint(e);
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.addPoint(e);
    this.render();
  }

  stop() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    // Check accuracy logic could go here
  }

  addPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.points.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }

  render() {
    if (this.points.length < 2) return;

    // Add simple glowing effect
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = 'var(--primary-color, #58CC02)';

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    this.ctx.strokeStyle = 'var(--primary-color, #58CC02)';
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    // Reset shadow
    this.ctx.shadowBlur = 0;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points = [];
  }
}
