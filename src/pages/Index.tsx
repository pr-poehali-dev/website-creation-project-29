import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import FleetSection from '@/components/FleetSection';
import HistorySection from '@/components/HistorySection';
import Snowfall from '@/components/Snowfall';
import RoutesSection from '@/components/RoutesSection';
import SecretGame from '@/components/SecretGame';
import NewYearMagic from '@/components/NewYearMagic';
import BackgroundMusic from '@/components/BackgroundMusic';
import AuthDialog from '@/components/AuthDialog';
import AeroflotBanner from '@/components/AeroflotBanner';
import HackerAttack from '@/components/HackerAttack';
import ApologyMessage from '@/components/ApologyMessage';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [planeClicks, setPlaneClicks] = useState(0);
  const [showSecretGame, setShowSecretGame] = useState(false);
  const [snowmenUnlocked, setSnowmenUnlocked] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    const unlocked = localStorage.getItem('snowmenUnlocked') === 'true';
    setSnowmenUnlocked(unlocked);
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      setIsAuthenticated(true);
      setUserPhone(savedPhone);
    }
  }, []);

  const handleAuthSuccess = (phone: string) => {
    setIsAuthenticated(true);
    setUserPhone(phone);
    localStorage.setItem('userPhone', phone);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserPhone(null);
    localStorage.removeItem('userPhone');
    toast.success('Вы вышли из аккаунта');
  };

  const handleGameWin = () => {
    localStorage.setItem('snowmenUnlocked', 'true');
    setSnowmenUnlocked(true);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <ApologyMessage />
      <HackerAttack />
      <AeroflotBanner />
      <BackgroundMusic />
      <NewYearMagic />
      <Snowfall />
      
      <div className="fixed top-0 w-full z-[51] bg-gradient-to-r from-red-600 via-blue-600 to-red-600 py-2">
        <div className="container mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-white text-sm font-medium">🎄 Купить билеты:</span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
            className="bg-white/90 hover:bg-white text-red-600 font-semibold text-xs"
          >
            ✈️ Аэрофлот
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.rossiya-airlines.com', '_blank')}
            className="bg-white/90 hover:bg-white text-blue-600 font-semibold text-xs"
          >
            ✈️ Россия
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.pobeda.aero', '_blank')}
            className="bg-white/90 hover:bg-white text-green-600 font-semibold text-xs"
          >
            ✈️ Победа
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.utair.ru', '_blank')}
            className="bg-white/90 hover:bg-white text-orange-600 font-semibold text-xs"
          >
            ✈️ UTair
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.yamal.aero', '_blank')}
            className="bg-white/90 hover:bg-white text-purple-600 font-semibold text-xs"
          >
            ✈️ Ямал
          </Button>
        </div>
      </div>

      <nav className="fixed top-[52px] w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Plane" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-foreground">Leviks Air</span>
            <span className="text-2xl">🎄</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('routes')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'routes' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Маршруты
            </button>
            <button
              onClick={() => scrollToSection('fleet')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'fleet' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Флот
            </button>
            <button
              onClick={() => scrollToSection('history')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'history' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              История
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <Icon name="User" className="text-primary" size={16} />
                  <span className="text-sm font-medium text-primary">{userPhone}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="LogOut" size={18} />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthDialog(true)}
                size="sm"
                className="ml-4"
              >
                <Icon name="LogIn" className="mr-2" size={16} />
                Войти
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[116px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div
            className="inline-block mb-6 cursor-pointer transition-transform hover:scale-110"
            onClick={() => {
              const newClicks = planeClicks + 1;
              setPlaneClicks(newClicks);
              if (newClicks === 3) {
                setShowSecretGame(true);
                setPlaneClicks(0);
              }
            }}
          >
            <Icon name="Plane" className="text-primary" size={80} />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
            Leviks Air 🎄
          </h1>
          <p className="text-2xl font-semibold text-secondary mb-4">С Новым Годом! 🎅</p>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Инновационная авиакомпания будущего. Технологии, комфорт и безопасность на высоте 10 000 метров.
          </p>
          <div className="flex items-center justify-center gap-6 mb-8">
            <p className="text-sm text-muted-foreground">Дочерняя компания Аэрофлот</p>
            <div className="h-4 w-px bg-border"></div>
            <p className="text-sm text-muted-foreground">Член альянса SkyTeam</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Купить билет
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('fleet')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Наш флот
            </Button>
          </div>
        </div>
      </section>

      <RoutesSection />
      <FleetSection />
      <HistorySection />

      {showSecretGame && <SecretGame onClose={() => setShowSecretGame(false)} onWin={handleGameWin} />}
      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
      />

      {snowmenUnlocked && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div className="snowman-walk-1 absolute text-6xl">⛄</div>
          <div className="snowman-walk-2 absolute text-6xl">⛄</div>
          <div className="snowman-walk-3 absolute text-5xl">⛄</div>
        </div>
      )}

      <section className="py-16 bg-gradient-to-r from-card via-background to-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">🎄 Наши партнеры</h2>
            <p className="text-muted-foreground">Часть глобальной авиационной семьи</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a
              href="https://www.aeroflot.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/20be7446-c125-49bd-a833-0a15236c932a.jpg"
                  alt="Аэрофлот"
                  loading="lazy"
                  decoding="async"
                  className="h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Аэрофлот</h3>
                  <p className="text-sm text-muted-foreground">Материнская компания</p>
                </div>
              </div>
            </a>
            <a
              href="https://www.skyteam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center gap-4">
                <img
                  src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/71a6bd82-e528-4773-aca3-774692a26fce.jpg"
                  alt="SkyTeam"
                  loading="lazy"
                  decoding="async"
                  className="h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">SkyTeam</h3>
                  <p className="text-sm text-muted-foreground">Глобальный авиационный альянс</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Plane" className="text-primary" size={24} />
                <span className="text-xl font-bold text-foreground">Leviks Air</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Авиакомпания нового поколения, соединяющая технологии и комфорт
              </p>
              <p className="text-xs text-muted-foreground">
                Дочерняя компания Аэрофлот | Член альянса SkyTeam
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@leviksair.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Следите за нами</h3>
              <div className="flex gap-4">
                <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Twitter" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Instagram" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Leviks Air. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;