import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  route: string;
  comment: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    rating: 5,
    date: '15 декабря 2024',
    route: 'Москва → Санкт-Петербург',
    comment: 'Отличный сервис! Персонал очень вежливый, самолёт чистый и комфортный. Полёт прошёл без задержек. Рекомендую!',
    avatar: '👩'
  },
  {
    id: '2',
    name: 'Дмитрий Петров',
    rating: 5,
    date: '12 декабря 2024',
    route: 'Москва → Сочи',
    comment: 'Великолепно! Удобные кресла, вкусная еда на борту. Особенно порадовала новогодняя атмосфера в салоне. Буду летать ещё!',
    avatar: '👨'
  },
  {
    id: '3',
    name: 'Елена Иванова',
    rating: 4,
    date: '10 декабря 2024',
    route: 'Санкт-Петербург → Москва',
    comment: 'Хороший перелёт, всё прошло гладко. Единственное - немного задержали вылет на 20 минут, но экипаж предупредил заранее.',
    avatar: '👩‍💼'
  },
  {
    id: '4',
    name: 'Михаил Козлов',
    rating: 5,
    date: '8 декабря 2024',
    route: 'Москва → Казань',
    comment: 'Прекрасная авиакомпания! Быстрая регистрация, современный самолёт, приветливый персонал. Цены адекватные. Спасибо!',
    avatar: '👨‍💻'
  },
  {
    id: '5',
    name: 'Ольга Васильева',
    rating: 5,
    date: '5 декабря 2024',
    route: 'Москва → Екатеринбург',
    comment: 'Летела с детьми - всё организовано отлично! Детям дали раскраски и подарки. Экипаж очень внимательный. Восторг!',
    avatar: '👩‍👧‍👦'
  },
  {
    id: '6',
    name: 'Сергей Николаев',
    rating: 4,
    date: '3 декабря 2024',
    route: 'Казань → Москва',
    comment: 'Надёжная авиакомпания. Всё чётко по расписанию, багаж доставили быстро. Единственный минус - хотелось бы больше места для ног.',
    avatar: '👨‍🦱'
  }
];

const ReviewsSection = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', route: '', rating: 5, comment: '' });

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.route || !newReview.comment) {
      toast.error('Заполните все поля');
      return;
    }

    toast.success('Спасибо за ваш отзыв! Он появится после модерации.');
    setShowAddReview(false);
    setNewReview({ name: '', route: '', rating: 5, comment: '' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={18}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Отзывы пассажиров
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Узнайте, что говорят наши пассажиры о полётах с Leviks Air
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating))}
              <p className="text-sm text-muted-foreground mt-2">
                На основе {reviews.length} отзывов
              </p>
            </div>
          </div>

          <Button onClick={() => setShowAddReview(!showAddReview)} size="lg">
            <Icon name="Plus" className="mr-2" size={20} />
            Оставить отзыв
          </Button>
        </div>

        {showAddReview && (
          <Card className="max-w-2xl mx-auto mb-12 border-primary">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold mb-4">Ваш отзыв</h3>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Маршрут</label>
                <input
                  type="text"
                  value={newReview.route}
                  onChange={(e) => setNewReview({ ...newReview, route: e.target.value })}
                  placeholder="Москва → Санкт-Петербург"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Оценка</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={32}
                        className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Поделитесь впечатлениями о полёте..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitReview} className="flex-1">
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить отзыв
                </Button>
                <Button variant="outline" onClick={() => setShowAddReview(false)}>
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{review.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{review.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{review.route}</p>
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {review.comment}
                </p>
                
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  {review.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
