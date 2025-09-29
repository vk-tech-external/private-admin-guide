# {appendix-heading(Структура JSON-файла)[id=xaas_vendor_saas_json; position=prefix]}

Опишите конфигурацию SaaS-приложения для брокера. Если SaaS-брокер создан по шаблону, выполните действия:

1. Создайте файл `catalog_<SERVICE_NAME>.json`.
1. В JSON-файле опишите конфигурацию сервиса по следующей структуре:

```json
{
  "services": [
    {
    <SERVICE_PARAMETERS>,
    "preview": {
        "parameters": [
        ]
      },
    "plans": [
      ]
    }
  ]
}
```

где:

* `<SERVICE_PARAMETERS>` — параметры сервиса (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_saas_add/xaas_vendor_saas_configure/xaas_vendor_saas_param#xaas_vendor_saas_param)[text=%text]}).
* Секция `preview` — описывает тарифные опции для матрицы тарифных планов (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_saas_add/xaas_vendor_saas_configure/xaas_vendor_saas_preview#xaas_vendor_saas_preview)[text=%text]}).
* Секция `plans` — описывает тарифные планы и их опции (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_saas_add/xaas_vendor_saas_configure/xaas_vendor_saas_plan/xaas_vendor_saas_plan_structure#xaas_vendor_saas_plan_structure)[text=%text]}).

Пример JSON-файла приведён в разделе {linkto(../../../../xaas_instructions/xaas_vendor_saas_example#xaas_vendor_saas_example)[text=%text]}.