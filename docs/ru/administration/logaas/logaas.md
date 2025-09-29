# {heading(Cloud logging (BETA))[id=cloud_logging]}

{var(system)} Logging (LaaS) — сервис для работы с журналами событий. Предоставляет сбор, хранение, чтение, отображение и обработку журналов событий в едином интерфейсе в {var(sys3)}.

## {heading(Общие сведения)[id=cloud_logging_common]}

Cloud logging предназначен для диагностики и оперативного решения ошибок в работе сервисов.

Сервис агрегирует логи узлов и облачных сервисов. Это позволяет:

* Отслеживать аномальное поведение.
* Получать сведения, которые могут помочь поддерживать стабильную работу, увеличить доступность и производительность сервисов.

## {heading(Интеграция с сервисом)[id=cloud_logging_integration]}

Для записи логов используется плагин `vkcloudlogs-fluent-bit-plugin`.

Функционал плагина — сбор, агрегация, фильтрация и отправка логи из источника данных в сервис Cloud logging.

<info>

Для работы плагина необходимо указать точки доступа {var(sys2)} и авторизационные данные сервисного пользователя.

</info>

Чтобы настроить логирование для ВМ:

1. Установите Fluent Bit, если этого не было сделано ранее.
1. Установите плагин `vkcloudlogs-fluent-bit-plugin`.

   {caption(CentOS 7.X, CentOS 8.X, AlmaLinux 9)[align=left;position=above]}
   ```console
   # sudo rpm -i https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```
   {/caption}

   {caption(Ubuntu 22.X, Astra Linux SE 1.7.2 «Орел»)[align=left;position=above]}
   ```console
   # curl -sSLo vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   # sudo dpkg -i vkcloudlogs-fluent-bit-plugin_0.1.3_amd64.deb
   ```
   {/caption}

   {caption(AltLinux Server p10)[align=left;position=above]}
   ```console
   # sudo apt-get install https://cloudlogging.hb.ru-msk.vkcs.cloud/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugin-0.1.3-1.x86_64.rpm
   ```
   {/caption}

   Будет установлен агент сбора логов `vkcloudlogs-fluent-bit.service`. По умолчанию он отключён.

   Агент `vkcloudlogs-fluent-bit.service` работает с файлами:

   * `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit.conf` — основной файл конфигурации сервиса с описаниями источников и путей назначения для логирования (подробнее — в [официальной документации](https://github.com/vk-cs/cloudlogs-fluent-bit)).
   * `/etc/vkcloudlogs-fluent-bit-plugin/vkcloudlogs-fluent-bit-plugins.conf` — конфигурация подключения плагина.

1. Настройте плагин для отправки логов в сервис Cloud Logging:

   1. Подготовьте авторизационные данные для вашего проекта:

      * `auth_url` — точка доступа Keystone.
      * `project_id` — идентификатор проекта в OpenStack.
      * `server_host_port` — адрес сервиса Cloud Logging.
      * `user_id` — имя пользователя, от которого будут записываться логи.
      * `password` — пароль пользователя.
      * `service_id` — идентификатор сервиса в системе логирования (по умолчанию `default`). При необходимости создайте новые идентификаторы в Портале самообслуживания в разделе **Мониторинг** → **Логирование** → **Настройки** → **Прочие ресурсы**.

   1. Укажите параметры подключения для плагина в файле `vkcloudlogs-fluent-bit.conf`.

      <info>

      В примере приведена настройка логирования данных сервиса `ssh.service` (секция `[INPUT]`) в сервис Cloud Logging (секция `[OUTPUT]`).

      </info>

      ```sh
      [INPUT]
         Name            systemd
         Systemd_Filter  _SYSTEMD_UNIT=ssh.service
         Lowercase       On
         Read_From_Tail  On
         Tag             system.*

      [OUTPUT]
         Name              vkcloudlogs
         Match             system.*
         auth_url          <ТОЧКА_ДОСТУПА_KEYSTONE>
         project_id        <PID_ПРОЕКТА>
         server_host_port  <АДРЕС_СЕРВИСА>
         user_id           <ID_ПОЛЬЗОВАТЕЛЯ>
         password          <ПАРОЛЬ_ПОЛЬЗОВАТЕЛЯ>
      ```

1. Включите агент сбора логов `vkcloudlogs-fluent-bit.service`:

   1. Выполните команды:

      ```console
      # sudo systemctl enable vkcloudlogs-fluent-bit.service
      # sudo systemctl start vkcloudlogs-fluent-bit.service
      ```
      
   1. Подождите несколько минут для сбора данных.
   1. Проверьте наличие логов в Портале самообслуживания в разделе **Мониторинг** → **Логирование**.

## {heading(Просмотр журналов событий)[id=cloud_logging_event_logs]}

Чтобы просмотреть журнал событий ВМ, кластеров Kubernetes и СУБД в Портале администратора:

1. Перейдите в раздел **Аналитика** → **Логирование**.
1. Нажмите кнопку **Поиск и фильтры** и настройте фильтры отображения журналов логирования.
1. Нажмите кнопку **Найти**.

Чтобы уточнить результаты поиска, используйте язык поисковых запросов.

<warn>

Подробнее о работе с языком поисковых запросов — в **Руководстве пользователя {var(system)}**.

</warn>

Примеры поисковых выражений:

* Сообщение содержит строку:

   ```console
   some message

   message: "some message"

   message: "error: \"some message\"
   ```
  
* Использование времени, уровня логирования и нагрузки (payload):

   ```console
   level >= debug AND (timestamp <= "2023-04-10T10:20:00Z" OR payload.code = 200)
   ```
  
* Использование операторов `AND`, `NOT`, `EXISTS`:

   ```console
   service_id <> databases AND NOT message: hello AND payload.status EXISTS
   ```

## {heading(Диагностика)[id=cloud_logging_diagnostic]}

### {heading(DBaaS и ВМ)[id=cloud_logging_diagnostic_vm_db]}

Конфигурационные файлы Cloud Logging на ВМ расположены в директории `/etc/cloudlogs/`.

Для передачи логов используется сервис Fluent Bit (`td-agent-bit`) с плагином `vkcloudlogs-fluent-bit.service`.

Чтобы просмотреть статус сервиса, выполните команду:

```console
# sudo systemctl status cloudlogs.service
```

Основные настройки и учётные данные расположены в файле `/etc/cloudlogs/output_cloudlogs.conf`. Они передаются через userdata в cloud-init на ВМ при создании инстанса.

### {heading(Кластеры Kubernetes)[id=cloud_logging_diagnostic_cluster]}

Сервисы запущены на ВМ в пространстве имён `logaas-integration`.

Чтобы посмотреть логи:

```console
# sudo kubectl -n logaas-integration get pods
```

### {heading(Сервисы {var(sys2)})[id=cloud_logging_diagnostic_services]}

Сервисы расположены в пространстве имён `coiiot-vkcloud`.

Чтобы посмотреть логи, на управляющем узле выполните команду:

```console
# sudo kubectl -n coiiot-vkcloud get pods
```

Для Портала администратора поды `reader-api` и `writer-api` продублированы с суффиксом `-sa`.

У сервисных учётных записей (`cloudlogs_…`) в Keystone должна быть роль `monitoring_agent`.

Логи (events) можно посмотреть на узлах хранения пользовательских метрик в Clickhouse.

## {heading(Настройка глубины хранения логов)[id=cloud_logging_storage_depth]}

Для управления настройками глубины хранения логов в сервисе Cloud Logging используются параметры:

* `SERVICE_MIN_TTL` — минимальное время хранения логов в днях. По умолчанию 1 день.
* `SERVICE_MAX_TTL` — максимальное время хранения логов в днях. По умолчанию 30 дней.
* `SERVICE_DEFAULT_TTL` — время хранения логов для всех проектных сервисов в днях по умолчанию. По умолчанию, 3 дня. Пользователь может выставлять любые значения в пределах `SERVICE_MIN_TTL` и `SERVICE_MAX_TTL` для каждого типа сервиса.

Чтобы настроить эти параметры на уровне {var(sys2)}, обновите или добавьте соответствующие переменные сервиса `laas-admin` в Ansible inventory и обновите его (подробнее — в п. {linkto(../../administration/infrastructure_management_main/infrastructure_management_configs#infrastructure_management_configs)[text=%text]}).

Чтобы изменить конфигурацию сервиса `laas-admin` на узлах:

1. В конфигурационном файле `~/inventory/vkcloud/group_vars/vkcloud_kube/laas-admin-api.yml` внесите изменения в параметры `helm_laas_admin_api_SERVICE_MIN_TTL`, `helm_laas_admin_api_SERVICE_MAX_TTL` и `helm_laas_admin_api_SERVICE_DEFAULT_TTL`, и сохраните его.
1. Перезагрузите конфигурацию с помощью Ansible playbook:

   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/helm-laas-admin.yml -D
   ```

## {heading(Настройка SMTP-сервера для отправки уведомлений)[id=cloud_logging_smtp]}

В `~/inventory/vkcloud/group_vars/vkcloud_kube/cloud-alerting.yml` задайте значения параметров:

* `helm_cloud_alerting_smtp_host` — хост SMTP-сервера.
* `helm_cloud_alerting_smtp_port` — порт SMTP-сервера.
* `helm_cloud_alerting_smtp_user` — имя пользователя для подключения к SMTP-серверу.
* `helm_cloud_alerting_smtp_password` — пароль для подключения к SMTP-серверу.
* `helm_cloud_alerting_smtp_from_addr` — email отправителя уведомления.
