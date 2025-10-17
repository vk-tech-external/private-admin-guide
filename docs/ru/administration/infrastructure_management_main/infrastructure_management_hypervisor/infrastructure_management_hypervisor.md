# {heading(Управление вычислительными узлами (гипервизорами))[id=infrastructure_management_hypervisor]}

<!--- #todo на раздел есть ссылка в Руководстве по обновлению Private Cloud. -->
<!--- #todo на раздел есть ссылка в Руководстве по установке Private Cloud. -->

Вычислительные узлы (гипервизоры, compute node) — выделенные серверы с настроенным гипервизором KVM, обслуживающие запущенные экземпляры ВМ.

Каждый вычислительный узел имеет установленную на жесткие диски ОС, настроенный гипервизор KVM, настроенные модули поддержки SDS Ceph и/или СХД, и агенты для работы с сетевой подсистемой.

<info>

Системное время серверов синхронизируется с источниками точного времени, расположенными в сети Заказчика.

</info>

## {heading(Просмотр списка вычислительных узлов)[id=hypervisor_view_list]}

Чтобы просмотреть список вычислительных узлов, используйте один из интерфейсов:

* Портал администратора.
* OpenStack CLI.

### {heading(Портал администратора)[id=hypervisor_sa_view_list]}

Чтобы просмотреть список вычислительных узлов через Портал администратора, перейдите в раздел **Администрирование** → **Вычислительные узлы**.

### {heading(OpenStack CLI)[id=cli_hypervisor_list]}

Чтобы просмотреть список вычислительных узлов с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробности — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команды:

   ```console
   # openstack hypervisor list
   # openstack compute service list --service nova-compute --long
   ```

<warn>

Для выполнения этой операции требуются права Суперадминистратора.

</warn>

### {heading(Просмотр доступных ресурсов на вычислительном узле в кластере)[id=hypervisor_view_list_in_cluster]}

Чтобы просмотреть доступные ресурсы на вычислительном узле в кластере, используйте один из интерфейсов:

* Портал администратора.
* OpenStack CLI.

### {heading(Портал администратора)[id=hypervisor_sa_view_list_in_cluster]}

Чтобы просмотреть доступные ресурсы на вычислительном узле в кластере через Портал администратора перейдите в раздел **Администрирование** → **Вычислительные узлы**:

* Тип данных **Кешированные данные** (чтобы изменить тип данных, нажмите на значок слева от поля поиска и выберите **Кешированные данные**):

   * `cpu_idle` — текущая загрузка ЦПУ.
   * `free_mem` — количество свободной памяти.
   * `status` — текущее состояние вычислительного узла.
   * `running_vms` — количество инстансов на вычислительном узле.

* Тип данных **Реальные данные**:

   * `Зона доступности` — вычислительный узел.
   * `vCPUs` — количество используемых vCPU и всех vCPU вычислительного узла.
   * `RAM` — используемая (аллоцированная) и суммарная память.
   * `Диск` — использование локального диска вычислительного узла с указанием общего объема.
   * `Инстансы` — количество инстансов на вычислительном узле.
   * `Состояние` — текущее состояние вычислительного узла.

### {heading(OpenStack CLI)[id=hypervisor_cli_view_list_in_cluster]}

Чтобы просмотреть доступные ресурсы на вычислительном узле в кластере с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробности — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   ```console
   # openstack hypervisor show <ID_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>
   ```

Чтобы получить общую статистику по всем вычислительным узлам, выполните команду:

```console
# openstack hypervisor stats show
```

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
+----------------------+--------+
| Field                | Value  |
+----------------------+--------+
| count                | 2      |
| current_workload     | 1      |
| disk_available_least | 37806  |
| free_disk_gb         | 38453  |
| free_ram_mb          | 111499 |
| local_gb             | 39788  |
| local_gb_used        | 1335   |
| memory_mb            | 390027 |
| memory_mb_used       | 278528 |
| running_vms          | 49     |
| vcpus                | 48     |
| vcpus_used           | 140    |
+----------------------+--------+
```
{/caption}

{ifdef(box, pg)}
## {heading(Изменение параметров перезаписи CPU и RAM вычислительного узла)[id=hypervisor_cpu]}

Чтобы перезаписать параметры CPU и RAM вычислительного узла:

1. Подключитесь к вычислительному узлу.

1. Откройте файл `/etc/nova/nova.conf` и в разделе `default` внесите необходимые изменения в параметрах `cpu_allocation_ratio` и `ram_allocation_ratio`.

1. Перезапустите сервис Nova:

   ```console
   # sudo systemctl restart openstack-nova-compute.service
   ```
{/ifdef}

## {heading(Вывод вычислительного узла из кластера)[id=hypervisor_maintenance]}

Для обслуживания вычислительного узла предусмотрен механизм его временного отключения из кластера.

Чтобы вывести вычислительный узел из кластера:

1. В Портале мониторинга установите период технического обслуживания (Maintenance periods) для отключаемого вычислительного узла:

   1. Перейдите в раздел **Configuration** → **Maintenance**.
   1. В верхнем правом углу нажмите кнопку **Create maintenance period**.
   1. Задайте параметры:

      * **Name** — название периода. Обязательное поле.
      * **Maintenance type** — тип периода:

         * **With data collection** — со сбором данных.
         * **No data collection** — без сбора данных.

      * **Active since** — начало активности периода технического обслуживания. Обязательное поле.
      * **Active till** — конец активности периода технического обслуживания. Обязательное поле.
      * **Periods** — нажмите на ссылку **Add** в таблице **Periods**. В открывшемся окне укажите периодичность и продолжительность периода технического обслуживания и нажмите кнопку **Add**.
      * **Host groups** — группы хостов. Нажмите кнопку **Select** справа от названия, выберите пункты списка и нажмите кнопку **Select**. Выберите из списка вычислительный узел, который необходимо вывести из кластера.
      * **Hosts** — хосты. Нажмите кнопку **Select** справа от названия, выберите пункты списка и нажмите кнопку **Select**.
      * **Tags** — поиск по тегам.

   1. Нажмите кнопку **Add** в нижней части вкладки. На странице **Maintenance periods** появится новая запись.

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. С помощью OpenStack CLI уточните текущий список и статус вычислительных узлов (подробнее — в разделе {linkto(#cli_hypervisor_list)[text=%text]}):

   ```console
   # openstack compute service list --service nova-compute --long
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   +----+--------------+--------+------+---------+-------+----------------------------+-----------------+
   | ID | Binary       | Host   | Zone | Status  | State | Updated At                 | Disabled Reason |
   +----+--------------+--------+------+---------+-------+----------------------------+-----------------+
   | 74 | nova-compute | kcn002 | AZ1  | enabled | up    | 2022-05-23T14:08:13.000000 | None            |
   | 77 | nova-compute | kcn001 | AZ1  | enabled | up    | 2022-05-23T14:08:11.000000 | None            |
   +----+--------------+--------+------+---------+-------+----------------------------+-----------------+
   ```
   {/caption}
         
1. Отключите возможность запуска новых ВМ на вычислительном узле:

   ```console
   # openstack compute service set --disable --disable-reason "maintenance" <НАЗВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> nova-compute
   ```

   Статус вычислительного узла изменится на `disabled`, в столбце **Disabled Reason** появится значение `maintenance`.

{ifndef(cer)}
1. Для всех ВМ, запущенных на вычислительном узле, выводимом из кластера, выполните миграцию (подробности приведены в разделе {linkto(../../../iaas_main/iaas_vm/iaas_vm_migration/migration_vm#migration_vm)[text=%text]}).
{/ifndef}

{ifdef(cer)}
1. Для всех ВМ, запущенных на вычислительном узле, выводимом из кластера, выполните миграцию.
{/ifdef}

1. Убедитесь, что миграция ВМ завершилась успешно и на вычислительном узле нет запущенных ВМ:

   ```console
   # openstack server list --host <НАЗВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> --all-projects
   ```

1. Перейдите на отключаемый вычислительный узел по SSH.
1. Остановите сервисы Nova и Neutron агентов:

   ```console
   # systemctl stop openstack-nova-compute.service
   # systemctl stop neutron-l3-agent.service neutron-metadata-agent.service neutron-openvswitch-agent.service
   ```

После успешного выполнения вышеописанных шагов вычислительный узел можно отключить от сети, отключить питание и выполнить работы по ремонту/модернизации.

## {heading(Включение вычислительного узла)[id=hypervisor_inclusion]}

<warn>

После завершения работ по ремонту/модернизации вычислительного узла заново подключите его к кластеру.

</warn>

Чтобы включить вычислительный узел:

1. Убедитесь, что вычислительный узел физически включен и выполнен автоматический запуск сервисов.
1. Перейдите на включенный вычислительный узел по SSH.
1. Проверьте состояние сервисов Nova и Neutron агентов на вычислительном узле:

   ```console
   $ systemctl --all | grep -E "nova|neutron"
   ```

   Найденные сервисы должны быть в статусах `active` и `running`.
1. Если состояние сервисов отличается от указанных на предыдущем шаге, запустите сервисы Nova и Neutron агентов:

   ```console
   $ systemctl start openstack-nova-compute.service
   $ systemctl start neutron-l3-agent.service neutron-metadata-agent.service neutron-openvswitch-agent.service
   ```
   
1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Включите возможность запуска ВМ на вычислительном узле:

   ```console
   # openstack compute service set --enable <НАЗВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> nova-compute
   ```
 
1. Уточните текущий список и статус запущенного вычислительного узла (подробнее — в разделе {linkto(#cli_hypervisor_list)[text=%text]}). Ожидаемые значения в колонке **Status** — `enabled`, в колонке **State** — `up`.

{ifndef(cer)}
1. При необходимости выполните миграцию ВМ для разгрузки запущенных вычислительных узлов на ранее включенный узел (подробнее — в разделе {linkto(../../../iaas_main/iaas_vm/iaas_vm_migration/migration_vm#migration_vm)[text=%text]}).
{/ifndef}

{ifdef(cer)}
1. При необходимости выполните миграцию ВМ для разгрузки запущенных вычислительных узлов на ранее включенный узел.
{/ifdef}

## {heading(Закрепление вычислительного узла за проектом)[id=dedicated_compute_node]}

Вычислительные узлы по умолчанию могут быть использованы для обеспечения ресурсов любых ВМ, для которых указана соответствующая зона доступности (availability zone). Для этого в данную зону доступности должен входить агрегат узлов (Host aggregate), к которому относится вычислительный узел.

Иерархия сущностей упрощенно может быть представлена:

* Зона доступности.

   * Агрегат узлов.

      * Вычислительный узел.


На {ifdef(box, pg)}{var(sys3)}{/ifdef}{ifndef(box, pg)}{var(sys3_go)}{/ifndef} существует возможность ограничить использование вычислительного узла одним выбранным проектом/тенантом. Закрепление выделенного вычислительного узла за каким-либо проектом означает, что ресурсы данного узла будут доступны только в рамках этого проекта.

Чтобы закрепить вычислительный узел за проектом, используйте один из интерфейсов:

* Портал администратора.
* OpenStack CLI.

### {heading(Портал администратора)[id=dedicated_compute_node_sa]}

Чтобы закрепить вычислительный узел за проектом через Портал администратора:

1. Перейдите в раздел **Администрирование** → **Агрегаты узлов**.
1. Нажмите кнопку **Добавить**.
1. Задайте параметры:

   * **Имя** — название агрегата узлов.
   * **Зона доступности** — зона доступности для агрегата. Выбор из раскрывающегося списка.
   * **Доступные узлы** — список доступных узлов. Выбор из раскрывающегося списка.

1. Нажмите кнопку **Создание агрегата узлов**. Дождитесь завершения операции.
1. На странице **Агрегаты узлов** нажмите на значок слева от поля поиска и выберите вариант **Реальные данные** (по умолчанию показаны **Кешированные данные**).
1. Нажмите на значок **•••** напротив созданного агрегата и выберите пункт **Обновить метаданные**.
1. Нажмите кнопку **Редактировать**.
1. Задайте параметры метатегов:

   1. Нажмите кнопку **Добавить**.
   1. В поле **Имя** укажите значение `filter_tenant_id`.
   1. В поле **Значение** укажите UID проекта или тенанта.
   1. Нажмите кнопку **Сохранить изменения**.

Описанных выше действий достаточно, чтобы на вычислительном узле запускались ВМ только указанного проекта. При этом ВМ данного проекта смогут создаваться и на других вычислительных узлах.

### {heading(OpenStack CLI)[id=dedicated_compute_node_cli]}

Чтобы закрепить вычислительный узел за проектом с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Создайте новый агрегат узлов:

   ```console
   # openstack aggregate create --zone <ИМЯ_ЗОНЫ_ДОСТУПНОСТИ> NEW_AGG
   ```

1. Добавьте агрегату необходимый параметр:

   ```console
   # openstack aggregate set --property filter_tenant_id=<ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> NEW_AGG
   ```

1. Добавьте вычислительный узел в созданный агрегат узлов:

   ```console
   # openstack aggregate add host NEW_AGG <ИМЯ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>
   ```

Описанных выше действий достаточно, чтобы на вычислительном узле запускались ВМ только указанного проекта. При этом ВМ данного проекта смогут создаваться и на других вычислительных узлах.

Если необходимо, чтобы ВМ проекта запускались только на определенном вычислительном узле, нужно создать и использовать специальный тип ВМ (flavor) для проекта с параметром `aggregate_instance_extra_specs:filter_tenant_id`. Пример:

```console
# openstack flavor create --private --disk 10 --property aggregate_instance_extra_specs:filter_tenant_id=<ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> --ram 1024 --vcpus 1 --property mcs:cpu_type=standard --project <ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> Basic-1-1-SPEC
```

Для отображения данного типа ВМ в интерфейсе добавьте к агрегату узлов дополнительное свойство:

{caption(Добавление свойства mcs:cpu_type=standart для агрегата)[align=left;position=above]}
```console
# openstack aggregate set --property mcs:cpu_type=standart NEW_AGG
```
{/caption}

## {heading(Добавление нового вычислительного узла)[id=hypervisor_creating]}

Чтобы добавить новый вычислительный узел в кластер, выполните следующие шаги:

1. Подготовьте Ansible inventory (подробнее — в разделе {linkto(#ansible_inventory_preparing)[text=%text]}).
1. Запустите плейбуки Ansible (подробнее — в разделе {linkto(#ansible_playbooks_running)[text=%text]}).
1. Выполните проверку состояния сервисов (подробнее — в разделе {linkto(#services_status_checking)[text=%text]}).
1. Активируйте добавляемый вычислительный узел (подробнее — в разделе {linkto(#hypervisor_activate)[text=%text]}).
1. Проверьте статус вычислительного узла (подробнее — в разделе {linkto(#hypervisor_status_checking)[text=%text]}).
1. Добавьте вычислительный узел в мониторинг (подробнее — в разделе {linkto(#hypervisor_monitoring_adding)[text=%text]}).

{ifndef(cer)}
1. Выполните миграцию ВМ для разгрузки других вычислительных узлов при необходимости (подробнее — в разделе {linkto(../../../iaas_main/iaas_vm/iaas_vm_migration/migration_vm#migration_vm)[text=%text]}).
{/ifndef}

{ifdef(cer)}
1. Выполните миграцию ВМ для разгрузки других вычислительных узлов при необходимости.
{/ifdef}

Далее описаны шаги инструкции для каждого шага.

<warn>

В рамках данной инструкции будет рассмотрено добавление вычислительного узла `kcn002`.

</warn>

### {heading(Подготовка Ansible inventory)[id=ansible_inventory_preparing]}

1. Перейдите на деплой-ноду по SSH (подробнее — в разделе {linkto(../../../interfaces_access#deploy_host_auth)[text=%text]}).
1. В файл `~/inventory/vkcloud/vkcloud.yml` добавьте информацию о новом вычислительном узле в секцию `hosts`:

   ```yaml
      ...
   vkcloud_compute: 
     vars: null
     children:  
       vkcloud_compute_common:   
         children: 
           vkcloud_compute_common_az1:
             vars:
               az: '{{ availability_zone1 | upper }}'
             hosts:
               ...
               <NEW_HOST>: null
   ```

   Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

1. В файл `~/inventory/vkcloud/hosts.yml` добавьте информацию о новом вычислительном узле в секцию `compute`:

   ```yaml
   ...
   groups:
     ...
     compute:
       ...
       - <NEW_HOST>
   ```

   Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

### {heading(Запуск плейбуков Ansible)[id=ansible_playbooks_running]}

В директории `~/inventory/vkcloud` запустите плейбуки:

```console
$ ansible-playbook -i vkcloud.yml  -e env=vkcloud  ../ansible-openstack/playbooks/pred-deploy.yml --limit <NEW_HOST> --diff
$ ansible-playbook -i vkcloud.yml  -e env=vkcloud -e monitoringenable=false ../ansible-openstack/playbooks/common.yml -e limit=<NEW_HOST> --diff
$ ansible-playbook -i vkcloud.yml  -e env=vkcloud --tags monitoring ../ansible-openstack/playbooks/common.yml -e limit=<NEW_HOST> --diff
$ ansible-playbook -i vkcloud.yml  -e env=vkcloud -e bootstrap=true --skip-tags ceilometer_compute,common_monitoring ../ansible-openstack/playbooks/compute-deploy.yml --limit <NEW_HOST> --diff
```

Здесь:

* `vkcloud` — название окружения.
* `<NEW_HOST>` — название добавляемого вычислительного узла.

### {heading(Проверка состояния сервисов)[id=services_status_checking]}

1. Проверьте состояние системных сервисов:

   ```console
   $ systemctl --all | grep -E "nova|neutron"
   ```

   Сервисы должны быть в состоянии `active`, `running`.
   
1. Перейдите на управляющий узел с поддержкой OpenStack CLI (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Проверьте наличие и статус сервиса Nova для нового вычислительного узла:

   ```console
   # openstack compute service list --host <NEW_HOST>
   ```
   Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

1. Проверьте наличие и статус агентов Neutron для нового вычислительного узла:

   ```console
   # openstack network agent list --host <NEW_HOST>
   ```
   Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

### {heading(Активация вычислительного узла)[id=hypervisor_activate]}

<err>

Новый вычислительный узел добавляется в кластер в статусе `disabled`, `down`.

</err>

Чтобы активировать вычислительный узел, на управляющем узле с поддержкой OpenStack CLI выполните команды:

```console
# openstack compute service set --disable --disable-reason "Ready to start" <NEW_HOST> nova-compute
# openstack compute service set --enable <NEW_HOST> nova-compute
```

Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

### {heading(Проверка статуса активированного вычислительного узла)[id=hypervisor_status_checking]}

Выполните команду проверки статуса активированного вычислительного узла:

```console
# openstack compute service list --host <NEW_HOST> --long
```
Здесь `<NEW_HOST>` — название добавляемого вычислительного узла.

{caption(Пример вывода информации о вычислительном узле)[align=left;position=above]}
```console
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
| ID | Binary       | Host     | Zone | Status  | State | Updated At                 | Disabled Reason |
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
| 74 | nova-compute | kcn002   | AZ1  | enabled | up    | 2022-05-23T21:00:30.000000 | None            |
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
```
{/caption}

Если активация вычислительного узла прошла успешно, его статус изменится на `enabled`, `up`.

{ifdef(box, pg)}
### {heading(Добавление вычислительного узла в систему мониторинга)[id=hypervisor_monitoring_adding]}

1. В директории `~/inventory/vkcloud` запустите плейбук:

   ```console
   $ ansible-playbook -i vkcloud.yml  -e env=vkcloud -e zabbix_api4ansible=true ../ansible-openstack/playbooks/zabbix_configure_resources.yml --diff
   ```

   Здесь `vkcloud` — название окружения.

1. С помощью веб-браузера выполните вход в Портал мониторинга под учетной записью администратора {var(sys2)}.
1. Перейдите в раздел **Configuration** → **Hosts**.
1. Убедитесь, что вычислительный узел добавлен в систему мониторинга. Если нет, добавьте его:

   1. Из таблицы выберите любой рабочий хост, нажав на его имя. Пример: `kcn001`.
   1. В открывшемся окне нажмите кнопку **Clone**.
   1. В окне настроек нового вычислительного узла обновите значения полей:

      * **Host name** — название созданного вычислительного узла.
      * **Interfaces** → **Agent** — IP-адрес агента.
      * **Enabled** — признак активности. Установите флажок.

   1. Нажмите кнопку **Add**. Дождитесь изменения индикации надписи `[ZBX]` в столбце **Availability** на зеленый.
{/ifdef}

## {heading(Удаление вычислительного узла из кластера)[id=hypervisor_deleting]}

1. Выполните процедуру вывода вычислительного узла из кластера (подробнее — в разделе {linkto(#hypervisor_maintenance)[text=%text]}).
1. Удалите сервисы вычислительного узла из OpenStack (подробнее — в разделе {linkto(#hypervisor_openstack_delete)[text=%text]}).
1. Удалите вычислительный узел из Consul (подробнее — в разделе {linkto(#hypervisor_consul_delete)[text=%text]}).
1. Удалите IP вычислительного узла из списка анонсированных по BGP (подробнее — в разделе {linkto(#hypervisor_bgp_delete)[text=%text]}).
1. Удалите запись из Ansible inventory (подробнее — в разделе {linkto(#hypervisor_ansible_inventory_delete)[text=%text]}).

{ifndef(cer)}
1. Удалите вычислительный узел из системы мониторинга (подробнее — в разделе {linkto(#hypervisor_monitoring_delete)[text=%text]}).
{/ifndef}

{ifndef(cer)}
1. Очистите очередь вычислительного узла в RabbitMQ (подробнее — в разделе {linkto(#hypervisor_rabbitmq_delete)[text=%text]}).
{/ifndef}

1. Удалите вычислительный узел (resource provider) из `nova-placement-api` (подробнее — в разделе {linkto(#hypervisor_nova_placement_delete)[text=%text]}).
1. Удалите запись о вычислительном узле на серверах DNS (подробнее — в разделе {linkto(#hypervisor_dns_delete)[text=%text]}).

Далее описаны шаги инструкции для каждого шага.

<warn>

В рамках данной инструкции будет рассмотрено удаление вычислительного узла `kcn002`.

</warn>

### {heading(OpenStack)[id=hypervisor_openstack_delete]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Определите ID сервисов Nova для удаляемого вычислительного узла:

   ```console
   # openstack compute service list --host kcn002
   ```

1. Удалите сервис, выполнив команду с указанием ID, выведенного на предыдущем шаге:

   {ifndef(cer)}

   ```console
   # nova service-delete <SERVICE_ID>
   ```

   {/ifndef}

1. Определите ID сервисов Neutron для удаляемого вычислительного узла:

   ```console
   # openstack network agent list --host kcn002
   ```

1. Удалите сервисы, выполнив команду с указанием ID, выведенных на предыдущем шаге:

   ```console
   # neutron agent-delete <AGENT_ID1> <AGENT_ID2> <AGENT_ID3>
   ```

### {heading(Consul)[id=hypervisor_consul_delete]}

1. Перейдите на удаляемый вычислительный узел по SSH.
1. Остановите сервис Consul:

   ```console
   $ systemctl stop consul.service
   ```

1. Перейдите на любой управляющий узел по SSH. Пример: `cpn003`.
1. Удалите узел вычислительного узла из Consul:

   ```console
   $ consul force-leave -prune kcn002
   ```

### {heading(BGP)[id=hypervisor_bgp_delete]}

1. Определите ID объекта BGP для удаляемого вычислительного узла:

   ```console
   $ neutron-bgp-manage-adv-ip --config-file /etc/neutron/conf.d/neutron-server/neutron.conf list
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```json
   [ ...
   {'host': u'kcn002',
     'id': u'c876f6ab-0849-4434-aec8-d00167bbc7cf',
     'ip': u'10.12.100.21'},
   ...
   ]
   ```
   {/caption}

1. Удалите анонсирование IP для удаляемого вычислительного узла, указав идентификатор из секции `id`, выведенный на предыдущем шаге:

   ```console
   $ neutron-bgp-manage-adv-ip --config-file /etc/neutron/conf.d/neutron-server/neutron.conf delete <ID>
   ```

### {heading(Удаление записи из Ansible inventory)[id=hypervisor_ansible_inventory_delete]}

1. Перейдите на деплой-ноду по SSH (подробнее — в разделе {linkto(../../../interfaces_access#deploy_host_auth)[text=%text]}).
1. В файле `~/inventory/vkcloud/vkcloud.yml` удалите информацию о вычислительном узле из секций `hosts` и `host_vars`.

{ifndef(cer)}
### {heading(Удаление вычислительного узла из мониторинга)[id=hypervisor_monitoring_delete]}

1. Выполните вход в Портал мониторинга под учетной записью Администратора {var(sys2)}.
1. Перейдите в раздел **Configuration** → **Hosts**.
1. Из таблицы выберите удаляемый вычислительный узел, нажав на его имя.
1. В открывшемся окне нажмите кнопку **Delete** и подтвердите удаление.

### {heading(RabbitMQ)[id=hypervisor_rabbitmq_delete]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Подключитесь к одной из нод кластера RabbitMQ для Nova:

   ```console
   # kubectl -n rabbitmq exec -it rabbitmq-nova-0 -- bash
   ```
  
1. Проверьте длину очереди для удаляемого вычислительного узла:

   ```console
   # rabbitmqctl list_queues | grep kcn002
   ```

   Очередь не должна содержать сообщений (показатель `0` для параметра `messages`).

1. Если в очереди есть непрочитанные сообщения, очистите очередь:

   ```console
   # rabbitmqctl purge_queue <QUEUE_NAME>
   ```

   Здесь `<QUEUE_NAME>` — название очереди из предыдущего шага, в которой содержались сообщения.

1. Повторите команду очистки очереди для каждой очереди данного вычислительного узла, которая содержит сообщения.

{/ifndef}

### {heading(Nova Placement)[id=hypervisor_nova_placement_delete]}

Для удаления вычислительного узла (resource provider) из `nova-placement-api` выполните шаги:

1. Получите токен аутентификации (подробнее — в разделе {linkto(../../../interfaces_access#http_api_get_auth_token)[text=%text]}).
1. Получите UUID `resource_provider` для удаляемого вычислительного узла:

   ```console
   $ curl -s -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers?name=kcn002
   ```

   Здесь `<TOKEN>` — токен аутентификации, полученный на предыдущем шаге.

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```json
   {
     "resource_providers": [
       {
         "uuid": "",
         ...
         ],
         "name": "kcn002"
       }
     ]
   }
   ```
   {/caption}

   <warn>

   Если результат выполнения команды — пустой массив, то есть `{"resource_providers": []}`, пропустите выполнение шагов ниже.

   </warn>
1. Проверьте наличие аллоцированных ресурсов для данного вычислительного узла:

   ```console
   $ curl -s -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers/<RESOURCE_PROVIDER_UUID>/allocations
   ```

1. Если в результате выполнения команды получен пустой объект `"allocations": {}`, удалите resource provider:

   ```console
   $ curl -v -X DELETE -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers/<RESOURCE_PROVIDER_UUID>
   ```

   <warn>

   Если в объекте `allocations` присутствуют ресурсы, проверьте наличие ВМ на вычислительном узле, выполнив миграцию при необходимости, и повторите шаги данной инструкции.

   </warn>

### {heading(DNS)[id=hypervisor_dns_delete]}

1. Перейдите на деплой-ноду по SSH (подробнее — в разделе {linkto(../../../interfaces_access#deploy_host_auth)[text=%text]}).
1. Удалите запись для удаляемого вычислительного узла:

   * На серверах OpenStack из файла `/etc/hosts`.
   * На серверах DNS в инфраструктуре.