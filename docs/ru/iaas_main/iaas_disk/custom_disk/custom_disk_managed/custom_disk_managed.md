# {heading(Управление дисками внешней СХД)[id=custom_disk]}

Внешняя СХД — система хранения данных, которая подключается пользователем самостоятельно. {var(sys1)} взаимодействует со внешними СХД как потребитель. Обеспечение производительности и отказоустойчивости системы и ее сетевой связности осуществляется на стороне поставщика внешней СХД.

К {var(sys3)} через iSCSI можно подключить любую внешнюю СХД вне зависимости от ее поставщика.

Диски внешних СХД — это хранилище, которое подключается по iSCSI LUN к одному или нескольким вычислительным узлам для работы с виртуальными машинами и к управляющим узлам для распределения ресурсов между разными виртуальными машинами.

## {heading(Подготовка iSCSI-дисков)[id=nvmebox_preparing_disks]}

Процесс подключения диска внешней СХД зависит от поставщика и его рекомендаций и требований по организации iSCSI-подключения LUN.

На всех вычислительных и управляющих узлах с запущенным сервисом NVMeBox (UBDC) необходимо настроить iSCSI-подключения LUN:

<info>

`lock-lun` не участвует в работе ВМ и всегда будет в одном экземпляре, в том числе на множество  LUN.

</info>

1. Проверьте наличие iSCSI-подключения LUN:

   ```console
   $ lsblk
   NAME                 MAJ:MIN RM  SIZE RO TYPE  MOUNTPOINTS
   sda                    8:0    0    4G  0 disk
   └─lock-lun           253:1    0    4G  0 mpath
     └─globlock-lvmlock 253:2    0  256M  0 lvm
   sdb                    8:16   0  500G  0 disk
   └─vm-lun             253:0    0  500G  0 mpath
   ...
   ```

1. Проверьте, что в `systemd` сервис `iscsid` активен и включен:

   ```console
   $ systemctl status iscsid
   ● iscsid.service - Open-iSCSI
        Loaded: loaded (/usr/lib/systemd/system/iscsid.service; enabled; vendor preset: disabled)
        Active: active (running) since Tue 2024-12-03 20:42:46 MSK; 2 days ag
   ```
   
1. Проверьте, подключение в `multipath`:

   ```console
   $ sudo multipath -ll
   lock-lun (36001405000000caec000000000000000) dm-0 LIO-ORG,IBLOCK
   size=4.0G features='0' hwhandler='1 alua' wp=rw
   `-+- policy='service-time 0' prio=50 status=active
     `- 2:0:0:0 sda 8:0  active ready running
   vm-lun (36001405000000cae0000000000000000) dm-1 LIO-ORG,IBLOCK
   size=500G features='0' hwhandler='1 alua' wp=rw
   `-+- policy='service-time 0' prio=50 status=active
     `- 2:0:0:1 sdb 8:16 active ready running
   ```

1. Подготовьте настройку LVM в `fdisk`:

   ```console
   $ sudo fdisk -l
   ...
   Disk /dev/mapper/vm-lun: 500 GiB, 536870912000 bytes, 1048576000 sectors
   Units: sectors of 1 * 512 = 512 bytes
   Sector size (logical/physical): 512 bytes / 512 bytes
   I/O size (minimum/optimal): 512 bytes / 512 bytes
   
   
   Disk /dev/mapper/lock-lun: 4 GiB, 4294967296 bytes, 8388608 sectors
   Units: sectors of 1 * 512 = 512 bytes
   Sector size (logical/physical): 512 bytes / 512 bytes
   I/O size (minimum/optimal): 512 bytes / 512 bytes
   ```

1. Проверьте, что в каталоге `/dev/mapper` отображаются пути до блочных устройств:

   ```console
   $ ls /dev/mapper/vm-lun /dev/mapper/lock-lun
   /dev/mapper/lock-lun  /dev/mapper/vm-lun
   ```

1. Добавьте пути в `minimal.yml`:

   ```yaml
   nvmebox_shared_lun_device: "/dev/mapper/vm-lun"
   nvmebox_lock_lun_device: "/dev/mapper/lock-lun"
   ```

### {heading(Автоматическое добавление новых вычислительных узлов)[id=nvmebox_automatically_add_node]}

В инструкции ниже приведен пример с подключением нового вычислительного узла `kcn002`.

Чтобы добавить новый вычислительный узел `kcn002` с поддержкой внешней СХД:

1. Добавьте в файл `vkcloud.yml` новые вычислительные узлы в следующие группы:

   ```yaml
   ...
         vkcloud_compute:
            vars: null
            children:
               vkcloud_compute_common_az1:
                  vars:
                     az: '{{ availability_zone1 | upper }}'
                  hosts:
                     kcn001: null
                     kcn002: null # <-- New host
   ...
         vkcloud_nvmebox_agent:
            hosts:
               kcn001:
                  sanlock_host_id: 201
               kcn002: # <-- New host
                  sanlock_host_id: 202 # <-- Уникальный ID
   ...
   ```

   <info>
   
   Значение переменной `sanlock_host_id` должно быть уникальным, как для управляющего, так и для вычислительного узла. 
   
   Новый вычислительный узел должен быть прописан по своему имени в DNS-записи.
   
   </info>

1. Запустите плейбуки для подключения новых вычислительных узлов:

   ```console
   $ cd <inventory-dir-path>
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud -l kcn002 ../ansible-openstack/playbooks/pred-deploy.yml
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud -e limit=kcn002 ../ansible-openstack/playbooks/common.yml
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud -l kcn002 -e bootstrap=true --skip-tags ceilometer_compute,common_monitoring ../ansible-openstack/playbooks/compute-deploy.yml
   ```
   
   <info>
   
   Плейбук `common.yml` поддерживает ограничения узлов выполнения плейбуков только через Extra-переменную `limit` — при использовании через ключ `-l` выполнение плейбука будет заблокировано.
   
   </info>

1. Запустите плейбук `nvmebox.yml`:

   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud -l kcn002 ../ansible-openstack/playbooks/nvmebox.yml
   ```

1. Проверьте подключение вычислительного узла:

   1. Перейдите в Портал администратора.

   1. Перейдите в раздел **Администрирование → Вычислительные узлы**. 

   1. Убедитесь, что в списке узлов отображается новый узел со статусом `disabled` с актуальными параметрами `cpu_idle`, `free_mem` и т.д.

   1. С помощью OpenStack CLI проверьте, что узел отображается со статусом `disabled`:

      ```console
      $ sudo bash
      # source ~/openrc.sh
      # openstack compute service list --host kcn002
      ```
      {caption(Пример вывода команды)[align=left;position=above]}
      ```console
      +-----+--------------+--------+------+----------+-------+----------------------------+
      |  ID | Binary       | Host   | Zone | Status   | State | Updated At                 |
      +-----+--------------+--------+------+----------+-------+----------------------------+
      | 141 | nova-compute | kcn002 | AZ1  | disabled | down  | 2024-12-13T09:55:42.000000 |
      +-----+--------------+--------+------+----------+-------+----------------------------+
      ```
      {/caption}

    1. Переведите узел в состояние (State) `up`. Для этого необходимо вывести узел из статуса `maintenance`:  

      ```console
      # nova --os-compute-api-version 2.latest service-maintenance --unset kcn002 nova-compute
      ```
      {caption(Пример вывода команды)[align=left;position=above]}
      
      ```console
      +--------+--------------+----------+
      | Host   | Binary       | Status   |
      +--------+--------------+----------+
      | kcn002 | nova-compute | disabled |
      +--------+--------------+----------+
      ```
      {/caption}

      ```console
      # openstack compute service list --host kcn002
      ```

      {caption(Пример вывода команды)[align=left;position=above]}
    
      ```console
      +-----+--------------+--------+------+----------+-------+----------------------------+
      |  ID | Binary       | Host   | Zone | Status   | State | Updated At                 |
      +-----+--------------+--------+------+----------+-------+----------------------------+
      | 141 | nova-compute | kcn002 | AZ1  | disabled | up    | 2024-12-13T10:47:22.000000 |
      +-----+--------------+--------+------+----------+-------+----------------------------+
      ```
      {/caption}

1. Включите узел:

   ```console
   # openstack compute service set --enable kcn002 nova-compute
   # openstack compute service list --host kcn002
   ```
   
   {caption(Пример вывода команды)[align=left;position=above]}
   ```console
   +-----+--------------+--------+------+---------+-------+----------------------------+
   |  ID | Binary       | Host   | Zone | Status  | State | Updated At                 |
   +-----+--------------+--------+------+---------+-------+----------------------------+
   | 141 | nova-compute | kcn002 | AZ1  | enabled | up    | 2024-12-13T10:47:58.000000 |
   +-----+--------------+--------+------+---------+-------+----------------------------
   ```
   {/caption}


## {heading(Проверка подключения дисков)[id=nvmebox_connection_in_product]}

1. Проверьте, что настройка дисков прошла успешно. На управляющем узле выполните команды:

   ```console
   # sudo bash
   # source ~/openrc.sh
   # openstack volume service list
   ```
   
   {ifndef(cer)}
   
   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   +------------------+------------------+------+---------+-------+----------------------------+
   | Binary           | Host             | Zone | Status  | State | Updated At                 |
   +------------------+------------------+------+---------+-------+----------------------------+
   | cinder-scheduler | cpn001           | nova | enabled | up    | 2024-12-09T09:59:40.000000 |
   | cinder-volume    | cpn001@sharedlun | AZ1  | enabled | up    | 2024-12-09T09:59:42.000000 |
   | cinder-scheduler | cpn003           | nova | enabled | up    | 2024-12-09T09:59:37.000000 |
   | cinder-scheduler | cpn002           | nova | enabled | up    | 2024-12-09T09:59:40.000000 |
   | cinder-volume    | cpn003@sharedlun | AZ1  | enabled | up    | 2024-12-09T09:59:42.000000 |
   | cinder-volume    | cpn002@sharedlun | AZ1  | enabled | up    | 2024-12-09T09:59:35.000000 |
   | cinder-backup    | cpn001           | nova | enabled | up    | 2024-12-09T09:59:40.000000 |
   | cinder-backup    | cpn002           | nova | enabled | up    | 2024-12-09T09:59:43.000000 |
   | cinder-backup    | cpn003           | nova | enabled | up    | 2024-12-09T09:59:44.000000 |
   +------------------+------------------+------+---------+-------+----------------------------+
   ```
   {/caption}
   
   {/ifndef}
   
   Если в списке отображаются сервера с суффиксом `sharedlun` в состоянии `up`, диск успешно подключен к управляющему узлу.
   
   <info>
   
   Суффикс `sharedlun` может быть изменен ранее в переменной `nvmebox_profile`.
   
   </info>

1. Проверьте, что диск добавлен на {var(sys4)}:

   ```console
   # openstack volume type list
   ```
   
   {ifndef(cer)}
   
   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   +--------------------------------------+---------------+-----------+
   | ID                                   | Name          | Is Public |
   +--------------------------------------+---------------+-----------+
   | f8cc2350-f610-4eb1-9fe5-065d5f32141e | manila        | False     |
   | b209d246-4ba8-4fe1-9816-b3d3c3c51a92 | nvmebox-type1 | True      |
   +--------------------------------------+---------------+-----------+
   ```
   {/caption}

   Здесь `nvmebox-type1` — диск внешней СХД.
   
   {/ifndef}

## {heading(Увеличение размера диска внешней СХД)[id=nvmebox_resize_disk]}

В инструкции ниже приведен пример с увеличением LUN с 500 ГБ до 1 ТБ.

1. Измените размер LUN на диске, чтобы узлы смогли обнаружить увеличение места. 
1. Запустите плейбук `nvmebox-resize-vm-lun.yml` на всех вычислительных и управляющих узлах:

   ```console
   $ cd <inventory-dir-path>
   $ ansible-playbook -i vkcloud.yml --diff  -e env=vkcloud  ../ansible-openstack/playbooks/nvmebox-resize-vm-lun.yml
   ```
   
   <warn>
   
   При работе с увеличением размера диска не используйте команды типа `iscsiadm -m node -T {{ iqn }} -p {{ ip target }} -l`. Это может привести к аварийному завершению работы сервера и потере данных.
   
   </warn>

1. После запуска плейбука проверьте, что размер LUN обновился как на диске, так и в сервисе NVMeBox (UBDC):

   ```console
   # multipath -ll
   lock-lun (36001405000000caec000000000000000) dm-0 LIO-ORG,IBLOCK
   size=4.0G features='0' hwhandler='1 alua' wp=rw
   `-+- policy='service-time 0' prio=50 status=active
     `- 2:0:0:0 sda 8:0  active ready running
   vm-lun (36001405000000cae0000000000000000) dm-1 LIO-ORG,IBLOCK
   size=1000G features='0' hwhandler='1 alua' wp=rw
   `-+- policy='service-time 0' prio=50 status=active
     `- 2:0:0:1 sdb 8:16 active ready running
   ```

