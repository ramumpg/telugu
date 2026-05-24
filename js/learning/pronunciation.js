export class PronunciationSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.isRecording = false;
    this.animationId = null;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);

      this.isRecording = true;
      this.visualize();

      // Simulate checking after 3 seconds
      setTimeout(() => this.stopRecordingAndScore(), 3000);

      return true;
    } catch (e) {
      console.error('Microphone access denied or error', e);
      alert('Microphone access is required for pronunciation check.');
      return false;
    }
  }

  visualize() {
    if (!this.ctx || !this.isRecording) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.isRecording) return;
      this.animationId = requestAnimationFrame(draw);

      this.analyser.getByteFrequencyData(dataArray);

      this.ctx.fillStyle = '#F7F7F7';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      const barWidth = (this.canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        this.ctx.fillStyle = '#1CB0F6';
        this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }

  stopRecordingAndScore() {
    this.isRecording = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.microphone) {
      this.microphone.mediaStream.getTracks().forEach(track => track.stop());
      this.microphone.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }

    // Pseudo-score calculation (since real offline AI speech recognition is heavy)
    const score = Math.floor(Math.random() * 40) + 60; // Random score 60-100

    if (this.ctx) {
      this.ctx.fillStyle = '#F7F7F7';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = score > 80 ? '#58CC02' : '#FFC800';
      this.ctx.font = '24px Poppins, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`Score: ${score}%`, this.canvas.width / 2, this.canvas.height / 2);
    }

    return score;
  }
}
