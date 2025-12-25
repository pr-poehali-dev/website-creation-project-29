import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const SocialShare = () => {
  const shareUrl = window.location.href;
  const shareText = 'Leviks Air - инновационная авиакомпания будущего! 🎄✈️';

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'vk':
        url = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Ссылка скопирована в буфер обмена!');
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast.success('Открыто окно для публикации');
    }
  };

  const socialLinks = [
    { platform: 'vk', icon: 'Share2', color: 'bg-blue-600 hover:bg-blue-700', label: 'ВКонтакте' },
    { platform: 'telegram', icon: 'Send', color: 'bg-sky-500 hover:bg-sky-600', label: 'Telegram' },
    { platform: 'whatsapp', icon: 'MessageCircle', color: 'bg-green-600 hover:bg-green-700', label: 'WhatsApp' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto border-primary/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Icon name="Share2" className="mx-auto mb-4 text-primary" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Поделитесь с друзьями
              </h2>
              <p className="text-muted-foreground text-lg">
                Расскажите о Leviks Air в социальных сетях
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {socialLinks.map((social) => (
                <button
                  key={social.platform}
                  onClick={() => handleShare(social.platform)}
                  className={`${social.color} text-white rounded-xl p-6 transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-3`}
                >
                  <Icon name={social.icon as any} size={32} />
                  <span className="font-semibold text-lg">{social.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleShare('copy')}
              className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 transition-all hover:shadow-md flex items-center justify-center gap-3 text-foreground"
            >
              <Icon name="Copy" size={20} />
              <span className="font-medium">Скопировать ссылку</span>
            </button>

            <div className="mt-8 pt-8 border-t">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Следите за новостями в наших социальных сетях:
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://vk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon name="Share2" size={20} />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon name="Send" size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon name="Play" size={20} />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialShare;
