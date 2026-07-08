
# Bamboom

## Componenti del gruppo
- Manuel Julio Montesinos - julio@studio.unibo.it
- Matteo Violani - Matteo.violani@studio.unibo.it

## Project scenario
Il progetto consiste nello sviluppo di una piattaforma di gioco ispirata al gioco di carte Exploding Kittens ma a tema panda.

In questa piattaforma l'utente potrà instaurare legami di amicizia con gli altri utenti, comporre mazzi di gioco a partire dai mazzi ed estensioni gia presenti nel gioco o da quelli custom precedentemente creati.

L'utente potrà: partecipare alle partite inserendosi nella lobby aspettando che la quantità dei giocatori sia soddisfatta; creare una nuova partita configurandone il mazzo da utilizzare, il numero di bombe e/o disinnesci in eccesso e altri parametri come la durata del turno.

Durante la creazione di una partita gli amici potranno inserirsi nella lobby in anticipo, su un invito, in sala d'attesa prima che diventi visbile a tutti gli altri. 

L'utente potrà decidere se partecipare come giocatore o solo osservatore alla partita. Reazioni ??

Questa piattaforma richiederà la registrazione.

Le carte, i mazzi e le estensioni disponibili in Bamboom saranno gestite da un utente admin la quale sarà in grado di crearle e pubblicarle.

## Domain requirements



Realizzare un sistema di domotica con relativo protocollo, che permetta l'aggiunta/rimozione dinamica di dispositivi che lo implementano.

L'interazione dell'utente con il sistema avviene attraverso un server installato nella casa in questione. Il client web non comunica direttamente con i dispositivi smart ma lo fa attraverso il server.

Il server è esposto anche su internet in modo da permettere agli utenti di operare sulla casa anche quando lontani.

Il protocollo prevede la possibilità da parte dei dispositivi di descrivere le operazioni che possono essere effettuate su di essi e i dati che producono. Questo permetterebbe ad eventuali produttori di dispositivi di creare le loro implementazioni che saranno compatibili con il sistema senza che questo debba essere modificato.

È inoltre possibile definire delle automazioni innescate sia direttamente dall’utente che da un evento esterno. 

Sarà possibile per il client ricevere notifiche push dal server personalizzate in base alle esigenze dell'utente (essere avvertiti quando un dispositivo è offline / la temperatura raggiunge una soglia definita / la lavatrice ha terminato il lavaggio / esito di un'automazione programmata) 

Esistono due tipi di utenti:
L'admin: Può aggiungere e rimuovere dispositivi dal sistema, e per ogni altro utente è in grado di definire con quali dispositivi questo può interagire. (E' comunque un fruitore del sistema, non quindi un tecnico)
L'utente: Può interagire solo con i dispositivi per i quali è stato abilitato dall'admin.

Inoltre è presente un sistema di autenticazione in modo che gli utenti possano interagire con il sistema.
Gli utenti possono registrarsi autonomamente al sistema ma non possono interagirci fino a quando non vengono approvati dall'admin.

Componenti del sistema
Server 
Client Web
Più dispositivi IoT
Tecnologie
Si ipotizza di utilizzare:

lo stack MEVN (utilizzando TypeScript ove possibile)
per i dispositivi utilizzeremo anche altri linguaggi o runtime
