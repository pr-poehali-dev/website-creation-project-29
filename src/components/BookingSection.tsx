import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Flight {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  class: 'economy' | 'business' | 'first';
  available: number;
}

const mockFlights: Flight[] = [
  { id: 'LV001', from: 'Москва (SVO)', to: 'Санкт-Петербург (LED)', departure: '08:00', arrival: '09:30', duration: '1ч 30м', price: 4500, class: 'economy', available: 45 },
  { id: 'LV002', from: 'Москва (SVO)', to: 'Санкт-Петербург (LED)', departure: '14:00', arrival: '15:30', duration: '1ч 30м', price: 5200, class: 'business', available: 12 },
  { id: 'LV003', from: 'Санкт-Петербург (LED)', to: 'Москва (SVO)', departure: '10:00', arrival: '11:30', duration: '1ч 30м', price: 4300, class: 'economy', available: 38 },
  { id: 'LV004', from: 'Москва (SVO)', to: 'Казань (KZN)', departure: '12:00', arrival: '13:45', duration: '1ч 45м', price: 5800, class: 'economy', available: 52 },
  { id: 'LV005', from: 'Москва (SVO)', to: 'Сочи (AER)', departure: '07:30', arrival: '10:00', duration: '2ч 30м', price: 8900, class: 'economy', available: 28 },
  { id: 'LV006', from: 'Москва (SVO)', to: 'Сочи (AER)', departure: '16:00', arrival: '18:30', duration: '2ч 30м', price: 12500, class: 'business', available: 8 },
];

const BookingSection = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState<'economy' | 'business' | 'first'>('economy');
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSearch = () => {
    if (!from || !to || !date) {
      toast.error('Заполните все поля для поиска');
      return;
    }

    const results = mockFlights.filter(f => 
      f.from.includes(from) && f.to.includes(to) && f.class === selectedClass
    );
    
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.info('Рейсы не найдены. Попробуйте изменить параметры поиска');
    } else {
      toast.success(`Найдено рейсов: ${results.length}`);
    }
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    toast.success(`Выбран рейс ${flight.id}`);
  };

  const handleBooking = () => {
    if (!selectedFlight) {
      toast.error('Выберите рейс');
      return;
    }
    
    toast.success(`Переход к оформлению билета на рейс ${selectedFlight.id}. Скоро откроется форма бронирования!`);
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Забронировать билет
          </h2>
          <p className="text-muted-foreground text-lg">
            Найдите и забронируйте билет на удобный для вас рейс
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" size={24} />
              Поиск рейсов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Откуда</label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Москва"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Куда</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Санкт-Петербург"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Дата вылета</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Пассажиры</label>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-foreground">Класс</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as any)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                >
                  <option value="economy">Эконом</option>
                  <option value="business">Бизнес</option>
                  <option value="first">Первый</option>
                </select>
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full" size="lg">
              <Icon name="Search" className="mr-2" size={20} />
              Найти рейсы
            </Button>
          </CardContent>
        </Card>

        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Доступные рейсы</h3>
            {searchResults.map((flight) => (
              <Card
                key={flight.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedFlight?.id === flight.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectFlight(flight)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                          <p className="text-sm text-muted-foreground">{flight.from.split(' ')[0]}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <Icon name="Plane" className="text-primary mb-1" size={24} />
                          <p className="text-xs text-muted-foreground">{flight.duration}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                          <p className="text-sm text-muted-foreground">{flight.to.split(' ')[0]}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Рейс {flight.id}</span>
                        <span>Свободно мест: {flight.available}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary mb-1">
                        {flight.price.toLocaleString()} ₽
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {flight.class === 'economy' ? 'Эконом' : flight.class === 'business' ? 'Бизнес' : 'Первый класс'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {selectedFlight && (
              <Button onClick={handleBooking} className="w-full mt-6" size="lg">
                <Icon name="CheckCircle" className="mr-2" size={20} />
                Забронировать за {selectedFlight.price.toLocaleString()} ₽
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;