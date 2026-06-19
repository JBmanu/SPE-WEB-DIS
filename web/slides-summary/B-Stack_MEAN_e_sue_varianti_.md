# Blocco B — Stack MEAN e sue varianti

> Corso: Applicazioni e Servizi Web (magistrale) — Prof.ssa Silvia Mirri
> Riassunto da slide: *B - Stack MEAN (e sue varianti)*

> **Nota amministrativa** (non esame): le slide contengono un promemoria sulla formazione obbligatoria "Salute e Sicurezza nei luoghi di lavoro" (Modulo 1 Generale, 4h; Modulo 2 Rischio Basso, 4h), necessaria per accedere ai laboratori. Va completata su Virtuale, non è materiale d'esame.

---

## 1. Da LAMP a MEAN

### Architettura Client-Server (richiamo)
Tecnologie tipiche pre-corso: client-side (HTML, CSS, JavaScript, jQuery), server-side (PHP e alternative: Perl, Python, ASP.NET, Ruby, C#), database (MySQL e alternative: SQL Server, Oracle).

### LAMP e varianti
LAMP = **L**inux + **A**pache + **M**ySQL (o **M**ariaDB) + **P**HP. Molto diffuso, open source, ampia community, personalizzabile.

**Varianti del nome:**
- **LEMP** — NGINX al posto di Apache (la "E" deriva dalla pronuncia "engine-X")
- **LLMP** — lighttpd al posto di Apache
- **LAPP** — PostgreSQL al posto di MySQL

**Problemi di LAMP:**
- Apache non è il web server più veloce.
- Difficile scrivere codice PHP riusabile e performante.
- Linguaggi diversi per front-end e back-end → numerose conversioni di dati (XML/JSON ↔ PHP ↔ HTML).
- Nessuna netta separazione di sviluppo tra client e server.

### Requisiti per il Web moderno
Velocità e scalabilità, nessun reload di pagina, gestione di molte richieste concorrenti, caricamento condizionato delle risorse (solo quando richiesto), UI mobile/responsive.

### MEAN Stack
**Full-stack JavaScript framework** che velocizza e semplifica la creazione di applicazioni web robuste e mantenibili. Acronimo: **M**ongoDB + **E**xpress.js + **A**ngular + **N**ode.js.

### Confronto MEAN vs LAMP/WAMP
- LAMP/WAMP sono legati a uno specifico OS; **MEAN è multipiattaforma**.
- MEAN usa **Node.js** come ambiente di esecuzione server-side (esegue JS fuori dal browser → paradigma **"JavaScript everywhere"**).
- MEAN usa un **DB non relazionale** (MongoDB) al posto del relazionale MySQL.
- MEAN fornisce **due supporti di programmazione** (client: Angular, server: Express) basati sullo **stesso linguaggio** (JS).
- L(W)AMP definisce solo lo stack lato server (PHP/Python/Perl).

### Nuovo modello di architettura
MEAN rappresenta un cambiamento di paradigma:
- da database **relazionali** a database **documentali** (NoSQL)
- da pattern **MVC lato server** a **single web application lato client**

### Vantaggi MEAN
100% open source, 100% JavaScript (+JSON +HTML), 100% Web standard, modello consistente tra back-end e front-end, nessuna conversione necessaria per il database (JSON nativo), basso overhead di memoria, possibilità di iniziare lo sviluppo dal frontend.

### Svantaggi MEAN
Mancanza di linee guida/best practice consolidate per JS (+ problematiche di blocco nel browser durante l'esecuzione di script), MongoDB meno robusto di un SQL server in termini di sicurezza, difficoltà a "tornare indietro" ai vecchi approcci una volta adottato MEAN.

---

## 2. Node.js

**Definizione**: piattaforma software cross-platform (non un web server, non un linguaggio) che permette di creare un proprio web server e application web. Costruita sul motore **Google Chrome V8 JavaScript Engine** (esegue JS server-side).

**Caratteristiche chiave:**
- **Single-threaded**
- **Event-driven architecture**
- **Esecuzione asincrona**
- **Non-blocking I/O model**

Permette connessioni **real-time, two-way**, dove anche il server può iniziare una connessione (in contrasto con le applicazioni web tradizionali).

**Benefici**: codice in JS, velocissimo e leggero, uso efficiente delle risorse, non serve un web server separato, forte controllo su logica e ambiente, gestione di molti utenti con poche risorse.

> *Dal sito ufficiale*: "Node.js è un runtime JavaScript costruito sul motore JavaScript V8 di Chrome", usa un modello I/O non bloccante e ad eventi, e il suo ecosistema di pacchetti (**npm**) è il più grande al mondo per librerie open source.

### Motore JavaScript V8
Open source, sviluppato da Google (usato in Chrome e Node.js), scritto in **C++**, multipiattaforma, supporta ECMAScript. Compilazione **Just-In-Time (JIT)**: converte direttamente JS in codice macchina di basso livello, senza passare per codice intermedio.

### Modello Thread-based vs Event-Driven

```
   THREAD-BASED (tradizionale)              EVENT-DRIVEN (Node.js)
   Dispatcher thread                        Coda di eventi
        |                                        |
   +----+----+----+                         Event Loop (single-thread)
   |    |    |    |                              |
  T1   T2   T3   T4   <- 1 thread/richiesta   handler eseguito per evento
  (I/O bloccante)                          (I/O asincrono su thread aggiuntivi)
```

**Modello Thread-based (tradizionale):**
- Un dispatcher thread assegna ogni richiesta a un worker thread.
- Numero di thread attivi = numero di richieste in un dato momento.
- Operazioni I/O **bloccanti**.
- **Svantaggi**: overhead da context switching, limite massimo di thread del SO → scalabilità limitata.

**Modello Event-Driven (Node.js):**
- Le richieste diventano **eventi** (associati a un event handler) inseriti in una coda.
- **Event loop single-threaded**: ad ogni iterazione controlla la coda ed esegue l'handler corrispondente.
- Thread aggiuntivi gestiscono le operazioni I/O in modo **asincrono**.

**Attenzione (logica asincrona):** tutte le richieste sono servite da un **singolo thread**, in modo concorrente e asincrono. Una cattiva gestione di quel thread (es. uno `sleep`) si ripercuote sull'intero sistema. Non si aspettano i risultati: quando pronti, vengono inseriti nell'event loop. Vantaggi: meno memoria consumata, maggiore velocità.

### Quando usare/non usare Node.js
- **DIRT Application** (Data-Intensive Real-Time Application): Node.js gestisce un elevato numero di connessioni simultanee → alta scalabilità. Esempi: streaming multimediale, videogiochi online, chat, sistemi di monitoraggio IoT/smart object.
- **Da evitare per**: applicazioni CPU-intensive (computazioni lunghe/complesse), server per gestione di soli file statici.

### NPM (Node Package Manager)
- `npmjs.com` ospita migliaia di pacchetti gratuiti scaricabili.
- Un **pacchetto** contiene i file necessari per usare un **modulo** (libreria includibile nel progetto).
- Installato automaticamente con Node.js.

**Comandi principali:**
```bash
npm install <pacchetto>[@versione] [--save] [-dev/-optional/-exact] [--global]
npm update [--save] [-dev/-optional] [--global]
npm list <pacchetto>
npm uninstall <pacchetto> [--save] [-dev/-optional]
npm publish
```

**Installazione Node.js**: da nodejs.org (LTS), verifica con `node -v`. Avvio interattivo: `node` senza argomenti. Esecuzione script: `node <flag> <script> <argomenti>`.

### Esempio "Hello World" con Node.js puro
```javascript
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
    console.log("Response sent");
}).listen(8080);
console.log("A node web server is running!");
```

### Deploy: NGINX come Reverse Proxy
Citazione dalle slide: *"Se nginx non è davanti al tuo server Node, probabilmente stai sbagliando"* (Bryan Hughes).

**NGINX**: web server, utilizzabile anche come reverse proxy, load balancer, HTTP cache. Gratuito e open source.

**Reverse Proxy Server**: si trova tipicamente dietro il firewall in una rete privata, dirige le richieste client al backend server appropriato. Aggiunge un livello di astrazione.

**Perché usarlo davanti a Node.js:**
- Semplifica gestione di privilegi e porte
- Serve in modo più efficiente i file statici (con cache)
- Nasconde l'identità del server Node.js → migliore gestione dei crash, mitigazione attacchi DoS
- Load balancing

---

## 3. Express.js

**Definizione**: Node.js web application framework **server-side, minimale e flessibile**. Facilita l'uso di Node.js, l'implementazione di API REST, supporta diversi template engine; il layer fornito non "oscura" le funzionalità di Node.js.

**Installazione**: `npm install express --save`

**Funzionalità principali:**
- Definizione di **middleware** per rispondere a richieste HTTP
- Definizione di **tabelle di routing** (azioni differenti in base a metodo HTTP + URL)

### Esempio "Hello World" con Express
```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

### Express Generator
Tool per creare velocemente la struttura di un'applicazione:
```bash
npm install express-generator
express --view=pug myapp
```

### Confronto Node puro vs Express
Lo stesso "Hello World" mostra come Express renda il codice più conciso e leggibile rispetto all'uso diretto del modulo `http` di Node.js (gestione esplicita di header/risposta vs `res.send()`).

---

## 4. MongoDB (cenni)

- Database **NON relazionale**, classificato come **NoSQL**.
- Niente tabelle relazionali: usa **documenti json-like** con **schema dinamico**.
- **Document-oriented**, cross-platform.

*(Approfondimenti tecnici su MongoDB sono probabilmente trattati nelle esercitazioni di laboratorio, non in dettaglio in queste slide teoriche)*

---

## 5. Angular: introduzione e Signature Stack

- Framework JavaScript **open source**, mantenuto da **Google**, per applicazioni single-page.
- Non è obbligatorio: il corso approfondisce in dettaglio la variante **MEVN** (con **Vue** al posto di Angular), pur introducendo MEAN; si confronteranno MEAN (Angular), MEVN (Vue) e MERN (React).

### Signature Stack
MEAN, LAMP, WAMP sono solution stack **standard**; esistono versioni "ibride" dette **signature stack**, personalizzate dalle aziende:

| Azienda | Web server | Database | Framework server-side | Linguaggi |
|---|---|---|---|---|
| **Uber** | NGINX, Apache | MySQL, PostgreSQL, MongoDB, Cassandra | Node.js | Python, Java, JavaScript, Objective-C |
| **Reddit** | NGINX | PostgreSQL, Redis, Cassandra | Node.js | JavaScript, Python |
| **Pinterest** | NGINX | MySQL, Hadoop, HBase, Memcached, Redis | Django, Javascript MVC | Python, Java, Go |
| **Facebook** | custom/proprietario | Cassandra, RocksDB, Beringei, Memcached | Tornado | PHP, GraphQL, Hack |
| **Airbnb** | NGINX | MySQL, Amazon RDS, Hadoop, Redis | Rails | JavaScript, Ruby, Java, Sass |

---

## 6. Single Page Application (SPA): motivazioni e framework JS

### Problemi delle applicazioni server-based tradizionali

**Lato client:**
- Pagina ricaricata completamente ad ogni richiesta.
- Attesa per il download di tutti i file (HTML, CSS, JS, immagini).
- Contenuto scaricato deve essere renderizzato da zero.
- Nessuna business logic client-side, nessun MVC.
- Senza rete, l'applicazione non funziona.

**Lato server:**
- Pagina rigenerata da zero ad ogni richiesta.
- Banda consumata per inviare sempre gli stessi file.
- Tutte le computazioni eseguite lato server.
- Cambio tecnologia → riscrittura completa del rendering.

### Definizione di SPA
> *"A Single Page Application is a web app in which the majority of interactions are handled on the client without the need to reach a server, with a goal of providing a more fluid user experience"*

**Vantaggi**: interazione app-like, bottoni indietro/avanti funzionanti, possibilità di funzionamento offline, transizioni fluide, CSS/JS inviati solo alla richiesta iniziale, cambiamenti via JavaScript con template e manipolazione del DOM.

### Limiti di jQuery per le SPA ("jQuery Ninja?")
- Lo stato dell'applicazione risiede nel **DOM**.
- Lo stato guida il comportamento (accoppiamento forte).
- Logica e presentazione accoppiate.
- Non pensato per gestire la logica di un'intera applicazione.

### Storia dei framework SPA
Conferenza **Throne of JS** (Toronto, 2012): gli sviluppatori dei principali framework JS si riuniscono per discutere le nuove architetture SPA.

### Cronologia dei framework principali

| Framework | Anno rilascio | Note |
|---|---|---|
| **AngularJS** | 2010/2012 | Prima release 2010, v1.0 nel 2012; al picco di popolarità (2014) annuncio di una riscrittura completa e incompatibile: **Angular 2** (rilasciato settembre 2016), poi v4 (marzo 2017)... fino a v15 (febbraio 2023). Dalla v2 si chiama solo "Angular" |
| **React** | 2013 | Rilasciato da **Facebook**, dopo ~2 anni di uso interno in produzione |
| **Vue.js** | 2014 | Creato da **Evan You**, ex sviluppatore Google che aveva usato intensamente AngularJS; pensato come alternativa "leggera" con bassa curva di apprendimento ma capace di scalare in complessità |

---

## 7. Confronto Angular vs React vs Vue.js

### Ecosistema (dati dalle slide)

| Framework | Stelle GitHub | Tagged questions StackOverflow | Pacchetti npm | Download npm/settimana |
|---|---|---|---|---|
| Angular | 80.5K | 274.5K | 65.660 | 2.792K |
| React | 185K | 376K | 227.918 | 20.024K |
| Vue.js | 195K | 91.5K | 74.110 | 3.954K |

### Supporto aziendale
- **Angular** → Google
- **React** → Facebook
- **Vue.js** → supporto da organizzazioni piccole/medie, principalmente via Patreon

### Curva di apprendimento e setup iniziale

**Angular**: esperienza iniziale più complessa. Richiede CLI:
```bash
npm install -g @angular/cli
ng new my-app
cd my-app && ng serve --open
```
Si lavora poi su componenti generati (es. `app.component.ts`). Si consiglia il tutorial "Tour of Heroes".

**React**: due guide ufficiali. La più semplice mostra l'Hello World:
```javascript
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```
Presuppone familiarità con ES6+ (let/const, classi, arrow functions `=>`). La guida step-by-step è completabile in ~1 ora.

**Vue.js**: installazione minima, basta un tag `<script>`:
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
La CLI (`vue-cli`) esiste ma è sconsigliata ai principianti. Sintassi basata su template:
```javascript
import {createApp} from 'vue'
createApp({
  data() { return {count: 0} }
}).mount('#app')
```
```html
<div id="app">
  <button @click="count++">Count is {{count}}</button>
</div>
```

**Ranking curva di apprendimento (dal più facile)**: Vue → React → Angular (quest'ultimo distanziato, essendo pensato per applicazioni di complessità elevata).

### Requisiti tecnici per framework

| Framework | Requisiti |
|---|---|
| React | JS (ES6+), **JSX** (estensione sintattica che mescola HTML/JS — non obbligatoria ma quasi sempre usata), CSS-in-JS |
| Vue.js | HTML, JS (ES5+ o ES6), CSS — sintassi tradizionale, attributi HTML custom per data-binding |
| Angular | **TypeScript** (necessario; sviluppatori da C#/Java si troveranno più a loro agio) |

**Esempio JSX (React):**
```javascript
function formatName(user) {
   return user.firstName + ' ' + user.lastName;
}
const user = { firstName: 'Harper', lastName: 'Perez' };
const element = ( <h1> Hello, { formatName(user)}! </h1> );
ReactDOM.render( element, document.getElementById('root') );
```

### Completezza

| Framework | Approccio | Strumenti |
|---|---|---|
| **Angular** | All-in-one | UI management, state management, routing, test e2e nativi |
| **React** | UI management | Per funzionalità avanzate serve estendere con librerie esterne (es. Redux, MobX per stato) |
| **Vue.js** | Progressivo, livello View | Core leggero + componenti ufficiali aggiuntivi (es. Vuex per state management centralizzato) |

Una soluzione full-featured (Angular) può non essere ottimale per applicazioni semplici o con tempi di sviluppo brevi. Vue e React offrono maggiore flessibilità tramite estensioni (ufficiali per Vue, ampio ecosistema terze parti per React).

### Performance
A causa della completezza "all-in-one", **Angular è il più pesante**, segue **React**, infine **Vue** (il più leggero/veloce nei benchmark, con deviazioni comunque contenute tra i tre).

### Perché Vue (sintesi)
Apprendimento rapido, vicino a HTML/CSS/JS "classico", espandibile progressivamente con la complessità dell'app, veloce e leggero.

---

## 8. VueJS — approfondimento tecnico

### Caratteristiche fondamentali
- Sviluppo di interfacce reattive con **dual-binding** tra modello dati e vista: si ragiona in termini di dati/variabili/oggetti, astraendosi dall'aggiornamento manuale del DOM.
- Framework **progressivo**: specializzato sulle viste HTML ma facilmente integrabile con componenti di altre librerie.
- Implementa il pattern **MVVM** (Model-View-ViewModel), declinazione di MVC.

### MVVM: i tre componenti
- **Model**: implementazione del dominio dati (come la "M" di MVC).
- **View**: componente grafico renderizzato (HTML + CSS).
- **ViewModel**: collante tra Model e View; fornisce alla view i dati nel formato adatto e il comportamento dei componenti dinamici.

### MVC vs MVVM — la differenza chiave
- **Controller** (MVC): codice che esegue business logic (con i Model) e **ritorna una View** da mostrare.
- **ViewModel** (MVVM): modello parallelo al Model, **bindato direttamente** alla View, descrive il comportamento di quest'ultima (es. funzioni associate al click).
- Il Controller esegue logiche **prima** del rendering della View; il ViewModel definisce il comportamento **a runtime**.

Vue si focalizza sul **ViewModel layer** che connette View e Model tramite **two-way data binding**.

### Declarative rendering
Vue usa template HTML con attributi speciali (**direttive**). Il framework compila il template in un **Virtual DOM**, che permette: reattività dei contenuti, modifiche alla pagina solo quando davvero necessarie (efficienza).

### Data-binding e interpolazione
**Mustache syntax** (`{{...}}`) per l'interpolazione di testi:
```html
<div id="app"> {{ message }} </div>
```
```javascript
Vue.createApp({
  data() {
    return { message: 'Hello World!' }
  }
}).mount('#app')
```

### Direttive
Attributi HTML speciali con prefisso `v-`, nella forma `v-{direttiva}:{argomento}`. Esempi: `v-bind` (binding di attributi), `v-on` (associa funzione a evento, es. `v-on:click`).

**Alias rapidi:**
- `v-bind:attributo` → `:attributo`
- `v-on:click` → `@click`

**Modificatori** (su `v-on`): `.stop` (blocca propagazione/bubbling), `.prevent` (previene comportamento default, es. `event.preventDefault()`), `.capture` (invoca prima sul padre), `.self` (solo se il nodo è il target diretto), `.once` (esegue una sola volta).
Modificatori tastiera: `.enter`, `.tab`, `.delete`, `.esc`, `.space`, `.up/.down/.left/.right`, `.ctrl`, `.alt`, `.shift`, `.meta`. Modificatori mouse: `.left`, `.right`, `.middle`.

### Computed Properties
Proprietà che assumono valori dinamici basati su altre proprietà, e reagiscono come proprietà statiche:
```javascript
Vue.createApp({
  data() {
    return { firstname: 'Gigi', lastname: 'Rossi' }
  },
  computed: {
    fullname: function() {
      return this.firstname + ' ' + this.lastname;
    }
  }
}).mount('#app')
```
Vue implementa un albero di dipendenze/eventi: al cambio di una proprietà, sa esattamente quali computed properties rigenerare. Vantaggio aggiuntivo: **caching** (rigenerate solo se le dipendenze cambiano). Di default sono in sola lettura, ma è possibile definire anche un comportamento in scrittura.

### Rendering condizionale e cicli
- **Condizionale**: `v-if`, `v-else-if`, `v-else`.
- **Cicli**: `v-for` (cicla array numerici e associativi, accesso a valore e indice). Se coesistono `v-for` e `v-if` sullo stesso nodo, `v-for` ha priorità.

### Classi e stili dinamici
```html
<!-- Sintassi a oggetto -->
<div :class="{ 'my-class-name' : hasClass }"></div>
<div :class="{ 'my-class-name-1' : hasClass1, 'my-class-name-2' : hasClass2 }"></div>

<!-- Sintassi ad array -->
<div :class="['my-class-name']"></div>

<!-- Stili inline -->
<div :style="myCustomStyles"></div>
<div :style="[myCustomStyles, { width: '100px' }]"></div>
```

### Gestione eventi
```html
<button v-on:click="onClickButton">Click</button>
```
```javascript
methods: { onClickButton: function() { alert('Button clicked!'); } }
```
Preferibile rispetto a codice JS inline nell'attributo.

### Form e input: v-model
Binding bidirezionale di un campo form a un modello dati:
```html
<input type="text" v-model="myText"> {{ myText }}
```
Direttive correlate per checkbox/radio: `v-bind:true-value`, `v-bind:false-value`, `v-bind:value`.

**Modificatori di v-model:**
- `.lazy` → usa l'evento `change` invece di `input` (utile per task onerosi, limita interattività per ragioni di performance)
- `.number` → conversione automatica a numero
- `.trim` → rimuove spazi iniziali/finali

### Componenti
Permettono di organizzare il codice in **moduli riutilizzabili e ben strutturati**, fondamentali per applicazioni medie/grandi. Ogni componente = HTML + business logic incapsulata + eventuale CSS dedicato.

**Uso**: custom tag (`<mio-componente></mio-componente>`) oppure attributo `is`.

**Registrazione:**
- **Globale**: il componente è disponibile in tutta l'app (`app.component("hello-world", HelloWorld)`).
- **Locale**: disponibile solo all'interno del componente che lo registra (utile per relazioni gerarchiche tipo `<tab-panel>` dentro `<tabs>`); non utilizzabile da componenti discendenti.

**Opzione `data`**: nei componenti **deve essere una funzione** (non un oggetto), per evitare che istanze multiple condividano/sovrascrivano gli stessi dati.

**Opzione `template`**: tre modalità — come stringa, come nodo esterno (tag `<template>` o `<script type="text/x-template">`, utile per template complessi), inline (attributo `inline-template`, per istanze con template differenti).

**Props**: proprietà esterne per configurare un componente (ogni componente ha scope isolato). Definite a priori con tipo (String, Boolean, Number...), obbligatorietà (`required`), valore di default. Possono essere statiche o dinamiche (legate a variabili esterne).

**One-way data flow**: le prop fluiscono dall'alto verso il basso; non possono essere modificate dal componente che le riceve (genera un warning in console se tentato).

**Eventi custom**: comunicazione dal componente verso l'esterno tramite `$on` (ascolto, spesso sostituito da `v-on`) e `$emit` (generazione evento). Dalla v2.3.0 esiste il modificatore `sync` per propagare rapidamente modifiche verso il componente padre.

**Comunicazione tra componenti non correlati**: si crea un'istanza extra di Vue come **bus di eventi**, su cui i componenti interessati si mettono in ascolto.

**Slot**: porzioni di template configurabili dall'esterno di un componente, mixate al template originale — utili quando il template statico non basta a coprire varianti dinamiche.

**Best practice per componenti riutilizzabili (3 regole):**
- **Props** → per passare dati dal contesto esterno al componente.
- **Eventi** → per influenzare il contesto esterno dall'interno del componente.
- **Slot** → per influenzare il contenuto del componente dal contesto esterno.

**Direttive personalizzate**: possibilità di creare direttive custom (richiamabili come `v-if`, `v-model`), utili per interagire direttamente col DOM tramite plugin esterni o API native del browser.

---

## 9. TypeScript

### Problematiche di JavaScript
Nessuna compilazione, tipizzazione dinamica, variabili globali, Abstract Equality Comparison Algorithm (comparazioni implicite ambigue), inconsistenze di scope, modello prototype-based, difficile organizzazione architetturale su larga scala.

*(Aspetti positivi: setup immediato, ecosistema enorme, e soprattutto l'unica vera opzione per computazione lato client su browser — paradigma "JavaScript Everywhere" esteso anche a mobile e server)*

### Linguaggi superset (transpiled-to-JS)
Per superare i limiti di JS sono nati linguaggi che **compilano in JavaScript**: CoffeeScript, **TypeScript**, ClojureScript, Haxe, Scala.js, Dart (Google). Visione di fondo: *"JavaScript is assembly language for the web"*.

**Compilazione source-to-source** (transpiling), diversa dalla compilazione classica source-to-binary: il transpiler controlla errori e genera nuovo codice sorgente (in JS).

### TypeScript: definizione
> *"TypeScript is a typed superset of JavaScript that compiles to plain JavaScript"* — "Any browser. Any host. Any OS. Open source." (Anders Hejlsberg, co-fondatore, Microsoft)

Obiettivo: rafforzare JS con classi, moduli e tipizzazione statica, senza sacrificarne l'apertura e la cross-platformità.

### Funzionalità principali
1. **Tipizzazione statica**
2. **Funzioni** (avanzate)
3. **Classi**
4. **Interfacce**
5. **Moduli**

### Tipizzazione statica
Annotazione di tipo **opzionale**, puramente a design-time (nessun codice aggiuntivo nel JS prodotto):
```typescript
var age: number = 40;     // TypeScript
var age = 40;              // JavaScript compilato
```
Errore in compilazione se si assegna un tipo errato (es. `var age: number = 'forty'` → errore).

**Static Types**: Primitive, Array, Enum, Any.

**Primitive Types:**
- `boolean`
- `number` — nessuna distinzione int/float (tutto floating point); attenzione a `0.1 + 0.2 !== 0.3` (problema classico di floating point, non specifico di TS)
- `string` — apici singoli o doppi indifferentemente, nessun tipo `char`
- `void`, `null`, `undefined`

**Array**: `var cities: string[] = ['Cesena', 'Bologna', 'Ravenna'];`

**Enum**: simile a C#, 0-indexed di default, indice personalizzabile:
```typescript
enum Color{Red, Green, Blue}
enum Color{Red = 1, Green, Blue}  // indice custom
```

**Any**: rinuncia al type-checking, utile per input utente o librerie esterne non tipizzate:
```typescript
var notSure: any;
notSure = 2;
notSure = 'hello';
```

**Type Inference**: TypeScript inferisce il tipo dal valore assegnato (es. `var x = 175` → inferito `number`); un successivo assegnamento di tipo diverso genera errore.

**4 modi di dichiarare una variabile:**
1. Tipo e valore insieme: `var msg: string = 'hello';`
2. Tipo senza valore (valore = `undefined`): `var msg: string;`
3. Valore senza tipo (tipo inferito): `var msg = 'hello';`
4. Né tipo né valore (tipo `any`, valore `undefined`): `var msg;`

### Funzioni
TypeScript aggiunge: tipi per parametri/ritorno, parametri opzionali e di default, function overload.
```typescript
function add(x:number, y:number):number{ return x+y; }
add(2,3);        // ok
add(2,'Hello');  // errore di tipo

function display(msg:string, user:string = 'du'){ alert(msg+' '+user); }
display('hello');         // "hello du"
display('hello','world'); // "hello world"

// Function overload
function add(var1:string, var2:string):string;
function add(var1:number, var2:number):number;
```

### Classi
Supporto a field/property pubblici e privati, getter/setter, costruttori (keyword `constructor`, sempre pubblico), metodi statici, **ereditarietà** (`extends`, `super`):
```typescript
class Person {
  constructor(public name:string, public age:number) {}
  showInfo(){ alert("Name: " + this.name + " Age: " + this.age); }
}
class Employee extends Person {
  constructor(name, age, public salary:number) {
    super(name, age);
  }
}
```

### Interfacce
Definite con `interface`, esistono solo a **design-time** (se compilate, producono file vuoto):
```typescript
interface Employee {
  FirstName: string;
  LastName?: string;  // proprietà opzionale con "?"
  Age: number;
}
```

### Moduli
Definiti con `module`. Possono contenere moduli, classi, interfacce, enum (**non** funzioni). Classi/interfacce esposte con `export`:
```typescript
module Utils {
  export class Math {
    public add(x:number, y:number): number { return x+y; }
  }
  class Helper { help(){} }  // non accessibile fuori dal modulo
}
var m = new Utils.Math;
m.add(20,30);
```

### Perché TypeScript: vantaggi sintetici
- **Intellisense**: autocompletamento avanzato nell'IDE.
- **Type-checking statico**: tipo noto a tempo di compilazione.
- **Compilazione**: il compilatore `tsc` (TypeScript Compiler) produce JS a partire da TS, in tre modalità (1:1 file, intera cartella, file sorgente + referenziati). Configurabile via `tsconfig.json`.

### Integrazione con JavaScript
Codice JS puro all'interno di sorgenti TS viene riportato inalterato nel JS compilato. Per usare librerie JS pure mantenendo i vantaggi di TS, storicamente si usava **Typings** (manager di file di definizione dei tipi, gestito dalla community su GitHub — con rischio di definizioni assenti, errate o disallineate). In assenza di definizioni: scriverle manualmente o usare `any`.

**Installazione**: `npm install -g typescript` e `npm install -g typings`.

---

## 10. Angular — approfondimento tecnico

### Definizione
Framework **open-source** per SPA; **completa riscrittura in TypeScript** di AngularJS, stesso team di sviluppo, manutenuto principalmente da **Google**. Fa parte dello stack MEAN.

**Linguaggi supportati**: TypeScript (consigliato), Dart, JavaScript.

### Angular CLI
```bash
npm install -g angular-cli
ng new appname    # crea un nuovo progetto
ng serve --open   # serve l'applicazione (richiede cd appname)
ng build --prod --bh /myUrl/   # build di produzione
```

### NgModules
Ogni applicazione Angular ha almeno un modulo (root, tipicamente `AppModule`). Un **NgModule** è una classe con decoratore `@NgModule`:
```typescript
@NgModule({
  declarations: [ AppComponent ],
  imports: [ HttpModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Proprietà principali di `@NgModule`:**
- `declarations` — view classes (component, directive, pipe) del modulo
- `exports` — sottoinsieme di `declarations` visibile ad altri moduli
- `imports` — classi esportate da altri moduli necessarie a questo
- `providers` — servizi aggiunti alla collezione globale, accessibili ovunque
- `bootstrap` — application view principale (solo nel modulo root)

### Components e Metadata
I **Component** sono le unità base della UI: un'applicazione Angular è un **albero di componenti**. Un Component è una classe con decoratore `@Component`.

**Proprietà principali di `@Component`:**
- `selector` — selettore CSS identificativo
- `template` / `templateUrl` — template inline o file esterno
- `style` / `styleUrls` — stile inline o file esterno (se entrambi presenti, vince l'ultima proprietà definita, nessuna priorità formale)

**Esempio decomposizione in componenti** (caso d'uso "Inventory Management App"): Navigation Component, Breadcrumbs Component, Product List Component → ulteriormente scomponibile in Product Row → Product Image, Product Department, Price Display (struttura ad albero gerarchica).

### Lifecycle Hooks (in ordine di chiamata, dopo il costruttore)
1. `ngOnChanges` — prima di `ngOnInit` e ad ogni cambio di una input property
2. `ngOnInit` — all'inizializzazione del componente
3. `ngDoCheck` — ad ogni ciclo di cambiamento
4. `ngAfterContentInit` — dopo la proiezione di contenuti esterni nella vista
5. `ngAfterContentChecked` — dopo il controllo dei contenuti esterni bindati
6. `ngAfterViewInit` — al termine del rendering della vista (inclusi i figli)
7. `ngAfterViewChecked` — dopo il controllo dei binding sulle viste (inclusi i figli)
8. `ngOnDestroy` — prima della distruzione del componente (luogo corretto per fare unsubscribe degli Observable, onde evitare memory leak)

### Data Binding

**Interpolation** (`{{ }}`): l'espressione viene valutata e convertita in stringa; vietate espressioni con side-effect.

**Property Binding** (`[ ]`): l'espressione viene valutata e assegnata a un attributo del DOM.
```html
<!-- Interpolazione -->
<img src="{{heroImageUrl}}">
<!-- Property binding equivalente -->
<img [src]="heroImageUrl">

<!-- Caso in cui serve property binding (non solo testo) -->
<span [innerHTML]="title"></span>
```
Angular traduce internamente le interpolazioni in property binding equivalenti prima del rendering; nessun motivo tecnico per preferire l'una o l'altra — per leggibilità si preferisce l'interpolazione.

**Event Binding** (`( )`):
```html
<button (click)="onSave()">Save</button>
```

**Two-way Data Binding** (sintassi "banana in a box" `[( )]`, unione di property + event binding):
```html
<input [(ngModel)]="element" />
<!-- equivalente a -->
<input [ngModel]="element" (ngModelChange)="element = $event" />
```

### Pipes
Trasformazioni di un valore scritte direttamente nel template:
```html
<p>Testo {{ value | pipe }}</p>
<p>Today is {{ curdate | date:"dd/MM/yy" }}</p>  <!-- parametrizzabile, concatenabile -->
```
**Pipe built-in**: `DatePipe`, `UpperCasePipe`, `CurrencyPipe`, `PercentPipe`. Pipe custom create con decoratore `@Pipe`.

### Direttive
Tre tipi:
- **Components** — direttive con template
- **Direttive strutturali** — modificano il layout DOM (aggiunta/rimozione elementi); prefisso `*`
- **Direttive d'attributo** — modificano aspetto/comportamento di un elemento esistente

**Direttive strutturali built-in:**
- `*ngIf="condizione"` — mostra/rimuove l'elemento dal DOM in base a un'espressione (falsy → rimosso)
- `*ngSwitch` + `*ngSwitchCase` + `*ngSwitchDefault` — visualizzazione condizionale multi-caso
- `*ngFor="let item of items"` — itera su array (numerici o di oggetti); sintassi estesa con `index as i`, e valori esportati `first`, `last`, `even`, `odd`

```html
<ul *ngFor="let city of cities; index as i; odd as isOdd">
   <li [ngClass]="{odd: isOdd}">{{i}} - {{city}}</li>
</ul>
```

**Direttive d'attributo built-in:**
- `ngClass` — set/cambio di classi CSS condizionali
- `ngNonBindable` — esclude una sezione dal binding/compilazione
- `ngStyle` — set di proprietà CSS dinamiche

**`<ng-container>`**: elemento di raggruppamento "invisibile" (non aggiunto al DOM da Angular), utile quando non si ha un contenitore reale o si vuole applicare una direttiva a semplice testo.

### Services e Dependency Injection
Un **servizio** = classe con scopo ben definito (es. logging, caricamento dati). Angular non impone una classe base o un luogo di registrazione.

**Components vs Services**: il Component gestisce la UX; non dovrebbe caricare dati dal server né validare input — questi compiti vanno **delegati ai servizi**.

**Dependency Injection (DI)**: meccanismo per fornire un'istanza di classe con le dipendenze già pronte. Angular determina i servizi necessari a un componente dai **tipi dei parametri del costruttore**. Un **injector** mantiene un container di istanze già create; se manca, ne crea una nuova.

**DI gerarchica**: segue la gerarchia dei componenti — se un injector non trova il servizio, risale all'injector del componente padre.

**Dichiarazione di un servizio**: a livello di bootstrap dell'app (istanza condivisa da tutti i componenti) oppure a livello di componente (istanza condivisa solo da quel componente e dai suoi figli).

### Forms
- `FormControl` — incapsula input del form + stato (valido, "sporco", con errori)
- `FormGroup` — wrapper di una collezione di FormControl
- `Validator` — validazione dell'input
- `Observer` — rilevazione/reazione ai cambiamenti

### HTTP
Libreria HTTP nativa per chiamate asincrone (`get`, `post`, `put`, ecc.). Tre approcci classici alla programmazione asincrona: **Callback**, **Promise**, **Observable**. Angular adotta gli **Observable** (incorpora RxJS internamente) — i metodi HTTP restituiscono Observable.

### Routing
Modulo **Router** per navigazione SPA:
1. tag `<base href="...">` nella pagina principale
2. definizione delle rotte (array di oggetti path → component)
3. direttiva `router-outlet` nella view principale
4. link con attributo `routerLink`

### Data Architecture
Angular è flessibile e non impone un'architettura specifica. Modalità più diffuse: **MVC / Two-way data binding**, **Flux** (flusso dati unidirezionale), **Observables** (subscribe a stream di dati).

### Compatibilità AngularJS ↔ Angular
Possibili **applicazioni ibride** che eseguono contemporaneamente AngularJS e Angular — utile per migrazioni incrementali.

### NativeScript (cenno)
Framework cross-platform per mobile basato su JS/TypeScript/Angular; a differenza di soluzioni webview-based, usa **componenti UI nativi** (come React Native, Xamarin) → migliori performance.

### Style Guide
Angular ha una Style Guide ufficiale su sintassi, convenzioni, struttura, con raccomandazioni classificate in: **Do** (sempre da seguire), **Consider** (generalmente da seguire), **Avoid** (mai da fare), **Why?** (motivazione).

---

## Punti chiave da ricordare per l'esame

- Saper motivare il passaggio da LAMP a MEAN e spiegare il paradigma "JavaScript everywhere".
- Conoscere a fondo **Node.js**: modello event-driven single-threaded vs thread-based, vantaggi/svantaggi, casi d'uso (DIRT application).
- Saper scrivere e spiegare un minimo server **Express** (routing, middleware) e il confronto col Node.js puro.
- Conoscere il confronto **Angular vs React vs Vue** su storia, ecosistema, curva di apprendimento, completezza, performance — argomento molto probabile come domanda di teoria.
- Sapere che Vue implementa **MVVM**, distinguerlo chiaramente da MVC (Controller vs ViewModel).
- Conoscere bene le **direttive Vue** principali (`v-bind`, `v-on`, `v-model`, `v-if`, `v-for`) e il concetto di **componenti** (props, eventi custom, slot, registrazione locale/globale).
- Saper spiegare perché esiste **TypeScript** (superset, transpiling, tipizzazione statica) e le sue feature principali (tipi, classi, interfacce, moduli).
- Conoscere l'architettura **Angular**: NgModules, Components, data binding (interpolation/property/event/two-way), direttive strutturali e d'attributo, Services e Dependency Injection, routing.
- Dato che il corso approfondisce **MEVN** (Vue al posto di Angular) durante le esercitazioni pratiche, è probabile che il progetto richieda Node.js + Express + MongoDB + Vue.js: utile avere ben chiaro questo stack per l'elaborato.

---

## Risorse di approfondimento citate nelle slide
- mean.io, nodejs.org, expressjs.com, npmjs.com
- *Why the Hell Would You Use Node.js* (Medium, The Node.js Collection)
- vuejs.org (guida ufficiale)
- angular.io (sito e documentazione ufficiale, tutorial "Tour of Heroes")
- typescriptlang.org (documentazione e playground)
- reactjs.org (introduzione a JSX)
- html.it (guide Vue.js, ECMAScript 6, confronto Angular/React/Vue, direttive personalizzate)
- Benchmark framework JS: stefankrause.net/js-frameworks-benchmark6
