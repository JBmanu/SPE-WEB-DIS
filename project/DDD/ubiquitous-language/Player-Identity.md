
# player-identity-context
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
