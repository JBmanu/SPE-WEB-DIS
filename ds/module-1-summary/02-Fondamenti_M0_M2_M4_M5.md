# Fondamenti dei Sistemi Distribuiti (M0, M2, M4, M5)

## M0 — Why Distributed Systems? (Perché i sistemi distribuiti)

### Computazione e interazione pervasive
Oggi i sistemi computazionali sono **pervasivi**: sono ovunque e condizionano ogni aspetto della vita quotidiana. Viviamo immersi in una "bolla computazionale" in continua espansione, fatta di computazioni distribuite e concorrenti (controllate/innescate oppure autonome) a casa, in auto, sul lavoro, in ospedale, a scuola. Quasi ogni sistema computazionale di oggi è dotato di tecnologie ICT per interagire con altri sistemi: i dispositivi interagiscono continuamente con gli umani, tra loro, e con l'ambiente fisico circostante.

### Distribuzione: spaziale e temporale
La natura fisica dei sistemi artificiali aggiunge complessità ai componenti/sistemi computazionali in termini di:
- **distribuzione spaziale**: cosa è spazialmente distribuito? Le unità computazionali, i canali di comunicazione, i dati/informazione/conoscenza (e le loro rappresentazioni), sensori e attuatori. Il confine tra sistema e ambiente circostante è spazialmente sparso.
- **distribuzione temporale**: gli eventi accadono, ma non più in una sequenza chiaramente ordinata; gli eventi sono dispersi e la relazione temporale "prima/dopo" non si applica in modo banale a molte coppie di eventi. Si perde l'unità spazio-temporale del sistema: non esiste più una nozione di "tempo di sistema" né di "posizione di sistema".

Di conseguenza, molte assunzioni classiche sui sistemi non valgono più: gli eventi non costituiscono più un insieme totalmente ordinato (in generale, solo un ordinamento parziale è ammissibile), e l'interazione tra componenti non richiede più la compresenza spazio-temporale.

### Perché costruire sistemi distribuiti? Vantaggi e svantaggi

| Criterio | Sistema centralizzato | Sistema distribuito |
|---|---|---|
| Costo economico | basso | alto |
| Disponibilità | bassa | alta |
| Complessità | bassa | alta |
| Consistenza | semplice | difficile |
| Scalabilità | scarsa | buona |
| Tecnologia | omogenea | eterogenea |
| Sicurezza | alta | bassa |

I motivi principali per cui servono i sistemi distribuiti sono: ambienti geograficamente distribuiti, velocizzazione della computazione, condivisione di risorse, tolleranza ai guasti.

### Conseguenza per il corso
Concepire e costruire sistemi artificiali oggi significa, di fatto, occuparsi di sistemi distribuiti. Modellare sistemi distribuiti comporta nuovi problemi teorici (oggetto di studio dell'informatica/computer science), mentre costruirli comporta nuovi problemi pratici (oggetto di studio dell'ingegneria informatica). Il corso, di conseguenza, mescolerà aspetti teorici/metodologici e tecnologici/pratici fin dall'inizio.

---

## M2 — Roots of Distributed Systems (Le radici epistemologiche)

Questo modulo affronta domande di fondo (cos'è la scienza, cos'è il calcolo, cos'è un sistema) per dare una base solida e condivisa su cui costruire il resto del corso, dato che molti risultati fondamentali sui sistemi distribuiti sono **risultati di impossibilità** (teoremi), e i teoremi richiedono un'ontologia scientifica ben definita, una notazione condivisa e non ambigua, e una nozione comune di cosa sia una dimostrazione.

### Cos'è la scienza?
La scienza è il perseguimento e l'applicazione di conoscenza e comprensione del mondo naturale e sociale, seguendo una metodologia sistematica basata sull'evidenza. La scienza osserva **fenomeni** (fatti osservabili) e cerca i **noumeni** (le "cose in sé", secondo Kant) che danno ragione ai fenomeni: i modelli che spiegano i fatti. Tra più modelli possibili, si preferiscono quelli con meno assunzioni e più fatti spiegati. La scienza, oltre a **spiegare** (explanation), deve anche **predire** (prediction) fenomeni non ancora osservati: la capacità predittiva è parte essenziale di ciò che rende una teoria scientifica.

### Cos'è l'informatica (Computer Science)?
Seguendo Newell, Perlis e Simon: ovunque ci siano fenomeni, può esistere una scienza per descriverli e spiegarli; poiché esistono i computer, l'informatica è lo studio dei computer. Tuttavia il termine "computer" non è ben definito e il suo significato cambia nel tempo (come è accaduto per altre scienze: l'astronomia non comprendeva originariamente lo studio dei gas interstellari, la fisica non includeva la radioattività). La storia dell'informatica mostra una progressione di definizioni: studio del calcolo automatico (anni '40), elaborazione dell'informazione (anni '50), fenomeni che circondano i computer (anni '60), ciò che può essere automatizzato (anni '70), studio del calcolo (anni '80), studio dei processi di informazione naturali e artificiali (anni 2000).

Cosa fa un computer? Calcola (computes). Quindi: un computer è una macchina che calcola; i sistemi computazionali sono sistemi fatti di computer; la **computazione** è l'oggetto di studio centrale dell'informatica, il noumeno alla base della disciplina.

### Cos'è il calcolo (computation)?
Diverse visioni co-esistono:
- **Calcolo come manipolazione di simboli**: una computazione è una sequenza di passi semplici e ben definiti che portano alla soluzione di un problema; problema e soluzione devono essere codificati come simboli, e un passo è una manipolazione di simboli che trasforma un insieme di simboli in un nuovo insieme.
- **Calcolo come processo**: l'essenza del calcolo si trova in qualunque forma di processo; quindi il calcolo è un processo, e ogni processo è anche un calcolo.

Quando si definisce il calcolo, bisogna tener conto che: il modello computazionale conta; molte computazioni rilevanti sono naturali; molte sono non terminanti; molte sono continue; il "pensiero computazionale" può essere definito.

### Macchina, macchina computazionale
Una **macchina** è un dispositivo con uno scopo unico che aumenta o sostituisce lo sforzo umano/animale per compiti fisici; ha un ingresso (input), un'uscita (output) e un dispositivo che trasforma/modifica/trasmette forze e movimenti. Una **macchina computazionale** è una macchina diversa: il suo compito è cognitivo invece che fisico, il suo input/output sono fondamentalmente informazione. Per non legarsi a uno specifico modello computazionale (Turing, von Neumann), conviene astrarre dalla "macchina" e concentrarsi sul **processo computazionale**.

### Ontologia di base per i sistemi distribuiti
- **Processo computazionale**: l'unità elementare assunta essere sequenziale; ha input/output e un **contesto** (computing machine, risorse, tempo, spazio).
- **Contesto** della computazione: serve a rappresentarlo ogni volta che la macchina computazionale, le risorse, il tempo o lo spazio sono rilevanti per modellare/comprendere la dinamica del processo. Tipi di computazione: **timed** (il tempo è rilevante), **spatial** (lo spazio è rilevante), o più in generale **situated** (l'intero ambiente, combinazione di tempo, spazio e risorse, è rilevante).
- **Sistema computazionale (interagente)**: in un sistema computazionale, due o più processi computazionali si **comportano** (calcolando) e **lavorano insieme** (interagendo).
- Il contesto può essere rappresentato come un contesto separato per ciascun processo, come un unico contesto condiviso per l'intero sistema, oppure come combinazione delle due cose; questa scelta definisce il tipo di sistema computazionale: parallelo, concorrente o distribuito.

### Parallelo vs. Concorrente vs. Distribuito — le definizioni di riferimento

Questo è uno dei punti **più importanti e citati più volte** nel corso (ripreso anche in M6):

- **Calcolo parallelo**: dato un sistema computazionale, si parla di calcolo parallelo quando il **contesto temporale è lo stesso per tutti** i processi computazionali (stesso T per tutti).
- **Calcolo concorrente**: si parla di calcolo concorrente quando **almeno due processi hanno un contesto temporale diverso** (T ≠ T′ per processi diversi).
- **Calcolo distribuito**: si parla di calcolo distribuito quando **almeno due processi hanno un contesto spaziale diverso** (S ≠ S′ per processi diversi).

Da notare che questi concetti sono **ortogonali**: si può avere calcolo distribuito-parallelo (S ≠ S′, stesso T) oppure calcolo distribuito-concorrente (S ≠ S′ e T ≠ T′).

Nella letteratura, il termine "parallel computing" si riferisce tipicamente a processi non sequenziali dove più computazioni avvengono nello stesso istante (richiede tipicamente architetture multi-core, usato per problemi scientifici/matematici intensivi). Il termine "concorrenza" ha due accezioni: **interleaving** (gli eventi di processi concorrenti separati possono avvenire in qualsiasi ordine relativo — le relazioni temporali/causali non sono rilevanti) e **true concurrency** (si usano ordinamenti parziali per catturare esplicitamente le relazioni temporali/causali tra eventi). "Distributed computing" si riferisce tipicamente a processi computazionali asincroni situati su dispositivi diversi e comunicanti tramite scambio di messaggi (no memoria condivisa); "distributed systems" si riferisce tipicamente a una collezione di dispositivi che lavorano insieme tramite una connessione di rete e che appaiono agli utenti come un singolo sistema coerente.

---

## M4 — Definitions & Goals (Definizioni e obiettivi)

### Definizioni classiche di sistema distribuito

1. **Definizione "dell'utente" / del computer scientist** (Tanenbaum & van Steen): un sistema distribuito è *una collezione di computer indipendenti che appare ai suoi utenti come un singolo sistema coerente*. È una definizione osservazionale, a posteriori dal punto di vista ingegneristico.

2. **Definizione "dell'ingegnere" / del computer engineer**: un sistema distribuito è *una collezione di entità computazionali autonome concepita come un singolo sistema coerente dal suo progettista*. È una definizione costruttiva, a priori.

3. **Definizione di Coulouris et al.**: un sistema distribuito è *uno in cui componenti situati su computer in rete comunicano e coordinano le proprie azioni solo passandosi messaggi*. Questa definizione enfatizza la distribuzione fisica dei componenti, il ruolo dell'interazione (comunicazione e coordinamento basati sulla rete), e il disaccoppiamento in termini di controllo.

**Osservazioni comuni**: un sistema distribuito è fatto di molteplici componenti (entità computazionali indipendenti/autonome: computer, microprocessori, ecc., senza assunzioni sulla loro natura individuale — eterogeneità ammessa); e può essere visto come un singolo sistema coerente secondo la vista dell'utente, dell'ingegnere, o entrambe — quindi serve **coerenza** sopra la molteplicità e l'eterogeneità.

### Il problema: lavorare come uno, apparire come uno
Per ottenere **coerenza**, molte entità autonome devono collaborare (lavorare insieme come un sistema coerente). Per ottenere **uniformità**, molte entità eterogenee devono amalgamarsi (apparire insieme come un sistema uniforme). La soluzione architetturale classica è il **middleware**: uno strato che si estende su più macchine e offre a ogni applicazione la stessa interfaccia, nascondendo differenze di tecnologia, struttura e comportamento.

### Perché è difficile costruire un sistema distribuito: i falsi presupposti (fallacies)
Secondo L. Peter Deutsch, gli sviluppatori alle prime armi assumono falsamente che:
1. la rete sia affidabile;
2. la rete sia sicura;
3. la rete sia omogenea;
4. la topologia non cambi;
5. la latenza sia zero;
6. la banda sia infinita;
7. il costo di trasporto sia zero;
8. esista un solo amministratore.

Tali assunzioni false sono tipicamente all'origine degli errori nell'ingegneria dei sistemi distribuiti, e riguardano proprietà uniche dei sistemi distribuiti (affidabilità, sicurezza, eterogeneità e topologia della rete, latenza, banda, costi di trasporto, domini amministrativi) che semplicemente non si presentano nell'ingegneria di sistemi non distribuiti.

### I cinque obiettivi (goal) di un sistema distribuito

#### 1. Disponibilità delle risorse (Resource Availability)
Una buona ragione per costruire un sistema distribuito è rendere disponibili risorse fisicamente distribuite, come se appartenessero a un unico sistema. Una **risorsa** è qualunque cosa connessa a un sistema computazionale che chiunque possa legittimamente usare (stampanti, scanner, dispositivi di storage, sensori distribuiti...). Rendendo possibile l'interazione tra utenti e risorse, i sistemi distribuiti abilitano condivisione, scambio di informazioni e collaborazione (es. i sistemi grid).

#### 2. Trasparenza (Transparency)
Nascondere proprietà non rilevanti dei componenti e della struttura del sistema si chiama trasparenza; offre agli utenti un livello di astrazione più alto. Esistono diversi tipi di trasparenza:
- **access transparency**: nasconde differenze nella rappresentazione dei dati e nell'accesso alle risorse.
- **location transparency**: nasconde la posizione di una risorsa (richiede un sistema di identificatori logici non legati alla posizione fisica, come gli URL).
- **migration transparency**: nasconde il cambio di posizione di una risorsa, senza perdere coerenza né funzionalità.
- **relocation transparency**: nasconde lo spostamento di una risorsa anche mentre questo è in corso (versione "online" della migration transparency).
- **replication transparency**: nasconde il fatto che una risorsa sia replicata; tutte le repliche devono essere accessibili nello stesso modo trasparente e apparire come la stessa cosa.
- **concurrency transparency**: nasconde la condivisione concorrente di una risorsa da parte di più utenti, garantendo comunque la consistenza dello stato.
- **failure transparency**: maschera i guasti delle risorse, sotto assunzioni realistiche. È un problema difficile: come distinguere una risorsa morta da una semplicemente lenta? Il "silenzio" di una risorsa può essere dovuto a lentezza, scelta deliberata, guasto della risorsa o guasto di rete.

Nascondere completamente la distribuzione, però, non è sempre l'idea migliore (es. fusi orari diversi possono causare situazioni paradossali come un download che finisce prima di iniziare, oppure può essere utile sapere dove si trova fisicamente un server). Esiste quindi un **trade-off tra trasparenza e informazione**, che ogni ingegnere deve calibrare tenendo conto di prestazioni, comprensibilità, ecc.

#### 3. Apertura (Openness)
Un sistema è aperto quando può lavorare con un numero e un tipo di componenti che non è fissato una volta per tutte in fase di progettazione. I sistemi aperti sono progettati per essere aperti, e proprio per questo sono fondamentalmente imprevedibili: per progettare sull'imprevedibilità servono elementi prevedibili condivisi a priori (es. regole standard per sintassi/semantica dei servizi, scambio di messaggi). Le interfacce (IDL - Interface Definition Languages) catturano la sintassi (spesso non la semantica né il protocollo). Proprietà non funzionali rilevanti per i sistemi aperti: **interoperabilità** (facilità di far lavorare insieme componenti/sistemi diversi su basi standard), **portabilità** (facilità di spostare un'applicazione su un sistema distribuito diverso mantenendola funzionante), **estensibilità** (facilità di aggiungere nuovi componenti/funzionalità).

#### 4. Scalabilità (Scalability)
Spesso non si possono fare assunzioni realistiche sulla "dimensione" effettiva di un sistema distribuito in fase di progettazione; tale dimensione può riguardare il numero di componenti, ma anche la distribuzione geografica. Dimensioni della scalabilità: un sistema scala quando cresce il numero di utenti/risorse, quando si estende la distribuzione geografica, quando si estende su un numero crescente di domini amministrativi. La scalabilità è un problema ogni volta che una qualunque di queste dimensioni cambia ordine di grandezza.

Problemi di scalabilità tipici: servizi centralizzati (un solo server per tutti gli utenti), dati centralizzati (un solo database), algoritmi centralizzati (si assume che l'informazione completa sia disponibile in un solo posto). La centralizzazione, pur a volte necessaria (per sicurezza, normativa, o perché l'algoritmo centralizzato è il più efficiente teoricamente), ostacola la scalabilità e va generalmente evitata. Negli **algoritmi decentralizzati**, nessuna macchina ha informazione completa sullo stato del sistema, le macchine decidono solo in base a informazione locale, il guasto di una macchina non rovina l'algoritmo, e non c'è assunzione implicita dell'esistenza di un orologio globale.

Tre tecniche base per la scalabilità geografica:
- **nascondere la latenza di comunicazione**: tipicamente con comunicazione asincrona (la richiesta viene inviata e l'applicazione non resta in attesa, ma viene interrotta quando arriva la risposta); se la comunicazione asincrona non è praticabile (es. applicazioni web dove l'utente aspetta la risposta), si possono spedire frammenti di codice da eseguire localmente (es. JavaScript o Java Applet);
- **distribuzione**: prendere un componente, dividerlo in parti, e spargere le parti nel sistema (esempio: il DNS, organizzato gerarchicamente in domini divisi in zone non sovrapposte, ciascuna gestita da un singolo server);
- **replicazione**: copiare una risorsa dalla posizione originale a una posizione vicina ai (potenziali) utenti, per migliorare disponibilità e ridurre la latenza percepita. Il **caching** è una forma speciale di replicazione: la differenza è che il caching è una decisione del client di una risorsa, mentre la replicazione è una decisione del proprietario della risorsa.

La duplicazione di una risorsa introduce sempre problemi di **consistenza** (inevitabili in un setting distribuito): il punto chiave è quanta inconsistenza un sistema può tollerare, e come nasconderla a utenti e componenti (vedi il modulo M3 sulla replicazione e consistenza).

#### 5. Situatedness (un quinto goal, non classico)
La situatedness è la proprietà dei sistemi di essere immersi nel proprio ambiente, cioè capaci di percepire e produrre (in modo tempestivo) cambiamenti nell'ambiente, gestendo opportunamente gli eventi che vi avvengono. I sistemi mobili, adattivi e pervasivi hanno enfatizzato il ruolo chiave della situatedness per i sistemi computazionali odierni. È strettamente legata alla **context-awareness**: i sistemi sono sempre più condizionati dalla loro natura fisica, e ciò richiede consapevolezza almeno del **tessuto spazio-temporale** (contesto temporale e spaziale) e, più in generale, dell'ambiente in cui sono immersi (struttura, risorse disponibili, possibili problemi). Particolarmente rilevanti oggi sono i **knowledge-intensive environments (KIE)**, dove l'accesso, la comprensione e l'eventuale immissione di conoscenza distribuita nell'ambiente sono essenziali per le attività del sistema.

La distribuzione fisica dei sistemi computazionali è essenziale per far fronte alla natura distribuita di molti ambienti operativi e alla necessità di computazioni situate; quando i requisiti del sistema impongono computazioni situate in un ambiente fisico distribuito, i **sistemi distribuiti situati** sono l'unica via percorribile (es. scenari di disaster recovery, monitoraggio ambientale, gestione di folle, eventi live). Apertura e scalabilità restano essenziali anche qui, per far fronte rispettivamente all'imprevedibilità e alla crescente complessità degli ambienti.

### Conclusioni del modulo
Esistono diverse definizioni di sistema distribuito, convergenti tra loro. I sistemi distribuiti sono facili da costruire, ma proprio per questo facili da costruire male. I goal di progettazione classici includono disponibilità delle risorse, trasparenza, apertura e scalabilità; ma oggi il tema centrale è soprattutto robustezza, affidabilità e tolleranza ai guasti.

---

## M5 — Sorts of Distributed Systems (Tipologie di sistemi distribuiti)

Storicamente si sono sviluppate **tre classi fondamentali** di sistemi distribuiti, generate dall'evoluzione nel tempo dei bisogni e delle risorse disponibili.

### 1. Distributed Computing Systems
Caratteristica principale: usare una moltitudine di computer distribuiti per svolgere compiti ad alte prestazioni. Due sottoclassi:
- **Cluster computing systems**: una collezione di workstation/PC simili, che eseguono lo stesso sistema operativo, situati nella stessa area, interconnessi tramite una LAN ad alta velocità. Motivazione: il rapporto prezzo/prestazioni dei computer rende più economico costruire un supercomputer mettendo insieme tanti computer semplici piuttosto che comprarne uno ad alte prestazioni; inoltre la robustezza è maggiore e manutenzione/espansione sono più semplici. Uso tipico: calcolo parallelo (un singolo programma intensivo eseguito in parallelo su più macchine). Esempio: i cluster Beowulf (basati su Linux, con un nodo master che controlla/accede ai nodi di calcolo). I sistemi cluster sono tipicamente **omogenei** (stessi computer, stesso OS, stessa rete locale).
- **Grid computing systems**: risorse di organizzazioni diverse vengono messe insieme per promuovere collaborazione tra individui/gruppi/istituzioni, superando i confini organizzativi, nella forma di una "organizzazione virtuale" che accede a risorse messe a disposizione dalle organizzazioni partecipanti (server, database, dischi...). I sistemi grid sono per natura **eterogenei** e attraversano domini amministrativi diversi. Architettura a strati: fabric layer (interfaccia alle risorse locali), resource layer (gestione delle singole risorse, es. controllo accessi), connectivity layer (protocolli di comunicazione e sicurezza per le transazioni grid), collective layer (gestione dell'accesso a risorse multiple: discovery, allocazione...), application layer (applicazioni che operano nell'organizzazione virtuale).

### 2. Distributed Information Systems
Origine: la necessità di integrare molte applicazioni in rete separate, con problemi strutturali di interoperabilità. Due tipologie:
- **Transaction Processing Systems**: più server non interoperanti condivisi da più client, con query e transazioni distribuite. Le operazioni sui database vengono tipicamente eseguite come **transazioni**, dotate delle proprietà **ACID**: **A**tomicità (i passi della transazione avvengono in modo invisibile dall'esterno), **C**onsistenza (la transazione non viola gli invarianti del sistema), **I**solamento (le transazioni concorrenti non interferiscono tra loro), **D**urabilità (una volta che la transazione fa commit, i suoi effetti sono permanenti). Una **transazione annidata (nested transaction)** è composta da un certo numero di sotto-transazioni, e il nesting può essere arbitrariamente profondo; tutta la transazione annidata deve esibire le proprietà ACID, quindi se una sotto-transazione fallisce, tutte le sotto-transazioni fino a quel punto vanno annullate, anche se avevano già fatto commit (la durabilità si riferisce solo alla transazione di livello superiore). Una soluzione comune è la "copia privata del mondo": le transazioni operano su una copia dei dati, propagando gli effetti solo al successo finale. Una prima soluzione storica è il **TP monitor** (transaction processing monitor), che permette alle applicazioni di accedere a più server di database con semantica transazionale.
- **Enterprise Application Integration (EAI)**: l'integrazione deve avvenire non solo a livello dati ma anche a livello applicativo (integrazione di processo, oltre che di dati): le applicazioni devono interagire e comunicare in modo significativo tra loro, tipicamente tramite middleware come facilitatore della comunicazione.

### 3. Distributed Pervasive Systems
Caratteristica: l'instabilità è la condizione di default (dispositivi mobili con batteria e connettività di rete intermittente). Caratteristiche principali: un sistema pervasivo distribuito è parte del nostro ambiente circostante, e generalmente manca di controllo amministrativo umano. Tre requisiti fondamentali (secondo Grimm et al.): **abbracciare i cambiamenti contestuali** (un dispositivo deve essere costantemente consapevole che il proprio ambiente può cambiare in qualsiasi momento), **incoraggiare la composizione ad hoc** (i dispositivi vengono usati in modi diversi da utenti diversi), **riconoscere la condivisione come default** (l'informazione deve essere facile da leggere, salvare, gestire e condividere).

Esempi di sistemi pervasivi:
- **Home systems**: costruiti attorno alle reti domestiche; non si può chiedere alle persone di fare gli amministratori di rete competenti, quindi questi sistemi devono essere essenzialmente **self-configuring e self-maintaining**; gestiscono anche grandi quantità di informazioni personali eterogenee.
- **Health care systems**: sistemi personali costruiti attorno a una Body Area Network, minimizzando l'impatto sulla persona (es. non limitandone i movimenti); domande aperte: dove e come salvare i dati monitorati, come prevenire la perdita di dati cruciali, quale infrastruttura serve per generare/propagare allarmi, come dare feedback online ai medici, come garantire estrema robustezza del sistema di monitoraggio, quali sono i problemi di sicurezza.
- **Sensor networks**: nuvole di sensori distribuiti spazialmente (da decine a migliaia di nodi), che acquisiscono, processano e trasmettono informazioni ambientali. Vista possibile: database distribuiti, interrogabili nel tempo. Due estremi architetturali (entrambi negativi, per consumo eccessivo di rete o di energia dei nodi): i sensori inviano solo dati senza cooperare, oppure fanno tutta la computazione localmente e restituiscono solo i risultati. Soluzione: **in-network data-processing**, organizzando i sensori in una struttura ad albero e aggregando i risultati ai vari livelli dell'albero, con domande aperte su come costruire dinamicamente l'albero, come gestire/controllare l'aggregazione, e cosa succede quando un collegamento di rete si guasta.

### Sistemi distribuiti oggi
La crescente complessità dei sistemi distribuiti odierni è gestibile solo grazie a sforzi di comunità (community efforts), particolarmente per i componenti dell'infrastruttura critica (software open source come default). È fondamentale tenere d'occhio i progetti della comunità disponibili, parteciparvi se possibile, e capire come scegliere i componenti migliori per i propri sistemi. Esempi di fondazioni rilevanti: Apache Software Foundation (ASF), Cloud Native Computing Foundation (CNCF, parte della Linux Foundation, promotrice di tecnologie cloud-native come container, service mesh, microservizi, infrastruttura immutabile e API dichiarative — include progetti come Kubernetes e Prometheus), Free Software Foundation (FSF), Python Software Foundation (PSF).

### Conclusioni del modulo
Esistono tipologie diverse di sistemi distribuiti, che raccontano grosso modo la storia della loro evoluzione (computing systems → information systems → pervasive systems); a seconda dell'ambiente, degli obiettivi e della tecnologia disponibile, si usano modelli, metodologie e tecnologie diverse. Oggi la complessità dei sistemi distribuiti fa sì che essi prendano in prestito caratteristiche da tutte e tre le classi fondamentali.
