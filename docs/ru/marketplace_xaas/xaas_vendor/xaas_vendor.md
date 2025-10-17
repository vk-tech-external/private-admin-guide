# {heading(Добавление поставщика image-based приложения)[id=xaas_vendor]}

Чтобы добавить поставщика image-based приложения в Marketplace, выполните запрос с параметрами из {linkto(#tab_vendor_add_params)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_vendor_add_params]} — Параметры запроса на добавление поставщика)[align=right;position=above;id=tab_vendor_add_params;number={const(numb_tab_vendor_add_params)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/provider`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `service` — имя сервисного ключа. Уникально в рамках одной компании-поставщика и почты пользователя-владельца сервисного ключа.
* `token` — сервисный ключ. Значение задается администратором.
* `ns` — имя тенанта image-based брокера. Укажите имя компании-поставщика.
* `org_id` — идентификатор компании-поставщика. Укажите имя компании-поставщика.
* `test_ns` — список тестовых пространств имен Marketplace. Имена задаются администратором.
* `prod_ns` — список открытых пространств имен Marketplace. Имена задаются администратором.
* `pids` — список OpenStack PID, где будут тестироваться манифесты Terraform.
* `provider_email` — почта пользователя, назначаемого владельцем тенанта image-based брокера и владельцем сервисного ключа. Укажите значение, полученное от поставщика.
* `users_emails` — список адресов электронной почты пользователей, добавляемых в тестовые пространства имен `test_ns`

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развертывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common-admintoken` из плейбука `helm-xaas`
|===
{/caption}

В результате выполнения API-запроса:

* Будут созданы:

   * Тенант в image-based брокере для сервисов поставщика.
   * Сервисный ключ, позволяющий загружать сервисные пакеты в тенант image-based брокера.

      Сервисный ключ передайте поставщику.

* К тенанту image-based брокера будут привязаны тестовые и открытые пространства имен, в которых будут доступны загружаемые сервисы.

   <info>

   Если указанных пространств имен не было на момент выполнения API-запроса, они будут созданы.

   </info>
* В список проектов поставщиков image-based приложений будут добавлены OpenStack PID, указанные в `pids`.
* В тестовые пространства имен будут добавлены пользователи, указанные в `users_emails`.

{caption(Пример запроса на добавление поставщика)[align=left;position=above]}
```console
$ curl -v -X POST 'https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/provider' \
-H "Content-Type: application/json" \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>' \
--data '{
    "service": "vk",
    "token": "3a472276-2f52-44ea-bdcd-b34d5e3856fb",
    "ns": "vk",
    "org_id": "vk",
    "test_ns": [
        "test_ns_vk"
    ],
    "prod_ns": [
        "vkcs_ru"
    ],
    "pids": ["12345678901234567890123456789012"],
    "provider_email": "provider@email.com",
    "users_emails": ["provider@email.com"]
}'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_vendor_add_response_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_vendor_add_response_params]} — HTTP-коды ответа)[align=right;position=above;id=tab_vendor_add_response_params;number={const(numb_tab_vendor_add_response_params)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|ОК

|400
|Некорректный запрос

|401
|Ошибка аутентификации

|500
|Внутренняя ошибка сервера
|===
{/caption}