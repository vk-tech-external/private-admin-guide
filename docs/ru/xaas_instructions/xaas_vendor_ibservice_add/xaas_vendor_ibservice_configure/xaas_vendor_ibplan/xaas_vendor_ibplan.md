# {appendix-heading(Файл plan.yaml)[id=xaas_vendor_ibplan; position=prefix]}

В файле `plans/<PLAN_NAME>/plan.yaml` описываются параметры конкретного тарифного плана. После загрузки сервисного пакета и публикации сервиса тарифный план будет доступен в открытых пространствах имен Marketplace (`namespace_public`), указанных в сервисном ключе (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_phases#xaas_vendor_ibservice_upload_phases)[text=%text]}).

В файле `plans/<PLAN_NAME>/plan.yaml` задайте параметры и секции, приведенные в {linkto(#tab_plans_1)[text=таблице %number]}.

{caption(Таблица {counter(table)[id=numb_tab_plans_1]} — Параметры файла plans/<PLAN_NAME>/plan.yaml)[align=right;position=above;id=tab_plans_1;number={const(numb_tab_plans_1)}]}
[cols="2,5,2,2", options="header"]
|===
|Имя
|Описание
|Формат
|Обязательный

|id
|Идентификатор тарифного плана UUID4 (ID), сформированный с помощью генератора UUID4
|string (UUID4)
| ![](../../../../assets/check.svg "inline")

|revision
|Ревизия тарифного плана. Сочетание ревизии и ID тарифного плана определяет его уникальность в сервисе. Остальные параметры описывают характеристики конкретной ревизии тарифного плана
|string, до 255 символов
| ![](../../../../assets/check.svg "inline")

|name
|Техническое название тарифного плана, которое не отображается в интерфейсе Marketplace. Должно быть указано латинскими буквами с использованием знака нижнего подчеркивания вместо пробелов
|string, до 255 символов
| ![](../../../../assets/check.svg "inline")

|description
|Название тарифного плана, которое отображается в интерфейсе Marketplace
|string, до 255 символов
| ![](../../../../assets/check.svg "inline")

|free
|Определяет, бесплатный этот тарифный план или нет
|boolean
| ![](../../../../assets/check.svg "inline")

|billing
|Определяет стоимость тарифного плана без учета платных тарифных опций
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|billing.cost
|Определяет стоимость тарифного плана без учета платных тарифных опций (подробнее — в подразделе {linkto(#plan_billing)[text=%text]})
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/check.svg "inline")

|parameters_patch
|Позволяет переопределить параметры тарифных опций для конкретного плана (подробнее — в подразделе {linkto(#plan_options)[text=%text]})
| ![](../../../../assets/no.svg "inline")
| ![](../../../../assets/no.svg "inline")
|===
{/caption}

<err>

Сочетание ID и ревизии тарифного плана должно быть уникальным в рамках сервиса. Если план с такими же идентификатором и ревизией уже существует в этом сервисе, тарифный план не будет обновлен.

</err>

{caption(Пример файла plans/<PLAN_NAME>/plan.yaml)[align=left;position=above]}
```yaml
id: b2b42648-5449-462f-b03e-b4cddbf010b2
revision: v. 1.0
name: basic
description: Базовый
free: false

billing:
  cost: 2000

parameters_patch:
  users:
    schema.const: 5000
  volume_data_size:
    schema.default: 550
    schema.minimum: 550
```
{/caption}

#### {appendix-heading(Секция billing тарифного плана)[id=plan_billing; position=prefix]}

Для стоимости тарифного плана поддерживается только предоплатный способ списания денежных средств (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_index#xaas_billing)[text=%text]}).

Чтобы описать стоимость тарифного плана ({linkto(#pic_xaas_plan_billing)[text=рисунок %number]}):

1. В файле `plans/<PLAN_NAME>/plan.yaml` укажите секцию `billing`.
1. Задайте стоимость плана за месяц `<MONTH_COST>` в параметре `cost`:

   ```yaml
   billing:
   cost: <MONTH_COST>
   ```

   Если план бесплатный, укажите значение `0`. Стоимость сервиса задается в валюте страны, где развернут Marketplace.

   К стоимости плана можно добавить платные тарифные опции. Для этого опишите их стоимость в YAML-файлах опций (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption_fill_in#xaas_vendor_iboption_fill_in)[text=%text]}).

   {caption(Рисунок {counter(pic)[id=numb_pic_xaas_plan_billing]} — Стоимость тарифного плана)[align=center;position=under;id=pic_xaas_plan_billing;number={const(numb_pic_xaas_plan_billing)}]}
   ![Стоимость тарифного плана](./assets/xaas_plan_billing.png){params[printWidth=95%]}
   {/caption}

<warn>

Стоимость использования вычислительных ресурсов {var(sys2)} в стоимость тарифного плана сервиса не входит.

</warn>

## {appendix-heading(Секция parameters_patch)[id=plan_options; position=prefix]}

Чтобы для конкретного тарифного плана переопределить параметры тарифных опций или добавить новые, не заданные в YAML-файлах:

1. В файле `plans/<PLAN_NAME>/plan.yaml` укажите:

   * Секцию `parameters_patch`.
   * Внутри `parameters_patch` — имена YAML-файлов тарифных опций.

1. Задайте значения параметров тарифных опций. Имена параметров укажите с путем до корневой секции. Имя параметра и имена его родительских секций разделите между собой точкой.

   Возможные параметры в зависимости от типа тарифной опции приведены в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption#xaas_vendor_iboption)[text=%text]}

   {caption(Пример переопределения параметров тарифных опций)[align=left;position=above]}
   ```yaml
   parameters_patch:
     users:
       schema.const: 5000
     volume_data_size:
       schema.default: 550
       schema.minimum: 550
   ```
   {/caption}

   Значения параметров, указанные в YAML-файле тарифной опции, не будут применяться в тарифном плане.

Чтобы переопределить секцию тарифной опции полностью:

1. В файле `plans/<PLAN_NAME>/plan.yaml` укажите:

   * Секцию `parameters_patch`.
   * Внутри `parameters_patch` — секцию тарифной опции. Пример: `billing`.

1. Задайте параметры секции (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption#xaas_vendor_iboption)[text=%text]}).

   {caption(Пример переопределения секции billing тарифной опции)[align=left;position=above]}
   ```yaml
   parameters_patch:
     assemblies_size:
       billing:
         base: 25
         cost: 0
         unit:
           size: 100
   ```
   {/caption}

   Параметры, указанные для этой секции в YAML-файле тарифной опции, не будут применяться в тарифном плане.

<err>

Одновременное переопределение секции полностью и отдельного параметра из этой секции запрещено.

</err>

<info>

Если в тарифных планах используются опции, которые сильно отличаются друг от друга, рекомендуется описать каждую опцию отдельным YAML-файлом в директории `parameters`. Не рекомендуется описывать одну опцию и переопределять большинство ее параметров в рамках тарифных планов.

</info>