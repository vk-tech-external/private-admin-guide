# {appendix-heading(Пример манифеста Terraform для создания ресурсов группы сервисов «Виртуальные машины»)[id=tf_example_vm; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты группы сервисов «Виртуальные машины»:

* Виртуальная машина.
* Тип виртуальной машины.
* Образ виртуальной машины.
* Ключевая пара.

{caption(Листинг файла-манифеста для создания ресурсов группы сервисов «Виртуальные машины»)[align=left;position=above]}
```bash
terraform {
    required_providers {
        vkcs = {
            source  = "vk-cs/vkcs"
            version = "~> 0.1.12"
        }
    }
}

# Создаем volume
resource "vkcs_blockstorage_volume" "vol" {
  name             = "instance1_vol"
  size             = 10
  image_id         = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
  volume_type      = "ceph"
 availability_zone = "AZ1"
}

resource "vkcs_compute_instance" "instance1" {
  # Имя инстанса внутри Платформы
  name            = "terraform-test"
  # ID флейвора для инстанса.  Можно узнать с помощью команды: openstack flavor list
  flavor_id       = "dc84b839-a97b-4074-83d6-233531ffd8b3"
  # Имя ключевой пары для инстанса. Можно узнать с помощью команды: openstack keypair list
  key_pair        = "some_keypair"
  # SG для инстанса
  security_groups = ["default"]

  block_device {
    uuid                  = "${vkcs_blockstorage_volume.vol.id}"
    source_type           = "volume"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }


  # Сеть для инстанса.
  network {
    name = "net-project001"
  }

}
```
{/caption}