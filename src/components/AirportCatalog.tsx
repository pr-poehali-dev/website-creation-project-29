import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface Terminal {
  name: string;
  description: string;
  facilities: string[];
}

interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  terminals: Terminal[];
  lounges: string[];
  services: string[];
  transportation: string[];
}

const airports: Airport[] = [
  {
    id: '1',
    code: 'SVO',
    name: 'Шереметьево',
    city: 'Москва',
    country: 'Россия',
    terminals: [
      {
        name: 'Терминал B',
        description: 'Международные рейсы',
        facilities: ['Duty Free', 'Рестораны', 'VIP-залы', 'Аптека', 'Банкоматы']
      },
      {
        name: 'Терминал C',
        description: 'Международные рейсы',
        facilities: ['Магазины', 'Кафе', 'Зона отдыха', 'Wi-Fi', 'Зарядные станции']
      },
      {
        name: 'Терминал D',
        description: 'Внутренние рейсы',
        facilities: ['Фуд-корт', 'Детская зона', 'Аптека', 'Книжный магазин']
      }
    ],
    lounges: ['Business Lounge Terminal B', 'VIP Terminal C', 'Leviks Air Lounge'],
    services: ['Трансфер между терминалами', 'Камера хранения', 'Упаковка багажа', 'Медицинская помощь'],
    transportation: ['Аэроэкспресс', 'Такси', 'Автобусы', 'Парковка']
  },
  {
    id: '2',
    code: 'LED',
    name: 'Пулково',
    city: 'Санкт-Петербург',
    country: 'Россия',
    terminals: [
      {
        name: 'Терминал 1',
        description: 'Все рейсы',
        facilities: ['Duty Free', 'Рестораны', 'Бизнес-залы', 'Магазины', 'Wi-Fi']
      }
    ],
    lounges: ['Business Lounge', 'Comfort Lounge', 'VIP Hall'],
    services: ['Камера хранения', 'Упаковка багажа', 'Медпункт', 'Банкоматы'],
    transportation: ['Автобус до метро', 'Такси', 'Парковка']
  },
  {
    id: '3',
    code: 'VKO',
    name: 'Внуково',
    city: 'Москва',
    country: 'Россия',
    terminals: [
      {
        name: 'Терминал A',
        description: 'Все рейсы',
        facilities: ['Duty Free', 'Кафе', 'Магазины', 'Детская комната', 'Бизнес-зал']
      }
    ],
    lounges: ['Business Lounge', 'VIP Terminal'],
    services: ['Камера хранения', 'Упаковка багажа', 'Медицинский пункт'],
    transportation: ['Аэроэкспресс', 'Автобусы', 'Такси', 'Парковка']
  },
  {
    id: '4',
    code: 'AER',
    name: 'Сочи',
    city: 'Сочи',
    country: 'Россия',
    terminals: [
      {
        name: 'Терминал 1',
        description: 'Международные и внутренние рейсы',
        facilities: ['Duty Free', 'Рестораны', 'Магазины', 'Бизнес-зал']
      }
    ],
    lounges: ['Business Lounge'],
    services: ['Камера хранения', 'Упаковка багажа'],
    transportation: ['Автобусы', 'Такси', 'Парковка']
  }
];

const AirportCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск аэропорта по названию, коду или городу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredAirports.map(airport => (
          <Card 
            key={airport.id} 
            className="p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setSelectedAirport(selectedAirport?.id === airport.id ? null : airport)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon name="Plane" size={20} className="text-primary" />
                    <h3 className="text-xl font-bold">{airport.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{airport.city}, {airport.country}</p>
                  <p className="text-sm font-mono mt-1 text-primary">Код: {airport.code}</p>
                </div>
                <Icon 
                  name={selectedAirport?.id === airport.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground"
                />
              </div>

              {selectedAirport?.id === airport.id && (
                <div className="space-y-6 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Building2" size={16} />
                      Терминалы
                    </h4>
                    <div className="space-y-3">
                      {airport.terminals.map((terminal, index) => (
                        <Card key={index} className="p-4 bg-muted/30">
                          <div className="font-medium mb-1">{terminal.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">{terminal.description}</div>
                          <div className="flex flex-wrap gap-2">
                            {terminal.facilities.map((facility, i) => (
                              <span 
                                key={i} 
                                className="text-xs px-2 py-1 bg-background rounded-full border border-border"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Coffee" size={16} />
                      Бизнес-залы
                    </h4>
                    <div className="space-y-2">
                      {airport.lounges.map((lounge, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={14} className="text-green-500" />
                          <span>{lounge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Settings" size={16} />
                      Услуги
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {airport.services.map((service, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Bus" size={16} />
                      Транспорт
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {airport.transportation.map((transport, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Icon name="CheckCircle" size={14} className="text-primary" />
                          <span>{transport}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredAirports.length === 0 && (
        <Card className="p-12 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Аэропорты не найдены</p>
        </Card>
      )}
    </div>
  );
};

export default AirportCatalog;
