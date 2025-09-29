# {heading(Кластеры Kubernetes)[id=cloud_containers]}

Кластеры Kubernetes используются в высоконагруженных информационных системах для управления распределением трафика и автоматического масштабирования узлов. Ключевые особенности:

* Отказоустойчивость.
* Автоматическое масштабирование.
* Эффективное распределение трафика с помощью выделенных балансировщиков нагрузки.

<!--- //* Максимальная производительность дисков за счёт облачной системы хранения на базе HDD (SAS)/SSD. -->

В контейнерах Kubernetes можно быстро запускать и управлять тестовыми средами и, таким образом, автоматизировать и упростить процессы разработки и тестирования. Преимущества:

* Быстрое создание большого количества тестовых сред Kubernetes.
* Развёртывание экземпляров кластеров Kubernetes версии 1.26.5.
* Снижение затрат на хостинг тестовых сред до 3 раз.
* Автоматизация процессов `CI/CD`.
* Стандартизация разработки в распределенных командах и при работе с аутсорсерами.

## {heading(Создание и запуск кластера Kubernetes)[id=create_and_launch_kubernetes_cluster]}

Создание и запуск кластера осуществляется при помощи Портала самообслуживания (подробнее — в **Руководстве пользователя {var(system)}**).

## {heading(Подключение постоянного хранилища)[id=connecting_persistent_storage]}

### {heading(Объекты Persistent Volume и Persistent Volume Claim)[id=persistent_volume_and_persistent_volume_claim_objects]}

Для обеспечения постоянного хранения данных, в Kubernetes существуют следующие виды ресурсов:

* PersistentVolume (PV) — раздел на жёстком диске, доступном из кластера. Взаимодействие кластера с PV осуществляется так же, как с узлами.
* PersistentVolumeClaim (PVC) — пользовательский запрос на использование данного диска. Взаимодействие PV с PVC осуществляется так же, как рабочий узел взаимодействует с подами, то есть PVC запрашивает у PV необходимый размер диска и тип доступа — `ReadWriteOnce`, `ReadOnlyMany` или `ReadWriteMany`.

Подключение PV и PVC выполняется автоматически из кластера на основании `Storage class`, интегрированного с Cinder.

{caption(Пример содержания файла конфигурации PVC)[align=left;position=above]}
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: portal-info-data-pvc
spec:
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
  volumeName: "portal-info-data-pv"
  storageClassName: ""
```
{/caption}

{caption(Команды создания и просмотра PV и PVC на основании файла конфигурации)[align=left;position=above]}
```console
$ kubectl create -f new-pvc.yaml
$ kubectl get pvc
$ kubectl get pv | grep new-pvc
```
{/caption}

### {heading(Подключение NFS-хранилища с помощью Persistent Volume и Persistent Volume Claim)[id=connecting_nfs_storage]}

Подключение NFS-хранилища с помощью Persistent Volume и Persistent Volume Claim приведено в [данной инструкции](https://cloud.vk.com/docs/kubernetes/k8s/use-cases/storage#podklyuchenie_faylovyh_hranilishch_c785fc).

<!--- //#todo Проверить корректность инструкции по ссылке -->

### {heading(Доступ к Kubernetes Dashboard)[id=kubernetes_dashboard_access]}

Kubernetes Dashboard представляет собой графический интерфейс для управления контейнерами Kubernetes.

#### {heading(Установка Kubectl (для контейнеров/Kubernetes))[id=installing_kubectl]}

Локальный клиент для Kubernetes `kubectl` позволяет выполнять команды для кластеров Kubernetes. Можно использовать `kubectl` для разворачивания приложений, проверки ресурсов кластера и управления ими, просмотра журналов.

Чтобы проверить актуальность установленной версии `kubectl`:

1. Узнайте номер последней стабильной версии клиента `kubectl`: например, [по ссылке запроса стабильной версии](https://storage.googleapis.com/kubernetes-release/release/stable.txt).
1. Проверьте текущую версию `kubectl`, чтобы убедиться, что она совместима с версией API сервера кластера:

   ```console
   $ kubectl version
   ```

Установка выполняется штатными средствами используемой операционной системы (подробнее — в [официальной документации](https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/)).

##### {heading(Подключение kubectl к кластеру Kubernetes)[id=connecting_kubectl_to_cluster]}

Инструкция по подключению `kubectl` к кластеру Kubernetes приведена в **Руководстве пользователя {var(system)}** в разделе **Подключение к кластеру через Kubectl**.

#### {heading(Настройка доступа к Kubernetes Dashboard)[id=setting_up_access_to_kubernetes_dashboard]}

Инструкция по настройке доступа к Kubernetes Dashboard приведена в **Руководстве пользователя {var(system)}** в разделе **Подключение к Kubernetes Dashboard**.

<!--- //про установку аддонов для Prometheus и Grafana статья в РП. Все действия в Портале самообслуживания, к Порталу администратора не относится. -->
<!--- //Ingress Controller устанавливается при создании кластера в Портале самообслуживания. Все инструкции в РП. -->

## {heading(Масштабирование кластера Kubernetes)[id=cluster_scaling]}

Доступно вертикальное и горизонтальное масштабирование кластера Kubernetes (с настройками автомасштабирования), подробнее — в **Руководстве пользователя {var(system)}**.

## {heading(Типовые операции с контейнерами)[id=typical_container_operations]}

### {heading(Работа с конфигурациями)[id=work_with_configurations]}

Конфигурация позволяет понять, с каким Kubernetes-кластером взаимодействует `kubectl`. Подробная информация о структуре конфигурационного файла приведена в статье [Configure Access to Multiple Clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters).

Чтобы получить объединённые настройки `kubeconfig`, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config
```

Чтобы использовать несколько файлов `kubeconfig` одновременно и посмотреть объединённую конфигурацию из этих файлов, выполните команды:

```console
$ KUBECONFIG=~/.kube/kubconfig1:~/.kube/kubconfig2
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config view
```

Чтобы получить значение параметра из конфигурации, например, пароль для пользователя, используйте ключ `-о`:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config view -o jsonpath='{.users[?(@.name == "<ЛОГИН_ИНТЕРЕСУЮЩЕГО_ПОЛЬЗОВАТЕЛЯ>")].user.password}'
```

Чтобы получить список объектов выполнения утилиты `kubectl`, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config get-contexts
```

Чтобы получить текущий объект выполнения, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config current-context
```

Чтобы установить другой кластер в качестве контекста выполнения утилиты `kubectl` по умолчанию, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml config use-context <НАЗВАНИЕ_КЛАСТЕРА>
```

### {heading(Работа с конфигурациями развёртывания (Deployment))[id=work_ with_deployment_configurations]}

Deployment — это объект Kubernetes, представляющий набор множества идентичных контейнеров без уникальных номеров. Deployment позволяет запускать несколько реплик приложений и автоматически заменять экземпляры приложений в случае сбоя.

Чтобы создать новый Deployment, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml create deployment <НАЗВАНИЕ> --image=<НАЗВАНИЕ_ОБРАЗА_КОНТЕЙНЕРА>
```

Чтобы посмотреть текущий Deployment, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml describe deployment <НАЗВАНИЕ_DEPLOYMENT>
```

{caption(Пример описания Deployment в формате `YAML`)[align=left;position=above]}
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```
{/caption}

В данном примере создаётся три идентичных контейнера с именем `nginx` на базе образа NGINX версии 1.7.9. Доступ к контейнерам осуществляется по 80-му порту.

При обновлении Deployment Kubernetes последовательно перезапускает контейнеры с новой конфигурацией, при этом прежние контейнеры не удаляются, пока не будут успешно запущено достаточное количество новых контейнеров.

Чтобы выполнить обновление Deployment, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml apply -f <НАЗВАНИЕ_DEPLOYMENT>
```

### {heading(Просмотр журналов контейнеров)[id=view_container_logs]}

Чтобы получить список текущих контейнеров, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml get po -n <НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЁН>
```

Чтобы получить список журналов конкретного контейнера, выполните команду:

```console
$ kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml -n <НАЗВАНИЕ_ПРОСТРАНСТВА_ИМЁН> logs <ИМЯ_КОНТЕЙНЕРА>
```

Системные контейнеры расположены в пространстве имён `kube-system`. Наиболее востребованные контейнеры:

* `cluster-autoscaler-`* — журнал событий масштабирования контейнеров.
* `openstack-cloud-controller-`* — журнал взаимодействия всех компонентов платформы виртуализации (например, с Cinder для создания дисков, с Nova для создания ВМ, Octavia для балансировщиков и так далее).

{caption(Пример просмотра журнала `cluster-autoscaler-`*)[align=left;position=above]}
```console
kubectl --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml -n kube-system logs cluster-autoscaler-7f754489f8-qxsqf
...
I1230 08:33:58.952822       1 filter_out_schedulable.go:90] No schedulable pods
I1230 08:33:58.952850       1 static_autoscaler.go:334] No unschedulable pods
I1230 08:33:58.952877       1 static_autoscaler.go:381] Calculating unneeded nodes
....84c14039e967,Unschedulable:false,Taints:[]Taint{Taint{Key:CriticalAddonsOnly,Value:True,Effect:NoSchedule,TimeAdded:<nil>,},Taint{Key:dedicated,Value:master,Effect:NoSchedule,TimeAdded:<nil>,},},ConfigSource:nil,PodCIDRs:[],}
...
```
{/caption}

{caption(Пример просмотра журнала `openstack-cloud-controller-`*)[align=left;position=above]}
```console
kubectl  --insecure-skip-tls-verify=true --kubeconfig rk12_kubeconfig.yaml -n kube-system logs openstack-cloud-controller-manager-nnrlx
...
Ensuring load balancer for service ingress-nginx/nginx-ingress-controller
E1222 08:23:53.451038       1 service_controller.go:255] error processing service ingress-nginx/nginx-ingress-controller (will retry): failed to ensure load balancer: there are no available nodes for LoadBalancer service ingress-nginx/nginx-ingress-controller
I1222 08:23:53.451162       1 event.go:255] Event(v1.ObjectReference{Kind:"Service", Namespace:"ingress-nginx", Name:"nginx-ingress-controller", UID:"68bb8ac5-b7f4-4404-94b2-943e7e55ddc9", APIVersion:"v1", ResourceVersion:"953", FieldPath:""}): type: 'Normal' reason: 'EnsuringLoadBalancer' Ensuring load balancer
...
```
{/caption}

## {heading(Подключение Helm)[id=helm_connect]}

Helm — менеджер пакетов для Kubernetes, который используется для быстрой установки сложных приложений, таких как CRM, e-commerce, БД и прочие.

Helm доступен в созданных кластерах по умолчанию.

## {heading(Persistent volumes и StatefulSet)[id=persistent_volume_statefulset]}

StatefulSet — это удобный способ работы со Stateful-приложениями, которым требуется обрабатывать события об остановке работы Pod и осуществления Graceful Shutdown. Обычно, такие приложения — это базы данных и очереди сообщений, которые работают в нескольких экземплярах, синхронизируемых друг с другом посредством репликации или кластеризации.

Существует несколько способов организации таких схем: с использованием общих Persistent Volumes (RWX) и с помощью индивидуальных Persistent Volumes (RWO). Подробности приведены в [данной инструкции](https://mcs.mail.ru/docs/ru/base/k8s/k8s-pvc/statefulset-and-pvc).
