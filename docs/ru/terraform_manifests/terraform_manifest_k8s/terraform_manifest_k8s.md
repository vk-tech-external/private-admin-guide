# {appendix-heading(Пример манифеста Terraform для создания ресурсов группы сервисов «Кластеры Kubernetes»)[id=tf_example_k8s; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты группы сервисов «Кластеры Kubernetes»:

* Кластер Kubernetes.
* Группа кластеров Kubernetes.

<err>

Подробнее об использовании провайдера VK CS смотрите в [Официальной документации](https://cloud.vk.com/docs/tools-for-using-services/terraform/quick-start).

Для создания кластера Kubernetes в приватном облаке нужна версия провайдера именно «0.1.4».

</err>

{caption(Листинг файла-манифеста создания ресурсов группы сервисов «Кластеры Kubernetes»)[align=left;position=above]}
```bash
terraform {
    required_providers {
        vkcs = {
            source  = "vk-cs/vkcs"
            version = "0.1.4"
        }
    }
}

data "vkcs_kubernetes_clustertemplate" "cluster_template" {
  name = "Kubernetes-almalinux-v1.22.6-mcs.external"
}

data "vkcs_networking_subnet" "subnet_project" {
  name = "subnet-project001"
}

data "vkcs_networking_network" "network_project" {
  name = "net-project001"
}

data "vkcs_compute_flavor" "k8s_flavor" {
  name = "Standard-2-4"
}

# Создание кластера k8s
resource "vkcs_kubernetes_cluster" "cluster_test" {
  name = "cluster-test"
  cluster_template_id = data.vkcs_kubernetes_clustertemplate.cluster_template.id
  subnet_id = data.vkcs_networking_subnet.subnet_project.id
  network_id = data.vkcs_networking_network.network_project.id
  master_flavor = data.vkcs_compute_flavor.k8s_flavor.id
  master_count = 1
  # Имя ключевой пары для инстанса кластера. Можно узнать с помощью команды: openstack keypair list
  keypair = "my_keys"
  availability_zone   = "AZ1"
  floating_ip_enabled = true
}
# Создание группы кластеров k8s
resource "vkcs_kubernetes_node_group" "nodegroup_k8s" {
  name = "nodegroup-k8s"
  cluster_id = vkcs_kubernetes_cluster.cluster_test.id
  node_count = 1
  availability_zones = ["AZ1"]
  volume_type = "ceph"
  volume_size = 30
  max_node_unavailable = 1
}
```
{/caption}