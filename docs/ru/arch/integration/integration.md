# {heading(Интеграция с внешними системами)[id=integration]}

<!--- //#todo провести техническое ревью раздела -->

{ifdef(box, pg)}

Интеграция — синхронизация информации о пользовательских объектах {var(sys2)} с системой, развернутой Заказчиком самостоятельно (примеры: AD, DNS и прочими).

Интеграция осуществляется со стороны {var(sys2)} с помощью вызова REST API специальных сервисов. Специальные сервисы перенаправляют запросы в систему Заказчика.

{var(sys1)} обеспечивает доставку актуальной информации в специальные сервисы с возможной небольшой задержкой. Пример использования задержки: корректное применение вручную созданной ВМ по DNS-имени. Специальные сервисы разрабатываются под инфраструктуру Заказчика так, чтобы транслировать вызовы API {var(sys2)} в форматы, понятные системам Заказчика, и передавать их по корректным адресам.

{var(sys1)} выполняет логирование интеграции. Логи доступны администраторам по общим правилам доступа к логам в {var(sys6)}.
{/ifdef}

{ifdef(cer)}
По желанию Заказчика возможна настройка интеграции {var(sys2_go)} с системами Заказчика.

Интеграция — синхронизация информации о пользовательских объектах {var(sys2_go)} с системой, развернутой Заказчиком самостоятельно (например, AD, DNS и прочими).

Интеграция осуществляется со стороны {var(sys2_go)} с помощью вызова REST API специальных сервисов. Специальные сервисы перенаправляют запросы в систему Заказчика.

{var(sys1_go)} обеспечивает доставку актуальной информации в специальные сервисы с возможной небольшой задержкой (позволяющей, например, начать использовать созданную вручную ВМ по DNS-имени). Специальные сервисы разрабатываются под инфраструктуру Заказчика так, чтобы транслировать вызовы API {var(sys2_go)} в форматы, понятные системам Заказчика, и передавать их по корректным адресам.

{var(sys1_go)} выполняет логирование интеграции. Логи доступны администраторам по общим правилам доступа к логам в {var(sys6_go)}.
{/ifdef}

## {heading(Ограничения существующей реализации)[id=integration_limitations_of_existing_implementation]}

Основные ограничения:

<!--- //. Для работы синхронизации CMDB требуется Consul (DCS KV, распределенное хранилище данных типа *ключ*-*значение*). Он используется при синхронизации отправки данных в соответствующий специальный сервис. -->

1. Для обновления информации в целевых системах в некоторых случаях недостаточно изменения синхронизируемых данных. К таким случаям относятся:

   {ifndef(cer)}
   * Изменение заголовка проекта в IAM.
   {/ifndef}
   
   {ifdef(cer)}
   * Изменение заголовка проекта с помощью Breeze.
   {/ifdef}
   
   * Изменение метаданных корневого диска.
   * Изменение параметров сети. Пример: IP-адрес.
   
1. При недоступности специальных сервисов синхронизации или других проблемах обработки изменений синхронизация может не выполниться.
1. Интеграция Kubernetes Ingress с DNS не реализована.

{ifdef(box, pg)}

## {heading(AD)[id=integration_ad]}

Синхронизирует информацию о ВМ в Active Directory (AD).

Структурно информация, передаваемая в AD, состоит из двух словарей с данными о группе ({linkto(#tab_group_params)[text=таблица %number]}) и сервере ({linkto(#tab_server_params)[text=таблица %number]}). При создании ВМ данные добавляются в AD, а при удалении — удаляются из AD. При изменении Доменного имени (FQDN) — удаляется старая информация и создается новая.

На данные AD оказывают влияние следующие действия пользователя:

* Создание/удаление ВМ.
* Подключение/отключение сетевого интерфейса.
* Изменение приватного DNS-имени сетевого интерфейса.

<err>

Данные AD не отправляются, если:

* ВМ создана под нужды PaaS.
* ВМ принадлежит настраиваемому списку игнорируемых проектов.

</err>

### {heading(Информация о группе)[id=integration_group_information]}

{caption(Таблица {counter(table)[id=numb_tab_group_params]} — Параметры группы)[align=right;position=above;id=tab_group_params;number={const(numb_tab_group_params)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Описание

|hostname
|Доменное имя первого сетевого интерфейса ВМ (`hostname`) без конечной точки (FQDN). Строка в формате `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>`. Здесь:

<!--- // (подробнее – в разделе <<CMDB>>) -->

* `<ЗАГОЛОВОК_ПРОЕКТА>` — заголовок проекта из IAM.
* `<DNS_ИМЯ_ИНТЕРФЕЙСА>` — DNS-имя интерфейса. Длина имени интерфейса до первой точки обрезается до 15 символов.
* `<DNS_ДОМЕН>` — DNS-домен из настроек сети сетевого интерфейса

|operating_system
|Операционная система. Рассчитывается маппингом по настроечной таблице исходя из метаданных `os_type` корневого диска

|members
|Список, единственный элемент которого — имя пользователя (из Keystone), создавшего ВМ, с заданным в настройках суффиксом
|===
{/caption}

### {heading(Информация о сервере)[id=integration_server_information]}

{caption(Таблица {counter(table)[id=numb_tab_server_params]} — Параметры сервера)[align=right;position=above;id=tab_server_params;number={const(numb_tab_server_params)}]}
[cols="2,5", options="header"]
|===
|Параметр
|Описание

|hostname
|Доменное имя (FQDN) первого сетевого интерфейса ВМ

|operating_system
|Операционная система. Рассчитывается маппингом по настроечной таблице исходя из метаданных `os_type` корневого диска
|===
{/caption}

### {heading(Описание методов API)[id=integration_api_methods_description]}

Сервис предоставляет методы создания/удаления ВМ и групп AD:

* Создание хоста включает в себя создание группы AD и создание ВМ, которая будет входить в эту группу.
* Удаление хоста включает в себя удаление группы AD и удаление ВМ, которая входила в эту группу.

Все строки в телах запросов имеют формат `Unicode`.

#### {heading(Запросить Bearer-токен)[id=integration_request_bearer_token]}

Тип запроса: **POST**, путь `/login`

Авторизация для получения Bearer-токена, который нужен для авторизации остальных запросов.

{caption(Пример тела запроса)[align=left;position=above]}
```json
{
  "username": "login",
  "password": "password"
}
```
{/caption}

Описание параметров тела запроса приведено в {linkto(#tab_cmdb_login_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_cmdb_login_params]} — Описание параметров тела запроса для метода /login)[align=right;position=above;id=tab_cmdb_login_params;number={const(numb_tab_cmdb_login_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|username
|string
| ![](../../assets/check.svg "inline")
|Имя пользователя/логин

|password
|string
| ![](../../assets/check.svg "inline")
|Пароль пользователя
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — токен получен.
* 400 — некорректный запрос.
* 401 — отказано в доступе.

{caption(Пример ответа на запрос)[align=left;position=above]}
```json
{
  "token": "1mx6L2L7AMdEsyKy5LW9s8gt6mBxdICwosVn5sjhbwykOoQJFUru6752dwsj2THN"
}
```
{/caption}

#### {heading(Создать группу AD)[id=integration_ad_group_create]}

Тип запроса: **POST**, путь `/api/v1/groups`

Создать группу AD для ВМ. Для каждой ВМ создается своя группа.

{caption(Пример тела запроса)[align=left;position=above]}
```json
{
  "hostname": "project-vm.example.",
  "operating_system": "Linux",
  "members": [
    "member@example.ru"
  ]
}
```
{/caption}

Описание параметров тела запроса приведено в {linkto(#tab_groups_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_groups_params]} — Описание параметров тела запроса для метода /api/v1/groups)[align=right;position=above;id=tab_groups_params;number={const(numb_tab_groups_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|hostname
|string
| ![](../../assets/check.svg "inline")
|Доменное имя первого сетевого интерфейса ВМ вида `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`

|operating_system
|string
| ![](../../assets/check.svg "inline")
|Имя операционной системы, установленной на хосте. Может включать в себя любые символы

|members
|array[string]
| ![](../../assets/check.svg "inline")
|Список, единственный элемент которого — имя пользователя, создавшего ВМ. Может быть в формате адреса электронной почты
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — группа создана.

#### {heading(Удалить группу AD)[id=integration_ad_group_delete]}

Тип запроса: **DELETE**, путь `/api/v1/groups/{hostname}`

Удаление группы AD, за которым последует удаление ВМ, входящей в эту группу.

{caption(Пример запроса)[align=left;position=above]}
```curl
curl -X DELETE "https://<hostname>/api/v1/groups/computer1" -H "accept: application/json"
```
{/caption}

В методе используются параметры, приведенные в {linkto(#tab_delete_group_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_delete_group_params]} — Описание параметров (path) для метода /api/v1/groups/{hostname})[align=right;position=above;id=tab_delete_group_params;number={const(numb_tab_delete_group_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|hostname
|string
| ![](../../assets/check.svg "inline")
|Доменное имя (FQDN) группы, которую нужно удалить. Имеет вид `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — удаление группы выполнено.
* 404 — указанной группы не существует.

#### {heading(Создать ВМ)[id=integration_vm_create]}

Тип запроса: **POST**, путь `/api/v1/computer`

Создание ВМ, перед которым следовало создание группы AD для данной ВМ.

{caption(Пример тела запроса)[align=left;position=above]}
```json
{
  "hostname": "project-vm.example.",
  "operating_system": "Linux"
}
```
{/caption}

Описание параметров тела запроса приведено в {linkto(#tab_computer)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_computer]} — Описание параметров тела запроса для метода /api/v1/computer)[align=right;position=above;id=tab_computer;number={const(numb_tab_computer)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|hostname
|string
| ![](../../assets/check.svg "inline")
|Доменное имя первого сетевого интерфейса ВМ вида `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`

|operating_system
|string
| ![](../../assets/check.svg "inline")
|Имя операционной системы, установленной на хосте. Может включать в себя любые символы
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — создание ВМ выполнено.

#### {heading(Удалить ВМ)[id=integration_vm_delete]}

Тип запроса: **DELETE**, путь `/api/v1/computer/{hostname}`

{caption(Пример запроса)[align=left;position=above]}
```curl
curl -X DELETE "https://<hostname>/api/v1/computer/computer1" -H "accept: */*"
```
{/caption}

В методе используются параметры, приведенные в {linkto(#tab_computer_var)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_computer_var]} — Описание параметров (path) для метода /api/v1/computer/{hostname})[align=right;position=above;id=tab_computer_var;number={const(numb_tab_computer_var)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|hostname
|string
| ![](../../assets/check.svg "inline")
|Доменное имя ВМ, которую нужно удалить. Имеет вид `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — удаление ВМ выполнено.
* 404 — указанной ВМ не существует.

{/ifdef}

## {heading(DNS)[id=integration_dns]}

{ifndef(cer)}
Синхронизирует информацию в целевом DNS о ВМ и балансировщиках нагрузки.
{/ifndef}

{ifdef(cer)}
Синхронизирует информацию в целевом DNS о ВМ.
{/ifdef}

Структурно информация, передаваемая в целевые DNS, состоит из словаря ({linkto(#tab_dns_params)[text=таблица %number]}). При создании объекта создается DNS-информация, при удалении — удаляется, при изменении — удаляется и создается новая.

{caption(Таблица {counter(table)[id=numb_tab_dns_params]} — Параметры DNS)[align=right;position=above;id=tab_dns_params;number={const(numb_tab_dns_params)}]}
[cols="1,1", options="header"]
|===
|Параметр
|Описание

|fqdn
|Доменное имя (FQDN) первого сетевого интерфейса ВМ

|ip
|IP-адрес первого IPv4 сетевого интерфейса
|===
{/caption}

Информация DNS синхронизируется:

* Для всех сетевых интерфейсов ВМ:

   * Не принадлежащих настраиваемому списку проектов.

{ifndef(cer)}
* Для балансировщиков нагрузки LBaaS и Octavia:
   * Созданных на frontend (с заданным пользователем DNS-именем, отличным от стандартного `host-<IP>`).
   * Балансировщики нагрузки DBaaS.
   * Балансировщики нагрузки k8s API KaaS.
{/ifndef}

На передаваемую в целевые DNS информацию оказывают влияние следующие действия пользователя:

* Создание/удаление ВМ.
* Подключение/отключение сетевых интерфейсов.
* Изменение DNS-имени сетевых интерфейсов.
{ifndef(cer)}
* Создание/удаление балансировщика нагрузки.
* Изменение DNS-имени VIP сетевого интерфейса балансировщика нагрузки.
* Создание/масштабирование/удаление PaaS объектов. Примеры: кластеры/инстансы DBaaS, кластеры KaaS.
{/ifndef}

### {heading(Описание методов API)[id=integration_dns_api_methods_description]}

#### {heading(Запросить Bearer-токен)[id=integration_dns_request_bearer_token]}

Тип запроса: **POST**, путь `/login`

Авторизация для получения Bearer-токена, который нужен для авторизации остальных запросов.

{caption(Пример тела запроса)[align=left;position=above]}
```json
{
  "username": "login",
  "password": "password"
}
```
{/caption}

Описание параметров тела запроса приведено в {linkto(#tab_dns_login_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_dns_login_params]} — Описание параметров тела запроса для метода /login)[align=right;position=above;id=tab_dns_login_params;number={const(numb_tab_dns_login_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|username
|string
| ![](../../assets/check.svg "inline")
|Имя пользователя/логин

|password
|string
| ![](../../assets/check.svg "inline")
|Пароль пользователя
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — токен получен.
* 400 — некорректный запрос.
* 401 — отказано в доступе.

{caption(Пример ответа на запрос (код 200))[align=left;position=above]}
```json
{
  "token": "1mx6L2L7AMdEsyKy5LW9s8gt6mBxdICwosVn5sjhbwykOoQJFUru6752dwsj2THN"
}
```
{/caption}

#### {heading(Создать запись типа A)[id=integration_dns_record_type_a_create]}

Тип запроса: **POST**, путь `/api/v1/rr/A/`

{ifndef(cer)}
Запрос для создания записи типа A. Для ВМ используется первый адрес первого сетевого интерфейса, для балансировщика нагрузки — первый адрес VIP порта балансировщика.
{/ifndef}

{ifdef(cer)}
Запрос для создания записи типа A. Для ВМ используется первый адрес первого сетевого интерфейса.
{/ifdef}

{caption(Пример тела запроса)[align=left;position=above]}
```json
{
  "name": "project-vm.example.",
  "value": "192.168.193.7"
}
```
{/caption}

Описание параметров тела запроса приведено в {linkto(#tab_rra_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_rra_params]} — Описание параметров тела запроса для метода /api/v1/rr/A/)[align=right;position=above;id=tab_rra_params;number={const(numb_tab_rra_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|name
|string
| ![](../../assets/check.svg "inline")
|Доменное имя сетевого интерфейса объекта вида `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`

|value
|string
| ![](../../assets/check.svg "inline")
|IPv4-адрес, который соответствует доменному имени из параметра `name`
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — запись типа A создана.
* 400 — запись уже существует.

#### {heading(Удалить запись типа A)[id=integration_dns_record_type_a_delete]}

Тип запроса: **DELETE**, путь `/api/v1/rr/A/{fqdn}`

Запрос для удаления записи типа A, соответствующей доменному имени `fqdn`.

{caption(Пример запроса)[align=left;position=above]}
```curl
curl -X DELETE "https://<hostname>/api/v1/rr/A/site1.example.ru." -H "accept: application/json"
```
{/caption}

В методе используются параметры, приведенные в {linkto(#tab_del_rra_params)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_del_rra_params]} — Описание параметров (path) для метода /api/v1/rr/A/{fqdn})[align=right;position=above;id=tab_del_rra_params;number={const(numb_tab_del_rra_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательность
|Описание

|fqdn
|string
| ![](../../assets/check.svg "inline")
|Доменное имя, для которого нужно удалить соответствующую запись типа A
|===
{/caption}

В ответе метода используются HTTP-коды:

* 200 — удаление записи типа A выполнено.
* 404 — записи нет, либо она уже удалена.
