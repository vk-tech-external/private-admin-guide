# {appendix-heading(Структура)[id=xaas_vendor_iboption_structure; position=prefix]}

Тарифная опция описывается параметрами и секциями, приведёнными в {linkto(#tab_top_level_options)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_top_level_options]} — Параметры и секции для описания тарифной опции)[align=right;position=above;id=tab_top_level_options;number={const(numb_tab_top_level_options)}]}
[cols="2,5,2", options="header"]
|===
|Имя
|Описание
|Обязательный

|actions
|Параметр, определяющий действия, при которых тарифная опция будет активна. Возможные значения параметра:

* `create` — опция активна при подключении сервиса.
* `update` — опция активна при обновлении тарифного плана сервиса.

Если действие указано, тарифная опция будет отображаться пользователю в активном виде.

Если действие не указано — в неактивном виде. В неактивном виде пользователь не сможет изменить значение тарифной опции
|Да

|schema
|Секция определяет:

* Тип тарифной опции.
* Имя и описание тарифной опции ({linkto(#pic_xaas_option_shema)[text=рисунок %number]}).
* Настройки значения тарифной опции.

Параметры секции приведены в подразделе {linkto(../../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption/xaas_vendor_iboption_schema#xaas_vendor_iboption_schema)[text=%text]}
|Да

|billing
|Секция определяет:

* Стоимость тарифной опции.
* Пользовательский шаг изменения для тарифной опции типа `integer`.

Параметры секции приведены в подразделе {linkto(../../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption/xaas_vendor_iboption_billing#xaas_vendor_iboption_billing)[text=%text]}
|Нет
|===
{/caption}

{caption(Рисунок {counter(pic)[id=numb_pic_xaas_option_shema]} — Тарифная опция)[align=center;position=under;id=pic_xaas_option_shema;number={const(numb_pic_xaas_option_shema)}]}
![Тарифная опция](./assets/xaas_option_shema.png){params[width=50%]}
{/caption}

Примеры описания разных типов тарифных опций приведены в подразделе {linkto(../../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption_fill_in#xaas_vendor_iboption_fill_in)[text=%text]}.