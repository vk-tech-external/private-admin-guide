# {appendix-heading(Секция preview)[id=xaas_vendor_saas_preview; position=prefix]}

Секция `preview` определяет, какие тарифные опции будут отображаться в матрице тарифных планов (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_index#xaas_tariff_matrix)[text=%text]}).

В матрице будут отображаться все тарифные планы, указанные в секции `plans`, и тарифные опции, указанные в секции `preview`.

В секции `preview` перечислите тарифные опции по следующей структуре:

```json
"preview": {
        "parameters": [
          {
            "name": "<OPTION>"
          },
          ...
        ]
      }
```

где:

* Секция `parameters` — определяет тарифные опции для матрицы тарифных планов. Может быть пустой.
* `<OPTION>` — имя тарифной опции в JSON-файле.

<warn>

В матрице тарифные опции будут отображаться с именами, заданными в параметре `description` этих опций.

</warn>

{caption(Пример заполнения секции preview)[align=left;position=above]}
```json
"preview": {
        "parameters": [
          {
            "name": "vms" // Имя тарифной опции в JSON-файле
          },
          {
            "name": "servers"
          },
          {
            "name": "storage"
          }
        ]
      }
```
{/caption}