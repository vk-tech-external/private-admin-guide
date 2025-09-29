# {appendix-heading(Ресурс ivkcs_compute_instance_reboot)[id=xaas_vendor_ivkcs_compute_instance_reboot; position=prefix]}

Аргумент ресурса `ivkcs_compute_instance_reboot` приведён в {linkto(#tab_ivkcs_compute_instance_reboot)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_ivkcs_compute_instance_reboot]} — Аргумент ресурса ivkcs_compute_instance_reboot)[align=right;position=above;id=tab_ivkcs_compute_instance_reboot;number={const(numb_tab_ivkcs_compute_instance_reboot)}]}
[cols="2,5,2,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный
|Пересоздание ресурса при изменении значения

|instance
|ID хоста, который будет перезагружен.

ID вычисляется ресурсом, создающим хост (ресурс `vkcs_compute_instance` провайдера VK CS)
|string
| ![](../../../../assets/check.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===
{/caption}

{caption(Пример ресурса ivkcs_compute_instance_reboot)[align=left;position=above]}
```console
resource "ivkcs_compute_instance_reboot" "init" {
	instance = vkcs_compute_instance.<RESOURCE_NAME>.id
}
```
{/caption}