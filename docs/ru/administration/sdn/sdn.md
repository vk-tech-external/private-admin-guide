# {heading(SDN)[id=sdn]}

<!--- // исходные данные https://confluence.vk.team/pages/viewpage.action?pageId=1185978618 -->

## {heading(Выбор SDN для проекта)[id=sdn_choose]}

В {var(sys3)} доступны SDN:

* Sprut.
* Neutron.

Предоставьте проекту доступ к SDN Sprut или к SDN Neutron, или к обоим SDN, один из которых будет выбран как SDN по умолчанию.

1. В Портале администратора перейдите в раздел **Управление проектами** → **Проекты**.
1. Нажмите на имя проекта.
1. На вкладке **Информация** нажмите на значок **•••** справа от пункта **Доступные SDN**.
1. Укажите SDN, который будет использован по умолчанию.
1. Чтобы разрешить использование второго SDN, установите переключатель **Разрешить проекту использовать второй SDN** в активное положение.
1. Нажмите кнопку **Подтвердить**.

## {heading(SDN Sprut)[id=sdn_sprut]}

### {heading(Общая информация)[id=sdn_sprut_common]}

Сервисы SDN Sprut:

* Sprut — обеспечивает основные сетевые функции {var(sys2)}.
* Sdn-proxy — направляет запросы в выбранный SDN (Neutron или Sprut), обеспечивает функционал выбора SDN для проектов.
* Private-dns — обеспечивает управление доменами, поддоменами и связанными с ними ресурсными записями в рамках {var(sys2)}.

SDN Sprut — набор служб, расположенных на управляющих, сетевых и вычислительных узлах, а также контейнеров:

* Sprut:

   * Службы:

      * Управляющий узел:

         * `sprut-dns-agent.service`.
         * `sprut-monitoring-agent.service`.
         * `sprut-neutron-server.service`.
         * `sprut-nfv-apps-rescheduler.service`.
         * `sprut-nfv-apps-scheduler.service`.
         * `sprut-sdn-flow-builder.service`.
         * `sprut-sdn-topology-builder.service`.
         * `etcd-sprut-node.service`.
         * `httpd-sprut.service`.
         * `mariadb-sprut.service`.

      * Сетевой узел (Если в {var(sys3)} есть выделенные сетевые узлы):

         * `sprut-monitoring-agent.service`.
         * `sprut-nfv-agent.service`.
         * `sprut-nfv-collector.service`
         * `sprut-ovsapi.service`.
         * `sprut-runsvdir-start.service`.
         * `sprut-sdn-flow-agent.service`.
         * `sprut-sdn-hw-agent.service`.

      * Вычислительный узел:

         * `sprut-monitoring-agent.service`.
         * `sprut-nfv-agent.service`.
         * `sprut-nfv-collector.service`.
         * `sprut-ovsapi.service`.
         * `sprut-runsvdir-start.service`.
         * `sprut-sdn-flow-agent.service`.
         * `sprut-sdn-hw-agent.service`.

   * Контейнеры:

      * `sprut-housekeep-agent`.
      * `sprut-nfv-vm-api`.
      * `sprut-spawner-agent`.

* Sdn-proxy:

   * Службы:

      * `mariadb-sdnprojectsapi.service`.

   * Контейнеры:

      * `sdn-proxy-api`.
      * `sdn-proxy-sdn-projects-api`.

* Private-dns:

   * Службы.
   * Контейнеры:

      * `ghosts-private-dns-api`.
      * `ghosts-private-dns-dns-agent`.
      * `ghosts-private-dns-orchestrator-api`.


### {heading(Принцип работы)[id=sdn_sprut_working_principle]}

Функции Sprut:

* Инициализирует узлы, через которые проходит трафик между ВМ.
* Добавляет каждому узлу метку сети Клоза.
* Создаёт на узлах логические коммутаторы и порты в них.
* Создаёт логические соединения портов.

Соединения строятся по принципу сети Клоза. Данные от начального до конечного узла проходят через транзитный узел. Если в {var(sys3)} есть выделенные сетевые узлы, транзитным является сетевой узел, иначе — вычислительный узел.

Транзит трафика между ВМ, работающими в разных сетях, проходит через sprut-router. Sprut-router располагается на транзитном узле и представлен сетевым пространством имён `sprut-router-*`.

Чтобы получить имя сетевого пространства имён sprut-router, выполните команду на транзитном узле:

```console
# ip netns | grep sprut-router
```

Чтобы посмотреть логическую структуру Sprut, на управляющем узле выполните команды:

```console
// Узел сети
# curl http://<ENDPOINT_IP>:2115/v1/nodes/

// Метка сети Клоза 
# curl http://<ENDPOINT_IP>:2115/v1/tags/

// Коммутатор узла
# curl http://<ENDPOINT_IP>:2115/v1/switches/

// Порт коммутатора
# curl http://<ENDPOINT_IP>:2115/v1/ports/

// Однонаправленное соединение между портами
# curl http://<ENDPOINT_IP>:2115/v1/phys-links/
```

Здесь `<ENDPOINT_IP>` — значение переменной `openstack_private_endpoint_ip` из файла `minimal.yml`.

<info>

При отказе узла, на котором расположен sprut-router, или перед проведением работ на узле выведите его в обслуживание (подробнее — в разделе {linkto(#sdn_sprut_node_service)[text=%text]})

</info>

### {heading(Диагностика)[id=sdn_sprut_diagnostic]}

При возникновении ошибок смотрите логи с включённым debug-режимом.

Чтобы включить debug-режим, в файле `/etc/sprut/sprut.conf` задайте параметру `debug` значение `True`:

```console
# cat /etc/sprut/sprut.conf

[DEFAULT]
verbose = False
debug = True
```

<info>

При возникновении ошибок инициализации L2, в первую очередь обратите внимание на сервисы:

```sh
sprut-sdn-hw-agent.service
sprut-sdn-flow-agent.service
sprut-sdn-topology-builder.service
sprut-nfv-agent.service
sprut-nfv-collector.service
```

</info>

### {heading(Обслуживание узла)[id=sdn_sprut_node_service]}

<info>

Вывод узла в обслуживание нужен, например, чтобы эвакуировать sprut-router с сетевого узла.

</info>

Чтобы вывести узел в обслуживание, выполните команду:

```sh
# sprut-deploy maintenance -e "http://<ENDPOINT_IP>:2115" -f <NODE_NAME>
```

Здесь:

* `<ENDPOINT_IP>` — значение переменной `openstack_private_endpoint_ip` из файла `minimal.yml`.
* `<NODE_NAME>` — имя узла.

Чтобы ввести узел в работу, выполните команду:

```sh
# sprut-deploy operational -e "http://<ENDPOINT_IP>:2115" -f <NODE_NAME>
```

Здесь:

* `<ENDPOINT_IP>` — значение переменной `openstack_private_endpoint_ip` из файла `minimal.yml`.
* `<NODE_NAME>` — имя узла.
