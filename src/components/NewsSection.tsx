import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

const news: NewsItem[] = [
  {
    id: '1',
    title: 'Новые направления: Москва - Дубай и Москва - Стамбул',
    date: '20 декабря 2024',
    category: 'Маршруты',
    excerpt: 'С января 2025 года Leviks Air открывает два новых международных направления с ежедневными рейсами.',
    image: '✈️'
  },
  {
    id: '2',
    title: 'Зимняя распродажа билетов: скидки до 40%',
    date: '15 декабря 2024',
    category: 'Акции',
    excerpt: 'Успейте купить билеты со скидкой! Акция действует до конца января на все внутренние рейсы.',
    image: '🎁'
  },
  {
    id: '3',
    title: 'Новые самолёты Boeing 787 Dreamliner в нашем флоте',
    date: '10 декабря 2024',
    category: 'Флот',
    excerpt: 'Наш флот пополнился тремя новейшими лайнерами с улучшенным комфортом салона.',
    image: '🛩️'
  },
  {
    id: '4',
    title: 'Обновление мобильного приложения',
    date: '5 декабря 2024',
    category: 'Технологии',
    excerpt: 'Новая версия приложения с функциями онлайн регистрации и отслеживания багажа.',
    image: '📱'
  },
  {
    id: '5',
    title: 'Изменения в расписании на новогодние праздники',
    date: '1 декабря 2024',
    category: 'Расписание',
    excerpt: 'Обратите внимание на изменения в расписании рейсов с 30 декабря по 10 января.',
    image: '🎄'
  },
  {
    id: '6',
    title: 'Награда "Лучшая авиакомпания года" 2024',
    date: '25 ноября 2024',
    category: 'Награды',
    excerpt: 'Leviks Air признана лучшей региональной авиакомпанией по версии Aviation Awards.',
    image: '🏆'
  }
];

const NewsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map(item => (
          <Card key={item.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="text-5xl mb-4">{item.image}</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {item.category}
                </span>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              <Button variant="link" className="p-0 h-auto">
                Читать далее
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
