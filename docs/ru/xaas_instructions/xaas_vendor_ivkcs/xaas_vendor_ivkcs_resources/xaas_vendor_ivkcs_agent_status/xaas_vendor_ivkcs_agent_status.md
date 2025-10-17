# {appendix-heading(Ресурс ivkcs_agent_status)[id=xaas_vendor_ivkcs_agent_status; position=prefix]}

Аргументы ресурса `ivkcs_agent_status` приведены в {linkto(#tab_ivkcs_agent_status)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ivkcs_agent_status]} — Аргументы ресурса ivkcs_agent_status)[align=right;position=above;id=tab_ivkcs_agent_status;number={const(numb_tab_ivkcs_agent_status)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|uuid
|Идентификатор развертывания сервиса
|string
| ![](../../../../assets/check.svg "inline")

|host
|Имя хоста
|string
| ![](../../../../assets/check.svg "inline")
|===
{/caption}

Ресурс `ivkcs_agent_status` вычисляет аргумент `status` — статус агента на хосте, передаваемый в сервис управления конфигурациями. Возможные значения:

* `ok` — агент доступен.
* `running` — агент в процессе инициализации.
* `failed` — агент недоступен.

{caption(Пример ресурса `ivkcs_agent_status`)[align=left;position=above]}
```console
resource "ivkcs_agent_status" "status_host1" {
  uuid = "<UUID>"
  host = ["HOST1"]
  depends_on = [
    ivkcs_agent_init.init,
  ]
}
```
{/caption}