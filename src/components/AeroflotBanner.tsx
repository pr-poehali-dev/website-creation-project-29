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
    <div className="fixed bottom-2 right-2 md:bottom-8 md:right-8 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-600 rounded-xl md:rounded-2xl shadow-2xl border-2 border-red-400 overflow-hidden max-w-[320px] md:max-w-md">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
        >
          <Icon name="X" size={16} className="text-white" />
        </button>
        
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shrink-0">
              <Icon name="Plane" size={24} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Аэрофлот</h3>
              <p className="text-xs md:text-sm text-white/90">Материнская компания</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-white/20">
            <p className="text-sm md:text-base text-white font-semibold mb-2">🎄 Новогодняя акция!</p>
            <p className="text-xs md:text-sm text-white/90 mb-2 md:mb-3">
              Скидки до 40% на рейсы по России и миру. Бронируйте до 31 декабря!
            </p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
              <Icon name="Clock" size={12} />
              <span>Предложение ограничено</span>
            </div>
          </div>
          
          <Button
            onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
            className="w-full bg-white text-red-600 hover:bg-white/90 font-bold shadow-lg text-sm md:text-base py-2 md:py-3"
          >
            Купить билет со скидкой
            <Icon name="ArrowRight" className="ml-2" size={16} />
          </Button>
        </div>
        
        <div className="h-1.5 md:h-2 bg-gradient-to-r from-red-700 via-white to-red-700"></div>
      </div>
    </div>
  );
};

export default AeroflotBanner;