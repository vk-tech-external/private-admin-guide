# {heading(Управление инфраструктурой, на которой развёрнута {var(sys1)})[id=infrastructure]}

<info>

Системное время серверов синхронизируется с источниками точного времени, расположенными в сети Заказчика.

</info>

## {heading(Управление вычислительными узлами (гипервизорами))[id=infrastructure_node]}

Вычислительные узлы (гипервизоры, compute node) представляют собой выделенные серверы с настроенным гипервизором KVM, обслуживающие запущенные экземпляры ВМ.

Каждый вычислительный узел имеет установленную на жёсткие диски ОС, настроенный гипервизор KVM, настроенные модули поддержки SDS CEPH и (или) СХД, и агенты для работы с сетевой подсистемой.

### {heading(Просмотр списка вычислительных узлов)[id=infrastructure_node_list]}

Просмотр списка вычислительных узлов может осуществляться через:

* Портал администратора.
* OpenStack CLI.

#### {heading(Портал администратора)[id=infrastructure_sa_ui]}

Для просмотра списка вычислительных узлов через Портал администратора перейдите в раздел «Облачные вычисления» на страницу «Гипервизоры». Список вычислительных узлов отобразится в таблице.

#### {heading(OpenStack CLI)[id=cli_hypervisor_list]}

Просмотр списка вычислительных узлов можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду:

* `openstack hypervisor list`.
* `openstack compute service list --service nova-compute --long`.

<warn>

Для выполнения этой операции могут потребоваться максимальные привилегии (права) доступа.

</warn>

### {heading(Просмотр доступных ресурсов на вычислительном узле в кластере)[id=infrastructure_node_cluster]}

Просмотр доступных ресурсов на вычислительном узле в кластере может осуществляться через:

* Портал администратора.
* OpenStack CLI.

#### {heading(Портал администратора)[id=infrastructure_sa_ui_resources]}

Для просмотра доступных ресурсов на вычислительном узле в кластере через Портал администратора перейдите в раздел «Облачные вычисления» на страницу «Гипервизоры»:

* Тип данных «Кешированные данные» (чтобы изменить тип данных, нажмите на иконку справа от поля поиска и выберите вариант «Кешированные данные»):
   
   * `cpu_idle` — текущая загрузка ЦПУ.
   * `free_mem` — количество свободной памяти.
   * `status` — текущее состояние вычислительного узла.
   * `running_vms` — количество инстансов на вычислительном узле.
* Тип данных «Реальные данные»:
   
   * `vCPUs` — количество используемых vCPU и всех vCPU вычислительного узла.
   * `RAM` — используемая (аллоцированная) и суммарная память.
   * `Диск` — использование локального диска вычислительного узла с указанием общего объема.
   * `Инстансы` — количество инстансов на вычислительном узле.
   * `Состояние` — текущее состояние вычислительного узла.

#### {heading(OpenStack CLI)[id=infrastructure_openstack_resources]}

Просмотр доступных ресурсов на вычислительном узле в кластере можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду:

```bash
openstack hypervisor stats show <ID_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>
```

Общую статистику по всем вычислительным узлам можно получить с помощью команды:

```bash
openstack hypervisor stats show
```

{caption(Пример вывода команды openstack hypervisor stats show)[align=left;position=above]}
```bash
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

### {heading(Вывод вычислительного узла из кластера)[id=hypervisor_maintenance]}

Для обслуживания вычислительного узла предусмотрен механизм его временного отключения из кластера.

Чтобы вывести вычислительный узел из кластера:

1. В Портале мониторинга установите период технического обслуживания (Maintenance periods) для отключаемого вычислительного узла:
   
   1. В меню слева перейдите в раздел «Configuration» → «Maintenance».
   1. В верхнем правом углу нажмите на кнопку «Create maintenance period».
   1. Заполните поля формы:
      
      * Вкладка «Maintenance»:
      
         * Name — наименование периода. Обязательное поле.
         * Maintenance type — тип периода:
      
            * With data collection — со сбором данных.
            * No data collection — без сбора данных.
         * Active since — начало активности периода технического обслуживания. Обязательное поле.
         * Active till — конец активности периода технического обслуживания. Обязательное поле.
         * Description — описание периода.
      * Вкладка «Periods»: нажмите на ссылку (не кнопку) «Add» в списке «Periods». В открывшемся модальном окне укажите периодичность и продолжительность периода технического обслуживания и нажмите на кнопку «Add».
      * Вкладка «Hosts and groups»:
      
         * Host groups — группы хостов. Нажмите на кнопку «Select» справа от названия, выберите пункты списка и нажмите на кнопку «Select». Выберите из списка вычислительный узел, который необходимо вывести из кластера.
         * Hosts — хосты. Нажмите на кнопку «Select» справа от названия, выберите пункты списка и нажмите на кнопку «Select».
         * Tags — поиск по тегам.
   1. Нажмите на кнопку «Add» в нижней части любой из вкладок. На странице «Maintenance periods» появится новая запись.
1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. При помощи OpenStack CLI уточните текущий список и статус вычислительных узлов, например, выполнив команду (см. раздел {linkto(#cli_hypervisor_list)[text=%text]}):
   
   ```bash
   openstack compute service list --service nova-compute --long
   ```
   {caption(Пример вывода команды openstack compute service list --service nova-compute --long)[align=left;position=above]}
   ```bash
   +----+--------------+----------+------+---------+-------+----------------------------+-----------------+
   | ID | Binary       | Host     | Zone | Status  | State | Updated At                 | Disabled Reason |
   +----+--------------+----------+------+---------+-------+----------------------------+-----------------+
   | 74 | nova-compute | compute1 | AZ1  | enabled | up    | 2022-05-23T14:08:13.000000 | None            |
   | 77 | nova-compute | compute0 | AZ1  | enabled | up    | 2022-05-23T14:08:11.000000 | None            |
   +----+--------------+----------+------+---------+-------+----------------------------+-----------------+
   ```
   {/caption}

4. Отключите возможность запуска новых ВМ на вычислительном узле, выполнив команду:
   
   ```bash
   openstack compute service set --disable --disable-reason "maintenance" <НАИМЕНОВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> nova-compute
   ```
   
   Статус вычислительного узла изменится на `disabled`, в столбце «Disabled Reason» появится значение `maintenance`.
1. Для всех ВМ, запущенных на вычислительном узле, выводимом из кластера, выполните миграцию (см. раздел {linkto(../../../usage_administration/v_infrastructure_management#vm_migration)[text=%text]}).
1. Убедитесь, что миграция ВМ завершилась успешно и на вычислительном узле нет запущенных ВМ, выполнив команду:
   
   ```bash
   openstack server list --host <НАИМЕНОВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> --all-projects
   ```
1. Перейдите на отключаемый вычислительный узел по SSH.
1. Остановите сервисы nova и neutron агентов, выполнив команды:
   
   ```bash
   systemctl stop openstack-nova-compute.service
   systemctl stop neutron-l3-agent.service neutron-metadata-agent.service neutron-openvswitch-agent.service
   ```

После успешного выполнения вышеописанных шагов вычислительный узел можно отключить от сети, выключить питание и выполнить работы по ремонту / модернизации.

### {heading(Включение вычислительного узла)[id=infrastructure_node_on]}

<info>

После завершения работ по ремонту / модернизации вычислительного узла необходимо заново подключить его к кластеру.

</info>

Чтобы включить вычислительный узел:

1. Убедитесь, что вычислительный узел физически включен и выполнен автоматический запуск сервисов.
1. Перейдите на включенный вычислительный узел по SSH.
1. Проверьте состояние сервисов nova и neutron агентов на вычислительном узле, выполнив команду:
   
   ```bash
   systemctl --all | grep -E "nova|neutron"
   ```
   Найденные сервисы должны быть в статусах `active` и `running`.
1. Если состояние сервисов отличается от указанных на предыдущем шаге, запустите сервисы Nova и Neutron агентов, выполнив команды:
   
   ```bash
   systemctl start openstack-nova-compute.service
   systemctl start neutron-l3-agent.service neutron-metadata-agent.service neutron-openvswitch-agent.service
   ```

1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Включите возможность запуска ВМ на вычислительном узле, выполнив команду:
   
   ```bash
   openstack compute service set --enable <НАИМЕНОВАНИЕ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА> nova-compute
   ```
1. Уточните текущий список и статус запущенного вычислительного узла (см. раздел {linkto(#cli_hypervisor_list)[text=%text]}). Ожидаемые значения в колонке «Status» — `enabled`, в колонке «State» — `up`.
1. При необходимости выполните миграцию ВМ для разгрузки запущенных вычислительных узлов на ранее включенный узел (см. раздел {linkto(../../../usage_administration/v_infrastructure_management#vm_migration)[text=%text]}).

### {heading(Закрепление вычислительного узла за проектом)[id=dedicated_compute_node]}

Вычислительные узлы по умолчанию могут быть использованы для обеспечения ресурсов любых ВМ, для которых указана соответствующая зона доступности (availability zone). Для этого в данную зону доступности должен входить агрегат узлов (Host aggregate), к которому относится вычислительный узел.

Иерархия сущностей упрощенно может быть представлена следующим образом:

* Зона доступности.
   
   * Агрегат узлов.
      
      * Вычислительный узел.

Однако в {var(sys3)} существует возможности ограничить использование вычислительного узла одним выбранным проектом/тенантом. Закрепление выделенного вычислительного узла за каким-либо проектом означает, что ресурсы данного узла будут доступны только в рамках этого проекта.

Закрепление вычислительного узла за проектом может осуществляться через:

* Портал администратора.
* OpenStack CLI.

#### {heading(Портал администратора)[id=infrastructure_node_project_sa]}

Для закрепления вычислительного узла за проектом через Портал администратора:

1. Перейдите в раздел «Облачные вычисления» на страницу «Агрегаторы узлов».
1. Нажмите на кнопку «Добавить».
1. В открывшейся форме укажите параметры:
   
   * Имя — наименование агрегата узлов.
   * Зона доступности — зона доступности для агрегата. Выбор из раскрывающегося списка.
   * Доступные узлы — список доступных узлов. Выбор из раскрывающегося списка.
1. Нажмите на кнопку «Создание агрегатора узлов». Дождитесь завершения операции.
1. На странице «Агрегаторы узлов» нажмите на иконку справа от поля поиска и выберите вариант «Реальные данные» (по умолчанию показаны «Кешированные данные»).
1. Найдите в списке созданный агрегатор, справа от его названия нажмите на кнопку «•••» и выберите пункт «Обновить метаданные».
1. Нажмите на кнопку «Редактировать».
1. В открывшейся форме заполните параметры:
   
   1. Нажмите на кнопку «Добавить».
   1. В поле «Имя» укажите значение `filter_tenant_id`.
   1. В поле «Значение» укажите UID проекта или тенанта.
   1. Нажмите на кнопку «Сохранить изменения».

Описанных выше действий достаточно, чтобы на вычислительном узле запускались ВМ только указанного проекта. При этом ВМ данного проекта смогут создаваться и на других вычислительных узлах.

#### {heading(OpenStack CLI)[id=infrastructure_node_project_sa_openstack]}

Закрепление вычислительного узла за проектом можно выполнить при помощи Openstack CLI. Для этого выполните шаги:

1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Создайте новый агрегат узлов:
   
   ```bash
   openstack aggregate create --zone <ИМЯ_ЗОНЫ_ДОСТУПНОСТИ> NEW_AGG
   ```
1. Добавьте агрегату необходимый параметр:

   ```bash
   openstack aggregate set --property filter_tenant_id=<ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> NEW_AGG
   ```
1. Добавьте вычислительный узел в созданный агрегат узлов:
   
   ```bash
   openstack aggregate add host NEW_AGG <ИМЯ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>
   ```

Описанных выше действий достаточно, чтобы на вычислительном узле запускались ВМ только указанного проекта. При этом ВМ данного проекта смогут создаваться и на других вычислительных узлах.

Если необходимо, чтобы ВМ проекта запускались только на определенном вычислительном узле, то нужно создать и использовать специальный тип ВМ (flavor) для проекта с параметром `aggregate_instance_extra_specs:filter_tenant_id`, например:

```bash
openstack flavor create --private --disk 10 --property aggregate_instance_extra_specs:filter_tenant_id=<ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> --ram 1024 --vcpus 1 --property mcs:cpu_type=standard --project <ИМЯ_ПРОЕКТА_ИЛИ_ТЕНАНТА> Basic-1-1-SPEC
```

Кроме того, для отображения данного типа ВМ в интерфейсе необходимо добавить к агрегату узлов дополнительное свойство:

{caption(Добавление свойства mcs:cpu_type=standart для агрегата)[align=left;position=above]}

```bash
openstack aggregate set --property mcs:cpu_type=standart NEW_AGG
```
{/caption}

### {heading(Добавление нового вычислительного узла)[id=infrastructure_node_add]}

Чтобы добавить новый вычислительный узел в кластер, выполните шаги:

1. Подготовьте ansible inventory (см. раздел {linkto(#ansible_inventory_preparing)[text=%text]}).
1. Запустите плейбуки ansible (см. раздел {linkto(#ansible_playbooks_running)[text=%text]}).
1. Выполните проверку состояния сервисов (см. раздел {linkto(#services_status_checking)[text=%text]}).
1. Активируйте добавляемый вычислительный узел (см. раздел {linkto(#hypervisor_activate)[text=%text]}).
1. Проверьте статус вычислительного узла (см. раздел {linkto(#hypervisor_status_checking)[text=%text]}).
1. Добавьте вычислительный узел в мониторинг (см. раздел {linkto(#hypervisor_monitoring_adding)[text=%text]}).
1. Выполните миграцию ВМ для разгрузки других вычислительных узлов при необходимости (см. раздел {linkto(../../../usage_administration/v_infrastructure_management#vm_migration)[text=%text]}).

Далее описаны шаги инструкции для каждого шага.

<warn>

В рамках данной инструкции будет рассмотрено добавление вычислительного узла `compute1`.

</warn>

#### {heading(Подготовка ansible inventory)[id=ansible_inventory_preparing]}

1. Перейдите на деплой-ноду по SSH (см. раздел {linkto(../../../usage_administration/interfaces_access#deploy_host_auth)[text=%text]}).
1. В файл `/home/centos/inventory/<ENV>/<ENV>.yml`, где `<ENV>` — наименование инсталляции/окружения, добавьте информацию о новом вычислительном узле в секцию `hosts`:
   
   ```yaml
   all:
     children:
       <ENV>:
         children:
           ...
           <ENV>_compute:
             children:
               ...
                 hosts:
                   ...
                   compute1:
                     <VAR1>: <VALUE1>
                     <VAR2>: <VALUE2>
   ```

#### {heading(Запуск плейбуков Ansible)[id=ansible_playbooks_running]}

Запустите плейбуки из директории `/home/centos/inventory/<ENV>`, выполнив команды:

```bash
ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME} ../ansible-openstack/playbooks/zabbix-openstack-deploy.yml -D --limit <NEW_HOST>;
ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME} ../ansible-openstack/playbooks/compute-deploy.yml -D -e ansible_user=centos -e admin_user_name=centos --limit <NEW_HOST>
```
, где:

* `${STAND_NAME}` — переменная с наименованием окружения.
* `<NEW_HOST>` — наименование создаваемого вычислительного узла.

{caption(Пример запуска плейбуков на stage для вычислительного узла compute1)[align=left;position=above]}
```bash
ansible-playbook -i stage.yml -e env=stage ../ansible-openstack/playbooks/zabbix-openstack-deploy.yml -D --limit compute1
ansible-playbook -i stage.yml -e env=stage ../ansible-openstack/playbooks/compute-deploy.yml -D -e ansible_user=centos -e admin_user_name=centos --limit compute1
```
{/caption}

#### {heading(Проверка состояния сервисов)[id=services_status_checking]}

1. Проверьте состояние системных сервисов, выполнив команду:
   
   ```bash
   systemctl --all | grep -E "nova|neutron"
   ```
   
   Сервисы должны быть в состоянии `active`, `running`.
1. Перейдите на управляющий узел с поддержкой OpenStack CLI (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Проверьте наличие и статус сервиса Nova для нового вычислительного узла, выполнив команду:
   
   ```bash
   openstack compute service list --host compute1
   ```

1. Проверьте наличие и статус агентов Neutron для нового вычислительного узла, выполнив команду:
   
   ```bash
   openstack network agent list --host compute1
   ```

#### {heading(Активация вычислительного узла)[id=hypervisor_activate]}

<err>

Новый вычислительный узел добавляется в кластер в статусе `disabled`, `down`.

</err>

Чтобы активировать вычислительный узел, на управляющем узле с поддержкой OpenStack CLI выполните команды:

```bash
openstack compute service set --disable --disable-reason "Ready to start" <NEW_HOST> nova-compute
openstack compute service set --enable <NEW_HOST> nova-compute
```

, где `<NEW_HOST>` — наименование создаваемого вычислительного узла.

#### {heading(Проверка статуса активированного вычислительного узла)[id=hypervisor_status_checking]}

Выполните команду проверки статуса активированного вычислительного узла:

```bash
openstack compute service list --host compute1 --long
```

{caption(Пример вывода информации о вычислительном узле)[align=left;position=above]}
```bash
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
| ID | Binary       | Host     | Zone | Status  | State | Updated At                 | Disabled Reason |
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
| 74 | nova-compute | compute1 | AZ1  | enabled | up    | 2022-05-23T21:00:30.000000 | None            |
+----+--------------+----------+------+---------+-------+----------------------------+-----------------+
```
{/caption}

Если активация вычислительного узла прошла успешно, его статус изменится на `enabled`, `up`.

#### {heading(Добавление вычислительного узла в систему мониторинга)[id=hypervisor_monitoring_adding]}

Для добавления вычислительного узла в систему мониторинга:

1. Выполните вход в Портал мониторинга под учётной записью Администратора {var(sys2)}.
1. Перейдите в раздел «Configuration» на страницу «Hosts».
1. Из таблицы выберите любой рабочий хост (например, `compute3`), нажав на его имя.
1. В открывшейся форме нажмите на кнопку «Clone».
1. На форме настроек нового вычислительного узла обновите значения полей:
   
   * «Host name» — наименование созданного вычислительного узла.
   * «Interfaces» → «Agent» — IP-адрес агента.
   * «Enabled» — признак активности; установите флажок.
1. Нажмите на кнопку «Add». Дождитесь изменения индикации надписи `[ZBX]` в столбце «Availability» на зелёный.

### {heading(Удаление вычислительного узла из кластера)[id=infrastructure_delete_computingnode]}

Чтобы удалить вычислительный узел из кластера, выполните шаги:

1. Выполните процедуру вывода вычислительного узла из кластера (см. раздел {linkto(#hypervisor_maintenance)[text=%text]}).
1. Удалите сервисы вычислительного узла из OpenStack (см. раздел {linkto(#hypervisor_openstack_delete)[text=%text]}).
1. Удалите вычислительный узел из Consul (см. раздел {linkto(#hypervisor_consul_delete)[text=%text]}).
1. Удалите IP вычислительного узла из списка анонсированных по BGP (см. раздел {linkto(#hypervisor_bgp_delete)[text=%text]}).
1. Удалите запись из ansible inventory (см. раздел {linkto(#hypervisor_ansible_inventory_delete)[text=%text]}).
1. Удалите вычислительный узел из системы мониторинга (см. раздел {linkto(#hypervisor_monitoring_delete)[text=%text]}).
1. Очистите очередь вычислительного узла в RabbitMQ (см. раздел {linkto(#hypervisor_rabbitmq_delete)[text=%text]}).
1. Удалите вычислительный узел (resource provider) из `nova-placement-api` (см. раздел {linkto(#hypervisor_nova_placement_delete)[text=%text]}).
1. Удалите запись о вычислительном узле на серверах DNS (см. раздел {linkto(#hypervisor_dns_delete)[text=%text]}).

Далее описаны шаги инструкции для каждого шага.

<warn>

В рамках данной инструкции будет рассмотрено удаление вычислительного узла `compute1`.

</warn>

#### {heading(OpenStack)[id=hypervisor_openstack_delete]}

1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Определите ID сервисов Nova для удаляемого вычислительного узла, выполнив команду:
   
   ```bash
   openstack compute service list --host compute1
   ```
1. Удалите сервис, выполнив команду с указанием ID, выведенного на предыдущем шаге:
   
   ```bash
   nova service-delete <SERVICE_ID>
   ```
1. Определите ID сервисов Neutron для удаляемого вычислительного узла, выполнив команду:
   
   ```bash
   openstack network agent list --host compute1
   ```
1. Удалите сервисы, выполнив команду с указанием ID, выведенных на предыдущем шаге:
   
   ```bash
   neutron agent-delete <AGENT_ID1> <AGENT_ID2> <AGENT_ID3>
   ```

#### {heading(Consul)[id=hypervisor_consul_delete]}

1. Перейдите на удаляемый вычислительный узел по SSH.
1. Остановите сервис Consul, выполнив команду:
   
   ```bash
   systemctl stop consul.service
   ```
1. Перейдите на любой управляющий узел по SSH (например, `controller3`).
1. Удалите ноду вычислительного узла из consul, выполнив команду:
   
   ```bash
   consul force-leave -prune compute1
   ```
#### {heading(BGP)[id=hypervisor_bgp_delete]}

1. Определите ID объекта BGP для удаляемого вычислительного узла, выполнив команду:
   
   ```bash
   neutron-bgp-manage-adv-ip --config-file /etc/neutron/conf.d/neutron-server/neutron.conf list
   ```
   {caption(Пример вывода команды)[align=left;position=above]}
   ```json
   [ ...
   {'host': u'compute1',
     'id': u'c876f6ab-0849-4434-aec8-d00167bbc7cf',
     'ip': u'10.12.100.21'},
   ...
   ]
   ```
   {/caption}
1. Удалите анонсирование IP для удаляемого вычислительного узла, указав идентификатор из секции `id`, выведенный на предыдущем шаге:
   
   ```bash
   neutron-bgp-manage-adv-ip --config-file /etc/neutron/conf.d/neutron-server/neutron.conf delete <ID>
   ```

#### {heading(Удаление записи из ansible inventory)[id=hypervisor_ansible_inventory_delete]}

1. Перейдите на деплой-ноду по SSH (см. раздел {linkto(../../../usage_administration/interfaces_access#deploy_host_auth)[text=%text]}).
1. В файле `/home/centos/inventory/<ENV>/<ENV>.yml` удалите информацию о вычислительном узле из секций `hosts` и `host_vars`.

#### {heading(Удаление вычислительного узла из мониторинга)[id=hypervisor_monitoring_delete]}

Для удаления вычислительного узла из мониторинга:

1. Выполните вход в Портал мониторинга под учётной записью Администратора {var(sys2)}.
1. Перейдите в раздел «Configuration» на страницу «Hosts».
1. Из таблицы выберите удаляемый вычислительный узел, нажав на его имя.
1. В открывшейся форме нажмите на кнопку «Delete» и подтвердите удаление.

#### {heading(RabbitMQ)[id=hypervisor_rabbitmq_delete]}

1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Подключитесь к одной из нод кластера RabbitMQ для Nova, выполнив команду:
   
   ```bash
   kubectl -n rabbitmq exec -it rabbitmq-nova-0 -- bash
   ```
1. Проверьте длину очереди для удаляемого вычислительного узла, выполнив команду:
   
   ```bash
   rabbitmqctl list_queues | grep compute1
   ```
   
   Очередь не должна содержать сообщений (показатель `0` для параметра `messages`).

1. Если в очереди есть непрочитанные сообщения, то очистите очередь, выполнив команду:
   
   ```bash
   rabbitmqctl purge_queue <QUEUE_NAME>
   ```
   , где `<QUEUE_NAME>` — наименование очереди из предыдущего шага, в которой содержались сообщения.

   <info>

   Повторите команду очистки очереди для каждой очереди данного вычислительного узла, которая содержит сообщения.

   </info>

#### {heading(Nova Placement)[id=hypervisor_nova_placement_delete]}

Для удаления вычислительного узла (resource provider) из `nova-placement-api` выполните шаги:

1. Получите токен авторизации (см. раздел {linkto(../../../usage_administration/interfaces_access#http_api_get_auth_token)[text=%text]}).
1. Скопируйте значение заголовка `x-subject-token`, полученного на предыдущем шаге.
1. Получите UUID `resource_provider` для удаляемого вычислительного узла, выполнив команду:

   ```bash
   curl -s -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers?name=compute1
   ```
   , где `<TOKEN>` — токен авторизации, полученный на предыдущем шаге.

   {caption(Пример вывода команды)[align=left;position=above]}
   ```json
   {
     "resource_providers": [
       {
         "uuid": "2da1e61d-274c-4b3a-a055-bfa0e95ef632",
         "name": "compute1"
       }
     ]
   }
   ```
   {/caption}

   <err>

   Если результат выполнения команды — пустой массив, то есть `{"resource_providers": []}`, то пропустить выполнение шагов ниже.

   </err>

4. Проверьте наличие аллоцированных ресурсов для данного вычислительного узла, выполнив команду:
   
   ```bash
   curl -s -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers/<RESOURCE_PROVIDER_UUID>/allocations
   ```
1. Если в результате выполнения команды получен пустой объект `"allocations": {}`, то удалите resource provider, выполнив команду:
   
   ```bash
   curl -v -X DELETE -H "Content-Type: application/json" -H "X-Auth-Token: <TOKEN>" http://<OPENSTACK_PRIVATE_ENDPOINT>:8778/resource_providers/<RESOURCE_PROVIDER_UUID>
   ```
   <warn>

   Если в объекте `allocations` присутствуют ресурсы, проверьте наличие ВМ на вычислительном узле, выполнив миграцию при необходимости, и повторите шаги данной инструкции.

   </warn>

#### {heading(DNS)[id=hypervisor_dns_delete]}

1. Перейдите на деплой-ноду по SSH (см. раздел {linkto(../../../usage_administration/interfaces_access#deploy_host_auth)[text=%text]}).
1. Удалите запись для удаляемого вычислительного узла:
   
   * На серверах OpenStack из файла `/etc/hosts`.
   * На серверах DNS в инфраструктуре.

## {heading(Операции с управляющими узлами)[id=infrastructure_controlnode]}

### {heading(Определение Главного управляющего узла)[id=main_control_node]}

Не все управляющие узлы полностью равнозначны. Один из управляющих узлов содержит в себе мастер-ноды кластеров СУБД Tarantool (Breeze, Dusk), используемые некоторыми другими компонентами {var(sys2)} (например, IAM). Все остальные управляющие узлы содержат реплики этих кластеров (доступные только для чтения).

<err>

В случае недоступности Главного управляющего узла (например, его выхода из строя или выключения/перезагрузки) становятся недоступны основные интерфейсы управления {var(sys2)}: Портал самообслуживания, Портал администратора, API, CLI. При этом работа виртуальных вычислительных ресурсов {var(sys2)} (ВМ, сетей, СУБД и кластеров) продолжается в штатном режиме, однако их остановка или запуск новых ресурсов остаются временно недоступны.

После восстановления работоспособности Главного управляющего узла все функции {var(sys2)} должны работать в штатном режиме.

</err>

Для определения списка запущенных на узле инстансов Tarantool используйте команду:

```bash
ls /etc/tarantool/instances.available
```
Для определения того, является ли данный управляющий узел Главным управляющим узлом, достаточно подключиться к одному из инстансов Tarantool командой `tarantoolctl enter <ИМЯ_ИНСТАНСА>` и проверить значение параметра `read_only` из `box.cfg` при помощи команды `box.info.ro`.

{caption(Команды для подключения к инстансу Tarantool и проверки запрета записи)[align=left;position=above]}
```bash
sudo bash
tarantoolctl enter breeze_01
box.info.ro
```
{/caption}

Возможные результаты:

* `true` — текущий узел является обычным управляющим узлом с репликой Tarantool.
* `false` — текущий узел является Главным управляющим узлом с мастером Tarantool.

{caption(Пример вывода консоли)[align=left;position=above]}
```bash
~> tarantoolctl enter breeze_01
connected to unix/:/var/run/tarantool/breeze_01.control
unix/:/var/run/tarantool/breeze_01.control> box.info.ro
---
- false
...
```
{/caption}

<info>

Параметр `read_only` равный `true` означает, что данный инстанс Tarantool поддерживает только чтение данных, поскольку является репликой.

</info>

### {heading(Вывод управляющего узла (controller) из кластера)[id=controller_maintenance]}

Для обслуживания управляющего узла предусмотрен механизм его временного отключения из кластера.

Чтобы вывести управляющий узел из кластера:

1. В Портале мониторинга установите период технического обслуживания (Maintenance periods) для отключаемого управляющего узла:
   
   1. В меню слева перейдите в раздел «Configuration» → «Maintenance».
   1. В верхнем правом углу нажмите на кнопку «Create maintenance period».
   1. Заполните поля формы:
      * Вкладка «Maintenance»:
         * Name — наименование периода. Обязательное поле.
         * Maintenance type — тип периода:

            * With data collection — со сбором данных.
            * No data collection — без сбора данных.
         * Active since — начало активности периода технического обслуживания. Обязательное поле.
         * Active till — конец активности периода технического обслуживания. Обязательное поле.
         * Description — описание периода.
      * Вкладка «Periods»: нажмите на ссылку (не кнопку) «Add» в списке «Periods». В открывшемся модальном окне укажите периодичность и продолжительность периода технического обслуживания и нажмите на кнопку «Add».
      * Вкладка «Hosts and groups»:
      
         * Host groups — группы хостов. Нажмите на кнопку «Select» справа от названия, выберите пункты списка и нажмите на кнопку «Select». Выберите из списка управляющий узел, который необходимо вывести из кластера.
         * Hosts — хосты. Нажмите на кнопку «Select» справа от названия, выберите пункты списка и нажмите на кнопку «Select»
         * Tags — поиск по тегам.
   1. Нажмите на кнопку «Add» в нижней части любой из вкладок. На странице «Maintenance periods» появится новая запись.
1. Перейдите на отключаемый управляющий узел по SSH.
1. Проверьте состояние таймеров биллинга и сервисов, которые они запускают:
   
   ```bash
   systemctl list-timers --all scrooge-charger.timer scrooge-billing.timer
   systemctl list-units --all scrooge-charger.service scrooge-billing.service
   ```
   
   Если сервисы не запущены и их запуск не запланирован таймерами в ближайшее время, перейдите к следующему шагу.
1. Выполните команду остановки сервера:
   
   ```bash
   shutdown now
   ```

После успешного выполнения вышеописанных шагов управляющий узел можно отключить от сети, выключить питание и выполнить работы по ремонту / модернизации.

<warn>

Шаги по перезагрузке сервера идентичны вышеописанной инструкции, кроме последнего шага: используйте команду `reboot`.

</warn>

### {heading(Включение управляющего узла)[id=infrastructure_controlnode_on]}

<info>

После завершения работ по ремонту / модернизации управляющего узла необходимо заново подключить его к кластеру.

</info>

Чтобы включить управляющий узел:

1. Убедитесь, что управляющий узел физически включен и выполнен автоматический запуск сервисов.
1. Перейдите на включенный управляющий узел по SSH.
1. Проверьте состояние сервисов, выполнив команду:
   
   ```bash
   systemctl list-units --all --type=service
   ```
   <err>

   Перечисленные ниже сервисы могут находиться в статусах `active` и `running`:
   
   ```bash
   clickhouse-server
   consul
   dnsmasq
   docker
   etcd*
   exabgp
   filebeat
   frost
   haar
   httpd-*
   kube*
   mariadb-*
   memcached
   neutron-*
   nginx
   ocean
   octavia-*
   openstack-*
   owl
   private_haproxy
   public_haproxy
   proxysql
   sundog
   tarantool*
   zabbix-agent
   zephyr
   zookeeper
   ```
  
   </err>

4. Если сервисы из списка выше не запустились автоматически, то выполните их перезапуск вручную.

   <info>
   
   Сервис `httpd-panko.service` присутствует только на узлах `controller1` и `controller2`. Сервисы Kubernetes `kube-apiserver.service`, `kube-controller-manager.service` и `kube-scheduler.service` присутствуют только на узлах `controller2` и `controller3`. 

   </info>
1. При включении узла `controller1` проверьте работу сервиса биллинга, выполнив команду:
   
   ```bash
   systemctl | grep scrooge
   ```
   
   Убедитесь, что сервисы находятся в статусах `active` и `running`. Для таймеров допускается статус `waiting`.

1. Переключитесь на пользователя `root`, выполнив команду `sudo bash`.
1. Проверьте наличие запущенных docker-контейнеров, выполнив команды:
   
   ```bash
   docker ps | grep gb_tarantool
   docker ps | grep rabbit_persistent
   ```
1. Запустите неработающие контейнеры, выполнив команды:
   
   ```bash
   docker start gb_tarantool
   docker start rabbit_persistent
   ```
1. Выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Проверьте состояние нод и сервисов Kubernetes:
   
   ```bash
   kubectl get nodes
   kubectl get pods -A | grep 0/
   ```
   
   Все ноды должны находиться в статусе `Ready`.

1. Проверьте состояние агентов Neutron:
   
   ```bash
   openstack network agent list
   ```
   
   Агенты должны находиться в состоянии `Alive` — `True`, `State` — `UP`.

1. Проверьте состояние сервисов Nova:
   
   ```bash
   openstack compute service list
   ```
   
   Сервисы должны находиться в статусе `enabled`, `up`.

### {heading(Управление базами данных {var(sys2)})[id=infrastructure_database_management]}

Сервисы OpenStack для хранения информации используют БД MySQL, которые располагаются на управляющих узлах (контроллерах).

Отдельные серверы БД предоставляются для каждого сервиса и объединяются в единый кластер Galera.

#### {heading(Управление кластерами БД)[id=bd_cluster_management]}

Чтобы развернуть кластер Galera, запустите плейбук для роли `galera`:

```bash
ansible-playbook -i vkcloud.yml \
  -e env=stage_name \
  ./playbooks/galera.yml
```

Чтобы восстановить кластер Galera, запустите плейбук для роли `galera` с тегом `recovery` и передайте переменную `galera_recovery_group` с именем группы для кластера.

{caption(Пример восстановления кластера для БД nova)[align=left;position=above]}

```bash
ansible-playbook -i vkcloud.yml\
   -e env=vkcloud \
   -e galera_recovery_group=vkcloud_galera_nova \
   -t recovery \
   ../ansible-openstack/playbooks/galera.yml
```
{/caption}

#### {heading(Создание резервной копии БД)[id=infrastructure_backup_database]}

Чтобы создать скрипты для резервного копирования на управляющем узле с БД, используйте один из следующих способов:

* Вручную создайте каталог для резервного копирования на нужном узле или узлах, по умолчанию это каталог `/srv/backup` (в дальнейшем указывается в переменной `xtrabackup_dir`). Запустите плейбук для роли `galera` как описано в разделе {linkto(#bd_cluster_management)[text=%text]}.
* В файле inventory установите переменную `galera_create_backup_script_dir: True` для нужного хоста.
  
<warn>

Плейбуки не устанавливают периодичность запуска скриптов для резервного копирования. Эта задача остается на усмотрение администратора облака.

</warn>

#### {heading(Восстановление БД из резервной копии)[id=infrastructure_backup_database_recovery]}

Восстановление БД имеет смысл выполнять, только когда нет других вариантов.

<err>

Из-за разницы во времени резервных копий разных БД или при восстановлении только одной БД состояние облака будет неконсистентным и часть сущностей необходимо будет удалить вручную, в частности, ВМ/диски/сети/PaaS.

</err>

<err>

При восстановлении БД из резервной копии старая БД удаляется без дополнительных запросов.

</err>

Чтобы восстановить БД из резервной копии, запустите плейбук для роли `galera` со следующими переменными:

```bash
ansible-playbook -i vkcloud.yml \
   -e env=vkcloud \
   -e db_restore_name=nova \
   -e xtrabackup_dir="/srv/backup" \
   -e db_backup_file_time=20220816_1428 \
   -e galera_recovery_group=vkcloud_galera_nova \
   -t recovery \
   ../ansible-openstack/playbooks/galera.yml
```

Чтобы восстановление прошло без ошибок, должны быть выполнены следующие условия:

* Резервная копия БД должна быть создана скриптом `/srv/backup/backup_xtra_<db_name>.sh`.
* Файл с резервной копией должен быть хотя бы на одном из узлов с БД.
* В команде восстановления БД все переменные должны быть обязательно заданы, кроме `xtrabackup_dir` (по умолчанию берется из файла inventory).

При восстановлении БД будут созданы следующие временные ресурсы:

* Файл резервной копии будет скопирован на деплой-ноду в `/tmp` и в дальнейшем автоматически удален.
* Файл резервной копии будет скопирован на ноду, выбранную в качестве bootstrap-ноды для кластера, и не будет удален.
* Будет разархивирован каталог `<xtrabackup_dir>/extrabackup_<db_restore_name>` и не будет удален.

Логика по восстановлению кластера определена в файле `roles/galera/tasks/dbrecovery.yml`.

## {heading(Изменение конфигурации на узлах)[id=change_nodes_configs_playbooks]}

<err>

Изменение конфигурации для узлов осуществляется централизованно через деплой-ноду: как для всех сразу, так и для отдельных узлов.

Локальное изменение конфигураций на отдельных узлах (без изменений на деплой-ноде) приведет к их «затиранию» при следующем обновлении или восстановлении сервисов/узлов {var(sys2)} с деплой-ноды.

</err>

Конфигурация сервисов хранится на деплой-ноде. По умолчанию она размещена по адресу `/home/centos/inventory/ansible-openstack/roles`, где `centos` — имя пользователя по умолчанию.

Эти настройки распределяются Ansible при перезапуске/обновлении сервисов с помощью ansible playbook.

Основные переменные лежат в Ansible inventory в директории `/home/centos/inventory/<ENV>`, где:

* `centos` — имя пользователя по умолчанию.
* `<ENV>`— название инсталляции/окружения.

Чтобы изменить конфигурацию сервиса на узлах:

1. Выполните вход на деплой-ноду по SSH (см. раздел {linkto(../../../usage_administration/interfaces_access#deploy_host_auth)[text=%text]}).
1. Найдите директорию с `.yml` файлом сервиса (`/home/centos/inventory/ansible-openstack/playbooks/`). Если отобразится сообщение вида `Permission denied`, зайдите под пользователем `root`: `sudo su - root`.
1. Внесите изменения в конфигурационный файл и сохраните его.
1. Добавьте наименование окружения в переменную `STAND_NAME`, выполнив команду:
   
   ```bash
   STAND_NAME=<НАИМЕНОВАНИЕ_ОКРУЖЕНИЯ>
   ```
1. Если требуется выполнить обновление версии сервиса, в `/home/centos/inventory/${STAND_NAME}/group_vars/${STAND_NAME}/versions.yml` укажите новую версию.
1. Перезагрузите конфигурацию с помощью ansible playbook:
   
   ```bash
   ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME}/home/centos/inventory/ansible-openstack/playbooks/<НАЗВАНИЕ_КОНФИГУРАЦИОННОГО_ФАЙЛА_СЕРВИСА>.yml <ОПЦИИ>
   ```
<warn>

Чтобы применить изменения только для одного узла, добавьте в команду перезапуска плейбука опцию `--limit <НАИМЕНОВАНИЕ_УЗЛА>`, где `<НАИМЕНОВАНИЕ_УЗЛА>` — наименование узла, на котором требуется применить конфигурацию.

</warn>

Чаще всего применяются следующие варианты запуска ansible playbook (на примере сервиса ClickHouse, директория запуска `/home/centos/inventory/${STAND_NAME}`):

* Валидация — проверка конфигурации в системе без внесения изменений.

   {caption(Пример запуска валидации сервиса ClickHouse)[align=left;position=above]}
  
   ```bash
   ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME} ../ansible-openstack/playbooks/clickhouse.yml -C -D
   ```
   {/caption}

* Установка сервиса с нуля — выполняются дополнительные действия, например, создание БД (в примере ниже — `bootstrap=true`). Список дополнительных действий может отличатся в зависимости от сервиса.
   
   {caption(Пример установки сервиса с нуля)[align=left;position=above]}
  
   ```bash
   ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME} ../ansible-openstack/playbooks/clickhouse.yml -D -e bootstrap=true
   ```
   {/caption}
* Обновление версии сервиса из `/home/centos/inventory/${STAND_NAME}/group_vars/${STAND_NAME}/versions.yml`.

   {caption(Пример обновления версии сервиса)[align=left;position=above]}
     
   ```bash
   ansible-playbook -i ${STAND_NAME}.yml -e env=${STAND_NAME} ../ansible-openstack/playbooks/clickhouse.yml -D
   ```
   {/caption}
  
Полный перечень опций см. [в официальной документации Ansible](https://docs.ansible.com/ansible/2.9/cli/ansible-playbook.html).