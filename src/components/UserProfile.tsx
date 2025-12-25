import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface UserData {
  name: string;
  email: string;
  phone: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  miles: number;
  flights: number;
  avatar: string;
}

interface Booking {
  id: string;
  flight: string;
  route: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  seat: string;
  price: number;
}

const mockUser: UserData = {
  name: 'Алексей Петров',
  email: 'alexey.petrov@email.com',
  phone: '+7 (999) 123-45-67',
  level: 'gold',
  miles: 45780,
  flights: 23,
  avatar: '👨‍💼'
};

const mockBookings: Booking[] = [
  { id: 'LV001', flight: 'LV001', route: 'Москва → Санкт-Петербург', date: '28 декабря 2024', status: 'upcoming', seat: '12A', price: 4500 },
  { id: 'LV002', flight: 'LV005', route: 'Москва → Сочи', date: '5 января 2025', status: 'upcoming', seat: '8C', price: 8900 },
  { id: 'LV003', flight: 'LV003', route: 'Санкт-Петербург → Москва', date: '15 декабря 2024', status: 'completed', seat: '15B', price: 4300 },
];

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'loyalty' | 'settings'>('overview');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast.error('Заполните все поля');
      return;
    }
    setIsLoggedIn(true);
    setShowLogin(false);
    toast.success('Добро пожаловать в личный кабинет!');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'text-orange-600';
      case 'silver': return 'text-gray-400';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getLevelName = (level: string) => {
    switch (level) {
      case 'bronze': return 'Бронза';
      case 'silver': return 'Серебро';
      case 'gold': return 'Золото';
      case 'platinum': return 'Платина';
      default: return '';
    }
  };

  if (!isLoggedIn) {
    return (
      <section id="profile" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-3">
                  <Icon name="User" size={32} />
                  Вход в личный кабинет
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Войдите, чтобы управлять бронированиями и участвовать в программе лояльности
                  </p>
                </div>

                {showLogin ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Email</label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Пароль</label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                      />
                    </div>
                    <Button onClick={handleLogin} className="w-full" size="lg">
                      <Icon name="LogIn" className="mr-2" size={20} />
                      Войти
                    </Button>
                    <Button onClick={() => setShowLogin(false)} variant="outline" className="w-full">
                      Назад
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button onClick={() => setShowLogin(true)} className="w-full" size="lg">
                      <Icon name="LogIn" className="mr-2" size={20} />
                      Вход
                    </Button>
                    <Button onClick={() => toast.info('Функция регистрации в разработке')} variant="outline" className="w-full" size="lg">
                      <Icon name="UserPlus" className="mr-2" size={20} />
                      Регистрация
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 pt-6 border-t">
                  <div className="text-center">
                    <Icon name="Ticket" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">Управление бронированиями</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Award" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">Накопление миль</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Gift" className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-xs text-muted-foreground">Эксклюзивные бонусы</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="profile" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-foreground">Личный кабинет</h2>
            <Button onClick={() => { setIsLoggedIn(false); toast.info('Вы вышли из системы'); }} variant="outline">
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{mockUser.avatar}</div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{mockUser.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{mockUser.email}</p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted ${getLevelColor(mockUser.level)} font-bold`}>
                  <Icon name="Crown" size={20} />
                  {getLevelName(mockUser.level)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Plane" className="text-primary" size={32} />
                  <div>
                    <p className="text-sm text-muted-foreground">Накоплено миль</p>
                    <p className="text-3xl font-bold text-foreground">{mockUser.miles.toLocaleString()}</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">До уровня Платина: 4 220 миль</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Calendar" className="text-primary" size={32} />
                  <div>
                    <p className="text-sm text-muted-foreground">Совершено полётов</p>
                    <p className="text-3xl font-bold text-foreground">{mockUser.flights}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">В этом году:</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Предстоит:</span>
                    <span className="font-semibold text-primary">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mb-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
              { id: 'bookings', label: 'Мои билеты', icon: 'Ticket' },
              { id: 'loyalty', label: 'Программа лояльности', icon: 'Award' },
              { id: 'settings', label: 'Настройки', icon: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background hover:bg-muted text-foreground'
                }`}
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={24} />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Plane" className="text-primary mt-1" size={20} />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Предстоящий рейс через 3 дня</p>
                      <p className="text-sm text-muted-foreground">LV001: Москва → Санкт-Петербург, 28 декабря</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Icon name="Gift" className="text-primary mt-1" size={20} />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Новогодняя акция!</p>
                      <p className="text-sm text-muted-foreground">Скидка 20% на все рейсы до 10 января</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Ваша активность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-sm text-muted-foreground">Полётов в 2024</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">45 780</p>
                      <p className="text-sm text-muted-foreground">Миль накоплено</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">8</p>
                      <p className="text-sm text-muted-foreground">Достижений</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">15%</p>
                      <p className="text-sm text-muted-foreground">Средняя скидка</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'bookings' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ticket" size={24} />
                  Мои бронирования
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                          booking.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status === 'upcoming' ? 'Предстоит' : booking.status === 'completed' ? 'Завершён' : 'Отменён'}
                        </span>
                        <span className="font-bold text-foreground">Рейс {booking.flight}</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground mb-1">{booking.route}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Armchair" size={14} />
                          Место {booking.seat}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Wallet" size={14} />
                          {booking.price.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'upcoming' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Программа лояльности Leviks Club
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Копите мили, повышайте статус и получайте эксклюзивные привилегии!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Crown" className="text-yellow-500" size={32} />
                        <div>
                          <p className="font-bold text-lg text-foreground">Золотой статус</p>
                          <p className="text-sm text-muted-foreground">Ваш текущий уровень</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Приоритетная регистрация</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">+50% миль за каждый полёт</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Бесплатный выбор места</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Доступ в бизнес-зал</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Star" className="text-purple-500" size={32} />
                        <div>
                          <p className="font-bold text-lg text-foreground">Платиновый статус</p>
                          <p className="text-sm text-muted-foreground">Следующий уровень</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Всё из Золотого +</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">+100% миль за полёт</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Бесплатный upgrade до бизнеса</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={16} />
                          <span className="text-foreground">Персональный менеджер</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Sparkles" size={24} />
                    Как использовать мили
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Icon name="Ticket" className="mx-auto mb-3 text-primary" size={32} />
                      <p className="font-semibold mb-2 text-foreground">Оплата билетов</p>
                      <p className="text-sm text-muted-foreground">1000 миль = 1000 ₽</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Icon name="ShoppingBag" className="mx-auto mb-3 text-primary" size={32} />
                      <p className="font-semibold mb-2 text-foreground">Upgrade класса</p>
                      <p className="text-sm text-muted-foreground">От 5000 миль</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Icon name="Gift" className="mx-auto mb-3 text-primary" size={32} />
                      <p className="font-semibold mb-2 text-foreground">Подарки</p>
                      <p className="text-sm text-muted-foreground">От 2000 миль</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={24} />
                  Настройки профиля
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Имя</label>
                  <input
                    type="text"
                    defaultValue={mockUser.name}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue={mockUser.email}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Телефон</label>
                  <input
                    type="tel"
                    defaultValue={mockUser.phone}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                  />
                </div>
                <div className="pt-4">
                  <Button onClick={() => toast.success('Настройки сохранены!')} className="w-full">
                    <Icon name="Save" className="mr-2" size={18} />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
