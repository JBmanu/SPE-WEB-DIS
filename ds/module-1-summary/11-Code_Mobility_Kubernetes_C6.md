# C6 — Code Mobility (+ Seminario: Kubernetes)

## Parte I — Code Mobility (teoria)

### Spostare il codice
A volte passare solo dati non basta: a volte si vuole cambiare il luogo in cui il codice viene eseguito — per bilanciamento del carico, sicurezza, scalabilità...; a volte non si vuole separare i dati dal codice che deve operare su di essi (es. oggetti, agenti). In questi casi, passare dati tra processi non è più sufficiente: il codice stesso deve essere spostato.

### Perché migrare il codice
Tradizionalmente, il codice viene spostato insieme all'intero contesto computazionale: spostare il codice tipicamente significa spostare processi. Perché farlo? Bilanciamento del carico, minimizzazione della comunicazione, ottimizzazione delle prestazioni percepite, miglioramento della scalabilità, flessibilità tramite configurabilità dinamica, miglioramento della tolleranza ai guasti.

### Capire la mobilità del codice
C'è molto più che il semplice spostare codice: cosa si sposta insieme a un programma? Stato di esecuzione, segnali pendenti, dati... Qual è l'essenza di un processo? Ha un insieme di azioni da eseguire; ha uno stato; lavora all'interno di un ambiente, un contesto (computazionale).

### Un modello di processo per la migrazione del codice
Un processo può essere pensato come composto da tre segmenti:
- **code segment**: l'insieme delle istruzioni eseguibili del processo;
- **execution segment**: lo storage per lo stato di esecuzione del processo — dati privati, stack, program counter;
- **resource segment**: l'insieme dei riferimenti alle risorse esterne necessarie al processo — come file, stampanti, dispositivi, altri processi...

A seconda di quale porzione del processo viene spostata insieme al codice, si possono classificare diversi tipi di mobilità del codice.

### Weak mobility (mobilità debole)
Il minimo indispensabile per la migrazione del codice: viene trasferito solo il code segment, possibilmente insieme a qualche dato di inizializzazione. **Idea principale**: il codice può essere eseguito ogni volta ex novo, quindi non importa nulla del contesto computazionale precedente — oppure, forse, il contesto computazionale di cui si ha bisogno è proprio quello della macchina target. **Beneficio principale**: l'unico requisito è che la macchina target possa eseguire il codice — la mobilità debole è quindi molto semplice, senza particolari restrizioni o requisiti aggiuntivi da implementare.

### Strong mobility (mobilità forte)
Spostare anche il contesto di esecuzione: l'execution segment viene trasferito insieme al code segment. **Beneficio principale**: un processo può essere fermato, spostato, e poi riavviato su un'altra macchina. **Requisiti**: la mobilità forte è molto esigente; l'ambiente tecnologico — tipicamente il middleware — deve supportarla esplicitamente.

### Migrazione sender-initiated vs. receiver-initiated
- **Sender-initiated migration**: la migrazione viene avviata da dove il codice risiede/viene attualmente eseguito; esempi: search-bot, agenti mobili; i server devono conoscere i client, e garantire la sicurezza delle risorse — schema di interazione più complesso.
- **Client-initiated migration**: la migrazione viene avviata dalla macchina target, richiedendo un nuovo comportamento da aggiungere; esempi: Java Applet, frammenti JavaScript; solo poche risorse sui client devono essere protette, e i client possono anche essere anonimi — schema di interazione meno complesso.

### Esecuzione su processo separato vs. processo target
Nel caso di mobilità debole, si può eseguire il codice mobile sul processo target oppure su un processo separato (es. i Java Applet vengono eseguiti nello spazio di indirizzamento del browser, senza bisogno di comunicazione inter-processo sulla macchina target). Il problema principale è la protezione contro l'esecuzione di codice malevolo o difettoso; la soluzione è assegnare l'esecuzione del codice mobile a un processo separato.

### Cloning vs. migrating
La mobilità forte può essere supportata anche tramite **remote cloning**: il cloning produce una copia esatta del processo originale, eseguita sulla macchina target; il processo clonato viene eseguito in parallelo al processo originale, su macchine diverse (esempio: in UNIX, fare il fork di un processo figlio e farlo eseguire su una macchina remota). Il cloning è un'alternativa alla migrazione; in un certo senso migliora la trasparenza della distribuzione, perché i processi vengono replicati in modo trasparente su molte macchine diverse.

### Migrazione e risorse locali
Finora si è considerata solo la migrazione del code segment e dell'execution segment; il problema principale è che le risorse potrebbero non essere così facili da spostare quanto codice e variabili (esempio: un enorme database potrebbe in teoria essere spostato attraverso la rete, ma in pratica non lo sarà): o i riferimenti devono essere aggiornati, o le risorse devono essere spostate. Due questioni: come fa il resource segment a riferirsi alle risorse? Come si relaziona la risorsa con la macchina ospitante?

**Process-to-resource binding** (come il segmento di risorse si riferisce alle risorse):
- **binding by identifier**: bisogno di una risorsa con un dato nome — es. via URL o ID locale;
- **binding by value**: bisogno di una risorsa basata sul suo valore — es. librerie di codice;
- **binding by type**: bisogno di una risorsa basata sul suo tipo — tipicamente dispositivi locali come stampanti, monitor...

**Resource-to-machine binding** (come la risorsa si relaziona con la macchina ospitante):
- **unattached resources**: risorse facilmente spostabili tra macchine diverse — come i file associati al codice migrante;
- **fastened resources**: risorse che possono essere spostate, ma a un costo — come un database locale;
- **fixed resources**: risorse legate a una macchina specifica — come un monitor.

### Conclusioni della parte teorica
Il codice può spostarsi tra macchine distribuite per diversi buoni motivi; diversi tipi di mobilità del codice sono possibili, a seconda delle esigenze applicative o dei vincoli tecnologici.

---

## Parte II — Seminario: Kubernetes (Mattia Matteini)

### Motivazioni
I framework di containerizzazione, come Docker, hanno aperto le porte a nuovi modi di sviluppare e distribuire sistemi distribuiti; la maggior parte dei sistemi software oggi sono distribuiti (e complessi); i requisiti non funzionali (attributi di qualità) acquisiscono maggiore importanza nella progettazione di questi sistemi; Kubernetes è oggi lo standard de facto per l'orchestrazione di container.

### Premesse: la containerizzazione
La containerizzazione è una forma leggera di virtualizzazione; ha sostituito le tradizionali macchine virtuali in molti scenari di deployment; fornisce isolamento di processi e file system sfruttando il kernel Linux; la piattaforma di containerizzazione più diffusa è Docker.

### Cos'è (e cosa non è) Kubernetes
**Cos'è**: una piattaforma open source, portabile ed estensibile per gestire workload e servizi containerizzati.

**Cosa non è**: una piattaforma di containerizzazione (come Docker); un Platform as a Service (come Heroku); un cloud provider (anche se funziona con essi); uno strumento di deployment (il CI/CD è definito dalle organizzazioni); uno strumento di logging/monitoring (anche se offre integrazioni per essi).

### Differenze con Docker Swarm
**Docker Swarm**: strumento nativo di clustering e orchestrazione per Docker; più semplice e facile da configurare rispetto a Kubernetes; adatto a cluster più piccoli e applicazioni meno complesse; gli utenti possono gestire manualmente l'allocazione delle risorse e lo scaling; la configurazione dell'ambiente è gestita tramite il file `docker-compose.yml`; controllo degli accessi semplice basato su TLS.

**Kubernetes**: piattaforma open source di orchestrazione di container; più complessa e ricca di funzionalità rispetto a Docker Swarm; ideale per cluster più grandi e applicazioni più complesse; gestisce automaticamente scaling, load balancing e failover; la configurazione dell'ambiente è gestita tramite file YAML; controllo degli accessi avanzato con Role-Based Access Control (RBAC).

### Caratteristiche chiave di Kubernetes

**Immutabilità**: le risorse Kubernetes non possono essere modificate dopo la creazione; se serve un cambiamento, la risorsa viene eliminata e ne viene creata una nuova; i container sono pensati per essere effimeri e stateless (eliminare e ricreare i container è parte standard del loro ciclo di vita); garantisce consistenza e affidabilità nel cluster; supporta la configurazione dichiarativa (i cambiamenti producono nuovi stati desiderati invece di modificare quelli esistenti).

**Configurazione dichiarativa**: aderisce al principio "tutto è un oggetto"; sono disponibili diversi tipi di oggetti per modellare l'ambiente di produzione; i file di configurazione sono scritti in YAML (o JSON); uno strumento dichiarativo esterno, chiamato `kubectl`, gestisce l'ambiente (es. `kubectl create -f configuration-file.yaml`). Aiuta a migliorare configurabilità e manutenibilità.

**Autoscaling**: Kubernetes supporta lo scaling automatico delle applicazioni basato sull'uso delle risorse o su altre metriche. Due tipi principali: **scaling orizzontale** (aumenta/diminuisce le repliche di una risorsa) e **scaling verticale** (regola le risorse disponibili per un container, es. CPU, memoria). Aiuta a migliorare disponibilità e scalabilità delle applicazioni, ottimizzando contemporaneamente l'uso delle risorse.

**Self-healing**: Kubernetes sostituisce automaticamente i container falliti; se un servizio su un nodo è in esecuzione con un volume collegato, e il nodo fallisce, Kubernetes può ricollegare il volume a una nuova istanza su un nodo diverso; se un container dietro un servizio fallisce, Kubernetes rimuove automaticamente la sua rotta e reindirizza il traffico verso altre istanze sane dello stesso servizio. Aiuta a migliorare recuperabilità e affidabilità.

**Container Runtime Interface (CRI)**: un'interfaccia plugin che permette a Kubernetes di usare un'ampia varietà di runtime per container; tale runtime deve funzionare su ciascun nodo del cluster; questo significa che Kubernetes non è legato solo a Docker — gli altri runtime attualmente supportati sono containerd, CRI-O, e Mirantis Container Runtime.

### Architettura del cluster
Un cluster Kubernetes consiste di un **control plane** più un insieme di macchine worker, chiamate **nodes**.

**Control Plane** (gestisce il cluster Kubernetes):
- `kube-apiserver`: componente che espone l'API HTTP di Kubernetes;
- `etcd`: un database chiave-valore usato per salvare i metadati del cluster;
- `kube-scheduler`: componente che osserva i servizi appena creati senza un nodo assegnato, e seleziona un nodo su cui eseguirli;
- `kube-controller-manager`: componente che esegue i processi controller;
- `cloud-controller-manager`: componente che incorpora la logica di controllo specifica del cloud.

**Worker Node** (macchina che esegue applicazioni containerizzate) con i seguenti componenti:
- `kubelet`: assicura che i container siano in esecuzione;
- `kube-proxy`: mantiene le regole di rete sui nodi;
- **container runtime**: software responsabile dell'esecuzione dei container (es. Docker).

### Oggetti (Objects)
Gli oggetti sono entità persistenti nel sistema Kubernetes. Kubernetes usa queste entità per rappresentare lo stato del cluster: quali applicazioni containerizzate sono in esecuzione (e su quali nodi), le risorse disponibili per quelle applicazioni, le politiche per il comportamento dell'applicazione (come riavvii e aggiornamenti). Un oggetto Kubernetes è un "record di intenzione": quando l'oggetto viene creato, il sistema Kubernetes lavora costantemente per assicurare che l'oggetto esista; la creazione di un oggetto dice al sistema Kubernetes come dovrebbe apparire il cluster — cioè il suo **stato desiderato**.

**Proprietà degli oggetti**: quasi ogni oggetto Kubernetes include due campi annidati: **Spec** (fornisce una descrizione delle caratteristiche desiderate per la risorsa — lo stato desiderato) e **Status** (descrive lo stato corrente dell'oggetto, fornito e aggiornato dal sistema Kubernetes e dai suoi componenti; il control plane di Kubernetes gestisce continuamente lo stato effettivo di ogni oggetto per farlo corrispondere allo stato desiderato fornito).

**Creare oggetti**: creare un oggetto significa definire lo spec dell'oggetto e alcune informazioni di base su di esso (come un nome); di solito ciò avviene fornendo a `kubectl` un file di configurazione, noto come **manifest**, scritto per convenzione in YAML. Campi richiesti nel manifest: `apiVersion` (la versione dell'API Kubernetes da usare), `kind` (il tipo di oggetto creato), `metadata` (dati che aiutano a identificare univocamente l'oggetto, come nome e UID), `spec` (lo stato desiderato dell'oggetto — il formato dello spec è diverso per ogni oggetto Kubernetes, e contiene campi annidati specifici per quell'oggetto).

Esempio di manifest che crea un oggetto Pod con un singolo container che esegue l'immagine nginx:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.14.2
      ports:
        - containerPort: 80
```
Per applicare questa configurazione: `kubectl apply -f <your-manifest-file>`.

### Pods
I Pod sono le **unità più piccole distribuibili**; rappresentano un gruppo di uno o più container, con risorse di storage e rete condivise. Il contesto condiviso di un Pod è un insieme di namespace Linux, cgroups, e potenzialmente altre forme di isolamento (proprio come nei container). Due modi di usare i Pod: eseguire un singolo container (il caso d'uso più comune, il Pod è usato come wrapper attorno a un singolo container), oppure eseguire più container (il Pod incapsula un'applicazione composta da più container co-locati strettamente accoppiati, per casi d'uso relativamente avanzati, utile per implementare pattern come Sidecar, Ambassador, e Adapter). I container in un Pod condividono: indirizzo IP e porte, hostname, volumi di storage, identificatori di processo (PID).

Esempio di manifest Pod più dettagliato con gestione delle risorse:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: node-app
  labels:
    app: node
spec:
  containers:
    - name: node-container
      image: node:18
      command: ["node", "-e", "console.log('Hello World!')"]
      resources:
        requests:
          memory: "128Mi"
          cpu: "100m"
        limits:
          memory: "256Mi"
          cpu: "500m"
      ports:
        - containerPort: 3000
          protocol: TCP
```
Il campo `resources` gestisce le risorse hardware: `requests` è la quantità di CPU/memoria che Kubernetes garantisce al container, `limits` è la quantità massima di CPU/memoria che il container può usare. Le risorse CPU sono espresse in unità millicpu (0.1 = 10% = 100m); le risorse di memoria sono espresse in byte (es. 128Mi = 128MB).

### ReplicaSets
L'oggetto che gestisce il numero di repliche di un Pod; permette di scalare su e giù le repliche dei Pod; è spesso usato per garantire la disponibilità di un numero specificato di Pod identici. Quando un ReplicaSet deve creare nuovi Pod, usa il proprio template di Pod. Solitamente non è gestito direttamente dall'utente, ma tramite un **Deployment**.

### Deployments
I Pod (e i ReplicaSet) non sono gestiti direttamente dall'utente, ma tramite oggetti di livello superiore chiamati Deployment. Un Deployment gestisce un insieme di Pod per eseguire un workload applicativo; fornisce aggiornamenti dichiarativi per Pod e ReplicaSet, come **Rollout** (cambio dallo stato corrente a quello desiderato) e **Rollback** — ad esempio cambiando la versione dell'immagine di un container, evitando downtime durante il processo di aggiornamento. Usato per gestire il rilascio di una nuova versione dell'applicazione.

Esempio:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```
Il campo `replicas` specifica il numero di repliche Pod desiderate; il campo `selector` definisce come il Deployment trova quali Pod gestire; il campo `template` contiene la specifica del Pod che il Deployment usa per creare nuovi Pod.

**Altri oggetti oltre i Deployment**: `Job` (per eseguire compiti brevi, una tantum), `CronJob` (per eseguire azioni programmate regolari come backup, generazione di report...), `StatefulSet` (gestisce i Pod come un Deployment, ma mantiene un'identità stabile/persistente per ciascuno dei suoi Pod), `DaemonSet` (assicura che tutti — o alcuni — i Nodi eseguano una copia di un Pod; man mano che i nodi vengono aggiunti al cluster, i Pod vengono aggiunti a essi, e man mano che i nodi vengono rimossi, quei Pod vengono raccolti dal garbage collector).

### Services
Un'astrazione che definisce un insieme logico di Pod e una politica per accedervi; il punto di ingresso dell'applicazione; reindirizzano le richieste verso i Pod nei nodi del cluster. I Pod sono effimeri, quindi possono essere spostati tra i nodi, e il loro indirizzo IP è soggetto a cambiamenti; un Service abilita un endpoint stabile (indirizzo IP e nome DNS) per accedere a un insieme di Pod sfruttando i label selector. Diversi tipi di Service: **ClusterIP** (default, espone il servizio su un IP interno al cluster), **NodePort** (espone il servizio sull'IP di ciascun Nodo a una porta statica), **LoadBalancer** (espone il servizio esternamente usando un load balancer fornito da un cloud provider, oppure usando MetalLB on-premise).

Esempio:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-service
  labels:
    app: node
spec:
  selector:
    app: node
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

### Esempio pratico: hit counter con Flask e Redis

Contesto: una semplice applicazione web che conta il numero di visite, composta da un servizio backend (Python + Flask) e uno store chiave-valore in memoria (Redis). Aree di interesse: sviluppo con Docker Compose, migrazione a Kubernetes, monitoraggio con Prometheus e Grafana.

**Sviluppo con Docker Compose**: l'applicazione (`app.py`) si connette a Redis, espone una route `/` che incrementa un contatore di hit e restituisce il numero di visite e l'hostname del Pod che serve la richiesta; viene containerizzata con un Dockerfile (basato su `python:3.12-slim`) e orchestrata con `docker-compose.yml` (definendo i servizi backend e redis, con le relative variabili d'ambiente e dipendenze). Per costruire ed eseguire: `docker compose up -d --build`.

**Migrazione a Kubernetes**: per ogni servizio nel docker compose, si definisce un oggetto Deployment e un oggetto Service; in aggiunta, si definisce un oggetto **Horizontal Pod Autoscaler (HPA)** per scalare automaticamente il servizio backend. Il backend Deployment specifica l'immagine, le porte, le variabili d'ambiente e le risorse (requests/limits); il backend Service è di tipo NodePort; analogamente per Redis. L'HPA viene innescato se l'uso della CPU supera il 50% o l'uso della memoria supera il 70%, con `minReplicas: 1` e `maxReplicas: 10`, basandosi su metriche di utilizzo di CPU e memoria.

**Kompose**: uno strumento utile per risparmiare tempo nella conversione di file Docker Compose in file di configurazione Kubernetes; supporta label specifiche di Kompose all'interno del file `compose.yml` per definire esplicitamente il comportamento delle risorse generate (es. `kompose.service.type: nodeport`, `kompose.controller.type: deployment`); comando: `kompose convert -f docker-compose.yml -o k8s`.

**Flusso operativo con Minikube**: avviare Minikube localmente (`minikube start`); abilitare il metrics server per usare l'HPA (`minikube addons enable metrics-server`); applicare i manifest Kubernetes (`kubectl apply -f k8s`); accedere alla pagina web (`minikube service backend` o `kubectl port-forward svc/backend 8080:3000`); monitorare lo stato del sistema tramite la dashboard (`minikube dashboard`).

**Stress testing del sistema**: per testare le capacità di autoscaling, si esegue uno script che genera carico sul servizio backend (`stress-test.sh`); immediatamente la pagina web dovrebbe diventare non responsiva a causa dell'alto carico di richieste; in pochi secondi l'HPA dovrebbe attivarsi e avviare nuove repliche dei Pod; dopo un po', la pagina web dovrebbe tornare responsiva, mostrando che ci sono più Pod che servono le richieste (con ID Pod diversi).

### Monitoraggio del sistema (Observability)

Finora ci si è concentrati principalmente su scalabilità, disponibilità e affidabilità; tuttavia un altro attributo di qualità importante è l'**osservabilità**: un sistema in produzione prima o poi andrà giù per qualche motivo; un sistema osservabile permette di capire cosa è successo/sta succedendo.

**Monitoring**: alcuni strumenti di monitoraggio aiutano a raggiungere l'osservabilità; un sistema di monitoraggio può: raccogliere e mostrare metriche, avvisare l'amministratore di sistema, registrare eventi. I più comuni: **Prometheus** (toolkit open source per il monitoraggio e l'alerting di sistemi) e **Grafana** (interfaccia web open source per analytics e monitoring) — usati insieme per visualizzare le metriche raccolte durante lo stress test.

### Conclusioni del seminario
Kubernetes rappresenta oggi lo standard de facto per l'orchestrazione di container in sistemi distribuiti production-ready; la sua architettura dichiarativa, immutabile, self-healing e auto-scalante affronta direttamente molti dei temi teorici del corso (disponibilità, scalabilità, tolleranza ai guasti, trasparenza della distribuzione), fornendo un esempio concreto e moderno di come i principi dei sistemi distribuiti vengano implementati nella pratica industriale odierna.
