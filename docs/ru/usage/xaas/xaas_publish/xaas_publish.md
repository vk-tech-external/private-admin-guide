# {heading(Публикация сервиса в Marketplace)[id=xaas_publish]}

Сервис публикуется только после получения ID и ревизии сервиса от поставщика. Эти параметры необходимы для выполнения запроса к API.

Опубликованный сервис доступен пользователям, добавленным в соответствующие открытые пространства имён Marketplace.

<warn>

В открытом пространстве имён доступна только последняя опубликованная ревизия сервиса.

</warn>

## {heading(Публикация нового сервиса)[id=xaas_publish_first]}

Чтобы опубликовать новый сервис в Marketplace, выполните запрос с параметрами из {linkto(#tab_publishing_new_service)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_publishing_new_service]} — Параметры запроса на публикацию нового сервиса)[align=right;position=above;id=tab_publishing_new_service;number={const(numb_tab_publishing_new_service)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`PUT`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/<SERVICE_ID>/<SERVICE_REVISION>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<SERVICE_ID>` — ID сервиса в формате UUID4.
* `<SERVICE_REVISION>` — ревизия сервиса, которую нужно опубликовать.

Укажите значения ID и ревизии, полученные от поставщика

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметр `spaces` — список открытых пространств имён Marketplace, где будет опубликован сервис.

Чтобы опубликовать image-based приложение, укажите пустой список. Image-based приложение будет опубликовано в открытых пространствах имён, указанных в сервисном ключе этого приложения

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на публикацию нового сервиса)[align=left;position=above]}
```console
$ curl -v -X PUT https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/1bf367ba-586d-44e7-8767-88223a2601c7/v_1 \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "spaces": [
    "vkcs_ru",
    "vk_prod_ns"
  ]
}'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes11)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes11]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes11;number={const(numb_tab_http_response_codes11)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Сервис опубликован

|400, 422
|Ошибка выполнения запроса

|404
|Ревизия сервиса, указанная в пути запроса, не найдена
|===
{/caption}

## {heading(Публикация новой ревизии сервиса)[id=xaas_publish_first_service_audits]}

Чтобы опубликовать новую ревизию сервиса в Marketplace, выполните запрос с параметрами из {linkto(#tab_publishing_new_service_revision)[text=таблицы %number]}. Новая ревизия сервиса заменит текущую опубликованную, которая перейдёт в тестовое пространство имён.

{caption(Таблица {counter(table)[id=numb_tab_publishing_new_service_revision]} — Параметры запроса на публикацию новой ревизии сервиса)[align=right;position=above;id=tab_publishing_new_service_revision;number={const(numb_tab_publishing_new_service_revision)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`PUT`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/<SERVICE_ID>/<SERVICE_REVISION>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<SERVICE_ID>` — ID сервиса в формате UUID4.
* `<SERVICE_REVISION>` — ревизия сервиса, которую нужно опубликовать.

Укажите значения ID и ревизии, полученные от поставщика

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `previous_revision` — текущая опубликованная ревизия сервиса.
* `spaces` — список открытых пространств имён Marketplace, где будет опубликована новая ревизия сервиса.

   Чтобы опубликовать ревизию image-based приложения, укажите пустой список. Новая ревизия image-based приложения будет опубликована в открытых пространствах имён, указанных в сервисном ключе этого приложения

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на публикацию новой ревизии сервиса)[align=left;position=above]}
```console
$ curl -v -X PUT https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/1bf367ba-586d-44e7-8767-88223a2601c7/v_2 \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "previous_revision": "v_1",
  "spaces": [
    "vkcs_ru",
    "vk_prod_ns"
  ]
}'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes12)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes12]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes12;number={const(numb_tab_http_response_codes12)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Ревизия сервиса опубликована

|400, 422
|Ошибка выполнения запроса

|404
|Ревизия сервиса, указанная в пути запроса, не найдена
|===
{/caption}

## {heading(Перенос сервиса из открытого пространства имён Marketplace в тестовое)[id=xaas_publish_service_transfer]}

Чтобы перенести сервис из открытого пространства имён Marketplace в тестовое, выполните запрос с параметрами из {linkto(#tab_moving_service_from_open_namespace_to_test_one)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_moving_service_from_open_namespace_to_test_one]} — Параметры запроса на перенос сервиса из открытого пространства имён в тестовое)[align=right;position=above;id=tab_moving_service_from_open_namespace_to_test_one;number={const(numb_tab_moving_service_from_open_namespace_to_test_one)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/<SERVICE_ID>/<SERVICE_REVISION>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<SERVICE_ID>` — ID сервиса в формате UUID4.
* `<SERVICE_REVISION>` — опубликованная ревизия сервиса

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на перенос сервиса из открытого пространства имён в тестовое)[align=left;position=above]}
```console
$ curl -v -X DELETE https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/promotion/1bf367ba-586d-44e7-8767-88223a2601c7/v_2 \
-H 'Authorization: Bearer <JWT_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes13)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes13]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes13;number={const(numb_tab_http_response_codes13)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Сервис перенесён из открытого пространства в тестовое, указанное при регистрации брокера в Marketplace (подробнее — в разделе {linkto(../../../usage/xaas/xaas_broker#xaas_broker_register)[text=%text]})

|404
|Ревизия сервиса, указанная в пути запроса, не найдена

|422
|Ошибка выполнения запроса
|===
{/caption}