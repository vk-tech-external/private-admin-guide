# {appendix-heading(Загрузка конфигурации сервиса в брокер)[id=xaas_vendor_saas_broker_add_configuration; position=prefix]}

Загрузите конфигурацию сервиса в брокер. Если SaaS-брокер создан по шаблону, выполните действия:

1. Перейдите в директорию с брокером.
1. Поместите файл с конфигурацией сервиса `catalog_<SERVICE_NAME>.json` в директорию `resources`.
1. В файле `resources/plan_mapping.json` укажите:

   * `<SERVICE_NAME>` — имя сервиса.
   * `<PLAN_ID>` — ID тарифных планов, указанных в файле `catalog_<SERVICE_NAME>.json`.
   * `<SAAS_PLAN_ID>` (формат `string`) — ID тарифных планов на стороне сервиса, соответствующих ID тарифных планов `<PLAN_ID>`.

      ```json
      {
        "<SERVICE_NAME>": {
          "<PLAN_ID>": <SAAS_PLAN_ID>,
          "<PLAN_ID>": <SAAS_PLAN_ID>
        }
      }
      ```

   {caption(Пример содержимого файла plan_mapping.json)[align=left;position=above]}
   ```json
   {
     "VKT": {
       "0dc54b75-8590-402b-a4b0-89d5a47eef71": 1,
       "312b628e-3089-4079-be1d-080ab4ca3acb": 2,
       "e2ae1588-9a35-4c2d-8559-3f5081a799a9": 3,
       "b54e7247-c9a3-49ff-88cd-7a9dccc22e7b": 4
     }
   }
   ```
   {/caption}

1. В директории с брокером переименуйте файл `.env.example` в `.env`.
1. В файле `.env` укажите имя сервиса в `BROKER_MODE`:

   ```
   BROKER_MODE=<SERVICE_NAME>
   ```
