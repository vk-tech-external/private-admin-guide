# {appendix-heading(Секция billing)[id=xaas_vendor_iboption_billing; position=prefix]}

Платными тарифными опциями могут быть опции следующих типов:

* Числовой (`integer` с шагом изменения).
* Логический (`boolean`).

<warn>

Для платных тарифных опций поддерживается только предоплатный способ списания денежных средств (подробнее — в подразделе {linkto(../../../../../xaas_instructions/xaas_vendor_index#xaas_billing)[text=%text]}).

</warn>

В зависимости от типа тарифной опции в секции `billing` задайте параметры и дочерние секции, приведённые в {linkto(#tab_billing_integer)[text=таблице %number]}, {linkto(#tab_billing_boolean)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_billing_integer]} — Параметры секции billing для опции типа integer с шагом изменения)[align=right;position=above;id=tab_billing_integer;number={const(numb_tab_billing_integer)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|base
|Определяет стандартное значение тарифной опции, входящее в стоимость тарифного плана.

Стандартное значение — это минимальное значение, которое может задать пользователь.

Если параметр не задан, стандартное значение тарифной опции автоматически будет равно `0`

|integer
|Нет

|cost
|Определяет стоимость шага, на который можно изменить значение тарифной опции.

Если изменение опции бесплатно, укажите значение `0`. Параметры шага определяются в секции `unit`

|float64, >= 0
|Да

|unit
|Определяет параметры шага изменения опции
|—
|Да

4+|**Параметры секции `unit`**

|unit.size
|Определяет размер шага, на который можно изменить значение тарифной опции.

Значение, указанное в этом параметре, тарифицируется в соответствии со стоимостью, заданной в параметре `billig.cost`
|integer, > 0
|Да

|unit.measurement
|Определяет единицы измерения шага, заданного в параметре `unit.size`
|string, до 255 символов
|Нет
|===
{/caption}

{caption(Таблица {counter(table)[id=numb_tab_billing_boolean]} — Параметры секции billing для опции-переключателя boolean)[align=right;position=above;id=tab_billing_boolean;number={const(numb_tab_billing_boolean)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|cost
|Определяет стоимость опции
|float64, >= 0
|Да
|===
{/caption}