import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'flight' | 'baggage' | 'services';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Как забронировать билет?',
    answer: 'Вы можете забронировать билет через наш сайт, выбрав нужный рейс в разделе "Забронировать билет". Также доступно бронирование по телефону горячей линии: 8-800-555-35-35.',
    category: 'booking'
  },
  {
    id: '2',
    question: 'Можно ли вернуть билет?',
    answer: 'Да, билет можно вернуть не позднее чем за 24 часа до вылета. При возврате удерживается комиссия в размере 10% от стоимости билета. Для возврата обратитесь в службу поддержки.',
    category: 'booking'
  },
  {
    id: '3',
    question: 'За сколько времени нужно прибыть в аэропорт?',
    answer: 'Рекомендуем прибыть в аэропорт за 2 часа до внутренних рейсов и за 3 часа до международных. Регистрация закрывается за 40 минут до вылета.',
    category: 'flight'
  },
  {
    id: '4',
    question: 'Какой багаж можно взять с собой?',
    answer: 'В эконом-классе: ручная кладь до 10 кг + багаж до 23 кг. В бизнес-классе: ручная кладь до 15 кг + багаж до 32 кг. Дополнительный багаж оплачивается отдельно.',
    category: 'baggage'
  },
  {
    id: '5',
    question: 'Можно ли взять в салон жидкости?',
    answer: 'Жидкости в ручной клади разрешены объёмом до 100 мл в отдельных ёмкостях. Все ёмкости должны быть упакованы в прозрачный пакет объёмом не более 1 литра.',
    category: 'baggage'
  },
  {
    id: '6',
    question: 'Есть ли питание на борту?',
    answer: 'На рейсах продолжительностью более 3 часов предоставляется бесплатное горячее питание. На коротких рейсах можно заказать питание за дополнительную плату.',
    category: 'services'
  },
  {
    id: '7',
    question: 'Можно ли выбрать место заранее?',
    answer: 'Да, выбор места доступен при бронировании билета или позже в личном кабинете. Некоторые места (у окна, с увеличенным пространством) оплачиваются дополнительно.',
    category: 'services'
  },
  {
    id: '8',
    question: 'Что делать, если рейс задержали?',
    answer: 'При задержке более 2 часов мы предоставляем питание и напитки. При задержке более 6 часов - размещение в гостинице. О задержках мы сообщаем по SMS и email.',
    category: 'flight'
  },
  {
    id: '9',
    question: 'Можно ли лететь с домашними животными?',
    answer: 'Да, животные до 8 кг (вместе с переноской) допускаются в салон. Животные свыше 8 кг перевозятся в багажном отделении. Требуется ветеринарный паспорт.',
    category: 'services'
  },
  {
    id: '10',
    question: 'Как получить посадочный талон?',
    answer: 'Посадочный талон можно получить при онлайн-регистрации (доступна за 24 часа до вылета), в аэропорту у стойки регистрации или в терминале самообслуживания.',
    category: 'flight'
  },
  {
    id: '11',
    question: 'Что входит в стоимость билета?',
    answer: 'В стоимость включено: перевозка пассажира, ручная кладь, 1 место багажа (эконом - 23 кг, бизнес - 32 кг), базовое питание на длинных рейсах.',
    category: 'booking'
  },
  {
    id: '12',
    question: 'Есть ли Wi-Fi на борту?',
    answer: 'Да, на всех наших самолётах доступен бесплатный Wi-Fi. Скорость позволяет просматривать сайты и мессенджеры. Для подключения следуйте инструкциям на борту.',
    category: 'services'
  }
];

const categories = [
  { id: 'all', name: 'Все вопросы', icon: 'HelpCircle' },
  { id: 'booking', name: 'Бронирование', icon: 'Ticket' },
  { id: 'flight', name: 'Полёт', icon: 'Plane' },
  { id: 'baggage', name: 'Багаж', icon: 'Package' },
  { id: 'services', name: 'Услуги', icon: 'Star' }
];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQ = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground text-lg">
            Ответы на самые популярные вопросы пассажиров
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Icon name={cat.icon as any} size={18} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFAQ.map((item) => {
            const isOpen = openItems.includes(item.id);
            
            return (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isOpen ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-3">
                        <Icon name="HelpCircle" className="text-primary flex-shrink-0" size={20} />
                        {item.question}
                      </h3>
                      
                      {isOpen && (
                        <div className="mt-4 pl-8 animate-in fade-in slide-in-from-top-2">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Icon
                      name={isOpen ? "ChevronUp" : "ChevronDown"}
                      className="text-muted-foreground flex-shrink-0 transition-transform"
                      size={24}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <Icon name="MessageCircle" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-3">Не нашли ответ?</h3>
              <p className="text-muted-foreground mb-6">
                Наша служба поддержки работает 24/7 и готова помочь вам с любым вопросом
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:88005553535" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  <Icon name="Phone" size={20} />
                  8-800-555-35-35
                </a>
                <a href="mailto:support@leviksair.ru" className="flex items-center justify-center gap-2 px-6 py-3 bg-background border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  <Icon name="Mail" size={20} />
                  support@leviksair.ru
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
