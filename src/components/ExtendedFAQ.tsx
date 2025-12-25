import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Бронирование',
    question: 'Как забронировать билет онлайн?',
    answer: 'Выберите маршрут, дату, введите данные пассажиров и оплатите картой. Билет придёт на email.'
  },
  {
    category: 'Бронирование',
    question: 'Можно ли изменить дату перелёта?',
    answer: 'Да, за 24 часа до вылета. Стоимость изменения зависит от тарифа билета.'
  },
  {
    category: 'Бронирование',
    question: 'Как вернуть билет?',
    answer: 'Обратитесь в службу поддержки или используйте личный кабинет. Возврат зависит от правил тарифа.'
  },
  {
    category: 'Регистрация',
    question: 'Когда открывается онлайн-регистрация?',
    answer: 'За 24 часа до вылета. Заканчивается за 1 час до вылета для внутренних рейсов.'
  },
  {
    category: 'Регистрация',
    question: 'Обязательна ли онлайн-регистрация?',
    answer: 'Нет, но она экономит время. Можно зарегистрироваться в аэропорту.'
  },
  {
    category: 'Багаж',
    question: 'Сколько багажа можно провезти бесплатно?',
    answer: 'Эконом: 1 место до 23 кг. Бизнес: 2 места по 32 кг. Плюс ручная кладь до 10 кг.'
  },
  {
    category: 'Багаж',
    question: 'Сколько стоит дополнительный багаж?',
    answer: 'От 2000 ₽ за место. Выгоднее оплатить заранее онлайн со скидкой 20%.'
  },
  {
    category: 'Животные',
    question: 'Можно ли лететь с животными?',
    answer: 'Да. Малые животные (до 8 кг) в салоне. Крупные - в багажном отделении. Требуется справка.'
  },
  {
    category: 'Питание',
    question: 'Включено ли питание в билет?',
    answer: 'В бизнес-классе - да. В эконом-классе можно заказать за доп. плату или принести своё.'
  },
  {
    category: 'Дети',
    question: 'Со скольки лет ребёнок летит без сопровождения?',
    answer: 'С 12 лет. Младшие дети - только с родителем или с услугой "Сопровождение ребёнка".'
  }
];

const ExtendedFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(faqData.map(item => item.category)))];
  
  const filteredFAQ = selectedCategory === 'Все' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredFAQ.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <span className="text-xs text-primary font-medium">{item.category}</span>
                <div className="font-semibold mt-1">{item.question}</div>
              </div>
              <Icon 
                name={openIndex === index ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground flex-shrink-0 ml-4"
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                {item.answer}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExtendedFAQ;
