# {heading(Перезапуск кластера Galera)[id=galera]}

Перед перезапуском кластера Galera определите на скольких узлах кластера возникла ошибка. Процесс перезапуска будет отличаться в зависимости от количества узлов.

## {heading(Проблема возникла на одном узле кластера)[id=galera_one_node]}

Подключитесь к узлу, на котором возникла проблема и перезапустите сервис:

```console
# systemctl stop mariadb-<SERVICE_NAME>
# systemctl start mariadb-<SERVICE_NAME>
```
Здесь `<SERVICE_NAME>` — имя сервиса.

## {heading(Проблема возникла на двух узлах кластера)[id=galera_two_node]}

<warn>

Применение данного метода рекомендуется только в случае, если невозможно использовать методы решения для одного или трех узлов.

</warn>

При выходе из строя двух узлов (сбой, split-brain), единственный рабочий узел может перейти в режим `non-primary mode`. В таком случае, БД будет принимать подключения, но при выполнении SQL-запросов возможны ошибки вида:

```console
ERROR 1047 (08S01): WSREP has not yet prepared node for application use
```

Для восстановления кластера:

1. Остановите узлы с ошибками:

   ```console
   # systemctl stop mariadb-<SERVICE_NAME>.service
   ```
   
   Здесь `<SERVICE_NAME>` — имя сервиса.

1. Переведите единственный рабочий узел из режима `non-primary` в `primary`, динамически изменив параметр `pc.bootstrap=true`:

   ```console
   # mysql -S /srv/mysql/<service>/socket/<SERVICE_NAME>.sock -u root
   ```
   Здесь `<SERVICE_NAME>` — имя сервиса.

   {caption(Пример команды)[align=left;position=above]}
   ```console
   # mysql -S /srv/mysql/keystone/socket/keystone.sock -u root
   mysql> SET GLOBAL wsrep_provider_options='pc.bootstrap=true';
   ```
   {/caption}

1. Перезапустите сервисы БД на узлах.

## {heading(Проблема возникла на трех узлах кластера)[id=galera_three_node]}

1. Найдите узел, у которого в файле `/srv/mysql/<service>/data/grastate.dat` наибольшее значение `seqno`. В случае предварительной остановки кластера, вероятнее всего это будет сервер, остановленный последним.

1. Для каждого узла, у которого значение `seqno` — `-1`, запустите команду: 

   ```console
   # sudo -u mysql mysqld --defaults-file=/etc/<SERVICE_NAME>.cnf --wsrep-recover
   ```
   Здесь `<SERVICE_NAME>` — имя сервиса.

   {caption(Пример команды)[align=left;position=above]}
   ```console
   # sudo -u mysql mysqld --defaults-file=/etc/keystone.cnf --wsrep-recover
   ```
   {/caption}

1. Убедитесь, что команда выполнена корректно, для этого в логах  `/srv/mysql/<service>/log/mysql.err` найдите последнее сообщения вида:

   ```console
   WSREP: Recovered position: 5980ce47-9e50-11ec-ba04-0eccf84172d0:81251
   ```
   Здесь `81251` — порядковый номер.

1. На узле с наибольшим значением `seqno`, запустите бутстрап кластера одним из способов:

   **Способ 1**. Выполните команды:
   
      ```console
      # systemctl set-environment_WSREP_NEW_CLUSTER='--wsrep-new-cluster' && systemctl restart mariadb-<SERVICE_NAME>
      # systemctl unset-environment_WSREP_NEW_CLUSTER
      ```
      Здесь `<SERVICE_NAME>` — имя сервиса.   

   **Способ 2**. В файле `/srv/mysql/<service>/data/grastate.dat` задайте параметр `safe_to_bootstrap: 1` и запустите БД:

      ```console
      # systemctl restart mariadb-<SERVICE_NAME>
      ```
      Здесь `<SERVICE_NAME>` — имя сервиса.

1. После успешного старта запустить сервисы БД на оставшихся узлах:

   ```console
   # systemctl start mariadb-<SERVICE_NAME>.service
   ```
   Здесь `<SERVICE_NAME>` — имя сервиса.


Для автоматического запуска БД после процедуры остановки серверов (graceful shutdown) или сервисов БД, используйте Ansible:

```console
#  ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_<SERVICE_NAME> -t recovery../ansible-openstack/playbooks/galera.yml
```
Здесь `<SERVICE_NAME>` — имя сервиса.

{caption(Пример команды)[align=left;position=above]}
```console
# ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_keystone -t recovery ../ansible-openstack/playbooks/galera.yml
```
{/caption}