import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  x: number;
  y: number;
}

interface Route {
  from: string;
  to: string;
  color: string;
}

const airports: Airport[] = [
  { id: '1', name: 'Шереметьево', code: 'SVO', city: 'Москва', x: 50, y: 30 },
  { id: '2', name: 'Пулково', code: 'LED', city: 'Санкт-Петербург', x: 45, y: 20 },
  { id: '3', name: 'Казань', code: 'KZN', city: 'Казань', x: 65, y: 35 },
  { id: '4', name: 'Сочи', code: 'AER', city: 'Сочи', x: 55, y: 60 },
  { id: '5', name: 'Екатеринбург', code: 'SVX', city: 'Екатеринбург', x: 75, y: 25 },
  { id: '6', name: 'Новосибирск', code: 'OVB', city: 'Новосибирск', x: 85, y: 30 },
];

const routes: Route[] = [
  { from: '1', to: '2', color: '#3b82f6' },
  { from: '1', to: '3', color: '#10b981' },
  { from: '1', to: '4', color: '#f59e0b' },
  { from: '1', to: '5', color: '#8b5cf6' },
  { from: '1', to: '6', color: '#ec4899' },
  { from: '2', to: '5', color: '#06b6d4' },
  { from: '3', to: '6', color: '#14b8a6' },
];

const RouteMap = () => {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const getAirportById = (id: string) => airports.find(a => a.id === id);

  const isRouteActive = (route: Route) => {
    if (!selectedAirport) return true;
    return route.from === selectedAirport || route.to === selectedAirport;
  };

  return (
    <section id="route-map" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Карта маршрутов
          </h2>
          <p className="text-muted-foreground text-lg">
            Интерактивная карта полётов Leviks Air по России
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 aspect-[16/10]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    {routes.map((route, idx) => (
                      <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={route.color} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={route.color} stopOpacity="0.3" />
                      </linearGradient>
                    ))}
                  </defs>

                  {routes.map((route, idx) => {
                    const fromAirport = getAirportById(route.from);
                    const toAirport = getAirportById(route.to);
                    if (!fromAirport || !toAirport) return null;

                    const active = isRouteActive(route);
                    const routeKey = `${route.from}-${route.to}`;
                    const isHovered = hoveredRoute === routeKey;

                    return (
                      <g
                        key={idx}
                        onMouseEnter={() => setHoveredRoute(routeKey)}
                        onMouseLeave={() => setHoveredRoute(null)}
                        className="cursor-pointer transition-all"
                      >
                        <line
                          x1={fromAirport.x}
                          y1={fromAirport.y}
                          x2={toAirport.x}
                          y2={toAirport.y}
                          stroke={`url(#gradient-${idx})`}
                          strokeWidth={isHovered ? "0.6" : active ? "0.4" : "0.2"}
                          strokeDasharray={isHovered ? "0" : "2,2"}
                          className="transition-all"
                          opacity={active ? 1 : 0.3}
                        />
                        
                        {isHovered && (
                          <>
                            <circle
                              cx={(fromAirport.x + toAirport.x) / 2}
                              cy={(fromAirport.y + toAirport.y) / 2}
                              r="1"
                              fill={route.color}
                              className="animate-pulse"
                            />
                            <text
                              x={(fromAirport.x + toAirport.x) / 2}
                              y={(fromAirport.y + toAirport.y) / 2 - 2}
                              textAnchor="middle"
                              fill="currentColor"
                              className="text-[3px] font-semibold"
                            >
                              {fromAirport.code} → {toAirport.code}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}

                  {airports.map((airport) => {
                    const isSelected = selectedAirport === airport.id;
                    const hasConnection = selectedAirport
                      ? routes.some(r => 
                          (r.from === selectedAirport && r.to === airport.id) ||
                          (r.to === selectedAirport && r.from === airport.id)
                        )
                      : true;

                    return (
                      <g
                        key={airport.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedAirport(isSelected ? null : airport.id)}
                      >
                        <circle
                          cx={airport.x}
                          cy={airport.y}
                          r={isSelected ? "2.5" : "1.8"}
                          fill={isSelected ? "#3b82f6" : hasConnection ? "#10b981" : "#94a3b8"}
                          stroke="white"
                          strokeWidth="0.3"
                          className="transition-all hover:scale-110"
                          opacity={hasConnection ? 1 : 0.5}
                        />
                        
                        <text
                          x={airport.x}
                          y={airport.y - 3}
                          textAnchor="middle"
                          className="text-[2.5px] font-bold fill-current"
                        >
                          {airport.code}
                        </text>
                        
                        <text
                          x={airport.x}
                          y={airport.y + 5}
                          textAnchor="middle"
                          className="text-[2px] fill-current opacity-70"
                        >
                          {airport.city}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold flex items-center gap-2">
                      <Icon name="Info" size={14} />
                      Подсказка
                    </p>
                    <p className="text-muted-foreground">Нажмите на аэропорт, чтобы увидеть связи</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-muted/30">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {airports.map((airport) => {
                    const isActive = !selectedAirport || selectedAirport === airport.id || 
                      routes.some(r => 
                        (r.from === selectedAirport && r.to === airport.id) ||
                        (r.to === selectedAirport && r.from === airport.id)
                      );

                    return (
                      <Button
                        key={airport.id}
                        variant={selectedAirport === airport.id ? "default" : "outline"}
                        onClick={() => setSelectedAirport(selectedAirport === airport.id ? null : airport.id)}
                        className={`justify-start ${!isActive ? 'opacity-50' : ''}`}
                      >
                        <Icon name="MapPin" size={16} className="mr-2" />
                        <div className="text-left">
                          <p className="font-semibold">{airport.code}</p>
                          <p className="text-xs opacity-80">{airport.city}</p>
                        </div>
                      </Button>
                    );
                  })}
                </div>

                {selectedAirport && (
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedAirport(null)}
                    className="w-full mt-4"
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Показать все маршруты
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RouteMap;
