# {heading(Добавление image-based приложения в Marketplace)[id=xaas_add_ib]}

Чтобы добавить image-based приложение в Marketplace:

1. Добавьте поставщика в Marketplace (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_vendor#xaas_vendor)[text=%text]}).

   Если поставщик был добавлен ранее, в image-based брокере уже есть тенант для его сервисов. В этом случае пропустите шаг.
1. Передайте поставщику сервисный ключ, созданный при добавлении поставщика.

   <info>

   Уже существующие поставщики могут использовать сервисные ключи, переданные им ранее. При необходимости создайте новый сервисный ключ отдельным API-запросом (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_service_key#xaas_service_key_create)[text=%text]}) и передайте поставщику.

   </info>
   
1. После того, как поставщик протестирует image-based приложение в Marketplace, опубликуйте сервис (подробнее — в разделе {linkto(../../marketplace_xaas/xaas_publish/xaas_publish_api#xaas_publish_first)[text=%text]}).