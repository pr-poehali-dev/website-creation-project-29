import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'user' | 'operator';
  text: string;
  time: string;
}

const LiveConsultation = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [operatorName] = useState('Анна Смирнова');

  const handleStartChat = () => {
    setIsOnline(true);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      sender: 'operator',
      text: 'Здравствуйте! Меня зовут Анна, я помогу вам с любыми вопросами по перелётам. Чем могу быть полезна?',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const operatorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'operator',
        text: 'Спасибо за ваш вопрос! Наш специалист обработает его в ближайшее время.',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, operatorResponse]);
    }, 1500);
  };

  const handleVideoCall = () => {
    toast.info('Видеозвонок будет доступен в ближайшее время!');
  };

  const handleEndChat = () => {
    setIsOnline(false);
    setMessages([]);
    toast.success('Спасибо за обращение! Будем рады помочь вам снова.');
  };

  if (!isOnline) {
    return (
      <div className="space-y-6">
        <Card className="p-8 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <Icon name="MessageCircle" size={40} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Онлайн-консультация</h3>
              <p className="text-muted-foreground">
                Свяжитесь с нашим специалистом в чате или по видеосвязи. 
                Мы ответим на все вопросы о бронировании, багаже, регистрации и других услугах.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={handleStartChat} className="gap-2">
                <Icon name="MessageSquare" size={20} />
                Начать чат
              </Button>
              <Button size="lg" variant="outline" onClick={handleVideoCall} className="gap-2">
                <Icon name="Video" size={20} />
                Видеозвонок
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={24} className="text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold">Быстрый ответ</h4>
                <p className="text-sm text-muted-foreground">В течение 2 минут</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Наши специалисты отвечают на запросы моментально
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Icon name="Headphones" size={24} className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold">24/7 поддержка</h4>
                <p className="text-sm text-muted-foreground">Круглосуточно</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Мы работаем без выходных и праздников
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Icon name="UserCheck" size={24} className="text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold">Профессионалы</h4>
                <p className="text-sm text-muted-foreground">Опытные агенты</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Наша команда знает ответы на все вопросы
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Популярные вопросы</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              'Как изменить дату перелёта?',
              'Какой багаж можно провозить?',
              'Как зарегистрироваться онлайн?',
              'Что делать при задержке рейса?',
              'Как получить возврат билета?',
              'Можно ли провозить животных?'
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-3"
                onClick={handleStartChat}
              >
                <Icon name="HelpCircle" size={16} className="mr-2 flex-shrink-0" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <div className="font-semibold">{operatorName}</div>
              <div className="text-sm text-green-500 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Онлайн
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleVideoCall}>
              <Icon name="Video" size={16} />
            </Button>
            <Button size="sm" variant="outline" onClick={handleEndChat}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
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
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Введите сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Icon name="Send" size={20} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Обычно отвечаем в течение 2 минут
        </p>
      </div>
    </Card>
  );
};

export default LiveConsultation;
