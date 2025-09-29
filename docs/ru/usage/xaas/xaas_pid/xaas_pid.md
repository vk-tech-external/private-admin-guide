# {heading(Управление списком проектов поставщиков image-based приложений)[id=xaas_pid]}

Список проектов поставщиков image-based приложений содержит идентификаторы проектов (OpenStack PID), в которых поставщики тестируют манифесты Terraform.

## {heading(Добавление OpenStack PID в список проектов поставщиков)[id=xaas_pid_add]}

Чтобы добавить OpenStack PID в список проектов поставщиков, выполните запрос с параметрами из {linkto(#tab_adding_openstack_pid_to_vendor_list)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_adding_openstack_pid_to_vendor_list]} — Параметры запроса на добавление OpenStack PID в список проектов поставщиков)[align=right;position=above;id=tab_adding_openstack_pid_to_vendor_list;number={const(numb_tab_adding_openstack_pid_to_vendor_list)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`PUT`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/access/<PID>`

Здесь:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<PID>` — OpenStack PID, в котором будет выполнятся тестирование image-based приложения до его публикации. Укажите значение, полученное от поставщика. OpenStack PID отображается в Портале администратора на странице проекта

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на добавление OpenStack PID в список проектов поставщиков)[align=left;position=above]}
```console
$ curl -v -X PUT https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/access/0ce5d998d90e48a481aed9a6ebb25e75 \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes9)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes9]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes9;number={const(numb_tab_http_response_codes9)}]}
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

## {heading(Удаление OpenStack PID из списка проектов поставщиков)[id=xaas_pid_delete]}

Чтобы удалить OpenStack PID из списка проектов поставщиков, выполните запрос с параметрами из {linkto(#tab_adding_openstack_pid_to_vendor_list1)[text=таблицы %number]}.

{caption(Таблица {counter(table)[id=numb_tab_adding_openstack_pid_to_vendor_list1]} — Параметры запроса на добавление OpenStack PID в список проектов поставщиков)[align=right;position=above;id=tab_adding_openstack_pid_to_vendor_list1;number={const(numb_tab_adding_openstack_pid_to_vendor_list1)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Значение

|Метод запроса
|`DELETE`

|Путь запроса
|`https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/access/<PID>`

Здесь:

* `<CLOUD_HOST>` — доменное имя {var(sys2)}.
* `<PID>` — OpenStack PID. Отображается в Портале администратора на странице проекта

|`x-service-token`
|`<INFRA_API_ADMIN_TOKEN>` — токен доступа к сервису Infra API.

Соответствует значению переменной окружения `INFRA_API_COMMON__ADMINTOKEN` подов развёртывания `xaas-infra-api`, а также значению секрета для ключа `infra-api-common&#8212;&#8203;admintoken` из плейбука `helm-xaas`
|===
{/caption}

{caption(Пример запроса на удаление OpenStack PID из списка проектов поставщиков)[align=left;position=above]}
```console
$ curl -v -X DELETE https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/access/0ce5d998d90e48a481aed9a6ebb25e75 \
-H 'x-service-token: <INFRA_API_ADMIN_TOKEN>'
```
{/caption}

HTTP-коды ответа приведены в {linkto(#tab_http_response_codes10)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_response_codes10]} — HTTP-коды ответа)[align=right;position=above;id=tab_http_response_codes10;number={const(numb_tab_http_response_codes10)}]}
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