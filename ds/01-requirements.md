# Requisiti per l'Esame e il Progetto — Distributed Systems / Distributed Software Systems

> Questo file riassume in modo operativo cosa serve sapere/fare per superare l'esame, e cosa conviene aggiungere per ottenere un punteggio elevato nel progetto (obiettivo: 30L). Si basa sulla struttura dell'esame descritta in A0 e sui contenuti tecnici di tutte le sezioni del corso.

## Come funziona l'esame (promemoria da A0)

L'esame consiste nella **discussione orale di un progetto**. Prima della discussione, gli **artefatti del progetto** (documentazione + codice) devono superare un controllo preliminare dei docenti/tutor: solo dopo l'approvazione si può sostenere la discussione. Il progetto:
- deve riguardare, o derivare da, un argomento specifico trattato nel corso (teorico, tecnologico o metodologico);
- può essere individuale o di gruppo;
- deve essere concordato con il professore e/o il tutor (pertinenza + fattibilità);
- deve dimostrare **comprensione dei sistemi distribuiti** — questa è la responsabilità primaria dello studente, e viene verificata nella discussione finale.

Non esiste un programma d'esame "a domande chiuse": la valutazione è centrata sulla capacità di collegare esplicitamente il progetto ai concetti del corso, e di rispondere a fondo su di essi in sede di discussione orale.

## Requisiti obbligatori — i concetti che DEVONO essere padroneggiati

Questa è la lista dei concetti fondamentali, organizzati per macro-area, che con altissima probabilità vengono richiesti durante la discussione orale, indipendentemente dal tema specifico del progetto, perché costituiscono l'ossatura teorica dell'intero corso.

### 1. Definizioni di base e ontologia (M0, M2, M4)
- Le tre definizioni classiche di sistema distribuito (Tanenbaum & van Steen, definizione "dell'ingegnere", Coulouris et al.).
- La distinzione formale tra **parallelo, concorrente e distribuito**, basata sui contesti temporale (T) e spaziale (S) dei processi — è uno dei concetti più citati e ripreso in più moduli: saperla esporre con precisione è quasi certamente richiesto.
- Le **8 fallacies** di Deutsch sui sistemi distribuiti.
- I **5 goal** di un sistema distribuito: resource availability, transparency (con i 7 sottotipi: access, location, migration, relocation, replication, concurrency, failure transparency), openness, scalability (con le 3 tecniche: nascondere la latenza, distribuzione, replicazione), situatedness.

### 2. Dependability (M1)
- Il modello fault → error → failure (catena delle minacce).
- Le classificazioni dei fault (per source, intent, duration, manifestation, reproducibility, relationship).
- I quattro attributi: availability, reliability, safety, maintainability — e la differenza concettuale tra availability e reliability (saperla spiegare con un esempio è un classico).
- Le formule: MTTF, MTTR, MTBF, Availability = MTTF/(MTTF+MTTR), Reliability = e^(-λΔt).
- I quattro mezzi per ottenere dependability (avoidance, detection, removal, tolerance) e i tre tipi di ridondanza.

### 3. Replicazione e Consistenza (M3)
- Il dilemma replicazione-consistenza e perché non si può avere consistenza forte "gratis" in un sistema distribuito.
- I modelli di consistenza data-centric (sequential, causal) e client-centric (eventual, monotonic reads/writes, read-your-writes, writes-follow-reads) — saper distinguere e dare un esempio per ciascuno.

### 4. CAP Theorem (C1)
- Enunciato preciso (C, A, P — al massimo due su tre).
- La dimostrazione (almeno l'intuizione: modello asincrono, partizione, scrittura in una partizione vs lettura nell'altra).
- ACID vs BASE, e perché molti sistemi reali scelgono BASE.
- Saper applicare il teorema a un caso concreto (un esempio è quasi garantito in sede di discussione, se il progetto tocca database distribuiti o microservizi).

### 5. Tempo logico e causalità (M6, C5)
- La relazione **happens-before** di Lamport e la nozione di eventi concorrenti.
- Gli **orologi scalari (Lamport)**: algoritmo, proprietà di consistenza (monotonicità), perché NON sono fortemente consistenti.
- I **vector clock**: algoritmo, perché garantiscono forte consistenza, come si confrontano due timestamp vettoriali.
- Questo è materiale molto "algoritmico" e quindi molto adatto a domande puntuali — ripassare gli esempi con i diagrammi delle slide.

### 6. Consenso distribuito (C3)
- Il problema dell'agreement in generale, e i suoi casi particolari (basic consensus, interactive consistency, generals problem, transaction commit).
- Il teorema di impossibilità **FLP**: enunciato preciso e perché è sorprendente (anche un solo crash failure in un sistema asincrono basta per rendere impossibile il consenso).
- **Paxos**: ruoli (proposer, acceptor, learner), le due fasi (prepare/promise, accept/commit), il quorum, perché serve un numero dispari di acceptor.
- State Machine Replication come concetto-ponte tra consenso e replicazione.

### 7. Checkpointing e Logging (C2)
- Stato globale consistente vs inconsistente vs non recuperabile (l'esempio bancario è molto didattico, saperlo riprodurre).
- Differenza tra protocollo di checkpointing bloccante (Tamir-Sequin) e non bloccante (Chandy-Lamport).
- Tipi di logging (pessimistic, optimistic, causal) e il problema dell'output commit.

### 8. Mobilità del codice (C6)
- Weak vs strong mobility, e perché la mobilità forte è più esigente.
- Sender-initiated vs receiver-initiated migration.
- Cloning vs migrating.

### 9. Blockchain e Smart Contract (C4)
Dato che è la sezione più estesa del corso (166 slide), è ragionevole aspettarsi che almeno una parte della discussione tocchi questi temi, specialmente se il progetto ha una qualunque componente di sistema distribuito decentralizzato:
- DLT vs BCT (DLT ⊃ BCT).
- State Machine Replication applicata alla blockchain, e perché la blockchain è "solo" un'istanza intelligente di SMR.
- Byzantine Fault Tolerance: l'esempio Alice/Bob/4th replica, e la formula f ≥ N/3.
- Proof-of-Work: enigma computazionale, longest chain rule, perché funziona (incentivi economici).
- PBFT come alternativa "permissioned" al PoW.
- Smart contract: definizione di Szabo, le 7 issue (specialmente re-entrancy, immutabilità, mancanza di pro-attività).

### 10. Architetture software (M8)
- I 4-5 stili architetturali (layered, object-based, data-centred, event-based, shared data-space) — saperli riconoscere in un sistema reale (utile per descrivere l'architettura del proprio progetto).

## Requisiti facoltativi — per punteggio extra e per puntare al 30L

Questi argomenti sono meno "core" ma rafforzano molto la valutazione se il progetto li tocca esplicitamente o se vengono menzionati con cognizione di causa durante la discussione.

### A. Collegamenti interdisciplinari espliciti
- Collegare esplicitamente la **process algebra** (M7bis: CCS, CSP, ACP, gli operatori +, ;, ∥, le leggi strutturali) a qualunque componente concorrente del progetto, anche solo per giustificare formalmente scelte di design — pochi studenti lo fanno, e impressiona molto in discussione.
- Mostrare di conoscere lo **spatial computing** (M7: le tre classi distributed/situated/spatial systems) se il progetto ha qualunque componente di localizzazione/IoT/AR.
- Citare correttamente la differenza fra **causalità interna ed esterna** (C5) se il progetto coinvolge eventi che attraversano il confine del sistema.

### B. Approfondimenti tecnologici concreti
- Conoscere a fondo (oltre Kubernetes) almeno una tecnologia concreta che implementa i concetti teorici: es. Raft per il consenso (alternativa più moderna e comprensibile di Paxos), etcd o ZooKeeper come servizi di coordinamento, Cassandra/DynamoDB per l'eventual consistency, Kafka per l'event-based architecture.
- Se il progetto usa Kubernetes (molto comune, dato il seminario incluso nel corso): saper spiegare esplicitamente come self-healing, autoscaling, e l'architettura control-plane/worker-node implementino i principi di fault tolerance e scalabilità visti a lezione — è esattamente il tipo di collegamento che i docenti chiedono.

### C. Risultati di impossibilità ulteriori
- Conoscere altri risultati di impossibilità oltre FLP e CAP (citati nella sezione C3: "Hundreds of impossibility results for distributed computing", Fich & Ruppert 2003) mostra una comprensione più matura del perché i sistemi distribuiti siano intrinsecamente difficili.

### D. Prospettiva critica e dibattito
- Saper discutere il trade-off Paxos vs Raft vs algoritmi più recenti (Egalitarian Paxos, ZAB) in termini di comprensibilità e prestazioni.
- Saper discutere criticamente le 7 issue degli smart contract (specialmente se il progetto tocca blockchain), mostrando consapevolezza dei limiti reali della tecnologia e non solo dei suoi vantaggi.
- Conoscere l'evoluzione del pensiero di Brewer sul CAP theorem (dalla congettura del 2000 alla rilettura del 2012) mostra capacità di seguire l'evoluzione di un dibattito scientifico, non solo di citare un teorema.

### E. Qualità della documentazione del progetto
- Documentare esplicitamente, per ciascuna scelta architetturale/tecnologica del progetto, **quale specifico concetto del corso** essa implementa o esemplifica (es. "il servizio X usa eventual consistency secondo il modello di M3 perché..."). Questo singolo accorgimento è probabilmente il modo più efficiente di guadagnare punti extra, perché rende immediatamente visibile ai docenti la comprensione richiesta, senza che debbano "scavare" per trovarla durante la discussione.
- Includere un breve confronto tra almeno due alternative tecnologiche/algoritmiche per una stessa scelta di design (es. "abbiamo scelto Raft invece di Paxos perché...") — dimostra capacità di valutazione critica, non solo applicazione meccanica.

## Checklist finale rapida

Prima della discussione orale, è consigliabile poter rispondere con sicurezza, senza guardare gli appunti, a tutte le seguenti domande:

1. Qual è la differenza tra sistema parallelo, concorrente e distribuito?
2. Cos'è il teorema CAP e come lo applicheresti al tuo progetto?
3. Cosa dice il teorema FLP, e perché è sorprendente?
4. Come funziona un vector clock, e perché un orologio scalare di Lamport non basta?
5. Quali sono i 5 goal di un sistema distribuito, e quali sono rilevanti nel tuo progetto?
6. Cos'è la State Machine Replication, e dove la usi (anche implicitamente) nel tuo progetto?
7. Quali tipi di fault esistono, e come li gestisce (o dovrebbe gestire) il tuo sistema?
8. Se il tuo progetto usa Kubernetes/Docker: come si collegano le sue feature (self-healing, autoscaling) ai concetti di fault tolerance e scalabilità del corso?
9. Quale modello di consistenza adotta (esplicitamente o implicitamente) il tuo progetto, e perché?
10. Quale stile architetturale (layered, event-based, data-centred...) meglio descrive il tuo progetto?

Riuscire a collegare ogni risposta a uno specifico modulo del corso (citandolo per nome, es. "questo è il modello di M3...") è probabilmente l'elemento singolo più efficace per dimostrare la comprensione richiesta dai docenti e puntare al massimo del voto.
