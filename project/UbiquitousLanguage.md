# Ubiquitous Language — Bamboom

## Bounded Context: Identity

Gestisce l'identità degli utenti, l'autenticazione e il profilo.

### Attori

| Termine          | Definizione                                                                                                                                                                         |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **user**         | Chiunque abbia un account registrato nel sistema. Può essere un *player* o un *admin*.                                                                                              |
| **guest-player** | Utente non registrato che accede al sistema con un'identità temporanea. Può partecipare a partite pubbliche o private ma non può creare partite né possedere *deck* personalizzati. |
| **admin**        | Utente con privilegi elevati. Può gestire *carte*, *deck* di default, bannare *user* e accedere alla *dashboard*.                                                                   |
| **friend**       | Relazione bidirezionale e confermata tra due *user*. Si instaura dopo che una *friend-request* è stata accettata.                                                                   |

### Operazioni e oggetti

| Termine                     | Definizione                                                                                                                                                                   |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **registration**            | Processo di creazione di un account: richiede email, password e nickname univoco.                                                                                             |
| **login**                   | Autenticazione di un *user* tramite email + password.                                                                                                                         |
| **OTP (One-Time Password)** | Codice monouso inviato via email per verificare l'identità durante il *login* o il recupero password.                                                                         |
| **JWT (JSON Web Token)**    | Token stateless emesso dal server al completamento del *login*, usato per autorizzare le richieste successive. Rappresenta la sessione dell'utente in un sistema distribuito. |
| **password-recovery**       | Flusso che permette a un *user* di reimpostare la password tramite *OTP*.                                                                                                     |
| **friend-request**          | Richiesta di amicizia inviata da un *user* a un altro. Può essere accettata o rifiutata.                                                                                      |
| **friend-list**             | Elenco di tutti i *friend* di un *user*.                                                                                                                                      |
| **ban**                     | Provvedimento dell'*admin* che impedisce a un *user* di accedere al sistema, temporaneamente o permanentemente.                                                               |
| **user-profile**            | Insieme dei dati pubblici di un *user*: nickname, statistiche, *achievements*.                                                                                                |
| **statistics**              | Dati aggregati per *user*: numero di partite giocate, vittorie, *deck* creati. Aggiornate a ogni *game-ended* event.                                                          |
| **achievement**             | Obiettivo sbloccabile da un *user* compiendo azioni specifiche nel gioco (es. "sopravvissuto a 5 bombe"). Rappresentato come *domain event* nel sistema.                      |
| **badge**                   | Contatore o icona che sintetizza il numero o il tipo di *achievement* ottenuti da un *user*.                                                                                  |

---

## Bounded Context: Catalog

Gestisce le definizioni delle *carte* e dei *deck* di default. Di competenza dell'*admin*.

### Oggetti

| Termine          | Definizione                                                                                                                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **card**         | Unità base del gioco. Definita da: nome, tipo (*card-type*), effetto, immagine. Le *card* di sistema sono create dall'*admin*; le *card* all'interno di un *deck* sono istanze di una definizione. |
| **card-type**    | Categoria funzionale di una *card*. Determina quando e come può essere giocata. Valori: `action-a`, `action-b`, `bomb`, `defuse`, `panda`. Vedi sezione Meccaniche di gioco per i dettagli.        |
| **default-deck** | *Deck* predefinito creato e gestito dall'*admin*, disponibile a tutti i *user* come punto di partenza per le partite o per il *deck-building*.                                                     |
| **card-effect**  | Descrizione formale dell'effetto di una *card*: parametri, condizioni di attivazione, risoluzione.                                                                                                 |

---

## Bounded Context: Deck Building

Gestisce la creazione e la gestione dei *deck* personalizzati dei *user*.

### Oggetti

| Termine                | Definizione                                                                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|
| **deck**               | Insieme ordinato di *card* usato in una *game*. Può essere un *default-deck* o un *custom-deck*.               |
| **custom-deck**        | *Deck* personalizzato, associato a un *user* registrato. Creato a partire da *card* singole o da altri *deck*. |
| **deck-back**          | Grafica del retro delle *card* del *deck*, personalizzabile dal *user*.                                        |
| **deck-building-page** | Schermata dell'applicazione dedicata alla creazione e modifica dei *custom-deck*.                              |

---

## Bounded Context: Lobby

Gestisce il ciclo di vita di una partita dalla creazione all'avvio.

### Attori

| Termine         | Definizione                                                                                                                                                                                                |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **master**      | Il *player* che ha creato la *lobby*. Ha il controllo esclusivo sulle *game-settings* e sull'avvio della partita. Se il *master* lascia la *lobby*, viene eletto un nuovo *master* tra i *player* rimasti. |
| **participant** | Qualsiasi *player* o *guest-player* presente in una *lobby* prima che la partita inizi.                                                                                                                    |

### Pagine e sale virtuali

| Termine       | Definizione                                                                                                            |
|---------------|------------------------------------------------------------------------------------------------------------------------|
| **menu**      | Interfaccia principale del *user* dopo il *login*. Punto di accesso a tutte le funzionalità.                           |
| **pre-lobby** | Schermata dove il *master* configura le *game-settings* prima di rendere disponibile la *lobby*.                       |
| **lobby**     | Sala virtuale in attesa di avvio. I *participant* si uniscono qui. Il *master* decide quando far iniziare la *game*.   |
| **join-room** | Schermata che mostra l'elenco delle *lobby* disponibili (*public-game* e *private-game*) a cui un *player* può unirsi. |

### Operazioni e oggetti

| Termine             | Definizione                                                                                                                                                                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **game-settings**   | Configurazione iniziale di una partita: numero min/max di *player*, tempo per *turn*, *deck* selezionati, numero di *bomb*, numero di *defuse*, visibilità (*public-game* / *private-game*).                  |
| **public-game**     | *Game* visibile a tutti nella *join-room*. Chiunque può unirsi.                                                                                                                                               |
| **private-game**    | *Game* accessibile solo tramite link d'invito o coppia id + password.                                                                                                                                         |
| **invite**          | Link o codice che permette a un *friend* di accedere direttamente a una *private-game* con autenticazione automatica.                                                                                         |
| **leave**           | Azione di un *participant* che abbandona la *lobby* prima dell'avvio. Se il *master* esegue il *leave*, viene attivato il protocollo di **master-election**.                                                  |
| **master-election** | Protocollo di selezione del nuovo *master* tra i *participant* rimasti dopo il *leave* del *master* corrente. Scelta: random o primo arrivato (da documentare come scelta di design per Distributed Systems). |
| **kick**            | Rimozione di un *participant* dalla *lobby* da parte del *master*.                                                                                                                                            |

---

## Bounded Context: Game

Gestisce la partita in corso: turni, carte, stato e fine partita.

### Attori

| Termine               | Definizione                                                                                                  |
|-----------------------|--------------------------------------------------------------------------------------------------------------|
| **player**            | *User* (o *guest-player*) registrato a una *game* e attivamente in gioco.                                    |
| **active-player**     | Il *player* il cui *turn* è correntemente in corso.                                                          |
| **eliminated-player** | *Player* che ha pescato una *bomb* senza poterla disinnescare. Può rimanere come *watcher-player*.           |
| **watcher-player**    | *Player* eliminato o *user* che osserva la partita in corso senza partecipare. Può inviare *emoji-reaction*. |

### Pagine e sale virtuali

| Termine       | Definizione                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------|
| **game-room** | Sala virtuale dove si svolge la *game*. Accessibile ai *player* attivi e ai *watcher-player*. |

### Struttura della partita

| Termine        | Definizione                                                                                                                                                   |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **game**       | Sessione di gioco completa, dall'avvio alla *victory*. Contiene: *player*, *draw-pile*, mani dei *player*, log degli eventi.                                  |
| **turn**       | Fase della *game* assegnata all'*active-player*. Termina con il gioco di una *card* (categoria A) o con il *draw*.                                            |
| **turn-timer** | Conto alla rovescia lato server per la durata massima di un *turn*. Allo scadere equivale a *pass*. Gestito esclusivamente dal server per prevenire cheating. |
| **draw**       | Azione di pescare la carta in cima al *draw-pile*. Conclude il *turn* del *player*.                                                                           |
| **pass**       | Scelta esplicita (o implicita per scadenza del *turn-timer*) di non giocare carte e procedere al *draw*.                                                      |
| **draw-pile**  | Mazzo comune da cui i *player* pescano. Contiene le *bomb* e le altre *card*.                                                                                 |
| **hand**       | Insieme delle *card* in possesso di un *player*. Non visibile agli altri.                                                                                     |
| **victory**    | Stato finale della *game*: l'unico *player* rimasto non eliminato vince.                                                                                      |
| **game-ended** | *Domain event* emesso al termine di una *game*. Aggiorna le *statistics* dei *player* nel bounded context Identity.                                           |

### Meccaniche delle carte

| Termine              | Definizione                                                                                                                                                                                                                                                                               |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **action-a card**    | *Card* giocabile durante il proprio *turn*, con effetto che si risolve immediatamente. Sostituisce il *draw* oppure aggiunge effetti prima di esso. Include: *attack*, *targeted-attack*, *skip*, *see-the-future*, *alter-the-future*, *shuffle*, *favor*, *bottom-draw*, *panda-combo*. |
| **action-b card**    | *Card* giocabile in qualsiasi momento, anche fuori dal proprio *turn*, in risposta a un'*action-a*. Include: *no-card*, *defuse*.                                                                                                                                                         |
| **bomb**             | *Card* che elimina il *player* che la pesca dal *draw-pile*, salvo uso di *defuse*. Il numero di *bomb* è configurato nelle *game-settings* (default: giocatori − 1).                                                                                                                     |
| **defuse**           | *Card* che permette di disinnescare una *bomb* appena pescata. Il *player* rimette la *bomb* nel *draw-pile* nella posizione desiderata.                                                                                                                                                  |
| **no-card**          | *Action-b card* che annulla qualsiasi *action-a*. Non può essere usata contro una *bomb* o una *defuse* (tranne casi speciali).                                                                                                                                                           |
| **attack**           | *Action-a card* che salta il proprio *turn* e obbliga il *player* successivo a eseguire N *turn* consecutivi.                                                                                                                                                                             |
| **targeted-attack**  | *Action-a card* variante di *attack*: il *master* sceglie il *player* bersaglio.                                                                                                                                                                                                          |
| **skip**             | *Action-a card* che salta N *turn* del *player* corrente senza pescare.                                                                                                                                                                                                                   |
| **see-the-future**   | *Action-a card* che permette di vedere le prime N *card* del *draw-pile* senza modificarne l'ordine.                                                                                                                                                                                      |
| **alter-the-future** | *Action-a card* che permette di vedere e riordinare le prime N *card* del *draw-pile*.                                                                                                                                                                                                    |
| **shuffle**          | *Action-a card* che mescola il *draw-pile*.                                                                                                                                                                                                                                               |
| **favor**            | *Action-a card* che obbliga un *player* scelto a cedere una *card* a propria scelta al *player* corrente.                                                                                                                                                                                 |
| **bottom-draw**      | *Action-a card* che permette di pescare dalla coda del *draw-pile* invece che dalla cima.                                                                                                                                                                                                 |
| **panda-combo**      | Combinazione di N *panda-card* giocate insieme per attivare un effetto speciale: 2 *panda-card* = pesca una *card* casuale da un *player*; 3 *panda-card* = chiedi una *card* specifica a un *player* (deve darcela se ce l'ha).                                                          |
| **panda-card**       | *Card* del tipo panda, priva di effetto individuale ma potente in combinazione (*panda-combo*).                                                                                                                                                                                           |
| **special-bomb**     | Variante di *bomb* che non può essere disinescata o che rimane nella mano del *player*. Definita nelle *card-effect*.                                                                                                                                                                     |

### Comunicazione in gioco

| Termine               | Definizione                                                                                                                                                                  |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **emoji-reaction**    | Reazione visiva temporanea (emoji) che un *player* o *watcher-player* può inviare durante la *game*. Non è testo; scompare dopo pochi secondi.                               |
| **game-event**        | Messaggio strutturato che descrive un'azione avvenuta nella *game* (es. carta giocata, *turn* cambiato, *player* eliminato). Ogni *game-event* porta un *logical-timestamp*. |
| **logical-timestamp** | Contatore incrementale (Lamport clock) assegnato lato server a ogni *game-event* per garantire l'ordinamento causale degli eventi. Rilevante per Distributed Systems (M6).   |

---

## Bounded Context: Admin

Gestisce le funzionalità riservate all'*admin*.

| Termine            | Definizione                                                                                                                  |
|--------------------|------------------------------------------------------------------------------------------------------------------------------|
| **dashboard**      | Interfaccia principale dell'*admin*. Mostra l'*overview* delle partite, le statistiche di sistema e i controlli di gestione. |
| **overview**       | Vista in tempo reale di tutte le *game* in corso: numero di giocatori, *turn* corrente, carte più usate.                     |
| **service-health** | Monitoraggio real-time dello stato dei servizi: numero di partite attive, utenti online, stato dei nodi distribuiti.         |

---

## Bounded Context: Infrastructure (rilevante per SPE e Distributed Systems)

Termini che descrivono l'infrastruttura tecnica del sistema.

| Termine               | Definizione                                                                                                                                                                                  |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **node**              | Processo in esecuzione su una macchina (fisica o virtuale) che partecipa al sistema distribuito.                                                                                             |
| **game-server**       | Nodo principale in Node.js/TypeScript che gestisce la logica di *game*, le *lobby* e le connessioni WebSocket.                                                                               |
| **analytics-service** | Nodo secondario in Kotlin/JVM che elabora asincronamente gli eventi di fine partita e alimenta le statistiche e la *dashboard* admin.                                                        |
| **message-broker**    | Componente (es. RabbitMQ) che disaccoppia il *game-server* dall'*analytics-service* tramite pattern publish-subscribe.                                                                       |
| **WebSocket**         | Protocollo di comunicazione full-duplex (TCP) usato per tutti i *game-event* in tempo reale. Scelto rispetto a UDP per garantire l'ordinamento e l'affidabilità nella consegna degli eventi. |
| **REST API**          | Interfaccia request-response HTTP usata per operazioni non real-time: *login*, *registration*, *deck-building*, gestione *friend-list*.                                                      |
| **heartbeat**         | Messaggio periodico inviato dal client al server (e viceversa) per rilevare disconnessioni silenziose (es. chiusura del browser senza *leave*).                                              |
| **disconnect**        | Evento rilevato dal server quando un *player* perde la connessione. Distinguibile dal *leave* esplicito tramite il meccanismo di *heartbeat*.                                                |
| **reconnect**         | Flusso di ripristino della connessione di un *player* che si era disconnesso. Il server invia l'intero stato corrente della *game* (*state-sync*).                                           |
| **state-sync**        | Messaggio inviato dal server al *player* che si riconnette, contenente lo stato completo della *game*: *hand*, *draw-pile* visibile, *turn* corrente, giocatori rimanenti.                   |
| **checkpoint**        | Snapshot periodico dello stato della *game* salvato su database, utilizzato per il *recovery* in caso di crash del server.                                                                   |
| **replica-set**       | Configurazione di MongoDB con nodi primario e secondari per garantire redundancy dei dati e disponibilità in caso di guasto.                                                                 |
| **game-log**          | Sequenza completa dei *game-event* con *logical-timestamp* relativa a una *game* conclusa. Utilizzata per il *replay*.                                                                       |

---

## Funzionalità trasversali

| Termine              | Definizione                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **help-page**        | Pagina statica con le regole del gioco, la descrizione delle meccaniche e la spiegazione di ogni *card-type*.                                                    |
| **in-game tutorial** | Tutorial interattivo passo-passo per nuovi *user*, integrato nel flusso di gioco. Riduce la curva di apprendimento e migliora i punteggi di usabilità (SUS/UEQ). |
| **replay**           | Funzionalità che permette di rivedere una *game* conclusa evento per evento, sfruttando il *game-log* ordinato per *logical-timestamp*.                          |
| **spectator**        | Sinonimo di *watcher-player* nel contesto di una *game* già avviata. Può inviare *emoji-reaction* ma non interagire con la logica di gioco.                      |

---

## Riepilogo dei Domain Events

| Event                 | Prodotto da    | Consumato da                                           |
|-----------------------|----------------|--------------------------------------------------------|
| `GameEnded`           | Game BC        | Identity BC (aggiorna *statistics*), Analytics Service |
| `PlayerEliminated`    | Game BC        | tutti i *player* nella *game-room* via WebSocket       |
| `TurnChanged`         | Game BC        | tutti i *player* nella *game-room* via WebSocket       |
| `CardPlayed`          | Game BC        | tutti i *player* nella *game-room* via WebSocket       |
| `BombDrawn`           | Game BC        | *active-player* + tutti i *watcher-player*             |
| `PlayerDisconnected`  | Infrastructure | Game BC (avvia timer di reconnect)                     |
| `PlayerReconnected`   | Infrastructure | Game BC (invia *state-sync*)                           |
| `MasterLeft`          | Lobby BC       | Lobby BC (avvia *master-election*)                     |
| `AchievementUnlocked` | Identity BC    | *user* tramite notifica                                |
| `FriendRequestSent`   | Identity BC    | *user* destinatario tramite notifica                   |

---

## Note per i corsi

- **SPE**: i *bounded context* (Identity, Catalog, Deck Building, Lobby, Game, Admin, Infrastructure) corrispondono ai
  moduli/package del repository. I *domain event* nella tabella sopra sono i punti di integrazione tra bounded context.
- **Applicazioni Web**: i termini delle sezioni "Pagine e sale virtuali" corrispondono alle route Vue. Il modello dati
  MongoDB si ricava dagli aggregati principali: `User`, `Deck` (con `Card[]` embedded), `Game` (con `GameEvent[]`
  embedded e `User[]` referenced).
- **Distributed Systems**: i termini del bounded context Infrastructure (*node*, *heartbeat*, *disconnect*, *reconnect*,
  *state-sync*, *checkpoint*, *logical-timestamp*, *replica-set*) mappano direttamente sulle 8 feature di design del
  Modulo 2.
