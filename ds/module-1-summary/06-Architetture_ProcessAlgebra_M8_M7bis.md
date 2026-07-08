# M8 — Software & System Architectures / Process Algebra

## M8 — Software & System Architectures

### Motivazione
Dopo aver fissato un'ontologia di base (processo computazionale, contesto, sistema computazionale), serve un modo generale di rappresentare i sistemi distribuiti, indipendentemente dalla loro natura eterogenea: come possono essere rappresentati a design time e a run time? Come si tiene conto della loro evoluzione nel tempo e della loro distribuzione nello spazio?

### Architetture software per gestire la complessità
I sistemi distribuiti sono complessi: per gestirne la complessità intrinseca, devono essere opportunamente organizzati, tipicamente in termini dei loro componenti software. Esistono molti modi di organizzare i componenti di un sistema distribuito, classificati come **architetture software**; esistono molte possibili istanziazioni concrete di un'architettura software, dove i componenti hanno la loro posizione effettiva nel sistema distribuito — spesso chiamate **architetture di sistema** (system architectures).

### Stile architetturale
Uno **stile architetturale** è formulato in termini di: i componenti, il modo in cui i componenti sono connessi tra loro, i dati che fluiscono attraverso i componenti, il modo in cui tutto questo è configurato insieme per costruire il sistema. La nozione di stile architetturale permette di raggruppare e classificare insiemi di sistemi simili (con la stessa organizzazione), di confrontare sistemi distribuiti, e fornisce pattern generali per il loro design complessivo.

### Componenti e connettori (definizione di Fielding)
- Un **componente** è un'unità modulare con interfacce ben definite, sostituibile nel proprio ambiente; le interfacce sono sia richieste sia fornite (in entrambe le direzioni).
- Un **connettore** è un'astrazione che media la comunicazione, il coordinamento, la cooperazione tra componenti — qualunque cosa fornisca un meccanismo di interazione tra componenti.

Combinare componenti e connettori produce un'enorme gamma di possibili organizzazioni e configurazioni, classificate poi in stili architetturali.

### Definizione formale (Fielding, 2000)
Un'**architettura software** è un'astrazione degli elementi a run-time di un sistema software durante una qualche fase della sua operazione; un sistema può essere composto da più livelli di astrazione e più fasi operative, ciascuna con la propria architettura software. Un'architettura software è definita da una configurazione di elementi architetturali — componenti, connettori e dati — vincolati nelle loro relazioni per ottenere un insieme desiderato di proprietà architetturali.

Elementi architetturali:
- **Componente**: un'unità astratta di istruzioni software e stato interno, che fornisce una trasformazione di dati tramite la propria interfaccia.
- **Connettore**: un meccanismo astratto che media comunicazione, coordinamento o cooperazione tra componenti.
- **Dato**: un elemento di informazione trasferito da/ricevuto da un componente, tramite un connettore.

Le **proprietà architetturali** (funzionali, ma anche attributi di qualità come facilità di evoluzione, riusabilità dei componenti, efficienza, estensibilità dinamica) derivano dalla selezione e disposizione di componenti, connettori e dati nel sistema, e sono indotte dall'insieme di **vincoli** all'interno dell'architettura, spesso motivati dall'applicazione di un principio di ingegneria del software a un aspetto degli elementi architetturali.

### Stile architetturale: definizione
Uno stile architetturale è un insieme coordinato di vincoli architetturali che restringe i ruoli/le caratteristiche degli elementi architetturali e le relazioni ammesse tra tali elementi in qualunque architettura conforme a quello stile. Gli stili architetturali sono un meccanismo per categorizzare le architetture e definirne le caratteristiche comuni; forniscono un'astrazione per le interazioni tra componenti, catturando l'essenza di un pattern di interazione ignorando i dettagli accidentali del resto dell'architettura.

### I quattro (più uno) stili architetturali principali per i sistemi distribuiti

1. **Layered architectures (architetture a strati)**: i componenti sono organizzati a strati, dove i componenti di uno strato chiamano solo i componenti dello strato sottostante e sono chiamati solo dai componenti dello strato sovrastante; il flusso richiesta-risposta è sempre top-down/bottom-up, e il flusso di controllo segue lo stesso pattern dei dati.

2. **Object-based architectures**: i componenti sono oggetti, connessi tramite un meccanismo RPC (remote procedure call); le architetture client-server sono costruite su questo stile. Insieme alle architetture a strati, sono attualmente gli stili più importanti per i sistemi distribuiti, anche se nuove tendenze potrebbero cambiare questo quadro in futuro.

3. **Data-centred architectures**: la comunicazione tra processi avviene tramite un repository condiviso, che può essere passivo (reattivo) o (pro)attivo. Le caratteristiche principali dipendono dalla scelta fatta per il repository condiviso: come è rappresentata l'informazione, come sono gestiti gli eventi, come si comporta il repository in risposta all'interazione, come i processi interagiscono con/attraverso il repository. Esempi onnipresenti: i sistemi web-based (largamente data-centrici), molte applicazioni distribuite che condividono file in rete.

4. **Event-based architectures**: i processi comunicano attraverso un bus di eventi, su cui gli eventi vengono propagati (eventualmente con dati al seguito). Esempio principale: i sistemi publish/subscribe, dove i publisher pubblicano eventi tramite il middleware e i subscriber ricevono gli eventi a cui si sono sottoscritti. Caratteristica principale: i processi possono comunicare senza bisogno di referenziarsi/conoscersi a vicenda (sono **disaccoppiati referenzialmente**) e senza bisogno di condividere lo stesso spazio (sono **disaccoppiati nello spazio**).

5. **Shared data-space architectures**: combinano le architetture data-centric ed event-based; il repository condiviso è uno spazio dati persistente condiviso e, allo stesso tempo, un bus di eventi, dove i dati sono memorizzati e accessibili insieme agli eventi correlati. Esempio principale: i sistemi blackboard, dove i processi mettono dati nella blackboard, che aggrega conoscenza, implementa politiche e guida il coordinamento dei processi. Caratteristica principale: i processi possono comunicare senza bisogno di compresenza — sono anche **disaccoppiati nel tempo**.

### Conclusioni del modulo
Le architetture software/di sistema sono modi (approssimativi, forse non del tutto "scientifici") di modellare i sistemi; tuttavia sono sufficientemente espressivi e astratti da supportare concretamente l'ingegneria dei sistemi distribuiti. Le architetture software riguardano l'organizzazione logica (possibilmente nel tempo); le architetture di sistema riguardano il posizionamento dei componenti in un setting distribuito (riguardano la distribuzione spaziale). Domanda aperta che introduce il modulo successivo: questo è sufficiente come fondamento solido per una scienza dei sistemi distribuiti computazionali? Possiamo dimostrare teoremi basandoci solo su architetture software/di sistema? Qual è il ruolo di un formalismo "matematico", come le algebre di processo?

---

## Process Algebra (M7bis)

### Motivazione: dimostrare proprietà dei sistemi distribuiti
Le architetture software/di sistema sono sufficienti? Le proprietà non sono davvero dimostrate senza una rappresentazione formale ben definita; inoltre le architetture software/di sistema modellano struttura e organizzazione, non davvero il comportamento. Le proprietà comportamentali dei sistemi distribuiti possono essere comprese qualitativamente, ma non realmente dimostrate, con i soli strumenti architetturali.

La concorrenza è la prima fonte di complessità nei sistemi distribuiti: un percorso possibile è usare modelli formali per i sistemi concorrenti, astraendo dalla posizione/distribuzione fisica — in modo simile alle architetture software, ma in modo più formale. I modelli formali per sistemi concorrenti mirano a catturare l'essenza dei sistemi concorrenti e distribuiti, astraendo dai dettagli non necessari, fornendo una rappresentazione non ambigua delle entità computazionali e del loro comportamento, oltre alla possibilità di calcolare proprietà. Tra i diversi approcci possibili, il corso si concentra sulla **process algebra**.

### Concetti base
- **process**: una serie di azioni o eventi.
- **algebra**: un calcolo di simboli che si combinano secondo leggi definite.
- **calculus**: un sistema o metodo di calcolo.

Una **process algebra** è una tecnica di descrizione formale per sistemi informatici complessi, specialmente quelli con componenti comunicanti eseguiti concorrentemente.

### Prima della process algebra
Prima della process algebra esistevano principalmente le **Reti di Petri** per ragionare sui sistemi concorrenti; il ragionamento formale era principalmente concentrato nel dare semantica (significato) ai linguaggi di programmazione: **semantica operazionale** (un programma è modellato come l'esecuzione di una macchina astratta; uno stato della macchina è una valutazione di variabili, una transizione tra stati è un'istruzione elementare del programma), **semantica denotazionale** (più astratta dell'operazionale: i programmi sono modellati tipicamente come una funzione che trasforma input in output), **semantica assiomatica** (enfasi sui metodi di dimostrazione per provare i programmi corretti: nozioni centrali sono le asserzioni di programma — triple di prova con precondizione, istruzione di programma, postcondizione — e gli invarianti).

### Le principali algebre di processo
- **ACP** — Algebra of Communicating Processes (Bergstra & Klop, 1984)
- **CCS** — Calculus of Communicating Systems (Milner, 1980)
- **CSP** — Communicating Sequential Processes (Brookes et al., 1984)

Ingredienti chiave comuni a tutte le algebre di processo:
- **compositional modelling**: un piccolo numero di costrutti per costruire sistemi più grandi a partire da quelli più piccoli.
- **operational semantics**: tipicamente equipaggiate con una **semantica operazionale strutturata (SOS)**, che descrive le capacità di esecuzione "a singolo passo" dei sistemi, permettendo di tradurre i sistemi rappresentati come termini dell'algebra in **sistemi di transizione etichettati (LTS)**.
- **behavioural reasoning**: l'uso di relazioni comportamentali come mezzo per mettere in relazione sistemi diversi dati nell'algebra.

### Assiomi
Il termine "algebra" denota un approccio algebrico/assiomatico al comportamento dei sistemi: la process algebra usa i metodi e le tecniche dell'algebra universale. Una process algebra è qualunque struttura matematica che soddisfi gli assiomi dati per gli operatori di base; un **processo** è un elemento di una process algebra; usando gli assiomi, è possibile fare calcoli con i processi.

### Storia
I primi modelli si concentravano sul comportamento come funzione input/output; un processo era modellato come automa nella teoria degli automi (con stati e transizioni tra stati). Mancava l'interazione tra sistemi: la process algebra colma questa lacuna, occupandosi proprio di sistemi interagenti e quindi della concorrenza. La process algebra può essere vista come lo studio del comportamento di sistemi concorrenti/distribuiti tramite mezzi algebrici.

### Operatori di base
Tre operatori per combinare processi in sistemi:
- `+` **alternative composition**: `x + y` rappresenta il processo che esegue x oppure y.
- `;` **sequential composition**: `x ; y` rappresenta il processo che esegue prima x e poi y (a volte rappresentata con `·`: `x · y`).
- `∥` **parallel composition**: `x ∥ y` rappresenta il processo che esegue x e y concorrentemente/in parallelo.

### Leggi strutturali di base (sette leggi)
- `x + y = y + x` — commutatività della composizione alternativa
- `x + (y + z) = (x + y) + z` — associatività della composizione alternativa
- `x + x = x` — idempotenza della composizione alternativa
- `(x + y) ; z = x ; z + y ; z` — distributività a destra di `+` su `;`
- `(x ; y) ; z = x ; (y ; z)` — associatività della composizione sequenziale
- `x ∥ y = y ∥ x` — commutatività della composizione parallela
- `(x ∥ y) ∥ z = x ∥ (y ∥ z)` — associatività della composizione parallela

Qualunque struttura matematica con tre operazioni binarie che soddisfi queste leggi è una process algebra; tali strutture sono tipicamente espresse in termini di automi, chiamati più spesso **sistemi di transizione (transition systems)**.

### Usi: specifica e verifica
La process algebra offre un modo di rappresentare i sistemi concorrenti (struttura e comportamento), quindi può essere usata per la **specifica** del sistema, e un modo di calcolare il comportamento dei sistemi, quindi può essere usata per la **verifica** del sistema.
- **Specifica**: si seleziona il framework algebrico più adatto e le sue leggi strutturali specifiche, si definiscono le azioni atomiche del sistema, si definisce il comportamento del sistema in termini di transizioni conformi alle leggi strutturali dell'algebra.
- **Verifica**: si sfruttano assiomi e transizioni per derivare proprietà del sistema.

### Scegliere le leggi: distributività sinistra, tempo lineare vs. ramificato
Le sette leggi base possono essere estese con la **distributività a sinistra** di `+` su `;`: `x ; (y + z) = x ; y + x ; z`. Se si adotta sia la distributività destra sia quella sinistra di `+` su `;`, il momento della scelta non conta — questo si chiama **tempo lineare**; altrimenti il momento della scelta conta — questo si chiama **tempo ramificato (branching time)**.

### Transizioni (semantica operazionale)
- Ogni azione atomica `a` è una costante che può eseguire se stessa, dopodiché termina con successo: `a → ✓`.
- La composizione alternativa può procedere in entrambi i modi: se `x → ✓` allora `x+y → ✓`; se `x → x'` allora `x+y → x'` (analogamente per y).
- La composizione sequenziale procede in un solo modo: se `x → ✓` allora `x;y → y`; se `x → x'` allora `x;y → x';y`.
- La composizione parallela può procedere semplicemente (interleaving) oppure tramite processi che interagiscono via una funzione di comunicazione γ(a,b), che sincronizza un'azione `a` di un processo con un'azione `b` dell'altro.

### Operazionale vs. assiomatico
In sintesi: le leggi strutturali rappresentano gli assiomi che permettono di dimostrare le proprietà del sistema; le regole di transizione forniscono una rappresentazione operazionale adatta come riferimento per l'implementazione; quando le transizioni sono definite in modo da rispettare le leggi strutturali, in linea di principio si ottiene un'implementazione con proprietà formali garantite.

### Conclusioni del modulo
**Aspetti positivi**: i modelli formali sono essenziali nei sistemi distribuiti per dimostrare proprietà e vincolare l'implementazione di componenti e sistemi; le process algebra sono tra le tecniche più diffuse per rappresentare i sistemi distribuiti e ragionare sulle loro proprietà; non è troppo difficile maneggiarle per rappresentare alcune proprietà di base, e si possono costruire dimostrazioni sui sistemi.

**Aspetti meno positivi**: le dimostrazioni non sono così intuitive — almeno non abbastanza da essere uno strumento quotidiano per gli ingegneri del software; ci si è occupati solo del calcolo concorrente, non si è fatto cenno alla distribuzione fisica — quindi a questo punto del corso si sa come trattare sistemi concorrenti, almeno in principio, ma non (ancora) sistemi distribuiti in senso pieno (esistono tecniche formali per quello, ma il corso si ferma qui per quanto riguarda la process algebra).
