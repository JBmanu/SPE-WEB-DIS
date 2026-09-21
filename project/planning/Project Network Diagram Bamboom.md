# Project Network Diagram (PND) — Bamboom

Diagramma di rete delle **feature** del progetto (non delle attività implementative), derivato dai bounded context già definiti. Le dipendenze indicano quali feature devono esistere prima che un'altra abbia senso dal punto di vista dell'utente/prodotto.

## Legenda

| Colore | Significato |
|---|---|
| 🟡 Oro / bordo spesso | **Percorso critico**: le feature minime indispensabili perché l'applicativo sia giocabile end-to-end (registrazione → lobby → partita fino alla fine) |
| ⚪ Grigio | Feature secondarie — arricchiscono il prodotto ma non bloccano il gioco base |
| 🔵 Azzurro | Chiusura del progetto: verifica completa e consegna |

## Diagramma

```mermaid
flowchart TD

  %% ================= PERCORSO CRITICO =================
  REG["Registrazione giocatori"]
  LOGIN["Login giocatori"]
  CARDS["Creazione e pubblicazione<br/>di carte e mazzi di base"]
  LOBBY_CREATE["Creazione di una lobby<br/>(impostazioni partita + scelta mazzo)"]
  LOBBY_JOIN["Partecipazione alla lobby<br/>(join pubblico/manuale)"]
  MATCH_START["Avvio della partita"]
  MATCH_PLAY["Svolgimento della partita<br/>(turni, carte, bombe/disinneschi)"]
  MATCH_END["Conclusione della partita<br/>con risultato finale"]

  REG --> LOGIN
  LOGIN --> LOBBY_CREATE
  CARDS --> LOBBY_CREATE
  LOBBY_CREATE --> LOBBY_JOIN
  LOBBY_JOIN --> MATCH_START
  MATCH_START --> MATCH_PLAY
  MATCH_PLAY --> MATCH_END

  %% ================= FEATURE SECONDARIE =================
  FRIENDS["Gestione amicizie"]
  INVITE["Inviti privati in lobby"]
  MATCHMAKING["Matchmaking automatico<br/>(quick join)"]
  SPECTATOR["Spettatori e reazioni<br/>durante la partita"]
  REPLAY["Storico e replay<br/>delle partite"]
  CUSTOM_DECK["Creazione di mazzi<br/>personalizzati"]
  PROGRESS["Statistiche, progressi,<br/>achievement e badge"]
  DASHBOARD["Dashboard piattaforma<br/>(utenti/lobby/partite attive)"]
  HEALTH["Monitoraggio salute<br/>dei servizi"]

  REG --> FRIENDS
  FRIENDS --> INVITE
  LOBBY_CREATE --> INVITE
  LOBBY_CREATE --> MATCHMAKING
  MATCH_PLAY --> SPECTATOR
  MATCH_END --> REPLAY
  CARDS --> CUSTOM_DECK
  LOGIN --> PROGRESS
  MATCH_END --> PROGRESS
  CUSTOM_DECK --> PROGRESS
  LOGIN --> DASHBOARD
  LOBBY_CREATE --> DASHBOARD
  MATCH_END --> DASHBOARD

  %% ================= CHIUSURA PROGETTO =================
  TEST_FULL["Verifica completa<br/>di tutte le feature"]
  DELIVERY["Consegna e<br/>documentazione finale"]

  MATCH_END --> TEST_FULL
  INVITE --> TEST_FULL
  MATCHMAKING --> TEST_FULL
  SPECTATOR --> TEST_FULL
  REPLAY --> TEST_FULL
  CUSTOM_DECK --> TEST_FULL
  PROGRESS --> TEST_FULL
  DASHBOARD --> TEST_FULL
  HEALTH --> TEST_FULL
  TEST_FULL --> DELIVERY

  %% ================= STILI =================
  classDef mvp fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#000;
  classDef secondary fill:#E8E8E8,stroke:#999999,stroke-width:1px,color:#333;
  classDef wrap fill:#ADD8E6,stroke:#1565C0,stroke-width:2px,color:#000;

  class REG,LOGIN,CARDS,LOBBY_CREATE,LOBBY_JOIN,MATCH_START,MATCH_PLAY,MATCH_END mvp
  class FRIENDS,INVITE,MATCHMAKING,SPECTATOR,REPLAY,CUSTOM_DECK,PROGRESS,DASHBOARD,HEALTH secondary
  class TEST_FULL,DELIVERY wrap
```

## Note sul percorso critico (oro)

```
Registrazione → Login
Creazione e pubblicazione carte/mazzi (almeno un mazzo base)
        ↓                    ↓
        └────────→ Creazione lobby ────────→ Partecipazione lobby
                                                      ↓
                                               Avvio partita
                                                      ↓
                                           Svolgimento partita
                                                      ↓
                                          Conclusione partita
```

Sono le uniche feature senza le quali l'app non è "un gioco funzionante": un utente deve potersi registrare, autenticare, avere a disposizione almeno un mazzo per creare/scegliere una lobby, entrarci, far partire la partita e giocarla fino alla fine.

Tutto il resto (amicizie, inviti, matchmaking automatico, spettatori/reazioni, replay, mazzi personalizzati, statistiche/achievement, dashboard, monitoraggio salute) migliora l'esperienza o copre requisiti dei singoli corsi, ma può essere sviluppato in parallelo senza bloccare la giocabilità di base — per questo sono feature secondarie (grigio) che confluiscono solo nella verifica finale.

## Prossimi passi

1. Confermare se la granularità va bene così o se preferisci spezzare ulteriormente qualche feature (es. separare "gioco delle carte" da "gestione bombe/disinneschi").
2. Assegnare durate stimate a ogni feature → genero il Gantt Mermaid con le stesse dipendenze.
3. Dallo stesso elenco, genero le issue + link di dipendenza per l'import in YouTrack.
