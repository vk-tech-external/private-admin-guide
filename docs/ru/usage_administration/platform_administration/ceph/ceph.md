# {heading(Работа с CEPH)[id=ceph]}

## {heading(Общие сведения)[id=ceph_info]}

Управление кластером CEPH в {var(sys3)} осуществляется при помощи открытого инструмента ceph-ansible. **ceph-ansible** — это набор плейбуков ansible (ansible playbooks) и docker-образов для управления кластерами CEPH, подробную информацию см. в [официальной документации](https://docs.ceph.com/projects/ceph-ansible/en/latest/).

Основные группы для CEPH кластера, которые требуются для развёртывания {var(sys2)}:

* `MONs` — серверы-мониторы; отслеживают состояние кластера. Минимальное количество серверов: 3.
* `OSDs` — серверы хранения данных (Object Storage Device). Минимальное количество серверов для обеспечения отказоустойчивости: 3.
* `MGRs` — группа демонов менеджеров (Manager Daemon); собирают метрики и осуществляют мониторинг.
* `MDSs` — группа серверов метаданных (Metadata Server Daemon); отвечают за работоспособность файловой системы `CephFS`.

Также в рамках CEPH используются следующие компоненты:

* `CephFS` — распределенная POSIX-совместимая файловая система. CephFS используется для загрузки образов Glance и примонтирован на всех управляющих узлах.
* `RBD` — блочное устройство с поддержкой технологии Thin provisioning и снэпшотов. Все диски виртуальных машин хранятся в качестве устройств `RADOS Block Device` (`RBD`).

## {heading(Операции с узлами)[id=ceph_nodes]}

Узел — физический сервер, на каждом из которых может быть развёрнуто несколько сервисов CEPH.

{caption(Пример сервисов CEPH для узла OSD)[align=left;position=above]}
```bash
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 9
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 0
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 6
--cluster ceph --setuser ceph --setgroup ceph --default-log-to-stderr=true --err-to-stderr=true --default-log-to-file=false --foreground -i 3
```
{/caption}

В примере выше работают ноды с OSD под номерами `0`, `3`, `6`, `9`. Каждый сервис функционирует в отдельном docker-контейнере.

### {heading(Просмотр всех имеющихся пулов в кластере)[id=ceph_pool]}

Для просмотра всех имеющихся пулов в кластере выполните следующую команду:

```bash
ceph osd pool ls
```
{caption(Пример вывода команды)[align=left;position=above]}
```bash
device_health_metrics
glance-images
cinder-volumes
vms
manila-volumes
cephfs_data
cephfs_metadata
```
{/caption}

### {heading(Применение конфигурации (запуск ansible playbook))[id=ansible_playbook_change]}

Изменение параметров компонента CEPH выполняется путем редактирования конфигурации `group_vars.yml` в `ceph-ansible/group_vars/` и последующим запуском плейбука (ansible playbook):

```bash
ansible-playbook \
    --diff \
    -i ${STAND_NAME}.yml \
    ./${playbook_name}.yml
```
, где:

* `${STAND_NAME}` — наименование окружения.
* `${playbook_name}` — наименование файла плейбука CEPH.

<info>

Подробнее про запуск плейбуков см. в разделе {linkto(../../../usage_administration/platform_administration/infrastructure_management#change_nodes_configs_playbooks)[text=%text]}.

</info>

### {heading(OSD-узел)[id=ceph_osd]}

#### {heading(Вывод структуры OSD-узла)[id=ceph_osd_tree]}

Для вывода структуры OSD-узла выполните следующую команду на этом узле:

{caption(Команда вывода структуры OSD-узла)[align=left;position=above]}
```bash
ceph osd tree
```
{/caption}

{caption(Пример вывода команды)[align=left;position=above]}
```bash
ID  CLASS  WEIGHT   TYPE NAME          STATUS  REWEIGHT  PRI-AFF
-1         0.39990  root default
-3         0.19995      host storage1
 0    hdd  0.04999          osd.0          up   1.00000  1.00000
 2    hdd  0.04999          osd.2          up   1.00000  1.00000
 4    hdd  0.04999          osd.4          up   1.00000  1.00000
 6    hdd  0.04999          osd.6          up   1.00000  1.00000
-5         0.19995      host storage2
 1    hdd  0.04999          osd.1          up   1.00000  1.00000
 3    hdd  0.04999          osd.3          up   1.00000  1.00000
 5    hdd  0.04999          osd.5          up   1.00000  1.00000
 7    hdd  0.04999          osd.7          up   1.00000  1.00000
```
{/caption}

#### {heading(Добавление нового OSD-узла)[id=ceph_add_osd]}

Для добавления нового OSD-узла:

1. Добавьте новый сервер под OSD в inventory файл, в группу `osds`:

   {caption(Пример фрагмента inventory файла для кластера)[align=left;position=above]}
   ```txt
   [osds]
   storage1
   storage2
   storage3
   ```
   {/caption}

2. Запустите плейбук (см. раздел {linkto(#ansible_playbook_change)[text=%text]}).
1. Проверьте статус CEPH кластера, выполнив команду:
   
   ```bash
   ceph health
   ```

   Дождитесь, когда кластер перейдет в статус `HEALTH_OK`.

1. Убедитесь, что узел появился, выполнив команду вывода структуры OSD (см. раздел {linkto(#ceph_osd_tree)[text=%text]}).
1. При необходимости выведите разницу между структурами узлов, выполнив команду:
   
   ```bash
   ceph osd df
   ```

   {caption(Пример вывода команды ceph osd df)[align=left;position=above]}     
   ```bash
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

#### {heading(Вывод OSD-узла из эксплуатации)[id=cehp_osd_disable]}

Для вывода OSD-узла из эксплуатации:

1. Выключите сервисы, функционирующие на ноде OSD, выполнив команду:
   
   ```bash
   systemctl disable --now <НАИМЕНОВАНИЕ_СЕРВИСА_OSD>
   ```
   <info>

   В примерах текущей инструкции приведены ноды с OSD под номерами `0`, `2`, `4`, `6`.

   </info>

   {caption(Пример вывода команды ceph osd df)[align=left;position=above]} 
     
   ```bash
   systemctl disable --now ceph-osd@0.service
   systemctl disable --now ceph-osd@2.service
   systemctl disable --now ceph-osd@4.service
   systemctl disable --now ceph-osd@6.service
   ```
   {/caption}

2. Удалите OSD из Crush maps, выполнив команду:
   
   ```bash
   ceph osd crush remove <НАИМЕНОВАНИЕ_СЕРВИСА_OSD>
   ```
   {caption(Пример удаления сервисов OSD из Crush maps)[align=left;position=above]}   
   ```bash
   ceph osd crush remove osd.0
   ceph osd crush remove osd.2
   ceph osd crush remove osd.4
   ceph osd crush remove osd.6
   ```
   {/caption}

3. Удалите сервисы OSD, выполнив команду:
   
   ```bash
   ceph osd rm <НАИМЕНОВАНИЕ_СЕРВИСА_OSD>
   ```
   {caption(Пример удаления сервисов OSD)[align=left;position=above]} 

   ```bash
   ceph osd rm osd.0
   ceph osd rm osd.2
   ceph osd rm osd.4
   ceph osd rm osd.6
   ```
   {/caption}

#### {heading(Удаление OSD-узла)[id=ceph_osd_delete]}

Чтобы удалить OSD-узел:

1. Выведите OSD-узел из эксплуатации (см. раздел {linkto(#cehp_osd_disable)[text=%text]}).
1. Найдите наименование узла, который необходимо удалить, в inventory файле.
1. Удалите узел, выполнив команду:
   
   ```bash
   ceph osd crush remove <НАИМЕНОВАНИЕ_УЗЛА>
   ```
1. Проверьте статус CEPH кластера, выполнив команду:
   
   ```bash
   ceph health
   ```
   Дождитесь, когда кластер перейдет в статус `HEALTH_OK`.

### {heading(MON-узел)[id=ceph_mon]}

#### {heading(Добавление нового MON-узла)[id=ceph_add_mon]}

Для добавления нового MON-узла:

1. Добавьте новый сервер под OSD в inventory файл, в группу `mons`:

   {caption(Пример фрагмента inventory файла для кластера)[align=left;position=above]} 
   ```txt
   [mons]
   storage1
   storage2
   storage3
   ```
   {/caption}
   
2. Запустите плейбук (см. раздел {linkto(#ansible_playbook_change)[text=%text]}).
1. Проверьте статус создания MON-узла, выполнив команды:
   
   ```bash
   ceph mon stat
   ceph -s
   ```

   {caption(Пример работы команд)[align=left;position=above]} 
   ```bash
   $>ceph mon stat
   e1: 3 mons at {storage1=[v2:10.12.0.19:3300/0,v1:10.12.0.19:6789/0],storage2=[v2:10.12.0.20:3300/0,v1:10.12.0.20:6789/0],storage3=[v2:10.12.0.21:3300/0,v1:10.12.0.21:6789/0]}, election epoch 8, leader 0 storage1, quorum 0,1,2 storage1
   
   $>ceph -s
     cluster:
       id:     5456e034-c7a6-4a7d-af66-1e95be8e50b1
       health: HEALTH_OK
   
     services:
       mon: 3 daemons, quorum storage1,storage2,storage3 (age 4h)
       mgr: storage3(active, since 5h), standbys: storage2
       mds: cephfs:1 {0=storage3=up:active} 1 up:standby
       osd: 8 osds: 8 up (since 4h), 8 in (since 13h)
   
     data:
       pools:   7 pools, 289 pgs
       objects: 3.44k objects, 26 GiB
       usage:   35 GiB used, 165 GiB / 200 GiB avail
       pgs:     289 active+clean
   ```
   {/caption}

#### {heading(Вывод MON-узла из эксплуатации)[id=ceph_mon_delete]}

Чтобы вывести MON-узел из эксплуатации:

1. Перейдите на storage сервер, откуда требуется вывести узел, по SSH.
1. Выключите службу, отвечающую за работу mon-сервиса, выполнив команду:
   
   ```bash
   systemctl disable --now ceph-mon.target
   ```
1. Удалите MON-узел из storage сервера, выполнив команду:
   
   ```bash
   ceph mon remove <НАИМЕНОВАНИЕ_STORAGE_СЕРВЕРА>
   ```
1. Проверьте статус MON-узлов, выполнив команду:
   
   ```bash
   ceph mon stat
   ```

   {caption(Пример вывода команды ceph mon stat)[align=left;position=above]} 
   ```bash
   e2: 2 mons at {storage1=[v2:10.12.0.19:3300/0,v1:10.12.0.19:6789/0],storage3=[v2:10.12.0.21:3300/0,v1:10.12.0.21:6789/0]}, election epoch 20, leader 0 storage1, quorum 0,1 storage1,storage3
   ```
   {/caption}

5. Найдите файл `ceph.conf` на всех узлах и удалите оттуда IP storage сервера, для которого выводился MON-узел, из секции `mon host`.
1. Удалите storage сервер, для которого выводился MON-узел, из группы `mons` в inventory файле компонента ceph-ansible.

### {heading(MDS-узел)[id=ceph_mds]}

#### {heading(Добавление нового MDS-узла)[id=ceph_add_mds]}

Для добавления нового MDS-узла:

1. Добавьте новый сервер под MDS в inventory файл, в группу `mdss`:
   
   {caption(Пример фрагмента inventory файла для кластера)[align=left;position=above]} 
   ```txt
   [mdss]
   storage1
   storage3
   ```
   {/caption}

2. Запустите плейбук (см. раздел {linkto(#ansible_playbook_change)[text=%text]}).
1. Проверьте статус создания MDS-узла, выполнив команду:
   
   ```bash
   ceph mds stat
   ```
   {caption(Пример работы команды ceph mds stat)[align=left;position=above]} 
   ```bash
   cephfs:1 {0=storage3=up:active} 1 up:standby
   ```
   {/caption}

#### {heading(Вывод MDS-узла из эксплуатации)[id=ceph_mds_delete]}

Чтобы вывести MDS-узел из эксплуатации:

1. Перейдите на storage сервер, откуда требуется вывести узел, по SSH.
1. Выключите службу, отвечающую за работу mds-сервиса, выполнив команду:
   
   ```bash
   systemctl disable --now ceph-mds.target
   ```
1. Удалите storage сервер, для которого выводился MON-узел, из группы `mdss` в inventory файле компонента ceph-ansible.

### {heading(MGR-узел)[id=ceph_mgr]}

#### {heading(Добавление нового MGR-узла)[id=ceph_add_mgr]}

Для добавления нового MGR-узла:

1. Добавьте новый сервер под MGR в inventory файл, в группу `mgrs`:
   
   {caption(Пример фрагмента inventory файла для кластера)[align=left;position=above]} 

   ```txt
   [mgrs]
   storage2
   storage3
   ```
   {/caption}

2. Запустите плейбук (см. раздел {linkto(#ansible_playbook_change)[text=%text]}).
1. Проверьте статус создания MGR-узла, выполнив команду:
   
   ```bash
   ceph -s
   ```

#### {heading(Вывод MGR-узла из эксплуатации)[id=ceph_mgr_delete]}

Чтобы вывести MGR-узел из эксплуатации:

1. Перейдите на storage сервер, откуда требуется вывести узел, по SSH.
1. Выключите службу, отвечающую за работу mgr-сервиса, выполнив команду:
   
   ```bash
   systemctl disable --now ceph-mgr.target
   ```
   <err>

   Если заранее известно, для какого сервера выводится узел, укажите его в команде, например, `systemctl disable --now ceph-mgr@storage2.service` для сервера `storage2`.

   </err>

3. Удалите storage сервер, для которого выводился MGR-узел, из группы `mgrs` в inventory файле компонента `ceph-ansible`.

### {heading(Пулы RBD)[id=ceph_pool_rbd]}

#### {heading(Просмотр содержимого RBD-пула)[id=ceph_pool_rbd_view]}

Для просмотра содержимого RBD-пула выполните следующую команду:

```bash
rbd ls ${PoolName}
```

, где `${PoolName}` — переменная с именем пула.

{caption(Пример вывода команды)[align=left;position=above]} 
```bash
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

Чтобы посмотреть общую статистику пула, выполните следующую команду:

```bash
rbd pool stats ${PoolName}
```

, где `${PoolName}` — переменная с именем пула.

{caption(Пример вывода команды)[align=left;position=above]} 
```bash
Total Images: 9
Total Snapshots: 9
Provisioned Size: 26 GiB
```
{/caption}

#### {heading(Добавление RBD-пула)[id=ceph_pool_rbd_add]}

Для добавления RBD-пула:

1. В файле `ceph-ansible/group_vars/all.yml` добавьте информацию по новому пулу в секцию `openstack_pools`.
1. Запустите плейбук (см. раздел {linkto(#ansible_playbook_change)[text=%text]}).
1. Проверьте статус создания RBD-пула, выполнив команду:
   
   ```bash
   rbd pool stats ${PoolName}
   ```

#### {heading(Удаление RBD-пула)[id=ceph_pool_rbd_delete]}

<warn>

Предусмотрено только ручное удаление пула.

</warn>

<err>

В CEPH предварительно должен быть установлен параметр, разрешающий удаление пулов, одним из способов:

* Выполнив команду `ceph config set mon mon_allow_pool_delete true`.
* Изменив параметр `ceph_conf_overrides.global` в файле `ceph-ansible/group_vars/all.yml`.

</err>

Для удаления RBD-пула:

1. В файле `ceph-ansible/group_vars/all.yml` удалите информацию по пулу из секции `openstack_pools`.
1. Удалите пул из CEPH кластера, выполнив команду:
   
   ```bash
   ceph rbd pool delete <НАИМЕНОВАНИЕ_ПУЛА> [<НАИМЕНОВАНИЕ_ПУЛА_ПОВТОРНО> --yes-i-really-really-mean-it]
   ```
<info>

В команде выше наименование пула прописывается два раза. Подробнее  — в [официальной документации](https://docs.ceph.com/en/pacific/rados/operations/pools/#delete-a-pool).

</info>

### {heading(Диск RBD)[id=ceph_disk_rdb]}

#### {heading(Просмотр информации по RBD-диску)[id=ceph_disk_rbd_view]}

Чтобы просмотреть информацию по RBD-диску, выполните следующую команду:

```bash
rbd info ${PoolName}/${ImageName}
```

, где:

* `${PoolName}` — переменная с именем пула.
* `${ImageName}` — переменная с именем диска.

{caption(Пример выполнения команды)[align=left;position=above]} 
```bash
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

#### {heading(Удаление RBD-диска)[id=ceph_disk_rbd_delete]}

Чтобы удалить RBD-диск, выполните следующую команду:

```bash
rbd remove ${PoolName}/${ImageName}
```

#### {heading(Тонкие тома (Thin provisioning) и Толстые тома (Thick provisioning))[id=ceph_disk_rbd_tom]}

В {var(sys2)} поддержка Тонких томов выполняется по умолчанию (параметр `thin_provisioning_support` указан в `rbd` драйвере: `./cinder/volume/drivers/rbd.py`).

Использование Тонких томов и Толстых томов настраивается через подписку в конфигурационном файле `/etc/cinder/cinder.conf` параметрами `thin_provisioning_support` и `thick_provisioning_support`:

{caption(Параметры подписки Тонких и Толстых томов)[align=left;position=above]} 
```yaml
thin_provisioning_support = True (or False)
thick_provisioning_support = True (or False)
```
{/caption}

Подробнее о работе с томами через подписку см. в [официальной документации](https://docs.openstack.org/cinder/queens/admin/blockstorage-over-subscription.html).