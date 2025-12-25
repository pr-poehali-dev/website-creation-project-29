import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FlightInfo {
  id: string;
  route: string;
  departure: string;
  arrival: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'cancelled';
  gate?: string;
  terminal?: string;
  delay?: number;
}

const mockFlights: FlightInfo[] = [
  { id: 'LV001', route: 'SVO → LED', departure: '08:00', arrival: '09:30', status: 'on-time', gate: 'A12', terminal: 'B' },
  { id: 'LV002', route: 'SVO → LED', departure: '14:00', arrival: '15:30', status: 'boarding', gate: 'A15', terminal: 'B' },
  { id: 'LV003', route: 'LED → SVO', departure: '10:00', arrival: '11:30', status: 'delayed', gate: 'C8', terminal: 'D', delay: 45 },
  { id: 'LV004', route: 'SVO → KZN', departure: '12:00', arrival: '13:45', status: 'on-time', gate: 'B5', terminal: 'A' },
  { id: 'LV005', route: 'SVO → AER', departure: '07:30', arrival: '10:00', status: 'on-time', gate: 'D21', terminal: 'D' },
  { id: 'LV006', route: 'AER → SVO', departure: '19:00', arrival: '21:30', status: 'cancelled', terminal: 'C' },
];

const FlightStatus = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [searchResult, setSearchResult] = useState<FlightInfo | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-600 bg-green-50';
      case 'boarding': return 'text-blue-600 bg-blue-50';
      case 'delayed': return 'text-orange-600 bg-orange-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-time': return 'По расписанию';
      case 'boarding': return 'Идёт посадка';
      case 'delayed': return 'Задержан';
      case 'cancelled': return 'Отменён';
      default: return 'Неизвестно';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return 'CheckCircle';
      case 'boarding': return 'LogIn';
      case 'delayed': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const handleSearch = () => {
    if (!flightNumber.trim()) {
      toast.error('Введите номер рейса');
      return;
    }

    const flight = mockFlights.find(f => f.id.toLowerCase() === flightNumber.toUpperCase());
    
    if (flight) {
      setSearchResult(flight);
      toast.success(`Рейс ${flight.id} найден`);
    } else {
      setSearchResult(null);
      toast.error('Рейс не найден. Проверьте номер рейса');
    }
  };

  return (
    <section id="flight-status" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Статус рейсов
          </h2>
          <p className="text-muted-foreground text-lg">
            Отслеживайте статус вашего рейса в режиме реального времени
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" size={24} />
              Найти рейс
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Введите номер рейса (например, LV001)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSearch}>
                <Icon name="Search" size={20} />
              </Button>
            </div>

            {searchResult && (
              <div className="mt-6 p-6 border rounded-lg bg-card animate-in fade-in slide-in-from-bottom">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Рейс {searchResult.id}</h3>
                    <p className="text-lg text-muted-foreground">{searchResult.route}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(searchResult.status)}`}>
                    <Icon name={getStatusIcon(searchResult.status) as any} size={16} />
                    {getStatusText(searchResult.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Вылет</p>
                    <p className="text-xl font-bold">{searchResult.departure}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Прилёт</p>
                    <p className="text-xl font-bold">{searchResult.arrival}</p>
                  </div>
                </div>

                {searchResult.gate && (
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Выход</p>
                      <p className="text-lg font-semibold">{searchResult.gate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Терминал</p>
                      <p className="text-lg font-semibold">{searchResult.terminal}</p>
                    </div>
                  </div>
                )}

                {searchResult.delay && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-800 text-sm">
                      <Icon name="AlertCircle" className="inline mr-2" size={16} />
                      Задержка: {searchResult.delay} минут
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Все рейсы сегодня</h3>
          <div className="grid gap-4">
            {mockFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xl font-bold mb-1">{flight.id}</p>
                        <p className="text-sm text-muted-foreground">{flight.route}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Вылет</p>
                          <p className="text-lg font-semibold">{flight.departure}</p>
                        </div>
                        <Icon name="ArrowRight" className="text-muted-foreground" size={20} />
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Прилёт</p>
                          <p className="text-lg font-semibold">{flight.arrival}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {flight.gate && (
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Выход</p>
                          <p className="font-semibold">{flight.gate}</p>
                        </div>
                      )}
                      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(flight.status)}`}>
                        <Icon name={getStatusIcon(flight.status) as any} size={16} />
                        {getStatusText(flight.status)}
                      </span>
                    </div>
                  </div>
                  {flight.delay && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-orange-600">
                        Задержка: {flight.delay} минут
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightStatus;
