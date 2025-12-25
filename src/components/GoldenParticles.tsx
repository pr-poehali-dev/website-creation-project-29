import { useEffect, useState } from 'react';

const GoldenParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 8 + Math.random() * 16
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-full blur-sm opacity-70 animate-pulse"></div>
        </div>
      ))}

      <style>{`
        @keyframes sparkle {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg) scale(1);
            opacity: 0;
          }
        }

        .animate-sparkle {
          animation: sparkle linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent animate-pulse"></div>
      
      <div className="golden-glow golden-glow-1"></div>
      <div className="golden-glow golden-glow-2"></div>
      <div className="golden-glow golden-glow-3"></div>

      <style>{`
        @keyframes golden-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, -30px) scale(1.2);
            opacity: 0.6;
          }
        }

        .golden-glow {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .golden-glow-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 20%;
          animation: golden-float 8s ease-in-out infinite;
        }

        .golden-glow-2 {
          width: 400px;
          height: 400px;
          top: 50%;
          right: 15%;
          animation: golden-float 10s ease-in-out infinite 2s;
        }

        .golden-glow-3 {
          width: 250px;
          height: 250px;
          bottom: 20%;
          left: 10%;
          animation: golden-float 12s ease-in-out infinite 4s;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-shimmer"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-shimmer" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default GoldenParticles;
