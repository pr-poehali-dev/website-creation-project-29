import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const videos = [
  { title: 'Инструктаж по безопасности', duration: '5:30', description: 'Правила поведения на борту самолёта' },
  { title: 'Действия при аварии', duration: '8:15', description: 'Как вести себя в экстренных ситуациях' },
  { title: 'Использование кислородных масок', duration: '3:45', description: 'Пошаговая инструкция' },
  { title: 'Эвакуация из самолёта', duration: '6:20', description: 'Аварийные выходы и трапы' }
];

const SafetyVideos = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {videos.map((video, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
            <Icon name="Play" size={48} className="text-primary" />
          </div>
          <h3 className="font-bold mb-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{video.duration}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SafetyVideos;
