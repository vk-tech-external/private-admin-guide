# {heading(Список событий Cloud Audit)[idaudit_event]}

Ниже приведен список событий, которые поступают в сервис Cloud Audit.

## {heading(Список событий Nova)[id=audit_event_nova]}

{caption(Таблица {counter(table)[id=numb_tab_nova]} — События компонента Nova)[align=right;position=above;id=tab_nova;number={const(numb_tab_nova)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_VM_CREATE
|`create-vm`
|Создание ВМ

|ACTION_VM_DELETE
|`delete-vm`
|Удаление ВМ

|ACTION_VM_UPDATE
|`update-vm`
|Обновление ВМ

|ACTION_VM_ACTION
|`vm-action`
|Действие с ВМ

|ACTION_VM_CREATE_CONSOLE
|`vm-create-console`
|Создание консоли ВМ

|ACTION_VM_CREATE_OR_UPDATE_METADATA
|`vm-create-or-update-metadata`
|Создание или обновление метаданных ВМ

|ACTION_VM_DELETE_METADATA
|`vm-delete-metadata`
|Удаление метаданных ВМ

|ACTION_VM_ATTACH_INTERFACE
|`vm-attach-interface`
|Подключение интерфейса ВМ

|ACTION_VM_DETACH_INTERFACE
|`vm-detach-interface`
|Отключение интерфейса ВМ

|ACTION_VM_CLEAR_PASSWORD
|`vm-clear-password`
|Сброс пароля ВМ

|ACTION_VM_ATTACH_VOLUME
|`vm-attach-volume`
|Подключение диска к ВМ

|ACTION_VM_DETACH_VOLUME
|`vm-detach-volume`
|Отключение диска от ВМ

|ACTION_VM_UPDATE_VOLUME
|`vm-update-volume`
|Обновление диска ВМ

|ACTION_FLAVOR_CREATE
|`flavor-create`
|Создание флейвора

|ACTION_FLAVOR_DELETE
|`flavor-delete`
|Удаление флейвора

|ACTION_FLAVOR_UPDATE
|`flavor-update`
|Обновление флейвора

|ACTION_FLAVOR_MODIFY_ACCESS
|`flavor-modify-access`
|Изменение доступа флейвора

|ACTION_FLAVOR_CREATE_EXTRASPECS
|`flavor-create-extraspecs`
|Добавление дополнительных характеристик флейвора

|ACTION_FLAVOR_DELETE_EXTRASPECS
|`flavor-delete-extraspecs`
|Удаление дополнительных характеристик флейвора

|ACTION_FLAVOR_UPDATE_EXTRASPECS
|`flavor-update-extraspecs`
|Обновление флейвора

|ACTION_KEYPAIR_CREATE
|`keypair-create`
|Создание ключевой пары

|ACTION_KEYPAIR_DELETE
|`keypair-delete`
|Удаление ключевой пары

|ACTION_AGGREGATE_CREATE
|`aggregate-create`
|Единовременное создание нескольких объектов

|ACTION_AGGREGATE_DELETE
|`aggregate-delete`
|Единовременное удаление нескольких объектов

|ACTION_AGGREGATE_UPDATE
|`aggregate-delete`
|Единовременное обновление нескольких объектов

|ACTION_EXTERNAL_EVENT
|`external-event`
|Внешнее событие

|ACTION_ASSISTED_VOLUME_SNAP_CREATE
|`assisted-volume-snapshots-create`
|Создание снимков с поддержкой тома

|ACTION_ASSISTED_VOLUME_SNAP_DELETE
|`assisted-volume-snapshots-delete`
|Удаление снимков с поддержкой тома

|ACTION_MIGRATION_CREATE
|`vm-migration-create`
|Запуск процесса миграции ВМ

|ACTION_MIGRATION_DELETE
|`vm-migration-abort`
|Прерывание миграции ВМ

|ACTION_QUOTA_UPDATE
|`quota-update`
|Обновление квоты

|ACTION_QUOTA_CLASS_UPDATE
|`quota-class-update`
|Обновление типа квоты 

|ACTION_QUOTA_DELETE
|`quota-revert-to-default`
|Сброс квоты до дефолтных значений

|ACTION_SERVER_GROUPS_CREATE
|`server-groups-create`
|Создание групп серверов

|ACTION_SERVER_GROUPS_DELETE
|`server-groups-delete`
|Удаление групп серверов

|ACTION_TAGS_DELETE
|`tags-delete`
|Удаление тегов

|ACTION_TAG_DELETE
|`tags-delete`
|Удаление тега

|ACTION_TAG_UPDATE
|`tag-create`
|Замена тега

|===
{/caption}

## {heading(Список событий Cinder)[id=audit_event_cinder]}

{caption(Таблица {counter(table)[id=numb_tab_cinder]} — События компонента Cinder v2)[align=right;position=above;id=tab_cinder;number={const(numb_tab_cinder)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_FORCE_DELETE_BACKUP
|`force-delete-backup`
|Принудительное удаление резервной копии

|ACTION_ACCEPT_VOLUME_TRANSFER
|`accept-volume-transfer`
|Разрешение на перенос тома

|ACTION_CREATE_VOLUME_TRANSFER
|`create-volume-transfer`
|Запуск переноса тома

|ACTION_DELETE_VOLUME_TRANSFER
|`delete-volume-transfer`
|Удаление перенесенного тома

|ACTION_DELETE_BACKUP
|`delete-backup`
|Удаление резервной копии

|ACTION_RESTORE_BACKUP 
|`restore-backup`
|Восстановление резервной копии

|ACTION_CREATE_BACKUP 
|`create-backup`
|Создание резервной копии

|ACTION_RESET_SNAPSHOT_STATUS 
|`reset-snapshot-status`
|Сброс состояния снепшота

|ACTION_CREATE_SNAPSHOT 
|`create-snapshot`
|Создание снепшота

|ACTION_UPDATE_SNAPSHOT_METADATA 
|`update-snapshot-metadata`
|Обновление метаданных снепшота

|ACTION_UPDATE_SNAPSHOT 
|`update-snapshot`
|Обновление снепшота

|ACTION_DELETE_SNAPSHOT 
|`delete-snapshot`
|Удаление снепшота

|ACTION_VOLUME_TYPE 
|`volume-type-action`
|Действие с типом тома

|ACTION_CREATE_CONSISTENCY_GROUP 
|`create-consistency-group`
|Создание группы согласованности

|ACTION_CREATE_CONSISTENCY_GROUP_FROM_SOURCE
|`create-consistency-group-from-source`
|Создание группы согласованности из источника

|ACTION_DELETE_CONSISTENCY_GROUP 
|`delete-consistency-group`
|Удаление группы согласованности

|ACTION_UPDATE_CONSISTENCY_GROUP 
|`update-consistency-group`
|Обновление группы согласованности

|ACTION_EXTEND_VOLUME_SIZE 
|`extend-volume-size`
|Расширение размера тома

|ACTION_MANAGE_EXISTING_VOLUME 
|`manage-existing-volume`
|Управление существующим томом

|ACTION_UNSET_KEYS_IN_QOS_SPECIFICATION
|`unset-keys-in-qos-specification`
|Отключение ключей спецификации QoS

|ACTION_SET_KEYS_IN_QOS_SPECIFICATION
|`set-keys-in-qos-specification`
|Установка ключей спецификации QoS 

|ACTION_DELETE_QOS_SPECIFICATION 
|`delete-qos-specification`
|Удаление спецификации QoS

|ACTION_CREATE_QOS_SPECIFICATION 
|`create-qos-specification`
|Создание спецификации QoS

|ACTION_UPDATE_QUOTAS_FOR_USER 
|`update-quotas-for-user`
|Обновление квот пользователя

|ACTION_DELETE_QUOTAS_FOR_USER 
|`delete-quotas-for-user`
|Удаление квот пользователя

|ACTION_UPDATE_QUOTAS 
|`update-quotas`
|Обновление квот

|ACTION_DELETE_QUOTAS 
|`delete-quotas`
|Удаление квот

|ACTION_CREATE_VOLUME 
|`create-volume`
|Создание тома

|ACTION_UPDATE_VOLUME 
|`update-volume`
|Обновление тома

|ACTION_DELETE_VOLUME 
|`delete-volume`
|Удаление тома

|ACTION_CREATE_VOLUME_METADATA 
|`create-volume-metadata`
|Создание метадаты тома

|ACTION_UPDATE_VOLUME_METADATA
|`update-volume-metadata`
|Обновление методаты тома

|ACTION_DELETE_CONSISTENCY_GROUP_SNAPSHOT 
|`delete-consistency-group-snapshot`
|Удаление группы последовательности снепшота

|ACTION_CREATE_CONSISTENCY_GROUP_SNAPSHOT 
|`create-consistency-group-snapshot`
|Создание группы последовательности снепшота

|ACTION_UPDATE_VOLUME_TYPE 
|`update-volume-type`
|Изменение типа тома

|ACTION_DELETE_VOLUME_TYPE 
|`delete-volume-type`
|Удаление типа тома

|ACTION_CREATE_VOLUME_TYPE 
|`create-volume-type`
|Установка типа тома

|ACTION_VOLUME 
|`action-volume`
|Действие с томом

|===
{/caption}

{caption(Таблица {counter(table)[id=numb_tab_cinder_v3]} — События компонента Cinder v3)[align=right;position=above;id=tab_cinder_v3;number={const(numb_tab_cinder_v3)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_ACCEPT_VOLUME_TRANSFER
|`accept-volume-transfer`
|Разрешение на перенос тома

|ACTION_CREATE_VOLUME_TRANSFER 
|`create-volume-transfer`
|Запуск переноса тома

|ACTION_DELETE_VOLUME_TRANSFER 
|`delete-volume-transfer`
|Удаление перенесенного тома

|ACTION_FORCE_DELETE_BACKUP 
|`force-delete-backup`
|Принудительное удаление резервной копии

|ACTION_DELETE_GROUP_SNAPSHOT 
|`delete-group-snapshot`
|Удаление группы снепшотов

|ACTION_CREATE_GROUP_SNAPSHOT 
|`create-group-snapshot`
|Создание группы снепшотов

|ACTION_DELETE_BACKUP
|`delete-backup`
|Удаление резервной копии

|ACTION_RESTORE_BACKUP 
|`restore-backup`
|Восстановление резервной копии

|ACTION_CREATE_BACKUP 
|`create-backup`
|Создание резервной копии

|ACTION_ADD_PRIVATE_VOLUME_TYPE_ACCESS_TO_PROJECT 
|`add-private-volume-type-access-to-project`
|Добавление частному типу тома доступ в проект

|ACTION_CREATE_CONSISTENCY_GROUP 
|`create-consistency-group`
|Создание группы согласованности

|ACTION_CREATE_CONSISTENCY_GROUP_FROM_SOURCE
|`create-consistency-group-from-source`
|Создание группы согласованности из источника

|ACTION_DELETE_CONSISTENCY_GROUP 
|`delete-consistency-group`
|Удаление группы согласованности

|ACTION_UPDATE_CONSISTENCY_GROUP 
|`update-consistency-group`
|Обновление группы согласованности

|ACTION_UNSET_KEYS_IN_QOS_SPECIFICATION 
|`unset-keys-in-qos-specification`
|Отключение ключей в QoS-спецификации

|ACTION_SET_KEYS_IN_QOS_SPECIFICATION 
|`set-keys-in-qos-specification`
|Установка ключей в QoS-спецификации

|ACTION_DELETE_QOS_SPECIFICATION 
|`delete-qos-specification`
|Удаление QoS-спецификации

|ACTION_CREATE_QOS_SPECIFICATION 
|`create-qos-specification`
|Создание QoS-спецификации

|ACTION_EXTEND_VOLUME_SIZE 
|`extend-volume-size`
|Увеличение размер тома

|ACTION_CREATE_VOLUME 
|`create-volume`
|Создание тома

|ACTION_UPDATE_VOLUME 
|`update-volume`
|Обновление тома

|ACTION_DELETE_VOLUME 
|`delete-volume`
|Удаление тома

|ACTION_CREATE_METADATA_FOR_VOLUME 
|`create-metadata-for-volume`
|Создание метаданных тома

|ACTION_UPDATE_VOLUME_METADATA 
|`update-volume-metadata`
|Обновление метаданных тома

|ACTION_MANAGE_AN_EXISTING_VOLUME 
|`manage-an-existing-volume`
|Управление существующим томом

|ACTION_RESET_SNAPSHOT_STATUS 
|`reset-snapshot-status`
|Сброс состояния снепшота

|ACTION_UPDATE_GROUP_TYPE 
|`update-group-type`
|Изменение типа группы

|ACTION_CREATE_GROUP_SPECS_FOR_GROUP_TYPE
|`create-group-specs-for-group-type`
|Создание группы определенного типа

|ACTION_DELETE_GROUP_TYPE 
|`delete-group-type`
|Удаление типа группы

|ACTION_CREATE_GROUP_TYPE 
|`create-group-type`
|Создание типа группы

|ACTION_UPDATE_QUOTAS_FOR_USER 
|`update-quotas-for-user`
|Обновление квот пользователей

|ACTION_DELETE_QUOTAS_FOR_USER 
|`delete-quotas-for-user`
|Удаление квот пользователей

|ACTION_UPDATE_QUOTAS_FOR_PROJECT 
|`update-quotas-for-project`
|Обновление квот проекта

|ACTION_DELETE_QUOTAS_FOR_PROJECT 
|`delete-quotas-for-project`
|Удаление квот проекта

|ACTION_UPDATE_VOLUME_TYPE 
|`update-volume-type`
|Обновление типа тома

|ACTION_DELETE_VOLUME_TYPE 
|`delete-volume-type`
|Удаление типа тома

|ACTION_CREATE_VOLUME_TYPE 
|`create-volume-type`
|Создание типа тома

|ACTION_CREATE_AN_ENCRYPTION_TYPE 
|`create-an-encryption-type`
|Создание типа шифрования

|ACTION_UPDATE_AN_ENCRYPTION_TYPE 
|`update-an-encryption-type`
|Обновление типа шифрования

|ACTION_CREATE_GROUP 
|`create-group`
|Создание группы

|ACTION_CREATE_GROUP_FROM_SOURCE 
|`create-group-from-source`
|Создание группы из источника

|ACTION_DELETE_GROUP 
|`delete-group`
|Удаление группы

|ACTION_UPDATE_GROUP 
|`update-group`
|Обновление группы

|ACTION_CREATE_SNAPSHOT 
|`create-snapshot`
|Создание снепшота

|ACTION_UPDATE_SNAPSHOT_METADATA 
|`update-snapshot-metadata`
|Обновление метаданных снепшота

|ACTION_UPDATE_SNAPSHOT 
|`update-snapshot`
|Обновление снепшота

|ACTION_DELETE_SNAPSHOT 
|`delete-snapshot`
|Удаление снепшота

|ACTION_DELETE_CONSISTENCY_GROUP_SNAPSHOT 
|`delete-consistency-group-snapshot`
|Удаление группы последовательности снепшота

|ACTION_CREATE_CONSISTENCY_GROUP_SNAPSHOT
|`create-consistency-group-snapshot`
|Создание группы последовательности снепшота

|===
{/caption}

## {heading(Список событий Neutron/Sprut)[id=audit_event_neutron]}

{caption(Таблица {counter(table)[id=numb_tab_neutron]} — События компонента Neutron)[align=right;position=above;id=tab_neutron;number={const(numb_tab_neutron)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CREATE_SUBNET 
|`create-subnet`
|Создание подсети

|ACTION_UPDATE_SUBNET 
|`update-subnet`
|Обновление подсети

|ACTION_DELETE_SUBNET 
|`delete-subnet`
|Удаление подсети

|ACTION_CREATE_FIREWALL_GROUP 
|`create-firewall-group`
|Создание группы межсетевых экранов

|ACTION_UPDATE_FIREWALL_GROUP 
|`update-firewall-group`
|Обновление группы межсетевых экранов

|ACTION_DELETE_FIREWALL_GROUP 
|`delete-firewall-group`
|Удаление группы межсетевых экранов

|ACTION_CREATE_FIREWALL_POLICY 
|`create-firewall-policy`
|Создание политики межсетевого экрана

|ACTION_UPDATE_FIREWALL_POLICY 
|`update-firewall-policy`
|Обновление политики межсетевого экрана

|ACTION_DELETE_FIREWALL_POLICY 
|`delete-firewall-policy`
|Удаление политики межсетевого экрана

|ACTION_CREATE_FIREWALL_RULE 
|`create-firewall-rule`
|Создание правил межсетевого экрана

|ACTION_UPDATE_FIREWALL_RULE 
|`update-firewall-rule`
|Обновление правил межсетевого экрана

|ACTION_DELETE_FIREWALL_RULE 
|`delete-firewall-rule`
|Удаление правил межсетевого экрана

|ACTION_INSERT_RULE_INTO_FIREWALL_POLICY 
|`insert-rule-into-firewall-policy`
|Восстановление правила в политике межсетевого экрана

|ACTION_REMOVE_RULE_FROM_FIREWALL_POLICY 
|`remove-rule-from-firewall-policy`
|Удаление правила в политике межсетевого экрана

|ACTION_CREATE_SECURITY_GROUP 
|`create-security-group`
|Создание группы безопасности

|ACTION_UPDATE_SECURITY_GROUP 
|`update-security-group`
|Обновление группы безопасности

|ACTION_DELETE_SECURITY_GROUP 
|`delete-security-group`
|Удаление группы безопасности

|ACTION_CREATE_SECURITY_GROUP_RULE 
|`create-security-group-rule`
|Создание правил группы безопасности

|ACTION_DELETE_SECURITY_GROUP_RULE 
|`delete-security-group-rule`
|Удаление правил группы безопасности

|ACTION_CREATE_FIREWALL 
|`create-firewall`
|Создание межсетевого экрана

|ACTION_UPDATE_FIREWALL 
|`update-firewall`
|Обновление межсетевого экрана

|ACTION_DELETE_FIREWALL 
|`delete-firewall`
|Удаление межсетевого экрана

|ACTION_CREATE_VLAN_TRANSPARENT_NETWORK 
|`create-vlan-transparent-network`
|Создание прозрачной VLAN-сети

|ACTION_CREATE_LOAD_BALANCER_POOL 
|`create-load-balancer-pool`
|Создание пула балансировщика нагрузки

|ACTION_CREATE_LOAD_BALANCER_VIP 
|`create-load-balancer-vip`
|Создание балансировщика нагрузки с виртуальным IP-адресом

|ACTION_UPDATE_VIP 
|`update-vip`
|Обновление виртуального IP-адреса

|ACTION_DELETE_VIP 
|`delete-vip`
|Удаление виртуального IP-адреса

|ACTION_CREATE_LOAD_BALANCER_MEMBER 
|`create-load-balancer-member`
|Создание объекта балансировщика нагрузки

|ACTION_UPDATE_MEMBER 
|`update-member`
|Обновление объекта балансировщика нагрузки

|ACTION_DELETE_MEMBER 
|`delete-member`
|Удаление объекта балансировщика нагрузки

|ACTION_CREATE_LOAD_BALANCER_HEALTH_MONITOR
|`create-load-balancer-health-monitor`
|Создание объекта мониторинга балансировщика нагрузки

|ACTION_UPDATE_HEALTH_MONITOR 
|`update-health-monitor`
|Обновление объекта мониторинга балансировщика нагрузки

|ACTION_DELETE_HEALTH_MONITOR 
|`delete-health-monitor`
|Удаление объекта мониторинга балансировщика нагрузки

|ACTION_ASSOCIATE_HEALTH_MONITOR_WITH_POOL
|`associate-health-monitor-with-pool`
|Подключение объекта мониторинга к пулу

|ACTION_DISASSOCIATE_HEALTH_MONITOR_FROM_POOL 
|`disassociate-health-monitor-from-pool`
|Отключение объекта мониторинга от пула

|ACTION_UPDATE_QUOTA_FOR_PROJECT 
|`update-quota-for-project`
|Обновление квот для проекта

|ACTION_RESET_QUOTA_FOR_PROJECT 
|`reset-quota-for-project`
|Перезагрузка квоты для проекта

|ACTION_CREATE_LOAD_BALANCER 
|`create-load-balancer`
|Создание балансировщика нагрузки

|ACTION_UPDATE_LOAD_BALANCER 
|`update-load-balancer`
|Обновление балансировщика нагрузки

|ACTION_REMOVE_LOAD_BALANCER 
|`remove-load-balancer`
|Удаление балансировщика нагрузки

|ACTION_CREATE_LISTENER 
|`create-listener`
|Создание прослушивателя

|ACTION_UPDATE_LISTENER 
|`update-listener`
|Обновление прослушивателя

|ACTION_REMOVE_LISTENER 
|`remove-listener`
|Удаление прослушивателя

|ACTION_CREATE_POOL 
|`create-pool`
|Создание пула

|ACTION_UPDATE_POOL 
|`update-pool`
|Обновление пула

|ACTION_REMOVE_POOL 
|`remove-pool`
|Удаление пула

|ACTION_ADD_MEMBER_TO_POOL 
|`add-member-to-pool`
|Добавление объекта пула

|ACTION_UPDATE_POOL_MEMBER 
|`update-pool-member`
|Обновление объекта пула

|ACTION_REMOVE_MEMBER_FROM_POOL 
|`remove-member-from-pool`
|Удаление объекта из пула

|ACTION_CREATE_HEALTH_MONITOR 
|`create-health-monitor`
|Создание объекта мониторинга

|ACTION_UPDATE_HEALTH_MONITOR 
|`update-health-monitor`
|Обновление объекта мониторинга

|ACTION_REMOVE_HEALTH_MONITOR 
|`remove-health-monitor`
|Удаление объекта мониторинга

|ACTION_CREATE_TRUNK 
|`create-trunk`
|Создание магистрали

|ACTION_ADD_SUBPORTS_TO_TRUNK 
|`add-subports-to-trunk`
|Добавление субпорта в магистраль

|ACTION_DELETE_SUBPORTS_FROM_TRUNK 
|`delete-subports-from-trunk`
|Удаление субпорта из магистрали

|ACTION_UPDATE_TRUNK 
|`update-trunk`
|Обновление магистрали

|ACTION_DELETE_TRUNK 
|`delete-trunk`
|Удаление магистрали

|ACTION_UPDATE_BANDWIDTH_LIMIT_RULE 
|`update-bandwidth-limit-rule`
|Обновление правил ограничения пропускной способности

|ACTION_DELETE_BANDWIDTH_LIMIT_RULE 
|`delete-bandwidth-limit-rule`
|Удаление правил ограничения пропускной способности

|ACTION_CREATE_QOS_POLICY 
|`create-qos-policy`
|Создание политики QoS

|ACTION_UPDATE_DSCP_MARKING_RULE 
|`update-dscp-marking-rule`
|Обновление DSCP-правила

|ACTION_DELETE_DSCP_MARKING_RULE 
|`delete-dscp-marking-rule`
|Удаление DSCP-правила

|ACTION_CREATE_DSCP_MARKING_RULE 
|`create-dscp-marking-rule`
|Создание DSCP-правила

|ACTION_UPDATE_QOS_POLICY 
|`update-qos-policy`
|Обновление политики QoS

|ACTION_DELETE_QOS_POLICY 
|`delete-qos-policy`
|Удаление политики QoS

|ACTION_CREATE_BANDWIDTH_LIMIT_RULE
|`create-bandwidth-limit-rule`
|Создание ограничения пропускной способности

|ACTION_CREATE_FLOATING_IP 
|`create-floating-ip`
|Создание плавающего IP-адреса

|ACTION_UPDATE_FLOATING_IP 
|`update-floating-ip`
|Обновление плавающего IP-адреса

|ACTION_DELETE_FLOATING_IP
|`delete-floating-ip`
|Удаление плавающего IP-адреса

|ACTION_CREATE_FLAVOR 
|`create-flavor`
|Создание флейвора

|ACTION_UPDATE_FLAVOR 
|`update-flavor`
|Обновление флейвора

|ACTION_DELETE_FLAVOR
|`delete-flavor`
|Удаление флейвора

|ACTION_ASSOCIATE_FLAVOR_WITH_SERVICE_PROFILE 
|`associate-flavor-with-service-profile`
|Подключение флейвора к сервисной учетной записи

|ACTION_DISASSOCIATE_FLAVOR 
|`disassociate-flavor`
|Отключение флейвора

|ACTION_CREATE_SERVICE_PROFILE 
|`create-service-profile`
|Создание сервисной учетной записи

|ACTION_UPDATE_SERVICE_PROFILE
|`update-service-profile`
|Обновление сервисной учетной записи

|ACTION_DELETE_SERVICE_PROFILE 
|`delete-service-profile`
|Удаление сервисной учетной записи

|ACTION_CREATE_IKE_POLICY 
|`create-ike-policy`
|Создание политики IKE

|ACTION_UPDATE_IKE_POLICY
|`update-ike-policy`
|Обновление политики IKE

|ACTION_REMOVE_IKE_POLICY
|`remove-ike-policy`
|Удаление политики IKE

|ACTION_CREATE_IPSEC_POLICY
|`create-ipsec-policy`
|Создание политики IPSEC

|ACTION_UPDATE_IPSEC_POLICY 
|`update-ipsec-policy`
|Обновление политики IPSEC

|ACTION_REMOVE_IPSEC_POLICY 
|`remove-ipsec-policy`
|Удаление политики IPSEC

|ACTION_CREATE_IPSEC_CONNECTION
|`create-ipsec-connection`
|Создание IPSEC-соединения

|ACTION_UPDATE_IPSEC_CONNECTION
|`update-ipsec-connection`
|Обновление IPSEC-соединения

|ACTION_REMOVE_IPSEC_CONNECTION
|`remove-ipsec-connection`
|Удаление IPSEC-соединения

|ACTION_CREATE_VPN_ENDPOINT_GROUP
|`create-vpn-endpoint-group`
|Создание групп туннелей VPN

|ACTION_UPDATE_VPN_ENDPOINT_GROUP
|`update-vpn-endpoint-group`
|Обновление групп туннелей VPN

|ACTION_REMOVE_VPN_ENDPOINT_GROUP
|`remove-vpn-endpoint-group`
|Удаление групп туннелей VPN

|ACTION_CREATE_VPN_SERVICE
|`create-vpn-service`
|Создание сервиса VPN

|ACTION_UPDATE_VPN_SERVICE
|`update-vpn-service`
|Обновление сервиса VPN

|ACTION_REMOVE_VPN_SERVICE
|`remove-vpn-service`
|Удаление сервиса VPN

|ACTION_UPDATE_SEGMENT
|`update-segment`
|Обновление сегмента

|ACTION_DELETE_SEGMENT
|`delete-segment`
|Удаление сегмента

|ACTION_CREATE_SEGMENT 
|`create-segment`
|Создание сегмента

|ACTION_CREATE_ROUTER 
|`create-router`
|Создание маршрутизатора

|ACTION_UPDATE_ROUTER 
|`update-router`
|Обновление маршрутизатора

|ACTION_DELETE_ROUTER
|`delete-router`
|Удаление маршрутизатора

|ACTION_ADD_INTERFACE_TO_ROUTER 
|`add-interface-to-router`
|Добавление интерфейса для роутера

|ACTION_REMOVE_INTERFACE_FROM_ROUTER 
|`remove-interface-from-router`
|Удаление интерфейса для роутера

|ACTION_UPDATE_NETWORK 
|`update-network`
|Обновление сети

|ACTION_DELETE_NETWORK 
|`delete-network`
|Удаление сети

|ACTION_CREATE_NETWORK
|`create-network`
|Создание сети

|ACTION_REPLACE_ALL_TAGS 
|`replace-all-tags`
|Замена всех тегов

|ACTION_REMOVE_ALL_TAGS 
|`remove-all-tags`
|Удаление всех тегов

|ACTION_ADD_TAG 
|`add-tag`
|Добавление тега

|ACTION_REMOVE_TAG 
|`remove-tag`
|Удаление тега

|ACTION_UPDATE_SUBNET_POOL 
|`update-subnet-pool`
|Обновление пула подсети

|ACTION_DELETE_SUBNET_POOL
|`delete-subnet-pool`
|Удаление пула подсети

|ACTION_CREATE_SUBNET_POOL 
|`create-subnet-pool`
|Создание пула подсети

|ACTION_UPDATE_PORT
|`update-port`
|Обновление порта

|ACTION_DELETE_PORT 
|`delete-port`
|Удаление порта

|ACTION_CREATE_PORT 
|`create-port`
|Создание порта

|ACTION_CREATE_METERING_LABEL 
|`create-metering-label`
|Создание метки измерения

|ACTION_DELETE_METERING_LABEL 
|`delete-metering-label`
|Удаление метки измерения

|ACTION_CREATE_METERING_LABEL_RULE
|`create-metering-label-rule`
|Создание метки измерения

|ACTION_DELETE_METERING_LABEL_RULE
|`delete-metering-label-rule`
|Удаление метки измерения

|===
{/caption}

## {heading(Список событий Octavia)[id=audit_event_octavia]}

{caption(Таблица {counter(table)[id=numb_tab_octavia]} — События компонента Octavia)[align=right;position=above;id=tab_octavia;number={const(numb_tab_octavia)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_BATCH_UPDATE_MEMBERS
|`batch-update-members`
|Пакетное обновление объектов

|ACTION_REMOVE_MEMBER 
|`remove-member`
|Удаление объекта

|ACTION_REMOVE_POOL   
|`remove-pool`
|Удаление пула

|ACTION_REMOVE_LISTENER  
|`remove-listener`
|Удаление прослушивателя

|ACTION_CREATE_FLAVOR_PROFILE  
|`create-flavor-profile`
|Создание флейвора учетной записи 

|ACTION_UPDATE_FLAVOR_PROFILE  
|`update-flavor-profile`
|Обновление флейвора учетной записи 

|ACTION_REMOVE_FLAVOR_PROFILE
|`remove-flavor-profile`
|Удаление флейвора учетной записи 

|ACTION_CONFIGURE_AMPHORA  
|`configure-amphora`
|Настройка Amphora

|ACTION_FAILOVER_AMPHORA  
|`failover-amphora`
|Преподключение Amphora

|ACTION_CREATE_AN_L7_POLICY  
|`create-an-l7-policy`
|Создание политики L7

|ACTION_UPDATE_L7_POLICY  
|`update-l7-policy`
|Обновление политики L7

|ACTION_REMOVE_L7_POLICY  
|`remove-l7-policy`
|Удаление политики L7

|ACTION_REMOVE_HEALTH_MONITOR  
|`remove-health-monitor`
|Удаление объекта мониторинга

|ACTION_RESET_QUOTA  
|`reset-quota`
|Повторная установка квот

|ACTION_REMOVE_LOAD_BALANCER  
|`remove-load-balancer`
|Удаление балансировщика нагрузки

|ACTION_FAILOVER_LOAD_BALANCER  
|`failover-load-balancer`
|Переподключение балансировщика нагрузги

|ACTION_CREATE_L7_RULE  
|`create-an-l7-rule`
|Создание правила L7

|ACTION_UPDATE_L7_RULE  
|`update-l7-rule`
|Обновление правила L7

|ACTION_REMOVE_L7_RULE  
|`remove-l7-rule`
|Удаление правила L7

|ACTION_CREATE_FLAVOR  
|`create-flavor`
|Создание флейвора

|ACTION_UPDATE_FLAVOR  
|`update-flavor`
|Обновление флейвора

|ACTION_REMOVE_FLAVOR  
|`remove-flavor`
|Удаление флейвора

|ACTION_CREATE_LOAD_BALANCER  
|`create-load-balancer`
|Создание балансировщика нагрузки

|ACTION_UPDATE_LOAD_BALANCER  
|`update-load-balancer`
|Обновление балансировщика нагрузки

|ACTION_DELETE_LOAD_BALANCER
|`delete-load-balancer`
|Удаление балансировщика нагрузки

|ACTION_DELETE_LOAD_BALANCER_CASCADE  
|`delete-load-balancer-cascade`
|Каскадное удаление балансировщиков нагрузки

|ACTION_CREATE_LISTENER  
|`create-listener`
|Создание прослушивателя

|ACTION_UPDATE_LISTENER  
|`update-listener`
|Обновление прослушивателя 

|ACTION_DELETE_LISTENER  
|`delete-listener`
|Удаление прослушивателя

|ACTION_CREATE_POOL  
|`create-pool`
|Создание пула

|ACTION_UPDATE_POOL  
|`update-pool`
|Обновление пула

|ACTION_DELETE_POOL  
|`delete-pool`
|Удаление пула

|ACTION_CREATE_HEALTH_MONITOR  
|`create-health-monitor`
|Создание объекта мониторинга

|ACTION_UPDATE_HEALTH_MONITOR  
|`update-health-monitor`
|Обновление объекта мониторинга

|ACTION_CREATE_LAYER_7_POLICY  
|`create-layer-7-policy`
|Создание политики уровня 7

|ACTION_UPDATE_LAYER_7_POLICY  
|`update-layer-7-policy`
|Обновление политики уровня 7

|ACTION_DELETE_LAYER_7_POLICY  
|`delete-layer-7-policy`
|Удаление политики уровня 7

|ACTION_CREATE_LAYER_7_RULE  
|`create-layer-7-rule`
|Создание правила уровня 7

|ACTION_UPDATE_LAYER_7_RULE  
|`update-layer-7-rule`
|Обновление правила уровня 7

|ACTION_DELETE_LAYER_7_RULE  
|`delete-layer-7-rule`
|Удаление правила уровня 7

|ACTION_UPDATE_QUOTA
|`update-quota`
|Обновление квоты

|ACTION_DELETE_QUOTA  
|`delete-quota`
|Удаление квоты

|===
{/caption}

## {heading(Список событий Magnum)[idaudit_event_magnum]}

{caption(Таблица {counter(table)[id=numb_tab_magnum]} — События компонента Magnum)[align=right;position=above;id=tab_magnum;number={const(numb_tab_magnum)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CERTIFICATE_CREATE
|`certificate-create`
|Создание серитификата

|ACTION_CLUSTERACTION_CREATE
|`clustersaction-create`
|Создание действия с кластером

|ACTION_CLUSTERMIGRATION_CREATE
|`clustermigration-create`
|Запуск миграции кластера 

|ACTION_CLUSTERTEMPLATE_CREATE
|`clustertemplate-create`
|Создание шаблона кластера

|ACTION_CLUSTER_CREATE
|`cluster-create`
|Создание кластера

|ACTION_CLUSTER_ACTION_CREATE
|`cluster-action-create`
|Действия по созданию кластера

|ACTION_KUBECONFIG_CREATE
|`kubeconfig-create`
|Создание Kubeconfig

|ACTION_MAINTENANCE_CREATE
|`maintenance-create`
|Действия по обслуживанию кластера

|ACTION_NODEGROUP_CREATE
|`nodegroup-create`
|Создание группы узлов

|ACTION_NODEGROUP_ACTION_CREATE
|`nodegroup-action-create`
|Действия по созданию группы узлов

|ACTION_NODEGROUP_NODE_RECREATE
|`nodegroup-node-recreate`
|Перезапуск группы узлов

|ACTION_QUOTA_CREATE
|`quotas-create`
|Установка квот

|ACTION_CERTIFICATE_UPDATE
|`certificate-update`
|Обновление сертификата

|ACTION_CLUSTER_ACTION_UPDATE
|`cluster-action-update`
|Действия по обновлению кластера

|ACTION_CLUSTERTEMPLATE_UPDATE
|`clustertemplate-update`
|Обновление шаблона кластера

|ACTION_CLUSTER_UPDATE
|`cluster-update`
|Обновление кластера

|ACTION_MAINTENANCE_UPDATE
|`maintenance-update`
|Обновление действий по обслуживанию кластера

|ACTION_SECRET_UPDATE
|`secret-update`
|Обновление секрета

|ACTION_NODEGROUP_UPDATE
|`nodegroup-update`
|Обновление группы узлов

|ACTION_NODEGROUP_ACTION_SCALE
|`nodegroup-action-scale`
|Масштабирование группы узлов

|ACTION_NODEGROUP_ACTION_RESIZE
|`nodegroup-action-resize`
|Обновление размера группы узлов

|ACTION_NODEGROUP_NODE_UPDATE
|`nodegroup-node-update`
|Обновление узла в группе узлов

|ACTION_QUOTA_UPDATE
|`quotas-update`
|Обновление квот

|ACTION_CLUSTER_DELETE
|`cluster-delete`
|Удаление кластера

|ACTION_CLUSTERMIGRATION_DELETE
|`clustermigration-delete`
|Остановка миграции кластера

|ACTION_CLUSTERTEMPLATE_DELETE
|`clustertemplate-delete`
|Удаление шаблона кластера

|ACTION_NODEGROUP_DELETE
|`nodegroup-delete`
|Удаление группы узлов

|ACTION_NODEGROUP_NODE_DELETE
|`nodegroup-node-delete`
|Удаление узла в группе узлов

|ACTION_QUOTA_DELETE
|`quotas-delete`
|Удаление квоты

|===
{/caption}

## {heading(Список событий Trove)[idaudit_event_trove]}

{caption(Таблица {counter(table)[id=numb_tab_trove]} — События компонента Trove)[align=right;position=above;id=tab_trove;number={const(numb_tab_trove)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CREATE_INSTANCE
|`instance-create`
|Создание инстанса БД

|ACTION_UPDATE_INSTANCE  
|`instance-update`
|Обновление инстанса БД

|ACTION_DELETE_INSTANCE  
|`instance-delete`
|Удаление инстанса БД

|ACTION_INSTANCE_ACTION  
|`instance-action`
|Действия с инстансом БД

|ACTION_CREATE_CLUSTER
|`cluster-create`
|Создание кластера БД

|ACTION_CLUSTER_ACTION  
|`cluster-action`
|Действие с кластером БД

|ACTION_DELETE_CLUSTER  
|`cluster-delete`
|Удаление кластера БД

|ACTION_UPDATE_CLUSTER  
|`cluster-update`
|Обновление кластера БД

|ACTION_SCHEDULE_BACKUP  
|`backup-schedule`
|Установка расписания резервного копирования

|ACTION_CREATE_BACKUP  
|`backup-create`
|Создание резервной копии

|ACTION_DELETE_BACKUP  
|`backup-delete`
|Удаление резервной копии

|ACTION_CREATE_CONFIGURATION  
|`configuration-create`
|Создание конфигурации

|ACTION_UPDATE_CONFIGURATION 
|`configuration-update`
|Обновление конфигурации

|ACTION_APPLY_CONFIGURATION  
|`configuration-apply`
|Применение конфигурации

|ACTION_CREATE_DATABASE
|`database-create`
|Создание БД

|ACTION_DELETE_DATABASE  
|`database-delete`
|Удаление БД

|ACTION_UPDATE_DATABASE
|`database-update`
|Обновление БД

|ACTION_CREATE_USER  
|`user-create`
|Создание пользователя БД

|ACTION_SET_USERS_PASSWORDS  
|`users-passwords-set`
|Установка пароля пользователя БД

|ACTION_DELETE_USER  
|`user-delete`
|Удаление пользователя БД

|ACTION_UPDATE_USER  
|`user-update`
|Обновление пользователя БД

|ACTION_ENABLE_ROOT  
|`root-enable`
|Включение root-доступа

|ACTION_DISABLE_ROOT  
|`root-disable`
|Отключение root-доступа

|===
{/caption}


## {heading(Список событий Магазина приложений)[id=audit_event_xaas]}

{caption(Таблица {counter(table)[id=numb_tab_xaas]} — События Магазина приложений)[align=right;position=above;id=tab_xaas;number={const(numb_tab_xaas)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CONSUMER_INSTANCE_CREATE
|`consumer-instance-create`
|Заказ инстанса сервиса в Магазине приложений

|ACTION_CONSUMER_INSTANCE_DEPLOY_START
|`consumer-instance-deploy-start`
|Развертывание инстанса сервиса в Магазине приложений

|ACTION_CONSUMER_INSTANCE_DEPLOY_START
|`consumer-instance-deploy-start`
|Развертывание инстанса сервиса в Магазине приложений

|ACTION_CONSUMER_INSTANCE_UPDATE_START
|`consumer-instance-update-start`
|Изменение тарифного плана и тарифной опции у существующего инстанса

|ACTION_CONSUMER_BINDING_REFRESH_START
|`consumer-binding-refresh-start`
|Обновление доступов к существующему инстансу сервиса

|ACTION_CONSUMER_INSTANCE_DELETE
|`consumer-instance-delete`
|Удаление существующего инстанса сервиса

|ACTION_ADMIN_AUTHENTICATION
|`admin-authentication`
|Аутентификация в Магазине приложений под учетной записью администратора {var(sys2)}

|ACTION_ADMIN_SERVICE_TOKEN_CREATE
|`admin-service-token-create`
|Создание сервисного ключа для поставщика и привязанных к этому ключу пространств имен

|ACTION_ADMIN_BROCKER_CREATE
|`admin-broker-create`
|Регистрация брокера приложений

|ACTION_ADMIN_SPACE_CREATE
|`admin-space-create`
|Создание тестовых и продовых пространств имен для сервисов

|ACTION_ADMIN_USER_ADD_SPACES
|`admin-user-add-spaces`
|Добавление пользователей в пространство имен

|ACTION_SERVICE_PUBLISH
|`admin-service-publish`
|Публикация приложений (image-base, SaaS)

|ACTION_SERVICE_UNPUBLISH
|`admin-service-unpublish`
|Удаление из публичного спейса приложений (image-base, SaaS)

|ACTION_ADMIN_ADD_DEV_PID
|`admin-add-dev-pid`
|Добавление OpenStack PID в список поставщиков

|ACTION_ADMIN_REMOVE_DEV_PID
|`admin-remove-dev-pid`
|Удаление OpenStack PID из списка поставщиков

|ACTION_XAAS_SERVICE_CREATE
|`xaas-service-create`
|Добавление приложений 

|ACTION_XAAS_SERVICE_ARCHIVE
|`xaas-service-archive`
|Архивирование приложений
|===
{/caption}

## {heading(Список событий Cloud Audit)[id=audit_event_ca]}

{caption(Таблица {counter(table)[id=numb_tab_ca]} — События сервиса Cloud Audit)[align=right;position=above;id=tab_ca;number={const(numb_tab_ca)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_LIST
|`read-request`
|Чтение журнала

|ACTION_TSV
|`tsv`
|Выгрузка журнала в формате TSV

|ACTION_CREATE_EXPORT
|`create_export`
|Создание настроек экспорта

|ACTION_UPDATE_EXPORT
|`update_export_settings`
|Обновление настроек экспорта

|ACTION_UPDATE_CERTIFICATE
|`update-certificate`
|Обновление/удаление клиентского сертификата в настройках экспорта

|ACTION_DELETE_EXPORT
|`delete_export`
|Удаление настроек экспорта

|ACTION_VERIFY_EXPORT
|`verify_export`
|Проверка настроек экспорта путем отправки health-check сообщения

|ACTION_ENABLE_EXPORT
|`enable_export`
|Экспорт активирован

|ACTION_DISABLE_EXPORT
|`disable_export`
|Экспорт деактивирован

|ACTION_BLOCK_EXPORT
|`block_export`
|Экспорт заблокирован

|ACTION_UNBLOCK_EXPORT
|`unblock_export`
|Экспорт разблокирован

|ACTION_UPDATE_EXPORT_QUEUE_LIMITS
|`update_export_queue_limits`
|Обновление лимитов очереди для настроек экспорта

|ACTION_DELETE_EXPORT_QUEUE_LIMITS
|`delete_export_queue_limits`
|Удаление лимитов очереди для настроек экспорта

|===
{/caption}

## {heading(Список событий Cloud Logging)[id=audit_event_cl]}

{caption(Таблица {counter(table)[id=numb_tab_cl]} — События сервиса Cloud Logging)[align=right;position=above;id=tab_cl;number={const(numb_tab_cl)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CREATING_SERVICE_ACCOUNT
|`creating_service_account`
|Создание сервисного пользователя

|ACTION_CREATING_SERVICE
|`creating_service`
|Создание настроек для пользовательского сервиса

|ACTION_LISTING_SERVICE
|`listing_services`
|Получение списка настроек для сервисов

|ACTION_GETTING_SERVICE
|`getting_service`
|Получение настроек сервиса

|ACTION_UPDATING_SERVICE
|`updating_service`
|Обновление настроек сервиса

|ACTION_DELETING_SERVICE
|`deleting_service`
|Удаление настроек сервиса

|===
{/caption}

## {heading(Список событий Cloud Monitoring)[id=audit_event_cm]}

{caption(Таблица {counter(table)[id=numb_tab_cm]} — События сервиса Cloud Monitoring)[align=right;position=above;id=tab_cm;number={const(numb_tab_cm)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CREATE_SERVICE_USER
|`create_service_user`
|Создание сервисного пользователя

|ACTION_MONITORING_SAVE
|`monitoring_dashboards`
|Обновление дашбордов пользователя

|ACTION_MONITORING_SERVICE_DASHBOARDS
|`monitoring_service_dashboard`
|Обновление сервисного дашборда для проекта

|ACTION_MONITORING_SERVICE_DASHBOARDS_DELETE
|`monitoring_service_dashboard-delete`
|Удаление сервисного дашборда для проекта

|===
{/caption}

## {heading(Список событий IAM)[id=audit_event_iam]}

{caption(Таблица {counter(table)[id=numb_tab_iam]} — События IAM)[align=right;position=above;id=tab_iam;number={const(numb_tab_iam)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_USER_SIGNIN
|`login`
|Вход пользователя

|ACTION_USER_SIGNOUT
|`logout`
|Выход пользователя

|===
{/caption}

## {heading(Список событий Keystone)[id=audit_event_keystone]}

{caption(Таблица {counter(table)[id=numb_tab_keystone]} — События Keystone)[align=right;position=above;id=tab_keystone;number={const(numb_tab_keystone)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_USER_AUTHENTICATION
|`user_authentication`
|Аутентификация пользователя по паролю

|ACTION_CHECK_TOKEN
|`check_token`
|Проверка токена

|ACTION_REVOKE_TOKEN
|`revoke_token`
|Отзыв токена

|ACTION_CREATE_POLICY
|`create_policy`
|Создание политики

|ACTION_UPDATE_POLICY
|`update_policy`
|Изменение политики

|ACTION_DELETE_POLICY
|`delete_policy`
|Удаление политики

|ACTION_CREATE_PROJECT
|`create_project`
|Создание проекта

|ACTION_UPDATE_PROJECT
|`update_project`
|Обновление проекта

|ACTION_DELETE_PROJECT
|`delete_project`
|Удаление проекта

|ACTION_CREATE_ROLE
|`create_role`
|Создание роли

|ACTION_UPDATE_ROLE
|`update_role`
|Изменение роли

|ACTION_DELETE_ROLE
|`delete_role`
|Удаление роли

|ACTION_CREATE_USER
|`create_user`
|Создание пользователя

|ACTION_UPDATE_USER
|`update_user`
|Обновление пользователя

|ACTION_DELETE_USER
|`delete_user`
|Удаление пользователя

|ACTION_CHANGE_USER_PASSWORD
|`change_user_password`
|Изменение пароля пользователя

|===
{/caption}

## {heading(Список событий Karboii)[id=audit_event_karboii]}

{caption(Таблица {counter(table)[id=numb_tab_karboii]} — События Karboii)[align=right;position=above;id=tab_keystone;number={const(numb_tab_karboii)}]}

[cols="2,2,5", options="header"]
|===
|Событие
|Значение
|Описание

|ACTION_CREATE_PLAN
|`create plan`
|Cоздание плана резервного копирования

|ACTION_GET_PLAN
|`get plan`
|Получение плана резервного копирования

|ACTION_UPDATE_PLAN
|`update plan`
|Обновление параметров плана резервного копирования

|ACTION_DELETE_PLAN
|`delete plan`
|Удаление плана резервного копирования

|ACTION_CREATE_TRIGGER
|`create trigger`
|Cоздание триггера на резервное копирование

|ACTION_GET_TRIGGER
|`get trigger`
|Получение триггера на резервное копирование

|ACTION_LIST_TRIGGERS
|`list triggers`
|Получение списка триггеров на резервное копирование

|ACTION_UPDATE_TRIGGERS
|`update triggers`
|Обновление триггера на резервное копирование

|ACTION_CREATE_CHECKPOINT
|`create checkpoint`
|Cоздание точки восстановления 

|ACTION_CREATE_CHECKPOINT_META
|`get checkpoint meta`
|Получение информации о метаданных точки восстановления

|ACTION_LIST_CHECKPOINTS
|`list checkpoints`
|Получение списка точек восстановления

|ACTION_LIST_CHECKPOINTS_BY_PLAN
|`list checkpoints_by_plan`
|Получение списка точки восстановления указанного плана

|ACTION_DELETE_CHECKPOINT
|`delete checkpoint`
|Удаление точки восстановления

|ACTION_GET_PROVIDER
|`get provider`
|Получение информации о провайдере

|ACTION_GET_RESOURCES_IN_USE
|`get resources in use`
|Запрос использующихся ресурсов точки восстановления

|ACTION_GET_CHECKPOINTS_STATISTICS
|`get checkpoints statistics`
|Запрос статистики по точкам восстановления

|ACTION_GET_RESTORES_STATISTICS
|`get restores statistics`
|Запрос статистики по восстановлениям сущностей из контрольных точек
|===
{/caption}

