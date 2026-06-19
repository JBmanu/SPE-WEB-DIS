# Indice Generale e Introduzione al Corso

> Corso: **Applicazioni e Servizi Web** (magistrale) — Prof.ssa Silvia Mirri, A.A. 2025/26
> Questo documento raccoglie l'indice di tutti i riassunti del corso e, in coda, i dettagli organizzativi tratti dalle slide di introduzione (contatti, orari, modalità d'esame, programma). Il corso è composto da un unico blocco di contenuti, articolato nei quattro blocchi tematici A, B, C, D più i seminari.

---

## Come usare questo indice

I file sono pensati per essere letti nell'ordine A → B → C → D, che rispecchia l'ordine con cui gli argomenti sono stati presentati a lezione. Alcuni concetti vengono introdotti in un blocco e ripresi/approfonditi in un altro (es. MVC nel blocco A e MVVM applicato a Vue nel blocco B); dove rilevante è segnalato un rimando incrociato. I dettagli organizzativi del corso (contatti, orari, modalità d'esame) sono raccolti nella sezione finale di questo stesso documento.

---

## Blocco A — Evoluzioni e Soluzioni Architetturali per il Web
**File**: `A-Soluzioni_architetturali__client_e_server.md`

Quattro blocchi di slide originali, riassunti in un unico documento:

1. **Evoluzioni e soluzioni architetturali per il Web**
   - Storia di browser (guerre dei browser) e server
   - Architetture WWW: sito statico → SSI → 3 livelli (embedded code / full application) → 4 livelli → rich client/AJAX
   - Framework server-side e client-side (CSS/JS)
   - Single-Page Application: motivazioni e vantaggi
   - Web Solution Stack: confronto **LAMP/WAMP vs MEAN**
2. **Browser e sue componenti**
   - 7 componenti del browser (UI, Browser Engine, Rendering Engine, Networking, JS Interpreter, UI Backend, Data Persistence)
   - Motori di rendering (WebKit, Blink, Gecko) e pipeline: parsing HTML → DOM tree → render tree → layout → painting
   - Motori JavaScript (V8, SpiderMonkey, JavaScriptCore) e compilazione JIT
3. **Server Web**
   - Funzionamento, hosting, path translation, statico/dinamico
   - Architetture concorrenti (multi-processing, multi-threaded, ibrido)
   - Overload: cause, sintomi, contromisure
4. **Pattern MVC per il Web**
   - MVC classico e origine storica (Reenskaugh & Goldberg, 1978)
   - MVC applicato al Web (pre-SPA e con SPA moderne)
   - Varianti: **MVVM**, MVP, **Flux**

> *Rimando*: il pattern MVVM qui introdotto a livello concettuale viene applicato concretamente a Vue.js nel Blocco B.

---

## Blocco B — Stack MEAN e sue varianti
**File**: `B-Stack_MEAN__e_sue_varianti_.md`

Cinque blocchi di slide originali:

1. **Stack MEAN** — da LAMP a MEAN, Node.js (event-driven vs thread-based, NPM), Express.js, MongoDB (cenni), signature stack aziendali (Uber, Reddit, Pinterest, Facebook, Airbnb)
2. **Single Page Application e Framework JS** — problemi delle app server-based tradizionali, storia di AngularJS/React/Vue.js, confronto dettagliato (ecosistema, curva di apprendimento, completezza, performance)
3. **VueJS approfondito** — pattern MVVM applicato a Vue, direttive, data-binding, computed properties, componenti (props/eventi/slot)
4. **TypeScript** — motivazioni, tipizzazione statica, classi, interfacce, moduli, compilazione
5. **Angular approfondito** — NgModules, Components, lifecycle hooks, data binding, direttive, Services/Dependency Injection, Forms, HTTP, Routing

> *Nota*: il corso approfondisce in laboratorio la variante **MEVN** (Vue al posto di Angular) — coerente con quanto mostrato anche nel Seminario 5 (Docker) del Blocco D.

---

## Blocco C — HCI e Superset per i Fogli di Stile
**File**: `C-HCI_e_superset_per_i_fogli_di_stile.md`

Quattro blocchi di slide originali, divisi in 4 parti tematiche:

**Parte I — HCI: Metodologie per il Design**
- Interfaccia vs Interazione, Norman's Door, HCI come disciplina interdisciplinare
- User Centered Design vs Participatory Design (co-design), Co-creation, Open Innovation
- Personas e scenari d'uso (buone/cattive personas)
- Storyboard, sketch, mockup (Balsamiq, Figma)
- Focus group, Experience Prototyping, Think Aloud Protocol, Co-discovery Learning

**Parte II — HCI: Evoluzione, Definizioni, Usabilità**
- Evoluzione terminologica: ergonomia → human factors → HCI → UX
- Definizioni di usabilità (ISO 9241-11 vs Nielsen)
- Responsive Design, Mobile First, KISS, Less is More
- **Le 10 euristiche di Nielsen** (decalogo completo)
- Cognitive Walkthrough, Usability Test
- Questionari: **UEQ** (6 categorie) e **SUS** (calcolo punteggio, soglia 68)
- Formula di Nielsen sul numero di utenti nei test (L=31%, 5 utenti → 85%, 20+ per significatività)

**Parte III — Superset per i Fogli di Stile: Sass/SCSS**
- Preprocessor/transpiler, differenza SASS vs SCSS
- Variabili, nesting, parent selector `&`, interpolazione `#{}`
- `@import`, `@media`, `@extend` vs placeholder `%`, mixin (`@mixin`/`@include`), funzioni

**Parte IV — Flexbox**
- Flex container vs flex item, proprietà del container (flex-direction, justify-content, align-items, flex-wrap, align-content) e dell'item (order, flex-grow, flex-shrink, align-self)

> *Rilevanza per il progetto*: questo blocco è il più direttamente collegato al requisito "test con utenti" del progetto d'esame (vedi sezione Introduzione al Corso, in fondo a questo documento) — utile applicare almeno una metodologia HCI (es. personas + scenario d'uso in design, SUS/UEQ in valutazione finale).

---

## Blocco D — Seminari
**File**: `D-seminari.md`

Cinque seminari distinti tenuti da relatori esterni o dal docente/tutor:

1. **Sustainable Web Development** — sostenibilità digitale, SDG, Sustainable Web Manifesto, le 94 Web Sustainability Guidelines (UX Design, Web Development, Hosting & Infrastructure, Business & Product Strategy), tool di misurazione (Website Carbon Calculator, Ecograder)
2. **Reimagining HRI: LLMs as Robotic Controllers** — paper di ricerca UniBo su LLM applicati alla robotica (zero-shot navigation, risultati ~22-26% di successo)
3. **Ruby on Rails: Hands-on Workshop** — framework alternativo HTML-First, utile confronto con lo stack MEAN/MEVN (JavaScript-First)
4. **State of the Art of Sustainability IT** — framework ESG applicato all'IT, metriche datacenter (PUE/WUE/RUE/CUE), GHG Protocol (Scope 1/2/3), i 6 principi del Green Software
5. **Docker e Docker Compose per progetti di ASW** — **seminario operativo chiave per il progetto**: applicazione di riferimento completa Node.js + Express + MongoDB containerizzata, con Dockerfile, docker-compose.yml e procedura completa di consegna del progetto

> *Rilevanza per il progetto*: il Seminario 5 è probabilmente il materiale più immediatamente riutilizzabile per l'implementazione tecnica dell'elaborato; il Seminario 1 offre uno spunto concreto di tema progettuale ("Web per la Sostenibilità" / AI4SDGs) nel caso si voglia proporre un'idea originale, come permesso dalle regole del corso (vedi sezione Introduzione al Corso, in fondo a questo documento).

---

## Mappa concettuale: dove trovare cosa

| Voglio ripassare... | Vai a |
|---|---|
| Come funziona un browser internamente (parsing, rendering, JS engine) | Blocco A, sez. 6 |
| Differenza tra le architetture web (statico, SSI, 3/4 livelli, AJAX) | Blocco A, sez. 3 |
| MVC, MVVM, Flux a livello di pattern generale | Blocco A, sez. 5 |
| Node.js: perché è event-driven e quando usarlo | Blocco B, sez. 2 |
| Confronto Angular vs React vs Vue | Blocco B, sez. 7 |
| Sintassi e direttive di Vue.js | Blocco B, sez. 8 |
| TypeScript: tipi, classi, interfacce | Blocco B, sez. 9 |
| Angular: moduli, componenti, DI, routing | Blocco B, sez. 10 |
| Personas, scenari, focus group, prototipazione | Blocco C, Parte I |
| Le 10 euristiche di Nielsen | Blocco C, Parte II, sez. 10 |
| Questionari SUS / UEQ e quanti utenti testare | Blocco C, Parte II, sez. 11-12 |
| Sintassi SCSS (variabili, mixin, nesting) | Blocco C, Parte III |
| Proprietà Flexbox | Blocco C, Parte IV |
| Sostenibilità del web / Green Software / metriche carbon | Blocco D, Seminari 1 e 4 |
| Comandi Docker/docker-compose per il progetto | Blocco D, Seminario 5 |
| Requisiti formali dell'esame e del progetto | Sezione Introduzione al Corso, qui sotto |

---

## Stato di avanzamento

Questo indice copre l'intero programma del corso (Introduzione + Blocchi A, B, C, D), che è composto da un unico modulo di contenuti.

Per la checklist completa dei requisiti d'esame (obbligatori e facoltativi) e per alcune proposte di tema progettuale, vedi il documento separato **Requisiti_Esame_e_Idee_Progetto.md**.

---
---

# Introduzione al Corso

> Riassunto da slide: *00 - Introduzione al Corso*

## 1. Informazioni generali e contatti

- **Docente**: Silvia Mirri — silvia.mirri@unibo.it
- **Tutor del corso**: Manuel Andruccioli — manuel.andruccioli@unibo.it

### Orario
- **Lezioni**: venerdì, ore 15:00–17:00 (aula 2.5)
- **Esercitazioni in laboratorio**: mercoledì, ore 14:30–17:30 (lab 4.2)

### Ricevimento
Mercoledì o venerdì, prima o dopo lezione, oppure su appuntamento.

### Calendario — giorni senza lezione
- Mercoledì 9 ottobre
- Venerdì 1 novembre

## 2. Materiale didattico

- Slide di lezioni ed esercitazioni disponibili su **Virtuale**: `https://virtuale.unibo.it/course/view.php?id=60254`
- Sulla piattaforma sono disponibili anche: sistemi di interazione (forum, messaggi), informazioni sulle caratteristiche degli elaborati.
- **Non esiste un libro di testo** che copra l'intera disciplina, data la rapida evoluzione della materia. Studio basato sulle slide; in fondo a ogni lezione sono presenti link a risorse aggiuntive di approfondimento (spesso in inglese).

### Conoscenze pregresse date per scontate
Markup, XML/JSON, DOM, HTML5 (incluse le API), CSS3, JavaScript/jQuery, PHP.

## 3. Modalità d'esame

L'esame si compone di **due parti**:

### A) Progetto (elaborato)
- Realizzazione di un'applicazione web-based **in gruppo (2-3 persone)**.
- Va consegnato condividendo un **repository** (GitHub o BitBucket), **almeno 1 settimana prima** della prova orale.
- La consegna deve essere accompagnata da una **relazione in LaTeX** (template fornito durante le esercitazioni).
- **Punteggio massimo per l'elaborato: 27/30**.

### B) Prova orale
- Presentazione di una **demo** dell'elaborato e discussione delle scelte di design e implementative.
- Domande di **teoria** su tutti gli argomenti delle lezioni ed esercitazioni del corso.
- Punteggio: **+/- 5 punti** a partire dal punteggio dell'elaborato.

### Requisiti del progetto/elaborato
Realizzare il progetto di un'applicazione **web-based** che includa **client e server, con DB documentale**, prevedendo le seguenti fasi:
- **Design**
- **Implementazione**
- **Test (con utenti)**

Basato su concetti/metodologie viste a lezione e tecnologie usate in laboratorio. Il **tema** dell'elaborato (specifiche, funzionalità, metodologie) sarà **concordato con docente e tutor** — durante il corso verranno segnalate alcune proposte.

> **Nota dal Blocco D (seminari)**: oltre alle proposte del docente, è esplicitamente possibile **proporre idee di progetto proprie**, ad esempio ispirate al tema "Web per la Sostenibilità" (AI4SDGs Think Tank) trattato nel seminario su Sustainable Web Development.

## 4. Obiettivi e programma del corso

### Concetti principali
- Browser e Server per il Web
- MVC e altri pattern applicati al Web
- Concetti relativi alle Single Page Applications
- Metodologie per lo sviluppo di applicazioni Web
- Human-Computer Interaction (HCI) per il design e la valutazione di Web User Interface (UI)

### Tecnologie
- Stack **MEVN**
- Superset e metalinguaggi per il Web (**TypeScript**, **SASS/SCSS**)
- Framework JS (**Vue** in dettaglio, introduzione ad **Angular**)

### Laboratorio
- Node.js + Express
- MongoDB
- VueJS
- SCSS

### Seminari esterni
Durante il corso vengono ospitati docenti esterni per seminari (vedi Blocco D per i contenuti effettivi).

## 5. Intersezioni con altri corsi

Il corso è pensato per **limitare sovrapposizioni** con altri insegnamenti del piano di studi:

| Corso | Relazione |
|---|---|
| **Tecnologie Web** | Propedeutico: si danno per scontati gli argomenti già visti alla triennale; si riprendono solo definizioni "ponte" verso i nuovi argomenti (JS per stack MEAN, CSS per SCSS/SASS) |
| **Programmazione Concorrente e Distribuita** | In laboratorio si userà NodeJS per script server-side, ma con focus diverso dalla programmazione asincrona vista in quel corso. Non si tratteranno API REST design, architetture a microservizi, Cloud, per evitare sovrapposizioni |
| **Paradigmi di programmazione e sviluppo** | Il pattern MVC (e simili, come MVVM) viene qui applicato e declinato al contesto Web-based, mentre l'altro corso copre metodologie/pattern di progettazione avanzati in generale |
| **Sistemi distribuiti** | Focus qui su applicazioni Web-based, non sui Web Service come "servizi standard per sistemi distribuiti" |

## 6. Approccio didattico dichiarato

Il corso offre una panoramica **volutamente parziale** delle tecnologie web esistenti: non è possibile coprire tutti linguaggi/piattaforme/framework/librerie. Si entra nel dettaglio solo di alcune tecnologie (in laboratorio), introducendo concetti di base applicabili anche ad altre tecnologie non trattate esplicitamente, con focus sui **trend attualmente più interessanti**.

In particolare il corso si concentra su:
- Funzionamento del browser, per motivare le tecnologie Web-based (HTML, CSS, JS) già note da Tecnologie Web
- Superset e metalinguaggi: **TypeScript** (→ JS) e **SCSS/SASS** (→ CSS)
- Pattern e metodologie di sviluppo Web-oriented
- Metodologie e pattern **HCI** per design e valutazione delle Web User Interface
- Confronto tra i tre framework JS più diffusi: **Vue, Angular, React**
- Approfondimento dello stack **MEVN** (variante di MEAN basata su VueJS al posto di Angular)

---

## Punti chiave da ricordare (organizzativi, non di teoria)

- L'elaborato vale fino a **27/30**, l'orale aggiunge/toglie **fino a 5 punti** — quindi la qualità del progetto è il fattore dominante per il voto finale.
- Il progetto va consegnato **almeno una settimana prima** dell'orale, via repository Git, **con relazione LaTeX**.
- Gruppi da **2 a 3 persone**.
- Il progetto deve avere: **client + server + DB documentale**, e prevedere esplicitamente fasi di **design, implementazione e test con utenti** — quest'ultimo punto lega direttamente alle metodologie HCI viste nel Blocco C (personas, scenari, usability test, questionari SUS/UEQ).
- Il tema va concordato con docente/tutor, ma è ammesso (e incoraggiato) proporre idee originali.
