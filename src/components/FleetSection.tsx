import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FleetSection = () => {
  const fleet = [
    {
      name: 'Airbus A350',
      image: 'https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/1c0dc068-5527-4032-bb2b-9f9972256adb.jpg',
      passengers: 325,
      range: '15 000 км',
      speed: '945 км/ч'
    },
    {
      name: 'Airbus A320',
      image: 'https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/ab9b1576-48eb-42b3-8f4c-f4e920bd85a6.jpg',
      passengers: 180,
      range: '6 100 км',
      speed: '840 км/ч'
    },
    {
      name: 'Boeing 737',
      image: 'https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/0f704c22-2683-4f26-b1a6-bcbbd165c073.jpg',
      passengers: 189,
      range: '6 570 км',
      speed: '842 км/ч'
    },
    {
      name: 'Boeing 747',
      image: 'https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/f99b5ee0-3ad7-49b3-b03c-ccaa1a0bf98b.jpg',
      passengers: 416,
      range: '13 450 км',
      speed: '920 км/ч'
    }
  ];

  return (
    <section id="fleet" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            🎁 Наш Флот
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Современные воздушные суда с передовыми технологиями и максимальным комфортом
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {fleet.map((aircraft, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden group hover:border-primary transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={aircraft.image}
                  alt={aircraft.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-foreground">{aircraft.name}</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Icon name="Users" className="text-primary mx-auto mb-2" size={24} />
                    <p className="text-sm text-muted-foreground">Пассажиров</p>
                    <p className="text-lg font-semibold text-foreground">{aircraft.passengers}</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Gauge" className="text-primary mx-auto mb-2" size={24} />
                    <p className="text-sm text-muted-foreground">Скорость</p>
                    <p className="text-lg font-semibold text-foreground">{aircraft.speed}</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Navigation" className="text-primary mx-auto mb-2" size={24} />
                    <p className="text-sm text-muted-foreground">Дальность</p>
                    <p className="text-lg font-semibold text-foreground">{aircraft.range}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;