import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'seat' | 'meal' | 'insurance' | 'baggage';
}

const services: Service[] = [
  { id: 's1', name: 'Выбор места у окна', description: 'Наслаждайтесь видом из иллюминатора', price: 500, icon: 'MapPin', category: 'seat' },
  { id: 's2', name: 'Место у прохода', description: 'Удобный доступ к проходу', price: 300, icon: 'ArrowLeftRight', category: 'seat' },
  { id: 's3', name: 'Увеличенное пространство для ног', description: 'Дополнительное пространство для комфорта', price: 1200, icon: 'Maximize', category: 'seat' },
  { id: 's4', name: 'Горячее питание', description: 'Полноценный обед или ужин на борту', price: 800, icon: 'Utensils', category: 'meal' },
  { id: 's5', name: 'Специальное меню', description: 'Вегетарианское, халяльное или детское меню', price: 800, icon: 'Apple', category: 'meal' },
  { id: 's6', name: 'Премиум напитки', description: 'Коллекция вин и крепких напитков', price: 600, icon: 'Wine', category: 'meal' },
  { id: 's7', name: 'Страхование перелёта', description: 'Полная защита на время путешествия', price: 400, icon: 'Shield', category: 'insurance' },
  { id: 's8', name: 'Страхование багажа', description: 'Защита ваших вещей от потери', price: 300, icon: 'ShieldCheck', category: 'insurance' },
  { id: 's9', name: 'Дополнительный багаж 10 кг', description: 'Возьмите больше вещей с собой', price: 1500, icon: 'Package', category: 'baggage' },
  { id: 's10', name: 'Дополнительный багаж 20 кг', description: 'Максимальный багаж для длительных поездок', price: 2500, icon: 'PackagePlus', category: 'baggage' },
];

const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Все услуги', icon: 'Grid' },
    { id: 'seat', name: 'Выбор места', icon: 'Armchair' },
    { id: 'meal', name: 'Питание', icon: 'Utensils' },
    { id: 'insurance', name: 'Страхование', icon: 'Shield' },
    { id: 'baggage', name: 'Багаж', icon: 'Package' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
      toast.info('Услуга удалена из заказа');
    } else {
      setSelectedServices([...selectedServices, serviceId]);
      toast.success('Услуга добавлена к заказу');
    }
  };

  const getTotalPrice = () => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
  };

  const handleCheckout = () => {
    if (selectedServices.length === 0) {
      toast.error('Выберите хотя бы одну услугу');
      return;
    }
    
    toast.success(`Переход к оформлению ${selectedServices.length} услуг на сумму ${getTotalPrice()} ₽`);
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Дополнительные услуги
          </h2>
          <p className="text-muted-foreground text-lg">
            Сделайте ваш полёт комфортнее с нашими дополнительными услугами
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-2"
            >
              <Icon name={cat.icon as any} size={18} />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => toggleService(service.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon name={service.icon as any} size={24} />
                      </div>
                      <div>
                        <p className="text-lg font-bold">{service.name}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Icon name="CheckCircle" className="text-primary" size={24} />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">{service.price} ₽</p>
                    <Button
                      variant={isSelected ? 'secondary' : 'default'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleService(service.id);
                      }}
                    >
                      {isSelected ? 'Убрать' : 'Добавить'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <Card className="max-w-2xl mx-auto sticky bottom-6 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Выбрано услуг: {selectedServices.length}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    Итого: {getTotalPrice().toLocaleString()} ₽
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedServices([]);
                      toast.info('Все услуги удалены');
                    }}
                  >
                    Очистить
                  </Button>
                  <Button onClick={handleCheckout} size="lg">
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
                    Оформить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
