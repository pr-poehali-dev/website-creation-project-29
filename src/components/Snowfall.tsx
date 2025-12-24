import { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  fontSize: number;
  opacity: number;
}

const Snowfall = () => {
  const snowflakes = useMemo<Snowflake[]>(
    () => Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 5,
      fontSize: Math.random() * 10 + 10,
      opacity: Math.random() * 0.6 + 0.4,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white animate-fall"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            fontSize: `${flake.fontSize}px`,
            opacity: flake.opacity,
            top: '-20px',
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowfall;