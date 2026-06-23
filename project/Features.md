## Features Client

### Obbligatorie

### Opzionali

## Features Admin

### Obbligatorie

### Opzionali


## Features Client

- [ ] login + registrazione utente (possibilità email+codice otp)
    - [ ] possibilità di login con email/password + nickname
    - [ ] possibilità di registrazione con email/password + nickname
    - [ ] possibilità recupero password dimenticata
- [ ] creazione partita - room
    - [ ] impostazioni di gioco
        - [ ] numero di giocatori minimi-massimini (minimo 2)
        - [ ] tempo per turno (es. 30 secondi, 1 minuto, ecc...)
        - [ ] scegliere i mazzi (default+personali) da usare >= 1 in partita (es. mazzo "base", mazzo "fuoco", ecc...)
        - [ ] scegliere il nome della partita
        - [ ] scelta delle bombe da mettere (deafult una in meno al numero dei giocatori)
        - [ ] scelta di mettere anche disinnesci in più dentro il mazzo (default 1 per giocatore)
        - [ ] scegliere se la partita è pubblica o privata
            - [ ] partita pubblica: visibile a tutti, chiunque può partecipare
            - [ ] partita privata: visibile solo a chi ha il link d'invito/id+password della partita
- [ ] lobby+leave
    - [ ] -master- decide quando iniziare la partita (dopo che sono arrivati i giocatori minimi, o dopo un certo tempo,
      ecc...)
    - [ ] -partecipante- non può far iniziare la partita (solo il master può farlo)
    - [ ] -all- possibilità di uscire dalla pre-lobby (leave) prima che la partita inizi
        - [ ] se il master lascia, scelto un nuovo master tra i partecipanti rimasti (random o primo arrivato)
    - [ ] -all- visualizzazione dei giocatori presenti nella stanza
    - [ ] -forse- possibilità chat testuale
    - [ ] -all- possibilità di invitare amici (accesso automatico)
- [ ] join alla pre-lobby
    - [ ] elenco partite pubbliche
    - [ ] elenco partite private (con la password)
    - [ ] elenco partite con invito
- [ ] possibilità avere amicizie tra utenti
    - [ ] mandare richiesta amicizia
    - [ ] accettare richiesta amicizia
    - [ ] elenco amici
    - [ ] rimozione amici
- [ ] possibilità di essere un guess-player (senza login)
    - [ ] solo per partecipare a stanze pubbliche+private
    - [ ] per creare la partita devi registrarti
    - [ ] non puoi creare deck personali
- [ ] deck building
    - [ ] mazzi personalizzati (associati all'account)
    - [ ] possibilità di creare partendo dalle singole carte o da mazzi (default+personali)
    - [ ] possibilità di dare un nome
    - [ ] possibilità di scegliere la parte dietro
    - [ ] colonna per visualizzare la descrizione completa
- [ ] help-page
    - [ ] spiegazione delle regole
    - [ ] meccaniche di gioco
    - [ ] spiegazione delle singole carte
- [ ] visualizzare statistiche utenti
  - [ ] numero di partite giocate
  - [ ] numero di vittorie
  - [ ] numero di mazzi creati
- [ ] Replay della partita
- [ ] Spettatori
- [ ] Achievements/badge
- [ ] Animazione + suoni carte
- [ ] Mobile first

---------------------------------
- [ ] gioco vero e proprio
    - [ ] meccaniche
        - [ ] gioco a turno
        - [ ] ogni turno si puo attivare la carta o passare (implica pescare la carta)
        - [ ] se scade il tempo e come passare (quindi si pesca)
        - [ ] se pesci la bomba muori (salvo il disinnescatore)
            - [ ] puoi vedere la partita + reagire
            - [ ] puoi lasciare la partita
        - [ ] puoi disinnescare con la carta disinnesco (scelta del giocatore)
            - [ ] caso speciale: bomba che non si può disinnescare (esplidi lo stesso)
            - [ ] caso speciale: carta che ti fa tenere la bomba in mano
        - [ ] vittoria chi rimane per ultimo
    - [ ] meccaniche generali delle carte
        - [ ] attacco: salti il turno e giocatore successivo fa N turni (quindi pesca 2 volte)
        - [ ] attacco mirato: salti il turno e scegli chi fa N turni (quindi pesca 2 volte)
        - [ ] salto: salta N turno (non pescando)
        - [ ] prevedi futuro: guarda N carte da in cima il mazzo e rimetti nel mazzo
        - [ ] cambia futuro: guarda N carte e riordinale e rimetti nel mazzo
        - [ ] mescola
        - [ ] favore: scegli il giocatore che di darà N carte (scelte da lui) a te
        - [ ] pesca dal fondo: al posto di pescare da in cima, pesci dal fondo
        - [ ] no: nega una qualsiasi azione (tranne bomba e disinnescatore, e casi speciali)
        - [ ] carte panda: combinazioni di carte 2/3/n che attivano azioni
            - [ ] 2 carte: si prende un carta casuale da un giocatore
            - [ ] 3 carte: chidi una carta specifica a un giocatore se ce l'ha te la deve dare
    - [ ] meccaniche astratte
        - [ ] azione carta scelta e si risolve durante il turno (categoria A)
            - [ ] dai N turni a un giocatore e tu non fai nessun turno
            - [ ] salta N turni (quindi non pesci N volte)
            - [ ] prevedi futuro
            - [ ] cambia futuro
            - [ ] mescola
            - [ ] favore
            - [ ] mescola
            - [ ] pesca dal fondo
            - [ ] carte panda
        - [ ] azione che si può attivare sempre (categoria B) in risposta a una qualsiasi azione di tipo A, non serve il
          proprio turno
            - [ ] no
            - [ ] carte disinnescante: usabile solo quando si pesca la bomba
        - [ ] azioni triggerate alla pesca dal mazzo
            - [ ] carta bomba esplode quando si pesca
    - [ ] reazione di gioco (solo emoji-reazioni, no testo)
        - [ ] sono temporanee (spariscono dopo un po)

## Feature Admin

- [ ] creazione dei mazzi
    - [ ] possibilità di creare mazzi predefiniti (es. mazzo "base" con carte base, mazzo "fuoco" con carte a tema
      fuoco, ecc...)
- [ ] creazione di nuove carte
    - [ ] possibilità di creare carte con effetti personalizzati (es. "quando giochi questa carta, pesca 2 carte e
      scarta 1 carta")
- [ ] gestione utenti
    - [ ] bannare utenti (temporaneamente o permanentemente)
- [ ] overview generale delle partite in corso
    - [ ] monitoraggio in tempo reale statistiche di gioco (es. carte più usate, carte più forti, ecc...)
    - [ ] monitoraggio in tempo reale salute servizi (es. numero di partite in corso, numero di utenti online, ecc...)