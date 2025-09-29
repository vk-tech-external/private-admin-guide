# {heading(Ключевая пара)[id=iaas_keypair]}

Чтобы создать и/или импортировать ключевую пару, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

Чтобы создать ключевую пару при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_keypair_create_cmd]}