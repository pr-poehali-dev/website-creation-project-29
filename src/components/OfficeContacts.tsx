import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const offices = [
  { city: 'Москва', address: 'ул. Тверская, 15', phone: '+7 (495) 123-45-67', hours: 'Пн-Пт 9:00-20:00' },
  { city: 'Санкт-Петербург', address: 'Невский пр-т, 28', phone: '+7 (812) 987-65-43', hours: 'Пн-Пт 9:00-20:00' },
  { city: 'Екатеринбург', address: 'ул. Ленина, 50', phone: '+7 (343) 111-22-33', hours: 'Пн-Пт 10:00-19:00' },
  { city: 'Казань', address: 'ул. Баумана, 12', phone: '+7 (843) 444-55-66', hours: 'Пн-Пт 10:00-19:00' },
  { city: 'Новосибирск', address: 'Красный пр-т, 1', phone: '+7 (383) 777-88-99', hours: 'Пн-Пт 10:00-19:00' },
  { city: 'Сочи', address: 'Курортный пр-т, 75', phone: '+7 (862) 222-33-44', hours: 'Пн-Вс 9:00-21:00' }
];

const OfficeContacts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {offices.map(office => (
        <Card key={office.city} className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4">{office.city}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <Icon name="MapPin" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{office.address}</span>
            </div>
            <div className="flex gap-2">
              <Icon name="Phone" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{office.phone}</span>
            </div>
            <div className="flex gap-2">
              <Icon name="Clock" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{office.hours}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OfficeContacts;
