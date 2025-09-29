# {heading(Настройка SMTP-сервера для отправки уведомлений от Marketplace)[id=xaas_smtp_settings]}

В состав Marketplace входит компонент Notifications, который формирует уведомления по событиям, связанным с сервисами, размещенными в Marketplace.

Чтобы настроить отправку уведомлений через SMTP-сервер:

1. Задайте параметры Notifications:

   * `helm_xaas_components_notifications_smtp_api_SMTP_HOST` — хост SMTP-сервера.
   * `helm_xaas_components_notifications_smtp_api_SMTP_PORT` — порт SMTP-сервера.
   * `helm_xaas_components_notifications_smtp_api_SMTP_SECURITYPROTOCOL` — протокол шифрования. Возможные значения:

      * `ssl` — авторизация через SSL-сертификат.
      * `tls` — авторизация через TLS-сертификат.
      * `none` — без авторизации.

   * `helm_xaas_components_notifications_smtp_api_SMTP_USERNAME` — имя пользователя для подключения к SMTP-серверу.
   * `helm_xaas_components_notifications_smtp_api_SMTP_SENDEREMAIL` — email отправителя уведомления.
   * `helm_xaas_components_notifications_smtp_api_SMTP_SENDERALIAS` — имя отправителя уведомления. Значение по умолчанию — `VK Cloud`.

1. В Vault задайте ключ `vault_xaas_notifications_smtp_password` — пароль для подключения к SMTP-серверу.