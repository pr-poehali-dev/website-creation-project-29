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
import UserProfile from '@/components/UserProfile';
import Gamification from '@/components/Gamification';
import VirtualTour from '@/components/VirtualTour';
import TravelGuide from '@/components/TravelGuide';
import EcoInitiatives from '@/components/EcoInitiatives';
import AirportMap from '@/components/AirportMap';
import PriceCalculator from '@/components/PriceCalculator';

import AeroflotBanner from '@/components/AeroflotBanner';
import HackerAttack from '@/components/HackerAttack';
import ApologyMessage from '@/components/ApologyMessage';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [planeClicks, setPlaneClicks] = useState(0);
  const [showSecretGame, setShowSecretGame] = useState(false);
  const [snowmenUnlocked, setSnowmenUnlocked] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem('snowmenUnlocked') === 'true';
    setSnowmenUnlocked(unlocked);
    const premium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premium);
  }, []);

  const handleGameWin = () => {
    localStorage.setItem('snowmenUnlocked', 'true');
    setSnowmenUnlocked(true);
  };

  const handlePremiumActivation = (code: string) => {
    if (code === '454564') {
      localStorage.setItem('isPremium', 'true');
      setIsPremium(true);
      setShowPremiumModal(false);
      toast.success('🎉 Премиум активирован! Добро пожаловать в элитный клуб!');
    } else {
      toast.error('❌ Неверный код активации');
    }
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

      <nav className={`fixed top-[52px] w-full z-50 backdrop-blur-md border-b border-border ${isPremium ? 'bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20' : 'bg-background/80'}`}>
        <div className="container mx-auto px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            {isPremium && <span className="text-2xl md:text-3xl animate-pulse">👑</span>}
            <Icon name="Plane" className={isPremium ? 'text-yellow-500' : 'text-primary'} size={24} />
            <span className={`text-lg md:text-2xl font-bold ${isPremium ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent' : 'text-foreground'}`}>Leviks Air</span>
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
              onClick={() => scrollToSection('services')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                activeSection === 'services' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap hidden sm:block ${
                activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              О компании
            </button>
            <button
              onClick={() => scrollToSection('help')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap hidden sm:block ${
                activeSection === 'help' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Помощь
            </button>
            <button
              onClick={() => scrollToSection('profile')}
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                activeSection === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Личный кабинет
            </button>
            <Button
              size="sm"
              onClick={() => setShowPremiumModal(true)}
              className={isPremium ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-500' : 'bg-primary text-primary-foreground'}
            >
              {isPremium ? '👑 Premium' : 'Premium'}
            </Button>
            <SearchHeader onSearch={handleSearch} />
          </div>
        </div>
      </nav>

      <a
        href="https://www.aeroflot.ru/ru-ru/afl_bonus"
        target="_blank"
        rel="noopener noreferrer"
        className="block pt-[80px] md:pt-[90px] pb-3 md:pb-4"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg group cursor-pointer max-w-6xl mx-auto">
            <img
              src="https://cdn.poehali.dev/projects/fa174cc1-5b97-4175-973a-f9bea28b014a/files/2bd6c9b6-6304-4746-91b0-6a13dfb362d3.jpg"
              alt="Аэрофлот Бонус"
              className="w-full h-20 md:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-1 right-2 md:bottom-2 md:right-3 bg-primary text-primary-foreground px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold">
              Узнать больше →
            </div>
          </div>
        </div>
      </a>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[60px] md:pt-[80px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="https://cdn.poehali.dev/files/c33c7a8dbf111f0bccbeade2fa062be_1 (1).jpeg" 
            alt="Leviks Air Logo" 
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>
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
              onClick={() => scrollToSection('services')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full sm:w-auto"
            >
              Забронировать билет
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              О компании
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('profile')}
              className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              Личный кабинет
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Наши услуги
            </h2>
            <p className="text-muted-foreground text-lg">
              Всё, что нужно для комфортного путешествия
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🎫 Поиск и бронирование</h3>
        <p className="text-muted-foreground mb-6">Найдите и забронируйте билеты на удобные для вас рейсы</p>
      </div>
      <BookingSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">💰 Калькулятор стоимости</h3>
        <p className="text-muted-foreground mb-6">Рассчитайте точную стоимость вашего путешествия</p>
      </div>
      <PriceCalculator />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">📡 Статус рейса</h3>
        <p className="text-muted-foreground mb-6">Отслеживайте статус вашего рейса в реальном времени</p>
      </div>
      <FlightStatus />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🎁 Дополнительные услуги</h3>
        <p className="text-muted-foreground mb-6">Выбор места, питание, страхование и другие сервисы</p>
      </div>
      <ServicesSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🌍 Популярные маршруты</h3>
        <p className="text-muted-foreground mb-6">Самые востребованные направления наших рейсов</p>
      </div>
      <RoutesSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🗺️ Карта маршрутов</h3>
        <p className="text-muted-foreground mb-6">Интерактивная карта всех направлений Leviks Air</p>
      </div>
      <RouteMap />
      
      <section id="about" className="py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              О Leviks Air
            </h2>
            <p className="text-muted-foreground text-lg">
              Узнайте больше о нашей авиакомпании
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">✈️ Наш флот</h3>
        <p className="text-muted-foreground mb-6">Современные самолёты для вашего комфорта</p>
      </div>
      <FleetSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🎥 Виртуальные туры</h3>
        <p className="text-muted-foreground mb-6">Изучите салоны и аэропорты в формате 360°</p>
      </div>
      <VirtualTour />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">📖 Наша история</h3>
        <p className="text-muted-foreground mb-6">Путь развития авиакомпании Leviks Air</p>
      </div>
      <HistorySection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🌱 Экологические инициативы</h3>
        <p className="text-muted-foreground mb-6">Наш вклад в защиту окружающей среды</p>
      </div>
      <EcoInitiatives />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">⭐ Отзывы пассажиров</h3>
        <p className="text-muted-foreground mb-6">Что говорят наши клиенты о полётах</p>
      </div>
      <ReviewsSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">📹 Видеогалерея</h3>
        <p className="text-muted-foreground mb-6">Смотрите видео о наших самолётах и сервисе</p>
      </div>
      <VideoGallery />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🏆 Достижения и награды</h3>
        <p className="text-muted-foreground mb-6">Зарабатывайте бонусы за активность</p>
      </div>
      <Gamification />
      
      <section id="help" className="py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Помощь и поддержка
            </h2>
            <p className="text-muted-foreground text-lg">
              Всегда готовы помочь вам
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">📚 Гид путешественника</h3>
        <p className="text-muted-foreground mb-6">Полезные советы для комфортного полёта</p>
      </div>
      <TravelGuide />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">🗺️ Карта аэропорта</h3>
        <p className="text-muted-foreground mb-6">Навигация по терминалам в интерактивном режиме</p>
      </div>
      <AirportMap />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">❓ Частые вопросы</h3>
        <p className="text-muted-foreground mb-6">Ответы на самые популярные вопросы</p>
      </div>
      <FAQSection />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">📱 Мы в соцсетях</h3>
        <p className="text-muted-foreground mb-6">Следите за новостями и специальными предложениями</p>
      </div>
      <SocialShare />
      
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-3xl font-bold text-foreground mb-2">👤 Личный кабинет</h3>
        <p className="text-muted-foreground mb-6">Управляйте бронированиями и участвуйте в программе лояльности</p>
      </div>
      <UserProfile />

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

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-card border-2 border-yellow-500 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block animate-bounce">👑</span>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-2">
                Premium подписка
              </h2>
              <p className="text-muted-foreground text-sm">
                Эксклюзивные возможности для избранных
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-xl">✨</span>
                <span>Золотая тема оформления</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-xl">💎</span>
                <span>Алмазная тема чата</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-xl">👑</span>
                <span>Корона в верхнем углу</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-xl">💬</span>
                <span>Золотые сообщения боту</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-xl">🎅</span>
                <span>Деды Морозы вместо снеговиков</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Код активации</label>
              <input
                id="premium-code"
                type="text"
                placeholder="Введите код"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const input = document.getElementById('premium-code') as HTMLInputElement;
                  handlePremiumActivation(input.value);
                }}
                className="flex-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-500"
              >
                Активировать
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPremiumModal(false)}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;