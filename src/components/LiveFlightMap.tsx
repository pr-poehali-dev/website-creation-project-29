import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Flight {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  status: 'flying' | 'boarding' | 'landed' | 'delayed';
  progress: number;
  departure: string;
  arrival: string;
  aircraft: string;
  altitude: string;
  speed: string;
}

const LiveFlightMap = () => {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      flightNumber: 'LV-101',
      from: 'Москва (SVO)',
      to: 'Санкт-Петербург (LED)',
      status: 'flying',
      progress: 65,
      departure: '14:30',
      arrival: '16:15',
      aircraft: 'Boeing 737-800',
      altitude: '10,500 м',
      speed: '850 км/ч'
    },
    {
      id: '2',
      flightNumber: 'LV-205',
      from: 'Сочи (AER)',
      to: 'Москва (VKO)',
      status: 'flying',
      progress: 42,
      departure: '12:00',
      arrival: '14:30',
      aircraft: 'Airbus A320',
      altitude: '9,800 м',
      speed: '820 км/ч'
    },
    {
      id: '3',
      flightNumber: 'LV-303',
      from: 'Екатеринбург (SVX)',
      to: 'Новосибирск (OVB)',
      status: 'boarding',
      progress: 0,
      departure: '18:00',
      arrival: '20:15',
      aircraft: 'Boeing 737-900',
      altitude: '0 м',
      speed: '0 км/ч'
    },
    {
      id: '4',
      flightNumber: 'LV-412',
      from: 'Владивосток (VVO)',
      to: 'Москва (SVO)',
      status: 'flying',
      progress: 78,
      departure: '08:00',
      arrival: '16:45',
      aircraft: 'Boeing 777-300ER',
      altitude: '11,200 м',
      speed: '900 км/ч'
    },
    {
      id: '5',
      flightNumber: 'LV-509',
      from: 'Казань (KZN)',
      to: 'Сочи (AER)',
      status: 'landed',
      progress: 100,
      departure: '10:30',
      arrival: '13:00',
      aircraft: 'Airbus A321',
      altitude: '0 м',
      speed: '0 км/ч'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights(prev => prev.map(flight => {
        if (flight.status === 'flying' && flight.progress < 100) {
          return { ...flight, progress: Math.min(flight.progress + 1, 100) };
        }
        if (flight.progress === 100 && flight.status === 'flying') {
          return { ...flight, status: 'landed' };
        }
        return flight;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flying': return 'text-green-500';
      case 'boarding': return 'text-blue-500';
      case 'landed': return 'text-gray-500';
      case 'delayed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'flying': return 'В полёте';
      case 'boarding': return 'Посадка';
      case 'landed': return 'Приземлился';
      case 'delayed': return 'Задержан';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full h-[400px] bg-gradient-to-b from-sky-100 to-white rounded-xl overflow-hidden border-2 border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">В режиме реального времени</span>
          </div>
        </div>

        {flights.map((flight, index) => (
          <div
            key={flight.id}
            className="absolute"
            style={{
              left: `${5 + (flight.progress * 0.9)}%`,
              top: `${20 + index * 18}%`,
              transition: 'all 2s linear'
            }}
          >
            <div className="relative group">
              <Icon 
                name="Plane" 
                className={`${getStatusColor(flight.status)} transform rotate-45`} 
                size={24} 
              />
              
              <div className="absolute left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <div className="bg-background border border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                  <div className="font-bold text-sm mb-1">{flight.flightNumber}</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{flight.from} → {flight.to}</div>
                    <div>{flight.aircraft}</div>
                    <div className={getStatusColor(flight.status)}>{getStatusText(flight.status)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {flights.map(flight => (
          <Card key={flight.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg">{flight.flightNumber}</div>
                <div className={`text-sm font-medium ${getStatusColor(flight.status)}`}>
                  {getStatusText(flight.status)}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span>{flight.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span>{flight.to}</span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    flight.status === 'flying' ? 'bg-green-500' : 
                    flight.status === 'landed' ? 'bg-gray-500' : 
                    flight.status === 'boarding' ? 'bg-blue-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${flight.progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <div className="font-medium">Вылет</div>
                  <div>{flight.departure}</div>
                </div>
                <div>
                  <div className="font-medium">Прилёт</div>
                  <div>{flight.arrival}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-border space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Самолёт:</span>
                  <span className="font-medium">{flight.aircraft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Высота:</span>
                  <span className="font-medium">{flight.altitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Скорость:</span>
                  <span className="font-medium">{flight.speed}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveFlightMap;
