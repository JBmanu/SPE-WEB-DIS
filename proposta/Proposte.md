# Riassunto Proposte Progetti

**Software Process Engineering · Tecnologie e Servizi Web e Distribuiti · Sistemi Distribuiti**

Questo documento riassume in italiano i requisiti e le proposte di progetto per i tre corsi, sulla base dei materiali forniti:

- Tecnologie e Servizi Web — confronto tra le slide A.A. 2024/2025 e A.A. 2025/2026
- Software Process Engineering — requisiti d'esame e istruzioni del corso
- Sistemi Distribuiti — regolamento di progetto (Project Rules)

---

## 1. Tecnologie e Servizi Web e Distribuiti

I due file forniti (slide A.A. 2024/2025 e A.A. 2025/2026) descrivono i requisiti del progetto d'esame per il corso, con alcune differenze tra un anno e l'altro. Di seguito un riassunto unificato, seguito da un confronto puntuale tra le due edizioni.

### 1.1 Requisiti generali (comuni a entrambi gli anni)

- Il progetto consiste nella realizzazione di un elaborato, a partire dalle esercitazioni di laboratorio, svolto in gruppo di 2-3 persone.
- Va consegnato condividendo un repository (GitHub o altro), almeno 1 settimana prima della prova orale.
- La consegna deve includere una relazione scritta in LaTeX (template fornito su Virtuale).
- Punteggio massimo per l'elaborato: 27/30.
- Stack tecnologico richiesto: MEVN (MongoDB, Express, Vue, Node.js).
- Il tema e le specifiche di ogni gruppo vanno concordati via email con docente e tutor, e poi pubblicati da uno studente del gruppo sul Forum degli Elaborati su Virtuale.
- I docenti propongono alcuni temi volutamente generici: i gruppi possono concentrarsi su aspetti specifici, dettagliandoli, oppure (esplicitamente nell'edizione 2025/2026) proporre temi propri.

### 1.2 Tipologie di utenti e funzionalità real-time

Questi requisiti sono presenti in modo esplicito nelle slide 2024/2025 e restano sostanzialmente validi anche per il 2025/2026 (vedi confronto in 1.5).

- Devono essere previste almeno due tipologie di utenti: un Admin del servizio/sistema e un Utente fruitore del servizio/sistema.
- Va sfruttato il vantaggio principale dello stack, ovvero lo scambio immediato di informazioni push: almeno una funzionalità deve prevedere comunicazione avviata dal server verso il client (es. notifiche).

### 1.3 Criteri di valutazione (totale 27 punti)

| Criterio | Punteggio massimo |
|---|---|
| Design | 6 punti |
| Gestione funzionalità real-time / push | 8 punti |
| Gestione degli utenti | 5 punti |
| Gestione del servizio | 6 punti |
| Effetto WOW | 2 punti |

*Nota: i gruppi sono di 2 o 3 persone, eventuali eccezioni vanno concordate con i docenti.*

### 1.4 Temi proposti (panoramica unificata)

Le proposte di tema sono in larga parte le stesse nei due anni, con alcune varianti nei dettagli. Elenco unificato:

- **Mobilità per passeggeri (e non):** trasporto pubblico, interfacce per passeggeri/control room/driver, backend (nel 2024/2025 specificato come mappatura grafo partenze-destinazioni), servizi a bordo/in fermata, raccolta dati per postazioni, integrazione con servizi esterni (meteo, traffico, eventi).
- **Smart Mobility:** calcolo di percorsi multimodali urbani ed extra-urbani con diversi mezzi (bici, monopattini, a piedi), personalizzati in base a meteo, inquinamento, tempi, illuminazione, sicurezza ecc. (il 2025/2026 distingue esplicitamente inquinamento atmosferico e acustico).
- **Piattaforma di simulazione traffico e mobilità:** Web UI per Eclipse SUMO (Simulation of Urban Mobility), con diversi profili utente per la gestione di progetti di mobilità urbana.
- **Crowd Digital Twin:** applicazioni Web per il monitoraggio dei comportamenti delle folle ed eventuali simulazioni in ambienti come il Campus o i mezzi di trasporto pubblico; simulazione di sensori (camere per people counting, sensori di presenza/ambientali); profili utente admin, gestore dell'ambiente, utente presente nell'ambiente.
- **Applicazioni per la sostenibilità digitale:** riduzione del personal footprint tramite app Web (anche con AI/LLM) per generazione di diete/menu sostenibili, calcolo di percorsi sostenibili, ottimizzazione dei consumi domestici e dello shopping, facilitazione dell'interazione con LLM.
- **Applicazioni per il climate change:** Web app per il crowdsensing di dati su corsi d'acqua, pavimentazione stradale, stato del suolo, alberi e piante, luminosità urbana, inquinamento acustico/atmosferico.
- **Applicazioni per gli SDGs:** Web app a supporto dei Sustainable Development Goals dell'ONU, con possibile ispirazione dall'osservatorio dei progetti AI a supporto degli SDGs.
- **Human-Robot Interaction** (presente solo nelle slide 2024/2025): Web app per il controllo di un robot, con dashboard per comandi di spostamento e mappa per visualizzare la posizione del robot; possibilità di esperimenti con un robot reale.

### 1.5 Confronto tra le due edizioni (2024/2025 vs 2025/2026)

Le differenze principali tra i due pacchi di slide riguardano lo stack di comunicazione real-time, alcuni dettagli dei temi proposti e l'apertura a proposte autonome degli studenti.

| Aspetto | A.A. 2024/2025 | A.A. 2025/2026 |
|---|---|---|
| Comunicazione real-time | Libreria Socket.IO fortemente consigliata: comunicazione bidirezionale basata su eventi, supporto multi-dispositivo/browser, vari meccanismi di trasporto (WebSockets, Flash Socket, AJAX/JSON long polling). | Non è citata esplicitamente Socket.IO; resta il requisito generale di sfruttare lo scambio push lato server (slide su "Notifiche"). |
| Tipologie di utenti | Non è dedicata una slide specifica nel materiale fornito. | Slide dedicata: richiesti esplicitamente almeno 2 tipi di utenti (Admin e Utente fruitore). |
| Criteri di valutazione | Non presenti nel materiale fornito per questo anno. | Tabella di valutazione esplicita su 27 punti (Design, real-time, utenti, servizio, effetto WOW). |
| Proposte autonome | I docenti propongono temi generici su cui i gruppi possono concentrarsi e dettagliare. | Stesso principio, con l'aggiunta esplicita che gli studenti "possono anche avanzare delle proprie proposte". |
| Tema Mobilità — backend | Specificato: mappatura grafo partenze-destinazioni. | Generico, senza specifica sul grafo. |
| Tema Smart Mobility — personalizzazioni | Meteo, inquinamento, tempi, illuminazione, sicurezza. | Aggiunge distinzione tra inquinamento atmosferico e acustico. |
| Tema Crowd Digital Twin — ambienti | Campus o mezzi di trasporto pubblico (fermate, stazioni, bus, treni). | Solo Campus citato esplicitamente come esempio. |
| Tema Sostenibilità digitale | Diete sostenibili, percorsi sostenibili, ottimizzazione consumi domestici (HVAC, elettrodomestici, smart object), ottimizzazione shopping. | Stessi punti tranne l'ottimizzazione dei consumi domestici, non menzionata; aggiunge l'enfasi su "facilitare l'interazione con LLM". |
| Tema Human-Robot Interaction | Presente: Web app per controllo robot con dashboard e mappa, esperimenti con robot reale. | Assente dal materiale fornito per questo anno. |
| Progetti esclusi | Non specificato nel materiale fornito. | Slide dedicata: NO a gestione turni, ecommerce, giochi, eventi, social network — il progetto deve differenziarsi sostanzialmente da un tipico progetto di Tecnologie Web. |

In sintesi: l'impianto del progetto (gruppo, stack MEVN, relazione LaTeX, repository) è rimasto stabile nei due anni. Le novità più rilevanti nel 2025/2026 sono i criteri di valutazione esplicitati, il requisito chiaro sulle due tipologie di utente, l'apertura dichiarata a proposte originali degli studenti e l'esclusione esplicita di alcune categorie di progetto considerate troppo generiche o già abusate (gestione turni, ecommerce, giochi, eventi, social network). Il tema Human-Robot Interaction risulta invece presente solo nell'edizione precedente, mentre Socket.IO non è più citato come libreria consigliata.

---

## 2. Software Process Engineering

Dalle slide introduttive del corso (compilate il 17/06/2026, a cura del prof. Danilo Pianini) emergono sia informazioni organizzative sia i requisiti specifici per l'esame, riportati di seguito nello stesso formato usato per gli altri due corsi.

### 2.1 Informazioni sul corso

- **Docenti:** Danilo Pianini (danilo.pianini@unibo.it) e Giovanni Ciatto (giovanni.ciatto@unibo.it).
- **Canali di contatto:** dare priorità al Forum del corso per domande tecniche e non personali; se si scrive via email, includere sempre entrambi i docenti.
- **Orario lezioni:** giovedì 11:00–14:00 (Aula 2.5) e venerdì 11:00–14:00 (Lab 4.2); eventuali variazioni vengono pubblicate sul forum.
- **Materiali:** le slide (con rolling release) dovrebbero contenere tutto il necessario; il codice di esempio viene reso disponibile dopo ogni lezione, gran parte è già su GitHub. Nessun libro obbligatorio, ma sono indicate letture consigliate sulla pagina del corso.
- **Obiettivi del corso:** progettare sistemi software con approccio domain/model/test-driven; ridurre l'overhead dal dominio al codice eseguibile; pratiche di sviluppo agile e filosofia DevOps; alta automazione ed eccellenza tecnica; comprendere analogie e differenze tra piattaforme di sviluppo.
- **Prerequisiti:** conoscenza di Java (Scala è un plus), abilità minime con git (inizializzazione/gestione repository, commit, branching/merging, fetch/push) e un atteggiamento curioso — non fermarsi quando qualcosa funziona, ma capire perché funziona, specie nell'era degli LLM.
- **Software richiesto:** connessione internet funzionante, installazione JDK funzionante; consigliati Docker, Kotlin, Gradle, IntelliJ IDEA o Visual Studio Code, un terminale Unix ben configurato (es. zsh). È disponibile un container Docker con tutto il software del corso, convertibile anche in distribuzione WSL2 per Windows. I PC di laboratorio hanno già l'immagine WSL2 pronta.

### 2.2 Requisiti per l'esame

L'esame consiste nella discussione di un progetto di gruppo, che deve obbligatoriamente includere:

1. Domain-driven design.
2. Un processo di sviluppo chiaro e pratiche DevOps.
3. Automazione a tutto tondo, inclusa integrazione e delivery continua (CI/CD).
4. Automazione del deploy tramite containerizzazione e/o orchestrazione.
5. Coinvolgimento tecnico di almeno 2 piattaforme target (es. JVM, NodeJS, Python, C, C++, Rust, Go ecc.). Due target sono considerati diversi se eseguono su runtime diversi (es. nativo + JVM); sono probabilmente diversi se usano build system diversi, con l'eccezione di Scala/sbt e Java/Gradle, che non sono considerati target distinti.

#### Flessibilità sul tipo di progetto

- Il progetto può essere realizzato in collaborazione con altri corsi: l'importante è la modellazione del dominio e l'applicazione delle tecniche DevOps; si può quindi riutilizzare un progetto di un altro corso per Software Process Engineering.
- Può essere un progetto creato esclusivamente per questo corso (se mancano idee, i docenti offrono supporto).
- Può essere un progetto che copre sia il corso sia la tesi.

#### "Project Work" con aziende esterne

Il progetto d'esame può essere svolto anche come "project work", ovvero un progetto i cui requisiti sono forniti da un'azienda reale che agisce da committente. Gli studenti interagiscono con l'azienda per applicare il Domain-Driven Design su un software reale; il progetto risultante sarà open source e dovrà comunque rispettare tutti i requisiti previsti per un progetto d'esame "normale". I project work disponibili vengono pubblicati sul sito del corso su Virtuale.

### 2.3 Istruzioni pratiche

- Iscriversi alla piattaforma Virtuale (Virtual Learning Environment) del corso, se non già fatto.
- Consultare regolarmente le slide del corso, prodotte con modello a rolling release.
- Recuperare il codice di esempio prodotto a lezione (disponibile dopo la lezione, in gran parte già su GitHub).
- Verificare gli orari di ricevimento di entrambi i docenti sulla relativa pagina personale.
- Per domande tecniche o di carattere generale, usare il Forum del corso prima dell'email.
- Preparare l'ambiente di sviluppo: JDK funzionante e connessione internet sono obbligatori; valutare l'uso del container Docker ufficiale (link nella sezione 2.1) per avere già pronto tutto il software necessario, oppure usare l'immagine WSL2 già presente sui PC di laboratorio.

---

## 3. Sistemi Distribuiti

Il file `proposta-distributed.md` contiene il regolamento di progetto (Project Rules) del corso, qui riassunto in italiano.

### 3.1 Struttura generale dell'esame

- L'esame consiste in una discussione orale di un progetto a scelta dello studente, accompagnata da una relazione finale che deve essere consegnata e validata prima della discussione.
- **Impegno previsto:** circa 90 ore a persona. Per gruppi, l'impegno scala linearmente (90 × N ore, con N = numero di studenti).
- **Dimensione del gruppo:** massimo 3 persone, 4 solo in casi eccezionali e motivati.
- La relazione finale può essere condivisa tra i membri del gruppo, ma deve indicare chiaramente come è stato suddiviso il lavoro.
- La valutazione è sempre individuale, anche per i progetti di gruppo.
- **Studenti lavoratori, Erasmus o con esigenze particolari:** possono richiedere una rinegoziazione dei termini d'esame scrivendo via email privata ad andrea.omicini@unibo.it, in copia a tutti gli altri docenti.

### 3.2 Procedura 1 — Proposta del progetto

- Gli studenti (singolarmente o in gruppo) riservano un progetto aprendo una nuova discussione sul Forum dei Progetti.

La proposta deve includere:

1. Vision: cosa si vuole costruire, con le funzionalità del sistema.
2. Learning goals: perché il progetto è rilevante per il corso e cosa ci si aspetta di imparare.
3. Tecnologie previste e relative motivazioni.
4. Deliverable previsti (app, libreria, presentazione, ecc.) oltre alla relazione finale.
5. Per i progetti software: scenari d'uso.
6. Membri del gruppo (nomi e indirizzi email).
7. Eventuali vincoli temporali stringenti (es. laurea, lavoro, tirocini).

È possibile pubblicare prima un'idea di massima, ricevere feedback e poi raffinarla.

#### Convenzione di denominazione

Il titolo della discussione sul forum deve seguire questo formato:

```
[Location] [Cognome1, Cognome2, ..., CognomeN] Project proposal: <nome breve dell'attività>
```

dove Location dipende dal corso di laurea:

- "Computer Science" → [Bologna]
- "Computer Science and Engineering" → [Cesena]

Le proposte devono essere esplicitamente accettate da un docente prima di poter procedere alla Procedura 2.

#### Note

- Può essere richiesto di modificare la proposta se un progetto simile è già stato completato o riservato in anni correnti o passati: occorre controllare le richieste precedenti (archivio progetti APICe SD degli anni passati e Forum dei Progetti).
- Se la proposta è simile a un progetto già esistente, è possibile richiedere una negoziazione per un progetto analogo.

### 3.3 Procedura 2 — Progettazione e sviluppo

Il progetto deve essere progettato e sviluppato correttamente, con codice di qualità tracciato in un repository GitHub.

- Gli studenti devono avere un account GitHub (preferibilmente con username professionale).
- È preferibile usare repository pubblici; se privati, occorre dare accesso ai docenti.
- I gruppi devono adottare un workflow strutturato, ad esempio GitLab flow o GitHub flow.
- È incoraggiato l'uso di metodologie test-driven e model-first.
- **Uso delle GitHub Issues per:** discutere nuove idee, richieste di funzionalità, segnalazione di bug, discussioni di design.
- In caso di problemi tecnici o organizzativi, è bene provare a risolverli autonomamente prima di chiedere aiuto ai docenti (tramite GitHub Issues o forum).

### 3.4 Procedura 3 — Consegna e discussione del progetto

- Gli studenti devono comunicare esplicitamente l'intenzione di discutere il progetto pubblicando nel proprio thread sul Forum dei Progetti e allegando la relazione finale in PDF.
- **Importante:** non inviare la relazione via email né pubblicarla come link a servizi esterni (Google Drive, Dropbox, ecc.): va allegata come PDF direttamente al post sul forum.
- Se la relazione è accettabile, il supervisore proporrà una data per la discussione; altrimenti verranno richiesti miglioramenti e lo studente dovrà caricare una nuova versione senza eliminare le precedenti.

Durante la discussione, il docente:

- verifica la comprensione del progetto e la sua relazione con gli argomenti del corso;
- valuta la conoscenza e il contributo individuale nei progetti di gruppo;
- controlla brevemente la qualità della relazione e del codice.

### 3.5 Relazione finale — requisiti

- Deve essere scritta in inglese.
- Deve essere significativa ma concisa (massimo circa 50 pagine).
- **Deve essere prodotta in LaTeX**, usando il template ufficiale del corso (vedi sezione 3.6). Eventuali variazioni devono essere approvate sul Forum dei Progetti.

### 3.6 Link utili

[Template ufficiale della relazione finale (GitHub)](https://github.com/unibo-fc-isi-ds/template-final-report)
