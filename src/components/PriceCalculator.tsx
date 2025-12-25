import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface FlightOption {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
}

const mockFlights: FlightOption[] = [
  { id: '1', airline: 'Leviks Air', departure: '08:00', arrival: '09:30', duration: '1ч 30м', stops: 0, price: 4500, class: 'Эконом' },
  { id: '2', airline: 'Leviks Air', departure: '14:00', arrival: '15:30', duration: '1ч 30м', stops: 0, price: 5200, class: 'Бизнес' },
  { id: '3', airline: 'Аэрофлот', departure: '10:30', arrival: '12:00', duration: '1ч 30м', stops: 0, price: 4800, class: 'Эконом' },
  { id: '4', airline: 'S7 Airlines', departure: '16:00', arrival: '17:30', duration: '1ч 30м', stops: 0, price: 4300, class: 'Эконом' },
];

const PriceCalculator = () => {
  const [from, setFrom] = useState('Москва');
  const [to, setTo] = useState('Санкт-Петербург');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [insurance, setInsurance] = useState(false);
  const [seat, setSeat] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  const calculateTotal = (basePrice: number) => {
    let total = basePrice * passengers;
    total += luggage * 1500;
    if (insurance) total += passengers * 500;
    if (seat) total += passengers * 800;
    return total;
  };

  const handleCalculate = () => {
    if (!from || !to) {
      toast.error('Заполните маршрут');
      return;
    }
    setShowResults(true);
    toast.success('Найдено 4 варианта перелёта');
  };

  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === 'price') return calculateTotal(a.price) - calculateTotal(b.price);
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return a.departure.localeCompare(b.departure);
  });

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Калькулятор стоимости
          </h2>
          <p className="text-muted-foreground text-lg">
            Рассчитайте стоимость перелёта и сравните цены
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Calculator" size={24} />
                    Параметры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Откуда</label>
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Куда</label>
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Пассажиры: {passengers}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="9"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Доп. багаж: {luggage} шт × 1500 ₽
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={insurance}
                        onChange={(e) => setInsurance(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Страховка (+500 ₽/чел)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seat}
                        onChange={(e) => setSeat(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Выбор места (+800 ₽/чел)</span>
                    </label>
                  </div>

                  <Button onClick={handleCalculate} className="w-full" size="lg">
                    <Icon name="Search" className="mr-2" size={20} />
                    Рассчитать
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {showResults ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Найдено предложений: {mockFlights.length}</CardTitle>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSortBy('price')}
                            className={`px-3 py-1 text-sm rounded-lg transition-all ${
                              sortBy === 'price' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                            }`}
                          >
                            По цене
                          </button>
                          <button
                            onClick={() => setSortBy('duration')}
                            className={`px-3 py-1 text-sm rounded-lg transition-all ${
                              sortBy === 'duration' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                            }`}
                          >
                            По времени
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {sortedFlights.map((flight, index) => {
                    const total = calculateTotal(flight.price);
                    const cheapest = index === 0 && sortBy === 'price';

                    return (
                      <Card key={flight.id} className={cheapest ? 'border-2 border-primary' : ''}>
                        <CardContent className="p-6">
                          {cheapest && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded mb-3">
                              <Icon name="TrendingDown" size={14} />
                              Самый выгодный
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">✈️</div>
                              <div>
                                <p className="font-bold text-foreground">{flight.airline}</p>
                                <p className="text-sm text-muted-foreground">{flight.class}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-primary">{total.toLocaleString()} ₽</p>
                              <p className="text-xs text-muted-foreground">за {passengers} пас.</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                              <p className="text-sm text-muted-foreground">{from}</p>
                            </div>
                            <div className="flex-1 mx-4 flex flex-col items-center">
                              <Icon name="Plane" className="text-primary mb-1" size={24} />
                              <div className="w-full h-px bg-border"></div>
                              <p className="text-xs text-muted-foreground mt-1">{flight.duration}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                              <p className="text-sm text-muted-foreground">{to}</p>
                            </div>
                          </div>

                          <div className="bg-muted p-3 rounded-lg mb-4">
                            <p className="text-xs text-muted-foreground mb-2">Детализация:</p>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-foreground">Билеты ({passengers} × {flight.price} ₽)</span>
                                <span className="font-semibold text-foreground">{(flight.price * passengers).toLocaleString()} ₽</span>
                              </div>
                              {luggage > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-foreground">Багаж ({luggage} × 1500 ₽)</span>
                                  <span className="font-semibold text-foreground">{(luggage * 1500).toLocaleString()} ₽</span>
                                </div>
                              )}
                              {insurance && (
                                <div className="flex justify-between">
                                  <span className="text-foreground">Страховка ({passengers} × 500 ₽)</span>
                                  <span className="font-semibold text-foreground">{(passengers * 500).toLocaleString()} ₽</span>
                                </div>
                              )}
                              {seat && (
                                <div className="flex justify-between">
                                  <span className="text-foreground">Выбор места ({passengers} × 800 ₽)</span>
                                  <span className="font-semibold text-foreground">{(passengers * 800).toLocaleString()} ₽</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <Button className="w-full" onClick={() => toast.success('Переход к бронированию...')}>
                            <Icon name="ShoppingCart" className="mr-2" size={18} />
                            Выбрать этот рейс
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <Icon name="Search" className="mx-auto mb-4 text-muted-foreground" size={64} />
                    <p className="text-lg text-foreground mb-2">Укажите параметры поиска</p>
                    <p className="text-sm text-muted-foreground">
                      Заполните форму слева и нажмите "Рассчитать"
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Icon name="Info" className="text-primary flex-shrink-0" size={40} />
                <div>
                  <p className="font-semibold text-foreground mb-1">💡 Совет от эксперта</p>
                  <p className="text-sm text-muted-foreground">
                    Бронируйте билеты за 3-4 недели до вылета — так вы сможете сэкономить до 30% от стоимости!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
