# {heading(Доступ к интерфейсам)[id=interfaces_access]}

## {heading(Вход на деплой-ноду по SSH)[id=deploy_host_auth]}

Деплой-нода — вспомогательный узел, упрощающий процедуры установки и обновления компонентов {var(sys2)}. С этого узла возможно перейти на управляющие и вычислительные узлы {var(sys2)}.

Чтобы перейти на деплой-ноду, выполните подключение по её адресу по протоколу SSH:

{caption(Команда для подключения к деплой-ноде по SSH)[align=left;position=above]}
```console
$ ssh <ИМЯ_ПОЛЬЗОВАТЕЛЯ>@<IP_ХОСТА>
```
{/caption}

<warn>

По умолчанию могут быть использованы пользователи `centos`. Но для доступа понадобится ключевая пара (или закрытый SSH ключ от одного из открытых ключей, настроенных на деплой-ноде).

</warn>

При успешном входе на деплой-ноду приветствие командной строки соответствует имени деплой-ноды.

## {heading(Вход на управляющий/вычислительный узел по SSH)[id=control_note_auth]}

Процедура входа на управляющий и вычислительный узлы аналогична.

1. Выполните вход на деплой-ноду по SSH (подробнее — в разделе {linkto(#deploy_host_auth)[text=%text]}).
1. Войдите под пользователем `centos`, если этого не было сделано ранее:

   ```console
   $ sudo su - centos
   ```

1. Если имя узла неизвестно, получите список узлов:

   ```console
   $ cat /etc/hosts
   ```

   Найдите название нужного узла в списке.

1. Перейдите на требуемый узел:

   ```console
   $ ssh <ИМЯ_УПРАВЛЯЮЩЕГО_ИЛИ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>
   ```

<warn>

По умолчанию для переключения между узлами настроен беспарольный вход для пользователя `centos` (есть на всех узлах). Но может требоваться корректная ключевая пара (закрытый SSH ключ).

</warn>

<err>

Названия узлов {var(sys2)} (их доменные имена) по умолчанию задаются при установке {var(sys2)}. Значения по умолчанию могут отличаться в зависимости от используемой версии и заданной конфигурации установки, например: `cpn00X` или `controllerX`.

</err>

## {heading(Использование OpenStack CLI для управления {var(sys5)})[id=use_openstackcli]}

С помощью OpenStack CLI можно выполнить большинство настроек и операций с {var(sys5)}.

### {heading(Вход для Администратора {var(sys2)})[id=use_openstackcli_admin]}

Администратор {var(sys2)} обладает максимальными правами доступа и может не только работать с виртуальными ресурсами в рамках проектов, но и менять параметры работы {var(sys2)} в целом. Подробная информация о ролях и правах доступа приведена в разделе {linkto(../../arch/arch-roles#arch-roles)[text=%text]}.

Для доступа к управлению {var(sys5)} с правами Администратора {var(sys2)}:

1. Подключитесь к деплой-ноде по SSH (подробнее — в разделе {linkto(#deploy_host_auth)[text=%text]}).

   <err>

   По умолчанию доступен вход по SSH ключу от имени пользователя `centos`. По желанию заказчика может быть настроен персонифицированный доступ.

   </err>
1. Выполните подключение к одному из управляющих узлов (по умолчанию нужные данные хранятся только на управляющем узле № 3):

   ```console
   $ ssh cpn003
   ```
   
1. Переключитесь на пользователя `root`:

   ```console
   $ sudo bash
   ```
   
1. Выполните Bash-скрипт из файла `~root/openrc.sh` для загрузки в переменные окружения параметров подключения к кластеру:

   ```console
   # source ~root/openrc.sh
   ```
   
1. Проверьте подключение к OpenStack CLI:

   ```console
   # openstack host list
   ```

   При успешном выполнении команды должен отобразиться список узлов. В случае ошибки подключения будет выведено сообщение об ошибке.

<err>

Файл `~root/openrc.sh` содержит данные для аутентификации с ролью Администратор {var(sys2)}.

</err>

### {heading(Вход для Пользователя {var(sys2)})[id=user_auth]}

Для пользователей {var(sys2)} с любой ролью интерфейс OpenStack CLI позволяет выполнять множество операций по управлению ресурсами в рамках их проекта.

Для доступа к OpenStack CLI пользователю {var(sys2)} требуются следующие инструменты и файлы:

* Программное обеспечение (ПО), обеспечивающее доступ к OpenStack CLI (подробнее — в разделе {linkto(#prerequisites_openstack_cli_software)[text=%text]}).
* Конфигурационный файл с параметрами подключения к кластеру (подробнее — в разделе {linkto(#prerequisites_openstack_cli_config)[text=%text]}).

#### {heading(Процесс подключения)[id=user_process_connect]}

Чтобы подключиться к среде с установленным {linkto(#prerequisites_openstack_cli_software)[text=ПО для доступа к OpenStack CLI]}:

1. Установите OpenStack CLI:

   ```console
   $ pip install python-openstackclient
   ```

{ifndef(cer)}
1. Установите клиент Manila:

   ```console
   $ pip install python-manilaclient
   ```

1. Установите клиент Trove:

   ```console
   $ pip install python-troveclient
   ```
{/ifndef}

1. Выполните загрузку параметров подключения из {linkto(#prerequisites_openstack_cli_config)[text=конфигурационного файла]}:

   ```console
   $ source ~/users_projects-openrc.sh
   ```

   Здесь `~/users_projects-openrc.sh` — путь к конфигурационному файлу для подключения.

1. При необходимости введите токен API.

   {caption(Пример запроса токена API)[align=left;position=above]}
   ```console
   Please enter your API token for project 5e5653f0e0024f9a9da58aa7573997be
   ```
   {/caption}

1. Проверьте подключение OpenStack CLI:

   ```console
   # openstack host list
   ```

#### {heading(ПО для подключения к OpenStack CLI)[id=prerequisites_openstack_cli_software]}

<!--- //Версии пакетов, используемые в продукте, по информации от Дмития Краснова на 15.12.2023. -->

Для подключения рекомендуется использование пакета `python3-openstackclient-5.6.0`.

{ifndef(cer)}
Для его запуска могут потребоваться пакеты:

* `python3-keystoneclient-3.10.0`.
{ifdef(box)}

* `python3-barbicanclient-5.2.0`.
{/ifdef}
* `python3-novaclient-7.1.2`.
* `python3-cinderclient-1.11.1`.
* `python3-glanceclient-2.6.0`.
* `python3-neutronclient-6.1.1`.
{ifdef(box)}

* `python3-manilaclient-1.14.1`.
{/ifdef}
* `python3-octaviaclient-1.8.2`.
{/ifndef}

#### {heading(Конфигурационный файл для подключения)[id=prerequisites_openstack_cli_config]}

Конфигурационный файл для подключения к OpenStack CLI содержит параметры для подключения к кластеру и выполнения запросов.

Чтобы получить конфигурационный файл в Портале самообслуживания:

1. Выполните вход в Портал самообслуживания с учётными данными Пользователя {var(sys2)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API** и нажмите кнопку **Скачать openrc версии 3**.
1. Сохраните файл на локальном диске. Скачанный файл является конфигурационным файлом для подключения к OpenStack CLI.

<!--- //todo исправить файл после выполнения VKCSFA-1993 -->

{caption(Пример содержания конфигурационного файла)[align=left;position=above]}
```yaml
#!/usr/bin/env bash

export OS_AUTH_URL="https://URL.ru:5000/v3/"
export OS_AUTH_TYPE="v3token"
export OS_PROJECT_ID="7a1dd7b9be3246a4b113e349b288a210"
export OS_REGION_NAME="RegionOne"
unset OS_PROJECT_NAME
unset OS_PROJECT_DOMAIN_ID

# unset v2.0 items in case set
unset OS_TENANT_ID
unset OS_TENANT_NAME

if [[ -z $OS_USERNAME ]] || [[ -z $OS_PASSWORD ]] || [[ "$OS_USERNAME" != "test@mcs.mail.ru" ]]; then

export OS_USERNAME="test@mcs.mail.ru"
export OS_USER_DOMAIN_NAME="users"

echo "Please enter your API token for project $OS_PROJECT_ID"
read -sr OS_TOKEN_INPUT
export OS_TOKEN=$OS_TOKEN_INPUT

export OS_INTERFACE=public
export OS_IDENTITY_API_VERSION=3
```
{/caption}

## {heading(Использование REST API для управления {var(sys5)})[id=interface_rest_api]}

Некоторые операции в {var(sys3)} (например, удаление вычислительного узла из `nova-placement-api`) выполняются только с помощью REST API.

HTTP/HTTPS запросы к REST API по умолчанию будут работать с деплой-ноды и/или управляющего узла. Чтобы они работали из других подсетей, необходимо открыть доступ из них (Firewall и маршрутизация).

<!--- //#todo уточнить, где и что требуется настроить, чтобы выполнять запросы из любого места -->

### {heading(Получение токена аутентификации)[id=http_api_get_auth_token]}

Перед выполнением запроса к REST API {var(sys2)} требуется получение токена аутентификации.

Чтобы получить токен аутентификации, используйте один из интерфейсов:

* Портал администратора.
* Портал самообслуживания.
{ifdef(box)}
* OpenStack CLI.
{/ifdef}

<warn>

Все выпущенные токены сохраняют свою валидность до истечения времени их жизни.

</warn>

#### {heading(Портал администратора)[id=http_api_get_auth_token_admin]}

1. Выполните вход в Портал администратора с учётными данными Администратора {var(sys2)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Профиль**.
1. Перейдите на вкладку **Безопасность**.
1. Скопируйте значение параметра **Токен для доступа к API**.

#### {heading(Портал самообслуживания)[id=http_api_get_auth_token_user]}

1. Выполните вход в Портал самообслуживания с учётными данными Пользователя {var(sys2)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. Скопируйте значение параметра **Токен для доступа к API**.

{ifdef(box)}

#### {heading(OpenStack CLI)[id=http_api_get_auth_token_cli]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

   ```console
   # openstack token issue -c id -f value
   ```

   {/ifdef}

{caption(Пример использования токена аутентификации в запросах)[align=left;position=above]}
```console
# curl -X POST -H "X-Auth-Token: <ТОКЕН>" <ТЕКСТ_ЗАПРОСА>
```
{/caption}

### {heading(Перевыпуск токена аутентификации)[id=http_api_reissue_auth_token]}

Чтобы перевыпустить токен аутентификации, используйте один из интерфейсов:

* Портал администратора.
* Портал самообслуживания.

#### {heading(Портал администратора)[id=http_api_reissue_auth_token_admin]}

1. Выполните вход в Портал администратора с учётными данными Администратора {var(sys2)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Профиль**.
1. Перейдите на вкладку **Безопасность**.
1. Нажмите кнопку **Перевыпустить** справа от поля со значением токена.

#### {heading(Портал самообслуживания)[id=http_api_reissue_auth_token_user]}

1. Выполните вход в Портал самообслуживания с учётными данными Пользователя {var(sys2)}.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API**.
1. В нижней части экрана нажмите кнопку **Перевыпустить** справа от поля со значением токена.

### {heading(Настройка временных ограничений доступов)[id=session_expire_period]}

<warn>

Значение переменной `session_expire_period` задаёт следующие ограничения:

* Время бездействия пользователя.
* Время жизни токена аутентификации.

</warn>

1. Подключитесь к деплой-ноде по SSH (подробнее — в разделе {linkto(#deploy_host_auth)[text=%text]}), с которой был запущен инсталлятор {var(sys2)}.
1. В файле `~/inventory/vkcloud/group_vars/vkcloud/vars.yml` в переменной `session_expire_period` укажите время в секундах.
1. С помощью инсталлятора запустите плейбуки `dusk-deploy`, `helm-auth-service` и `helm-keystone`:

   ```console
   $ ../ansible-openstack/tools/box.sh deploy \
      -s iam \
      -b ../ansible-openstack \
      -i vkcloud.yml \
      --playbook dusk-deploy.yml

   $ ../ansible-openstack/tools/box.sh deploy \
      -s iam \
      -b ../ansible-openstack \
      -i vkcloud.yml \
      --playbook helm-auth-service.yml

   $ ../ansible-openstack/tools/box.sh deploy \
      -s core \
      -b ../ansible-openstack \
      -i vkcloud.yml \
      --playbook helm-keystone.yml
   ```

### {heading(Точка доступа сервиса (Endpoints))[id=http_api_endpoints]}

Чтобы получить точки доступа к API, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в Руководстве пользователя Private Cloud).
* OpenStack CLI.

Чтобы получить точки доступа к API в OpenStack CLI:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(#use_openstackcli_admin)[text=%text]}).
1. Выполните команду:

```console
# openstack endpoint list
```

### {heading(Методы для REST API OpenStack)[id=http_api_rest_cli]}

После получения токена доступа (подробнее — в разделе {linkto(#http_api_get_auth_token)[text=%text]}) возможна работа с {var(sys5)} через REST API. Список методов для сервисов OpenStack приведён в [официальной документации](https://docs.openstack.org/api-quick-start/#current-api-versions).

{caption(Общий вид синтаксиса команд для вызова сервисов OpenStack через curl)[align=left;position=above]}
```console
# curl -X <ТИП_ЗАПРОСА> <ПАРАМЕТРЫ> -d <ТЕЛО_ЗАПРОСА> -H "Content-Type: application/json" -H "X-Auth-Token: <ТОКЕН>" <АДРЕС_ЭНДПОИНТА>/<МЕТОД>
```
{/caption}

## {heading(Использование Terraform для управления {var(sys5)})[id=http_api_terraform]}

### {heading(Установка Terraform c помощью служебной учётной записи)[id=http_api_terraform_install]}

{ifdef(box)}
1. Создайте служебную учётную запись. Подробнее — в разделе {linkto(../../usage/users_management#service_account)[text=%text]}.
{/ifdef}

1. На рабочей станции создайте файл `~/.terraformrc` со следующим содержимым:

   ```console
   provider_installation {
     filesystem_mirror {
       path = "<TERRAFORM_PROVIDERS_PATH>"
     }
   }
   ```

   Здесь `path` — путь, по которому будет распакован архив с провайдерами для работы с OpenStack, например, `/home/redos/terraform_providers/`.
1. Создайте файл `vkcs_provider.tf` со следующим содержимым:

   ```console
   provider "vkcs" {
       username = "service_user"
       password = "SomeSuperPassword"
       project_id = "c411c58fa6364e3fa97c55a1c86bbcd3"
       # URL компонента Keystone Платформы
       auth_url = "https://URL.ru:5000/v3/"
       user_domain_name = "default"
       }
   ```
   
1. Скачайте архив, расположенный по адресу `<DEPLOY_NEXUS_IP>:<PORT>/repository/share/registry.terraform.io.tar.gz`. Распакуйте архив по пути, заданному в `path` в файле `~/.terraformrc`:

   ```console
   $ curl -O <DEPLOY_NEXUS_IP>:<PORT>/repository/share/registry.terraform.io.tar.gz
   $ mkdir -p <TERRAFORM_PROVIDERS_PATH>
   $ tar xvf registry.terraform.io.tar.gz -C <TERRAFORM_PROVIDERS_PATH>
   ```

   Здесь `<DEPLOY_NEXUS_IP>` — адрес деплой-сервера с запущенным Nexus.
1. Скачайте исполняемый файл Terraform:

   ```console
   $ curl -O DEPLOY_NEXUS_IP:PORT/repository/share/terraform_1.3.6_linux_amd64.zip
   $ unzip terraform_1.3.6_linux_amd64.zip
   $ sudo mv terraform /usr/bin/
   $ terraform -version
   Terraform v1.3.6
   on linux_amd64
   ```
   
1. Перейдите в директорию с манифестами Terraform и выполните проверку провайдеров с помощью команды `terraform providers`.

{caption(Пример результата успешной проверки)[align=left;position=above]}
```console
Providers required by configuration:
.
├── provider[registry.terraform.io/terraform-provider-openstack/openstack] 1.44.0
└── provider[registry.terraform.io/vk-cs/vkcs] 0.1.13
$ terraform init

Initializing the backend...

Initializing provider plugins...
- Finding terraform-provider-openstack/openstack versions matching "1.44.0"...
- Finding vk-cs/vkcs versions matching "0.1.13"...
- Installing terraform-provider-openstack/openstack v1.44.0...
- Installed terraform-provider-openstack/openstack v1.44.0 (unauthenticated)
- Installing vk-cs/vkcs v0.1.13...
- Installed vk-cs/vkcs v0.1.13 (unauthenticated)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!
```
{/caption}

<warn>

Пакеты для установки провайдеров для Terraform входят в состав дистрибутива {var(sys2)}.

</warn>

### {heading(Установка Terraform c помощью конфигурационного файла)[id=http_api_terraform_install_config]}

1. Установите Terraform c официального [зеркала](https://hashicorp-releases.mcs.mail.ru/terraform).
1. Перейдите в Портал самообслуживания.
1. Нажмите на имя пользователя в шапке страницы и выберите пункт **Настройки проекта**.
1. Перейдите на вкладку **Доступ по API** и нажмите кнопку **Скачать openrc версии 3**. Сохраните файл.
1. На вкладке **Доступ по API** скопируйте значение параметра **Токен для доступа к API**.
1. Выполните Bash-скрипт из файла `~root/users_projects-openrc.sh` для загрузки в переменные окружения параметров подключения:

   ```console
   $ sudo bash
   # source ~root/users_projects-openrc.sh
   ```
   
1. При необходимости введите токен API.
1. Перейдите на вкладку **Terraform**. Скачайте основной файл конфигурации Terraform и файл конфигурации зеркала Terraform.

   Будут скачаны файлы с именами `vkcs_provider.tf` и `terraform.rc`.
1. Выполните следующие действия:

   * Для Windows — введите  `%APPDATA%` в адресную строку проводника Windows и скопируйте в открывшуюся директорию `terraform.rc`.
   * Для других ОС — переименуйте файл конфигурации зеркала Terraform из `terraform.rc` в `.terraformrc` и скопируйте его в корень домашней директории пользователя.

1. Скопируйте файл `vkcs_provider.tf` в рабочую директорию, из которой планируете работать с проектом.

Под каждый проект рекомендуется создавать отдельную рабочую директорию.

<warn>

Конфигурационные файлы можно создавать и редактировать самостоятельно. Например, для добавления дополнительного Terraform-провайдера.

</warn>

#### {heading(Инициализация Terraform)[id=http_api_terraform_initialization]}

В директории, из которой планируете работать с проектом, выполните команду:

```console
terraform init
```

Будут созданы дополнительные файлы, необходимые для работы Terraform.

#### {heading(Создание ресурсов с помощью Terraform)[id=http_api_terraform_create_resources]}

1. В рабочей директории создайте манифест ресурсов, например конфигурацию для создания ВМ.

   <warn>

   Манифесты для создания ресурсов доступны в дистрибутиве {var(sys2)} в директории `repos_mcs_distr.tag.gz/terraform_manifests`

   </warn>
1. Выполните команду:

   ```console
   terraform apply
   ```
   
1. При запросе подтверждения введите `yes`.
1. Дождитесь завершения операции.

Созданные ресурсы появятся в Портале самообслуживания.