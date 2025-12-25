import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const BaggageInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Briefcase" size={24} className="text-primary" />
            Ручная кладь
          </h3>
          <div className="space-y-4">
            <div>
              <div className="font-semibold mb-2">Размеры и вес:</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Максимальные размеры: 55 × 40 × 20 см</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Максимальный вес: 10 кг</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                  <span>Дополнительно: сумочка или рюкзак (до 5 кг)</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="font-semibold mb-2">Разрешённые предметы:</div>
              <div className="flex flex-wrap gap-2">
                {['Ноутбук', 'Планшет', 'Телефон', 'Книги', 'Лекарства'].map(item => (
                  <span key={item} className="text-xs px-3 py-1.5 bg-muted rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Luggage" size={24} className="text-primary" />
            Регистрируемый багаж
          </h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Эконом класс</div>
                <div className="text-sm text-muted-foreground">1 место, до 23 кг</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Бизнес класс</div>
                <div className="text-sm text-muted-foreground">2 места, до 32 кг каждое</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Первый класс</div>
                <div className="text-sm text-muted-foreground">3 места, до 32 кг каждое</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Запрещённые предметы</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="XCircle" size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Легковоспламеняющиеся вещества</div>
                <div className="text-sm text-muted-foreground">Бензин, газовые баллоны, спички</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="XCircle" size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Острые предметы</div>
                <div className="text-sm text-muted-foreground">Ножи, ножницы (более 6 см)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="XCircle" size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Взрывчатые вещества</div>
                <div className="text-sm text-muted-foreground">Фейерверки, петарды</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-yellow-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Жидкости</div>
                <div className="text-sm text-muted-foreground">В ручной клади: до 100 мл в прозрачном пакете</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-yellow-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Литиевые батареи</div>
                <div className="text-sm text-muted-foreground">Только в ручной клади, до 100 Вт⋅ч</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-yellow-500 flex-shrink-0" />
              <div>
                <div className="font-medium">Животные</div>
                <div className="text-sm text-muted-foreground">Требуется предварительное согласование</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Полезные советы</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Tag" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium mb-1">Маркировка</div>
              <div className="text-sm text-muted-foreground">Прикрепите бирку с контактами к каждому месту</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Lock" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium mb-1">Безопасность</div>
              <div className="text-sm text-muted-foreground">Используйте TSA-замки для чемоданов</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <div className="font-medium mb-1">Упаковка</div>
              <div className="text-sm text-muted-foreground">Хрупкие вещи оборачивайте одеждой</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BaggageInfo;
