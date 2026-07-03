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
| Term                            | BuildingBlock-DDD | Definizione                                                                                   | 
|---------------------------------|-------------------|-----------------------------------------------------------------------------------------------|
| Player                          | Aggregate-Root    | client che si registrerà sulla piattaforma di gioco e si loggera                              | 
| Email                           | Value-Object      | email validata dell'utente che userà il player per registrarsi e successivamente per loggarsi | 
| Password                        | Value-Object      | codice usato dal player per registrarsi alla piattaforma e successivamente per loggarsi       | 
| Nickname                        | Value-Object      | soprannome usato dal player per riconoscersi dagli altri player sulla piattaforma             | 
| Friend                          | Value-Object      | specifico player che è diventato amico di un altro player, dopo che ha accettato l'amicizia   | 
| FriendRequest                   | Entity            | dati utili per il messaggio da mandare per la richiesta di amizia tra i player                | 
|                                 |                   |                                                                                               | 
| PlayerLoggedIn                  | Domain-Event      | evento del player che ha già effettuato l'accesso alla piattaforma                            | 
| PlayerLoggedOut                 | Domain-Event      | evento del player che ha già effettuato l'uscita alla piattaforma                             | 
| PlayerRegistered                | Domain-Event      | evento del player che si è registrato alla piattaforma                                        | 
|                                 |                   |                                                                                               | 
| FriendshipAccepted              | Domain-Event      | evento del player che ha accettato la rihiesta di amicizia di un altro player                 | 
|                                 |                   |                                                                                               | 
| TODO: altri termini del dominio |                   |                                                                                               | 
|                                 |                   |                                                                                               | 
|                                 |                   |                                                                                               | 
|                                 |                   |                                                                                               | 
|                                 |                   |                                                                                               | 
|                                 |                   |                                                                                               | 
|                                 |                   |                                                                                               | 

## player-progress-context
| Term                       | BuildingBlock-DDD | Definizione                                                                                                                                                                                       |
|----------------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgress             | Aggregate-Root    | Rappresenta il livello di progresso del Player nel gioco. Si basa sul livello raggiunto, gli Achivement sbloccati e badge ottenuti oltre a dipendere dai risultati delle diverse partite giocate. |
| Level                      | Value-Object      | Valore numerico che riassume l'avanzamento del Player nell'ottenimento di badge e completamento di achivements.                                                                                   |
| Badge                      | Entity            | Stemma digitale che dimostra il raggiungimento di determinati Achivement secondo determinate condizioni.                                                                                          |
| Achivement                 | Entity            |                                                                                                                                                                                                   |
| MatchRecord (1)            | Value-Object      | Raggruppamento di informazioni statistiche riguardo i match giocati dal Player e abitudini di gioco (es. deck usati, vittorie, sconfitte,...)                                                     |
| DeckWorkshopRecord         | Value-Object      | Raggruppamento di informazioni statistiche riguardo DeckWorkshop.                                                                                                                                 |
| AchivementInProgress       | Value-Object      | Achivement le cui condizioni di risoluzione non sono ancora state soddisfatte.                                                                                                                    |
| CompletedAchivement        | Value-Object      | Achivement che è stato soddisfatto dal Player in una determinata data.                                                                                                                            |
| ObtainedBadge              | Value-Object      | Badge ottenuto in una determinata data.                                                                                                                                                           |
| BadgeInProgress            | Value-Object      | Badge le cui condizioni di sblocco/ottenimento non sono ancora soddisfatte.                                                                                                                       |
| BadgeUnlockPolicy          | (\*)              | Criteri e condizioni di sblocco di un Badge.                                                                                                                                                      |
| AchivementCompletionPolicy | (\*)              | Condizioni di completamente di un Achivement.                                                                                                                                                     |
| MatchWon                   | Value-Object      | Conteggio dei match vinti dal Player.                                                                                                                                                             |
| MatchLost                  | Value-Object      | Conteggio dei match persi dal Player.                                                                                                                                                             |
| ExplosionCount             | Value-Object      | Conteggio di esplosioni subite dal Player.                                                                                                                                                        |
| DefuseCount                | Value-Object      | Conteggio di disinnesci fatti dal Player.                                                                                                                                                         |
| MostUsedCard               | Value-Object      | Carta molto utilizzata dal Player durante i Match.                                                                                                                                                |
| MostUsedDeck               | Value-Object      | Deck scelto spesso dal Player da usare nei Match.                                                                                                                                                 |
|                            |                   |                                                                                                                                                                                                   |
|                            |                   |                                                                                                                                                                                                   |

(1) dato che subisce molte variazioni non sarebbbe meglio come Entity?
(\*) Policy?

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
