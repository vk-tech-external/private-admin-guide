# {heading(Обновление сервиса Redis)[id=xaas_redis]}

Чтобы обновить сервис Redis:

1. Выполните вход на деплой-ноду по SSH (подробнее — в разделе {linkto(../../interfaces_access#deploy_host_auth)[text=%text]}).
1. Перейдите в директорию `~/xaas/xaas_imb_distr_redis_<VERSION>`. Здесь `<VERSION>` — версия дистрибутива, использованная для загрузки и публикации Redis в Marketplace (подробнее — в документе **Руководство по установке Private Cloud** в разделе **Запуск инсталлятора** → **После установки {var(sys2)}** → **Загрузка и публикация сервиса Redis в Marketplace**). Пример: `v22`.
1. Отредактируйте сервисный пакет Redis:

   1. Скопируйте директорию с опубликованной ревизией сервиса Redis. При первом обновлении сервиса — директория `bundle`.
   1. Перейдите в скопированную директорию.
   1. Внесите изменения в файлы сервисного пакета (подробнее — в разделе {linkto(../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ibservice_files#xaas_vendor_ibservice_files)[text=%text]}).
   1. В файле `service.yaml` укажите новую ревизию сервиса.
   1. В файлах `plans/<PLAN_NAME>/plan.yaml` каждого тарифного плана укажите новую ревизию.

1. Запакуйте отредактированный сервисный пакет в zip-архив.
1. Загрузите отредактированный сервисный пакет в Marketplace:

   ```console
   $ curl -v -X POST https://<CLOUD_HOST>/marketplace/api/infra-api/api/v1-public/product \
   -H 'x-service-token: <SERVICE_TOKEN>' \
   -F "upload=@~/xaas/xaas_imb_distr_redis_<VERSION>/<ZIP_ARCHIVE>"
   ```

   Здесь:

   * `<CLOUD_HOST>` — доменное имя {var(sys2)}.
   * `<SERVICE_TOKEN>` — значение ключа

      `vault_xaas_infra_api_common_cloudtoken` в Vault.
   * `<VERSION>` — версия дистрибутива Redis. Пример: `v22`.
   * `<ZIP_ARCHIVE>` — имя zip-архива с сервисным пакетом.

1. Протестируйте обновленный сервис:

   1. Авторизуйтесь в Marketplace под учетной записью администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]}).
   1. В тестовое пространство имен Marketplace `helm_xaas_components_infra_api_CLOUDTESTNS` добавьте демо-пользователя Портала самообслуживания (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_space#xaas_space_add_user)[text=%text]}).

      Подробнее про учетные демо-записи — в документе **Руководство по установке Private Cloud** в разделе **Запуск инсталлятора** → **После установки {var(sys2)}** → **Получение паролей {var(sys2)}**.
   
   1. Зайдите в Портал самообслуживания под учетной записью демо-пользователя, добавленного в пространство имен Marketplace `helm_xaas_components_infra_api_CLOUDTESTNS`.
   1. Перейдите в раздел **Магазин приложений**.
   1. В карточке сервиса Redis выберите последнюю загруженную ревизию.
   1. Убедитесь, что новая конфигурация сервиса Redis отображается корректно:

      1. Нажмите кнопку **Подробнее**.
      1. На вкладке **Описание сервиса** проверьте описание.
      1. На вкладке **Тарифные планы** проверьте мастер конфигурации каждого тарифного плана.

   1. Подключите сервис. Убедитесь, что инстанс сервиса развернулся успешно.
   1. Смените тарифный план.
   1. Удалите инстанс сервиса.

   <info>

   Подключение сервиса и управление его инстансами приведено в документе **Руководство пользователя Private Cloud** в разделе **Магазин приложений Marketplace**.

   </info>
   
1. Авторизуйтесь в Marketplace под учетной записью администратора {var(sys2)} (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_auth#xaas_auth)[text=%text]}).
1. Опубликуйте новую ревизию сервиса Redis в каталоге Marketplace (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_publish/xaas_publish_api#xaas_publish_revision)[text=%text]}).
