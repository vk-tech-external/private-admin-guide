# {heading(Создание экземпляра ВМ)[id=iaas_vm_instance]}

Создание ВМ осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

{ifndef(cer)}
## {heading(OpenStack CLI)[id=iaas_vm_instance_cli]}

Чтобы создать ВМ при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_server_create_cmd]}

   Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_server_create)[text=%text]}.
{/ifndef}
