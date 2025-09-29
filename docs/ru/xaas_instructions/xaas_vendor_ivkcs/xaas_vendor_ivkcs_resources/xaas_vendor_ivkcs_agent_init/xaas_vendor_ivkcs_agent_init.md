# {appendix-heading(Ресурс ivkcs_agent_init)[id=xaas_vendor_ivkcs_agent_init; position=prefix]}

Аргументы ресурса `ivkcs_agent_init` приведены в {linkto(#tab_ivkcs_agent_init)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ivkcs_agent_init]} — Аргументы ресурса ivkcs_agent_init)[align=right;position=above;id=tab_ivkcs_agent_init;number={const(numb_tab_ivkcs_agent_init)}]}
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
|Нет

|hosts
|Список имён хостов для инициализации агента
|list, элементы списка — string
|Да
|Да

|options
|Опции агента
|set, аргументы списка — в {linkto(#tab_agent_options)[text=таблице %number]}
|Нет
|Нет
|===
{/caption}

{caption(Таблица {counter(table)[id=numb_tab_agent_options]} — Опции инициализации агента)[align=right;position=above;id=tab_agent_options;number={const(numb_tab_agent_options)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Значение по умолчанию

|memory_limit
|Ограничение оперативной памяти, используемой для агента, МБ
|integer
|`256`
|===
{/caption}

Ресурс `ivkcs_agent_init` вычисляет аргумент `agent` (формат map). Ключами аргумента являются имена хостов, значением — Bash-скрипт. Функции bash-скрипта:

* Запрашивает агент у сервиса управления конфигурациями.
* Скачивает агент и устанавливает его на хосты.
* Выдает хостам ключи доступа в сервис управления конфигурациями.

{caption(Пример ресурса ivkcs_agent_init)[align=left;position=above]}
```bash
resource "ivkcs_agent_init" "init" {
	uuid = "<UUID>"
	hosts = ["HOST"]
	options {
		memory_limit = 512
	}
}
```
{/caption}