# {heading(Доступ к интерфейсам)[id=interfaces_access]}

## {heading(Вход на деплой-ноду по SSH)[id=deploy_host_auth]}

Деплой-нода (вспомогательный узел развёртывания) представляет собой вспомогательный узел, упрощающий процедуры установки и обновления компонентов {var(sys2)}. С этого узла возможно попасть на управляющие и вычислительные узлы {var(sys2)}.

Для доступа на деплой-ноду необходимо выполнить подключение по её адресу при помощи протокола SSH:

{caption(Команда для подключения к деплой-ноде по SSH)[align=left;position=above]}
```bash
ssh <ИМЯ_ПОЛЬЗОВАТЕЛЯ>@<IP_ХОСТА>
```
{/caption}

<warn>

По умолчанию могут быть использованы пользователи `centos`. Но для доступа понадобится ключевая пара (или приватный SSH ключ от одного из публичных ключей, настроенных на деплой-ноде).

</warn>

При успешном входе на деплой-ноду приветствие командной строки сменится на соответствующее деплой-ноде имя.

## {heading(Вход на управляющий / вычислительный узел по SSH)[id=control_node_auth]}

Процедура входа на управляющий и вычислительный узлы аналогична.

Для доступа к управляющим или вычислительным узлам, рекомендуется вначале выполнить подключение к деплой-ноде, откуда уже выполнять подключения далее:

1. Выполните вход на деплой-ноду по SSH (см. раздел {linkto(#deploy_host_auth)[text=%text]}).
1. Войдите под пользователем `centos`, если этого не было сделано ранее: `sudo su - centos`.
1. Если имя узла неизвестно, то получите список узлов. Например, выполнив команду: `cat /etc/hosts`. Найдите наименование нужного узла в списке.
1. Перейдите на требуемый узел с помощью команды `ssh <ИМЯ_УПРАВЛЯЮЩЕГО_ИЛИ_ВЫЧИСЛИТЕЛЬНОГО_УЗЛА>`.

<warn>

По умолчанию для переключения между узлами настроен беспарольный вход для пользователя `centos` (присутствующего на всех узлах). Но может требоваться корректная ключевая пара (точнее приватный SSH ключ).

</warn>

<err>

Названия узлов {var(sys2)} (их доменные имена) по умолчанию задаются при установке {var(sys2)}. Значения по умолчанию могут отличаться в зависимости от используемой версии и заданной конфигурации установки, например: `cpn00X` или `controllerX`.

</err>

## {heading(Использование OpenStack CLI для управления {var(sys5)})[id=use_openstackcli]}

Для управления {var(sys5)} можно воспользоваться инструментом OpenStack CLI. Это очень мощный инструмент, при помощи которого можно выполнить подавляющее большинство настроек и операций с {var(sys5)}, если иметь соответствующий доступ.

### {heading(Вход для Администратора {var(sys2)})[id=use_openstackcli_admin]}

Администратор {var(sys2)} обладает максимальными правами доступа и может не только работать с виртуальными ресурсами в рамках проектов, но и менять параметры работы {var(sys2)} в целом. Подробнее о ролях и правах доступа см. {linkto(../../arch/arch-roles#arch_roles)[text=%text]}.

Для доступа к управлению {var(sys5)} с правами Администратора {var(sys2)}:

1. Подключитесь к деплой-ноде по SSH (см. раздел {linkto(#deploy_host_auth)[text=%text]}).

   <err>

   По умолчанию доступен вход по SSH ключу от имени пользователя `centos`. По желанию заказчика может быть настроен персонифицированный доступ.

   </err>

1. Выполните подключение к одному из управляющих узлов (по умолчанию нужные данные хранятся только на управляющем узле № 3):
   
   ```bash
   ssh controller3
   ```
1. Переключитесь на пользователя `root`:
   
   ```bash
   sudo bash
   ```
1. Выполните bash-скрипт из файла `~root/openrc.sh` для загрузки в переменные окружения параметров подключения к кластеру:
   
   ```bash
   source ~root/openrc.sh
   ```
1. Дальше можно выполнять запросы к OpenStack. Для проверки работоспособности подключения к Openstack CLI, можно выполнить простейшую команду, например:
   
   ```bash
   openstack host list
   ```
   
   При успешном выполнении команды должен отобразиться список узлов. В случае ошибки подключения будет выведено сообщение об ошибке.

<err>

Файл `~root/openrc.sh` содержит данные для аутентификации с ролью Администратор {var(sys2)}.

</err>

### {heading(Вход для Пользователя {var(sys2)})[id=NEED_ID_HEADING]}

Для пользователей {var(sys2)} с любой ролью интерфейс OpenStack CLI позволяет выполнять множество операций по управлению ресурсами в рамках их проекта.

Для доступа к OpenStack CLI пользователю {var(sys2)} потребуются следующие инструменты и файлы:

* Программное обеспечение (ПО), обеспечивающее доступ к OpenStack CLI (см. раздел {linkto(#prerequisites_openstack_cli_software)[text=%text]}).
* Конфигурационный файл с параметрами подключения к кластеру (см. раздел {linkto(#prerequisites_openstack_cli_config)[text=%text]}).

#### {heading(Процесс подключения)[id=connection_process]}

Чтобы подключиться к среде с установленным {linkto(#prerequisites_openstack_cli_software)[text=ПО для доступа к OpenStack CLI]}:

1. Установите OpenStack CLI.
   
   ```bash
   pip install python-openstackclient
   ```
1. Установите службу Manila.
   
   ```bash
   pip install python-manilaclient
   ```
1. Установите службу Trove.
   
   ```bash
   pip install python-troveclient
   ```
1. Выполните загрузку параметров подключения из {linkto(#prerequisites_openstack_cli_config)[text=конфигурационного файла]}.
   
   ```bash
   source ~/users_projects-openrc.sh
   ```
   где `~/users_projects-openrc.sh` — путь к конфигурационному файлу для подключения.

1. При необходимости введите пароль от пользователя проекта, для которого был скачан конфигурационный файл.

   {caption(Пример запроса пароля проекта)[align=left;position=above]}
   ```bash
   Please enter your OpenStack Password for project 54683335ee6e4675b66fdd5419793462 as user test@mcs.mail.ru:
   ``` 
  {/caption}

6. Проверьте подключение OpenStack CLI, выполнив простейшую команду, например:
   
   ```bash
   openstack host list
   ```

#### {heading(ПО для подключения к OpenStack CLI)[id=prerequisites_openstack_cli_software]}

Для подключения рекомендуется использование пакета `python-openstackclient-3.8.1`. Для его запуска также могут потребоваться следующие пакеты (зависимости):

* `python2-cinderclient-1.11.1`.
* `python2-glanceclient-2.6.0`.
* `python2-keystoneclient-3.10.0`.
* `python2-neutronclient-6.1.1`.
* `python2-novaclient-7.1.1`.
* `python2-octaviaclient-1.8.2`.

#### {heading(Конфигурационный файл для подключения)[id=prerequisites_openstack_cli_config]}

Конфигурационный файл для подключения к OpenStack CLI содержит необходимые параметры для подключения к кластеру и выполнения запросов.

Чтобы получить конфигурационный файл в Портале самообслуживания:

1. Выполните авторизацию под учётной записью Пользователя {var(sys2)}.
1. Нажмите на имя пользователя в правом верхнем углу и выберите пункт меню «Настройки проекта».
1. Перейдите на вкладку «API ключи» и нажмите на кнопку «Скачать openrc версии 3».
1. Сохраните файл на локальном диске. Скачанный файл является конфигурационным файлом для подключения к OpenStack CLI.

{caption(Пример содержания конфигурационного файла)[align=left;position=above]}
```bash
#!/usr/bin/env bash

export OS_AUTH_URL="https://URL.ru:5000/v3/"

export OS_PROJECT_ID="54683335ee6e4675b66fdd5419793462"
export OS_REGION_NAME="RegionOne"
unset OS_PROJECT_NAME
unset OS_PROJECT_DOMAIN_ID

# unset v2.0 items in case set
unset OS_TENANT_ID
unset OS_TENANT_NAME

if [[ -z $OS_USERNAME ]] || [[ -z $OS_PASSWORD ]] || [[ "$OS_USERNAME" != "test@mcs.mail.ru" ]]; then

export OS_USERNAME="test@mcs.mail.ru"
export OS_USER_DOMAIN_NAME="users"

# With Keystone you pass the keystone password.
echo "Please enter your OpenStack Password for project $OS_PROJECT_ID as user $OS_USERNAME: "
read -sr OS_PASSWORD_INPUT
export OS_PASSWORD=$OS_PASSWORD_INPUT

fi

export OS_INTERFACE=public
export OS_IDENTITY_API_VERSION=3
```
{/caption}

## {heading(Использование REST API для управления {var(sys5)})[id=interface_rest_api]}

Некоторые операции в {var(sys2)} (например, удаление вычислительного узла из `nova-placement-api`) выполняются только с помощью REST API.

HTTP/HTTPS запросы к REST API по умолчанию будут работать с деплой-ноды и/или управляющего узла. Для того, чтобы они работали из других подсетей необходимо открыть доступ из них (Firewall и маршрутизация).

### {heading(Получение токена авторизации)[id=http_api_get_auth_token]}

Перед выполнением запроса к REST API {var(sys2)} требуется получение токена авторизации. Все необходимые параметры для авторизации содержатся в скрипте `~root/openrc.sh` (см. раздел {linkto(#use_openstackcli_admin)[text=%text]}).

Чтобы получить токен авторизации, выполните команду:

```bash
curl -v -X POST -H "Content-Type: application/json" <OS_AUTH_URL>/v3/auth/tokens -d '{"auth": {"identity": {"methods": ["password"],"password": {"user": {"domain": {"id": "<OS_USER_DOMAIN_NAME>"},"name": "<OS_USERNAME>","password": "<OS_PASSWORD>"}}},"scope": {"project": {"domain": {"id": "<OS_PROJECT_DOMAIN_NAME>"},"name": "<OS_PROJECT_NAME>"}}}}' > /dev/null
```
<warn>

Названия подставляемых переменных совпадают с названиями из скрипта `openrc.sh`.

</warn>

{caption(Пример ответа на запрос получения токена)[align=left;position=above]}
```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* About to connect() to internal.domain.ru port 35357 (#0)
*   Trying 10.254.253.16...
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* Connected to internal.domain.ru (10.254.253.16) port 35357 (#0)
> POST /v3/auth/tokens HTTP/1.1
> User-Agent: curl/7.29.0
> Host: internal.domain.ru:35357
> Accept: */*
> Content-Type: application/json
> Content-Length: 218
>
} [data not shown]
* upload completely sent off: 218 out of 218 bytes
< HTTP/1.1 201 Created
< date: Tue, 28 Jun 2022 06:50:56 GMT
< server: Apache
< x-subject-token: gAAAAABiuqTQY51C_acBTm4qsn3GFDvUm3Rghdkk8ILfi4cjC02ckN3wf1XiccSVXfvHm-KcFkkx2qS5i_0SCZenm-_9ONuP-83t4xmgL03Kb_PT6Cqgbor9dikhdNzlrkn62WiII-uFX5v6uLEO88nyRsfLJd0LFtLE_aIG6vkmvWxD3GKapYo
< vary: X-Auth-Token
< x-openstack-request-id: req-e8f87a4d-22ad-411e-995a-addabbbaf481
< content-length: 10863
< content-type: application/json
< set-cookie: PROXYSRV_ADMIN=85b4d58d0923ec44|Yrqk0|Yrqk0; path=/; Secure
< connection: close
<
{ [data not shown]
100 11081  100 10863  100   218  77177   1548 --:--:-- --:--:-- --:--:-- 77042
* Closing connection 0
```
{/caption}

<err>

Для выполнения дальнейших HTTP-запросов в {var(sys3)} используется значение параметра `x-subject-token`. Пример использования токена в запросах:

```bash
curl -X POST -H "X-Auth-Token: <TOKEN>" <ТЕКСТ_ЗАПРОСА>
```
</err>

### {heading(Точки подключения (Endpoints))[id=endpoints]}

Точки подключения к API отображаются в Портале самообслуживания на странице «Настройка проекта», вкладке «API Endpoints».

### {heading(Методы для REST API OpenStack)[id=rest_api_openstack]}

После получения токена доступа (см. раздел {linkto(#http_api_get_auth_token)[text=%text]}) возможна работа с {var(sys5)} через REST API. Список методов для сервисов OpenStack см. в [официальной документации](https://docs.openstack.org/api-quick-start/#current-api-versions).

{caption(Общий вид синтаксиса команд для вызова сервисов OpenStack через curl)[align=left;position=above]}
```bash
curl -X <ТИП_ЗАПРОСА> <ПАРАМЕТРЫ> -d <ТЕЛО_ЗАПРОСА> -H "Content-Type: application/json" -H "X-Auth-Token: <ТОКЕН>" <АДРЕС_ЭНДПОИНТА>/<МЕТОД>
```
{/caption}