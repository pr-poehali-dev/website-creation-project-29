import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const tips = [
  { icon: 'Clock', title: 'Приезжайте заранее', text: 'За 2 часа для внутренних рейсов, за 3 часа для международных' },
  { icon: 'FileText', title: 'Проверьте документы', text: 'Паспорт, виза (если нужна), билет, медицинские справки' },
  { icon: 'Package', title: 'Упакуйте правильно', text: 'Хрупкое - в ручную кладь. Ценное - не сдавайте в багаж' },
  { icon: 'Droplets', title: 'Жидкости в салоне', text: 'Только ёмкости до 100 мл в прозрачном пакете (макс. 1 литр)' },
  { icon: 'BatteryCharging', title: 'Зарядите устройства', text: 'Телефон, ноутбук, power bank должны быть заряжены для контроля' },
  { icon: 'Pill', title: 'Лекарства с рецептом', text: 'Возьмите рецепт или справку для лекарств, особенно для шприцов' },
  { icon: 'Headphones', title: 'Развлечения в полёт', text: 'Скачайте фильмы, музыку, книги заранее' },
  { icon: 'Shirt', title: 'Сменная одежда', text: 'В ручную кладь на случай задержки багажа' },
  { icon: 'Wallet', title: 'Деньги и карты', text: 'Наличные + карты в разных местах на случай потери' }
];

const TravelTips = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={tip.icon as any} size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">{tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TravelTips;
