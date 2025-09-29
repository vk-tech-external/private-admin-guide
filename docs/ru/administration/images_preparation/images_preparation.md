# {heading(Подготовка образа диска ВМ для загрузки в {var(sys4)})[id=images_preparation]}

Подготовка образа диска ВМ для его загрузки в {var(sys4)} может выполняться разными способами. Далее описаны варианты подготовки образа:

* Утилита [OpenStack Builder](https://www.packer.io/docs/builders/openstack) в составе Packer (подробнее — в разделе {linkto(#packer_image_prepare)[text=%text]}).
* Ручная локальная подготовка образа через существующую ВМ в {var(sys3)} (подробнее — в разделе {linkto(#manual_image_prepare)[text=%text]}).
* Утилита [`diskimage-builder`](https://opendev.org/openstack/diskimage-builder) (подробнее — в разделе {linkto(#diskimage_image_prepare)[text=%text]}).

<err>

В приведенных инструкциях дополнительно описаны шаги загрузки подготовленного образа в {var(sys4)}.

</err>

## {heading(OpenStack Builder)[id=packer_image_prepare]}

<err>

Образ создается на основе уже **существующего** образа в {var(sys3)}.

</err>

### {heading(Предусловия)[id=packer_prerequisites]}

* Настроенный доступ с машины, на которой запускается Packer-клиент, до точек:

   * http/https до OpenStack API.
   * SSH до сети инстансов.

      <info>

      Рекомендуется запускать Packer-клиент с управляющего узла с поддержкой OpenStack CLI.

      </info>

* Загруженный образ целевой ОС.

Для запуска используется ряд скриптов, пример для выполнения в Ubuntu описан ниже (будет использоваться для выполнения основных шагов).

В приведенном примере устанавливается опциональный компонент Ansible. В скриптах можно указать любые инструкции в нужном порядке, задаваемом в файле конфигурации сборки `*packer.json`.

* `image-build-packer`:

   * `scripts`:

      * `ubuntu`:

         * `common.sh`.
         * `ansible.sh`.
         * `clean.sh`.

   * `ubuntu-ansible-packer.json`.

Листинг упомянутых скриптов приведен далее.

<err>

Работоспособность скриптов гарантирована для версии Packer 1.6.4.

</err>

{caption(ansible.sh)[align=left;position=above]}
```console
#!/bin/bash
set -eux

sudo apt-get update
sudo apt-get install software-properties-common --yes
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt-get install python-apt --yes
sudo apt-get install ansible --yes

cat <<EOF >/etc/ansible/hosts
localhost    ansible_connection=local

EOF

cat <<EOF >/etc/ansible/ansible.cfg
[defaults]
host_key_checking = False

EOF

exit 0
```
{/caption}

{caption(clean.sh)[align=left;position=above]}
```console
#!/bin/bash

set -x

echo "Cleaning Up..."
sudo apt autoremove --yes
sudo apt-get --yes clean

# Remove biased udev rules
rm /etc/udev/rules.d/*

sed -i '/HWADDR/d' /etc/sysconfig/network-scripts/ifcfg-eth0
rm -rf /tmp/*
rm -rf /var/log/*

# Clean up cloud-init artefacts
sudo rm -rf /var/lib/cloud/*

# Clean up injected data
sudo rm -rf /{root,home/*}/{.ssh,.bash_history} &amp;&amp; history -c

#Ensure changes are written to disk
sync
```
{/caption}

{caption(common.sh)[align=left;position=above]}
```console
#!/bin/bash
set -eux

cat <<EOF >/etc/default/locale
LANG=en_US.UTF-8
EOF

sudo apt-get update
#sudo apt-get upgrade --yes

sudo systemctl disable apt-daily.service
sudo systemctl disable apt-daily.timer
sudo systemctl disable apt-daily-upgrade.service
sudo systemctl disable apt-daily-upgrade.timer

exit 0
```
{/caption}

{caption(ubuntu-ansible-packer.json)[align=left;position=above]}
```json
{
  "variables": {
    "build_flavor": "Basic-1-1-10",
    "int_network": "114075d3-7e7e-421b-abca-52bb5f594576",
    "ext_network": "4006730b-f45a-42e1-b95d-352e5724f729",
    "source_image_name": "Ubuntu-22.04.1-test",
    "ssh_username": "ubuntu"
  },
  "builders": [
    {
    "type": "openstack",
    "flavor": "{{ user `build_flavor` }}",
    "image_name": "Custom-image",
    "source_image_name": "{{ user `source_image_name` }}",
    "image_visibility": "shared",
    "ssh_username": "{{ user `ssh_username` }}",
    "networks": ["{{ user `int_network` }}"],
    "floating_ip_network": "{{ user `ext_network` }}",
    "security_groups": ["default", "ssh+www"],
    "config_drive": true
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "script": "scripts/ubuntu/common.sh",
      "execute_command": "sudo {{.Path}}"
    },
    {
      "type": "shell",
      "script": "scripts/ubuntu/ansible.sh",
      "execute_command": "sudo {{.Path}}"
    },
    {
      "type": "shell",
      "script": "scripts/ubuntu/clean.sh",
      "execute_command": "sudo {{.Path}}"
    }
  ]
}
```
{/caption}

### {heading(Основные шаги)[id=packer_basic_steps]}

Чтобы подготовить образ с помощью `OpenStack Builder`, выполните шаги:

1. Скачайте и установите [Packer](https://www.packer.io/).
1. Создайте или скачайте openrc-файл с доступами к облаку (подробности доступны в примере файла в разделе {linkto(../../usage/interfaces_access#prerequisites_openstack_cli_config)[text=%text]}).
1. Создайте директорию со скриптами из раздела {linkto(#packer_prerequisites)[text=%text]}.
1. Заполните конфигурационный файл `ubuntu-ansible-packer.json`:

   * `build_flavor` — название или идентификатор шаблона ВМ. Его можно узнать с помощью команды:

      ```console
      $ openstack flavor list
      ```

   * `int_network` — ID внутренней сети, которая поддерживает плавающие IP-адреса.
   * `ext_network` — ID внешней сети. По умолчанию — `external`, но можно узнать с помощью команды:

      ```console
      $ openstack network list --long | grep External
      ```

   * `image_name` — название создаваемого образа.
   * `source_image_name` — название образа, на основе которого будет создан новый образ.
   * `image_visibility` — доступность создаваемого образа:

      * `public` — публичный.
      * `private` — приватный.
      * `shared` — доступный некоторым проектам.

   * `ssh_username` — имя пользователя, по которому будет возможен вход в ВМ.
   * `security_groups` — список групп безопасности для ВМ. Обязательное значение — `ssh` или `ssh+www`.
   * `provisioners` — список скриптов, которые будут запущены на ВМ.

      <err>

      Все указанные в конфигурации объекты должны быть доступны для текущего проекта/пользователя.

      </err>

1. Выполните команды на сборку:

   ```console
   $ source <OPENRC_СКРИПТ>
   $ cd image-build-packer
   $ packer build ubuntu-ansible-packer.json
   ```

1. Задайте дополнительные свойства созданному образу (который был собран с помощью Packer), выполнив команду:

   ```console
   $ openstack image set --property os_require_quiesce='True' --property hw_qemu_guest_agent='True' <НАЗВАНИЕ_ОБРАЗА>
   ```

После успешного выполнения всех шагов в {var(sys3)} появится загруженный образ. Посмотреть образ можно в Портале самообслуживания или Портале администратора на странице **Образы**.

### {heading(Перенос образа)[id=packer_image_transfer]}

Перенос образа может понадобиться, например, когда образ собирается в одном облаке, а перенести его нужно в другое. Тогда после сборки образа выполните команды (на примере образа `Custom-image.img`):

```console
$ openstack image save --file Custom-image.img Custom-image
$ scp Custom-image.img $TARGETIP:
$ ssh $TARGETIP
$ source openrc.sh
$ openstack image create --container-format bare --disk-format raw --file Custom-image.img --property os_require_quiesce='True' --property hw_qemu_guest_agent='True' \
--public Custom-image
```

## {heading(Ручная локальная подготовка образа)[id=manual_image_prepare]}

<warn>

В данной инструкции приведено создание образа на примере конфигурации Arch Linux (используется локальная ВМ).

</warn>

### {heading(Предусловия)[id=manual_image_prerequisites]}

* ВМ в минимальной конфигурации (один диск, доступ в сеть по SSH, один раздел).
* Установленный ISO образ целевой ОС.
* Доступность репозиториев из сети ВМ.

### {heading(Основные шаги)[id=manual_image_basic_steps]}

Чтобы подготовить образ вручную, выполните шаги:

1. Установите целевую ОС на ВМ.
1. Перейдите на ВМ по SSH.
1. Установите пакет `cloud-init` (подробнее — в [официальной документации](https://cloud-init.io)).
1. Включите автозапуск `cloud-init`, например, с помощью команды Linux:

   ```console
   $ systemctl enable cloud-init
   ```

   При необходимости настройте конфигурационный файл `/etc/cloud/cloud.cfg`.

1. Установите пакет `qemu-guest-agent` (подробнее — в [официальной документации](https://qemu-project.gitlab.io/qemu/interop/qemu-ga.html)).
1. Включите автозапуск `qemu-guest-agent`, например, с помощью команды Linux:

   ```console
   $ systemctl enable qemu-guest-agent
   ```

1. Выполните дополнительные настройки при необходимости (подробнее — в разделе {linkto(#manual_image_additional_steps)[text=%text]}).
1. Отключите локальную ВМ.
1. Выполните экспорт переменных для доступа к OpenStack API любым удобным способом (подробнее — в разделе {linkto(../../usage/interfaces_access#use_openstackcli)[text=%text]}).
1. Загрузите образ:

   ```console
   $ openstack image create --container-format bare --disk-format raw --file  Arch.img  --public --property hw_qemu_guest_agent='True' --property os_require_quiesce='True' Arch
   ```

После успешного выполнения шагов будет создан файл (в примере выше — `Arch.img`), загруженный в {var(sys4)}.

### {heading(Дополнительные шаги)[id=manual_image_additional_steps]}

1. Отключите все ресурсы (`datasources`) в `cloud-init`, кроме OpenStack — создайте файл `/etc/cloud/cloud.cfg.d/15_datasource.cfg`:

   ```yaml
   datasource:
    OpenStack:
     max_wait: 180
   ```

1. Выполните очистку ВМ — последовательно выполните команды (пример команд Linux):

   ```console
   $ rm /etc/udev/rules.d/*
   $ rm -rf /var/lib/cloud/*
   $ rm -rf /tmp/*
   $ find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
   $ sudo truncate -s 0 /etc/udev/rules.d/70-persistent-net.rules
   $ sed -i '/HWADDR/d' /etc/sysconfig/network-scripts/ifcfg-eth0
   $ sudo truncate -s 0 /etc/resolv.conf
   $ sudo rm -f /etc/NetworkManager/conf.d/99-cloud-init.conf
   $ rpm-ostree cleanup -b -p -r -m
   ```

## {heading(Утилита diskimage-builder)[id=diskimage_image_prepare]}

С помощью утилиты `diskimage-builder` можно собрать ограниченный набор образов; список поддерживаемых образов доступен в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html).

<warn>

В данной инструкции приведено создание образа на примере openSUSE Leap.

</warn>

### {heading(Предусловия)[id=diskimage_image_prerequisites]}

* Поддержка Python-библиотек.
* Выход в интернет.
* Установленный пакет `qemu-utils`. Его можно установить, например, с помощью команды Ubuntu:

   ```console
   $ sudo apt install qemu-utils
   ```

* Не менее 3 ГБ свободного пространства.

### {heading(Основные шаги)[id=diskimage_image_basic_steps]}

Чтобы подготовить образ с помощью утилиты `diskimage-builder`, выполните шаги:

1. Установите виртуальное окружение Python virtualenv (подробнее — в [официальной документации](https://virtualenv.pypa.io/en/latest/installation.html)).
1. Уточните версию Python с помощью команды `python --version` или аналога.
1. Создайте папку с виртуальным окружением:

   ```console
   $ virtualenv -p python<PYTHON_VERSION> venv_py<PYTHON_VERSION>;
   $ source venv_py<PYTHON_VERSION>/bin/activate
   ```

1. Установите `diskimage-builder`:

   ```console
   $ pip install git+https://opendev.org/openstack/diskimage-builder.git
   ```

1. Запустите сборку образа:

   ```console
   $ DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.img vm opensuse
   ```

1. Загрузите образ:

   ```console
   $ openstack image create --container-format bare --disk-format raw --file  opensuse-15.3.img  --public --property hw_qemu_guest_agent='True' --property os_require_quiesce='True' Opensuse
   ```

После успешного выполнения шагов будет создан файл (в примере выше — `opensuse-15.3.img`), загруженный в {var(sys4)}.

### {heading(Кастомизация)[id=diskimage_image_customization]}

С помощью `diskimage-builder` возможна донастройка целевой ОС (подробнее — в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/elements.html)).