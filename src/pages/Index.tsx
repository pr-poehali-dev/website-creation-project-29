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
import BookingSection from '@/components/BookingSection';
import SearchHeader from '@/components/SearchHeader';
import FlightStatus from '@/components/FlightStatus';
import ServicesSection from '@/components/ServicesSection';
import RouteMap from '@/components/RouteMap';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import SupportChat from '@/components/SupportChat';
import SocialShare from '@/components/SocialShare';
import VideoGallery from '@/components/VideoGallery';

import AeroflotBanner from '@/components/AeroflotBanner';
import HackerAttack from '@/components/HackerAttack';
import ApologyMessage from '@/components/ApologyMessage';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [planeClicks, setPlaneClicks] = useState(0);
  const [showSecretGame, setShowSecretGame] = useState(false);
  const [snowmenUnlocked, setSnowmenUnlocked] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem('snowmenUnlocked') === 'true';
    setSnowmenUnlocked(unlocked);
  }, []);

  const handleGameWin = () => {
    localStorage.setItem('snowmenUnlocked', 'true');
    setSnowmenUnlocked(true);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    toast.info(`Поиск: "${query}". Функция в разработке.`);
  };

  return (
    <div className="min-h-screen bg-background">

      <AeroflotBanner />

      <NewYearMagic />
      <Snowfall />
      
      <div className="fixed top-0 w-full z-[51] bg-gradient-to-r from-red-600 via-blue-600 to-red-600 py-2 md:py-2">
        <div className="container mx-auto px-3 md:px-6 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          <span className="text-white text-xs md:text-sm font-medium hidden sm:inline">🎄 Купить билеты:</span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
            className="bg-white/90 hover:bg-white text-red-600 font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 h-auto"
          >
            ✈️ Аэрофлот
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.rossiya-airlines.com', '_blank')}
            className="bg-white/90 hover:bg-white text-blue-600 font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 h-auto"
          >
            ✈️ Россия
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.pobeda.aero', '_blank')}
            className="bg-white/90 hover:bg-white text-green-600 font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 h-auto"
          >
            ✈️ Победа
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.utair.ru', '_blank')}
            className="bg-white/90 hover:bg-white text-orange-600 font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 h-auto"
          >
            ✈️ UTair
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open('https://www.yamal.aero', '_blank')}
            className="bg-white/90 hover:bg-white text-purple-600 font-semibold text-[10px] md:text-xs px-2 md:px-3 py-1 h-auto"
          >
            ✈️ Ямал
          </Button>
        </div>
      </div>

      <nav className="fixed top-[52px] w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon name="Plane" className="text-primary" size={24} />
            <span className="text-lg md:text-2xl font-bold text-foreground">Leviks Air</span>
            <span className="text-lg md:text-2xl">🎄</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                activeSection === 'booking' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Билеты
            </button>
            <button
              onClick={() => scrollToSection('routes')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap hidden sm:block ${
                activeSection === 'routes' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Маршруты
            </button>
            <button
              onClick={() => scrollToSection('fleet')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                activeSection === 'fleet' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Флот
            </button>
            <SearchHeader onSearch={handleSearch} />
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[120px] md:pt-[116px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div
            className="inline-block mb-4 md:mb-6 cursor-pointer transition-transform hover:scale-110"
            onClick={() => {
              const newClicks = planeClicks + 1;
              setPlaneClicks(newClicks);
              if (newClicks === 3) {
                setShowSecretGame(true);
                setPlaneClicks(0);
              }
            }}
          >
            <Icon name="Plane" className="text-primary" size={60} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
            Leviks Air 🎄
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-secondary mb-3 md:mb-4">С Новым Годом! 🎅</p>
          <p className="text-base md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto px-4">
            Инновационная авиакомпания будущего. Технологии, комфорт и безопасность на высоте 10 000 метров.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-8">
            <p className="text-xs md:text-sm text-muted-foreground">Дочерняя компания Аэрофлот</p>
            <div className="hidden sm:block h-4 w-px bg-border"></div>
            <p className="text-xs md:text-sm text-muted-foreground">Член альянса SkyTeam</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button
              size="lg"
              onClick={() => window.open('https://www.aeroflot.ru', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full sm:w-auto"
            >
              Купить билет
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('fleet')}
              className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              Наш флот
            </Button>
          </div>
        </div>
      </section>

      <BookingSection />
      <FlightStatus />
      <ServicesSection />
      <RoutesSection />
      <RouteMap />
      <FleetSection />
      <HistorySection />
      <ReviewsSection />
      <VideoGallery />
      <FAQSection />
      <SocialShare />

      <SupportChat />
      {showSecretGame && <SecretGame onClose={() => setShowSecretGame(false)} onWin={handleGameWin} />}

      {snowmenUnlocked && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div className="snowman-walk-1 absolute text-6xl">⛄</div>
          <div className="snowman-walk-2 absolute text-6xl">⛄</div>
          <div className="snowman-walk-3 absolute text-5xl">⛄</div>
        </div>
      )}

      <section className="py-8 md:py-16 bg-gradient-to-r from-card via-background to-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🎄 Наши партнеры</h2>
            <p className="text-sm md:text-base text-muted-foreground">Часть глобальной авиационной семьи</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            <a
              href="https://www.aeroflot.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg md:rounded-xl p-4 md:p-8 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <img
                  src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/20be7446-c125-49bd-a833-0a15236c932a.jpg"
                  alt="Аэрофлот"
                  loading="lazy"
                  decoding="async"
                  className="h-14 md:h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 md:mb-2">Аэрофлот</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Материнская компания</p>
                </div>
              </div>
            </a>
            <a
              href="https://www.skyteam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg md:rounded-xl p-4 md:p-8 hover:border-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center gap-3 md:gap-4">
                <img
                  src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/71a6bd82-e528-4773-aca3-774692a26fce.jpg"
                  alt="SkyTeam"
                  loading="lazy"
                  decoding="async"
                  className="h-14 md:h-20 object-contain group-hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 md:mb-2">SkyTeam</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Глобальный авиационный альянс</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Icon name="Plane" className="text-primary" size={20} />
                <span className="text-lg md:text-xl font-bold text-foreground">Leviks Air</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">
                Авиакомпания нового поколения, соединяющая технологии и комфорт
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Дочерняя компания Аэрофлот | Член альянса SkyTeam
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Контакты</h3>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (800) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@leviksair.com
                </p>
              </div>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Следите за нами</h3>
              <div className="flex gap-3 md:gap-4">
                <Icon name="Facebook" size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Twitter" size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Instagram" size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
            © 2024 Leviks Air. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;