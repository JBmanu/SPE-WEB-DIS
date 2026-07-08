# M3 — Replication & Consistency in Distributed Systems

## Perché replicare?

La replicazione dei dati serve a:
- **aumentare l'affidabilità (reliability)** del sistema;
- **migliorare le prestazioni**;
- **scalare**, sia in numero (di componenti/utenti) sia in area geografica.

### Replicazione per l'affidabilità
Se un file system è stato replicato, il funzionamento del sistema può continuare dopo il crash di una replica semplicemente passando a una delle altre. Mantenere più copie protegge meglio anche dai dati corrotti: ad esempio, con tre copie di un file su cui ogni operazione di lettura/scrittura viene eseguita su tutte le copie, si può nascondere un singolo fallimento di scrittura considerando corretto il valore restituito da almeno due copie su tre.

### Replicazione per le prestazioni
È importante quando un sistema distribuito deve scalare in termini di (i) dimensione o (ii) area geografica coperta. Esempio: scalare in dimensione avviene quando un numero crescente di processi deve accedere a dati gestiti da un singolo server — le prestazioni migliorano replicando il server e dividendo il carico di lavoro tra i processi. Scalando su un'area geografica, il tempo di accesso ai dati diminuisce posizionando una copia dei dati vicino al processo che li usa, aumentando le prestazioni percepite da quel processo — ma mantenere tutte le repliche aggiornate può consumare più banda di rete: non è scontato che il beneficio netto sia sempre positivo.

### Il dilemma replicazione-consistenza
A prima vista, i benefici della replicazione (affidabilità, fault tolerance, accessibilità, prestazioni, scalabilità) sembrano indiscutibili. Ma replicare introduce due ordini di problemi:
1. **costi** (risorse computazionali, banda): replicare dati significa avere macchine (nuove?) altrove, situate vicino ai processi che ne hanno bisogno, con costi di gestione e possibili costi di acquisizione; mantenere le repliche consistenti richiede computazione all'interno delle repliche e comunicazione tra le repliche.
2. **consistenza**: ogni volta che una copia viene modificata, diventa diversa dalle altre — le modifiche devono essere propagate a tutte le copie per garantire la consistenza, e quando/come ciò avviene determina il costo della replicazione.

Un esempio classico è il caching delle pagine web: se non si prendono misure speciali, recuperare una pagina da un server remoto può richiedere anche secondi; per migliorare le prestazioni, i browser spesso memorizzano localmente una copia di una pagina già recuperata (caching). Il problema sorge se la pagina è stata modificata sul server nel frattempo: la copia in cache è obsoleta (stale), ma l'utente vuole/necessita dell'ultima versione. Soluzioni possibili: vietare il caching (penalizzando le prestazioni), oppure mettere il server in carico di invalidare/aggiornare le copie in cache (il server deve tenere traccia di tutte le cache e inviare messaggi, il che è un carico pesante che porta a scarsa scalabilità).

Mantenere consistenti più repliche, se fatto in modo "stretto" (tight consistency, replicazione **sincrona**), richiede che un aggiornamento sia propagato a tutte le copie prima che possa avvenire una successiva operazione — il che richiede sincronizzazione globale tra tutte le repliche, con costi enormi in termini di comunicazione e computazione, e potenzialmente impossibile per via di vari teoremi di impossibilità (vedi CAP theorem). L'unica soluzione praticabile spesso è **rilassare i vincoli di consistenza**: rilassando il requisito che gli aggiornamenti siano eseguiti come operazioni atomiche, si evitano sincronizzazioni globali istantanee, guadagnando prestazioni ma accettando che le repliche possano non essere sempre identiche ovunque. Quanto e come la consistenza può essere rilassata dipende tipicamente dai pattern di accesso/aggiornamento dei dati replicati e dallo scopo del loro utilizzo.

## Modelli di consistenza

Invece di un'unica nozione di consistenza, si definiscono diversi **modelli di consistenza**, ciascuno adatto a scenari applicativi diversi, in modo che gli ingegneri possano esplorare appieno il trade-off tra i costi e i benefici della consistenza (rilassando i requisiti secondo lo scenario applicativo specifico). Un **modello di consistenza** è essenzialmente un contratto tra i processi e gli archivi di dati (data store), che garantisce la correttezza dei dati dato un insieme di regole che i processi devono seguire.

### Modelli di consistenza data-centric

Riguardano principalmente la replicazione dei dati e l'ordinamento delle operazioni su di essi.

#### Continuous consistency
L'obiettivo è imporre limiti alle deviazioni tra le repliche, lungo tre assi indipendenti:
- **deviazioni numeriche** (assolute/relative): es. due copie del prezzo di un'azione non dovrebbero deviare per più di 0,01$;
- **deviazioni di staleness** (vetustà): es. i dati meteo non dovrebbero essere più vecchi di quattro ore;
- **deviazioni di ordinamento**: es. in un'applicazione bacheca, al massimo sei messaggi possono essere emessi fuori ordine.

Per misurare la deviazione si usa il **conit** (unità di consistenza): ogni data store suggerisce implicitamente o esplicitamente il proprio conit; non esiste una misura assoluta di deviazione, e il conit va scelto con cura in base alla risorsa e al problema in esame (conit più piccoli richiedono minore propagazione, conit più grandi più propagazione).

#### Sequential consistency
Idea principale: tutte le operazioni di aggiornamento vengono viste da tutti i processi nello stesso ordine. Un data store è sequenzialmente consistente quando il risultato di una qualunque esecuzione è lo stesso che si avrebbe se: (i) le operazioni di lettura e scrittura di tutti i processi sul data store fossero eseguite in un qualche ordine sequenziale, e (ii) le operazioni di ciascun singolo processo apparissero in questa sequenza nell'ordine specificato dal suo programma.

#### Causal consistency
Indebolisce la consistenza sequenziale, basandosi sulla nozione di relazione causa/effetto: operazioni non correlate sono concorrenti. Un data store è causalmente consistente quando tutti i processi vedono le operazioni di scrittura che sono in relazione causa/effetto nello stesso ordine; l'ordinamento è limitato alle sole operazioni in relazione causa/effetto.

### Modelli di consistenza client-centric

Cambiano prospettiva: invece di concentrarsi sulla risorsa replicata, si concentrano sulla **vista che ogni singolo client ha** della risorsa. Scenario tipico: il client si connette a repliche diverse nel tempo (es. mobile computing); le differenze tra repliche devono essere rese trasparenti; non ci sono particolari problemi di aggiornamenti simultanei. In sintesi, garantiscono che ogni volta che un client si connette a una nuova replica, quella replica sia aggiornata rispetto agli accessi precedenti dello stesso client agli stessi dati su altri siti.

- **Eventual consistency**: scenario di un grande data store distribuito con quasi nessun conflitto di aggiornamento, tipicamente con una singola autorità che aggiorna e molti processi che leggono soltanto. L'unico conflitto possibile è di tipo lettura-scrittura; alcuni lettori potrebbero ricevere dati non aggiornati, ma spesso ciò è accettabile; se per un po' non avvengono nuovi aggiornamenti, gradualmente tutte le repliche diventeranno consistenti. Esempi: cambiamenti DNS, contenuti web.
- **Monotonic reads**: se un processo legge il valore di un elemento dati x, ogni successiva operazione di lettura su x da parte dello stesso processo restituirà sempre quello stesso valore o uno più recente. Esempio: un database di email distribuito.
- **Monotonic writes**: un'operazione di scrittura su un elemento x da parte di un processo viene completata prima di ogni successiva operazione su x da parte dello stesso processo (l'ordine degli aggiornamenti viene mantenuto sulle repliche distribuite). Esempio: una libreria software in sviluppo.
- **Read your writes**: l'effetto di un'operazione di scrittura su x da parte di un processo sarà sempre visto da una successiva operazione di lettura su x da parte dello stesso processo (evita l'effetto "la mia pagina web aggiornata non risulta aggiornata"). Esempio: aggiornamento di una password.
- **Writes follow reads**: un'operazione di scrittura su x, eseguita da un processo dopo una precedente lettura di x da parte dello stesso processo, è garantita avvenire sullo stesso valore di x letto, o su uno più recente (le scritture interessano solo dati aggiornati). Esempio: commenti a post su Facebook.

## Replicazione

Supportare la replicazione in un sistema distribuito significa decidere dove, quando e da chi le repliche debbano essere posizionate, e quali meccanismi adottare per mantenerle consistenti. Si distinguono due sotto-problemi: posizionare i **server di replica** e posizionare il **contenuto** — non sono lo stesso problema.

La replicazione non riguarda solo i dati: anche i **servizi** possono essere replicati in un setting distribuito (per le stesse ragioni dei data store), il che significa replicare delle funzioni, che possono o meno insistere sullo stesso data store: due livelli di replicazione, ciascuno con il proprio modello di consistenza/replicazione. Anche i **processi** possono essere replicati in un setting distribuito mobile, il che può richiedere meccanismi di cloning, ma anche meccanismi di livello più alto come il "goal-passing" (passaggio degli obiettivi).

### Tabella riassuntiva: tecnologie per consistenza e fault tolerance

| Tipo di consistenza | Meccanismo/protocollo chiave | Sistemi/tecnologie tipiche |
|---|---|---|
| Strong | Raft, Paxos | etcd, Spanner, CockroachDB |
| Eventual | Gossip, Merkle Trees | DynamoDB, Cassandra, Riak |
| Causal | Vector Clocks, CRDTs | AntidoteDB, Orleans, Akka |
| Tunable | Quorum (R/W) | Cassandra, Dynamo-style DB |
| Transactional | Consensus + TrueTime | Spanner, CockroachDB |
| Log-based | ISR, CDC Streams | Kafka, Debezium, Aurora |

## Conclusioni del modulo
La replicazione è utile nei sistemi distribuiti; la replicazione richiede consistenza; la consistenza non è una nozione assoluta — bisogni applicativi diversi richiedono modelli di consistenza diversi. Si parla generalmente di dati, ma oggi si replica praticamente qualunque risorsa serva (es. il cloning nei sistemi distribuiti mobili).
