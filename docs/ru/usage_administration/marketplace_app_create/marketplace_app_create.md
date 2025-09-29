# {heading(Создание шаблона приложения Marketplace)[id=marketplace_app_create]}

Marketplace предоставляет возможность развёртывания сред веб-разработки и администрирования на базе шаблонов виртуальных машин, которые уже содержат предустановленное программное обеспечение. В магазине приложений по умолчанию доступно приложение MiniO S3. Для добавления других приложений в магазин необходимо создать соответствующие шаблоны.

<warn>

Marketplace {var(sys2)} использует OpenStack Heat в качестве базы для управления установленными приложениями. Базовые шаблоны доступны в [репозитории heat-templates](https://github.com/openstack/heat-templates/tree/master/hot).

</warn>

Чтобы создать шаблон приложения:

1. Выполните подготовительные операции (только при создании первого приложения, см. раздел {linkto(#marketplace_add_app_step_1)[text=%text]}).
1. Создайте новую директорию с шаблоном приложения (см. раздел {linkto(#marketplace_add_app_step_2)[text=%text]}).
1. Создайте структуру шаблона приложения (см. раздел {linkto(#marketplace_add_app_step_3)[text=%text]}).
1. Добавьте конфигурацию для отображения приложения на Портале самообслуживания в файл `configuration.json` (см. раздел {linkto(#marketplace_add_app_step_4)[text=%text]}).
1. Выгрузите созданное приложение в объектное хранилище и установите разрешения для доступа на чтение (см. раздел {linkto(#marketplace_add_app_step_5)[text=%text]}).

Далее приведено подробное описание каждого из приведенных выше шагов на примере создания шаблона приложения GitLab CE.

## {heading(Шаг 1. Подготовка)[id=marketplace_add_app_step_1]}

Определите адрес объектного хранилища:

1. Войдите на управляющий узел по SSH.
1. Выполните команду:
   
   ```bash
   grep -ri -5 marketplace_templates /etc/nginx/conf.d/public_mcs.conf | grep proxy_pass
   ```
1. Перейдите на узел с установленным AWS CLI (наличие проверяется командой `aws --version` — должно появиться сообщение вида `aws-cli/2.7.24 Python/3.8.8 Linux/4.14.133-113.105.amzn2.x86_64 botocore/1.13`).
1. Убедитесь, что текущий пользователь видит бакет с приложениями Marketplace, выполнив команду:
   
   ```bash
   aws s3 ls --recursive --endpoint-url <ENDPOINT_URL> s3://<MARKETPLACE_FOLDER_PATH>/
   ```

## {heading(Шаг 2. Создание новой директории с шаблоном приложения)[id=marketplace_add_app_step_2]}

1. Войдите на управляющий узел по SSH.
1. Найдите директорию `marketplace_templates` с помощью поиска и перейдите в неё. Если такой директории не существует, создайте её в `/var/lib/marketplace`.
1. Создайте директорию с новым шаблоном приложения:
   
   ```bash
   mkdir -p /var/lib/marketplace/marketplace_templates/<название приложения>/0.1.0
   ```

## {heading(Шаг 3. Создание структуры шаблона приложения)[id=marketplace_add_app_step_3]}

Типовая структура шаблона приложения должна включать в себя следующие файлы и директории:

* Обязательные файлы:
   
   * `metadata.yml` — файл с метаданными приложения.
   * `stack.yml` — файл в формате [Heat Orchestration Template (HOT)](https://docs.openstack.org/heat/latest/template_guide/hot_spec.html) с манифестом по установке приложения.
   * `logo.svg` — логотип приложения в векторном формате.
   * `HOWTO.md` — инструкция, которая отображается пользователю после установки приложения. Поддерживает формат Markdown и шаблонизацию переменных в виде [Lodash template](https://lodash.com/docs/#template).
  
* Необязательные файлы и директории:
   
   * Директория `ansible` со списком ролей, которые будут применяться во время установки приложения.
   * Дополнительные YML-файлы, которые требуются для установки multi-node приложений.

Далее приведен пример структуры шаблона приложения GitLab CE.

### {heading(metadata.yml)[id=metadata]}

Параметры файла `metadata.yml` приведены ниже в {linkto(#tab_file_options_metadata)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_file_options_metadata]} — Параметры файла metadata.yml)[position=above;align=right;id=tab_file_options_metadata;number={const(numb_tab_file_options_metadata)}]}

[cols="2,5", options="header"]
|===
|Название
|Описание

|id
|Уникальный идентификатор приложения

|title
|Название приложения (короткое)

|bundle_version
|Версия комплекта (бандла)

|description_short
|Короткое описание приложения для отображения в списке карточек

|description_long
|Длинное описание приложения. Отображается в верхней части мастера установки

|application_version_string
|Строковое описание версии приложения

|application_version
|Структура, описывающая версию приложения или его компонент

|ssh_access_mode
|Предоставление доступа по SSH. Возможные значения:
* `NO_ACCESS` — доступ по SSH не предоставляется.
* `USER_LIMITED` — добавление ключа пользователя при создании ВМ; возможность выполнить команды от имени пользователей, запускающие пользовательские сервисы.
* `FULL` — добавление ключа пользователя при создании ВМ; предоставление root-доступа

|external_url
|URL сайта вендора

|mcs_marketplace_mark
|Признак Marketplace. Всегда `true`

|requires_external_licensing
|Используется ли внешний сервер лицензий. Возможные значения: `true`, `false`

|tags
|Массив тегов. Обязательно указание хотя бы одного тега
|===
{/caption}

Содержимое файла `metadata.yml` приведено в листинге ниже.

{caption(Содержимое файла metadata.yml для GitLab CE)[align=left;position=above]}
```yaml
id: gitlab
title: GitLab CE
bundle_version: 0.1.0
description_short: Система управления репозиториями кода для Git и CI/CD сервер
description_long: Система управления репозиториями кода для Git с функциями CI/CD-сервера и Docker Registry на базе GitLab.
application_version_string: 13.1
application_version:
    gitlab_version: 13.1
ssh_access_mode: FULL
external_url: https://gitlab.com/
mcs_marketplace_mark: true
requires_external_licensing: false
tags:
    - dev_tools
    - ci_cd
```
{/caption}

### {heading(stack.yml)[id=stack]}

Параметры файла `stack.yml` приведены ниже в {linkto(#tab_file_options_stack)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_file_options_stack]} — Параметры файла stack.yml)[position=above;align=right;id=tab_file_options_stack;number={const(numb_tab_file_options_stack)}]}

[cols="2,5", options="header"]
|===
|Название
|Описание

2+|**Системные параметры секции `parameters` (отображаются на первой странице установки в UI)**

|instance_type
|Тип ВМ (Flavor)

|availability_zone
|Зона доступности

|volume_size
|Размер root-диска

|volume_type
|Тип root-диска

|network_id
|Имя приватной сети

|sub_network_id
|Имя подсети приватной сети

|security_group_name
|Название группы безопасности

|key_name
|SSH-ключ для входа под root/ограниченным пользователем

2+|**Пример дополнительных параметров секции `parameters` (отображаются на второй странице установки в UI)**

|admin_user_name
|Имя администратора (не email-адрес)

|admin_user_email
|Email-адрес администратора

|admin_user_password
|Пароль администратора

|application_domain_name
|Название домена, на который будет разворачиваться приложение

2+|**Выходные параметры секции `outputs`**

2+|Определяются [Спецификацией формата Шаблона оркестрации для HEAT (HOT)](https://docs.openstack.org/heat/rocky/template_guide/hot_spec.html#outputs-section).
В UI не отображаются следующие параметры:
* `ansible_stdout`.
* `ansible_stderr`.
* `ansible_status_code`.

UI скрывает по умолчанию значение параметров с суффиксом `password`. При этом есть возможность скопировать этот пароль или отобразить его
|===
{/caption}

Содержимое файла `stack.yml` приведено в листинге ниже.

{caption(Содержимое файла stack.yml для GitLab CE)[align=left;position=above]}

```yaml
heat_template_version: 2015-04-30

description: Gitlab CE 13.1

parameters:

  key_name:
    type: string
    constraints:
      - custom_constraint: nova.keypair

  instance_type:
    type: string
    default: Standard-2-4-50

  network_id:
    type: string
    default: int-net1

  volume_type:
    type: string
    default: ssd

  volume_size:
    type: number
    default: 20

  availability_zone:
    type: string

  image_id:
    type: string
    default: Ubuntu-22.04-Marketplace-Basic

  gitlab_version:
    type: string
    hidden: true
    default: 13.1

  ansible_role_url:
    type: string
    hidden: true

resources:

  external_access:
    type: OS::Neutron::SecurityGroup
    properties:
      rules:
        - protocol: tcp
          port_range_min: 443
          port_range_max: 443
        - protocol: tcp
          port_range_min: 22
          port_range_max: 22

  gitlab_password:
    type: OS::Heat::RandomString
    properties:
      length: 16
      sequence: lettersdigits

  instance_port:
    type: OS::Neutron::Port
    properties:
      network_id: { get_param: network_id }
      security_groups:
        - { get_resource: external_access }
        - "default"

  instance_fip:
    type: OS::Neutron::FloatingIP
    properties:
      floating_network: ext-net
      port_id: { get_resource: instance_port }

  instance_volume:
    type: OS::Cinder::Volume
    properties:
      availability_zone: { get_param: availability_zone }
      image: { get_param: image_id }
      size: { get_param: volume_size }
      volume_type: { get_param: volume_type }

  instance:
    type: OS::Nova::Server
    properties:
      flavor: { get_param: instance_type }
      availability_zone: { get_param: availability_zone }
      block_device_mapping:
        - device_name: vda
          volume_id: { get_resource: instance_volume }
          delete_on_termination: "true"
      key_name: { get_param: key_name }
      networks:
        - port: { get_resource: instance_port }
      software_config_transport: POLL_SERVER_HEAT
      user_data_format: SOFTWARE_CONFIG

  instance_config:
    type: OS::Heat::SoftwareConfig
    properties:
      group: ansible
      inputs:
        - name: ansible_roles_url
        - name: gitlab_password
        - name: gitlab_version
        - name: instance_fip
      config: |
        - name: Install and configure
          connection: local
          hosts: localhost
          tasks:
          - unarchive:
              src: "{{ ansible_roles_url }}"
              dest: /etc/ansible/
              remote_src: yes
          - include_role:
              name: gitlab-ce
            vars:
              gitlab_password: "{{ gitlab_password }}"
              gitlab_version: "{{ gitlab_version }}"
              instance_fip: "{{ instance_fip }}"
          - include_role:
              name: enable_apt_daily


  instance_deployment:
    depends_on:  instance_fip
    type: OS::Heat::SoftwareDeployment
    properties:
      signal_transport: HEAT_SIGNAL
      config:
        get_resource: instance_config
      server:
        get_resource: instance
      input_values:
        ansible_roles_url: { get_param: ansible_role_url }
        gitlab_password: {get_resource: gitlab_password}
        gitlab_version: {get_param: gitlab_version}
        instance_fip:
          get_attr: [instance_fip, floating_ip_address]
      actions:
      - CREATE

outputs:

  instance_url:
    description: URL Gitlab CE
    value:
      str_replace:
        template: https://host/
        params:
          host:
            get_attr: [instance_fip, floating_ip_address]

  gitlab_user:
    description: Имя пользователя
    value: "root"

  gitlab_password:
    description: Пароль пользователя (сменить при первом входе)
    value: {get_resource: gitlab_password}

  ansible_stdout:
    description: Ansible execution standard output
    value:
      get_attr: [instance_deployment, deploy_stdout]

  ansible_stderr:
    description: Ansible execution standard error
    value:
      get_attr: [instance_deployment, deploy_stderr]

  ansible_status_code:
    description: Ansible execution status code
    value:
      get_attr: [instance_deployment, deploy_status_code]
```
{/caption}

### {heading(logo.svg)[id=logo]}

<warn>

Желательно использовать квадратный логотип.

</warn>

{caption(Содержимое файла logo.svg для GitLab CE)[align=left;position=above]}

```svg
<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg">
  <path d="M105.0614 203.655l38.64-118.921h-77.28l38.64 118.921z" fill="#e24329"/>
  <path d="M105.0614 203.6548l-38.64-118.921h-54.153l92.793 118.921z" fill="#fc6d26"/>
  <path d="M12.2685 84.7341l-11.742 36.139c-1.071 3.296.102 6.907 2.906 8.944l101.629 73.838-92.793-118.921z" fill="#fca326"/>
  <path d="M12.2685 84.7342h54.153l-23.273-71.625c-1.197-3.686-6.411-3.685-7.608 0l-23.272 71.625z" fill="#e24329"/>
  <path d="M105.0614 203.6548l38.64-118.921h54.153l-92.793 118.921z" fill="#fc6d26"/>
  <path d="M197.8544 84.7341l11.742 36.139c1.071 3.296-.102 6.907-2.906 8.944l-101.629 73.838 92.793-118.921z" fill="#fca326"/>
  <path d="M197.8544 84.7342h-54.153l23.273-71.625c1.197-3.686 6.411-3.685 7.608 0l23.272 71.625z" fill="#e24329"/>
</svg>
```
{/caption}

### {heading(HOWTO.md)[id=HOWTO]}

Файл `HOWTO.md` отображается пользователю на завершающем этапе установки приложения. Поддерживает формат Markdown и шаблонизацию переменных в виде [Lodash template](https://lodash.com/docs/#template): допускается использовать переменные из полей `metadata` и `outputs`. Например, `Введите логин ${outputs.registry_user} и пароль ${outputs.registry_password}`.

{caption(Содержимое файла HOWTO.md для GitLab CE)[align=left;position=above]}

```md
# Быстрый старт

1. Используя логин и пароль, полученный на этапе установки, зайдите по адресу GitLab-сервера.
2. Для расширенной конфигурации GitLab используйте [официальную документацию](https://docs.gitlab.com/ee/user/index.html)

# Администрирование

1. [Настройка GitLab как Docker container registy](https://docs.gitlab.com/ce/administration/container_registry.html#container-registry-domain-configuration)
2. [Конфигурация SMTP для исходящих email-сообщений](https://docs.gitlab.com/omnibus/settings/smtp.html)
3. [Изменение DNS-имени GitLab-сервера](https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab)
4. [Запуск и остановка сервисов](https://docs.gitlab.com/omnibus/maintenance/README.html#starting-and-stopping)
5. [Управление созданием и восстановлением резервных копий](https://docs.gitlab.com/omnibus/settings/backups.html)
6. [Обновление GitLab CE](https://docs.gitlab.com/omnibus/update/README.html#updating-using-the-official-repositories)
```
{/caption}

### {heading(Директория Ansible)[id=directory_ansible]}

<err>

Рекомендуется запаковать содержимое директории в `.tar.gz` архив.

</err>

Предполагаемая процедура установки приложений с помощью Ansible:

1. Создание всех необходимых ресурсов (виртуальных машин, сетей, групп безопасности и др.) с помощью Heat.
1. Запуск роли Ansible внутри созданных виртуальных машин.
1. Возвращение результатов работы Ansible в output-параметры Heat-стека.

Далее приведено содержимое файлов с указанием пути к ним.

{caption(Содержимое файла ansible/roles/enable_apt_daily/tasks/main.yml)[align=left;position=above]}
```yaml
- name: Enable apt daily
  systemd:
    name: "{{ item }}"
    enabled: yes
  loop:
    - apt-daily.service
    - apt-daily.timer
    - apt-daily-upgrade.service
    - apt-daily-upgrade.timer
```
{/caption}

{caption(Содержимое файла ansible/roles/gitlab-ce/defaults/main.yml)[align=left;position=above]}
```yaml
# General config.
gitlab_external_url: "https://gitlab.com/"
gitlab_git_data_dir: "/var/opt/gitlab/git-data"
gitlab_edition: "gitlab-ce"
gitlab_version: ''
gitlab_backup_path: "/var/opt/gitlab/backups"
gitlab_config_template: "gitlab.rb.j2"

# SSL Configuration.
gitlab_redirect_http_to_https: "true"
gitlab_ssl_certificate: "/etc/gitlab/ssl/gitlab.crt"
gitlab_ssl_certificate_key: "/etc/gitlab/ssl/gitlab.key"

# SSL Self-signed Certificate Configuration.
gitlab_self_signed_cert_subj: "/CN=gitlab"

# LDAP Configuration.
gitlab_ldap_enabled: "false"
gitlab_ldap_host: "example.com"
gitlab_ldap_port: "389"
gitlab_ldap_uid: "sAMAccountName"
gitlab_ldap_method: "plain"
gitlab_ldap_bind_dn: "CN=Username,CN=Users,DC=example,DC=com"
gitlab_ldap_password: "password"
gitlab_ldap_base: "DC=example,DC=com"

# SMTP Configuration
gitlab_smtp_enable: "false"
gitlab_smtp_address: "smtp.server"
gitlab_smtp_port: "465"
gitlab_smtp_user_name: "smtp user"
gitlab_smtp_password: "smtp password"
gitlab_smtp_domain: "example.com"
gitlab_smtp_authentication: "login"
gitlab_smtp_enable_starttls_auto: "true"
gitlab_smtp_tls: "false"
gitlab_smtp_openssl_verify_mode: "none"
gitlab_smtp_ca_path: "/etc/ssl/certs"
gitlab_smtp_ca_file: "/etc/ssl/certs/ca-certificates.crt"

# 2-way SSL Client Authentication support.
gitlab_nginx_ssl_verify_client: ""
gitlab_nginx_ssl_client_certificate: ""

# Probably best to leave this as the default, unless doing testing.
gitlab_restart_handler_failed_when: 'gitlab_restart.rc != 0'

# Optional settings.
gitlab_time_zone: "UTC"
gitlab_backup_keep_time: "604800"
gitlab_download_validate_certs: true
gitlab_default_theme: '2'

# Email configuration.
gitlab_email_enabled: "false"
gitlab_email_from: "gitlab@example.com"
gitlab_email_display_name: "Gitlab"
gitlab_email_reply_to: "gitlab@example.com"
```
{/caption}

{caption(Содержимое файла ansible/roles/gitlab-ce/handlers/main.yml)[align=left;position=above]}
```yaml
- name: restart gitlab
  command: gitlab-ctl reconfigure
  register: gitlab_restart
  failed_when: gitlab_restart_handler_failed_when
```
{/caption}

{caption(Содержимое файла ansible/roles/gitlab-ce/tasks/main.yml)[align=left;position=above]}
```yaml
- name: Check if GitLab configuration file already exists.
  stat: path=/etc/gitlab/gitlab.rb
  register: gitlab_config_file

- name: Check if GitLab is already installed.
  stat: path=/usr/bin/gitlab-ctl
  register: gitlab_file

# Install GitLab and its dependencies.
- name: Install GitLab dependencies.
  apt:
    name:
      - postfix
    state: present
    update_cache: yes

- name: Download GitLab repository installation script.
  get_url:
    url: "https://packages.gitlab.com/install/repositories/gitlab/{{ gitlab_edition }}/script.deb.sh"
    dest: /tmp/gitlab_install_repository.sh
  when: (gitlab_file.stat.exists == false)

- name: Install GitLab repository
  command: bash /tmp/gitlab_install_repository.sh
  when: (gitlab_file.stat.exists == false)

- name: Define the Gitlab package name.
  set_fact:
    gitlab_package_name: "{{ gitlab_edition }}={{ gitlab_version }}"
  when: gitlab_version != ''

- name: Install GitLab
  package:
    name: "gitlab-ce={{ gitlab_version }}"
    state: present
  when: (gitlab_file.stat.exists == false)

- name: Copy GitLab configuration file.
  template:
    src: "{{ gitlab_config_template }}"
    dest: /etc/gitlab/gitlab.rb
    owner: root
    group: root
    mode: 0600
  notify: restart gitlab

- name: Create GitLab SSL configuration folder.
  file:
    path: /etc/gitlab/ssl
    state: directory
    owner: root
    group: root
    mode: 0700
  notify: restart gitlab

- name: Create self-signed certificate.
  command: >
    openssl req -new -nodes -x509 -subj "{{ gitlab_self_signed_cert_subj }}"
    -days 3650 -keyout {{ gitlab_ssl_certificate_key }} -out {{ gitlab_ssl_certificate }} -extensions v3_ca
    creates={{ gitlab_ssl_certificate }}
  notify: restart gitlab
```
{/caption}

{caption(Содержимое файла ansible/roles/gitlab-ce/templates/gitlab.rb.j2)[align=left;position=above]}
```json
# The URL through which GitLab will be accessed.
external_url "https://{{ instance_fip }}/"

# gitlab.yml configuration
gitlab_rails['initial_root_password'] = "{{ gitlab_password }}"
gitlab_rails['time_zone'] = "{{ gitlab_time_zone }}"
gitlab_rails['backup_keep_time'] = {{ gitlab_backup_keep_time }}
gitlab_rails['gitlab_email_enabled'] = {{ gitlab_email_enabled }}
{% if gitlab_email_enabled == "true" %}
gitlab_rails['gitlab_email_from'] = "{{ gitlab_email_from }}"
gitlab_rails['gitlab_email_display_name'] = "{{ gitlab_email_display_name }}"
gitlab_rails['gitlab_email_reply_to'] = "{{ gitlab_email_reply_to }}"
{% endif %}

# Default Theme
gitlab_rails['gitlab_default_theme'] = "{{ gitlab_default_theme }}"

# Whether to redirect http to https.
nginx['redirect_http_to_https'] = {{ gitlab_redirect_http_to_https }}
nginx['ssl_certificate'] = "{{ gitlab_ssl_certificate }}"
nginx['ssl_certificate_key'] = "{{ gitlab_ssl_certificate_key }}"

# The directory where Git repositories will be stored.
git_data_dirs({"default" => {"path" => "{{ gitlab_git_data_dir }}"} })

# The directory where Gitlab backups will be stored
gitlab_rails['backup_path'] = "{{ gitlab_backup_path }}"

# These settings are documented in more detail at
# https://gitlab.com/gitlab-org/gitlab-ce/blob/master/config/gitlab.yml.example#L118
gitlab_rails['ldap_enabled'] = {{ gitlab_ldap_enabled }}
gitlab_rails['ldap_host'] = '{{ gitlab_ldap_host }}'
gitlab_rails['ldap_port'] = {{ gitlab_ldap_port }}
gitlab_rails['ldap_uid'] = '{{ gitlab_ldap_uid }}'
gitlab_rails['ldap_method'] = '{{ gitlab_ldap_method}}' # 'ssl' or 'plain'
gitlab_rails['ldap_bind_dn'] = '{{ gitlab_ldap_bind_dn }}'
gitlab_rails['ldap_password'] = '{{ gitlab_ldap_password }}'
gitlab_rails['ldap_allow_username_or_email_login'] = true
gitlab_rails['ldap_base'] = '{{ gitlab_ldap_base }}'

# GitLab Nginx
## See https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/nginx.md
{% if gitlab_nginx_listen_port is defined %}
nginx['listen_port'] = "{{ gitlab_nginx_listen_port }}"
{% endif %}
{% if gitlab_nginx_listen_https is defined %}
nginx['listen_https'] = {{ gitlab_nginx_listen_https }}
{% endif %}

# Use smtp instead of sendmail/postfix
# More details and example configuration at
# https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/smtp.md
gitlab_rails['smtp_enable'] = {{ gitlab_smtp_enable }}
gitlab_rails['smtp_address'] = '{{ gitlab_smtp_address }}'
gitlab_rails['smtp_port'] = {{ gitlab_smtp_port }}
gitlab_rails['smtp_user_name'] = '{{ gitlab_smtp_user_name }}'
gitlab_rails['smtp_password'] = '{{ gitlab_smtp_password }}'
gitlab_rails['smtp_domain'] = '{{ gitlab_smtp_domain }}'
gitlab_rails['smtp_authentication'] = '{{ gitlab_smtp_authentication }}'
gitlab_rails['smtp_enable_starttls_auto'] = {{ gitlab_smtp_enable_starttls_auto }}
gitlab_rails['smtp_tls'] = {{ gitlab_smtp_tls }}
gitlab_rails['smtp_openssl_verify_mode'] = '{{ gitlab_smtp_openssl_verify_mode }}'
gitlab_rails['smtp_ca_path'] = '{{ gitlab_smtp_ca_path }}'
gitlab_rails['smtp_ca_file'] = '{{ gitlab_smtp_ca_file }}'

# 2-way SSL Client Authentication.
{% if gitlab_nginx_ssl_verify_client %}
nginx['ssl_verify_client'] = "{{ gitlab_nginx_ssl_verify_client }}"
{% endif %}
{% if gitlab_nginx_ssl_client_certificate %}
nginx['ssl_client_certificate'] = "{{ gitlab_nginx_ssl_client_certificate }}"
{% endif %}

# To change other settings, see:
# https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md#changing-gitlab-yml-settings
```
{/caption}

## {heading(Шаг 4. Добавление конфигурации в configuration.json)[id=marketplace_add_app_step_4]}

Файл `configuration.json` определяет позиции каталога приложений в Marketplace.

<err>

Если адрес объектного хранилища с конфигурацией неизвестен, предварительно выполните {linkto(#marketplace_add_app_step_1)[text=%text]}.

</err>

Чтобы добавить конфигурацию для создаваемого приложения:

1. Скачайте файл конфигурации `configuration.json` с сервера, выполнив команду:
   
   ```bash
   aws s3 cp --endpoint-url <ENDPOINT_URL> s3://<MARKETPLACE_FOLDER_PATH>/configurations.json ./
   ```
2. Добавьте в файл `marketplace/configuration.json` конфигурацию из файла `metadata.yml` в формате JSON с указанием параметра `ansible_role_url` — URL ansible-роли. Если создается первое приложение, дополнительно «оберните» конфигурацию в квадратные скобки `[]`.

   {caption(Пример заполнения файла configuration.json для GitLab CE)[align=left;position=above]}
   ```json
   [
       {
           "bundle_version": "0.1.0",
           "ansible_role_url": "https://<адрес хоста>/marketplace_templates/gitlab_ce/0.1.0/ansible_roles.tar.gz",
           "title": "GitLab CE",
           "description_short": "Система управления репозиториями кода для Git и CI/CD сервера",
           "tags": [
               "dev_tools",
               "ci_cd"
           ],
           "id": "gitlab",
           "description_long": "Система управления репозиториями кода для Git с функциями CI/CD-сервера и Docker Registry на базе GitLab.",
           "requires_external_licensing": false,
           "template_folder": "gitlab_ce",
           "application_version_string": 13.1,
           "ssh_access_mode": "FULL",
           "application_version": {
               "gitlab_version": 13.1
           },
           "external_url": "https://gitlab.com/"
       }
   ]
   ```
   {/caption}

3. Выгрузите обновлённый файл `configuration.json` в объектное хранилище:
   
   ```bash
   aws s3 cp --recursive --endpoint-url <ENDPOINT_URL> <ПУТЬ_ДО_ФАЙЛА_КОНФИГУРАЦИИ> s3://<MARKETPLACE_FOLDER_PATH>/configurations.json
   ```

## {heading(Шаг 5. Выгрузка созданного приложения в объектное хранилище и установка разрешения для доступа на чтение)[id=marketplace_add_app_step_5]}

Чтобы выгрузить созданное приложение, выполните команду:

```bash
aws s3 cp --recursive --endpoint-url <ENDPOINT_URL> <ПУТЬ_ДО_СОЗДАННОГО_ПРИЛОЖЕНИЯ> s3://<MARKETPLACE_FOLDER_PATH>/
```

Чтобы установить разрешения для доступа на чтение, выполните команды:

```bash
aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <НАЗВАНИЕ_ПРИЛОЖЕНИЯ>/0.1.0/HOWTO.md --acl public-read
aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <НАЗВАНИЕ_ПРИЛОЖЕНИЯ>/0.1.0/logo.svg --acl public-read
aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <НАЗВАНИЕ_ПРИЛОЖЕНИЯ>/0.1.0/marketplace_<НАЗВАНИЕ_ПРИЛОЖЕНИЯ>_roles.tar.gz --acl public-read
aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <НАЗВАНИЕ_ПРИЛОЖЕНИЯ>/0.1.0/metadata.yml --acl public-read
aws s3api put-object-acl --bucket <ИМЯ_БАКЕТА> --key <НАЗВАНИЕ_ПРИЛОЖЕНИЯ>/0.1.0/stack.yml --acl public-read
```