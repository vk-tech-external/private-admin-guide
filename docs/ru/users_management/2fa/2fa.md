# {heading(Двухфакторная аутентификация)[id=2fa]}

Для аутентификации пользователя в Портале администратора у пользователя должна быть включена двухфакторная аутентификация.

<!---
//todo: MCSPC-14835 Для версии облака 4.2 (ГО 1.2) заменить команд подключения к Tarantool breeze на закомментированный пример (информация от Кости Нифанина)
////
$ sudo tt connect <ИМЯ_BREEZE>
unix/:/var/run/tarantool/<ИМЯ_BREEZE>.control> breeze.api.services.superadmin_users.users.search({search_email = '<ПОЧТА>'})
////
-->

## {heading(Проверка двухфакторной аутентификации)[id=superadmin_2fa_check]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../interfaces_access#use_openstackcli_admin)[text=%text]}).

{ifndef(box, pg)}

1. Подключитесь к Tarantool breeze:

   ```console
   # tarantoolctl enter <ИМЯ_BREEZE>
   ```
   Здесь `<ИМЯ_BREEZE>` — имя Tarantool Breeze.

{/ifndef}

{ifdef(box, pg)}

1. Подключитесь к Tarantool breeze:

   ```console
   # sudo tt connect <ИМЯ_BREEZE>
   ```

   Здесь `<ИМЯ_BREEZE>` — имя Tarantool breeze.

   <info>

   Чтобы узнать имя Tarantool Breeze, выполните команду:
   
   ```console
   # sudo tt status
   ```
   </info>

{/ifdef}

1. Выведите информацию о пользователе:

   ```console
   unix/:/var/run/tarantool/<ИМЯ_BREEZE>.control>  breeze.api.services.superadmin_users.users.search({name = '<ПОЛЬЗОВАТЕЛЬ>'})
   ```

   Здесь:

   * `<ИМЯ_BREEZE>` — имя Tarantool breeze.
   * `<ПОЛЬЗОВАТЕЛЬ>` — имя пользователя.

{caption(Пример ожидаемого результата)[align=left;position=above]}
```console
- [200, {'list': [{'domain': 'sa_admins', 'enabled': true, 'uid': <ID_ПОЛЬЗОВАТЕЛЯ>, 'id': '<OPENSTACK_ID>',
  'ctime': <TIMESTAMP>, 'email': '<ПОЧТА>', 'roles': [<СПИСОК_РОЛЕЙ>], 'mfa': {'email': {
  'time_enabled': <TIMESTAMP_MFA>, 'id': '<MFA_ID>'}}}],
  'limit': 300}]
  ...
```
{/caption}

Здесь:

* `<ID_ПОЛЬЗОВАТЕЛЯ>` — UID учетной записи пользователя.
* `<OPENSTACK_ID>` — идентификатор пользователя OpenStack.
* `<TIMESTAMP>` — временная метка.
* `<ПОЧТА>` — адрес почты пользователя.
* `<СПИСОК_РОЛЕЙ>` — назначенные пользователю роли.
* `<TIMESTAMP_MFA>` — временная метка 2FA.
* `<MFA_ID>` — уникальный идентификатор 2FA.

<warn>

Если параметр `mfa` пуст, пересоздайте пользователя.

</warn>

## {heading(Пересоздание пользователя)[id=recreate_superadmin_2fa]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../interfaces_access#use_openstackcli_admin)[text=%text]}).

1. Подключитесь к Tarantool breeze:

   ```console
   # sudo tt connect <ИМЯ_BREEZE>
   ```

   Здесь `<ИМЯ_BREEZE>` — имя Tarantool breeze.

1. Удалите пользователя:

   ```console
   unix/:/var/run/tarantool/<ИМЯ_BREEZE>.control> breeze.api.services.superadmin_users.users.delete({uid = '<USER_ID>'})
   ---
   - [200, {'domain': 'sa_admins', 'enabled': true, 'uid': <ID_ПОЛЬЗОВАТЕЛЯ>, 'id': '<OPENSTACK_ID>', 
     'ctime': <TIMESTAMP>, 'email': '<ПОЧТА>', 'roles': [<СПИСОК_РОЛЕЙ>], 'mfa': {}}]
   ```
   
   Здесь:

   * `<ИМЯ_BREEZE>` — имя Tarantool breeze.
   * `<ID_ПОЛЬЗОВАТЕЛЯ>` — UID учетной записи пользователя.
   * `<OPENSTACK_ID>` — идентификатор пользователя OpenStack.
   * `<TIMESTAMP>` — временная метка.
   * `<ПОЧТА>` — адрес почты пользователя.
   * `<СПИСОК_РОЛЕЙ>` — назначенные пользователю роли.
   
1. Повторно предоставьте пользователю доступ к проекту (подробнее — в разделе {linkto(../../users_management/access#superadmin_project_access_settings)[text=%text]}).