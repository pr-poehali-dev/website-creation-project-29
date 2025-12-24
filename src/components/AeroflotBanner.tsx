import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AeroflotBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-2xl shadow-2xl border-2 border-red-400 overflow-hidden max-w-md">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
        >
          <Icon name="X" size={18} className="text-white" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Icon name="Plane" size={28} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Аэрофлот</h3>
              <p className="text-sm text-white/90">Материнская компания</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
            <p className="text-white font-semibold mb-2">🎄 Новогодняя акция!</p>
            <p className="text-sm text-white/90 mb-3">
              Скидки до 40% на рейсы по России и миру. Бронируйте билеты до 31 декабря!
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Icon name="Clock" size={14} />
              <span>Предложение ограничено</span>
            </div>
          </div>
          
          <Button
            onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
            className="w-full bg-white text-red-600 hover:bg-white/90 font-bold shadow-lg"
            size="lg"
          >
            Купить билет со скидкой
            <Icon name="ArrowRight" className="ml-2" size={18} />
          </Button>
        </div>
        
        <div className="h-2 bg-gradient-to-r from-red-700 via-white to-red-700"></div>
      </div>
    </div>
  );
};

export default AeroflotBanner;
