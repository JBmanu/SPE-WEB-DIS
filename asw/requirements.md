# Requisiti d'Esame e Idee di Progetto — Applicazioni e Servizi Web

> Corso: Applicazioni e Servizi Web (magistrale) — Prof.ssa Silvia Mirri, A.A. 2025/26
> Documento basato sull'intero corso (Introduzione, Blocchi A/B/C/D).

---

## 1. Come funziona la valutazione

L'esame è composto da due parti, con pesi molto diversi:

- **Progetto/elaborato**: fino a **27/30**. È la componente dominante del voto.
- **Prova orale**: aggiunge o toglie **fino a 5 punti** rispetto al punteggio dell'elaborato (demo + discussione delle scelte + domande di teoria su tutto il programma).

Questo significa che la qualità, completezza e cura del progetto contano più di ogni altra cosa: vale la pena investire tempo extra lì piuttosto che cercare di "recuperare" tutto all'orale.

---

## 2. Requisiti OBBLIGATORI del progetto

Questi sono i vincoli esplicitamente dichiarati nelle slide di Introduzione al corso. Senza questi elementi il progetto non è conforme alle richieste minime.

### 2.1 Requisiti di gruppo e consegna
- [ ] Gruppo di **2 o 3 persone** (non individuale, non più di 3)
- [ ] Repository **GitHub o BitBucket** condiviso con docente/tutor
- [ ] Consegna **almeno 1 settimana prima** della prova orale
- [ ] **Relazione in LaTeX** allegata (template fornito a lezione/laboratorio)
- [ ] Tema dell'elaborato **concordato con docente e tutor** (oppure proposto autonomamente e poi approvato — vedi sezione 4)

### 2.2 Requisiti architetturali e tecnici
- [ ] Applicazione **web-based** con architettura **client + server**
- [ ] **Database documentale** (coerente con lo stack MEAN/MEVN visto a lezione → MongoDB)
- [ ] Stack tecnologico coerente con quanto visto in laboratorio: **Node.js + Express** lato server, **Vue.js** lato client (variante MEVN), oppure motivare esplicitamente scelte alternative
- [ ] Containerizzazione con **Docker / Docker Compose** (fortemente suggerita dal Seminario 5 — non dichiarata esplicitamente come "obbligatoria" nelle slide di Introduzione, ma trattata come lo standard de facto per consegna e valutazione del progetto: vedi nota sotto)

> **Nota importante sul Docker**: il seminario del Prof. Ghini (Blocco D, Seminario 5) descrive nel dettaglio come strutturare, costruire e **consegnare** il progetto usando container Docker (incluse istruzioni su come pacchettizzare le immagini per non costringere i docenti a rifare il build). Anche se le slide di Introduzione non lo rendono esplicitamente un requisito formale, il livello di dettaglio operativo dedicato a questo argomento suggerisce che sia un'aspettativa fortemente raccomandata per la consegna. Da confermare comunque con docente/tutor in fase di definizione del tema.

### 2.3 Fasi obbligatorie di sviluppo
Il progetto deve esplicitamente prevedere e documentare tre fasi (vedi sezione Introduzione al Corso):
- [ ] **Design** — applicazione di metodologie HCI viste nel Blocco C (es. definizione di personas, scenari d'uso, eventualmente storyboard/mockup)
- [ ] **Implementazione** — sviluppo dell'applicazione vera e propria
- [ ] **Test con utenti** — applicazione di almeno una metodologia di valutazione vista nel Blocco C (es. Usability Test, Cognitive Walkthrough, questionario SUS o UEQ)

### 2.4 Contenuti minimi della relazione (dedotti dalla struttura del corso)
Anche se le slide di Introduzione non danno un indice dettagliato della relazione, dalla struttura dell'esame si possono dedurre sezioni ragionevolmente attese:
- [ ] Descrizione del problema/dominio applicativo e dei requisiti
- [ ] Scelte architetturali (stack tecnologico, perché quella scelta)
- [ ] Processo di design (personas/scenari/mockup se applicati)
- [ ] Descrizione dell'implementazione (architettura client/server, modello dati documentale, componenti principali)
- [ ] Descrizione del test con utenti svolto e risultati (es. punteggio SUS, problemi di usabilità individuati)
- [ ] Istruzioni per il deploy/esecuzione (build e run via Docker Compose, se usato)

---

## 3. Requisiti/attività FACOLTATIVE per punteggio extra

Queste non sono esplicitamente etichettate come "bonus" nelle slide, ma rappresentano contenuti del corso che vanno oltre il minimo indispensabile e che, se applicati con cura nel progetto o approfonditi all'orale, possono presumibilmente contribuire positivamente alla valutazione (in particolare alla componente +/-5 dell'orale, dove si discutono "le scelte di design e implementative"). Vanno comunque verificate con docente/tutor.

- [ ] **TypeScript** invece di JavaScript puro lato client/server (il corso lo tratta in dettaglio nel Blocco B; non è detto sia obbligatorio nello stack MEVN base)
- [ ] **SCSS/SASS** al posto di CSS puro per la fogli di stile (preprocessor visto nel Blocco C)
- [ ] Uso ragionato di **Flexbox** per un layout responsive ben strutturato
- [ ] Applicazione esplicita di **più di una** metodologia HCI (es. sia Focus Group in fase di design sia Usability Test in fase di valutazione, invece di una sola)
- [ ] Questionario **sia SUS sia UEQ** (invece di uno solo) per una valutazione più ricca della user experience
- [ ] Rispetto di alcune **Web Sustainability Guidelines** (Blocco D, Seminario 1) — es. lazy loading immagini, minimizzazione form, evitare dark pattern, mobile-first layout — con eventuale misurazione tramite Website Carbon Calculator o Ecograder
- [ ] Confronto critico tra framework alternativi (es. perché Vue e non Angular/React) argomentato nella relazione, sfruttando il confronto visto nel Blocco B
- [ ] Implementazione di funzionalità avanzate Express/Vue (es. autenticazione, validazione form, gestione errori robusta)
- [ ] Deploy reale dell'applicazione (non solo locale) — coerente con quanto mostrato nel seminario Ruby on Rails sul "Go live!" (PaaS o setup autonomo)
- [ ] Documentazione tecnica ben curata (API, modello dati) oltre alla relazione richiesta

---

## 4. Idee di progetto

Il tema del progetto va concordato con docente e tutor, ma le slide chiariscono esplicitamente che è possibile proporre idee originali, non solo scegliere tra le proposte del corso. Di seguito alcune idee coerenti con gli argomenti trattati nel corso, pensate per coprire bene i requisiti tecnici (client/server/DB documentale) e metodologici (design HCI + test utenti) richiesti.

### Idea 1 — Piattaforma "Web per la Sostenibilità" (ispirata al Seminario 1)
Applicazione che aiuta gli utenti a monitorare/ridurre il proprio impatto digitale o a orientarsi tra gli SDG. Esempi concreti:
- Un tracker personale di "carbon footprint digitale" (email inviate, ricerche, streaming) con dashboard e suggerimenti, ispirato ai dati visti nel Seminario 4 (Fullone)
- Una piattaforma che applica concretamente alcune Web Sustainability Guidelines (Seminario 1) e si autovaluta con Website Carbon Calculator/Ecograder, documentando il confronto prima/dopo nella relazione
- Un'applicazione che cataloga/filtra progetti AI4SDGs per SDG di interesse (ispirata direttamente al Think Tank citato nelle slide)

**Perché funziona bene**: tema esplicitamente suggerito dal docente nel seminario, dataset/contenuti relativamente facili da popolare in un DB documentale, buona occasione per applicare sia le guideline di sostenibilità sia metodologie HCI (capire cosa motiva davvero un utente a cambiare comportamento è un classico caso da User Centered Design).

### Idea 2 — Strumento collaborativo con design system "Vue + componenti riutilizzabili"
Una piccola applicazione gestionale (es. organizzazione eventi, gestione collezioni personali, bacheca condivisa) che metta in pratica a fondo i concetti del Blocco B: componenti Vue ben strutturati (props/eventi/slot), state management coerente, stile con SCSS/Flexbox.

**Perché funziona bene**: permette di mostrare padronanza tecnica approfondita dello stack MEVN, facile da estendere con funzionalità via via più ricche se si vuole puntare a punteggio extra.

### Idea 3 — Applicazione testata con metodologia HCI completa
Qualsiasi dominio applicativo (anche semplice) ma con un **processo di design e valutazione molto curato**: personas + scenario d'uso documentati, mockup (Balsamiq/Figma), almeno un giro di Cognitive Walkthrough prima dell'implementazione, e Usability Test + questionario SUS/UEQ alla fine, con confronto tra problemi previsti e problemi reali emersi.

**Perché funziona bene**: il corso dedica un intero blocco (C, Parte I-II) a queste metodologie — un progetto che le applica in modo rigoroso e ben documentato dimostra comprensione profonda di una parte sostanziale del programma, e offre molto materiale di discussione per l'orale.

### Idea 4 — Mini robottino/IoT companion app (ispirata al Seminario 2, più ambiziosa)
Se il gruppo ha interesse/competenze, un'applicazione web che fa da interfaccia di controllo/monitoraggio per un dispositivo robotico o IoT semplice, eventualmente sperimentando un'interfaccia a comandi in linguaggio naturale (anche solo testuale, senza dover replicare l'integrazione LLM vista nel paper).

**Perché funziona bene (con cautela)**: tema originale e stimolante, ma più rischioso in termini di tempo/complessità — i relatori del seminario hanno offerto disponibilità per progetti/tesi sul tema, quindi può valere la pena contattarli se si vuole approfondire seriamente questa direzione.

> **Avvertenza generale**: tutte queste idee vanno comunque proposte e validate da docente e tutor prima di iniziare lo sviluppo, come richiesto esplicitamente nelle slide di Introduzione al corso.

---

## 5. Checklist riassuntiva rapida

**Obbligatorio:**
- Gruppo 2-3 persone, repo Git, relazione LaTeX, consegna 1 settimana prima dell'orale
- Client + Server + DB documentale (stack coerente con MEVN: Node/Express + Vue + MongoDB)
- Fasi di design, implementazione, test con utenti chiaramente documentate
- Tema approvato da docente/tutor

**Fortemente raccomandato:**
- Containerizzazione Docker/Docker Compose per facilitare build e consegna

**Bonus possibili (da verificare comunque con i docenti):**
- TypeScript, SCSS, Flexbox ben curato
- Più metodologie HCI applicate (non solo una)
- Attenzione esplicita alle Web Sustainability Guidelines
- Deploy reale, funzionalità avanzate, documentazione tecnica curata

---

## Nota finale

Questo documento è stato costruito a partire dal materiale dell'intero corso, l'unico modulo previsto. Se comunicazioni successive del docente/tutor su Virtuale introducono requisiti aggiuntivi, vincoli più specifici sulla relazione, o una lista ufficiale di criteri di valutazione, questo file andrà aggiornato di conseguenza — in particolare la sezione 3 (facoltativo/bonus) è una deduzione ragionata dal contenuto del corso e **non** una lista ufficiale fornita dai docenti.
