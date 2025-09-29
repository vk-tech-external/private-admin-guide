# {appendix-heading(Пример манифеста Terraform для создания сетевых устройств без ВМ)[id=tf_example_network; position=prefix]}

С помощью этого манифеста будут созданы следующие объекты сетевой подсистемы:

* Виртуальная сеть.
* Подсеть.
* Виртуальный роутер.
* Группа безопасности.

{caption(Листинг файла-манифеста создания сетевых устройств без ВМ)[align=left;position=above]}
```bash
terraform {
    required_providers {
        vkcs = {
            source  = "vk-cs/vkcs"
            version = "~> 0.1.12"
        }
    }
}

resource "vkcs_networking_network" "network_test" {
  name           = "test_network"
  admin_state_up = "true"
  port_security_enabled = false
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

resource "vkcs_networking_secgroup_rule" "secgroup_rule_test" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = "${vkcs_networking_secgroup.secgroup_test.id}"
}
```
{/caption}