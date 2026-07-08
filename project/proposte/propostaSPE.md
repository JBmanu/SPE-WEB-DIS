# Bamboom (SPE+ASW+DS)

## Project proposal

- Bamboom: gioco di carte ispirato al gioco exploding kittens a tema panda

## Componenti del gruppo
- Manuel Julio Montesinos - julio@studio.unibo.it
- Matteo Violani - Matteo.violani@studio.unibo.it

Lo stesso progetto sarà sviluppato e utilizzato anche per i corsi di
Distributed System and Applicazioni e Servizi Web.

## Project scenario
Il progetto consiste nello sviluppo di una piattaforma di gioco ispirata al gioco di carte Exploding Kittens ma a tema panda.

In questa piattaforma l'utente potrà instaurare legami di amicizia con gli altri utenti, comporre mazzi di gioco a partire dai mazzi ed estensioni gia presenti nel gioco o da quelli custom precedentemente creati.

L'utente potrà: partecipare alle partite inserendosi nella lobby aspettando che la quantità dei giocatori sia soddisfatta; creare una nuova partita configurandone il mazzo da utilizzare, il numero di bombe e/o disinnesci in eccesso e altri parametri come la durata del turno.

Durante la creazione di una partita gli amici potranno inserirsi nella lobby in anticipo, su un invito, in sala d'attesa prima che diventi visbile a tutti gli altri. 

L'utente potrà decidere se partecipare come giocatore o solo osservatore alla partita. Reazioni ??

Questa piattaforma richiederà la registrazione.

Le carte, i mazzi e le estensioni disponibili in Bamboom saranno gestite da un utente admin la quale sarà in grado di crearle e pubblicarle.

## Domain requirements

- Architettura: microservices

- Piattaforma di gioco per gli utenti e dashboard per l'admin
- Sistema per fare il draft e pubblicazioni di carte, deck ed espanzioni da parte dell'admin
- Dashboard per osservare le informazioni/statistiche di gioco della piattaforma
- Sistema di monitoraggio per i micro-servizi della piattaforma
- Sistema di registrazione per gli utenti e relazioni di amicizie
- Sistema di accesso/ricerca di partite pubbliche o accesso su invito
- Sistema di progresso per l'utente, gamification con achiviements e badge
- Overview delle statistiche di gioco dell'utente
- Creazioni di partite pubbliche/private per le sessioni di gioco e sistema di inviti alla lobby
- Sistema per creare customDeck all'interno del gioco, con le carte pubblicate dall'admin
