# {heading(Управление биллингом)[id=balance]}

## {heading(Установка тарифов)[id=balance_setting_tariffs]}

Для проекта может быть применён базовый тарифный план или настроен индивидуальный.

### {heading(Настройка базового тарифа)[id=balance_setting_basic_tariff]}

Чтобы настроить базовый тариф:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Тарифные планы**.
1. На вкладке **Текущий тариф** нажмите кнопку **Создать новый базовый тариф**.
1. Настройте тариф:

   1. Введите название тарифа.
   1. Укажите срок действия тарифа. Чтобы срок действия тарифа был не ограничен, установите переключатель **Бессрочный тариф** в активное положение.
   1. Измените значения тарифов для необходимых ресурсов.

1. Нажмите кнопку **Сохранить тариф**.

Созданный базовый проект получит статус **Активный** и будет применен ко всем проектам, для которых не задан индивидуальный тариф.

### {heading(Настройка индивидуального тарифа в проекте)[id=balance_setting_individual_tariff]}

Чтобы просмотреть тарифы в проекте:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
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

Чтобы просмотреть пополнения и списания по ресурсам в проекте:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Баланс**.
1. Укажите интересующий период и нажмите на значок галочки справа от календаря.

## {heading(Просмотр потребления ресурсов)[id=balance_view_resource_consumption]}

Чтобы посмотреть потребление ресурсов в проекте:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Биллинг**.
1. Укажите интересующий период и нажмите на значок галочки справа от календаря.

Для просмотра отчёта в виде диаграмм нажмите на значок графика в левом верхнем углу.

Чтобы скачать отчёт в формате XLSX, нажмите кнопку **Отчеты** в правом верхнем углу таблицы и выберите тип отчёта: обычный или для бухгалтерии.

## {heading(Пополнение счёта)[id=balance_refill]}

Чтобы пополнить счёт проекта:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Баланс**.
1. Нажмите кнопку **Пополнить или списать** и внесите изменения.

   <info>

   В окне **Основной счёт проекта** доступно как пополнение баланса проекта, так и списание средств со счёта.

   </info>
   
1. Нажмите кнопку **Внести изменение**.

<info>

Для разморозки счёта с отрицательным балансом достаточно пополнить баланс проекта до положительного значения.

</info>

Чтобы изменить баланс на нескольких проектах:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
1. Нажмите кнопку **Массовые операции**.
1. Укажите тип изменения баланса, количество бонусов, PID или UID проектов, для которых применяются изменения.
1. Нажмите кнопку **Подтвердить**.

## {heading(Настройка квот для каждого проекта отдельно)[id=balance_setting_quotas]}

Чтобы настроить квоты в проекте:

1. В интерфейсе Портала администратора {var(sys2)} перейдите в раздел **Управление проектами** → **Проекты**.
1. Выберите проект из списка.
1. Перейдите на вкладку **Квоты**.
1. Измените квоты необходимых параметров с помощью кнопок уменьшения (**-**) и увеличения (**{plus}**) квот.

   <info>

   Строки с изменёнными параметрами будут подсвечены жёлтым.

   </info>
   
1. Нажмите кнопку **Изменить квоты**.

## {heading(Настройка глобальных тарифов и квот)[id=balance_setting_global_rates_and_quotas]}

Настройка глобальных тарифов и квот, действующих по умолчанию для всех проектов {var(sys2)}, выполняется на деплой-ноде в конфигурационном файле `home/redos/inventory/<ENV>/group_vars/<ENV>_billing/vars.yml`, где `<ENV>` — название окружения.

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

Названия переменных и значения по умолчанию из коробки (сразу после первоначальной установки) можно найти в конфигурационном файле `home/redos/inventory/ansible-openstack/roles/billing/defaults/main.yml`.

{ifndef(cer)}
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
{/ifndef}

После изменений в конфигурационном файле выполните команды (от пользователя `redos`):

```console
$ cd /home/redos/inventory/<НАЗВАНИЕ_ОКРУЖЕНИЯ>/
$ ansible-playbook -i <НАЗВАНИЕ_ОКРУЖЕНИЯ>.yml -e env=<НАЗВАНИЕ_ОКРУЖЕНИЯ> /home/redos/inventory/ansible-openstack/playbooks/billing-deploy.yml
```

<warn>

Значения не поменяются у действующих тарифов проектов.

</warn>

Тарифы устанавливаются для каждого ресурса биллинга.

Отдельно настраивается сервис-фактор для компонентов {var(sys2)}, по которым применяется повышающий (понижающий) коэффициент.
