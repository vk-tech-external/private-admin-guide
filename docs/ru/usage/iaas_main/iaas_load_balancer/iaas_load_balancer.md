# {heading(Балансировщики нагрузки)[id=iaas_load_balancer]}

Балансировщик нагрузки — это метод распределения заданий/трафика между несколькими сетевыми устройствами (например, серверами) для достижения следующих целей:

* Оптимизация использования ресурсов.
* Сокращение времени обслуживания запросов.
* Горизонтальное масштабирование кластера (динамическое добавление/удаление устройств).
* Обеспечение отказоустойчивости (резервирования).

Создание и управление балансировщиком доступно через Портал самообслуживания в разделе **Виртуальные сети** на странице **Балансировщики нагрузки**.

<warn>

Производительность балансировщиков нагрузки в облаке может быть ограничена производительностью сети. Конфигурации из 4 балансировщиков по 1 vCPU обладают большей отказоустойчивостью, чем 1 балансировщик с 4 vCPU.

</warn>

## {heading(Создание балансировщика)[id=iaas_load_balancer_create]}

Чтобы создать балансировщик нагрузки, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).
* OpenStack CLI.

{ifndef(cer)}
### {heading(OpenStack CLI)[id=iaas_load_balancer_create_cli]}

Чтобы создать балансировщик при помощи OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Запустите команды:

   * Для создания балансировщика:

     {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_create_cmd]}

      Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_loadbalancer_create)[text=%text]}.
   * Для создания обработчика:

     {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_listener_create_cmd]}

      Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_loadbalancer_listener_create)[text=%text]}.
   * Для создания пула серверов балансировщика:

     {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_pool_create_cmd]}

      Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_loadbalancer_pool_create)[text=%text]}.
   * Для создания монитора проверки работоспособности:

     {include(../../../cli_commands/_includes/_cli_commands.md)[tags=cli_openstack_loadbalancer_healthmonitor_create_cmd]}

      Описание опций приведено в разделе {linkto(../../../cli_commands#cli_openstack_loadbalancer_healthmonitor_create)[text=%text]}.
{/ifndef}

## {heading(Методы балансировки)[id=balancing_methods]}

Балансировщик поддерживает три метода:

* `LEAST_CONNECTIONS`. Учитывает количество подключений, поддерживаемых серверами в текущий момент времени. Каждый следующий запрос передается серверу с наименьшим количеством активных подключений.
* `ROUND_ROBIN`. Представляет собой перебор по кругу: первый запрос передается первому серверу, затем следующий запрос передается второму и так до достижения последнего сервера, а затем все начинается сначала.
* `SOURCE_IP`. В этом методе сервер, обрабатывающий запрос, выбирается произвольным образом и закрепляется (на сессию, в cookies) за конкретным источником запроса.