class AudioManager {
  private audioCache: Map<string, HTMLAudioElement>;
  private context: AudioContext | null;

  constructor() {
    this.audioCache = new Map();
    this.context = null;

    // Initialize AudioContext on first user interaction
    const initializeAudio = () => {
      if (!this.context) {
        this.context = new AudioContext();
      }
      document.removeEventListener("touchstart", initializeAudio);
      document.removeEventListener("click", initializeAudio);
    };

    document.addEventListener("touchstart", initializeAudio);
    document.addEventListener("click", initializeAudio);
  }

  preloadSound(soundFile: string): Promise<void> {
    if (this.audioCache.has(soundFile)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = "auto";

      audio.oncanplaythrough = () => {
        this.audioCache.set(soundFile, audio);
        resolve();
      };

      audio.onerror = (error) => {
        reject(error);
      };

      audio.src = soundFile;
      audio.load();
    });
  }

  async playSound(soundFile: string, volume: number = 0.2): Promise<void> {
    try {
      // If sound isn't cached, preload it first
      if (!this.audioCache.has(soundFile)) {
        await this.preloadSound(soundFile);
      }

      // Get cached audio element
      const originalAudio = this.audioCache.get(soundFile)!;

      // Clone the audio element for simultaneous playback
      const audio = originalAudio.cloneNode() as HTMLAudioElement;
      audio.volume = volume;

      // Use AudioContext for better mobile performance if available
      if (this.context && this.context.state === "running") {
        const source = this.context.createMediaElementSource(audio);
        const gainNode = this.context.createGain();
        gainNode.gain.value = volume;

        source.connect(gainNode);
        gainNode.connect(this.context.destination);
      }

      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }
}

export const audioManager = new AudioManager();

export const playSound = (soundFile: string) => {
  audioManager.playSound(soundFile, 0.2);
};
