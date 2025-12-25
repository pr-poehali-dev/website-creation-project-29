import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      toast.success('Вы успешно подписались на рассылку!');
      setEmail('');
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Icon name="Mail" size={48} className="mx-auto text-primary" />
        <div>
          <h3 className="text-2xl font-bold mb-2">Подпишитесь на новости</h3>
          <p className="text-muted-foreground">
            Получайте информацию о спецпредложениях, новых направлениях и акциях
          </p>
        </div>
        <div className="flex gap-2 max-w-md mx-auto">
          <Input 
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
          />
          <Button onClick={handleSubscribe}>Подписаться</Button>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-green-500" />
            <span>Эксклюзивные скидки</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-green-500" />
            <span>Первыми узнавайте о новостях</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsletterSubscription;
