# {appendix-heading(Публикация образа сервиса)[id=xaas_vendor_ibservice_upload_publish_image; position=prefix]}

Чтобы опубликовать образ сервиса в {var(sys3)}:

1. Сообщите администратору {var(sys2)} ID образа сервиса.

   Указанный образ будет опубликован. В ответ администратор передаст ID публичного образа сервиса.

   <info>

   Публичный образ сервиса будет доступен всем пользователям {var(sys2)}.

   </info>
   
1. В манифестах `plans/<PLAN_NAME>/deployment/deploy.tf` поменяйте ID образа сервиса на ID публичного образа сервиса.
1. В файле `service.yaml` укажите новую ревизию сервиса.
1. Чтобы загрузить в Marketplace сервисный пакет с ID публичного образа сервиса, выполните запрос к сервису Infra API, приведённый в разделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_package#xaas_vendor_ibservice_upload_package)[text=%text]}.
