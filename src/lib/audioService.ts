/**
 * Utility to play high-quality UI sounds using Web Audio API
 * Avoids the need for external asset files
 */

class AudioService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number, startDelay: number = 0) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startDelay);

    gain.gain.setValueAtTime(0, this.ctx.currentTime + startDelay);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + startDelay + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startDelay + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + startDelay);
    osc.stop(this.ctx.currentTime + startDelay + duration);
  }

  /**
   * Play a 'listening started' sound (ascending)
   */
  playStart() {
    this.init();
    if (!this.ctx) return;
    this.playTone(440, 'sine', 0.4, 0.1, 0);
    this.playTone(880, 'sine', 0.4, 0.07, 0.1);
  }

  /**
   * Play a 'listening stopped' sound (descending)
   */
  playStop() {
    this.init();
    if (!this.ctx) return;
    this.playTone(880, 'sine', 0.4, 0.1, 0);
    this.playTone(440, 'sine', 0.4, 0.07, 0.1);
  }

  /**
   * Play a 'success' or 'message received' sound
   */
  playSuccess() {
    this.init();
    if (!this.ctx) return;
    this.playTone(660, 'sine', 0.5, 0.05, 0);
    this.playTone(990, 'sine', 0.5, 0.05, 0.15);
  }

  /**
   * Play a 'tap' sound
   */
  playTap() {
    this.init();
    if (!this.ctx) return;
    this.playTone(500, 'sine', 0.1, 0.05, 0);
  }
}

export const audioService = new AudioService();
