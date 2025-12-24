import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

const AuthDialog = ({ open, onClose, onSuccess }: AuthDialogProps) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentCode, setSentCode] = useState<string>('');

  const handleSendCode = async () => {
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    setIsLoading(true);

    try {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(generatedCode);

      const message = `Ваш код для входа в Leviks Air: ${generatedCode}`;
      const apiKey = 'E0D63E0A-CE49-74CF-51B0-08C6D9ECC2EA';

      const params = new URLSearchParams({
        api_id: apiKey,
        to: phoneClean,
        msg: message,
        json: '1'
      });

      const response = await fetch(`https://sms.ru/sms/send?${params.toString()}`, {
        method: 'GET'
      });

      const result = await response.json();

      if (result.status === 'OK') {
        setIsLoading(false);
        setStep('code');
        toast.success('Код отправлен на ваш номер телефона!');
      } else {
        setIsLoading(false);
        toast.error(`Ошибка отправки: ${result.status_text || 'Неизвестная ошибка'}`);
        console.log('Тестовый код:', generatedCode);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Не удалось отправить SMS. Попробуйте позже');
      console.error('SMS Error:', error);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      toast.error('Введите полный код из SMS');
      return;
    }

    setIsLoading(true);

    if (code === sentCode) {
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Вы успешно вошли!');
        onSuccess(phone);
        onClose();
        setStep('phone');
        setPhone('');
        setCode('');
        setSentCode('');
      }, 500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.error('Неверный код. Попробуйте снова');
      }, 500);
    }
  };

  const handleBack = () => {
    setStep('phone');
    setCode('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Smartphone" className="text-primary" />
            {step === 'phone' ? 'Вход через SMS' : 'Введите код'}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone'
              ? 'Введите номер телефона для получения кода'
              : `Код отправлен на номер ${phone}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'phone' ? (
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <div className="relative">
                <Icon
                  name="Phone"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (900) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Label>Код из SMS</Label>
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-full"
                disabled={isLoading}
              >
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Изменить номер
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {step === 'phone' ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Отмена
              </Button>
              <Button
                onClick={handleSendCode}
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                    Отправка...
                  </>
                ) : (
                  <>
                    Получить код
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleVerifyCode}
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                  Проверка...
                </>
              ) : (
                <>
                  Войти
                  <Icon name="LogIn" className="ml-2" size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;