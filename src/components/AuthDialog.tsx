import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

const AuthDialog = ({ open, onClose, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'LeviksAirBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    (window as any).onTelegramAuth = (user: any) => {
      const username = user.username || user.first_name || `User${user.id}`;
      toast.success(`Добро пожаловать, ${username}!`);
      onSuccess(username);
      onClose();
    };

    return () => {
      delete (window as any).onTelegramAuth;
    };
  }, [open, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.122.1.155.234.171.329.016.095.036.314.02.485z"/>
            </svg>
            Вход через Telegram
          </DialogTitle>
          <DialogDescription>
            Войдите с помощью вашего Telegram аккаунта
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center text-sm text-muted-foreground max-w-sm">
              Нажмите кнопку ниже, чтобы войти через Telegram. 
              Это быстро, безопасно и не требует регистрации! 🎄
            </div>
            
            <div id="telegram-login-container" className="flex justify-center min-h-[46px]"></div>
            
            <div className="text-xs text-muted-foreground text-center">
              <p>Войдя через Telegram, вы соглашаетесь с</p>
              <p className="text-primary">политикой конфиденциальности Leviks Air</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;