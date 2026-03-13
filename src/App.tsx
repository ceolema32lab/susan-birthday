import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import HeartCanvas, { type HeartCanvasHandle } from './components/HeartCanvas';
import GiftBox from './components/GiftBox';
import susanPhoto from './assets/susan.jpg';
import musicFile from './assets/african_queen.mp3';

function App() {
  const [stage, setStage] = useState<'start' | 'gift' | 'reveal'>('start');
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartsRef = useRef<HeartCanvasHandle>(null);

  const startCelebration = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setStage('gift');
    // Magic entrance "pop"
    setTimeout(() => {
      heartsRef.current?.burst(15);
    }, 100);
  };

  const handleGiftClick = () => {
    setStage('reveal');
    startConfetti();
    // Heart burst "loves"
    heartsRef.current?.burst(40);
  };

  const startConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Standard pops
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2e86', '#ff4da6', '#ffffff']
      });

      // Magical shapes - hearts
      const heart = confetti.shapeFromText({ text: '💖', scalar: 2 });

      confetti({
        particleCount: 10,
        spread: 100,
        origin: { y: 0.6 },
        shapes: [heart],
        scalar: 2
      });

      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff2e86', '#ff4da6']
      });

      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff2e86', '#ff4da6']
      });
    }, 1500);
  };

  return (
    <div className="App">
      <audio ref={audioRef} src={musicFile} loop />

      <HeartCanvas ref={heartsRef} />

      {stage === 'start' && (
        <div className="magic-entrance" onClick={startCelebration}>
          <span>✨</span>
        </div>
      )}

      {stage === 'gift' && <GiftBox onClick={handleGiftClick} />}

      {stage === 'reveal' && (
        <div className="birthday-content">
          <h1 className="name-header">Susan</h1>
          <img src={susanPhoto} alt="Susan" className="susan-photo" />
          <p className="message">
            Happy Birthday beautiful 🎉<br />
            May your life be filled with love, happiness and endless smiles 💖
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
