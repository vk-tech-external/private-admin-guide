# {appendix-heading(Пример манифеста Terraform для создания ресурсов группы сервисов «Балансировщики нагрузки»)[id=tf_example_loadbalancer; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты группы сервисов «Балансировщики нагрузки»:

* `HTTP` балансировщики нагрузки.
* `TCP` балансировщики нагрузки.

Дополнительно будут созданы:

* Тестовая сеть, подсеть, группа безопасности.
* Инстанс ВМ.
* Блочное хранилище.

{caption(Листинг файла-манифеста создания ресурсов группы сервисов «Балансировщики нагрузки»)[align=left;position=above]}
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

resource "vkcs_networking_network" "network_test" {
  name                  = "network_test"
  admin_state_up        = "true"
  port_security_enabled = "true"
}

resource "vkcs_networking_subnet" "subnet_test" {
  name       = "test_subnet"
  network_id = "${vkcs_networking_network.network_test.id}"
  cidr       = "192.168.199.0/24"
}

resource "vkcs_networking_router" "router_test" {
  name                = "router_test"
  admin_state_up      = true
  external_network_id = "76dfd377-b303-4b69-8cab-0d2f640130c5"
}

resource "vkcs_networking_router_interface" "router_interface_test" {
  router_id = "${vkcs_networking_router.router_test.id}"
  subnet_id = "${vkcs_networking_subnet.subnet_test.id}"
}

resource "vkcs_networking_secgroup" "secgroup_test" {
  name        = "secgroup_test"
  description = "My security group"
}

resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_ssh" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}

resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_http" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8080
  port_range_max    = 8080
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}

resource "vkcs_networking_secgroup_rule" "secgroup_rule_test_tcp" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 9090
  port_range_max    = 9090
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}

resource "vkcs_lb_loadbalancer" "loadbalancer_test_http" {
    name               = "loadbalancer_test_http"
    vip_subnet_id      = "${vkcs_networking_subnet.subnet_test.id}"
    security_group_ids = [ "${vkcs_networking_secgroup.secgroup_test.id}" ]
}

resource "vkcs_lb_loadbalancer" "loadbalancer_test_tcp" {
    name               = "loadbalancer_test_tcp"
    vip_subnet_id      = "${vkcs_networking_subnet.subnet_test.id}"
    security_group_ids = [ "${vkcs_networking_secgroup.secgroup_test.id}" ]
}

resource "vkcs_lb_listener" "listener_test_http" {
    name            = "listener_test_http"
    protocol        = "HTTP"
    protocol_port   = 8080
    loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_http.id}"
}

resource "vkcs_lb_listener" "listener_test_tcp" {
    name            = "listener_test_tcp"
    protocol        = "TCP"
    protocol_port   = 9090
    loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_tcp.id}"
}

resource "vkcs_lb_pool" "pool_test_http" {
    name            = "pool_test_http"
    protocol        = "HTTP"
    lb_method       = "ROUND_ROBIN"
    loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_http.id}"
}

resource "vkcs_lb_pool" "pool_test_tcp" {
    name            = "pool_test_tcp"
    protocol        = "TCP"
    lb_method       = "ROUND_ROBIN"
    loadbalancer_id = "${vkcs_lb_loadbalancer.loadbalancer_test_tcp.id}"
}

resource "vkcs_lb_l7policy" "l7policy_test_http" {
    name         = "test"
    action       = "REDIRECT_TO_URL"
    description  = "test description"
    position     = 1
    listener_id  = "${vkcs_lb_listener.listener_test_http.id}"
    redirect_url = "http://www.example.com"
}

resource "vkcs_lb_l7rule" "l7rule_test" {
    l7policy_id  = "${vkcs_lb_l7policy.l7policy_test_http.id}"
    compare_type = "EQUAL_TO"
    type         = "PATH"
    value        = "/api"
}

resource "vkcs_blockstorage_volume" "vol1_test" {
  name             = "instance1_vol"
  size             = 10
  image_id         = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
  volume_type      = "ceph"
 availability_zone = "AZ1"
}

resource "vkcs_blockstorage_volume" "vol2_test" {
  name             = "instance1_vol"
  size             = 10
  image_id         = "4d8bc6c0-5623-43bf-9179-1bebcb943b47"
  volume_type      = "ceph"
 availability_zone = "AZ1"
}

resource "vkcs_compute_instance" "instance1_test" {
  name            = "terraform-instance1-test"
  flavor_id       = "fc83b839-a97b-4074-83d6-211531ffd8b3"
  key_pair        = "CentOS-Basic-1-1-10GB-5CDfA91u"
  security_groups = ["secgroup_test"]

  block_device {
    uuid                  = "${vkcs_blockstorage_volume.vol1_test.id}"
    source_type           = "volume"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    name = "network_test"
  }

  depends_on = [
    vkcs_networking_network.network_test,
    vkcs_networking_subnet.subnet_test,
    vkcs_networking_secgroup.secgroup_test
  ]
}

resource "vkcs_compute_instance" "instance2_test" {
  name            = "terraform-instance2-test"
  flavor_id       = "fc83b839-a97b-4074-83d6-211531ffd8b3"
  key_pair        = "CentOS-Basic-1-1-10GB-5CDfA91u"
  security_groups = ["secgroup_test"]

  block_device {
    uuid                  = "${vkcs_blockstorage_volume.vol2_test.id}"
    source_type           = "volume"
    boot_index            = 0
    destination_type      = "volume"
    delete_on_termination = true
  }

  network {
    name = "network_test"
  }

  depends_on = [
    vkcs_networking_network.network_test,
    vkcs_networking_subnet.subnet_test,
    vkcs_networking_secgroup.secgroup_test
  ]

}

resource "vkcs_lb_members" "members_http_test" {
    pool_id = "${vkcs_lb_pool.pool_test_http.id}"
    member {
        address       = "${vkcs_compute_instance.instance1_test.access_ip_v4}"
        protocol_port = 8080
        weight        = 2
    }

    member {
        address       = "${vkcs_compute_instance.instance2_test.access_ip_v4}"
        protocol_port = 8080
        weight        = 10
    }
}

resource "vkcs_lb_members" "members_tcp_test" {
    pool_id = "${vkcs_lb_pool.pool_test_tcp.id}"
    member {
        address       = "${vkcs_compute_instance.instance1_test.access_ip_v4}"
        protocol_port = 9090
        weight        = 10
    }

    member {
        address       = "${vkcs_compute_instance.instance2_test.access_ip_v4}"
        protocol_port = 9090
        weight        = 2
    }
}
```
{/caption}