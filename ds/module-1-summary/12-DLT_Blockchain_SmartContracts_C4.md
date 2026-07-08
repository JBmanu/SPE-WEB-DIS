# C4 — Distributed Ledger Technology, Blockchain, Smart Contracts

> Questa è la sezione più ampia del corso (166 slide), divisa in tre parti: I. Middleware & DLT; II. Blockchain; III. Smart Contracts.

## Parte I — Middleware & DLT

### Cos'è il middleware?
La parola "middleware" suggerisce qualcosa che appartiene al "mezzo" — ma mezzo tra cosa? La definizione tradizionale: il middleware si trova nel mezzo tra il sistema operativo e le applicazioni. Tale definizione enfatizza strati verticali: applicazioni sopra il middleware sopra il sistema operativo; interfacce middleware-applicazione (interfacce superiori); interfacce middleware-OS (interfacce inferiori).

### Perché il middleware?
Problemi di oggi: sviluppare software è difficile; i progettisti esperti sono rari (e costosi); le applicazioni diventano sempre più complesse. Cosa può fare il middleware? Viene sviluppato una volta sola per molte applicazioni; ci si può permettere progettisti di qualità più alta; il middleware può fornire servizi alle applicazioni; il middleware astrae dallo specifico sistema operativo.

### Middleware e modelli
**Interoperabilità**: una caratteristica chiave del middleware è l'interoperabilità — le applicazioni che usano lo stesso middleware possono interoperare (questo vale per qualunque piattaforma comune, es. il file system del sistema operativo). Tuttavia esistono molti sistemi middleware incompatibili tra loro: le applicazioni sul middleware A possono lavorare insieme, e quelle sul middleware B pure, ma le applicazioni-A e le applicazioni-B il più delle volte non possono interagire. Da qui il compito della **Enterprise Application Integration (EAI)**, con enfasi sulla comunicazione orizzontale (applicazione-applicazione e middleware-middleware).

**Integrità concettuale**: lo sviluppo software non avviene nel vuoto — quasi ogni progetto software deve fare i conti con sistemi pregressi, non c'è mai tempo o risorse per ricominciare da zero, e i sistemi legacy sono stati costruiti con i propri approcci. L'integrazione di sistemi è l'unica via d'uscita: prendere ciò che già esiste e aggiungervi funzionalità, cercando di farlo senza modificare i sottosistemi esistenti. Prima vittima: l'**integrità concettuale** — la proprietà di un sistema di essere comprensibile e spiegabile attraverso un insieme coerente e limitato di concetti.

**Modelli dal middleware alle applicazioni**: i sistemi reali sono eterogenei; la crescita "a pezzi" (piecemeal growth) è un percorso molto problematico per l'evoluzione del software, eppure è molto popolare — essendo asintoticamente il più conveniente quando il tempo di sviluppo tende a zero. La tecnologia middleware è una tecnologia di integrazione: adottare un dato middleware dovrebbe facilitare sia lo sviluppo di nuove applicazioni sia l'integrazione di sistemi legacy; per ottenere integrazione limitando la deriva concettuale, il middleware cerca di imporre un modello su applicazioni eterogenee.

### Tecnologie middleware
**Middleware astratto vs. concreto**: il middleware astratto è un modello comune; il middleware concreto è un'infrastruttura comune. Esempio: gli oggetti distribuiti — astrattamente, qualunque middleware che modella i sistemi distribuiti come una collezione di oggetti raggiungibili in rete ha lo stesso modello (OMG CORBA, Java RMI, MS DCOM, OSGI Architecture...), anche se a livello astratto esistono differenze; le implementazioni concrete invece mirano alla vera interoperabilità, quindi devono gestire dettagli molto più fini (es. fino a CORBA 2.0, due implementazioni CORBA di fornitori diversi non erano interoperabili; oggi esistono diverse implementazioni OSGI: Eclipse Equinox, Apache Felix, Knopflerfish...).

### Standard del middleware
Trattando di infrastrutture, una questione chiave è il cosiddetto **effetto rete**: il valore di una tecnologia cresce con il numero dei suoi adottanti. Gli sforzi di standardizzazione diventano critici per costruire slancio attorno a una tecnologia infrastrutturale: grandi consorzi di standard vengono costruiti, che riuniscono diverse industrie (es. OMG CORBA, FIPA, OSGi, W3C); i grandi player industriali cercano di imporre la propria tecnologia come standard de facto, oppure istituiscono processi più aperti per essi.

### Quale middleware ci servirebbe qui e ora?
Quali funzionalità "calde" servirebbero oggi? Autenticazione, autorizzazione, sicurezza, accesso distribuito a risorse condivise... E il consenso, e gli algoritmi di consenso? Dovremmo scriverli da zero per ogni nostra applicazione distribuita che ne ha bisogno? Oppure dovremmo riceverli come parte di un nuovo middleware "caldo"?

## Distributed Ledger Technology (DLT)

### Definizioni
**ITU FG DLT (2017)**: la distributed ledger technology si riferisce ai processi e alle tecnologie correlate che permettono ai nodi di una rete di proporre, validare e registrare in modo sicuro cambiamenti di stato (o aggiornamenti) su un ledger sincronizzato, distribuito attraverso i nodi della rete.

Dove sta la sincronizzazione? Il ledger è sincronizzato, mentre i nodi e la rete non sono richiesti essere sincroni: quindi la DLT è pensata per funzionare come uno strato di sincronizzazione per i processi — proprio come ci si aspetterebbe da un middleware in un sistema distribuito.

**ISO/TC 307 (2024)**: **ledger** — un archivio di informazione che mantiene registri di transazioni intese essere finali, definitive e immutabili; **distributed ledger** — un ledger condiviso tra un insieme di nodi DLT, e sincronizzato tra i nodi DLT usando un meccanismo di consenso; **distributed ledger technology** — la tecnologia che abilita l'operazione e l'uso di ledger distribuiti.

### Il ruolo della standardizzazione
I sistemi distribuiti tipicamente devono essere aperti — non solo sicuri, affidabili, disponibili...; gli standard condivisi sono al centro di qualunque sistema aperto; il middleware è il luogo più ovvio per gli standard; standardizzare il middleware funge da fondamento più generale possibile per questo. Sforzi di standardizzazione per la DLT: **ITU** (International Telecommunication Union, l'agenzia specializzata delle Nazioni Unite per le tecnologie dell'informazione e comunicazione) con il suo **ITU FG DLT** (Focus Group on Application of Distributed Ledger Technology); **ISO** (International Organization for Standardization) con il suo **ISO/TC 307** (Comitato Tecnico ISO su blockchain e distributed ledger technology).

### Architettura DLT
L'architettura ad alto livello vincola l'architettura gerarchica altamente astratta dei ledger distribuiti; può coprire quasi tutti i ledger distribuiti, incluse le catene pubbliche rappresentate da Ethereum e Bitcoin, le catene private rappresentate da Hyperledger Fabric, e i sistemi di ledger distribuiti non basati su blockchain.

### Casi d'uso DLT
Alcuni casi d'uso riportati: finanza (lettera di credito digitale, blockchain per assicurazioni), farmaceutica (applicazione web/mobile basata su blockchain per la fornitura di vaccini, distribuzione di farmaci), medicina (blockchain per midollo osseo, sangue e organi, registri sanitari), ICT (mercato globale per operatori mobili e fornitori di servizi, DLT per assegnazione di numeri, servizi e portabilità del numero), energia (distribuzione di energia tramite smart contract, scambio di energia P2P).

### Benefici DLT
**Benefici generali**: la DLT è una tecnologia sicura ed economicamente conveniente che permette di distribuire servizi scalabili globalmente; è considerata resistente alla manomissione e verificabile, resistente a fallimenti sistemici; è uno strumento efficace per individuare e mitigare le frodi; come istanza di middleware, la DLT può essere vista come una forma di **General Purpose Technology (GPT)**: non vale di per sé, ma porta vantaggi anche ad altre tecnologie e settori — quindi può richiedere molto tempo per raggiungere un'adozione di massa, ma una volta adottata porta guadagni di produttività in molte industrie.

**Benefici specifici**: **trasparenza e fiducia** (la DLT è percepita come una risorsa condivisa canonicamente affidabile e trasparente, che rende le interazioni e le transazioni comprensibili, tracciabili, certificabili e verificabili — particolarmente rilevante per interazioni tra utenti che non si fidano l'uno dell'altro); **sicurezza** (cifratura dei dati, controllo degli accessi, dati resistenti alla manomissione, gestione dell'identità, tolleranza ai guasti); **incentivi** (riduzione dei costi tramite disintermediazione e maggiore efficienza).

### DLT vs. BCT
La blockchain technology (BCT) sembra chiaramente essere una DLT; tuttavia, la blockchain è un modo di implementare un ledger distribuito, ma non tutti i ledger distribuiti necessariamente usano blockchain. In generale: **DLT ⊃ BCT** (esempi di DLT non basate su blockchain: IOTA, Hedera Hashgraph, CORDA).

---

## Parte II — Blockchain

### Aspettative (Expectations)

#### DLT o Blockchain? Le aspettative nel tempo
Il Gartner Hype Cycle for Emerging Technologies (2016 e anni seguenti) ha tracciato l'evoluzione delle aspettative attorno alla blockchain. Dopo il 2018, la blockchain non appare più nel Gartner Hype Cycle for Emerging Technologies; nello stesso periodo, ITU (2019) e ISO (2020) portano a una conclusione di successo i propri sforzi di standardizzazione — il che potrebbe significare che DLT/BCT stanno andando rapidamente verso la maturità e l'adozione industriale diffusa.

#### Blockchain è la tecnologia di Bitcoin?
**Blockchain ≠ Bitcoin**: blockchain ⊃ criptovalute ⊃ Bitcoin. La blockchain è un modello per il calcolo distribuito e decentralizzato, che può essere implementato in modi diversi, in domini applicativi eterogenei, e con obiettivi disparati. Bitcoin è una specifica implementazione di blockchain, in uno specifico dominio applicativo (le criptovalute), con uno specifico obiettivo (digitalizzare e decentralizzare la moneta fiat).

### Background

#### La blockchain a colpo d'occhio
**Blockchain**: un ledger condiviso, trasparente, distribuito, append-only — cioè un registro che traccia l'ordine e il timing delle transazioni; protetto usando schemi crittografici (es. funzioni hash one-way, firme digitali e certificati, cifratura); il ledger è replicato su più nodi di una rete peer-to-peer, evitando il bisogno di un intermediario centralizzato fidato, rendendo il ledger immutabile; le transazioni vengono approvate e propagate tramite consenso, prevenendo perdita/corruzione dei dati dovuta a macchine che si guastano/mentono — cioè fornendo robustezza contro i fallimenti bizantini. Caso d'uso ideale: un hub sicuro per parti reciprocamente non fidate che hanno bisogno di interagire.

#### Strumenti crittografici

**Funzioni hash one-way**: digest = H(input); facile andare da input a digest, infeasibile l'inverso; P(H(x) = H(y) | x ≠ y) ≈ 0; un piccolo cambiamento nell'input produce un grande cambiamento nel digest; l'obiettivo è rivelare tentativi di manomissione. Esempio: la funzione hash SHA512.

**Crittografia a chiave pubblica (asimmetrica)**: l'utente possiede due chiavi — la chiave pubblica è disponibile pubblicamente, la chiave privata è tenuta segreta. È facile creare la coppia di chiavi, cifrare con una chiave e decifrare con l'altra; è infeasibile decifrare con la chiave sbagliata o derivare una chiave dall'altra. Obiettivi: confidenzialità, autenticità, non-ripudio. Caso d'uso: autenticazione a chiave pubblica.

#### Schemi crittografici

**Hash chain**: le funzioni hash possono essere usate per costruire catene hash, usate per tener traccia di sequenze di eventi e del loro ordine relativo; ogni evento è salvato in un blocco; ogni blocco registra l'hash del blocco precedente, prevenendo così tentativi di alterare/manomettere la sequenza.

**Firme digitali**: i mittenti allegano firme ai propri messaggi: Signature = Encrypt_Priv(H(Message)); le firme possono essere verificate usando la chiave pubblica. Garantiscono autenticità (il mittente dichiarato coincide con il mittente effettivo) e integrità (il messaggio non è stato manomesso).

#### Applicazioni

**Timestamping service**: includendo timestamp nelle catene hash, si ottiene un servizio di marcatura temporale; i blocchi si assumono essere aggiunti (quasi) periodicamente; più eventi simultanei possono essere salvati nello stesso blocco; tiene traccia di cosa è successo e quando.

**Notary service**: facendo accettare ai servizi di timestamping solo eventi correttamente firmati, si ottiene un servizio notarile; le firme devono essere valide, altrimenti gli eventi non possono essere notarizzati; tiene traccia di chi ha fatto cosa e quando, fornendo non-ripudio degli eventi e della loro temporizzazione. Applicazioni reali: un ledger condiviso che tiene traccia di ordini, spedizioni e pagamenti tra aziende (es. fornitori in una supply chain); un sistema di voto (con voto aperto) che tiene traccia di chi ha già votato cosa; un registro aperto che tiene traccia di bandi pubblici e relative candidature; un registro per la proprietà di immobili, che tiene traccia dei trasferimenti di proprietà; un sistema di timbratura entrata/uscita per dipendenti; una criptovaluta. In generale: qualunque caso d'uso dove due o più parti potrebbero avere interesse a mentire su cosa hanno fatto o quando, potrebbe beneficiare di un servizio notarile.

**Architettura del notary service**: in pratica, un servizio notarile può essere implementato come sistema distribuito con architettura logicamente centralizzata; il server centrale è incaricato di verificare la validità degli eventi, mantenere la catena hash, salvare i dati degli eventi; può essere ridondante, ma è controllato da una singola parte/organizzazione; i client inviano nuovi eventi. **Problema del punto unico di fiducia**: la parte/organizzazione che gestisce il server potrebbe essere (diventare) corrotta e alterare arbitrariamente l'ordine/i tempi degli eventi, o impedire a un sistema particolare di partecipare — nessuna difesa contro questo problema.

**Il bisogno di replicazione**: per evitare la centralizzazione della fiducia, si può replicare il servizio notarile in modo che ciascuna replica sia controllata da una parte/organizzazione diversa; ogni volta che un client invia un nuovo evento a una replica, viene propagato a tutte le altre repliche; ciascuna replica salva una copia della catena hash e degli eventi. È ancora possibile che una replica venga compromessa/corrotta, ma finché la maggior parte non lo è, i tentativi di manomissione possono essere rilevati ("la maggior parte"? quanto?). In sostanza, si propone di replicare il software che valida i molti eventi inviati dagli utenti — questo è l'obiettivo dell'approccio **State Machine Replication (SMR)**.

### State Machine Replication (SMR)

**Idea principale**: eseguire la stessa macchina a stati (non necessariamente finita) su più processori indipendenti (possibilmente distribuiti), in parallelo, per ottenere: tolleranza ai guasti (a stop, crash, bugie, bug...); disponibilità e reattività; replicazione di dati/software e resistenza alla manomissione. **Una rete di repliche**: i processori costituiscono una rete peer-to-peer di repliche, tutte esponenti lo stesso comportamento osservabile — nessuna assunzione sulla topologia.

#### Calcolo deterministico stateful
**Calcolo stateless vs. stateful**: input → computazione → output; il calcolo è stateless quando l'output dipende solo dall'input (es. funzioni); è stateful quando l'output dipende sia dall'input sia dallo stato — output a ogni passo dipende sia dallo stato iniziale sia dalla sequenza precedente di input (es. oggetti; gli oggetti hanno memoria, le funzioni no).

**Calcolo deterministico vs. non-deterministico**: una macchina computazionale è deterministica se il suo stato dipende solo dallo stato iniziale e dalla sequenza di input. Potenziali fonti di non-determinismo: funzione randomizzatrice, concorrenza. Comportamento non-deterministico di sistema con calcolo deterministico: il problema dell'osservazione (dove si pone il confine?) e il ruolo dell'input — il comportamento del sistema composto dalla macchina computazionale e dal suo ambiente circostante è complessivamente non-deterministico.

**Calcolo deterministico stateful**: le macchine deterministiche stateful possono essere arbitrariamente replicate; le repliche possono essere eseguite concorrentemente; per essere replicate ed eseguite concorrentemente in modo arbitrario: ogni replica dovrebbe partire dallo stesso stato iniziale, ogni replica dovrebbe processare gli input nello stesso ordine; di conseguenza, tutte si muoverebbero attraverso la stessa successione di stati, mantenendo la consistenza dello stato rispetto agli input. Esempio: servizio notarile + replicazione + classe Ledger ≈ criptovaluta.

#### Le sfide dei sistemi distribuiti aperti
SMR si occupa di sistemi aperti e distribuiti — il che porta ad alcune sfide: i messaggi possono andare persi, corrotti, riordinati o duplicati attraversando la rete (quindi ciascuna replica può percepire una vista diversa sugli eventi del sistema — come imporre lo stesso ordinamento degli eventi per tutte le repliche?); mancanza di tempo globale tra macchine distribuite (è difficile mantenere gli orologi sincronizzati tra le repliche, quindi non c'è soluzione banale per l'ordinamento degli eventi, es. tramite timestamp — come condividere un tempo comune?); il teorema CAP (cosa succede se le repliche non possono — temporaneamente — comunicare tra loro?); il problema dei generali bizantini e i fallimenti bizantini (cosa succede se qualche replica va in crash o si comporta male perché difettosa o corrotta?).

**Le risposte**: messaggi persi/corrotti/riordinati/duplicati → protocolli di trasporto robusti come TCP, funzioni hash per l'integrità; mancanza di tempo globale → ben noto e studiato in letteratura, ragionevole assumere che le macchine abbiano accesso a UTC tramite NTP; teorema CAP → eventual consistency; problema dei generali bizantini → ridondanza + algoritmi di consenso byzantine fault-tolerant.

#### Teorema CAP applicato
Consistency (C): tutti i client hanno sempre la stessa vista sui dati, anche dopo gli aggiornamenti; Availability (A): tutti i client ricevono sempre una risposta tempestiva, anche in presenza di fallimenti; Partition-tolerance (P): il sistema continua a funzionare nonostante le partizioni di rete. Teorema: non più di due delle tre proprietà alla volta.

**Eventual consistency**: prima o poi, in tempo finito, le cose diventeranno consistenti — dove "prima o poi" ≈ "in tempo ragionevole"; la blockchain sostanzialmente sceglie P e A; analogamente ai database distribuiti (es. MongoDB, o NoSQL in generale), fornisce eventual consistency, spesso governata da regole probabilistiche.

#### Byzantine Fault Tolerance — un esempio passo-passo
1. Alice e Bob provano simultaneamente ad aggiornare un sistema replicato contattando una replica; il risultato finale dipende dall'ordinamento delle richieste.
2. Tutte le repliche devono concordare su un ordinamento per le operazioni da impegnare (commit).
3. Possono sorgere **fallimenti bizantini**: inconsistenze che possono prevenire l'accordo (i nodi potrebbero, deliberatamente, mentire).
4. Una quarta replica può rompere l'impasse.

**Consenso e fallimenti bizantini**: a causa del valore eventualmente salvato nel ledger, attori malevoli possono avere incentivi economici a causare fault (es. denaro o vantaggi); in assenza di Byzantine Fault Tolerance (BFT), una replica potrebbe alterare la temporizzazione o l'ordinamento dei blocchi, o escludere eventi particolari; la prospettiva di una replica che produce fallimenti bizantini è terribile rispetto alla consistenza: può impedire indefinitamente l'accordo; la blockchain, analogamente ai database distribuiti, tipicamente sfrutta algoritmi di consenso BFT per prevenire fallimenti bizantini.

**Algoritmo di consenso BFT**: un protocollo distribuito mirato a rendere un sistema SMR resistente (cioè garantendo eventual consistency) ai fallimenti bizantini. **Impossibilità del consenso**: il consenso distribuito è impossibile sotto una qualunque delle seguenti assunzioni: (1) la rete sottostante è asincrona (i messaggi possono essere arbitrariamente riordinati o ritardati — per questo tutti i protocolli di consenso procedono per round periodici); (2) la quantità f di repliche byzantine-difettose è tale che f ≥ N/3, dove N è il numero totale di repliche — per questo serviva la quarta replica.

### Elementi principali della blockchain

> *Disclaimer*: la descrizione adotta un approccio top-down, fortemente ispirato a Ethereum come la tecnologia blockchain abilitante smart contract più matura, studiata e documentata.

#### Panoramica
Una **blockchain technology (BCT)** è, in generale, una clever implementazione di un sistema SMR che tiene traccia di quali utenti possiedono quali asset (rappresentazioni), tramite un ledger replicato, aggiornato tramite consenso. **Utenti**: identificati tramite chiavi pubbliche, devono firmare le proprie transazioni con esse. **Asset**: qualunque cosa abbia un valore, un proprietario, e possibilmente uno stato mutabile da tracciare (es. eventi, denaro, documenti, atti notarili, atti di proprietà, contratti...). **Ledger**: un servizio notarile replicato che mantiene l'evoluzione di proprietà/stato degli asset. **Consenso**: un protocollo distribuito mirato a mantenere e aggiornare le repliche del ledger in sincronia.

**Architettura di una BCT**: le repliche R1,...,RN salvano effettivamente una copia dell'intero ledger; i client C1,...,CM possono proporre aggiornamenti di asset a qualunque Ri — non hanno bisogno di salvare l'intero ledger.

#### Identificatori utente
Gli utenti possiedono (almeno) una coppia di chiavi (chiave pubblica, chiave privata); sono identificati da qualche funzione della loro chiave pubblica (es. funzioni hash one-way, certificati digitali emessi da una Certification Authority fidata) — gli identificatori sono anche detti indirizzi in questo contesto. **Permissioned vs. permissionless**: ogni utente possiede più identificatori non riconducibili tra loro (pseudonimia, decentralizzato, vulnerabile al Sybil attack), oppure possiede un singolo identificatore certificato (punto unico di guasto/fiducia).

#### Il world state
Lo stato del sistema consiste concettualmente di un insieme di rappresentazioni di asset, ciascuna specificante il proprietario dell'asset, dove l'identificatore utente è f(chiave pubblica). Lo stato dell'asset consiste concettualmente di diversi campi che tengono traccia di cosa una particolare entità possiede attualmente — i campi effettivi possono variare a seconda dello scenario applicativo specifico (es. le BCT con criptovalute native tengono tipicamente traccia dei saldi degli utenti; altre BCT permettono di tener traccia di dati personalizzati).

**Possibili implementazioni del world state**: **account-based** (es. Ethereum), **Unspent Transaction Output (UTXO)** (es. Bitcoin), **versioned key-value store** (es. Hyperledger Fabric).

#### Transazioni
Una transazione rappresenta una (potenziale, proposta) variazione dello stato del sistema, ed è composta da: identificatore utente (l'indirizzo dell'utente che la emette), operazione (descrizione dell'operazione da applicare allo stato del sistema), argomenti (per l'operazione), firma (la firma crittografica della transazione). Il set specifico di operazioni e strutture di transazione possibili è specifico dell'applicazione; nel caso generale servono almeno: un'operazione che crea nuovi asset, e un'operazione che aggiorna asset esistenti. Esempio (criptovalute): transazione di deposito o di trasferimento.

**Validità delle transazioni**: una transazione è valida se è ben formata, la firma corrisponde all'indirizzo dell'emittente, e la firma certifica l'integrità della transazione. **Esecuzione delle transazioni**: una transazione valida tx può essere applicata a uno stato s tramite una funzione γ, producendo un nuovo stato s′, lo stato risultante di tx: γ(s, tx) = s′. A seconda del caso d'uso specifico, può accadere che s ≡ s′ (es. il mittente non ha abbastanza fondi, o si è verificato qualche altro errore a livello applicativo). La funzione γ è la macchina a stati (cioè il programma) che viene replicato.

#### Blocchi e catene di blocchi
Un blocco è composto da: hash del blocco precedente, altezza (indice del blocco corrente), timestamp, metadati (specifici dell'applicazione), lista delle transazioni incluse nel blocco corrente (e gli hash dei loro stati risultanti).

**Formalizzazione**: un blocco bi è una 5-upla bi = (phi, hi, tsi, mi, (txi1, ri1, ..., txini, rini)), dove rij è lo stato risultante dopo aver applicato tutte le transazioni txik contenute in bi per k = 1,...,j, e ni è il numero totale di transazioni contenute in bi.

**Validità locale dei blocchi**: dato bi-1 l'ultimo blocco noto localmente dalla replica, un nuovo blocco bi è localmente valido se: phi ≡ H(bi-1); hi ≡ hi-1 + 1 ≡ i; tsi - tsi-1 ∈ [Δt - ε; Δt + ε] (Δt e ε sono parametri specifici della blockchain); ri1 = γ(ri-1^(ni-1), txi1); rij = γ(rij-1, txij) per ogni j ∈ {2,...,ni}.

**Esecuzione dei blocchi**: un blocco localmente valido bi può essere applicato allo stato si-1 (= lo stato risultante prodotto dal blocco precedente bi-1), tramite la funzione Γ, producendo un nuovo stato si: Γ(si-1, bi) = rini ≡ si, applicando tutte le transazioni in bi rispettando il loro ordine, tramite γ.

**Caratteristiche dei blocchi (riepilogo)**: replicazione + concatenazione hash ⟹ resistenza alla manomissione del passato; catena hash + tempo + ordinamento ⟹ servizio di timestamping/notarile; catena hash + firma crittografica ⟹ accountability e non-ripudio; i blocchi sono pensati per essere pubblicati (quasi) periodicamente; nel caso generale, la probabilità che un blocco sia inconsistente (cioè non tutti i nodi concordano sul suo contenuto) tende a zero con il numero di blocchi successori.

**Ciclo di vita transazione e blocco**: il genesis block (primo blocco) si assume essere condiviso tra le repliche in qualche modo; per le transazioni: l'utente prepara la transazione con operazione e argomenti, la firma con la propria chiave privata, la diffonde a una o più repliche; ciascun nodo periodicamente (con periodo Δt) ascolta le transazioni pubblicate dai client, le valida ed esegue (le transazioni non valide vengono scartate), compila il nuovo blocco candidato locale, partecipa all'algoritmo di consenso con le altre repliche (negoziando il prossimo blocco con i propri peer) — questo passo è necessario perché possono sorgere fallimenti bizantini, a causa di repliche corrotte o semplicemente perché le repliche potrebbero aver percepito le transazioni in ordine diverso. Infine il blocco viene confermato (un protocollo di consenso conferma il blocco, incluse le sue transazioni) — questi cicli di vita possono variare molto a seconda dello specifico algoritmo di consenso usato.

#### Consenso e mining

**BCT permissioned vs. permissionless**: le BCT permissioned vincolano gli identificatori degli utenti tramite Certification Authority, e usano algoritmi di consenso "classici" basati su quorum/leader — algoritmi BFT (es. PBFT, BFT-SMaRt, HoneyBadgerBFT) e algoritmi non-BFT (es. Paxos, Raft, ZooKeeper, Google Chubby). Le BCT permissionless aprono l'accesso a qualunque coppia di chiavi (pubblica, privata), e usano approcci "nuovi" basati sulla competizione (es. Proof-of-Work, Proof-of-Stake, Proof-of-Elapsed-Time, IOTA Tangle).

**Confronto**: le BCT permissioned assumono un numero N di repliche e i loro identificatori (upper bound fino a ~100/1000 repliche), hanno alto throughput in termini di transazioni/secondo (ordine di grandezza ~1000 TX/s), consistenza "esatta", sono ideali per organizzazioni multi-amministrative chiuse, risolvono il Sybil attack con le CA. Le BCT permissionless non fanno assunzioni su N (upper bound virtualmente infinito), hanno basso throughput (ordine di grandezza ~10 TX/s), consistenza probabilistica, sono ideali per sistemi aperti (es. criptovalute), risolvono il Sybil attack con il PoW.

**Il Sybil attack**: nei sistemi/protocolli P2P distribuiti dove le decisioni critiche vengono spesso prese su base maggioritaria, le entità devono votare affinché si stabilisca una maggioranza, le entità sono identificate nel sistema tramite i loro ID, ed è facile o economicamente fattibile per un attaccante creare più ID — tali sistemi possono essere soggetti al **Sybil attack**: un attaccante sovverte il sistema P2P creando un grande numero di identità pseudonime, usandole per ottenere un'influenza sproporzionatamente grande nel sistema.

**Il protocollo PBFT (Practical Byzantine Fault Tolerance)**: un protocollo di consenso BFT dove un leader viene eletto tra le repliche; i client inviano le proprie richieste al leader e attendono almeno (f+1) risposte dalle repliche (dove f è il numero massimo di repliche difettose); il leader fa il multicast di ciascuna richiesta alle altre repliche; le repliche scambiano diversi messaggi, negoziando un accordo attraverso due round (prepare e commit); infine le repliche inviano le proprie risposte al client richiedente. Quando il leader è considerato difettoso (es. timeout), ne deve essere selezionato uno nuovo, il che implica nuovamente la negoziazione tra le repliche. Problemi: quanti messaggi devono essere scambiati se N = 1000? Cosa potrebbe succedere se si potessero creare ID di repliche fittizie?

#### Il meccanismo di Proof-of-Work (PoW), a.k.a. Mining
Il PoW fu originariamente concepito per prevenire lo spam via email; oggi dota le criptovalute del loro valore; PoW = enigma computazionale + strategia di risoluzione dei rami.

**L'enigma computazionale**: le repliche (i miner) competono per essere la prima a risolvere un enigma computazionale, approssimativamente ogni Δt ± ε secondi; la prova dello sforzo è facile da verificare e viene inclusa nel blocco (solo i blocchi contenenti la prova sono considerati validi); la prima replica che risolve l'enigma estrae (mines) il blocco successivo della blockchain; la difficoltà computazionale deve essere variabile e controllabile.

**Esempio Bitcoin**: modificare un campo del blocco candidato finché il suo hash non inizia con un certo numero di zeri — algoritmo: blocco candidato bi = (phi, hi, tsi, mi, txi) con mi = 0; while H(bi) ≥ hthreshold: incrementa mi di 1.

**Esempio Ethereum**: un grafo pseudo-casuale di ~1 GiB viene generato in modo riproducibile; il contenuto del blocco candidato viene usato per selezionare alcune parti del grafo; tali parti vengono hashate insieme e incluse nel blocco.

**Branch (rami)**: i blocchi minati vengono pubblicati sulla rete P2P di repliche, ma la propagazione richiede tempo; le altre repliche oneste accettano non appena ne vengono a conoscenza (riconoscendo di aver perso il round) e iniziano a minare sopra il nuovo blocco; simultaneamente, qualche altra replica potrebbe aver minato un altro blocco (magari perché non ha ancora ricevuto l'altro blocco, oppure perché è corrotta o malevola) — questa situazione è nota come **branch (ramo)** e rappresenta un'inconsistenza, perché i rami rappresentano diverse possibili versioni del ledger delle transazioni.

**La strategia di risoluzione dei rami**: i rami sono inevitabili; una regola locale deve essere sfruttata dalle repliche per decidere quale ramo considerare quello "vero"; finché la maggioranza delle repliche segue la regola, un singolo ramo dovrebbe alla fine essere selezionato da tutte le repliche, ottenendo eventual consistency. Esempio Bitcoin: la **longest chain rule (regola della catena più lunga)**. Esempio Ethereum: **GHOST (Greedy Heaviest Observed SubTree)**.

**Longest chain rule**: le repliche oneste devono sempre considerare la catena più lunga di cui sono venute a conoscenza per prime; anche se si verifica una ramificazione, i due rami non evolveranno esattamente alla stessa velocità; un ramo diventerà eventualmente più lungo, più rapidamente dell'altro, quindi eventualmente l'altro ramo verrà abbandonato (diventando orfano); non si può impedire alle repliche corrotte di generare rami, ma quanto è probabile che una singola replica produca un ramo più lungo in meno tempo rispetto alle altre? La formula di Nakamoto: P[n|r] = 1 - Σ(k=0 a n) [(nr)^k · e^(-nr) / k!] · (1 - r^(n-k)), dove r = potere computazionale dell'avversario / potere computazionale onesto. In Bitcoin, con n_threshold = 6 (~1h, dato E[Δt] = 10 minuti), il sistema è sicuro al 99,999% se il potere computazionale dell'avversario è inferiore al 13% del potere computazionale totale.

**Caratteristiche interessanti del PoW**: approccio basato su competizione, locale, eventualmente consistente, stocastico; difficoltà di mining auto-adattiva tale che E[Δt] = costante (gli aggiornamenti compensano la variazione del potere computazionale delle repliche — es. in Bitcoin hthreshold viene periodicamente aggiornato; Ethereum ha un meccanismo simile più resistenza agli ASIC); conta solo il potere computazionale (CP) — resistente al Sybil attack, ma soggetto a problemi di distribuzione del CP e regola della maggioranza (51% attack); l'invariante E[Δt] = costante implica anche che la frequenza massima di aggiornamento del sistema è 1/E[Δt].

**Incentivi e disincentivi del PoW**: ipotesi — i miner sono razionali, cioè egoisti; perché dovrebbero partecipare onestamente al consenso basato su PoW? Probabilmente non sono nemmeno le loro transazioni; il PoW è costoso in termini di risorse, e quindi di denaro reale. **Incentivi economici**: i miner "vincitori" dell'enigma computazionale vengono ricompensati con denaro, creato ex-nihilo dal protocollo — un incentivo a competere lealmente e comportarsi bene. **Disincentivi economici**: simmetricamente, attacchi come la ramificazione deliberata non sono strettamente impediti, ma vengono resi estremamente costosi.

**PoW, criptovalute e sicurezza**: all'interno delle blockchain basate su criptovalute, PoW, valore economico e sicurezza sono strettamente correlati: (1) il PoW dota la criptovaluta del suo valore economico; (2) i miner richiedono compenso economico per il proprio lavoro; (3) il lavoro dei miner è la "benzina" di un sistema blockchain; (4) i miner si comporteranno onestamente finché sarà conveniente farlo; (5) è conveniente finché la criptovaluta ha valore.

#### Le tre generazioni della blockchain
Classificazione popolare (Swan, 2015): tre generazioni di BCT — (1) criptovalute, (2) asset personalizzati, (3) smart contract. Il modello presentato finora include essenzialmente le generazioni 1 e 2.

**Applicazioni attese per le generazioni 1-2**: pagamenti per acquisti online (al posto di PayPal), proprietà intelligente, registri medici unificati, social/news non censurabili, saldi condivisi tra aziende, gare d'appalto pubbliche, sistemi di naming e controllo accessi, sistemi di voto.

**Verso gli Smart Contract — cosa c'è nella generazione 3?** Finora si è descritto un modo affidabile di salvare/aggiornare dati senza punti unici di fiducia; ma come ci si può fidare degli utenti che producono quei dati? Si potrebbero automatizzare i flussi di lavoro di gestione degli asset tramite software, ma bisogna comunque fidarsi degli sviluppatori e delle organizzazioni che producono il software; servono entità computazionali affidabili (cioè agenti) in grado di gestire automaticamente gli asset — cioè gli **smart contract**.

### "Universal" State Machine Replication (USMR)
Analogia: UTM : TM = Interprete : Programma = ??? : SMR. Si potrebbe replicare un programma stateful deterministico che implementa una particolare logica di business (es. il ledger di una banca); allo stesso modo, si potrebbe replicare un programma deterministico che implementa un interprete (≈ un programma che esegue altri programmi) — questo è ciò che si chiama **Universal State Machine Replication (USMR)**; le operazioni ammissibili su un interprete replicato di questo tipo dovrebbero permettere agli utenti di deploy, undeploy, o invocare programmi.

**BCT abilitanti smart contract**: le blockchain abilitanti smart contract agiscono essenzialmente come macchine a stati replicate "universali" su cui gli smart contract possono essere deployati.

---

## Parte III — Smart Contracts

### Definizione (Szabo, 1997)
Gli **smart contract (SC)** sono processi stateful, definiti dall'utente, reattivi, immutabili — quindi affidabili —, deterministici, che eseguono computazioni replicate ed espressive sulla blockchain.
- **stateful**: incapsulano il proprio stato, come gli oggetti in OOP;
- **reattivi**: possono essere innescati solo da qualche client off-chain;
- **user-defined**: gli utenti possono deployare i propri smart contract implementando qualunque logica di business;
- **immutabili**: il loro codice non può essere alterato dopo il deployment;
- **replicati**: la blockchain agisce come interprete replicato per tali processi;
- **espressivi**: sono espressi con un linguaggio Turing-completo.

### Caratteristiche degli smart contract
Gli SC possono essere usati per automatizzare flussi di lavoro che coinvolgono due o più parti, agendo come intermediari tra le parti, riducendo i fallimenti dovuti a operatori umani corrotti/egoisti, rendendo il flusso di lavoro più affidabile. Immutabilità + ispezionabilità + accountability + replicazione ⟹ possono essere fidati nella gestione di asset critici (es. denaro); il codice è sempre corretto, la storia vera è sulla blockchain — riducendo le dispute e rimuovendo il bisogno di arbitrato. Mancanza di situatedness: dati e computazione totalmente disincarnati (disembodied) — come il cloud, ma senza un singolo punto di fiducia. In ogni momento esistono N copie di un dato SC, una per ciascuna replica, ma esse calcolano sempre come una sola — l'"istanza di smart contract" è "le molte copie di un'istanza di SC".

### Run Time

#### Operazioni sugli smart contract
Tipicamente, almeno due operazioni sono fornite ai client: **deploy** (accetta il codice del SC e ha l'effetto di istanziarlo su tutte le repliche, generando un identificatore/indirizzo univoco per il SC) e **invoke** (accetta un identificatore di SC e un numero di argomenti, e ha l'effetto di eseguire quel SC con quegli argomenti) — un modello computazionale reattivo.

**Deployment di uno smart contract**: inizialmente non esistono smart contract; un utente può istanziare uno smart contract pubblicando il proprio codice sorgente/bytecode all'interno di una transazione di deployment (che inizializza anche lo stato del SC; il protocollo assegna un indirizzo univoco al nuovo SC); una volta che la transazione è confermata, si può assumere che un'istanza del SC sia in esecuzione su tutte le repliche (non un grande sforzo: è solo in ascolto di invocazioni).

**Invocazione di uno smart contract**: gli utenti possono innescare un SC pubblicando una transazione di invocazione, specificando l'indirizzo del SC come destinatario e fornendo alcuni dati in ingresso che specificano la computazione richiesta; eventualmente ciascuna replica riceverà la transazione e la eseguirà (il codice del SC tipicamente specifica cosa fare con gli argomenti forniti); se la computazione termina senza eccezioni, qualunque effetto collaterale prodotto (sullo stato del SC) diventa parte del nuovo stato intermedio del sistema — altrimenti gli effetti collaterali vengono semplicemente scartati, quindi il nuovo stato intermedio coincide con quello precedente; il blocco che lo contiene viene eventualmente confermato dal protocollo di consenso, e la computazione invocata può essere effettivamente considerata eseguita.

### Aggiornare il modello BCT per gli smart contract
Le entità possono essere Utenti o Smart Contract: ⟨EntityID⟩ ::= ⟨UserID⟩ | ⟨SmartContractID⟩. Lo stato del sistema è ancora un insieme di asset, dove gli asset possono essere dati utente o stati di smart contract: ⟨Asset⟩ ::= ⟨UserID⟩, ⟨Data⟩ | ⟨SmartContractID⟩, ⟨SmartContractState⟩.

Gli stati degli smart contract sono fatti di storage + codice: ⟨SmartContractState⟩ ::= ⟨Storage⟩, ⟨Code⟩ — si può pensare allo storage di un SC come ai campi di un oggetto in OOP, e al codice di un SC come ai metodi di un oggetto; il codice di un SC può alterare il proprio storage, o cambiare il proprio comportamento in base ad esso.

Le transazioni possono essere deployment, invocazioni, o trasferimenti: ⟨TX⟩ ::= ⟨EntityID⟩, ⟨Operation⟩, ⟨Signature⟩, dove ⟨Operation⟩ ::= deploy, ⟨Code⟩ | invoke, ⟨Arguments⟩, ⟨SmartContractID⟩ | transfer, ⟨EntityID⟩, ⟨Value⟩.

La funzione γ esegue le TX come segue: crea un nuovo SC nel caso di una TX di deploy; aggiorna lo stato del SC invocato nel caso di una TX di invoke; aggiorna sia il saldo del mittente sia quello del destinatario nel caso di una TX di transfer. La funzione Γ resta invariata (esegue ancora le TX di un blocco sequenzialmente). Questo descrive l'**architettura Order-Execute** (Androulaki et al., 2018).

### Espressività vs. terminazione

#### I problemi della Turing-completezza
Quale sarebbe l'effetto di invocare un programma non terminante come SC? È impossibile filtrare i programmi non terminanti (a causa del problema della fermata); nei sistemi distribuiti aperti, non si può assumere che gli utenti si comportino semplicemente bene. Serve quindi prevenire/scoraggiare gli utenti dal deployare/invocare computazioni infinite o lunghe. Come affrontare il problema: le BCT lo affrontano in modi diversi — es. Ethereum con il **Gas**, Hyperledger Fabric (HLF) con l'architettura **Execute-Order-Validate**.

#### Ethereum e il Gas
Ethereum propone il gas, cioè far pagare agli utenti l'esecuzione del calcolo: le TX vengono dotate di due campi aggiuntivi, gasLimit e gasPrice (i miner potrebbero ritardare le TX con gasPrice basso; gli utenti possono aumentare la propria priorità aumentando gasPrice); all'esecuzione, ogni istruzione bytecode incrementa il contatore g, secondo una lista dei prezzi; ogni volta che g supera gasLimit, viene sollevata un'eccezione, annullando gli effetti collaterali; in ogni caso, al termine, il saldo dell'emittente viene decrementato di ΔETH = gasPrice · g, e il miner vincitore può riscattare ΔETH come compenso per il proprio sforzo computazionale.

**Conseguenza pratica**: la dimensione economica del calcolo deve essere presa in considerazione quando si progettano smart contract Ethereum. **Conseguenza teorica**: gli SC non sono davvero Turing-completi — si parla di **quasi-Turing-completeness**.

### Un esempio con Solidity
**Solidity** è un linguaggio object-oriented di alto livello per implementare smart contract (http://solidity.readthedocs.io). Esempio di smart contract `Counter` in Solidity: ha un evento `Increased`, variabili `owner` e `value`, un costruttore che imposta il proprietario al mittente del deployment, e una funzione `inc(times)` che incrementa il valore `times` volte, emettendo l'evento `Increased` a ogni incremento.

L'esempio mostra l'evoluzione dello stato globale del sistema attraverso diverse transazioni: depositi iniziali, deployment del contratto Counter da parte di Alice, e successive invocazioni `inc(1)`, `inc(2)`, `inc(5)` da parte di diversi utenti (Bob, Dan, Eve, Carl), ciascuna delle quali fa avanzare lo stato globale e aggiorna i saldi degli utenti (che pagano gas per le transazioni) e il valore del contatore nel contratto.

### Casi d'uso

Gli smart contract sono attesi agire come intermediari in: gestione automatica del denaro o pagamenti (es. bollette, assicurazioni, distribuzione di azioni/quote); governance condivisa (es. Distributed Autonomous Organizations, DAO); tracciamento automatico di asset/beni/supply chain (es. in combinazione con l'IoT).

**Smart Contract + Internet of Things (IoT)**: (1) i possibili molti movimenti di beni potrebbero essere tracciati automaticamente da uno o più smart contract interagenti; (2) partenze e arrivi di beni possono essere rilevati da sensori IoT (nessun modo per i molti attori coinvolti di mentire su quantità o tempistiche); (3) gli SC potrebbero eseguire automaticamente pagamenti non appena i movimenti vengono rilevati, o rimborsi in caso contrario; (4) fondatori, creditori, ispettori e utenti finali possono sempre conoscere il percorso di distribuzione dei prodotti, dovendo solo concordare sulla politica imposta dal codice degli SC. Idea principale: delegare decisioni critiche di fiducia ad agenti software trasparenti e affidabili.

### Problemi (Issues)

Gli smart contract sono una tecnologia ancora piuttosto immatura, con sette categorie principali di problemi:

1. **Nessuna privacy o segretezza**: ogni informazione mai pubblicata sulla blockchain è disponibile sulla blockchain — lo stato privato di uno smart contract non è segreto; la pseudo-anonimità può essere rotta con statistica o machine learning; comportamenti illegali/non etici possono essere rivelati anni dopo. Niente voto segreto?

2. **Scarsa casualità**: è difficile ottenere (pseudo-)casualità a causa della mancanza di non-determinismo; la vera casualità non può essere sfruttata (le repliche divergerebbero); la maggior parte delle informazioni osservabili nei blocchi è manipolabile dai miner (es. timestamp, altezza, hash...); nessun modo banale di trovare un seed casuale non manipolabile. Niente lotteria?

3. **Inter-comunicazione tra smart contract e re-entrancy**: gli SC sono essenzialmente oggetti che comunicano tramite chiamate di metodo sincrone; il flusso di controllo originato da un utente può attraversare più di uno SC; il chiamante attende il chiamato; codice SC non-rientrante (non-reentrant) potrebbe fallire se invocato di nuovo da uno SC invocato, il che può portare a comportamenti indesiderati, oltre che a frodi (es. il caso "The DAO"). L'OOP è il paradigma di programmazione migliore?

4. **Nessun modo di correggere bug**: il codice degli SC è immutabile — l'immutabilità è sia una benedizione sia una maledizione; contratti difettosi/fraudolenti non possono essere corretti, aggiornati, sostituiti o ritirati — resteranno tali, sprecando le risorse dei miner; importanza fondamentale della progettazione corretta e della validazione formale — un problema di per sé nei linguaggi Turing-completi.

5. **Mancanza di pro-attività**: gli SC sono entità computazionali puramente reattive; hanno sempre bisogno di "prendere in prestito" il flusso di controllo di qualche utente; sono consapevoli del tempo, ma non reattivi al tempo — non possono pianificare o posticipare computazioni; nessuna computazione periodica (es. pagamenti periodici).

6. **Disembodiment e mancanza di concorrenza**: la computazione è logicamente situata ovunque, e l'esecuzione è strettamente sequenziale; computazioni indipendenti non possono essere eseguite concorrentemente; computazioni che hanno senso solo localmente devono essere replicate globalmente — gli smart contract non possono essere usati per parallelizzare computazioni.

7. **Granularità dei costi computazionali**: Ethereum non è la prima piattaforma ad applicare un prezzo al calcolo (è prassi comune nel cloud e nel paradigma X-as-a-Service); è la granularità a livello di istruzione la migliore? (es. nell'implementazione del meccanismo publish-subscribe, il publisher paga il prezzo più alto).

## Conclusioni della sezione
La blockchain è un caso di studio paradigmatico dei sistemi distribuiti: applica concretamente quasi tutti i concetti chiave del corso — replicazione e consistenza (M3, qui specializzata in eventual consistency e CAP), tolleranza ai guasti bizantini (rispetto a M1), consenso distribuito (C3, specializzato in PBFT e PoW), crittografia come strumento di sicurezza distribuita, e il middleware come strato di astrazione (qui generalizzato fino alla "Universal SMR"). Gli smart contract rappresentano l'evoluzione naturale di questi principi verso computazione decentralizzata e autonoma, pur con limitazioni tecnologiche significative ancora da risolvere.
