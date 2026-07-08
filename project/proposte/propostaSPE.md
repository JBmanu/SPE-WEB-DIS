# Bamboom (SPE+ASW+DS)

## Project proposal

- Bamboom: gioco di carte ispirato al gioco exploding kittens a tema panda

Lo stesso progetto sarà sviluppato e utilizzato anche per i corsi di
Distributed System and Applicazioni e Servizi Web.

## Componenti del gruppo

- Manuel Julio Montesinos - julio@studio.unibo.it
- Matteo Violani - Matteo.violani@studio.unibo.it

## Project scenario

Il progetto consiste nello sviluppo di Bamboom, una piattaforma di gioco ispirata al gioco di carte 
Exploding Kittens, rivisitato a tema panda. La piattaforma richiede la registrazione.
Gli utenti potranno instaurare legami di amicizia e comporre mazzi di gioco a partire dai mazzi e dalle 
estensioni già presenti nel gioco, oppure da quelli custom precedentemente creati.
L'utente potrà partecipare a partite e lobby, attendendo che venga raggiunto il numero di giocatori richiesto. 
È possibile creare nuove partite configurando il mazzo da utilizzare, il numero di bombe e di disinnesci 
aggiuntivi e altri parametri come la durata del turno.
Durante la creazione di una partita, gli amici potranno partecipare alla lobby tramite invito, in una sala 
d'attesa privata, prima che la partita diventi visibile a tutti gli altri utenti.
L'utente potrà scegliere se partecipare alla partita come giocatore o come osservatore. 
Durante la partita ciascun giocatore vedrà la propria mano e potrà giocare le carte secondo il regolamento; 
i giocatori potranno interagire fra loro tramite reazioni. Al termine della partita sarà disponibile lo storico 
della partita.
Le carte, i mazzi e le estensioni disponibili in Bamboom saranno gestiti da un utente amministratore, il quale 
potrà crearli e pubblicarli.

## Domain Requirements

Utenti della piattaforma:

**Admin**: utente che gestisce e monitora la piattaforma Bamboom.
- Può creare bozze e pubblicare carte, mazzi ed espansioni di gioco.
- Può visualizzare le statistiche di gioco di tutti i giocatori.
- Può monitorare lo stato di tutti i microservizi della piattaforma.

**User**: giocatore che si registra e gioca sulla piattaforma Bamboom.
- Creazione e gestione dell'account e delle relazioni di amicizia con altri giocatori.
- Creazione e gestione di mazzi personalizzati con le carte disponibili nel gioco.
- Gestione delle lobby pubbliche e private e delle partite in corso.
- Gioco delle carte secondo il regolamento e uso delle reazioni per interagire durante la partita.
- Visualizzazione di statistiche, progressi e achievements/badge.

**Requisiti opzionali (User)**:
- Replay delle ultime partite disputate.

## Architectural Requirements

- Architettura a microservizi.
