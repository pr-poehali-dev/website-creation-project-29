import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const services = [
  { icon: 'Car', title: 'Аренда автомобиля', price: 'от 2,500 ₽/день', description: 'Бронирование авто в аэропорту назначения' },
  { icon: 'Hotel', title: 'Бронирование отелей', price: 'от 3,000 ₽/ночь', description: 'Лучшие отели со скидками для наших клиентов' },
  { icon: 'MapPin', title: 'Экскурсии', price: 'от 1,500 ₽', description: 'Организованные туры и индивидуальные экскурсии' },
  { icon: 'Shield', title: 'Страхование путешествий', price: 'от 500 ₽', description: 'Полный пакет страхования на время поездки' },
  { icon: 'Wifi', title: 'Wi-Fi на борту', price: '500 ₽/рейс', description: 'Высокоскоростной интернет в полёте' },
  { icon: 'Bed', title: 'Трансферы из аэропорта', price: 'от 1,000 ₽', description: 'Комфортная доставка до отеля' }
];

const AdditionalServices = () => {
  const handleBook = (service: string) => {
    toast.success(`Услуга "${service}" добавлена в бронирование!`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name={service.icon as any} size={24} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
            <p className="text-lg font-bold text-primary">{service.price}</p>
          </div>
          <Button className="w-full" onClick={() => handleBook(service.title)}>
            Забронировать
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default AdditionalServices;
