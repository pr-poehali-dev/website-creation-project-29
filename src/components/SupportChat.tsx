import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

const quickReplies = [
  'Проверить статус рейса',
  'Забронировать билет',
  'Вопрос о багаже',
  'Вернуть билет',
  'Другой вопрос'
];

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я виртуальный помощник Leviks Air. Чем могу помочь?',
      sender: 'support',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('статус') || lowerMessage.includes('рейс')) {
      return 'Для проверки статуса рейса перейдите в раздел "Статус рейсов" или введите номер вашего рейса здесь.';
    }
    if (lowerMessage.includes('билет') || lowerMessage.includes('бронирование')) {
      return 'Забронировать билет можно в разделе "Забронировать билет" на главной странице. Нужна помощь с выбором рейса?';
    }
    if (lowerMessage.includes('багаж')) {
      return 'В эконом-классе разрешён багаж до 23 кг + ручная кладь 10 кг. В бизнес-классе: 32 кг + 15 кг ручной клади. Подробнее в разделе FAQ.';
    }
    if (lowerMessage.includes('возврат') || lowerMessage.includes('вернуть')) {
      return 'Возврат билета возможен не позднее чем за 24 часа до вылета. Комиссия составляет 10%. Для возврата позвоните по телефону 8-800-555-35-35.';
    }
    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость')) {
      return 'Цены на билеты зависят от направления и класса. Посмотреть актуальные цены можно в разделе бронирования.';
    }
    if (lowerMessage.includes('спасибо') || lowerMessage.includes('благодар')) {
      return 'Пожалуйста! Рады помочь. Если возникнут ещё вопросы - обращайтесь! ✈️';
    }
    
    return 'Спасибо за ваш вопрос! Для получения детальной консультации позвоните нам по телефону 8-800-555-35-35 (круглосуточно) или напишите на support@leviksair.ru';
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(messageText);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'support',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform"
        size="lg"
      >
        <Icon name={isOpen ? "X" : "MessageCircle"} size={24} />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-4">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon name="Headphones" size={24} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-primary"></span>
                </div>
                <div>
                  <p className="text-lg font-bold">Поддержка</p>
                  <p className="text-xs opacity-90">Онлайн • Обычно отвечаем мгновенно</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-muted-foreground mb-2">Выберите тему:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="sm"
                  className="rounded-full w-10 h-10 p-0"
                  disabled={!inputText.trim()}
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Работаем 24/7 • 8-800-555-35-35
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SupportChat;
