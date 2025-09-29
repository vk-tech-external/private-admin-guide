# {heading(Добавление image-based приложения в Marketplace)[id=xaas_add_ib]}

Чтобы добавить image-based приложение в Marketplace:

1. Авторизуйтесь в Marketplace под учётной записью администратора {var(sys2)} через API-запрос (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]}).
1. Добавьте OpenStack PID поставщика в список поставщиков (подробнее — в разделе {linkto(../../../usage/xaas/xaas_pid#xaas_pid_add)[text=%text]}).
1. Создайте сервисный ключ (подробнее — в разделе {linkto(../../../usage/xaas/xaas_service_key#xaas_service_key_create)[text=%text]}).

   Если для компании-поставщика сервисный ключ создан, пропустите шаг.

1. Передайте сервисный ключ поставщику.
1. Зарегистрируйте тенант image-based брокера в Marketplace (подробнее — в разделе {linkto(../../../usage/xaas/xaas_broker#xaas_broker_register)[text=%text]}).

   Один тенант image-based брокера содержит image-based приложения одной компании-поставщика.

   Если тенант компании-поставщика зарегистрирован в Marketplace, пропустите шаг.

1. Создайте в Marketplace тестовые пространства имён, указанные в сервисном ключе (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_test_space_create)[text=%text]}).

   Если в Marketplace созданы тестовые пространства имён, пропустите шаг.

1. Создайте в Marketplace открытые пространства имён, указанные в сервисном ключе (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_prod_space_create)[text=%text]}).

   Если в Marketplace созданы открытые пространства имён, пропустите шаг.

1. Добавьте пользователя {var(sys2)}, указанного в электронном письме поставщика, в тестовые пространства имён, указанные в сервисном ключе (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_space_add_user)[text=%text]}).

   Если пользователь добавлен в пространства имён, пропустите шаг.

1. Опубликуйте image-based приложение (подробнее — в разделе {linkto(../../../usage/xaas/xaas_publish#xaas_publish_first)[text=%text]}).
