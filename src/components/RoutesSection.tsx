import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const RoutesSection = () => {
  const routes = [
    { city: 'Москва', country: 'Россия', flights: '45 рейсов/день', icon: '🇷🇺' },
    { city: 'Санкт-Петербург', country: 'Россия', flights: '28 рейсов/день', icon: '🇷🇺' },
    { city: 'Лондон', country: 'Великобритания', flights: '12 рейсов/день', icon: '🇬🇧' },
    { city: 'Париж', country: 'Франция', flights: '15 рейсов/день', icon: '🇫🇷' },
    { city: 'Нью-Йорк', country: 'США', flights: '8 рейсов/день', icon: '🇺🇸' },
    { city: 'Токио', country: 'Япония', flights: '10 рейсов/день', icon: '🇯🇵' },
    { city: 'Дубай', country: 'ОАЭ', flights: '18 рейсов/день', icon: '🇦🇪' },
    { city: 'Сингапур', country: 'Сингапур', flights: '6 рейсов/день', icon: '🇸🇬' },
    { city: 'Пекин', country: 'Китай', flights: '14 рейсов/день', icon: '🇨🇳' },
    { city: 'Стамбул', country: 'Турция', flights: '20 рейсов/день', icon: '🇹🇷' },
    { city: 'Берлин', country: 'Германия', flights: '11 рейсов/день', icon: '🇩🇪' },
    { city: 'Рим', country: 'Италия', flights: '9 рейсов/день', icon: '🇮🇹' },
  ];

  return (
    <section id="routes" className="py-12 md:py-24 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ✈️ Наши Маршруты
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Мы соединяем крупнейшие города мира с комфортом и надёжностью
          </p>
          <div className="relative max-w-4xl mx-auto mb-8 md:mb-12">
            <img
              src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/98a20106-979c-46f7-ad91-4115770f0de1.jpg"
              alt="Карта маршрутов"
              loading="lazy"
              decoding="async"
              className="rounded-lg md:rounded-xl border border-border w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {routes.map((route, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300 group">
              <CardContent className="p-3 md:p-6">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl mb-2 md:mb-3">{route.icon}</div>
                  <h3 className="text-sm md:text-xl font-bold text-foreground mb-1">{route.city}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{route.country}</p>
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-primary">
                    <Icon name="Plane" size={14} />
                    <span className="text-xs md:text-sm font-semibold">{route.flights}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground px-4">
            И еще 100+ направлений по всему миру
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;