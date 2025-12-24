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
    <section id="history" className="py-12 md:py-24 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ⭐ Наша История
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            Путь от стартапа до лидера инновационной авиации
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 md:w-1 bg-gradient-to-b from-primary via-secondary to-primary"></div>
          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-10 md:pl-0`}>
                  <Card className="bg-card border-border hover:border-primary transition-all duration-300">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className={`${index % 2 === 0 ? 'md:ml-auto md:order-2' : 'md:order-1'}`}>
                          <Icon name={milestone.icon as any} className="text-primary" size={24} />
                        </div>
                        <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                          <span className="text-2xl md:text-3xl font-bold text-primary">{milestone.year}</span>
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-4 md:static w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 md:border-4 border-background z-10 shadow-lg shadow-primary/50 -translate-x-1/2 md:translate-x-0"></div>
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;