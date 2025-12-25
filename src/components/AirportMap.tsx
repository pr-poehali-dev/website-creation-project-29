import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Location {
  id: string;
  name: string;
  type: 'gate' | 'food' | 'shop' | 'lounge' | 'restroom' | 'info' | 'security';
  floor: number;
  x: number;
  y: number;
  description: string;
}

const locations: Location[] = [
  { id: '1', name: 'Выход A1-A5', type: 'gate', floor: 2, x: 20, y: 30, description: 'Внутренние рейсы' },
  { id: '2', name: 'Выход B1-B10', type: 'gate', floor: 2, x: 70, y: 30, description: 'Международные рейсы' },
  { id: '3', name: 'Кофейня Starbucks', type: 'food', floor: 2, x: 40, y: 50, description: 'Кофе и закуски' },
  { id: '4', name: 'Ресторан "Шоколадница"', type: 'food', floor: 2, x: 60, y: 50, description: 'Европейская кухня' },
  { id: '5', name: 'Duty Free', type: 'shop', floor: 2, x: 50, y: 40, description: 'Беспошлинная торговля' },
  { id: '6', name: 'Бизнес-зал Premium', type: 'lounge', floor: 3, x: 45, y: 35, description: 'VIP зона отдыха' },
  { id: '7', name: 'Информация', type: 'info', floor: 1, x: 50, y: 70, description: 'Справочная служба' },
  { id: '8', name: 'Досмотр', type: 'security', floor: 1, x: 50, y: 60, description: 'Контроль безопасности' },
];

const AirportMap = () => {
  const [selectedFloor, setSelectedFloor] = useState(2);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremium = () => {
      const premium = localStorage.getItem('isPremium') === 'true';
      setIsPremium(premium);
    };
    
    checkPremium();
    window.addEventListener('premiumActivated', checkPremium);
    
    return () => {
      window.removeEventListener('premiumActivated', checkPremium);
    };
  }, []);

  const filteredLocations = locations.filter(
    (loc) => loc.floor === selectedFloor && (selectedType === 'all' || loc.type === selectedType)
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'gate': return 'Plane';
      case 'food': return 'Coffee';
      case 'shop': return 'ShoppingBag';
      case 'lounge': return 'Armchair';
      case 'restroom': return 'Bath';
      case 'info': return 'Info';
      case 'security': return 'Shield';
      default: return 'MapPin';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'gate': return 'bg-blue-500';
      case 'food': return 'bg-orange-500';
      case 'shop': return 'bg-purple-500';
      case 'lounge': return 'bg-yellow-500';
      case 'restroom': return 'bg-cyan-500';
      case 'info': return 'bg-green-500';
      case 'security': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isPremium) {
    return (
      <section id="airport-map" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Интерактивная карта аэропорта
            </h2>
            <p className="text-muted-foreground text-lg">
              Легко найдите нужное место в аэропорту Шереметьево
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-yellow-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">👑</span>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                    Premium контент
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Интерактивная карта аэропорта доступна только для Premium-пользователей
                  </p>
                </div>
              </div>
              <CardContent className="p-8 blur-sm">
                <div className="bg-muted/50 rounded-lg h-[500px]"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="airport-map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">👑</span>
            Интерактивная карта аэропорта
            <span className="text-sm bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full">Premium</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Легко найдите нужное место в аэропорту Шереметьево
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="Layers" size={20} />
                    Этажи
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[1, 2, 3].map((floor) => (
                    <button
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedFloor === floor
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      <p className="font-semibold">Этаж {floor}</p>
                      <p className={`text-xs ${selectedFloor === floor ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {floor === 1 ? 'Прибытие' : floor === 2 ? 'Вылет' : 'VIP залы'}
                      </p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="Filter" size={20} />
                    Фильтры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { id: 'all', label: 'Все объекты', icon: 'Layers' },
                    { id: 'gate', label: 'Выходы на посадку', icon: 'Plane' },
                    { id: 'food', label: 'Еда и напитки', icon: 'Coffee' },
                    { id: 'shop', label: 'Магазины', icon: 'ShoppingBag' },
                    { id: 'lounge', label: 'Залы отдыха', icon: 'Armchair' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedType(filter.id)}
                      className={`w-full text-left p-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                        selectedType === filter.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      <Icon name={filter.icon as any} size={16} />
                      {filter.label}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="Map" size={24} />
                      Этаж {selectedFloor} - {selectedFloor === 1 ? 'Прибытие' : selectedFloor === 2 ? 'Вылет' : 'VIP'}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="ZoomIn" size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="ZoomOut" size={16} />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-gradient-to-br from-muted to-background rounded-lg border-2 border-border overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="border border-border"></div>
                      ))}
                    </div>

                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        onMouseEnter={() => setHoveredLocation(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: `${location.x}%`, top: `${location.y}%` }}
                      >
                        <div className={`w-10 h-10 rounded-full ${getColor(location.type)} flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform`}>
                          <Icon name={getIcon(location.type) as any} size={20} />
                        </div>
                        {hoveredLocation?.id === location.id && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-3 bg-background border border-border rounded-lg shadow-xl z-10">
                            <p className="font-semibold text-sm text-foreground mb-1">{location.name}</p>
                            <p className="text-xs text-muted-foreground">{location.description}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="absolute top-4 left-4 p-3 bg-background/90 backdrop-blur-sm rounded-lg border">
                      <p className="text-xs text-muted-foreground mb-2">Легенда:</p>
                      <div className="space-y-1">
                        {[
                          { type: 'gate', label: 'Выходы' },
                          { type: 'food', label: 'Еда' },
                          { type: 'shop', label: 'Магазины' },
                          { type: 'lounge', label: 'Залы' },
                        ].map((item) => (
                          <div key={item.type} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getColor(item.type)}`}></div>
                            <span className="text-xs text-foreground">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full ${getColor(location.type)} flex items-center justify-center text-white flex-shrink-0`}>
                          <Icon name={getIcon(location.type) as any} size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{location.name}</p>
                          <p className="text-xs text-muted-foreground">{location.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="Navigation" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="font-semibold text-sm text-foreground mb-1">Навигация</p>
                    <p className="text-xs text-muted-foreground">Прокладываем маршрут</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="Smartphone" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="font-semibold text-sm text-foreground mb-1">AR режим</p>
                    <p className="text-xs text-muted-foreground">Дополненная реальность</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Icon name="Download" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="font-semibold text-sm text-foreground mb-1">Скачать карту</p>
                    <p className="text-xs text-muted-foreground">PDF формат</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportMap;