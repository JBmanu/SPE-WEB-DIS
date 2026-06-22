# Analisi Feature "Exploding Panda" vs Requisiti dei 3 Corsi

> **Contesto**: il progetto riprende le meccaniche di Exploding Kittens (versione base) riadattate con i panda per evitare copyright. Include creazione stanze/lobby, deckbuilding personalizzato, gioco a turni con carte speciali, sistema di amicizie, statistiche e pannello admin.
>
> Struttura del documento: per ogni requisito di ogni corso si analizza se le feature attuali lo soddisfano (✅ soddisfatto / ⚠️ parziale / ❌ mancante), con feature aggiuntive suggerite dove serve. Al fondo le tabelle di riepilogo.

---

## 1. Software Process Engineering (SPE)

### 1.1 Domain-Driven Design ✅ implicito / ⚠️ da rendere esplicito

**Stato attuale**: il progetto ha un dominio ricco e ben definito (partita, stanza, carta, mazzo, turno, giocatore, bomba, disinnesco) ma le feature così come scritte non citano esplicitamente l'organizzazione del codice in bounded context, aggregate root, value object ecc.

**Cosa c'è già di buono**:
- `Partita` e `Stanza` sono candidati naturali ad aggregate root con invarianti forti (es. una partita non può iniziare senza il numero minimo di giocatori).
- `Carta` e `Mazzo` sono value object / entity ben identificati.
- `Turno`, `Azione`, `Evento di gioco` sono domain event naturali.
- L'admin gestisce un bounded context separato (gestione mazzi/carte default) rispetto al bounded context del giocatore (deckbuilding/partecipazione).

**Feature mancanti / suggerite per soddisfare DDD esplicitamente**:

- **[TECNICO] Struttura a moduli separati**: organizzare il codice in moduli/package che rispecchino i bounded context (es. `identity` per login/utenti, `lobby` per stanze/pre-lobby, `game` per la partita vera, `catalog` per carte/mazzi admin, `deckbuilding` per mazzi utente). Rende visibile il DDD nella struttura del repository.
- **[TECNICO] Domain Events espliciti tra i bounded context**: quando una partita termina, un Domain Event `GameEnded` aggiorna le statistiche utente nel bounded context `identity` — invece di chiamate dirette tra moduli.
- **[TECNICO] Anti-Corruption Layer verso servizi esterni**: se si integra un provider OAuth (login social) o un servizio email (OTP), wrapparlo in un adapter esplicito.

---

### 1.2 Processo di sviluppo chiaro e pratiche DevOps ✅ / ⚠️ non visibile nelle feature

**Stato attuale**: le feature non descrivono il processo di sviluppo (è implicito che ci sarà un repo Git), ma il contenuto del progetto si presta benissimo.

**Feature/pratiche suggerite**:

- **[PROCESSO] Conventional Commits + semantic-release**: ogni feature della lista diventa un tipo di commit (`feat:`, `fix:`, `docs:`) e produce un changelog automatico. Con un progetto ricco come questo (>30 feature) è molto apprezzato.
- **[PROCESSO] GitHub Projects / Issues per ogni feature**: aprire una Issue per ogni checkbox della lista feature è già una dimostrazione di workflow strutturato, e offre materiale concreto da discutere in sede di esame SPE.
- **[PROCESSO] Branch per feature/bounded-context**: una branch per ogni bounded context principale, con PR e review obbligatoria prima del merge.

---

### 1.3 CI/CD (Continuous Integration + Continuous Delivery) ⚠️ mancante nelle feature, da aggiungere come infrastruttura

**Stato attuale**: nessuna feature lo cita esplicitamente. Il progetto ha però molte logiche testabili (turni, carte, invarianti di partita).

**Feature/pratiche suggerite**:

- **[INFRA] Pipeline GitHub Actions** con stage: lint → test unitari → test integrazione → build Docker → push immagini su registry.
- **[FEATURE TESTABILE] Unit test per il motore di gioco**: la logica dei turni, delle carte (no, attacco, favore ecc.) e degli invarianti di partita (minimo giocatori, gestione bomba) è logica pura facilmente testabile — aggiungere una suite di test esplicita. Questo è uno degli esempi più forti di "progetto testabile" che si possono portare all'esame.
- **[FEATURE TESTABILE] Test E2E per flussi critici**: login → creazione partita → join → inizio partita — verificabile con Playwright o Cypress.
- **[INFRA] Quality gate**: SonarCloud o Codecov integrato nella pipeline, con badge nel README.

---

### 1.4 Automazione deploy (Docker / Kubernetes) ⚠️ mancante nelle feature, necessario

**Stato attuale**: non citato nelle feature. È un requisito obbligatorio di SPE.

**Feature/pratiche suggerite**:

- **[INFRA] Docker Compose** con i container: client Vue (servito da nginx), server Node/Express, eventuale secondo servizio Kotlin, MongoDB (+ replica set per DS), RabbitMQ o Redis (per pub-sub e real-time).
- **[INFRA - BONUS] Kubernetes con Deployment + HPA**: data la natura del gioco (picchi di utenti in certi momenti), un HPA (Horizontal Pod Autoscaler) sul server di gioco è un esempio contestualmente motivato di scalabilità automatica.

---

### 1.5 Almeno 2 piattaforme target ⚠️ parzialmente soddisfatto

**Stato attuale**: il progetto usa Node.js (TypeScript) per il server. Il client Vue gira nel browser (non conta come piattaforma diversa da Node). Serve una seconda piattaforma.

**Feature suggerite che introducono naturalmente una seconda piattaforma**:

- **[FEATURE] Servizio di notifiche/analytics in Kotlin/JVM**: un microservizio separato in Kotlin (Ktor o Spring Boot) che gestisce le statistiche di partita, l'elaborazione asincrona degli eventi di fine partita, e i report admin. Runtime JVM = piattaforma diversa da Node.js. ✅ Copre anche il requisito DS di avere più nodi distribuiti.
- **[ALTERNATIVA] Bot/AI avversario in Python**: un servizio Python che implementa un giocatore automatico (bot) per permettere partite single-player o per riempire stanze con pochi giocatori. Runtime Python = piattaforma diversa. ✅ Anche questa è una feature "WOW" per l'utente finale.
- **[ALTERNATIVA] CLI client in Kotlin Native / Go**: un client a riga di comando che permette di giocare senza browser. Runtime diverso, runtime nativo. ✅ Più "accademico" ma valido.

---

## 2. Applicazioni e Servizi Web

### 2.1 Architettura web-based client + server ✅ soddisfatto

**Stato attuale**: il progetto è esplicitamente una web app con client Vue e server backend.

**Note**: assicurarsi che la relazione descriva esplicitamente l'architettura client-server (SPA Vue + REST API Express + WebSocket per la partita).

---

### 2.2 Database documentale (MongoDB) ✅ naturalmente soddisfatto

**Stato attuale**: mazzi personalizzati, carte, utenti, statistiche, partite — tutti dati con struttura variabile e nidificata, perfetti per un documento MongoDB.

**Esempi di modellazione MongoDB ben motivata da citare in relazione**:
- `Deck` embeds `Card[]` (embedding — letto sempre insieme).
- `Game` references `User[]` (referencing — gli utenti esistono indipendentemente).
- `GameEvent[]` come array di sotto-documenti embedded in `Game` (log della partita).

---

### 2.3 Docker / Docker Compose ⚠️ mancante, vedi SPE 1.4

Vedi sezione SPE 1.4 — la stessa infrastruttura Docker copre entrambi i requisiti.

---

### 2.4 Fase di Design HCI (personas, scenari, mockup) ⚠️ non citata nelle feature

**Stato attuale**: le feature elencano le funzionalità ma non descrivono il processo di design.

**Feature/attività suggerite**:

- **[PROCESSO HCI] Personas**: almeno 3 tipi di utente emergono naturalmente dal progetto: il *giocatore casual* (usa guest login, partite veloci), il *giocatore competitivo* (deckbuilding avanzato, statistiche, amicizie) e l'*admin del sistema*. Documentarle come personas HCI è immediato.
- **[PROCESSO HCI] Scenari d'uso narrativi**: "Mario apre l'app, vede la lista partite pubbliche, ne sceglie una con 3 giocatori, aspetta che il master inizi, gioca il suo turno usando una carta No per bloccare un Attacco...". Scrivere 2-3 scenari così prima di costruire i mockup.
- **[PROCESSO HCI] Mockup Figma/Balsamiq**: wireframe delle schermate principali (login, lobby list, pre-lobby, tavolo di gioco, deckbuilder). Il tavolo di gioco in particolare è una schermata HCI complessa che merita attenzione.

---

### 2.5 Test con utenti (SUS/UEQ) ⚠️ non citato nelle feature

**Stato attuale**: non presente. È obbligatorio.

**Feature/attività suggerite**:

- **[PROCESSO] Usability Test sul client**: far giocare 5+ persone a una sessione completa (login → lobby → partita → fine) registrando i problemi riscontrati. Il gioco ha meccaniche complesse (carte panda, no, attacchi multipli) che si prestano a rivelare problemi di usability reali e interessanti da discutere in relazione.
- **[PROCESSO] SUS + UEQ**: somministrare entrambi i questionari dopo il playtest — il confronto tra i punteggi delle due scale (SUS misura usabilità percepita, UEQ misura l'esperienza complessiva inclusi stimulation e novelty) è particolarmente ricco per un gioco.
- **[FEATURE] Tutorial interattivo in-game**: una feature che migliora l'usabilità percepita (abbassa la curva di apprendimento) e che si presta a essere testata esplicitamente in sede di usability test ("gli utenti riescono a capire come giocare senza leggere le regole?"). Già in parte presente come help-page, ma un tutorial interattivo è molto più efficace.

---

### 2.6 TypeScript (facoltativo, punteggio extra) ✅ da assumere come scelta

TypeScript è la scelta naturale per un progetto Vue 3 + Node moderno. Da dichiarare esplicitamente nelle scelte tecnologiche e da usare in modo rigoroso (`strict: true`).

---

### 2.7 SCSS / Flexbox / Layout responsive (facoltativo) ⚠️ non citato

**Feature suggerite**:

- **[FEATURE] Responsive design del tavolo di gioco**: il tavolo di gioco (mano del giocatore, mazzo, carte degli avversari) è una sfida di layout non banale — usare Flexbox/Grid con layout che si adatta a 2-6 giocatori e a schermi diversi è un ottimo esempio concreto da citare.
- **[FEATURE] Design system / tema personalizzabile**: palette colori panda (bianco/nero con accenti), dark mode, animazioni CSS per le carte. Più che una feature funzionale, è una scelta di design che si discute in relazione.

---

### 2.8 Web Sustainability Guidelines (facoltativo) ⚠️ non citato

**Feature suggerite**:

- **[FEATURE] Lazy loading immagini delle carte**: le immagini delle carte (panda con effetti diversi) sono probabilmente molte — lazy loading riduce il consumo energetico percepito all'avvio.
- **[FEATURE] Code splitting per route**: la route del deckbuilder, quella del gioco, quella delle statistiche — caricarle on-demand con Vue Router.

---

## 3. Distributed Systems (Modulo 1 + Modulo 2)

### 3.1 Comunicazione real-time (socket programming) ✅ fortemente presente

**Stato attuale**: la partita richiede comunicazione in tempo reale per turni, carte giocate, reazioni emoji, timer, eliminazione giocatori. È il cuore del sistema distribuito.

**Come renderlo esplicito per l'esame**:
- Usare **Socket.IO** (citato esplicitamente nel materiale del corso Web) o WebSocket nativi. La scelta va motivata nella relazione (UDP sarebbe troppo inaffidabile per un gioco di carte con stato — TCP/WebSocket è la scelta giusta, da argomentare).
- Documentare esplicitamente il **protocollo di messaggi** (ogni tipo di evento di gioco come messaggio strutturato) con un sequence diagram.

**Feature che rendono visibile la complessità distribuita**:
- Il timer del turno deve scadere lato server (non lato client) per evitare cheating — classico esempio di logica distribuita da discutere.
- La gestione del "cosa succede se un giocatore si disconnette durante il suo turno" è un caso di fault esplicito da trattare.

---

### 3.2 Modelli di consistenza e CAP Theorem ⚠️ presente implicitamente, da rendere esplicito

**Stato attuale**: lo stato della partita (mano di ogni giocatore, ordine del mazzo, turno corrente) deve essere consistente tra tutti i partecipanti — è un requisito di consistenza forte implicito nel gioco.

**Feature suggerite che rendono visibile il trade-off CAP**:

- **[FEATURE] Server autoritativo per lo stato di gioco**: un singolo nodo server mantiene lo stato canonico della partita (partition-tolerant + consistent, sacrificando un po' di availability in caso di crash del server). Questo è una scelta CP da motivare esplicitamente nella relazione.
- **[FEATURE - AVANZATA] Esperimento di partizione**: con Toxiproxy o Docker network disconnect, documentare cosa succede allo stato della partita se il server si disconnette a metà. Si può mostrare che il gioco "congela" (consistent ma non available) — ottimo esempio pratico per la discussione DS.
- **[FEATURE] Reconnect con state sync**: quando un giocatore si riconnette, il server gli invia lo stato completo della partita (mano attuale, carte nel mazzo, turno corrente). È un meccanismo di recovery esplicito da descrivere con un sequence diagram.

---

### 3.3 Replicazione (MongoDB replica set) ⚠️ non citato, aggiungibile con poco sforzo

**Stato attuale**: il progetto usa MongoDB ma non menziona replica set.

**Feature suggerite**:

- **[INFRA] MongoDB in replica set** (anche solo 3 nodi in Docker Compose): trasforma il database "richiesto da Applicazioni Web" in un esempio pratico di replicazione con eventual consistency, discutibile per M3 (modelli di consistenza) e CAP (C1). Costo: aggiungere due container nel Compose, nessuna modifica al codice applicativo.

---

### 3.4 Pattern di interazione (request-response, pub-sub) ✅ entrambi presenti

**Stato attuale**: il progetto usa naturalmente entrambi i pattern.
- **Request-Response**: login, registrazione, creazione stanza, deckbuilding (tutte le operazioni REST).
- **Publish-Subscribe**: eventi di partita (carta giocata, turno cambiato, giocatore eliminato, reazione emoji) — il server pubblica eventi a tutti i client nella stanza.

**Come renderlo esplicito**: separare chiaramente nella relazione e nel codice le "API REST" (request-response) dagli "eventi WebSocket" (pub-sub), con un elenco di tutti i tipi di evento e il loro schema.

---

### 3.5 Più nodi distribuiti / infrastruttura ⚠️ parziale (solo un server Node al momento)

**Stato attuale**: con solo un server Node, il sistema è centralizzato — valido come scelta ma da motivare esplicitamente come architettura con i trade-off analizzati.

**Feature suggerite** (vedi anche SPE 1.5):

- **[FEATURE] Servizio di statistiche/analytics separato (Kotlin/JVM)**: riceve eventi di fine partita tramite un message broker (RabbitMQ/Kafka), li elabora in modo asincrono e alimenta la dashboard admin con statistiche in tempo reale. Introduce il secondo nodo distribuito richiesto da SPE e permette di discutere il pattern pub-sub con broker per DS.
- **[FEATURE] Dashboard admin real-time** (già presente nella lista feature!): l'overview delle partite in corso e delle statistiche in tempo reale è un ottimo esempio di **Publish-Subscribe con broker** — il server di gioco pubblica eventi su RabbitMQ, il servizio di analytics li consuma e li aggrega, la dashboard admin li visualizza via WebSocket.

---

### 3.6 Feature di design DS (heartbeat, failover, auth, partitioning) ⚠️ parziale

| Feature di design DS | Stato nel progetto | Suggerimento |
|---|---|---|
| Heartbeat/timeout/retry | ⚠️ Il timer del turno è simile, ma non è un heartbeat di sistema | **[FEATURE]** Heartbeat tra client e server per rilevare disconnessioni silenziose (giocatore che chiude il browser senza fare leave) — trigger per la gestione "master lascia → nuovo master" |
| Authentication/Authorization | ✅ Sistema login/OTP già presente | Usare JWT stateless (discussione DS: autenticazione in sistemi distribuiti) |
| Failover | ❌ Non citato | **[FEATURE]** Gestione graceful shutdown del server (partita in corso: pausa automatica + notifica ai giocatori, tentativo di recovery) |
| Redundancy | ❌ Non citato | **[INFRA]** Almeno MongoDB in replica set come esempio di redundancy dati |
| Checkpoint/rollback | ⚠️ Implicito nella reconnect con state sync | **[FEATURE]** Snapshot periodico dello stato della partita su DB (ogni N turni) per consentire recovery in caso di crash del server — classico checkpointing applicativo |
| Data partitioning | ❌ Non necessario a questa scala, ma citabile | Discutere il partizionamento potenziale (es. partite per shard geografico) come scelta di design futura, anche senza implementazione |
| Circuit Breaker | ❌ Non citato | **[INFRA]** Se presente il secondo servizio Kotlin, inserire un circuit breaker tra il server Node e il servizio analytics |

---

### 3.7 Tempo logico / ordinamento eventi ⚠️ presente implicitamente, da rendere esplicito

**Stato attuale**: l'ordine degli eventi di gioco (carta giocata, risposta No, risoluzione) è fondamentale per la correttezza del gioco — è un problema di ordinamento causale tipico dei sistemi distribuiti.

**Feature suggerita**:

- **[FEATURE] Timestamp logico sugli eventi di gioco**: ogni evento di gioco (carta giocata, No usato, turno cambiato) porta un timestamp logico incrementale (Lamport clock lato server). Oltre ad essere utile per il log della partita, è un esempio concreto di tempo logico da discutere per M6/C5 di DS.
- **[FEATURE] Log della partita (replay)**: registrare tutti gli eventi di gioco in ordine (con timestamp logico) permette di rivedere la partita a fine gioco — feature WOW per l'utente e dimostrazione pratica del logging degli eventi distribuiti per DS.

---

### 3.8 Consenso e Join/Leave dinamico ✅ già presente (da argomentare)

**Stato attuale**: la gestione del master che lascia → elezione del nuovo master è già nella lista feature. È esattamente un problema di Leader Election / consenso informale tra i partecipanti.

**Come renderlo esplicito per DS**:
- Documentare il protocollo di elezione del nuovo master (random tra i rimasti? primo arrivato? votazione?) come scelta di design con trade-off.
- Collegarlo esplicitamente al **Leader Election Pattern** e al problema del Join/Leave dinamico visto nel Modulo 2.

---

### 3.9 Workflow SE esteso per DS e documentazione ⚠️ non citato nelle feature, da aggiungere come deliverable

**Deliverable suggeriti**:

- **[DOC] Sequence diagram per i flussi principali**: join alla partita, turno di gioco (incluso il caso No), gestione disconnessione, fine partita. Da realizzare con PlantUML o Mermaid e includere nel report.
- **[DOC] Message flow graph per gli eventi WebSocket**: lista di tutti i tipi di messaggio con mittente/destinatari.
- **[DOC] Confronto tra le alternative architetturali**: es. "abbiamo scelto un server autoritativo centralizzato invece di un'architettura P2P peer-to-peer perché..." — questo è il tipo di trade-off analysis esplicitamente richiesto dal Modulo 2.
- **[DOC] ADR per ogni scelta architetturale rilevante**: JWT vs session, WebSocket vs polling, MongoDB replica set vs single, Node vs Kotlin per il secondo servizio.

---

## 4. Feature aggiuntive suggerite per migliorare il progetto

Queste feature non colmano requisiti mancanti ma arricchiscono il progetto in modo coerente con il tema, migliorano l'esperienza utente e aggiungono spunti interessanti per le discussioni d'esame.

| Feature | Descrizione | Valore aggiunto |
|---|---|---|
| **Bot/AI avversario** | Giocatore automatico basato su logica semplice (regole) o ML, attivabile quando la stanza ha pochi giocatori | Seconda piattaforma SPE (Python), feature WOW, testabile in UX test |
| **Replay della partita** | Registrazione di tutti gli eventi con timestamp logico e possibilità di rivederli step-by-step | Feature WOW, dimostrazione pratica di event log ordinato (DS M6) |
| **Spettatori** | Utenti che possono guardare una partita in corso in sola lettura | Push notifications DS, interessante caso edge per il pub-sub |
| **Tornei** | Sistema di eliminazione diretta tra partite multiple | Bounded context aggiuntivo ricco, bello per DDD |
| **Achievements/badge** | Sistema di achievement sbloccabili (es. "sopravvissuto a 5 bombe") | Motiva le statistiche, gamification, evento di dominio naturale |
| **Card marketplace** (light) | Possibilità di condividere mazzi personalizzati con la community | Estensione naturale del deckbuilder, feature sociale |
| **Animazioni carte** | Animazioni CSS/canvas per il gioco delle carte (es. la carta vola dalla mano al tavolo) | Effetto WOW, discutibile per la componente UX del corso Web |
| **Suoni e feedback audio** | Effetti sonori per le azioni di gioco (bomba, No, vittoria) | Usability (feedback percettivo) + WOW |
| **Localizzazione (i18n)** | Supporto italiano/inglese con vue-i18n | Accessibilità, buona pratica, nominabile in relazione Web |
| **PWA (Progressive Web App)** | Installabile su mobile, funzionamento offline per le schermate non real-time | Accessibilità, Web Sustainability (riduce richieste server) |

---

## 5. Tabella riepilogativa per corso

### 5.1 Software Process Engineering

| Requisito SPE | Tipo | Feature che lo soddisfano | Stato |
|---|---|---|---|
| Domain-Driven Design (bounded context, aggregate, value object, domain event) | Obbligatorio | Struttura a moduli (identity, lobby, game, catalog, deckbuilding); Domain Events GameEnded → stats | ⚠️ Da rendere esplicito nel codice |
| Processo di sviluppo chiaro (workflow Git, DevOps) | Obbligatorio | Conventional Commits + GitHub Issues per feature; branch per bounded context; PR obbligatorie | ⚠️ Da aggiungere come pratica |
| Continuous Integration | Obbligatorio | GitHub Actions: lint → unit test motore di gioco → test E2E → build Docker | ❌ Da aggiungere come infrastruttura |
| Continuous Delivery | Obbligatorio | GitHub Actions: push immagini Docker su registry; deploy automatico | ❌ Da aggiungere come infrastruttura |
| Containerizzazione / orchestrazione | Obbligatorio | Docker Compose: Vue/nginx + Express + MongoDB RS + RabbitMQ + servizio Kotlin | ❌ Da aggiungere come infrastruttura |
| ≥2 piattaforme target (runtime diversi) | Obbligatorio | Node.js (TypeScript) + JVM (Kotlin) per servizio analytics/statistiche — oppure Python per bot | ⚠️ Da aggiungere come feature |
| Versionamento automatico (semantic-release + Conventional Commits) | Facoltativo | Conventional Commits su tutti i commit; semantic-release in CI | ❌ Da aggiungere |
| Quality gate (SonarCloud, JaCoCo, coverage) | Facoltativo | SonarCloud in pipeline CI; Vitest/Jest coverage lato Node; JaCoCo lato Kotlin | ❌ Da aggiungere |
| Pipeline multi-OS/multi-JDK (matrix build) | Facoltativo | GitHub Actions matrix: Node 18/20 × Ubuntu/macOS | ❌ Da aggiungere |
| DSL interno / Kotlin per logica dominio | Facoltativo | DSL Kotlin per definizione carte (trailing lambda per descrivere effetti di carte personalizzate) | 💡 Idea avanzata |
| Kubernetes con HPA | Facoltativo | K8s Deployment + HPA per server di gioco (picchi di utenti) | 💡 Idea avanzata |
| CII Best Practices Badge | Facoltativo | Auto-certificazione su bestpractices.coreinfrastructure.org | ❌ Da aggiungere |
| Architettura esagonale (moduli Gradle separati) | Facoltativo | Sotto-progetti Gradle: `:domain`, `:game-engine`, `:api`, `:persistence` | 💡 Idea avanzata |

---

### 5.2 Applicazioni e Servizi Web

| Requisito Web | Tipo | Feature che lo soddisfano | Stato |
|---|---|---|---|
| Architettura client + server | Obbligatorio | Client Vue 3 SPA + server Express/NestJS | ✅ Soddisfatto |
| Database documentale (MongoDB) | Obbligatorio | Mazzi, carte, utenti, partite, statistiche su MongoDB | ✅ Soddisfatto |
| Stack MEVN (Node/Express + Vue) | Obbligatorio | Vue 3 + Express/NestJS + MongoDB | ✅ Soddisfatto |
| Docker/Docker Compose | Fortemente consigliato | Vedi SPE containerizzazione | ⚠️ Da aggiungere |
| Gruppo 2-3 persone, repo Git, relazione LaTeX | Obbligatorio | — (organizzativo) | ⚠️ Da pianificare |
| Fase di design HCI (personas, scenari, mockup) | Obbligatorio | Personas (casual/competitivo/admin); scenari d'uso; mockup Figma del tavolo di gioco | ⚠️ Non nelle feature, da aggiungere come deliverable |
| Test con utenti (Usability Test + SUS o UEQ) | Obbligatorio | Playtest con 5+ persone; SUS + UEQ; analisi problemi riscontrati | ⚠️ Non nelle feature, da pianificare |
| Tipologie utenti (admin + utente) | Obbligatorio | ✅ Admin (gestione mazzi/carte/utenti/overview) + Utente (gioco/deckbuilding) + Guest | ✅ Soddisfatto |
| TypeScript invece di JavaScript | Facoltativo | TypeScript strict su client e server | ✅ Da assumere come scelta |
| SCSS/SASS | Facoltativo | SCSS per il design system del gioco | ⚠️ Da decidere |
| Flexbox/Grid per layout responsive | Facoltativo | Tavolo di gioco responsive 2-6 giocatori | ⚠️ Da citare esplicitamente |
| Più metodologie HCI (Focus Group + Usability Test) | Facoltativo | Focus Group in fase di design + Cognitive Walkthrough + Usability Test finale | ⚠️ Da pianificare |
| SUS + UEQ (entrambi) | Facoltativo | Somministrare entrambi i questionari dopo playtest | ⚠️ Da pianificare |
| Web Sustainability Guidelines | Facoltativo | Lazy loading immagini carte; code splitting Vue Router; misurazione Ecograder | ⚠️ Da aggiungere |
| Deploy reale | Facoltativo | Deploy su VPS/PaaS (Railway, Render, Fly.io) | 💡 Idea aggiuntiva |
| Funzionalità avanzate (auth, validazione) | Facoltativo | Login con OTP ✅; validazione form registrazione ✅; gestione errori rete ⚠️ | ⚠️ Parziale |
| Tutorial interattivo in-game | Suggerito | Tutorial passo-passo per nuovi giocatori (migliora usabilità e test utenti) | 💡 Idea aggiuntiva |

---

### 5.3 Distributed Systems

| Requisito DS | Tipo | Feature che lo soddisfano | Stato |
|---|---|---|---|
| Comunicazione real-time (socket programming) | Obbligatorio | WebSocket/Socket.IO per tutti gli eventi di partita (turni, carte, emoji, timer, eliminazione) | ✅ Presente implicitamente, da implementare esplicitamente |
| Pattern di interazione (request-response + pub-sub) | Obbligatorio | REST per operazioni CRUD (request-response) + WebSocket per eventi partita (pub-sub) | ✅ Entrambi presenti |
| Infrastruttura distribuita (scelta motivata tra alternative) | Obbligatorio | Server autoritativo centralizzato (scelta CP del CAP) — documentare trade-off vs P2P e brokered | ⚠️ Scelta presente, da documentare |
| Almeno 2 nodi distribuiti con comunicazione | Obbligatorio | Server Node + servizio Kotlin (analytics/statistiche) collegati via RabbitMQ | ⚠️ Da aggiungere come feature |
| Nomenclatura infrastrutturale (client, server, broker, ecc.) | Obbligatorio | Documento architetturale con componenti nominati esplicitamente | ⚠️ Da aggiungere come deliverable |
| Workflow SE esteso per DS (9 passi) | Obbligatorio | Documentazione di tutti i 9 passi nel report, modellata su Distributed Pong | ⚠️ Da aggiungere come deliverable |
| Sequence diagram / message flow graph | Obbligatorio (facoltativo per punteggio extra) | PlantUML/Mermaid per: join partita, turno di gioco, gestione No, disconnessione | ⚠️ Da aggiungere come deliverable |
| 8 feature di design (documentare cosa si implementa e cosa no) | Obbligatorio | Heartbeat: ✅ disconnessione silenziosa; Auth/JWT: ✅; Checkpoint: ⚠️ snapshot partita; Failover: ⚠️; Redundancy: ⚠️ MongoDB RS; Consenso: ⚠️ leader election master; Retry/backoff: ⚠️; Partitioning: discusso teoricamente | ⚠️ Parziale |
| Gestione Join/Leave dinamico | Obbligatorio | ✅ Master lascia → nuovo master (leader election informale); gestione giocatore eliminato mid-game | ✅ Presente |
| CAP theorem applicato (con esperimento) | Obbligatorio | Server autoritativo = scelta CP; Toxiproxy per esperimento di partizione; MongoDB RS per availability | ⚠️ Da aggiungere come esperimento |
| Modelli di consistenza (M3) | Obbligatorio | Stato partita: consistenza forte lato server (sequential consistency per l'ordine delle carte); MongoDB RS: eventual consistency per statistiche | ⚠️ Da rendere esplicito |
| Tempo logico / Lamport clock / vector clock (M6) | Obbligatorio | Timestamp logico sugli eventi di gioco (Lamport incrementale lato server); log replay della partita | ⚠️ Da aggiungere come feature |
| Consenso distribuito (FLP, Paxos) | Obbligatorio (da padroneggiare per discussione) | Leader election del master come esempio pratico; etcd/Consul per service discovery del secondo nodo | ⚠️ Da citare/argomentare |
| Definizioni DS, 8 fallacies, 5 goal (M0, M2) | Obbligatorio (discussione orale) | Nessuna feature implementativa necessaria — padronanza teorica da preparare | ⚠️ Studio teorico |
| Dependability (M1) | Obbligatorio (discussione orale) | Gestione disconnessione giocatore; snapshot partita; JWT per auth | ⚠️ Da collegare esplicitamente |
| Connessione MVC/separazione responsabilità (Mod. 2) | Obbligatorio (Mod. 2) | Model (stato partita), Controller (event handler WebSocket), View (client Vue) — pattern MVC distribuito | ⚠️ Da documentare esplicitamente |
| Mobilità del codice (C6) | Obbligatorio (discussione orale) | Nessuna feature implementativa richiesta — padronanza teorica | ⚠️ Studio teorico |
| Blockchain/Smart Contract (C4) | Obbligatorio (discussione orale) | Nessuna feature implementativa richiesta (a meno di voler aggiungere un sistema di reward in token) | ⚠️ Studio teorico |
| Confronto UDP vs TCP motivato | Facoltativo | Motivare la scelta WebSocket (TCP) per il gioco di carte: affidabilità > latenza | ⚠️ Da documentare |
| Esecuzione speculativa lato client | Facoltativo | Aggiornamento ottimistico dell'UI quando si gioca una carta (prima della conferma server) | 💡 Idea avanzata |
| Raft/etcd per consenso reale | Facoltativo | Service discovery del servizio Kotlin tramite Consul o etcd | 💡 Idea avanzata |
| ADR per ogni scelta architetturale | Facoltativo | ADR per: WebSocket vs polling, JWT vs session, MongoDB single vs RS, Node vs Kotlin | ⚠️ Da aggiungere come deliverable |

---

## 6. Tabella comparativa unificata (tutti i corsi)

> Legenda: ✅ soddisfatto dalle feature esistenti | ⚠️ parziale o da rendere esplicito | ❌ mancante, da aggiungere | 💡 idea avanzata opzionale

| Area / Feature di progetto | SPE | Web | DS |
|---|---|---|---|
| **Client Vue 3 SPA (TypeScript)** | ✅ piattaforma 1 | ✅ stack MEVN | ✅ nodo client |
| **Server Express/NestJS (Node.js)** | ✅ piattaforma 1 | ✅ stack MEVN | ✅ nodo server 1 |
| **MongoDB (anche in replica set)** | — | ✅ DB documentale | ⚠️ replicazione/CAP |
| **Sistema login + OTP + JWT** | — | ✅ funzionalità avanzata auth | ✅ feature di design auth |
| **Guest player (senza login)** | — | ✅ tipologia utente aggiuntiva | — |
| **Creazione stanza / impostazioni** | ⚠️ domain event | ✅ funzionalità core | ✅ pattern join |
| **Pre-lobby + lista giocatori real-time** | — | ✅ funzionalità MEVN | ✅ pub-sub WebSocket |
| **Master → nuovo master se lascia** | — | — | ✅ leader election / join-leave |
| **Partita pubblica / privata** | — | ✅ funzionalità utente | — |
| **Motore di gioco (turni, carte, bomba)** | ✅ logica testabile CI | ✅ core dell'app | ✅ stato distribuito consistente |
| **Timer turno lato server** | ✅ testabile in CI | ✅ UX | ✅ logica autoritativa server |
| **Carte speciali (no, attacco, favore…)** | ✅ logica testabile | ✅ core | ✅ eventi distribuiti ordinati |
| **Reazioni emoji (push)** | — | ✅ funzionalità sociale | ✅ server-push / pub-sub |
| **Gestione disconnessione mid-game** | ✅ testabile | ⚠️ UX robustezza | ✅ fault handling / heartbeat |
| **Reconnect con state sync** | — | ⚠️ UX | ✅ checkpoint / recovery |
| **Deckbuilding personalizzato** | ⚠️ bounded context | ✅ funzionalità core | — |
| **Amicizie + inviti** | — | ✅ funzionalità sociale | — |
| **Statistiche utente** | — | ✅ funzionalità utente | — |
| **Help-page + regole** | — | ✅ usabilità | — |
| **Admin: mazzi/carte default** | ⚠️ bounded context separato | ✅ tipologia admin | — |
| **Admin: gestione utenti (ban)** | — | ✅ tipologia admin | — |
| **Admin: overview partite real-time** | — | ✅ funzionalità admin | ✅ pub-sub broker (RabbitMQ) |
| **Admin: monitoraggio salute servizi** | ✅ health check | ✅ funzionalità admin | ✅ heartbeat / feature di design |
| **[DA AGGIUNGERE] Servizio Kotlin analytics** | ✅ piattaforma 2 | — | ✅ nodo server 2 / pub-sub |
| **[DA AGGIUNGERE] Docker Compose / K8s** | ✅ obbligatorio | ✅ consigliato | ✅ infrastruttura distribuita |
| **[DA AGGIUNGERE] GitHub Actions CI/CD** | ✅ obbligatorio | — | ✅ workflow SE-DS |
| **[DA AGGIUNGERE] Unit test motore di gioco** | ✅ CI | ✅ robustezza | — |
| **[DA AGGIUNGERE] Timestamp Lamport sugli eventi** | — | — | ✅ tempo logico M6 |
| **[DA AGGIUNGERE] Snapshot stato partita (checkpoint)** | — | — | ✅ checkpointing C2 |
| **[DA AGGIUNGERE] Esperimento partizione (Toxiproxy)** | 💡 test CI | — | ✅ CAP theorem C1 |
| **[DA AGGIUNGERE] Personas + scenari + mockup** | — | ✅ obbligatorio HCI | — |
| **[DA AGGIUNGERE] Usability test + SUS + UEQ** | — | ✅ obbligatorio | — |
| **[DA AGGIUNGERE] Conventional Commits + semantic-release** | ✅ facoltativo | — | — |
| **[DA AGGIUNGERE] Tutorial interattivo in-game** | — | ✅ usabilità (bonus) | — |
| **[DA AGGIUNGERE] Sequence diagram flussi chiave** | — | — | ✅ obbligatorio Mod. 2 |
| **[DA AGGIUNGERE] ADR per scelte architetturali** | ✅ facoltativo | — | ✅ facoltativo |
| **[DA AGGIUNGERE] Log/replay partita** | ✅ testabile | ✅ feature WOW | ✅ event log ordinato DS |
| **[IDEA] Bot/AI avversario (Python)** | 💡 piattaforma 2 alternativa | 💡 WOW | 💡 nodo distribuito aggiuntivo |
| **[IDEA] Spettatori** | — | 💡 WOW | 💡 pub-sub avanzato |
| **[IDEA] Tornei** | 💡 bounded context | 💡 feature avanzata | — |
| **[IDEA] Lazy loading + code splitting** | — | 💡 sustainability | — |
| **[IDEA] PWA** | — | 💡 accessibilità | — |
| **[IDEA] Animazioni carte / suoni** | — | 💡 effetto WOW | — |
| **[IDEA] Achievements / badge** | 💡 domain event | 💡 engagement | — |
