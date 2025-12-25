import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const RefundPolicy = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Условия возврата билетов</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Возвратный тариф</h4>
              <p className="text-sm mb-3">Полный возврат при отмене за 24+ часа</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Возврат 100% стоимости</div>
                <div>• Бесплатная отмена</div>
                <div>• Возврат за 3-5 дней</div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-300">Частично возвратный</h4>
              <p className="text-sm mb-3">Возврат с комиссией</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Возврат 70% стоимости</div>
                <div>• Комиссия 30%</div>
                <div>• До вылета</div>
              </div>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Невозвратный тариф</h4>
              <p className="text-sm mb-3">Возврат только налогов и сборов</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Возврат только сборов</div>
                <div>• ~5-10% стоимости</div>
                <div>• Самый дешёвый</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="RefreshCcw" size={20} className="text-primary" />
            Как вернуть билет
          </h3>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">1</span>
              <span>Войдите в личный кабинет</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">2</span>
              <span>Найдите бронирование</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">3</span>
              <span>Нажмите "Вернуть билет"</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">4</span>
              <span>Подтвердите возврат</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">5</span>
              <span>Деньги вернутся на карту через 3-10 дней</span>
            </li>
          </ol>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} className="text-yellow-500" />
            Особые случаи
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold mb-1">Отмена рейса авиакомпанией</div>
              <p className="text-muted-foreground">Полный возврат без комиссии или бесплатная пересадка на другой рейс</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Задержка более 3 часов</div>
              <p className="text-muted-foreground">Право на компенсацию + возврат или пересадку</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Болезнь пассажира</div>
              <p className="text-muted-foreground">Возврат при предоставлении медицинской справки</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Смерть близкого родственника</div>
              <p className="text-muted-foreground">Полный возврат при предоставлении документов</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-blue-50 dark:bg-blue-950">
        <div className="flex items-start gap-4">
          <Icon name="Info" size={32} className="text-blue-500 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-2">Важная информация</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Возврат оформляется на карту, с которой была оплата</li>
              <li>• Срок возврата: 3-10 рабочих дней (зависит от банка)</li>
              <li>• При групповом бронировании возврат каждого билета отдельно</li>
              <li>• Для консультации звоните +7 (495) 123-45-67</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RefundPolicy;
