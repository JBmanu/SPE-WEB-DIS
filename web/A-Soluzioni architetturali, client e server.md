# Modulo 1 — Blocco A: Evoluzioni e Soluzioni Architetturali per il Web

> Corso: Applicazioni e Servizi Web (magistrale) — Prof.ssa Silvia Mirri
> Riassunto da slide: *A - Soluzioni architetturali (client e server)*

---

## 1. Browser: storia ed evoluzione

Il browser è al tempo stesso un **client HTTP** e un **visualizzatore di documenti** ipertestuali e multimediali. Avvia l'interazione come client HTTP, renderizza testo/immagini/interfacce grafiche, permette editing locale e può includere plug-in, estensioni e un linguaggio di scripting interno (JavaScript) che consente sia semplici validazioni sia applicazioni client autosufficienti (rich client application).

**Tappe storiche principali:**
- Anni '80: precursori dei browser, ispirati alle idee di Ted Nelson (progetto MEMEX).
- 1990: primo vero browser, **WorldWideWeb** (poi rinominato *Nexus*), sviluppato da Tim Berners-Lee al CERN. Includeva client HTTP, layout engine ed editor WYSIWYG.
- Primo browser **grafico**: Mosaic.
- **Prima guerra dei browser (1994-1997):** Internet Explorer vs Netscape Navigator. Vince IE, anche grazie alla strategia commerciale Microsoft (IE incluso di default in Windows 95).
- **Seconda guerra dei browser (dal 2004):** IE ristagna; emergono Firefox, Opera, Safari (più aderenti agli standard W3C, spesso gratuiti/open source). Nel 2008 arriva Chrome, che oggi domina il mercato; il supporto a IE è stato progressivamente dismesso da Microsoft (es. fine supporto IE11 su Teams web nel 2020, app Microsoft 365 da agosto 2021).

### Componenti principali del browser
1. **Interfaccia Utente (UI)** — barra indirizzi, bottoni back/next, bookmark, tab, ecc. (tutto tranne la finestra di rendering). Non standardizzata da specifiche formali, ma frutto di best practice consolidate; HTML5 ne elenca solo alcuni elementi comuni.
2. **Browser Engine** — fa da ponte tra UI e motore di rendering; gestisce le primitive di navigazione (back, next, reload) e gli stati della sessione.
3. **Rendering Engine** — esegue parsing e rendering di HTML/CSS.
4. **Networking (client HTTP)** — gestisce invio/ricezione richieste HTTP (e altri protocolli come FTP); possibile collo di bottiglia delle performance; implementa cache (AppCache, Service Workers).
5. **Interprete JavaScript** — parsing ed esecuzione del codice JS.
6. **UI Backend** — disegna gli elementi grafici di base (finestre, bottoni, combo box) basandosi sui widget del sistema operativo.
7. **Data Persistence** — gestisce dati salvati localmente (cookie, localStorage, sessionStorage, WebSQL, IndexedDB, FileSystem).

</br>

**Schema architetturale del browser** (i 7 componenti e le loro relazioni):

```
                    +------------------+
                    |  User Interface  |
                    +--------+---------+
                             |
                    +--------v---------+        +-------------------+
                    |  Browser Engine  |<------->|  Data Persistence |
                    +--------+---------+        +-------------------+
                             |
                    +--------v---------+
                    | Rendering Engine |
                    +---+----------+---+
                        |          |
            +-----------v--+   +---v-----------+
            | Networking    |   | JS Interpreter |---- UI Backend
            +---------------+   +----------------+
```

### Data Persistence — dettaglio API
- **Local Storage / Session Storage**: storage di dati/oggetti/funzioni JS. Session storage dura quanto la sessione; local storage è persistente. Limiti: ~5MB per storage, ~50MB per sistema.
- **Cookies**: scambiati client-server, utili per privacy/sicurezza/profilazione, ma meno performanti.
- **AppCache**: API HTML5 per contenuti statici.
- **Service Workers**: caching per modalità offline (introdotta da Google), simile ad AppCache.

---

## 2. Web Server: evoluzione e funzionalità

Un **server web** è un'applicazione che risponde a richieste di risorse (file, record di DB) identificate da un URL univoco. Può fare da tramite verso applicazioni server-side, trasformando il browser nell'interfaccia dell'applicazione stessa.

**Funzionalità principali:** hosting, processing e delivery delle pagine web. Il **server HTTP** è il componente che riceve le richieste e invia le risorse (HTML, immagini, CSS, script).

### Hardware vs Software
- **Hardware**: il computer fisico che ospita software e file, connesso a Internet.
- **Software**: i componenti che gestiscono l'accesso ai file e la comunicazione HTTP. Un server HTTP comprende URL, risolve path e gestisce il protocollo.

### Caratteristiche di HTTP
- **Testuale**: comandi e messaggi in plain-text, leggibili.
- **Stateless**: nessuna memoria delle comunicazioni precedenti. Per gestire sessioni/stato serve un application server o meccanismi aggiuntivi (es. lato client).

### Step principali del server web
1. Hosting dei file (richiede always-on, connessione stabile, IP fisso, eventuale provider di hosting).
2. Comunicazione via protocollo HTTP.
3. **Path translation**: mappatura dell'URL richiesto su una risorsa locale (statica) o su un programma (dinamica). Esempio: `http://www.example.com/path/file.html` → root directory del server (es. `/home/www/path/file.html` su Apache, o `/var/www/htdocs/...` su Unix).
4. Gestione di contenuti statici (inviati così come sono) e dinamici (elaborati/generati on-the-fly, tipicamente con dati da database).

### Architetture per la concorrenza
- **Multi-processing**: un processo padre genera processi figli, ciascuno gestisce una richiesta; il padre monitora il carico (fork/kill).
- **Multi-threaded**: più processi single-thread.
- **Ibrido**: processi multipli, ciascuno con thread multipli — riduce il carico sulle risorse di sistema.

### Application Server vs Database Server
- **Application Server**: esegue la business logic, genera contenuto dinamico, spesso fa da interfaccia ai database. I suoi "client" possono essere altri server (Web o application). Comunicazione non necessariamente via HTTP.
- **Database Server**: gestisce archiviazione/recupero dati.
- In pratica, application server e web server sono spesso implementati insieme; non esistono standard rigidi che li separano (es. un reverse proxy spesso fa anche da load balancer).

### Altre funzionalità del server web
Logging, Authentication, supporto HTTPS (SSL/TLS, porta 443), compressione contenuti (es. gzip), virtual hosting (più siti su un solo IP), supporto file di grandi dimensioni, bandwidth throttling.

### Overload: cause, sintomi, contromisure
**Cause:** traffico legittimo eccessivo, attacchi DDoS, worm, vulnerabilità XSS sfruttate, traffico da bot non filtrati, rallentamenti di rete, indisponibilità parziale/totale del server (manutenzione, failure hardware/software/backend).

**Sintomi:** ritardi nelle risposte, errori HTTP 500/502/503/504 (e talvolta 404/408), connessioni TCP rifiutate/interrotte, contenuto parzialmente inviato.

**Tecniche anti-overload:**
- Gestione del traffico: firewall, traffic manager HTTP, bandwidth shaping.
- Domain name differenziati per tipo di contenuto/dimensione file.
- Web caching.
- Scalare orizzontalmente (più server software/hardware in gruppo).
- Scalare verticalmente (più RAM, disco).
- Tuning di sistema operativo e software server, workaround per contenuti dinamici.

---

## 3. Architetture del World Wide Web: evoluzione storica

Le architetture WWW sono evolute da soluzioni statiche a soluzioni sempre più dinamiche e distribuite tra client e server.

| Architettura | Caratteristiche | Pregi | Difetti |
|---|---|---|---|
| **Sito web statico** | Un file fisico per ogni schermata, nessuna elaborazione server-side | Facile da realizzare, nessuna competenza tecnica richiesta | Nessuna automazione/integrazione, file indipendenti tra loro |
| **SSI (Server Side Include)** | File statici con commenti speciali (es. `<!--#include virtual="header.html"-->`) interpretati dal server prima dell'invio | Una qualche modularità, semplice | Vocabolario di azioni molto limitato, utile solo per micro-contenuti dinamici |
| **3 livelli — Embedded code** | Codice (PHP/ASP) incorporato nei file HTML; un file per funzionalità | Sviluppo rapido, forte integrazione col template | Architettura fragile: codice e presentazione si "sporcano" a vicenda |
| **3 livelli — Full application** | Separazione tra application logic e template (file separati, template engine) | Separazione tra logica e presentazione, processi di test/sviluppo distinti | Separazione non completa: l'application logic decide ancora il formato di output (es. lista vs tabella) |
| **4 livelli** | Application logic produce output "puro" (es. XML), un livello di **presentation logic** separato lo trasforma in HTML (es. tramite XSLT) | Separazione completa e definitiva tra logica e presentazione; architettura modulare e ripetibile | Difetti tipici di tutte le architetture server-side |
| **Rich client (AJAX, Web 2.0)** | Application logic e/o presentation logic si spostano (in parte) sul client tramite JavaScript e `XMLHttpRequest` | Minore traffico verso il server per singola interazione, niente reload completo della pagina | Difficoltà storiche: minore controllo sull'ambiente, distribuzione codice; risolte perché i browser sono più standardizzati e il codice è ridistribuito ad ogni caricamento |

### Schema comparativo (3 livelli vs 4 livelli vs AJAX)

```
   3 LIVELLI            4 LIVELLI                    AJAX
 +-----------+       +-----------+              +-----------+
 |   HTML    |       |   HTML    |              |   HTML    |
 +-----------+       +-----------+              +-----------+
                      |Presentat.|              |Presentat.|
                      +-----------+              +-----------+
                                                  |App. Logic|
                                                  +-----------+
 |Presentat. |
 +-----------+
 |App. Logic |       |App. Logic|              |App. Logic|
 +-----------+       +-----------+              +-----------+
 |  Storage  |       |  Storage  |              |  Storage  |
 +-----------+       +-----------+              +-----------+
```
*(In AJAX, Presentation e/o Application Logic possono risiedere sia lato client sia lato server, a seconda di quanta logica viene spostata sul client)*

### Funzionamento AJAX
1. Il browser carica una pagina HTML normale con codice JS e librerie Ajax.
2. Le librerie Ajax forniscono: (a) funzioni comuni indipendenti da OS/browser; (b) librerie per costruire applicazioni client-side (es. interazione col server, generazione di frammenti di output).
3. Tramite `XMLHttpRequest`, il client richiede dati "presentation-independent" al server, da convertire in HTML lato client. Due varianti:
   - il server genera XML e lo passa al client (si sposta solo la presentation logic);
   - il server fa solo query/risposte minime (si spostano sia presentation logic sia application logic).

### Framework

| Tipo | Esempi | Funzione |
|---|---|---|
| **Server-side** | Struts, Django, Ruby on Rails, Symfony, Yii, Spring MVC, Stripes, Play, CodeIgniter | Architettura a 3 livelli con struttura MVC; gestiscono autenticazione/sicurezza, accesso DB, URL mapping, scaffolding |
| **Client-side CSS** | Foundation, YAML, Twitter Bootstrap | Layout, responsive design, componenti UI ricorrenti (tab, menu, navbar) |
| **Client-side JS** | Prototype, Dojo, GWT, jQuery, ExtJs, Angular, Vue.js, React | Omogeneizzano JS tra browser, aggiungono funzionalità (Ajax, query DOM, OOP), effetti grafici, widget, gestione template |

### Single-Page Application (SPA)
Sito complesso composto da un unico documento HTML, reso possibile da: maggiore velocità di rete, disponibilità di Ajax, maturità dei framework JS/CSS. Vantaggi: gestione semplificata, connessioni HTTP unificate, alta flessibilità di reazione, offline editing.

---

## 4. Web Solution Stack

Un **solution stack** è un insieme di componenti/sottosistemi software necessari a costruire una piattaforma completa (architettura a 3 livelli), senza bisogno di software aggiuntivo. Per il web, tipicamente: sistema operativo, web server, database, linguaggio di programmazione.

### Confronto degli stack principali

```
   LAMP/WAMP                          MEAN
 +----------------+              +----------------+
 |  PHP/Perl/Py   |              |    Angular     |  <- client
 +----------------+              +----------------+
 |     MySQL      |              |    Express     |  <- server framework
 +----------------+              +----------------+
 |     Apache     |              |     Node.js    |  <- runtime
 +----------------+              +----------------+
 | Linux/Windows  |              |    MongoDB     |  <- DB NoSQL
 +----------------+              +----------------+
                                  (no riferimento a OS specifico)
```

- **LAMP**: Linux (OS) + Apache (web server) + MySQL (DBMS relazionale) + PHP/Perl/Python (linguaggio). Interamente open source.
- **WAMP**: variante Windows di LAMP (stesso stack, OS Windows).
- **MEAN**: non lega a un OS specifico.
  - **M**ongoDB → database NoSQL
  - **E**xpress.js → framework server-side JS (su Node.js)
  - **A**ngular(JS) → framework client-side JS
  - **N**ode.js → runtime per eseguire JS lato server

### MEAN vs LAMP/WAMP — differenze chiave
- LAMP/WAMP sono legati a un OS specifico; MEAN nasce multipiattaforma.
- MEAN adotta il paradigma **"JavaScript everywhere"**: stesso linguaggio (JS) sia per client (Angular) sia per server (Express, via Node.js).
- MEAN usa un DB **non relazionale** (MongoDB) invece di MySQL.
- L(W)AMP definisce solo lo stack lato server (PHP/Python/Perl); non offre un framework client-side equivalente integrato nello stack.

> Nota: il corso approfondirà in particolare la variante **MEVN** (MongoDB, Express, **Vue.js**, Node.js).

---

## 5. Pattern MVC (Model-View-Controller)

### Origine
Coniato nel **1978** da **Trygve Reenskaugh** e **Adele Goldberg**. L'idea originaria era che MVC (e le sue varianti) potessero costituire un **Pattern Language**, un linguaggio condiviso per discutere/formalizzare problemi e soluzioni — concetto che ha poi influenzato il libro *Design Patterns* (Gamma et al., "Gang of Four").

### I tre componenti classici

```
                  +-------+
                  |  View |
                  +---^---+
                      |
        +-------------+--------------+
        |                            |
   +----v----+                 +-----v------+
   |  User   |---------------->| Controller |
   +---------+                 +-----+------+
                                     |
                              +------v-------+
                              |    Model     |
                              | (Persistence +
                              |  Business    |
                              |  Logic)      |
                              +--------------+
```

- **Model**: gestisce comportamento e dati del dominio; risponde alle query della view sul proprio stato e alle richieste di cambiamento (dal controller).
- **View**: visualizza il modello in forma utile all'interazione; possono esistere più view per lo stesso modello.
- **Controller**: definisce il comportamento, mappa le azioni utente agli aggiornamenti del model, seleziona la view per l'interazione.

**Variante**: View e Controller concentrati in un unico oggetto (Presentation/Input separati ma legati).

### MVC nel Web (anni 2000)

Adottato da framework come Spring, Ruby on Rails, PHP-based, ASP.NET. Il **Controller** gestisce la richiesta HTTP iniziale (funge da entry point al posto della View).

```
Browser --HTTP GET (RESOURCE)--> Controller (for Resource)
Browser <--HTML/JS/CSS----------- |
                                   v
                          View (Templating)  <-->  Model (Persistence + Business Logic)
```

- Il **Controller** è l'entry point e gestisce la comunicazione HTTP.
- La **View** assembla HTML/JS/CSS nella risposta (gestisce il template).
- Il **Model** gestisce business logic e storage.
- HTML/JS lato client contengono solo elementi minimi di logica di interazione (es. handler di click che invia un'azione al Controller via `XMLHttpRequest`).
- Il browser è esterno a questo schema concettuale.

### MVC nei moderni framework web (SPA)

Con browser più moderni (`XMLHttpRequest`, DOM API stabili, ES6) e la diffusione delle SPA, l'esecuzione si sposta sempre più lato client. I framework moderni creano bundle statici di HTML/JS/CSS; la logica client effettua chiamate API verso Controller dedicati che rispondono tipicamente in JSON.

```
Browser --HTTP GET /index.html--> SPA Controller --> HTML/JS/CSS bundle
   |
   | (SPA: View + Controller + Model lato client)
   |
   +--HTTP GET/POST--> API Controllers --> API Layer (REST, GraphQL...) --> DB
   <--JSON-------------
```

**Framework moderni e pattern adottati:**
- **Vue** e **Angular** → pattern **MVVM** (Model-View-ViewModel)
- **React** → pattern **Flux** (alternativa a MVC, data flow unidirezionale)

### MVVM (Model-View-ViewModel)

Il **ViewModel** sostituisce il Controller e si sposta sul frontend. Non è un controller: agisce come **binder** dei dati tra View e Model (data-binding diretto).

- **Vantaggio**: comunicazione diretta e automatica tra View e Model.
- **Svantaggio**: consumo di memoria significativo rispetto all'approccio con controller; sconsigliato per interfacce molto semplici.
- **Uso tipico**: SPA / single function application sul web (per applicazioni molto pesanti diventerebbe troppo oneroso).

```
   View <----data binding----> ViewModel <----> Model
                                                (Persistence +
                                                 Business Logic)
            ^
            |
          User
```

### MVP (Model-View-Presenter)
Pattern correlato: il **Presenter** riceve input dalla View, processa i dati con il supporto del Model e aggiorna la View. View e Presenter sono **disaccoppiati** e comunicano tramite interfaccia.

### Flux (React)
Basato su **data flow unidirezionale**. React crea una nuova View come funzione di uno stato immutabile; quando lo stato cambia, una parte del state tree viene sostituita, generando nuove View.

Rispetto a MVC, Flux divide le responsabilità del Model in:
- **Actions/API** → business logic
- **Store** → gestione dello stato

```
Action --dispatcher--> Store --> View --(user interaction)--> Action (nuovo ciclo)
```

### Confronto rapido MVC / MVVM / MVP / Flux

| Pattern | Entry point | Collegamento View-Model | Framework tipici |
|---|---|---|---|
| MVC | Controller | Indiretto, via Controller | Spring, Rails, ASP.NET |
| MVVM | (implicito, data binding) | Diretto via ViewModel (binder) | Vue, Angular |
| MVP | Presenter | Indiretto, via interfaccia | — |
| Flux | Action → Dispatcher | Unidirezionale via Store | React |

---

## Punti chiave da ricordare per l'esame

- Saper spiegare l'evoluzione storica delle architetture web (statico → SSI → 3 livelli → 4 livelli → rich client/AJAX) e i pregi/difetti di ciascuna.
- Conoscere i 7 componenti del browser e le 2 fasi principali del rendering engine (parsing/DOM tree → render tree → layout → painting) — *vedi anche il riassunto del blocco "Browser e sue componenti" più sotto*.
- Saper distinguere LAMP/WAMP da MEAN/MEVN e motivare il paradigma "JavaScript everywhere".
- Saper descrivere il pattern MVC classico, la sua applicazione al Web (sia pre-SPA sia con SPA), e le varianti MVVM, MVP, Flux — questi sono concetti molto probabilmente richiesti come **domande di teoria** all'orale.

---

## 6. Browser e sue componenti — approfondimento

> Questo blocco approfondisce in dettaglio il funzionamento interno del browser, già introdotto sopra.

### Motori di rendering principali
- **EdgeHTML** (Microsoft Edge, storico)
- **Gecko** (Firefox, SeaMonkey, Netscape)
- **KHTML** (Konqueror)
- **WebKit** (iOS, Safari, Chrome fino a v.27)
- **Blink** (Chrome, Opera attuali)

### Le fasi del motore di rendering (Main Flow)

```
 Parsing HTML            Render Tree         Layout of the         Painting the
 to construct  -------->  Construction  --->  Render Tree   --->   Render Tree
 the DOM tree
```

1. **Parsing HTML → DOM Tree**: il networking fornisce il contenuto; il parser converte HTML in nodi DOM (content/DOM tree) e parsifica gli stili (CSS esterni, interni, inline).
2. **Costruzione del Render Tree**: combina DOM e informazioni di stile in un albero di elementi *visuali* (Gecko li chiama *frames*, WebKit *renderer*/*render object*), ciascuno corrispondente solitamente a un box CSS con informazioni geometriche e di display.
3. **Layout (o Reflow) del Render Tree**: calcolo ricorsivo di posizione e dimensioni di ogni renderer, a partire dal root (coordinate 0,0 = viewport).
4. **Painting**: il render tree viene visitato per disegnare effettivamente i contenuti, in ordine background → foreground (background-color, background-image, border, children, outline).

### Relazione DOM Tree ↔ Render Tree
Non è una relazione 1:1:
- Elementi DOM **non visuali** non compaiono nel render tree (es. `<head>`, metatag, elementi con `display: none`) — attenzione: `visibility: hidden` **compare** comunque nel render tree (occupa spazio ma non è visibile).
- Alcuni elementi DOM complessi generano **più renderer** (es. `<select>` richiede 3 renderer).

### Parsing HTML in dettaglio
- HTML **non è** una grammatica context-free (a differenza di CSS), quindi non può essere parsato con parser tradizionali; viene definito formalmente solo tramite DTD/XMLSchema.
- HTML ammette sintassi "soft" (tag di chiusura omissibili), il che facilita gli sviluppatori ma complica il parsing.
- I browser tollerano errori di markup invalido senza mai restituire errori di sintassi: gestiscono gli errori più comuni in modo relativamente uniforme tra loro (per convenzione, non per specifica).
- L'algoritmo HTML5 di parsing ha due fasi: **Tokenization** (analisi lessicale → token, automa a stati finiti) e **Tree construction** (ogni token genera/aggiorna nodi DOM, automa a stati con "insertion mode").

### Calcolo dello stile e ordine della cascata
Il calcolo dello stile per ogni elemento considera fogli di stile esterni, interni, inline, attributi HTML deprecati (es. `bgcolor`), il foglio di stile di default del browser e le preferenze utente. **Ordine della cascata (dal più basso al più alto):**
1. Foglio di stile di default del browser
2. Preferenze utente
3. Foglio di stile dell'autore (esterno/interno/inline + attributi HTML)
4. Foglio di stile dell'autore con `!important`
5. Preferenze utente con `!important`

### Calcolo del Layout
- La **width** di un renderer dipende dal blocco contenitore (proprietà CSS `width`, margini, bordi). Esempio: `<div style="width: 30%">` → percentuale calcolata sulla width del contenitore (finestra meno bordi/scrollbar/padding).
- Processo **ricorsivo top-down**: il padre assegna posizione (x,y) ai figli e ne richiede l'altezza; usa le altezze dei figli (+ margin/padding) per calcolare la propria altezza, propagata al proprio genitore.

### Interprete JavaScript
Componente separato dal motore di rendering, ma condivide il DOM della pagina. Motori principali:
- **V8** (Chrome/Blink, Node.js — Google): scritto in C++, **compila** JS in codice macchina nativo tramite compilatore **JIT** (Just-In-Time), invece di interpretarlo puramente. Flusso: parsing → Abstract Syntax Tree (AST) → Bytecode Generator → bytecode interpretato con l'aiuto del JIT → codice macchina nativo eseguito.
- **SpiderMonkey** (Firefox/Gecko — Mozilla, nato per Netscape Navigator).
- **JavaScriptCore** (Safari — Apple).

---

## 7. Server Web — approfondimento finale (riepilogo architetturale)

> Sintesi conclusiva del blocco "Server Web": ribadisce hardware/software, funzionalità, statico/dinamico, path translation, architetture concorrenti, application/database server, overload — **contenuti già coperti integralmente nelle sezioni 2 e 3 sopra**, qui solo come struttura del blocco di slide originale per riferimento (nessun contenuto nuovo da aggiungere, evitati i duplicati come richiesto).

---

## Risorse di approfondimento citate nelle slide (solo titoli, in inglese)
- *Architecture of the World Wide Web* (W3C)
- *How Browsers Work: Behind the Scenes of Modern Web Browsers* (Garsiel & Irish)
- *A Reference Architecture for Web Browsers* (Grosskurth & Godfrey, ICSM 2005)
- Documentazione V8 (v8.dev/docs)
- MDN: *What is a Web Server?*
- NGINX: *Web Server vs Application Server*
- *From MVC to Modern Web Frameworks* (Robert Zhu)
- Reenskaug, *The Model-View-Controller (MVC) — Its Past and Present*
- Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*
