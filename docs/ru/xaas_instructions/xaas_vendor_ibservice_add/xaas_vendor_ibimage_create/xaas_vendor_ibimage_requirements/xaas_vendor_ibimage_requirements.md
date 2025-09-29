# {appendix-heading(Требования к образу сервиса)[id=xaas_vendor_ibimage_requirements; position=prefix]}

Образ сервиса должен содержать следующие программные пакеты:

* [Cloud-init](https://cloudinit.readthedocs.io/en/latest/) — чтобы настроить ВМ в {var(sys3)}.
* Если используется агент (подробнее — в разделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibimage_create/xaas_vendor_ibimage_agent#xaas_vendor_ibimage_agent)[text=%text]}):

   * Curl — чтобы инициализировать скачивание агента.
   * Systemd — чтобы запускать агента и следить за его работоспособностью.