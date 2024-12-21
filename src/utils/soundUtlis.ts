export const playSound = (soundFile: string) => {
  const audio = new Audio(soundFile);
  audio.volume = 0.2;
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
};
