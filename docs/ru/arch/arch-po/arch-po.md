# {heading(Программное обеспечение)[id=arch_po]}

{var(sys1)} представляет собой программный комплекс на базе программного обеспечения с открытым исходным кодом (OpenStack и др.; см. {linkto(#opensource_soft)[text=%text]}) и программного обеспечения собственной разработки (см. {linkto(#own_soft)[text=%text]}).

Для функционирования {var(sys2)} необходимо также вспомогательное ПО, не входящее напрямую в состав {var(sys2)} (см. {linkto(#supplementary_soft)[text=%text]}).

Программные компоненты {var(sys2)} размещаются на серверах, разделённых на логические группы — серверные роли, в зависимости от выполняемых функций. Часть компонентов {var(sys2)} размещена на виртуальных серверах.

## {heading(Состав ПО {var(sys2)})[id=software_composition]}

Полный список компонентов доступен в дистрибутиве {var(sys2)} в файле `/path_to_inventory/vkcloud/group_vars/vkcloud/versions.yaml`.

### {heading(Прикладное ПО собственной разработки)[id=own_soft]}

Основную часть {var(sys2)} составляют решения на базе ПО с открытым исходным кодом, доработанные и поставляемые вместе с компонентами собственной разработки.

Список компонентов собственной разработки представлен далее в {linkto(#tab_own_soft)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_own_soft]} — ПО собственной разработки)[position=above;align=right;id=tab_own_soft;number={const(numb_tab_own_soft)}]}

[cols="1,3", options="header"]
|===
|Компонент
|Назначение

|Портал самообслуживания (frontapp)
|Портал пользователей {var(sys2)}, включая администраторов проектов

|Портал администратора (superadmin)
|Веб-интерфейс администрирования {var(sys2)}

|Karboii
|Компонент для резервного копирования

|Scrooge
|Внутренний биллинг и механизм назначения квот

|General billing
|Хранилище биллинг-транзакций и счетов

|IAM
|ПО для управления биллингом и реализации ролевой модели управления доступом в проектах, а также проверок доступа пользователей и некоторых других функций. Включает в себя Портал администратора

|cloud-audit-logs
|Сервис получения, хранения и отображения аудита событий сервисов

|Katana
|Инструмент балансировки нагрузки для ВМ
|===
{/caption}

### {heading(ПО на базе открытого исходного кода)[id=opensource_soft]}

#### {heading(OpenStack)[id=opensource_soft_openstack]}

В качестве основы для {var(sys2)} используется программный комплекс с открытым исходным кодом OpenStack версии Ocata. Однако, большинство компонентов OpenStack Ocata были значительно доработаны в рамках разработки {var(sys2)} и их версии уже не соответствуют публично доступным.

Наша версия OpenStack включает в себя компоненты, приведённые далее в {linkto(#tab_openstack_components)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_openstack_components]} — Компоненты OpenStack)[position=above;align=right;id=tab_openstack_components;number={const(numb_tab_openstack_components)}]}

[cols="1,3", options="header"]
|===
|Компонент
|Назначение

|Nova
|Виртуализация

|Heat
|Оркестрация

|Cinder
|Блочное хранение данных

|Cinder backup
|Атомарное резервное копирование дисков

|Glance
|Работа с образами

|Magnum
|Средства оркестрации контейнеров (Kubernetes aaS)

|Trove
|База данных как сервис (DBaaS)

|Neutron
|Программно-определяемые сети

|Octavia
|Балансировка нагрузки

|Ceilometer
|Телеметрия

|Keystone
|Аутентификация

|Barbican
|Управление ключами

|Manila
|Управление общими файловыми системами

|Panko
|Сервис хранения событий
|===
{/caption}

#### {heading(Остальное)[id=other_software]}

Кроме того, в состав {var(sys2)} входит и другое ПО с открытым исходным кодом, упомянутое далее в {linkto(#tab_other_software)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_other_software]} — Дополнительное ПО с открытым исходным кодом, входящее в {var(sys4)})[position=above;align=right;id=tab_other_software;number={const(numb_tab_other_software)}]}

[cols="1,3", options="header"]
|===
|Компонент
|Назначение

|Ceph
|Программно-определяемая распределённая файловая система

|Keycloak
|Управление учётными записями пользователей, группами пользователей, интеграция с MS AD, а также SSO

|Zabbix
|Мониторинг сети, серверов и сетевого оборудования (Мониторинг {var(sys2)})

|OpenSearch
|Платформа для анализа и визуализации, предназначенная для поиска, просмотра и взаимодействия с данными

|Docker
|Программная платформа для разработки, доставки и запуска контейнерных приложений

|Аппаратные СХД: драйвер для Cinder для поддержки СХД 3PAR определенной версии
|Поддержка аппаратных СХД

|MariaDB
|СУБД для организации служебных баз данных компонентов {var(sys2)}

|Kubernetes
|Открытое программное обеспечение для оркестровки контейнеризированных приложений

|ClickHouse
|Колоночная БД. Используется в cloud-audit-logs

|HAProxy
|Балансировщик нагрузки

|ZooKeeper
|Сервис хранения конфигураций. Используется в cloud-audit-logs

|Kafka
|Распределенная система обмена сообщениями

|Consul
|Сервис хранения конфигураций

|RabbitMQ
|Система очереди сообщений

|Memcached
|Сервис кеширования данных

|Galera
|Инструмент для кластеризации БД

|Percona Xtrabackup
|ПО для создания резервных копий СУБД
|===
{/caption}

## {heading(Вспомогательное ПО)[id=supplementary_soft]}

Вспомогательное ПО не входит в состав {var(sys2)}, но необходимо для её функционирования.

### {heading(Системное ПО)[id=system_software]}

В качестве системного ПО на физических серверах {var(sys2)} используется CentOS 7.6 с ядром `uek-5.4`.

В составе образов по умолчанию для гостевых операционных систем (используемых при развёртывании ВМ) имеется следующее системное ПО:

* CentOS 7.X.
* Ubuntu Linux 22.X.

### {heading(Прикладное ПО)[id=application_software]}

Вспомогательное ПО {var(sys2)} перечислено далее в {linkto(#tab_application_software)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_application_software]} — Вспомогательное ПО)[position=above;align=right;id=tab_application_software;number={const(numb_tab_application_software)}]}

[cols="1,3", options="header"]
|===
|Компонент
|Назначение

|Ansible
|Система управления конфигурациями; отключен сбор артефактов

|Nexus
|Репозиторий артефактов
|===
{/caption}

Чтобы проверить установленную версию:

* Ansible — выполните команду `ansible --version`.
* Nexus — на деплой-ноде выполните команду `docker ps`.

<warn>

Окончательный перечень вспомогательного ПО может зависеть от особенностей инфраструктуры Заказчика.

</warn>

На серверах устанавливаются следующие rpm-пакеты:

{caption(Список устанавливаемых rpm-пакетов)[align=left;position=above]}

```txt
kernel-uek
bind-utils
ca-certificates
file
iptables
iptables-services
lsof
man-db
man-pages
nano
net-tools
nmap-ncat
ntp
ntpdate
openssh-clients
openssh-server
openssl
pam
psmisc
strace
tcpdump
telnet
traceroute
vim-enhanced
dstat
gdb
iptraf
wget
nscd
ntp
smartmontools
strace
sysstat
vim-enhanced
yum-priorities
mutt
telnet
htop
chrony
iftop
python2-pip
iptstate
gdisk
ipmitool
salt-minion
bash-completion
bash-completion-extras
```
{/caption}