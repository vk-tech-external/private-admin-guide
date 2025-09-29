# {heading(Управление брокером)[id=xaas_broker]}

## {heading(Регистрация брокера в Marketplace)[id=xaas_broker_register]}

Чтобы зарегистрировать брокер в Marketplace (SaaS-брокер или тенант image-based брокера), выполните запрос с параметрами из {linkto(#tab_broker_registration_request_parameters)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_broker_registration_request_parameters]} — Параметры запроса на регистрацию брокера)[align=right;position=above;id=tab_broker_registration_request_parameters;number={const(numb_tab_broker_registration_request_parameters)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса (`--data`)
|Задайте параметры:

* `name` — имя брокера.
* `url` — URL брокера.
* `description` — описание брокера.
* `osb_version` — версия протокола VK OSB брокера.
* `username` — имя Marketplace для взаимодействия с брокером.
* `password` — пароль для взаимодействия Магазина с брокером.
* `user_id` — email пользователя-владельца брокера. На указанный email будут приходить уведомления об ошибках при создании инстансов сервиса.
* `spaces` — тестовые и открытые пространства имён, в которых будет размещаться сервис:

   * `spaces.test_ns` — список тестовых пространств имён. Значения задаются администратором.
   * `spaces.prod_ns` — список открытых пространств имён. Значения задаются администратором.

При регистрации SaaS-брокера укажите значения, полученные от поставщика, для всех параметров, кроме `spaces`.

При регистрации тенанта image-based брокера для параметров укажите значения:

* `name` — имя компании-поставщика.
* `url` — формат `<IMAGE_BASED_BROKER_URL>/<TENANT>`

   Здесь:

   * `<IMAGE_BASED_BROKER_URL>` — URL image-based брокера.
   * `<TENANT>` — имя тенанта image-based брокера. Укажите значение параметра `ns` из {linkto(../../../usage/xaas/xaas_service_key#xaas_service_key_create)[text=запроса на создание сервисного ключа]}.

* `description` — значение задаётся администратором.
* `osb_version` — значение задаётся администратором.
* `username` — значение переменной окружения `GOLDENBROKER_BASICAUTH__USERNAME`, заданной в конфигурации image-based брокера.
* `password` — значение переменной окружения `GOLDENBROKER_BASICAUTH__PASSWORD`, заданной в конфигурации image-based брокера.
* `user_id` — значение, полученное от поставщика.
* `spaces.test_ns` — значения задаются администратором.
* `spaces.prod_ns` — значения задаются администратором.

<warn>

Значения `spaces.test_ns` и `spaces.prod_ns` должны совпадать со значениями, заданными при создании сервисного ключа (подробнее — в разделе {linkto(../../../usage/xaas/xaas_service_key#xaas_service_key_create)[text=%text]}).

</warn>

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на регистрацию тенанта image-based брокера)[align=left;position=above]}
```console
$ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers \
-H "Content-Type: application/json" \
-H 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
    "name": "VK",
    "url": "http://xaas-golden-broker-headless:8000/vk",
    "description": "Broker for VK service",
    "osb_version": "0.1",
    "username": "xaas",
    "password": "password",
    "user_id": "user_notifications@example.ru",
    "spaces": {
    "test_ns": ["vk_test_ns"],
    "prod_ns": ["vkcs_ru", "vk_prod_ns"]
  }
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes7)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes7]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes7;number={const(numb_tab_http_response_codes7)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|ОК.

Ответ содержит:

* Параметры из тела запроса.
* `id` — ID брокера в Marketplace

<!--- //* `archived` — заархивирован брокер или нет (подробнее — в разделе <<xaas_broker_archive>>) -->

<!--- // TODO кейс архивации описать позже, т.к. он не проработан -->

|404
|Объект не найден

|422
|Некорректный запрос
|===
{/caption}

{caption(Пример ответа)[align=left;position=above]}
```json
{
  "user_id": "user_notifications@example.ru",
  "name": "VK",
  "url": "http://xaas-golden-broker-headless:8000/vk",
  "description": "Broker for VK service",
  "osb_version": "0.1",
  "spaces": {
    "test_ns": ["vk_test_ns"],
    "prod_ns": ["vk_prod_ns", "vkcs_ru"]
  },
  "username": "xaas",
  "password": "password",
  "id": "7"
}
```
{/caption}

<!--- // TODO раздел "Архивация брокера" закомментирован, т.к. пока не проработан. Нужно будет его добавить, когда он будет проверен в релизе Marketplace -->
<!--- // [[xaas_broker_archive]] -->
<!--- // == Архивация брокера -->
<!--- // -->
<!--- //С момента архивации брокера (SaaS-брокера или тенанта image-based брокера) останавливается синхронизация Marketplace с брокером: Marketplace больше не опрашивает брокера о текущей конфигурации сервиса. -->
<!--- // -->
<!--- //Нельзя создать новые инстансы сервиса. -->
<!--- // -->
<!--- //Инстансы сервиса, созданные до архивации брокера, остаются доступными пользователю, #но их нельзя обновить (изменить тарифный план или опции)#. -->
<!--- // -->
<!--- //Чтобы заархивировать брокер (SaaS-брокер или тенант image-based брокера), выполните запрос с параметрами из таблицы {counter:table-number}. -->
<!--- // -->
<!--- //[caption= 'Таблица {counter:table-number} — '] -->
<!--- //.Параметры запроса на архивацию брокера -->
<!--- //[cols="2a,5a", options="header"] -->
<!--- //|=== -->
<!--- //|Параметр |Значение -->
<!--- // -->
<!--- //|Метод запроса -->
<!--- //|`DELETE` -->
<!--- // -->
<!--- //|Путь запроса -->
<!--- //|`+https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers/<BROKER_ID>+` -->
<!--- // -->
<!--- //Здесь: -->
<!--- // -->
<!--- //* `<CLOUD_HOST>` — доменное имя {var(sys2)}. -->
<!--- //* `<BROKER_ID>` — ID брокера, полученный при регистрации в Marketplace. Значение получите с помощью запроса списка зарегистрированных брокеров (подробнее — в разделе <<xaas_broker_list>>) -->
<!--- // -->
<!--- //|`Authorization` -->
<!--- //|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе <<xaas_auth>>) -->
<!--- //|=== -->
<!--- // -->
<!--- //.Пример запроса на архивацию брокера -->
<!--- //[source, console] -->
<!--- //---- -->
<!--- //$ curl -v -X DELETE https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers/7 \ -->
<!--- //-H 'Authorization: Bearer <JWT_TOKEN>' -->
<!--- //---- -->
<!--- // -->
<!--- //HTTP-коды ответа приведены в таблице {counter:table-number}. -->
<!--- // -->
<!--- //[caption= 'Таблица {counter:table-number} — '] -->
<!--- //.HTTP-коды ответа -->
<!--- //[cols="2,5", options="header"] -->
<!--- //|=== -->
<!--- //|Код |Описание -->
<!--- // -->
<!--- //|200 -->
<!--- //|Брокер (SaaS-брокер или тенант image-based брокера) заархивирован -->
<!--- // -->
<!--- //|204, 422 -->
<!--- //|Ошибка выполнения запроса -->
<!--- // -->
<!--- //|404 -->
<!--- //|Брокер (SaaS-брокер или тенант image-based брокера) не найден -->
<!--- //|=== -->

## {heading(Просмотр списка брокеров, зарегистрированных в Marketplace)[id=xaas_broker_list]}

Чтобы просмотреть список брокеров (SaaS-брокеров и тенантов image-based брокера), зарегистрированных в Marketplace, выполните запрос с параметрами из {linkto(#tab_viewing_list_of_brokers)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_viewing_list_of_brokers]} — Параметры запроса на просмотр списка брокеров)[align=right;position=above;id=tab_viewing_list_of_brokers;number={const(numb_tab_viewing_list_of_brokers)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers`

Здесь `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Authorization`
|`<JWT_TOKEN>` — JWT-токен администратора {var(sys2)} (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]})
|===
{/caption}

{caption(Пример запроса на просмотр списка брокеров)[align=left;position=above]}
```console
$ curl https://<CLOUD_HOST>/marketplace/api/catalog/v1/brokers \
-H 'Authorization: Bearer <JWT_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes8)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes8]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes8;number={const(numb_tab_http_response_codes8)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|ОК.

Ответ содержит список брокеров (SaaS-брокеров и тенантов image-based брокера), зарегистрированных в Marketplace. Для каждого брокера указан ID брокера в Marketplace (`id`)

|404
|Объект не найден
|===
{/caption}

{caption(Пример ответа)[align=left;position=above]}
```json
[
  {
    "user_id": "user_notifications@example.ru",
    "name": "VK",
    "url": "http://xaas-golden-broker-headless:8000/vk",
    "description": "Broker for VK service",
    "osb_version": "0.1",
    "spaces": {
      "test_ns": ["vk_test_ns"],
      "prod_ns": ["vk_prod_ns", "vkcs_ru"]
    },
    "username": "xaas",
    "password": "password",
    "id": "7"
  }
]
```
{/caption}