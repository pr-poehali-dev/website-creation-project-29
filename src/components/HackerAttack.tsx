import { useState, useEffect, useRef } from 'react';

const HackerAttack = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [glitchText, setGlitchText] = useState('SYSTEM HACKED');
  const sirenRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const siren = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_13bb4b3c55.mp3');
    siren.loop = true;
    siren.volume = 0.5;
    sirenRef.current = siren;

    return () => {
      if (sirenRef.current) {
        sirenRef.current.pause();
        sirenRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const attackStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const attackEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 1);

      if (now >= attackStart && now < attackEnd) {
        if (!isActive) {
          setIsActive(true);
          if (sirenRef.current) {
            sirenRef.current.play().catch(() => {});
          }
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
          }
        }
        const secondsLeft = Math.floor((attackEnd.getTime() - now.getTime()) / 1000);
        setTimeLeft(secondsLeft);
      } else if (isActive) {
        setIsActive(false);
        if (sirenRef.current) {
          sirenRef.current.pause();
          sirenRef.current.currentTime = 0;
        }
      }
    };

    const interval = setInterval(checkTime, 1000);
    checkTime();

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const glitchTexts = [
      'SYSTEM HACKED',
      'ACCESS DENIED',
      'ERROR 666',
      'SECURITY BREACH',
      'CYBER ATTACK',
      '!@#$%^&*()',
      'INTRUDER DETECTED'
    ];

    const glitchInterval = setInterval(() => {
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)]);
    }, 200);

    return () => clearInterval(glitchInterval);
  }, [isActive]);

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-950/95 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
      style={{ pointerEvents: 'all' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-black to-red-900/50 animate-pulse"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-red-600 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-red-600 animate-pulse"></div>

      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="text-8xl md:text-9xl font-black text-red-500 animate-pulse drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">
          ⚠️
        </div>

        <h1 
          className="text-5xl md:text-7xl font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] tracking-wider animate-pulse"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 10px #ef4444, 0 0 20px #dc2626, 0 0 30px #991b1b'
          }}
        >
          {glitchText}
        </h1>

        <div className="space-y-4">
          <p className="text-2xl md:text-3xl text-red-400 font-bold tracking-wide">
            🚨 SYSTEM COMPROMISED 🚨
          </p>
          <p className="text-xl text-red-300 font-mono">
            All systems have been encrypted
          </p>
        </div>

        <div className="bg-black/50 border-4 border-red-600 rounded-lg p-8 mx-auto max-w-md backdrop-blur-sm">
          <p className="text-red-400 font-mono text-sm mb-4">LOCKDOWN TIME REMAINING:</p>
          <div className="text-6xl font-black text-red-500 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        <div className="space-y-2 font-mono text-xs text-red-400/70">
          <p>ERROR CODE: 0x80070666</p>
          <p>PAYLOAD: TROJAN.RANSOMWARE.LEVIKS</p>
          <p>IP: 192.168.666.13</p>
          <p>STATUS: ENCRYPTED</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <p className="text-sm font-mono">ATTACK IN PROGRESS</p>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-red-500/30"
            style={{
              top: `${i * 5}%`,
              animation: `glitch ${Math.random() * 2 + 1}s infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          25% { transform: translateX(-10px); opacity: 0.5; }
          50% { transform: translateX(10px); opacity: 0.2; }
          75% { transform: translateX(-5px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default HackerAttack;