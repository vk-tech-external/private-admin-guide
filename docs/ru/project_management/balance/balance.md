# {heading(Управление биллингом)[id=balance]}

## {heading(Установка тарифов)[id=balance_setting_tariffs]}

Для проекта может быть применен базовый тарифный план или настроен индивидуальный.

### {heading(Настройка базового тарифа)[id=balance_setting_basic_tariff]}

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Тарифные планы**.
1. На вкладке **Текущий тариф** нажмите кнопку **Создать новый базовый тариф**.
1. Настройте тариф:

   1. Введите название тарифа.
   1. Укажите срок действия тарифа. Чтобы срок действия тарифа был не ограничен, установите переключатель **Бессрочный тариф** в активное положение.
   1. Измените значения тарифов для необходимых ресурсов.

1. Нажмите кнопку **Сохранить тариф**.

Созданный базовый проект получит статус **Активный** и будет применен ко всем проектам, для которых не задан индивидуальный тариф.

### {heading(Настройка индивидуального тарифа в проекте)[id=balance_setting_individual_tariff]}

Чтобы просмотреть тарифы в проекте:

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Индивидуальные тарифы**.
1. Раскройте выпадающий список.

Чтобы настроить тарифы в проекте:

1. На вкладке **Индивидуальные тарифы** нажмите кнопку **Создать индивидуальный тариф**.
1. Настройте тариф:

   1. Введите название тарифа.
   1. Укажите срок действия тарифа. Чтобы срок действия тарифа был не ограничен, установите переключатель **Бессрочный тариф** в активное положение.
   1. Измените значения тарифов для необходимых ресурсов.

1. Нажмите кнопку **Сохранить тариф**.

## {heading(Просмотр списаний по ресурсам в проекте)[id=balance_viewing_charges_by_resource]}

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Баланс**.
1. Укажите интересующий период и нажмите на значок галочки справа от календаря.

## {heading(Просмотр потребления ресурсов)[id=balance_view_resource_consumption]}

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Биллинг**.
1. Укажите интересующий период и нажмите на значок галочки справа от календаря.

Для просмотра отчета в виде диаграмм нажмите на значок графика в левом верхнем углу.

Чтобы скачать отчет в формате XLSX, нажмите кнопку **Отчеты** в правом верхнем углу таблицы и выберите тип отчета: обычный или для бухгалтерии.

## {heading(Пополнение счета)[id=balance_refill]}

Чтобы пополнить счет проекта:

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Баланс**.
1. Нажмите кнопку **Пополнить или списать** и внесите изменения.

   <info>

   В окне **Основной счет проекта** доступно как пополнение баланса проекта, так и списание средств со счета.

   </info>
   
1. Нажмите кнопку **Внести изменение**.

<warn>

Для разморозки счета с отрицательным балансом достаточно пополнить баланс проекта до положительного значения.

</warn>

Чтобы изменить баланс на нескольких проектах:

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Нажмите кнопку **Массовые операции**.
1. Укажите тип изменения баланса, количество бонусов, PID или UID проектов, для которых применяются изменения.
1. Нажмите кнопку **Подтвердить**.

## {heading(Настройка квот для каждого проекта отдельно)[id=balance_setting_quotas]}

1. В интерфейсе Портала администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Квоты**.
1. Измените квоты необходимых параметров с помощью кнопок уменьшения (**-**) и увеличения (**\+**) квот.

   <info>

   Строки с измененными параметрами будут подсвечены желтым.

   </info>
   
1. Нажмите кнопку **Изменить квоты**.

{ifndef(box, pg)}

## {heading(Настройка глобальных тарифов и квот)[id=balance_setting_global_rates_and_quotas]}

Настройка глобальных тарифов и квот, действующих по умолчанию для всех проектов {var(sys2_go)}, выполняется на деплой-ноде в конфигурационном файле `home/redos/inventory/vkcloud/group_vars/vkcloud_billing/vars.yml`.

{ifdef(gov)}

{caption(Пример содержимого фрагмента файла vars.yml)[align=left;position=above]}
```yaml
billing_quota_templates:
  - id: 78d1a5bb-3f11-4989-922c-c897bfab3569
    name: infra
    quotas:
        cores: 2
        instances: 1
        ram: 2048  # 2Gb
        volumes: 3
        gigabytes: 100
        floating_ips: 1
        routers: 3
        octavia_lbs: 3
        lbaas_lbs: 3
        secgroups: 3
        ports: 30
        volumes_high-iops: 3
        gigabytes_high-iops: 100
        secgroups_rules: 200
        share_gigabytes: 100
        share_snapshots: 5
        share_snapshot_gigabytes: 100
        shares: 5
        share_networks: 5
        networks: 5
        subnets: 5
        sprut_networks: 5
        sprut_subnets: 5
        sprut_ports: 30
        sprut_routers: 3
        sprut_floatingips: 1
        sprut_secgroups: 3
        sprut_secgroup_rules: 200
```
{/caption}

{/ifdef}

Названия переменных и значения по умолчанию из коробки (сразу после первоначальной установки) можно найти в конфигурационном файле `home/redos/inventory/ansible-openstack/roles/billing/defaults/main.yml`.

{ifdef(gov)}

{caption(Пример содержимого фрагмента файла main.yml)[align=left;position=above]}
```yaml
billing_default_quota_volumes: "1"
billing_default_quota_gigabytes: "20"
billing_default_quota_cores: "2"
billing_default_quota_instances: "1"
billing_default_quota_ram: "2048"
billing_default_quota_floatingip: "1"
billing_default_quota_router: "1"
billing_default_quota_octavia_lbs: "1"
billing_default_quota_lbaas_lbs: "1"
billing_default_quota_secgroup: "1"
billing_default_quota_port: "10"
billing_default_quota_high_iops_volumes: "high-iops:1"
billing_default_quota_high_iops_gigabytes: "high-iops:20"
billing_default_quota_secgroup_rule: "200"
billing_default_quota_share_snapshot_gigabytes: "20"
billing_default_quota_share_snapshots: "1"
billing_default_quota_share_gigabytes: "20"
billing_default_quota_shares: "1"
billing_default_quota_share_networks: "1"
billing_default_quota_networks: "1"
billing_default_quota_subnets: "1"
billing_default_quota_sprut_networks: "1"
billing_default_quota_sprut_subnets: "1"
billing_default_quota_sprut_ports: "10"
billing_default_quota_sprut_routers: "1"
billing_default_quota_sprut_floatingips: "1"
billing_default_quota_sprut_secgroups: "1"
billing_default_quota_sprut_secgroup_rules: "200"
```
{/caption}

{/ifdef}

После изменений в конфигурационном файле выполните команды (от пользователя `redos`):

```console
$ cd /home/redos/inventory/<НАЗВАНИЕ_ОКРУЖЕНИЯ>/
$ ansible-playbook -i <НАЗВАНИЕ_ОКРУЖЕНИЯ>.yml -e env=<НАЗВАНИЕ_ОКРУЖЕНИЯ> /home/redos/inventory/ansible-openstack/playbooks/billing-deploy.yml
```

<warn>

Значения не поменяются у действующих тарифов проектов.

</warn>

Тарифы устанавливаются для каждого ресурса биллинга.

Отдельно настраивается сервис-фактор для компонентов {var(sys2_go)}, по которым применяется повышающий (понижающий) коэффициент.

{/ifndef}

{ifdef(box, pg)}

## {heading(Изменение шаблона квот)[id=quotas_template_changing]}

Для всех новых проектов устанавливаются одинаковые квоты на ресурсы. Примеры: на vCPU, RAM, диски и прочие. Типовые значения квот указаны в шаблонах.

<err>

При изменении шаблонов сами квоты будут также изменены для всех существующих проектов, значения которых не редактировались вручную через Портал администратора (подробнее — в разделе {linkto(#balance_setting_quotas)[text=%text]}).

</err>

Для изменения шаблонов квот:

1. Откройте на редактирование файл `~/inventory/vkcloud/group_vars/vkcloud/postdeploy.yml`.

   {caption(Пример содержимого фрагмента файла postdeploy.yml)[align=left;position=above]}
   ```yaml
   quota_templates:
     - id: 78d1a5bb-3f11-4989-922c-c897bfab3569
       name: infra
       quotas:
         nova:
           cores: 2
           instances: 1
           ram: 2048

           ...

     - id: 213fbfdf-0e36-451c-b6b5-1dd2b3b363fd
       name: infra+paas
       quotas:
         nova:
           cores: 9
           instances: 6
           ram: 28672

           ...
   ```
   {/caption}

   Здесь:

   * `infra` — шаблон квот для проектов, использующих только IaaS-сервисы. Пример: Cloud Servers.
   * `infra+paas` — шаблон квот для проектов, использующих IaaS- и PaaS-сервисы. Примеры: Cloud Servers, Cloud Containers, Cloud Databases.

1. Измените значения нужного шаблона квот.
1. Запустите плейбук:

   ```console
   $ cd ~/inventory/vkcloud/

   $ ansible-playbook -i vkcloud.yml -e env=vkcloud -e bootstrap=true ../ansible-openstack/playbooks/helm-quota-manager.yml
   ```

## {heading(Особенности квот дисков)[id=balance_disk_quotas]}

В квотах на общий объем и количество дисков в проекте учитываются диски всех типов. Отдельно задаются квоты на объем и количество дисков типов High-IOPS SSD и Ceph и внешней СХД.

{caption(Примеры)[align=left;position=above]}
Заданы квоты:

* Диски — 100 шт.
* Диски Ceph — 20 шт.
* Диски High-IOPS SSD — 20 шт.
* Диски Внешнего СХД — 20 шт.

Всего пользователь сможет создать до 60 дисков, поскольку будут достигнуты квоты для каждого типа дисков.

Заданы квоты:

* Размер дисков — 200 ГБ.
* Размер Ceph — 200 ГБ.
* Размер High-IOPS SSD — 100 ГБ.

Если размер дисков High-IOPS SSD составит 100 ГБ, пользователь сможет создать диски Ceph, общий размер которых не превышает 100 ГБ, поскольку будет достигнута квота на общий размер дисков.
{/caption}

{/ifdef}