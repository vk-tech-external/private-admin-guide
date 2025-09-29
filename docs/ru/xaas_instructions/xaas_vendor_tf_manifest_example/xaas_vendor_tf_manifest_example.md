# {appendix-heading(Пример манифеста для image-based приложения)[id=xaas_vendor_tf_manifest_example; position=prefix]}

Ниже приведён манифест для разворачивания сервиса Redis на одной ВМ с настройкой мониторинга по порту.

{caption(Пример манифеста для сервиса Redis)[align=left;position=above]}
```bash
# --------------------variables--------------------
# Специальные переменные
# Идентификатор разворачивания сервиса
variable "instance_uuid" {
  type    = string
  default = "4a57a965-3c83-436c-80e2-428e421538cc"
}

variable "email" {
  type    = string
  default = "user@example.com"
}

# Внешние переменные
# Зона доступности
variable "ds-az" {
  type    = string
  default = "GZ1"
}

# Тип ВМ
variable "ds-flavor" {
  type    = string
  default = "a493b27d-170d-48eb-a24b-99e9b325f988"
}

# Идентификатор подсети
variable "ds-subnet" {
  type    = string
  default = "cd4224ac-0527-4291-a8e0-afae0cee02ed"
}

# Тип root-диска
variable "root_type" {
  type    = string
  default = "ceph-ssd"
}

# Размер root-диска, ГБ
variable "root_size" {
  type    = number
  default = 10
}

# Тип диска для хранения данных
variable "data_type" {
  type    = string
  default = "ceph-ssd"
}

# Размер диска для хранения данных, ГБ
variable "data_size" {
  type    = number
  default = 5
}

# Запуск команды BGREWRITEAOF
variable "backup_rewrite" {
  type    = bool
  default = true
}

# Период ротации резервных копий
variable "backup_retention" {
  type    = string
  default = "1w"
}

# URL сервиса S3
variable "backup_bucket_endpoint" {
  type    = string
  default = "https://example.com"
}

# Имя бакета S3
variable "backup_bucket_name" {
  type    = string
  default = ""
}

# Префикс для резервных копий
variable "backup_bucket_path_prefix" {
  type    = string
  default = "redis"
}

# Открытый ключ доступа к бакету S3
variable "backup_bucket_access" {
  type    = string
  default = ""
}

# Закрытый ключ доступа к бакету S3
variable "backup_bucket_secret" {
  type    = string
  default = ""
}

# Локальные переменные
# Идентификатор образа сервиса
variable "image_uuid" {
  type    = string
  default = "8c7a6443-bb79-4f04-884a-14231f0ba6cb"
  description = "redis image"
}

# Порты доступа для группы безопасности
variable "ports" {
  type        = list(number)
  default     = [22, 6379]
  description = "ports for secgroup rule"
}

locals {
  # Генерация имени хоста
  short_name = substr(var.instance_uuid, 0, 8)
  hosts_name = "${local.short_name}-redis"
}

# ---------------------data------------------------
# Получение данных виртуальной сети
data "vkcs_networking_subnet" subnet {
  subnet_id = var.ds-subnet
}

# --------------------keypair----------------------
# Создание ключевой пары
resource "vkcs_compute_keypair" "keypair" {
  name = "${var.instance_uuid}_redis_keypair"
}

# --------------------security group---------------
# Создание группы безопасности
resource "vkcs_networking_secgroup" "secgroup" {
  name = "${local.short_name}-redis"
  sdn         = data.vkcs_networking_subnet.subnet.sdn
  description = "redis security group"
}

# Правила для группы безопасности
resource "vkcs_networking_secgroup_rule" "rules" {
  count = length(var.ports)
  # Определение направления применения правил — для входящих (ingress) или исходящих (egress) соединений
  direction = "ingress"
  # Список портов доступа
  port_range_max = element(var.ports, count.index)
  port_range_min = element(var.ports, count.index)
  # Протокол доступа
  protocol = "tcp"
  # Удалённый сетевой префикс
  remote_ip_prefix  = "0.0.0.0/0"
  # Индентификатор группы безопасности, для которой созданы правила
  security_group_id = vkcs_networking_secgroup.secgroup.id
  description       = "rule_tcp_${element(var.ports, count.index)}"
}

# --------------------network----------------------
# Привязка IP-адреса к порту
resource "vkcs_networking_port" "ports" {
  name               = "${local.short_name}-redis"
  admin_state_up     = "true"
  network_id         = data.vkcs_networking_subnet.subnet.network_id
  security_group_ids = [vkcs_networking_secgroup.secgroup.id]
  sdn                = data.vkcs_networking_subnet.subnet.sdn
  fixed_ip {
    subnet_id = var.ds-subnet
  }
}

# --------------------conf system-init-------------
# Получение данных для инициализации агента на хосте
resource "ivkcs_agent_init" "init" {
  # Идентификатор разворачивания сервиса
  uuid = var.instance_uuid
  hosts = [local.hosts_name]
  options {
    memory_limit = 256
  }
}

# --------------------------vm---------------------
# Создание ВМ
resource "vkcs_compute_instance" "compute" {
  name              = local.hosts_name
  flavor_id         = var.ds-flavor
  security_groups   = [vkcs_networking_secgroup.secgroup.name]
  availability_zone = var.ds-az
  key_pair          = vkcs_compute_keypair.keypair.name
  metadata          = { "sid" : "xaas", "product" : "redis" }
  # Root-диск
  block_device {
    source_type      = "volume"
    destination_type = "volume"
    boot_index       = 0
    uuid             = vkcs_blockstorage_volume.boot.id
  }

  # Инициализация агента на ВМ
  user_data = ivkcs_agent_init.init.agent[0]

  # Прикрепление IP-адреса к ВМ
  network {
    port = vkcs_networking_port.ports.id
  }

  # Попытка остановить ВМ перед удалением
  stop_before_destroy = true

  # Тайм-аут создания ВМ
  timeouts {
    create = "10m"
  }
}

# Создание root-диска
resource "vkcs_blockstorage_volume" "boot" {
  name              = "${local.short_name}-redis-boot"
  # Метаданные
  metadata          = { "sid" : "xaas", "product" : "redis" }
  # Идентификатор образа сервиса
  image_id          = var.image_uuid
  volume_type       = var.root_type
  size              = var.root_size
  availability_zone = var.ds-az
}

# --------------------volume-----------------------
# Создание диска данных
resource "vkcs_blockstorage_volume" "data" {
  name              = "${local.short_name}-redis-data"
  # Метаданные
  metadata          = { "sid" : "xaas", "product" : "redis" }
  size              = var.data_size
  availability_zone = var.ds-az
  volume_type       = var.data_type
}

# Присоединение диска данных к ВМ
resource "vkcs_compute_volume_attach" "attached" {
  instance_id = vkcs_compute_instance.compute.id
  volume_id   = vkcs_blockstorage_volume.data.id
}

# --------------------conf system-run--------------
resource "random_password" "user" {
  special = false
  length  = 50
}

resource "random_password" "admin" {
  special = false
  length  = 50
}

resource "random_password" "vault_password" {
  special = false
  length  = 50
}

locals {
  nodes_list = {
    "nodes" = [
      {
        hostname : "${local.hosts_name}.novalocal",
        ip : vkcs_compute_instance.compute.access_ip_v4,
        id : 1
      }
    ]
  }

  keys = {
    "public_key"  = vkcs_compute_keypair.keypair.public_key,
    "private_key" = vkcs_compute_keypair.keypair.private_key,
  }

  # Стартовый скрипт для ресурса ivkcs_agent_exec.start
  start = <<-EOT
#!/bin/bash

ansible-playbook encrypt.yml \
  --extra-vars 'encrypt_vault_password=${random_password.user.result}' \
  --extra-vars '${jsonencode(local.keys)}' \
  --extra-vars 'redis_type=single' \
  --extra-vars 'redis_user_password=${random_password.user.result}' \
  --extra-vars 'redis_admin_password=${random_password.admin.result}' \
  --extra-vars 'backup_bucket_access=${var.backup_bucket_access == "no" ? "" : var.backup_bucket_access}' \
  --extra-vars 'backup_bucket_secret=${var.backup_bucket_secret == "no" ? "" : var.backup_bucket_secret}'

ansible-playbook start.yml --vault-password-file /etc/encrypt_vault_password \
  --extra-vars '${jsonencode(local.nodes_list)}' \
  --extra-vars 'backup_type=single' \
  --extra-vars 'backup_rewrite=${var.backup_rewrite ? "true" : "false"}' \
  --extra-vars 'backup_retention=${var.backup_retention}' \
  --extra-vars 'backup_bucket_endpoint=${var.backup_bucket_endpoint}' \
  --extra-vars 'backup_bucket_name=${var.backup_bucket_name}' \
  --extra-vars 'backup_bucket_path_prefix=${var.backup_bucket_path_prefix}'

EOT
}

resource "ivkcs_agent_exec" "start" {
  hosts = [local.hosts_name]
  name  = "start_redis"
  uuid  = var.instance_uuid
  step {
    index   = 1
    type    = "bash"
    content = local.start
    options {
      timeout  = "10m"
      cwd      = "/opt/playbooks"
      attempts = 1
    }
  }

  timeouts {
    create = "10m"
  }

  depends_on = [
    vkcs_compute_instance.compute,
    vkcs_compute_volume_attach.attached
  ]
}

# --------------------health check-----------------

# Мониторинг ВМ
resource "ivkcs_agent_check" "health" {
  hosts = [local.hosts_name]
  uuid  = var.instance_uuid

  # Мониторинг по порту
  port_health {
    host   = vkcs_compute_instance.compute.access_ip_v4
    port   = 6379
    period = "10s"
  }
  timeouts {
    create = "5m"
  }

  depends_on = [
    ivkcs_agent_exec.start,
  ]
}

# --------------------outputs----------------------
# Вывод IP-адреса ВМ
output "address" {
  value = vkcs_compute_instance.compute.access_ip_v4
}

# Вывод паролей
output "default_password" {
  value     = random_password.user.result
  # Выходной параметр содержит чувствительные данные
  sensitive = true
}

output "admin_password" {
  value     = random_password.admin.result
  sensitive = true
}

# Вывод закрытого SSH-ключа для доступа к ВМ
output "keypair" {
  value = vkcs_compute_keypair.keypair.private_key
  sensitive = true
}
```
{/caption}