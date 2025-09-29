# {heading(Резервное копирование OpenSearch)[id=opensearch_backup]}

## {heading(Резервное копирование конфигурационных файлов OpenSearch)[id=opensearch_backup_config]}

Резервные копии конфигурационных файлов OpenSearch создаются на узле мониторинга в файле `/srv/backup/opensearch/configs` и хранятся в формате `- backup-{date}-{time}.tar.gz`.

Чтобы включить резервное копирование конфигурационных файлов OpenSearch, в файле `/group_vars/vkcloud/logging.yml`: 

1. Установите значение `true` для параметров:

   * `opensearch_backup_enable` — разовое создание резервной копии конфигурационных файлов.
   * `opensearch_auto_backuping_enable` — создание задачи в cron по расписанию.

1. Укажите количество дней для ротации резервного копирования в параметре `opensearch_backup_days_rotate`. По умолчанию 7 дней.

### {heading(Создание резервной копии)[id=opensearch_backup_create]}

Резервные копии конфигурационных файлов OpenSearch можно создать двумя способами:

* При установке OpenSearch:

  ```console
  $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/opensearch.yml
  ```

* При запуске резервного копирования на уже установленном OpenSearch с тегом `backup`, если необходимо запустить только резервное копирование или создать cron создания резервных копий:

  ```console
  $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/opensearch.yml --tags backup
  ```

  {caption(Пример листинга резервных копий конфигурационных файлов)[align=left;position=above]}
  ```console
  [root@lm001 centos]# ll /srv/backup/opensearch/configs/
  total 144
  -rw-r--r-- 1 root root 15301 Dec  6 13:58 backup-20241206-1358.tar.gz
  -rw-r--r-- 1 root root 15301 Dec  6 14:15 backup-20241206-1414.tar.gz
  -rw-r--r-- 1 root root 14758 Dec  7 00:30 backup-20241207-0030.tar.gz
  ...
  ```
  {/caption}

### {heading(Восстановление из резервной копии)[id=opensearch_backup_create]}

Чтобы восстановить конфигурационные файлы OpenSearch из резервной копии, запустите плейбук одним из способов:

* Без указания резервной копии (по умолчанию будет указана последняя резервная копия за день):

  ```console
  $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/opensearch-restore.yml
  ```

* С указанием резервной копии:

  ```console
  $ ansible-playbook -i vkcloud.yml -e env=vkcloud -e opensearch_snapshot_name='backup-20241206-1358.tar.gz' ../ansible-openstack/playbooks/opensearch-restore.yml
  ```

<info>

При выполнении восстановления из резервной копии, плейбук переименовывает директорию на всех хостах, где установлен OpenSearch, с `/etc/opensearch` на `/etc/opensearch-old-{date}-{time}`

</info>


## {heading(Резервное копирование индексов)[id=opensearch_backup_create]}

Резервные копии индексов создаются на узле мониторинга в директории `/srv/backup/opensearch/indexes`, монтированной в контейнер по пути `/srv/backup`.

Названия резервных копий индексов в Портале логирования OpenSearch отображаются в формате:

* `snapshot-{date}-{time}` — название разовой копии.
* `policy-snapshot-{date}-{time}-<НАЗВАНИЕ_КОПИИ>` — название копии, созданной политикой автоматического резервного копирования.

### {heading(Создание резервной копии индекса)[id=opensearch_backup_create_in]}

Чтобы включить резервное копирование индексов, в файле `/group_vars/vkcloud/logging.yml`:

1. Установите значение `true` для параметров:

   * `opensearch_backup_index_enable` — включает возможность резервного копирования индексов.
   * `opensearch_auto_backuping_index_enable` — включает политику создания резервных копий индексов в автоматическом режиме по расписанию.

1. Укажите количество дней для ротации резервного копирования в параметре `opensearch_backup_index_days_rotate`. По умолчанию 7 дней.

1. Для параметра `оpensearch_index_list_backup` добавьте список шаблонов индекса, для которых необходимо создать резервную копию.

   {caption(Пример списка шаблонов индекса)[align=left;position=above]}
   ```console
     - '*_atom-*'
     - '*_audit-*'
     - '*_cinder-*'
     - '*_clickhouse-*'
     - '*_data-master-*'
     - '*_data-platformer-*'
     - '*_glance-*'
     - '*_haproxy-*'
     - '*_heat-*'
     - '*_iam-*'
     - '*_karboii-*'
     - '*_keystone-*'
     - '*_magnum-*'
     - '*_neutron-*'
     - '*_nova-*'
     - '*_postgres-*'
     - '*_proxysql-*'
     - '*_scrooge-*'
     - '*_sprut-*'
     - '*_trove-*'
     - '*_windmill-*'
     - '*_zookeeper-*'
     - filebeat-*
     - filebeat-7.17.14_*
     - filebeat-7.17.25-*
   ```
   {/caption}

1. В параметре `opensearch_snapshot_policy` укажите настройки политики автоматического создания резервных копий индексов по расписанию. Подробнее — в [официальной документации OpenSearch](https://opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/sm-api/#example).

Резервную копию индексов и политику автоматического резервного копирования по расписанию можно создать двумя способами:

* При установке OpenSearch:
  
  ```console
  $ ansible-playbook -i vkcloud.yml --diff -e env=vkcloud  ../ansible-openstack/playbooks/opensearch.yml
  ```
  
* При запуске резервного копирования на уже установленном OpenSearch (если необходимо запустить только резервное копирование индексов или создать политику):

  ```console
  $ ansible-playbook -i vkcloud.yml --diff -e env=vkcloud  ../ansible-openstack/playbooks/opensearch.yml --tags backup
  ```

<info>

Посмотреть данные созданной резервной копии и ее политику можно в Портале логирования в разделе **Snapshot Manager** → **Snapshots** → **Snapshots policies**.

</info>

### {heading(Восстановление индекса из резервной копии)[id=opensearch_backup_index]}

Чтобы восстановить индекс из резервной копии:

1. Войдите в Портал логирования с учетными данными администратора.

1. Перейдите в раздел **Snapshot Manager** → **Snapshots** и выберите необходимую резервную копию.

1. Нажмите кнопку **Restore**.

1. Установите параметры восстановления.

1. Нажмите кнопку **Restore Snapshot**. 