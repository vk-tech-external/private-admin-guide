# {appendix-heading(Регистрация брокера)[id=xaas_vendor_saas_upload_registration; position=prefix]}

Чтобы зарегистрировать брокер, сообщите администратору {var(sys2)}:

* Информацию о компании:

   * Название компании.
   * Контактное лицо.
   * Телефон.

* Параметры брокера, приведённые в {linkto(#tab_saas_upload_registration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_saas_upload_registration]} — Параметры брокера для регистрации в Marketplace)[align=right;position=above;id=tab_saas_upload_registration;number={const(numb_tab_saas_upload_registration)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|name
|Имя брокера
|string
|Да

|url
|URL, на который будут отправляться запросы от Marketplace
|string
|Да

|description
|Описание брокера
|string
|Нет

|osb_version
|Версия протокола VK OSB
|string
|Да

|username
|Имя Marketplace для межсервисного взаимодействия c брокером.

Должно совпадать со значением переменной окружения в файле `.env`
|string
|Нет

|password
|Пароль Marketplace для межсервисного взаимодействия с брокером.

Должно совпадать со значением переменной окружения в файле `.env`
|string
|Нет
|===
{/caption}

После регистрации брокера SaaS-приложение будет доступно в тестовом пространстве имён Marketplace. В открытом пространстве имён Marketplace сервис будет доступен только после публикации (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_saas_add/xaas_vendor_saas_upload/xaas_vendor_saas_upload_publish#xaas_vendor_saas_upload_publish)[text=%text]}).