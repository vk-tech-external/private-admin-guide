# {heading(Операции с управляющими узлами)[id=infrastructure_management_node]}

## {heading(Определение Главного управляющего узла)[id=main_control_node]}

<!--- //#todo Оптимизировать структуру повествования -->

{ifndef(cer)}
Не все управляющие узлы полностью равнозначны. Один из управляющих узлов содержит в себе мастер-ноды кластеров СУБД Tarantool (Breeze, Dusk), которые используются другими компонентами {var(sys2)} (например, IAM). Все остальные управляющие узлы содержат реплики этих кластеров (доступные только для чтения).
{/ifndef}

{ifdef(cer)}
Не все управляющие узлы полностью равнозначны. Один из управляющих узлов содержит в себе мастер-ноды кластеров СУБД Tarantool (Dusk), которые используются другими компонентами {var(sys2)}. Все остальные управляющие узлы содержат реплики этих кластеров (доступные только для чтения).
{/ifdef}

<err>

В случае недоступности Главного управляющего узла (например, его выхода из строя или отключения/перезагрузки) становятся недоступны основные интерфейсы управления {var(sys2)}: Портал самообслуживания, Портал администратора, API, CLI. При этом работа виртуальных вычислительных ресурсов {var(sys2)} (ВМ, сетей, СУБД и кластеров) продолжается в штатном режиме, однако их остановка или запуск новых ресурсов остаются временно недоступны.

После восстановления работоспособности Главного управляющего узла все функции {var(sys2)} должны работать в штатном режиме.

</err>

Для определения списка запущенных на узле инстансов Tarantool выполните команду:

```console
$ ls /etc/tarantool/instances.available
```

Для определения того, является ли управляющий узел Главным управляющим узлом, достаточно подключиться к одному из инстансов Tarantool командой `tarantoolctl enter <ИМЯ_ИНСТАНСА>` и проверить значение параметра `read_only` из `box.cfg` при помощи команды `box.info.ro`.

{caption(Команды для подключения к инстансу Tarantool и проверки запрета записи)[align=left;position=above]}
```console
$ sudo bash
# tarantoolctl enter breeze_01
# box.info.ro
```
{/caption}

Возможные результаты:

* `true` — текущий узел является обычным управляющим узлом с репликой Tarantool.
* `false` — текущий узел является Главным управляющим узлом с мастером Tarantool.

{caption(Пример вывода консоли)[align=left;position=above]}
```console
~> tarantoolctl enter breeze_01
connected to unix/:/var/run/tarantool/breeze_01.control
unix/:/var/run/tarantool/breeze_01.control> box.info.ro
---
- false
...
```
{/caption}

<info>

Параметр `read_only` равный `true` означает, что инстанс Tarantool поддерживает только чтение данных, поскольку является репликой.

</info>

## {heading(Вывод управляющего узла (controller) из кластера)[id=controller_maintenance]}

Для обслуживания управляющего узла предусмотрен механизм его временного отключения из кластера.

Чтобы вывести управляющий узел из кластера:

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
      <!--- //** Description — описание периода. -->
      * Periods — нажмите на ссылку **Add** в таблице **Periods**. В открывшемся модальном окне укажите периодичность и продолжительность периода технического обслуживания и нажмите кнопку **Add**.
      * Host groups — группы хостов. Нажмите кнопку **Select** справа от названия, выберите пункты списка и нажмите кнопку **Select**. Выберите из списка вычислительный узел, который необходимо вывести из кластера.
      * Hosts — хосты. Нажмите кнопку **Select** справа от названия, выберите пункты списка и нажмите кнопку **Select**.
      * Tags — поиск по тегам.

   1. Нажмите кнопку **Add** в нижней части вкладки. На странице **Maintenance periods** появится новая запись.

1. Перейдите на отключаемый управляющий узел по SSH.
1. Проверьте состояние таймеров биллинга и сервисов, которые они запускают:

   ```console
   $ systemctl list-timers --all scrooge-charger.timer scrooge-billing.timer
   $ systemctl list-units --all scrooge-charger.service scrooge-billing.service
   ```
   
   Если сервисы не запущены и их запуск не запланирован таймерами в ближайшее время, перейдите к следующему шагу.

2. Выполните команду остановки сервера:

```console
$ shutdown now
```

После выведения из кластера управляющий узел можно отключить от сети, отключить питание и выполнить работы по ремонту/модернизации.

<warn>

Шаги по перезагрузке сервера идентичны описанной инструкции, кроме последнего шага: выполните команду `reboot`.

</warn>

## {heading(Включение управляющего узла)[id=enabling_control_node]}

<info>

После завершения работ по ремонту/модернизации управляющего узла необходимо заново подключить его к кластеру.

</info>

Чтобы включить управляющий узел:

1. Убедитесь, что управляющий узел физически включен и выполнен автоматический запуск сервисов.
1. Перейдите на включенный управляющий узел по SSH.
1. Проверьте состояние сервисов, выполнив команду:

   ```console
   $ systemctl list-units --all --type=service
   ```

   <err>

   Перечисленные ниже сервисы могут находиться в статусах `active` и `running`:

   {ifndef(cer)}
   ```text
   clickhouse-server
   consul
   dnsmasq
   docker
   etcd*
   exabgp
   filebeat
   httpd-*
   kube*
   mariadb-*
   memcached
   neutron-*
   octavia-*
   openstack-*
   private_haproxy
   public_haproxy
   proxysql
   tarantool*
   zabbix-agent
   zookeeper
   ```
   {/ifndef}

   {ifdef(cer)}

   ```text
   clickhouse-server
   consul
   dnsmasq
   docker
   exabgp
   filebeat
   httpd-*
   kube*
   mariadb-*
   neutron-*
   openstack-*
   owl
   private_haproxy
   public_haproxy
   proxysql
   tarantool*
   zabbix-agent
   zephyr
   zookeeper
   ```
   {/ifdef}

   </err>
   
1. Если сервисы из списка выше не запустились автоматически, выполните их перезапуск вручную.

   <info>

   Сервис `httpd-panko.service` присутствует только на узлах `cpn001` и `cpn002`. Сервисы Kubernetes `kube-apiserver.service`, `kube-controller-manager.service` и `kube-scheduler.service` присутствуют только на узлах `cpn002` и `cpn003`.

   </info>
   
1. При включении узла `cpn001` проверьте работу сервиса биллинга, выполнив команду:

   ```console
   $ systemctl | grep scrooge
   ```

   Убедитесь, что сервисы находятся в статусах `active` и `running`. Для таймеров допускается статус `waiting`.

1. Переключитесь на пользователя `root`, выполнив команду `sudo bash`.
1. Проверьте наличие запущенных Docker-контейнеров, выполнив команды:

   {ifndef(cer)}
   ```console
   $ docker ps | grep gb_tarantool
   $ docker ps | grep rabbit_persistent
   ```
   {/ifndef}

   {ifdef(cer)}
   ```console
   $ docker ps | grep gb_tarantool
   ```
   {/ifdef}

1. Запустите неработающие контейнеры, выполнив команды:

   {ifndef(cer)}
   ```console
   $ docker start gb_tarantool
   $ docker start rabbit_persistent
   ```
   {/ifndef}
   
   {ifdef(cer)}
   ```console
   $ docker start gb_tarantool
   ```
   {/ifdef}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Проверьте состояние нод и сервисов Kubernetes:

   ```console
   # kubectl get nodes
   # kubectl get pods -A | grep 0/
   ```
   
   Все ноды должны находиться в статусе `Ready`.

1. Проверьте состояние агентов Neutron:

   ```console
   # openstack network agent list
   ```
   
   Агенты должны находиться в состоянии `Alive` — `True`, `State` — `UP`.

1. Проверьте состояние сервисов Nova:

   ```console
   # openstack compute service list
   ```
   
   Сервисы должны находиться в статусе `enabled`, `up`.

{ifndef(cer)}
## {heading(Управление базами данных {var(sys2)})[id=bd_management]}

Сервисы OpenStack для хранения информации используют БД MySQL, которые располагаются на управляющих узлах (контроллерах).

Отдельные серверы БД предоставляются для каждого сервиса и объединяются в единый кластер Galera.

### {heading(Управление кластерами БД)[id=bd_cluster_management]}

Чтобы развернуть кластер Galera, запустите плейбук для роли `galera`:

```console
$ ansible-playbook -i vkcloud.yml \
   -e env=stage_name \
   ./playbooks/galera.yml
```

Чтобы восстановить кластер Galera, запустите плейбук для роли `galera` с тегом `recovery` и передайте переменную `galera_recovery_group` с именем группы для кластера.

{caption(Пример восстановления кластера для БД nova)[align=left;position=above]}
```console
$ ansible-playbook -i vkcloud.yml\
   -e env=vkcloud \
   -e galera_recovery_group=vkcloud_galera_nova \
   -t recovery \
   ../ansible-openstack/playbooks/galera.yml
```
{/caption}

### {heading(Создание резервной копии БД)[id=creating_db_backup]}

Чтобы создать скрипты для резервного копирования на управляющем узле с БД, используйте один из следующих способов:

* Вручную создайте каталог для резервного копирования на нужном узле или узлах, по умолчанию это каталог `/srv/backup` (в дальнейшем указывается в переменной `xtrabackup_dir`). Запустите плейбук для роли `galera` как описано в разделе {linkto(#bd_cluster_management)[text=%text]}.
* В файле inventory установите переменную `galera_create_backup_script_dir: True` для нужного хоста.

<warn>

Плейбуки не устанавливают периодичность запуска скриптов для резервного копирования. Эта задача остается на усмотрение администратора облака.

</warn>

### {heading(Восстановление БД из резервной копии)[id=restoring_db_from_backup_copy]}

Восстановление БД имеет смысл выполнять, только когда нет других вариантов.

<err>

Из-за разницы во времени резервных копий разных БД или при восстановлении только одной БД состояние облака будет неконсистентным и часть сущностей необходимо будет удалить вручную, в частности, ВМ/диски/сети/PaaS.

</err>

<err>

При восстановлении БД из резервной копии старая БД удаляется без дополнительных запросов.

</err>

Чтобы восстановить БД из резервной копии, запустите плейбук для роли `galera` со следующими переменными:

```console
$ ansible-playbook -i vkcloud.yml \
   -e env=vkcloud \
   -e db_restore_name=nova \
   -e xtrabackup_dir="/srv/backup" \
   -e db_backup_file_time=20220816_1428 \
   -e galera_recovery_group=vkcloud_galera_nova \
   -t recovery \
   ../ansible-openstack/playbooks/galera.yml
```

Чтобы восстановление прошло без ошибок, должны быть выполнены условия:

* Резервная копия БД должна быть создана скриптом `/srv/backup/backup_xtra_<db_name>.sh`.
* Файл с резервной копией должен быть хотя бы на одном из узлов с БД.
* В команде восстановления БД все переменные должны быть обязательно заданы, кроме `xtrabackup_dir` (по умолчанию берется из файла `inventory`).

При восстановлении БД будут созданы временные ресурсы:

* Файл резервной копии будет скопирован на деплой-ноду в `/tmp` и в дальнейшем автоматически удален.
* Файл резервной копии будет скопирован на ноду, выбранную в качестве bootstrap-ноды для кластера, и не будет удален.
* Будет разархивирован каталог `<xtrabackup_dir>/extrabackup_<db_restore_name>` и не будет удален.

Логика по восстановлению кластера определена в файле `roles/galera/tasks/dbrecovery.yml`.
{/ifndef}