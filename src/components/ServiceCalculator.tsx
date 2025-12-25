import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ServiceCalculator = () => {
  const [baggage, setBaggage] = useState(0);
  const [seatSelection, setSeatSelection] = useState(false);
  const [meal, setMeal] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [lounge, setLounge] = useState(false);

  const prices = {
    baggage: 2000,
    seat: 500,
    meal: 800,
    insurance: 300,
    lounge: 3000
  };

  const total = 
    baggage * prices.baggage +
    (seatSelection ? prices.seat : 0) +
    (meal ? prices.meal : 0) +
    (insurance ? prices.insurance : 0) +
    (lounge ? prices.lounge : 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Рассчитайте стоимость услуг</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 flex-1">
              <Icon name="Luggage" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Дополнительный багаж</div>
                <div className="text-sm text-muted-foreground">{prices.baggage} ₽ за место</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setBaggage(Math.max(0, baggage - 1))}
                disabled={baggage === 0}
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="w-8 text-center font-medium">{baggage}</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setBaggage(baggage + 1)}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          <div 
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              seatSelection ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
            }`}
            onClick={() => setSeatSelection(!seatSelection)}
          >
            <div className="flex items-center gap-3">
              <Icon name="Armchair" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Выбор места</div>
                <div className="text-sm text-muted-foreground">{prices.seat} ₽</div>
              </div>
            </div>
            {seatSelection && <Icon name="Check" size={20} className="text-primary" />}
          </div>

          <div 
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              meal ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
            }`}
            onClick={() => setMeal(!meal)}
          >
            <div className="flex items-center gap-3">
              <Icon name="UtensilsCrossed" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Питание на борту</div>
                <div className="text-sm text-muted-foreground">{prices.meal} ₽</div>
              </div>
            </div>
            {meal && <Icon name="Check" size={20} className="text-primary" />}
          </div>

          <div 
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              insurance ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
            }`}
            onClick={() => setInsurance(!insurance)}
          >
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Страхование полёта</div>
                <div className="text-sm text-muted-foreground">{prices.insurance} ₽</div>
              </div>
            </div>
            {insurance && <Icon name="Check" size={20} className="text-primary" />}
          </div>

          <div 
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              lounge ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
            }`}
            onClick={() => setLounge(!lounge)}
          >
            <div className="flex items-center gap-3">
              <Icon name="Coffee" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Доступ в бизнес-зал</div>
                <div className="text-sm text-muted-foreground">{prices.lounge} ₽</div>
              </div>
            </div>
            {lounge && <Icon name="Check" size={20} className="text-primary" />}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Итого:</span>
            <span className="text-2xl font-bold text-primary">{total.toLocaleString()} ₽</span>
          </div>
          <Button className="w-full" size="lg">
            Добавить к бронированию
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCalculator;
