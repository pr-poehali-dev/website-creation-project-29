import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const EcoInitiatives = () => {
  return (
    <section id="eco" className="py-20 bg-gradient-to-br from-green-500/10 via-background to-blue-500/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-4">
            <Icon name="Leaf" className="text-green-600" size={20} />
            <span className="text-sm font-semibold text-green-700">Экологическая ответственность</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Заботимся о планете
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Leviks Air активно работает над снижением углеродного следа и внедряет инновационные решения для защиты окружающей среды
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-500/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Icon name="TrendingDown" className="text-green-600" size={32} />
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">-35%</p>
                <p className="text-sm text-muted-foreground">Снижение выбросов CO₂ с 2020 года</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Icon name="Droplets" className="text-blue-600" size={32} />
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">80%</p>
                <p className="text-sm text-muted-foreground">Биотопливо в топливной смеси к 2030</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Icon name="Recycle" className="text-yellow-600" size={32} />
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">100%</p>
                <p className="text-sm text-muted-foreground">Переработка отходов на борту</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plane" className="text-primary" size={24} />
                  Современный флот
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Топливная эффективность</p>
                    <p className="text-sm text-muted-foreground">
                      Airbus A320neo и Boeing 737 MAX — самые экономичные самолёты, потребляющие на 20% меньше топлива
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Снижение шума</p>
                    <p className="text-sm text-muted-foreground">
                      Новые двигатели на 50% тише предыдущего поколения
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-primary" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Аэродинамика</p>
                    <p className="text-sm text-muted-foreground">
                      Winglets и улучшенная аэродинамика снижают расход топлива на 4%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Leaf" className="text-green-600" size={24} />
                  Биотопливо
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">SAF (Sustainable Aviation Fuel)</p>
                    <p className="text-sm text-muted-foreground">
                      Уже сегодня 25% топлива — биотопливо из отходов растительного масла
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Снижение выбросов</p>
                    <p className="text-sm text-muted-foreground">
                      SAF снижает выбросы CO₂ на 80% по сравнению с обычным керосином
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Сертификация</p>
                    <p className="text-sm text-muted-foreground">
                      Все биотопливо сертифицировано по стандартам ASTM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Recycle" className="text-blue-600" size={24} />
                  Zero Waste на борту
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Раздельный сбор</p>
                    <p className="text-sm text-muted-foreground">
                      На борту установлены контейнеры для раздельного сбора отходов
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Биоразлагаемая упаковка</p>
                    <p className="text-sm text-muted-foreground">
                      Посуда и упаковка для еды из компостируемых материалов
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Отказ от пластика</p>
                    <p className="text-sm text-muted-foreground">
                      Полный отказ от одноразового пластика к 2025 году
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trees" className="text-green-700" size={24} />
                  Компенсация выбросов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-700" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Посадка лесов</p>
                    <p className="text-sm text-muted-foreground">
                      За каждый билет мы высаживаем 1 дерево — более 500 000 деревьев в год
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-700" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Углеродная нейтральность</p>
                    <p className="text-sm text-muted-foreground">
                      Стремимся к полной углеродной нейтральности к 2050 году
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-green-700" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Участие пассажиров</p>
                    <p className="text-sm text-muted-foreground">
                      Вы можете добровольно компенсировать выбросы вашего полёта
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="text-6xl">🌍</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">Присоединяйтесь к нам</h3>
                  <p className="text-muted-foreground mb-4">
                    Каждый пассажир Leviks Air вносит вклад в защиту окружающей среды. 
                    Вместе мы делаем авиацию более экологичной!
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                      <span className="text-sm text-foreground">Летайте экономно</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                      <span className="text-sm text-foreground">Откажитесь от пластика</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                      <span className="text-sm text-foreground">Компенсируйте выбросы</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EcoInitiatives;
