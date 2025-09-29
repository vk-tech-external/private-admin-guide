# {heading(Изменение конфигурации на узлах)[id=infrastructure_management_configs]}

<err>

Изменение конфигурации для узлов осуществляется централизованно через деплой-ноду: как для всех сразу, так и для отдельных узлов.

Локальное изменение конфигураций на отдельных узлах (без изменений на деплой-ноде) приведет к их «затиранию» при следующем обновлении или восстановлении сервисов/узлов {var(sys2)} с деплой-ноды.

</err>

Конфигурация сервисов хранится на деплой-ноде. По умолчанию она размещена по адресу `~/inventory/ansible-openstack/roles`.

Эти настройки распределяются Ansible при перезапуске/обновлении сервисов с помощью Ansible playbook.

Основные переменные размещены в Ansible inventory в директории `~/inventory/vkcloud`.

Чтобы изменить конфигурацию сервиса на узлах:

1. Выполните вход на деплой-ноду по SSH (подробнее — в разделе {linkto(../../../usage/interfaces_access#deploy_host_auth)[text=%text]}).
1. Найдите директорию с `.yml` файлом сервиса (`~/inventory/ansible-openstack/playbooks/`). Если отобразится сообщение вида `Permission denied`, зайдите под пользователем `root`: `sudo su - root`.
1. Внесите изменения в конфигурационный файл и сохраните его.
1. Если требуется выполнить обновление версии сервиса, в `~/inventory/vkcloud/group_vars/vkcloud/versions.yml` укажите новую версию.
1. Перезагрузите конфигурацию с помощью Ansible playbook:

   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud ~/inventory/ansible-openstack/playbooks/<НАЗВАНИЕ_КОНФИГУРАЦИОННОГО_ФАЙЛА_СЕРВИСА>.yml <ОПЦИИ>
   ```

<warn>

Чтобы применить изменения только для одного узла, добавьте в команду перезапуска плейбука опцию `--limit <НАЗВАНИЕ_УЗЛА>`. Здесь `<НАЗВАНИЕ_УЗЛА>` — название узла, на котором требуется применить конфигурацию.

</warn>

Чаще всего применяются следующие варианты запуска Ansible playbook (на примере сервиса ClickHouse, директория запуска `~/inventory/vkcloud`):

* Валидация — проверка конфигурации в системе без внесения изменений.

   {caption(Пример запуска валидации сервиса ClickHouse)[align=left;position=above]}
   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/clickhouse.yml -C -D
   ```
   {/caption}

* Установка сервиса с нуля — выполняются дополнительные действия, например, создание БД (в примере ниже — `bootstrap=true`). Список дополнительных действий может отличаться в зависимости от сервиса.

   {caption(Пример установки сервиса с нуля)[align=left;position=above]}
   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/clickhouse.yml -D -e bootstrap=true
   ```
   {/caption}

* Обновление версии сервиса из `~/inventory/vkcloud/group_vars/vkcloud/versions.yml`.

   {caption(Пример обновления версии сервиса)[align=left;position=above]}
   ```console
   $ ansible-playbook -i vkcloud.yml -e env=vkcloud ../ansible-openstack/playbooks/clickhouse.yml -D
   ```
   {/caption}

Полный перечень опций приведен в [официальной документации Ansible](https://docs.ansible.com/ansible/2.9/cli/ansible-playbook.html).