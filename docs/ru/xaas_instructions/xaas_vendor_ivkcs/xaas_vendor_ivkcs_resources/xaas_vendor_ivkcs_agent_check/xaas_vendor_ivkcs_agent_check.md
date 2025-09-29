# {appendix-heading(Ресурс ivkcs_agent_check)[id=xaas_vendor_ivkcs_agent_check; position=prefix]}

Аргументы ресурса `ivkcs_agent_check` приведены в {linkto(#tab_ivkcs_agent_check)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ivkcs_agent_check]} — Аргументы ресурса ivkcs_agent_check)[align=right;position=above;id=tab_ivkcs_agent_check;number={const(numb_tab_ivkcs_agent_check)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|uuid
|Идентификатор разворачивания сервиса
|string
|Да
|Да

|hosts
|Список имён хостов
|list, элементы списка — string
|Да
|Да
|===
{/caption}

В ресурсе указывается один или несколько способов мониторинга состояния инстансов сервиса. Поддерживаются следующие способы мониторинга:

* Проверка доступности порта — описывается в блоке {linkto(#port_health)[text=port_health]}.
* Проверка доступности адреса — описывается в блоке {linkto(#http_health)[text=http_health]}.
* Проверка доступности инстансов сервиса с использованием скриптов — описывается в блоке {linkto(#script_health)[text=script_health]}.

Ресурс `ivkcs_agent_check` вычисляет аргумент `hash` (формат string), который содержит хеш результата мониторинга для передачи в сервис управления конфигурациями.

{caption(Пример ресурса `ivkcs_agent_check`)[align=left;position=above]}
```bash
resource "ivkcs_agent_check" "check1" {
    uuid = "<UUID>"
	hosts = ["HOST"]

	http_health {
		protocol = "http"
		method = "GET"
		host = "127.0.0.1"
		path = "status"
		period = "1m"
		port = 11012
		http_codes = [200]
	}
}
```
{/caption}

## {appendix-heading(Блок port_health)[id=port_health; position=prefix]}

Каждый порт описывается отдельным блоком `port_health`.

Аргументы для блока `port_health` приведены в {linkto(#tab_port_health)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_port_health]} — Аргументы блока port_health)[align=right;position=above;id=tab_port_health;number={const(numb_tab_port_health)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|host
|IP-адрес или DNS-имя хоста
|string
|Да
|Да

|period
|Периодичность проверки доступности порта. Пример значений:

* `1m`.
* `15s`.
* `1h`

|string
|Да
|Да

|port
|Проверяемый порт
|integer
|Да
|Да
|===
{/caption}

## {appendix-heading(Блок http_health)[id=http_health; position=prefix]}

Каждая проверка адреса описывается отдельным блоком `http_health`.

Аргументы для блока `http_health` приведены в {linkto(#tab_http_health)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_http_health]} — Аргументы блока http_health)[align=right;position=above;id=tab_http_health;number={const(numb_tab_http_health)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|protocol
|Протокол запроса. Возможные значения:

* `http`.
* `https`

|string
|Да
|Да

|method
|Метод запроса. Возможные значения:

* `GET`.
* `POST`.
* `PUT`.
* `DELETE`.
* `OPTIONS`

|string
|Да
|Да

|host
|IP-адрес или DNS-имя хоста
|string
|Да
|Да

|path
|Путь запроса (конечная точка (endpoint) метода)
|string
|Нет
|Да

|period
|Периодичность проверки доступности адреса. Пример значений:

* `1m`.
* `15s`.
* `1h`

|string
|Да
|Да

|port
|Проверяемый порт
|integer
|Нет
|Да

|http_codes
|Ожидаемые коды ответа
|list, элементы списка — integer
|Да
|Да

|url
|Полный адрес, включающий:

* IP-адрес или DNS-имя хоста.
* Порт.
* Путь запроса (конечная точка (endpoint) метода)

|string
|Нет
|Да
|===
{/caption}

<warn>

Если указан аргумент `url`, его значение будет иметь приоритет над значениями в аргументах `host`, `path` и `port`.

</warn>

## {appendix-heading(Блок script_health)[id=script_health; position=prefix]}

Каждый скрипт описывается отдельным блоком `script_health`.

Аргументы для блока `script_health` приведены в {linkto(#tab_script_health)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_script_health]} — Аргументы блока script_health)[align=right;position=above;id=tab_script_health;number={const(numb_tab_script_health)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|type
|Язык скрипта. Возможные значения:

* `bash`.
* `python`

|string
|Да
|Да

|options
|Параметры выполнения скрипта
|set, аргументы списка — в таблице {linkto(../../../../xaas_instructions/xaas_vendor_ivkcs/xaas_vendor_ivkcs_resources/xaas_vendor_ivkcs_agent_exec#tab_script_options)[text=%full]}
|Нет
|Да

|script
|Тело скрипта
|string
|Да
|Да
|===
{/caption}