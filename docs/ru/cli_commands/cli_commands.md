# {appendix-heading(Основные команды командной строки OpenStack)[id=cli_commands; position=prefix]}

<info>

Перед использованием OpenStack CLI выполните подготовительные операции (подробнее — в разделе {linkto(../usage/interfaces_access#use_openstackcli)[text=%text]}).

</info>

## {appendix-heading(Встроенная справка по командам)[id=cli_commands_reference; position=prefix]}

```console
# openstack help <КОМАНДА>
```

Здесь `<КОМАНДА>` — команда, по которой необходимо получить справку.

## {appendix-heading(Управление шаблонами (типами) ВМ)[id=cli_commands_vm_template_management; position=prefix]}

### {appendix-heading(Получение списка шаблонов ВМ)[id=cli_openstack_flavor_list; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_flavor_list_cmd]}

Здесь:

* `--public` — показать только публичные шаблоны ВМ.
* `--private` — показать только приватные шаблоны ВМ.
* `--all` — показать все шаблоны ВМ: публичные и приватные (по умолчанию).
* `--long` — выводить дополнительные поля.

### {appendix-heading(Просмотр информации о шаблоне ВМ)[id=cli_openstack_flavor_view; position=prefix]}

```console
# openstack flavor show <ИМЯ_ИЛИ_ID_ШАБЛОНА>
```

Здесь `<ИМЯ_ИЛИ_ID_ШАБЛОНА>` — название или ID шаблона ВМ.

### {appendix-heading(Создание шаблона ВМ)[id=cli_openstack_flavor_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_flavor_create_cmd]}

Здесь:

* `--id <ID>` — ID шаблона; `auto` создает UUID (default: auto).
* `--ram <SIZE_MB>` — размер памяти в МБ (значение по умолчанию `256MB`).
* `--disk <SIZE_GB>` — размер диска в ГБ (значение по умолчанию `0GB`).
* `--ephemeral <SIZE_GB>` — размер эфемерного диска в ГБ (значение по умолчанию `0GB`).
* `--swap <SIZE_MB>` — дополнительный размер swap в МБ (значение по умолчанию `0MB`).
* `--vcpus <VCPUS>` — количество vCPU (значение по умолчанию `1`).
* `--rxtx-factor <FACTOR>` — RX/TX фактор (значение по умолчанию `1.0`).
* `--public` — шаблон доступен в других проектах (по умолчанию).
* `--private` — шаблон недоступен в других проектах.
* `--property <KEY=VALUE>` — дополнительные свойства шаблона. Может использоваться несколько раз для установки нескольких свойств.
* `--project <PROJECT>` — разрешает доступ к шаблону из проекта `<PROJECT>` (по имени проекта или его ID). Опция используется совместно с `--private`.
* `--project-domain <PROJECT_DOMAIN>` — домен проекта (имя домена или ID). Опция используется в случае конфликтов между названиями проектов.
* `<FLAVOR_NAME>` — название шаблона.

### {appendix-heading(Изменение параметров шаблона ВМ)[id=cli_openstack_flavor_set; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_flavor_set_cmd]}

Описание параметров приведено в разделе {linkto(#cli_openstack_flavor_create)[text=%text]}.

### {appendix-heading(Удаление шаблона ВМ)[id=cli_openstack_flavor_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_flavor_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ШАБЛОНА>` — название или ID шаблона ВМ. Несколько шаблонов перечисляются через пробел.

## {appendix-heading(Управление ВМ)[id=cli_openstack_vm_manage; position=prefix]}

### {appendix-heading(Просмотр списка ВМ)[id=cli_openstack_server_list; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_list_cmd]}

Здесь:

* `--reservation-id <RESERVATION_ID>` — возвращать экземпляры ВМ, соответствующие резервированию.
* `--ip <IP_ADDRESS_REGEX>` — регулярное выражение для отбора ВМ по соответствующим адресам.
* `--name <NAME_REGEX>` — регулярное выражение для отбора ВМ по имени.
* `--instance-name <SERVER_NAME_REGEX>` — регулярное выражение для отбора ВМ по имени инстанса.
* `--status <STATUS>` — отбирать ВМ по указанному статусу.
* `--flavor <FLAVOR>` — отбирать ВМ по указанному шаблону ВМ (по названию или ID).
* `--image <IMAGE>` — отбирать ВМ по указанному образу (по названию или ID).
* `--host <HOSTNAME>` — отбирать ВМ по гипервизору размещения.
* `--all-projects` — включать в выборку все проекты.
* `--project <PROJECT>` — отбирать ВМ в указанном проекте (по названию или ID).
* `--project-domain <PROJECT_DOMAIN>` — отбирать ВМ по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.
* `--user <USER>` — отбирать ВМ указанного пользователя (по имени или ID).
* `--user-domain <USER_DOMAIN>` — отбирать ВМ по домену пользователя (по имени или ID). Опция используется в случае конфликтов между именами пользователей.
* `--long` — выводить дополнительные поля.
* `--marker <SERVER>` — последняя ВМ предыдущей страницы. Выводит весь список ВМ после `<SERVER>`, если не указано иное. Если используется с опцией `--deleted`, маркер `<SERVER>` должен быть идентификатором (ID), иначе допускается использование имени ВМ или ID.
* `--limit <NUM_SERVERS>` — максимальное количество ВМ в выводимом списке. Если указывается значение `-1` — выводятся все ВМ. Если указанное значение `<NUM_SERVERS>` превышает значение конфигурационного параметра `osapi_max_limit` — выводится `osapi_max_limit` ВМ.
* `--deleted` — выводить только удаленные ВМ.
* `--changes-since <CHANGES_SINCE>` — выводит список ВМ, измененных после указанного момента времени. Указываемое время должно быть в формате `ISO 8061` (например, `2016-03-05T06: 27: 59Z`).

### {appendix-heading(Просмотр информации о ВМ)[id=cli_openstack_server_view; position=prefix]}

```console
# openstack server show <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

{ifndef(cer)}

### {appendix-heading(Просмотр информации о ВМ (через Nova))[id=cli_openstack_server_view_nova; position=prefix]}

```console
# nova show <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

{/ifndef}

### {appendix-heading(Добавление ВМ)[id=cli_openstack_server_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_create_cmd]}

<!---
$ openstack server create
      (--image <IMAGE> | --volume <VOLUME>)
      --flavor <FLAVOR>
      [--security-group <SECURITY_GROUP>]
      [--key-name <KEY_NAME>]
      [--property <KEY=VALUE>]
      [--file <dest-filename=SOURCE_FILENAME>]
      [--user-data <USER_DATA>]
      [--availability-zone <ZONE_NAME>]
      [--block-device-mapping <DEV_NAME=MAPPING>]
      [--nic <net-id=NET_UUID,v4-fixed-ip=IP_ADDRESS,v6-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>]
      [--hint <KEY=VALUE>]
      [--config-drive <CONFIG_DRIVE_VOLUME>]
      [--min <COUNT>]
      [--max <COUNT>]
      [--wait]
      <SERVER>
--->

Здесь:

* `--image <IMAGE>` — создание ВМ с использованием существующего образа (название или ID).
* `--volume <VOLUME>` — создание ВМ с использованием указанного диска (название или ID). Флаг автоматически создает отображение блочного устройства с индексом загрузки `0`.
* `--flavor <FLAVOR>` — использовать указанный тип ВМ (название или ID).

<!--- //Подробнее — в разделе <<cli_openstack_flavor_list>>. -->

* `--security-group <SECURITY_GROUP>` — группа безопасности, назначаемая ВМ. Может использоваться несколько раз для назначения нескольких групп безопасности.
* `--key-name <KEY_NAME>` — используемая ключевая пара. Необязательный флаг.
* `--property <KEY=VALUE>` — дополнительные свойства ВМ. Может использоваться несколько раз для установки нескольких свойств.
* `--file <DEST_FILENAME=SOURCE_FILENAME>` — файл, который добавляется в образ ОС (например, SSH-ключи).
* `--user-data <USER_DATA>` — пользовательские данные для сервера метаданных.
* `--availability-zone <ZONE_NAME>` — устанавливает зону доступности ВМ.
* `--block-device-mapping <DEV_NAME=MAPPING>` — маппинг блочных устройств.
* `--nic <net-id=NET_UUID,v4-fixed-ip=IP_ADDRESS,v6-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>` — создать сетевой адаптер. Можно использовать несколько раз для создания нескольких адаптеров. Необходимо указывать ID сети или ID порта, но не оба сразу:

   * `net-id` — подключить сетевой адаптер к сети с UUID `<NET_UUID>`.
   * `v4-fixed-ip` — фиксированный IPv4-адрес сетевого адаптера. Необязательный флаг.

   <!--- // ** `v6-fixed-ip` — фиксированный IPv6-адрес сетевого адаптера. Необязательный флаг. -->

   * `port-id` — подключить сетевой адаптер к порту с UUID `<PORT_UUID>`.
   * `none` — сеть не подключена.
   * `auto` — автоматическое выделение сети.

* `--hint <KEY=VALUE>` — дополнительные параметры для планировщика (scheduler).
* `--config-drive <CONFIG_DRIVE_VOLUME>` — использовать указанный диск в качестве конфигурационного; установите значение `True` для использования эфемерного диска.
* `--min <COUNT>` — минимальное количество ВМ для запуска. Значение по умолчанию — `1`.
* `--max <COUNT>` — максимальное количество ВМ для запуска. Значение по умолчанию — `1`.
* `--wait` — дождаться завершения создания ВМ.
* `<SERVER>` — название ВМ.

### {appendix-heading(Изменение параметров ВМ)[id=cli_openstack_server_set; position=prefix]}

```console
# openstack server set
    [--name <NAME>]
    [--root-password]
    [--property <key=value>]
    [--property <KEY=VALUE>]
    [--state <STATE>]
    <SERVER>
```

Здесь:

* `--name <NAME>` — новое имя ВМ.
* `--root-password` — установить пароль пользователю `root`.
* `--property <KEY=VALUE>` — дополнительные свойства ВМ. Может использоваться несколько раз для установки нескольких свойств.
* `--state <STATE>` — установить статус для ВМ.
* `<SERVER>` — название или ID ВМ.

### {appendix-heading(Изменение размера ВМ)[id=cli_openstack_server_resize; position=prefix]}

```console
# openstack server resize
    [--flavor <FLAVOR> | --confirm | --revert]
    [--wait]
    <SERVER>
```

Здесь:

* `--flavor <FLAVOR>` — тип ВМ, до которого будет изменен тип ВМ (название или ID типа).
* `--confirm` — подтвердить изменение размера ВМ.
* `--revert` — восстановить состояние ВМ до изменения размера.
* `--wait` — дождаться завершения изменения размера ВМ.
* `<SERVER>` — название или ID ВМ.

### {appendix-heading(Присоединение диска к ВМ)[id=cli_openstack_server_add_volume; position=prefix]}

```console
# openstack server add volume
    <ИМЯ_ИЛИ_ID_ВМ>
    <ИМЯ_ИЛИ_ID_ДИСКА>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ИМЯ_ИЛИ_ID_ДИСКА>` — название или ID диска, для которого выполняется операция.

### {appendix-heading(Отсоединение диска от ВМ)[id=cli_openstack_server_remove_volume; position=prefix]}

```console
# openstack server remove volume
    <ИМЯ_ИЛИ_ID_ВМ>
    <ИМЯ_ИЛИ_ID_ДИСКА>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ИМЯ_ИЛИ_ID_ДИСКА>` — название или ID диска, для которого выполняется операция.

### {appendix-heading(Запуск ВМ)[id=cli_openstack_server_start; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_start_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ВМ> [ <ИМЯ_ИЛИ_ID_ВМ_2> …]` — название или ID инстанса (ВМ); несколько ВМ указываются через пробел.

### {appendix-heading(Перезапуск ВМ)[id=cli_openstack_server_reboot; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_reboot_cmd]}

Здесь:

* `--hard` — «жесткая» (принудительная) перезагрузка.
* `--soft` — «мягкая» перезагрузка.
* `--wait` — дождаться завершения перезагрузки.
* `<SERVER>` — название или ID ВМ.

### {appendix-heading(Останов ВМ)[id=cli_openstack_server_stop; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_stop_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ВМ> [<ИМЯ_ИЛИ_ID_ВМ_2> …]` — название или ID инстанса (ВМ); несколько ВМ указываются через пробел.

#### {appendix-heading(Привязка плавающего IP-адреса к ВМ)[id=cli_openstack_server_add_floating_ip; position=prefix]}

```console
# openstack server add floating ip <ИМЯ_ИЛИ_ID_ВМ> <IP_АДРЕС>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<IP_АДРЕС>` — плавающий IP-адрес, для которого выполняется привязка.

### {appendix-heading(Отсоединение IP-адреса от инстанса)[id=cli_openstack_server_disconnect_floating_ip; position=prefix]}

```console
# openstack server remove floating ip
    <SERVER>
    <IP_АДРЕС>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — инстанс (название или ID), к которому привязывается IP-адрес.
* `<IP_АДРЕС>` — плавающий IP-адрес (или ID), который отсоединяется от инстанса.

{ifndef(cer)}

#### {appendix-heading(Установление пароля на ВМ)[id=cli_openstack_server_setting_password; position=prefix]}

```console
# nova set-password <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

{/ifndef}

### {appendix-heading(Миграция ВМ)[id=cli_openstack_server_migrate; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_migrate_cmd]}

Здесь:

* `--live` — выполнить live-миграцию ВМ на вычислительный узел `<HOSTNAME>`.
* `--shared-migration` — выполнить общую live-миграцию (по умолчанию).
* `--block-migration` — выполнить блочную live-миграцию.
* `--disk-overcommit` — разрешить избыточную фиксацию диска на целевом узле.
* `--no-disk-overcommit` — не выполнять избыточную фиксацию диска на целевом узле (по умолчанию).
* `--wait` — дождаться завершения миграции.
* `<SERVER>` — мигрируемая ВМ (название или ID).

### {appendix-heading(Удаление ВМ)[id=cli_openstack_server_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_server_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ВМ> [<ИМЯ_ИЛИ_ID_ВМ_2> …]` — название или ID инстанса (ВМ); несколько ВМ указываются через пробел.

## {appendix-heading(Управление группами безопасности ВМ)[id=cli_openstack_server_manage_security_group; position=prefix]}

### {appendix-heading(Назначение группы безопасности на ВМ)[id=cli_openstack_server_add_security_group; position=prefix]}

```console
# openstack server add security group <ИМЯ_ИЛИ_ID_ВМ> <ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — название или ID группы безопасности, для которой выполняется операция.

### {appendix-heading(Удаление группы безопасности на ВМ)[id=cli_openstack_server_remove_security_group; position=prefix]}

```console
# openstack server remove security group <ИМЯ_ИЛИ_ID_ВМ> <ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — название или ID группы безопасности, для которой выполняется операция.

{ifndef(cer)}

## {appendix-heading(Управление тегами ВМ)[id=cli_nova_server_tag_manage; position=prefix]}

### {appendix-heading(Просмотр списка тегов ВМ)[id=cli_nova_server_tag_list; position=prefix]}

```console
# nova server-tag-list <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

### {appendix-heading(Добавление тега на ВМ)[id=cli_nova_server_tag_add; position=prefix]}

```console
# nova server-tag-add <ИМЯ_ИЛИ_ID_ВМ> <ТЕГ> [<ТЕГ_2> ...]
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ТЕГ> [<ТЕГ_2> …]` — название или ID тега; несколько тегов указываются через пробел.

### {appendix-heading(Удаление тегов ВМ)[id=cli_nova_server_tag_delete; position=prefix]}

```console
# nova server-tag-delete <ИМЯ_ИЛИ_ID_ВМ> <ТЕГ> [<ТЕГ_2> ...]
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).
* `<ТЕГ> [<ТЕГ_2> …]` — название или ID тега; несколько тегов указываются через пробел.

### {appendix-heading(Удаление всех тегов ВМ)[id=cli_nova_server_tag_delete_all; position=prefix]}

```console
# nova server-tag-delete-all <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

{/ifndef}

## {appendix-heading(Управление ключевыми парами ВМ)[id=cli_key_pair_manage; position=prefix]}

### {appendix-heading(Просмотр списка ключей ВМ)[id=cli_key_pair_view_list; position=prefix]}

```console
# openstack keypair list
```

### {appendix-heading(Просмотр информации о ключевой паре ВМ)[id=cli_key_pair_view_info; position=prefix]}

```console
# openstack keypair show
    [--public-key]
    <KEY>
```

Здесь:

* `--public-key` — показать только закрытый ключ в ключевой паре.
* `<KEY>` — имя ключевой пары.

### {appendix-heading(Добавление ключа ВМ)[id=cli_key_pair_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_keypair_create_cmd]}

Здесь:

* `<ПУТЬ_ДО_ФАЙЛА_ОТКРЫТОГО_КЛЮЧА>` — абсолютный путь до файла открытого ключа.
* `<ИМЯ_КЛЮЧА>` — имя ключа.

### {appendix-heading(Удаление ключа ВМ)[id=cli_key_pair_delete; position=prefix]}

```console
# openstack keypair delete <ИМЯ_КЛЮЧА>
```

Здесь `<ИМЯ_КЛЮЧА>` — имя ключа.

## {appendix-heading(Управление образами ВМ)[id=cli_openstack_image_manage; position=prefix]}

### {appendix-heading(Просмотр списка образов ВМ)[id=cli_openstack_image_view_list; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_image_list_cmd]}

Здесь:

* `--public` — показывать только публичные образы.
* `--private` — показывать только приватные образы.
* `--shared` — показывать только общие образы.
* `--property <KEY=VALUE>` — фильтр по параметрам образа.
* `--long` — выводить дополнительные поля.

### {appendix-heading(Просмотр информации об образе ВМ)[id=cli_openstack_image_view_info; position=prefix]}

```console
# openstack image show <ИМЯ_ИЛИ_ID_ОБРАЗА>
```

Здесь `<ИМЯ_ИЛИ_ID_ОБРАЗА>` — название или ID образа диска ВМ.

### {appendix-heading(Добавление образа ВМ)[id=cli_openstack_image_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_image_create_cmd]}

Здесь:

* `--disk-format <DISK_FORMAT>` — формат диска образа. Возможные значения: `ami`, `ari`, `aki`, `vhd`, `vmdk`, `raw`, `qcow2`, `vhdx`, `vdi`, `iso`, `ploop`. Значение по умолчанию — `raw`.
* `--container-format <CONTAINER_FORMAT>` — формат контейнера образа. Возможные значения: `ami`, `ari`, `aki`, `bare` (по умолчанию), `docker`, `ova`, `ovf`.
* `--file <FILE>` — создать образ из файла. Указывается путь до образа или его архива.
* `--volume <VOLUME>` — создать образ из диска (название или ID).
* `--protected` — защитить образ от удаления.
* `--unprotected` — защитить образ от удаления.
* `--public` — сделать образ публичным.
* `--private` — сделать образ приватным (по умолчанию).
* `--property <KEY=VALUE>` — дополнительные свойства образа. Может использоваться несколько раз для установки нескольких свойств.
* `--project <PROJECT>` — проект (название или ID), в которую добавить образ.
* `--project-domain <PROJECT_DOMAIN>` — присвоить образ домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `<IMAGE>` — название образа диска.

### {appendix-heading(Изменение параметров образа ВМ)[id=cli_openstack_image_edit; position=prefix]}

<!--- // остальные опции image set являются в основном сокращениями от --property и сильно зависят от конфигурации; не добавлены -->

```console
# openstack image set
    [--name <NAME>]
    [--property <KEY=VALUE> [--property <KEY_2=VALUE_2> ...] ]
    <IMAGE>
```

Здесь:

* `--name <NAME>` — новое имя образа.
* `--property <KEY=VALUE>` — дополнительные свойства образа. Может использоваться несколько раз для установки нескольких свойств.
* `<IMAGE>` — название или ID образа.

### {appendix-heading(Экспорт образа ВМ)[id=cli_openstack_image_save; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_image_save_cmd]}

Здесь:

* `<ИМЯ_ФАЙЛА_ЗАГРУЗКИ>` — имя файла экспортируемого образа с указанием расширения.
* `<ИМЯ_ИЛИ_ID_ОБРАЗА>` — название или ID образа диска ВМ.

### {appendix-heading(Удаление образа ВМ)[id=cli_openstack_image_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_image_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ОБРАЗА>` — название или ID образа диска ВМ.

## {appendix-heading(Управление дисками)[id=cli_openstack_volume_manage; position=prefix]}

### {appendix-heading(Просмотр списка дисков)[id=cli_openstack_volume_view_list; position=prefix]}

```console
# openstack volume list
```

### {appendix-heading(Просмотр списка типов дисков)[id=cli_openstack_volume_view_list_type; position=prefix]}

```console
# openstack volume type list
    [--long]
    [--default | --public | --private]
```

Здесь:

* `--long` — вывести дополнительные свойства.
* `--default` — фильтр по типам дисков по умолчанию.
* `--public` — фильтр по публичным дискам.
* `--private` — фильтр по приватным дискам.

### {appendix-heading(Создание диска)[id=cli_openstack_volume_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_volume_create_cmd]}

Здесь:

* `--size <SIZE>` — размер диска в ГБ.
* `--type <VOLUME_TYPE>` — тип диска (название или ID).
* `--image <IMAGE>` — образ для создания диска (название или ID).
* `--snapshot <SNAPSHOT>` — снэпшот для создания диска (название или ID).
* `--source <VOLUME>` — использовать другой диск в качестве источника (клонирование).
* `--source-replicated <REPLICATED_VOLUME>` — реплицируемый диск для клонирования (название или ID).
* `--description <DESCRIPTION>` — описание диска.
* `--project <PROJECT>` — проект (название или ID), за которым закрепить диск.
* `--availability-zone <AVAILABILITY_ZONE>` — создать диск в зоне доступности `<AVAILABILITY_ZONE>`.
* `--consistency-group <CONSISTENCY_GROUP>` — consistency-группа для диска.
* `--property <KEY=VALUE>` — дополнительные свойства диска. Может использоваться несколько раз для установки нескольких свойств.
* `--hint <KEY=VALUE>` — дополнительные параметры для планировщика (scheduler).
* `--bootable` — пометить диск как загрузочный.
* `--non-bootable` — пометить диск как незагрузочный (используется по умолчанию).
* `--read-only` — установить режим «только для чтения».
* `--read-write` — установить режим «чтение-запись» (используется по умолчанию).
* `<NAME>` — имя диска.

### {appendix-heading(Изменение параметров диска)[id=cli_openstack_volume_set; position=prefix]}

<!--- // остальные опции image set являются в основном сокращениями от --property и сильно зависят от конфигурации; не добавлены -->

```console
# openstack volume set
    [--name <NAME>]
    [--size <SIZE>]
    [--description <DESCRIPTION>]
    [--state <STATE>]
    [--type <VOLUME_TYPE>]
    [--retype-policy <RETYPE_POLICY>]
    [--bootable | --non-bootable]
    [--read-only | --read-write]
    <VOLUME>
```

Здесь:

* `--name <NAME>` — новое имя диска.
* `--retype-policy <RETYPE_POLICY>` — политика миграции диска при его переписывании. Возможные значения: `never` or `on-demand`. Значение по умолчанию `never`. Указывается вместе с флагом `--type`.
* `--state <STATE>` — установить статус для диска. Возможные значения: `available`, `error`, `creating`, `deleting`, `in-use`, `attaching`, `detaching`, `error_deleting`, `maintenance`.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_volume_create)[text=%text]}.

### {appendix-heading(Удаление диска)[id=cli_openstack_volume_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_volume_delete_cmd]}

Здесь:

* `--force` — признак принудительного удаления дисков, независимо от состояния. Значение по умолчанию `false`.
* `--purge` — удалить все снэпшоты, связанные с дисками. Значение по умолчанию `false`.
* `<ИМЯ_ИЛИ_ID_ДИСКА> [<ИМЯ_ИЛИ_ID_ДИСКА_2> …]` — название или ID диска; несколько дисков указываются через пробел.

## {appendix-heading(Управление снимками диска)[id=cli_openstack_volume_snapshot_manage; position=prefix]}

### {appendix-heading(Просмотр списка снимков диска)[id=cli_openstack_volume_snapshot_view_list; position=prefix]}

```console
# openstack volume snapshot list
    [--all-projects]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--long]
    [--name <NAME>]
    [--status <STATUS>]
    [--volume <VOLUME>]
```

Здесь:

* `--all-projects` — отобразить снимки всех проектов (доступно только для Администратора {var(sys2)}).
* `--project <PROJECT>` — отбирать снимки в указанном проекте (по названию или ID); доступно только для Администратора {var(sys2)}.
* `--project-domain <PROJECT_DOMAIN>` — отбирать снимки по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.
* `--long` — вывести дополнительные свойства.
* `--name <NAME>` — фильтрация снимков по имени.
* `--status <STATUS>` — фильтрация снимков по статусу. Возможные значения: `available`, `error`, `creating`, `deleting`, `error-deleting`.
* `--volume <VOLUME>` — отобразить снимки для диска `<VOLUME>`.

### {appendix-heading(Просмотр информации о снимке диска)[id=cli_openstack_volume_snapshot_view_info; position=prefix]}

```console
# openstack volume snapshot show <ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА>
```

Здесь `<ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА>` — название или ID снимка диска.

### {appendix-heading(Создание снимка диска)[id=cli_openstack_volume_snapshot_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_snapshot_create_cmd]}

Здесь:

* `--volume <VOLUME>` — диск (название или ID), для которого создается снимок. Значение по умолчанию совпадает с `<NAME>`.
* `--description <DESCRIPTION>` — описание снимка.
* `--force` — сделать принудительно. Обязательный флаг для подключенных дисков.
* `<SNAPSHOT>` — название снимка диска.

### {appendix-heading(Изменение параметров снимка диска)[id=cli_openstack_volume_snapshot_edit; position=prefix]}

```console
# openstack volume snapshot set
    [--name <NAME>]
    [--description <DESCRIPTION>]
    [--state <STATE>]
    <SNAPSHOT>
```

Здесь:

* `--name <NAME>` — новое имя снимка диска.
* `--description <DESCRIPTION>` — новое описание снимка диска.
* `--state <STATE>` — установить статус для снимка (только для Администратора {var(sys2)}). Возможные значения: `available`, `error`, `creating`, `deleting`, `error-deleting`.
* `<SNAPSHOT>` — название или ID снимка диска.

### {appendix-heading(Удаление снимка диска)[id=cli_openstack_volume_snapshot_delete; position=prefix]}

```console
# openstack volume snapshot delete <ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА> [<ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА_2> ...]
```

Здесь `<ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА> [<ИМЯ_ИЛИ_ID_СНИМКА_ДИСКА_2> …]` — название или ID снимка диска, который необходимо удалить; несколько дисков перечисляются через пробел.

## {appendix-heading(Управление консолью VNC)[id=cli_vnc_console_management; position=prefix]}

{ifndef(cer)}

### {appendix-heading(Получение доступа к консоли VNC ВМ)[id=cli_vnc_console_getting_access; position=prefix]}

```console
# nova get-vnc-console <ИМЯ_ИЛИ_ID_ВМ> novnc
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

{/ifndef}

### {appendix-heading(Генерация ссылки на консоль VNC)[id=cli_vnc_console_getting_access; position=prefix]}

```console
# openstack console url show <ИМЯ_ИЛИ_ID_ВМ>
```

Здесь `<ИМЯ_ИЛИ_ID_ВМ>` — название или ID инстанса (ВМ).

### {appendix-heading(Просмотр журнала консоли VNC)[id=cli_openstack_console_log_show; position=prefix]}

```console
# openstack console log show
    [--lines <NUM_LINES>]
    <SERVER>
```

Здесь:

* `--lines <NUM_LINES>` — количество строк для отображения с конца журнала. Значение по умолчанию `all`.
* `<SERVER>` — название или ID ВМ.

{ifndef(cer)}

## {appendix-heading(Управление файловым хранилищем)[id=cli_file_storage_management; position=prefix]}

### {appendix-heading(Просмотр списка файловых хранилищ)[id=cli_manila_list; position=prefix]}

```console
# manila list --all
```

### {appendix-heading(Просмотр списка сетей файловых хранилищ)[id=cli_manila_share_network_list; position=prefix]}

```console
# manila share-network-list --all
```

### {appendix-heading(Просмотр информации о файловом хранилище)[id=cli_manila_show; position=prefix]}

```console
# manila show <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>
```

Здесь `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.

### {appendix-heading(Создание файлового хранилища)[id=cli_manila_create; position=prefix]}

```console
# manila create
    [--snapshot-id <SNAPSHOT>]
    [--name <NAME>]
    [--metadata [<KEY=VALUE> [<KEY=VALUE> ...]]]
    [--share-network <NETWORK_ID>]
    [--description <DESCRIPTION>]
    [--share-type <SHARE_TYPE>]
    [--public]
    [--availability-zone <AVAILABILITY_ZONE>]
    <PROTOCOL>
    <SIZE>
```

Здесь:

* `--snapshot-id <SNAPSHOT>` — название или ID снимка, из которого необходимо создать файловое хранилище.
* `--name <NAME>` — имя файлового хранилища.
* `--metadata [<KEY=VALUE> [<KEY=VALUE> …]]` — метаданные для хранилища в формате **ключ=значение**; значение по умолчанию `Default=None`.
* `--share-network <NETWORK_ID>` — ID сети файлового хранилища, созданной Порталом самообслуживания.
* `--description <DESCRIPTION>` — описание для файлового хранилища.
* `--share-type <SHARE_TYPE>` — тип хранилища.
* `--public` — является ли хранилище публичным.
* `--availability-zone <AVAILABILITY_ZONE>` — зона доступности для хранилища.
* `<PROTOCOL>` — протокол доступа к файловому хранилищу. Возможные значения: `NFS`, `CIFS`.
* `<SIZE>` — размер файлового хранилища в ГБ.

### {appendix-heading(Увеличение размера файлового хранилища)[id=cli_manila_extend; position=prefix]}

```console
# manila extend <ИМЯ_ИЛИ_ID_ХРАНИЛИЩА> <НОВЫЙ_РАЗМЕР_В_ГБ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.
* `<НОВЫЙ_РАЗМЕР_В_ГБ>` — новый размер хранилища в ГБ.

### {appendix-heading(Уменьшение размера файлового хранилища)[id=cli_manila_shrink; position=prefix]}

```console
# manila shrink <ИМЯ_ИЛИ_ID_ХРАНИЛИЩА> <НОВЫЙ_РАЗМЕР_В_ГБ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.
* `<НОВЫЙ_РАЗМЕР_В_ГБ>` — новый размер хранилища в ГБ.

### {appendix-heading(Удаление файлового хранилища)[id=cli_manila_delete; position=prefix]}

```console
# manila delete <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА> [<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА_2> ...]
```

Здесь `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА> [<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА_2> …]` — название или ID файлового хранилища; несколько значений отделяются пробелом.

### {appendix-heading(Правила доступа для файлового хранилища)[id=cli_manila_access; position=prefix]}

#### {appendix-heading(Просмотр списка правил доступа)[id=cli_manila_access_list; position=prefix]}

```console
# manila access-list <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>
```

Здесь `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.

#### {appendix-heading(Добавление правила доступа)[id=cli_manila_access_allow; position=prefix]}

```console
# manila access-allow <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА> ip <IP_АДРЕС_В_НОТАЦИИ_CIDR>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.
* `<IP_АДРЕС_В_НОТАЦИИ_CIDR>` — IP-адрес правила доступа в формате `CIDR`.

#### {appendix-heading(Удаление правила доступа)[id=cli_manila_access_deny; position=prefix]}

```console
# manila access-deny <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА> <ID_IP_АДРЕСА>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>` — название или ID файлового хранилища.
* `<ID_IP_АДРЕСА>` — ID IP-адреса правила доступа.

### {appendix-heading(Снимки (снэпшоты) файлового хранилища)[id=cli_manila_snapshot; position=prefix]}

#### {appendix-heading(Просмотр списка снимков)[id=cli_manila_snapshot_list; position=prefix]}

```console
# manila snapshot-list
```

#### {appendix-heading(Создание снимка файлового хранилища)[id=cli_manila_snapshot_create; position=prefix]}

```console
# manila snapshot-create
    [--force]
    [--name <ИМЯ_СНИМКА>]
    [--description <DESCRIPTION>]
    <ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА>
```

Здесь:

* `--force` — сделать принудительно. Обязательный флаг для подключенных дисков. Возможные значения: `True`, `False`.
* `<ИМЯ_СНИМКА>` — название создаваемого снимка.
* `--description <DESCRIPTION>` — описание для создаваемого снимка.
* `ИМЯ_ИЛИ_ID_ФАЙЛОВОГО_ХРАНИЛИЩА` — название или ID файлового хранилища.

#### {appendix-heading(Удаление снимка файлового хранилища)[id=cli_manila_snapshot_delete; position=prefix]}

```console
# manila snapshot-delete <ИМЯ_ИЛИ_ID_СНИМКА> [<ИМЯ_ИЛИ_ID_СНИМКА_2> ...]
```

Здесь `<ИМЯ_ИЛИ_ID_СНИМКА> [<ИМЯ_ИЛИ_ID_СНИМКА_2> …]` — название или идентификатор снимка файлового хранилища; несколько значений разделяются друг от друга пробелом.

{/ifndef}

## {appendix-heading(Управление сетями)[id=cli_openstack_network; position=prefix]}

### {appendix-heading(Просмотр списка сетей)[id=cli_openstack_network_list; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_network_list_cmd]}

Здесь:

* `--external` — отобразить только внешние сети.
* `--internal` — отобразить только внутренние сети.
* `--long` — вывести дополнительные свойства.
* `--name <NAME>` — отобразить сеть с именем `<NAME>`.
* `--enable` — отобразить только сети со статусом `enabled`.
* `--disable` — отобразить только сети со статусом `disable`.
* `--project <PROJECT>` — отбирать сети в указанном проекте (по названию или ID).
* `--project-domain <PROJECT_DOMAIN>` — отбирать сети по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.
* `--share` — показать общие сети для нескольких проектов.
* `--no-share` — показать общие сети только для одного проекта.
* `--status <STATUS>` — отобразить сети в определенных статусах. Возможные значения:

   * `ACTIVE` — активна.
   * `BUILD` — в процессе создания.
   * `DOWN` — отключена.
   * `ERROR` — ошибка работы.

* `--provider-network-type <PROVIDER_NETWORK_TYPE>` — отобразить сети определенного типа. Возможные значения: `flat`, `geneve`, `gre`, `local`, `vlan`, `vxlan`.
* `--provider-physical-network <PROVIDER_PHYSICAL_NETWORK>` — отобразить сеть с именем физической сети `<PROVIDER_PHYSICAL_NETWORK>`.
* `--provider-segment <PROVIDER_SEGMENT>` — отобразить список сетей в соответствии с идентификатором VLAN для сетей VLAN или идентификатором Tunnel ID для GENEVE/GRE/VXLAN сетей.

### {appendix-heading(Просмотр информации о сети)[id=cli_openstack_network_view_info; position=prefix]}

```console
# openstack network show <ИМЯ_ИЛИ_ID_СЕТИ>
```

Здесь `<ИМЯ_ИЛИ_ID_СЕТИ>` — идентификатор или ID сети.

### {appendix-heading(Создание сети)[id=cli_openstack_network_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_network_create_cmd]}

Здесь:

* `--share` — установить сеть как публичную (доступной на других проектах).
* `--no-share` — установить сеть как приватную (по умолчанию).
* `--enable` — признак доступности сети (по умолчанию).
* `--disable` — признак недоступности сети.
* `--project <PROJECT>` — проект (название или ID), в которую добавить сеть.
* `--project-domain <PROJECT_DOMAIN>` — присвоить сеть домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `--description <DESCRIPTION>` — описание сети.
* `--availability-zone-hint <AVAILABILITY_ZONE>` — зона доступности для сети (требуется расширение `Network Availability Zone`).
* `--external` — установить сеть как внешнюю.
* `--internal` — установить сеть как внутреннюю (по умолчанию).
* `--default` — использовать в виде внешней сети по умолчанию.
* `--no-default` — не использовать в виде внешней сети по умолчанию (по умолчанию).
* `--qos-policy <QOS_POLICY` — правило QoS для сети (название или ID).
* `--provider-network-type <PROVIDER_NETWORK_TYPE>` — физический механизм, с помощью которого реализуется виртуальная сеть. Возможные значения: `flat`, `geneve`, `gre`, `local`, `vlan`, `vxlan`.
* `--provider-physical-network <PROVIDER_PHYSICAL_NETWORK>` — название физической сети (только для внешней сети).
* `<NETWORK>` — название сети.

### {appendix-heading(Изменение сети)[id=cli_openstack_network_set; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_network_set_cmd]}

Описание параметров приведено в разделе {linkto(#cli_openstack_network_create)[text=%text]}.

### {appendix-heading(Удаление сети)[id=cli_openstack_network_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_network_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_СЕТИ> [<ИМЯ_ИЛИ_ID_СЕТИ_2> …]` — идентификатор или ID сети; несколько значений отделяются друг от друга пробелом.

## {appendix-heading(Управление подсетями)[id=cli_openstack_subnet; position=prefix]}

### {appendix-heading(Просмотр списка подсетей)[id=cli_openstack_subnet_list; position=prefix]}

```console
# openstack subnet list
    [--ip-version <IP_VERSION>]
    [--dhcp | --no-dhcp]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--network <NETWORK>]
    [--gateway <GATEWAY>]
    [--name <NAME>]
    [--subnet-range <SUBNET_RANGE>]
```

Здесь:

* `--ip-version <IP_VERSION>` — сеть определенной версии. Возможные значения: `4`, `6`.
* `--dhcp` — сети с DHCP.
* `--no-dhcp` — сети без DHCP.
* `--project <PROJECT>` — проект (название или ID), за которым закреплены подсети.
* `--project-domain <PROJECT_DOMAIN>` — отбирать подсеть по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.
* `--network <NETWORK>` — подсети для сети `<NETWORK>`.
* `--gateway <GATEWAY>` — подсети для шлюза `<GATEWAY>`.
* `--name <NAME>` — название подсети.
* `--subnet-range <SUBNET_RANGE>` — вес подсети.

### {appendix-heading(Просмотр информации о подсети)[id=cli_openstack_subnet_view_info; position=prefix]}

```console
# openstack subnet show <ИМЯ_ИЛИ_ID_ПОДСЕТИ>
```

Здесь `<ИМЯ_ИЛИ_ID_ПОДСЕТИ>` — название или ID подсети.

### {appendix-heading(Создание подсетей)[id=cli_openstack_subnet_create; position=prefix]}

<!---
[source, console]
----
# openstack subnet create
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--subnet-pool <SUBNET_POOL> | --use-default-subnet-pool]
    [--subnet-range <SUBNET_RANGE>]
    [--dhcp | --no-dhcp]
    [--gateway <GATEWAY>]
    [--ip-version {4,6}]
    [--ipv6-ra-mode {dhcpv6-stateful,dhcpv6-stateless,slaac}]
    [--network-segment <NETWORK_SEGMENT>]
    --network <NETWORK>
    [--description <DESCRIPTION>]
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
    [--dns-nameserver <DNS_NAMESERVER>]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--service-type <SERVICE_TYPE>]
    <SUBNET>
----
-->

{include(./_includes/_cli_commands.md)[tags=cli_openstack_subnet_create_cmd]}

Здесь:

* `--project <PROJECT>` — проект (название или ID), за которым будет закреплена подсеть.
* `--project-domain <PROJECT_DOMAIN>` — присвоить подсеть домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `--subnet-pool <SUBNET_POOL>` — пул адресов, из которого будет получен CIDR. Опция `--use-default-subnet-pool` устанавливает пул по умолчанию.
* `--subnet-range <SUBNET_RANGE>` — диапазон IP-адресов подсети `<SUBNET_RANGE>` в нотации CIDR. Обязательная опция, если не указана `--subnet-pool`.
* `--dhcp` — использовать DHCP (по умолчанию).
* `--no-dhcp` — не использовать DHCP.
* `--gateway <GATEWAY>` — IP-адрес шлюза подсети.
* `--ip-version` — версия подсети, по умолчанию `4`.

<!--- // * `--ipv6-ra-mode` — режим RA (Router Advertisement) для IPv6. Возможные значения: `dhcpv6-stateful`,`dhcpv6-stateless`,`slaac`. -->

* `--network-segment <NETWORK_SEGMENT>` — сегмент сети для связи с текущей подсетью (название или ID).
* `--network <NETWORK>` — сеть (название или ID), частью которой будет являться данная подсеть.
* `--description <DESCRIPTION>` — описание подсети.
* `--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>` — пул IP-адресов, доступных для выдачи посредством DHCP.
* `--dns-nameserver <DNS_NAMESERVER>` — DNS-сервер для подсети.
* `--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>` — дополнительный маршрут для подсети (в нотации CIDR).
* `<SUBNET>` — название подсети.
* `--service-type <SERVICE_TYPE>` — тип сервиса для подсети, например, `network:floatingip_agent_gateway`.

### {appendix-heading(Изменение подсети)[id=cli_openstack_subnet_set; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_subnet_set_cmd]}

Здесь:

* `--name <NAME>` — новое имя подсети.
* `--no-allocation-pool` — не использовать пул IP-адресов, доступных для выдачи посредством DHCP.
* `--no-dns-nameservers` — не использовать DNS-сервер для подсети.
* `--no-host-route` — не использовать дополнительный маршрут для подсети.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_subnet_create)[text=%text]}.

### {appendix-heading(Сброс параметров подсети)[id=cli_openstack_subnet_unset; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_subnet_unset_cmd]}

Описание опций приведено в разделе {linkto(#cli_openstack_subnet_set)[text=%text]}.

### {appendix-heading(Удаление подсети)[id=cli_openstack_subnet_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_subnet_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ПОДСЕТИ> [<ИМЯ_ИЛИ_ID_ПОДСЕТИ_2> …]` — название или ID подсети; несколько значений отделяются друг от друга пробелом.

## {appendix-heading(Управление портами)[id=cli_openstack_port; position=prefix]}

### {appendix-heading(Просмотр списка портов)[id=cli_openstack_port_list; position=prefix]}

```console
# openstack port list
    [--device-owner <DEVICE_OWNER>]
    [--network <NETWORK>]
    [--router <ROUTER> | --server <SERVER>]
    [--mac-address <MAC_ADDRESS>]
    [--long]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
```

Здесь:

* `--device-owner <DEVICE_OWNER>` — имя владельца порта.
* `--network <NETWORK>` — фильтрация портов по сети (название или ID).
* `--router <ROUTER>` — фильтрация портов по маршрутизатору (название или ID).
* `--server <SERVER>` — фильтрация портов по инстансу (название или ID).
* `--mac-address <MAC_ADDRESS>` — фильтрация портов по MAC-адресу.
* `--long` — вывести дополнительные свойства.
* `--project <PROJECT>` — проект, для которого будут отображены порты.
* `--project-domain <PROJECT_DOMAIN>` — отбирать порты по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.

### {appendix-heading(Просмотр информации о порте)[id=cli_openstack_port_view_info; position=prefix]}

```console
# openstack port show <ИМЯ_ИЛИ_ID_ПОРТА>
```

Здесь `<ИМЯ_ИЛИ_ID_ПОРТА>` — название или ID порта.

### {appendix-heading(Создание порта)[id=cli_openstack_port_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_port_create_cmd]}

Здесь:

* `--network <NETWORK>` — сеть (название или ID), для которой создается порт.
* `--description <DESCRIPTION>` — описание для порта.
* `--device <DEVICE_ID>` — ID устройства порта.
* `--device-owner <DEVICE_OWNER>` — имя владельца порта.
* `--vnic-type <VNIC_TYPE>` — тип VNIC для порта. Возможные значения: `direct`, `direct-physical`, `macvtap`, `normal` (по умолчанию), `baremetal`.
* `--host <HOST_ID>` — ID хоста, к которому будет привязан порт.
* `--dns-name <DNS_NAME>` — назначить DNS-имя для порта.
* `--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>` — IP-адрес в указанной подсети (название или ID) для порта.
* `--enable` — сделать порт активным (значение по умолчанию).
* `--disable` — сделать порт неактивным.
* `--mac-address <MAC_ADDRESS>` — MAC-адрес порта.
* `--project <PROJECT>` — закрепить порт за проектом (название или ID).
* `--project-domain <PROJECT_DOMAIN>` — присвоить порт домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `--security-group <SECURITY_GROUP>` — группа безопасности для порта. Опция `--no-security-group` не добавляет группы безопасности порту (по умолчанию).
* `--enable-port-security` — включить защиту для порта (по умолчанию).
* `--disable-port-security` — отключить защиту для порта.
* `--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]` — пара разрешенных адресов, связанных с портом.
* `<PORT>` — название порта.

### {appendix-heading(Изменение порта)[id=cli_openstack_port_set; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_port_set_cmd]}

Здесь:

* `--name <NAME>` — новое имя порта.
* `--no-fixed-ip` — убрать все IP-адреса для порта.
* `--no-allowed-address` — убрать все разрешенные адреса для порта.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_port_create)[text=%text]}.

### {appendix-heading(Удаление порта)[id=cli_openstack_port_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_port_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_ПОРТА> [<ИМЯ_ИЛИ_ID_ПОРТА_2> …]` — название или ID порта; несколько значений отделяются друг от друга пробелом.

## {appendix-heading(Управление группами безопасности и правилами групп безопасности)[id=cli_openstack_security_group_manage; position=prefix]}

### {appendix-heading(Группы безопасности)[id=cli_openstack_sg; position=prefix]}

#### {appendix-heading(Просмотр списка групп безопасности)[id=cli_openstack_sg_list; position=prefix]}

```console
# openstack security group list
    [--project <PROJECT>]
```

Здесь `--project <PROJECT>` — проект (название или ID), к которому привязана группа безопасности.

#### {appendix-heading(Просмотр информации о группе безопасности)[id=cli_openstack_sg_view_info; position=prefix]}

```console
# openstack security group show <ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь `<ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — название или ID группы безопасности.

#### {appendix-heading(Создание группы безопасности)[id=cli_openstack_sg_create; position=prefix]}

```console
# openstack security group create
    [--description <DESCRIPTION>]
    [--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]]
    <SECURITY_GROUP>
```

Здесь:

* `--description <DESCRIPTION>` — описание группы безопасности.
* `--project <PROJECT>` — проект, в котором создается группа безопасности (название или ID).
* `--project-domain <PROJECT_DOMAIN>` — присвоить группу безопасности домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `<SECURITY_GROUP>` — имя группы безопасности.

#### {appendix-heading(Изменение групп безопасности)[id=cli_openstack_sg_set; position=prefix]}

```console
# openstack security group set
    [--name <NEW_NAME> ]
    [--description <DESCRIPTION>]
    <SECURITY_GROUP>
```

Здесь `--name <NEW_NAME>` — новое имя существующей группы безопасности.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_sg_create)[text=%text]}.

#### {appendix-heading(Удаление групп безопасности)[id=cli_openstack_sg_delete; position=prefix]}

```console
# openstack security group delete <ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь `<ИМЯ_ИЛИ_ID_ГРУППЫ_БЕЗОПАСНОСТИ>` — название или ID группы безопасности.

### {appendix-heading(Правила группы безопасности)[id=cli_openstack_sg_rules; position=prefix]}

#### {appendix-heading(Просмотр списка правил групп безопасности)[id=cli_openstack_sg_rules_list; position=prefix]}

```console
# openstack security group rule list
    [--protocol <PROTOCOL>]
    [--ingress | --egress]
    [--long]
    [<SECURITY_GROUP>]
```

Здесь:

* `--protocol <PROTOCOL>` — фильтрация правил по протоколу IP. Возможные значения: `icmp`, `tcp`, `udp`.
* `--ingress` — фильтрация по правилам входящего трафика.
* `--egress` — фильтрация по правилам исходящего трафика.
* `--long` — вывести дополнительные свойства.
* `<SECURITY_GROUP>` — фильтрация правил по группе безопасности (название или ID).

#### {appendix-heading(Просмотр информации о правиле группы безопасности)[id=cli_openstack_sg_rules_view_info; position=prefix]}

```console
# openstack security group rule show <ID_ПРАВИЛА_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь `<ID_ПРАВИЛА_ГРУППЫ_БЕЗОПАСНОСТИ>` — ID правила группы безопасности.

#### {appendix-heading(Создание правил групп безопасности)[id=cli_openstack_sg_rules_create; position=prefix]}

```console
# openstack security group rule create
    [--remote-ip <IP_ADDRESS> | --remote-group <GROUP>]
    [--description <DESCRIPTION>]
    [--dst-port <PORT_RANGE>]
    [--icmp-type <ICMP_TYPE>]
    [--icmp-code <ICMP_CODE>]
    [--protocol <PROTOCOL>]
    [--ingress | --egress]
    [--ethertype <ETHERTYPE>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    <SG_RULE>
```

Здесь:

* `--remote-ip <IP_ADDRESS>` — блок адреса подключения в нотации CIDR, на который будет применена фильтрация. Значение по умолчанию — `0.0.0.0/0`.
* `--remote-group <GROUP>` — удаленная группа безопасности (название или ID).
* `--description <DESCRIPTION>` — описание правила.
* `--dst-port <PORT_RANGE>`— порт назначения. Может быть одиночным портом или диапазоном портов (`137:139`). Требуется для протоколов TCP и UDP. Игнорируется для ICMP протокола.
* `--icmp-type <ICMP_TYPE>` — тип ICMP для протокола ICMP IP.
* `--icmp-code <ICMP_CODE>` — код ICMP для протокола ICMP IP.
* `--protocol <PROTOCOL>` — IP протокол. Возможные значения: `icmp`, `tcp`, `udp`. Значение по умолчанию `tcp`.
* `--ingress` — применить правило для входящего трафика (используется по умолчанию).
* `--egress` — применить правило для исходящего трафика.
* `--ethertype <ETHERTYPE>` — тип Ethernet-кадра (двухбайтовое шестнадцатеричное число).
* `--project <PROJECT>` — проект, в котором создается правило (название или ID).
* `--project-domain <PROJECT_DOMAIN>` — присвоить правило домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `<SG_RULE>` — название правила группы безопасности.

#### {appendix-heading(Удаление правил группы безопасности)[id=cli_openstack_sg_rules_delete; position=prefix]}

```console
# openstack security group rule delete <ID_ПРАВИЛА_ГРУППЫ_БЕЗОПАСНОСТИ>
```

Здесь `<ID_ПРАВИЛА_ГРУППЫ_БЕЗОПАСНОСТИ>` — ID правила группы безопасности.

{ifndef(cer)}

## {appendix-heading(Управление балансировщиками нагрузки)[id=cli_loadbalancer_listener_pool_manage; position=prefix]}

### {appendix-heading(Балансировщик нагрузки)[id=cli_openstack_loadbalancer; position=prefix]}

#### {appendix-heading(Просмотр списка балансировщиков нагрузки)[id=cli_openstack_loadbalancer_list; position=prefix]}

```console
# openstack loadbalancer list
    [--name <NAME>]
    [--enable | --disable]
    [--project <PROJECT>]
    [--vip-network-id <VIP_NETWORK>]
    [--vip-subnet-id <VIP_SUBNET>]
    [--vip-qos-policy-id <VIP_QOS_POLICY>]
    [--vip-port-id <VIP_PORT>]
    [--provisioning-status {ACTIVE,DELETED,ERROR,PENDING_CREATE,PENDING_UPDATE,PENDING_DELETE}]
    [--operating-status {ONLINE,DRAINING,OFFLINE,DEGRADED,ERROR,NO_MONITOR}]
    [--provider <PROVIDER>]
    [--availability-zone <AVAILABILITY_ZONE>]
```

Здесь:

* `--name <NAME>` — фильтр по названию балансировщика нагрузки.
* `--enable` — показать включенные балансировщики нагрузки.
* `--disable` — показать отключенные балансировщики нагрузки.
* `--project <PROJECT>` — проект, для которого будут отображены балансировщики.
* `--vip-network-id <VIP_NETWORK>` — фильтр по VIP-сети (название или ID).
* `--vip-subnet-id <VIP_SUBNET>` — фильтр по подсети (название или ID).
* `--vip-qos-policy-id <VIP_QOS_POLICY>` — фильтр по VIP QoS (название или ID).
* `--vip-port-id <VIP_PORT>` — фильтр по порту (название или ID).
* `--provisioning-status` — вывести балансировщики в определенном статусе подготовки. Возможные значения: `ACTIVE`, `DELETED`, `ERROR`, `PENDING_CREATE`, `PENDING_UPDATE`, `PENDING_DELETE`.
* `--operating-status` — вывести балансировщики в определенном статусе работы. Возможные значения: `ONLINE`, `DRAINING`, `OFFLINE`, `DEGRADED`, `ERROR`, `NO_MONITOR`.
* `--provider <PROVIDER>` — фильтр по провайдеру.
* `--availability-zone <AVAILABILITY_ZONE` — фильтр по зоне доступности.

#### {appendix-heading(Просмотр информации о балансировщике нагрузки)[id=cli_openstack_loadbalancer_view_info; position=prefix]}

```console
# openstack loadbalancer show <ИМЯ_ИЛИ_ID_БАЛАНСИРОВЩИКА>
```

Здесь `<ИМЯ_ИЛИ_ID_БАЛАНСИРОВЩИКА>` — название или ID балансировщика нагрузки.

#### {appendix-heading(Создание балансировщика нагрузки)[id=cli_openstack_loadbalancer_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_create_cmd]}

Здесь:

* `--name <NAME>` — название балансировщика нагрузки.
* `--description <DESCRIPTION>` — описание балансировщика.
* `--vip-address <VIP_ADDRESS>` — IP-адрес для балансировщика (название или ID).
* `--vip-port-id <VIP_PORT>` — порт для балансировщика (название или ID). Не используется совместно с флагом `--vip-network-id`.
* `--vip-subnet-id <VIP_SUBNET>` — подсеть для балансировщика (название или ID).
* `--vip-network-id <VIP_NETWORK>` — сеть для балансировщика (название или ID).
* `--vip-qos-policy-id <VIP_QOS_POLICY>` — правило QoS для балансировщика (название или ID).
* `--project <PROJECT>` — проект, за которым закрепляется балансировщик.
* `--provider <PROVIDER>` — провайдер балансировщика.
* `--availability-zone <AVAILABILITY_ZONE` — зона доступности для балансировщика.
* `--enable` — включить балансировщик (по умолчанию).
* `--disable` — отключить балансировщик.

#### {appendix-heading(Удаление балансировщика нагрузки)[id=cli_openstack_loadbalancer_delete; position=prefix]}

```console
# openstack loadbalancer delete <ИМЯ_ИЛИ_ID_БАЛАНСИРОВЩИКА_НАГРУЗКИ>
```

Здесь `<ИМЯ_ИЛИ_ID_БАЛАНСИРОВЩИКА>` — название или ID балансировщика нагрузки.

### {appendix-heading(Обработчик балансировщика нагрузки)[id=cli_openstack_loadbalancer_listener; position=prefix]}

#### {appendix-heading(Просмотр списка обработчиков)[id=cli_openstack_loadbalancer_listener_list; position=prefix]}

```console
# openstack loadbalancer listener list
    [--name <NAME>]
    [--loadbalancer <LOAD_BALANCER>]
    [--enable | --disable]
    [--project <PROJECT>]
```

Здесь:

* `--name <NAME>` — фильтрация обработчиков по названию.
* `--loadbalancer <LOAD_BALANCER>` — фильтрация обработчиков по балансировщику нагрузки (название или ID).
* `--enable` — вывести список активных обработчиков.
* `--disable` — вывести список неактивных обработчиков.
* `--project <PROJECT>` — фильтрация обработчиков по проекту (название или ID).

#### {appendix-heading(Просмотр информации об обработчике)[id=cli_openstack_loadbalancer_listener_view_info; position=prefix]}

```console
# openstack loadbalancer listener show <ИМЯ_ИЛИ_ID_ОБРАБОТЧИКА>
```

Здесь `<ИМЯ_ИЛИ_ID_ОБРАБОТЧИКА>` — название или ID обработчика балансировщика нагрузки.

#### {appendix-heading(Создание обработчика)[id=cli_openstack_loadbalancer_listener_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_listener_create_cmd]}

Здесь:

* `--name <NAME>` — название правила балансировки.
* `--description <DESCRIPTION>` — описание правила балансировки.
* `--protocol <PROTOCOL>` — протокол балансировки. Возможные значения: `TCP`, `HTTP`, `HTTPS`.
* `--connection-limit <LIMIT>` — максимальное количество подключений, разрешенных для правила балансировки.
* `--insert-headers <HEADER=VALUE> [, <HEADER_2=VALUE_2>, …]` — заголовки, которые будут включены в запрос к серверу.
* `--protocol-port <PORT>` — порт протокола балансировки.
* `--timeout-client-data <TIMEOUT>` — тайм-аут бездействия фронтенда в миллисекундах. Значение по умолчанию: `50000`.
* `--timeout-member-connect <TIMEOUT>` — тайм-аут подключения к серверу в миллисекундах. Значение по умолчанию: `5000`.
* `--timeout-member-data <TIMEOUT>` — тайм-аут бездействия сервера в миллисекундах. Значение по умолчанию: `50000`.
* `--timeout-tcp-inspect <TIMEOUT>` — ожидание дополнительных TCP-пакетов для проверки содержимого в миллисекундах. Значение по умолчанию: `0`.
* `--enable` — включить правило балансировки (по умолчанию).
* `--disable` — отключить правило балансировки.
* `--allowed-cidr <ALLOWED_CIDR>` — разрешенный IP-адрес или маска сети в нотации CIDR; несколько значений указываются с отдельным ключом `--allowed-cidr`, например: `--allowed-cidr <ALLOWED_CIDR_1> --allowed-cidr <ALLOWED_CIDR_2>`.
* `<LOAD_BALANCER>` — балансировщик нагрузки (название или ID).

#### {appendix-heading(Удаление обработчика)[id=cli_openstack_loadbalancer_listener_delete; position=prefix]}

```console
# openstack loadbalancer listener delete <ИМЯ_ИЛИ_ID_ОБРАБОТЧИКА>
```

Здесь `<ИМЯ_ИЛИ_ID_ОБРАБОТЧИКА>` — название или ID обработчика балансировщика нагрузки.

### {appendix-heading(Пул серверов балансировщика нагрузки)[id=cli_openstack_loadbalancer_pool; position=prefix]}

#### {appendix-heading(Просмотр списка пулов серверов)[id=cli_openstack_loadbalancer_pool_list; position=prefix]}

```console
# openstack loadbalancer pool list
    [--loadbalancer <LOAD_BALANCER>]
```

Здесь `--loadbalancer <LOAD_BALANCER>` — фильтрация пулов серверов по балансировщику нагрузки (название или ID).

#### {appendix-heading(Просмотр информации о пуле)[id=cli_openstack_loadbalancer_pool_view_info; position=prefix]}

```console
# openstack loadbalancer pool show <ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>
```

Здесь `<ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>` — название или ID пула серверов балансировщика нагрузки.

#### {appendix-heading(Создание пула серверов)[id=cli_openstack_loadbalancer_pool_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_pool_create_cmd]}

Здесь:

* `--name <NAME>` — название пула серверов.
* `--description <DESCRIPTION>` — описание пула серверов.
* `--protocol <PROTOCOL>` — протокол назначения. Возможные значения: `TCP`, `HTTP`, `PROXY`.
* `--listener <LISTENER>` — правило балансировки (название или ID), которое привязывается к пулу серверов.
* `--loadbalancer <LOAD_BALANCER>` — балансировщик нагрузки (название или ID), который привязывается к пулу серверов.
* `--session-persistence <SESSION_PERSISTENCE>` — свойства непрерывности сети для обработчика (в формате **ключ=значение**).
* `--lb-algorithm <LB_ALGORITHM>` — метод балансировки. Возможные значения: `SOURCE_IP`, `ROUND_ROBIN`, `LEAST_CONNECTIONS`.
* `--enable` — включить пул серверов (по умолчанию).
* `--disable` — отключить пул серверов.
* `--tls-container-ref <CONTAINER_REF>` — ссылка на TLS-контейнер.
* `--ca-tls-container-ref <CA_TLS_CONTAINER_REF>` — ссылка на TLS-контейнер с CA-сертификатом.
* `--crl-container-ref <CRL_CONTAINER_REF>` — ссылка на контейнер со списком отозванных CA-сертификатов.
* `--enable-tls` — включить TLS-шифрование.
* `--disable-tls` — отключить TLS-шифрование.

#### {appendix-heading(Просмотр списка мониторов)[id=cli_openstack_loadbalancer_healthmonitor_list; position=prefix]}

```console
# openstack loadbalancer healthmonitor list
```

#### {appendix-heading(Просмотр информации о мониторе)[id=cli_openstack_loadbalancer_healthmonitor_view_info; position=prefix]}

```console
# openstack loadbalancer healthmonitor show <ID_МОНИТОРА>
```

#### {appendix-heading(Создание монитора)[id=cli_openstack_loadbalancer_healthmonitor_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_healthmonitor_create_cmd]}

Здесь:

* `--name <NAME>` — название монитора.
* `--delay <DELAY>` — время в секундах между отправкой запросов участникам.
* `--domain-name <DOMAIN_NAME>` — доменное имя, которое будет добавлено в HTTP-заголовок для проверки работоспособности HTTP.
* `--expected-codes <CODES>` — перечень HTTP-статусов, которые ожидается получить в случае работоспособности.
* `--http-method` — HTTP-методы, которые может использовать монитор. Возможные значения: `GET`, `POST`, `DELETE`, `PUT`, `HEAD`, `OPTIONS`, `PATCH`, `CONNECT`, `TRACE`.
* `--http-version <HTTP_VERSION>` — используемая версия HTTP.
* `--timeout <TIMEOUT>` — максимальный таймаут в секундах.
* `--max-retries <MAX_RETRIES>` — число успешных попыток переподключения перед изменением рабочего статуса участника на `ONLINE`.
* `--url-path <URL_PATH>` — URL-адрес, на который монитор будет отправлять запросы по проверке работоспособности.
* `--type <TYPE>` — тип монитора. Обязательный параметр. Возможные значения: `PING`, `HTTP`, `HTTPS`, `TCP`.
* `--max-retries-down <MAX_RETRIES_DOWN>` — максимально количество попыток подключения, после которых монитор переходит в состояние `ERROR`.
* `--enable` — включить монитор (по умолчанию).
* `--disable` — отключить монитор.
* `<POOL>` — пул для монитора (название или ID).

#### {appendix-heading(Удаление пула серверов)[id=cli_openstack_loadbalancer_pool_delete; position=prefix]}

```console
# openstack loadbalancer pool delete <ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>
```

Здесь `<ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>` — название или ID пула серверов балансировщика нагрузки.

### {appendix-heading(Сервер в пуле серверов)[id=cli_openstack_loadbalancer_member; position=prefix]}

#### {appendix-heading(Просмотр списка серверов в пуле серверов)[id=cli_openstack_loadbalancer_member_list; position=prefix]}

```console
# openstack loadbalancer member list <ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>
```

Здесь `<ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>` — название или ID пула серверов балансировщика нагрузки.

#### {appendix-heading(Просмотр информации о сервере в пуле серверов)[id=cli_openstack_loadbalancer_member_view_info; position=prefix]}

```console
# openstack loadbalancer member show <ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>
```

Здесь `<ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>` — название или ID пула серверов балансировщика нагрузки.

#### {appendix-heading(Создание сервера в пуле серверов)[id=cli_openstack_loadbalancer_member_create; position=prefix]}

```console
# openstack loadbalancer member create
    [--name <NAME>]
    [--disable-backup | --enable-backup]
    [--weight <WEIGHT>]
    --address <IP_ADDRESS>
    [--subnet-id <SUBNET_ID>]
    --protocol-port <PROTOCOL_PORT>
    [--monitor-port <MONITOR_PORT>]
    [--monitor-address <MONITOR_ADDRESS>]
    [--enable | --disable]
    <POOL>
```

Здесь:

* `--name <NAME>` — название сервера.
* `--disable-backup` — отключить резервное копирование для сервера (по умолчанию).
* `--enable-backup` — включить резервное копирование для сервера.
* `--weight <WEIGHT>` — вес сервера.

<!--- //(подробнее —  в разделе <<vnet_load_balancer_create_weight>>). -->

* `--address <IP_ADDRESS>` — IP-адрес сервера, трафик которого будет обслуживаться балансировщиком нагрузки.
* `--subnet-id <SUBNET_ID>` — ID подсети, из которой доступен сервер.
* `--protocol-port <PROTOCOL_PORT>` — номер порта, который будет прослушивать сервер.
* `--monitor-port <MONITOR_PORT>` — дополнительный номер порта, используемый для мониторинга сервера (health monitoring).
* `--monitor-address <MONITOR_ADDRESS>` — дополнительный IP-адрес, используемый для мониторинга сервера.
* `--enable` — включить сервер (по умолчанию).
* `--disable` — отключить сервер.
* `<POOL>` — пул серверов (название или ID), в котором создать сервер.

#### {appendix-heading(Удаление сервера из пула серверов)[id=cli_openstack_loadbalancer_member_delete; position=prefix]}

```console
# openstack loadbalancer member delete <ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ> <ИМЯ_ИЛИ_ID_СЕРВЕРА>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_ПУЛА_СЕРВЕРОВ>` — название или ID пула серверов балансировщика нагрузки.
* `<ИМЯ_ИЛИ_ID_СЕРВЕРА>` — название или ID сервера, который необходимо удалить.

{/ifndef}

## {appendix-heading(Управление маршрутизаторами)[id=cli_openstack_router_manage; position=prefix]}

### {appendix-heading(Просмотр списка маршрутизаторов)[id=cli_openstack_router_list; position=prefix]}

```console
# openstack router list
    [--name <NAME>]
    [--enable | --disable]
    [--long]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
```

Здесь:

* `--name <NAME>` — фильтрация маршрутизаторов по имени.
* `--enable` — вывести список активных маршрутизаторов.
* `--disable` — вывести список неактивных маршрутизаторов.
* `--long` — вывести дополнительные свойства.
* `--project <PROJECT>` — фильтрация маршрутизаторов по проекту (название или ID).
* `--project-domain <PROJECT_DOMAIN>` — отбирать маршрутизатор по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.

### {appendix-heading(Просмотр информации о маршрутизаторе)[id=cli_openstack_router_view_info; position=prefix]}

```console
# openstack router show <ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА>
```

Здесь `<ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА>` — название или ID маршрутизатора.

### {appendix-heading(Создание маршрутизатора)[id=cli_openstack_router_create; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_router_create_cmd]}

Здесь:

* `--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]` — название проекта и, при необходимости, домена, к которому будет относиться маршрутизатор.
* `--enable` — сделать маршрутизатор активным (значение по умолчанию).
* `--disable` — сделать маршрутизатор неактивным.
* `--distributed` — признак распределенности. Маршрутизатор создается только на вычислительных узлах.
* `--ha` — признак высокой доступности (High availability). Маршрутизатор создается на всех узлах.

   <err>

   Для использования параметров `--distributed` и `--ha` требуется поддержка со стороны Neutron и соответствующие настройки.

   </err>
  
* `--description <DESCRIPTION>` — описание для маршрутизатора.
* `--availability-zone-hint <AVAILABILITY_ZONE>` — зона доступности `<AVAILABILITY_ZONE>`.
* `<ROUTER>` — название маршрутизатора.

### {appendix-heading(Изменение параметров маршрутизатора)[id=cli_openstack_router_set; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_router_set_cmd]}

Здесь:

* `--name <NAME>` — новое имя маршрутизатора.
* `--route destination=<SUBNET>,gateway=<IP_ADDRESS>` — указание статического маршрута. Здесь:

   * `<SUBNET>` — целевая подсеть в нотации `CIDR`.
   * `<IP_ADDRESS>` — IP-адрес ВМ.

* `--no-route` — очистить статические маршруты маршрутизатора. Чтобы перезаписать имеющиеся статические маршруты, используйте оба флага: `--route` и `--no-route`.
* `--external-gateway <NETWORK>` — внешняя сеть (с доступом к сетям вне {var(sys2)}). Обычно используется сеть `ext-net`.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_router_create)[text=%text]}.

### {appendix-heading(Сброс параметров маршрутизатора)[id=cli_openstack_router_unset; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_router_unset_cmd]}

Здесь:

* `--tag <TAG>` — название тега, который необходимо удалить для маршрутизатора.
* `--all-tag` — удалить все теги для маршрутизатора.

Описание остальных параметров приведено в разделе {linkto(#cli_openstack_router_set)[text=%text]}.

### {appendix-heading(Подключение подсети к маршрутизатору)[id=cli_openstack_router_connect; position=prefix]}

```console
# openstack router add subnet <ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА> <ИМЯ_ИЛИ_ID_ПОДСЕТИ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА>` — название или ID маршрутизатора.
* `<ИМЯ_ИЛИ_ID_ПОДСЕТИ>` — название или идентификатор подсети, для которой выполняется операция.

### {appendix-heading(Отключение подсети от маршрутизатора)[id=cli_openstack_router_disconnect; position=prefix]}

```console
# openstack router remove subnet <ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА> <ИМЯ_ИЛИ_ID_ПОДСЕТИ>
```

Здесь:

* `<ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА>` — название или ID маршрутизатора.
* `<ИМЯ_ИЛИ_ID_ПОДСЕТИ>` — название или идентификатор подсети, для которой выполняется операция.

### {appendix-heading(Удаление маршрутизатора)[id=cli_openstack_router_delete; position=prefix]}

{include(./_includes/_cli_commands.md)[tags=cli_openstack_router_delete_cmd]}

Здесь `<ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА>` — название или ID маршрутизатора; несколько значений отделяются друг от друга пробелом.

## {appendix-heading(Управление плавающими IP-адресами)[id=cli_openstack_floating_ip_manage; position=prefix]}

### {appendix-heading(Просмотр списка IP-адресов)[id=cli_openstack_floating_ip_list; position=prefix]}

```console
# openstack floating ip list
    [--network <NETWORK>]
    [--port <PORT>]
    [--long]
    [--status <STATUS>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--router <ROUTER>]
```

Здесь:

* `--network <NETWORK>` — фильтрация плавающих IP-адресов по сети (название или ID).
* `--port <PORT>` — фильтрация плавающих IP-адресов по порту (название или ID).
* `--long` — вывести дополнительные свойства.
* `--status <STATUS>` — фильтр по статусу IP-адресов. Возможные значения: `ACTIVE`, `DOWN`.
* `--project <PROJECT>` — проект, за которым закреплен IP-адрес.
* `--project-domain <PROJECT_DOMAIN>` — отбирать адреса по домену проекта (по названию или ID). Опция используется в случае конфликтов между названиями проектов.
* `--router <ROUTER>` — фильтрация плавающих IP-адресов по маршрутизатору (название или ID).

### {appendix-heading(Создание IP-адреса)[id=cli_openstack_floating_ip_create; position=prefix]}

```console
# openstack floating ip create
    [--subnet <SUBNET>]
    [--port <PORT>]
    [--fixed-ip-address <IP_ADDRESS>]
    [--description <DESCRIPTION>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    <NETWORK>
```

Здесь:

* `--subnet <SUBNET>` — подсеть (название или ID), в которой будет создан плавающий IP-адрес.
* `--port <PORT>` — порт инстанса (название или ID), к которому необходимо привязать плавающий IP-адрес.
* `--fixed-ip-address <IP_ADDRESS>` — IP-адрес порта, который необходимо сопоставить с плавающим IP-адресом.
* `--description <DESCRIPTION>` — описание плавающего IP-адреса.
* `--project <PROJECT>` — проект (название или ID), за которым закрепить IP-адрес.
* `--project-domain <PROJECT_DOMAIN>` — присвоить IP-адрес домену проекта (по названию или ID). Флаг используется в случае конфликтов между названиями проектов.
* `<NETWORK>` — внешняя сеть (обычно используется `ext-net`).

### {appendix-heading(Удаление IP-адреса из проекта)[id=cli_openstack_floating_ip_delete; position=prefix]}

```console
# openstack floating ip delete <IP_АДРЕС_ИЛИ_ID> [<IP_АДРЕС_ИЛИ_ID_2> ...]
```

Здесь `<IP_АДРЕС_ИЛИ_ID> [<IP_АДРЕС_ИЛИ_ID_2> …]` — название или ID IP-адреса; несколько значений отделяются друг от друга пробелом.

<!---
== Управление базами данных

//[[cli_trove_flavor_list]]
=== Просмотр списка типов инстансов

[source, console]
----
trove flavor-list
----

//[[cli_openstack_volume_type_list]]
=== Просмотр списка типов дисков ВМ для базы данных

[source, console]
----
openstack volume type list
    [--long]
    [--default | --public | --private]
----

Здесь:

* `--long` — вывести дополнительные свойства.
* `--default` — фильтр по типам дисков по умолчанию.
* `--public` — фильтр по публичным дискам.
* `--private` — фильтр по приватным дискам.

//[[cli_trove_datastore_list]]
=== Просмотр списка СУБД

[source, console]
----
trove datastore-list
----

//[[cli_trove_datastore_version_list]]
=== Просмотр списка версий СУБД

[source, console]
----
trove datastore-version-list <НАЗВАНИЕ_ИЛИ_ID_СУБД>
----

Здесь `<НАЗВАНИЕ_ИЛИ_ID_СУБД>` — название или ID СУБД в системе.

//[[cli_trove_backup_list]]
=== Просмотр списка резервных копий БД

[source, console]
----
trove backup-list [--datastore <DATASTORE>]
----

Здесь `--datastore <DATASTORE>` — СУБД (название или ID), по которой выполнить фильтр.

//[[cli_trove_create]]
=== Создание базы данных

Чтобы создать инстанс БД через OpenStack CLI, выполните команду:

[source, console]
----
trove create
    <NAME> <FLAVOR>
    --size <SIZE>
    --volume_type <VOLUME_TYPE>
    [--databases <DATABASE> [<DATABASE_2> ...]]
    [--users <USER:PASSWORD> [<USER_2:PASSWORD_2> ...]]
    [--backup <BACKUP>]
    --availability_zone <AVAILABILITY_ZONE>
    --datastore <DATASTORE>
    --datastore_version <DATASTORE_VERSION>
    --nic <net-id=NET_UUID,port-id=PORT_UUID>
    [--replica_of <SOURCE_INSTANCE>]
    [--replica_count <COUNT>]
----

Здесь:

* `<NAME>` — имя инстанса БД.
* `<FLAVOR>` — использовать указанный тип инстанса БД (название или ID).
//Подробнее — в разделе <<cli_trove_flavor_list>>.
* `--size <SIZE>` — размер диска в ГБ.
* `--volume_type <VOLUME_TYPE>` — тип диска инстанса БД (название или ID).
//Подробнее — в разделе <<cli_openstack_volume_type_list>>.
* `--databases <DATABASE> [<DATABASE_2> ...]` — список названий БД для создания (через пробел).
* `--users <USER:PASSWORD> [<USER_2:PASSWORD_2> ...]` — список пользователей БД.
* `--backup <BACKUP>` — резервная копия (название или ID), из которой восстановить инстанс.
//Подробнее — в разделе <<cli_trove_backup_list>>.
+
[NOTE]
====
Название резервной копии БД в OpenStack CLI и Портале самообслуживания отличаются.
====
* `--availability_zone <AVAILABILITY_ZONE>` — зона доступности инстанса (название).
* `--datastore <DATASTORE>` — СУБД (название или ID), на основе которой создать инстанс БД.
//Подробнее — в разделе <<cli_trove_datastore_list>>.
* `--datastore_version <DATASTORE_VERSION>` — версия СУБД (название или ID).
//Подробнее — в разделе <<cli_trove_datastore_version_list>>.
* `--nic <net-id=NET_UUID,port-id=PORT_UUID>` — создать сетевой адаптер. Указывается ID сети или ID порта, но не оба сразу:
** `net-id` — подключить сетевой адаптер к сети с ID `<NET_UUID>`.
** `port-id` — подключить сетевой адаптер к порту с ID `<PORT_UUID>`.
* `--replica_of <SOURCE_INSTANCE>` — создать реплику на основе указанного инстанса БД (название или ID).
* `--replica_count <COUNT>` — количество реплик для создания. Если указан флаг `--replica_of`, значение по умолчанию — `1`.
+
[WARNING]
====
При создании инстанса БД через OpenStack CLI по умолчанию задается конфигурация `Single` (таблица <<dbaas_configurations>>). Для задания других конфигураций используйте параметры `--replica_of` и `--replica_count`.
====

//[[cli_trove_resize_instance]]
=== Изменение типа инстанса БД

[source, console]
----
trove resize-instance <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_ИЛИ_ID_ТИПА_ИНСТАНСА_БД>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_ИЛИ_ID_ТИПА_ИНСТАНСА_БД>` — название или ID типа БД.

//[[cli_trove_resize_volume]]
=== Изменение размера диска инстанса БД

[source, console]
----
trove resize-volume <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <НОВЫЙ_РАЗМЕР_В_ГБ>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<НОВЫЙ_РАЗМЕР_В_ГБ>` — новый размер диска инстанса БД в ГБ.

//[[cli_trove_cluster_grow]]
=== Расширение кластера

[source, console]
----
trove cluster-grow
    <CLUSTER>
    [--instance "<OPT>=<VALUE> [, <OPT_2>=<VALUE_2>, ...]"]
----

Здесь:

* `<CLUSTER>` — название или ID кластера.
* `--instance <OPT>=<VALUE> [, <OPT_2>=<VALUE_2>, ...]`, где возможные значения `<OPT>=<VALUE>`:
** `flavor=<FLAVOR>` — название или ID типа инстанса БД.
//Подробнее — в разделе <<cli_trove_flavor_list>>.
** `volume=<SIZE>` — размер диска в ГБ.
** `volume_type=<TYPE>` — тип диска.
** `nic='net-id=<NET_UUID>, port-id=<PORT_UUID>'`  — создать сетевой адаптер. Указывается ID сети или ID порта, но не оба сразу:
*** `net-id` — подключить сетевой адаптер к сети с ID `<NET_UUID>`.
*** `port-id` — подключить сетевой адаптер к порту с ID `<PORT_UUID>`.
** `availability_zone=<AVAILABILITY_ZONE>` — зона доступности узла.
** `type=replica` — создать асинхронную реплику.

//[[cli_trove_delete]]
=== Удаление инстанса БД

[source, console]
----
trove delete <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>
----

Здесь `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.

=== БД в инстансе

//[[cli_trove_database_list]]
==== Просмотр списка баз данных инстанса

[source, console]
----
trove database-list <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>
----

Здесь `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.

//[[cli_trove_database_create]]
==== Создание базы данных в инстансе

[source, console]
----
trove database-create <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_БАЗЫ_ДАННЫХ>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_БАЗЫ_ДАННЫХ>` — название БД, для которой выполняется операция.

//[[cli_trove_database_delete]]
==== Удаление базы данных инстанса

[source, console]
----
trove database-delete <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_БАЗЫ_ДАННЫХ>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_БАЗЫ_ДАННЫХ>` — название БД, для которой выполняется операция.

=== Управление пользователями БД

==== Просмотр списка пользователей

[source, console]
----
trove user-list <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>
----

Здесь `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.

//[[cli_trove_user_create]]
==== Создание пользователя

[source, console]
----
trove user-create
    <INSTANCE> <USERNAME> <PASSWORD>
    [--databases <DATABASE> [<DATABASE_2> ...]]
----

Здесь:

* `<INSTANCE>` — название или ID инстанса БД.
* `<USERNAME>` — имя пользователя.
* `<PASSWORD>` — пароль пользователя.
* `--databases <DATABASE> [<DATABASE_2> ...]` — список БД (названия через пробел), доступ к которым имеет пользователь.
//Подробнее — в разделе <<cli_trove_database_list>>.

//[[cli_trove_user_update_attributes]]
==== Изменение имени и пароля пользователя

[source, console]
----
trove user-update-attributes
    <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
    [--new_name <НОВОЕ_ИМЯ_ПОЛЬЗОВАТЕЛЯ>]
    [--new_password <НОВЫЙ_ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>]
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя, для которого вносятся изменения.
* `--new_name <НОВОЕ_ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — новое имя пользователя.
* `--new_password <НОВЫЙ_ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>` — новый пароль для пользователя.

//[[cli_trove_user_grant_access]]
==== Выдача доступа пользователю к БД

[source, console]
----
trove user-grant-access
    <INSTANCE> <USERNAME>
    <DATABASE> [<DATABASE_2> ...]
----

Здесь:

* `<INSTANCE>` — название или ID инстанса БД.
* `<USERNAME>` — имя пользователя.
* `<DATABASE> [<DATABASE_2> ...]` — список БД (названия указываются через пробел), доступ к которым выдать пользователю.
//Подробнее — в разделе <<cli_trove_database_list>>.

//[[cli_trove_user_revoke_access]]
==== Отзыв доступа пользователя к БД

[source, console]
----
trove user-revoke-access
    <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_ПОЛЬЗОВАТЕЛЯ> <ИМЯ_БД>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя, для которого выполняется операция.
* `<ИМЯ_БД>` — название БД, для которой выполняется операция.

//[[cli_trove_user_delete]]
==== Удаление пользователя

[source, console]
----
trove user-delete <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД> <ИМЯ_ПОЛЬЗОВАТЕЛЯ>
----

Здесь:

* `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.
* `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя, для которого выполняется операция.

=== Резервные копии БД

==== Просмотр списка резервных копий

[source, console]
----
trove backup-list-instance <ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>
----

Здесь `<ИМЯ_ИЛИ_ID_ИНСТАНСА_БД>` — название или ID инстанса БД.

//[[cli_trove_backup_create]]
==== Создание резервной копии

[source, console]
----
trove backup-create
    <INSTANCE> <NAME>
    [--description <DESCRIPTION>]
    [--incremental]
----

Здесь:

* `<INSTANCE>` — название или ID инстанса БД.
* `<NAME>` — название резервной копии.
* `--description <DESCRIPTION>` — описание резервной копии.
* `--incremental` — создать инкрементальную резервную копию, основанную на последней полной или инкрементальной резервной копии. Если ни одной резервной копии нет, создастся полная резервная копия.

//[[cli_trove_backup_delete]]
==== Удаление резервной копии

[source, console]
----
trove backup-delete <ИМЯ_ИЛИ_ID_РЕЗЕРВНОЙ_КОПИИ>
----

Здесь `<ИМЯ_ИЛИ_ID_РЕЗЕРВНОЙ_КОПИИ>` — название или ID резервной копии БД.

-->