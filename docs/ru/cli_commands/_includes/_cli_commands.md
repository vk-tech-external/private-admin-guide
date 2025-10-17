{includetag(cli_openstack_flavor_list_cmd)}

```console
# openstack flavor list
    [--public | --private | --all]
    [--long]
```
{/includetag}


{includetag(cli_openstack_flavor_create_cmd)}

```console
# openstack flavor create
    [--id <ID>]
    [--ram <SIZE_MB>]
    [--disk <SIZE_GB>]
    [--ephemeral <SIZE_GB>]
    [--swap <SIZE_MB>]
    [--vcpus <VCPUS>]
    [--rxtx-factor <FACTOR>]
    [--public | --private]
    [--property <KEY=VALUE>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    <FLAVOR_NAME>
```
{/includetag}


{includetag(cli_openstack_flavor_set_cmd)}

```console
# openstack flavor set
    [--property <KEY=VALUE>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    <FLAVOR_NAME>
```
{/includetag}


{includetag(cli_openstack_flavor_delete_cmd)}

```console
# openstack flavor delete <ИМЯ_ИЛИ_ID_ШАБЛОНА> [<ИМЯ_ИЛИ_ID_ШАБЛОНА_2> ...]
```
{/includetag}


{includetag(cli_openstack_server_list_cmd)}

```console
# openstack server list
    [--reservation-id <RESERVATION_ID>]
    [--ip <IP_ADDRESS_REGEX>]
    [--name <NAME_REGEX>]
    [--instance-name <SERVER_NAME_REGEX>]
    [--status <STATUS>]
    [--flavor <FLAVOR>]
    [--image <IMAGE>]
    [--host <HOSTNAME>]
    [--all-projects]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--user <USER>]
    [--user-domain <USER_DOMAIN>]
    [--long]
    [--marker <SERVER>]
    [--limit <NUM_SERVERS>]
    [--deleted]
    [--changes-since <CHANGES_SINCE>]
```
{/includetag}


{includetag(cli_openstack_server_create_cmd)}

<err>

В данной версии {var(sys2)} IPv6 не поддерживается.

</err>

```console
# openstack server create
    (--image <IMAGE> | --volume <VOLUME>)
    --flavor <FLAVOR>
    [--security-group <SECURITY_GROUP>]
    [--key-name <KEY_NAME>]
    [--property <KEY=VALUE>]
    [--file <dest-filename=SOURCE_FILENAME>]
    [--user-data <USER_DATA>]
    [--availability-zone <ZONE_NAME>]
    [--block-device-mapping <DEV_NAME=MAPPING>]
    [--nic <net-id=NET_UUID,v4-fixed-ip=IP_ADDRESS,port-id=PORT_UUID,auto,none>]
    [--hint <KEY=VALUE>]
    [--config-drive <CONFIG_DRIVE_VOLUME>]
    [--min <COUNT>]
    [--max <COUNT>]
    [--wait]
    <SERVER>
```
{/includetag}


{includetag(cli_openstack_server_start_cmd)}

```console
# openstack server start <ИМЯ_ИЛИ_ID_ВМ> [ <ИМЯ_ИЛИ_ID_ВМ_2> ...]
```
{/includetag}


{includetag(cli_openstack_server_reboot_cmd)}

```console
# openstack server reboot
    [--hard | --soft]
    [--wait]
    <SERVER>
```
{/includetag}


{includetag(cli_openstack_server_stop_cmd)}

```console
# openstack server stop <ИМЯ_ИЛИ_ID_ВМ> [<ИМЯ_ИЛИ_ID_ВМ_2> ...]
```
{/includetag}


{includetag(cli_openstack_server_migrate_cmd)}

```console
# openstack server migrate
    [--live <HOSTNAME>]
    [--shared-migration | --block-migration]
    [--disk-overcommit | --no-disk-overcommit]
    [--wait]
    <SERVER>
```
{/includetag}


{includetag(cli_openstack_server_delete_cmd)}

```console
# openstack server delete <ИМЯ_ИЛИ_ID_ВМ> [<ИМЯ_ИЛИ_ID_ВМ_2> ...]
```
{/includetag}


{includetag(cli_openstack_keypair_create_cmd)}

```console
# openstack keypair create
    [--public-key <ПУТЬ_ДО_ФАЙЛА_ОТКРЫТОГО_КЛЮЧА>]
    <ИМЯ_КЛЮЧА>
```
{/includetag}


{includetag(cli_openstack_image_list_cmd)}

```console
# openstack image list
    [--public | --private | --shared]
    [--property <KEY=VALUE>]
    [--long]
```
{/includetag}


{includetag(cli_openstack_image_create_cmd)}

```console
# openstack image create
    [--disk-format <DISK_FORMAT>]
    [--container-format <CONTAINER_FORMAT>]
    [--file <FILE>]
    [--volume <VOLUME>]
    [--protected | --unprotected]
    [--public | --private]
    [--property <KEY=VALUE> [<KEY_2=VALUE_2> ...] ]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    <IMAGE>
```
{/includetag}


{includetag(cli_openstack_image_save_cmd)}

```console
# openstack image save
    [--file <ИМЯ_ФАЙЛА_ЗАГРУЗКИ>]
    <ИМЯ_ИЛИ_ID_ОБРАЗА>
```
{/includetag}


{includetag(cli_openstack_image_delete_cmd)}

```console
# openstack image delete <ИМЯ_ИЛИ_ID_ОБРАЗА>
```
{/includetag}


{includetag(cli_openstack_volume_create_cmd)}

```console
# openstack volume create
    [--size <SIZE>]
    [--type <VOLUME_TYPE>]
    [--image <IMAGE> | --snapshot <SNAPSHOT> | --source <VOLUME> | --source-replicated <REPLICATED_VOLUME>]
    [--description <DESCRIPTION>]
    [--project <PROJECT>]
    [--availability-zone <AVAILABILITY_ZONE>]
    [--consistency-group <CONSISTENCY_GROUP>]
    [--property <KEY=VALUE>]
    [--hint <KEY=VALUE>]
    [--bootable | --non-bootable]
    [--read-only | --read-write]
    <NAME>
```
{/includetag}


{includetag(cli_openstack_volume_delete_cmd)}

```console
# openstack volume delete
    [--force | --purge]
    <ИМЯ_ИЛИ_ID_ДИСКА> [<ИМЯ_ИЛИ_ID_ДИСКА_2> ...]
```
{/includetag}


{includetag(cli_openstack_snapshot_create_cmd)}

```console
# openstack volume snapshot create
    [--volume <VOLUME>]
    [--description <DESCRIPTION>]
    [--force]
    <SNAPSHOT>
```
{/includetag}


{includetag(cli_openstack_network_list_cmd)}

```console
# openstack network list
    [--external | --internal]
    [--long]
    [--name <NAME>]
    [--enable | --disable]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--share | --no-share]
    [--status <STATUS>]
    [--provider-network-type <PROVIDER_NETWORK_TYPE>]
    [--provider-physical-network <PROVIDER_PHYSICAL_NETWORK>]
    [--provider-segment <PROVIDER_SEGMENT>]
```
{/includetag}


{includetag(cli_openstack_network_create_cmd)}

```console
# openstack network create
    [--share | --no-share]
    [--enable | --disable]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--description <DESCRIPTION>]
    [--availability-zone-hint <AVAILABILITY_ZONE>]
    [--external | --internal]
    [--default | --no-default]
    [--qos-policy <qos-policy>]
    [--provider-network-type <PROVIDER_NETWORK_TYPE>]
    [--provider-physical-network <PROVIDER_PHYSICAL_NETWORK>]
    <NETWORK>
```
{/includetag}


{includetag(cli_openstack_network_set_cmd)}

```console
# openstack network set
    [--name <NAME>]
    [--enable | --disable]
    [--share | --no-share]
    [--description <DESCRIPTION>]
    [--external | --internal]
    [--default | --no-default]
    [--provider-network-type <PROVIDER_NETWORK_TYPE>]
    [--provider-physical-network <PROVIDER_PHYSICAL_NETWORK>]
    <NETWORK>
```
{/includetag}


{includetag(cli_openstack_network_delete_cmd)}

```console
# openstack network delete <ИМЯ_ИЛИ_ID_СЕТИ> [<ИМЯ_ИЛИ_ID_СЕТИ_2> ...]
```
{/includetag}


{includetag(cli_openstack_subnet_create_cmd)}


```console
# openstack subnet create
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--subnet-pool <SUBNET_POOL> | --use-default-subnet-pool]
    [--subnet-range <SUBNET_RANGE>]
    [--dhcp | --no-dhcp]
    [--gateway <GATEWAY>]
    [--ip-version 4]
    [--network-segment <NETWORK_SEGMENT>]
    --network <NETWORK>
    [--description <DESCRIPTION>]
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
    [--dns-nameserver <DNS_NAMESERVER>]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--service-type <SERVICE_TYPE>]
    <SUBNET>
```
{/includetag}


{includetag(cli_openstack_subnet_set_cmd)}

```console
# openstack subnet set
    [--name <NAME>]
    [--dhcp | --no-dhcp]
    [--gateway <GATEWAY>]
    [--description <DESCRIPTION>]
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS>]
    [--no-allocation-pool]
    [--dns-nameserver <DNS_NAMESERVER>]
    [--no-dns-nameservers]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--no-host-route]
    [--service-type <SERVICE_TYPE>]
    <SUBNET>
```
{/includetag}


{includetag(cli_openstack_subnet_unset_cmd)}

```console
# openstack subnet unset
    [--allocation-pool start=<IP_ADDRESS>,end=<IP_ADDRESS> [, start=<IP_ADDRESS_2>,end=<IP_ADDRESS_2>, ...]]
    [--dns-nameserver <DNS_NAMESERVER> [, <DNS_NAMESERVER_2>, ...]]
    [--host-route destination=<SUBNET>,gateway=<IP_ADDRESS> [, destination=<SUBNET_2>,gateway=<IP_ADDRESS_2>, ...]]
    [--service-type <SERVICE_TYPE>]
    [--tag <TAG> | --all-tag]
    <SUBNET>
```
{/includetag}


{includetag(cli_openstack_subnet_delete_cmd)}

```console
#  openstack subnet delete <ИМЯ_ИЛИ_ID_ПОДСЕТИ> [<ИМЯ_ИЛИ_ID_ПОДСЕТИ_2> ...]
```
{/includetag}


{includetag(cli_openstack_port_create_cmd)}

```console
# openstack port create
    --network <NETWORK>
    [--description <DESCRIPTION>]
    [--device <DEVICE_ID>]
    [--device-owner <DEVICE_OWNER>]
    [--vnic-type <VNIC_TYPE>]
    [--host <HOST_ID>]
    [--dns-name <DNS_NAME>]
    [--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>]
    [--enable | --disable]
    [--mac-address <MAC_ADDRESS>]
    [--project <PROJECT>]
    [--project-domain <PROJECT_DOMAIN>]
    [--security-group <SECURITY_GROUP> | --no-security-group]
    [--enable-port-security | --disable-port-security]
    [--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]]
    <PORT>
```
{/includetag}


{includetag(cli_openstack_port_set_cmd)}

```console
# openstack port set
    [--description <DESCRIPTION>]
    [--device <DEVICE_ID>]
    [--device-owner <DEVICE_OWNER>]
    [--vnic-type <VNIC_TYPE>]
    [--host <HOST_ID>]
    [--dns-name <DNS_NAME>]
    [--enable | --disable]
    [--name <NAME>]
    [--fixed-ip subnet=<SUBNET>,ip-address=<IP_ADDRESS>]
    [--no-fixed-ip]
    [--security-group <SECURITY_GROUP>]
    [--no-security-group]
    [--enable-port-security]
    [--disable-port-security]
    [--allowed-address ip-address=<IP_ADDRESS>[,mac-address=<MAC_ADDRESS>]]
    [--no-allowed-address]
    <PORT>
```
{/includetag}


{includetag(cli_openstack_port_delete_cmd)}

```console
# openstack port delete <ИМЯ_ИЛИ_ID_ПОРТА> [<ИМЯ_ИЛИ_ID_ПОРТА_2> ...]
```
{/includetag}


{includetag(cli_openstack_loadbalancer_create_cmd)}

```console
# openstack loadbalancer create
    [--name <NAME>]
    [--description <DESCRIPTION>]
    [--vip-address <VIP_ADDRESS>]
    [--vip-port-id <VIP_PORT>]
    [--vip-subnet-id <VIP_SUBNET>]
    [--vip-network-id <VIP_NETWORK>]
    [--vip-qos-policy-id <VIP_QOS_POLICY>]
    [--project <PROJECT>]
    [--provider <PROVIDER>]
    [--availability-zone <AVAILABILITY_ZONE>]
    [--enable | --disable]
```
{/includetag}


{includetag(cli_openstack_loadbalancer_listener_create_cmd)}

```console
# openstack loadbalancer listener create
    [--name <NAME>]
    [--description <DESCRIPTION>]
    --protocol <PROTOCOL>
    [--connection-limit <LIMIT>]
    [--insert-headers <HEADER=VALUE> [, <HEADER_2=VALUE_2>, ...]]
    --protocol-port <PORT>
    [--timeout-client-data <TIMEOUT>]
    [--timeout-member-connect <TIMEOUT>]
    [--timeout-member-data <TIMEOUT>]
    [--timeout-tcp-inspect <TIMEOUT>]
    [--enable | --disable]
    [--allowed-cidr <ALLOWED_CIDR>]
    <LOAD_BALANCER>
```
{/includetag}


{includetag(cli_openstack_loadbalancer_pool_create_cmd)}

```console
# openstack loadbalancer pool create
    [--name <NAME>]
    [--description <DESCRIPTION>]
    --protocol <PROTOCOL>
    (--listener <LISTENER> | --loadbalancer <LOAD_BALANCER>)
    [--session-persistence <SESSION_PERSISTENCE>]
    --lb-algorithm <LB_ALGORITHM>
    [--enable | --disable]
    [--tls-container-ref <CONTAINER_REF>]
    [--ca-tls-container-ref <CA_TLS_CONTAINER_REF>]
    [--crl-container-ref <CRL_CONTAINER_REF>]
    [--enable-tls | --disable-tls]
```
{/includetag}


{includetag(cli_openstack_loadbalancer_healthmonitor_create_cmd)}

```console
# openstack loadbalancer healthmonitor create
    [--name <NAME>]
    --delay <DELAY>
    [--domain-name <DOMAIN_NAME>]
    [--expected-codes <CODES>]
    [--http-method {GET,POST,DELETE,PUT,HEAD,OPTIONS,PATCH,CONNECT,TRACE}]
    [--http-version <HTTP_VERSION>]
    --timeout <TIMEOUT>
    --max-retries <MAX_RETRIES>
    [--url-path <URL_PATH>]
    --type <TYPE>
    [--max-retries-down <MAX_RETRIES_DOWN>]
    [--enable | --disable]
    <POOL>
```
{/includetag}


{includetag(cli_openstack_router_create_cmd)}

```console
# openstack router create
    [--project <PROJECT> [--project-domain <PROJECT_DOMAIN>]]
    [--enable | --disable]
    [--distributed]
    [--ha]
    [--description <DESCRIPTION>]
    [--availability-zone-hint <AVAILABILITY_ZONE>]
    <ROUTER>
```
{/includetag}


{includetag(cli_openstack_router_set_cmd)}

```console
# openstack router set
    [--name <NAME>]
    [--description <DESCRIPTION>]
    [--enable | --disable]
    [--route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--no-route]
    [--ha | --no-ha]
    [--external-gateway <NETWORK>]
    <ROUTER>
```
{/includetag}


{includetag(cli_openstack_router_unset_cmd)}

```console
# openstack router unset
    [--route destination=<SUBNET>,gateway=<IP_ADDRESS>]
    [--external-gateway]
    [--tag <TAG> | --all-tag]
    <ROUTER>
```
{/includetag}


{includetag(cli_openstack_router_delete_cmd)}

```console
# openstack router delete <ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА> [<ИМЯ_ИЛИ_ID_МАРШРУТИЗАТОРА_2> ...]
```
{/includetag}