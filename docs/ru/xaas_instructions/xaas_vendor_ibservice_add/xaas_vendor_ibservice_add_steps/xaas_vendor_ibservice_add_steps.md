# {appendix-heading(Порядок действий)[id=xaas_vendor_ibservice_add_steps; position=prefix]}

Чтобы добавить image-based приложение в Marketplace:

1. {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibimage_create/xaas_vendor_ibimage_requirements#xaas_vendor_ibimage_requirements)[text=Создайте образ сервиса и загрузите его на {var(sys4)}]}.

   Рекомендуемый способ — с помощью Packer.

   <err>

   Перед публикацией сервиса в Marketplace образ будет опубликован на {var(sys3)} (подробнее — в разделе {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_publish_image#xaas_vendor_ibservice_upload_publish_image)[text=%text]}). На основе публичного образа будут развертываться инстансы сервиса у пользователей {var(sys2)}. Данные образа будут общедоступными.

   </err>
   
1. {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ib_structure#xaas_vendor_ib_structure)[text=Создайте структуру файлов сервисного пакета]}.
1. {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ibservice_files#xaas_vendor_ibservice_files)[text=Подготовьте файлы, описывающие конфигурацию сервиса (тарифные планы, опции)]}.
1. {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_tf_manifest/xaas_vendor_tf_manifest_steps#xaas_vendor_tf_manifest_steps)[text=Подготовьте файлы, описывающие конфигурацию инфраструктуры сервиса]}.
1. {linkto(../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_package#xaas_vendor_ibservice_upload_prepare)[text=Загрузите и опубликуйте сервис на {var(sys6)}]}.