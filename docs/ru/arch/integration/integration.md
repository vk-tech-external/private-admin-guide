# {heading(Интеграция с внешними системами)[id=integration]}

<!--- //#todo провести техническое ревью раздела -->

<info>

Интеграция — синхронизация информации о пользовательских объектах {var(sys2)} с системой, развернутой Заказчиком самостоятельно (например, AD, DNS и прочими).

</info>

Интеграция осуществляется со стороны {var(sys2)} с помощью вызова REST API специальных сервисов. Специальные сервисы перенаправляют запросы в систему Заказчика.

{var(sys1)} обеспечивает доставку актуальной информации в специальные сервисы с возможной небольшой задержкой (позволяющей, например, начать вручную использовать созданную вручную ВМ по DNS-имени). Специальные сервисы разрабатываются под инфраструктуру Заказчика так, чтобы транслировать вызовы API {var(sys2)} в форматы, понятные системам Заказчика, и передавать их по корректным адресам.

{var(sys1)} выполняет логирование интеграции. Логи доступны администраторам по общим правилам доступа к логам в {var(sys6)}.

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
   * Изменение параметров сети (например, IP-адресов).
   
1. При недоступности специальных сервисов синхронизации или других проблемах обработки изменений синхронизация может не выполниться.
1. Интеграция Kubernetes Ingress с DNS не реализована.

<!--- //Балансировщики нагрузки Kubernetеs не получают DNS-имя, поскольку Kubernetеs создает VIP сетевой интерфейс со стандартным DNS именем (host-<ip>), в том числе стандартный ingress controller. Поэтому DNS-доступа к пользовательским сервисам в Kubernetеs нет -->

<!--- //#todo Уточнить, имеется ли ограничение по количеству интерфейсов, синхронизируемых с CMDB? (только первый) -->

<!---

== CMDB

Отправляет данные о ВМ, включающую информацию о дисках и сетях ВМ.

Структурно информация представляет собой один словарь. При создании ВМ словарь отправляется со всеми данными. При изменениях каких-либо объектов, влияющих на информацию о ВМ, посылаемый словарь может содержать только данные, связанные с изменившимися объектами. При удалении ВМ отправляется обновление информации о ВМ с соответствующим статусом.

На информацию о ВМ оказывают влияние следующие действия пользователей:

* Создание/удаление ВМ.
* Изменение объема ВМ.
* Включение/отключение ВМ.
* Подключение/отключение/замена диска.
* Изменение объема диска.
* Подключение/отключение сетевого интерфейса.
* Переименование сетевого интерфейса, в том числе приватного DNS-имени.
* Создание/изменение/масштабирование/удаление объектов PaaS.

[WARNING]
====
Информация о ВМ не отсылается, если:

* У ВМ отсутствуют сетевые интерфейсы.
* ВМ принадлежит настраиваемому списку игнорируемых проектов.
====

=== Информация о ВМ

Ниже в таблице {counter:table-number} под настройками понимаются настройки системы синхронизации, доступные к конфигурированию на этапах развертывания и сопровождения.

// параметры таблицы ниже повторяются в API-методах: нужно ли дублировать таблицу (аналогично для остальных разделов)

[caption= 'Таблица {counter:table-number} — ']
.Параметры ВМ
[cols="2,5"]
|===
|Параметр |Описание

|Status
|Статус ВМ на гипервизоре. Рассчитывается маппингом по настроечной таблице исходя из состояния ВМ на гипервизоре `OS-EXT-STS:vm_state` или факта удаленности ВМ

|PlatformID
|Идентификатор ВМ в облаке

|Project
|Заголовок (название) проекта ВМ (из IAM)
//#todo Уточнить что имелось ввиду под заголовком - pid (mcs123456) или задаваемое название ?

|Contact
|Имя пользователя (из Keystone), создавшего ВМ, с заданным в настройках суффиксом

|Cluster
|Зона доступности (availability zone) ВМ

|RAM
|Объем оперативной памяти ВМ, округленный до ГБ в меньшую сторону

|CPUCores
|Количество процессоров ВМ

|CPUSockets
|Количество сокетов ВМ

|HDDCurrentValue
|Объем всех дисков, подключенных к ВМ, плюс размер корневого эфемерного диска, если используется

|SoftwareName
|Значение метаданных `os_full_name` корневого диска. В случае ее отсутствия — `os_type`. В случае и ее отсутствия — значение из настройки. Должно начинаться с заглавной буквы

|j.network
|Информация о сетевых интерфейсах ВМ. Массив. Описание приведено в таблице {counter:table-number}

|NetworkName
a|Доменное имя первого сетевого интерфейса ВМ (`hostname`) без конечной точки (FQDN). Является строкой в формате `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`:

* Заголовок проекта берется из IAM.
* Длина имени интерфейса до первой точки обрезается до 15 символов.
* Домен берется из настроек сети сетевого интерфейса

|InstanceType
|Принадлежность ВМ тому или иному контуру сети. Рассчитывается маппингом по настроечной таблице исходя из `provider:segmentation_id` сети первого сетевого интерфейса ВМ

|ManagementIP
|Первый приватный адрес первого сетевого интерфейса ВМ
|===

=== Информация о сетевом интерфейсе ВМ

[caption= 'Таблица {counter:table-number} — ']
.Параметры массива `j.network`
[cols="2,5"]
|===
|Параметр |Описание

|NetworkInterfaceIP
|IP-адрес первого IPv4 сетевого интерфейса в приватной сети

|NetworkInterfaceMAC
|MAC-адрес интерфейса

|NetworkInterfaceName
|Имя сетевого интерфейса (имя в OpenStack)

|NetworkInterfaceVLAN
|Рассчитывается как `VLAN_` + `provider:segmentation_id`

|NetworkInterfaceMask
|Маска сети
|===

=== Определение статуса ВМ

Статус ВМ определяется в зависимости от статуса объекта Nova instance (поле `OS-EXT-STS:vm_state`). Описание приведено в таблице {counter:table-number}.

[caption= 'Таблица {counter:table-number} — ']
.Статусы объектов
|===
|Статус объекта Nova instance |Результирующий статус

|active
|В работе

|stopped
|Остановлен

|shelved
|Остановлен

|shelved_offloaded
|Остановлен

|deleted
|Остановлен
|===

При любых других статусах выставляется статус *В работе*. Все статусы и их соответствия, значение по умолчанию настраиваются в конфигурационном файле.

=== Описание методов API

==== Отправить информацию о ВМ

Тип запроса: **POST**, путь `/devicesoftwarehostvms`

Запрос посылается после создания ВМ, тело запроса имеет всю информацию о дисках и сетях созданной ВМ.

.Пример тела запроса (body request)
[source, json]
----
{
  "devicesoftwarehostvm": {
    "Status": "В работе",
    "PlatformID": "1AAAAAA1-2222-BBBB-FFFF-999999999999",
    "Project": "demo",
    "Contact": "user@example.ru",
    "Cluster": "nova",
    "RAM": 1,
    "CPUCores": 1,
    "CPUSockets": 1,
    "HDDCurrentValue": 1,
    "SoftwareName": "Linux",
    "j.network": [
      {
        "NetworkInterfaceIP": "10.0.0.7",
        "NetworkInterfaceMAC": "fa:16:3e:1a:28:69",
        "NetworkInterfaceName": "",
        "NetworkInterfaceVLAN": "VLAN1085",
        "NetworkInterfaceMask": "255.255.255.192"
      }
    ],
    "NetworkName": "demo-test-insta.skf.",
    "InstanceType": "TEST",
    "ManagementIP": "10.0.0.7"
  }
}
----

Описание параметров тела запроса приведено в таблице {counter:table-number}.

[caption= 'Таблица {counter:table-number} — ']
.Описание параметров тела запроса для метода `/devicesoftwarehostvms`
[cols="3,2,1,4"]
|===
|Поле |Тип |Обязательный |Описание

|devicesoftwarehostvm
|object
| ![](../../assets/check.svg "inline")
|Информация о ВМ. Посылаемый словарь может содержать только данные, связанные с изменившимися объектами. При удалении ВМ отправляются только `PlatformID` и `Status`, соответствующий удалению

|Status
|string
| ![](../../assets/no.svg "inline")
|Текущий статус ВМ. Например: *В работе*, *Остановлен*

|PlatformID
|string
| ![](../../assets/check.svg "inline")
a|Основной идентификатор ВМ в облаке. Представляется собой UUID, соответствующий `instance id` из сервиса Nova

|Project
|string
| ![](../../assets/no.svg "inline")
|Имя проекта, которому принадлежит ВМ

|Contact
|string
| ![](../../assets/no.svg "inline")
|Имя пользователя, создавшего ВМ, может быть в формате адреса электронной почты

|Cluster
|string
| ![](../../assets/no.svg "inline")
|Зона доступности (availability zone) кластера

|RAM
|integer
| ![](../../assets/no.svg "inline")
|Объем оперативной памяти, выделенной для ВМ, округленный до ГБ в меньшую сторону. Формат — гигабайты

|CPUCores
|integer
| ![](../../assets/no.svg "inline")
|Количество выделенных для ВМ процессорных ядер

|CPUSockets
|integer
| ![](../../assets/no.svg "inline")
|Количество выделенных для ВМ виртуальных сокетов

|HDDCurrentValue
|integer
| ![](../../assets/no.svg "inline")
|Объем выделенного для ВМ дискового пространства. Формат — гигабайты

|SoftwareName
|string
| ![](../../assets/no.svg "inline")
|Название ПО, запущенного на ВМ. Например, тип операционной системы: Windows, Linux. Может включать в себя любые символы, начинается с заглавной буквы

|j.network
|array[object]
| ![](../../assets/no.svg "inline")
|Список данных (IP, MAC, имя, VLAN, маска) по каждому сетевому интерфейсу. В массиве содержится столько элементов, сколько сетевых интерфейсов у ВМ, каждый элемент соответствует данным об одном сетевом интерфейсе

|NetworkInterfaceIP
|string
| ![](../../assets/check.svg "inline")
|IP-адрес первого IPv4 сетевого интерфейса в приватной сети

|NetworkInterfaceMAC
|string
| ![](../../assets/check.svg "inline")
|MAC-адрес первого сетевого интерфейса. Используется поле `mac_address` объекта `Neutron port`

|NetworkInterfaceName
|string
| ![](../../assets/check.svg "inline")
|Имя первого сетевого интерфейса. Используется поле `name` объекта `Neutron port`, может не совпадать с DNS-именем

|NetworkInterfaceVLAN
|string
| ![](../../assets/check.svg "inline")
|Строковое значение, VLAN-tag виртуальной сети, в которой расположен сетевой интерфейс. Формат — `VLAN<vlan_tag>`. Используется поле `provider:segmentation_id` объекта `Neutron network`

|NetworkInterfaceMask
|string
| ![](../../assets/check.svg "inline")
|Маска первого сетевого интерфейса. Вычисляется на основе CIDR виртуальной подсети, в которой расположен сетевой интерфейс

|NetworkName
|string
| ![](../../assets/no.svg "inline")
|Доменное имя первого сетевого интерфейса

|InstanceType
|string
| ![](../../assets/no.svg "inline")
|Тип ВМ, например `TEST`, `Dev`, `UNKNOWN`, `Staging\Preprod`, `Prod`

|ManagementIP
|string
| ![](../../assets/no.svg "inline")
|Первый приватный адрес первого сетевого интерфейса ВМ. Формат — строка IPv4
|===

В ответе метода используются следующие HTTP-коды:

* 200 — данные успешно отправлены.

==== Обновить информацию о ВМ

Тип запроса: **PUT**, путь `/devicesoftwarehostvms/\{platform_id}`

Запрос отправляется при каких-либо изменениях в конфигурации ВМ, соответствующей `platform_id`. В том числе об удалении ВМ, в таком случае в теле запроса будут только `PlatformID` и `Status`, соответствующий удалению.

.Пример запроса
[source, curl]
----
curl -X PUT "https://<hostname>/devicesoftwarehostvms/27f14fac-5952-48c1-8d5c-1545d4d2e6b2" -H "accept: application/json"
----

В методе используются параметры, приведенные в таблице {counter:table-number}.

[caption= 'Таблица {counter:table-number} — ']
.Описание параметров (path) для метода `/devicesoftwarehostvms/\{platform_id}`
[cols="2,2,1,4"]
|===
|Поле |Тип |Обязательный |Описание

|platform_id
|string
| ![](../../assets/check.svg "inline")
|Идентификатор ВМ в облаке
|===

В ответе метода используются следующие HTTP-коды:

* 200 — данные успешно отправлены.
* 404 — указанной ВМ не существует.

.Пример ответа на запрос (обновление информации о конфигурации)
[source, json]
----
{
  "devicesoftwarehostvm": {
    "PlatformID": "1AAAAAA1-2222-BBBB-FFFF-999999999999",
    "Status": "В работе",
    "j.network": [
      {
        "NetworkInterfaceIP": "10.0.0.7",
        "NetworkInterfaceMAC": "fa:16:3e:1a:28:69",
        "NetworkInterfaceName": "",
        "NetworkInterfaceVLAN": "VLAN1085",
        "NetworkInterfaceMask": "255.255.255.192"
      }
    ],
    "NetworkName": "demo-test-insta.skf.",
    "InstanceType": "TEST",
    "ManagementIP": "10.0.0.7"
  }
}
----

.Пример ответа на запрос (ВМ удалена)
[source, json]
----
{
  "devicesoftwarehostvm": {
    "PlatformID": "27f14fac-5952-48c1-8d5c-1545d4d2e6b2",
    "Status": "Остановлен"
  }
}
----

[WARNING]
====
Если в ответ на PUT-запрос по каким-то причинам вернется ошибка `404 Not Found`, то совершается попытка сделать POST-запрос с тем же телом.
====

-->

{ifdef(box)}

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
|Доменное имя первого сетевого интерфейса ВМ (`hostname`) без конечной точки (FQDN). Cтрока в формате `<ЗАГОЛОВОК_ПРОЕКТА>-<DNS_ИМЯ_ИНТЕРФЕЙСА>.<DNS_ДОМЕН>.`. Здесь:

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
|Обязательный
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
|Обязательный
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

{caption(Таблица {counter(table)[id=numb_tab_delete_group_params]} — Описание параметров (path) для метода /api/v1/groups/\{hostname})[align=right;position=above;id=tab_delete_group_params;number={const(numb_tab_delete_group_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательный
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
|Обязательный
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

{caption(Таблица {counter(table)[id=numb_tab_computer_var]} — Описание параметров (path) для метода /api/v1/computer/\{hostname})[align=right;position=above;id=tab_computer_var;number={const(numb_tab_computer_var)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательный
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

Структурно информация, передаваемая в целевые DNS, состоит из словаря (таблица 8). При создании объекта создается DNS-информация, при удалении — удаляется, при изменении — удаляется и создается новая.

{caption(Таблица {counter(table)[id=numb_tab_dns_params]} — Параметры DNS)[align=right;position=above;id=tab_dns_params;number={const(numb_tab_dns_params)}]}
[cols="1,2", options="header"]
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
* Создание/масштабирование/удаление PaaS объектов (например, кластеров/инстансов DBaaS, кластеров KaaS).
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
|Обязательный
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
|Обязательный
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

{caption(Таблица {counter(table)[id=numb_tab_del_rra_params]} — Описание параметров (path) для метода /api/v1/rr/A/\{fqdn})[align=right;position=above;id=tab_del_rra_params;number={const(numb_tab_del_rra_params)}]}
[cols="2,2,2,4", options="header"]
|===
|Поле
|Тип
|Обязательный
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
