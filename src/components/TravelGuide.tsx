import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Guide {
  id: string;
  title: string;
  icon: string;
  articles: Article[];
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const guides: Guide[] = [
  {
    id: 'preparation',
    title: 'Подготовка к полёту',
    icon: 'List',
    articles: [
      { id: '1', title: 'Что взять в ручную кладь', excerpt: 'Полный список необходимых вещей для комфортного перелёта', readTime: '5 мин' },
      { id: '2', title: 'Документы для полёта', excerpt: 'Какие документы нужны для внутренних и международных рейсов', readTime: '4 мин' },
      { id: '3', title: 'Онлайн-регистрация: пошаговая инструкция', excerpt: 'Как зарегистрироваться на рейс через сайт или приложение', readTime: '3 мин' },
      { id: '4', title: 'Правила упаковки багажа', excerpt: 'Как правильно упаковать чемодан и избежать проблем', readTime: '6 мин' }
    ]
  },
  {
    id: 'airport',
    title: 'В аэропорту',
    icon: 'Building',
    articles: [
      { id: '5', title: 'Прохождение досмотра без стресса', excerpt: 'Советы для быстрого прохождения контроля безопасности', readTime: '4 мин' },
      { id: '6', title: 'Навигация по терминалам', excerpt: 'Как найти нужный выход и не заблудиться в аэропорту', readTime: '3 мин' },
      { id: '7', title: 'Бизнес-залы: правила доступа', excerpt: 'Кто может посетить бизнес-зал и что там есть', readTime: '5 мин' },
      { id: '8', title: 'Что делать при задержке рейса', excerpt: 'Права пассажиров и компенсации при задержках', readTime: '7 мин' }
    ]
  },
  {
    id: 'onboard',
    title: 'На борту',
    icon: 'Plane',
    articles: [
      { id: '9', title: 'Выбор лучшего места в самолёте', excerpt: 'Как выбрать комфортное место с учётом ваших предпочтений', readTime: '6 мин' },
      { id: '10', title: 'Правила безопасности', excerpt: 'Важные правила поведения на борту самолёта', readTime: '5 мин' },
      { id: '11', title: 'Комфортный перелёт: лайфхаки', excerpt: 'Как сделать длительный перелёт максимально комфортным', readTime: '8 мин' },
      { id: '12', title: 'Развлечения на борту', excerpt: 'Мультимедиа-система, Wi-Fi и другие развлечения', readTime: '4 мин' }
    ]
  },
  {
    id: 'health',
    title: 'Здоровье и комфорт',
    icon: 'Heart',
    articles: [
      { id: '13', title: 'Как справиться со страхом полёта', excerpt: 'Советы психолога для тревожных пассажиров', readTime: '10 мин' },
      { id: '14', title: 'Борьба с джетлагом', excerpt: 'Как быстро адаптироваться к новому часовому поясу', readTime: '7 мин' },
      { id: '15', title: 'Перелёт с детьми', excerpt: 'Советы для комфортного полёта с маленькими пассажирами', readTime: '9 мин' },
      { id: '16', title: 'Питание и гидратация', excerpt: 'Что есть и пить до и во время полёта', readTime: '5 мин' }
    ]
  },
  {
    id: 'special',
    title: 'Особые случаи',
    icon: 'AlertCircle',
    articles: [
      { id: '17', title: 'Перевозка животных', excerpt: 'Правила и требования для полётов с питомцами', readTime: '8 мин' },
      { id: '18', title: 'Путешествие с особыми потребностями', excerpt: 'Услуги для пассажиров с ограниченными возможностями', readTime: '6 мин' },
      { id: '19', title: 'Перевозка спортивного инвентаря', excerpt: 'Как провезти велосипед, лыжи или гольф-клюшки', readTime: '5 мин' },
      { id: '20', title: 'Музыкальные инструменты в самолёте', excerpt: 'Правила перевозки музыкальных инструментов', readTime: '4 мин' }
    ]
  }
];

const TravelGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide>(guides[0]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="travel-guide" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Гид путешественника
          </h2>
          <p className="text-muted-foreground text-lg">
            Полезные советы и инструкции для комфортного путешествия
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-3">
              {guides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedGuide.id === guide.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={guide.icon as any} size={24} />
                    <div>
                      <p className="font-semibold">{guide.title}</p>
                      <p className={`text-xs ${selectedGuide.id === guide.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {guide.articles.length} статей
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={selectedGuide.icon as any} size={28} />
                    {selectedGuide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedGuide.articles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="p-4 border rounded-lg hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-foreground pr-2">{article.title}</h3>
                          <Icon name="ChevronRight" className="text-primary flex-shrink-0 mt-1" size={20} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>{article.readTime} чтения</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="BookOpen" className="mx-auto mb-3 text-primary" size={40} />
                <p className="text-3xl font-bold text-foreground mb-2">50+</p>
                <p className="text-sm text-muted-foreground">Полезных статей</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Video" className="mx-auto mb-3 text-primary" size={40} />
                <p className="text-3xl font-bold text-foreground mb-2">20+</p>
                <p className="text-sm text-muted-foreground">Видео-инструкций</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Download" className="mx-auto mb-3 text-primary" size={40} />
                <p className="text-3xl font-bold text-foreground mb-2">PDF</p>
                <p className="text-sm text-muted-foreground">Скачать гид</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {selectedArticle && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedArticle(null)}
          >
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedArticle.title}</CardTitle>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {selectedArticle.readTime} чтения
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="BookOpen" size={14} />
                    {selectedGuide.title}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{selectedArticle.excerpt}</p>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed mb-4">
                    Здесь будет полный текст статьи с подробными инструкциями, иллюстрациями и практическими советами для путешественников.
                  </p>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary mb-4">
                    <p className="text-sm text-foreground font-semibold mb-2">💡 Совет от эксперта</p>
                    <p className="text-sm text-muted-foreground">
                      Профессиональные рекомендации от наших специалистов помогут вам подготовиться к полёту наилучшим образом.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground">
                      <Icon name="Bookmark" size={16} />
                      <span className="text-sm">Сохранить</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground">
                      <Icon name="Share2" size={16} />
                      <span className="text-sm">Поделиться</span>
                    </button>
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

export default TravelGuide;
