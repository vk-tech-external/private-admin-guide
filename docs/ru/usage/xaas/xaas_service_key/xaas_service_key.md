# {heading(Управление сервисным ключом image-based приложения)[id=xaas_service_key]}

## {heading(Создание сервисного ключа)[id=xaas_service_key_create]}

Чтобы создать сервисный ключ, выполните запрос с параметрами из {linkto(#tab_service_key_creation)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_service_key_creation]} — Параметры запроса на создание сервисного ключа)[align=right;position=above;id=tab_service_key_creation;number={const(numb_tab_service_key_creation)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `service` — имя сервиса.
* `ns` — имя тенанта image-based брокера. Укажите имя компании-поставщика.
* `test_ns` — список тестовых пространств имён Marketplace, в которых будет доступен сервис. Имена задаются администратором, должны совпадать со значениями, задаваемыми при регистрации тенанта image-based брокера (подробнее — {linkto(../../../usage/xaas/xaas_broker#xaas_broker_register)[text=%text]}).
* `prod_ns` — список открытых пространств имён Marketplace, в которых будет доступен сервис. Имена задаются администратором, должны совпадать со значениями, задаваемыми при регистрации тенанта image-based брокера (подробнее — {linkto(../../../usage/xaas/xaas_broker#xaas_broker_register)[text=%text]}).
* `token` — сервисный ключ. Значение задаётся администратором.
* `org_id` — идентификатор компании-поставщика. Укажите имя компании-поставщика.
* `email` — email пользователя, который назначается владельцем сервисного ключа. Укажите значение, полученное от поставщика

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на создание сервисного ключа)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/ \
-H "Content-Type: application/json" \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>' \
--data '{
  "service": "vk_testers",
  "ns": "vk",
  "test_ns": ["vk_test_ns"],
  "prod_ns": ["vkcs_ru", "vk_prod_ns"],
  "token": "3a472276-2f52-44ea-bdcd-b34d5e3856fb",
  "org_id": "vk",
  "email": "owner@example.ru"
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes2)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes2]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes2;number={const(numb_tab_http_response_codes2)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Сервисный ключ создан

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

## {heading(Обновление сервисного ключа)[id=xaas_service_key_update]}

В сервисном ключе можно обновить следующие параметры:

* Список тестовых пространств имён Marketplace.
* Список открытых пространств имён Marketplace.
* Значение сервисного ключа, если его срок действия закончился. По умолчанию срок действия — 1 год.

Чтобы обновить сервисный ключ, выполните запрос с параметрами из {linkto(#tab_service_key_update)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_service_key_update]} — Параметры запроса на обновление сервисного ключа)[align=right;position=above;id=tab_service_key_update;number={const(numb_tab_service_key_update)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`PATCH`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|
1. Укажите обязательные параметры:

   * `service` — имя сервиса.
   * `org_id` — идентификатор компании-поставщика.
   * `email` — email пользователя-владельца сервисного ключа.

      Обязательные параметры были заданы при регистрации сервисного ключа. Значения получите с помощью запроса списка сервисных ключей (подробнее — в разделе {linkto(#xaas_service_key_list)[text=%text]}).

1. Укажите один или несколько параметров, которые нужно изменить:

   * `test_ns` — список тестовых пространств имён Marketplace, в которых будет доступен сервис.
   * `prod_ns` — список открытых пространств имён Marketplace, в которых будет доступен сервис.
   * `token` — новое значение сервисного ключа. Срок действия сервисного ключа будет отсчитываться заново с момента выполнения запроса

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на обновление сервисного ключа)[align=left;position=above]}
```console
$ curl -v -X PATCH https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/ \
-H "Content-Type: application/json" \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>' \
--data '{
  "service": "vk_testers",
  "org_id": "vk",
  "email": "owner@example.ru",
  "token": "9130d903-16fa-46e7-80a0-48661e1add6a"
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes3)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes3]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes3;number={const(numb_tab_http_response_codes3)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Сервисный ключ обновлён

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

## {heading(Удаление сервисного ключа)[id=xaas_service_key_delete]}

Чтобы удалить сервисный ключ, выполните запрос с параметрами из {linkto(#tab_deleting_service_key)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_deleting_service_key]} — Параметры запроса на удаление сервисного ключа)[align=right;position=above;id=tab_deleting_service_key;number={const(numb_tab_deleting_service_key)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/<SERVICE_NAME>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<SERVICE_NAME>` — имя сервиса, заданное в параметре `service` при создании сервисного ключа. Значение получите с помощью запроса списка сервисных ключей (подробнее — в разделе {linkto(#xaas_service_key_list)[text=%text]})

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на удаление сервисного ключа)[align=left;position=above]}
```console
$ curl -v -X DELETE https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/vk_testers \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes4)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes4]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes4;number={const(numb_tab_http_response_codes4)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Сервисный ключ удалён

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации

|404
|Сервисный ключ не найден
|===
{/caption}

## {heading(Просмотр списка сервисных ключей)[id=xaas_service_key_list]}

Чтобы просмотреть список сервисных ключей, выполните запрос с параметрами из {linkto(#tab_view_list_service_keys)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_view_list_service_keys]} — Параметры запроса на просмотр списка сервисных ключей)[align=right;position=above;id=tab_view_list_service_keys;number={const(numb_tab_view_list_service_keys)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на просмотр списка сервисных ключей)[align=left;position=above]}
```console
$ curl https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/tokens/ \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes5)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes5]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes5;number={const(numb_tab_http_response_codes5)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

Ответ содержит список сервисных ключей. Для каждого отображаются следующие параметры:

* Параметры, заданные в теле запроса на создание (подробнее — в разделе {linkto(#xaas_service_key_create)[text=%text]}).
* `create_at` — дата и время создания.
* `update_at` — дата и время обновления.
* `role` — роль пользователя-владельца сервисного ключа.
* `expired` — срок действия

|401
|Ошибка авторизации

|500
|Ошибка выполнения запроса
|===
{/caption}

{caption(Пример ответа)[align=left;position=above]}
```console
[
    {
        "service": "vk_testers",
        "token": "9130d903-16fa-46e7-80a0-48661e1add6a",
        "update_at": "2023-10-05T09:25:21.506505Z",
        "create_at": "2023-10-05T09:25:21.506505Z",
        "ns": "vk",
        "org_id": "vk",
        "test_ns": ["vk_test_ns"],
        "prod_ns": ["vkcs_ru"],
        "role": "provider",
        "expired": "2024-11-01T03:37:53.211104Z",
        "email": "owner@example.ru"
    }
]
```
{/caption}