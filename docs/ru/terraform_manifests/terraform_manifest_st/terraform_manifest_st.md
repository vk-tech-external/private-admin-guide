# {appendix-heading(Пример манифеста Terraform для создания блочных устройств без ВМ)[id=tf_example_storage; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты:

* Блочное хранилище.
* Снимок блочного хранилища.

{caption(Листинг файла-манифеста создания блочных устройств без ВМ)[align=left;position=above]}
```bash
terraform {
    required_providers {
        vkcs = {
            source = "vk-cs/vkcs"
            version = "~> 0.1.12"
        }
    }
}

resource "vkcs_blockstorage_volume" "vol" {
  name              = "vol"
  size              = 10
  volume_type       = "ceph"
  availability_zone = "AZ1"
}

resource "vkcs_blockstorage_snapshot" "vol-snapshot" {
    name      = "vol_snapshot"
    volume_id = "${vkcs_blockstorage_volume.vol.id}"
}
```
{/caption}