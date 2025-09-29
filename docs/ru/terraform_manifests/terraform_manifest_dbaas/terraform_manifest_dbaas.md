# {appendix-heading(Пример манифеста Terraform для создания ресурсов группы сервисов «Управляемые БД»)[id=tf_example_database; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты группы сервисов «Управляемые БД»:

* Экземпляр БД.
* Кластер БД.

<err>

Для корректной работы требуется не Openstack провайдер, а провайдер VK CS версии 0.1.4 или выше.

Подробнее об использовании провайдера VK CS смотрите в [Официальной документации](https://cloud.vk.com/docs/tools-for-using-services/terraform/quick-start).

</err>

{caption(Листинг файла-манифеста создания ресурсов группы сервисов «Управляемые БД»)[align=left;position=above]}
```bash
# Блок общих настроек terraform
terraform {
    required_providers {
        vkcs = {
            source  = "vk-cs/vkcs"
            version = "~> 0.1.12"
        }
    }
}

data "vkcs_networking_subnet" "subnet_project" {
  name = "subnet-project001"
}

data "vkcs_networking_network" "network_project" {
  name = "net-project001"
}

data "vkcs_compute_flavor" "db_flavor" {
  name = "Basic-1-2"
}

resource "vkcs_db_cluster" "db_cluster" {
  name        = "db-cluster"
# Версии можно взять из UI портала Самообслуживания
  datastore {
    type    = "postgresql"
    version = "12"
  }

  cluster_size = 3

  flavor_id   = data.vkcs_compute_flavor.db_flavor.id

  volume_size = 10
  volume_type = "ceph"

  network {
    uuid = data.vkcs_networking_network.network_project.id
  }
}

resource "vkcs_db_instance" "db_instance" {
  name        = "db-instance"
# Версии можно взять из UI портала Самообслуживания
  datastore {
    type    = "mysql"
    version = "5.7"
  }

  flavor_id   = data.vkcs_compute_flavor.db_flavor.id

  size = 10
  volume_type = "ceph"

  network {
    uuid = data.vkcs_networking_network.network_project.id
  }
}
```
{/caption}