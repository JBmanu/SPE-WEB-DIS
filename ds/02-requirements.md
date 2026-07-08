# Requisiti per l'Esame e il Progetto — Modulo 2 (Integrazione)

> Questo file integra, con i contenuti pratici del Modulo 2, quanto già scritto nel file `13_Requisiti_Esame_e_Progetto.md` del Modulo 1. Il progetto finale del corso è **unico per entrambi i moduli**: la discussione orale può quindi attingere indifferentemente a concetti teorici (Modulo 1) e pratici (Modulo 2), e la valutazione premia soprattutto la capacità di collegare esplicitamente le scelte implementative del progetto ai concetti di entrambi i moduli.

## Cosa aggiunge il Modulo 2 rispetto al Modulo 1

Il Modulo 1 fornisce il vocabolario teorico (CAP, consenso, replicazione, fault model, architetture...). Il Modulo 2 mostra **come si traduce concretamente quel vocabolario in scelte di design e righe di codice** per un sistema distribuito reale. Per il progetto, è quindi essenziale dimostrare non solo di conoscere la teoria, ma di saperla applicare seguendo lo stesso percorso metodologico illustrato con Distributed Pong.

## Requisiti pratici obbligatori

### 1. Padronanza del socket programming
Sapere spiegare la differenza tra datagram socket (UDP) e stream socket (TCP) non solo a parole, ma a livello di codice: bind, sendto/recvfrom per UDP; connect, listen/accept, sendall/recv per TCP. Sapere spiegare perché UDP è "best effort" (pacchetti che possono perdersi, duplicarsi, arrivare fuori ordine) mentre TCP garantisce consegna ordinata e affidabile, a costo di maggiore latenza e complessità di gestione (es. flow control, come visto nel problema del deadlock dell'Attempt 1 dell'esempio TCP Echo). Sapere motivare la scelta tra UDP e TCP per un caso d'uso specifico — la motivazione data per Distributed Pong (UDP per bassa latenza, tollerando occasionali perdite di pacchetti, essendo un videogioco in tempo reale) è un ottimo modello da riprodurre per il proprio progetto.

### 2. Applicazione del workflow SE-esteso-per-DS
Saper applicare concretamente, e non solo elencare a memoria, i 9 passi del workflow di Software Engineering esteso ai sistemi distribuiti (use case collection, requirements analysis, design, implementation, verification, release, deployment, documentation, maintenance), con le domande aggiuntive specifiche per ciascun passo viste nel documento "Preliminaries". Per il progetto, è fortemente raccomandato includere nella documentazione una sezione esplicita che ripercorra questi passi, come fatto per Distributed Pong nelle slide.

### 3. Discussione delle opzioni di infrastruttura distribuita
Saper presentare almeno 2-3 alternative architetturali per l'infrastruttura del proprio sistema (locale, centralizzata, brokered, replicata — o equivalenti specifiche del proprio dominio), con i relativi pro e contro, e motivare esplicitamente la scelta finale. Il modello da seguire è esattamente l'analisi delle 4 opzioni viste per Distributed Pong, dove ogni opzione viene scartata o scelta con motivazioni esplicite legate a singoli punti di fallimento, complessità di deployment, e trade-off CAP.

### 4. Conoscenza della nomenclatura infrastrutturale
Saper usare correttamente e a colpo sicuro i termini: node/peer, client/server, proxy, load balancer, broker, queue, MOM/topic, database, master-worker. Saper identificare quali di questi componenti sono presenti nel proprio progetto e che ruolo giocano.

### 5. Riconoscere e discutere i pattern di interazione
Saper riconoscere quale pattern di interazione (request-response, publish-subscribe, publish-subscribe con broker, ContractNet) è implementato nel proprio progetto, e saperlo rappresentare con almeno una delle tre notazioni viste (sequence diagram, message flow graph, state diagram).

### 6. Collegare le "feature di design" alle scelte del progetto
Per ciascuna delle 8 feature di design viste (redundancy, failover, checkpoint/rollback, consensus, heart-beat/timeout/retry, authentication/authorization, data partitioning), essere in grado di dire esplicitamente se e come il proprio progetto la implementa (anche se la risposta è "non la implementiamo, e questo è il motivo"). Questo è probabilmente l'elemento più efficace per impressionare in sede di discussione, perché dimostra di aver pensato al progetto in termini sistematici e non solo "a naso".

### 7. Conoscere il protocollo Join/Leave e le sue problematiche
Se il progetto prevede partecipanti dinamici (utenti che entrano/escono in qualunque momento, come in Distributed Pong), saper discutere esplicitamente come viene gestito il join/leave, quali sono i casi limite (coordinator irraggiungibile, crash di un nodo prima della notifica di uscita, distinzione tra crash e silenzio, side già occupato) e come il progetto li affronta o li ignora consapevolmente.

### 8. Availability vs Consistency, in pratica
Saper rispondere alla domanda "il tuo sistema privilegia availability o consistency, in caso di problemi di rete?" con un esempio concreto, magari anche un test pratico realizzato apposta (sul modello dell'esperimento con `UDP_DROP_RATE` su Distributed Pong). Questo collega direttamente il Modulo 2 al teorema CAP del Modulo 1 (sezione C1), e una buona risposta qui copre contemporaneamente un requisito di entrambi i moduli.

## Requisiti pratici facoltativi — per punteggio extra

### A. Test sui casi limite
Documentare nel progetto, similmente a quanto suggerito per l'analisi di Distributed Pong, una serie di esperimenti pratici sui casi limite del proprio sistema (es. "cosa succede se il server non è disponibile all'avvio di un client? Abbiamo testato X e osservato Y"). Pochi studenti documentano test di questo tipo, e fa un'ottima impressione perché dimostra rigore metodologico oltre alla semplice implementazione.

### B. Pattern MVC e separazione delle responsabilità
Se il progetto ha una componente di interfaccia utente (anche minimale, a riga di comando), sapere collegare esplicitamente la propria architettura del codice al pattern MVC (Model-View-Controller) visto in dettaglio per Pong, distinguendo chiaramente model, controller (event handler + input handler) e view.

### C. Rappresentazione formale dei pattern di interazione
Includere nel report del progetto almeno un sequence diagram o un message flow graph (es. realizzato con PlantUML, Graphviz, o yEd, come suggerito nelle slide) per illustrare visivamente il protocollo di comunicazione del proprio sistema. Una buona rappresentazione visiva è spesso più efficace di una lunga descrizione testuale, sia nel report sia in sede di discussione.

### D. Confronto esplicito tra UDP e TCP per il proprio caso d'uso
Anche se il progetto usa solo uno dei due protocolli, mostrare di aver considerato l'alternativa e di saperne argomentare lo scarto, sul modello dell'analisi fatta per Distributed Pong (UDP scelto nonostante la sua inaffidabilità, perché compatibile coi requisiti di bassa latenza di un videogioco in tempo reale).

### E. Esecuzione speculativa e tecniche di mascheramento della latenza
Se rilevante per il proprio progetto (es. applicazioni interattive in tempo reale), conoscere e poter discutere la tecnica dell'esecuzione speculativa lato client (visto nell'esercizio finale "Available Distributed Pong") come esempio concreto di come un sistema distribuito può dare priorità all'availability percepita dall'utente, accettando temporanea inconsistenza con lo stato "vero" lato server.

## Checklist rapida specifica per il Modulo 2

Da affiancare alla checklist del Modulo 1, prima della discussione orale è bene saper rispondere con sicurezza anche a queste domande:

1. Il tuo progetto usa socket UDP o TCP (o entrambi)? Perché?
2. Quale infrastruttura distribuita hai scelto per il tuo progetto (locale/centralizzata/brokered/replicata)? Quali alternative hai scartato, e perché?
3. Quali componenti infrastrutturali (server, client, broker, load balancer...) compongono il tuo sistema?
4. Quale pattern di interazione (request-response, publish-subscribe...) usa il tuo sistema per comunicare tra i componenti?
5. Come gestisce il tuo sistema l'ingresso e l'uscita dinamica di partecipanti (se applicabile)?
6. Il tuo sistema privilegia availability o consistency, in caso di problemi di rete? Come l'hai verificato (o come lo verificheresti)?
7. Quali delle 8 feature di design (redundancy, failover, checkpoint/rollback, consensus, heart-beat/timeout/retry, authentication/authorization, data partitioning) implementa il tuo progetto?
8. Hai seguito il workflow di SE esteso per i sistemi distribuiti nella progettazione? Quali domande aggiuntive ti sei posto rispetto a un progetto software "tradizionale"?

Come per il Modulo 1, l'obiettivo è collegare ogni risposta esplicitamente a un concetto specifico visto a lezione (citandolo per nome, es. "questo segue il pattern publish-subscribe visto nel documento Preliminaries del Modulo 2" oppure "qui applichiamo la scelta availability-vs-consistency discussa per Distributed Pong, coerentemente col teorema CAP del Modulo 1") — è l'elemento singolo più efficace per dimostrare la comprensione richiesta dai docenti e puntare al massimo del voto.
