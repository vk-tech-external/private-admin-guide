# {heading(Управление пространствами имён Marketplace)[id=xaas_space]}

## {heading(Создание тестового пространства имён)[id=xaas_test_space_create]}

Чтобы в Marketplace создать тестовое пространство имён, выполните запрос с параметрами из {linkto(#tab_create_test_namespace)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_create_test_namespace]} — Параметры запроса на создание тестового пространства имён)[align=right;position=above;id=tab_create_test_namespace;number={const(numb_tab_create_test_namespace)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `name` — название тестового пространства имён.
* `type` — тип пространства. Укажите `test_ns`

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на создание тестового пространства имён)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "name": "vk_test_ns",
  "type": "test_ns"
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes18)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes18]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes18;number={const(numb_tab_http_response_codes18)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Тестовое пространство имён создано

|404, 422
|Ошибка выполнения запроса
|===
{/caption}

## {heading(Создание открытого пространства имён)[id=xaas_prod_space_create]}

Чтобы в Marketplace создать открытое пространство имён, выполните запрос с параметрами из {linkto(#tab_creating_open_namespace)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_creating_open_namespace]} — Параметры запроса на создание открытого пространства имён)[align=right;position=above;id=tab_creating_open_namespace;number={const(numb_tab_creating_open_namespace)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `name` — название открытого пространства имён.
* `type` — тип пространства. Укажите `prod_ns`

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на создание открытого пространства имён)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "name": "vkcs_ru",
  "type": "prod_ns"
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes19)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes19]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes19;number={const(numb_tab_http_response_codes19)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Открытое пространство имён создано

|404, 422
|Ошибка выполнения запроса
|===
{/caption}

## {heading(Добавление пользователя {var(sys2)} в тестовые и открытые пространства имён)[id=xaas_space_add_user]}

Пользователь, добавленный в тестовое пространство имён, сможет тестировать сервис в Marketplace до его публикации.

Чтобы добавить пользователя {var(sys2)} в тестовое или открытое пространство имён Marketplace, выполните запрос с параметрами из {linkto(#tab_add_user_to_namespaces)[text=таблицы %number]}.

<warn>

Перед выполнением запроса убедитесь, что пользователь, добавляемый в пространства имён, авторизован в Портале самообслуживания и находится в разделе **Магазин приложений**.

</warn>

{caption(Таблица {counter(table)[id=numb_tab_add_user_to_namespaces]} — Параметры запроса на добавление пользователя в пространства имён)[align=right;position=above;id=tab_add_user_to_namespaces;number={const(numb_tab_add_user_to_namespaces)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/user/add_spaces`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `email` — email пользователя.
* `spaces` — список тестовых и открытых пространств имён Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на добавление пользователя в пространства имён)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/um/v1/user/add_spaces \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "email": "user@example.ru",
  "spaces": [
    "vk_test_ns",
    "vkcs_ru",
    "vk_prod_ns"
  ]
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes20)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes20]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes20;number={const(numb_tab_http_response_codes20)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Пользователь добавлен в пространства имён Marketplace

|422
|Ошибка выполнения запроса
|===
{/caption}

## {heading(Удаление пользователя {var(sys2)} из тестовых и открытых пространств имён)[id=xaas_space_delete_user]}

Чтобы удалить пользователя {var(sys2)} из тестового или открытого пространства имён Marketplace, выполните запрос с параметрами из {linkto(#tab_removing_user_from_namespaces)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_removing_user_from_namespaces]} — Параметры запроса на удаление пользователя из пространств имён)[align=right;position=above;id=tab_removing_user_from_namespaces;number={const(numb_tab_removing_user_from_namespaces)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/user/delete_spaces`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `email` — email пользователя.
* `spaces` — список тестовых и открытых пространств имён Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на удаление пользователя из пространств имён)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/um/v1/user/delete_spaces \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
  "email": "user@example.ru",
  "spaces": [
    "vk_test_ns",
    "vkcs_ru",
    "vk_prod_ns"
  ]
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes21)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes21]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes21;number={const(numb_tab_http_response_codes21)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Пользователь удалён из пространств имён Marketplace

|422
|Ошибка выполнения запроса
|===
{/caption}