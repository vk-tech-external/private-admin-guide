# {heading(Очистка образов после обновления {var(sys2)})[id=clear_after_upgrade]}

## {heading(Очистка образов контейнеров на управляющих узлах)[id=clear_after_upgrade_image]}

Чтобы удалить образы контейнеров после обновления {var(sys2)}, на всех управляющих узлах выполните команду:

```console
# sudo crictl rmi $<ИМЯ_УЗЛА>{{deloy_host:<ПОРТ>/<ИМЯ_ОБРАЗА>:<ТЕГ>}}
```

Здесь:

* `<ИМЯ_УЗЛА>` — имя деплой-ноды.
* `<ПОРТ>` — порт Docker registry (nexus registry port).
* `<ТЕГ>` — тег с версией образа.

{caption(Пример команд)[align=left;position=above]}
```console
# export DEPLOY_NODE=deploy001.local
# export NEXUS_REGISTRY_PORT=5553
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/beats/filebeat:7.8.0
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/infra/back/policy-service/s2s:4.1.0-rc-20240620
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/infra/iaas/iaas-network/manila-billing:0.0.0-202308231606.gitea62373a
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/infra/paas/karboii-karti:0.0.0-202404110851.gitbf351762
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/infra/paas/magnum:4.2.4-202405231335.git57d8e60d
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/infra/paas/xaas/brokers:0.0.144
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/sre/katana-docs:4.2.30
```
{/caption}

## {heading(Очистка образов контейнеров на узле мониторинга)[id=clear_after_upgrade_monitoring]}

Чтобы удалить образы контейнеров на узле мониторинга, выполните команды: 

```console
# export DEPLOY_NODE=deploy001.local
# export NEXUS_REGISTRY_PORT=5553
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/opensearchproject/opensearch-dashboards:1.3.1
# sudo crictl rmi ${DEPLOY_NODE}:${NEXUS_REGISTRY_PORT}/opensearchproject/opensearch:1.3.1
```

## {heading(Очистка образов дисков в OpenStack)[id=clear_after_upgrade_openstack]}

Чтобы удалить устаревшие образы дисков в OpenStack:

1. Убедитесь, что для компонентов Magnum и Octavia появились новые образы после обновления.

1. На управляющем узле (`cpn002` или `cpn003`) выполните команды:

   ```console
   # sudo su -
   # source openrc.sh
   # openstack image delete amphora-x64-haproxy-202110110805.gitf2ca0ca2
   # openstack image delete almalinux-9-v1.27.6.202404250842.gitb21e5933
   ```
