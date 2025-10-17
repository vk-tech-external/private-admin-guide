# {heading(Шаблоны кластера Kubernetes)[id=cluster_template]}

## {heading(Создание шаблона кластера для внешних сетей проектов)[id=cluster_template_add]}

После создания новой внешней сети проекта, доступной только в нем, создайте шаблон кластера Kubernetes. Запустите плейбуки с параметрами:

```console
$ cd ~/inventory/vkcloud/
$ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=true -t post-bootstrap,provider-net ../ansible-openstack/playbooks/helm-magnum.yml
$ ansible-playbook --diff -i vkcloud.yml -e env=vkcloud -e bootstrap=true -t post-bootstrap,provider-net ../ansible-openstack/playbooks/helm-magnum-addons.yml
```

## {heading(Работа с шаблонами кластера для внешних сетей проектов)[id=cluster_template_work]}

Для работы с шаблонами кластера Kubernetes укажите идентификатор проекта, для которого создана внешняя сеть, доступная только в нем:

1. Выполните Bash-скрипт для загрузки в переменные окружения параметров подключения к кластеру:

   ```console
   # source ~root/openrc.sh
   ```
   
1. Укажите идентификатор проекта:

   ```console
   OS_PROJECT_ID=<PROJECT_ID> openstack coe cluster template list
   ```

   Здесь `<PROJECT_ID>` — идентификатор проекта, для которого создана внешняя сеть, доступная только в нем.

<info>

Чтобы получить список команд для работы с шаблонами кластера, выполните команду:

```console
# openstack coe --help | grep 'cluster template'
```

</info>