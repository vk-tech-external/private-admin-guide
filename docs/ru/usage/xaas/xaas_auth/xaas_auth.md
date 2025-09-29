# {heading(Авторизация в Marketplace под учётной записью администратора {var(sys2)})[id=xaas_auth]}

Чтобы авторизоваться в Marketplace под учётной записью администратора {var(sys2)}, выполните запрос с параметрами из {linkto(#tab_authorization_request_parameters)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_authorization_request_parameters]} — Параметры запроса на авторизацию)[align=right;position=above;id=tab_authorization_request_parameters;number={const(numb_tab_authorization_request_parameters)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/um/v1/tokens/basic`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `email` — email учётной записи администратора {var(sys2)}.
* `password` — пароль учётной записи администратора {var(sys2)}
|===
{/caption}

{caption(Пример запроса на авторизацию)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/um/v1/tokens/basic \
-H "Content-Type: application/json" \
--data '{
  "email": "admin@example.ru",
  "password": "password"
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes6)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes6]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes6;number={const(numb_tab_http_response_codes6)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК.

Ответ содержит JWT-токен администратора {var(sys2)} для доступа к Marketplace

|422
|Некорректный запрос
|===
{/caption}