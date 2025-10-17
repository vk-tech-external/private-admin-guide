# {heading(Отключение {var(sys2)})[id=shutdown_component]}

## {heading(Гипервизоры)[id=shutdown_hypervisor]}

Чтобы отключить гипервизоры:

1. Остановите сервисы:

   ```console
   # systemctl stop openstack-nova-compute
   # systemctl stop neutron-l3-agent
   # systemctl stop neutron-openvswitch-agent
   # systemctl stop neutron-metadata-agent
   ```
   
1. Остановите сервисы Sprut, если он используется:

   ```console
   # systemctl stop sprut-nfv-agent
   # systemctl stop sprut-sdn-flow-agent
   # systemctl stop sprut-sdn-hw-agent
   ```

1. Отключите сервер:
  
   ```console
   # shutdown -P now
   ```

## {heading(Управляющие узлы)[id=shutdown_managment_node]}

Управляющие узлы отключайте последовательно, один за другим, с перерывами в 3–5 минут.

### {heading(IAM)[id=shutdown_iam]}

1. Найдите master-узел кластера Breeze. На любом из управляющих узлов выполните команду:

   ```console
   # ETCDCTL_API=2 etcdctl --endpoints=http://127.0.0.1:22379 get /mcs/tarantool/breeze/clusters/breeze/master
   ```

   Ответ команды содержит имя сервиса. Номер в конце идентификатора соответствует номеру управляющего узла с ролью master.
      
1. Остановите сервис Overlord, управляющий экземплярами Breeze на всех узлах, чтобы исключить смену master:

   ```console
   # BREEZE_INSTANCE=$(ls /etc/tarantool/instances.enabled/ | grep breeze | awk -F'.' '{print $1}' | head -1)
   systemctl stop overlord@$BREEZE_INSTANCE
   ```

1. Отключите автозапуск Overlord на всех узлах:
   
   ```console
   # systemctl disable overlord@$BREEZE_INSTANCE
   ```

1. Остановите Breeze и отключите автозапуск на всех оставшихся управляющих узлах, кроме master:

   ```console
   # BREEZE_INSTANCE=$(ls /etc/tarantool/instances.enabled/ | grep breeze | awk -F'.' '{print $1}' | head -1)
   # systemctl stop tarantool@$BREEZE_INSTANCE
   # systemctl disable tarantool@$BREEZE_INSTANCE
   ```

1. Повторите действия для сервиса Dusk:

   1. Определите, на каком из управляющих узлов находится master-узел сервиса Dusk:

      ```console
      # ETCDCTL_API=2 etcdctl --endpoints=http://127.0.0.1:22379 get /mcs/tarantool/dusk/clusters/dusk/master
      ```

      Ответ команды содержит имя сервиса. Номер в конце идентификатора соответствует номеру управляющего узла с ролью master.
  
    1. Остановите сервис Overlord, управляющий экземплярами Dusk, и отключите автозапуск на всех оставшихся управляющих узлах, кроме master:

       ```console
       # DUSK_INSTANCE=$(ls /etc/tarantool/instances.enabled/ | grep dusk | awk -F'.' '{print $1}' | head -1)
       systemctl stop overlord@$DUSK_INSTANCE
       # systemctl disable overlord@$DUSK_INSTANCE
       ```

    1. Остановите сервис Dusk и отключите автозапуск на всех оставшихся управляющих узлах, кроме master-узла:

       ```console
       # DUSK_INSTANCE=$(ls /etc/tarantool/instances.enabled/ | grep dusk | awk -F'.' '{print $1}' | head -1)
       systemctl stop tarantool@$DUSK_INSTANCE
       # systemctl disable tarantool@$DUSK_INSTANCE
       ```

### {heading(Компоненты OpenStack)[id=shutdown_openstack]}

1. Остановите сервисы Neutron и OpenStack на всех управляющих узлах в порядке от последнего к первому узлу:

   ```console
   # systemctl stop neutron-dhcp-agent.service
   # systemctl stop neutron-l3-agent.service
   # systemctl stop neutron-metadata-agent.service
   # systemctl stop neutron-openvswitch-agent.service
   # systemctl stop sprut-dns-agent.service
   # systemctl stop sprut-monitoring-agent.service
   # systemctl stop sprut-nfv-apps-rescheduler.service
   # systemctl stop sprut-nfv-apps-scheduler.service
   # systemctl stop sprut-sdn-flow-builder.service
   # systemctl stop sprut-sdn-topology-builder.service
   # systemctl stop openstack-barbican-worker.service
   # systemctl stop openstack-cinder-backup.service
   # systemctl stop openstack-manila-scheduler.service
   # systemctl stop openstack-manila-share.service
   # systemctl stop openstack-nova-conductor.service
   # systemctl stop openstack-nova-consoleauth.service
   # systemctl stop openstack-nova-novncproxy.service
   # systemctl stop openstack-nova-scheduler.service
   # systemctl stop openstack-barbican-api.service
   # systemctl stop openstack-cinder-api.service
   # systemctl stop openstack-glance-api.service
   # systemctl stop openstack-manila-api.service
   # systemctl stop openstack-nova-api.service
   # systemctl stop neutron-server.service
   # systemctl stop sprut-neutron-server.service
   ```

1. Выключите управляющие узлы в порядке от последнего к первому с перерывами по 5 минут:

   ```console
   # shutdown -P now
   ```

## {heading(Серверы Ceph)[id=shutdown_ceph]}

Чтобы отключить узлы Ceph:

1. Подключитесь к любому узлу Ceph и установите параметры `noout` и `norebalance`:

   ```console
   # ceph osd set noout
   # ceph osd set norebalance
   ```

1. Выключите узлы Ceph в порядке от последнего к первому с перерывами по 5 минут:

   ```console
   # shutdown -P now
   ```

## {heading(Прочие серверы)[id=shutdown_main]}

С помощью команды `shutdown -P now` последовательно выключите: 

1. Узел мониторинга.
1. Оставшиеся узлы {var(sys2)} (например, MinIO).
1. Деплой-нода.




