# {heading(Управление ВМ)[id=iaas_vm_managing]}

## {heading(Запуск, перезапуск и остановка ВМ)[id=vm_start_restart_stop]}

Чтобы запустить, перезапустить и остановить ВМ, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в документе **Руководство пользователя {var(system)}** в разделе **Облачные вычисления** → **Виртуальные машины** → **Управление ВМ** → **Запуск, перезапуск и остановка ВМ**).
* OpenStack CLI.

{ifndef(cer)}

<info>

Управление ВМ с помощью Портала администратора не предусмотрено. Текущий статус ВМ отображается на странице **Инстансы**:

* В столбце **status** (кешированные данные).
* В столбце **Состояние питания** (реальные данные).

</info>

### {heading(OpenStack CLI)[id=vm_start_restart_stop_cli]}

Чтобы запустить, перезапустить и остановить ВМ с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните следующие команды:

   * Для запуска:

      {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_start_cmd]}
   
   * Для перезапуска:

      {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_reboot_cmd]}
   
   * Для остановки:

      {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_stop_cmd]}

      Описание опций приведено в разделах {linkto(../../../cli_commands#cli_openstack_server_start)[text=%text]}, {linkto(../../../cli_commands#cli_openstack_server_reboot)[text=%text]}, {linkto(../../../cli_commands#cli_openstack_server_stop)[text=%text]}.
{/ifndef}

## {heading(Просмотр списка ВМ)[id=vm_view_list]}

Чтобы просмотреть список ВМ, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в документе **Руководство пользователя {var(system)}** в разделе **Облачные вычисления** → **Виртуальные машины** → **Управление ВМ** → **Просмотр списка ВМ**).
* Портал администратора.
* OpenStack CLI.

{ifndef(cer)}
### {heading(Портал администратора)[id=vm_view_list_sa]}

Чтобы просмотреть список ВМ через Портал администратора:

1. Выполните вход на Портал администратора.
1. Перейдите в раздел **Облачные вычисления** → **Экземпляры ВМ**.

### {heading(OpenStack CLI)[id=vm_view_list_cli]}

Чтобы просмотреть список ВМ с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_list_cmd]}

   Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_server_list)[text=%text]}.
{/ifndef}

## {heading(Удаление ВМ)[id=vm_delete]}

Чтобы удалить ВМ, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в документе **Руководство пользователя {var(system)}** в разделе **Облачные вычисления** → **Виртуальные машины** → **Управление ВМ** → **Удаление ВМ**).
* OpenStack CLI.

{ifndef(cer)}
### {heading(OpenStack CLI)[id=vm_delete_cli]}

Чтобы удалить ВМ с помощью OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_delete_cmd]}

## {heading(Эвакуация ВМ с вычислительного узла)[id=vm_evacuation]}

На управляющем узле с установленным ПО для управления Nova (управляющий узел № 3) выполните команду для эвакуации всех ВМ этого узла на другие вычислительные узлы в составе кластера:

```console
$ nova host-evacuate-live [--target_host <ИМЯ_КОНЕЧНОГО_УЗЛА>] <ИМЯ_ИСХОДНОГО_УЗЛА>
```

Здесь:

* `<ИМЯ_КОНЕЧНОГО_УЗЛА>` — имя узла, на который вы хотите перенести ВМ. Может быть не указано, в этом случае хост будет выбран автоматически из списка управляющих хостов кластера.
* `<ИМЯ_ИСХОДНОГО_УЗЛА>` — имя узла, с которого вы хотите эвакуировать все ВМ.

{/ifndef}