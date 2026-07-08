# Blocco C — HCI e Superset per i Fogli di Stile

> Corso: Applicazioni e Servizi Web (magistrale) — Prof.ssa Silvia Mirri
> Riassunto da slide: *C - HCI e superset per i fogli di stile*

---

## PARTE I — HCI: Metodologie per il Design

### 1. Interazione e Interfaccia: concetti base

**Norman's Door**: esempio classico (Donald Norman) di come oggetti di uso quotidiano (es. porte spinte invece di tirate) generino nell'utente una falsa sensazione di incapacità personale: la colpa non è dell'utente ma di chi ha progettato l'oggetto senza considerare i normali processi mentali. Vale ancora di più per l'interazione con dispositivi digitali.

> **Donald Norman**: ingegnere elettronico (MIT), psicologo cognitivo (UC), professore emerito MIT, ex VP ricerca tecnologie avanzate Apple, co-fondatore del Nielsen Norman Group (1998, con Jakob Nielsen).

**Definizioni chiave:**
- **Interfaccia utente**: componente del software che permette all'utente di comunicare/interagire con le altre parti dell'applicazione (es. la maniglia di una porta).
- **Interazione**: relazione tra utente e sistema — azioni dell'utente + reazioni/feedback del sistema (es. *come* si usa la maniglia).

**HCI (Human Computer Interaction)**: disciplina intrinsecamente **interdisciplinare** che studia l'interazione utente-computer per progettare sistemi usabili, affidabili e che supportino le attività umane. Necessaria per gestire contesti d'uso, obiettivi utente, nuove tecnologie, competenze diverse, scopo dell'applicazione.

L'evoluzione delle metodologie HCI ha visto un ruolo via via più **attivo** degli utenti nei processi di design.

---

### 2. Metodologie e strumenti per il design (coinvolgimento utenti)

#### User Centered Design (UCD)
Nato a metà anni '80. Il team di sviluppo si focalizza sui **bisogni degli utenti**, in modo iterativo — ma non richiede necessariamente il coinvolgimento di utenti reali per tutto il processo (possono essere coinvolti solo nel testing, o "virtualizzati" tramite personas).

Caratteristiche utente da considerare: competenza, abilità fisica, livello di attenzione, motivazioni. Necessario comprendere requisiti utente e fare focus sui task.

#### Approcci partecipativi / Participatory Design (Co-design)
Approccio più "inclusivo": gli utenti target sono **fisicamente coinvolti** in tutte le fasi (non solo testing), a volte facendo parte del team di sviluppo stesso (**co-designer**), proponendo design issue, funzionalità, servizi. Sviluppatori e ruolo del designer "sfoca" rispetto a quello dell'utente.

**UCD vs PD**: confine dibattuto; un'interpretazione comune è che PD è user-centered quando si focalizza sugli interessi degli utenti finali — PD può essere visto come un "approfondimento" di UCD.

#### Co-creation e Open Innovation
- **Co-creation**: coinvolge gli utenti anche nella definizione di requisiti **e goal** (non solo design).
- **Open Innovation**: collaborazione attiva tra organizzazioni diverse, con condivisione di proprietà intellettuale.

---

### 3. Target user: Personas e Scenari d'uso

**Analisi del target**: non tutti gli utenti, ma il target specifico (età, motivazioni, interessi, scopo).

#### Personas
Utenti finti che incarnano le caratteristiche che il progetto vuole sostenere — archetipi astratti di intenzioni, scopi, abitudini. Informazioni da fornire: scopi/motivazioni, atteggiamenti/comportamento, storia (nome, età, lavoro, educazione, contesto familiare, aspetto).

**Cattive personas** (classe di utenti rappresentati troppo grande o troppo piccola):
- L'**utente elastico** (troppo generico/ampio)
- L'**utente anarchico**, il **caso sociale**, l'**utente auto-referenziale** (copia del progettista stesso) — tutti troppo specifici/poco rappresentativi

**Buone personas**: niente "persona media" (nessuno scrive storie interessanti su persone medie) — meglio una persona **interessante**, tipica ma non banale, con personalità propria e memorabile.

**Specificità**: serve dettagliare utente e storia prima dei task.
- ❌ "L'utente è uno studente che usa Ubuntu"
- ✅ "L'utente è Marco, uno studente curioso e socievole... appassionato di Linux grazie alla sua prof di informatica..."

**Importante**: un utente reale (es. "il vero Marco") **non va bene** come Persona — ha peculiarità/idiosincrasie che un utente virtuale non deve avere. La Persona deve rappresentare **molti** utenti diversi con una caratteristica comune (es. anziani, bambini, dipendenti aziendali, giocatori online).

#### Scenario d'uso
Storia dettagliata di come un utente porta a termine un goal personale attraverso uno o più task. Caratteristiche: descrive l'interazione persona-sistema, descrive **task** (non comandi dell'interfaccia), è molto specifico, descrive un'azione completa, descrive utenti come persone.

---

### 4. Storyboard, Sketch, Mockup

**Storyboard**: tecnica per illustrare in immagini la struttura di esecuzione di un task, mostrando lo stato dello schermo nelle varie fasi (succedersi di pagine, attivazione di widget).

Può essere realizzato con:
- **Disegni/Sketch** a mano
- **Mockup** — rappresentazione grafica dell'interfaccia, realizzabile con tool dedicati:
  - **Balsamiq** (https://balsamiq.com/) — ideato da Giacomo "Peldi" Guilizzoni, laureato a Bologna
  - **Mockup** (mockup.io)
  - **Pencil**
  - **Figma** — editor vettoriale e tool di prototipazione UX/UI

---

### 5. Focus Group

Metodologia usabile sia in fase di analisi requisiti sia in fase di design (per confermare/modificare scelte già prese). Permette di esplorare vantaggi/svantaggi di un insieme limitato e predefinito di funzionalità.

**Caratteristiche**: 8-12 partecipanti ideali; intervista di gruppo con discussione guidata; può essere supportato da mockup/sketch/storyboard; durata consigliata **1,5-2 ore**.

**Cosa permette**: raccogliere opinioni/feedback, testare assunzioni iniziali, incoraggiare discussione su un topic, far emergere aspetti inattesi.

**Step del Focus Group:**
1. **Preparazione**: individuazione partecipanti e moderatori (moderatore + co-moderatore), lista topic, planning (agenda, inviti, spazi, layout)
2. **Conduzione**: gestione tempi, registrazione audio/video + note, fairness (feedback da tutti)
3. **Analisi risultati** e report conclusivi

---

### 6. Experience Prototyping

Idea di fondo: creare un'esperienza completa per immergere l'utente nel contesto d'uso. Il prototipo può essere uno storyboard (disegni/sketch/mockup, anche interattivi) o un'app in versione beta — **non** deve essere completo, può focalizzarsi sulle funzionalità principali/peculiari.

**Modalità**: 1 utente per volta, **3-4 task** al massimo per sessione. Si chiede all'utente come interagirebbe e che feedback si aspetta; contesto realistico, simulazione molto realistica. Necessaria registrazione (audio/video/foto).

Metodologia spesso usata in contesti **mobile**, sia in design sia in testing (specialmente AGILE).

**Step:**
1. **Preparazione**: obiettivi, modelli del prototipo, partecipanti, definizione task; planning (scheduling, facilitatori, materiali)
2. **Conduzione**: simulazione dell'interazione, think aloud protocol, interviste pre/post test, questionari
3. **Analisi risultati** e report

**DOs and DON'Ts:**
- **DO**: prototipi creati velocemente, testati, base per miglioramenti — non serve che siano belli, conta l'idea; non importa se "falliscono", conta il feedback
- **DON'T avere paura di**: osare, usare l'immaginazione — i prototipi **non devono essere funzionanti**, possono essere accompagnati da spiegazioni a voce

#### Think Aloud Protocol (valutazione cooperativa)
Osservazione del "pensiero ad alta voce" dell'utente durante lo svolgimento di task. Introdotto da **Clayton Lewis** (IBM), nel lavoro *"Task-Centered User Interface Design: A Practical Introduction"*.

Il partecipante verbalizza tutto ciò che pensa/guarda/fa/sente; l'osservatore prende nota **senza interpretare né interferire**. Sessioni audio/video-registrate (preferibile anche il video per le reazioni).

#### Co-discovery Learning
Variante di Experience Prototyping + Think Aloud: partecipanti **in coppie**, discutono tra loro durante l'esecuzione dei task. Considerato **più realistico** del singolo utente — i commenti risultano spesso più chiari, perché è più naturale "vocalizzare" pensieri a un collega che a un osservatore. Consigliati **almeno 6 partecipanti (3 coppie)**.

Misure raccolte: tempo per task, numero di task corretti, frequenza/tipo errori, ricorso a manuale/help (quantitativo) + successo del sistema, qualità interfaccia, sforzo richiesto (qualitativo).

---

## PARTE II — HCI: Evoluzione, Definizioni, Usabilità

### 7. Evoluzione terminologica della disciplina

| Termine | Periodo/origine | Focus |
|---|---|---|
| **Human Performance** | XX secolo | Applicazione del taylorismo: l'uomo come "macchina" da ottimizzare |
| **Ergonomia (Ergonomics)** | 2a guerra mondiale, UK | Adattare le macchine (es. armi) alle caratteristiche fisiche umane; poi: interazione persone-macchine e funzione di progetto |
| **Human Factors** | Anni '60, USA | Termine americano equivalente a "ergonomics", con focus anche su fattori cognitivi: limitare errore umano, aumentare produttività, migliorare sicurezza/comfort |
| **Ergonomia cognitiva** | — | Intersezione tra ergonomia e HCI; studia processi cognitivi (percezione, attenzione, memoria, linguaggio, emozioni); si basa sul **modello mentale** dell'utente |
| **Man-Machine Interaction** | Anni '70 | Ergonomia si divide: design vita quotidiana (resta "ergonomics") vs usabilità oggetti di lavoro (diventa "interazione uomo-macchina") |
| **Human-Machine Interaction** | Anni '80 | Ruolo crescente dei computer → campo specifico, centrato su software & hardware design |
| **User Interface** | — | Visione più ristretta, solo gli aspetti con cui l'utente è a contatto; da qui **user friendliness** (semplice da usare/imparare) |
| **Interaction Design (IXD)** | — | Approccio multidisciplinare: facilitare l'uso/interazione con device, hardware/software, servizi |
| **User Experience (UX)** | — | Relazione persona-sistema/prodotto/servizio; molto soggettiva, basata su comportamenti/bisogni; si focalizza sulla relazione, non sul prodotto in sé |

### Definizioni di User Experience (UX)
- **ISO 9241-210**: percezione soggettiva e risposte risultanti dall'uso/aspettative d'uso di un prodotto/sistema/servizio.
- **Nielsen & Norman (NNGroup)**: tutti gli aspetti dell'interazione di un utente finale con un'azienda, i suoi servizi, i suoi prodotti. *Importante distinguere UX da UI*: una UI perfetta non garantisce una buona UX se, ad esempio, l'utente non trova le informazioni che cerca.
- **Interaction-design.org**: qualità dell'esperienza di una persona nell'interagire con un progetto specifico.
- **Hassenzahl & Tractinsky**: conseguenza dello stato interno dell'utente (predisposizione, aspettative, bisogni, umore) + caratteristiche del sistema (scopi, usabilità, funzionalità, complessità) + contesto/ambiente dell'interazione.

---

### 8. Usabilità e standard ISO

> **Jakob Nielsen**: informatico danese, dottorato in Design dell'interfaccia utente; lavorato in Bellcore, IBM, Sun Microsystems; nel 1991 predisse il futuro degli ipertesti nel design UI; considerato il guru dell'usabilità (con Norman), massima autorità sull'usabilità web.

**Definizioni di Usabilità:**
- **Wikipedia**: apprendibilità e facilità d'uso di un artefatto umano.
- **Usability.net**: rendere prodotti/sistemi più facili da usare, più vicini alle esigenze degli utenti.
- **ISO 9241-11**: quanto un prodotto può essere usato da uno specifico utente per raggiungere scopi specifici con **efficacia, efficienza e soddisfazione** in uno specifico contesto d'uso.

**6 principi chiave dell'usabilità:**
1. Progettazione basata su analisi esplicita di utente, task, ambiente
2. Utenti coinvolti in tutte le fasi
3. Progetto guidato/raffinato da valutazioni centrate sull'utente
4. Processo iterativo
5. Il progetto considera l'intera user experience
6. Team multidisciplinare

#### Confronto ISO 9241-11 vs Nielsen

| ISO 9241-11 | Jakob Nielsen |
|---|---|
| **Efficacia**: completezza dei task | **Apprendibilità**: facilità per utenti inesperti |
| **Efficienza**: minimalità tempo/risorse | **Efficienza**: prestazioni continuative (utenti esperti) |
| **Soddisfazione**: comfort, atteggiamento positivo | **Memorizzabilità**: facilità nell'uso intermittente |
| | **Errori**: frequenza errori catastrofici/minori |
| | **Soddisfazione**: piacevolezza soggettiva |

**Direttiva Europea 90/270/EEC (1990)**: richiede che il software sia adatto al compito, facile da usare e adattabile all'esperienza dell'utente, capace di dare feedback, in grado di visualizzare informazioni in formato/velocità adatti, conforme ai principi di ergonomia.

---

### 9. Principi e metodologie per lo sviluppo

#### Responsive Design
Tecnica di Web design per pagine che si adattano automaticamente ai dispositivi (PC, tablet, smartphone, web TV), riducendo resize/scroll manuale. Migliora UX e gioca un ruolo importante per l'**accessibilità** (disabilità sensoriali, fisiche, cognitive). Metafora del **layout liquido**: il contenuto si adatta ad ogni "recipiente" (device) senza forma prefissata.

**Requisiti tecnici**: dimensioni relative (% invece di px assoluti), immagini flessibili, **media query CSS3** per attivare regole di stile diverse su viewport/width.

#### Mobile First
Progettare prima per i device più "limitanti" (display piccolo, input limitati, capacità di calcolo/connessione ridotte), poi estendere a device meno limitanti. Diffuso con le Web App e app mobile. Correlato a Responsive Design, **Unobtrusive JavaScript** e **Progressive Enhancement** (creare una versione base e poi "incrementarla" per device più moderni, dato che vecchi smartphone potrebbero non supportare JS/media query).

#### KISS (Keep It Simple, Stupid/Silly)
Nato negli anni '60 nella marina militare USA (ingegneria navale/aviazione). Principio: la maggior parte dei sistemi funziona meglio se mantenuto semplice. Varianti: "keep it short and simple", "keep it simple and straightforward", "keep it small and simple".

#### Less is More
Associato a KISS. Nielsen lo importa dall'architettura minimalista (fine anni '90): per un'interfaccia efficace, eliminare tutti gli elementi non strettamente necessari all'interazione (es. usare spazio bianco come separatore invece di linee/bordi — vedi Google).

**Applicazione pratica** (Nielsen): analizzare ogni elemento grafico del prototipo e rimuovere ciò che non ha funzione fondamentale.

#### Conformità a standard d'uso
Uso di elementi grafici, icone, colori e elementi di interazione **coerenti con il modello mentale** dell'utente — basato su convenzioni condivise e abitudini pregresse (es. il significato comune di icone, colori, elementi di interazione standard).

---

### 10. Metodologie e strumenti per testing e valutazione

#### Euristica e Valutazione Euristica
**Euristica**: approccio pragmatico per problem solving — non garantisce la soluzione ottimale ma una soluzione rapida e soddisfacente; riduce il carico cognitivo decisionale.

**Valutazione euristica**: metodologia per valutare l'usabilità, utile nelle fasi preliminari di design. Tra i metodi **più informali**: esperti esaminano l'interfaccia verificando la conformità a principi di usabilità noti.

Caratteristiche: non richiede utenti reali (basta un esperto → riduzione tempi/costi), può essere condotta in pochi giorni, spesso eseguita **prima** degli usability test (riduce errori che emergerebbero poi con utenti reali). Critica principale: risultati molto influenzati dalla competenza del valutatore.

#### Le 10 Euristiche di Nielsen (Decalogo, 1994)
Sviluppate da Jakob Nielsen, basate sul lavoro con **Rolf Molich** (1990), derivate da analisi fattoriale su 249 problemi di usabilità.

1. **Visibilità dello stato del sistema** — feedback adeguato in tempo ragionevole (es. link riconoscibili, indicatori di caricamento)
2. **Corrispondenza tra sistema e mondo reale** — linguaggio familiare all'utente, icone/azioni dal significato condiviso (es. "salva con nome", icona cestino)
3. **Controllo e libertà dell'utente** — niente procedure costrittive lunghe, percorsi senza scorciatoie, azioni indesiderate
4. **Consistenza e standard** — convenzioni valide in tutta l'interfaccia, elementi di riconoscimento ricorrenti (logo, stile)
5. **Prevenzione dell'errore** — evitare situazioni ambigue/critiche, possibilità di tornare indietro
6. **Riconoscimento anziché ricordo** — layout semplici, non contare sulla memoria dell'utente
7. **Flessibilità ed efficienza d'uso** — navigazione gerarchica per inesperti + scorciatoie per esperti
8. **Design ed estetica minimalista** — priorità al contenuto, evitare elementi irrilevanti
9. **Aiuto all'utente per riconoscere/diagnosticare/recuperare errori** — messaggi chiari (no codici), soluzioni suggerite, conferma per azioni importanti
10. **Documentazione** — facile da reperire, focalizzata sul task, strutturata in passi comprensibili

#### Cognitive Walkthrough (CW)
Metodo ispettivo orientato ai **task**, focalizzato su quanto i **nuovi utenti** trovano semplice completare task. Basato sull'idea che gli utenti preferiscono imparare facendo, non leggendo manuali. Risultati rapidi e a basso costo (vs usability testing). Utilizzabile anche in fase di design (con prototipi/mockup/sketch).

**Step:**
1. **Analisi dei task**: sequenza di step/azioni richieste e reazioni del sistema
2. **Walk-through di gruppo**: progettisti/sviluppatori eseguono gli step ponendo domande predefinite ad ogni passo
3. **Raccolta dati/feedback** → report dei problemi potenziali
4. **Riprogettazione** sulla base del report

**Domande chiave del walkthrough** (per ogni step):
- L'utente capirà che deve completare un sotto-task per raggiungere l'obiettivo?
- Noterà che è disponibile un'azione di correzione (es. "undo")?
- Capirà come raggiungere il sotto-task con una determinata azione?
- Il feedback dopo l'azione sarà appropriato/sufficiente?

#### Usability Test
Osservazione in ambiente controllato dell'interazione **reale** tra utenti **reali** e interfaccia, durante l'esecuzione di task prefissati, con successiva analisi del comportamento. Obiettivo: misurare quanto il prodotto risponde ai bisogni per cui è stato creato.

Richiede uno **scenario realistico** con lista di task; uno o più operatori osservano e raccolgono feedback. Strumenti di supporto: prototipi cartacei, questionari pre/post-test, interviste, think aloud, co-discovery learning, eye-tracking.

#### Raccolta dati e feedback — riepilogo metodi
- **Osservazione**: think aloud, co-discovery learning, eye-tracking
- **Survey**: questionari, interviste

---

### 11. Questionari di valutazione

#### UEQ (User Experience Questionnaire)
Strumento standard (ueq-online.org), 26 coppie di caratteristiche antitetiche, scala a 7 livelli. Esiste versione short **UEQ-S** (8 coppie).

**Le 6 categorie del UEQ:**
- **Attrattività** (es. fastidioso–piacevole, repellente–attraente)
- **Apprendibilità** (es. incomprensibile–comprensibile, facile/difficile da apprendere)
- **Efficienza** (es. veloce–lento, efficiente–inefficiente)
- **Controllabilità** (es. imprevedibile–prevedibile, sicuro–insicuro)
- **Stimolazione** (es. noioso–appassionante, attivante–soporifero)
- **Originalità** (es. creativo–privo di fantasia, conservativo–innovativo)

Strumenti di analisi statistica forniti: media/varianza globale e per partecipante, media/varianza/deviazione standard per gruppo, intervallo di confidenza, distribuzione risposte, consistenza dei gruppi.

#### SUS (System Usability Scale)
Questionario semplice e rapido (definito **"quick and dirty"**), 10 item Likert a 5 valori (strongly disagree → strongly agree), per una visione globale soggettiva sull'usabilità.

**Calcolo del punteggio:**
- Item dispari (1,3,5,7,9): punteggio = posizione scala − 1
- Item pari (2,4,6,8,10): punteggio = 5 − posizione scala
- Somma totale × 2.5 → range 0-100

**Interpretazione**: punteggio **> 68** è considerato sopra la media. Il punteggio SUS **non** è una percentuale.

---

### 12. Quanti utenti coinvolgere nei test?

**Formula di Nielsen** per il numero di problemi di usabilità individuati:

```
N = 1 - (1 - L)ⁿ
```
dove N = numero totale problemi, L = proporzione problemi emersi con un singolo utente (tipicamente **L = 31%**), n = numero utenti.

**Risultati pratici** (con L=31%):
- **15 utenti** → ~100% dei problemi individuati
- **5 utenti** → ~85% dei problemi individuati

**5 utenti è considerato il miglior compromesso** costi/benefici (10 utenti in più migliorerebbero solo del 15% circa). Per **significatività statistica** (valutazioni quantitative), servono **almeno 20 utenti**.

---

## PARTE III — Superset per i Fogli di Stile: Sass / SCSS

### 13. Limiti di CSS e Preprocessor/Transpiler

CSS (dal 1996, W3C): linguaggio per la presentazione delle pagine web (colori, layout, font), separa struttura e presentazione, facilita manutenzione.

**Limitazioni comuni**: il committente cambia idea a CSS completato, file pieni di commenti, molte chiamate HTTP per caricare CSS esterni multipli.

**Soluzione**: Preprocessor & Transpiler, usati per aggiungere feature non disponibili nel linguaggio originale, mantenere codice **DRY** (Don't Repeat Yourself) e manutenibile, eseguire controlli a "compile time".

| Linguaggio target | Preprocessor/Transpiler |
|---|---|
| HTML | HAML, Pug, Slim |
| **CSS** | **SASS, Less, Stylus, PostCSS** |
| JavaScript | TypeScript, Dart |

### 14. SASS: definizione e installazione

**SASS** = "Syntactically Awesome Style Sheets". Dal sito ufficiale: estensione di CSS che aggiunge potenza ed eleganza (variabili, regole annidate, mixin, import inline...); aiuta a mantenere ordinati grandi fogli di stile e a far partire velocemente quelli piccoli.

**Installazione**: standalone (download pacchetto da GitHub + PATH), via npm (`npm install -g sass`, più lento), via Chocolatey su Windows (`choco install sass`), via Homebrew su Mac (`brew install sass/sass/sass`).

**Caratteristiche tecniche**: estensioni del linguaggio (variabili, nesting, import, mixin), direttive di controllo (`if`, `for`, `each`, `while`), funzioni ausiliarie (colori, numeri, liste), output personalizzabile.

### 15. SASS vs SCSS

- **SASS**: sintassi indentation-based, si discosta dalle regole CSS classiche (più difficile da adottare per chi viene da CSS).
- **SCSS** ("Sassy CSS"): **fully CSS-compatible** — ogni file `.css` valido è automaticamente `.scss` valido. È la sintassi più usata in pratica.

```scss
/* SCSS (compatibile CSS) */
#sidebar {
  width: 30%;
  background-color: #faa;
}
```
```sass
// SASS (indentation-based, no graffe/punti e virgola)
#sidebar
  width: 30%
  background-color: #faa
```

### 16. Comandi da linea di comando

```bash
sass input.scss output.css                              # compila una volta
sass --watch input.scss:output.css                       # ricompila al salvataggio
sass --watch app/sass:public/stylesheets                 # watch su intera directory
sass --watch style.scss:style.css --style compressed     # output formattato
```

**Stili di output disponibili**: `nested` (default, indentato secondo la struttura), `expanded` (ogni proprietà su riga propria), `compact` (una riga per selettore), `compressed` (tutto minificato, nessuno spazio).

### 17. Funzionalità principali di SCSS

#### Nested Rules (regole annidate)
```scss
#main p {
  color: #0f0;
  width: 97%;
  .redbox {
    background-color: #f00;
    color: #000;
  }
}
```
compila in CSS con i selettori espansi (`#main p .redbox { ... }`).

#### Parent Selector `&`
Permette di riferirsi al selettore genitore:
```scss
a {
  font-weight: bold;
  &:hover { color: #FFF; }        // → a:hover
  body.firefox & { font-weight: normal; }  // → body.firefox a
}
#main {
  &-sidebar { border: 1px solid; }  // → #main-sidebar (concatenazione)
}
```

#### Variabili
```scss
#main {
  $width: 5em !global;   // !global: utilizzabile ovunque da questo punto in poi
  width: $width;
}
```
**Tipi supportati nativamente**: numeri, stringhe, colori, booleani, `null`, liste (`("elem1","elem2")`), mappe chiave-valore (`(k1: v1, k2: v2)`).

#### Operazioni (`+ - * /`)
La divisione viene eseguita solo se in **sintassi SCSS** (variabile, funzione, parentesi, o uso di `+`); altrimenti `font: 10px/8px` resta plain CSS (shorthand). Esempi che attivano la divisione: `$width/2`, `round(1.5)/2`, `(500px/2)`, `5px + 8px/2px`.

#### Interpolazione `#{}`
Permette di inserire variabili SCSS dentro stringhe/sintassi senza attivare operazioni indesiderate:
```scss
$font-size: 12px;
$line-height: 30px;
font: #{$font-size}/#{$line-height};   // → font: 12px/30px (NO divisione)
```
Usata anche per costruire dinamicamente nomi di selettori: `p.#{$myvar}`.

### 18. Direttive di riuso del codice (DRY)

#### `@import`
Importa file SCSS esterni per modularità:
```scss
@import "foo.scss";
@import "foo" screen;
@import url(foo);
```
Nota: prefissare il nome file con underscore (`_variables.scss`) se non si vuole generare un `.css` corrispondente (file "parziale").

#### `@media`
Le media query possono usare variabili e interpolazione:
```scss
@media #{$media} and ($feature: $value) {
  .sidebar { width: 500px; }
}
```

#### `@extend`
Permette a una regola di "ereditare" le proprietà di un'altra:
```scss
.error { border: 1px #f00; background-color: #fdd; }
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
Risultato CSS: `.error, .seriousError { border: 1px #f00; ... }` (i selettori vengono uniti con comma).

**Placeholder selector `%`**: come `@extend` ma il placeholder (`%bordered { ... }`) **non genera mai output CSS proprio** — esiste solo per essere esteso, evitando regole vuote/inutilizzate nel CSS finale.

#### Direttive di controllo
Aggiungono dinamicità condizionale: `@if`/`@else if`/`@else`, `@for`, `@each`, `@while`.
```scss
$type: monster;
p {
  @if $type == ocean { color: blue; }
  @else if $type == monster { color: green; }
  @else { color: black; }
}
```

### 19. Mixin (`@mixin` / `@include`)
Permettono di definire **stili riutilizzabili e parametrizzabili** (con argomenti) — introducono un vero meccanismo di riuso del codice, assente in CSS puro. A differenza di `@extend`, i mixin accettano **argomenti in input** (con valori di default, assegnazione per nome, numero di argomenti variabile/sconosciuto).

### 20. Funzioni SASS (`@function` / `@return`)
Funzioni built-in per manipolazione dati: colori, stringhe (`quote`, `str-length`, `to-upper-case`...), numeri (`max`, `min`, `random`, `round`...). È anche possibile definire funzioni custom con `@function`/`@return`.

---

## PARTE IV — Flexbox

### 21. Introduzione a Flexbox

Modalità di layout introdotta con **CSS3**. Garantisce comportamento più predicibile e stabile, soprattutto per **layout liquido e responsive design**. Rappresenta un miglioramento significativo rispetto al box model tradizionale per la gestione dei layout.

### 22. Concetti principali

- **Flex container**: dichiarato con `display: flex` (blocco) o `display: inline-flex` (inline)
- **Flex item**: elementi posizionati dentro un flex container
- Gli elementi **fuori** dal flex container e **dentro** un flex item seguono il box model tradizionale
- I flex item si dispongono lungo una **flex line**; di default c'è **una sola flex line** per container

```
display: block (tradizionale)        display: flex
┌──────────────┐                     ┌─────┬─────┬─────┐
│   block 1    │                     │item1│item2│item3│
├──────────────┤                     └─────┴─────┴─────┘
│   block 2    │                     (allineati su una flex-line,
├──────────────┤                      default: orizzontale, sx→dx)
│   block 3    │
└──────────────┘
```

### 23. Proprietà del Flex Container

| Proprietà | Default | Altri valori | Effetto |
|---|---|---|---|
| `flex-direction` | `row` (sx→dx) | `row-reverse`, `column`, `column-reverse` | Direzione di disposizione dei flex item |
| `justify-content` | `flex-start` | `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` | Allineamento **orizzontale** (asse principale) |
| `align-items` | `stretch` | `flex-start`, `flex-end`, `center`, `baseline` | Allineamento **verticale** (asse trasversale) di ogni item |
| `flex-wrap` | `nowrap` | `wrap`, `wrap-reverse` | Se gli item vanno a capo quando non c'è spazio |
| `align-content` | `stretch` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` | Allineamento delle **flex line** (simile ad align-items ma per le righe, richiede `flex-wrap`) |

```
Flex Direction:                     Justify-content (asse orizzontale):
  row             [1][2][3]           flex-start    [1][2][3]........
  row-reverse     [3][2][1]           flex-end      ........[1][2][3]
  column          [1]                 center        ....[1][2][3]....
                  [2]                 space-between [1]....[2]....[3]
                  [3]                 space-around  .[1]..[2]..[3].
  column-reverse  [3]
                  [2]
                  [1]

Align-items (asse verticale):
  flex-start  [1]
              [2]
              [3]      (item allineati in alto)
  stretch     item si estende a riempire tutta l'altezza del container
```

### 24. Proprietà dei Flex Item

| Proprietà | Effetto |
|---|---|
| `order` | Ordine dell'item rispetto agli altri (interi positivi/negativi, default 0) |
| `margin: auto` | Assorbe lo spazio extra — utile per "spingere" un item o per il **perfect centering** (`margin: auto` su un singolo item centra perfettamente su entrambi gli assi) |
| `align-self` | Sovrascrive `align-items` del container per quel singolo item (stessi valori: stretch, flex-start, flex-end, center, baseline) |
| `flex-grow` | Capacità dell'item di **crescere** relativamente agli altri (es. due item con `flex-grow:1` e uno con `flex-grow:2` → quest'ultimo occupa il doppio dello spazio extra) |
| `flex-shrink` | Capacità dell'item di **restringersi** se necessario, relativamente agli altri |

```
Perfect centering:
┌─────────────────────┐
│                      │
│        [item]        │   .flex-item { margin: auto; }
│                      │   → centrato su entrambi gli assi
└─────────────────────┘

Flex-grow esempio (2 / 1 / 1):
┌──────────────┬───────┬───────┐
│   item 1     │ item2 │ item3 │   (item1 occupa il doppio
│  (grow: 2)   │(grow:1)│(grow:1)│   dello spazio extra)
└──────────────┴───────┴───────┘
```

### 25. Applicazione pratica: layout responsive
Le slide propongono un caso d'uso completo: layout con `<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>` strutturato tramite flexbox per ottenere un comportamento responsive (il file di esempio completo è fornito su Virtuale come materiale di laboratorio, non riportato testualmente nelle slide).

---

## Punti chiave da ricordare per l'esame

- Distinguere chiaramente **interfaccia** vs **interazione**, e i vari termini storici dell'evoluzione della disciplina HCI (ergonomia → human factors → HCI → UX).
- Conoscere bene **UCD vs Participatory Design** e le tecniche correlate (Personas, scenari, storyboard, mockup, focus group, experience prototyping, think aloud, co-discovery learning) — sapere quando si usano (design vs testing) e i numeri chiave (8-12 per focus group, 3-4 task per experience prototyping, 6 partecipanti/3 coppie per co-discovery).
- Sapere a memoria (o saper ricostruire la logica de) le **10 euristiche di Nielsen** — probabile domanda diretta d'esame.
- Conoscere **Cognitive Walkthrough** vs **Usability Testing** vs **Valutazione euristica**: differenze, vantaggi, quando si usano.
- Sapere spiegare **SUS** (calcolo del punteggio, soglia 68) e **UEQ** (6 categorie).
- Ricordare la **formula di Nielsen** sul numero di utenti nei test (L=31%, 5 utenti → 85%, 15 utenti → 100%, 20+ per significatività statistica).
- Conoscere bene **SCSS**: differenza con SASS puro, variabili, nesting, `&`, `@extend` vs placeholder `%`, mixin (con argomenti) vs `@extend` (senza), interpolazione `#{}`.
- Avere padronanza pratica di **Flexbox**: proprietà del container (`flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `align-content`) vs proprietà dell'item (`order`, `flex-grow`, `flex-shrink`, `align-self`) — utile sia per teoria che per il progetto/elaborato pratico.
- Dato che il corso valuta il progetto anche su **design (UCD/HCI) + implementazione + test con utenti**, è molto probabile che l'elaborato richieda di applicare concretamente almeno una delle metodologie HCI viste qui (es. personas + scenario d'uso in fase di design, e un piccolo usability test o questionario SUS/UEQ in fase di valutazione finale).

---

## Risorse di approfondimento citate nelle slide
- Donald Norman, *The Design of Everyday Things*, *Emotional Design*
- Jakob Nielsen, *Usability Engineering* (1993), *Designing Web Usability* (1999)
- Nielsen Norman Group (nngroup.com) — articoli su "how many test users"
- ISO 9241-11 (usabilità), Direttiva Europea 90/270/EEC
- UEQ: ueq-online.org · SUS: usability.gov, measuringu.com
- Sass: sass-lang.com/documentation, css-tricks.com/snippets/sass
- Flexbox: w3.org/TR/css-flexbox-1, css-tricks.com/snippets/css/a-guide-to-flexbox, flexboxfroggy.com (gioco educativo), flexboxdefense.com
