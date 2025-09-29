# {appendix-heading(Параметры сервиса)[id=xaas_vendor_saas_param; position=prefix]}

В JSON-файле задайте параметры сервиса, приведённые в {linkto(#tab_saas_param)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_saas_param]} — Параметры сервиса)[align=right;position=above;id=tab_saas_param;number={const(numb_tab_saas_param)}]}
[cols="2,4,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|id
|Идентификатор сервиса UUID4 (ID), сформированный с помощью генератора UUID4
|string (UUID4)
|Да

|revision
|Ревизия сервиса. Сочетание ревизии и ID сервиса определяет его уникальность в Marketplace. Остальные параметры описывают характеристики конкретной ревизии сервиса
|string, до 255 символов
|Да

|name
|Название сервиса
|string, до 255 символов
|Да

|short_description
|Краткое описание сервиса. Оно будет отображаться в карточке сервиса в Marketplace
|string, до 120 символов
|Да

|full_description
|Полное описание сервиса. Оно будет отображаться на странице сервиса (подробнее — в разделе {linkto(../../../../xaas_instructions/xaas_vendor_service_description#service_description_full)[text=%text]})
|string
|Да

|singleton
|Определяет, есть ли ограничение в один инстанс сервиса на один проект {var(sys2)}
|boolean
|Нет

|auto_bind
|Определяет, нужно ли после разворачивания сервиса автоматически создавать сервисную привязку
|boolean
|Нет

|icon
|URL иконки сервиса (подробнее — в разделе {linkto(../../../../xaas_instructions/xaas_vendor_service_description#service_description_icon)[text=%text]}).

Размер файла с иконкой не должен превышать 1 МБ. Размер изображения должен быть не менее 62 × 62 пикселя
|string, до 512 символов
|Да

|help
|URL документации сервиса
|string, до 512 символов
|Да

|bindable
|Определяет, можно ли создавать сервисные привязки для этого сервиса
|boolean
|Да

|plan_updateable
|Определяет, может ли пользователь переходить с одного тарифного плана на другой без удаления сервиса.

Значение параметра применяется для всех планов сервиса.

Значение можно переопределить для конкретного плана (подробнее в подразделе — {linkto(../../../../xaas_instructions/xaas_vendor_saas_add/xaas_vendor_saas_configure/xaas_vendor_saas_plan/xaas_vendor_saas_plan_param#xaas_vendor_saas_plan_param)[text=%text]})
|boolean
|Да

|deactivatable
|Определяет, можно ли временно приостановить использование сервиса
|boolean
|Да

|bindings_retrievable
|Определяет, нужно ли повторять попытку создания сервисной привязки в течение определенного времени, если предыдущая попытка не удалась
|boolean
|Да

|instances_retrievable
|Определяет, нужно ли повторять попытку создания инстанса сервиса в течение определенного времени, если предыдущая попытка не удалась
|boolean
|Да
|===
{/caption}

<err>

Сочетание ID и ревизии сервиса должно быть уникальным в рамках Marketplace. Если сервис с такими же идентификатором и ревизией уже существует в Marketplace, конфигурация сервиса не будет обновлена.

</err>