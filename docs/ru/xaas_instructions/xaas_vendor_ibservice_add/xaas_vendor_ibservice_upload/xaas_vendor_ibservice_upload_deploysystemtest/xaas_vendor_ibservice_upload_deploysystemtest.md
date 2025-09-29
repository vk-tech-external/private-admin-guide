# {appendix-heading(Тестирование манифестов с системой развёртывания)[id=xaas_vendor_ibservice_upload_deploysystemtest; position=prefix]}

После локального тестирования манифестов Terraform и перед загрузкой сервисного пакета в Marketplace рекомендуется протестировать манифесты `plans/<PLAN_NAME>/deployment/deploy.tf` с системой развёртывания. Это позволит убедиться в том, что все описанные ресурсы могут быть созданы системой развёртывания.

<warn>

Перед тестированием с системой развёртывания убедитесь, что OpenStack PID внесён в список поставщиков (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_package#xaas_vendor_ibservice_upload_prepare)[text=%text]}).

</warn>

В процессе тестирования потребуются:

* Ключ для доступа к API. Ключ отображается в Портале самообслуживания на странице настроек проекта (вкладка с информацией о доступе по API).
* Доменное имя {var(sys2)}.

Чтобы протестировать манифест Terraform с системой развёртывания:

1. Выполните API-запросы:

   1. Загрузите манифест в систему развёртывания.
   1. Проверьте текущую конфигурацию загруженного манифеста.
   1. Создайте инстанс сервиса.
   1. Удалите инстанс сервиса.

   Параметры API-запросов описаны в следующих подразделах.

<info>

В процессе создания, после создания и после удаления инстанса сервиса проверьте его состояние. Если статус инстанса сервиса `failed`, посмотрите лог ошибки (подробнее — в подразделе {linkto(#deploysystemtest_log)[text=%text]}).

</info>

## {appendix-heading(Загрузка манифеста Terraform в систему развёртывания)[id=loading_terraform_manifest_into_deployment_system; position=prefix]}

Чтобы загрузить манифест `plans/<PLAN_NAME>/deployment/deploy.tf` в систему развёртывания, выполните запрос с параметрами, приведёнными в {linkto(#tab_loading_manifest)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_loading_manifest]} — Параметры запроса на загрузку манифеста)[align=right;position=above;id=tab_loading_manifest;number={const(numb_tab_loading_manifest)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<MANIFEST_NAME>` — имя манифеста

|Тело запроса (`--data-binary`)
|Содержимое манифеста `plans/<PLAN_NAME>/deployment/deploy.tf`.

Если для тестирования требуются дополнительные ресурсы провайдеров, добавьте их в тело запроса

|`x-auth-token`
|`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на загрузку манифеста)[align=left;position=above]}
```console
$ curl -v -X POST https://mcs.mail.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data-binary "@deploy.tf"
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes22)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes22]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes22;number={const(numb_tab_http_response_codes22)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Манифест загружен или обновлён

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

При отправке запроса с именем манифеста, уже существующим в системе развёртывания, конфигурация этого манифеста будет обновлена.

Манифесты загружаются в рамках одного аккаунта пользователя.

Все ранее загруженные конфигурации манифеста сохраняются в системе развёртывания, чтобы обеспечить корректную работу Terraform. Инстанс сервиса разворачивается с текущей конфигурацией манифеста, которую можно просмотреть с помощью GET-запроса `/hoe/config/<MANIFEST_NAME>` (подробнее — в подразделе {linkto(#manifest_check)[text=%text]}).

## {appendix-heading(Проверка текущей конфигурации манифеста Terraform)[id=manifest_check; position=prefix]}

Чтобы проверить текущую конфигурацию манифеста Terraform, находящуюся в системе развёртывания, выполните запрос с параметрами, приведёнными в {linkto(#tab_checking_current_manifest_configuration)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_checking_current_manifest_configuration]} — Параметры запроса на проверку текущей конфигурации манифеста)[align=right;position=above;id=tab_checking_current_manifest_configuration;number={const(numb_tab_checking_current_manifest_configuration)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/config/<MANIFEST_NAME>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<MANIFEST_NAME>` — имя манифеста

|`x-auth-token`
|`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на проверку текущей конфигурации манифеста)[align=left;position=above]}
```console
$ curl https://mcs.mail.ru/marketplace/api/infra-api/api/v1-public/hoe/config/test_1.0 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes23)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes23]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes23;number={const(numb_tab_http_response_codes23)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

Ответ на запрос содержит текущую конфигурацию указанного манифеста Terraform

|401
|Ошибка авторизации

|404
|
Манифест не найден

|500
|Ошибка выполнения запроса
|===
{/caption}

## {appendix-heading(Создание инстанса сервиса)[id=deploysystemtest_create; position=prefix]}

Чтобы создать инстанс сервиса, выполните запрос с параметрами, приведёнными в {linkto(#tab_creating_service_instance)[text=таблице %number]}. Будут созданы ресурсы текущей конфигурации манифеста Terraform.

{caption(Таблица {counter(table)[id=numb_tab_creating_service_instance]} — Параметры запроса на создание инстанса сервиса)[align=right;position=above;id=tab_creating_service_instance;number={const(numb_tab_creating_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`POST`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object`

где `<CLOUD_HOST>` — доменное имя {var(sys2)}

|`Content-Type`
|`application/json`

|Тело запроса
|Задайте параметры:

* `uuid` — идентификатор инстанса сервиса, сформированный с помощью генератора UUID4.
* `config` — имя манифеста.
* `vars` — внешние входные переменные манифеста. Задание значений для таких переменных в теле запроса имитирует действия пользователя в мастере конфигурации тарифного плана.

|`x-auth-token`
|`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на создание инстанса сервиса)[align=left;position=above]}
```console
$ curl -v -X POST https://mcs.mail.ru/marketplace/api/infra-api/api/v1-public/hoe/object \
-H "Content-Type: application/json" \
-H 'x-auth-token: <AUTH_TOKEN>' \
--data '{
  "uuid": "675f6f08-2344-4cf4-a7f4-f02311f795d7",
  "config": "test_1.0",
  "vars": {
    "sub_network": "a793470c-36d8-4d2e-8b27-67af6c178c8e",
    "image_uuid": "163ff752-1390-4b72-a23c-b0001e3e65d3",
    "volume_type": "ceph",
    "flavor_uuid": "6e61564f-3e68-4bd3-9ffa-08df5fd84514"
  }
  }'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes24)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes24]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes24;number={const(numb_tab_http_response_codes24)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Инстанс сервиса создан

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации
|===
{/caption}

## {appendix-heading(Удаление инстанса сервиса)[id=deploysystemtest_delete; position=prefix]}

Чтобы удалить инстанс сервиса, созданный в результате выполнения манифеста Terraform, выполните запрос с параметрами, приведёнными в {linkto(#tab_deleting_service_instance)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_deleting_service_instance]} — Параметры запроса на удаление инстанса сервиса)[align=right;position=above;id=tab_deleting_service_instance;number={const(numb_tab_deleting_service_instance)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<OBJECT_UUID>` — идентификатор разворачивания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на разворачивание инстанса сервиса

|`x-auth-token`
|`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на удаление инстанса сервиса)[align=left;position=above]}
```console
$ curl -v -X DELETE https://mcs.mail.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-2344-4cf4-a7f4-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes25)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes25]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes25;number={const(numb_tab_http_response_codes25)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|201
|Инстанс сервиса удален

|400, 500
|Ошибка выполнения запроса

|401
|Ошибка авторизации

|404
|Манифест не найден
|===
{/caption}

## {appendix-heading(Проверка состояния инстанса сервиса)[id=deploysystemtest_checking_status; position=prefix]}

Чтобы проверить состояние инстанса сервиса, выполните запрос с параметрами, приведёнными в {linkto(#tab_checking_service_instance_status)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_checking_service_instance_status]} — Параметры запроса на проверку состояния инстанса сервиса)[align=right;position=above;id=tab_checking_service_instance_status;number={const(numb_tab_checking_service_instance_status)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`GET`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/hoe/object/<OBJECT_UUID>`

где:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<OBJECT_UUID>` — идентификатор разворачивания инстанса сервиса. Значение соответствует параметру `uuid` в запросе на разворачивание инстанса сервиса

|`x-auth-token`
|`<AUTH_TOKEN>` — ключ для доступа к API
|===
{/caption}

{caption(Пример запроса на проверку состояния инстанса сервиса)[align=left;position=above]}
```console
$ curl https://mcs.mail.ru/marketplace/api/infra-api/api/v1-public/hoe/object/675f6f08-2344-4cf4-a7f4-f02311f795d7 \
-H 'x-auth-token: <AUTH_TOKEN>'
```
{/caption}

HTTP-коды ответа  приведены в {linkto(#tab_http_response_codes26)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes26]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes26;number={const(numb_tab_http_response_codes26)}]}
[cols="2,5", options="header"]
|===
|Код
|Описание

|200
|Запрос выполнен.

Ответ на запрос содержит статус инстанса сервиса (`status`). Возможные статусы:

* `applying` — манифест выполняется, ресурсы в процессе создания.
* `running` — манифест выполнен, инстанс сервиса создан.
* `failed` — манифест завершен с ошибкой, инстанс сервиса не создан.
* `deleted` — инстанс сервиса удалён

|401
|Ошибка авторизации

|404
|Идентификатор инстанса сервиса не найден

|500
|Ошибка выполнения запроса
|===
{/caption}

{caption(Пример ответа на запрос, выполненный после удаления инстанса сервиса)[align=left;position=above]}
```yaml
{
    "uuid": "675f6f08-2344-4cf4-a7f4-f02311f795d7",
    "target_status": "deleted",
    "vars": {},
    "out": "{}",
    "status": "deleted",
    "conf_name": "user@vk.team",
    "conf_hash": "75587bae82f2492ea8a94b8b067c9898",
    "pid": "b66dde3d4d0e415aaf3412e17e53259c",
    "create_at": "2023-04-26T13:57:54.849565Z",
    "update_at": "2023-04-26T14:02:42.667399Z",
    "full_deployed": false,
    "attempts": 0,
    "max_attempts": 15
}
```
{/caption}

где:

* `uuid` — идентификатор разворачивания инстанса сервиса.
* `target_status` — целевой статус инстанса сервиса (`deleted` или `running`).
* `vars` — входные переменные манифеста.
* `out` — выходные параметры манифеста.
* `status` — текущий статус инстанса сервиса.
* `conf_name` — имя пользователя, развернувшего сервис.
* `conf_hash` — хеш конфигурации инстанса сервиса.
* `pid` — идентификатор проекта пользователя, развернувшего сервис (OpenStack PID).
* `create_at` — дата и время, когда инстанс сервиса был создан.
* `update_at` — дата и время последнего обновления инстанса сервиса системой развёртывания.
* `full_deployed` — успешно ли развернут инстанс сервиса (для статуса `deleted` значение равно `false`).
* `attempts` — количество выполненных повторных попыток при разворачивании или автовосстановлении инстанса сервиса.
* `max_attempts` — максимальное количество повторных попыток.

## {appendix-heading(Просмотр лога ошибки при разворачивании инстанса сервиса)[id=deploysystemtest_log; position=prefix]}

Чтобы просмотреть лог ошибки, возникшей при разворачивании инстанса сервиса:

1. Зайдите в ЛК облачной платформы.
1. Перейдите в раздел **Магазин приложений**.
1. Получите JWT-токен авторизации в Marketplace. В консоли выполните команду:

   ```console
   $ curl -X POST https://<CLOUD_HOST>/marketplace/api/um/v1/tokens/sid \
   --cookie 'sid=<SID>'
   ```

   где:

   * `<CLOUD_HOST>` — доменное имя {var(sys2)}.
   * `<SID>` — значение файла cookie `sid` в веб-браузере.

      В ответе на команду отобразится JWT-токен.

1. Получите лог ошибки:

   ```console
   $ curl -v https://<CLOUD_HOST>/marketplace/api/notifications/api/v1/instance?uuid=<UUID> \
   -H 'Authorization: Bearer <JWT_TOKEN>'
   ```

   где:

   * `<CLOUD_HOST>` — доменное имя {var(sys2)}.
   * `<UUID>` — индентификатор инстанса сервиса. Значение соответствует одноимённому параметру в запросе на разворачивание инстанса сервиса (подробнее — в разделе {linkto(#deploysystemtest_create)[text=%text]}).
   * `<JWT_TOKEN>` — JWT-токен авторизации, полученный на предыдущем шаге.

   Если при разворачивании инстанса была ошибка, в ответе на команду отобразится её лог.

## {appendix-heading(Просмотр логов и результатов работы агента)[id=deploysystemtest_agent; position=prefix]}

Чтобы посмотреть логи и результаты работы агента:

1. Подключитесь к ВМ, на которой установлен агент, по протоколу удалённого доступа или с помощью VNC-консоли в Портале самообслуживания (подробнее — в документе **Руководство пользователя Private Cloud**).

   <info>

   Имя ВМ, на которой был установлен агент, было задано в ресурсе `ivkcs_agent_init` в манифесте `plans/<PLAN_NAME>/deployment/deploy.tf`.

   </info>
   
1. Чтобы просмотреть логи, выполните команду `journalctl -u sower`.
1. Чтобы просмотреть результаты, перейдите в директорию `/etc/sower/result`.
