import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HistorySection = () => {
  const milestones = [
    {
      year: '2015',
      title: 'Основание',
      description: 'Leviks Air начала свою историю как инновационная авиакомпания с видением будущего авиации',
      icon: 'Rocket'
    },
    {
      year: '2017',
      title: 'Первый рейс',
      description: 'Запуск первого международного маршрута на современном Airbus A320',
      icon: 'Plane'
    },
    {
      year: '2019',
      title: 'Расширение флота',
      description: 'Приобретение флагманских Boeing 747 и Airbus A350 для дальнемагистральных рейсов',
      icon: 'Sparkles'
    },
    {
      year: '2022',
      title: 'Технологии будущего',
      description: 'Внедрение AI-систем управления и экологичных технологий во всем флоте',
      icon: 'Zap'
    },
    {
      year: '2024',
      title: 'Глобальная сеть',
      description: 'Достижение 100+ направлений по всему миру с 50+ современными воздушными судами',
      icon: 'Globe'
    }
  ];

  return (
    <section id="history" className="py-24 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ⭐ Наша История
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Путь от стартапа до лидера инновационной авиации
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary"></div>
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <Card className="bg-card border-border hover:border-primary transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`${index % 2 === 0 ? 'ml-auto order-2' : 'order-1'}`}>
                          <Icon name={milestone.icon as any} className="text-primary" size={32} />
                        </div>
                        <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                          <span className="text-3xl font-bold text-primary">{milestone.year}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-lg shadow-primary/50"></div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;