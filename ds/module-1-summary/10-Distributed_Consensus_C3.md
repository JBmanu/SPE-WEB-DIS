# C3 — The Problem of Consensus in Distributed Systems

## Problemi di accordo (agreement problems)

### Il problema generale
Quando i diversi componenti di un sistema hanno viste potenzialmente divergenti sullo stato del sistema, e su cosa stia accadendo nel sistema, un comportamento complessivo coerente del sistema può essere raggiunto solo quando tutti i componenti concordano su tutto ciò che è rilevante per il sistema stesso (stato, eventi...). Il punto chiave è che essi raggiungano esattamente la stessa conclusione, indipendentemente da cosa essa riguardi.

### Esempi di problemi di accordo
- in un sistema di database distribuito, i gestori dei dati devono concordare se fare commit o abort di una data transazione (distribuita);
- in un file system replicato, i nodi potrebbero dover concordare su dove devono risiedere le copie del file;
- in un sistema di controllo di volo per aerei, il modulo di controllo motore e il modulo di controllo delle superfici di volo devono concordare se continuare o interrompere un atterraggio in corso.

### Ontologia di base
I sistemi computazionali non banali sono concorrenti o, più in generale, distribuiti — cioè, rispettivamente, sistemi dove più di una computazione avviene logicamente o fisicamente nello stesso momento. Corrispondentemente, i sistemi concorrenti/distribuiti sono tipicamente modellati come collezioni di processi computazionali (logici) o dispositivi (fisici, processori), interconnessi in qualche modo per poter interagire (es. via canali di comunicazione punto-punto diretti — architetture a scambio di messaggi — o via canali di comunicazione condivisi — architetture a memoria condivisa).

Concorrente o distribuito? Processori o processi? E parallelo? Nel frattempo, si accetta che la letteratura usi questi termini più o meno in modo intercambiabile quando ciò non crea problemi; quando ci si concentra su sistemi non influenzati dalla natura fisica del problema da risolvere, la distinzione non è rilevante.

**Modello di tempo**: **sincrono**, quando esiste un limite Δ sul ritardo di trasmissione dei messaggi, e un limite Φ sulla velocità relativa dei processi (il che permette un rilevamento accurato dei guasti dei processi); **asincrono** altrimenti — il che tipicamente modella un sistema con carico imprevedibile sulla rete e sulle CPU, dove, di conseguenza, non è mai possibile sapere se un processo è andato in crash oppure no.

**Modello di fallimento**: sia i processi logici sia i processori fisici possono fallire, in modi diversi; anche i link di comunicazione possono fallire, in modi diversi; la **fault tolerance** è la proprietà generale dei sistemi distribuiti di continuare a funzionare nonostante i fault — di qualunque tipo.

### Agreement e fault tolerance
I problemi di accordo coinvolgono un sistema di processi, alcuni dei quali possono essere difettosi (faulty); un problema fondamentale del distributed computing fault-tolerant è far sì che i processi affidabili raggiungano un **consenso**.

## Consenso

### Cos'è il consenso?
Il processo tramite cui si raggiunge un accordo sullo stato del sistema tra macchine inaffidabili, connesse da reti (possibilmente) asincrone.

### Perché serve il consenso?
Quando i processi falliscono, i processi affidabili devono concordare su cosa sia accaduto finora nel sistema, e cosa accadrà da ora in poi — in modo che lo stato corrente del sistema e la sua evoluzione siano entrambi consistenti (es. per il recupero del sistema).

### Consenso e fault tolerance
Il consenso è particolarmente importante per fornire a un sistema distribuito un certo livello di tolleranza ai guasti, perché è essenziale per garantire la consistenza delle repliche. Quando un crash rende impossibile garantire la sincronizzazione delle repliche, un processo di recupero implica il consenso tra le molte repliche, sia sullo stato di ciascuna replica sia sugli eventi gestiti/da gestire.

## I tanti problemi di consenso

### Basic consensus
La forma più basilare: raggiungere consenso su un singolo bit — un numero fisso n di processori, possibilmente difettosi, ciascuno con un bit iniziale xi; il problema del consenso su un singolo bit è far sì che i processi non difettosi concordino su un bit y, chiamato il **valore di consenso**. La risolvibilità dipende dall'esistenza di un protocollo tale che tutti i processori non difettosi terminino con lo stesso valore y. Requisiti diversi portano a problemi diversi (es. requisiti di dipendenza — y dovrebbe dipendere in qualche modo da x; **non-trivialità**: per ogni y ∈ {0,1}, qualche vettore xi e l'esecuzione del protocollo portano a y; **strong unanimity**: se per ogni i xi = x ∈ {0,1} allora y = x; **weak unanimity**: come strong, ma solo se non si verificano fallimenti durante l'esecuzione).

### Interactive consistency problem
Analogo al problema di consenso su singolo bit, eccetto che l'obiettivo del protocollo è far sì che i processi non difettosi concordino su un **vettore** y, chiamato il **vettore di consenso**. Requisiti di dipendenza: forti (per ogni i: yi = xi se i non è difettoso); deboli (idem, ma solo se non si verificano fallimenti durante l'esecuzione del protocollo). In sostanza, il consenso riguarda ciò che ciascun processore pensa sia il valore iniziale.

### Generals problem
Un processore specifico (il **generale**) cerca di inviare il proprio bit iniziale x a tutti gli altri; tutti i processi affidabili devono raggiungere consenso sul bit y, con requisiti di dipendenza: forte (y = x se il generale non è difettoso); debole (y = x se non si verificano fallimenti durante l'esecuzione del protocollo). Il problema è anche noto come **problema del reliable broadcast**, dove il generale è chiamato il trasmettitore.

### Esempio: il problema del transaction commit
Nei database distribuiti, il problema è far sì che tutti i processi gestori dei dati che hanno partecipato all'elaborazione di una particolare transazione concordino se installare i risultati della transazione nel database oppure scartarli (quest'ultima azione potrebbe essere necessaria se, per qualunque motivo, alcuni gestori dei dati non sono stati in grado di portare a termine l'elaborazione richiesta). Qualunque decisione venga presa, tutti i gestori dei dati devono prendere la stessa decisione, per preservare la consistenza del database.

### Rappresentazione astratta di problemi e soluzioni
Molte questioni tecniche e del mondo reale possono essere ridotte a questo tipo di problema — o a qualche sua versione: un modo astratto, generale, sintetico di rappresentare problemi e fornire soluzioni generali. Quanto può essere difficile, in fondo?

### Qual è il problema?
Raggiungere il tipo di accordo necessario per il commit problem è semplice se i processi partecipanti e la rete sono completamente affidabili. Tuttavia, i sistemi reali sono soggetti a un numero di possibili fault, come crash dei processi, partizionamento di rete, e messaggi persi, distorti o duplicati — possibilmente includendo tipi di fallimento bizantini, dove i processi difettosi potrebbero andare completamente fuori controllo o comportarsi in modo malevolo. Si cercherebbe quindi un protocollo di accordo il più possibile affidabile in presenza di tali fault; tuttavia, qualunque protocollo può essere sopraffatto da fault troppo frequenti o severi, quindi il meglio che si può sperare è un protocollo tollerante a un numero prescritto di fault "attesi".

## Risultati di impossibilità

### "Hundreds of impossibility results for distributed computing"
Esiste un'ampia letteratura (Fich & Ruppert, 2003) che esamina risultati del distributed computing che mostrano come alcuni compiti siano impossibili, del tutto o entro determinati limiti di risorse, in vari modelli (sincronia, fault-tolerance, diversi mezzi di comunicazione, randomizzazione). I limiti di risorse riguardano tempo, spazio e complessità dei messaggi. Tali risultati sono utili per comprendere la difficoltà intrinseca di problemi individuali e per studiare il potere di diversi modelli di distributed computing.

### Non solo CAP
I sistemi distribuiti sono facili da concepire e costruire, ma anche facili da far crashare, difficili da capire e debuggare. Le dimostrazioni formali sono fondamentali per un'ingegneria seria; tuttavia le proprietà sono difficili da dimostrare. Sapere come i modelli influenzano le proprietà dei sistemi è essenziale — così come sapere quali problemi non si possono risolvere.

### Il teorema FLP (Fischer-Lynch-Paterson)
"Impossibility of distributed consensus with one faulty process" (1985): in un sistema completamente asincrono, nessun protocollo di consenso può tollerare anche un solo fallimento di crash sotto il mero requisito di non-trivialità — un risultato di impossibilità chiamato **FLP**, dalle iniziali degli autori. Quindi, anche il caso più semplice porta a un risultato di impossibilità: non vengono considerati fallimenti bizantini, e si assume che il sistema di messaggi sia affidabile (consegna tutti i messaggi correttamente ed esattamente una volta) — eppure, l'arresto di un singolo processo in un momento sfavorevole può far sì che qualunque protocollo di commit distribuito fallisca nel raggiungere l'accordo.

Conseguenza: quella versione semplice del problema del consenso non ha una soluzione robusta senza ulteriori assunzioni sull'ambiente computazionale, o senza restrizioni ancora più severe sul tipo di fallimenti da tollerare.

### E allora? (verso una soluzione pratica)
Rinunciamo a così tanti problemi rilevanti e frequenti? O rinunciamo a qualche caratteristica essenziale del sistema che li risolve? Oppure, come al solito, elaboriamo qualche soluzione entro i confini ben definiti che i teoremi di impossibilità ci tracciano chiaramente?

## Dall'impossibile al possibile

### Affrontare la realtà con un obiettivo (Howard, 2016)
Si possono costruire sistemi distribuiti resilienti sopra componenti inaffidabili, a partire dal lavoro di Leslie Lamport sull'organizzazione del parlamento di un'isola greca, fino ai data center di oggi e ai sistemi che alimentano aziende come Google, Amazon e Microsoft, affrontando risultati di impossibilità, macchine che agiscono in modo malevolo e la complessità delle reti odierne, fino a scoprire come raggiungere l'accordo tra molte parti e costruire sistemi di fault-tolerance affidabili nella pratica quotidiana.

### Soluzione a FLP
**In pratica**, si accetta che a volte il sistema non sarà disponibile — questo viene mitigato usando timer e backoff. **In teoria**, si fanno assunzioni più deboli sulla sincronia del sistema (es. i messaggi arrivano entro un anno).

## Paxos (Lamport, 1998)

### Origini
Paxos è un algoritmo di consenso per raggiungere l'accordo su un singolo valore, presentato per la prima volta nel 1989 come technical report da Lamport, poi riformulato in una forma accademicamente più accessibile (1998); generalizzato rispetto alla State Machine Replication (SMR); descritto formalmente e dimostrato corretto; spiegato in modo più semplice e accessibile in "Paxos Made Simple" (2001).

### Caratteristiche
Paxos è un algoritmo per implementare il consenso fault-tolerant; gira su una rete completamente connessa di n processi e tollera fino a f fallimenti, dove n ≥ 2f + 1; in Paxos, i processi possono andare in crash e i messaggi possono andare persi, ma i fallimenti bizantini sono esclusi. Paxos garantisce principalmente **agreement** e **validity**; la **termination** è garantita solo se esiste un intervallo sufficientemente lungo durante il quale nessun processo riavvia il protocollo.

### Ruoli dei processi
Un processo può giocare tre ruoli diversi:
- **proposer**: i proposer sottomettono valori proposti per conto dei client;
- **acceptor**: gli acceptor decidono i valori candidati per la decisione finale;
- **learner**: i learner raccolgono questa informazione dagli acceptor e riportano la decisione finale ai client.

### Idea di base
Un processo a due fasi: **promise** (prepare) e **commit** (accept); accordo a maggioranza; numeri monotonicamente crescenti per etichettare le proposte.

### Paxos Made Simple (Lamport, 2001) — versione ancora più semplice
I valori vengono proposti (dal proposer); non c'è un singolo acceptor delle proposte: ce ne sono multipli (un numero dispari) — esiste un **quorum**: se la maggioranza assoluta degli acceptor accetta, allora il valore è scelto. Una volta che un valore è stato scelto, le proposte future devono proporre lo stesso valore. Ciò significa che serve un protocollo a due fasi: nella prima fase (prepare) bisogna scoprire se è già stato scelto qualche valore, e proporre di conseguenza nella seconda fase (accept) — il che può portare o a un valore effettivamente scelto, o a un'iterazione delle fasi, che teoricamente potrebbe portare a un livelock.

### Le fasi di Paxos (dettaglio)
Una proposta inviata da un proposer è una coppia (v, n), dove v è un valore e n è un numero di sequenza. Per gestire possibili crash, vengono selezionati più acceptor per la proposta; una proposta deve essere approvata da almeno un acceptor prima di diventare candidata alla decisione finale; il numero di sequenza viene usato per distinguere tra tentativi successivi di invocare il protocollo. Alla ricezione di una proposta con un numero di sequenza più grande da un dato processo, gli acceptor scartano le proposte con numeri di sequenza inferiori; alla fine, un acceptor accetta la scelta della maggioranza.

**Fase 1 — Fase preparatoria**:
1. ciascun proposer invia una proposta (v, n) a ciascun acceptor;
2. se n è il numero di sequenza più grande di una proposta ricevuta da un acceptor, esso invia un `ack(n, ⊥, ⊥)` al proprio proposer (che costituisce una promessa di ignorare tutte le proposte numerate più basse di n); tuttavia, se un acceptor ha già accettato una proposta con un numero di sequenza n′ < n e un valore proposto v, risponde con `ack(n, v, n′)` (il che implica che il proposer non ha alcun motivo per tentare di sottomettere un'altra proposta con un numero di sequenza più grande).

**Fase 2 — Richiesta di accettazione di un valore in ingresso**:
1. se un proposer riceve `ack(n, ⊥, ⊥)` dalla maggioranza degli acceptor, invia `accept(v, n)` a tutti gli acceptor, chiedendo loro di accettare quel valore — tuttavia, se invece un acceptor restituisce un `ack(n, v, n′)` al proposer nella fase 1 (il che significa che ha già accettato una proposta con valore v), allora il proposer deve includere il valore v con il numero di sequenza più alto nella propria richiesta agli acceptor;
2. un acceptor accetta una proposta (v, n) a meno che non abbia già promesso di considerare proposte con un numero di sequenza n′ > n.

**Fase 3 — Decisione finale**: quando la maggioranza degli acceptor accetta un valore proposto, esso diventa il valore di decisione finale; gli acceptor inviano in multicast il valore accettato ai learner, il che permette loro di determinare se una proposta è stata accettata dalla maggioranza degli acceptor; i learner lo trasmettono ai processi client che hanno invocato il consenso.

### Osservazioni
Un acceptor accetta una proposta con un numero di sequenza n se non ha inviato una promessa a nessuna proposta con un numero di sequenza n′ > n. Se un proposer invia un messaggio `accept(v, n)` nella fase 2, allora: o nessun acceptor in una maggioranza ha accettato una proposta con un numero di sequenza n′ < n, oppure v è il valore della proposta con numero più alto tra tutte le proposte accettate con numeri di sequenza n′ < n, accettata da almeno un acceptor in una maggioranza.

## State Machine Replication (Schneider, 1990)

La replicazione si relaziona al consenso in quanto tutte le repliche (distribuite) di una risorsa devono concordare sullo stesso stato nel tempo; d'altra parte, l'approccio della state machine è un metodo generale per implementare servizi fault-tolerant nei sistemi distribuiti.

**Idea di base**: la stessa macchina a stati viene replicata su un sistema distribuito, ciascuna con un proprio modulo di consenso; qualunque operazione su qualunque macchina replicata viene eseguita solo se e quando tutte le macchine hanno concordato sullo stesso ordinamento di esecuzione. C'è quindi uno spostamento dal consenso sullo stato distribuito al consenso sulle azioni distribuite sullo stato, con l'assunzione di **determinismo**. (Questo tema viene approfondito in dettaglio anche nel modulo C4, sulla blockchain e DLT.)

## Oltre Paxos

### Multi-Paxos
SMR ha bisogno di consenso su un array di valori, mentre Paxos si occupa solo di un singolo valore. Multi-Paxos sostanzialmente sfrutta un algoritmo Paxos separato (indicizzato) su ciascuna voce dell'array, più un'elezione del leader per ridurre i conflitti tra proposer (riducendo quindi presumibilmente le iterazioni necessarie); tuttavia non è specificato in modo particolarmente rigoroso nel complesso.

### Altri algoritmi basati su Paxos
- **Fast Paxos** (Lamport, 2006)
- **ZooKeeper** (Hunt et al., 2010), con ZAB (ZooKeeper Atomic Broadcast)
- **Egalitarian Paxos** (Moraru et al., 2013)
- **Raft Consensus** (Ongaro & Ousterhout, 2014)

### Un esempio: Chubby di Google
Google usa Paxos in un database fault-tolerant chiamato **Chubby**, usato estensivamente all'interno dei sistemi Google (es. Google File System, Cloud Bigtable...) come servizio di lock affidabile.

## Conclusioni del modulo

### Lezioni generali
I risultati di impossibilità definiscono lo spazio dei problemi che possiamo effettivamente risolvere; ragionare sulla relazione tra i modelli formali dei problemi e le loro istanze pratiche tipicamente fornisce qualche indicazione per una soluzione tecnicamente fattibile; i modelli formali sono essenziali per un'ingegneria solida dei sistemi distribuiti — e non solo in contesti molto complessi.

### Lezioni specifiche
I fault sono allo stesso tempo la fonte dei problemi dei sistemi distribuiti, e la ragione per cui abbiamo bisogno dei sistemi distribuiti; il consenso è uno dei modi più espressivi e generali per modellare problemi applicativi rilevanti in un setting distribuito; da un lato, la complessità del consenso sfida il senso comune e causa casi archetipici di impossibilità; dall'altro, si possono definire protocolli che effettivamente risolvono il problema in casi significativi, rilassando alcune ipotesi di base (es. Paxos e affini).
