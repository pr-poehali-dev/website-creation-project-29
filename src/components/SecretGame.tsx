import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SecretGameProps {
  onClose: () => void;
}

const SecretGame = ({ onClose }: SecretGameProps) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const nums = Array.from({ length: 10 }, (_, i) => i + 1);
    setNumbers(nums);
    setShuffled([...nums].sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (num: number) => {
    if (selected.includes(num)) return;
    
    const newSelected = [...selected, num];
    setSelected(newSelected);

    if (newSelected.length === 10) {
      const isCorrect = newSelected.every((val, idx) => val === idx + 1);
      if (isCorrect) {
        setIsWon(true);
      } else {
        setTimeout(() => {
          setSelected([]);
          setShuffled([...numbers].sort(() => Math.random() - 0.5));
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="snowman-1 absolute text-6xl animate-walk">⛄</div>
        <div className="snowman-2 absolute text-6xl animate-walk-reverse">⛄</div>
        <div className="snowman-3 absolute text-5xl animate-walk-slow">⛄</div>
      </div>
      
      <Card className="relative z-10 max-w-2xl w-full mx-4 bg-gradient-to-br from-blue-900/95 to-blue-950/95 border-blue-500">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Icon name="Snowflake" className="text-blue-300" size={32} />
              <h2 className="text-3xl font-bold text-blue-100">
                {isWon ? '🎉 Поздравляем!' : '❄️ Секретная игра'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-blue-300 hover:text-blue-100 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {isWon ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🎊✨🎊</p>
              <p className="text-2xl font-bold text-blue-100 mb-4">
                Вы нашли секретную новогоднюю тему!
              </p>
              <p className="text-blue-300 mb-6">
                Теперь снеговики будут всегда с вами на этом сайте ⛄
              </p>
              <Button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <>
              <p className="text-blue-200 mb-6 text-center">
                Расставьте числа от 1 до 10 по порядку
              </p>
              
              <div className="mb-6">
                <p className="text-sm text-blue-300 mb-2">Ваш выбор:</p>
                <div className="flex gap-2 flex-wrap min-h-[50px] p-3 bg-blue-950/50 rounded-lg border border-blue-700">
                  {selected.map((num, idx) => (
                    <span
                      key={idx}
                      className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {shuffled.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleClick(num)}
                    disabled={selected.includes(num)}
                    className={`
                      h-16 rounded-lg font-bold text-xl transition-all duration-200
                      ${
                        selected.includes(num)
                          ? 'bg-blue-900/50 text-blue-700 cursor-not-allowed'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      }
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <style>{`
        @keyframes walk {
          0% {
            left: -100px;
            top: 20%;
          }
          100% {
            left: 100%;
            top: 30%;
          }
        }

        @keyframes walk-reverse {
          0% {
            right: -100px;
            top: 60%;
          }
          100% {
            right: 100%;
            top: 50%;
          }
        }

        @keyframes walk-slow {
          0% {
            left: -100px;
            top: 80%;
          }
          100% {
            left: 100%;
            top: 75%;
          }
        }

        .snowman-1 {
          animation: walk 15s linear infinite;
        }

        .snowman-2 {
          animation: walk-reverse 18s linear infinite;
        }

        .snowman-3 {
          animation: walk-slow 22s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SecretGame;
