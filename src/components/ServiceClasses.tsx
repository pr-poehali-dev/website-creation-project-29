import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const classes = [
  {
    name: 'Эконом',
    icon: '💺',
    color: 'from-gray-300 to-gray-400',
    features: ['Стандартные сиденья', 'Ручная кладь 10 кг', 'Багаж 23 кг', 'Бесплатная вода', 'Развлечения на экране'],
    price: 'от 5,000 ₽'
  },
  {
    name: 'Комфорт',
    icon: '🪑',
    color: 'from-blue-400 to-cyan-500',
    features: ['Увеличенное пространство для ног', 'Ручная кладь 15 кг', 'Багаж 30 кг', 'Комплимент питания', 'Приоритетная посадка', 'Розетки и USB'],
    price: 'от 12,000 ₽'
  },
  {
    name: 'Бизнес',
    icon: '🛋️',
    color: 'from-yellow-400 to-amber-500',
    features: ['Кресла повышенной комфортности', 'Ручная кладь 20 кг', 'Багаж 2×32 кг', 'Полноценное питание', 'Доступ в бизнес-зал', 'Приоритетная регистрация', 'Отдельный салон'],
    price: 'от 25,000 ₽'
  },
  {
    name: 'Первый',
    icon: '👑',
    color: 'from-purple-500 to-pink-500',
    features: ['Кресла-трансформеры (лежачие места)', 'Ручная кладь без ограничений', 'Багаж 3×32 кг', 'Ресторанное меню', 'VIP-зал и трансфер', 'Персональный сервис', 'Отдельная кабина', 'Премиум развлечения'],
    price: 'от 60,000 ₽'
  }
];

const ServiceClasses = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {classes.map((cls) => (
        <Card key={cls.name} className="p-6 hover:shadow-xl transition-all">
          <div className="text-center mb-4">
            <div className={`text-6xl mb-4 bg-gradient-to-br ${cls.color} bg-clip-text text-transparent`}>
              {cls.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{cls.name}</h3>
            <p className="text-2xl font-bold text-primary">{cls.price}</p>
          </div>
          <div className="space-y-2">
            {cls.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Icon name="Check" size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ServiceClasses;
