# {heading(Программное обеспечение)[id=arch-po]}

{var(sys1)} — программный комплекс на базе программного обеспечения с открытым исходным кодом (OpenStack и др.) и программного обеспечения собственной разработки.

Для функционирования {var(sys2)} необходимо вспомогательное ПО, не входящее напрямую в состав {var(sys2)}.

Программные компоненты {var(sys2)} размещаются на серверах, разделённых на логические группы — серверные роли, в зависимости от выполняемых функций. Часть компонентов {var(sys2)} размещена на виртуальных серверах.

## {heading(Состав ПО {var(sys2)})[id=arch_soft_composition]}

### {heading(Полный список ПО, входящего в состав {var(sys2)})[id=arch_soft_full_list]}

{caption(Компоненты, входящие в состав {var(sys2)}, и их версии)[align=left;position=above]}
```yaml
  keycloak.vk: 0.0.0-202308101419.git3983d056
  breeze: 4.0.0.rc.20230426-202310121306.git8e6068a0
  dusk: 4.0.0.rc.20230426-202309281114.git7421dd8
  services-manager: 4.0.0-rc-20230426-202309131825.git30e6f921
  services-manager proxy: 4.0.0-rc-20230426-202306300901.git4f5d0025
  auth-service: 4.0.0-rc-20230426-202309290732.gitb677bebb
  policy-service: 4.0.0-rc-20230426-202306091308.git6c2ec36c
  blocker services: 0.0.0-202306221435.gitf3067bbf
  session manager: 0.0.0-202309051550.gitcdc2f678
  sync service: daemon:0.0.0-202309290954.gitacc0e255
  iam service: 4.0.0-rc-20230426-202307171427.git319535ac
  superadmin users: 0.0.0-202309061200.gitd68a1d2d
  users service: 0.0.0-202309261334.git1cbb05b9
  project proxy service: 0.0.0-202309261340.gite9cd7d69
  api gateway: 0.0.0-202309151132.gitc82aa9c6
  BAS: 0.0.0-202310041018.git32f2c5e4
  keystone.vk: 11.0.4-202309081243.git733168bf
  cinder.vk: 10.0.6-202309181503.git1e52ba3d3
  nova.vk: 15.1.3-202309150911.git26ef98b0fd
  neutron.vk: 10.0.7-202309261216.git4f662cc09
  glance.vk: 1:14.0.1-202310021630.gitcda1bb09
  karboii: 0.0.0-202309250951.gite5090b8a
  mcs-app: 37.12.2-202309261125.git50f958eb
  mcs-app-config: 2023.9.1
  mcs-admin-ui: 2023.9.1-202309291052.git9eb4ed1f
  quota manager: 0.0.0-202309131238.git849befc3
```
{/caption}

### {heading(Прикладное ПО собственной разработки)[id=own_soft]}

Основную часть {var(sys2)} составляют решения на базе ПО с открытым исходным кодом, доработанные и поставляемые вместе с компонентами собственной разработки.

Список компонентов собственной разработки приведён в {linkto(#tab_own_dev_software)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_own_dev_software]} — ПО собственной разработки)[align=right;position=above;id=tab_own_dev_software;number={const(numb_tab_own_dev_software)}]}
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

{ifndef(cer)}

|Katana
|Инструмент балансировки нагрузки для ВМ

|XaaS
|Предоставление aaS-ресурсов (приложения, API, данные)
{/ifndef}
|===
{/caption}

### {heading(ПО на базе открытого исходного кода)[id=opensource_soft]}

#### {heading(OpenStack)[id=opensource_soft_cli]}

В качестве основы для {var(sys2)} используется программный комплекс с открытым исходным кодом OpenStack версии Ocata. Однако большинство компонентов OpenStack Ocata были значительно доработаны в рамках разработки {var(sys2)}, и их версии уже не соответствуют публично доступным.

Доработанная версия OpenStack включает компоненты, приведённые в {linkto(#tab_openstack_components)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_openstack_components]} — Компоненты OpenStack)[align=right;position=above;id=tab_openstack_components;number={const(numb_tab_openstack_components)}]}
[cols="1,3", options="header"]
|===
|Компонент
|Назначение

|Nova
|Виртуализация

|Cinder
|Блочное хранение данных

|Glance
|Работа с образами

|Neutron
|Программно-определяемые сети

+
<!--- // Ceilometer -->
+

+
<!--- // Телеметрия -->
+

|Keystone
|Авторизация
|===
{/caption}

#### {heading(Остальное)[id=opensource_soft_rest]}

Кроме того, в состав {var(sys2)} входит и другое ПО с открытым исходным кодом. Состав ПО указан в {linkto(#tab_other_software)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_other_software]} — Дополнительное ПО с открытым исходным кодом, входящее в {var(sys4)})[align=right;position=above;id=tab_other_software;number={const(numb_tab_other_software)}]}
[cols="1,3", options="header"]
|===
|Компонент
|Назначение
|Примечание

|Ceph
|Используется в Cinder как система хранения данных. Не является частью Cinder. Cinder Volume осуществляет подключение к Ceph на уровне сетевого взаимодействия для реализации функций компонента Cinder по расположению дисков
|Из состава сертифицированной РЕД ОС

|MariaDB
|СУБД для организации служебных баз данных компонентов {var(sys2)}:

* Nova.
* Cinder.
* Neutron.
* Glance.
* Karboii.
* BAS.
* Quota Manager

|Из состава сертифицированной РЕД ОС

|Kubernetes
|Используется для запуска компонентов {var(sys2)}
|Из состава сертифицированной РЕД ОС

|HAProxy
|Используется для распределения входящих запросов из веб-интерфейса. Предназначен для повышения отказоустойчивости {var(sys2)}
|Из состава сертифицированной РЕД ОС

|Consul
|Используется для администрирования конфигураций на уровне ОС. Предназначен для повышения отказоустойчивости {var(sys2)}
|Из состава сертифицированной РЕД ОС

|Memcached
|Используется для обеспечения высокой доступности к конфигурациям резервного копирования. Не хранит данных резервных копий
|Из состава сертифицированной РЕД ОС

|PostgreSQL
|Используется для организации служебных баз данных модулей подсистемы управления доступом. Компоненты Services Manager, Admin Services Manager и Sync Service осуществляют подключение к PostgreSQL на уровне ОС для хранения системных данных. Не влияет на выполнение функций безопасности {var(sys2)}
|Из состава сертифицированной РЕД ОС

|ProxySQL
|Используется для маршрутизации трафика между компонентами {var(sys2)} и СУБД в кластерном варианте развёртывания. Предназначен для повышения отказоустойчивости {var(sys2)}
|Лицензия — GNU General Public License 3.0

|ExaBGP
|Используется для контроля состояния сервисов программно-определяемой сети
|Лицензия — BSD 3

|Stolon
|Используется для балансировки нагрузки СУБД PostgreSQL в кластерном варианте развёртывания. Предназначен для повышения отказоустойчивости {var(sys2)}
|Лицензия — Apache License 2.0

|PgBouncer
|Используется для балансировки подключений компонентов {var(sys2)} к СУБД PostgreSQL в кластерном варианте развёртывания. Предназначен для повышения отказоустойчивости {var(sys2)}
|Лицензия — GNU General Public License 3.0

|Tarantool
|Используется для реализации сервисов подсистемы управления доступом Breeze и Dusk
|Сертифицированная версия по требованиям к СУБД

|FreeIPA
|Используется для управления пользователями и группами
|Служба каталогов ОС из состава сертифицированной РЕД ОС
|===
{/caption}

## {heading(Вспомогательное ПО)[id=supplementary_soft]}

Вспомогательное ПО не входит в состав {var(sys2)}, но необходимо для её функционирования.

### {heading(Системное ПО)[id=supplementary_soft_systemic]}

В качестве системного ПО на физических серверах {var(sys2)} используется РЕД ОС 7.3c.

### {heading(Прикладное ПО)[id=supplementary_soft_applied]}

Вспомогательное ПО {var(sys2)} приведено далее в {linkto(#tab_application_software)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_application_software]} — Вспомогательное ПО)[align=right;position=above;id=tab_application_software;number={const(numb_tab_application_software)}]}
[cols="1,2,3", options="header"]
|===
|Компонент
|Версия
|Назначение

|Ansible
|2.9.13-202203231326.cmpt.el7
|Система управления конфигурациями. Отключён сбор артефактов

|Nexus
|3.40.1
|Репозиторий артефактов
|===
{/caption}

<warn>

Окончательный перечень вспомогательного ПО может зависеть от особенностей инфраструктуры Заказчика.

</warn>

<!--- // взято из https://gitlab.corp.mail.ru/infra/it/eine-files/-/blob/master/profiles/mcs_standard_centos7_uek/packages -->

<!--- // Артем Карамышев сказал, что пакеты с "-" удаляются позже (в списке ниже их нет) -->

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