# {appendix-heading(Создание через Портал самообслуживания)[id=xaas_vendor_ibimage_create_cloud; position=prefix]}

Чтобы создать образ сервиса через Портал самообслуживания:

1. Войдите в Портал самообслуживания.
1. Создайте ВМ:

   1. Перейдите в раздел **Облачные вычисления** → **Экземпляры ВМ**.
   1. Нажмите кнопку **Добавить**.
   1. Задайте параметры ВМ.

      <warn>

      ОС должна удовлетворять {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibimage_create/xaas_vendor_ibimage_requirements#xaas_vendor_ibimage_requirements)[text=требованиям к образу]}.

      </warn>
      
   1. Подтвердите создание ВМ.

1. Установите ПО на ВМ:

   1. Перейдите на страницу созданной ВМ.
   1. Назначьте внешний IP-адрес с помощью кнопки **Назначить внешний IP**.
   1. Подключитесь к ВМ по SSH:

      ```console
      $ ssh -i <KEY_PATH> <USER_NAME>@<FLOATING_IP>
      ```

      Здесь:

      * `<KEY_PATH>` — путь к файлу с закрытым ключом доступа к ВМ.
      * `<USER_NAME>` — имя пользователя ОС. Укажите имя в зависимости от ОС. Список имен приведено в документе **Руководство пользователя {var(system)}** в разделе **Облачные вычисления** → **Виртуальные машины** → **Подключение к ВМ** → **Имена пользователей ОС на ВМ**.
      * `<FLOATING_IP>` — внешний IP-адрес ВМ.

   1. Если на ВМ не установлены программные пакеты, указанные в {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibimage_create/xaas_vendor_ibimage_requirements#xaas_vendor_ibimage_requirements)[text=требованиях к образу сервиса]}, установите их.

      {caption(Пример команды, чтобы установить curl на ОС Ubuntu)[align=left;position=above]}
      ```console
      $ sudo apt install curl
      ```
      {/caption}
   
   1. Установите ПО image-based приложения на ВМ.

1. Очистите ВМ от чувствительных данных:

   * Для ОС Red Hat Enterprise Linux (CentOS, AlmaLinux, Rocky Linux):

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed
      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*
      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*
      # Очистить системные файлы
      $ sudo truncate -s 0 /etc/machine-id /etc/resolv.conf /var/log/audit/audit.log /var/log/wtmp \
      /var/log/lastlog /var/log/btmp /var/log/cron /var/log/maillog /var/log/messages /var/log/secure \
      /var/log/spooler
      # Удалить системные файлы
      $ sudo rm -rf /etc/hostname /etc/machine-info /var/lib/systemd/credential.secret /var/lib/cloud /var/log/tuned \
      /var/log/qemu-ga /var/log/anaconda /var/lib/systemd/random-seed
      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file
      # Очистить историю команд
      $ history -c
      # Синхронизировать файловую систему
      $ sudo sync
      ```
   
   * Для ОС Debian (Ubuntu):

      ```console
      # Очистить логи cloud-init
      $ sudo cloud-init clean --log --seed
      # Очистить ssh-ключи
      $ sudo rm -f /etc/ssh/*host*key*
      # Очистить логи
      $ sudo find /var/log -maxdepth 5 -type f -exec rm -fv {} \;
      # Удалить tmp-файлы
      $ sudo rm -rf /tmp/* /var/tmp/*
      # Очистить файл machine-id
      $ sudo truncate -s 0 /etc/machine-id /var/lib/dbus/machine-id
      # Инициализировать диск, заполнить нулями
      $ sudo dd if=/dev/zero of=/zeroed_file bs=1M oflag=direct || sudo rm -f /zeroed_file
      # Очистить кеш пакетного менеджера
      $ sudo apt-get -y autoremove --purge
      $ sudo apt-get -y clean
      $ sudo apt-get -y autoclean
      # Очистить историю команд
      $ history -c
      # Синхронизировать файловую систему
      $ sudo sync
      ```

   <err>

   Перед публикацией сервиса в Marketplace образ будет опубликован на {var(sys3)} (подробнее — в разделе {linkto(../../../../xaas_instructions/xaas_vendor_ibservice_add/xaas_vendor_ibservice_upload/xaas_vendor_ibservice_upload_publish_image#xaas_vendor_ibservice_upload_publish_image)[text=%text]}). На основе публичного образа будут развертываться инстансы сервиса у пользователей {var(sys2)}. Данные образа будут общедоступными.

   </err>
   
1. Остановите ВМ:

   ```console
   $ sudo /sbin/shutdown -hP now
   ```
   
1. Создайте образ сервиса на основе диска ВМ:

   1. Перейдите в раздел **Облачные вычисления** → **Образы**.
   1. Нажмите кнопку **Создать образ**.
   1. В открывшемся окне выберите источник **Диск**.
   1. Выберите диск созданной и настроенной ВМ.

      Имя диска ВМ отображается на ее странице на вкладке **Диски**.
   1. Укажите имя образа.
   1. Подтвердите создание образа. ID созданного образа сервиса будет отображаться в строке этого образа.

