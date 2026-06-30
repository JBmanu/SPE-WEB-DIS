## Dominio: Bamboom

Scoprie le dimaniche del dominio (persone, azioni, interazioni, ...)

| Persone | scopo                                        |
|---------|----------------------------------------------|
| User    | giocare a boombom                            |
| Admin   | gestire i mazzi disponibili e la piattaforma |

### Tabella azioni User

- c.deck = custom deck

| Azione                            | Descrizione                                                                                                   |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------|
| login                             | loggarsi sull'applicazione                                                                                    |
| sign-up                           | registrarsi sull'applicazione                                                                                 |
| logout                            | sloggarsi dall'applicazione                                                                                   |
| forgot-password                   | avviare processo per recuperare password                                                                      |
| send friend-request               | inviare la richiesta di amizia                                                                                |
| accept friend-request             | accettare la richiesta di amizia ricevuta                                                                     |
| decline friend-request            | declinare la richiesta di amizia ricevuta                                                                     |
| view friend-list                  | visione della lista di amici correnti                                                                         |
| remove friend                     | eliminare un amico dalla lista amici                                                                          |
| search-player                     | cercare un giocatore                                                                                          |
|                                   |                                                                                                               |
| **deck building**                 |                                                                                                               |
| insert-deck                       | inserire deck prefatti dall'admin per il nuovo c.deck                                                         |
| insert-c.deck                     | inserire c.deck fatti dall'user per il nuovo c.deck                                                           |
| insert-card                       | inserire singole carte dalle espansioni + quantità per il nuovo c.deck                                        |
| remove-deck                       | rimozione dei deck dal nuovo c.deck                                                                           |
| remove-c.deck                     | rimozione dei c.deck dal nuovo c.deck                                                                         |
| remove-card                       | rimozione delle carte dal nuovo c.deck                                                                        |
| save-new-c.deck                   | salva il nuovo c.deck                                                                                         |
| save-as-new-c.deck                | salva il nuovo c.deck assegnandoli un nome                                                                    |
| view-c.deck                       | visualizzazione del c.deck creati dallo user                                                                  |
| edit-c.deck                       | modifica del c.deck creati dallo user                                                                         |
| delete-c.deck                     | eliminare un c.deck creato dallo user                                                                         |
|                                   |                                                                                                               |
| **profilo utente**                |                                                                                                               |
| most-used-deck                    | mazzo piu utilizzato                                                                                          |
| explosion-count                   | quante volte sei esploso dalla bomba                                                                          |
| defusing-count                    | quante volte hai disinnescato la bomba                                                                        |
| win-conut                         | quante volte hai vinto                                                                                        |
| loose-count                       | quante volte hai perso                                                                                        |
| used-card-count                   | quante volte hai usato la carta                                                                               |
| created-deck-count                | quanti deck hai creato                                                                                        |
| achievements                      | missioni dello user (es: fai la prima partita, fai 5 partite, ...)                                            |
| badges                            | trofeo dello user per il numero di missioni fatte                                                             |
| level                             | livello dello user                                                                                            |
|                                   |                                                                                                               |
| **documentazione**                |                                                                                                               |
| rules-game                        | regole del gioco (es: turno, giocatore, passo, ...)                                                           |
| card-ruling                       | vedi nome, descrizione, immagine, ruling                                                                      |
|                                   |                                                                                                               |
| **creazione partita (pre-lobby)** |                                                                                                               |
| time-turn                         | scelta di quanto dura il singolo turno                                                                        |
| deck-selection                    | scelta dei deck da usare (diventa un unico deck)                                                              |
| players-limit                     | scelta di giocatori minimi (2) e massimi                                                                      |
| bomb-count                        | quante bombe mettere dentro il deck (rispetto al default: giocatori-1) di gioco                               |
| defuse-count                      | quanti defuse dentro il deck (oltre al default ogni giocare parte con 1) di gioco                             |
| game-name                         | nome della partita                                                                                            |
| send-friend-invite                | scegliere gli amici da invitare (si forma cosi il gruppo nella pre-lobby)                                     |
| play-game                         | se il numero di giocatori è arrivato al massimo giochi                                                        |
| find-missing-players              | se il numero di giocatori non è sufficente entri in lobby                                                     |
| leave-game                        | se esce il master si cancella la partita, se esce amico esce dal gruppo solo lui                              |
| joined-friend-list                | lista degli amici che sono effettivamente con te in gruppo                                                    |
| remove-friend                     | solo il mastere può eliminare un amico dal gruppo (che ha joinato)                                            |
| -forse- chat del gruppo           | FORSE -                                                                                                       |
|                                   |                                                                                                               |
| **stanza pre-partita (lobby)**    |                                                                                                               |
| play                              | il master può avviare la partita sia che ci sia il numero o no (break-ball)                                   |
| view-players                      | puoi vedere i giocatori in lobby                                                                              |
| leave-player                      | puoi uscire dalla partita (se master esce allora nuovo master)                                                |
| cancel-game                       | il master decide di cancellare la partita ritorna in pre-lobby con gli amici                                  |
| -forse- chat del gruppo           | FORSE -                                                                                                       |
|                                   |                                                                                                               |
| **cerca la partita (join-game)**  |                                                                                                               |
| find-random-game                  | cerchi casualmente una partita (entri nella lobby in attesa dei player)                                       |
| choose-game-to-join               | scegli tra le partite disponibili ed entra nella lobby                                                        |
| choose-game-to-watch              | scegli tra le partite disponibili ed entra nella lobby                                                        |
| view-friend-game                  | elenco delle partite attivate dagli amici, a cui puoi accedere e a cui sei stato invitato (sei stato escluso) |
|                                   |                                                                                                               |
| **replay partita**                |                                                                                                               |
| choose-relay-game                 | scelta della partita fatta da riguardare (ultime 3)                                                           |
| play/pause-replay                 | puoi fermare o far ripartire il replay                                                                        |
| replay-speed                      | velocità di riproduzione del replay (es: tutto viene velocizzato, animazioni)                                 |
| leave-replay                      | esci dalla riproduzione del replay                                                                            |
|                                   |                                                                                                               |
| **partita**                       |                                                                                                               |
| player-hand-cards                 | carte che un giocatore possiede in mano                                                                       |
| discard-pile                      | mazzo di carte giocate dai player ad ogni turno (mazzo degli scarti)                                          |
| draw-deck                         | mazzo di carte della partitia da cui pescare                                                                  |
| draw-card                         | pesca carta                                                                                                   |
| select-card-from-hand             | seleziona una carta nella tua mano (la carta scelta diventa selected-card)                                    |
| selected-card                     | carta selezionata da giocare                                                                                  |
| use-card                          | gioca la carta selezionata                                                                                    |
| bomb-exploded                     | evento di bomba esplosa dopo averla pescata                                                                   |
| defuse-bomb                       | azione di disinnesco bomba contestuale ad esplosione bomba                                                    |
| send-reaction                     | invia una reactmoji (una emoji) a tutti i player                                                              |
| reaction                          | reazione = emoji                                                                                              |
| turn-time                         | durata massima di un turno, alla scadenza automaticamente passi quindi peschi                                 |
| leave-game                        | molla la partita, gli altri contuinuano a giocare                                                             |
| winner                            | ultimo player non esploso                                                                                     |
| loser                             | giocatore esploso                                                                                             |
| exploded-watcher-player           | player esplosi che osservano la partita                                                                       |
| watcher-player                    | user che osservano solo la partita, non giocano (join solo per osservare)                                     |
|                                   |                                                                                                               |
| *card-action*                     | azione associata alla carta (es. attacco x N, salta, NO!, ...)                                                |
| instant-use                       | la carta puo essere giocata in tutti i turni (tuo e degli altri) (es. NO)                                     |
| turn-use                          | carta giocabile solo nel tuo turno                                                                            |
| passive-action                    | carta attiva dal momento ui cui la peschi, non devi attivarla (es. mutanda)                                   |
| permanent-action                  | effetto permanente della carta finche non si verifica una condizione (es. marchia)                            |
| trigger-action                    | effetto triggerato secondo una condizione di gioco (es. quella la pesco io)                                   |
| double-action                     | doppio effetto (es. imploding)                                                                                |
| combo-action                      | l'attivazione richiede una combinazione di carte (es. carte gatto)                                            |

### Tabella azione Admin

| Azione                 | Descrizione                                                                        |
|------------------------|------------------------------------------------------------------------------------|
| create-default-deck    | possibilità di creare dei deck                                                     |
| create-expansion-cards | possibilità di creare nuova espansione con nuove carte                             |
| create-card            | possibilità di creare nuove carte                                                  |
| view-game-statistics   | carte più giocate, partite in corso, numero di utenti online, deck più giocati     |
| view-service-status    | visione dei servizi online, quantità di traffico del servizio, numero di richieste |
|                        |                                                                                    |

## Bounded-Context

### Ruoli

| player-identity-context | quest-context       | scoreboard-context | match-context           | match-replay-context | lobby-browser-context | pregame-lobby-context | deck-workshop-context | card-forge-context     | game-observatory-context | system-health-context |
|-------------------------|---------------------|--------------------|-------------------------|----------------------|-----------------------|-----------------------|-----------------------|------------------------|--------------------------|-----------------------|
| email                   | achievements        | most-used-deck     | exploded-watcher-player | choose-relay-game    | find-random-game      | turn-time             | deck                  | create-default-deck    | game-statistics          | services-status       |             
| password                | badges              | explosion-count    | watcher-player          | play/pause-replay    | choose-game-to-join   | deck                  | custom deck           | create-expansion-cards |                          |                       |             
| friends                 | level               | defusing-count     | use-card                | replay-speed         | choose-game-to-watch  | limit-player          | card                  | create-card            |                          |                       |             
| friend-request          | explosion-threshold | win-conut          | bomb-exploded           | leave-replay         |                       | bomb-setting          | save-as               | card-documentation     |                          |                       |             
| remove friend           | defuse-threshold    | loose-count        | defuse-bomb             | game                 |                       | defuse-setting        | save                  |                        |                          |                       |             
| login                   |                     | used-card-count    | winner                  |                      |                       | game-name             | edit                  |                        |                          |                       |             
| sign-up                 |                     | created-deck-count | loose                   |                      |                       | friend                | delete                |                        |                          |                       |             
| logout                  |                     |                    | player                  |                      |                       | game-request          | description           |                        |                          |                       |             
| forgot-password         |                     |                    | turn                    |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | draw-card               |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | card                    |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | turn-time               |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | player-hand-cards       |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | discard-pile            |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | draw-deck               |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | selected-card           |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | reaction                |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | leave-game              |                      |                       |                       |                       |                        |                          |                       |             
|                         |                     |                    | game                    |                      |                       |                       |                       |                        |                          |                       |             

#### Ambiguità

- vanno solo i termini (non azioni)

| Word      | player-identity-context   | quest-context | scoreboard-context | match-context                                      | match-replay-context                              | lobby-browser-context    | pregame-lobby-context                         | deck-workshop-context                                                      | card-forge-context                            | game-observatory-context | system-health-context |
|-----------|---------------------------|---------------|--------------------|----------------------------------------------------|---------------------------------------------------|--------------------------|-----------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------------|--------------------------|-----------------------|
| player    | player con le credenziali |               |                    | partecipanti alla partita                          | player che contiene lo storico delle azioni fatte |                          | giocatore in gruppo che attendono di giocare  |                                                                            |                                               |                          |                       |
| card      |                           |               |                    | carte da gioco da attivare                         |                                                   |                          |                                               | carte da aggiungere per creare i mazzi personalizzati                      | carta nuova creata dall'admin per i giocatori |                          |                       |
| turn      |                           |               |                    | turno del giocatore (durata del gioco)             |                                                   |                          |                                               |                                                                            |                                               |                          |                       |
| turn-time |                           |               |                    | finestra di tempo del giocatore per fare un azione |                                                   |                          | impostazione di quanto deve durare un turno   |                                                                            |                                               |                          |                       |
| deck      |                           |               |                    | deck di gioco dove pescare durante la partita      |                                                   |                          | composizione del deck per giocare la partita  | deck (di default o personali) usati per comporre nuovi deck personalizzati | crezione di deck di default per i giocatori   |                          |                       |
| friend    | amici della gioco         |               |                    |                                                    |                                                   | lobby create dagli amici | invitare gli amici dentro il gruppo di gioco  |                                                                            |                                               |                          |                       |
| game      |                           |               |                    | l'effettiva partita che si sta giocando            | partite giocate che si possono rivedere           |                          | preparazione delle impostazioni della partita |                                                                            |                                               |                          |                       |

### Contexts

| Person | Done | Context                  | Responsibility                                                                                                                        |
|--------|------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Client | x    | player-identity-context  | gestisce le registrazioni del cliente e le relazioni(amicizie) tra di loro                                                            |
| Client | x    | quest-context            | gestisce le meccaniche di progresso del cliente nella piattaforma (missioni(achievements), trofei(badge) e livello)                   |
| Client | x    | scoreboard-context       | gestisce la raccolta delle statistiche delle partite fatte (vittorie, sconfitte, ...)                                                 |
| Client | x    | lobby-browser-context    | gestisce il processo di ricerca di una partita, scegliendo di partecipare o guardare                                                  |
| Client | x    | pregame-lobby-context    | gestisce il flusso dalla creazione della partita, raccogliendo i giocatori nel gruppo e permettendo al master di avviarla             |
| Client |      | match-context            | gestisce tutte le meccaniche di gioco effettivo (turno, attivazione carte, ...)                                                       |
| Client |      | match-replay-context     | gestisce la meccanica di riproduzione di una partita fatta in passato                                                                 |
| Client | x    | deck-workshop-context    | gestisce le meccaniche per creare nuovi mazzi personalizzati, con cui giocarci                                                        |
| Admin  | x    | card-forge-context       | gestisce il sistema per creare nuovi mazzi di default e nuove carte tramite espansioni, quindi contiene la documentazione delle carte |
| Admin  | ~    | game-observatory-context | gestisce la raccolta delle statistiche del sistema di gioco (giocatori online, partite in corso, carte più giocate, ...)              |
| Admin  |      | system-health-context    | gestice il monitoraggio dei servizi della piattaforma di gioco (disponibilità, traffico, richieste, ...)                              |

#### Player-Identity-Context

| Term               | Block-Type     | Motivation                                                                         |
|--------------------|----------------|------------------------------------------------------------------------------------|
| Player             | Aggregate-Root | controlla email, password, nickname, friend-list e friend-request                  |
| Email              | Value-Object   | immutabile, unica per ogni player                                                  |
| Password           | Value Object   | immutabile, sostituita intera al cambio                                            |
| Nickname           | ValueObject    | immutabile, unico per ogni player                                                  |
| Friend             | Value-Object   | riferimento immutabile a un player amico                                           |
| FriendRequest      | Entity         | ha stato che cambia nel tempo (pending → accepted / declined), ha identità propria |
|                    |                |                                                                                    |
| PlayerRepository   | Repository     | recupera e salva un Player per ID o email                                          |
| PlayerFactory      | Facotory       | logica di creazione del Player (validazione, hashing password, assegnazione ID)    |
|                    |                |                                                                                    |
| PlayerLoggedIn     | Domain-Event   | player online - consumato da quest-context, game-observatory-context               |
| PlayerLoggedOut    | Domain-Event   | player offline - consumato da game-observatory-context                             |
| PlayerRegistered   | Domain-Event   | nuovo player - consumato da quest-context, game-observatory-context                |
|                    |                |                                                                                    |
| FriendRemoved      | Domain-Event   | amico rimosso - consumato da quest-context                                         |
| FriendshipAccepted | Domain-Event   | richiesta confermata - consumato da quest-context                                  |
| FriendshipDeclined | Domain-Event   | richiesta rifiutata - consumato da quest-context                                   |

#### Quest-Context

| Term                     | Block-Type     | Motivation                                                                                                                                |
|--------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgressFactory    | Factory        | logica di creazione per i progressi di un player                                                                                          |
| PlayerProgressRepository | Repository     | recupera e salva i progressi di un palyer (achivements + badge)                                                                           |
|                          |                |                                                                                                                                           |
| PlayerProgress           | Aggregate-Root | controlla e gestisce il progresso è l'attivazione di un player è il suo livello e contterra una lista per ciascun elemento sotto          |
| Level                    | Value-Object   | livello del player, viene modificato al completamento di achivements/badges                                                               |
| CompletedAchievement     | Value-Object   | è un achivement completato da un player, ci salviamo anche la data di completamento                                                       |
| ObtainedBadge            | Value-Object   | è un badge ottenuto da un player, ci salviamo anche la data di completamento                                                              |
| AchivementInProgress     | Value Object   | è un achivement in corso da un player che ancora non è stato completato, verra modificato il contatore per capire quando verra completato |
| BadgeInProgress          | Value Object   | è un badge in corso da un player che ancora non è stato completato, verra modificato il contatore per capire quando verra completato      |
|                          |                |                                                                                                                                           |
| AchivementFactory        | Factory        | logica di creazione degli achivements per il gioco                                                                                        |
| BadgeFactory             | Factory        | logica di creazione dei badges per il gioco                                                                                               |
| AchivementRepository     | Repository     | recupera e salva gli achivements del gioco                                                                                                |
| BadgeRepository          | Repository     | recupera e salva i badges del gioco                                                                                                       |
|                          |                |                                                                                                                                           |
| Achivement               | Entity         | missione da raggiungere - rappresentato il nome, exp, descrizione, tipo, contatoreMassimo per il completamento                            |
| Badge                    | Entity         | badge da raggiungere - rappresentato da nome, exp, descrizione, icona, contatoreMassimo per il completamento                              |
|                          |                |                                                                                                                                           |
| Player-Registered        | Domain-Event   | player registrato - triggera la gestione degli achivement/badge da creare                                                                 |
| PlayerLoggedIn           | Domain-Event   | player ha fatto l'accesso -  triggera la gestione dell'achivement/badge                                                                   |
| Friend-Removed           | Domain-Event   | amico rimosso - triggera la gestione degli achivement/badge                                                                               |
| Friendship-Accepted      | Domain-Event   | amicizia accettata - triggera la gestione degli achivement/badge                                                                          |
| Friendship-Declined      | Domain-Event   | amicizia declinata - triggera la gestione degli achivement/badge                                                                          |
|                          |                |                                                                                                                                           |
|                          |                | TODO: aggiungiamo altri eventi dopo l'analisi degli altri contesti                                                                        |
|                          |                |                                                                                                                                           |

#### Scoreboard-Context

| Term                   | Block-Type     | Motivation                                                                                                                          |
|------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------|
| PlayerRecordFactory    | Factory        | crea PlayerRecord iniziale — inizializza GameRecord, LobbyRecord e DeckWorkshopRecord a zero                                        |
| PlayerRecordRepository | Repository     | gestisce PlayerRecord, recuperato per player ID                                                                                     |
|                        |                |                                                                                                                                     |
| PlayerRecord           | Aggregate-Root | controlla GameRecord, LobbyRecord, DeckWorkshopRecord — garantisce coerenza dei contatori ad ogni aggiornamento                     |
| GameRecord             | Value-Object   | contatori immutabili delle partite (vittorie, sconfitte, esplosioni, disinnesci) — sostituito intero ad ogni aggiornamento          |
| LobbyRecord            | Value-Object   | contatori immutabili delle configurazioni di partita (deck usati, impostazioni scelte) — sostituito intero ad ogni aggiornamento    |
| DeckWorkshopRecord     | Value-Object   | contatori immutabili sull'attività di creazione deck (deck creati, modificati, eliminati) — sostituito intero ad ogni aggiornamento |
|                        |                |                                                                                                                                     |
|                        |                | TODO: aggiungiamo altri eventi dopo l'analisi degli altri contesti perche i suoi eventi in uscita sono dovuti dagli altri           |
|                        |                |                                                                                                                                     |

#### Lobby-Browser-Context

| Term                | Block-Type     | Motivation                                                                                                                                 |
|---------------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| LobbyView           | Value-Object   | proiezione read-only di una lobby disponibile - ricevuta da pregame-lobby-context                                                          |
| GameView            | Value-Object   | proiezione read-only di una partita disponibile - ricevuta da match-context                                                                |
|                     |                |                                                                                                                                            |
| LobbyMatchmaker     | Domain-Service | logica di ricerca partita - trova casualmente una lobby compatibile, filtra per amici, filtra per partite pubbliche o da osservare         |
| LobbyViewProjection | Domain-Service | traduce i dati grezzi di una lobby in LobbyView - isola il contesto dai cambiamenti del modello di pregame-lobby-context                   |
| GameViewProjection  | Domain-Service | traduce i dati grezzi di una partita in GameView - isola il contesto dai cambiamenti del modello di match-context                          |
|                     |                |                                                                                                                                            |
| LobbyJoined         | Domain-Event   | prodotto quando il player entra in una lobby (accesso diretto, ricerca casuale o accettazione invito) — consumato da pregame-lobby-context |
| GameWatched         | Domain-Event   | prodotto quando il player entra in partita come osservatore - consumato da match-context                                                   |
|                     |                |                                                                                                                                            |
| LobbyRequestSent    | Domain-Event   | ricevuto da pregame-lobby-context - contrassegna la lobby come "sei stato invitato" per il destinatario                                    |
| LobbyOpened         | Domain-Event   | ricevuto da pregame-lobby-context - aggiunge la lobby alla lista pubblica disponibile                                                      |
| LobbyClosed         | Domain-Event   | ricevuto da pregame-lobby-context - rimuove la lobby dalla lista pubblica disponibile                                                      |
| MatchStarted        | Domain-Event   | ricevuto da pregame-lobby-context - rimuove la lobby dalla lista pubblica disponibile                                                      |
|                     |                |                                                                                                                                            |

#### Pregame-Lobby-Context

| Term                     | Block-Type     | Motivation                                                                                                                                                                                          |
|--------------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| LobbyFactory             | Factory        | crea Lobby - logica include inizializzazione GameSettings, assegnazione LobbyMaster, generazione ID                                                                                                 |
| LobbyRepository          | Repository     | gestisce Lobby, recuperata per ID                                                                                                                                                                   |
|                          |                |                                                                                                                                                                                                     |
| Lobby                    | Aggregate-Root | controlla GameSettings, LobbyMaster, lista JoinedPlayer, lista LobbyRequest — garantisce che i JoinedPlayer non superino il limite e che la partita non inizi senza il numero minimo                |
| GameSettings             | Value Object   | configurazione immutabile della partita (bomb-setting, defuse-setting, turn-time, limit-players, nome, filtro accesso, Deck)                                                                        |
| Deck                     | Value-Object   | composizione immutabile di uno o più deck selezionati per la partita - garantisce che almeno un deck sia presente                                                                                   |
| DeckView                 | Value-Object   | proiezione read-only di un deck di default dell'admin disponibile per la selezione - ricevuta da card-forge-context                                                                                 |
| CustomDeckView           | Value-Object   | proiezione read-only di un CustomDeck del player disponibile per la selezione - ricevuta da deck-workshop-context                                                                                   |
| LobbyMaster              | Value-Object   | riferimento immutabile al master della lobby (player ID + nickname) - sostituito intero se il master lascia e viene eletto un nuovo master                                                          |
| JoinedPlayer             | Value-Object   | riferimento immutabile a un player entrato nella lobby (player ID + nickname)                                                                                                                       |
| FriendView               | Value-Object   | proiezione read-only degli amici che posso invitare - ricevuta da player-identity-context                                                                                                           |
| LobbyRequest             | Entity         | invito inviato a un amico - ha stato che cambia (pending → accepted / declined / expired), ha identità propria                                                                                      |
|                          |                |                                                                                                                                                                                                     |
| DeckViewProjection       | Domain-Service | traduce dati grezzi dei deck di default in DeckView - isola il contesto dai cambiamenti di card-forge-context                                                                                       |
| CustomDeckViewProjection | Domain-Service | traduce dati grezzi dei custom deck in CustomDeckView - isola il contesto dai cambiamenti di deck-workshop-context                                                                                  |
| FriendViewProjection     | Domain-Service | traduce dati grezzi degli amici in FriendView - isola il contesto dai cambiamenti di player-identity-context                                                                                        |
|                          |                |                                                                                                                                                                                                     |
| LobbyRequestSent         | Domain-Event   | prodotto quando il master invia un invito a un amico - consumato da lobby-browser-context per notificare il destinatario                                                                            |
| LobbyJoined              | Domain-Event   | ricevuto da lobby-browser-context - aggiunge il player come JoinedPlayer                                                                                                                            |
|                          |                |                                                                                                                                                                                                     |
| LobbyOpened              | Domain-Event   | prodotto quando il master apre la lobby al pubblico - consumato da lobby-browser-context per aggiungere la lobby alla lista pubblica                                                                |
| LobbyClosed              | Domain-Event   | prodotto quando il master chiude la lobby ovvero (torna nelle impostazioni oppure la lobby è al completo) - consumato da lobby-browser-context per rimuovere la lobby dalla lista pubblica          |
| MatchStarted             | Domain-Event   | prodotto quando il master avvia la partita - consumato da match-context portando GameSettings e lista JoinedPlayer e consumato da lobby-browser-context per rimuovere la lobby dalla lista pubblica |
|                          |                |                                                                                                                                                                                                     |
| CardEdited               | Domain-Event   | ricevuto da card-forge-context - aggiorna carta nella preview dei DeckView disponibili                                                                                                              |
| CardRemoved              | Domain-Event   | ricevuto da card-forge-context - rimuove carta dalla preview dei DeckView disponibili                                                                                                               |
|                          |                |                                                                                                                                                                                                     |
| DeckPublished            | Domain-Event   | ricevuto da card-forge-context - aggiunge DeckView disponibile per la selezione                                                                                                                     |
| DeckEdited               | Domain-Event   | ricevuto da card-forge-context - aggiorna DeckView disponibile per la selezione                                                                                                                     |
| DeckRemoved              | Domain-Event   | ricevuto da card-forge-context - rimuove DeckView dalla lista disponibile                                                                                                                           |
|                          |                |                                                                                                                                                                                                     |
| CustomDeckUpdated        | Domain-Event   | ricevuto da deck-workshop-context - aggiorna CustomDeckView nella lista disponibile                                                                                                                 |
| CustomDeckRemoved        | Domain-Event   | ricevuto da deck-workshop-context — rimuove CustomDeckView dalla lista disponibile                                                                                                                  |
|                          |                |                                                                                                                                                                                                     |

#### Match-Context

| Term | Block-Type | Motivation |
|------|------------|------------|
|      |            |            |

#### Match-Replay-Context

| Term                     | Block-Type     | Motivation                                                                                                             |
|--------------------------|----------------|------------------------------------------------------------------------------------------------------------------------|
| MatchReplay              | Aggregate-Root | Aggregato con info sul match concluso, deck usato, log di tutti i turni, player coinvolti                              |
| UsedDeckSet              | Value-Object   | Deck ID usati nel match                                                                                                |
| ReplayLog                | Value-Object   | Log immutabile dei ReplayStep del match                                                                                |
| MatchPlayers             | Value-Object   | Elenco immutabile dei player (ID) del match (friend e non)                                                             |
| WatcherPlayers           | Value-Object   | Elenco immutabile dei player watcher (ID) del match                                                                    |
|                          |                |                                                                                                                        |
| ReplayStep               | Value-Object   | [rif. MatchLog] timestamp/indice step, azione (pesca, gioca carta, favore, ...), player, player-hand-cards, DrawnCards |
|                          |                |                                                                                                                        |
| ReplayPlayback           | Aggregate-Root | Gestisce la sessione di riproduzione del replay per un utente: stato, velocità, posizione corrente                     |
| PlayerId                 | Value-Object   | Identità del player proprietario della sessione                                                                        |
| MatchReplayId            | Value_Object   | Identità del replay visualizzato                                                                                       |
| State                    | Value-Object   | Stato corrente di riproduzione (Playing, Stopped, Paused)                                                              |
| Speed                    | Value-Object   | (turn-time ?) Velocita di "scorrimento" del log => velocita riproduzione replay                                        |
| CurrentStep              | Value-Object   | Turno corrente in cui si trova il replay rispetto al log di turni del match                                            |
|                          |                |                                                                                                                        |
| MatchReplayRepository    | Repository     |                                                                                                                        |
| ReplayPlaybackRepository | Repository     |                                                                                                                        |
|                          |                |                                                                                                                        |
| ReplayChoosen            | Domain-Event   | choose-replay-game                                                                                                     |
| ReplayStarted            | Domain-Event   |                                                                                                                        |
| ReplayPaused             | Domain-Event   |                                                                                                                        |
| ReplayStopped            | Domain-Event   |                                                                                                                        |

#### Deck-Workshop-Context

| Term                 | Block-Type     | Motivation                                                                                                                                   |
|----------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| CustomDeckFactory    | Factory        | crea CustomDeck - logica include validazione nome univoco per player e presenza minima di carte                                              |
| CustomDeckRepository | Repository     | gestisce CustomDeck, recuperato per player ID o deck ID                                                                                      |
|                      |                |                                                                                                                                              |
| CustomDeck           | Aggregate-Root | controlla nome, descrizione e lista DeckSlot - garantisce che la composizione contenga almeno una carta e che il nome sia univoco per player |
| DeckSlot             | Value-Object   | riferimento immutabile a un elemento selezionato per la composizione (card ID o deck ID + quantità) - sostituito intero al cambio            |
| CardView             | Value-Object   | proiezione read-only delle carte esistenti creati dall'admin - ricevuta da card-forge-context                                                |
| DeckView             | Value-Object   | proiezione read-only dei deck di dafault creati dall'admin - ricevuta da card-forge-context                                                  |
| CustomDeckView       | Value-Object   | proiezione read-only di un CustomDeck già creato dal player - usata per la lista e per la selezione prima dell'editing                       |
|                      |                |                                                                                                                                              |
| CardViewProjection   | Domain-Service | traduce dati grezzi delle carte admin in CardView - isola il contesto dai cambiamenti di card-forge-context                                  |
| DeckViewProjection   | Domain-Service | traduce dati grezzi dei deck admin in DeckView - isola il contesto dai cambiamenti di card-forge-context                                     |
|                      |                |                                                                                                                                              |
| CustomDeckCreated    | Domain-Event   | prodotto quando un CustomDeck viene salvato per la prima volta - consumato da quest-context e pregame-lobby-context                          |
| CustomDeckUpdated    | Domain-Event   | prodotto quando un CustomDeck esistente viene modificato - consumato da pregame-lobby-context                                                |
| CustomDeckRemoved    | Domain-Event   | prodotto quando un CustomDeck viene eliminato - consumato da quest-context e pregame-lobby-context                                           |
|                      |                |                                                                                                                                              |
| CardPublished        | Domain-Event   | ricevuto da card-forge-context - aggiunge CardView disponibile per la composizione                                                           |
| CardEdited           | Domain-Event   | ricevuto da card-forge-context - aggiorna CardView disponibile per la composizione                                                           |
| CardRemoved          | Domain-Event   | ricevuto da card-forge-context - rimuove CardView dalla composizione disponibile                                                             |
|                      |                |                                                                                                                                              |
| DeckPublished        | Domain-Event   | ricevuto da card-forge-context - aggiunge DeckView disponibile per la composizione                                                           |
| DeckEdited           | Domain-Event   | ricevuto da card-forge-context - aggiorna DeckView disponibile per la composizione                                                           |
| DeckRemoved          | Domain-Event   | ricevuto da card-forge-context - rimuove DeckView dalla composizione disponibile                                                             |
|                      |                |                                                                                                                                              |


#### Card-Forge-Context

| Term                  | Block-Type     | Motivation                                                                                                                                                                                                                               |
|-----------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CardDefinition        | Aggregate-Root | Governa la definizione coerente di una carta, validando i dati e le regole necessarie alla creazione e pubblicazione. Possibilit Attributi: ID, nome, descrizione, insieme di azioni (valide e compatibili fra loro), tipologia di carta |
| Action                | Value-Object   | Modella una singola azione della carta, con parametri e vincoli propri.                                                                                                                                                                  |
| Attribute             | Value-Object   | Raccogli attributi/caratteristiche della carta come AttackType, CardType, ecc...                                                                                                                                                         |
| PublicationStatus     | Value-Object   | Stato di pubblicazione della carta: `Draft` oppure `Published`.                                                                                                                                                                          |
|                       |                |                                                                                                                                                                                                                                          |
| DeckDefinition        | Aggregate-Root | Governa la definizione di un deck, garantendo coerenza di composizione, quantità delle carte e vincoli di formato. Attributi: ID, nome, elenco di altri deck inseriti, insieme di CardDefinition inserite                                |
| DeckEntry             | Value-Object   | Rappresenta una riga del deck: DeckDefinitionId + qunatity  (possibile inserire piu volte lo stesso deck)                                                                                                                                |
| CardEntry             | Value-Object   | Rappresenta l'insieme dell CardDefinition inserite nel nuovo deck: CardDefinitionId + quantity                                                                                                                                           |
|                       |                |                                                                                                                                                                                                                                          |
| ExpansionDefinition   | Aggregate-Root | Governa la definizione di una espansione, garantendo coerenza di composizione, quantità delle carte e vincoli di formato. Attributi: ID, nome, insieme di CardDefinition inserite (se sono `Draft` passano a `Published`)                |
| CardEntry             | Value-Object   | Rappresenta l'insieme dell CardDefinition inserite nel nuovo deck: CardDefinitionId + quantity                                                                                                                                           |
|                       |                |                                                                                                                                                                                                                                          |
| CardDefinitionFactory | Factory        | Crea CardDefinition factory                                                                                                                                                                                                              |
| DeckDefinitionFactory | Factory        | Crea DeckDefinition factory                                                                                                                                                                                                              |
|                       |                |                                                                                                                                                                                                                                          |
| CardRepository        | Repository     | Recupera e salva le *CardDefinition* create nel gioco (sia Draft che Published)                                                                                                                                                          |
| DeckRepository        | Repository     | Recupera e salva le *DeckDefinition* pubblicati dall'admin                                                                                                                                                                               |
| ExpansionRepository   | Repository     | Recupera e salva le *ExpansionDefinition* pubblicate nel gioco                                                                                                                                                                           |
|                       |                |                                                                                                                                                                                                                                          |
| CardPublished         | Domain-Event   | Una nuova *Card* è stata creata (salvata)                                                                                                                                                                                                |
| DeckPublished         | Domain-Event   | Un nuovo *Deck* è stato creato (salvata)                                                                                                                                                                                                 |
| ExpansionPublished    | Domain-Event   | Una nuova espansione è stata pubblicata                                                                                                                                                                                                  |
| CardEdited            | Domain-Event   | La CardDefinition è stata modificata                                                                                                                                                                                                     |
| DeckEdited            | Domain-Event   | Un Deckdefinition è sttao modificato/aggiornato                                                                                                                                                                                          |



#### Game-Observatory-Context

| Term                       | Block-Type     | Motivation                                                                                                                                                         |
|----------------------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlatformSnapshot           | Aggregate-Root | Rappresenta una fotografia delle statistiche della piattaforma in un preciso istante o bucket temporale, con timestamp e valori consolidati.                       |
| StatisticsWindow           | Value-Object   | Identifica l’intervallo temporale di aggregazione, ad esempio ora, giorno, settimana o mese.                                                                       |
| PlayerIdentityRecord       | Value-Object   | Rappresenta il numero di giocatori online, offline, registrati,...                                                                                                 |
| PlayerMatchRecord          | Value-Object   | Rappresenta l’elenco con Top5Deck, Top5Card (classifica con tutti i dati della partita)                                                                            |
| LobbyRecord                | Value-Object   | Per il momento include il conteggio di match attivi in corso (active-match count)                                                                                  |
| PlatformSnapshotFactory    | Factory        | Logica di creazione di un PlatformSnapshot                                                                                                                         |
|                            |                |                                                                                                                                                                    |
| PlatformSnapshotRepository | Repository     | Salva e recupera gli snapshot storici delle statistiche della piattaforma.                                                                                         |
| MatchProjection            | Domain-Service | Consuma eventi provenienti dagli altri bounded context e aggiorna gli snapshot o le viste aggregate per la dashboard admin.                                        |
| PlayerIdentityProjection   | Domain-Service | Consuma eventi provenienti dal identity-context e aggiorna snapshot                                                                                                |
| LobbyProjection            | Domain-service | Consuma eventi ricevuti da PregameLobyy and company... (da raffinare) aggiorna es. conteggio partite in corso                                                      |
|                            |                |                                                                                                                                                                    |
| MatchStarted               | Domain-Event   | Evento sorgente dal *Pregame-Lobby-Context* che incrementa i contatori relativi alle partite in corso.                                                             |
| MatchEnded                 | Domain-Event   | Evento sorgente dal *Match-Context* che consente di aggiornare la chiusura della partita, trasporta statistiche (es. carte giocate, deck usati) del match concluso |
| PlayerLoggedIn             | Domain-Event   | Evento sorgente dal contesto identity che incrementa il conteggio dei giocatori online.                                                                            |
| PlayerLoggedOut            | Domain-Event   | Evento sorgente dal contesto identity che decrementa il conteggio dei giocatori online.                                                                            |
| PlayerRegistered           | Domain-Event   | Evento sorgente che aggiorna le statistiche di crescita della piattaforma.                                                                                         |

#### System-Health-Context

| Term                     | Block-Type     | Motivation                                                                                                                |
|--------------------------|----------------|---------------------------------------------------------------------------------------------------------------------------|
| ServiceMonitorRepository | Factory        | gestisce ServiceMonitor, recuperato per ID di piattaforma                                                                 |
| ServiceMonitorRepository | Repository     | gestisce ServiceMonitor, recuperato per ID di piattaforma                                                                 |
|                          |                |                                                                                                                           |
| ServiceMonitor           | Aggregate-Root | controlla la lista di Service monitorati — garantisce che ogni servizio sia tracciato e aggiornato correttamente          |
| Service                  | Entity         | rappresenta un servizio della piattaforma — ha stato che cambia (availability, traffic, requestCount), ha identità propri |
| Availability             | Value-Object   | indica se il servizio è online o offline — sostituito intero ad ogni aggiornamento                                        |
| Traffic                  | Object-Value   | rappresenta il traffico del servizio                                                                                      |
| CounterRequest           | Object-Value   | rappresenta il numero di richieste                                                                                        |
|                          |                |                                                                                                                           |
|                          |                |                                                                                                                           |
|                          |                |                                                                                                                           |

