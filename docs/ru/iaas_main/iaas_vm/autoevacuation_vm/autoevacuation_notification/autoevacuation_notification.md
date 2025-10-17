# {heading(Настройка уведомлений о событиях автоэвакуации ВМ в Портале мониторинга (Zabbix))[id=autoevacuation_notification]}

Чтобы получить список событий автоэвакуации в Портале мониторинга (Zabbix):

1. Войдите в Портал мониторинга (Zabbix) с учетными данными администратора {var(sys2)}.
1. Перейдите в раздел **Monitoring** → **Problems**.
1. В поле **Tag** установите переключатель **And/or**.
1. Установите следующие параметры для фильтра: `app`, `Equals`, `Evacuation Controller`.
1. Нажмите кнопку **Apply**.

Список событий приведен в таблице {linkto(#tab_notification)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_notification]} — Список событий автоэвакуации)[align=right;position=above;id=tab_notification;number={const(numb_tab_notification)}]}
[cols="2,5", options="header"]
|===
|Название события
|Описание

|DROP_ALL_TASKS
|Инициировано удаление всех заданий

|DROP_ALL_FENCING_RECORDS
|Инициировано удаление всех записей о фенсинге

|MANUAL_EVACUATE
|Инициирована эвакуация ВУ

|MANUAL_RESTORE
|Инициировано восстановление ВУ
    
|NO_RESPONSE_FROM_STATUS_API
|Ошибка получения ответа от Observer (Node Status API)

|GOT_RESPONSE_FROM_NODE_STATUS_API
|Получен ответ от Observer (Node Status API)

|RESTORED_HOSTS
|Восстановлены следующие ВУ

|MASS_SHUTDOWN
|Обнаружен массовый отказ ВУ 

|MADE_DECISION
|Принято решение эвакуировать перечисленные ВУ

|TOO_MANY_DOWN
|Слишком много ВУ недоступно

|TOO_MANY_DOWN_WITH_EMPTY
|Слишком много ВУ без нагрузки недоступно

|TOO_MANY_DOWN_WITH_EXCLUSION
|Слишком много ВУ недоступно. Автоматическая миграция некоторых ВМ невозможна

|HYPERVISORS_DOWN_WITH_EMPTY
|ВУ без нагрузки недоступны

|HYPERVISORS_DOWN
|ВУ недоступны

|HYPERVISORS_DOWN_WITH_SPECIAL
|Недоступны ВУ с различной степенью нагрузки

|EVACUATION_STUCK
|Эвакуация ВМ происходит дольше обычного

|EVACUATION_OF_VM_FAILED
|Эвакуация ВМ завершилась неудачей

|FAILED_TO_GET_MIGRATION
|Не удалось запустить эвакуацию ВМ

|EVACUATION_IS_IN_PROGRESS
|Происходит эвакуация

|EVACUATION_TOOK_TOO_LONG
|Эвакуация прервана по таймауту

|NO_FENCE_RECORD
|Отсутствует запись о фенсинге ВУ

|INSPECT_FAILED
|Проверка ВУ завершилась ошибкой

|SWITCHING_POWER_ON
|Произошло включение питания ВУ
    
|POWER_ON_SUCCESS
|Питание ВУ включено успешно

|POWER_ON_FAILURE
|Включение питания ВУ завершилось неудачей

|RESTORE_FAILED
|Восстановление ВУ завершилось неудачей

|EVACUATE_FAILED
|Эвакуация ВУ завершилась неудачей

|SWITCHING_POWER_OFF
|Произошло выключение питания ВУ

|POWER_OFF_SUCCESS
|Питание ВУ выключено успешно

|POWER_OFF_FAILURE
|Ошибка при попытке отключения гипервизора по IPMI в процессе автоэвакуации

|SWITCHING_NETWORK_OFF
|Выключение питания ВУ завершилось неудачей

|NOVA_DISABLE_FAILED
|Не удалось отключить ВУ от сервиса Nova

|NOVA_FORCE_DOWN_FAILED
|Не удалось пометить ВУ как принудительно остановленный в сервисе Nova

|HYPERVISOR_FAIL
|Не удалось получить статус ВУ в сервисе Nova

|FAILED_TO_GET_AGGREGATES
|Не удалось получить список агрегатов в сервисе Nova

|FAILED_TO_GET_VOLUME_TYPES
|Не удалось получить типы дисков в сервисе Cinder

|FAILED_TO_GET_VOLUMES
|Не удалось получить диски в сервисе Cinder

|DIFFERENT_HOST
|Не удалось эвакуировать ВМ с ВУ, так как она уже находится на другом ВУ

|FAILED_TO_START_EVACUATION
|Не удалось произвести эвакуацию ВМ с ВУ

|FAILED_TO_RETRY_EVACUATION
|Не удалось произвести повторную эвакуацию ВМ с ВУ

|FAILED_TO_GET_MIGRATION
|Не удалось начать миграцию ВМ

|COULD_NOT_GET_MIGRATION
|Не удалось завершить миграцию ВМ

|READY_TO_EVACUATE
|Готовность начать миграцию ВУ

|CONCLUSION
|Окончена эвакуация, перечислены обработанные ВМ и затронутые проекты

|===
{/caption}

## Настройка веса уведомлений о событиях автоэвакуации

Чтобы изменить вес оповещения, в конфигурационном файле {var(sys2)} `inventory/vkcloud/group_vars/vkcloud_kube/evacuation_controlleryml` приведите значение переменной `helm_evacuation_controller_OS_EVENTS__HANDLER_ZABBIX_LEVELS` к следующему виду:

```console
helm_evacuation_controller_OS_EVENTS__HANDLER_ZABBIX_LEVELS: ' {"ERROR": ["event1", "event2"]} '
```
Здесь `<EVENT_WEIGHT>` — вес события. Доступные значения: `ERROR`, `WARNING`, `INFO`.

<warn>

В начале и в конце строки-значения необходимо поставить пробелы. При изменении этой строки не убирайте их.

</warn>


{caption(Пример переменной)[align=left;position=above]}
```console
helm_evacuation_controller_OS_EVENTS__HANDLER_ZABBIX_LEVELS: ' {"WARNING":["EVACUATE_FAILED"], "ERROR":["ANOMALY", "MADE_DECISION"]} '
```
{/caption}





