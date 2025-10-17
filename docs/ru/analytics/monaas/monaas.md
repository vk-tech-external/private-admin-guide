# {heading(Cloud Monitoring)[id=cloud_monitoring]}

<!--- #todo на раздел есть ссылка в Руководстве администратора Dev Platform. -->

{var(system)} Monitoring (MaaS) — сервис для сбора и отображения метрик пользователей.

## {heading(Общие сведения)[id=cloud_monitoring_common]}

Cloud Monitoring агрегирует метрики узлов и облачных сервисов, что позволяет отслеживать аномальное поведение, получать сведения, которые могут помочь поддерживать стабильную работу, увеличить доступность и производительность сервисов.

### {heading(Пространство имен)[id=cloud_monitoring_namespace]}

Данные каждого сервиса сохраняются в свое пространство имен (Namespace). Сервисы {var(sys2)} формируют названия пространств имен вида `mcs/<SERVICENAME>`. Название пространства имен для записи дополнительных метрик не должно начинаться с `mcs/`.

### {heading(Метки)[id=cloud_monitoring_labels]}

В метках (Labels) передается дополнительная метаинформация, которая может идентифицировать целевой ресурс.

Для каждой метрики, которая передается в хранилище, можно указать произвольный набор меток. Например, чтобы со значением метрики `cpu_total` передать имя узла ВМ и название зоны доступности, в которой она находится, заполните значения меток `host` и `availability_zone`.

Переданные метки сохраняются в базу данных Cloud Monitoring. Значения метрики автоматически агрегируются по интервалам 1 минута, 5 минут, 1 час. Агрегация происходит по всем полям меток, с которыми сохранено значение метрики.

Метки можно использовать для построения запросов, которые фильтруют и группируют значения метрик. Пример:

```sql
SUM BY(host) (cpu:Minimum{instance="<"span >"server1", app!="<"span >"system"})
SUM BY(job) (cpu:Average{host="<"span >"server1", job!="<"span >"system"}[12h] offset 24h)
```

### {heading(Агрегация)[id=cloud_monitoring_aggregate]}

* Cloud Monitoring автоматически агрегирует значения метрик по интервалам 1 минута, 5 минут, 1 час.
* Начальные значения метрик автоматически удаляются после агрегации.
* Поддерживаются следующие функции агрегации: минимум, максимум, среднее.
* Агрегирование происходит по всем полям меток, с которыми сохранено значение метрики.
* Агрегированные метрики хранятся в течение 30 дней.
* Пользователь может получить значения агрегированных метрик с фильтрацией по необходимым значениям меток.

## {heading(Управление агентами и плагинами)[id=cloud_monitoring_agents_plugins_manage]}

Подробнее о включении мониторинга — в документе **Руководство пользователя {var(system)}** в разделе **Мониторинг и логирование** → **Мониторинг** → **Мониторинг объектов виртуализации {var(sys2)}**.

### {heading(Запуск/остановка агента мониторинга)[id=cloud_monitoring_start_stop_agent]}

Чтобы проверить статус агента:

```console
# systemctl -l status telegraf
```

Чтобы запустить агент мониторинга:

```console
# systemctl -l start telegraf
```

Чтобы остановить агент мониторинга:

```console
# systemctl -l stop telegraf
```

### {heading(Управление метриками)[id=cloud_monitoring_metrics_manage]}

1. На ВМ, где установлен агент мониторинга, внесите изменения в параметры мониторинга в файле `/etc/telegraf/telegraf.conf`.

   {caption(Пример для мониторинга CPU в Linux)[align=left;position=above]}
   ```ini
   [[inputs.cpu]]
     percpu = false
     totalcpu = true
     collect_cpu_time = true
     report_active = false
     fieldpass = ["usage_user", "usage_system", "usage_iowait", "usage_irq", "usage_guest", "time_idle"]
   ```
   {/caption}

   {caption(Пример добавления плагина `mysql` в Linux)[align=left;position=above]}
   ```ini
   [[inputs.mysql]]
     servers = ["tcp(127.0.0.1:3306)/"]
     metric_version = 2
   ```
   {/caption}

1. Примените конфигурацию:

   ```console
   # sudo systemctl reload telegraf.service
   ```

## {heading(Диагностика)[id=cloud_monitoring_diagnostic]}

Основные сервисы расположены в инфраструктурном кластере Kubernetes.

При возникновении сбоев в работе сервисов, проверьте логи `metrics-server`, `cloud-alerting`, `vmselect`, `templater`, `tetsuo`, `ics`.

В качестве долгосрочного хранилища (long-term storage) пользовательских метрик используются узлы хранения пользовательских метрик в ClickHouse. Используется общая служба Apache ZooKeeper.

Чтобы посмотреть таблицы метрик, подключитесь к ClickHouse:

```console
# sudo clickhouse-client --port 9010
```

Для фильтрации данных используйте `SQL`. Пример:

```sql
use cloud_monitoring;
select * from hour_metrics limit 10;
```

Чтобы убедиться, что данные приходят:

1. Проверьте в `etcd` соответствие маппинга ID проекта:

   ```console
   # sudo etcdctl --endpoints <ENDPOINTS> get --prefix /
   ```

1. Проверьте логи `metrics-server` в Kubernetes:

   ```console
   # sudo kubectl logs -l app.kubernetes.io/name=metrics-server -n paas-vkcloud | grep namespace
   ```

В логах отобразится запись вида: `Set namespace map 'mcs/vm': XXXXXXXXX`. Полученный маппинг можно использовать для запроса данных из `vmselect`.

## {heading(Визуализация данных мониторинга)[id=cloud_monitoring_diagnostic]}

Визуализировать данные мониторинга ресурсов, собранные сервисом Cloud Monitoring, можно с помощью сервиса Grafana 11.

Чтобы использовать сервис Grafana, разверните его из Marketplace в проекте. Подробнее об установке Grafana 11 — в документе **Руководство пользователя {var(system)}** в разделе **Мониторинг и логирование** → **Мониторинг** → **Сервис Grafana** → **Установка Grafana**.

При развертывании сервиса он будет автоматически интегрирован с Cloud Monitoring:

* Будет установлена связь, позволяющая Grafana получать данные мониторинга из сервиса Cloud Monitoring.
* В Grafana будут настроены источники данных (data sources), связанные с Cloud Monitoring:

Обновление Grafana 11 выполняется через Marketplace. Добавить новую версию в Marketplace можно с помощью запуска плейбука. Подробнее — в разделе {linkto(../../marketplace_xaas/xaas_publish/xaas_publish_playbook#xaas_publish_playbook)[text=%text]}.
