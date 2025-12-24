import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const BackgroundMusic = () => {
  const christmasMusicRef = useRef<HTMLAudioElement | null>(null);
  const countdownMusicRef = useRef<HTMLAudioElement | null>(null);
  const bellsRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMode, setCurrentMode] = useState<'normal' | 'countdown' | 'celebration'>('normal');
  const [countdownTime, setCountdownTime] = useState('');

  useEffect(() => {
    const christmasMusic = new Audio('https://cdn.pixabay.com/download/audio/2021/11/27/audio_0d04937c90.mp3');
    christmasMusic.loop = true;
    christmasMusic.volume = volume;
    christmasMusic.preload = 'metadata';
    christmasMusicRef.current = christmasMusic;

    const countdownMusic = new Audio('https://cdn.pixabay.com/download/audio/2021/11/26/audio_234b6b6e54.mp3');
    countdownMusic.loop = true;
    countdownMusic.volume = volume;
    countdownMusic.preload = 'none';
    countdownMusicRef.current = countdownMusic;

    const bells = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_4ddc77a6c3.mp3');
    bells.volume = volume;
    bells.preload = 'none';
    bellsRef.current = bells;

    const playPromise = christmasMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        document.addEventListener('click', () => {
          christmasMusic.play().catch(() => {});
        }, { once: true });
      });
    }

    return () => {
      christmasMusic.pause();
      countdownMusic.pause();
      bells.pause();
      christmasMusicRef.current = null;
      countdownMusicRef.current = null;
      bellsRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (christmasMusicRef.current) christmasMusicRef.current.volume = isMuted ? 0 : volume;
    if (countdownMusicRef.current) countdownMusicRef.current.volume = isMuted ? 0 : volume;
    if (bellsRef.current) bellsRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const newYearEve = new Date(year, 11, 31, 23, 50, 0);
      const midnight = new Date(year + 1, 0, 1, 0, 0, 0);
      const celebrationEnd = new Date(year + 1, 0, 1, 0, 0, 30);

      if (now >= newYearEve && now < midnight) {
        if (currentMode !== 'countdown') {
          setCurrentMode('countdown');
          christmasMusicRef.current?.pause();
          countdownMusicRef.current?.play().catch(() => {});
        }
        const secondsLeft = Math.floor((midnight.getTime() - now.getTime()) / 1000);
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        setCountdownTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else if (now >= midnight && now < celebrationEnd) {
        if (currentMode !== 'celebration') {
          setCurrentMode('celebration');
          countdownMusicRef.current?.pause();
          bellsRef.current?.play().catch(() => {});
          setTimeout(() => {
            christmasMusicRef.current?.play().catch(() => {});
          }, 5000);
        }
      } else {
        if (currentMode !== 'normal') {
          setCurrentMode('normal');
          countdownMusicRef.current?.pause();
          bellsRef.current?.pause();
          if (christmasMusicRef.current?.paused) {
            christmasMusicRef.current?.play().catch(() => {});
          }
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [currentMode]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {currentMode === 'countdown' && (
        <div className="mb-2 bg-gradient-to-r from-yellow-600 to-red-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
          <p className="text-sm font-bold">⏰ До Нового Года: {countdownTime}</p>
        </div>
      )}
      
      <div className="bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Music" className="text-primary" size={20} />
          <span className="text-sm font-semibold text-foreground">
            {currentMode === 'countdown' ? '🎆 Обратный отсчёт!' : currentMode === 'celebration' ? '🎉 С Новым Годом!' : '🎄 Новогодняя музыка'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name={isMuted ? "VolumeX" : "Volume2"} size={20} className="text-muted-foreground" />
          </button>
          
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`
            }}
          />
          
          <span className="text-xs text-muted-foreground w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;