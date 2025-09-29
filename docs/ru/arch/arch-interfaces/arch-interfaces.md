# {heading(Основные интерфейсы)[id=arch-interfaces]}

<!--- #todo на раздел есть ссылка в ПМИ Private Cloud. -->

Для работы с {ifdef(box, pg)}{var(sys5)}{/ifdef}{ifndef(box, pg)}{var(sys5_go)}{/ifndef} используются следующие типы интерфейсов:

* Графический интерфейс (GUI).
{ifdef(box, pg)}
* Командная строка (CLI).
{/ifdef}
* Программный интерфейс (API).

{ifndef(box, pg)}
Далее будут рассмотрены основные интерфейсы, доступные для взаимодействия со стороны пользователей и администраторов {var(sys2_go)}.
{/ifndef}

## {heading(Графические интерфейсы)[id=arch_graphical_interfaces]}

<info>

Чтобы получить доступ к функциям Портала администратора или Портала самообслуживания необходимо пройти двухфакторную аутентификацию (2FA). Для двухфакторной аутентификации используется пароль учетной записи и код, приходящий по электронной почте.

</info>

1. С помощью веб-браузера перейдите по адресу Портала администратора или Портала самообслуживания.
1. Введите логин и пароль учетной записи от соответствующего Портала.
1. Нажмите кнопку **Войти** или **Войти в личный кабинет**. На электронную почту, которая используется в качестве логина, придет письмо с кодом.
1. Введите код из письма и нажмите кнопку **Войти** или **Войти в личный кабинет**.

<!--- //todo: проверить 2fa для портала администратора ГО -->

<!--- //для первой учетки superadmin 2fa нет. Для проверки нужно завести учетку в freeipa или keycloak в realm-e mcs_admins, затем добавить не нее необходимые роли в суперадминке -->

{ifdef(box, pg)}

<info>

При работе с графическими интерфейсами предусмотрено завершение сеанса доступа после истечения установленного времени бездействия (по умолчанию — 8 часов). При завершении сеанса доступа пройдите аутентификацию заново.

</info>
{/ifdef}

{ifndef(box, pg)}

<info>

При работе с графическими интерфейсами предусмотрено завершение сеанса доступа после 1 часа бездействия. При завершении сеанса доступа пройдите аутентификацию заново.

</info>
{/ifndef}

### {heading(Портал самообслуживания)[id=arch_graphical_interfaces_mcs]}

<!--- //MCS UI / VK CP UI -->

Портал самообслуживания — графический интерфейс пользователя {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}. Портал используется для управления виртуальными ресурсами в рамках одного или нескольких проектов. Каждая учетная запись может иметь доступ к неограниченному количеству проектов. Роли пользователей и их доступ к функциям {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} могут отличаться от проекта к проекту.

Чтобы открыть Портал самообслуживания {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}, перейдите по адресу:

<!--- //формат записи взят из черновика техпаспорта эталонного стенда https://docs.google.com/spreadsheets/d/140oP1VeiEH1dLY0vQHCPeTrJisP4Uqakig8WuxuXHtM/edit#gid=0 (здесь и далее) -->

```txt
vkc.your_domain_name.ru
```

Здесь `your_domain_name.ru` — доменное имя Заказчика {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

Для входа в Портал самообслуживания используется любая персональная учетная запись пользователя {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

### {heading(Портал администратора)[id=arch_graphical_interfaces_sa]}

<!--- //Новая суперадминка: включает функции биллинг, Katana, Horizon -->

<!--- //Про Horizon мы не упоминаем даже -->

Портал администратора — графический интерфейс администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}. Портал используется для управления основными настройками, административными функциями {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} и ролями групп пользователей в проектах.

{ifdef(box, pg)}
Чтобы выполнять функции, доступные в Портале администратора, также можно использовать OpenStack CLI.
{/ifdef}

Чтобы открыть Портал администратора {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}, перейдите по адресу:

```txt
admin.your_domain_name.ru
```

Здесь `your_domain_name.ru` — доменное имя Заказчика {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

<!--- // инфо ниже взята из портала биллинга 2.0 -->

{ifdef(box, pg)}
Для входа в Портал администратора используется учетная запись {var(sys2)}, для которой были выставлены роли с префиксом `sa_`. При интеграции с LDAP-провайдером может быть использована учетная запись LDAP-провайдера. Выдачу ролей для пользователей из LDAP-провайдера можно автоматизировать штатными средствами Keycloak.
{/ifdef}

{ifdef(cer)}
Для входа в Портал администратора используется учетная запись {var(sys2_go)}, для которой были выставлены роли с префиксом `sa_`.
{/ifdef}

{ifndef(cer)}

### {heading(Портал мониторинга)[id=arch_graphical_interfaces_mon]}

<!--- //Zabbix -->

Портал мониторинга — графический интерфейс для мониторинга {var(sys2)}.

Условное обозначение: Zabbix.

Чтобы открыть Портал мониторинга {var(sys2)}, перейдите по адресу:

```txt
monitoring.your_domain_name.ru
```

Здесь `your_domain_name.ru` — доменное имя Заказчика {var(sys2)}.

При интеграции с LDAP-провайдером для входа в Портал мониторинга используется учетная запись Администратора {var(sys2)} из LDAP-провайдера. Иначе используется отдельная учетная запись администратора Zabbix.

### {heading(Портал логирования)[id=arch_graphical_interfaces_log]}

<!--- //Kibana -> OpenSearch -->

Портал логирования — графический интерфейс для просмотра журналов событий {var(sys2)}.

Условное обозначение: OpenSearch.

Чтобы открыть Портал логирования {var(sys2)}, перейдите по адресу:

```txt
logs.your_domain_name.ru
```

Здесь `your_domain_name.ru` — доменное имя Заказчика {var(sys2)}.

При интеграции с LDAP-провайдером для входа в Портал логирования может использоваться учетная запись Администратора {var(sys2)} из LDAP-провайдера. Иначе используется отдельная учетная запись администратора для доступа к Порталу логирования.
{/ifndef}

### {heading(Портал управления доступом)[id=arch_graphical_interfaces_manage_control]}

<!--- //Keycloak -->

Портал управления доступом — графический интерфейс администраторов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} для управления пользователями, группами пользователей и настройками защиты отдельных сервисов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

{ifndef(cer)}
Условное обозначение: Keycloak.

Портал управления доступом используется для создания, удаления и настройки стандартных учетных записей {var(sys2)}, а также настройки доступа к {var(sys3)}, например интеграции {var(sys2)} с LDAP-провайдером в части учетных записей пользователей.
{/ifndef}

Чтобы открыть Портал управления доступом {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}, перейдите по адресу:

```txt
idm.your_domain_name.ru
```

Здесь `your_domain_name.ru` — доменное имя Заказчика {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

Для входа в Портал управления доступом используется стандартная учетная запись {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}, имеющая соответствующие права доступа.

{ifdef(box, pg)}

## {heading(Интерфейсы командной строки)[id=arch_graphical_interfaces_command_line_interfaces]}

Для работы Пользователей {var(sys2)} использование командной строки не требуется.

Для администрирования {var(sys2)} может потребоваться использование следующих интерфейсов командной строки:

* SSH и Bash (выполнение команд после подключения к узлам {var(sys2)}).
* OpenStack CLI.
* Ansible.
* cURL.

<warn>

При расследовании инцидентов может также потребоваться использование следующих интерфейсов командной строки:

* Docker CLI.
* Kubectl.

</warn>

{/ifdef}

### {heading(SSH)[id=arch_graphical_interfaces_ssh]}

Защищенный протокол для удаленного доступа к компьютерам, в том числе для подключения к узлам {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

{ifndef(cer)}
Базовый синтаксис для подключения к узлу {var(sys2)} (подробнее — в разделе {linkto(../../interfaces_access#deploy_host_auth)[text=%text]}):
{/ifndef}

{caption(Команда для подключения к узлу {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef})[align=left;position=above]}
```console
$ ssh <ИМЯ_ПОЛЬЗОВАТЕЛЯ>@<IP_ХОСТА>
```
{/caption}

<!--- // #todo привести красивую или более универсальную ссылку -->

Описание параметров — в документации на ОС, в которой будет использоваться SSH ([пример для Ubuntu](https://manpages.ubuntu.com/manpages/xenial/man1/ssh.1.html)).

### {heading(OpenStack CLI)[id=arch_graphical_interfaces_cli]}

Интерфейс командной строки для API-интерфейсов OpenStack.

По умолчанию OpenStack CLI развернут на узлах {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef} и не требует дополнительной настройки. При использовании локального OpenStack CLI может потребоваться установка зависимостей, подробнее — в разделе {linkto(../../interfaces_access#prerequisites_openstack_cli_software)[text=%text]}.

Базовый синтаксис приведен в разделе {linkto(../../cli_commands#cli_commands)[text=%text]}.

### {heading(Ansible)[id=arch_graphical_interfaces_ansible]}

Интерфейс командной строки для развертывания, конфигурирования и обновления компонентов {ifdef(box, pg)}{var(sys2)}{/ifdef}{ifndef(box, pg)}{var(sys2_go)}{/ifndef}.

Базовый синтаксис приведен в [официальной документации](https://docs.ansible.com/ansible/2.9/user_guide/command_line_tools.html).

### {heading(cURL)[id=arch_graphical_interfaces_curl]}

Инструмент командной строки, используемый для отправки HTTP-запросов. Поддерживает большое количество протоколов, в том числе HTTP-запросов к RESTful API.

{caption(Базовый синтаксис cURL)[align=left;position=above]}
```console
$ curl [options/URLs]
```
{/caption}

{ifndef(cer)}
Описание параметров приведено в [официальной документации](https://curl.se/docs/manpage.html).

Пример использования приведен в разделе {linkto(../../interfaces_access#interface_rest_api)[text=%text]}.
{/ifndef}

### {heading(Docker CLI)[id=arch_graphical_interfaces_docker]}

Инструмент командной строки для управления Docker-контейнерами.

{caption(Базовый синтаксис Docker CLI)[align=left;position=above]}
```console
$ docker [options] <COMMAND> [<ARGUMENTS>]
```
{/caption}

Описание параметров приведено в [официальной документации](https://docs.docker.com/engine/reference/commandline/cli/).

{ifdef(box, pg)}

### {heading(Kubectl)[id=arch_graphical_interfaces_kubectl]}

Инструмент командной строки для создания и управления кластерами Kubernetes.

{caption(Базовый синтаксис Kubectl)[align=left;position=above]}
```console
$ kubectl [command] [<TYPE>] [<NAME>] [flags]
```
{/caption}

Описание параметров приведено в [официальной документации](https://kubernetes.io/ru/docs/reference/kubectl/overview/).
{/ifdef}