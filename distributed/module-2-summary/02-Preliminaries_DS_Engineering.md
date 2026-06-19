# Preliminaries about Distributed Systems Engineering

## Cos'è un sistema distribuito? (Recap multi-prospettiva)

**Leslie Lamport (1987)**: un sistema distribuito è uno in cui il fallimento di un computer di cui non si sapeva nemmeno l'esistenza può rendere inutilizzabile il proprio computer. Interpretazione: interdipendenze nascoste tra le macchine, e come un fallimento in una parte del sistema possa avere conseguenze impreviste altrove.

**Tanenbaum & van Steen**: un sistema distribuito è una collezione di computer indipendenti che appare ai suoi utenti come un singolo sistema coerente. Interpretazione: illusione di un sistema unificato, nonostante sia composto da più macchine indipendenti; l'idea chiave è che gli utenti potrebbero NON essere consapevoli che il sistema è distribuito.

**Coulouris et al.**: si definisce un sistema distribuito come uno in cui componenti hardware o software situati su computer in rete comunicano e coordinano le proprie azioni solo passandosi messaggi. Interpretazione: dipendenza dallo scambio di messaggi attraverso una rete per la comunicazione.

**Van Roy & Haridi**: un sistema distribuito è un insieme di computer collegati tra loro da una rete. Interpretazione: definizione molto astratta, focalizzata su come la distribuzione debba essere interpretata.

**Riepilogo**: queste definizioni coprono le caratteristiche essenziali dei sistemi distribuiti: componenti indipendenti, comunicazione tramite messaggi, la sfida di presentare un sistema unificato all'utente nonostante fallimenti o complessità interne.

## Perché rendere distribuito un sistema?

Una o più delle seguenti ragioni: **scalabilità** (gestire sistemi su larga scala in modo efficiente), **fault tolerance e availability** (garantire affidabilità nonostante i fallimenti), **bassa latenza e distribuzione geografica** (offrire una migliore esperienza utente globalmente), **resource sharing** (usare in modo efficiente potenza di calcolo e storage), **gestione dei big data** (processare i dati localmente invece di spostarli), **parallelismo** (velocizzare i task tramite esecuzione concorrente), **efficienza dei costi** (ridurre i costi infrastrutturali tramite pooling di risorse), **collaborazione** (abilitare aggiornamenti e interazioni in tempo reale a distanza). A volte, semplicemente, la funzionalità da fornire implica la distribuzione.

### Esempi commentati
- **Google Search**: scalabilità (miliardi di ricerche al giorno), fault tolerance (un solo server non potrebbe gestire questa mole di dati), bassa latenza e distribuzione geografica (migliaia di server nel mondo), parallelismo (elaborazione concorrente di più query).
- **Social network / messaging app (es. Instagram, WhatsApp)**: scalabilità (milioni di utenti simultanei), bassa latenza, distribuzione geografica (comunicazione globale), gestione dei big data (salvare i dati nella regione dell'utente, come richiesto dal GDPR), parallelismo, collaborazione. La funzionalità è intrinsecamente distribuita.
- **Online shopping (es. Amazon)**: scalabilità, fault tolerance, bassa latenza, distribuzione geografica (conformità a regolamenti e preferenze locali, es. lingua/valuta), parallelismo.
- **Online gaming (es. LoL, Fortnite)**: scalabilità, fault tolerance, bassa latenza, distribuzione geografica, parallelismo, collaborazione.
- **Google Docs e simili**: scalabilità (modelli di business diversi, es. subscription), fault tolerance (salvataggi/backup automatici impliciti), distribuzione geografica (condivisione e collaborazione semplificate), parallelismo e collaborazione (più utenti modificano lo stesso documento concorrentemente).
- **Federated Learning (es. Google Gboard)**: scalabilità (migliorare l'apprendimento per tutti gli utenti mantenendo i dati privati), distribuzione geografica (migliorare la funzionalità sulla base dei dati di regioni diverse), gestione dei big data (elaborazione locale invece di spostare i dati), parallelismo (l'apprendimento avviene sul dispositivo dell'utente, ovunque e in qualunque momento), efficienza dei costi, resource sharing (preservando la privacy).

## Come cambia il workflow di Software Engineering per i sistemi distribuiti?

### Recap: workflow classico di Software Engineering
1. **Use case collection**: negoziare le aspettative con clienti/stakeholder.
2. **Requirements analysis**: produrre una lista di requisiti che il prodotto finale deve soddisfare, con criteri di accettazione per ciascuno.
3. **Design**: produrre un progetto del software (modellazione: quali entità del mondo reale sono rappresentate? come si comportano? come interagiscono?).
4. **Implementation**: scrivere il codice che realizza il design.
5. **Verification**: verificare che il software soddisfi i requisiti (testing automatizzato, acceptance testing con dati e utenti reali).
6. **Release**: rendere disponibile una versione del software ai clienti.
7. **Deployment**: installare e attivare il software.
8. **Documentation**: produrre manuali e guide.
9. **Maintenance**: correggere bug, migliorare il software, adattarlo a nuovi requisiti.

### Passi aggiuntivi per i sistemi distribuiti (solo le aggiunte rispetto al workflow classico)

**1. Use case collection**: dove sono gli utenti? Quando e con quale frequenza interagiscono col sistema? Come interagiscono, con quali dispositivi? Il sistema deve salvare dati utente? Quali, dove? Più probabilmente, ci saranno più ruoli.

**2. Requirements analysis**: le risposte alle domande precedenti implicano probabilmente vincoli tecnici (es. dove salvare i dati? in caso di più data center, come mantenerli consistenti?); il sistema dovrà scalare? come gestire i guasti e il recupero dai fallimenti? i criteri di accettazione devono coprire tutti questi requisiti/vincoli aggiuntivi.

**3. Design**: ci sono componenti infrastrutturali da introdurre? quanti? (es. client, server, load balancer, cache, database, message broker, code, worker, proxy, firewall, CDN...); come si distribuiscono sulla rete i componenti? dove? (es. indirizzi IP di server/broker/database); come si mappano le entità del dominio sui componenti infrastrutturali? (es. lo stato di un videogioco su un server centrale, mentre input/rappresentazioni sui client; dove salvare i messaggi in un'app IM? per quanto tempo?); come comunicano i componenti? cosa si scambiano? quali pattern di interazione mettono in atto?; i componenti devono salvare dati? quali, dove, quando, quante copie? (in caso di partizione di rete, il sistema dovrebbe privilegiare availability o consistency?); come si trovano i componenti tra loro? (naming, service discovery, load balancing); come si riconoscono i componenti tra loro? (autenticazione, autorizzazione); cosa dovrebbe succedere quando un componente fallisce? è davvero un fallimento? (retry, back-off, degradazione controllata...).

**4. Implementation**: quali protocolli di rete usare? (UDP, TCP, HTTP, WebSocket, gRPC, XMPP, AMQP, MQTT...); come rappresentare i dati in transito? (JSON, XML, YAML, Protocol Buffers...); come salvare i dati persistenti? (relazionale, documenti, chiave-valore, grafo...); come interrogare i database? (SQL, NoSQL...); come autenticare i componenti? (OAuth, JWT...); come autorizzarli? (RBAC, ABAC...).

**5. Verification**: come fare unit test su componenti distribuiti? testare l'integrazione tra componenti è fondamentale; come fare test end-to-end? (es. ambiente di produzione vs. di test); l'automazione del deployment è comunemente usata per testare in un ambiente simile alla produzione.

**6. Release**: i componenti possono (e dovrebbero) avere propri cicli di rilascio e versioni; i componenti dovrebbero essere resilienti alla coesistenza di più versioni; gli aggiornamenti incrementali (rolling update) sono preferiti rispetto ai "big bang update".

**7. Deployment**: dove deployare i componenti? (cloud, on-premise, ibrido); come deployarli? (container, VM, bare metal); come scalarli? (orizzontalmente, verticalmente, auto-scaling); come monitorarli? (log, metriche, trace); come metterli in sicurezza? (firewall, cifratura, certificati); tutti questi aspetti dovrebbero essere automatizzati — esistono strumenti e aziende dedicate proprio a questo.

**8. Documentation**: protocolli e formati dati dovrebbero essere ben documentati, permettendo a terze parti di creare componenti compatibili (es. le specifiche delle Web API sono pubbliche per la maggior parte dei servizi web).

**9. Maintenance**: monitoraggio continuo di prestazioni e disponibilità (esistono strumenti e aziende dedicate); il tracciamento dei problemi non è banale (può richiedere sotto-sistemi ad hoc); il "sunsetting" (dismissione) delle versioni vecchie è cruciale, vista la coesistenza di più versioni — la fine vita dovrebbe essere pianificata, non improvvisa.

## Nomenclatura infrastrutturale

### Infrastruttura
L'insieme di strutture hardware, software e di rete che permettono alle molte parti di un sistema distribuito di comunicare e inter-operare attraverso una rete — l'insieme dei componenti infrastrutturali che costituiscono la spina dorsale del sistema distribuito. Sistemi distribuiti possono basarsi su infrastrutture simili, indipendentemente dalle diverse funzionalità che offrono. L'infrastruttura è trasparente agli utenti finali, ma essenziale per il funzionamento del sistema. Esempio: nel proprio social network preferito, sembra solo una dashboard sul telefono/computer, ma dove sono salvati i dati? Dove sono i messaggi dopo essere stati inviati ma prima di raggiungere il telefono? Dove avviene l'elaborazione dell'informazione? Diversi tipi di calcolo vengono eseguiti su diversi componenti infrastrutturali, a seconda del loro ruolo nel sistema.

### Componente infrastrutturale
Consiste in un'unità software che gioca un ruolo preciso nel sistema distribuito (unità software = processo, nel senso del sistema operativo). Il ruolo dipende dallo scopo del componente nel sistema e/o da come interagisce. Esempi: client, server, broker, load balancer, cache, database, code, master, worker, proxy, ecc.

### Sinonimi
**Node**: un componente infrastrutturale per cui il ruolo non è rilevante. **Peer**: un componente infrastrutturale per cui il ruolo non è specificato, perché tutti i componenti giocano lo stesso ruolo (o gli stessi ruoli).

### Client e Server
**Server**: un componente con un nome/indirizzo ben noto che risponde a richieste provenienti dai client — è il componente che ascolta (attende) richieste remote, e tipicamente espone un'interfaccia (le richieste a cui può rispondere) ai client. **Client**: un componente che invia richieste ai server, attendendo risposte — è il componente che inizia l'interazione, e può esporre un'interfaccia agli utenti su come interagire col server.

### Proxy
Un server che agisce come gateway verso un altro server: intercetta le richieste dai client e le inoltra al server effettivo, intercetta le risposte dal server effettivo e le inoltra al client, può fare caching delle risposte per ridurre il carico sul server. Un proxy che fa caching è chiamato **cache server** (o semplicemente cache).

### Load Balancer
Un proxy che distribuisce le richieste in ingresso tra più server, secondo una politica di distribuzione: round-robin, minor numero di connessioni, minor tempo di risposta, ecc.

### Broker
Un server che media la comunicazione tra produttori e consumatori di dati (a.k.a. messaggi): riceve messaggi dai produttori e li inoltra a uno o più consumatori; assunzione comune: i consumatori dichiarano il proprio interesse a ricevere i messaggi. **Producer**: il componente che invia messaggi (tramite il broker). **Consumer**: il componente che riceve messaggi (tramite il broker). Lo stesso componente può essere contemporaneamente producer e consumer.

### Queue (coda)
Una struttura dati dove i messaggi sono salvati in modo FIFO: FIFO (i messaggi vengono consumati nell'ordine in cui sono stati prodotti), storage (i messaggi non vengono persi se i consumer non sono disponibili).

### Message Oriented Middleware (MOM)
Un tipo di broker con più canali per i messaggi: i messaggi riguardanti lo stesso argomento vengono inviati allo stesso canale, e i consumer si sottoscrivono ai canali. **Topic**: un'etichetta per i messaggi, che permette ai producer di controllare quali consumer ricevono il messaggio, ai consumer di filtrare i messaggi di interesse, e al broker di instradare i messaggi ai consumer corretti. La maggior parte delle tecnologie MOM usa effettivamente delle code per implementare i canali.

### Database
Un server specializzato nel salvare e recuperare dati; nelle architetture a tre livelli (three-tier), il database è il terzo livello, agendo come server per il server (che a sua volta agisce da client rispetto al database).

### Master—Worker (a.k.a. Master—Slave, o Leader—Follower)
**Master**: un server che coordina il lavoro di più worker, distribuendo il lavoro tra di essi e raccogliendo i risultati. **Worker**: un server che esegue il lavoro assegnato dal master. Casi d'uso comuni: [master-worker] calcolo parallelo; [master-slave] replicazione dei dati.

## Pattern di interazione

Un **pattern di interazione** descrive come diversi componenti (nodi, processi, ecc.) comunicano e coordinano le proprie azioni per raggiungere un obiettivo comune. Tali pattern definiscono il flusso dei messaggi, le responsabilità dei partecipanti, e la temporizzazione/sequenza delle comunicazioni (es. request-response, publish-subscribe, asta, ecc.).

**Punti chiave**: **partecipanti** (si assume ce ne siano diversi); **ruoli** (i partecipanti giocano ruoli ben definiti, tipicamente initiator — chi avvia l'interazione — e responder — chi attende che un altro partecipante avvii l'interazione); **messaggi** (informazione scambiata tra i partecipanti, tipicamente contenente almeno un payload — il contenuto effettivo — e metadati — informazione sul messaggio, es. sorgente, destinazione, timestamp, ID di conversazione).

### Come rappresentare i pattern di interazione
1. **Sequence diagram**: rappresentazione visiva del flusso di messaggi tra partecipanti — il tempo è verticale, i partecipanti sono orizzontali, le frecce rappresentano i messaggi inviati, le "lifeline" rappresentano la durata di vita di un partecipante.
2. **Message flow graph**: rappresentazione visiva del flusso di messaggi — ogni nodo rappresenta un tipo di messaggio (es. richiesta, risposta, notifica), ogni arco diretto rappresenta una risposta ammissibile a un messaggio; il grafo può contenere cicli se il pattern ammette interazioni ripetute o reset; i nodi possono avere colori/forme diverse a seconda del ruolo che invia/riceve il messaggio.
3. **State diagram (state machine)**: rappresentazione visiva delle transizioni di stato interne di un partecipante — ogni stato rappresenta una condizione del partecipante (es. prima/dopo l'invio/ricezione di un messaggio), ogni transizione rappresenta un evento che cambia lo stato (più comunemente l'invio/ricezione di un messaggio), gli stati iniziale e finale sono speciali, e tipicamente esiste un diagramma di stato per ciascun partecipante.

Le tre rappresentazioni sono complementari e dovrebbero essere usate insieme. Rappresentazioni ulteriori possono essere utili: AUML (Agent UML) della FIPA per sistemi basati su agenti, BPMN (Business Process Model and Notation) per processi di business, Activity Diagram di UML.

### Protocolli di interazione comuni

**Request—Response**: il pattern più comune e basico per la comunicazione tra due componenti — 2 ruoli (client e server), 2 tipi di messaggio (richiesta e risposta), ogni richiesta è seguita da una risposta; il client è l'iniziatore, il server il rispondente; spesso usato per realizzare RPC (remote procedure call), RMI (remote method invocation), (web) services.

**Publish—Subscribe**: un pattern semplice per diffondere informazione a più destinatari — 2 ruoli (publisher e subscriber), 2 tipi di messaggio (subscribe e notify), 2 fasi di interazione (sottoscrizione e notifica). Fase di sottoscrizione: i subscriber dichiarano il proprio interesse a ricevere messaggi (sono gli iniziatori qui). Fase di notifica: i publisher inviano messaggi ai subscriber (i messaggi vengono trasmessi in broadcast o multicast a seconda dell'implementazione); i messaggi di tipo notify trasportano messaggi, tipicamente rappresentanti eventi; i messaggi di tipo subscribe possono trasportare topic, tipicamente rappresentanti l'interesse del subscriber. La sottoscrizione è essenzialmente un pattern request-response.

**Publish—Subscribe con Broker**: si può ri-progettare il pattern con un broker esplicito — utile per disaccoppiare publisher e subscriber; tipicamente i broker salvano i messaggi finché non vengono consumati.

**Unicast vs. Broadcast vs. Multicast**: unicast (comunicazione uno-a-uno), broadcast (comunicazione uno-a-tutti), multicast (comunicazione uno-a-molti, implica un criterio di selezione per i "molti").

**ContractNet Protocol**: un protocollo semplice per aste e negoziazioni — 2 ruoli (initiator e contractor), 5 tipi di messaggio (CFP, proposal, award, accept, result), 4 fasi: (1) Call for Proposals: l'initiator trasmette in broadcast/multicast una richiesta di proposte, definendo tipicamente una scadenza e una richiesta di task; (2) Proposal Submission: i contractor sottomettono proposte all'initiator, tipicamente contenenti un costo stimato; (3) Proposal Evaluation: l'initiator valuta le proposte e sceglie la migliore; (4) Award Contract: l'initiator assegna il contratto al contractor scelto, che lo accetta; (5) Contract Execution: il contractor esegue il contratto e restituisce il risultato. Casi non mostrati nel diagramma: mancanza di proposte, nessuna proposta scelta, il contractor potrebbe rifiutare il contratto.

**Foundation for Intelligent Physical Agents (FIPA)**: un ente di standardizzazione per sistemi basati su agenti (analogia approssimativa: agente ≈ componente distribuito in un sistema distribuito); FIPA ha standardizzato molti protocolli di interazione per agenti (es. contract net, request-response, subscription, asta, ecc.).

## Architettura e stili architetturali (richiamo dal Modulo 1)

> Richiama esplicitamente la teoria di M6/M8 del Modulo 1: "Modelling Distributed Systems: Software & System Architectures".

**Roy Fielding (2000)**: un'architettura software è un'astrazione degli elementi a run-time di un sistema software durante una qualche fase della sua operazione; è definita da una configurazione di elementi architetturali vincolati nelle loro relazioni per ottenere un insieme desiderato di proprietà architetturali. Molto approssimativamente: uno **stile architetturale** è un pattern di architetture noto funzionare nella pratica. I principali stili architetturali per i sistemi distribuiti: architetture a strati (layered), basate su oggetti (object-based), basate su eventi (event-based), a spazio dati condiviso (shared data-space).

### Layered Architecture (concetto)
**Componenti infrastrutturali**: ogni strato è un server (o un proxy) per lo strato/gli strati sopra di esso, ed è un client per lo strato/gli strati sotto. **Pattern di interazione**: Request-Response (a.k.a. RPC) — gli strati superiori inviano richieste agli strati inferiori, che rispondono; a volte Publish-Subscribe — gli strati superiori si sottoscrivono agli strati inferiori, che li notificano. **Vincoli**: nessun ciclo tra gli strati (gli strati inferiori non dovrebbero contattare quelli superiori). **Esempio**: Skyscanner (cerca voli/hotel) si appoggia sui web service di compagnie aeree/hotel e sul portale di prenotazione, ciascuno con la propria architettura a strati.

**Casi particolari**: **Three-Tier Architecture** — Presentation Tier (presenta informazioni all'utente e accetta input), Application Tier (elabora le richieste, esegue la logica di business, aggiorna lo stato del sistema), Data Tier (salva/recupera dati, gestisce l'accesso ai dati, persiste lo stato del sistema). **Hexagonal Architecture**.

**Pro**: separazione delle responsabilità, modularità, riusabilità, scalabilità (si può scalare modificando/ottimizzando singoli strati), manutenibilità, astrazione, interoperabilità (un'interfaccia ben definita tra strati promuove compatibilità e l'uso di tecnologie diverse in ciascuno strato).

**Contro**: overhead di prestazioni (latenza per trasformazioni/elaborazioni eccessive tra strati), complessità di design, rigidità della struttura (limita la flessibilità per cross-cutting concern come logging/sicurezza), possibile duplicazione di funzionalità, possibile over-engineering in sistemi piccoli/semplici, difficoltà nella comunicazione tra strati.

**Opinione personale del docente**: le architetture a strati sono semplici e facili da comprendere; funzionano bene nella maggior parte dei casi, si possono considerare la scelta di default. Preferenze: two-tier (3-tier senza un vero DBMS) per sistemi rapidi e poco curati; three-tier se la flessibilità non è una priorità; hexagonal per sistemi che potrebbero dover scalare in complessità.

### Object-Based Architecture (concetto)
**Componenti infrastrutturali**: ogni oggetto è simultaneamente client e server per altri oggetti. **Pattern di interazione**: Request-Response (a.k.a. remote method invocation, RMI) — gli oggetti inviano richieste ad altri oggetti, che rispondono. **Vincoli**: praticamente nessuno. **Esempi**: Microsoft COM, Java RMI, CORBA.

**Pro**: incapsulamento, riusabilità, modularità, interfacce ben definite, flessibilità (gli oggetti possono distribuirsi su nodi diversi), agnosticismo rispetto al linguaggio (es. CORBA supporta ambienti multi-linguaggio), comportamento dinamico (gli oggetti possono essere creati/modificati/distrutti dinamicamente).

**Contro**: overhead di prestazioni (comunicazione tra oggetti distribuiti su rete), complessità di gestione (ciclo di vita, sincronizzazione, recupero dai fallimenti), difficoltà di debug, limiti di scalabilità, problemi di sicurezza, accoppiamento stretto tramite interfacce, gestione dello stato complessa.

**Opinione personale del docente**: le architetture object-based erano popolari negli anni '90 e primi 2000; non hanno mai davvero preso piede, e sono oggi per lo più legacy. L'OOP è ottima per sviluppare singoli componenti, dove gli oggetti condividono lo stesso spazio di indirizzamento; le interazioni tra oggetti sono così fini e intrecciate in OOP che aggiungere la rete in mezzo le rende ingestibili. Semplicemente, non usarle quando si progetta un nuovo sistema.

### Event-Based Architecture (concetto)
**Componenti infrastrutturali**: un **event bus** (un broker per eventi, oppure un insieme di broker con un meccanismo di instradamento); i server sono produttori e consumatori di eventi; i client tipicamente interagiscono solo con i server, come nelle architetture a strati. **Pattern di interazione**: Request-Response (client-server); Publish-Subscribe (server-event bus). **Vincoli**: i server non si conoscono realmente tra loro — sanno solo a quale evento reagire o quale evento produrre. **Osservazioni**: molto usata nell'industria per creare sistemi modulari, dove i moduli sono realizzati in momenti/tecnologie diversi.

**Pro**: scalabilità (componenti disaccoppiati, gestiscono molti eventi concorrentemente), elaborazione in tempo reale, basso accoppiamento, resilienza (la separazione tra produttori e consumatori riduce il rischio di singoli punti di fallimento), comunicazione asincrona.

**Contro**: complessità (specialmente con flussi di eventi su larga scala), difficoltà di debug (tracciare il flusso degli eventi è difficile in sistemi distribuiti asincroni), ordinamento degli eventi (garantire l'ordine corretto è difficile con più consumer), latenza (la rete può ritardare la consegna/elaborazione), consistenza dei dati (più difficile garantirla a causa dell'elaborazione asincrona), singolo punto di fallimento (se l'event hub non è gestito correttamente con meccanismi fault-tolerant).

**Opinione personale del docente**: le architetture event-based sono molto popolari nell'industria; sono anche piuttosto complesse da progettare e implementare — non per niente "entry level"; corsi futuri di questo master programme copriranno questo argomento più in dettaglio; comprendere le architetture a strati è un buon punto di partenza, anche perché i due stili sono spesso combinati.

### Shared Dataspace Architecture (concetto)
**Componenti infrastrutturali**: client e database. **Pattern di interazione**: Request-Response (il client legge/scrive dati da/verso il database); Publish-Subscribe (supporto per notifiche asincrone di cambiamenti nei dati, supporto per lo streaming di grandi risultati di query). **Vincoli**: i client eseguono solo operazioni CRUD sul database. **Esempi**: Oracle JavaSpaces, IBM TSpaces, GigaSpaces XAP.

**Pro**: comunicazione disaccoppiata, coordinamento semplificato (processi diversi possono coordinarsi senza conoscersi a vicenda), scalabilità (componenti possono essere aggiunti/rimossi senza impattare gli altri), fault tolerance (se un componente fallisce, gli altri possono continuare a operare), basso accoppiamento, elaborazione asincrona.

**Contro**: overhead di prestazioni (accedere a uno spazio condiviso può introdurre latenza), sfide di consistenza dei dati (specialmente con accesso concorrente), problemi di concorrenza (race condition e altri problemi nella gestione di accessi/modifiche multiple ai dati condivisi), visibilità limitata (più difficile tracciare/debuggare il flusso di dati e interazioni), complessità nella gestione dei dati (pulizia dei dati obsoleti, gestione dello spazio), singolo punto di fallimento.

**Opinione personale del docente**: le architetture shared dataspace hanno senso solo in poche nicchie — es. nell'elaborazione dati distribuita, dove il carico computazionale è condiviso tra molti nodi; es. quando lo stato del sistema distribuito è condiviso tra la maggior parte/tutti i nodi e sono necessari aggiornamenti concorrenti, come nei database distribuiti, nei file system distribuiti, o nei videogiochi multiplayer non in tempo reale.

## Feature che impattano il design dei sistemi distribuiti

Queste feature impattano l'infrastruttura, i pattern di interazione, o l'architettura dei sistemi distribuiti: 1. Redundancy, 2. Failover, 3. Checkpoint e Rollback Recovery, 4. Consensus, 5. Heart-beat, 6. Timeout e Retry, 7. Authorization e Authentication, 8. Data Partitioning.

### Redundancy (ridondanza)
**Cosa**: dati (copie su più nodi), servizi (più istanze dello stesso servizio su nodi diversi), hardware (più computer, dispositivi di storage, componenti di rete). **Perché**: fault tolerance (il sistema resta operativo anche se alcuni componenti falliscono, evitando anche perdita di dati), availability (distribuire il carico su più nodi), scalability (più facile scalare su/giù al variare del carico). **Come**: replication (copiare dati/servizi su più nodi); [data] sharding (dividere i dati in parti più piccole distribuite su più nodi — quando tutti i nodi hanno tutti i dati si chiama replicazione, quando ogni nodo ha solo una parte dei dati si chiama sharding). **Implicazioni**: replicazione dei dati → problemi di consistenza → algoritmi di consenso O replicazione master-slave; replicazione dei servizi → problemi di load balancing → infrastruttura più complessa; replicazione dei servizi → problemi di gestione dello stato → server stateless + database stateful.

### Failover
**Cosa**: active-passive failover (il nodo di backup diventa attivo quando il primario fallisce); active-active failover (tutte le repliche sono attive, e il traffico viene reindirizzato in caso di fallimento). **Perché**: fault tolerance e availability (il sistema resta operativo anche se un componente fallisce). **Come**: load balancer o proxy per reindirizzare il traffico verso il/i nodo/i di backup. **Implicazioni**: stesse della replicazione dei servizi; serve un meccanismo per rilevare i fallimenti, es. heart-beat.

### Checkpoint e Rollback Recovery
**Cosa**: checkpoint (salvare lo stato di un processo a intervalli regolari — simile ai backup, ma più comunemente automatico); rollback recovery (in caso di fallimento, il sistema può tornare all'ultimo stato noto buono — di nuovo, con enfasi sull'automatico). **Perché**: fault tolerance (può essere difficile prevenire alcune situazioni negative, quindi questo è un modo per recuperare quando accadono). **Come**: (1) progettare il sistema per fare snapshot del proprio stato e ripristinarli automaticamente in caso di fallimento; (2) progettare il sistema per tracciare le variazioni (anziché gli stati) e calcolare gli stati dalle variazioni, es. Command Query Responsibility Segregation (CQRS). **Implicazioni**: richiede decisioni di modellazione, architetturali e infrastrutturali ad hoc.

### Consensus
**Cosa**: un protocollo per garantire che alcuni nodi (tipicamente server o database) in un sistema distribuito concordino su una decisione comune (es. "quale operazione eseguire sui dati" o "chi eleggere come leader"), anche in caso di fallimenti (es. crash: un nodo smette di rispondere; fallimenti bizantini: un nodo invia informazioni sbagliate, per errore o deliberatamente). **Perché**: consistency (garantisce che i nodi abbiano la stessa vista sui dati), fault tolerance (garantisce che il sistema continui a operare anche se alcuni nodi falliscono), data redundancy. **Come**: protocolli Byzantine Fault Tolerant (BFT), es. PBFT; protocolli Crash Fault Tolerant, es. Paxos, Raft. **Implicazioni**: complessità (il design è più complesso, es. i client potrebbero dover sapere quali repliche contattare), latenza (dal punto di vista dei client, dovuta al consenso in corso tra richiesta e risposta).

### Heart-beat, Timeout, Retry
**Cosa**: gli heart-beat sono segnali periodici inviati tra nodi per assicurarsi che siano vivi e responsivi — se un nodo smette di inviare heart-beat entro il periodo previsto, viene considerato morto (il segnale è un messaggio quasi vuoto: conta solo la sua ricezione). **Timeout**: la quantità di tempo necessaria per marcare localmente un'operazione remota come fallita (es. nodo come irraggiungibile). **Retry**: tipicamente un singolo fallimento non basta (es. timeout breve, sfortuna) quindi è meglio riprovare alcune volte — max retries (numero massimo di tentativi prima di considerare un fallimento effettivo), delay (tempo di attesa prima di riprovare, può essere variabile, cf. exponential back-off). **Perché**: fault tolerance — meccanismo base per rilevare i fallimenti, per poter reagire il prima possibile. **Come**: (1) i nodi mantengono una connessione aperta tra loro, inviando dati periodicamente (alternativamente, si scambiano messaggi senza connessione; alcune applicazioni hanno questa feature integrata, altre richiedono design ad hoc); (2) timeout + soglia di retry + delay di retry per marcare i nodi come irraggiungibili; (3) decidere cosa fare a seconda di quali e quanti nodi sono irraggiungibili (es. priorità a consistency o ad availability?). **Implicazioni**: design e implementazione più complessi (e robusti); nota: utile anche quando sono in uso protocolli di rete affidabili (es. TCP).

### Authorization e Authentication
**Cosa**: (1) Authentication: permettere ai nodi di un sistema distribuito di riconoscersi e distinguersi tra loro (include i client degli utenti, cioè identificare gli utenti legittimi del sistema); (2) Authorization: un server che concede (o nega) l'accesso a risorse a seconda dell'identità/ruolo del client autenticato. **Perché**: access control (controllare chi può/non può fare cosa), monitoring (registrare chi sta facendo cosa), prerequisito per molti aspetti di cyber-security. **Come**: (1) permettere al sistema di registrare utenti/ruoli legittimi, dotandoli di credenziali; (2) uno o più server incaricati di generare token di sessione su richiesta del client; (3) i nodi autenticati includono i token di sessione in ogni interazione successiva; (4) i nodi sanno verificare che i token di sessione siano validi e genuini; (5) i nodi applicano il controllo degli accessi a seconda del contenuto del token. **Implicazioni**: richiede un server di autenticazione (possibilmente supportato da un database), richiede crittografia per gestire i token di sessione, richiede di progettare/implementare un meccanismo di controllo degli accessi, es. ACL, RBAC.

### Data Partitioning
**Cosa**: cloni della stessa funzionalità vengono deployati, ciascuno coprendo una partizione della regione geografica dove il sistema opera (es. amazon.uk vs amazon.it, google.fr vs google.com); i cloni non sono consistenti tra loro, perché i dati sono partizionati su base geografica; esistono meccanismi per indirizzare gli utenti verso la partizione più vicina. **Perché**: fault tolerance (un fault in una regione non si propaga alle altre), availability e load balancing (approccio divide-and-conquer per servire gli utenti), a volte è un adempimento obbligatorio per regolamento (cf. GDPR, art. 44). **Come**: la stessa infrastruttura viene deployata in luoghi diversi; possono esistere meccanismi per connettere i cloni del sistema (nascondendo il partitioning agli utenti). **Implicazioni**: le procedure di deployment dovrebbero essere riproducibili e parametriche, possibilmente automatizzate; i cloni dovrebbero essere progettati per essere consapevoli dell'esistenza degli altri cloni.
