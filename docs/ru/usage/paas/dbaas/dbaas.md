# {heading(DBaaS)[id=dbaas]}

{var(system)} Databases — базы данных как сервис (Database as a service). Сервис позволяет развернуть в облаке решения на основе MySQL, PostgreSQL, MongoDB, Redis, ClickHouse.

Доступные конфигурации БД приведены в {linkto(#tab_types_configurations)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_types_configurations]} — Типы конфигураций)[align=right;position=above;id=tab_types_configurations;number={const(numb_tab_types_configurations)}]}
[cols="1,1,1", options="header"]
|===
|Конфигурация
|Описание
|Использование

|`Single`
|Конфигурация содержит единичный инстанс СУБД без реплики.
|Используется для разработки и тестирования.

|`Master-Replica`
|Конфигурация содержит два инстанса СУБД с репликацией в режиме `Master-Replica` (active-passive).
|Используется для ускорения запросов на чтение и запись.

|`Кластер`
|Кластер БД с синхронной репликацией данных в режиме `Master-Master`.
|Используется при наличии повышенных требований к надёжности и отказоустойчивости системы.
|===
{/caption}

<err>

Доступность типа конфигурации зависит от типа выбранной СУБД.

</err>

Работа с инстансами БД осуществляется при помощи Портала самообслуживания.

<!---

* Портала самообслуживания.
* OpenStack CLI.

-->

Доступны следующие операции:

* Создание инстанса БД.
* Подключение к БД.
* Управление настройками БД.
* Резервное копирование БД.

Инструкции по выполнению вышеперечисленных действий приведены в **Руководстве пользователя {var(system)}**.

<!---

== Добавление версии типа БД

При создании инстанса БД в Портале самообслуживания (подробнее — в *Руководстве пользователя {var(system)}*) могут быть доступны несколько версий одной БД. Возможно загрузки новой версии в Портал самообслуживания — на узел загружается образ требуемой версии БД.

NOTE: Возможна загрузка версий только существующих в {var(sys3)} типов БД. Добавление новых типов БД не предусмотрено.

[TIP]
====
Добавление версии типа БД выполняется на основе файла образа. Файл образа должен быть в формате `raw` или `img`.

Чтобы конвертировать файл образа из формата `qcow2` в `raw`, на произвольном сервере (со свободным местом ~30 ГБ) выполните команды:

[source, console]
----
$ yum install qemu-img
qemu-img convert -f qcow2 -O raw <НАЗВАНИЕ_ФАЙЛА_СТАРОГО_ОБРАЗА>.qcow2 <НАЗВАНИЕ_ФАЙЛА_НОВОГО_ОБРАЗА>.img
----
====

Чтобы добавить версию типа БД:

. Подготовьте файл образа БД, которую хотите загрузить.
. Выполните подготовительные операции (подробнее — в разделе <<use_openstackcli_admin>>).
. Скопируйте файл образа на управляющий узел.
. Создайте образ из скопированного файла:
+
[source, console]
----
# openstack image create --public --disk-format raw --container-format bare --property sid=trove --file <ИМЯ_ФАЙЛА_С_РАСШИРЕНИЕМ> <ИМЯ_СОЗДАВАЕМОГО_ОБРАЗА>
----
+
. Выполните команду:

+
[source, console]
----
# openstack image list
----

+
Убедитесь, что созданный образ появился в списке.
. Создайте хранилище БД (datastore) на управляющем узле:
.. Добавьте ID созданного образа в переменную `IMAGE_ID`:
+
[source, console]
----
$ IMAGE_ID=$(openstack image show -c id -f value <ИМЯ_СОЗДАННОГО_ОБРАЗА>)
----
+
.. Создайте datastore из пода `trove-api` в Kubernetes, последовательно выполнив команды:
+
[source, console]
----
$ TROVE_API_POD=$(kubectl -n paas-vkcloud get po -l app.kubernetes.io/component=api,app.kubernetes.io/instance=trove -ocustom-columns=NAME:.metadata.name --no-headers | head -1)
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf datastore_update <ТИП_БД: postgresql / mysql / mongodb / clickhouse / redis> ""
----
+
.. Обновите значение переменной для образа:
+
[source, console]
----
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf datastore_version_update <ТИП_БД: postgresql / mysql / mongodb / clickhouse/redis> <НОМЕР_ВЕРСИИ> <ТИП_БД: postgresql / mysql / mongodb / clickhouse / redis> ${IMAGE_ID} "" 1
----
+
.. Загрузите validation rules:
+
[source, console]
----
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf db_load_datastore_config_parameters <ТИП_БД: postgresql / mysql / mongodb / clickhouse / redis> <НОМЕР_ВЕРСИИ> /usr/local/lib/python3.7/site-packages/trove/templates/<ТИП_БД: postgresql / mysql / mongodb / clickhouse / redis>/<НОМЕР_ВЕРСИИ>/validation-rules.json
----
+
. Проверьте создание новой версии, последовательно выполнив команды:
+
[source, console]
----
$ trove datastore-list
$ trove datastore-version-list <ТИП_БД: postgresql / mysql / mongodb / clickhouse / redis>
----

Если шаги выполнены успешно, в Портале самообслуживания появится загруженная версия БД, доступная для установки. Для проверки работы образа создайте инстанс БД с новой версией (шаги по созданию инстанса БД приведены в *Руководстве пользователя {var(system)}*).

TIP: Далее приведён пример команд для добавления версии 13 БД PostgreSQL. Название загруженного файла образа — `PostgreSQL-13-1.12.23-2022-04-20_10-58-05.img`.

.Команда создания образа PostgreSQL
[source, console]
----
$ openstack image create --public --disk-format raw --container-format bare --property sid=trove --file PostgreSQL-13-1.12.23-2022-04-20_10-58-05.img PostgreSQL-13
----

.Результат выполнения команды `openstack image list`:
[source, console]
----
+--------------------------------------+----------------------------------------------+--------+
| ID                                   | Name                                         | Status |
+--------------------------------------+----------------------------------------------+--------+
| 64188579-a043-4419-8fe5-898f3c999954 | PostgreSQL-12--1.12.23--2022-04-20_10-57-50  | active |
| af5da1bc-d9d3-443c-ab60-5f252c6b5090 | PostgreSQL-13                                | active |
+--------------------------------------+----------------------------------------------+--------+
----

.Команды создания datastore на управляющем узле
[source, console]
----
$ IMAGE_ID=$(openstack image show -c id -f value PostgreSQL-13)
$ TROVE_API_POD=$(kubectl -n paas-vkcloud get po -l app.kubernetes.io/component=api,app.kubernetes.io/instance=trove -ocustom-columns=NAME:.metadata.name --no-headers | head -1)
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf datastore_update postgresql ""
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf datastore_version_update postgresql 13 postgresql ${IMAGE_ID} "" 1
$ kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf db_load_datastore_config_parameters postgresql 13 /usr/local/lib/python3.7/site-packages/trove/templates/postgresql/13/validation-rules.json
----

.Результат выполнения команды `trove datastore-list`
[source, console]
----
+--------------------------------------+------------+
| ID                                   | Name       |
+--------------------------------------+------------+
| d8ce62f3-6975-4ee5-af7d-7844dfc28b71 | postgresql |
+--------------------------------------+------------+
----

.Результат выполнения команды `trove datastore-version-list postgresql`
[source, console]
----
+--------------------------------------+------+
| ID                                   | Name |
+--------------------------------------+------+
| 192a087c-83c7-4c39-9b38-4109b04b4f13 | 12   |
| ac920d43-5ad3-4b9b-a108-d5ce094f46a1 | 13   |
+--------------------------------------+------+
----

== Удаление (деактивация) версии типа БД

Чтобы удалить (деактивировать) существующую версию типа БД:

. Выполните подготовительные операции (подробнее — в разделе <<use_openstackcli_admin>>).
. Добавьте ID созданного образа в переменную `IMAGE_ID`:
+
[source, console]
----
# IMAGE_ID=$(openstack image show -c id -f value <ИМЯ_СОЗДАННОГО_ОБРАЗА>)
----
+
. Отключите версию типа БД:
+
[source, console]
----
# kubectl -n paas-vkcloud exec -it ${TROVE_API_POD} -- trove-manage --config-file=/etc/trove/trove.conf datastore_version_update postgresql 13 postgresql ${IMAGE_ID} "" 0
----

Если шаги выполнены успешно, в Портале самообслуживания исчезнет выбор удаленной версии типа БД.

// на момент выпуска документации в trove не поддерживалось удаление версий (инфо от Андрея Иванова) #todo выяснить шаги по удалению из списка trove datastore-version-list postgresql, если обновлят Openstackclient

-->