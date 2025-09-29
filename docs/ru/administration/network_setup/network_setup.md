# {heading(Настройка внешней сети)[id=network_setup]}

<!--- // исходные данные https://confluence.vk.team/pages/viewpage.action?pageId=839321127 -->

{var(sys1)} поддерживает варианты сетей:

* `VLAN`.
* `VxLAN` внутри тенанта.
* `VxLAN` с анонсом через `BGP`.

## {heading(Создание внешней сети с доступом в корпоративную сеть)[id=creating_external_network]}

В этом разделе приведена краткая инструкция по созданию внешней VLAN-сети с использованием команд OpenStack CLI.

Для реализации данной задачи на уровне Neutron создается связка `Network-Subnet`, которая будет выходить в корпоративную сеть в виде инкапсулированного VLAN-трафика.

<err>

Настройки доступа по умолчанию запрещают создание внешней сети под любым пользователем, кроме Администратора {var(sys2)}.

</err>

<err>

Адреса сетей, указанные в конфигурациях, могут отличаться в зависимости от реализации сети Заказчика. Адреса следующих узлов должны быть доступны через маршрутизатор:

* DNS-сервер, установленный на маршрутизаторе стенда.
* <ПОРТАЛ_САМООБСЛУЖИВАНИЯ>:443 — публичный VIP инсталляции. Через него выполняется взаимодействие между magnum-агентом внутри инстансов кластера и сервисами на стенде.
* `registry-`<ПОРТАЛ_САМООБСЛУЖИВАНИЯ>:5010 — docker-registry на управляющих узлах. В нем хранятся артефакты для разворачивания кластера.

{ifndef(cer)}
* `registry-`<ПОРТАЛ_САМООБСЛУЖИВАНИЯ>:443 — helm-registry и raw-registry с артефактами, необходимыми для пользовательского кластера Kubernetes, а так же trove-capabilities с расширениями для клиентских экземпляров PostgreSQL.
{/ifndef}

</err>

<err>

При задании VLAN ID (например, 123) для пользовательской сети убедитесь, что у ОС нет прямых интерфейсов, которые работают с тем же VLAN ID (например, bond0.123). Иначе работоспособность сети будет нарушена из-за конфликтов на уровне L2.

</err>

<!--- // описание взято из https://jira.vk.team/browse/MCSPC-3770 -->

<!--- // также использовались материалы статей https://confluence.vk.team/pages/viewpage.action?pageId=839321127 и https://confluence.vk.team/pages/viewpage.action?pageId=813440254 -->

Чтобы создать внешнюю сеть:

1. Измените настройки в конфигурационных файлах, расположенных в директории `<vkcloud>/group_vars/` на деплой-ноде:

   1. В файле `<vkcloud>/vars.yml` задайте параметры конфигурации для внешней Neutron-сети:

      ```yaml
      external_networks_extend:
        "172.25.120.0/24": # адрес внешней подсети
          vlan: 2013 # Номер VLAN во внешней подсети
          project_id: "e01b26b84caa463f9c1691720fba5d53" # ID проекта "admin"; можно узнать через команду `openstack project show admin`
          network_name: "ext-net" # Название сети (будет отображаться в веб-интерфейсе под этим именем)
          shared: "True" # Всегда True
      ```
      
   1. В следующих файлах задайте настройки мостов для выхода ВМ во внешнюю сеть: br-vlan интерфейс для выхода с VLAN, br-ex интерфейс для выхода без VLAN (создается как дополнение, без какого-либо присвоенного IP):

      <warn>

      В настройках, приведенных ниже, `bond0` — агрегированный сетевой интерфейс, через который доступен VLAN в сторону пользователей наряду с другими VLAN.

      </warn>

      * `<vkcloud>_compute/vars.yml` — файл с настройками вычислительных узлов, на которых будут запускаться ВМ.

         ```yaml
         compute_network_ifcfg_vlan: |
           DEVICE=br-vlan
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=none
           ONBOOT=yes
           NOZEROCONF=yes
           OVS_EXTRA="add-port br-vlan bond0"

         compute_network_ifcfg_external: |
           DEVICE=br-ex
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=static
           ONBOOT=yes
           NOZEROCONF=yes
           {% for gw_ip in networks.external | ipaddr('-2') %}
           IPADDR{{ loop.index }}={{ gw_ip | ipaddr('address') }}
           NETMASK{{ loop.index }}=255.255.255.255
           {% endfor %}
         ```
        
      * `<vkcloud>_dhcp/vars.yml` — файл с настройками DHCP:

         ```yaml
         neutron_dhcp_ifcfg_external: |
           DEVICE=br-ex
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=static
           ONBOOT=yes
           NOZEROCONF=yes
           {% for gw_ip in networks.external | ipaddr('-2') %}
           IPADDR{{ loop.index }}={{ gw_ip | ipaddr('address') }}
           NETMASK{{ loop.index }}=255.255.255.255
           {% endfor %}

         neutron_dhcp_ifcfg_vlan: |
           DEVICE=br-vlan
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=none
           ONBOOT=yes
           NOZEROCONF=yes
           OVS_EXTRA="add-port br-vlan bond0"
         ```

      {ifndef(cer)}
      * `<vkcloud>_octavia/vars.yml` — файл с настройками балансировщика Octavia:
        
         ```yaml
         octavia_network_ifcfg_external: |
            DEVICE=br-ex
            DEVICETYPE=ovs
            TYPE=OVSBridge
            BOOTPROTO=static
            ONBOOT=yes
            NOZEROCONF=yes
            {% for gw_ip in networks.external | ipaddr('-2') %}
            IPADDR{{ loop.index }}={{ gw_ip | ipaddr('address') }}
            NETMASK{{ loop.index }}=255.255.255.255
            {% endfor %}
        
         octavia_network_ifcfg_vlan: |
            DEVICE=br-vlan
            DEVICETYPE=ovs
            TYPE=OVSBridge
            BOOTPROTO=none
            ONBOOT=yes
            NOZEROCONF=yes
            OVS_EXTRA="add-port br-vlan bond0"
         ```
      {/ifndef}

      * `<vkcloud>_network/vars.yml` — файл с настройками Neutron-сети:

         ```yaml
         neutron_network_ifcfg_external: |
           DEVICE=br-ex
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=static
           ONBOOT=yes
           NOZEROCONF=yes
           {% for gw_ip in networks.external | ipaddr('-2') %}
           IPADDR{{ loop.index }}={{ gw_ip | ipaddr('address') }}
           NETMASK{{ loop.index }}=255.255.255.255
           {% endfor %}

         neutron_network_ifcfg_vlan: |
           DEVICE=br-vlan
           DEVICETYPE=ovs
           TYPE=OVSBridge
           BOOTPROTO=none
           ONBOOT=yes
           NOZEROCONF=yes
           OVS_EXTRA="add-port br-vlan bond0"
         ```

         <err>

         Во всех файлах с конфигурациями отключите настройку физического интерфейса — закомментируйте/удалите все строки для блоков настроек `_physinterface`.

         </err>

1. Задайте название окружения и запустите плейбуки:

   {ifndef(cer)}
   ```console
   $ cd ~/inventory/vkcloud/
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-controller-deploy.yml | $ tee ~/neutron-controller-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-network-deploy.yml | tee ~/neutron-network-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/compute-deploy.yml | tee ~/compute-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-dhcp-deploy.yml | tee ~/neutron-dhcp-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/octavia-deploy.yml | tee ~/octavia-deploy
   ```
   {/ifndef}

   {ifdef(cer)}
   ```console
   $ cd ~/inventory/vkcloud/
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-controller-deploy.yml | $ tee ~/neutron-controller-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-network-deploy.yml | tee ~/neutron-network-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/compute-deploy.yml | tee ~/compute-deploy
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=yes ../ansible-openstack/playbooks/neutron-dhcp-deploy.yml | tee ~/neutron-dhcp-deploy
   ```
   {/ifdef}

1. Создайте внешнюю сеть, через которую будет осуществляться взаимодействие приватных пользовательских сетей с внешними сетями организации:

   ```console
   $ openstack network create --provider-network-type vlan --external --provider-physical-network vlan --provider-segment <VLAN_ID> --share <НАЗВАНИЕ_ВНЕШНЕЙ_СЕТИ>
   ```

1. Создайте подсеть в только что созданной сети:

   ```console
   $ openstack subnet create --network <НАЗВАНИЕ_ВНЕШНЕЙ_СЕТИ> --subnet-range <ПОДСЕТЬ> --allocation-pool <ПУЛ_АДРЕСОВ> --dhcp --gateway <IP_АДРЕС_ШЛЮЗА> --dns-nameserver <АДРЕС_DNS_СЕРВЕРА> <НАЗВАНИЕ_ПОДСЕТИ>
   ```

   Здесь:

   * `<ПОДСЕТЬ>` — адрес подсети, которую вам выдали в этом VLAN. Например, `172.25.120.0/24`.
   * `<ПУЛ_АДРЕСОВ>` — пул IP-адресов для ВМ (не забудьте оставить место для шлюза и двух DHCP-серверов). Например, `start=172.25.120.4,end=172.25.120.245`.

### {heading(Подключение пользовательских сетей к внешней сети)[id=connecting_user_networks_to_external_networks]}

<err>

Настройки доступа по умолчанию запрещают подключение к внешней сети внутренних сетей под любым пользователем, кроме Администратора {var(sys2)}.

</err>

Чтобы обеспечить доступ ВМ в пользовательских внутренних сетях во внешнюю сеть, задайте внешнюю сеть как шлюз для маршрутизатора внутренней:

1. Войдите в Портал самообслуживания с использованием учетной записи Администратора {var(sys2)}.
1. Перейдите в раздел **Виртуальные сети** → **Маршрутизаторы**.
1. Нажмите кнопку **Добавить маршрутизатор**.

   1. Укажите название пользовательской сети.
   1. Включите флажок **Подключение к внешней сети**.
   1. Выберите подсеть в раскрывающемся списке **Список подсетей**.

1. Нажмите кнопку **Создать**.

   <info>

   При успешном выполнении настройки в Портале самообслуживания на странице с информацией о выбранном маршрутизаторе на вкладке **Общая информация** в графе **Подключение к внешней сети** будет указано значение **Есть**.

   </info>
   
1. Перейдите в раздел **Виртуальные сети** → **Сети**.
1. Нажмите кнопку **Создать**.
1. Укажите название сети при необходимости, в списке **Маршрутизатор** выберите ранее созданный маршрутизатор.
1. В области **Список подсетей** нажмите на значок **•••** справа от названия подсети и выберите пункт **Редактировать подсеть**. Включите параметр **Включить DHCP**.
1. Отключите параметр **Приватный DNS** и укажите используемые DNS-серверы.
1. Нажмите кнопку **Создать**.
1. Нажмите кнопку **Добавить сеть**.

После подключения внутренней сети к внешней для ВМ во внутренней сети появится возможность назначения внешнего IP-адреса.

<info>

Подключить внешнюю сеть к пользовательской можно при создании сети в Портале самообслуживания (подробнее — в разделе {linkto(../../usage/iaas_main/iaas_network_settings#network_creating)[text=%text]}). На этапе создания сети активируйте опцию **Доступ в интернет**.

</info>

Чтобы пройти аналогичные шаги в OpenStack CLI выполните подготовительные операции для использования OpenStack CLI (подробнее — в разделе {linkto(../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}), затем — команды:

<!--- // команды ниже специально не заменены на include-фрагменты, чтобы обозначить разницу между внутренней и внешней подсетями -->

```console
# openstack router create <НАЗВАНИЕ_РОУТЕРА>
# openstack network create <НАЗВАНИЕ_ВНУТРЕННЕЙ_СЕТИ>
# openstack subnet create <НАЗВАНИЕ_ВНУТРЕННЕЙ_ПОДСЕТИ> --network <НАЗВАНИЕ_ВНУТРЕННЕЙ_СЕТИ> --subnet-range 192.168.100.0/24 --dns-nameserver 10.14.0.12
# openstack router set <НАЗВАНИЕ_РОУТЕРА> --external-gateway <НАЗВАНИЕ_ВНЕШНЕЙ_СЕТИ>
# openstack router add subnet <НАЗВАНИЕ_ВНУТРЕННЕЙ_СЕТИ> <НАЗВАНИЕ_ВНУТРЕННЕЙ_ПОДСЕТИ>
```

<err>

Присоединение внешней сети в качестве приватной к роутерам (например, с помощью команды `openstack router add subnet`) приводит к нарушению связности до внешнего шлюза в этой сети.

</err>

## {heading(Создание дополнительных внешних сетей для проектов)[id=network_setup_provider_network]}

Чтобы для каждого проекта создать внешнюю сеть, доступную только в нем:

1. Отключите использование внешней глобальной сети. В файле `<vkcloud>/group_vars/vkcloud/vars.yml` задайте параметру `create_external_network` значение `false`.
1. В файле `<vkcloud>/group_vars/vkcloud/vars.yml` в переменной `postdeploy_provider_network` задайте параметры новых сетей.

   {caption(Пример фрагмента файла `vars.yml`)[align=left;position=above]}
   ```yaml
     # Описание провайдерских сетей для каждого проекта
     postdeploy_provider_network:
         # Название проекта, в котором будет создана сеть
       - project_name: "ProjectX"
         # Имя новой сети в OpenStack
         name: "projectX_provider_net1"
         type: "vlan"
         # VLAN ID новой сети
         segmentation_id: 1001
         # Cеть будет создана с флагом --external (внешняя)
         external: true
         # Cеть будет создана с флагом --shared и не будет доступна для редактирования пользователю Портала самообслуживания
         shared: true
         # Описание подсети
         subnet:
           name: "provider_subnet1"
           dns_nameservers: "x.x.x.x"  # Адрес внешнего DNS-сервера
           gateway: "d.d.d.1"  # Адрес default gateway
           cidr: "d.d.d.0/24"  # Блок адресов в формате CIDR
           allocation_pools:
             start: "d.d.d.100"
             end: "d.d.d.200"
           enable_dhcp: false
   ```
   {/caption}
1. Запустите плейбук:

   ```console
   $ cd ~/inventory/vkcloud/
   $ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -t provider_net ../ansible-openstack/playbooks/post-deploy.yml
   ```

   <warn>

   После создания новой внешней сети проекта, доступной только в нем, создайте шаблон кластера Kubernetes (подробнее — в п. {linkto(../../administration/cluster_template#cluster_template_add)[text=%text]}).

   </warn>

Чтобы создать внешнюю сеть для проекта при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Выполните команду (подробнее — в разделе {linkto(../../cli_commands#cli_openstack_network_create)[text=%text]}):

   {caption(Пример команды создания внешней сети)[align=left;position=above]}
   ```console
   $ openstack network create --project <НАЗВАНИЕ_ПРОЕКТА> --enable --external <НАЗВАНИЕ_ВНЕШНЕЙ_СЕТИ>
   ```
   {/caption}

   <warn>

   Внешняя сеть, созданная с опцией `--share`, не будет доступна для редактирования пользователю Портала самообслуживания.

   </warn>

## {heading(Редактирование внешней сети)[id=set_external_network]}

Чтобы отредактировать внешнюю сеть, выполните команду OpenStack CLI из раздела {linkto(../../cli_commands#cli_openstack_network_set)[text=%text]}.

## {heading(Удаление сетей и сетевых подключений)[id=delete_networks_and_network_connections]}

<!--- //todo на стенде в портале администратора не работает удаление сетей. Нет значка удаления, по комментарию фронтов эта кнопка и раньше не выполняла никакой функции -->

1. В Портале администратора перейдите в раздел **Сетевая подсистема** → **Порты**.
1. Установите флажки для портов, у которых в столбце **Подключенное устройство** указано значение **compute**.
1. Нажмите кнопку удаления справа от кнопки **Добавить**.

Удалять внешние сети можно при помощи OpenStack CLI, выполнив команду из раздела {linkto(../../cli_commands#cli_openstack_network_delete)[text=%text]}.

<!---
пока что закомментировал, нет возможности проверить на стенде
{ifndef(cer)}
[WARNING]
====
Для удаления сетей может потребоваться удаление/освобождение других сущностей OpenStack (кластеров Kubernetes, баз данных Trove, балансировщиков Octavia, файловых хранилищ Manila и др.), которые используют сеть.
====
{/ifndef}

//BGP, DVR+BGP нет в Коробке (инфо от К. Нифанина)
//https://jira.vk.team/browse/MCSPC-3700: На текущий момент BGP в коробке3 используется только для поддержания отказоустойчивости на узлах контроллеров. При установке облака компоненты, ответственные за BGP+DVR, не развертываются и не настраиваются

-->

## {heading(Добавление нового сегмента внешних адресов)[id=external_adresses_add]}

Чтобы добавить подсеть адресов во внешнюю сеть, создайте новую подсеть в этой внешней сети (подробнее — в разделе {linkto(../../usage/iaas_main/iaas_network_settings#subnet_creating)[text=%text]}).

{caption(Пример выполнения команды)[align=left;position=above]}
```console
$ openstack subnet create --network ext-net --subnet-range 203.0.114.0/24 --allocation-pool start=203.0.114.1,end=203.0.114.253 --gateway 203.0.114.254 ext-net-subnet2
```
{/caption}