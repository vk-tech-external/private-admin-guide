# {heading(Регламентное обслуживание и устранение неполадок)[id=null]}

## {heading(Диагностика {var(sys2)})[id=diagnostic]}

Порядок выполнения быстрой диагностики неисправностей {var(sys2)}:

1. Проверьте работоспособность сервисов {var(sys2)} (см. раздел {linkto(#common_sys_checking)[text=%text]}).
1. Убедитесь, что доступны основные веб-интерфейсы {var(sys2)}:
   
   1. {linkto(#keycloak_checking)[text=%text]}.
   1. {linkto(#superadmin_checking)[text=%text]}.
   1. {linkto(#mcs_ui_checking)[text=%text]}.
   1. {linkto(#monitoring_checking)[text=%text]}.
   1. {linkto(#logs_checking)[text=%text]}.

### {heading(Проверка работоспособности сервисов)[id=common_sys_checking]}

1. Проверьте, что все `systemd` сервисы на **всех серверах кластера** запущены без ошибок.

   {caption(Команда запуска проверки сервиса)[align=left;position=above]}
   ```bash
   systemctl list-units --failed
   ```
   {/caption}

   {caption(Ожидаемый результат)[align=left;position=above]}
   ```bash
   0 loaded units listed. Pass --all to see loaded but inactive units, too.
   To show all installed unit files use 'systemctl list-unit-files'.
   ```
   {/caption}

   Если обнаружены сервисы с ошибкой, проверьте логи и перезапустите сервис.

   {caption(Просмотр логов и перезапуск сервиса на примере public_haproxy)[align=left;position=above]}
   ```bash
   journalctl -f --no-pager -u public_haproxy
   systemctl restart public_haproxy
   ```
   {/caption}

### {heading(Доступ к веб-интерфейсам {var(sys2)})[id=access_to_web_interfaces]}

Основные веб-интерфейсы {var(sys2)}:

* {linkto(#keycloak_checking)[text=%text]}.
* {linkto(#superadmin_checking)[text=%text]}.
* {linkto(#mcs_ui_checking)[text=%text]}.
* {linkto(#monitoring_checking)[text=%text]}.
* {linkto(#logs_checking)[text=%text]}.

<warn>

Вместо местозаполнителей укажите значения соответствующих переменных из файлов `~/inventory/<ENV>/group_vars/<ENV>/vars.yml` и `~/inventory/<ENV>/group_vars/<ENV>/vault.yml`, где `ENV` — наименование окружения.

Обратите внимание: регистр переменных может не совпадать с регистром местозаполнителей.

</warn>

#### {heading(Портал управления доступом (Keycloak))[id=keycloak_checking]}

Адрес: `https://<KEYCLOAK_PUBLIC_ENDPOINT_DOMAIN>`.

Логин / пароль для входа:

```bash
admin/${vault_keycloak_password}
```

Алгоритм проверки:

<err>

Если ранее был выполнен импорт пользователей и групп из внешних систем (например, Active Directory), то вместо описанного ниже алгоритма убедитесь в наличии импортированных пользователей и групп в области безопасности (realm) MCS.

</err>

1. Выполните вход с помощью учётной записи администратора {var(sys2)} в Keycloak.
1. Выберите область безопасности (realm) MCS.
1. Создайте группу в разделе «Manage» → «Groups» (см. [официальную документацию](https://www.keycloak.org/docs/11.0/server_admin/#groups)).
1. Создайте пользователя в разделе «Manage» → «Users» (см. [официальную документацию](https://www.keycloak.org/docs/11.0/server_admin/#user-management)).
1. Добавьте созданного пользователя в группу, созданную ранее (см. [официальную документацию](https://www.keycloak.org/docs/11.0/server_admin/#groups)).

Ожидаемый результат:

Выполнен вход в Портал управления доступом. Создана группа и пользователь в ней.

#### {heading(Портал администратора {var(sys2)})[id=superadmin_checking]}

Адрес: `https://<SUPERADMIN_PUBLIC_ENDPOINT_DOMAIN>/`.

Логин / пароль для входа:

```bash
superadmin/${vault_iam_sync_user_password}
```

Алгоритм проверки:

1. Убедитесь, что существует хоть одна группа с пользователем (см. раздел {linkto(#keycloak_checking)[text=%text]}).
1. Выполните вход с помощью учётной записи администратора {var(sys2)} в Портал администратора.
1. Создайте проект в разделе «Управление проектами» → «Проекты».
1. Предоставьте права группе пользователей (см. раздел {linkto(../usage_administration/users_management#superadmin_project_access_settings)[text=%text]}).

Ожидаемый результат:

Выполнен вход в Портал администратора {var(sys2)}. Создан новый проект. Добавлена права доступа к выбранному проекту.

#### {heading(Портал самообслуживания)[id=mcs_ui_checking]}

Адрес: `https://<MCS_PUBLIC_URL>`.

Логин / пароль для входа:

* используйте данные учётных записей, реквизиты которых есть в Портале управления доступом (см. раздел {linkto(#keycloak_checking)[text=%text]}).

Алгоритм проверки:

1. Убедитесь, что существует пользователь, для которого настроен доступ в проект (см. раздел {linkto(#superadmin_checking)[text=%text]}).
1. Выполните вход в Портал самообслуживания при помощи учётной записи пользователя, убедитесь, что есть доступ к проекту.
1. Перейдите в раздел «Облачные вычисления», активируйте сервисы согласно предложенной инструкции и создайте ВМ. Шаги по созданию ВМ см. в Руководстве пользователя {var(sys2)}.

Ожидаемый результат:

Выполнен вход в Портал самообслуживания при помощи учётной записи пользователя. Создана новая ВМ.

#### {heading(Портал мониторинга (Zabbix))[id=monitoring_checking]}

<info>

Портал мониторинга может быть не развёрнут по умолчанию.

</info>

Адрес: `https://<MONITORING_ENDPOINT_FQDN>/zabbix/`.

Логин / пароль для входа:

```bash
${vault_zabbix_api_user}/${vault_zabbix_api_user}
```

Алгоритм проверки:

1. Выполните вход с помощью учётной записи администратора {var(sys2)} в Zabbix.

Ожидаемый результат:

Выполнен вход в Портал мониторинга (Zabbix).

#### {heading(Портал логирования (OpenSearch))[id=logs_checking]}

<info>

Портал логирования может быть не развёрнут по умолчанию.

</info>

Адрес: `https://<LOGS_ENDPOINT_FQDN>`.

Логин / пароль для входа:

```bash
admin/${opensearch_users.admin.no_hash_password}
```

Алгоритм проверки:

1. Выполните вход с помощью учётной записи администратора {var(sys2)} OpenSearch.

Ожидаемый результат:

Выполнен вход в Портал логирования (OpenSearch).

## {heading(Регламентное обслуживание)[id=maintenance]}

### {heading(Обслуживание узлов кластера)[id=cluster_nodes_maintenance]}

Для обслуживания узлов кластера предусмотрен механизм их временного отключения. Инструкцию по выводу узлов из кластера см. в соответствующих разделах:

* {linkto(../usage_administration/platform_administration/infrastructure_management#hypervisor_maintenance)[text=%text]}.
* {linkto(../usage_administration/platform_administration/infrastructure_management#controller_maintenance)[text=%text]}.

### {heading(Проверка работы сервисов {var(sys2)})[id=services_checking]}

<info>

Периодически выполняйте проверку работы сервисов и компонентов {var(sys2)}, чтобы избежать критических ошибок и нарушения её работы.

</info>

Шаги по проверке работы основных сервисов и компонентов {var(sys2)} описаны в подразделах далее.

#### {heading(Docker сервисы)[id=docker_services_checking]}

Чтобы проверить состояние Docker сервисов, на управляющем узле выполните команду:

```bash
docker ps -a | grep -v Up
```

Вывод данной команды должен быть либо пустым, либо содержать только пользовательские контейнеры.

<err>

Особое внимание обратите в случае присутствия контейнеров со статусом **Restarting**.

</err>

#### {heading(Кластер RabbitMQ)[id=rabbitmq_checking]}

RabbitMQ функционирует в Kubernetes, при этом на основные компоненты {var(sys2)} существует свой сервис RabbitMQ.

Чтобы проверить состояние кластера RabbitMQ, на управляющем узле выполните команды:

* Просмотр полного списка сервисов RabbitMQ:
   
   ```bash
   kubectl get pods -n rabbitmq
   ```
* Просмотр состояния отдельного сервиса RabbitMQ:
   
   ```bash
   kubectl -n rabbitmq exec <NAME> rabbitmqctl cluster_status
   ```
   
   , где `<NAME>` — наименование целевого сервиса RabbitMQ.

Все сервисы кластера RabbitMQ должны быть в запущенном состоянии, просмотр информации об отдельном сервисе RabbitMQ не должен содержать ошибок.

{caption(Пример вывода команды kubectl get pods -n rabbitmq)[align=left;position=above]}
```bash
NAME                    READY   STATUS    RESTARTS   AGE
rabbitmq-ceilometer-0   1/1     Running   0          20d
rabbitmq-ceilometer-1   1/1     Running   0          20d
rabbitmq-ceilometer-2   1/1     Running   0          20d
rabbitmq-celery-0       1/1     Running   0          20d
```
{/caption}

{caption(Фрагмент вывода команды kubectl -n rabbitmq exec <NAME> rabbitmqctl cluster_status для rabbitmq-nova-0)[align=left;position=above]}
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

#### {heading(Кластер MariaDB (mysql/galera))[id=mariadb_checking]}

Чтобы проверить состояние кластера MariaDB (mysql/galera):

1. На деплой-ноде найдите пароль от целевой БД (в данном случае — MySQL; в команде ниже `<ENV>` — наименование окружения):
   
   ```bash
   grep -r vault_cinder_mysql_password inventory/<ENV>/group_vars/<ENV>/vault.yml
   ```
1. На управляющем узле выполните команду:
   
   ```bash
   mysql -h <HOSTNAME> -u cinder -D cinder -p --execute "SHOW GLOBAL STATUS LIKE 'wsrep_local_state_comment';"
   ```
1. Введите пароль, полученный на шаге 1.

Ожидаемое состояние — `Synced`.

{caption(Пример вывода команды проверки состояния кластера)[align=left;position=above]}
```bash
+---------------------------+--------+
| Variable_name             | Value  |
+---------------------------+--------+
| wsrep_local_state_comment | Synced |
+---------------------------+--------+
```
{/caption}

#### {heading(Мониторинг и логирование)[id=logging_monitoring_checking]}

Чтобы проверить состояние мониторинга и логирования:

1. На узле, подлежащем проверке, выполните команду:
   
   ```bash
   docker ps -a | egrep 'zabbix|fulentd'
   ```
   
   Все контейнеры должны быть в запущенном (`Up`) состоянии.
1. Проверьте журналы контейнеров на наличие ошибок:
   
   ```bash
   docker logs --tail=100 fluentd
   docker logs --tail=100 mcs_zabbix_agent
   ```

#### {heading(Сервисы Nova)[id=nova_services_checking]}

Чтобы проверить состояние компонентов Nova:

1. Выполните подготовительные операции для подключения к OpenStack CLI по инструкции {linkto(../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}.
1. Получите список сервисов на целевом узле:
   
   ```bash
   openstack compute service list | grep <HOSTNAME>
   ```
   
   Вывод должен показать состояние всех сервисов Nova на узле как `up`.

   {caption(Пример списка сервисов Nova)[align=left;position=above]}
   ```bash
   openstack compute service list | grep <HOSTNAME>
   
   |  3 | nova-conductor   | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:38:00.000000 |
   | 33 | nova-scheduler   | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:38:03.000000 |
   | 42 | nova-consoleauth | <HOSTNAME>   | internal | enabled | up    | 2020-07-23T13:37:57.000000 |
   ```
   {/caption}

#### {heading(Сервисы Cinder)[id=cinder_services_checking]}

Чтобы проверить состояние сервисов Cinder:

1. Выполните подготовительные операции для подключения к OpenStack CLI по инструкции {linkto(../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}.
1. Получите список состояний сервиса целевого узла:
   
   ```bash
   openstack volume service list | grep <HOSTNAME>
   ```
   
   Вывод должен показать состояние всех сервисов Cinder на узле как `up`.

   {caption(Пример списка сервисов Cinder)[align=left;position=above]}
   ```bash
   openstack volume service list | grep <HOSTNAME>
   
   | cinder-scheduler | <HOSTNAME> | nova | enabled | up    | 2020-07-23T13:38:25.000000 |
   | cinder-backup    | <HOSTNAME> | nova | enabled | up    | 2020-07-23T13:38:27.000000 |
   ```
   {/caption}

#### {heading(Журналы Neutron)[id=neutron_log_checking]}

Чтобы проверить журналы Neutron, на управляющем узле выполните команду:

```bash
ls -t /var/log/neutron/ | egrep -v 'log..' | grep neutron | xargs -l1 -I {} tail -n 200 /var/log/neutron/{} | grep -i error
```

Вывод данной команды должен быть пустым.

#### {heading(Сервисы Neutron)[id=neutron_services_checking]}

Чтобы проверить состояние сервисов Neutron:

1. Выполните подготовительные операции для подключения к OpenStack CLI по инструкции {linkto(../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}.
1. Получите список состояний сервиса, выполнив команду:

   {caption(Пример списка сервисов Neutron)[align=left;position=above]}
   ```bash
   openstack network agent list | grep <HOSTNAME>
   
   | 02480c02-1827-4007-b31a-08c4cb599826 | Metadata agent            | <HOSTNAME>  | None  | True  | UP    | neutron-metadata-agent    |
   | 67dd92dc-465e-4c28-a52d-9e76b85f66bb | Open vSwitch agent        | <HOSTNAME>  | None  | True  | UP    | neutron-openvswitch-agent |
   | a0411328-04d9-46b3-a0a2-0c4e23b8eb06 | L3 agent                  | <HOSTNAME>  | nova  | True  | UP    | neutron-l3-agent          |
   | a4647593-d7ad-42dd-90e6-b535fe9cb87e | BGP dynamic routing agent | <HOSTNAME>  | None  | True  | UP    | neutron-bgp-dragent       |
   | bf2b46eb-74a5-40b6-bc40-e0e6fb035dd4 | DHCP agent                | <HOSTNAME>  | nova  | True  | UP    | neutron-dhcp-agent        |
   | c02faf6d-e10b-483d-ba19-970baea03584 | Loadbalancerv2 agent      | <HOSTNAME>  | None  | True  | UP    | neutron-lbaasv2-agent     |
   ```
   {/caption}
   
   Поле «Alive» должно иметь значение `True`, поле «State» — `UP` (для всех сетевых агентов). Если есть сервисы с выключенным агентом, выполните шаги:

      1. Зайдите на сервер `<HOSTNAME>` по SSH.
      1. Проверьте логи и перезагрузите выключенные сервисы:

         {caption(Просмотр логов и перезапуск сервиса на примере neutron-l3-agent)[align=left;position=above]}
         ```bash
         journalctl -f --no-pager -u neutron-l3-agent
         systemctl restart neutron-l3-agent
         ```
         {/caption}

#### {heading(Журналы Nginx)[id=nginx_log_checking]}

Чтобы проверить журналы Nginx, выполните команду:

```bash
ls -t /var/log/nginx/ | egrep -v 'log..' | grep error | xargs -l1 -I {} tail -n 200 /var/log/nginx/{} | grep -i error
```

Возможные виды выводимых ошибок:

* допустимые:
   
  * `30x` — ошибки, связанные с попытками входа с неверными УЗ.
  * `40x` — ошибки, связанные с неверными запросами пользователей.
* недопустимые:
  * `50x` — ошибки, связанные с работой сервиса.