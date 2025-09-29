# {heading(Управление пространствами имен Marketplace)[id=xaas_space]}

## {heading(Создание тестового пространства имен)[id=xaas_test_space_create]}

Чтобы в Marketplace создать тестовое пространство имен, выполните запрос с параметрами из {linkto(#tab_create_test_namespace)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_create_test_namespace]} — Параметры запроса на создание тестового пространства имен)[align=right;position=above;id=tab_create_test_namespace;number={const(numb_tab_create_test_namespace)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `name` — название тестового пространства имен.
* `type` — тип пространства. Укажите `test_ns`

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на создание тестового пространства имен)[align=left;position=above]}
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

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes18)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes18]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes18;number={const(numb_tab_http_response_codes18)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|ОК

|404
|Объект не найден

|422
|Некорректный запрос
|===
{/caption}


## {heading(Создание открытого пространства имен)[id=xaas_prod_space_create]}

Чтобы в Marketplace создать открытое пространство имен, выполните запрос с параметрами из {linkto(#tab_creating_open_namespace)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_creating_open_namespace]} — Параметры запроса на создание открытого пространства имен)[align=right;position=above;id=tab_creating_open_namespace;number={const(numb_tab_creating_open_namespace)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/catalog/space`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `name` — название открытого пространства имен.
* `type` — тип пространства. Укажите `prod_ns`

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на создание открытого пространства имен)[align=left;position=above]}
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

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes19)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes19]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes19;number={const(numb_tab_http_response_codes19)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|ОК

|404
|Объект не найден

|422
|Некорректный запрос
|===
{/caption}

## {heading(Добавление пространства имен в список доступных для проекта)[id=xaas_space_add_project]}

Пользователю будут доступны пространства имен назначенные ему, а так же все пространства имен добавленные в проект. Можно добавлять как тестовые, так и открытые пространства имен в список доступных для проекта. 

<warn>

Не рекомендуется добавлять тестовое пространство имен в список доступных для проекта. В этом случае, всем пользователям проекта будут доступны неопубликованные версии приложений.

</warn>

Чтобы в Marketplace добавить пространство имен в проект, выполните запрос с параметрами из {linkto(#tab_space_add_project)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_space_add_project]} — Параметры запроса на добавление пространства имен в проект)[align=right;position=above;id=tab_space_add_project;number={const(numb_tab_space_add_project)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/project/<MCS_PROJECT_ID>/spaces`

Здесь:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<MCS_PROJECT_ID>` — идентификатор проекта в Marketplace.

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `spaces` — список тестовых и открытых пространств имен Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на добавление пространств имен для проекта)[align=left;position=above]}
```console
$ curl -v X POST 'https://<CLOUD_HOST>/marketplace/api/um/v1/project/<MCS_PROJECT_ID>/spaces' \
--header 'Content-Type: application/json' \
--header 'Authorization: <JWT_TOKEN>' \
--data '{
   "spaces": [
     "vk_test_ns",
     "vk_prod_ns"
   ]
}'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes20)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes20]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes20;number={const(numb_tab_http_response_codes20)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК

|422
|Некорректный запрос
|===
{/caption}

## {heading(Удаление пространства имен из списка доступных для проекта)[id=xaas_space_delete_project]}

Чтобы удалить пространство имен из проекта, выполните запрос с параметрами из {linkto(#tab_space_delete_project)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_space_delete_project]} — Параметры запроса на удаление пространства имен из проекта)[align=right;position=above;id=tab_space_delete_project;number={const(numb_tab_space_delete_project)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/project/<MCS_PROJECT_ID>/spaces`

Здесь:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<MCS_PROJECT_ID>`— идентификатор проекта в Marketplace.

|`Content-Type`
|`application/json`


|Тело запроса (`--data`)
|Задайте параметры:

* `spaces` — список тестовых и открытых пространств имен Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на удаление пространств имен из проекта)[align=left;position=above]}
```console
$ curl -v X DELETE 'https://<CLOUD_HOST>/marketplace/api/um/v1/project/<MCS_PROJECT_ID>/spaces' \
--header 'Content-Type: application/json' \
--header 'Authorization: <JWT_TOKEN>' \
--data '{
   "spaces": [
     "vk_test_ns",
     "vk_prod_ns"
  ]
}'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes21)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes21]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes21;number={const(numb_tab_http_response_codes21)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК

|422
|Некорректный запрос
|===
{/caption}

## {heading(Добавление пространства имен в список доступных для пользователя {var(sys2)})[id=xaas_space_add_user]}

Пользователь, добавленный в тестовое пространство имен, сможет тестировать сервис в Marketplace до его публикации.

Чтобы добавить пользователя {var(sys2)} в тестовое или открытое пространство имен Marketplace, выполните запрос с параметрами из {linkto(#tab_add_user_to_namespaces)[text=таблицы %number]}.

<warn>

Перед выполнением запроса убедитесь, что пользователь, добавляемый в пространства имен, авторизован в Портале самообслуживания и находится в разделе **Магазин приложений**.

</warn>

{caption(Таблица {counter(table)[id=numb_tab_add_user_to_namespaces]} — Параметры запроса на добавление пользователя в пространства имен)[align=right;position=above;id=tab_add_user_to_namespaces;number={const(numb_tab_add_user_to_namespaces)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/user/add_spaces`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `email` — электронная почта пользователя.
* `spaces` — список тестовых и открытых пространств имен Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на добавление пользователя в пространства имен)[align=left;position=above]}
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

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes20)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes20]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes20;number={const(numb_tab_http_response_codes20)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК

|422
|Некорректный запрос
|===
{/caption}

## {heading(Удаление пользователя {var(sys2)} из тестовых и открытых пространств имен)[id=xaas_space_delete_user]}

Чтобы удалить пользователя {var(sys2)} из тестового или открытого пространства имен Marketplace, выполните запрос с параметрами из {linkto(#tab_removing_user_from_namespaces)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_removing_user_from_namespaces]} — Параметры запроса на удаление пользователя из пространств имен)[align=right;position=above;id=tab_removing_user_from_namespaces;number={const(numb_tab_removing_user_from_namespaces)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/user/delete_spaces`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `email` — электронная почта пользователя.
* `spaces` — список тестовых и открытых пространств имен Marketplace

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на удаление пользователя из пространств имен)[align=left;position=above]}
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

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes21)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes21]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes21;number={const(numb_tab_http_response_codes21)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК

|422
|Некорректный запрос
|===
{/caption}


