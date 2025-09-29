# {appendix-heading(Создание с помощью Packer)[id=xaas_vendor_ibimage_create_packer; position=prefix]}

Чтобы создать образ сервиса с помощью Packer:

1. Установите Packer:

   1. Скачайте Packer с [официального зеркала VK Cloud](https://hashicorp-releases.mcs.mail.ru/packer/).
   1. Распакуйте архив и в переменной среды `Path` укажите путь к распакованному файлу.
   1. Выполните команду `packer`, чтобы убедиться в успешной установке Packer.

   Подробная инструкция приведена в [официальной документации Packer](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli).

1. Установите OpenStack CLI (подробнее — в **Руководстве пользователя {var(system)}** в разделе **OpenStack CLI** ).
1. Скачайте базовый образ ОС, поддерживающий работу с облачными платформами.

   <warn>

   ОС должна удовлетворять {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibimage_create/xaas_vendor_ibimage_requirements#xaas_vendor_ibimage_requirements)[text=требованиям к образу]}.

   </warn>

   <info>

   На [официальном сайте OpenStack](https://docs.openstack.org/image-guide/obtain-images.html) размещены ссылки на образы некоторых ОС, поддерживающие работу с облачными платформами.

   </info>
   
1. Конвертируйте базовый образ в формат `RAW`:

   1. Установите утилиту [qemu-img](https://www.qemu.org/docs/master/tools/qemu-img.html) на локальный компьютер.

      {caption(Пример установки qemu-img для образов на базе Red Hat Enterprise Linux (CentOS, AlmaLinux, Rocky Linux))[align=left;position=above]}
      ```console
      $ sudo yum install qemu-img
      ```
      {/caption}

      {caption(Пример установки qemu-img для образов на базе Debian (Ubuntu))[align=left;position=above]}
      ```console
      $ sudo apt install qemu-utils
      ```
      {/caption}
   
   1. Выполните команду:

      ```console
      $ qemu-img convert -f qcow2 -O raw <INITIAL_IMAGE_NAME> <IMAGE_NAME>
      ```

      Здесь:

      * `<INITIAL_IMAGE_NAME>` — имя исходного базового образа. Например, `alt-p9-cloud-x86_64.qcow2`.
      * `<IMAGE_NAME>` — имя базового образа в формате `RAW`. Например, `alt-p9-cloud-x86_64.raw`.

1. Загрузите базовый образ в формате `RAW` в {var(sys4)}:

   ```console
   openstack image create --private --container-format bare --disk-format raw --property store=s3 --file <IMAGE_PATH> <IMAGE_NAME>
   ```

   Здесь:

   * `<IMAGE_PATH>` — путь к базовому образу.
   * `<IMAGE_NAME>` — имя базового образа в формате `RAW`.

      ID созданного образа будет отображаться в Портале самообслуживания.

   Подробная инструкция приведена в **Руководстве пользователя {var(system)}** в разделе **Образы**.

1. Сконфигурируйте файл Packer:

   1. В переменные окружения запишите ID сети и ID базового образа:

      ```console
      $ export NETWORK_ID=<NETWORK_ID>
      $ export SOURCE_IMAGE=<IMAGE_ID>
      ```

      Здесь:

      * `<NETWORK_ID>` — ID сети. Значение отображается в Портале самообслуживания на странице со списком сетей.
      * `<IMAGE_ID>` — ID базового образа. Значение отображается в Портале самообслуживания на странице со списком образов.

   1. Создайте файл `<FILE_NAME>.pkr.hcl`. Например, `altlinux.pkr.hcl`.
   1. В файле опишите конфигурацию ВМ, на базе которой будет создан образ сервиса (синтаксис — на [официальном сайте Packer](https://developer.hashicorp.com/packer/docs/templates/hcl_templates)).

      {caption(Пример конфигурации ВМ с ОС Альт Рабочая станция 9 и разворачиванием image-based приложения из плейбука Ansible)[align=left;position=above]}
      ```console
      # ID сети
      variable "network_id" {
        type = string
        default = "${env("NETWORK_ID")}"
        validation {
          condition     = length(var.network_id) > 0
          error_message = <<EOF
      The NETWORK_ID environment variable must be set.
      EOF
        }
      }

      # ID базового образа
      variable "source_image" {
        type = string
        default = "${env("SOURCE_IMAGE")}"
        validation {
          condition     = length(var.source_image) > 0
          error_message = <<EOF
      The SOURCE_IMAGE environment variable must be set.
      EOF
        }
      }

      # Создание ВМ из базового образа
      source "openstack" "altlinux" {
        flavor       = "Standard-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default", "ssh"]
        ssh_username = "altlinux"
        use_blockstorage_volume = "true"
        volume_availability_zone = "MS1"
      }

      # Настройка ВМ
      build {
        sources = ["source.openstack.altlinux"]
        provisioner "shell" {
          execute_command = "sudo {{ .Path }}"
          inline = [
            "apt-get update",
            "apt-get install -y irqbalance bash-completion bind-utils qemu-guest-agent cloud-utils-growpart",
            "systemctl enable qemu-guest-agent"
            ]
        }
          provisioner "ansible" {
          playbook_file = "provision.yml"
          user          = "altlinux"
          sftp_command  = "/usr/libexec/openssh/sftp-server -e"
          use_proxy     = false
        }
      }
      ```
      {/caption}

      Имя пользователя ОС зависит от ОС. Список имён приведён в **Руководстве пользователя {var(system)}** в разделе **Подключение к ВМ**.

      Имя группы безопасности по умолчанию зависит от типа SDN:

      * `default` — в проекте на базе OpenStack Neutron.
      * `default-sprut` — в проекте на базе Sprut.

         <info>

         Чтобы посмотреть доступные группы безопасности, выполните команду:

         ```console
         # openstack security group list
         ```

         </info>

   1. Проверьте созданную конфигурацию:

      ```console
      $ packer validate <FILE_NAME>.pkr.hcl
      ```

      Здесь `<FILE_NAME>.pkr.hcl` — имя packer-файла.

1. Создайте образ сервиса в {var(sys6)}:

   1. Запустите создание образа сервиса:

      ```console
      $ packer build <PACKER_FILE>
      ```

      Здесь `<PACKER_FILE>` — имя packer-файла.
   
   1. Дождитесь появления сообщения об успешном создании. В сообщении будет указан ID образа сервиса.

      {caption(Пример сообщения об успешном создании образа сервиса)[align=left;position=above]}
      ```console
      ==> Builds finished. The artifacts of successful builds are:
      --> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      {/caption}

      Здесь `c6320138-035f-40d8-XXXX-e814edb2ce5f` — ID образа сервиса.
   
   1. Убедитесь, что образ сервиса отображается в Портале самообслуживания.

