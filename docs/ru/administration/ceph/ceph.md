# {heading(Работа с CEPH)[id=ceph]}

## {heading(Общие сведения)[id=ceph_general_details]}

Управление кластером CEPH в {var(sys3)} осуществляется при помощи плейбука `ansible-openstack/playbooks/ceph-osd-deploy.yml` c использованием основного inventory `vkcloud/vkcloud.yml`.

Основные группы для CEPH кластера, которые требуются для развёртывания {var(sys2)}:

* `MONs` — серверы-мониторы. Отслеживают состояние кластера. Минимальное количество серверов: 3.
* `OSDs` — серверы хранения данных (Object Storage Device). Минимальное количество серверов для обеспечения отказоустойчивости: 3.
* `MGRs` — группа демонов менеджеров (Manager Daemon). Собирают метрики и осуществляют мониторинг.
* `MDSs` — группа серверов метаданных (Metadata Server Daemon). Отвечают за работоспособность файловой системы `CephFS`.

В CEPH используются компоненты:

* `CephFS` — распределённая POSIX-совместимая файловая система. CephFS используется для загрузки образов Glance и примонтирован на всех управляющих узлах.
* `RBD` — блочное устройство с поддержкой технологии Thin provisioning и снэпшотов. Все диски ВМ хранятся в качестве устройств RADOS Block Device (RBD).

<info>

Подробная информация о запуске плейбуков приведена в разделе {linkto(../../../administration/infrastructure_management_main/infrastructure_management_configs#infrastructure_management_configs)[text=%text]}.

</info>

<!---

== Установка и настройка Ceph

Компоненты для развертывания CEPH входят в состав изолированного Nexus:

* Набор плейбуков ceph-ansible.
* Docker-образы.

В состав дистрибутива {var(sys2)} входит версия CEPH octopus. Чтобы проверить версию Ceph, выполните команду `ceph --version`.

=== Первоначальная подготовка

TIP: В примерах ниже используется CEPH кластер из трёх нод. Для большей отказоустойчивости рекомендуется создать кластер из 9 нод.

. Заполните файл inventory, содержащий информацию о серверах, входящих в состав CEPH кластера.
+
.Пример заполненного файла inventory для кластера
[source, txt]
----
[mons]
csn001
csn002
csn003

[osds]
csn001
csn002
csn003

[mdss]
csn001
csn003

[mgrs]
csn002
csn003
----
+
. Найдите файл `site-container.yml.sample` и переименуйте его в `${playbook_name}.yml`, где `${playbook_name}` — название компонента CEPH.
+
TIP: Если CEPH устанавливается сразу в системе, а не в контейнере, найдите и переименуйте файл `site.yml.sample` в `${playbook_name}.yml`.
+
. В файле переменных `group_vars/all.yaml` укажите переменные, отвечающие за ключи для подключения к CEPH под разными пользователями:
+
TIP: Получите значения переменных, выполнив команду `ceph-authtool --gen-print-key` на узле CEPH, и укажите вместо пустых значений, приведённых в примере далее.
+
.Переменные для CEPH
[source, yaml]
----
vault_ceph_client_key: ""
vault_ceph_client_manila: ""
vault_ceph_admin_glance: ""
vault_ceph_admin_glance_tmp: ""
vault_ceph_admin_nova: ""
----
+
. Проверьте права доступа к кластеру, выполнив команду:
+
[source, console]
----
ceph auth list
----
+
. В файле переменных `group_vars/all.yaml` укажите адреса подсетей, выделенные для CEPH кластера:
+
.Пример заполнения адресов подсетей
[source, yaml]
----
public_network: "10.12.0.0/16"
cluster_network: "10.12.0.0/16"
monitor_interface: "eth1"
----
+
WARNING: Переменные для ключей доступов к CEPH кластеру, ID кластера и подсети должны совпадать с переменными, указанными в ansible-openstack, в качестве подключения к Ceph, перед развертыванием {var(sys2)}.

=== Установка

Чтобы установить CEPH кластер:

. Пропишите алиасы для запуска CLI-команд на Ceph-узлах, выполнив команды:
+
[source, console]
----
alias "ceph=docker exec -ti $(docker ps --format '{{.Names}}'|grep mon) ceph"
alias "rbd=docker exec -ti $(docker ps --format '{{.Names}}'|grep mon) rbd"
----
+
. Запустите развёртывание CEPH кластера, выполнив команду:
+
[source, console]
----
$ ansible-playbook -i inventory ./${playbook_name}.yml
----

-->

## {heading(Операции с узлами)[id=ceph_node_operations]}

Узел — физический сервер, на котором может быть развёрнуто несколько сервисов CEPH.

{caption(Пример сервисов CEPH для узла OSD)[align=left;position=above]}
```console
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 9
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 0
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 6
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 3
```
{/caption}

В примере выше работают ноды с OSD под номерами `0`, `3`, `6`, `9`. Каждый сервис функционирует в отдельном Docker-контейнере.

### {heading(Просмотр всех имеющихся пулов в кластере)[id=ceph_view_pools_in_cluster]}

```console
$ ceph osd pool ls
```

{ifndef(cer)}
{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
device_health_metrics
glance-images
cinder-volumes
vms
manila-volumes
cephfs_data
cephfs_metadata
```
{/caption}
{/ifndef}

### {heading(OSD-узел)[id=ceph_osd_node]}

#### {heading(Вывод структуры OSD-узла)[id=ceph_osd_tree]}

Чтобы вывести структуру OSD-узла, выполните команду на этом узле:

{caption(Команда вывода структуры OSD-узла)[align=left;position=above]}
```console
$ ceph osd tree
```
{/caption}

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
ID  CLASS  WEIGHT   TYPE NAME          STATUS  REWEIGHT  PRI-AFF
-1         0.39990  root default
-3         0.19995      host csn001
 0    hdd  0.04999          osd.0          up   1.00000  1.00000
 2    hdd  0.04999          osd.2          up   1.00000  1.00000
 4    hdd  0.04999          osd.4          up   1.00000  1.00000
 6    hdd  0.04999          osd.6          up   1.00000  1.00000
-5         0.19995      host csn002
 1    hdd  0.04999          osd.1          up   1.00000  1.00000
 3    hdd  0.04999          osd.3          up   1.00000  1.00000
 5    hdd  0.04999          osd.5          up   1.00000  1.00000
 7    hdd  0.04999          osd.7          up   1.00000  1.00000
```
{/caption}

#### {heading(Добавление нового OSD-узла)[id=ceph_creating_osd_node]}

1. Добавьте новый узел в переменную `equipment.ceph` в `файле minimal.yml`. Чтобы внести изменения в существующий кластер Ceph, воспользуйтесь плейбуком `ansible-openstack/playbooks/ceph-osd-deploy.yml`.
1. Проверьте статус CEPH кластера:

   ```console
   $ ceph health
   ```

   Дождитесь, когда кластер перейдет в статус `HEALTH_OK`.

1. Убедитесь, что узел появился, выполнив команду вывода структуры OSD (подробнее — в разделе {linkto(#ceph_osd_tree)[text=%text]}).
1. При необходимости выведите разницу между структурами узлов:

   ```console
   $ ceph osd df
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   ID  CLASS  WEIGHT   REWEIGHT  SIZE     RAW USE  DATA     OMAP     META      AVAIL    %USE   VAR   PGS  STATUS
    1    hdd  0.04999   1.00000   25 GiB  4.8 GiB  3.8 GiB  188 KiB  1024 MiB   20 GiB  19.35  1.11   41      up
    2    hdd  0.04999   1.00000   25 GiB  3.5 GiB  2.5 GiB   92 KiB  1024 MiB   21 GiB  14.01  0.81   28      up
    4    hdd  0.04999   1.00000   25 GiB  4.1 GiB  3.1 GiB  126 KiB  1024 MiB   21 GiB  16.54  0.95   40      up
    6    hdd  0.04999   1.00000   25 GiB  4.7 GiB  3.7 GiB  144 KiB  1024 MiB   20 GiB  18.88  1.09   37      up
    0    hdd  0.04999   1.00000   25 GiB  3.8 GiB  2.8 GiB  134 KiB  1024 MiB   21 GiB  15.27  0.88   29      up
    3    hdd  0.04999   1.00000   25 GiB  4.5 GiB  3.5 GiB      0 B     1 GiB   21 GiB  17.88  1.03   43      up
    5    hdd  0.04999   1.00000   25 GiB  4.1 GiB  3.1 GiB      0 B     1 GiB   21 GiB  16.51  0.95   35      up
    7    hdd  0.04999   1.00000   25 GiB  5.1 GiB  4.1 GiB  185 KiB  1024 MiB   20 GiB  20.44  1.18   36      up
                          TOTAL  200 GiB   35 GiB   27 GiB  872 KiB   8.0 GiB  165 GiB  17.36
   MIN/MAX VAR: 0.81/1.18  STDDEV: 2.03
   ```
   {/caption}

#### {heading(Вывод OSD-узла из эксплуатации)[id=ceph_osd_disable]}

1. Отключите сервисы, функционирующие на узле OSD:

   ```console
   $ systemctl disable --now <НАЗВАНИЕ_СЕРВИСА_OSD>
   ```

   <info>

   В примерах приведены узлы с OSD под номерами `0`, `2`, `4`, `6`.

   </info>

   {caption(Пример отключения сервисов на узле)[align=left;position=above]}
   ```console
   $ systemctl disable --now ceph-osd@0.service
   $ systemctl disable --now ceph-osd@2.service
   $ systemctl disable --now ceph-osd@4.service
   $ systemctl disable --now ceph-osd@6.service
   ```
   {/caption}

1. Удалите OSD из Crush maps:

   ```console
   $ ceph osd crush remove <НАЗВАНИЕ_СЕРВИСА_OSD>
   ```

   {caption(Пример удаления сервисов OSD из Crush maps)[align=left;position=above]}
   ```console
   $ ceph osd crush remove osd.0
   $ ceph osd crush remove osd.2
   $ ceph osd crush remove osd.4
   $ ceph osd crush remove osd.6
   ```
   {/caption}

1. Удалите сервисы OSD:

   ```console
   $ ceph osd rm <НАЗВАНИЕ_СЕРВИСА_OSD>
   ```

   {caption(Пример удаления сервисов OSD)[align=left;position=above]}
   ```console
   $ ceph osd rm osd.0
   $ ceph osd rm osd.2
   $ ceph osd rm osd.4
   $ ceph osd rm osd.6
   ```
   {/caption}

#### {heading(Удаление OSD-узла)[id=ceph_deleting_osd_node]}

1. Выведите OSD-узел из эксплуатации (подробнее — в разделе {linkto(#ceph_osd_disable)[text=%text]}).
1. Найдите название узла, который необходимо удалить, в файле `inventory`.
1. Удалите узел:

   ```console
   $ ceph osd crush remove <НАЗВАНИЕ_УЗЛА>
   ```
1. Проверьте статус CEPH кластера:

   ```console
   $ ceph health
   ```

   Дождитесь, когда кластер перейдет в статус `HEALTH_OK`.

### {heading(MON-узел)[id=ceph_mon_node]}

#### {heading(Добавление нового MON-узла)[id=ceph_creating_mon_node]}

1. Добавьте новый узел в переменную `equipment.ceph` в файле `minimal.yml`. Чтобы внести изменения в существующий кластер CEPH, воспользуйтесь плейбуком `ansible-openstack/playbooks/ceph-osd-deploy.yml`.
1. Проверьте статус создания MON-узла:

   ```console
   $ ceph mon stat
   $ ceph -s
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   $>ceph mon stat
   e1: 3 mons at {csn001=[v2:10.12.0.19:3300/0,v1:10.12.0.19:6789/0],csn002=[v2:10.12.0.20:3300/0,v1:10.12.0.20:6789/0],csn003=[v2:10.12.0.21:3300/0,v1:10.12.0.21:6789/0]}, election epoch 8, leader 0 csn001, quorum 0,1,2 csn001

   $>ceph -s
     cluster:
       id:     5456e034-c7a6-4a7d-af66-1e95be8e50b1
       health: HEALTH_OK

     services:
       mon: 3 daemons, quorum csn001,csn002,csn003 (age 4h)
       mgr: csn003(active, since 5h), standbys: csn002
       mds: cephfs:1 {0=csn003=up:active} 1 up:standby
       osd: 8 osds: 8 up (since 4h), 8 in (since 13h)

     data:
       pools:   7 pools, 289 pgs
       objects: 3.44k objects, 26 GiB
       usage:   35 GiB used, 165 GiB / 200 GiB avail
       pgs:     289 active+clean
   ```
   {/caption}

#### {heading(Вывод MON-узла из эксплуатации)[id=ceph_decommissioning_mon_node]}

1. Перейдите по SSH на CSN-сервер, откуда требуется вывести узел.
1. Отключите службу, отвечающую за работу MON-сервиса:

   ```console
   $ systemctl disable --now ceph-mon.target
   ```
   
1. Удалите MON-узел из CSN-сервера:

   ```console
   $ ceph mon remove <НАЗВАНИЕ_CSN_СЕРВЕРА>
   ```
   
1. Проверьте статус MON-узлов:

   ```console
   $ ceph mon stat
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   e2: 2 mons at {csn001=[v2:10.12.0.19:3300/0,v1:10.12.0.19:6789/0],csn003=[v2:10.12.0.21:3300/0,v1:10.12.0.21:6789/0]}, election epoch 20, leader 0 csn001, quorum 0,1 csn001,csn003
   ```
   {/caption}

1. Найдите файл `ceph.conf` на всех узлах и удалите из него IP CSN-сервера, для которого выводился MON-узел, из секции `mon host`.
1. Удалите CSN-сервер, для которого выводился MON-узел, из группы `mons` в файле inventory.

### {heading(MDS-узел)[id=ceph_mds_node]}

#### {heading(Добавление нового MDS-узла)[id=ceph_creating_mds_node]}

1. Добавьте новый узел в переменную `equipment.ceph` в файле `minimal.yml`. Чтобы внести изменения в существующий кластер CEPH, воспользуйтесь плейбуком `ansible-openstack/playbooks/ceph-osd-deploy.yml`.
1. Проверьте статус создания MDS-узла:

   ```console
   $ ceph mds stat
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   cephfs:1 {0=csn003=up:active} 1 up:standby
   ```
   {/caption}

#### {heading(Вывод MDS-узла из эксплуатации)[id=ceph_decommissioning_mds_node]}

1. Перейдите по SSH на CSN-сервер, откуда требуется вывести узел.
1. Отключите службу, отвечающую за работу MDS-сервиса:

   ```console
   $ systemctl disable --now ceph-mds.target
   ```
   
1. Удалите CSN-сервер, для которого выводился MON-узел, из группы `mdss` в файл `inventory`.

### {heading(MGR-узел)[id=ceph_mgr_node]}

#### {heading(Добавление нового MGR-узла)[id=ceph_creating_mgr_node]}

1. Добавьте новый узел в переменную `equipment.ceph` в файле `minimal.yml`. Чтобы внести изменения в существующий кластер CEPH, воспользуйтесь плейбуком `ansible-openstack/playbooks/ceph-osd-deploy.yml`.
1. Проверьте статус создания MGR-узла:

   ```console
   $ ceph -s
   ```

#### {heading(Вывод MGR-узла из эксплуатации)[id=ceph_decommissioning_mgr_node]}

1. Перейдите по SSH на CSN-сервер, откуда требуется вывести узел.
1. Отключите службу, отвечающую за работу MGR-сервиса:

   ```console
   $ systemctl disable --now ceph-mgr.target
   ```

   <err>

   Если заранее известно, для какого сервера выводится узел, укажите его в команде, например, для сервера `csn002`:

   </err>

   ```console
   systemctl disable --now ceph-mgr@csn002.service
   ```
   
1. Удалите CSN-сервер, для которого выводился MGR-узел, из группы `mgrs` в файл `inventory`.

### {heading(Пулы RBD)[id=ceph_rbd_pools]}

#### {heading(Просмотр содержимого RBD-пула)[id=ceph_viewing_contents_rbd_pool]}

```console
$ rbd ls ${PoolName}
```

Здесь `${PoolName}` — переменная с именем пула.

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
$>rbd ls glance-images
1c72bd62-901b-4eef-926c-00250c00007c
5887f985-bc7a-4aae-9951-2db13fe5523f
58d06e85-43e2-4dd3-ac42-f5d776218921
6b006060-515e-48b0-bd16-d9c476c49c3c
8cc653e9-2cd1-4ed9-9759-f65061338a0c
be2da014-613e-42d9-ba6a-9232fde79b7d
eb93cf6b-f55e-4f92-9311-1f2fd7cd47be
ed774e49-e1d9-4345-a834-076b2e1c8fda
f3bfa55d-5068-4175-9aa1-5d0d3d7ad4bd
```
{/caption}

Чтобы посмотреть общую статистику пула, выполните команду:

```console
$ rbd pool stats ${PoolName}
```

Здесь `${PoolName}` — переменная с именем пула.

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
Total Images: 9
Total Snapshots: 9
Provisioned Size: 26 GiB
```
{/caption}

#### {heading(Добавление RBD-пула)[id=ceph_creating_rbd_pool]}

Добавление RBD-пула выполняется согласно [официальной документации CEPH](https://docs.ceph.com/en/pacific/rados/operations/pools/#create-a-pool).

Чтобы проверить статус создания RBD-пула, выполните команду:

```console
$ rbd pool stats ${PoolName}
```

#### {heading(Удаление RBD-пула)[id=ceph_deleting_rbd_pool]}

<err>

Предварительно установите в CEPH параметр, разрешающий удаление пулов:

```console
$ ceph config set mon mon_allow_pool_delete true
```

</err>

{caption(Команда удаления пула)[align=left;position=above]}
```console
$ ceph rbd pool delete <НАЗВАНИЕ_ПУЛА> [<НАЗВАНИЕ_ПУЛА> --yes-i-really-really-mean-it]
```
{/caption}

<info>

В команде выше название пула прописывается два раза, подробнее — в [официальной документации](https://docs.ceph.com/en/pacific/rados/operations/pools/#delete-a-pool).

</info>

### {heading(Диск RBD)[id=ceph_rbd_disk]}

#### {heading(Просмотр информации по RBD-диску)[id=ceph_viewing_information_on_rbd_disk]}

```console
$ rbd info ${PoolName}/${ImageName}
```

Здесь:

* `${PoolName}` — переменная с именем пула.
* `${ImageName}` — переменная с именем диска.

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
$>rbd info glance-images/1c72bd62-901b-4eef-926c-00250c00007c
rbd image '1c72bd62-901b-4eef-926c-00250c00007c':
  size 3 GiB in 384 objects
  order 23 (8 MiB objects)
  snapshot_count: 1
  id: 1a7120e9b6ed
  block_name_prefix: rbd_data.1a7120e9b6ed
  format: 2
  features: layering, exclusive-lock, object-map, fast-diff, deep-flatten
  op_features:
  flags:
  create_timestamp: Wed May 25 04:29:50 2022
  access_timestamp: Wed May 25 04:29:50 2022
  modify_timestamp: Wed May 25 04:29:50 2022
```
{/caption}

#### {heading(Удаление RBD-диска)[id=ceph_deleting_rbd_disk]}

```console
$ rbd remove ${PoolName}/${ImageName}
```

#### {heading(Тонкие тома (Thin provisioning) и Толстые тома (Thick provisioning))[id=ceph_thin_and_thick_provisioning]}

В {var(sys2)} поддержка Тонких томов выполняется по умолчанию (параметр `thin_provisioning_support` указан в `rbd` драйвере: `./cinder/volume/drivers/rbd.py`).

Использование Тонких томов и Толстых томов настраивается через подписку в конфигурационном файле `/etc/cinder/cinder.conf` параметрами `thin_provisioning_support` и `thick_provisioning_support`:

{caption(Параметры подписки Тонких и Толстых томов)[align=left;position=above]}
```yaml
thin_provisioning_support = True (or False)
thick_provisioning_support = True (or False)
```
{/caption}

Подробная информация о работе с томами через подписку приведена в [официальной документации](https://docs.openstack.org/cinder/queens/admin/blockstorage-over-subscription.html).