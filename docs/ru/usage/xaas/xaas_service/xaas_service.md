# {heading(Управление сервисами Marketplace)[id=xaas_service]}

## {heading(Просмотр конфигурации сервиса)[id=xaas_service_configuration]}

### {heading(По ID и ревизии сервиса)[id=xaas_service_configuration_id]}

Чтобы просмотреть конфигурацию сервиса по его ID и ревизии, выполните запрос с параметрами из {linkto(#tab_viewing_service_configuration_ID_and_revision)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_viewing_service_configuration_ID_and_revision]} — Параметры запроса на просмотр конфигурации сервиса по ID и ревизии)[align=right;position=above;id=tab_viewing_service_configuration_ID_and_revision;number={const(numb_tab_viewing_service_configuration_ID_and_revision)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/service/<SERVICE_ID>/revision/<SERVICE_REVISION>`

Здесь:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<SERVICE_ID>` — ID сервиса в формате UUID4.
* `<SERVICE_REVISION>` — ревизия сервиса

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на просмотр конфигурации сервиса по ID и ревизии)[align=left;position=above]}
```console
$ curl https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/service/1bf367ba-586d-44e7-8767-88223a2601c7/revision/v_1 \
-H 'Authorization: Bearer <JWT_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes15)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes15]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes15;number={const(numb_tab_http_response_codes15)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК.

Ответ содержит:

* Конфигурацию сервиса.
* Параметр `slug`. Используется в запросе, чтобы посмотреть отчет о статистике потребления сервиса (подробнее — в разделе {linkto(../../../usage/xaas/xaas_report#xaas_report)[text=%text]})

|422
|Некорректный запрос

|404
|Объект не найден
|===
{/caption}

### {heading(По ID брокера)[id=xaas_service_configuration_id_broker]}

Чтобы просмотреть конфигурацию сервиса по ID брокера (SaaS-брокера или тенанта image-based брокера), выполните запрос с параметрами из {linkto(#tab_viewing_service_configuration_broker_ID)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_viewing_service_configuration_broker_ID]} — Параметры запроса на просмотр конфигурации сервиса по ID брокера)[align=right;position=above;id=tab_viewing_service_configuration_broker_ID;number={const(numb_tab_viewing_service_configuration_broker_ID)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`broker_id`
|Задается в пути запроса.

Определяет ID брокера в Marketplace (SaaS-брокера или тенанта image-based брокера).

ID брокеров Marketplace отображаются в ответе на запрос списка зарегистрированных брокеров (подробнее — в разделе {linkto(../../../usage/xaas/xaas_broker#xaas_broker_list)[text=%text]})

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на просмотр конфигурации сервиса по ID брокера)[align=left;position=above]}
```console
$ curl 'https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog?broker_id=7' \
-H 'Authorization: Bearer <JWT_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes16)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes16]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes16;number={const(numb_tab_http_response_codes16)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК.

Ответ содержит конфигурации сервисов указанного брокера (SaaS-брокера или тенанта image-based брокера)

|404
|Объект не найден

|422
|Некорректный запрос
|===
{/caption}

## {heading(Просмотр списка сервисов Marketplace)[id=xaas_service_list_services]}

Чтобы просмотреть список сервисов Marketplace, выполните запрос с параметрами из {linkto(#tab_view_list_Marketplace_services)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_view_list_Marketplace_services]} — Параметры запроса на просмотр списка сервисов Marketplace)[align=right;position=above;id=tab_view_list_Marketplace_services;number={const(numb_tab_view_list_Marketplace_services)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на просмотр списка сервисов Marketplace)[align=left;position=above]}
```console
$ curl https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog \
-H 'Authorization: Bearer <JWT_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes17)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes17]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes17;number={const(numb_tab_http_response_codes17)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК.

Ответ содержит все сервисы, добавленные в Marketplace, и их конфигурации

|422
|Некорректный запрос
|===
{/caption}