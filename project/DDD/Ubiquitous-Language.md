# Ubiquitous Language - Bamboom

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
| - Term -                  | - Tipology -      | //                                                                                                                                                 | 
| UniqueEmail               | Policy            | ogni Player deve avere un'Email non già presente in piattaforma - verificata alla Registration                                                     |
| PasswordPolicy            | Policy            | la Password deve rispettare requisiti minimi di lunghezza e complessità per essere accettata                                                       |
|                           |                   |                                                                                                                                                    |
| FriendList                | Concept           | insieme dei Friend attuali di un Player, aggiornata quando una FriendRequest viene accettata o quando un Friend viene rimosso                      |
| FriendRequestNotification | Concept           | avviso ricevuto da un Player quando un altro Player gli invia una FriendRequest - permette di rispondere con FriendshipAccept o FriendshipDecline  |
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
| FriendshipAccept          | Action            | azione di accettazione di una FriendRequest ricevuta da un altro Player - produce FriendshipAccepted e aggiorna la FriendList di entrambi i Player |
|                           |                   |                                                                                                                                                    |
| FriendshipDeclined        | Event             | fatto che il destinatario ha rifiutato una FriendRequest ricevuta                                                                                  | 
| FriendRemoved             | Event             | rimozione di un amico avvenuta con successo                                                                                                        |
| PasswordRecovered         | Event             | processo di recupero password avvenuta con successo                                                                                                | 
|                           |                   |                                                                                                                                                    | 

## player-progress-context
| Term                        | BuildingBlock-DDD | Definizione                                                                                                                                                                                                        |
|-----------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgress              | Aggregate-Root    | Rappresenta il livello di progresso del Player nel gioco. Si basa sul livello raggiunto, gli Achievement sbloccati e badge ottenuti oltre a dipendere dai risultati delle diverse partite giocate.                 |
| Level                       | Value-Object      | Valore numerico che riassume l'avanzamento del Player nell'ottenimento di badge e completamento di Achievements.                                                                                                   |
| MatchRecord                 | Value-Object      | Statistiche aggregate delle partite giocate (vittorie, sconfitte, esplosioni, defuse, carte/deck più usati).                                                                                                       |
| DeckWorkshopRecord          | Value-Object      | Statistiche aggregate che riguardano le attività svolte dal Player in DeckWorkshop (es. creazione CustomDeck).                                                                                                     |
| AchievementInProgress       | Value-Object      | Achievement le cui condizioni di risoluzione non sono ancora state soddisfatte.                                                                                                                                    |
| CompletedAchievement        | Value-Object      | Achievement che è stato soddisfatto dal Player in una determinata data secondo la AchievementCompletionPolicy.                                                                                                     |
| ObtainedBadge               | Value-Object      | Badge ottenuto in una determinata data dal Player secondo la BadgeUnlockPolicy.                                                                                                                                    |
| BadgeInProgress             | Value-Object      | Badge le cui condizioni di sblocco/ottenimento non sono ancora soddisfatte.                                                                                                                                        |
| Badge                       | Entity            | Stemma digitale che dimostra il raggiungimento di determinati Achievement secondo determinate condizioni, è definito nel CatalogoBadge e può essere ottenuto da più Player.                                        |
| Achievement                 | Entity            | Obiettivo di gioco con condizioni di completamento definite (es. vincere X match, usare Y carte), descritte dalla AchievementCompletionPolicy.                                                                     |
|                             |                   |                                                                                                                                                                                                                    |
| - Term -                    | - Tipology -      |                                                                                                                                                                                                                    |
| BadgeUnlockPolicy           | Policy            | Criteri e condizioni di sblocco di un Badge.                                                                                                                                                                       |
| AchievementCompletionPolicy | Policy            | Condizioni di completamente di un Achievement.                                                                                                                                                                     |
| BadgeCatalog                | Concept           | Catalogo contenente tutti i Badge sbloccabili dai Player.                                                                                                                                                          |
| MatchWon                    | Concept           | Conteggio dei match vinti dal Player.                                                                                                                                                                              |
| MatchLost                   | Concept           | Conteggio dei match persi dal Player.                                                                                                                                                                              |
| ExplosionCount              | Concept           | Conteggio di esplosioni subite dal Player.                                                                                                                                                                         |
| DefuseCount                 | Concept           | Conteggio di disinnesci fatti dal Player.                                                                                                                                                                          |
| MostUsedCard                | Concept           | Carta molto utilizzata dal Player durante i Match.                                                                                                                                                                 |
| MostUsedDeck                | Concept           | Deck scelto spesso dal Player da usare nei Match.                                                                                                                                                                  |
|                             |                   |                                                                                                                                                                                                                    |
| ProgressTrigger             | Event             | Evento che innesca l'aggiornamento dei PlayerProgress con conseguenza di sblocco di Achievements, Badge e aumento di Level.                                                                                        |
| BadgeUnlocked               | Event             | Evento generato quando un Badge è stato ottenuto dal Player secondo la BadgeUnlockPolicy. Comporta l'aggiornamento del PlayerProgress (Level, ObtainedBadge e BadgeInProgress).                                    |
| AchievementCompleted        | Event             | Evento generato quando un Achievement è stato completato dal Player secondo la AchievementCompletionPolicy. Viene aggiornato PlayerProgress e l'Achievement passa da AchievementInProgress a CompletedAchievement. |
|                             |                   |                                                                                                                                                                                                                    |

## lobby-browser-context
| Term                  | BuildingBlock-DDD | Definizione                                                                                                                                                   |
|-----------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lobby/LobbyView       | Value-Object      | Rappresentzione lista d'accesso ad un Match specifico che deve ancora iniziare. Puo contenere un numero masismo di Player (LobbyCapacity) sia Friend che non. |
| Match/GameView        | Value-Object      | Rappresentazione di un Match in corso alla quale è possibile fare Join come Watcher                                                                           |
| ActiveMatch           | Value-Object      | Match attualmente in corso alla quale si può fare join in veste di Watcher                                                                                    |
|                       |                   |                                                                                                                                                               |
| - Term -              | - Tipology -      |                                                                                                                                                               |
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
| Term                  | BuildingBlock-DDD | Definizione                                                                                                                                                                                                                                         | 
|-----------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CustomDeck            | Aggregate-Root    | mazzo di gioco personalizzato creato dal Player, identificato da un nome univoco e composto da una lista di CardSlot - può essere costruito selezionando carte singole, deck di default, espansioni o altri CustomDeck disponibili nella piattaform | 
| CardSlot              | Value-Object      | riferimento a una singola carta all'interno della composizione del CustomDeck, identificata dal suo ID e dalla quantità inserita                                                                                                                    | 
| CardView              | Value-Object      | carta disponibile per aggiungerla dentro un mazzo personalizzato del player                                                                                                                                                                         | 
| DeckView              | Value-Object      | deck disponibile per aggiungerlo dentro un mazzo personalizzato del player                                                                                                                                                                          | 
| ExpansionView         | Value-Object      | espansione disponibile per aggiungerlo dentro un mazzo personalizzato del player                                                                                                                                                                    | 
| CustomDeckView        | Value-Object      | visualizzazione di un CustomDeck già creato dal Player - mostra nome e composizione del mazzo, usata per scegliere quale mazzo aprire o modificare                                                                                                  | 
|                       |                   |                                                                                                                                                                                                                                                     | 
| CustomDeckCreated     | Domain-Event      | salvataggio di un mazzo personalizzato avvenuto con successo                                                                                                                                                                                        | 
| CustomDeckUpdated     | Domain-Event      | aggiornamento di un mazzo personalizzato avvenuto con successo                                                                                                                                                                                      | 
| CustomDeckDeleted     | Domain-Event      | eliminazione di un mazzo personalizzato avvenuto con successo                                                                                                                                                                                       | 
|                       |                   |                                                                                                                                                                                                                                                     | 
| - Term -              | - Tipology -      | //                                                                                                                                                                                                                                                  | 
| UniqueCustomDeckName  | Policy            | il nome assegnato a un CustomDeck deve essere univoco tra tutti i mazzi dello stesso Player - due mazzi dello stesso Player non possono avere lo stesso nome                                                                                        |
| MinimumCardPolicy     | Policy            | un CustomDeck deve contenere almeno una carta per poter essere salvato - impedisce il salvataggio di mazzi vuoti                                                                                                                                    |
|                       |                   |                                                                                                                                                                                                                                                     |
| DeckBack              | Concept           | grafica personalizzabile applicata al retro di tutte le carte del CustomDeck - scelta dal Player durante la creazione o la modifica del mazzo, contribuisce all'identità visiva del mazzo                                                           |
| CustomDeckComposition | Concept           | insieme delle carte che compongono il CustomDeck - deve contenere almeno una carta per poter essere salvato"                                                                                                                                        |
|                       |                   |                                                                                                                                                                                                                                                     |
| DeckBackSelect        | Action            | selezione della grafica da applicare al retro delle carte del CustomDeck tra quelle disponibili nella piattaforma                                                                                                                                   |
| CustomDeckRename      | Action            | rinomina del nome di un mazzo personalizzato                                                                                                                                                                                                        | 
| CardSelect            | Action            | azione per selezionare una carta da mettere dentro il mazzo personalizzato                                                                                                                                                                          |
| CardAdd               | Action            | aggiunta di una carta selezionata alla composizione del CustomDeck                                                                                                                                                                                  | 
| CardRemove            | Action            | azione per rimuovere una carta dal mazzo personalizzato                                                                                                                                                                                             |
| DeckSelect            | Action            | azione per selezionare tutte le carte di un deck da mettere dentro il mazzo personalizzato                                                                                                                                                          |
| DeckAdd               | Action            | aggiunta di tutte le carte di un deck di default selezionato alla composizione del CustomDeck                                                                                                                                                       |
| ExpansionSelect       | Action            | selezione di un'espansione dalla lista disponibile per aggiungere tutte le sue carte al CustomDeck                                                                                                                                                  | 
| ExpansionAdd          | Action            | aggiunta di tutte le carte di un'espansione selezionata alla composizione del CustomDeck                                                                                                                                                            | 
| CustomDeckSelect      | Action            | azione per selezionare tutte le carte di un mazzo personalizzato da mettere dentro il mazzo personalizzato                                                                                                                                          | 
| CustomDeckAdd         | Action            | aggiunta di tutte le carte di un altro CustomDeck selezionato alla composizione del CustomDeck corrente                                                                                                                                             | 
| CustomDeckClear       | Action            | svuotamento completo della composizione del CustomDeck senza eliminare il mazzo                                                                                                                                                                     |
| CustomDeckCreate      | Action            | azione per creare un nuovo mazzo personalizzato                                                                                                                                                                                                     |
| CustomDeckDelete      | Action            | eliminazione permanente di un CustomDeck esistente dalla lista dei mazzi del Player - non recuperabile dopo la conferma                                                                                                                             |
| CustomDeckOpen        | Action            | apertura di un CustomDeck esistente per visualizzarlo o modificarlo                                                                                                                                                                                 | 
| CustomDeckSave        | Action            | salvataggio delle modifiche apportate a un CustomDeck esistente, sovrascrivendo la versione precedente con la composizione corrente                                                                                                                 | 
| CustomDeckSaveAs      | Action            | salvataggio del lavoro corrente come nuovo CustomDeck assegnandogli un nome specifico - non modifica il CustomDeck originale da cui si è partiti                                                                                                    | 
|                       |                   |                                                                                                                                                                                                                                                     | 

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
