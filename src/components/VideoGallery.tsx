import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: 'fleet' | 'service' | 'airport' | 'review';
}

const videos: Video[] = [
  // Premium-контент: видео о работе пилотов, устройстве самолётов, безопасности
  {
    id: '1',
    title: 'Обзор самолёта Boeing 737-800',
    description: 'Знакомство с современным лайнером нашего флота',
    thumbnail: '✈️',
    duration: '5:30',
    category: 'fleet'
  },
  {
    id: '2',
    title: 'Бизнес-класс Leviks Air',
    description: 'Комфорт и роскошь на высоте 10 000 метров',
    thumbnail: '💺',
    duration: '3:45',
    category: 'service'
  },
  {
    id: '3',
    title: 'Как проходит регистрация на рейс',
    description: 'Пошаговая инструкция от прибытия в аэропорт до посадки',
    thumbnail: '🎫',
    duration: '4:20',
    category: 'airport'
  },
  {
    id: '4',
    title: 'Питание на борту',
    description: 'Меню и культура сервиса от шеф-повара',
    thumbnail: '🍽️',
    duration: '6:15',
    category: 'service'
  },
  {
    id: '5',
    title: 'Новый Airbus A320neo',
    description: 'Самый современный самолёт в нашем парке',
    thumbnail: '🛫',
    duration: '7:10',
    category: 'fleet'
  },
  {
    id: '6',
    title: 'Отзывы пассажиров',
    description: 'Реальные истории наших клиентов',
    thumbnail: '💬',
    duration: '8:00',
    category: 'review'
  },
  {
    id: '7',
    title: 'Виртуальный тур по аэропорту Шереметьево',
    description: 'Прогулка по терминалам и сервисным зонам',
    thumbnail: '🏢',
    duration: '9:30',
    category: 'airport'
  },
  {
    id: '8',
    title: 'Экипаж рассказывает о работе',
    description: 'День из жизни пилотов и бортпроводников',
    thumbnail: '👨‍✈️',
    duration: '5:55',
    category: 'review'
  },
  {
    id: '9',
    title: 'Безопасность полётов',
    description: 'Как мы заботимся о вашей безопасности',
    thumbnail: '🛡️',
    duration: '4:40',
    category: 'service'
  }
];

const categories = [
  { id: 'all', name: 'Все видео', icon: 'PlayCircle' },
  { id: 'fleet', name: 'Наш флот', icon: 'Plane' },
  { id: 'service', name: 'Сервис', icon: 'Star' },
  { id: 'airport', name: 'Аэропорты', icon: 'Building' },
  { id: 'review', name: 'Отзывы', icon: 'MessageSquare' }
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const premium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premium);
  }, []);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <section id="videos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            {isPremium && <span className="text-3xl">👑</span>}
            Видео о Leviks Air
            {isPremium && <span className="text-sm bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full">Premium</span>}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isPremium ? 'Узнайте больше о нашей авиакомпании из видеороликов' : 'Эксклюзивные видео о работе пилотов, устройстве самолётов и безопасности'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background hover:bg-muted'
              }`}
            >
              <Icon name={cat.icon as any} size={18} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className={`cursor-pointer group hover:shadow-xl transition-all hover:scale-105 ${!isPremium ? 'opacity-60' : ''}`}
              onClick={() => {
                if (!isPremium) {
                  alert('👑 Видеогалерея доступна только для Premium-пользователей');
                  return;
                }
                setSelectedVideo(video);
              }}
            >
              <CardContent className="p-0 relative">
                {!isPremium && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <span className="text-4xl mb-2 block">🔒</span>
                      <p className="text-white text-sm font-semibold">Premium</p>
                    </div>
                  </div>
                )}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-t-lg overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform">
                    {video.thumbnail}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name="Play" className="text-primary-foreground ml-1" size={32} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedVideo(null)}
          >
            <Card className="max-w-4xl w-full animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
              <CardContent className="p-0">
                <div className="relative">
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                  
                  <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center rounded-t-lg">
                    <div className="text-center">
                      <div className="text-9xl mb-6">{selectedVideo.thumbnail}</div>
                      <p className="text-2xl font-bold mb-4">{selectedVideo.title}</p>
                      <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Icon name="Play" className="text-primary-foreground ml-2" size={48} />
                      </div>
                      <p className="text-muted-foreground mt-6">
                        Здесь будет видеоплеер с роликом
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{selectedVideo.title}</h3>
                    <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {selectedVideo.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        1.2K просмотров
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;