import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Tier {
  name: string;
  icon: string;
  color: string;
  milesRequired: number;
  benefits: string[];
}

const tiers: Tier[] = [
  {
    name: 'Серебряный',
    icon: '🥈',
    color: 'from-gray-300 to-gray-400',
    milesRequired: 0,
    benefits: [
      'Накопление 1 миля за каждый рубль',
      'Приоритетная регистрация онлайн',
      'Бесплатный выбор места',
      'Скидка 5% в магазинах duty-free'
    ]
  },
  {
    name: 'Золотой',
    icon: '🥇',
    color: 'from-yellow-400 to-amber-500',
    milesRequired: 25000,
    benefits: [
      'Накопление 1.5 мили за каждый рубль',
      'Приоритетная регистрация в аэропорту',
      'Доступ в бизнес-зал 2 раза в год',
      'Бесплатный багаж +10 кг',
      'Скидка 10% в магазинах duty-free',
      'Приоритетная посадка на борт'
    ]
  },
  {
    name: 'Платиновый',
    icon: '💎',
    color: 'from-purple-400 to-indigo-500',
    milesRequired: 50000,
    benefits: [
      'Накопление 2 мили за каждый рубль',
      'Безлимитный доступ в бизнес-залы',
      'Бесплатный багаж +20 кг',
      'Приоритетная регистрация и посадка',
      'Скидка 15% в магазинах duty-free',
      'Бесплатное бронирование отелей от партнёров',
      'Приоритетная доставка багажа'
    ]
  }
];

const LoyaltyProgram = () => {
  const [userMiles, setUserMiles] = useState(12500);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  const getCurrentTier = () => {
    if (userMiles >= 50000) return tiers[2];
    if (userMiles >= 25000) return tiers[1];
    return tiers[0];
  };

  const getNextTier = () => {
    const current = getCurrentTier();
    const currentIndex = tiers.findIndex(t => t.name === current.name);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const calculateProgress = () => {
    const next = getNextTier();
    if (!next) return 100;
    const current = getCurrentTier();
    const range = next.milesRequired - current.milesRequired;
    const progress = ((userMiles - current.milesRequired) / range) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const handleMilesExchange = () => {
    toast.success('Обмен миль будет доступен в личном кабинете!');
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Ваш статус: {getCurrentTier().icon} {getCurrentTier().name}</h3>
              <p className="text-muted-foreground">Накоплено миль: {userMiles.toLocaleString()}</p>
            </div>
            <Button onClick={handleMilesExchange}>
              <Icon name="Gift" size={16} className="mr-2" />
              Обменять мили
            </Button>
          </div>

          {getNextTier() && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>До статуса {getNextTier()!.icon} {getNextTier()!.name}</span>
                <span className="font-medium">{(getNextTier()!.milesRequired - userMiles).toLocaleString()} миль</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <div>
        <h3 className="text-2xl font-bold mb-4">Уровни программы лояльности</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                getCurrentTier().name === tier.name ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              <div className="space-y-4">
                <div className={`text-6xl text-center bg-gradient-to-br ${tier.color} bg-clip-text text-transparent`}>
                  {tier.icon}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold">{tier.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tier.milesRequired === 0 ? 'Базовый уровень' : `От ${tier.milesRequired.toLocaleString()} миль`}
                  </p>
                </div>
                <div className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Как работает программа?</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Plane" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Зарабатывайте мили</h4>
                <p className="text-sm text-muted-foreground">Получайте мили за каждый перелёт в зависимости от вашего статуса</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="TrendingUp" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Повышайте статус</h4>
                <p className="text-sm text-muted-foreground">Накапливайте мили и получайте доступ к премиальным привилегиям</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Gift" size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Обменивайте на награды</h4>
                <p className="text-sm text-muted-foreground">Используйте мили для бесплатных билетов, апгрейдов и услуг</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Варианты обмена миль:</h4>
            <div className="space-y-3">
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Бесплатный перелёт</span>
                  <span className="text-sm font-medium">от 10,000 миль</span>
                </div>
              </Card>
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Апгрейд класса</span>
                  <span className="text-sm font-medium">от 5,000 миль</span>
                </div>
              </Card>
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Дополнительный багаж</span>
                  <span className="text-sm font-medium">от 2,000 миль</span>
                </div>
              </Card>
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Доступ в бизнес-зал</span>
                  <span className="text-sm font-medium">от 3,000 миль</span>
                </div>
              </Card>
              <Card className="p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Бронирование отеля</span>
                  <span className="text-sm font-medium">от 7,500 миль</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🎁</div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-1">Бонус за регистрацию!</h4>
            <p className="text-sm text-muted-foreground">Зарегистрируйтесь в программе прямо сейчас и получите 1,000 приветственных миль</p>
          </div>
          <Button size="lg">Присоединиться</Button>
        </div>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
