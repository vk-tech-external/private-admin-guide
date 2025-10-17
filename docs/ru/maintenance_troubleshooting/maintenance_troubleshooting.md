# {heading(Регламентное обслуживание и устранение неполадок)[id=maintenance_troubleshooting]}

<!--- //В данном разделе представлены описания действий, предназначенных для базовой диагностики неисправностей {var(sys2)} и входящих в нее сервисов и компонентов. Если вы не нашли здесь интересующую вас проблему, обращайтесь к статьям базы знаний (ссылка на раздел БЗ по траблшутингу). -->

## {heading(Диагностика {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef})[id=diagnostics]}

<!--- //#todo Уточнить какие еще бывают виды диагностики. Например, расширенная и т.п. -->

Порядок выполнения быстрой диагностики неисправностей {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}:

1. Проверьте работоспособность сервисов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} (подробнее — в разделе {linkto(#common_sys_checking)[text=%text]}).
1. Убедитесь, что доступны основные веб-интерфейсы {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}:

   {ifndef(cer)}
   1. {linkto(#keycloak_checking)[text=%text]}.
   1. {linkto(#superadmin_checking)[text=%text]}.
   1. {linkto(#mcs_ui_checking)[text=%text]}.
   1. {linkto(#monitoring_checking)[text=%text]}.
   1. {linkto(#logs_checking)[text=%text]}.
   {/ifndef}

   {ifdef(cer)}
   1. Портал администратора {var(sys2_go)}.
   1. Портал самообслуживания.
   {/ifdef}

### {heading(Проверка работоспособности сервисов)[id=common_sys_checking]}

<!--- // по возможности добавить про команду systemctl list-units --failed в Troubleshooting (когда там появится хоть один подпункт) -->

Проверьте, что все `systemd` сервисы на всех серверах кластера запущены без ошибок.

{caption(Команда проверки запуска сервисов)[align=left;position=above]}
```console
$ systemctl list-units --failed
```
{/caption}

{caption(Ожидаемый результат)[align=left;position=above]}
```console
0 loaded units listed. Pass --all to see loaded but inactive units, too.
To show all installed unit files use 'systemctl list-unit-files'.
```
{/caption}

Если обнаружены сервисы с ошибкой, проверьте логи и перезапустите сервис.

{caption(Просмотр логов и перезапуск сервиса на примере public_haproxy)[align=left;position=above]}
```console
$ journalctl -f --no-pager -u public_haproxy
$ systemctl restart public_haproxy
```
{/caption}

<!--- // нежелательно делать ссылку на ПМИ из РА -->
<!--- //Для диагностики основной функциональности {var(sys2)} воспользуйтесь проверками, представленными в *Программе и методике испытаний {var(system)}*. -->

{ifndef(cer)}
### {heading(Доступ к веб-интерфейсам {var(sys2)})[id=web_interface_access]}

Основные веб-интерфейсы {var(sys2)}:

* {linkto(#keycloak_checking)[text=%text]}.
* {linkto(#superadmin_checking)[text=%text]}.
* {linkto(#mcs_ui_checking)[text=%text]}.
* {linkto(#monitoring_checking)[text=%text]}.
* {linkto(#logs_checking)[text=%text]}.

<!--- // файл vault ниже специально указан без расширения, это не ошибка -->

<warn>

Вместо плейсхолдеров укажите значения соответствующих переменных из файлов `~/inventory/vkcloud/group_vars/vkcloud/vars.yml` и `~/inventory/vkcloud/group_vars/vkcloud/vault.yml`.

Обратите внимание: регистр переменных может не совпадать с регистром плейсхолдеров.

</warn>

#### {heading(Портал управления доступом (Keycloak))[id=keycloak_checking]}

Адрес: `https://<KEYCLOAK_PUBLIC_ENDPOINT_DOMAIN>`.

Логин/пароль для входа:

```console
admin/${vault_keycloak_password}
```

Алгоритм проверки:

<err>

Если ранее был выполнен импорт пользователей и групп из внешних систем, например Active Directory, вместо описанного ниже алгоритма убедитесь в наличии импортированных пользователей и групп в области безопасности (realm) **mcs_admins**.

</err>

1. Выполните вход с помощью учетной записи администратора {var(sys2)} в Keycloak.
1. Выберите область безопасности (realm) **mcs_admins**.
1. Создайте группу в разделе **Manage** → **Groups** (подробнее — в [официальной документации](https://www.keycloak.org/docs/11.0/server_admin/#groups)).
1. Создайте пользователя в разделе **Manage** → **Users** (подробнее — в [официальной документации](https://www.keycloak.org/docs/11.0/server_admin/#user-management)).
1. Добавьте созданного пользователя в группу, созданную ранее (подробнее — в [официальной документации](https://www.keycloak.org/docs/11.0/server_admin/#groups)).

Ожидаемый результат: Выполнен вход в Портал управления доступом. Создана группа и пользователь в ней.

#### {heading(Портал администратора {var(sys2)})[id=superadmin_checking]}

Адрес: `https://<SUPERADMIN_PUBLIC_ENDPOINT_DOMAIN>/`.

Логин/пароль для входа:

```console
superadmin/${vault_iam_sync_user_password}
```

Алгоритм проверки:

1. Убедитесь, что существует хоть одна группа с пользователем (подробнее — в разделе {linkto(#keycloak_checking)[text=%text]}).
1. Выполните вход с помощью учетной записи администратора {var(sys2)} в Портал администратора.
1. Создайте проект в разделе **Управление проектами** → **Проекты**.
1. Предоставьте права группе пользователей (подробнее — в разделе {linkto(../users_management#superadmin_project_access_settings)[text=%text]}).

Ожидаемый результат: Выполнен вход в Портал администратора {var(sys2)}. Создан новый проект. Добавлена права доступа к выбранному проекту.

#### {heading(Портал самообслуживания)[id=mcs_ui_checking]}

Адрес: `https://<MCS_PUBLIC_URL>`.

Логин/пароль для входа: используйте данные учетных записей, реквизиты которых есть в Портале управления доступом (подробнее — в разделе {linkto(#keycloak_checking)[text=%text]}).

Алгоритм проверки:

1. Убедитесь, что существует пользователь, для которого настроен доступ в проект (подробнее — в разделе {linkto(#superadmin_checking)[text=%text]}).
1. Выполните вход в Портал самообслуживания с помощью учетной записи пользователя, убедитесь, что есть доступ к проекту.
1. Перейдите в раздел **Облачные вычисления**, активируйте сервисы согласно предложенной инструкции и создайте ВМ. Шаги по созданию ВМ приведены в документе **Руководство пользователя {var(system)}** в разделе **Облачные вычисления** → **Виртуальные машины** → **Создание ВМ**.

Ожидаемый результат: Выполнен вход в Портал самообслуживания с помощью учетной записи пользователя. Создана новая ВМ.

#### {heading(Портал мониторинга (Zabbix))[id=monitoring_checking]}

<info>

Портал мониторинга может быть не развернут по умолчанию.

</info>

Адрес: `https://<MONITORING_ENDPOINT_FQDN>/zabbix/`.

Логин/пароль для входа:

```console
${vault_zabbix_api_user}/${vault_zabbix_api_user}
```

Алгоритм проверки: Выполните вход с помощью учетной записи администратора {var(sys2)} в Zabbix.

Ожидаемый результат: Выполнен вход в Портал мониторинга (Zabbix).

#### {heading(Портал логирования (OpenSearch))[id=logs_checking]}

<info>

Портал логирования может быть не развернут по умолчанию.

</info>

Адрес: `https://<LOGS_ENDPOINT_FQDN>`.

Логин/пароль для входа:

```console
admin/${opensearch_users.admin.no_hash_password}
```

Алгоритм проверки: Выполните вход с помощью учетной записи администратора {var(sys2)} OpenSearch.

Ожидаемый результат: Выполнен вход в Портал логирования (OpenSearch).

<!--- //== Запуск, остановка и перезапуск -->
<!--- //#todo уточнить, отличается ли плановый перезапуск сервисов от внепланового; если нет, оставить один раздел -->
<!--- //=== Отдельных компонентов -->
<!--- // #todo заполнить раздел -->
<!--- //=== {var(sys2)} в целом -->
<!--- // #todo заполнить раздел -->
{/ifndef}

## {heading(Регламентное обслуживание)[id=scheduled_maintenance]}

### {heading(Обслуживание узлов кластера)[id=cluster_node_maintenance]}

Для обслуживания узлов кластера предусмотрен механизм их временного отключения. Инструкции по выводу узлов из кластера приведены в разделах:

* {linkto(../administration/infrastructure_management_main/infrastructure_management_hypervisor#hypervisor_maintenance)[text=%text]}.
* {linkto(../administration/infrastructure_management_main/infrastructure_management_node#controller_maintenance)[text=%text]}.

### {heading(Проверка работы сервисов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef})[id=checking_services]}

<warn>

Периодически проверяйте работу сервисов и компонентов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}, чтобы избежать критических ошибок и нарушения ее работы.

</warn>

<!--- // #todo перечислить основные сервисы? -->

#### {heading(Docker сервисы)[id=docker_services]}

Чтобы проверить состояние Docker сервисов, на управляющем узле выполните команду:

```console
$ docker ps -a | grep -v Up
```

Вывод данной команды должен быть либо пустым, либо содержать только пользовательские контейнеры.

<err>

Особое внимание обратите в случае присутствия контейнеров со статусом **Restarting**.

</err>

{ifndef(cer)}

#### {heading(Кластер RabbitMQ)[id=rabbitmq_logs_checking]}

RabbitMQ функционирует в Kubernetes, при этом на основные компоненты {var(sys2)} существует свой сервис RabbitMQ.

Чтобы проверить состояние кластера RabbitMQ, на управляющем узле выполните команды:

1. Просмотр полного списка сервисов RabbitMQ:

   ```console
   $ kubectl get pods -n rabbitmq
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   NAME                    READY   STATUS    RESTARTS   AGE
   rabbitmq-celery-0       1/1     Running   0          20d
   ```
   {/caption}
1. Просмотр состояния отдельного сервиса RabbitMQ:

   ```console
   $ kubectl -n rabbitmq exec <NAME> rabbitmqctl cluster_status
   ```

   Здесь `<NAME>` — имя целевого сервиса RabbitMQ.

   {caption(Фрагмент вывода команды для rabbitmq-nova-0)[align=left;position=above]}
   ```txt
   Cluster status of node rabbit@rabbitmq-nova-0.rabbitmq-nova.rabbitmq.svc.kube ...
   Basics

   Cluster name: rabbit@rabbitmq-nova-0.rabbitmq-nova.rabbitmq.svc.kube

   Running Nodes

   rabbit@rabbitmq-nova-0.rabbitmq-nova.rabbitmq.svc.kube
   rabbit@rabbitmq-nova-1.rabbitmq-nova.rabbitmq.svc.kube
   rabbit@rabbitmq-nova-2.rabbitmq-nova.rabbitmq.svc.kube

   Maintenance status

   Node: rabbit@rabbitmq-nova-0.rabbitmq-nova.rabbitmq.svc.kube, status: not under maintenance
   Node: rabbit@rabbitmq-nova-1.rabbitmq-nova.rabbitmq.svc.kube, status: not under maintenance
   Node: rabbit@rabbitmq-nova-2.rabbitmq-nova.rabbitmq.svc.kube, status: not under maintenance

   Alarms

   (none)

   Network Partitions

   (none)
   ```
   {/caption}

Все сервисы кластера RabbitMQ должны быть запущены. Не должно быть ошибок в работе сервисов.
{/ifndef}

{ifndef(cer)}

#### {heading(Кластер MariaDB (MySQL/Galera))[id=mariadb_cluster]}

Чтобы проверить состояние кластера MariaDB (MySQL/Galera):
{/ifndef}

{ifdef(cer)}

#### {heading(Кластер MariaDB (MySQL))[id=mariadb_cluster_mysql]}

Чтобы проверить состояние кластера MariaDB (MySQL):
{/ifdef}

1. На деплой-ноде найдите пароль от целевой БД (в данном случае — MySQL):

   ```console
   $ grep -r vault_cinder_mysql_password inventory/vkcloud/group_vars/vkcloud/vault.yml
   ```
  
1. На управляющем узле выполните команду:

   ```console
   $ mysql -h <HOSTNAME> -u cinder -D cinder -p --execute "SHOW GLOBAL STATUS LIKE 'wsrep_local_state_comment';"
   ```
 
1. Введите пароль, полученный на шаге 1.

   Ожидаемое состояние — `Synced`.
   
   {caption(Пример вывода команды)[align=left;position=above]}
   ```console
   +---------------------------+--------+
   | Variable_name             | Value  |
   +---------------------------+--------+
   | wsrep_local_state_comment | Synced |
   +---------------------------+--------+
   ```
   {/caption}

{ifndef(cer)}

#### {heading(Мониторинг и логирование)[id=monitoring_and_logging]}

Чтобы проверить состояние мониторинга и логирования:

1. На узле, подлежащем проверке, выполните команду:

   ```console
   $ docker ps -a | egrep 'zabbix|fulentd'
   ```

   Все контейнеры должны быть запущены (`Up`).

1. Проверьте журналы контейнеров на наличие ошибок:

   ```console
   $ docker logs --tail=100 fluentd
   $ docker logs --tail=100 mcs_zabbix_agent
   ```

#### {heading(Сервисы Nova)[id=nova_services]}

Чтобы проверить состояние компонентов Nova:

1. Выполните подготовительные операции для подключения к OpenStack CLI (подробнее — в разделе {linkto(../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Получите список сервисов на целевом узле:

   ```console
   # openstack compute service list | grep <HOSTNAME>
   ```

   Вывод должен показать состояние всех сервисов Nova на узле как `up`.

   {caption(Пример списка сервисов Nova)[align=left;position=above]}
   ```console
   # openstack compute service list | grep <HOSTNAME>

   |  3 | nova-conductor   | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:38:00.000000 |
   | 33 | nova-scheduler   | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:38:03.000000 |
   | 42 | nova-consoleauth | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:37:57.000000 |
   ```
   {/caption}

#### {heading(Сервисы Cinder)[id=cinder_services]}

Чтобы проверить состояние сервисов Cinder:

1. Выполните подготовительные операции для подключения к OpenStack CLI (подробнее — в разделе {linkto(../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Получите список состояний сервиса целевого узла:

   ```console
   # openstack volume service list | grep <HOSTNAME>
   ```

   Вывод должен показать состояние всех сервисов Cinder на узле как `up`.

   {caption(Пример списка сервисов Cinder)[align=left;position=above]}
   ```console
   # openstack volume service list | grep <HOSTNAME>

   | cinder-scheduler | <HOSTNAME> | nova | enabled | up    | 2020-07-23T13:38:25.000000 |
   | cinder-backup    | <HOSTNAME> | nova | enabled | up    | 2020-07-23T13:38:27.000000 |
   ```
   {/caption}

#### {heading(Журналы Neutron)[id=neutron_journals]}

Чтобы проверить журналы Neutron, на управляющем узле выполните команду:

```console
$ ls -t /var/log/neutron/ | egrep -v 'log..' | grep neutron | xargs -l1 -I {} tail -n 200 /var/log/neutron/{} | grep -i error
```

Вывод данной команды должен быть пустым.

#### {heading(Сервисы Neutron)[id=neutron_services]}

Чтобы проверить состояние сервисов Neutron:

1. Выполните подготовительные операции для подключения к OpenStack CLI (подробнее — в разделе {linkto(../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Получите список состояний сервисов:

   {caption(Пример списка сервисов Neutron)[align=left;position=above]}
   ```console
   # openstack network agent list | grep <HOSTNAME>

   | 02480c02-1827-4007-b31a-08c4cb599826 | Metadata agent            | <HOSTNAME>  | None  | True  | UP    | neutron-metadata-agent    |
   | 67dd92dc-465e-4c28-a52d-9e76b85f66bb | Open vSwitch agent        | <HOSTNAME>  | None  | True  | UP    | neutron-openvswitch-agent |
   | a0411328-04d9-46b3-a0a2-0c4e23b8eb06 | L3 agent                  | <HOSTNAME>  | nova  | True  | UP    | neutron-l3-agent          |
   | a4647593-d7ad-42dd-90e6-b535fe9cb87e | BGP dynamic routing agent | <HOSTNAME>  | None  | True  | UP    | neutron-bgp-dragent       |
   | bf2b46eb-74a5-40b6-bc40-e0e6fb035dd4 | DHCP agent                | <HOSTNAME>  | nova  | True  | UP    | neutron-dhcp-agent        |
   | c02faf6d-e10b-483d-ba19-970baea03584 | Loadbalancerv2 agent      | <HOSTNAME>  | None  | True  | UP    | neutron-lbaasv2-agent     |
   ```
   {/caption}

   Для всех сетевых агентов значение параметра **Alive** должно быть `True`, параметра **State** — `UP`. Если есть сервисы с отключенным агентом, выполните шаги:

   1. Зайдите на сервер `<HOSTNAME>` по SSH.
   1. Проверьте логи и перезагрузите отключенные сервисы:

      {caption(Просмотр логов и перезапуск сервиса на примере neutron-l3-agent)[align=left;position=above]}
      ```console
      $ journalctl -f --no-pager -u neutron-l3-agent
      $ systemctl restart neutron-l3-agent
      ```
      {/caption}
   
{/ifndef}