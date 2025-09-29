# {heading(Создание служебной (сервисной) учетной записи)[id=account]}

<!--- #todo на раздел есть ссылка в ПМИ Private Cloud. -->

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Создайте сервисную учетную запись:

   ```console
   # openstack user create --password <ПАРОЛЬ> <ПОЛЬЗОВАТЕЛЬ>
   ```
   Здесь:

   * `<ПАРОЛЬ>` — пароль пользователя.
   * `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя.

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   +---------------------+----------------------------------+
   | Field               | Value                            |
   +---------------------+----------------------------------+
   | domain_id           | default                          |
   | enabled             | True                             |
   | id                  | <ID_ПОЛЬЗОВАТЕЛЯ>                |
   | name                | <ИМЯ_ПОЛЬЗОВАТЕЛЯ>               |
   | options             | {}                               |
   | password_expires_at | None                             |
   +---------------------+----------------------------------+
   ```
   {/caption}

   Здесь:

   * `<ID_ПОЛЬЗОВАТЕЛЯ>` — идентификатор пользователя.
   * `<ИМЯ_ПОЛЬЗОВАТЕЛЯ>` — имя пользователя.

   <warn>

   Значение в строке `domain_id` должно быть `default`.

   </warn>
   
1. Назначьте роль `mcs_co_owner` в необходимом проекте:

   ```console
   # openstack role add --project <ПРОЕКТ> --project-domain <ДОМЕН> --user <ID_ПОЛЬЗОВАТЕЛЯ> mcs_co_owner
   ```
   Здесь:

   * `<ПРОЕКТ>` — идентификатор проекта.
   * `<ДОМЕН>` — идентификатор домена проекта.
   * `<ID_ПОЛЬЗОВАТЕЛЯ>` — идентификатор пользователя.

   <info>

   Чтобы получить список проектов, выполните команду:

   ```console
   # openstack project list --long
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   +------------+---------------+-------------+---------------+---------+
   | ID         | Name          | Domain ID   | Description   | Enabled |
   +------------+---------------+-------------+---------------+---------+
   | 12fd1b103c | mcs1901586151 | 19982d18e   | None          | True    |
   | e0d882c887 | admin         | default     | None          | True    |
   +------------+---------------+-------------+---------------+---------+
   ```
   {/caption}

   </info>
   
1. Создайте конфигурационный файл:

   ```console
   # cat > ~root/s2s.sh
   ```

   {caption(Пример ожидаемого результата)[align=left;position=above]}
   ```console
   export OS_USERNAME=<ПОЛЬЗОВАТЕЛЬ>
   export OS_PASSWORD=<ПАРОЛЬ>
   export OS_PROJECT_NAME=<ПРОЕКТ>
   export OS_USER_DOMAIN_NAME=Default
   export OS_PROJECT_DOMAIN_NAME=<ДОМЕН>
   export OS_AUTH_URL=http://internal.private.corp.devmail.ru:35357
   export OS_IDENTITY_API_VERSION=3
   export OS_IMAGE_API_VERSION=2
   export OS_ENDPOINT_TYPE='internalURL'
   export OS_ENDPOINT=internal
   export OS_INTERFACE=internal
   export OS_REGION=RegionOne
   ```
   {/caption}

   Здесь:

   * `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя.
   * `<ПАРОЛЬ>` — пароль пользователя.
   * `<ПРОЕКТ>` — название проекта.
   * `<ДОМЕН>` — домен проекта.

   <warn>

   В качестве значения `ДОМЕН` используйте значение параметра `name` в выводе команды:

   ```console
   # openstack domain show <ПРОЕКТ>
   ```

   Здесь `<ПРОЕКТ>` — идентификатор проекта.

   </warn>