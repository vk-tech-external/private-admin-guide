# {appendix-heading(Источники данных)[id=xaas_vendor_ivkcs_datasources; position=prefix]}

Провайдер iVK CS предоставляет источник данных `ivkcs_agent_script_result` — получение форматированного результата скрипта, выполненного в агенте. Позволяет получить данные в процессе разворачивания сервиса, передать их в Terraform и использовать в дальнейших действиях для разворачивания сервиса.

Аргументы источника данных `ivkcs_agent_script_result` приведены в {linkto(#tab_ivkcs_agent_script_result)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ivkcs_agent_script_result]} — Аргументы источника данных ivkcs_agent_script_result)[align=right;position=above;id=tab_ivkcs_agent_script_result;number={const(numb_tab_ivkcs_agent_script_result)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|uuid
|Идентификатор разворачивания сервиса
|string
|Да

|host
|Имя хоста, где был выполнен скрипт. Соответствует имени, указанному в аргументе `hosts` ресурса `ivkcs_agent_exec`
|string
|Да

|group
|Имя группы скриптов. Соответствует значению аргумента `name` ресурса `ivkcs_agent_exec`
|string
|Да

|index
|Индекс скрипта. Соответствует значению аргумента `step.index` ресурса `ivkcs_agent_exec`
|integer
|Да
|===
{/caption}

Источник данных `ivkcs_agent_script_result` вычисляет аргументы:

* `result` — результат выполнения скрипта.
* `structured_result` — форматированный результат выполнения скрипта.

{caption(Пример источника данных `ivkcs_agent_script_result`)[align=left;position=above]}
```bash
data "ivkcs_agent_script_result" "step_1_result" {
  uuid  = var.instance_uuid
  host  = local.hosts_names[0]
  group = ivkcs_agent_exec.start.name
  index = 1

  depends_on = [
    ivkcs_agent_exec.start
  ]
}
```
{/caption}