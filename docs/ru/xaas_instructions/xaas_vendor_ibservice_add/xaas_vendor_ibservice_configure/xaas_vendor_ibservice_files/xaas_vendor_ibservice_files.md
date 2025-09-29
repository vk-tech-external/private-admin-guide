# {appendix-heading(Список конфигурационных файлов image-based приложения)[id=xaas_vendor_ibservice_files; position=prefix]}

Конфигурация image-based приложения для брокера описывается с помощью файлов формата `YAML` и `MD`. YAML-файлы должны иметь определенную структуру и параметры, которые приведены в следующих подразделах.

Подготовьте следующие конфигурационные файлы:

1. {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ibservice_param#xaas_vendor_ibservice_param)[text=%text]}.
1. {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ibservice_full_description#xaas_vendor_ibservice_full_description)[text=%text]}.
1. Файлы тарифных опций `parameters/<OPTION_NAME>.yaml` (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_iboption_fill_in#xaas_vendor_iboption_fill_in)[text=%text]}).
1. Файлы тарифных планов {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ibplan#xaas_vendor_ibplan)[text=plans/<PLAN_NAME>/plan.yaml]}.
1. Файлы мастера конфигурации тарифного плана для каждого тарифного плана {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_configure/xaas_vendor_ib_display#xaas_vendor_ib_display)[text=plans/<PLAN_NAME>/display.yaml]}.