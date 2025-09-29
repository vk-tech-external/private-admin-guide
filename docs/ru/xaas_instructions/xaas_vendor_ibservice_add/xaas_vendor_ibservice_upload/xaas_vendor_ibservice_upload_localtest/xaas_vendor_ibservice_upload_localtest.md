# {appendix-heading(Локальное тестирование манифеста Terraform)[id=xaas_vendor_ibservice_upload_localtest; position=prefix]}

Перед локальным тестированием убедитесь, что OpenStack PID внесён в список поставщиков (подробнее — в подразделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_package#xaas_vendor_ibservice_upload_prepare)[text=%text]}).

Чтобы локально протестировать манифест Terraform `plans/<PLAN_NAME>/deployment/deploy.tf`:

1. Установите Terraform локально:

   1. Скачайте Terraform с [официального зеркала VK Cloud](https://hashicorp-releases.mcs.mail.ru/terraform).
   1. Распакуйте архив и в переменной среды `Path` укажите путь к распакованному файлу.
   1. Выполните команду `terraform -help`, чтобы убедиться в успешной установке Terraform.

1. Отредактируйте файл с конфигурацией CLI для Terraform: для Windows — `terraform.rc`, для других ОС — `.terraformrc` (подробнее — [в официальной документации Terraform](https://developer.hashicorp.com/terraform/cli/config/config-file)):

   1. Чтобы Terraform одновременно работал с зеркалами и локальными провайдерами, добавьте следующую информацию:

      ```console
      provider_installation {
          filesystem_mirror {
              # Полный путь до директории plugins
              path    = "/home/user_name/.terraform.d/plugins"
              include = ["vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }

          network_mirror {
              url = "https://terraform-mirror.mcs.mail.ru"
              include = ["registry.terraform.io/*/*"]
          }

          direct {
              exclude = ["registry.terraform.io/*/*", "vk-cs.local/*/*", "ivk-cs.local/*/*"]
          }
      }
      ```
     
   1. Если не требуется, чтобы Terraform одновременно работал с зеркалами и локальными провайдерами, очистите файл.
   1. Если на локальном компьютере такого файла нет, пропустите шаг.

1. Скачайте плагин провайдера VK CS c [GitHub](https://github.com/vk-cs/terraform-provider-vkcs/releases).
1. Обратитесь к администратору {var(sys2)}, чтобы получить плагин провайдера iVK CS. Сообщите ОС компьютера, на котором будете локально тестировать манифест, и её архитектуру (например, Linux на архитектуре amd64).
1. Если файла с конфигурацией CLI для Terraform нет на локальном компьютере или он был очищен, скачайте плагин провайдера null c [официального сайта Terraform](https://hashicorp-releases.mcs.mail.ru/terraform-provider-null/).

   <info>

   Если в файле с конфигурацией CLI для Terraform настроена одновременная работа с зеркалами и локальными провайдерами, Terraform скачает плагин провайдера null автоматически.

   </info>
   
1. В директории `terraform.d` создайте директорию `plugins`. Директория `terraform.d` создаётся на компьютере автоматически после установки Terraform, её путь зависит от ОС (подробнее — [в официальной документации Terraform](https://developer.hashicorp.com/terraform/cli/config/config-file#implied-local-mirror-directories)).
1. В директории `plugins` создайте следующую структуру директорий:

   * `ivk-cs.local`.

      * `ivk-cs`.

         * `ivkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.


   * `registry.terraform.io`.

      * `hashicorp`.

         * `null`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.


   * `vk-cs.local`.

      * `vk-cs`.

         * `vkcs`.

            * `<PROVIDER_VERSION>`.

               * `<OPERATING_SYSTEM>`.



   где:

   * `<PROVIDER_VERSION>` — версия плагина провайдера. Значение определяется из имени файла плагина. Например, для плагина `terraform-provider-vkcs_0.4.2` версия равна `0.4.2`, для плагина `terraform-provider-null_v3.2.1_x5` — `3.2.1`.
   * `<OPERATING_SYSTEM>` — ОС компьютера. Чтобы определить значение, выполните команду `terraform --version`. В выводе команды отображается текущая версия Terraform и ОС с архитектурой.

      {caption(Пример ответа)[align=left;position=above]}
      ```console
      Terraform v1.5.4
      on linux_amd64
      ```
      {/caption}

      В приведённом выше примере значение `<OPERATING_SYSTEM>` равно `linux_amd64`.

1. Поместите плагины скачанных провайдеров в соответствующие директории `<OPERATING_SYSTEM>`.

   {caption(Пример структуры директории /home/user_name/.terraform.d/plugins для ОС Linux на архитектуре amd64)[align=left;position=above]}
   ```console
   /home/user_name/.terraform.d
   │
   └── plugins
       ├── ivk-cs.local
       │   └── ivk-cs
       │       └── ivkcs
       │           └── 0.0.4
       │               └── linux_amd64
       │                   └── terraform-provider-ivkcs_0.0.4
       ├── registry.terraform.io
       │   └── hashicorp
       │       └── null
       │           └── 3.2.1
       │               └── linux_amd64
       │                   └── terraform-provider-null_v3.2.1
       └── vk-cs.local
           └── vk-cs
               └── vkcs
                   └── 0.4.2
                       └── linux_amd64
                           └── terraform-provider-vkcs_0.4.2
   ```
   {/caption}

1. Создайте рабочую директорию для тестирования манифеста.
1. В рабочей директории создайте файл `auth.tf`.
1. В файле `auth.tf` опишите используемые провайдеры.

   1. Укажите провайдеры VK CS и iVK CS. Если файла с конфигурацией CLI для Terraform нет на локальном компьютере или он был очищен, дополнительно укажите провайдер null.

      ```console
      terraform {
          required_providers {
              vkcs = {
                  # Путь локального плагина провайдера. Указывается часть пути после terraform.d/plugins
                  source  = "vk-cs.local/vk-cs/vkcs"
                  # Версия провайдера
                  version = "0.2.2"
              }
              ivkcs = {
                  source  = "ivk-cs.local/ivk-cs/ivkcs"
                  version = "0.1.15"
              }
              null = {
                  source  = "registry.terraform.io/hashicorp/null"
                  version = "3.2.1"
              }
          }
      }
      ```
      
   1. Для провайдеров VK CS и iVK CS укажите информацию об аккаунте и проекте {var(sys2)}, из-под которых будете тестировать манифест:

      ```console
      provider "vkcs" {
          # User Domain ID
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "PROJECT_ID"
          # Region Name
          region = "RegionOne"
      }

      provider "ivkcs" {
          # URL компонента Keystone Платформы
          auth_url = "https://mcs.mail.ru/infra/identity/v3/"
          user_domain_name = "users"
          username = "USER_NAME"
          password = "PASSWORD"
          project_id = "OPENSTACK_PROJECT_ID"
          region = "RegionOne"
          # URL сервиса Infra API
          infra_url = "https://mcs.mail.ru/marketplace/api/infra-api/api/v1/"
      }
      ```

      Информация об аккаунте и проекте отображается в Портале самообслуживания.

1. Скопируйте файл `plans/<PLAN_NAME>/deployment/deploy.tf` в рабочую директорию.
1. Если для локального тестирования требуется создать дополнительные сущности, которые не описаны в манифесте `deploy.tf` (например, ВМ с внешним IP), в рабочей директории создайте файл `extended.tf`.
1. В файле `extended.tf` опишите дополнительные сущности с использованием ресурсов и источников данных провайдеров.
1. В рабочей директории выполните команду `terraform init`, чтобы инициализировать провайдеры.
1. В рабочей директории выполните команду `terraform apply`, чтобы запустить создание ресурсов, описанных в файлах `deploy.tf` и `extended.tf`.
1. Введите `yes`, чтобы подтвердить создание ресурсов.
1. После завершения выполнения манифестов зайдите в Портал самообслуживания и убедитесь, что ресурсы созданы.
