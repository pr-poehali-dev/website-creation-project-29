import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Tour {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: 'plane' | 'airport' | 'lounge';
  duration: string;
  views: number;
  videoUrl: string;
}

const tours: Tour[] = [
  {
    id: '1',
    title: 'Boeing 737-800 - Эконом класс',
    description: 'Виртуальная экскурсия по салону эконом-класса нашего популярного лайнера',
    thumbnail: '✈️',
    category: 'plane',
    duration: '5 мин',
    views: 12450,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnmZbZiVeZqx_NmBFaGf2BV'
  },
  {
    id: '2',
    title: 'Airbus A320neo - Бизнес класс',
    description: 'Роскошь и комфорт: полный обзор бизнес-класса в 360°',
    thumbnail: '🛫',
    category: 'plane',
    duration: '7 мин',
    views: 8920,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnnMZbZiVeZ'
  },
  {
    id: '3',
    title: 'Терминал Шереметьево',
    description: 'Прогулка по современному терминалу: от регистрации до зоны вылета',
    thumbnail: '🏢',
    category: 'airport',
    duration: '12 мин',
    views: 15670,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnmMZbZiVeZq'
  },
  {
    id: '4',
    title: 'Бизнес-зал Premium',
    description: 'Эксклюзивный доступ в VIP-зал для пассажиров бизнес-класса',
    thumbnail: '🛋️',
    category: 'lounge',
    duration: '8 мин',
    views: 6340,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnmZbZiVeZx'
  },
  {
    id: '5',
    title: 'Кабина пилотов Boeing 737',
    description: 'Уникальная возможность заглянуть в кабину пилотов Boeing 737-800',
    thumbnail: '👨‍✈️',
    category: 'plane',
    duration: '10 мин',
    views: 23890,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnmZbZiVeZ'
  },
  {
    id: '6',
    title: 'Кухня на борту',
    description: 'Как готовят питание для 200 пассажиров на высоте 10 000 метров',
    thumbnail: '🍽️',
    category: 'plane',
    duration: '6 мин',
    views: 9120,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLYu7z3I8tdEnmZbZiVeZqx'
  }
];

const VirtualTour = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'plane' | 'airport' | 'lounge'>('all');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = () => {
      const premium = localStorage.getItem('isPremium') === 'true';
      setIsPremium(premium);
    };
    
    checkPremium();
    window.addEventListener('premiumActivated', checkPremium);
    
    return () => {
      window.removeEventListener('premiumActivated', checkPremium);
    };
  }, []);

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(t => t.category === selectedCategory);

  const handleStartTour = (tour: Tour) => {
    if (!isPremium) {
      toast.error('👑 Виртуальные туры доступны только для Premium-пользователей');
      return;
    }
    setSelectedTour(tour);
    toast.success('Запуск виртуального тура...');
  };

  return (
    <section id="virtual-tour" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            {isPremium && <span className="text-3xl">👑</span>}
            Виртуальные туры 360°
            {isPremium && <span className="text-sm bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full">Premium</span>}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isPremium ? 'Изучите наши самолёты и аэропорты не выходя из дома' : 'Premium-контент: виртуальные 3D-туры по самолётам и аэропортам'}
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex gap-3 mb-8 overflow-x-auto justify-center">
            {[
              { id: 'all', label: 'Все туры', icon: 'Layers' },
              { id: 'plane', label: 'Самолёты', icon: 'Plane' },
              { id: 'airport', label: 'Аэропорты', icon: 'Building' },
              { id: 'lounge', label: 'Бизнес-залы', icon: 'Coffee' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background hover:bg-muted text-foreground'
                }`}
              >
                <Icon name={cat.icon as any} size={18} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className={`group hover:shadow-xl transition-all cursor-pointer ${!isPremium ? 'opacity-60' : ''}`}>
                <CardContent className="p-0 relative">
                  {!isPremium && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-4xl mb-2 block">🔒</span>
                        <p className="text-white text-sm font-semibold">Premium</p>
                      </div>
                    </div>
                  )}
                  <div 
                    onClick={() => handleStartTour(tour)}
                    className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-t-lg overflow-hidden"
                  >
                    <div className="text-8xl group-hover:scale-110 transition-transform">
                      {tour.thumbnail}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon name="Play" className="text-primary-foreground ml-1" size={32} />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {tour.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-1">{tour.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={12} />
                        {tour.views.toLocaleString()} просмотров
                      </span>
                      <Button size="sm" onClick={() => handleStartTour(tour)}>
                        Начать тур
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedTour && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedTour(null)}
          >
            <Card className="max-w-5xl w-full animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Maximize2" size={24} />
                    {selectedTour.title}
                  </CardTitle>
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedTour.videoUrl}
                    title={selectedTour.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Icon name="MousePointer" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-sm font-semibold text-foreground">Панорама 360°</p>
                    <p className="text-xs text-muted-foreground">Полный обзор</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Icon name="Maximize" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-sm font-semibold text-foreground">HD качество</p>
                    <p className="text-xs text-muted-foreground">4K разрешение</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <Icon name="Info" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-sm font-semibold text-foreground">Интерактив</p>
                    <p className="text-xs text-muted-foreground">Подсказки</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground mb-2">{selectedTour.description}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      Длительность: {selectedTour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={12} />
                      {selectedTour.views.toLocaleString()} просмотров
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary">
          <CardContent className="p-8 text-center">
            <Icon name="Glasses" className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-2xl font-bold mb-3 text-foreground">VR-очки для лучшего опыта</h3>
            <p className="text-muted-foreground mb-6">
              Используйте VR-гарнитуру для полного погружения в виртуальное пространство наших самолётов и аэропортов
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <div className="px-4 py-2 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Поддержка</p>
                <p className="font-semibold text-foreground">Oculus Quest</p>
              </div>
              <div className="px-4 py-2 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Поддержка</p>
                <p className="font-semibold text-foreground">HTC Vive</p>
              </div>
              <div className="px-4 py-2 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Поддержка</p>
                <p className="font-semibold text-foreground">PlayStation VR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VirtualTour;