import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  reward: string;
}

const achievements: Achievement[] = [
  { id: '1', title: 'Первый полёт', description: 'Совершите свой первый полёт с Leviks Air', icon: '🎯', unlocked: true, reward: '+500 миль' },
  { id: '2', title: 'Частый путешественник', description: 'Совершите 10 полётов', icon: '✈️', unlocked: true, progress: 10, maxProgress: 10, reward: '+2000 миль' },
  { id: '3', title: 'Исследователь городов', description: 'Посетите 5 разных городов', icon: '🌍', unlocked: true, progress: 5, maxProgress: 5, reward: '+1500 миль' },
  { id: '4', title: 'Ранняя пташка', description: 'Зарегистрируйтесь онлайн за 24 часа до вылета 5 раз', icon: '🌅', unlocked: false, progress: 3, maxProgress: 5, reward: '+1000 миль' },
  { id: '5', title: 'Новогодний путешественник', description: 'Совершите полёт в период новогодних праздников', icon: '🎄', unlocked: true, reward: '+800 миль' },
  { id: '6', title: 'Бизнес-профи', description: 'Летайте бизнес-классом 3 раза', icon: '💼', unlocked: false, progress: 1, maxProgress: 3, reward: '+2500 миль' },
  { id: '7', title: 'Социальный агент', description: 'Поделитесь опытом полёта в соцсетях', icon: '📱', unlocked: false, progress: 0, maxProgress: 1, reward: '+300 миль' },
  { id: '8', title: 'Эко-герой', description: 'Откажитесь от пластика на борту 5 раз', icon: '🌱', unlocked: false, progress: 2, maxProgress: 5, reward: '+700 миль' },
  { id: '9', title: 'Обзорщик', description: 'Оставьте 5 отзывов о полётах', icon: '⭐', unlocked: false, progress: 1, maxProgress: 5, reward: '+600 миль' },
  { id: '10', title: 'Король неба', description: 'Совершите 50 полётов', icon: '👑', unlocked: false, progress: 23, maxProgress: 50, reward: '+10000 миль' },
];

const challenges = [
  { id: '1', title: 'Полёт на выходных', description: 'Забронируйте билет на эти выходные', reward: '+500 миль', timeLeft: '2 дня', icon: '🎯' },
  { id: '2', title: 'Пригласи друга', description: 'Порекомендуйте Leviks Air другу', reward: '+1000 миль', timeLeft: '7 дней', icon: '👥' },
  { id: '3', title: 'Новогодний марафон', description: 'Совершите 3 полёта до конца января', reward: '+3000 миль', timeLeft: '30 дней', icon: '🎊' },
];

const Gamification = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'leaderboard'>('achievements');
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
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + parseInt(a.reward.match(/\d+/)?.[0] || '0'), 0);

  return (
    <section id="gamification" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            {isPremium && <span className="text-3xl">👑</span>}
            Достижения и награды
            {isPremium && <span className="text-sm bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full">Premium</span>}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isPremium ? 'Выполняйте задания, открывайте достижения и зарабатывайте бонусы!' : 'Premium-геймификация: игры, викторины и достижения'}
          </p>
          {!isPremium && (
            <div className="mt-6 p-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/50 rounded-xl max-w-2xl mx-auto">
              <span className="text-5xl block mb-3">👑</span>
              <p className="text-lg font-semibold mb-2">Только для Premium-пользователей</p>
              <p className="text-sm text-muted-foreground mb-4">Геймификация и достижения доступны в Premium-версии</p>
              <Button className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-500">
                Активировать Premium
              </Button>
            </div>
          )}
        </div>

        {isPremium && <div className="max-w-6xl mx-auto mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Trophy" className="mx-auto mb-3 text-primary" size={48} />
                <p className="text-4xl font-bold text-foreground mb-2">{unlockedCount}/{achievements.length}</p>
                <p className="text-sm text-muted-foreground">Достижений открыто</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Star" className="mx-auto mb-3 text-primary" size={48} />
                <p className="text-4xl font-bold text-foreground mb-2">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Миль заработано</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Target" className="mx-auto mb-3 text-primary" size={48} />
                <p className="text-4xl font-bold text-foreground mb-2">8</p>
                <p className="text-sm text-muted-foreground">Активных челленджей</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mb-6 overflow-x-auto">
            {[
              { id: 'achievements', label: 'Достижения', icon: 'Award' },
              { id: 'challenges', label: 'Челленджи', icon: 'Target' },
              { id: 'leaderboard', label: 'Рейтинг', icon: 'TrendingUp' }
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

          {activeTab === 'achievements' && (
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.unlocked ? 'border-primary bg-primary/5' : 'opacity-60'} transition-all hover:shadow-lg`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-foreground">{achievement.title}</h3>
                          {achievement.unlocked && <Icon name="CheckCircle" className="text-primary" size={20} />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        
                        {achievement.maxProgress && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Прогресс</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary">{achievement.reward}</span>
                          {achievement.unlocked && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Открыто</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" className="text-primary" size={24} />
                    Ежедневные задания
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-4xl">{challenge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground mb-1">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                          <div className="flex gap-3 text-xs">
                            <span className="flex items-center gap-1 text-primary font-semibold">
                              <Icon name="Gift" size={12} />
                              {challenge.reward}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Clock" size={12} />
                              Осталось: {challenge.timeLeft}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => toast.success('Челлендж принят! Удачи!')} size="sm">
                        Принять
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={24} />
                    Сезонные события
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-500/10 to-green-500/10 rounded-lg border-2 border-primary">
                    <div className="text-6xl">🎄</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-foreground mb-2">Новогодний марафон 2025</h4>
                      <p className="text-muted-foreground mb-4">
                        Совершите 5 полётов в период с 25 декабря по 15 января и получите эксклюзивные награды!
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-background rounded-lg">
                          <p className="text-2xl font-bold text-primary">x2</p>
                          <p className="text-xs text-muted-foreground">Мили</p>
                        </div>
                        <div className="text-center p-3 bg-background rounded-lg">
                          <p className="text-2xl font-bold text-primary">-20%</p>
                          <p className="text-xs text-muted-foreground">Скидка</p>
                        </div>
                        <div className="text-center p-3 bg-background rounded-lg">
                          <p className="text-2xl font-bold text-primary">🎁</p>
                          <p className="text-xs text-muted-foreground">Подарок</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-muted-foreground">Участвуют: 2,847 пассажиров</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} />
                  Топ пассажиров декабря
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Михаил Соколов', miles: 125000, flights: 47, badge: '🥇' },
                    { rank: 2, name: 'Елена Волкова', miles: 98500, flights: 38, badge: '🥈' },
                    { rank: 3, name: 'Дмитрий Лебедев', miles: 87300, flights: 34, badge: '🥉' },
                    { rank: 4, name: 'Ольга Смирнова', miles: 76200, flights: 29, badge: '4️⃣' },
                    { rank: 5, name: 'Иван Кузнецов', miles: 68900, flights: 26, badge: '5️⃣' },
                    { rank: 6, name: 'Вы (Алексей Петров)', miles: 45780, flights: 23, badge: '6️⃣', highlight: true },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        user.highlight ? 'bg-primary/10 border-2 border-primary' : 'bg-muted hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{user.badge}</div>
                        <div>
                          <p className={`font-bold ${user.highlight ? 'text-primary' : 'text-foreground'}`}>
                            {user.name}
                          </p>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Icon name="Plane" size={12} />
                              {user.miles.toLocaleString()} миль
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {user.flights} полётов
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">#{user.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    💪 Совершите ещё 2 полёта, чтобы подняться на 5 место!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>}
      </div>
    </section>
  );
};

export default Gamification;