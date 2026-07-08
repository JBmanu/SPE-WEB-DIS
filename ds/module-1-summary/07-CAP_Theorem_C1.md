# C1 — The CAP Theorem

## Availability, Consistency, Failure

Essere in grado di continuare a fornire servizi nonostante i guasti è considerato uno dei principali vantaggi dei sistemi distribuiti rispetto a quelli centralizzati. L'assunzione intuitiva è che i sistemi distribuiti possano essere progettati in modo che, se un componente fallisce — o diventa disconnesso/partizionato — altri componenti possano sostituirlo, nascondendo il fallimento dal mondo esterno (o almeno riducendone l'impatto percepito).

Quando un sistema riesce a nascondere (la maggior parte de) i suoi fallimenti, è sostanzialmente sempre funzionante: si dice che è **altamente disponibile (highly available)**. Domanda di progettazione di base: quanto fallimento può sostenere un dato sistema prima che il fallimento venga notato?

Cosa ci aspettiamo da un sistema distribuito? Che si comporti correttamente, dando risposte corrette quando interrogato (**essere consistente**); che funzioni, faccia accadere cose buone, sia vivo (**essere disponibile**); tuttavia sappiamo che i sistemi possono sperimentare perdite di alimentazione, crash, guasti di rete, perdita di messaggi, attacchi malevoli, fallimenti bizantini, e quindi essere inaffidabili.

**L'idea centrale**: il teorema CAP è un esempio di un trade-off più generale tra **safety** e **liveness** nei sistemi inaffidabili.

## CAP a colpo d'occhio

In breve: secondo il teorema CAP, è possibile fornire simultaneamente solo due delle tre seguenti proprietà in applicazioni distribuite: **consistency (C)**, **availability (A)**, **partition tolerance (P)**.

In modo leggermente più dettagliato (Zhao): è impossibile soddisfare contemporaneamente tutte e tre le seguenti garanzie:
- **Consistency (C)**: i dati replicati sono sempre consistenti tra loro.
- **Availability (A)**: i dati sono altamente disponibili agli utenti.
- **Partition tolerance (P)**: il sistema continua a fornire servizi ai suoi utenti anche quando la rete si partiziona.

### Formulazione originale (Brewer, 2000)
Un database distribuito possiede potenzialmente tre proprietà desiderabili: Consistency, Availability, tolleranza alla Partizione di rete. Secondo il teorema CAP, qualunque sistema distribuito a dati condivisi può avere **al massimo due** di queste tre proprietà.

### Scegliere quale rinunciare
- Si può rinunciare alla tolleranza alla partizione di rete, ottenendo consistency e availability.
- Si può rinunciare alla consistency, ottenendo un sistema partition-tolerant e altamente disponibile.
- Si può rinunciare all'availability, ottenendo un sistema consistente e tollerante alla partizione.

Nota importante: le tre proprietà non sono dello stesso tipo, né tecnicamente né concettualmente: consistency e availability variano lungo uno spettro di opzioni, mentre la partition tolerance è più una caratteristica on/off. Tutte sono desiderabili, ma rinunciare alla tolleranza alla partizione non è davvero un'opzione praticabile nei sistemi reali, specialmente con i sistemi pervasivi nell'era IoT, dove regna l'instabilità (della rete). In sintesi: nella maggior parte dei casi pratici, il teorema CAP costringe a scegliere tra **disponibilità e consistenza**.

## Un esempio concreto: i giochi basati sulla localizzazione

I giochi location-based (es. BotFighters, GeoZombie, Ingress, Pokémon Go, Harry Potter: Wizards Unite, Minecraft Earth) usano la posizione del giocatore per far evolvere e progredire il gameplay.

**Partition tolerance**: dato che l'architettura è costruita attorno alla nozione di milioni di giocatori sparsi nello spazio fisico globale con i loro dispositivi mobili (e che giocano tramite essi), rinunciare alla tolleranza alla partizione non è un'opzione: i dispositivi mobili sono per natura instabili nella connettività di rete, i giocatori sono per natura mobili e possono entrare e uscire dalla copertura di rete, i giocatori tendono a concentrarsi in alcune aree (es. durante eventi speciali — celebre il disastroso evento Chicago 2017 Pokémon Go Fest), e la scalabilità è un problema multi-livello (non solo il numero totale di giocatori, ma anche il numero di luoghi in cui possono trovarsi e il numero di giocatori per luogo).

**Consistency e availability**: la consistenza dei dati di gioco (obiettivi, situazione, achievement...) è essenziale per tenere i giocatori coinvolti (e dentro al gioco); i giochi location-based sono di solito costruiti attorno a un'architettura logicamente centralizzata, usando la replicazione spaziale per ridurre la latenza percepita dall'utente e migliorare la scalabilità; quando serve consistenza forte, ad esempio per transazioni in-game, i giocatori potrebbero essere costretti ad aspettare che i server dell'app confermino l'operazione (raggiungendo uno stato complessivamente consistente). La prima vittima (e la più comune) è quindi l'**availability** — la cosiddetta "Spinning Wheel of Death".

### Caso di studio: come Pokémon Go scala su Google Cloud
1. Quando un giocatore apre l'app, tutti i media statici vengono scaricati sul dispositivo personale, salvati su Cloud Storage; Cloud CDN usa la rete edge globale di Google per servire contenuto più vicino agli utenti, lavorando insieme al Cloud Load Balancing.
2. Le richieste utente vengono inviate a un reverse proxy NGINX, che le inoltra al servizio Frontend del gioco, ospitato su Google Kubernetes Engine (GKE).
3. Lo **Spatial Query Backend** gestisce le funzionalità basate sulla posizione: mantiene una cache "shardata" per posizione, decidendo quale Pokémon mostrare sulla mappa, quali palestre e PokéStop sono nei dintorni, il fuso orario, ecc.
4. Quando un giocatore cattura un Pokémon, il Frontend (GKE) invia un evento a **Google Spanner**: quando la richiesta di scrittura è completata, viene inviata una risposta al dispositivo; Spanner è fortemente consistente.
5. Ogni azione del giocatore viene registrata nel database NoSQL **Bigtable** (rappresentazione Protobuf), per logging e tracciamento dati, e anche come messaggio a un topic Pub/Sub per la pipeline di analisi.
6. Giocatori multipli nella stessa regione geografica sono sincronizzati grazie al determinismo delle mappe di Pokémon Go: anche se su macchine diverse ma nella stessa posizione fisica, gli input di tutti i giocatori sono uguali.
7. Tutti i server sono sincronizzati sui cambiamenti delle impostazioni e sulla temporizzazione degli eventi, in modo che tutti i giocatori si sentano parte di un mondo condiviso.

## Dimostrazione formale (Gilbert & Lynch)

Brewer formulò la sua congettura senza una dimostrazione formale completa; una dimostrazione fu fornita successivamente da Gilbert & Lynch (con alcune limitazioni). Vengono definiti precisamente i concetti coinvolti:

- **Availability**: per essere continuamente disponibile, ogni richiesta ricevuta da un nodo non guasto del sistema deve risultare in una risposta. Se il sistema è disponibile, si ottengono risposte.
- **Consistency**: un servizio consistente è modellato come un oggetto dati atomico, dove le operazioni sono totalmente ordinate e ciascuna operazione avviene in un singolo istante di tempo (qui il significato di "consistent" è diverso da quello in ACID, dato che racchiude sia A che C di ACID). Tra le altre conseguenze, implica che tutte le operazioni di lettura su una memoria condivisa distribuita, eseguite dopo che un'operazione di scrittura è completata, devono restituire il valore di quella scrittura o di una successiva. Se il sistema è consistente, si ottengono risposte corrette.
- **Network partition**: quando una rete è partizionata, tutti i messaggi inviati da nodi in una componente della partizione verso nodi in un'altra componente vengono persi; qualunque pattern di perdita di messaggi può essere modellato come una partizione temporanea che separa i nodi comunicanti nell'esatto istante in cui il messaggio viene perso. In breve: se il nodo A invia un messaggio al nodo B, la rete è partizionata se il messaggio non arriva a B; l'availability si ha quando B riceve il messaggio e risponde; la consistency si ha quando la risposta di B è corretta.

### Il teorema (modello asincrono)
La dimostrazione è data per tre tipi di rete: rete asincrona con perdita di messaggi, rete asincrona senza perdita di messaggi, rete parzialmente sincrona con orologi locali. Ai fini didattici ci si concentra sul **modello asincrono**: non esiste un singolo clock, i nodi agiscono in base al calcolo locale e ai messaggi ricevuti.

**Teorema**: è impossibile, nel modello di rete asincrona, implementare un oggetto dati di lettura/scrittura che garantisca contemporaneamente availability e consistenza atomica, in tutte le esecuzioni eque (comprese quelle in cui i messaggi vengono persi).

### Schema della dimostrazione
Assunzioni: si suppone per assurdo che atomicità, availability e partition tolerance siano tutte soddisfatte (dimostrazione per contraddizione). I nodi della rete possono essere partizionati in due insiemi disgiunti e non vuoti G1, G2; l'oggetto atomico `o` ha valore iniziale v0 (e deve essere consistente attraverso G1 e G2); un'esecuzione α1 esegue una singola scrittura v1 ≠ v0 di `o` in G1 (l'unica richiesta in quel momento, durante la quale nessun messaggio viene scambiato tra G1 e G2); nessun messaggio da G1 viene ricevuto in G2; un'esecuzione α2 esegue una singola lettura di `o` in G2 (anch'essa senza scambio di messaggi tra le partizioni).

**Q.E.D.**: per via dell'availability, α1 si completa (v0 → v1), e così α2; eseguendo α1 e α2, G2 vede solo α2, e deve quindi restituire v0 — il che viola palesemente la consistenza (atomica) come sopra definita.

## Costruire sopra CAP

### Cosa farne, di un risultato di impossibilità?
Dovremmo smettere di distribuire i sistemi computazionali, allo stesso modo in cui smettemmo di usare i sistemi assiomatici dopo Gödel? Ovviamente no. I risultati negativi servono semplicemente a fissare i confini, facendoci capire i veri limiti della nostra portata, tanto che un risultato di impossibilità dell'informatica diventa una leva per metodi e pratiche di ingegneria informatica specifiche ed efficaci.

### Una strategia semplice (Brewer, 2012)
Brewer stesso, anni dopo, elaborò ulteriormente sul proprio teorema:
1. quando la rete è partizionata, un sistema distribuito dovrebbe scegliere un trade-off tra consistency e availability;
2. quando non c'è partizione, un sistema può presentare sia consistency sia availability.

### Da ACID a BASE
Le semantiche ACID (Atomicity, Consistency, Isolation, Durability) potrebbero essere troppo forti per molti servizi Internet, dove il valore primario per l'utente non è necessariamente la consistenza o la durabilità forte, ma piuttosto l'alta disponibilità dei dati (Fox et al., 1997). Dati obsoleti possono essere temporaneamente tollerati, finché tutte le copie dei dati raggiungono eventualmente la consistenza dopo un breve periodo; lo "stato soffice" (soft state), generato a spese di computazione/I/O aggiuntivi, viene sfruttato per migliorare le prestazioni (i dati non sono durevoli); risposte approssimate (basate su dati obsoleti o stato soffice incompleto) fornite rapidamente possono valere più di risposte esatte.

**BASE**: **B**asically **A**vailable, **S**oft state, **E**ventual consistency.

### Oltre BASE
La maggior parte dei servizi cloud oggi adotta BASE (es. eBay, Amazon DynamoDB), cercando di mascherare le inconsistenze agli utenti. Amazon S3, ad esempio, permette consistenza forte read-after-write; le scritture di Amazon DynamoDB sono eventualmente consistenti, così come le letture, ma si possono configurare letture fortemente consistenti (a costo maggiore). Nuovi modelli di consistenza dei dati continuano a emergere.

### CAP oggi
Secondo Brewer (2012), l'obiettivo moderno del CAP dovrebbe essere massimizzare le combinazioni di consistency e availability che hanno senso per l'applicazione specifica; un approccio del genere include piani per l'operazione durante una partizione e per il recupero successivo, aiutando i progettisti a pensare al CAP al di là delle sue limitazioni storicamente percepite.

## Conclusioni del modulo
Nel design e sviluppo dei sistemi distribuiti, bisogna tipicamente scegliere tra un sistema reattivo e uno completamente consistente, quando la rete fallisce; in ogni caso si può sfruttare il teorema CAP per progettare il proprio sistema con caratteristiche diverse a seconda dello stato complessivo del sistema. ACID resta generalmente una cosa da conoscere e comprendere, ma modelli meno stringenti possono essere utili sia teoricamente che praticamente nei sistemi distribuiti del mondo reale — es. BASE.
