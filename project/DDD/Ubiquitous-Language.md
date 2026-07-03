# Ubiquitous Language — Bamboom

## Glossario globale
(termini che attraversano più contesti con disambiguazione)

| Term | player-identity-context | player-progress-context | match-context | lobby-browser-context | pregame-lobby-context | deck-workshop-context | card-forge-context | game-observatory-context | system-health-context |
|------|-------------------------|-------------------------|---------------|-----------------------|-----------------------|-----------------------|--------------------|--------------------------|-----------------------|
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |
|      |                         |                         |               |                       |                       |                       |                    |                          |                       |

## player-identity-context
| Term                      | BuildingBlock-DDD | Definizione                                                                                                                                        | 
|---------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Player                    | Aggregate-Root    | identità digitale di chi partecipa alla piattaforma Bamboom, riconoscibile dagli altri tramite email univoco e collegabile tramite amicizie        | 
| Email                     | Value-Object      | indirizzo email univoco che identifica un Player nella piattaforma, usato per Login e RecoverPassword                                              | 
| Password                  | Value-Object      | credenziale segreta del Player, rispetta PasswordPolicy, usata insieme all'Email per il Login                                                      | 
| Nickname                  | Value-Object      | soprannome usato dal player per riconoscersi dagli altri player sulla piattaforma                                                                  | 
| Friend                    | Value-Object      | specifico player che è diventato amico di un altro player, dopo che ha accettato l'amicizia                                                        | 
| FriendRequest             | Entity            | proposta formale di amicizia inviata da un Player a un altro, in attesa di essere accettata o rifiutata                                            | 
|                           |                   |                                                                                                                                                    | 
| PlayerLoggedIn            | Domain-Event      | evento del player che ha già effettuato l'accesso alla piattaforma                                                                                 | 
| PlayerLoggedOut           | Domain-Event      | evento del player che ha già effettuato l'uscita alla piattaforma                                                                                  | 
| PlayerRegistered          | Domain-Event      | evento del player che si è registrato alla piattaforma                                                                                             | 
|                           |                   |                                                                                                                                                    | 
| FriendshipAccepted        | Domain-Event      | evento del player che ha accettato la rihiesta di amicizia di un altro player                                                                      | 
|                           |                   |                                                                                                                                                    | 
| Temini fuori dal DDD      | Tipologia         | //                                                                                                                                                 | 
|                           |                   |                                                                                                                                                    |
| UniqueEmail               | Policy            | ogni Player deve avere un'Email non già presente in piattaforma — verificata alla Registration                                                     |
| PasswordPolicy            | Policy            | la Password deve rispettare requisiti minimi di lunghezza e complessità per essere accettata                                                       |
|                           |                   |                                                                                                                                                    |
| FriendList                | Concept           | insieme dei Friend attuali di un Player, aggiornata quando una FriendRequest viene accettata o quando un Friend viene rimosso                      |
| FriendRequestNotification | Concept           | avviso ricevuto da un Player quando un altro Player gli invia una FriendRequest — permette di rispondere con FriendshipAccept o FriendshipDecline  |
| OTP                       | Concept           | codice monouso inviato via email durante RecoverPassword per verificare l'identità del Player prima di permettere il cambio Password               |
|                           |                   |                                                                                                                                                    |
| PendingFriendRequest      | State             | stato di una FriendRequest dopo l'invio, prima che il destinatario risponda con FriendshipAccepted o FriendshipDeclined                            |
|                           |                   |                                                                                                                                                    |
| Login                     | Action            | azione per accedere alla piattaforma, inserendo email e password                                                                                   | 
| Logout                    | Action            | azione per uscre dalla piattaforma                                                                                                                 | 
| Registration              | Action            | azione per registrasi sulla piattaforma, inserendo email valida, passowrd e nickname                                                               | 
| RecoverPassword           | Action            | azione per iniare il processo di recupero password                                                                                                 | 
| PlayerSearch              | Action            | azione di ricerca di un player (tramite nickname/email) per mandare una richiesta di amizia                                                        |
| PlayerSelect              | Action            | selezione di uno specifico Player dai risultati di PlayerSearch per avviare l'invio di una FriendRequest                                           |
| FriendRequestSend         | Action            | invio di una FriendRequest al Player selezionato tramite PlayerSelect                                                                              |
| FriendRemove              | Action            | azione di eliminazione di un amico                                                                                                                 |
| FriendshipDecline         | Action            | azione di declinare una richiesta di amicizia da parte di un player                                                                                |
| FriendshipAccept          | Action            | azione di accettazione di una FriendRequest ricevuta da un altro Player — produce FriendshipAccepted e aggiorna la FriendList di entrambi i Player |
|                           |                   |                                                                                                                                                    |
| FriendshipDeclined        | Event             | fatto che il destinatario ha rifiutato una FriendRequest ricevuta                                                                                  | 
| FriendRemoved             | Event             | rimozione di un amico avvenuta con successo                                                                                                        |
| PasswordRecovered         | Event             | processo di recupero password avvenuta con successo                                                                                                | 
|                           |                   |                                                                                                                                                    | 

## player-progress-context
| Term                        | BuildingBlock-DDD     | Definizione                                                                                                                                                                                                        |
|-----------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgress              | Aggregate-Root        | Rappresenta il livello di progresso del Player nel gioco. Si basa sul livello raggiunto, gli Achievement sbloccati e badge ottenuti oltre a dipendere dai risultati delle diverse partite giocate.                 |
| Level                       | Value-Object          | Valore numerico che riassume l'avanzamento del Player nell'ottenimento di badge e completamento di Achievements.                                                                                                   |
| Badge                       | Entity                | Stemma digitale che dimostra il raggiungimento di determinati Achievement secondo determinate condizioni, è definito nel CatalogoBadge e può essere ottenuto da più Player.                                        |
| Achievement                 | Entity                | Obiettivo di gioco con condizioni di completamento definite (es. vincere X match, usare Y carte), descritte dalla AchievementCompletionPolicy.                                                                     |
| MatchRecord                 | Value-Object          | Statistiche aggregate delle partite giocate (vittorie, sconfitte, esplosioni, defuse, carte/deck più usati).                                                                                                       |
| DeckWorkshopRecord          | Value-Object          | Statistiche aggregate che riguardano le attività svolte dal Player in DeckWorkshop (es. creazione CustomDeck).                                                                                                     |
| AchievementInProgress       | Value-Object          | Achievement le cui condizioni di risoluzione non sono ancora state soddisfatte.                                                                                                                                    |
| CompletedAchievement        | Value-Object          | Achievement che è stato soddisfatto dal Player in una determinata data secondo la AchievementCompletionPolicy.                                                                                                     |
| ObtainedBadge               | Value-Object          | Badge ottenuto in una determinata data dal Player secondo la BadgeUnlockPolicy.                                                                                                                                    |
| BadgeInProgress             | Value-Object          | Badge le cui condizioni di sblocco/ottenimento non sono ancora soddisfatte.                                                                                                                                        |
| BadgeUnlockPolicy           | Policy/Domain-Service | Criteri e condizioni di sblocco di un Badge.                                                                                                                                                                       |
| AchievementCompletionPolicy | Policy/Domain-Service | Condizioni di completamente di un Achievement.                                                                                                                                                                     |
| BadgeCatalog                | Entity                | Catalogo contenente tutti i Badge sbloccabili dai Player.                                                                                                                                                          |
| BadgeUnlocked               | Domain-Event          | Evento generato quando un Badge è stato ottenuto dal Player secondo la BadgeUnlockPolicy. Comporta l'aggiornamento del PlayerProgress (Level, ObtainedBadge e BadgeInProgress).                                    |
| AchievementCompleted        | Domain-Event          | Evento generato quando un Achievement è stato completato dal Player secondo la AchievementCompletionPolicy. Viene aggiornato PlayerProgress e l'Achievement passa da AchievementInProgress a CompletedAchievement. |
|                             |                       |                                                                                                                                                                                                                    |
| Term                        | Tipology              |                                                                                                                                                                                                                    |
| MatchWon                    | Concept               | Conteggio dei match vinti dal Player.                                                                                                                                                                              |
| MatchLost                   | Concept               | Conteggio dei match persi dal Player.                                                                                                                                                                              |
| ExplosionCount              | Concept               | Conteggio di esplosioni subite dal Player.                                                                                                                                                                         |
| DefuseCount                 | Concept               | Conteggio di disinnesci fatti dal Player.                                                                                                                                                                          |
| MostUsedCard                | Concept               | Carta molto utilizzata dal Player durante i Match.                                                                                                                                                                 |
| MostUsedDeck                | Concept               | Deck scelto spesso dal Player da usare nei Match.                                                                                                                                                                  |
| ProgressTrigger             | Event                 | Evento che innesca l'aggiornamento dei PlayerProgress con conseguenza di sblocco di Achievements, Badge e aumento di Level.                                                                                        |


## lobby-browser-context
| Term                  | BuildingBlock-DDD | Definizione                                                                                                                                                   |
|-----------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lobby/LobbyView       | Value-Object      | Rappresentzione lista d'accesso ad un Match specifico che deve ancora iniziare. Puo contenere un numero masismo di Player (LobbyCapacity) sia Friend che non. |
| Match/GameView        | Value-Object      | Rappresentazione di un Match in corso alla quale è possibile fare Join come Watcher                                                                           |
| ActiveMatch           | Value-Object      | Match attualmente in corso alla quale si può fare join in veste di Watcher                                                                                    |
|                       |                   |                                                                                                                                                               |
| Term                  | Tipology          |                                                                                                                                                               |
| JoinLobbyRequest      | Evento            | Invito alla lobby da parte del LobbyOwner.                                                                                                                    |
| OpenLobby             | Concept           | Stato della Lobby che indica la presenza di posti liberi nella Lobby. Il Player può fare join.                                                                |
| ClosedLobby           | Concept           | Stato della Lobby quando non è pubblica a tutti i Player ma solo agli amici invitati. Lobby nella fase di configurazione del Match da parte del LobbyOwner.   |
| LobbyCapacity         | Concept           | Capacità massima di Player contenibili dalla Lobby. In caso di OpenLobby al raggiungimento di tale capacità il Match avrà inzio con MatchStarted.             |
| LobbyOwner            | Concept           | Player che detiene la proprietà della Lobby, ha la facolta di poter avviare in anticipo il Match, chiudere la Lobby (LobbyClosed).                            |
| LobbyClosed           | Event             | Evento generato al raggiungimento della capienza massima della Lobby oppure in caso di ritorno                                                                |
| MatchStarted          | Event             | Evento generato da Pregame-lobby-context quando il Match ha inizio. Non è più possibile fare Join alla Lobby.                                                 |
| choose-match-to-join  | Azione            | Azione di Join ad una Lobby come Player                                                                                                                       |
| choose-match-to-watch | Azione            | Azione di Join ad un ActiveMatch come Watcher                                                                                                                 |
| JoinLobby             | Azione            | Intezione del player di aggiungersi alla Lobby in attesa dell'inizio del Match (dovuto a raggiungimento capacità o avvio anticipato dal LobbyOwner).          |
| SearchLobby           | Azione/Query      | Azione di ricerca anche con filtri semplici (es. join come Watcher o Player) per trovare Match in corso a cui assistere oppure Lobby a cui aggiungersi.       |
|                       |                   |                                                                                                                                                               |


## pregame-lobby-context
| Term | BuildingBlock-DDD | Definizione | 
|------|-------------------|-------------|
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 

## match-context
| Term | BuildingBlock-DDD | Definizione | 
|------|-------------------|-------------|
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 

## deck-workshop-context
| Term                 | BuildingBlock-DDD | Definizione                                                                                                | 
|----------------------|-------------------|------------------------------------------------------------------------------------------------------------|
| CustomDeck           | Aggregate-Root    | mazzo personalizzato del player, creato partendo dalle carte/deck/espansioni del gioco                     | 
| DeckSlot             | Value-Object      | singolo slot per la singola carta per la creazione di un nuovo mazzo personalizzato                        | 
| CardView             | Value-Object      | carta disponibile per aggiungerla dentro un mazzo personalizzato del player                                | 
| DeckView             | Value-Object      | deck disponibile per aggiungerlo dentro un mazzo personalizzato del player                                 | 
| ExpansionView        | Value-Object      | espansione disponibile per aggiungerlo dentro un mazzo personalizzato del player                           | 
| CustomDeckView       | Value-Object      | mazzi personalizzati disponibile per aggiungerlo dentro un mazzo personalizzato del player                 | 
|                      |                   |                                                                                                            | 
| CustomDeckCreated    | Domain-Event      | salvataggio di un mazzo personalizzato avvenuto con successo                                               | 
| CustomDeckUpdated    | Domain-Event      | aggiornamento di un mazzo personalizzato avvenuto con successo                                             | 
| CustomDeckRemoved    | Domain-Event      | eliminazione di un mazzo personalizzato avvenuto con successo                                              | 
|                      |                   |                                                                                                            | 
| Temini fuori dal DDD | Tipologia         | //                                                                                                         | 
|                      |                   |                                                                                                            | 
| CardSelect           | action            | azione per selezionare una carta da mettere dentro il mazzo personalizzato                                 |
| CardAdd              | action            | azione per aggiungere una carta da mettere dentro il mazzo personalizzato                                  | 
| CardRemove           | action            | azione per rimuovere una carta dal mazzo personalizzato                                                    |
| DeckSelect           | action            | azione per selezionare tutte le carte di un deck da mettere dentro il mazzo personalizzato                 |
| DeckAdd              | action            | azione per aggiungere le carte di un deck dentro il mazzo personalizzato                                   |
| ExpansionSelect      | action            | azione per selezionare tutte le carte di una espanzione da mettere dentro il mazzo personalizzato          | 
| ExpansionAdd         | action            | azione per aggiungere le carte di un espansione dentro il mazzo personalizzato                             | 
| CustomDeckSelect     | action            | azione per selezionare tutte le carte di un mazzo personalizzato da mettere dentro il mazzo personalizzato | 
| CustomDeckAdd        | action            | azione per aggiungere tutte le carte di un mazzo personalizzato dentro il mazzo personalizzato             | 
|                      |                   |                                                                                                            | 
| CustomDeckOpen       | action            | azione per aprire un mazzo personalizzato gia esistente                                                    | 
| CustomDeckSave       | action            | azione per savare un mazzo personalizzato editato o nuovo                                                  | 
|                      |                   |                                                                                                            | 
|                      |                   |                                                                                                            | 
|                      |                   |                                                                                                            | 
|                      |                   |                                                                                                            | 

## card-forge-context
| Term | BuildingBlock-DDD | Definizione | 
|------|-------------------|-------------|
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 

## game-observatory-context
| Term | BuildingBlock-DDD | Definizione | 
|------|-------------------|-------------|
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 

## system-health-context
| Term | BuildingBlock-DDD | Definizione | 
|------|-------------------|-------------|
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
|      |                   |             | 
