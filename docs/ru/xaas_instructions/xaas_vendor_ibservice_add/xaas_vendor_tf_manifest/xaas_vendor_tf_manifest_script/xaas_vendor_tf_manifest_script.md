# {appendix-heading(Использование скриптов)[id=xaas_vendor_tf_manifest_script; position=prefix]}

Скрипты позволяют выполнить различные операции в процессе разворачивания сервиса (например, синхронизировать узлы при объединении в кластер).

В процессе разворачивания сервиса агент передает хеш выполненных скриптов в сервис управления конфигурациями. Это позволяет оценить текущее состояние ВМ с инстансом сервиса (какие скрипты выполнены на текущий момент) и привести его к состоянию, описанному в манифесте Terraform.

Агент передает сервису управления конфигурациями статус скриптов. Возможные статусы:

* `ok` — скрипт выполнен успешно.
* `running` — скрипт выполняется.
* `failed` — скрипт завершен с ошибкой. Если получен статус `failed`, система развёртывания будет пробовать перезапустить разворачивание сервиса. Процесс повторных запусков может занимать до 1,5 ч.

   Просмотр логов агента описан в разделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_deploysystemtest#deploysystemtest_agent)[text=%text]}.

Результаты выполнения скриптов можно передать в сервис управления конфигурациями в форматированном виде и использовать при выполнении других скриптов.

Чтобы использовать скрипты при разворачивании сервиса:

1. Получите данные для инициализации агента на ВМ. Используйте ресурс `ivkcs_agent_init`.

   <info>

   Используйте опцию `options.memory_limit` в ресурсе `ivkcs_agent_init`, чтобы ограничить оперативную память для агента.

   </info>

   {caption(Пример получения данных для агента на ВМ)[align=left;position=above]}
   ```bash
   # Идентификатор разворачивания сервиса
   variable "instance_uuid" {
     type    = string
   }

   resource "ivkcs_agent_init" "init" {
     # Идентификатор разворачивания сервиса
     uuid = var.instance_uuid
     # Имена хостов, где будет установлен агент
     hosts = ["HOST"]
     options {
       # Ограничение оперативной памяти
       memory_limit = 256
     }
   }
   ```
   {/caption}

1. Инициализируйте агент на ВМ с помощью переменной `user_data` в ресурсе `vkcs_compute_instance`:

   ```bash
   resource "vkcs_compute_instance" "compute" {
   ...
     user_data = ivkcs_agent_init.init.agent[<HOST_NUMBER>]
   }
   ```

   где `<HOST_NUMBER>` — номер хоста. Если сервис разворачивается на одной ВМ, укажите `0`.

1. Во входных переменных опишите содержимое скриптов. Поддерживаются языки Bash или Python.

   <info>

   Содержимое скриптов можно описать на следующем шаге без использования входных переменных.

   </info>
   
1. Опишите порядок и настройки выполнения скриптов. Используйте ресурс `ivkcs_agent_exec` или блок `locals`.

   Для каждого скрипта можно определить опции, описанные в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ivkcs/xaas_vendor_ivkcs_resources/xaas_vendor_ivkcs_agent_exec#xaas_vendor_ivkcs_agent_exec)[text=%text]} (например, тайм-аут выполнения, количество попыток выполнения скрипта до определения его статуса как `failed`).

1. Если требуется получить результаты скриптов, чтобы использовать их в выходных параметрах (подробнее — в разделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_tf_manifest/xaas_vendor_tf_manifest_output#xaas_vendor_tf_manifest_output)[text=%text]}) или в других ресурсах манифеста, используйте источник данных `ivkcs_agent_script_result`.

<info>

Ресурсы и источники данных описаны в разделах {linkto(../../../../xaas_instructions/xaas_vendor_ivkcs/xaas_vendor_ivkcs_resources/xaas_vendor_ivkcs_resources_list#xaas_vendor_ivkcs_resources_list)[text=%text]}, {linkto(../../../../xaas_instructions/xaas_vendor_ivkcs/xaas_vendor_ivkcs_datasources#xaas_vendor_ivkcs_datasources)[text=%text]}.

</info>

В разделе {linkto(../../../../xaas_instructions/xaas_vendor_tf_manifest_example#xaas_vendor_tf_manifest_example)[text=%text]} приведён пример манифеста для разворачивания сервиса Redis с применением скриптов.