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
| pass-turn                         | passa il turno quindi peschi                                                                                  |
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
|                         |                     |                    | pass-turn               |                      |                       |                       |                       |                        |                          |                       |             
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
| Client |      | quest-context            | gestisce le meccaniche di progresso del cliente nella piattaforma (missioni(achievements), trofei(badge) e livello)                   |
| Client |      | scoreboard-context       | gestisce la raccolta delle statistiche delle partite fatte (vittorie, sconfitte, ...)                                                 |
| Client |      | lobby-browser-context    | gestisce il processo di ricerca di una partita, scegliendo di partecipare o guardare                                                  |
| Client |      | pregame-lobby-context    | gestisce il flusso dalla creazione della partita, raccogliendo i giocatori nel gruppo e permettendo al master di avviarla             |
| Client |      | match-context            | gestisce tutte le meccaniche di gioco effettivo (turno, attivazione carte, ...)                                                       |
| Client |      | match-replay-context     | gestisce la meccanica di riproduzione di una partita fatta in passato                                                                 |
| Client |      | deck-workshop-context    | gestisce le meccaniche per creare nuovi mazzi personalizzati, con cui giocarci                                                        |
| Admin  |      | card-forge-context       | gestisce il sistema per creare nuovi mazzi di default e nuove carte tramite espansioni, quindi contiene la documentazione delle carte |
| Admin  |      | game-observatory-context | gestisce la raccolta delle statistiche del sistema di gioco (giocatori online, partite in corso, carte più giocate, ...)              |
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























