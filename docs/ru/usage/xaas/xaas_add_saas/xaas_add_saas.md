# {heading(Добавление SaaS-приложения в Marketplace)[id=xaas_add_saas]}

Чтобы добавить SaaS-приложение в Marketplace:

1. Авторизуйтесь в Marketplace под учётной записью администратора {var(sys2)} через API-запрос (подробнее — в разделе {linkto(../../../usage/xaas/xaas_auth#xaas_auth)[text=%text]}).
1. Зарегистрируйте SaaS-брокер в Marketplace (подробнее — в разделе {linkto(../../../usage/xaas/xaas_broker#xaas_broker_register)[text=%text]}).
1. Передайте поставщику имена тестовых и открытых пространств имён, указанных в SaaS-брокере.
1. Создайте в Marketplace тестовые пространства имён, указанные в SaaS-брокере (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_test_space_create)[text=%text]}).

   Если в Marketplace созданы тестовые пространства имён, пропустите шаг.

1. Создайте в Marketplace открытые пространства имён, указанные в SaaS-брокере (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_prod_space_create)[text=%text]}).

   Если в Marketplace созданы открытые пространства имён, пропустите шаг.

1. Добавьте пользователя {var(sys2)}, указанного в электронном письме поставщика, в тестовые пространства имён, указанные в SaaS-брокере (подробнее — в разделе {linkto(../../../usage/xaas/xaas_space#xaas_space_add_user)[text=%text]}).

   Если пользователь добавлен в пространства имён, пропустите шаг.

1. Опубликуйте SaaS-приложение (подробнее — в разделе {linkto(../../../usage/xaas/xaas_publish#xaas_publish_first)[text=%text]}).
