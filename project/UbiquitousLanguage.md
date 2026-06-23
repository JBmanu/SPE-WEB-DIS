# Ubiquitous Language

## Dominio del gioco

### Entità
- admin: il gestore del gioco
- user: il cliente che usa il servizio del gioco
- player: uno user registrato al servizio che gioca
- guest-player: player che non si è registrato che gioca
- watcher-player: player che guarda la partita
- master: il player che avvia la lobby e far partire la partita
- friend: lista degli user che anno accettato la richiesta di amicizia

### Eventi
- richiesta di amizia: richiesta per essere amici nel servizio, si può accettare come no

### Oggetti
- achievements: trofei guadagnati dentro l'applicazione
- badge: numero di trofei guadagnati dentro l'applicazione

### Gioco
- partita: sessione di gioco che può essere pubblica o privata, dove i player giocano
- turno: fase della partita dove il giocatere sceglie una azione
- carte: elemento principale del gioco
- deck: insieme della carte di gioco

### Page dell'applicazione
- menu: interfaccia principale dello user
- dashboard: interfaccia principale dell'admin
- pre-lobby: sala virtuale dove il master crea la partita, scegliendo le impostazioni iniziali
- lobby: sala virtuale creata dal master dove aspetta gli altri player o guest-player per l'inizio della partita
- game-room: sala virtuale dove avviene la partita(avviata), possono esserci i watcher-player
- join-room: sala virtuale dove posso vedere le partite pubbliche/private a cui puoi partecipare
- deck-building-page: pagina dove creo deck personalizzati
- help-page: pagina dove ci sono le spiegazioni del gioco 