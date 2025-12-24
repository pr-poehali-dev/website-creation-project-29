import { useEffect, useState, useRef } from 'react';

const NewYearMagic = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkNewYear = () => {
      const now = new Date();
      const year = now.getFullYear();
      const newYearStart = new Date(year, 0, 1, 0, 0, 0);
      const newYearEnd = new Date(year, 0, 1, 0, 45, 0);

      if (now >= newYearStart && now < newYearEnd) {
        setIsActive(true);
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
        const minutesLeft = Math.floor((newYearEnd.getTime() - now.getTime()) / 60000);
        const secondsLeft = Math.floor(((newYearEnd.getTime() - now.getTime()) % 60000) / 1000);
        setCountdown(`Магия продлится еще ${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`);
      } else {
        setIsActive(false);
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        const timeUntilNewYear = newYearStart.getTime() - now.getTime();
        if (timeUntilNewYear > 0 && timeUntilNewYear < 86400000) {
          const hoursLeft = Math.floor(timeUntilNewYear / 3600000);
          const minutesLeft = Math.floor((timeUntilNewYear % 3600000) / 60000);
          setCountdown(`До новогодней магии: ${hoursLeft}ч ${minutesLeft}м`);
        } else {
          setCountdown('Новогодняя магия 1 января в 00:00!');
        }
      }
    };

    checkNewYear();
    const interval = setInterval(checkNewYear, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isActive) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full shadow-lg">
        <p className="text-sm font-semibold">✨ {countdown}</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-2xl animate-pulse">
        <p className="text-lg font-bold">🎊 НОВОГОДНЯЯ МАГИЯ! 🎊</p>
        <p className="text-xs text-center mt-1">{countdown}</p>
        <button
          onClick={() => {
            if (audioRef.current) {
              if (audioRef.current.paused) {
                audioRef.current.play();
              } else {
                audioRef.current.pause();
              }
            }
          }}
          className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
        >
          🎵 Музыка
        </button>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        <div className="firework firework-1"></div>
        <div className="firework firework-2"></div>
        <div className="firework firework-3"></div>
        <div className="firework firework-4"></div>
        <div className="firework firework-5"></div>
        <div className="firework firework-6"></div>

        <div className="santa-fly santa-1 absolute text-6xl">🎅</div>
        <div className="santa-fly santa-2 absolute text-5xl">🎅</div>
        <div className="santa-fly santa-3 absolute text-7xl">🎅</div>

        <div className="gifts-fall gift-1 absolute text-4xl">🎁</div>
        <div className="gifts-fall gift-2 absolute text-3xl">🎁</div>
        <div className="gifts-fall gift-3 absolute text-4xl">🎁</div>
        <div className="gifts-fall gift-4 absolute text-3xl">🎁</div>

        <div className="confetti confetti-1 absolute text-2xl">🎊</div>
        <div className="confetti confetti-2 absolute text-2xl">🎉</div>
        <div className="confetti confetti-3 absolute text-2xl">🎊</div>
        <div className="confetti confetti-4 absolute text-2xl">🎉</div>
        <div className="confetti confetti-5 absolute text-2xl">🎊</div>
        <div className="confetti confetti-6 absolute text-2xl">🎉</div>
      </div>

      <style>{`
        @keyframes firework {
          0% {
            transform: translate(0, 100vh) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
        }

        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          box-shadow: 
            0 0 10px 10px rgba(255, 215, 0, 0.8),
            0 0 20px 20px rgba(255, 69, 0, 0.6),
            0 0 30px 30px rgba(255, 20, 147, 0.4);
        }

        .firework-1 {
          left: 20%;
          animation: firework 2s ease-out infinite;
        }

        .firework-2 {
          left: 40%;
          animation: firework 2.3s ease-out infinite 0.3s;
        }

        .firework-3 {
          left: 60%;
          animation: firework 1.8s ease-out infinite 0.6s;
        }

        .firework-4 {
          left: 80%;
          animation: firework 2.1s ease-out infinite 0.9s;
        }

        .firework-5 {
          left: 30%;
          animation: firework 2.5s ease-out infinite 1.2s;
        }

        .firework-6 {
          left: 70%;
          animation: firework 1.9s ease-out infinite 1.5s;
        }

        @keyframes santa-flying {
          0% {
            left: -150px;
            top: 15%;
          }
          100% {
            left: 110%;
            top: 10%;
          }
        }

        .santa-1 {
          animation: santa-flying 12s linear infinite;
        }

        .santa-2 {
          animation: santa-flying 15s linear infinite 5s;
        }

        .santa-3 {
          animation: santa-flying 10s linear infinite 8s;
        }

        @keyframes gifts-falling {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.8;
          }
        }

        .gift-1 {
          left: 15%;
          animation: gifts-falling 8s linear infinite;
        }

        .gift-2 {
          left: 35%;
          animation: gifts-falling 10s linear infinite 2s;
        }

        .gift-3 {
          left: 65%;
          animation: gifts-falling 9s linear infinite 4s;
        }

        .gift-4 {
          left: 85%;
          animation: gifts-falling 11s linear infinite 6s;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-1 {
          left: 10%;
          animation: confetti-fall 6s linear infinite;
        }

        .confetti-2 {
          left: 25%;
          animation: confetti-fall 7s linear infinite 1s;
        }

        .confetti-3 {
          left: 45%;
          animation: confetti-fall 5.5s linear infinite 2s;
        }

        .confetti-4 {
          left: 60%;
          animation: confetti-fall 6.5s linear infinite 3s;
        }

        .confetti-5 {
          left: 75%;
          animation: confetti-fall 7.5s linear infinite 4s;
        }

        .confetti-6 {
          left: 90%;
          animation: confetti-fall 6s linear infinite 5s;
        }
      `}</style>
    </>
  );
};

export default NewYearMagic;