let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSamsungClickSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Samsung keypad tone is a very subtle, soft wooden pop around 480Hz dropping to 220Hz in 35ms
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}

export function triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
  if (typeof window === 'undefined' || !navigator.vibrate) return;
  try {
    if (type === 'light') {
      navigator.vibrate(12);
    } else if (type === 'medium') {
      navigator.vibrate(25);
    } else if (type === 'success') {
      navigator.vibrate([15, 40, 20]);
    }
  } catch {
    // Vibration not allowed or unsupported
  }
}
