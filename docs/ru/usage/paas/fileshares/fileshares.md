# {heading(Файловое хранилище)[id=fileshares]}

Сервис **Файловое хранилище** представляет собой набор служб для управления файловыми хранилищами в {var(sys3)}. С этой службы можно создать удаленную файловую систему, смонтировать файловую систему на виртуальных машинах, а затем читать и записывать данные из инстансов в файловую систему и из нее.

Файловые хранилища можно подключить к инстансам проекта по протоколам `CIFS` или `NFS`, с разделением доступа по IP-адресу клиента (подробнее — в [официальной документации](https://mcs.mail.ru/docs/ru/base/iaas/fs/connect-fs)).

<err>

Доступ к файловым хранилищам осуществляется только из виртуальных машин внутри {var(sys2)}.

</err>

## {heading(Операции с файловым хранилищем)[id=file_storage_operations]}

<!--- // при выполнении cli-команд возникает ошибка 'NoneType' object has no attribute '__getitem__', если не добавить адрес стенда — админы должны добавить вручную (инфо от Константина Нифанина) -->
<!--- // Пытался добавить адрес стенда сам. Ошибка та же самая возникает. Проверить пока не могу -->

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

### {heading(Просмотр списка файловых хранилищ)[id=file_storage_list]}

Просмотр списка файловых хранилищ осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).

<!--- //* Портала администратора. -->

* OpenStack CLI.

<!---
==== Портал администратора

Чтобы просмотреть список файловых хранилищ через Портал администратора, перейдите в раздел *PAAS* -> *Shares*. Список файловых хранилищ отобразится в таблице.

Чтобы посмотреть список файловых хранилищ, доступных проекту или созданных в нём, введите ID проекта в поле *project_id* или название проекта в поле *project_name*.

[NOTE]
====
Чтобы отобразить значения поля *project_id*, если они скрыты:

. Нажмите на иконку *Столбцы таблицы* слева от строки поиска.
. Установите флажок для *project_id*.
. Нажмите кнопку *Применить*. В столбце *project_id* отобразятся идентификаторы проектов.
====
-->

#### {heading(OpenStack CLI)[id=file_storage_list_cli]}

Просмотр списка файловых хранилищ можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_list)[text=%text]}.

### {heading(Просмотр списка сетей файловых хранилищ)[id=file_storage_list_network]}

Просмотр списка сетей файловых хранилищ осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).

<!--- //* Портала администратора. -->

* OpenStack CLI.

<!---
==== Портал администратора

Чтобы просмотреть список сетей файловых хранилищ через Портал администратора:

. Перейдите в раздел *PAAS* -> *Shares*.
. Нажмите на иконку *Столбцы таблицы* слева от строки поиска.
. Установите флажок для значения *share_network_id*.
. Нажмите кнопку *Применить*. В столбце *share_network_id* отобразятся идентификаторы сетей файловых хранилищ.
-->

#### {heading(OpenStack CLI)[id=file_storage_list_network_cli]}

Просмотр списка сетей файловых хранилищ можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_share_network_list)[text=%text]}.

### {heading(Просмотр информации о файловом хранилище)[id=file_storage_view_info]}

Просмотр информации о файловом хранилище осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_view_info_cli]}

Просмотр информации о файловом хранилище можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_show)[text=%text]}.

### {heading(Создание файлового хранилища)[id=file_storage_create]}

Создание файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_create_cli]}

Создание файлового хранилища можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_create)[text=%text]}.

### {heading(Увеличение размера файлового хранилища)[id=file_storage_upsizing]}

Увеличение размера файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_upsizing_cli]}

Увеличение размера файлового хранилища можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_extend)[text=%text]}.

### {heading(Уменьшение размера файлового хранилища)[id=file_storage_downsizing]}

<!--- // нужно ли выделять отдельный подзаголовок -->

Уменьшение размера файлового хранилища осуществляется при помощи:

* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_downsizing_cli]}

Уменьшение размера файлового хранилища можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_shrink)[text=%text]}.

### {heading(Удаление файлового хранилища)[id=file_storage_delete]}

Удаление файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_delete_cli]}

Удаление файлового хранилища можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_delete)[text=%text]}.

## {heading(Правила доступа для файлового хранилища)[id=file_storage_access_rules]}

### {heading(Просмотр списка правил доступа)[id=file_storage_access_rules_list]}

Просмотр списка правил доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_access_rules_list_cli]}

Просмотр списка правил доступа можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_list)[text=%text]}.

### {heading(Добавление правила доступа)[id=file_storage_access_rules_create]}

Добавление правила доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_access_rules_create_cli]}

Добавление правила доступа можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_allow)[text=%text]}.

### {heading(Удаление правила доступа)[id=file_storage_access_rules_delete]}

Удаление правила доступа файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_access_rules_delete_cli]}

Удаление правила доступа можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_access_deny)[text=%text]}.

## {heading(Снимки (снэпшоты) файлового хранилища)[id=file_storage_snapshot]}

### {heading(Просмотр списка снимков)[id=file_storage_snapshot_list]}

Просмотр списка снимков файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_snapshot_list_cli]}

Просмотр списка снимков можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_list)[text=%text]}.

### {heading(Создание снимка файлового хранилища)[id=file_storage_snapshot_create]}

Создание снимка файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_snapshot_create_cli]}

Создание снимка можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_create)[text=%text]}.

### {heading(Удаление снимка файлового хранилища)[id=file_storage_snapshot_delete]}

Удаление снимка файлового хранилища осуществляется при помощи:

* Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

#### {heading(OpenStack CLI)[id=file_storage_snapshot_delete_cli]}

Удаление снимка можно выполнить при помощи OpenStack CLI. Для этого выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команду, описанную в разделе Справочника {linkto(../../../cli_commands#cli_manila_snapshot_delete)[text=%text]}.