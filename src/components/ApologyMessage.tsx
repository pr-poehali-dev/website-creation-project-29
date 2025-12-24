import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ApologyMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('apologyShown', 'true');
  };

  useEffect(() => {
    const shown = localStorage.getItem('apologyShown');
    if (shown === 'true') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-card border-2 border-primary rounded-2xl shadow-2xl max-w-2xl mx-4 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-gradient-to-r from-primary via-secondary to-primary p-1">
          <div className="bg-card p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4 animate-pulse">
                <Icon name="Heart" className="text-primary" size={40} />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                Приносим извинения! 🙏
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Icon name="Shield" size={20} className="text-primary" />
                <p className="text-lg">Угроза устранена</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-center">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/30">
                <p className="text-lg text-foreground leading-relaxed">
                  Уважаемые пассажиры <span className="font-bold text-primary">Leviks Air</span>! 
                </p>
                <p className="text-foreground mt-3 leading-relaxed">
                  Мы искренне извиняемся за временные технические неполадки в работе нашего сайта. 
                  Наша команда кибербезопасности оперативно устранила все угрозы.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-card border border-border rounded-lg p-4">
                  <Icon name="CheckCircle2" className="text-green-500 mx-auto mb-2" size={24} />
                  <p className="font-semibold text-foreground">Безопасность</p>
                  <p className="text-muted-foreground text-xs">Восстановлена</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <Icon name="Lock" className="text-primary mx-auto mb-2" size={24} />
                  <p className="font-semibold text-foreground">Данные</p>
                  <p className="text-muted-foreground text-xs">Защищены</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <Icon name="Plane" className="text-secondary mx-auto mb-2" size={24} />
                  <p className="font-semibold text-foreground">Рейсы</p>
                  <p className="text-muted-foreground text-xs">По расписанию</p>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
                <p className="text-secondary font-semibold mb-2">🎁 В качестве компенсации</p>
                <p className="text-sm text-foreground">
                  Всем нашим пассажирам предоставляется скидка <span className="font-bold text-secondary">15%</span> на следующий рейс!
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleClose}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
              >
                <Icon name="ThumbsUp" className="mr-2" size={20} />
                Понятно, спасибо!
              </Button>
              <Button
                onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Купить билет со скидкой
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              С уважением, команда Leviks Air ✈️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApologyMessage;
