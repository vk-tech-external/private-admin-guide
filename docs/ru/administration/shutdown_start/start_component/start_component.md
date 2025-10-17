# {heading(Включение {var(sys2)})[id=start_component]}

Включайте компоненты {var(sys2)} в обратном отключению порядке (подробнее — в разделе {linkto(../../../administration/shutdown_start/shutdown_component#shutdown_component)[text=%text]}).

Первым включите деплой-ноду, затем все остальные компоненты.

## {heading(Серверы Ceph)[id=start_ceph]}

1. Если количество Ceph-узлов 3 и меньше, включите их в любом порядке, если больше — запустите сначала MON-узлы, а затем OSD-узлы.

1. Через 5 минут, подключитесь к любому узлу Ceph и снимите флаги `noout` и `norebalance`:

   ```console
   # ceph osd unset noout
   # ceph osd unset norebalance
   ```

1. Убедитесь, что Ceph-узел находится в состоянии `HEALTH_OK`:

   ```console
   # ceph -s | grep -A1 health
   ```

   Если состояние узла не `HEALTH_OK`, и ответ команды содержит флаги `noout` и `norebalance`, снимите их повторно.

## {heading(Управляющие узлы)[id=start_managment_node]}

Включите все управляющие узлы.

<info>

Узлы включают в себя различные сервисы и компоненты, которые обеспечивают управление и координацию работы {var(sys2)}. Состав Controlplane зависит от конкретной инсталляции и архитектуры.

</info>    

### {heading(Galera (MariaDB))[id=start_galera]}

Сервис MariaDB не запускается корректно сразу после перезагрузки, так как узлы кластера Galera не включаются синхронно.

Работу кластеров Galera можно восстановить несколькими способами:

1. Восстановление с помощью стандартной роли Galera. Для этого запустите плейбуки с параметрами для восстановления работы кластера Galera:

   ```console
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_nova -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_barbican -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_billingaccountservice -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_cinder -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_glance -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_karboii -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_keycloak -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_keystone -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_magnum -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_manila -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_neutron -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_octavia -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_quotamanager -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_scrooge -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_scroogearchive -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_sdnbilling -t recovery ../ansible-openstack/playbooks/galera.yml
   # ansible-playbook -i vkcloud.yml -e env=vkcloud -e galera_recovery_group=vkcloud_galera_trove -t recovery ../ansible-openstack/playbooks/galera.yml
   ```

1. Восстановление вручную:
   
   1. Найдите узел с параметром `safe_to_bootstrap` равным `1` в файле  `grastate.dat`:

      ```console
      # for i in `ls /srv/mysql/`; do echo $i = $(cat /srv/mysql/$i/data/grastate.dat | grep safe_to_bootstrap); done
      ```

   1. Запустите на узле сервисы:

      ```console
      # systemctl set-environment _WSREP_NEW_CLUSTER='--wsrep-new-cluster' && systemctl restart mariadb-* && systemctl set-environment _WSREP_NEW_CLUSTER=''
      ```
    
      Если сервисы не запустились корректно, удалите файл `grastate.dat` и запустите сервисы повторно:
     
      1. Проверьте, что MariaDB имеет ошибки после запуска:

         ```console
         # systemctl list-units --failed | grep mariadb | awk '{print $2}'
         
         for i in `ls /srv/mysql/`; do echo $i = $(cat /srv/mysql/$i/data/grastate.dat | grep safe_to_bootstrap); done
         systemctl set-environment _WSREP_NEW_CLUSTER='--wsrep-new-cluster' && systemctl start mariadb-* && systemctl set-environment _WSREP_NEW_CLUSTER=''
         ```
      1. Удалите файлы `grastate.dat`:

         ```console
         # for i in `ls /srv/mysql/`; do rm -f /srv/mysql/$i/data/grastate.dat; done
         ``` 
      1. Создайте кластер:

         ```console
         # for i in `ls /srv/mysql/`; do galera_new_cluster mariadb-$i ;done
         ```
   1. Запустите сервисы на остальных управляющих узлах:

       ```console
       # systemctl restart mariadb-*
       ```

### {heading(Tarantool)[id=start_galera]}

1. Убедитесь, что сервисы Breeze и Dusk запущены на всех управляющих узлах:

   1. Проверьте статус сервисов:
   
      ```console
      # systemctl list-units | grep tarantool@
      ```
   1. Запустите сервисы (если не запущены):
   
      ```console
      # for i in `systemctl list-units| grep tarantool@ | awk '{print $1}'`; do systemctl start $i; done
      ```
   1. Включите автозапуск сервисов:
   
      ```console
      # for i in `systemctl list-units| grep tarantool@ | awk '{print $1}'`; do systemctl enable $i; done
      ```
   1. Проверьте состояние сервисов:
   
      ```console
      # systemctl status tarantool@*
      ```

1. Запустите соответствующие сервисы Overlord и разрешите автозапуск:

   ```console
   # for i in `systemctl list-units| grep overlord@ | awk '{print $1}'`; do systemctl start $i; done

   # for i in `systemctl list-units| grep overlord@ | awk '{print $1}'`; do systemctl enable $i; done
   ```

### {heading(RabbitMQ)[id=start_rabbitmq]}

RabbitMQ работает на платформе Kubernetes. При сбоях или неполадках в работе RabbitMQ удалите поды, после чего кластер перезапустится.

Чтобы удалить поды RabbitMQ в состоянии `0/1`:

1. Перезапустите все поды:

   ```console
   # kubectl delete pods --all -n rabbitmq --grace-period=0 --force
   ```
1. Проверьте, что все поды работают:

   ```console
   # kubectl get po -A | grep -v "cronjob" | grep "0/1" | awk '{print $2}'
   ```

<info>

После перезапуска подов подождите 5 минут, прежде чем начинать следующую операцию.

</info>

### {heading(Сервисы Systemd)[id=start_systemd]}

Проверьте и перезапустите все неработающие сервисы на управляющих узлах:

```console
# systemctl list-units --failed
UNIT LOAD ACTIVE SUB DESCRIPTION
● mnt-glance.mount loaded failed failed /mnt/glance
● keystone-trust-flush.service loaded failed failed Keystone trust flush script
● scrooge-billing.service loaded failed failed Scrooge Billing script  
# systemctl restart mnt-glance.mount
# systemctl restart keystone-trust-flush.service
# systemctl restart scrooge-billing.service
```

### {heading(Компоненты OpenStack)[id=start_openstack]}

#### {heading(Magnum)[id=start_magnum]}

1. Проверьте запущены ли поды Magnum с любого управляющего узла кроме первого:

   ```console
   # kubectl get po -A | grep magnum | grep "0/1"
   ```
1. Перезапустите неработающие поды, если такие есть:

   ```console
   # for i in `kubectl get po -A | grep paas-vkcloud | grep magnum  | grep "0/1" | awk '{print $1'}` ; do kubectl -n paas-vkcloud delete pods $i --grace-period=0 --force; done
   ```

#### {heading(Neutron)[id=start_neutron]}

1. Перезапустите сервисы Neutron на управляющих узлах:

   ```console
   # systemctl restart neutron-server.service 
   # systemctl restart neutron-openvswitch-agent.service
   # systemctl restart neutron-l3-agent.service 
   # systemctl restart neutron-dhcp-agent.service  
   # systemctl restart neutron-metadata-agent.service
   ```

1. Проверьте корректность запуска:

   ```console
   # systemctl status neutron-server.service 
   # systemctl status neutron-openvswitch-agent.service
   # systemctl status neutron-l3-agent.service 
   # systemctl status neutron-dhcp-agent.service  
   # systemctl status neutron-metadata-agent.service
   ```

1. Перезапустите сервисы Neutron на вычислительных узлах:

   ```console
   # systemctl restart neutron-openvswitch-agent.service
   # systemctl restart neutron-l3-agent.service 
   # systemctl restart neutron-metadata-agent.service
   ```

1. Проверьте корректность запуска:

   ```console
   # systemctl status neutron-openvswitch-agent.service
   # systemctl status neutron-l3-agent.service 
   # systemctl status neutron-metadata-agent.service
   ```

1. Подключитесь на любой управляющий узел и проверьте, что все network-агенты работают:

   ```console
   # source ~/openrc.sh
   # openstack network agent list
   ```

#### {heading(Manila)[id=start_manila]}

Перезапустите планировщик Manila на всех управляющих узлах:

```console
# systemctl restart openstack-manila-scheduler
```

#### {heading(Octavia)[id=start_octavia]}

Проверьте, запущены ли сервисы Octavia на управляющих узлах:

```console
# systemctl status octavia-*
```

Если сервисы запущены с ошибкой, перезапустите их:

```console
# systemctl restart octavia-*
```

## {heading(Гипервизоры)[id=start_hypervisor]}

1. Запустите вычислительные узлы в любом порядке. 

1. Проверьте синхронизацию времени с помощью утилиты timedatectl. Если синхронизация отсутствует (`System clock synchronized: no`), перезапустите сервис chronyd на всех узлах {var(sys2)}:

   ```console
   # timedatectl
   # systemctl restart chronyd
   ```

1. Выполните синхронизацию времени:

   ```console
   # sudo chronyc -a 'burst 4/4'
   # sudo chronyc -a makestep
   ```

## {heading(Восстановление работы балансировщиков)[id=load_balancers_restoring]}

Чтобы восстановить работу балансировщиков нагрузки после отключения или включения {var(sys2)}:

1. Получите список балансировщиков:

   ```console
   # source openrc.sh
   # openstack loadbalancer list
   ```

1. Запустите скрипт для каждого балансировщика с ошибкой:

   ```bash
   #!/bin/sh
   if [ "${1}EMPTY" == "EMPTY" ]; then
       echo "Usage $0 <LB_ID>"
       echo "Don't forget source projet file"
       exit
   fi
   echo "UPDATE load_balancer SET provisioning_status='ACTIVE' where id='${1}';" | mysql -S /srv/mysql/octavia/socket/octavia.sock octavia
   openstack loadbalancer amphora list -c id -f value --status ERROR --loadbalancer ${1} | tail -n 1 | xargs openstack loadbalancer amphora failover
   sleep 60
   for i in {1..18};
   do
       echo -n "."
       sleep 10
   done
   echo "UPDATE load_balancer SET provisioning_status='ACTIVE' where id='${1}';" | mysql -S /srv/mysql/octavia/socket/octavia.sock octavia
   openstack loadbalancer amphora list -c id -f value --status ERROR --loadbalancer ${1} | tail -n 1 | xargs openstack loadbalancer amphora failover
   ```

## {heading(Возможные ошибки при включении)[id=start_errors]}

**Ошибка**: Неисправные порты OVS.

**Решение**: Удалите порты со статусом `error` на узле.

1. Найдите порты в состоянии `error`:

   ```console
   # ovs-vsctl show
   ```
1. Удалите порты:

   ```console
   # ovs-vsctl del-port br-int <Interface>
   ```

**Ошибка**: `Clickhouse ["vkcloud_ch_proxy"]: distributed connection exceptions occured`   

**Решение**: 

1. На первом управляющем узле выполните команды: 

   ```console
   # systemctl stop clickhouse-server.service
   # systemctl disable clickhouse-server.service
   # systemctl restart clickhouse-server@vkcloud_ch_proxy.service
   ```

1. На остальных управляющих узлах выполните команды: 

   ```console
   # systemctl stop clickhouse-server.service
   # systemctl disable clickhouse-server.service
   # systemctl restart clickhouse-server@vkcloud_ch_cluster_audit_logs.service
   ```