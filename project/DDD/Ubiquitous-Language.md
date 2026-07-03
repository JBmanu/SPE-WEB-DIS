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
| Term                      | BuildingBlock-DDD | Definizione                                                                                                                                          | 
|---------------------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Player                    | Aggregate-Root    | identità digitale di chi partecipa alla piattaforma Bamboom, riconoscibile dagli altri tramite email/nickname univoco e collegabile tramite amicizie | 
| Email                     | Value-Object      | indirizzo email univoco che identifica un Player nella piattaforma, usato per Login e RecoverPassword                                                | 
| Password                  | Value-Object      | credenziale segreta del Player, rispetta PasswordPolicy, usata insieme all'Email per il Login                                                        | 
| Nickname                  | Value-Object      | soprannome usato dal player per riconoscersi dagli altri player sulla piattaforma                                                                    | 
| Friend                    | Value-Object      | specifico player che è diventato amico di un altro player, dopo che ha accettato l'amicizia                                                          | 
| FriendRequest             | Entity            | proposta formale di amicizia inviata da un Player a un altro, in attesa di essere accettata o rifiutata                                              | 
|                           |                   |                                                                                                                                                      | 
| PlayerLoggedIn            | Domain-Event      | evento del player che ha già effettuato l'accesso alla piattaforma                                                                                   | 
| PlayerLoggedOut           | Domain-Event      | evento del player che ha già effettuato l'uscita alla piattaforma                                                                                    | 
| PlayerRegistered          | Domain-Event      | evento del player che si è registrato alla piattaforma                                                                                               | 
|                           |                   |                                                                                                                                                      | 
| FriendshipAccepted        | Domain-Event      | evento del player che ha accettato la rihiesta di amicizia di un altro player                                                                        | 
|                           |                   |                                                                                                                                                      | 
| Temini fuori dal DDD      | Tipologia         | //                                                                                                                                                   | 
|                           |                   |                                                                                                                                                      |
| UniqueEmail               | regola            | ogni Player deve avere un'Email non già presente in piattaforma — verificata alla Registration                                                       |
| UniqueNickname            | regola            | ogni Player deve avere un Nickname non già usato da altri Player sulla piattaforma                                                                   |
| PasswordPolicy            | regola            | la Password deve rispettare requisiti minimi di lunghezza e complessità per essere accettata                                                         |
|                           |                   |                                                                                                                                                      |
| FriendList                | concetto          | insieme dei Friend attuali di un Player, aggiornata quando una FriendRequest viene accettata o quando un Friend viene rimosso                        |
| FriendRequestNotification | concetto          | avviso ricevuto da un Player quando un altro Player gli invia una FriendRequest — permette di rispondere con FriendshipAccept o FriendshipDecline    |
| OTP                       | concetto          | codice monouso inviato via email durante RecoverPassword per verificare l'identità del Player prima di permettere il cambio Password                 |
|                           |                   |                                                                                                                                                      |
| PendingRequest            | stato             | stato di una FriendRequest dopo l'invio, prima che il destinatario risponda con FriendshipAccepted o FriendshipDeclined                              |
|                           |                   |                                                                                                                                                      |
| Login                     | azione            | azione per accedere alla piattaforma, inserendo email e password                                                                                     | 
| Logout                    | azione            | azione per uscre dalla piattaforma                                                                                                                   | 
| Registration              | azione            | azione per registrasi sulla piattaforma, inserendo email valida, passowrd e nickname                                                                 | 
| RecoverPassword           | azione            | azione per iniare il processo di recupero password                                                                                                   | 
| PlayerSearch              | azione            | azione di ricerca di un player (tramite nickname/email) per mandare una richiesta di amizia                                                          |
| PlayerSelect              | azione            | selezione di uno specifico Player dai risultati di PlayerSearch per avviare l'invio di una FriendRequest                                             |
| FriendRequestSend         | azione            | invio di una FriendRequest al Player selezionato tramite PlayerSelect                                                                                |
| FriendRemove              | azione            | azione di eliminazione di un amico                                                                                                                   |
| FriendshipDecline         | azione            | azione di declinare una richiesta di amicizia da parte di un player                                                                                  |
| FriendshipAccept          | azione            | azione di accettazione di una FriendRequest ricevuta da un altro Player — produce FriendshipAccepted e aggiorna la FriendList di entrambi i Player   |
|                           |                   |                                                                                                                                                      |
| FriendshipDeclined        | evento            | fatto che il destinatario ha rifiutato una FriendRequest ricevuta                                                                                    | 
| FriendRemoved             | evento            | rimozione di un amico avvenuta con successo                                                                                                          |
| PasswordRecovered         | evento            | processo di recupero password avvenuta con successo                                                                                                  | 
|                           |                   |                                                                                                                                                      | 

## player-progress-context
| Term                        | BuildingBlock-DDD     | Definizione                                                                                                                                                                                                          |
|-----------------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgress              | Aggregate-Root        | Rappresenta il livello di progresso del Player nel gioco. Si basa sul livello raggiunto, gli Achievement sbloccati e badge ottenuti oltre a dipendere dai risultati delle diverse partite giocate.                   |
| Level                       | Value-Object          | Valore numerico che riassume l'avanzamento del Player nell'ottenimento di badge e completamento di Achievements.                                                                                                     |
| Badge                       | Entity                | Stemma digitale che dimostra il raggiungimento di determinati Achievement secondo determinate condizioni, è definito nel CatalogoBadge e può essere ottenuto da più Player.                                          |
| Achievement                 | Entity                | Obiettivo di gioco con condizioni di completamento definite (es. vincere X match, usare Y carte), descritte dalla AchievementCompletionPolicy.                                                                       |
| MatchRecord                 | Value-Object          | Statistiche aggregate delle partite giocate (vittorie, sconfitte, esplosioni, defuse, carte/deck più usati).                                                                                                         |
| DeckWorkshopRecord          | Value-Object          | Statistiche aggregate che riguardano le attività svolte dal Player in DeckWorkshop (es. creazione CustomDeck).                                                                                                       |
| AchievementInProgress       | Value-Object          | Achievement le cui condizioni di risoluzione non sono ancora state soddisfatte.                                                                                                                                      |
| CompletedAchievement        | Value-Object          | Achievement che è stato soddisfatto dal Player in una determinata data secondo la AchievementCompletionPolicy.                                                                                                       |
| ObtainedBadge               | Value-Object          | Badge ottenuto in una determinata data dal Player secondo la BadgeUnlockPolicy.                                                                                                                                      |
| BadgeInProgress             | Value-Object          | Badge le cui condizioni di sblocco/ottenimento non sono ancora soddisfatte.                                                                                                                                          |
| BadgeUnlockPolicy           | Policy/Domain-Service | Criteri e condizioni di sblocco di un Badge.                                                                                                                                                                         |
| AchievementCompletionPolicy | Policy/Domain-Service | Condizioni di completamente di un Achievement.                                                                                                                                                                       |
| MatchWon                    | Value-Object          | Conteggio dei match vinti dal Player.                                                                                                                                                                                |
| MatchLost                   | Value-Object          | Conteggio dei match persi dal Player.                                                                                                                                                                                |
| ExplosionCount              | Value-Object          | Conteggio di esplosioni subite dal Player.                                                                                                                                                                           |
| DefuseCount                 | Value-Object          | Conteggio di disinnesci fatti dal Player.                                                                                                                                                                            |
| MostUsedCard                | Value-Object          | Carta molto utilizzata dal Player durante i Match.                                                                                                                                                                   |
| MostUsedDeck                | Value-Object          | Deck scelto spesso dal Player da usare nei Match.                                                                                                                                                                    |
| BadgeCatalog                | Entity                | Catalogo contenente tutti i Badge sbloccabili dai Player.                                                                                                                                                            |
| BadgeUnlocked               | Domain-Event          | Evento generato quando un Badge è stato ottenuto dal Player secondo la BadgeUnlockPolicy. Comporta l'aggiornamento del PlayerProgress (Level, ObtainedBadge e BadgeInProgress).                                      |
| AchievementCompleted        | Domain-Event          | Evento generato quando un Achievement è stato completato dal Player secondo la AchievementCompletionPolicy. Viene aggiornato PlayerProgress e l'Achievement passa da AchievementInProgress a CompletedAchievement. |


## lobby-browser-context
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
