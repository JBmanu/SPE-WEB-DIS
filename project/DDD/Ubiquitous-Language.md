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
| Term                    | BuildingBlock-DDD | Definizione                                                                                                                                                                                                    |
|-------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PlayerProgress          | Aggregate-Root    | Rappresenta il livello di progresso del Player nel gioco. Si basa sul livello raggiunto, gli Achievement completati e badge ottenuti oltre a dipendere dai risultati delle diverse partite giocate.            |
| Level                   | Value-Object      | Valore numerico che riassume l'avanzamento del Player nell'ottenimento di badge e completamento di Achievements.                                                                                               |
| MatchRecord             | Value-Object      | Statistiche aggregate delle partite giocate (vittorie, sconfitte, esplosioni, defuse, carte/deck più usati).                                                                                                   |
| DeckWorkshopRecord      | Value-Object      | Statistiche aggregate che riguardano le attività svolte dal Player in DeckWorkshop (es. creazione CustomDeck).                                                                                                 |
| AchievementInProgress   | Value-Object      | Achievement le cui condizioni di risoluzione non sono ancora state soddisfatte.                                                                                                                                |
| CompletedAchievement    | Value-Object      | Achievement che è stato soddisfatto dal Player in una determinata data secondo la AchievementObtainPolicy.                                                                                                     |
| ObtainedBadge           | Value-Object      | Badge ottenuto in una determinata data dal Player secondo la BadgeObtainPolicy.                                                                                                                                |
| BadgeInProgress         | Value-Object      | Badge le cui condizioni di sblocco/ottenimento non sono ancora soddisfatte.                                                                                                                                    |
|                         |                   |                                                                                                                                                                                                                |
| Badge                   | Entity            | Stemma digitale che dimostra il raggiungimento di determinati Achievement secondo determinate condizioni descritte da BadgeObtainPolicy. Un Badge può essere ottenuto da più Player.                           |
| Achievement             | Entity            | Obiettivo di gioco con condizioni di completamento definite (es. vincere X match, usare Y carte), descritte dalla AchievementObtainPolicy.                                                                     |
|                         |                   |                                                                                                                                                                                                                |
| - Term -                | - Tipology -      |                                                                                                                                                                                                                |
| BadgeObtainPolicy       | Policy            | Logica di ottenimento di un Badge.                                                                                                                                                                             |
| AchievementObtainPolicy | Policy            | Condizioni di completamente di un Achievement.                                                                                                                                                                 |
|                         |                   |                                                                                                                                                                                                                |
| CompletionThreshold     | Concept           | Valore numerico che il contatore di AchievementInProgress o BadgeInProgress deve raggiungere per completare l'obiettivo                                                                                        |
| Mission                 | Concept           | Obiettivo da raggiungere attraverso il completamento degli Achievement.                                                                                                                                        |
| BadgeCatalog            | Concept           | Insieme di tutti i Badge ottenibili dai Player.                                                                                                                                                                |
| AchievementCatalog      | Concept           | insieme di tutti gli Achievement disponibili nella piattaforma, consultabile dal Player.                                                                                                                       |
| MatchWon                | Concept           | Conteggio dei match vinti dal Player.                                                                                                                                                                          |
| MatchLost               | Concept           | Conteggio dei match persi dal Player.                                                                                                                                                                          |
| ExplosionCount          | Concept           | Conteggio di esplosioni subite dal Player.                                                                                                                                                                     |
| DefuseCount             | Concept           | Conteggio di disinnesci fatti dal Player.                                                                                                                                                                      |
| MostUsedCard            | Concept           | Carta molto utilizzata dal Player durante i Match.                                                                                                                                                             |
| MostUsedDeck            | Concept           | Deck scelto spesso dal Player da usare nei Match.                                                                                                                                                              |
| ExperiencePoint         | Concept           | Il valore di esperienza guadagnato completando un Achievement che contribuisce all'aumento del Level.                                                                                                          |
|                         |                   |                                                                                                                                                                                                                |
| ProgressTriggered       | Event             | Evento che innesca l'aggiornamento dei PlayerProgress con conseguenza di ottenimento di Achievements, Badge e aumento di Level.                                                                                |
| BadgeObtained           | Event             | Evento generato quando un Badge è stato ottenuto dal Player secondo la BadgeObtainPolicy. Comporta l'aggiornamento del PlayerProgress (Level, ObtainedBadge e BadgeInProgress).                                |
| AchievementCompleted    | Event             | Evento generato quando un Achievement è stato completato dal Player secondo la AchievementObtainPolicy. Viene aggiornato PlayerProgress e l'Achievement passa da AchievementInProgress a CompletedAchievement. |
| LevelUp                 | Event             | Evento che provoca l'aumento del Level al raggiungimento di una certa quantità di ExperiencePoint.                                                                                                             |

## lobby-browser-context
| Term                               | BuildingBlock-DDD | Definizione                                                                                                                                                                                                          |
|------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lobby/LobbyView                    | Value-Object      | Rappresentzione di una lobby alla quale i Player possono fare Join salvo raggiungimento del un numero masismo di Player (LobbyCapacity) sia Friend che non. Raggiunta la capacità massima diventa un Match/GameView. |
| Match/MatchView                    | Value-Object      | Rappresentazione di un Match in corso alla quale è possibile fare Join solo come Watcher.                                                                                                                            |
|                                    |                   |                                                                                                                                                                                                                      |
| LobbyJoined                        | Event             | Evento generato quando un Player effettua il Join ad una Lobby.                                                                                                                                                      |
| WatcherJoined                      | Event             | Evento generato quando un Player effettua il Join ad un Match.                                                                                                                                                       |
|                                    |                   |                                                                                                                                                                                                                      |
| - Term -                           | - Tipology -      |                                                                                                                                                                                                                      |
| JoinLobbyRequest                   | Concept           | Invito alla lobby da parte di un Friend.                                                                                                                                                                             |
| LobbyCapacity                      | Concept           | Capacità massima di Player contenibili dalla Lobby.                                                                                                                                                                  |
| LobbyOwner                         | Concept           | Nome/Nickname del Player che detiene la proprietà della Lobby.                                                                                                                                                       |
| LobbyName                          | Concept           | Nome della Lobby.                                                                                                                                                                                                    |
| JoinMark                           | Concept           | Elemento che indica ad un Player che è stato invitato alla Lobby da un Friend.                                                                                                                                       |
|                                    |                   |                                                                                                                                                                                                                      |
| WatchMatch (choose-match-to-watch) | Azione            | Azione di Join ad un ActiveMatch come Watcher                                                                                                                                                                        |
| JoinLobby (choose-match-to-join)   | Azione            | Azione di Join ad una Lobby come Player in attesa dell'inizio del Match.                                                                                                                                             |
| SearchLobby                        | Azione/Query      | Azione di ricerca anche con filtri semplici (es. join come Watcher o Player) per trovare Match in corso a cui assistere oppure Lobby a cui aggiungersi.                                                              |
|                                    |                   |                                                                                                                                                                                                                      |


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
| Term                      | BuildingBlock-DDD | Definizione                                                                                                                                                                                                                 | 
|---------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CardDefinition            | Aggregate-Root    | definizione di una carta creata dall'admin - nasce in stato Draft e diventa Published alla prima pubblicazione tramite CardPublish, DeckPublish o ExpansionPublish; una volta Published non è più modificabile              | 
| Action                    | Value-Object      | effetto che una CardDefinition produce quando viene attivata in partita - definita dall'admin durante la creazione, determina il comportamento della carta nel gioco                                                         | 
| Attribute                 | Value-Object      | insieme delle proprietà descrittive di una CardDefinition (tipo carta, tipo attacco) che ne determinano il comportamento in partita                                                                                         | 
| PublicationStatus         | Value-Object      | stato di pubblicazione di CardDefinition, DeckDefinition o ExpansionDefinition - transizione irreversibile da Draft a Published; una volta Published il contenuto è in circolazione e non può essere modificato o eliminato | 
|                           |                   |                                                                                                                                                                                                                             | 
| DeckDefinition            | Aggregate-Root    | mazzo di default creato dall'admin - nasce in stato Draft, composto da CardEntry; alla pubblicazione promuove a Published tutte le CardDefinition referenziate ancora in Draft                                              | 
| CardEntry                 | Value-Object      | riferimento a una CardDefinition inserita nella composizione di un DeckDefinition o ExpansionDefinition, con la relativa quantità                                                                                           |
| PublicationStatus         | Value-Object      | stato della definizione del deck che sarà Draft quando ancora non è pubblicata e Published quando la carta è pubblicata nella piattaforma, cambio in Published irreversibile                                                |
|                           |                   |                                                                                                                                                                                                                             | 
| ExpansionDefinition       | Aggregate-Root    | pacchetto tematico di carte creato dall'admin - nasce in stato Draft, contiene almeno una CardEntry; alla pubblicazione promuove a Published tutte le CardDefinition referenziate ancora in Draft                           | 
| CardEntry                 | Value-Object      | riferimento a una CardDefinition inserita nella composizione di un DeckDefinition o ExpansionDefinition, con la relativa quantità                                                                                           |
| PublicationStatus         | Value-Object      | stato della definizione dell'espanione che sarà Draft quando ancora non è pubblicata e Published quando la carta è pubblicata nella piattaforma, cambio in Published irreversibile                                          |
|                           |                   |                                                                                                                                                                                                                             | 
| DeckPublished             | Domain-Event      | pubblicazione del deck e di tutte le carte che contiene, se ancora non sono state pubblicate                                                                                                                                | 
| ExpansionPublished        | Domain-Event      | pubblicazione dell'espansione e di tutte le carte che contiene, se ancora non sono state pubblicate                                                                                                                         | 
|                           |                   |                                                                                                                                                                                                                             | 
| - Term -                  | - Tipology -      | //                                                                                                                                                                                                                          |
| PublicationPolicy         | Policy            | politica di pubblicazione una volta che una card/deck/expansion è stata pubblicata non può tornare indietro                                                                                                                 |
| UniqueCardName            | Policy            | regola per cui il nome di una CardDefinition deve essere univoco nella piattaforma                                                                                                                                          |
| UniqueDeckName            | Policy            | regola per cui il nome di una DeckDefinition deve essere univoco nella piattaforma                                                                                                                                          |
| UniqueExpansionName       | Policy            | regola per cui il nome di una ExpansionDefinition deve essere univoco nella piattaforma                                                                                                                                     |
| CardDefinitionPolicy      | Policy            | insieme delle regole che una CardDefinition deve rispettare per essere pubblicata - deve avere nome univoco (UniqueCardName), descrizione, immagine, almeno un Action e gli Attribute coerenti con il tipo di carta         |
| MinimumCardEntryPolicy    | Policy            | regola per cui un deck e ExpansionDefinition deve contenere almeno una CardEntry per poter essere pubblicata                                                                                                                |
|                           |                   |                                                                                                                                                                                                                             |
| CardDocumentation         | Concept           | informazioni leggibili di una CardDefinition destinate ai Player - include nome, descrizione dell'effetto e immagine; visibile nella help page e nel deck workshop durante la composizione dei mazzi                        |
| DeckBack                  | Concept           | grafica personalizzabile applicata al retro delle carte - scelta dal amdin durante la creazione o la modifica del mazzo contribuisce all'identità visiva                                                                    |
| ExpantionBack             | Concept           | grafica personalizzabile applicata al retro delle carte - scelta dal amdin durante la creazione o la modifica dell'espanzione contribuisce all'identità visiva                                                              |
| Draft                     | Concept           | stato iniziale di CardDefinition, DeckDefinition o ExpansionDefinition dopo la creazione - modificabile e non ancora visibile ai Player                                                                                     |
| Pubblished                | Concept           | stato di CardDefinition, DeckDefinition o ExpansionDefinition dopo la pubblicazione - in circolazione, non più modificabile né eliminabile                                                                                  |
|                           |                   |                                                                                                                                                                                                                             |
| CardSelect                | Action            | selezione di una specifica carta per editarla (in stato di draft) o aggiungerla ad un deck o espansione                                                                                                                     | 
| CardEntryAdd              | Action            | aggiunta di una CardDefinition alla composizione di un DeckDefinition o ExpansionDefinition                                                                                                                                 | 
| CardEntryRemove           | Action            | rimozione di una CardDefinition dalla composizione di un DeckDefinition o ExpansionDefinition - possibile solo finché Draft                                                                                                 |
| CardRename                | Action            | rinominare il nome della card in stato di draft                                                                                                                                                                             |
| CardEdit                  | Action            | entra in fase di editing di una carta ancora in stato di draft                                                                                                                                                              |
| CardSave                  | Action            | salvataggio di una card in stato di draft                                                                                                                                                                                   |
| CardSaveAs                | Action            | savataggio con nome di una card in stato di draft                                                                                                                                                                           |
| CardDelete                | Action            | eliminazione permanente di una CardDefinition in stato Draft - non possibile se già Published.                                                                                                                              |
| CardClear                 | Action            | rimozione di tutte le impostazioni della card ancora in stato di draft                                                                                                                                                      |
|                           |                   |                                                                                                                                                                                                                             |
| DeckBackSelect            | Action            | selezione della grafica da applicare al retro di tutte le card del deck                                                                                                                                                     |
| DeckSelect                | Action            | selezione di un deck per la editarlo (in stato di draft) o per aggiungere tutte le carte associare ad un deck                                                                                                               | 
| DeckAdd                   | Action            | aggiunta di tutte le card di un deck in un altro deck                                                                                                                                                                       |
| DeckRename                | Action            | rinominare il nome del deck in stato di draft                                                                                                                                                                               |
| DeckEdit                  | Action            | entra nella fase di editing di un deck ancora in stato di draft                                                                                                                                                             |
| DeckSave                  | Action            | salvataggio di un deck in stato di draft                                                                                                                                                                                    | 
| DeckSaveAs                | Action            | savataggio con nome di un deck in stato di draft                                                                                                                                                                            | 
| DeckDelete                | Action            | eliminazione permanente di una DeckDefinition in stato Draft                                                                                                                                                                |
| DeckClear                 | Action            | rimozione di tutte le card associate ad un deck ancora in stato di draft                                                                                                                                                    |
|                           |                   |                                                                                                                                                                                                                             |
| ExpansionBackSelect       | Action            | selezione della grafica da applicare al retro della carta, o del retro delle carte dell' espansione                                                                                                                         |
| ExpansionSelect           | Action            | selezione di un espansione per la editarla (in stato di draft) o per aggiungere tutte le carte associare ad un deck                                                                                                         | 
| ExpansionAdd              | Action            | aggiunta di tutte le card di un espansione in un altro deck                                                                                                                                                                 | 
| ExpansionRemove           | Action            | rinominare il nome di un espansione in stato di draft                                                                                                                                                                       | 
| ExpansionRename           | Action            | rinominare il nome dell'espansione in stato di draft                                                                                                                                                                        |
| ExpansionEdit             | Action            | entra nella fase di editing di un espansione ancora in stato di draft                                                                                                                                                       |
| ExpansionSave             | Action            | salvataggio di un espansione in stato di draft                                                                                                                                                                              | 
| ExpansionSaveAs           | Action            | savataggio con nome di un espansione in stato di draft                                                                                                                                                                      | 
| ExpansionDelete           | Action            | eliminazione permanente di una ExpansionDefinition in stato Draft                                                                                                                                                           | 
| ExpansionClear            | Action            | rimozione di tutte le card associate ad un espansione ancora in stato di draft                                                                                                                                              | 
|                           |                   |                                                                                                                                                                                                                             | 
| DeckPublishedConfirm      | Action            | azione di conferma per pubblicare un deck                                                                                                                                                                                   | 
| ExpansionPublishedConfirm | Action            | azione di conferma per pubblicare un espansione                                                                                                                                                                             | 
|                           |                   |                                                                                                                                                                                                                             | 

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
