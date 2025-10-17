# {heading(Управление автоэвакуацией ВМ)[id=autoevacuation_manage]}

## {heading(Настройка параметров автоэвакуации)[id=autoevacuation_settings]}

В конфигурационном файле {var(sys2)} `inventory/vkcloud/group_vars/vkcloud_kube/evacuation_controlleryml` доступны для настройки следующие параметры автоэвакуации:

* `helm_evacuation_controller_OS_SERVICE__CAN_EVACUATE_AGGREGATES` — агрегаты, разрешенные для эвакуации.
* `helm_evacuation_controller_OS_SERVICE__MAX_DOWN_AT_ONCE` — допустимое количество отказавших вычислительных узлов. Большее количество отказавших вычислительных узлов будет считаться массовым отказом, и эвакуация будет отменена.
* `helm_evacuation_controller_OS_IPMI__INTERFACE` — интерфейс взаимодействия с IPMI. Значение параметра может быть `lan` или `lanplus` в зависимости от версии IPMI.
* `helm_evacuation_controller_OS_IPMI__PORT` — порт IPMI.
* `helm_evacuation_controller_OS_IPMI__RETRIES` — количество повторных запросов при неудачном обращении Evacuation Controller к IPMI.
* `helm_evacuation_controller_OS_IPMI__SWITCH_CHECK_INTERVAL` — интервал между проверками питания в секундах.
* `helm_evacuation_controller_OS_IPMI__SWITCH_DEADLINE` — время ожидания включения питания вычислительных узлов в секундах.
* `helm_evacuation_controller_OS_IPMI__TIMEOUT` — время ожидания ответа от IPMI в секундах.
* `helm_evacuation_controller_OS_EVENTS__HANDLER_ZABBIX_PORT` — порт Zabbix.

Чтобы указать логин и пароль IPMI на всех узлах, в файле `vault.yml` в переменные `vault_evacuation_ipmi_login`, `vault_evacuation_ipmi_password` добавьте логин и пароль IPMI.

<warn>

Остальные параметры менять не рекомендуется.

</warn>

## {heading(Включение вычислительного узла после эвакуации)[id=autoevacuation_node_turn_on]}

Чтобы включить вычислительный узел после эвакуации:

1. На любом узле с доступом к IPMI включите питание вычислительного узла в IPMI с помощью утилиты `ipmitool`:

   ```console
   $ ipmitool -I lanplus -H  <IPMI_ADDRESS> -p <IPMI_PORT> -U <IPMI_USERNAME> -P <IPMI_PASSWORD> chassis power on
   ```

   Здесь:

   * `<IPMI_ADDRESS>` — адрес IPMI-интерфейса.
   * `<IPMI_PORT>` — порт IPMI. Обычно 623.
   * `<IPMI_USERNAME>` — имя пользователя IPMI.
   * `<IPMI_PASSWORD>` — пароль пользователя IPMI.

1. На управляющем узле включите вычислительный узел через Evacuation Controller API:

   ```console
   $ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X POST -sS -H "Content-Type: application/json" http://127.0.0.1:9080/restore/<HYPERVISOR_NAME>
   ```
   
   Здесь `<HYPERVISOR_NAME>` — имя эвакуированного вычислительного узла.

1. На управляющем узле отмените `service-force-down` и включите сервис nova-compute:

   ```console
   $ nova service-force-down --unset <HYPERVISOR_NAME> nova-compute
   $ openstack compute service set --enable <HYPERVISOR_NAME> nova-compute
   ```
   Здесь `<HYPERVISOR_NAME>` — имя эвакуированного вычислительного узла.

1. Убедитесь, что сервис включен:

   ```console
   $ openstack compute service list --host <HYPERVISOR_NAME>
   ```
   Здесь `<HYPERVISOR_NAME>` — имя эвакуированного вычислительного узла.

## {heading(Взаимодействие с API)[id=autoevacuation_api]}

API не является публичным, в него можно отправить запрос только из пода Kubernetes.
Поэтому все действия необходимо выполнять с помощью команды `kubectl exec`.

### {heading(Проверка работоспособности сервиса)[id=autoevacuation_api_service]}

Отправьте запрос GET на `/` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X GET -sS http://127.0.0.1:9080/
```

{caption(Пример вывода)[align=left;position=above]}

```console
{"service":"evacuation-controller-api","version":"2.3.4","commit":"26e3deac"}
```
{/caption}

### {heading(Эвакуация вычислительного узла)[id=autoevacuation_api_node]}

Отправьте запрос POST на `/evacuate2/<HOSTNAME>` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X POST -sS -H "Content-Type: application/json" http://127.0.0.1:9080/evacuate2/<HOSTNAME>
```
Здесь `<HOSTNAME>` — имя вычислительного узла, который необходимо эвакуировать.

{caption(Пример вывода)[align=left;position=above]}

```console
{"status":"created"}
```
{/caption}

<info>

Чтобы продолжить использование вычислительного узла, включите его (подробнее — в разделе {linkto(#autoevacuation_node_turn_on)[text=%text]}).

</info>

### {heading(Восстановление работы вычислительного узла)[id=autoevacuation_api_node_restore]}

Отправьте запрос POST на `/restore/<HOSTNAME>` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X POST -sS -H "Content-Type: application/json" http://127.0.0.1:9080/restore/<HOSTNAME>
```

Здесь `<HOSTNAME>` — имя вычислительного узла.


{caption(Пример вывода)[align=left;position=above]}

```console
{"status":"created"}
```
{/caption}

### {heading(Получить список задач)[id=autoevacuation_api_list]}

Отправьте запрос GET на `/tasks` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X GET -sS -H "Content-Type: application/json" http://127.0.0.1:9080/tasks
```

{caption(Пример вывода)[align=left;position=above]}

```console
[{"id":11,"event_id":"2024-10-29-MANUAL","hostname":"kcn002","command":"restore","status":"created","created_by":"api",
"created_at":"2024-10-29 20:49:51+00:00","started_at":null,"ended_at":null,"ended_by":null},{"id":8,"event_id":"2024-10-29-MANUAL","hostname":"kcn002","command":"evacuate","status":"created","created_by":"api","created_at":"2024-10-29 20:49:40+00:00","started_at":null,"ended_at":null,"ended_by":null}]
```
{/caption}

### {heading(Удалить список задач)[id=autoevacuation_api_list_delete]}

Отправьте запрос DELETE на `/tasks` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X DELETE -sS -H "Content-Type: application/json" http://127.0.0.1:9080/tasks
```

{caption(Пример вывода)[align=left;position=above]}

```console
{"result":"Dropped 2 tasks"}
```
{/caption}

### {heading(Получить историю изолирования (fencing))[id=autoevacuation_api_get_fence]}

Отправьте запрос GET на `/fence_log` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X GET -sS -H "Content-Type: application/json" http://127.0.0.1:9080/fence_log
```

{caption(Пример вывода)[align=left;position=above]}

```console
[{"id":27,"event_id":"2024-10-29-YVJ7FKRH8","hostname":"kcn003","fenced_at":"2024-10-29 16:12:40+00:00","pairs":[]},{"id":24,"event_id":"20
24-10-29-LQ28VZMDI","hostname":"kcn002","fenced_at":"2024-10-29 15:17:38+00:00","pairs":[]},{"id":21,"event_id":"2024-10-29-YBDNQMLPJ","hos
tname":"kcn003","fenced_at":"2024-10-29 07:20:08+00:00","pairs":[]},{"id":18,"event_id":"2024-10-27-3AN1IXVWN","hostname":"kcn003",
"fenced_at":"2024-10-27 01:28:47+00:00","pairs":[]},{"id":15,"event_id":"2024-10-27-33ZKPP3FE","hostname":"kcn002",
"fenced_at":"2024-10-27 01:12:08+00:00","pairs":[]},{"id":12,"event_id":"2024-10-26-41PZM6UV9","hostname":"kcn002","fenced_at":"2024-10-26
 23:41:18+00:00","pairs":[]},{"id":9,"event_id":"2024-10-15-921MZM8V6","hostname":"kcn002","fenced_at":"2024-10-15 04:27:45+00:00","pairs":
[]},{"id":6,"event_id":"2024-10-11-BMYTN4PUV","hostname":"kcn002","fenced_at":"2024-10-11 21:17:44+00:00","pairs":[]},
{"id":3,"event_id":"2024-10-09-EDBARYY9B","hostname":"kcn002","fenced_at":"2024-10-09 07:43:16+00:00","pairs":[]}]
```
{/caption}

### {heading(Очистить историю изолирования (fencing))[id=autoevacuation_api_delete_fence]}

Отправьте запрос DELETE на `/fence_log` из пода:

```console
$ kubectl -n iaas-vkcloud exec $(kubectl -n iaas-vkcloud get pods -l app.kubernetes.io/name=evacuation-controller,app.kubernetes.io/component=api -o name) -- curl -X DELETE -sS -H "Content-Type: application/json" http://127.0.0.1:9080/fence_log
```

{caption(Пример вывода)[align=left;position=above]}
```console
{"result":"Dropped 9 records"}
```
{/caption}

## {heading(Настройка доменной зоны IPMI)[id=autoevacuation_api_ipmi_hostname]}

Одним из требований Evacuation Controller к инфраструктуре является дополнительная доменная зона для IPMI.

Доменное имя узла IPMI образуется от доменного имени вычислительного узла путем замены домена верхнего уровня на `ipmi`. Если имя не содержит домен верхнего уровня, к нему добавляется `.ipmi`.

{caption(Примеры)[align=left;position=above]}
```console
domain -> domain.ipmi
domain.i -> domain.ipmi
domain.s.com -> domain.s.ipmi
```
{/caption}
