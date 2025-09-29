# {heading(Журнал событий безопасности)[id=journal_files_sec]}

{var(sys1_go)} осуществляет логирование и сбор записей о событиях безопасности в системный журнал `vkc-audit.log`.

Журнал событий безопасности расположен в директории `/var/log/infra/`.

Для присвоения уровней важности событиям безопасности запустите скрипт:

```console
# sh audit-severity-0.2.sh
```

Будет создана директория `/home/<USERNAME>/vkcaudit/<DATE>`. Здесь `<DATE>` — дата запуска скрипта. В директории хранятся журналы событий безопасности с указанием уровня критичности этих событий.

## {heading(Регистрируемые события безопасности)[id=logged_security_events]}

Перечень регистрируемых событий безопасности `action` приведен в {linkto(#tab_logged_security_events)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_logged_security_events]} — Регистрируемые события безопасности)[align=right;position=above;id=tab_logged_security_events;number={const(numb_tab_logged_security_events)}]}
[cols="1,2", options="header"]
|===
|Событие
|Расшифровка

|`user_sign_in`
|Вход пользователя на {var(sys4_go)}

|`user_sign_out`
|Выход пользователя из {var(sys2_go)}

|`sa_admins`
|Все действия администраторов {var(sys2_go)}

|`update_superadmin_user`
|Обновление учетной записи администратора {var(sys2_go)}, назначение прав доступа

|`project_create`
|Создание проекта

|`delete-vm`
|Удаление ВМ

|`add_superadmin_user`
|Добавление нового администратора {var(sys2_go)}

|`block_superadmin_user`
|Блокировка администратора {var(sys2_go)}

|`update_links_group_project`
|Предоставление доступа к проекту

|`set_user_enabled`
|Блокировка пользователя личного кабинета

|`list_superadmin_sessions`
|Просмотр активных сессий администратора

|`list_public_sessions`
|Просмотр активных сессий пользователя личного кабинета

|`delete_public_session`
|Удаление активной сессии

|`create-port`
|Создание порта

|`update-port`
|Подключение порта

|`delete-port`
|Отключение порта

|`create-image`
|Добавление образов ВМ

|`delete-image`
|Удаление образов ВМ

|`create-router`
|Создание виртуальных маршрутизаторов

|`delete-router`
|Удаление виртуальных маршрутизаторов

|`update-router`
|Обновление виртуальных маршрутизаторов

|`create-sa-credit`
|Изменение баланса

|`vm-action`
|События ВМ

|`vm-detach-volume`
|Отключение диска ВМ

|`add-interface-to-router`
|Подключение роутера к сети

|`remove-interface-from-router`
|Отключение роутера от сети
|===
{/caption}

## {heading(Поиск событий безопасности)[id=security_event_search]}

Для поиска событий безопасности:

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../interfaces_access#deploy_host_auth)[text=%text]}).
1. Выполните команду:

   ```console
   $ sudo less /var/log/infra/vkc-audit.log |grep user_sign_in
   ```

<warn>

Поиск выполняется с помощью штатной утилиты `grep`.

</warn>

## {heading(Параметры записей журнала событий безопасности)[id=security_event_log_entry_settings]}

Регистрируемые события безопасности включают в себя параметры и их значения. Перечень параметров приведен в {linkto(#tab_options)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_options]} — Параметры)[align=right;position=above;id=tab_options;number={const(numb_tab_options)}]}
[cols="1,2", options="header"]
|===
|Параметр
|Расшифровка

|`timestamp`
|Время события

|`project_id`
|Идентификатор проекта

|`event`
|Подробная информация о событии

|`event_id`
|Идентификатор события

|`user_id`
|Идентификатор пользователя

|`source_ip`
|IP-адрес пользователя

|`success`
|Результат события

|`request_body`
|Данные авторизации пользователя

|`email`
|Адрес электронной почты пользователя

|`request_id`
|Идентификатор запроса

|`action`
|Регистрируемое событие

|`projects`
|Проекты пользователя

|`enabled`
|Доступ к проекту

|`pid`
|Идентификатор проекта

|`roles`
|Назначенные пользователю роли в проекте

|`title`
|Название проекта

|`tfa`
|Двухфакторная аутентификация

|`source`
|Идентификатор объекта доступа
|===
{/caption}

### {heading(Поиск user_id пользователя)[id=search_for_user_user_id]}

Для поиска `user_id` пользователя:

1. Зайдите в Портал администратора.
1. Перейдите в раздел **Клиентская информация** → **Пользователи**. `user_id` указан в столбце `id`.

### {heading(Уровни важности событий)[id=level_security_event]}

Все события безопасности классифицируются по уровням важности `severity`. Уровни важности приведены в {linkto(#tab_level_event)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_level_event]} — Уровни важности)[align=right;position=above;id=tab_level_event;number={const(numb_tab_level_event)}]}
[cols="1,2", options="header"]
|===
|Уровень важности
|Расшифровка

|`low`
|События низкого уровня важности

|`middle`
|События среднего уровня важности

|`high`
|События высокого уровня важности

|===
{/caption}