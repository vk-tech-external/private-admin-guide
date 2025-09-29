# {heading(Миграция ВМ)[id=iaas_vm_migration]}

## {heading(Миграция ВМ из VMware в {var(system)})[id=iaas_vm_migration_from_vmware]}

<info>

Миграция ВМ на базе ОС семейства Windows и Linux выполняется по-разному.

</info>

Подробные инструкции приведены в **Руководстве пользователя {var(system)}**.

## {heading(Миграция ВМ из {var(system)} в VMware)[id=iaas_vm_migration_in_vmware]}

Для миграции ВМ из {var(sys2)} в VMware выполните шаги:

1. {linkto(#vm_migration_step_1)[text=%text]}.
1. {linkto(#vm_migration_step_2)[text=%text]}.
1. {linkto(#vm_migration_step_3)[text=%text]}.
1. {linkto(#vm_migration_step_4)[text=%text]}.
1. {linkto(#vm_migration_step_5)[text=%text]}.
1. {linkto(#vm_migration_step_6)[text=%text]}.
1. {linkto(#vm_migration_step_7)[text=%text]}.
1. {linkto(#vm_migration_step_8)[text=%text]}.
1. {linkto(#vm_migration_step_9)[text=%text]}.

### {heading(Шаг 1. Остановите ВМ)[id=vm_migration_step_1]}

Чтобы остановить ВМ, которую необходимо мигрировать, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).

{ifndef(cer)}
* OpenStack CLI (подробнее — в разделе {linkto(../../../usage/iaas_main/iaas_vm_managing#vm_start_restart_stop_cli)[text=Запуск, перезапуск и останов ВМ]}).
{/ifndef}

{ifdef(cer)}
* OpenStack CLI.
{/ifdef}

### {heading(Шаг 2. Клонируйте диск остановленной ВМ)[id=vm_migration_step_2]}

Чтобы клонировать диск, используйте один из интерфейсов:

* Портал самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).

{ifndef(cer)}
* OpenStack CLI (подробнее — в разделе {linkto(../../../usage/iaas_main/iaas_disk_managing#vm_disk_clone_cli)[text=Клонирование диска]}).
{/ifndef}

{ifdef(cer)}
* OpenStack CLI.
{/ifdef}

### {heading(Шаг 3. Создайте образ на основе клонированного диска)[id=vm_migration_step_3]}

<!--- //в интерфейсе нет варианта создания образа с диска -->

Создайте образ диска при помощи Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**)

При создании задайте параметры:

* **Источник** — **Диск**.
* **Выберите диск** — название клона диска, созданного ранее.

### {heading(Шаг 4. Скачайте образ в формате RAW через OpenStack CLI)[id=vm_migration_step_4]}

1. Выполните подготовительные операции (подробнее — в разделе {linkto(../../../usage/interfaces_access#use_openstackcli_admin)[text=%text]}).
1. Получите список образов и их идентификаторы:

   ```console
   # openstack image list
   ```

1. Скачайте созданный на предыдущем шаге образ в формате RAW:

   ```console
   # openstack image save --file clone-vm-to-wmvare-img.raw <ИМЯ_ИЛИ_ID_ОБРАЗА>
   ```

### {heading(Шаг 5. Сконвертируйте скачанный образ в формат VMDK)[id=vm_migration_step_5]}

```console
# qemu-img convert -f raw -O vmdk -o subformat=streamOptimized clone-vm-to-wmvare-img.raw clone-vm-to-wmvare-img.vmdk
```

### {heading(Шаг 6. Обновите параметр версии образа в формате VMDK)[id=vm_migration_step_6]}

```console
# printf '\x03' | dd conv=notrunc of=clone-vm-to-wmvare-img.vmdk bs=1 seek=$((0x4))
```

### {heading(Шаг 7. Скопируйте образ в формате VMDK в файловое хранилище)[id=vm_migration_step_7]}

Скопируйте образ в формате VMDK на ESXi через GUI vSphere в файловое хранилище.

### {heading(Шаг 8. Сконвертируйте образ в формате VMDK утилитой vmkfstools)[id=vm_migration_step_8]}

Этот шаг выполняется, поскольку файл, полученный при конвертации на {linkto(#vm_migration_step_5)[text=шаге 5]}, поддерживается только VMWare Workstation. После конвертации, описанной в этом шаге, образ можно будет использовать в ESXi.

1. Войдите на любой хост ESXi по SSH.
1. Перейдите в директорию, куда скачан образ в формате VMDK.
1. Сконвертируйте образ утилитой `vmkfstools`:

   ```console
   $ vmkfstools -i <SOURCE>.vmdk <DIST>.vmdk
   ```

   {caption(Пример команды)[align=left;position=above]}
   ```console
   $ vmkfstools -i clone-vm-to-wmvare-img.vmdk virtual_machine.vmdk
   ```
   {/caption}

   {caption(Пример результата)[align=left;position=above]}
   ```console
   Destination disk format: VMFS zeroedthick
   Cloning disk 'clone-vm-to-wmvare-img.vmdk'...
   Clone: 100% done.
   ```
   {/caption}

### {heading(Шаг 9. Создайте ВМ)[id=vm_migration_step_9]}

При создании ВМ в VMware задайте в качестве диска полученный образ:

1. Удалите пустой диск.
1. Выберите подключение существующего диска:

   1. Нажмите кнопку **ADD NEW DEVICE**.
   1. Выберите **Existing Hard Disk**.
   1. В открывшемся окне в качестве диска выберите полученный образ и нажмите кнопку **OK**.

1. Нажмите кнопки **Далее** → **Далее** → **Готово**.
1. Запустите ВМ и проверьте, что она запущена.

<warn>

Для ОС Windows дополнительно установите `vmware-tools`, чтобы ВМ могла коммуницировать с гипервизором.

</warn>