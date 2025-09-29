# {heading(Управление High-IOPS дисками)[id=highiops_manage]}

## {heading(Что такое High-IOPS диски)[id=highiops]}

High-IOPS диски в {var(sys3)} — вид хранилища, реализованного поверх нескольких `SSD` или `NVME` дисков, подключенных локально к одному или нескольким вычислительным узлам. За счёт локального подключения и более простой организации, в отличие от, например, дисков Ceph, достигается большая производительность операций ввода-вывода. Подключение таких дисков к ВМ происходит с помощью протокола `iSCSI`.

На базовом уровне отказоустойчивость таких дисков может обеспечиваться двумя способами:

* Использованием `RAID10` на базе традиционного MD.
* Использованием механизма `LVM Mirror`.

Ниже будет рассмотрена настройка дисков для `LVM Mirror`.

## {heading(Подготовка окружения)[id=highiops_environment_preparation]}

1. Добавьте в `group_vars` группу `vkcloud_scst_iscsi` (если её нет).
1. Внесите все серверы в группу `vkcloud_scst_iscsi`, на которых планируется подготовить окружение.
1. Добавьте диски для High-IOPS в эту группу.

{caption(Пример)[align=left;position=above]}
```yaml
            # High-IOPS Nodes
            vkcloud_scst_iscsi:
              children:
                vkcloud_az1_storage:
                  hosts:
                    kcn001:
                    kcn002:
                    kcn003:
```
{/caption}

## {heading(Подготовка дисков)[id=highiops_preparing_disks]}

<info>

Количество доступных `SSD` или `NVME` дисков на узлах может отличаться в зависимости от назначения системы. Для продуктивной системы будет достаточно 6 или 8 дисков, для тестовых случаев подойдет 2 или 4 свободных диска.

</info>

1. Очистите целевые диски от LVM-объектов, разделов, файлов системы:

   ```console
   # wipefs -a /dev/nvme{0,1}n1
   for p in {0..1}; do blkdiscard /dev/nvme${p}n1; done
   ```

1. Создайте PV:

   ```console
   # pvcreate --metadatasize 128M /dev/nvme{0,1}n1
   ```

1. Создайте VG-группу:

   ```console
   # vgcreate kvm-vg /dev/nvme{0,1}n1
   ```

1. Создайте логический том для state-директории под cinder-volume:

   ```console
   # lvcreate -n cinder_state_dir kvm-vg -L 500g -m1
   ```

1. Создайте файловую систему и примонтируйте её:

   ```console
   # mkfs.ext4 /dev/kvm-vg/cinder_state_dir
   # mkdir /mnt/cinder
   # echo '/dev/mapper/kvm--vg-cinder_state_dir /mnt/cinder ext4 defaults 1 2' >> /etc/fstab
   # mount -a
   ```

1. После выполнения подготовки дисков запустите конфигурацию `cinder-volume-scst-deploy.yml`:

   ```console
   # cd <inventory-dir-path>
   # ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/cinder-volume-scst-deploy.yml -e bootstrap=true
   ```

   После выполнения этих команд будут установлены и запущены необходимые компоненты и сервисы.

### {heading(Автоматическая подготовка и настройка дисков)[id=highiops_automatically_prepare_and_configure_disks]}

Заполните следующие параметры в файле `group_vars/vkcloud_scst_iscsi/vars.yml`:

```yaml
# Допустимые устройства для сборки RAID
cinder_mdadm_devices: [ '/dev/nvme*' ]
# Фильтр устройств, на которых следует искать LVM PV
cinder_lvm_devices: [ '/dev/nvme[01].*' ]

# Использовать LVM Mirror
cinder_hiops_use_lvm_mirrors: true

# Какие устройства следует собирать в High-IOPS диски
cinder_hiops_disks_regexp: '^nvme[01]'
# Размер тома cinder_state
cinder_hiops_cinder_state_vol_size: "500g"
```

Параметр `cinder_hiops_use_lvm_mirrors` отвечает за настройку режима `LVM Mirror`, который по умолчанию включен. Если необходимо использовать `RAID10` на MD, установите этому значению параметр `false`.

<err>

Не копируйте пример, приведённый выше, без изменений. Укажите точно, какие диски надо настроить. Во время автоматической настройки не требуется дополнительных подтверждений. Если будут указаны неверные диски, данные на них уничтожатся.

</err>

После заполнения параметров запустите конфигурацию `cinder-volume-scst-deploy.yml`:

```console
# cd <inventory-dir-path>
# ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/cinder-volume-scst-deploy.yml -e bootstrap=true -e cinder_hiops_disks_autoconfigure=true
```

Перед запуском указанного выше кода убедитесь в корректности настроек сервера для {var(sys2)}. Должна быть выполнена конфигурация `common.yml`. Диски, соответствующие указанным параметрам, будут автоматически размечены и объединены в массивы. Будут установлены и запущены необходимые компоненты и сервисы.

## {heading(Подключение в Продукте)[id=highiops_connection_in_product]}

Чтобы убедиться в успешной настройке High-IOPS дисков, перейдите на управляющий узел и выполните команды:

```console
# source ~/openrc.sh
# sudo bash
# openstack volume service list
```

{ifndef(cer)}

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
[cpn003: ~]# openstack volume service list
+------------------+-----------------------+------+---------+-------+----------------------------+
| Binary           | Host                  | Zone | Status  | State | Updated At                 |
+------------------+-----------------------+------+---------+-------+----------------------------+
| cinder-scheduler | cpn001                | nova | enabled | up    | 2022-12-27T05:55:18.000000 |
| cinder-volume    | rbd:volumes:c1@ceph   | AZ1  | enabled | up    | 2022-12-27T05:55:20.000000 |
| cinder-volume    | rbd:volumes:c1@manila | nova | enabled | up    | 2022-12-27T05:55:22.000000 |
| cinder-scheduler | cpn003                | nova | enabled | up    | 2022-12-27T05:55:27.000000 |
| cinder-scheduler | cpn002                | nova | enabled | up    | 2022-12-27T05:55:20.000000 |
| cinder-volume    | rbd:volumes:c3@ceph   | AZ1  | enabled | up    | 2022-12-27T05:55:18.000000 |
| cinder-volume    | rbd:volumes:c3@manila | nova | enabled | up    | 2022-12-27T05:55:20.000000 |
| cinder-volume    | rbd:volumes:c2@ceph   | AZ1  | enabled | up    | 2022-12-27T05:55:20.000000 |
| cinder-volume    | rbd:volumes:c2@manila | nova | enabled | up    | 2022-12-27T05:55:19.000000 |
| cinder-volume    | kcn002@high-iops      | AZ1  | enabled | up    | 2022-12-27T05:55:23.000000 |
| cinder-scheduler | kcn002                | nova | enabled | up    | 2022-12-27T05:55:19.000000 |
| cinder-backup    | cpn001                | nova | enabled | up    | 2022-12-27T05:55:26.000000 |
| cinder-backup    | cpn003                | nova | enabled | up    | 2022-12-27T05:55:27.000000 |
| cinder-backup    | cpn002                | nova | enabled | up    | 2022-12-27T05:55:27.000000 |
+------------------+-----------------------+------+---------+-------+----------------------------+
```
{/caption}

{/ifndef}

Присутствие в списке серверов с суффиксом `high-iops` в состоянии `up` говорит об успешной установке. После этого диски High-IOPS уже можно использовать при работе через CLI обычным образом, например, можно подключать к ВМ.

Чтобы эти диски можно было использовать через Портал самообслуживания, необходимо применить конфигурацию `helm-frontapp-configuration.yml`.

{caption(Пример команды для выполнения конфигурации)[align=left;position=above]}
```console
# cd <inventory-dir-path>
# ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/helm-frontapp-configuration.yml
```
{/caption}