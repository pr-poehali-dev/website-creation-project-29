import { useEffect, useState, useRef } from 'react';

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
      siren.pause();
      sirenRef.current = null;
    };
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const attackStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 57, 0);
      const attackEnd = new Date(attackStart.getTime() + 5 * 60 * 1000);

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
      } else {
        if (isActive) {
          setIsActive(false);
          if (sirenRef.current) {
            sirenRef.current.pause();
            sirenRef.current.currentTime = 0;
          }
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const glitchTexts = [
      'SYSTEM HACKED',
      'SY5T3M H4CK3D',
      '5Y5T3M H4CK3D',
      'SYSTEM HACKED',
      'SYS7EM HAC|<ED',
    ];

    const glitchInterval = setInterval(() => {
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)]);
    }, 150);

    return () => clearInterval(glitchInterval);
  }, [isActive]);

  if (!isActive) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
        <div className="relative max-w-2xl w-full mx-4">
          <div className="bg-gradient-to-br from-red-900/90 to-black border-4 border-red-500 rounded-lg p-8 shadow-2xl shadow-red-500/50 animate-pulse-slow">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 blur-3xl opacity-50 animate-pulse"></div>
                <h1 className="relative text-6xl font-bold text-red-500 mb-2 glitch-text tracking-wider">
                  {glitchText}
                </h1>
              </div>

              <div className="bg-black/50 border-2 border-red-500 rounded p-6">
                <div className="text-red-400 text-xl mb-4 font-mono">
                  ⚠️ КРИТИЧЕСКАЯ ОШИБКА СИСТЕМЫ ⚠️
                </div>
                <div className="text-white/90 text-base mb-6 space-y-2">
                  <p className="font-mono">{'>'} ОБНАРУЖЕНА НЕСАНКЦИОНИРОВАННАЯ АКТИВНОСТЬ</p>
                  <p className="font-mono">{'>'} ВСЕ СИСТЕМЫ ЗАБЛОКИРОВАНЫ</p>
                  <p className="font-mono">{'>'} ВОССТАНОВЛЕНИЕ ЧЕРЕЗ:</p>
                </div>

                <div className="bg-red-950/50 border border-red-500 rounded p-4 mb-4">
                  <div className="text-6xl font-bold text-red-500 tabular-nums tracking-widest font-mono">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                </div>

                <div className="text-red-400 text-sm font-mono animate-pulse">
                  [СИСТЕМА ЗАЩИТЫ АКТИВНА]
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-75"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-150"></div>
              </div>

              <div className="text-xs text-red-400/70 font-mono">
                ERROR CODE: 0xDEADBEEF | HACK_DETECTED | SYSTEM_LOCKDOWN
              </div>
            </div>
          </div>

          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-lg blur opacity-75 animate-pulse"></div>
        </div>
      </div>

      <div className="fixed inset-0 z-[9998] pointer-events-auto bg-transparent"></div>

      <style>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch-text {
          animation: glitch 0.3s infinite;
          text-shadow: 
            2px 2px 0px rgba(255, 0, 0, 0.7),
            -2px -2px 0px rgba(0, 255, 255, 0.7),
            0 0 20px rgba(255, 0, 0, 0.5);
        }

        @keyframes animate-pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: animate-pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-75 {
          animation-delay: 75ms;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </>
  );
};

export default HackerAttack;