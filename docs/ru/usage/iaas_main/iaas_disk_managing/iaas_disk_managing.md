# {heading(Управление дисками)[id=iaas_disk_managing]}

## {heading(Создание диска)[id=volume_creating]}

Чтобы создать диск, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

{ifndef(cer)}

### {heading(OpenStack CLI)[id=volume_creating_cli]}

Чтобы создать пустой диск при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_volume_create_cmd]}

   Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_volume_create)[text=%text]}.
{/ifndef}

## {heading(Удаление диска)[id=volume_deleting]}

Чтобы удалить диск, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

<warn>

Для успешного удаления диска:

* Диск должен быть отключён от ВМ.
* Диск не должен иметь снэпшотов.

</warn>

{ifndef(cer)}

### {heading(OpenStack CLI)[id=volume_deleting_cli]}

Чтобы удалить диск при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_volume_delete_cmd]}

   Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_volume_delete)[text=%text]}.
{/ifndef}

## {heading(Клонирование диска)[id=vm_disk_clone_cloning]}

Чтобы клонировать диск, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

{ifndef(cer)}

### {heading(OpenStack CLI)[id=vm_disk_clone_cli]}

Чтобы клонировать диск при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   ```console
   # openstack volume create --source <SOURCE_VOLUME_ID> <NEW_VOLUME>
   ```

   <info>

   Диск может быть клонирован с помощью команды создания диска с параметрами для клонирования (подробнее — в разделе {linkto(../../../cli_commands#cli_openstack_volume_create)[text=%text]}).

   </info>

{/ifndef}

## {heading(Создание снимка диска)[id=volume_snapshot_create]}

Чтобы создать снимок диска (снэпшот), используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

{ifndef(cer)}
### {heading(OpenStack CLI)[id=volume_snapshot_create_cli]}

Чтобы создать снимок диска при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_snapshot_create_cmd]}

   Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_volume_snapshot_create)[text=%text]}.
{/ifndef}