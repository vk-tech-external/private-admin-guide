# {heading(Подготовка образа диска ВМ для загрузки в {var(sys4)})[id=images_preparation]}

## {heading(Создание образа ВМ с ОС Windows)[id=images_preparation_windows]}

<info>

В {var(sys3)} поддерживается миграция ОС Windows серверных версий:

* Windows Server 2008 / 2008 R2.
* Windows Server 2012 / 2012 R2.
* Windows Server 2016.
* Windows Server 2019.
* Windows Server 2022.

</info>

В качестве примера использован образ Windows Server 2016 редакции CORE, команды приведены на языке PowerShell.

### {heading(Подготовительные шаги)[id=images_preparation_windows_prep]}

1. Убедитесь, что у вас [установлен и настроен](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) Git.
1. Клонируйте репозиторий со скриптами автоматизированной сборки [windows-imaging-tools](https://github.com/cloudbase/windows-imaging-tools).
1. Клонируйте репозиторий для обновления образа системы [WindowsUpdateCLI](https://github.com/cloudbase/WindowsUpdateCLI/).
1. Настройте инструментарий:

   * [Скачайте драйвера](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.225-1/virtio-win.iso) VirtIO (KVM).
   * Настройте Hyper-V подходящим способом ([пример](https://learn.microsoft.com/ru-ru/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)), если этого не было сделано ранее.
   * [Скачайте и установите](https://learn.microsoft.com/ru-ru/windows-hardware/get-started/adk-install) Windows ADK.

1. Скачайте ISO-образ операционной системы, для которого планируется миграция в {var(sys4)}. Рекомендуется использовать en-US версию образа.
1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../usage/interfaces_access#prerequisites_openstack_cli_config)[text=%text]}).

### {heading(Основные шаги)[id=images_preparation_windows_main]}

1. Подготовьте установочный WIM-файл ОС.

   <info>

   Установочный образ может содержать в себе несколько редакций операционной системы. Так как установка проходит в автоматическом режиме, заранее выберите нужную редакцию и экспортируйте ее в отдельный wim-файл.

   </info>

   1. Подключите скачанный ISO-образ ОС.
   1. Выведите список всех версий Windows с помощью выполненной от имени администратора команды:

      ```powershell
      Get-WindowsImage -ImagePath E:\sources\Install.wim
      ```

      Здесь `E:\sources\Install.wim` — полный путь к WIM-файлу системы на смонтированном диске.

      Появится список редакций с указанием `ImageIndex` ее номера:

      ```console
      ImageIndex      : 1
      ImageName       : Windows Server 2016 Standard
      ImageDescription: Это рекомендуемый вариант. Он сокращает управление и обслуживание за счет установки только того, что требуется для большинства приложений и ролей сервера. Он не включает графический интерфейс пользователя, однако вы можете полностью управлять сервером локально или удаленно с помощью Windows PowerShell или других средств. См. раздел "Варианты установки Windows Server".
      ImageSize       : 9 146 079 566 bytes

      ImageIndex      : 2
      ImageName       : Windows Server 2016 Standard (возможности рабочего стола)
      ImageDescription: Этот вариант подходит, если нужен графический пользовательский интерфейс (например, для обеспечения обратной совместимости приложения, которое не может работать при установке основных серверных компонентов). Поддерживаются все роли и компоненты сервера. Подробнее: "Варианты установки Windows Server".
      ImageSize       : 15 219 002 744 bytes
      ```
      
   1. Экспортируйте редакцию с `ImageIndex` = `1`:

      ```powershell
      dism `
      /export-image `
      /SourceImageFile:E:\sources\Install.wim `
      /SourceIndex:1 `
      /DestinationImageFile:D:\Temp\install.wim `
      /Compress:max `
      /CheckIntegrity
      ```

      Здесь:

      * `D:\Temp\install.wim` — полный путь на локальном диске, где будет сохранен экспортируемый образ.
      * `SourceIndex:1` — номер индекса необходимой редакции.

1. [Создайте](https://learn.microsoft.com/ru-ru/windows-server/virtualization/hyper-v/get-started/create-a-virtual-switch-for-hyper-v-virtual-machines?tabs=hyper-v-manager#create-a-virtual-switch) виртуальный коммутатор `external` с подключением в интернет.
1. Соберите образ локально:

   1. Перейдите в директорию `windows-imaging-tools` и импортируйте модули:

      ```powershell
      Import-Module .\WinImageBuilder.psm1
      Import-Module .\Config.psm1
      Import-Module .\UnattendResources\ini.psm1
      ```
      
   1. Перенесите содержимое директории `WindowsUpdateCLI` в `windows-imaging-tools\UnattendResources\WindowsUpdates`.
   1. Создайте конфигурационный файл `config.ini`:

      ```powershell
      $ConfigFilePath = ".\config.ini"
      New-WindowsImageConfig -ConfigFilePath $ConfigFilePath
      ```
      
   1. Откройте созданный файл и проверьте параметры:

      ```ini
      wim_file_path=D:\Temp\install.wim
      image_name=Windows Server 2016 SERVERSTANDARDCORE
      image_path=D:\Win_Server_2016_img.qcow2
      virtual_disk_format=QCOW2
      image_path=D:\Win_Server_2016_img.raw
      virtual_disk_format=RAW
      image_type=KVM
      external_switch=external
      virtio_iso_path="D:\Drivers\virtio.iso"
      time_zone="Russian Standard Time"
      install_qemu_ga=True
      install_updates=True
      purge_updates=False
      compress_qcow2=True
      ```

      Здесь:

      * `external_switch=external` — имя созданного коммутатора.
      * `virtio_iso_path="D:\Drivers\virtio.iso"` — полный путь к ISO-файлу с драйверами VirtIO.
      * `time_zone="Russian Standard Time"` — временная зона, можно узнать с помощью команды `tzutil /l`.
      * `purge_updates=False` — не очищать директорию `WinSXS` после установки обновлений.

   1. Запустите локальную сборку образа:

      ```powershell
      New-WindowsOnlineImage -ConfigFilePath $ConfigFilePath
      ```
      
   1. Дождитесь завершения выполнения операции и убедитесь, что файл `D:\Win_Server_2016_img.raw` создан.

1. Импортируйте образ в {var(sys4)}:

   ```console
   # openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file D:\Win_Server_2016_img.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs:lic:mswinsrv=true \
       --property mcs_name='Windows Server 2016 Standard (en)' \
       --property os_admin_user='Admin' \
       --property os_type=windows \
       <IMAGE_NAME>
   ```

   Здесь аргументы вида `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` используются для присвоения образу метатегов.

   Дождитесь завершения операции. После загрузки образа появится возможность создавать ВМ стандартными средствами {var(sys2)}.
1. Если импортированный образ больше не нужен, удалите его.

## {heading(Создание образа с помощью локальной ВМ)[id=images_preparation_local]}

Образ облачной ВМ можно создать с помощью локальной виртуальной машины. В качестве примера приведено создание и настройка образа ВМ с ОС Arch Linux.

### {heading(Подготовительные шаги)[id=images_preparation_local_prep]}

1. Создайте на локальном компьютере виртуальную машину в минимальной конфигурации с одним диском без дополнительных логических разделов.
1. Подключите ВМ к сети с доступом в интернет.
1. Настройте подключение к ВМ по SSH.

### {heading(Основные шаги)[id=images_preparation_local_main]}

1. Установите целевую ОС:

   1. Установите на локальную ВМ целевую ОС (подробнее — в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Installation_guide_(Русский))).
   1. Подключитесь к ВМ по SSH.

1. Установите ПО для облачной виртуализации:

   1. Установите и настройте ПО для облачной инициализации виртуальной машины:

      1. Установите на ВМ пакет `cloud-init` (подробнее — в [официальной документации Arch Linux](https://wiki.archlinux.org/title/Cloud-init)).
      1. Включите автозапуск `cloud-init`:

         ```console
         # systemctl enable cloud-init
         ```
      1. (Опционально) Отредактируйте настройки в конфигурационном файле `/etc/cloud/cloud.cfg`.

   1. Установите и настройте [гостевой агент QEMU](https://qemu-project.gitlab.io/qemu/about/index.html):

      1. Установите пакет `qemu-guest-agent`:

         ```console
         # apt-get install qemu-guest-agent
         ```
         
      1. Включите автозапуск `qemu-guest-agent`:

         ```console
         # systemctl enable qemu-guest-agent
         ```

1. (Опционально) Выполните дополнительные настройки локальной ВМ:

   1. Отключите в `cloud-init` все ресурсы, кроме OpenStack. Для этого создайте конфигурационный файл `/etc/cloud/cloud.cfg.d/15_datasource.cfg` с содержимым:

      ```txt
      datasource:
       OpenStack:
        max_wait: 180
      ```
      
   1. Очистите ВМ от ненужных артефактов, последовательно выполнив команды:

      ```console
      rm /etc/udev/rules.d/*
      rm -rf /var/lib/cloud/*
      rm -rf /tmp/*
      find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
      sudo truncate -s 0 /etc/udev/rules.d/70-persistent-net.rules
      sed -i '/HWADDR/d' /etc/sysconfig/network-scripts/ifcfg-eth0
      sudo truncate -s 0 /etc/resolv.conf
      sudo rm -f /etc/NetworkManager/conf.d/99-cloud-init.conf
      rpm-ostree cleanup -b -p -r -m
      ```

1. Импортируйте образ диска локальной ВМ в {var(sys4)}:

   1. Создайте копию жесткого диска локальной ВМ:

      ```console
      dd if=/dev/sda of=~/Arch.raw bs=64K conv=noerror,sync status=progress
      ```

      Будет создан файл `Arch.raw` с образом ВМ в формате RAW.
   1. Установите на локальную ВМ клиент OpenStack (подробнее — в разделе {linkto(../../usage/interfaces_access#prerequisites_openstack_cli_config)[text=%text]}).
   1. Загрузите образ `Arch.raw` в {var(sys4)} под именем `Arch`:

      ```console
      $ openstack image create \
          --progress \
          --private \
          --container-format bare \
          --disk-format raw \
          --file ~/Arch.raw \
          --property store=s3 \
          --property hw_qemu_guest_agent=True \
          --property os_require_quiesce=yes \
          --property mcs_name='Arch' \
          Arch
      ```

      Здесь аргументы вида `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` используются для присвоения образу метатегов.

1. Проверьте успешность загрузки образа:

   1. Выполните вход в Портал самообслуживания с учетными данными пользователя {var(sys2)}.
   1. Перейдите в раздел **Облачные вычисления** → **Образы**.
   1. Убедитесь, что в списке есть образ с именем `Arch`.

1. Если загруженный образ больше не нужен, удалите его.

## {heading(Создание образа с помощью Packer)[id=images_preparation_packer]}

Packer позволяет сконструировать новый образ ВМ на основе базового образа с желаемой гостевой ОС и любого из предустановленных в {var(sys3)} шаблонов конфигурации. Параметры нового образа задаются при помощи конфигурационного файла Packer. В качестве примера будут использованы:

* Образ ОС Alt Linux P9 в формате QCOW2.
* Шаблон конфигурации `STD3-2-6`.

### {heading(Подготовительные шаги)[id=images_preparation_packer_prep]}

1. [Установите](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli) последнюю версию Packer.

   <info>

   Вы можете скачать Packer с [зеркала](https://hashicorp-releases.mcs.mail.ru/packer/) VK Cloud.

   </info>
1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../usage/interfaces_access#prerequisites_openstack_cli_config)[text=%text]}).
1. [Загрузите образ](http://ftp.altlinux.org/pub/distributions/ALTLinux/p9/images/cloud/x86_64/) ОС Alt Linux P9 локально (файл `alt-p9-cloud-x86_64.qcow2`).

### {heading(Основные шаги)[id=images_preparation_packer_main]}

1. Конвертируйте образ в формат RAW:

   1. Установите `qemu-img`, если это не сделано ранее:

      {caption(RHLE/Centos)[align=left;position=above]}
      ```console
      $ sudo yum install qemu-img
      ```
      {/caption}

      {caption(Ubuntu)[align=left;position=above]}
      ```console
      $ sudo apt install qemu-utils
      ```
      {/caption}
   
   1. Запустите конвертацию файла:

      ```console
      qemu-img convert -f qcow2 -O raw alt-p9-cloud-x86_64.qcow2 alt-p9-cloud-x86_64.raw
      ```

      Синтаксис команды конвертации приведен в [официальной документации QEMU](https://www.qemu.org/docs/master/tools/qemu-img.html).

1. Загрузите базовый образ в {var(sys4)}.
1. Создайте конфигурационный Packer-файл:

   1. Определите реквизиты сети и загруженного образа:

      1. Получите идентификатор внешней сети, к которой будет подключена создаваемая виртуальная машина.
      1. Скопируйте название загруженного образа, получив список образов с помощью команды `openstack image list`.
      1. Запишите полученные значения в переменные:

         ```console
         export SOURCE_IMAGE=8b64c09b-7141-41ad-XXXX-9f5a8dbbd87e
         export NETWORK_ID=f19e1e54-bce9-4c25-XXXX-e0f40e2cff14
         ```

   1. Выберите желаемый шаблон конфигурации для нового образа ВМ. В примере — `STD3-2-6`.
   1. Создайте файл `altlinux.pkr.hcl`. Укажите имя выбранного шаблона конфигурации в параметре `flavor`.

      {caption(altlinux.pkr.hcl)[align=left;position=above]}
      ```hcl
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

      source "openstack" "altlinux" {
        flavor       = "STD3-2-6"
        image_name   = "Alt-Linux-P9-Starter-Kit"
        source_image = "${var.source_image}"
        config_drive            = "true"
        networks = ["${var.network_id}"]
        security_groups = ["default-sprut", "ssh"]
        ssh_username = "altlinux"
        use_blockstorage_volume = "true"
        volume_availability_zone = "MS1"
      }

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
      }
      ```
      {/caption}

      <info>

      При создании ВМ укажите зону доступности, в которой должен быть создан диск. Подробная информация о синтаксисе конфигурационного файла в [официальной документации Packer](https://developer.hashicorp.com/packer/docs/templates/hcl_templates).

      </info>
   1. Проверьте созданную конфигурацию:

      ```console
      $ packer validate altlinux.pkr.hcl
      ```

1. Загрузите подготовленный образ в {var(sys4)}:

   1. Запустите создание образа:

      ```console
      $ packer build altlinux.pkr.hcl
      ```
      
   1. Дождитесь появления сообщения об успешной загрузке:

      ```console
      ==> Builds finished. The artifacts of successful builds are:
      -> openstack.altlinux: An image was created: c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      
   1. Запишите полученный идентификатор `c6320138-035f-40d8-XXXX-e814edb2ce5f` — он понадобится на следующем шаге.

1. Завершите настройку образа:

   1. Установите метатеги созданному образу:

      ```console
      $ openstack image set \
          --property hw_qemu_guest_agent=True \
          --property os_require_quiesce=yes \
          --property mcs_name='Alt Linux P9 Starter Kit' \
          c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      
   1. Убедитесь, что образ корректно отображается.

      {caption(OpenStack CLI)[align=left;position=above]}
      ```console
      $ openstack image show c6320138-035f-40d8-XXXX-e814edb2ce5f
      ```
      {/caption}

      Будет выведена информация об образе.
   
      Портал самообслуживания
   
      1. Выполните вход в Портал самообслуживания с учетными данными пользователя {var(sys2)}.
      1. Перейдите в раздел **Облачные вычисления** → **Образы**.
      1. Нажмите на имя образа. Откроется страница образа.

         Образ также станет доступен при создании ВМ.

1. Если образ больше не нужен, удалите его.

## {heading(Создание образа с помощью diskimage-builder)[id=images_preparation_diskimage_builder]}

<info>

Список поддерживаемых образов приведен в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/supported_distros.html) утилиты `diskimage-builder`.

</info>

В качестве примера рассматривается создание и настройка образа ВМ с ОС OpenSuse Leap. Все действия выполняются на локальном компьютере с ОС Ubuntu.

### {heading(Подготовительные шаги)[id=images_preparation_diskimage_builder_prep]}

1. Освободите на вашем компьютере не менее 3 ГБ дискового пространства.
1. Подключите компьютер к сети с доступом в интернет.

### {heading(Основные шаги)[id=images_preparation_diskimage_builder_main]}

1. Установите необходимое ПО:

   1. Настройте поддержку Python-библиотек:

      ```console
      $ sudo apt update
      $ sudo apt -y install python-pip curl
      ```
      
   1. Установите пакет `qemu-utils`, который предоставляет утилиты [QEMU](https://www.qemu.org/):

      ```console
      $ sudo apt install qemu-utils
      ```
      
   1. Установите приложение `virtualenv` для создания виртуального окружения Python (подробнее — в [официальной документации](https://virtualenv.pypa.io/en/latest/installation.html)).
   1. Узнайте версию Python, установленную на вашем компьютере:

      ```console
      $ python –version
      ```
      
   1. Создайте и активируйте виртуальное окружение Python, последовательно выполнив команды:

      ```console
      $ virtualenv -p python<PYTHON_VERSION> venv_py<PYTHON_VERSION>
      $ source venv_py<PYTHON_VERSION>/bin/activate
      ```
      
   1. Установите утилиту `diskimage-builder`:

      ```console
      $ pip install git+https://opendev.org/openstack/diskimage-builder.git
      ```

1. Соберите образ ВМ с ОС OpenSuse Leap:

   ```console
   $ DIB_RELEASE=15.3 disk-image-create -t raw -o opensuse-15.3.raw vm opensuse
   ```

   Будет создан файл `opensuse-15.3.raw` с образом ВМ в формате RAW.

   <info>

   Чтобы собрать образ ВМ с желаемыми свойствами, используйте дополнительные аргументы команды `disk-image-create` (подробнее — в [официальной документации](https://docs.openstack.org/diskimage-builder/latest/user_guide/building_an_image.html)).

   </info>
1. Загрузите образ в {var(sys4)}.

   Загрузите образ `opensuse-15.3.raw` в {var(sys4)} под именем `Opensuse`:

   ```console
   $ openstack image create \
       --progress \
       --private \
       --container-format bare \
       --disk-format raw \
       --file opensuse-15.3.raw \
       --property store=s3 \
       --property hw_qemu_guest_agent=True \
       --property os_require_quiesce=yes \
       --property mcs_name='Opensuse' \
       Opensuse
   ```

   Здесь аргументы вида `--property <КЛЮЧ>=<ЗНАЧЕНИЕ>` используются для присвоения образу метатегов.
1. Проверьте успешность загрузки образа

   1. Выполните вход в Портал самообслуживания с учетными данными пользователя {var(sys2)}.
   1. Перейдите в раздел **Облачные вычисления** → **Образы**.
   1. Убедитесь, что в списке есть образ с именем `Opensuse`.

1. Если загруженный образ больше не нужен, удалите его.
