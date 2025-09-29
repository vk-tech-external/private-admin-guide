# {heading(Отчёт о статистике потребления сервисов)[id=xaas_report]}

Отчёт о статистике потребления сервисов содержит транзакции по инстансам сервисов.

<warn>

Отчёт за текущий месяц формируется 1 числа следующего месяца.

</warn>

Чтобы получить отчёт о статистике потребления сервисов, выполните запрос с параметрами из {linkto(#tab_getting_report)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_getting_report]} — Параметры запроса на получение отчёта)[align=right;position=above;id=tab_getting_report;number={const(numb_tab_getting_report)}]}
[cols="2,5,2", options="header"]
|===
|Параметр
|Значение
|Обязательный

|Метод запроса
|`GET`
| ![](../../../assets/check.svg "inline")

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/gg/api/v1/reports/usage`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}
| ![](../../../assets/check.svg "inline")

|`date_start`
|Задаётся в пути запроса.

Определяет дату начала периода, за который будет сформирован отчёт. Укажите месяц и год. Например, `10.2023`
| ![](../../../assets/check.svg "inline")

|`date_end`
|Задаётся в пути запроса.

Определяет дату окончания периода, за который будет сформирован отчёт. Укажите месяц и год. Например, `11.2023`
| ![](../../../assets/check.svg "inline")

|`instance_type`
|Задаётся в пути запроса.

Определяет сервис, по которому будет сформирован отчёт. Укажите значение параметра `slug` из ответа на {linkto(../../../usage/xaas/xaas_service#xaas_service_configuration)[text=запрос конфигурации сервиса]} (по ID и ревизии сервиса).

<info>

Чтобы получить отчёт по всем сервисам Marketplace, в пути запроса не указывайте параметр `instance_type`.

</info>
| ![](../../../assets/no.svg "inline")

|`Authorization`
|`<TARIFFICATOR_SERVICE_TOKEN>` — токен доступа к сервису Tarifficator.

Соответствует значению переменной окружения `GLOMGOLD_COMMON__SERVICETOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `glomgold-common&#8212;&#8203;servicetoken` из плейбука `helm-xaas`
| ![](../../../assets/check.svg "inline")
|===
{/caption}

Чтобы отчёт был сохранён локально в CSV-файл, в запросе укажите команду `-o report.csv`.

{caption(Пример запроса на получение отчёта по всем сервисам Marketplace)[align=left;position=above]}
```console
$ curl -v 'https://<CLOUD_HOST>/marketplace/api/gg/api/v1/reports/usage?date_start=10.2023&amp;date_end=11.2023' \
-H 'Authorization: Bearer <TARIFFICATOR_SERVICE_TOKEN>' \
-o report.csv
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes14)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes14]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes14;number={const(numb_tab_http_response_codes14)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК

|400
|Некорректный запрос

|401
|Ошибка аутентификации

|404
|Объект не найден

|500
|Внутренняя ошибка сервера
|===
{/caption}