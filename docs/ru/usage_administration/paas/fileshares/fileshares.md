# {heading(Файловое хранилище)[id=fileshares]}

Сервис «Файловое хранилище» представляет собой набор служб для управления файловыми хранилищами в {var(sys3)}. С этой службы можно создать удаленную файловую систему, смонтировать файловую систему на виртуальных машинах, а затем читать и записывать данные из инстансов в файловую систему и из нее.

Файловые хранилища можно подключить к инстансам проекта по протоколам `CIFS` или `NFS`, с разделением доступа по IP-адресу клиента (подробнее см. в [официальной документации](https://cloud.vk.com/docs/computing/iaas/service-management/fs-manage)).

<err>

Доступ к файловым хранилищам осуществляется только из виртуальных машин внутри {var(sys2)}.

</err>

## {heading(Операции с файловым хранилищем)[id=fileshares_operations]}

Для корректной работы с файловым хранилищем через OpenStack CLI в файле `/usr/lib/python2.7/site-packages/manilaclient/common/httpclient.py` на управляющем узле укажите значение атрибута `base_url`, равное используемому стенду.

{caption(Значение по умолчанию)[align=left;position=above]}
```yml
base_url = '/'.join(url.split('/')[:3]) + '/'
```
{/caption}

{caption(Пример заменяемого значения)[align=left;position=above]}
```yml
base_url = 'https://overcloud111.devmail.ru/infra/share/v2/'
```
{/caption}

### {heading(Просмотр списка файловых хранилищ)[id=fileshares_list]}

Просмотр списка файловых хранилищ осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* Портала администратора.
* OpenStack CLI.

#### {heading(Портал администратора)[id=fileshares_list_admin]}

Чтобы просмотреть список файловых хранилищ через Портал администратора, перейдите в раздел «PAAS» на страницу «Shares». Список файловых хранилищ отобразится в таблице.

Чтобы посмотреть список файловых хранилищ, доступных проекту или созданных в нём, введите ID проекта в поле «project_id» или название проекта в поле «project_name».

<warn>

Чтобы отобразить значения поля «project_id», если они скрыты:
1. Нажмите на иконку «Столбцы таблицы» слева от строки поиска.
1. В появившейся форме установите флажок для «project_id».
1. Нажмите на кнопку «Применить». В столбце «project_id» отобразятся идентификаторы проектов.

</warn>

#### {heading(OpenStack CLI)[id=fileshares_list_openstack]}

Просмотр списка файловых хранилищ можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_list)[text=%text]}.

### {heading(Просмотр списка сетей файловых хранилищ)[id=fileshares_list_networks]}

Просмотр списка сетей файловых хранилищ осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* Портала администратора.
* OpenStack CLI.

#### {heading(Портал администратора)[id=fileshares_list_networks_admin]}

Чтобы просмотреть список сетей файловых хранилищ через Портал администратора:

1. Перейдите в раздел «PAAS» на страницу «Shares».
1. Нажмите на иконку «Столбцы таблицы» слева от строки поиска.
1. В появившейся форме установите флажок для значения «share_network_id».
1. Нажмите на кнопку «Применить». В столбце «share_network_id» отобразятся идентификаторы сетей файловых хранилищ.

#### {heading(OpenStack CLI)[id=fileshares_list_networks_openstack]}

Просмотр списка сетей файловых хранилищ можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_share_network_list)[text=%text]}.

### {heading(Просмотр информации о файловом хранилище)[id=fileshares_information]}

Просмотр информации о файловом хранилище осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=fileshares_information_openstack]}

Просмотр информации о файловом хранилище можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_show)[text=%text]}.

### {heading(Создание файлового хранилища)[id=fileshares_create]}

Создание файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=fileshares_openstack]}

Создание файлового хранилища можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_create)[text=%text]}.

### {heading(Увеличение размера файлового хранилища)[id=fileshares_increase]}

Увеличение размера файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=fileshares_increase_openstack]}

Увеличение размера файлового хранилища можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_extend)[text=%text]}.

### {heading(Уменьшение размера файлового хранилища)[id=fileshares_decrease]}

Уменьшение размера файлового хранилища осуществляется при помощи:

* OpenStack CLI.

#### {heading(OpenStack CLI)[id=fileshares_decrease]}

Уменьшение размера файлового хранилища можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_shrink)[text=%text]}.

### {heading(Удаление файлового хранилища)[id=fileshares_delete]}

Удаление файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=fileshares_delete_openstack]}

Удаление файлового хранилища можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_delete)[text=%text]}.

## {heading(Правила доступа для файлового хранилища)[id=access_rule]}

### {heading(Просмотр списка правил доступа)[id=access_rule_list]}

Просмотр списка правил доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=access_rule_list_openstack]}

Просмотр списка правил доступа можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_list)[text=%text]}.

### {heading(Добавление правила доступа)[id=access_rule_create]}

Добавление правила доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=access_rule_create_openstack]}

Добавление правила доступа можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_allow)[text=%text]}.

### {heading(Удаление правила доступа)[id=access_rule_delete]}

Удаление правила доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=access_rule_delete_openstack]}

Удаление правила доступа можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_deny)[text=%text]}.

## {heading(Снимки (снэпшоты) файлового хранилища)[id=snapshot]}

### {heading(Просмотр списка снимков)[id=snapshot_list]}

Просмотр списка снимков файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=snapshot_list_openstack]}

Просмотр списка снимков можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_list)[text=%text]}.

### {heading(Создание снимка файлового хранилища)[id=snapshot_create]}

Создание снимка файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=snapshot_create_openstack]}

Создание снимка можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_create)[text=%text]}.

### {heading(Удаление снимка файлового хранилища)[id=snapshot_delete]}

Удаление снимка файлового хранилища осуществляется при помощи:

* Портала самообслуживания (см. Руководство пользователя {var(sys2)}).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=snapshot_delete_openstack]}

Удаление снимка можно выполнить при помощи Openstack CLI. Для этого выполните подготовительные операции (см. раздел {linkto(../../../usage_administration/interfaces_access#use_openstackcli_admin)[text=%text]}) и используйте команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_delete)[text=%text]}.