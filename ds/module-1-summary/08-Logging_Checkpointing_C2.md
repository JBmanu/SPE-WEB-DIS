# C2 — Logging & Checkpointing (Towards Recovery of Distributed Systems)

## Interazione, dipendenze, causalità, tempo

I componenti di un sistema giocano ruoli diversi nel funzionamento complessivo (funzioni, servizi, compiti, obiettivi diversi a seconda del paradigma di sistema scelto), ma non lavorano mai isolati: interagiscono tra loro (nel tempo, nei sistemi concorrenti; nello spazio, nei sistemi distribuiti) perché, altrimenti, non ci sarebbe motivo di costruire un sistema; e perché i componenti dipendono l'uno dall'altro per qualunque cosa (funzione, servizio, compito, obiettivo) stiano facendo: il completamento (con successo) della loro operazione dipende da uno o più degli altri componenti. Le interdipendenze tra componenti attraversano contesti di processo diversi (nel tempo nei sistemi concorrenti, nello spazio nei sistemi distribuiti). Un modo (volutamente semplificato) per modellare le dipendenze è la **causalità**.

### Causalità: alcune note epistemologiche
Il legame causa-effetto è uno strumento cognitivo per gli umani per comprendere la dinamica della realtà, uno dei meccanismi di base per spiegare e prevedere il mondo attorno a noi (lo si usa anche per leggere le intenzioni altrui — il cosiddetto "mind reading"). Tuttavia, nella scienza le cose non sono così semplici: la parola "causa" compare spesso nei titoli degli articoli di fisica dell'Ottocento, ma quasi mai nel corpo del testo. La distinzione tra **correlazione e causazione** è cruciale (esempio classico: un "genotipo cancerogeno" ipotetico che porta sia a una predisposizione al cancro ai polmoni sia alla predisposizione a fumare renderebbe fuorviante una forte correlazione numerica tra fumo e cancro — argomento storicamente usato dall'industria del tabacco per contrastare le prime leggi antifumo). Per individuare cause effettive serve una definizione concettuale e matematica precisa (Judea Pearl, "Causality: Models, Reasoning, and Inference": la correlazione è trattata come un concetto statistico, la causazione è definita matematicamente come un concetto probabilistico).

Nel corso, la nozione di causa viene usata in modo strettamente legato all'astrazione del modello di sistema, per definire le dipendenze tra componenti (tipicamente processi sequenziali), e possibilmente per approssimare una nozione utile di tempo distribuito. Il tempo è una questione essenziale nei sistemi distribuiti: l'idea di base è che un legame causale determina una relazione temporale tra due eventi, dove (secondo l'intuizione) una causa precede temporalmente i suoi effetti — una semplificazione, ma utile nel contesto specifico.

## Tecniche di base per la dependability

Checkpointing e logging sono le tecniche più fondamentali per ottenere la dependability nei sistemi distribuiti, fornendo un percorso verso il recovery del sistema dopo un fallimento. Da sole forniscono una forma di fault tolerance relativamente facile da implementare e con basso overhead di runtime; hanno però dei limiti, soprattutto se usate da sole (es. alcune informazioni potrebbero andare perse se si usa solo checkpointing quando si verifica un fault, e il tempo di recupero dopo un fault è tipicamente maggiore rispetto ad approcci di fault tolerance più sofisticati). Tuttavia sono entrambe usate a tutti i livelli dei meccanismi di dependability.

**Checkpointing — l'intuizione**: un checkpoint di un sistema distribuito è una copia dello stato del sistema; se disponibile dopo il fallimento del sistema, può essere usato per riportarlo allo stato in cui si trovava quando il checkpoint fu preso. Tecnicamente, il checkpointing si riferisce all'azione di prendere (periodicamente) una copia dello stato del sistema, e salvare il checkpoint su uno storage stabile in grado di sopravvivere ai guasti tollerati.

**Recovery — anticipazione**: per recuperare il sistema fino al punto esatto prima del fallimento, deve essere registrata anche altra informazione di recupero, oltre al checkpointing periodico; a questo scopo vengono tipicamente registrati tutti i messaggi in ingresso al sistema, ed eventualmente altri eventi non deterministici. Checkpointing e logging forniscono una forma di **rollback recovery**, perché possono riportare il sistema a uno stato precedente al fallimento (esistono anche meccanismi di **roll-forward recovery**, ma incorrono in maggiore overhead di runtime e richiedono più risorse fisiche).

## Modelli

### Modello di sistema
Un sistema distribuito è modellato come N processi che interagiscono tramite scambio di messaggi, interagendo anche con il mondo esterno tramite input/output. Il modello non assume necessariamente una stratificazione dei processi, anche se può essere suggerita graficamente.

### Modello di fault
Assunzioni: il fallimento avviene in un processo; quando un processo fallisce, semplicemente smette di eseguire e perde tutto il suo stato volatile — modello **fail-stop**; la comunicazione è affidabile (es. TCP) e FIFO, quindi l'ordinamento dei messaggi è mantenuto e non c'è partizione di rete.

### Stato del processo
Lo stato di ciascun processo individuale è definito dal suo intero spazio di indirizzamento nel sistema operativo: una libreria di checkpointing generica salva semplicemente l'intero spazio di indirizzamento come checkpoint del processo. Tuttavia questa è la nozione più generale di stato del processo (dal punto di vista del sistema operativo); la natura specifica del processo e la semantica dell'applicazione possono essere sfruttate per definire una nozione più piccola e specifica di stato del processo.

### Stato globale
Lo stato di un sistema distribuito è di solito chiamato **stato globale**, e include lo stato di ogni processo del sistema; tuttavia la semplice aggregazione degli stati dei processi non basta: gli stati dei diversi processi sono correlati (a causa dello scambio di messaggi che muove informazione tra processi, causando cambi di stato; i processi dipendono causalmente da altri processi; gli stati dei processi sono interdipendenti) — le dipendenze non possono essere perse nello stato globale.

### Stato globale consistente, inconsistente e non recuperabile (esempio bancario)
Si considerino tre scenari di checkpoint presi su processi P0, P1, P2 collegati da messaggi m0, m1, m2, m3:

- **(a) Stato globale inconsistente**: i checkpoint presi da processi diversi sono incompatibili e non possono essere usati per recuperare il sistema. Esempio: P0 e P1 rappresentano due conti bancari A e B; m0 rappresenta un deposito di 100$ da A a B; se P0 va in crash dopo m0, e P1 dopo il checkpoint C1 (che riflette la ricezione di m0, mentre C0 non la riflette), il recupero da C0 e C1 farebbe apparire 100$ dal nulla. Lo stato globale ottenuto dall'insieme sbagliato di checkpoint non è ammissibile (non raggiungibile dallo stato iniziale del sistema): è questo lo **stato globale inconsistente**.
- **(b) Stato globale consistente**: i checkpoint presi sono compatibili e possono essere usati per il recupero. Nello stesso esempio bancario, se P0 va in crash dopo C0 e P1 dopo C1 (che riflette correttamente m0, e analogamente per m1), il recupero da C0 e C1 farebbe muovere correttamente i 100$ da A a B.
- **(c) Stato globale consistente ma non recuperabile**: i checkpoint sono compatibili (rappresentano uno stato raggiungibile) ma non possono essere usati per il recupero, perché le dipendenze sui messaggi m0 e m1 andrebbero perse nel recupero (es. nell'esempio bancario, 100$ scomparirebbero). Il problema è la perdita dei messaggi in transito: per gestire questo scenario serve un ulteriore tipo di stato, lo **stato del canale** (channel state).

### Modello di sistema raffinato
- Un insieme di N processi: ciascun processo consiste di un insieme di stati e un insieme di eventi; uno stato è lo stato iniziale; gli eventi innescano il cambio di stato di un processo.
- Un insieme di canali: un canale è un canale di comunicazione affidabile unidirezionale tra due processi; lo stato di un canale è l'insieme dei messaggi in transito lungo il canale (cioè non ancora ricevuti dal processo target); es. una connessione TCP è composta da due canali.
- Esempio: nello scenario (c), se m0 è salvato in C0 come stato del canale, e m1 in C1 allo stesso modo, il recupero da C0 e C1 diventa possibile.

### L'assunzione del determinismo a tratti (piecewise deterministic assumption)
I protocolli basati su checkpoint garantiscono il recupero del sistema solo fino allo stato globale consistente più recente registrato; tutte le esecuzioni avvenute dopo vengono perse. Il logging (protocolli basati su log) può invece essere usato per recuperare il sistema allo stato esatto immediatamente precedente al fallimento, a patto che tutti gli eventi vengano registrati e che il log sia disponibile al momento del recupero. Questi protocolli funzionano basandosi su un'assunzione di modello chiamata **piecewise deterministic assumption**: ogni stato evolve deterministicamente finché non avviene un evento non deterministico (es. la ricezione di un messaggio); tutti gli eventi non deterministici possono essere identificati; per ciascun evento viene registrata informazione sufficiente.

### Output commit
Un sistema distribuito interagisce con il mondo esterno (es. i client dei servizi che fornisce); una volta che un output viene emesso, una parte dello stato del sistema diventa osservabile dal mondo esterno — come una sorta di impegno (commitment) o traguardo raggiunto. Il recupero deve tenere conto anche di una visione osservabilmente consistente del sistema dall'esterno; tuttavia, se si verifica un fallimento, il mondo esterno non può essere usato per il recupero — questo è il **problema dell'output commit**: la consistenza osservabile richiede che venga registrata informazione di recupero sufficiente prima che il sistema si impegni (commit) su un messaggio di output.

### Stable storage
Un requisito essenziale per i protocolli di logging e checkpointing è la disponibilità di **stable storage**: può sopravvivere ai fallimenti dei processi, in modo che, al recupero, l'informazione salvata sia immediatamente disponibile al processo in fase di ripristino; tutti i checkpoint e i messaggi registrati devono quindi essere salvati su stable storage. Esistono varie forme di stable storage: dischi locali (per tollerare solo fallimenti di processo), dischi ridondanti (es. RAID-1 o RAID-5, per tollerare anche fallimenti del disco), file system replicati o basati su cloud (storage stabile ancora più robusto).

## Protocolli basati su checkpoint

### Generalità
Concentrandosi sullo stato piuttosto che sugli eventi, i protocolli basati su checkpoint non si basano sulla piecewise deterministic assumption: sono quindi più semplici da implementare e meno restrittivi, dato che non serve identificare tutte le forme di evento non deterministico e registrarle correttamente. Tuttavia, se non si può prendere un checkpoint prima di ogni evento (e di norma non è realistico farlo), bisogna tollerare la perdita di esecuzione.

### Checkpointing non coordinato
In questo approccio, ogni processo del sistema distribuito decide autonomamente quando prendere i propri checkpoint; l'intuizione è che, quando avviene un fallimento, il processo di recupero procede a ritroso per selezionare l'insieme più recente di checkpoint consistenti per il recupero dello stato globale. Il problema principale è che i checkpoint presi dai processi potrebbero non permettere la ricostruzione di uno stato globale consistente; per consentire la selezione di un insieme consistente di checkpoint durante il recupero, la dipendenza tra i checkpoint deve essere determinata e registrata insieme a ciascun checkpoint — il che comporta overhead aggiuntivo e maggiore complessità implementativa.

### Protocollo di checkpoint globale di Tamir e Sequin (coordinato, bloccante)
È un **protocollo di checkpointing coordinato**, in cui uno dei processi è designato coordinatore (e conosce tutti gli altri processi del sistema), mentre gli altri sono partecipanti. Il coordinatore usa un protocollo a due fasi (two-phase commit) per assicurare che i checkpoint presi dai singoli processi siano consistenti tra loro, e che l'operazione di checkpointing globale venga eseguita come transazione atomica o venga abortita (cioè: o tutti i processi creano con successo un nuovo insieme di checkpoint, oppure abbandonano il round corrente e tornano al precedente insieme di checkpoint). La prima fase mira a creare un punto quiescente dello stato del sistema distribuito; la seconda fase mira a passare atomicamente dal vecchio checkpoint al nuovo. Il round di checkpointing viene abortito se un partecipante non risponde.

**Messaggi di controllo**: CHECKPOINT (inizia un checkpoint globale e stabilisce un punto quiescente del sistema, dove tutti i processi hanno sospeso l'esecuzione normale), SAVED (un partecipante informa il coordinatore che ha completato un checkpoint locale), FAULT (indica che si è verificato un timeout e il round corrente di checkpointing globale deve essere abortito), RESUME (il coordinatore informa i partecipanti che possono riprendere l'esecuzione normale).

**Comportamento del coordinatore**: inizia la prima fase fermando l'esecuzione normale e inviando CHECKPOINT a ogni processo; attende messaggi CHECKPOINT in arrivo da tutti i processi (aborta se qualcuno manca); fa il checkpoint del proprio stato; attende messaggi SAVED da ogni processo (aborta inviando FAULT se qualcuno manca); passa al nuovo checkpoint e invia RESUME a ogni processo; riprende l'esecuzione normale.

Questo è un **protocollo bloccante**: l'esecuzione normale viene sospesa durante ogni round di checkpointing globale.

### Protocollo di snapshot distribuito di Chandy e Lamport (coordinato, non bloccante)
A differenza del protocollo di Tamir e Sequin, questo è un **protocollo non bloccante**: l'esecuzione normale non viene interrotta dal checkpointing globale; tuttavia il protocollo di Chandy e Lamport si occupa solo di come produrre un checkpoint globale consistente — non prescrive meccanismi su come determinare la fine del round di checkpointing né su come passare atomicamente al nuovo checkpoint globale.

**Descrizione del protocollo**: i processi possono essere in stato Normal o Checkpointing; qualunque processo può iniziare il checkpointing globale, prendendo un checkpoint locale e inviando un messaggio **Marker** su tutti i canali in uscita — passando a stato Checkpointing; alla ricezione di un Marker, un processo passa da Normal a Checkpointing, fa lo stesso (checkpoint locale + invio di Marker) e registra il "Marker Certificate" (che deve essere completato); quando il Marker Certificate è completo, il processo torna in stato Normal.

### Confronto tra i due protocolli di checkpointing

**Analogie**: entrambi si basano sostanzialmente sullo stesso modello di sistema e usano un messaggio di controllo speciale per propagare e coordinare il checkpointing globale; entrambi riconoscono la necessità di catturare lo stato del canale per garantire la recuperabilità del sistema; il meccanismo per catturare lo stato del canale è virtualmente identico in entrambi; l'overhead di comunicazione dei due protocolli è identico.

**Differenze**: il protocollo bloccante è più conservativo (ma, appunto, bloccante); è anche più completo e robusto; il protocollo non bloccante non fornisce alcun meccanismo per l'atomicità del round di checkpointing globale; il protocollo bloccante sfrutta un protocollo di checkpointing coordinato, mentre quello non bloccante promuove l'autonomia nell'avvio del protocollo — il che può adattarsi diversamente a diversi tipi di sistemi distribuiti.

## Protocolli basati su log (logging)

### Generalità
I protocolli basati su checkpoint sfruttano il salvataggio dello stato e il recupero da lì, a costo di una possibile perdita di esecuzione; il logging sfrutta il salvataggio degli eventi, che può essere usato per recuperare il sistema allo stato esatto precedente al fallimento, a patto che valga la piecewise deterministic assumption. Nei protocolli basati su log, l'esecuzione di un processo è modellata come una sequenza di **intervalli di stato consecutivi** — intervalli tra eventi (non deterministici); ciascun intervallo di stato è innescato da un evento non deterministico (come la ricezione di un messaggio) o dall'inizializzazione del processo, ed è seguito da una sequenza di cambi di stato deterministici. Finché l'evento non deterministico viene registrato, l'intero intervallo di stato può essere ripetuto (replayed).

### Tipi di protocolli di logging
- **Pessimistic logging**: il messaggio ricevuto viene registrato in modo sincrono prima della sua esecuzione.
- **Optimistic logging**: per ridurre l'overhead di latenza, gli eventi non deterministici vengono prima salvati in memoria volatile, poi registrati in modo asincrono su stable storage — con il rischio che il fallimento di un processo causi la perdita permanente di alcuni messaggi, forzando un rollback a uno stato precedente a quello in cui il processo è fallito.
- **Causal logging**: gli eventi non deterministici non ancora registrati su stable storage vengono "piggyback-ati" (allegati) a ciascun messaggio inviato — con l'informazione piggyback-ata, un processo può accedere a tutti gli eventi non deterministici che possono avere effetti causali sul suo stato, permettendo così un recupero consistente del sistema in caso di fallimento.

### In breve
Sia nel logging ottimistico sia in quello causale, la dipendenza dei processi deve essere tracciata, e informazione di dipendenza sufficiente deve essere allegata a ciascun messaggio inviato — il che non solo aumenta la complessità dei meccanismi di logging, ma soprattutto rende il recupero da fallimento più sofisticato e costoso, perché il processo in fase di recupero deve esaminare i propri log e determinare se gli mancano messaggi, spesso causando operazioni di recupero a cascata su altri processi. I protocolli di logging pessimistico sono molto più semplici da progettare e implementare, e il recupero da fallimento può essere molto più rapido.

### Logging e checkpointing insieme
Nella pratica, il logging viene sempre usato in combinazione con il checkpointing: gli stati vengono salvati come checkpoint, e gli eventi vengono registrati da un checkpoint al successivo, ottenendo due benefici: si limita il tempo di recupero (perché il processo può essere riavviato dall'ultimo checkpoint anziché dallo stato iniziale, e il suo stato può essere recuperato fino a prima del fallimento riproducendo gli eventi non deterministici registrati); si limita la dimensione del log (prendendo un checkpoint periodicamente, gli eventi registrati prima del checkpoint possono essere "raccolti dal garbage collector").

## Conclusioni del modulo
La dependability richiede una nozione coerente di dipendenze e causalità; tecniche di dependability semplici come checkpointing e logging possono essere usate per migliorare le possibilità di recupero dei sistemi distribuiti in caso di fallimento.
