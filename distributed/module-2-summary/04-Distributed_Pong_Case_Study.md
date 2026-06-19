# Distributed Pong — Caso di Studio Completo

## Cos'è Pong?
Il classico videogioco Pong (https://en.wikipedia.org/wiki/Pong). **Obiettivo dell'esempio guidato**: implementare una versione distribuita del gioco Pong in Python, usando PyGame, per esemplificare lo sviluppo di un progetto di sistema distribuito.

**Risultato finale**: codice sorgente disponibile su https://github.com/unibo-fc-isi-ds/dpongpy, installabile con `pip install dpongpy` e lanciabile con vari flag, ad esempio per giocare in locale (`--mode local`) o per avviare un server centralizzato (`--mode centralised --role coordinator`) a cui i terminali dei giocatori si connettono (`--role terminal --side left/right --keys wasd/arrows --host IP_COORD`). Key binding di default: paddle sinistro WASD, paddle destro frecce direzionali.

**PyGame**: una popolare libreria Python per scrivere giochi semplici, che gestisce grafica, suono, tempo, gestione input; semplice da usare ma sufficientemente potente per giochi non banali; leggera, portabile, facile da installare (`pip install pygame`).

## Preliminari: il Game Loop

Un **game loop** è il ciclo logico principale della maggior parte dei videogiochi: gira continuamente finché il gioco è attivo, gestendo: (1) elaborazione degli input utente (tastiera, mouse, gamepad), (2) aggiornamento dello stato del gioco (es. spostamento di oggetti nello spazio virtuale), (3) rendering del gioco (disegnare il mondo di gioco sullo schermo), (4) simulazione del passaggio del tempo nel gioco (es. spostare oggetti anche in assenza di input). Tipicamente, viene introdotta un'attesa alla fine di ogni ciclo per controllare il frame rate del gioco.

PyGame ha una nozione di **eventi e coda di eventi**, utile per gestire gli input utente: ogni evento ha un tipo (es. `pygame.KEYDOWN`, `pygame.KEYUP`) e attributi (es. `event.key`) — esiste una classe `pygame.event.Event`, e i tipi di evento sono in realtà interi; gli eventi possono essere recuperati dalla coda (`pygame.event.get([RELEVANT_TYPES])`) e, eventualmente, provocati (cioè aggiunti alla coda) dal programmatore (`pygame.event.post(event)`).

### Raccomandazioni di clean code per il game loop

1. **Rappresentare esplicitamente gli oggetti di gioco**: un `GameObject` è qualunque entità che possa apparire nel mondo di gioco (es. il cerchio); aspetti rilevanti: dimensione, posizione, velocità, nome, bounding box; lo stato complessivo del gioco consiste in tutti i `GameObject` contenuti — aggiornare il gioco significa aggiornare ciascun oggetto di gioco.

2. **Rappresentare esplicitamente gestori di input e controller**: `InputHandler` è qualunque entità che interpreti gli input utente e li mappi su eventi di gioco (supporta diversi key map collegabili); i **Game Event** rappresentano azioni rilevanti per gli oggetti di gioco (es. `MOVE_UP`, `MOVE_DOWN`, `STOP`); tipi di evento custom possono essere definiti tramite `pygame.event.custom_type()`; il `Controller` è qualunque entità che interpreti gli eventi di gioco e aggiorni di conseguenza lo stato del gioco.

3. **Delegare il rendering a una classe dedicata**: la `View` è qualunque entità che possa disegnare gli oggetti di gioco sullo schermo (può avere metodi per renderizzare gli oggetti di gioco).

4. **Wrap up**: il game loop risulta molto semplificato; cambiamenti nella gestione degli input richiedono di implementare un nuovo `InputHandler`; cambiamenti nella logica di gioco richiedono un nuovo `Controller`; cambiamenti nella visualizzazione richiedono una nuova `View`.

## Il modello di Pong

### Inferire il modello dalla vista
Fino a 4 paddle per altrettanti giocatori; una palla che rimbalza sui paddle e sui muri.

### Le classi del modello
1. **`GameObject`**: entità visibile nel gioco — proprietà rilevanti: `name`, `position`, `size`, `speed`, `bounding_box` (posizione, dimensione e velocità sono istanze di `Vector2`); casi particolari: `Paddle`, `Ball`. Le istanze di `Paddle` sono assegnate a un lato (proprietà `side`) dello schermo — 4 lati possibili per altrettante `Direction`: UP, DOWN, LEFT, RIGHT; ogni paddle corrisponde a un giocatore diverso; per supportare il multiplayer locale servono key binding diversi.

2. **`Board`**: il piano su cui si gioca (il rettangolo nero nella figura) — proprietà rilevanti: `size`, `walls`. Un **`Wall`** è un'entità invisibile che riflette la `Ball` quando viene colpita.

3. **Classi ausiliarie**: `Vector2` (classe utility di PyGame, rappresenta un vettore 2D), `Rectangle` (classe utility che rappresenta un rettangolo, con supporto per il rilevamento delle collisioni), `Direction` (enumerazione di 4 direzioni possibili + NONE, mancanza di direzione).

### La classe `Pong` (il modello completo, schema UML)
La classe `Pong` (in `dpongpy.model`) aggrega: `config: Config`, `random: Random`, `ball: Ball`, `paddles: list[Paddle]`, `board: Board`, `updates: int`, `time: float`. Metodi principali:
- `reset_ball(speed=None)`: riposiziona la `Ball` al centro del `Board`, impostandone il vettore velocità al valore dato (se `speed` è `None`, viene fornita una direzione casuale).
- `add_paddle(side, paddle=None)`: assegna un `Paddle` al `Pong`, al lato dato (se non già presente); il `Paddle` viene creato da zero se `paddle` è `None` (in tal caso, centrato sul lato del `Board`).
- `paddle(side)`, `has_paddle(side)`, `remove_paddle(side)`.
- `update(dt)`: aggiorna lo stato del gioco, spostando la `Ball` e i `Paddle` secondo il delta di tempo dato; calcola le collisioni tra `Ball` e `Paddle`/`Wall` (usando il metodo `_handle_collisions`).
- `move_paddle(side, direction)`: muove il `Paddle` selezionato nella direzione data, impostandone il vettore velocità di conseguenza (il `Paddle` può essere indicato per indice o per `Direction`; i paddle sinistro/destro possono muoversi solo su/giù, quelli su/giù solo sinistra/destra).
- `stop_paddle(side)`: ferma il `Paddle` selezionato.

### Le collisioni
Il rilevamento delle collisioni è un aspetto cruciale dello sviluppo di videogiochi: è il processo di determinare quando due o più oggetti di gioco si sovrappongono, ed è la base della simulazione fisica nei giochi. In Pong, le collisioni sono molto semplici, basandosi solo sulle bounding box degli oggetti di gioco (la bounding box è il rettangolo minimo che racchiude l'oggetto; una collisione viene rilevata quando due bounding box si sovrappongono). In Pong esistono 3 tipi di collisioni rilevanti: Ball vs Paddle, Ball vs Wall, Paddle vs Wall. Il rimbalzo (bouncing) si ottiene semplicemente invertendo il vettore velocità della Ball lungo l'asse di collisione.

**API di rilevamento collisioni** (su `GameObject`/`Rectangle`): `overlaps(other)` (booleano, se si sovrappongono), `is_inside(other)` (booleano, se uno è interamente dentro l'altro), `intersection_with(other)` (il rettangolo di intersezione, o `None`), `hits(other)` (dizionario `{Direction: profondità}` delle direzioni di collisione, o solleva `ValueError` se un oggetto è interamente dentro l'altro).

**Sequenza del rimbalzo**: (1) la Ball è vicina a un ostacolo e viene chiamato `update()`; (2) la posizione della Ball viene aggiornata e ora si sovrappone all'ostacolo — `ball.hits(wall)` restituisce ad esempio `{UP: h}`; (3) il rimbalzo avviene invertendo il vettore velocità lungo l'asse di collisione e riposizionando la Ball fuori dall'ostacolo (`ball.speed.y *= -1; ball.position.y += h`); (4) una successiva chiamata a `update()` allontanerà la Ball dall'ostacolo.

## Pong I/O

### Gli input
**Insight**: gli input sono dati esterni, che rappresentano eventi che possono impattare lo stato del sistema (tipicamente corrispondenti ad azioni dell'utente, con eccezioni). In un semplice videogioco come Pong, si distingue tra: **control event** (corrisponde a un aggiornamento dello stato del gioco) e **input event** (evento di basso livello, che richiede elaborazione per essere tradotto in un control event).

### Design degli input e control event

**Domande di design**: quali input event sono rilevanti? (input da tastiera — pressioni/rilasci di tasti: la pressione dovrebbe provocare il movimento di un Paddle, il rilascio dovrebbe fermarlo). Quali altri control event sono rilevanti? (giocatore che entra/esce dal gioco, soprattutto utile in un setting distribuito; gioco che inizia/finisce, idem; passaggio del tempo nel gioco; paddle che si muove/ferma).

**Scelte di design**: due astrazioni per gestire input e control event: `InputHandler` (interpreta gli input event da tastiera e genera control event), `EventHandler` (elabora i control event e aggiorna di conseguenza lo stato del gioco, la classe `Pong`).

**Osservazione importante**: l'evento "passaggio del tempo" non corrisponde a nessun input utente — questo complica il design: concettualmente, implica che il sistema evolva anche in assenza di input; praticamente, implica che il sistema debba poter generare control event internamente. A livello di modellazione, serve un'astrazione in più: il control loop è di fatto l'astrazione che si occupa del passaggio del tempo nel gioco. **Scelta di design semplificatrice**: il tempo che passa viene considerato come un tipo speciale di input — non realmente fornito dall'utente, ma dal controllo stesso; quindi l'`InputHandler` è anche incaricato di generare gli eventi di passaggio del tempo.

**Osservazione sul setting distribuito**: nel caso generale, i Paddle vengono mossi dai giocatori tramite la tastiera; quando i giocatori sono distribuiti, le tastiere sono diverse (quindi i key binding possono essere uguali per tutti i giocatori, anche se ancora personalizzabili); quando i giocatori sono locali, c'è una sola tastiera (quindi i key binding devono essere diversi per ciascun giocatore). **Astrazioni aggiuntive utili**: `PlayerAction` (enumera tutte le possibili azioni che un giocatore può compiere su un paddle, es. muovere in una direzione, fermarsi, uscire dal gioco), `ActionMap` (associa codici tasto a `PlayerAction`).

### Proposta di design completa

Componenti coinvolti: `ActionMap` (associa codici tasto come `move_up`, `move_down`, `move_left`, `move_right`, `quit` a `PlayerAction`); `InputHandler` (sa selezionare in base all'`ActionMap`, processa gli `Event` di PyGame, genera `ControlEvent` come `MOVE_UP`, `MOVE_DOWN`, ecc., con metodi `key_pressed`, `key_released`, `time_elapsed`, `handle_inputs`); i `ControlEvent` includono anche `PLAYER_JOIN`, `PLAYER_LEAVE`, `GAME_START`, `GAME_OVER`, `PADDLE_MOVE`, `TIME_ELAPSED`; `EventHandler` (processa i `ControlEvent` con metodi come `on_player_join`, `on_player_leave`, `on_game_start`, `on_game_over`, `on_paddle_move`, `on_time_elapsed`, aggiornando il modello `Pong`).

Ogni giocatore è associato a un `Paddle` e a un `ActionMap` per governare quel `Paddle`; un `ActionMap` è un dizionario che mappa codici tasto a `PlayerAction` (es. `pygame.K_UP → MOVE_UP`, `pygame.K_DOWN → MOVE_DOWN` per il paddle destro con le frecce; `pygame.K_w → MOVE_UP`, `pygame.K_s → MOVE_DOWN` per il paddle sinistro con WASD); le `PlayerAction` sono un tipo particolare di `ControlEvent`; i `ControlEvent` sono eventi custom di PyGame che animano il gioco, ciascuno parametrico (può trasportare dati aggiuntivi, es. `PADDLE_MOVE` trasporta l'informazione su quale Paddle si muove e in che direzione).

**Esempio di elaborazione input da tastiera**: il giocatore 1 (controlla il paddle sinistro, con `ActionMap` che associa `pygame.K_UP` a `move_up`) preme il tasto UP → PyGame accoda l'evento `Event(type=pygame.KEYDOWN, key=pygame.K_UP)` → l'`InputHandler` lo estrae dalla coda (via `pygame.event.get(...)`) e genera un `ControlEvent` di tipo `PADDLE_MOVE` con dati `{paddle_index: Direction.LEFT, direction: Direction.UP}` → l'`EventHandler` lo estrae a sua volta e muove il paddle sinistro verso l'alto nel modello `Pong`.

**Esempio di elaborazione del passaggio del tempo**: `pygame.time.Clock` calcola Δt (il tempo trascorso dall'ultimo frame); il control loop passa Δt all'`InputHandler`, che genera un `ControlEvent` di tipo `TIME_ELAPSED`; l'`EventHandler` lo estrae e muove tutti gli oggetti di gioco secondo la loro velocità corrente moltiplicata per Δt.

### `Controller`: l'unione di `EventHandler` e `InputHandler`
Si chiama `Controller` qualunque entità che agisca sia come `EventHandler` sia come `InputHandler`.

### Gli output
**Insight**: gli output sono rappresentazioni dello stato del sistema percepite dal mondo esterno (tipicamente corrispondenti a feedback visivo o uditivo per l'utente). Nel caso di Pong: l'output è semplicemente un rendering dello stato del gioco sullo schermo; questo è possibile perché modello e controllo sono stati separati, quindi ora è il momento di separare anche la vista — essenzialmente, si segue il pattern **MVC** (Model = `Pong`, Control = `EventHandler` + `InputHandler`, View). Se il rendering viene aggiornato abbastanza frequentemente, l'utente percepisce il gioco come animato — il "abbastanza frequentemente" è il frame rate del gioco (30-60 fps è comune).

**Classi della view**: `PongView` (classe base astratta, con metodo `render()`), `ScreenPongView` (renderizza effettivamente su schermo, con metodi `render_ball`, `render_paddles`, `render_paddle`), `ShowNothingPongView` (implementazione "nulla", utile per nascondere il gioco — es. per i terminali in modalità server).

### `PongGame`: wiring di tutti i componenti
La classe `PongGame` orchestra tutto: inizializza `Settings`, crea l'istanza `Pong` del modello, crea la `view` (tramite `create_view()`), crea il `controller` (tramite `create_controller()`), gestisce il `clock` di PyGame e il flag `running`; espone hook (`before_run`, `after_run`, `at_each_run`) e i metodi `run()`/`stop()`.

**Lancio del gioco**: tramite riga di comando, con opzioni come `--mode {local}`, `--side {none,left,up,right,down}`, `--keys {wasd,arrows,ijkl,numpad}`, `--debug`, `--size`, `--fps`. Lancio minimale: `poetry run python -m dpongpy --mode local`.

## Verso Distributed Pong: applicare il workflow di SE per DS

> Solo gli aspetti rilevanti per i sistemi distribuiti vengono discussi qui, applicando esplicitamente il workflow esteso visto in "Preliminaries about Distributed Systems Engineering".

### 1. Use case collection
Dove sono gli utenti? Seduti davanti al proprio computer, connessi a internet o a una LAN; si vuole che gli utenti possano giocare insieme da posizioni diverse. Quando e con quale frequenza interagiscono? Sporadicamente avviano una partita, ma una volta iniziata le interazioni sono molto frequenti. Come interagiscono, con quali dispositivi? Premere tasti su un computer impatta cosa viene mostrato su un altro. Il sistema deve salvare dati utente? No, ma molta informazione deve essere scambiata tra utenti durante la partita (questo potrebbe cambiare se si introducono leaderboard). Probabilmente ci saranno più ruoli: semplicemente giocatori, possibilmente spettatori (giocatori che non forniscono input ma ricevono tutto il feedback visivo).

### 2. Requirements analysis
Come sincronizzare e coordinare gli input provenienti da giocatori diversi? Probabilmente serve un componente infrastrutturale dietro le quinte per farlo. Il sistema deve scalare? Non proprio in scala, ma deve supportare giocatori che entrano ed escono in qualunque momento. Come gestire i guasti? Come recuperare? Cosa succede se un giocatore va offline durante la partita? (1) il gioco si mette in pausa finché il giocatore si riconnette; (2) la palla torna al centro e il paddle corrispondente viene rimosso; (3) il paddle corrispondente viene congelato sul posto. Cosa succede se il componente infrastrutturale diventa irraggiungibile? (1) il gioco si mette in pausa finché il componente non torna raggiungibile. Criteri di accettazione: la latenza deve essere abbastanza bassa da garantire un'esperienza di gioco fluida (es. evitare lag nei movimenti di palla/paddle).

### 3. Design — quale infrastruttura?
Domanda chiave: ci sono componenti infrastrutturali da introdurre? Quanti? Come si distribuiscono sulla rete? In altre parole: come è organizzata l'infrastruttura del sistema?

#### Opzione A — Nessuna infrastruttura (locale)
Flusso di informazione: Input Events → Pong Model → render to local.

#### Opzione B — Infrastruttura centralizzata
Si suppone un server centrale che coordina il gioco: i Client (1 e 2) inviano Input Events al Server, che mantiene il Pong Model e invia indietro il modello aggiornato (da renderizzare) ai client.

#### Opzione C — Infrastruttura con broker (brokered)
Come quella centralizzata, ma un broker viene usato per inoltrare i messaggi: Client 1/2 ↔ Broker ↔ Server, dove il Server mantiene il Pong Model e invia gli aggiornamenti tramite il Broker ai client.

#### Opzione D — Infrastruttura replicata
Come quella centralizzata, ma il server è replicato e un protocollo di consenso viene usato per mantenere le repliche sincronizzate: Server 1 e Server 2 si scambiano messaggi di consenso, e ciascuno gestisce input/aggiornamenti verso i client a esso collegati.

### Quale scegliere?
1. **Infrastruttura locale**: implica nessuna distribuzione per i giocatori (non soddisfa il requisito di giocare da postazioni diverse).
2. **Infrastruttura centralizzata**: implica un singolo punto di fallimento (il server); complica il deployment: chi è incaricato di avviare il server? (es. un giocatore — complica la procedura di avvio; oppure hosting online — rende il controllo accessi più critico, aggiunge costi di deployment e manutenzione); dove dovrebbe essere localizzato il server?
3. **Infrastruttura con broker**: implica due singoli punti di fallimento (il broker, il server) — essenzialmente ha tutti gli svantaggi dell'infrastruttura centralizzata, più la complessità del broker: dove deployare il broker? potenzialmente maggiore latenza, per via dell'hop aggiuntivo nella propagazione dei messaggi; può disaccoppiare temporalmente il server dai client, il che è un non-obiettivo nel nostro caso.
4. **Infrastruttura replicata**: è eccessiva (overkill) per un semplice gioco online — per i videogiochi, è meglio dare priorità ad availability piuttosto che a consistency; nessuno storage di dati → nessun forte bisogno di consistency.

**Scelta**: infrastruttura **centralizzata**.

### 3 (continuazione). Design — dettagli con infrastruttura centralizzata
Quanti componenti infrastrutturali? Es. un server per coordinare + client (uno per giocatore). Come si distribuiscono sulla rete? Es. server centralizzato sul cloud, client sui computer di tutti gli utenti; oppure server centralizzato sul computer di un utente, client sui computer degli altri utenti. Come si mappano le entità di dominio sui componenti infrastrutturali? Es. l'entità `PongGame` viene aggiornata dal server e replicata su tutti i client, in modo master-slave; un'entità `PongView` per client, per renderizzare lo stato di gioco sullo schermo locale; un'entità `InputHandler` per client, per catturare gli input locali e inviarli al server; un'entità `EventHandler` sul server, per ricevere gli input remoti e aggiornare di conseguenza `PongGame`. Come comunicano i componenti? Quali pattern di interazione? (request-response? publish-subscribe?). I componenti devono salvare dati? Nessun reale bisogno di storage persistente, ma lo stato complessivo del gioco deve essere replicato su tutti i client (N copie); la replicazione deve essere il più rapida/frequente possibile per evitare inconsistenze; priorità ad availability rispetto a consistency. Come si trovano i componenti tra loro? Es. i client si assumono conoscere l'IP del server centrale. Come si riconoscono? Es. si assume fiducia reciproca, nessun bisogno di autenticazione.

### 4. Implementation
Quali protocolli di rete? UDP (buono per applicazioni a bassa latenza e tempo reale — scelta adottata! nessun grande problema per la perdita di pacchetti in un videogioco, anche se duplicazione, consegna non ordinata e ritardi possono creare problemi) vs TCP (buono per affidabilità ma può introdurre latenza; complicherebbe il design del server centrale, che dovrebbe gestire più connessioni simultanee). Come rappresentare i dati in transito? Una rappresentazione binaria sarebbe meglio per evitare sprechi di banda/latenza — si userà JSON per scopi didattici, per poi passare a BSON. Nessun bisogno di capacità di storage, quindi nessun bisogno di database. Comunicazione basata su fiducia → nessun bisogno di autenticazione. Autorizzazione basata su fiducia: ogni client dovrebbe poter comandare uno e un solo paddle — politica first-come-first-served per l'assegnazione dei paddle.

## Architettura di Distributed Pong

### Vista dei componenti
**Coordinator** (eseguito "da qualche parte"): è il server centrale che coordina il gioco — esegue il game loop e aggiorna lo stato del gioco, senza ascoltare la tastiera né renderizzare il gioco; riceve input dai client; invia periodicamente lo stato di gioco aggiornato ai client.

**Terminal** (uno per host/giocatore): è l'endpoint del client, che visualizza il gioco — ascolta la tastiera e invia input al coordinator; riceve lo stato di gioco dal coordinator e lo renderizza sullo schermo.

**Architettura Event-Based**: il coordinator pubblica eventi di "aggiornamento dello stato di gioco" e consuma eventi di "input"; i terminal consumano eventi di "aggiornamento dello stato di gioco" e pubblicano eventi di "input".

### Vista comportamentale
2 tipi di processi: **Coordinator** e **Terminal**. 2 tipi di canali di comunicazione per 2 tipi di eventi: uno per gli aggiornamenti dello stato di gioco, uno per gli input. Ciascun processo porta avanti diverse attività concorrenti:

**Coordinator**: (1) ascolta gli input in arrivo dai terminal; (2) esegue il game loop e invia indietro gli aggiornamenti dello stato di gioco. Ciclo: riceve gli input dai terminal (Listening) → genera eventi di Game Loop → aggiorna lo stato di gioco (Update) → dopo 1/FPS secondi, invia lo stato aggiornato ai terminal (Sleep).

**Terminal**: (1) invia input al coordinator; (2) ascolta gli aggiornamenti di stato di gioco in arrivo dal coordinator; (3) renderizza lo stato di gioco sullo schermo. Ciclo: ascolta gli aggiornamenti dal coordinator (Listening) → sovrascrive lo stato di gioco locale → legge lo stato di gioco e lo renderizza (Rendering) → dopo 1/FPS secondi, attende (Sleeping).

### Vista dell'interazione
Mette in evidenza quando i messaggi vengono scambiati, e da chi: il coordinator invia messaggi di aggiornamento di stato a tutti i terminal una volta ogni X secondi; i terminal inviano messaggi di input al coordinator ogni volta che un tasto viene premuto o rilasciato. Esempio di sequenza: User 1 preme `K_A` → Terminal 1 invia `{input: K_A, from: Terminal_1}` al Coordinator; User 2 preme `K_B` → Terminal 2 invia `{input: K_B, from: Terminal_B}`; dopo 1/FPS secondi, il Coordinator raccoglie gli input `[K_A, K_B]`, calcola `dt = 1/FPS`, computa `S' = update_game_state(S, inputs, dt)`, e invia `S'` a entrambi i Terminal, che renderizzano `S'`.

## Questioni di design aperte

Cosa manca? (1) Come dovrebbero unirsi i giocatori al gioco? (2) Come dovrebbero lasciare il gioco?

### Protocollo di Join/Leave (proposta)

**0. Assunzioni**: il coordinator viene avviato prima di qualunque terminal; il coordinator è raggiungibile da tutti i terminal.

**1. Joining**: (1) i giocatori avviano i terminal scegliendo il proprio paddle (per lato), con politica first-come-first-served; (2) i terminal inviano un messaggio `PLAYER_JOIN` al coordinator all'avvio; (3) il coordinator semplicemente registra il nuovo paddle, e resetta la posizione della palla; (4) il coordinator inizia ad accettare input dal nuovo paddle/terminal, aggiornando di conseguenza lo stato di gioco.

**2. Leaving (in modo controllato)**: (1) i giocatori possono premere un tasto (es. ESC) per uscire dal gioco; (2) i terminal inviano un messaggio `PLAYER_LEAVE` al coordinator all'uscita (solo dopo aver inviato il messaggio, il nodo terminal può terminare); (3) alla ricezione del messaggio, il coordinator deregistra il paddle e resetta la posizione della palla; (4) il coordinator termina se non ci sono più paddle (altrimenti continua a operare normalmente).

### Problemi del protocollo Join/Leave
1. Cosa succede se il coordinator non è disponibile quando il terminal si avvia?
2. Cosa succede se un terminal crasha prima di inviare il messaggio `PLAYER_LEAVE`?
3. Come può il coordinator distinguere un terminal crashato da uno che semplicemente non sta inviando input?
4. Cosa succede se il coordinator crasha mentre alcuni terminal sono ancora in esecuzione?
5. Cosa succede se un terminal sceglie un lato già occupato?
6. Cosa succede se un terminal invia input riguardanti il paddle sbagliato?

### Soluzioni proposte
1. **Coordinator non disponibile all'avvio**: es. il terminal semplicemente termina; es. il terminal attende (fino a un timeout, e non oltre un numero massimo di retry) che il coordinator diventi disponibile.
2. **Terminal crasha prima di `PLAYER_LEAVE`**: es. con UDP, può servire un meccanismo di heart-beat personalizzato; es. con TCP, la connessione muore e il coordinator può accorgersi del crash del terminal.
3. **Distinguere crash da silenzio**: es. tramite timeout lato coordinator.
4. **Coordinator crasha con terminal ancora attivi**: es. tramite timeout lato terminal.
5. **Lato già occupato**: es. il coordinator ignora silenziosamente il messaggio `PLAYER_JOIN`; es. il coordinator rifiuta il messaggio `PLAYER_JOIN` e il terminal termina (implica cambiare il protocollo di join in uno request-response).
6. **Input sul paddle sbagliato**: es. il coordinator ignora silenziosamente gli input (implica che il coordinator tenga traccia di quale paddle è associato a quale terminal); es. il coordinator espelle il terminal che si comporta male (stessa implicazione di sopra, più l'implicazione che il protocollo di leave possa essere avviato anche dal coordinator).

## Analisi dell'implementazione di Distributed Pong

### Struttura del progetto
Repository: https://github.com/unibo-fc-isi-ds/dpongpy. Struttura (solo organizzazione di classi/interfacce in package, e relazioni di sottotipizzazione):
```
package dpongpy
├── class PongGame              // entry point per il gioco locale
├── package dpongpy.model
│   └── class Pong
├── package dpongpy.controller
│   ├── interface EventHandler
│   ├── interface InputHandler
│   ├── package dpongpy.local
│   │   ├── class PongInputHandler : InputHandler
│   │   ├── class PongEventHandler : EventHandler
│   │   └── class PongLocalController : PongInputHandler, PongEventHandler
│   └── package dpongpy.view
│       ├── interface PongView
│       ├── class ScreenPongView : PongView
│       └── class ShowNothingPongView : PongView
├── package dpongpy.remote
│   ├── class Address
│   ├── interface Session
│   ├── interface Server
```
**Suggerimento di studio**: osservare il codice, in particolare le classi `PongCoordinator` e `PongTerminal`, confrontando il codice col design discusso (specialmente le viste interazione e comportamentale).

### Verificare i casi limite (corner case)
Rispetto ai problemi del protocollo Join/Leave elencati sopra, come si comporta l'implementazione reale? Si propongono esperimenti pratici da fare:
1. **Coordinator non disponibile all'avvio**: avviare un terminal senza coordinator attivo — cosa succede?
2. **Terminal crasha senza `PLAYER_LEAVE`**: avviare il coordinator e poi 2 terminal per 2 paddle diversi, uccidere un terminal — cosa succede?
3. **Coordinator crasha con terminal attivi**: avviare il coordinator e poi 1 terminal, uccidere il terminal (testo originale nota questo come caso "3" ma corrisponde concettualmente al caso 4 della lista precedente) — cosa succede?
4. **Lato già occupato**: avviare il coordinator e poi 2 terminal per lo stesso paddle — cosa succede?
5. **Input sul paddle sbagliato**: iniettare un bug nel terminal per forzare l'invio di eventi per lo stesso paddle (esempio di codice fornito che sovrascrive `paddle_index` a `Direction.LEFT` in `Controller.post_event`, in `dpongpy/remote/centralised/__init__.py`, riga 114) — avviare il coordinator e 2 terminal — cosa succede?

### Availability vs Consistency nella pratica
Domanda chiave: l'attuale design/implementazione privilegia availability o consistency? **Come scoprirlo**: simulare una partizione di rete — dato che si usa UDP, la perdita di messaggi è già possibile quando coordinator e host sono su macchine diverse; per rendere la partizione più evidente, si può forzare un tasso di perdita pacchetti più alto impostando la variabile d'ambiente `UDP_DROP_RATE` (es. a 0.2, per una probabilità di perdita pacchetti del 20%), poi lanciare coordinator e terminal. **Test**: il gameplay è fluido o laggy? Se fluido → si sta privilegiando availability. Se laggy → si sta privilegiando consistency.

## Esercizio: Available Distributed Pong

**Obiettivo**: modificare l'attuale implementazione di `dpongpy` per privilegiare availability rispetto a consistency, in modo da rendere il gioco fluido anche in presenza di problemi di rete.

**Suggerimenti**: implementare **esecuzione speculativa** lato terminal, per far apparire il gioco disponibile anche quando il coordinator non risponde: (1) il game loop del terminal non dovrebbe mai bloccarsi, in particolare non dovrebbe bloccarsi in attesa degli aggiornamenti del coordinator; (2) il terminal dovrebbe invece continuare ad aggiornare lo stato di gioco locale secondo gli input locali, e renderizzarlo come al solito; (3) alla ricezione di un nuovo aggiornamento dal coordinator, il terminal dovrebbe sovrascrivere lo stato di gioco locale con quello remoto.

**Scadenza**: 31 dicembre 2025. **Incentivo**: +1 punto sul voto finale (se la soluzione è soddisfacente). **Sottomissione**: fork del repository `dpongpy`, creazione di un branch `exercise-lab1`, commit delle modifiche sul nuovo branch, push e pull request al repository originale, intitolata `[A.Y. 2025/2026 Cognome, Nome] Exercise: Available Distributed Pong`, descrivendo la soluzione, motivando le scelte e spiegando come testarla.

## Riepilogo dei concetti del corso applicati in Distributed Pong

Questo caso di studio è un esempio paradigmatico di come applicare concretamente la teoria vista nel Modulo 1 e i principi del Modulo 2:
- **Architettura Event-Based** (M8 del Modulo 1): coordinator e terminal comunicano tramite pubblicazione/consumo di eventi di input e di aggiornamento di stato.
- **Trade-off CAP / Availability vs Consistency** (C1 del Modulo 1): la scelta di UDP e l'analisi esplicita di availability vs consistency, con l'esercizio finale che chiede di spostare deliberatamente il trade-off verso l'availability tramite esecuzione speculativa.
- **Fault tolerance e gestione dei guasti** (M1, e le "feature di design" del documento Preliminaries): l'intero protocollo di Join/Leave è un esercizio di analisi dei modi di guasto (coordinator irraggiungibile, terminal che crasha, messaggi malformati) e delle relative contromisure (timeout, retry, heart-beat impliciti).
- **Pattern di interazione Publish-Subscribe** (documento Preliminaries): il coordinator pubblica aggiornamenti di stato che i terminal consumano, e viceversa per gli input.
- **Modelli di consistenza** (M3 del Modulo 1): la scelta esplicita di "eventual consistency" implicita (il terminal mostra lo stato più recente disponibile, anche se non perfettamente sincronizzato col coordinator) è discussa in termini molto simili al modulo teorico sulla replicazione.
