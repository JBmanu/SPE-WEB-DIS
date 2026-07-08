# M6 — Computing with Time / M7 — Computing with Space

## M6 — Computing with Time

### Il calcolo ha bisogno del tempo
Oggi la maggior parte dei dispositivi computazionali non sono solo computer general-purpose (es. auto, dispositivi medici, strumenti, sistemi di comunicazione, robot industriali, giocattoli, giochi...): l'esplosione dell'Internet of Things (IoT) li spinge a diventare sempre più intelligenti e connessi in rete; sono computer special-purpose con architetture e potenza computazionale sempre più simili a quelle dei computer general-purpose, con maggiore complessità a discapito, possibilmente, della loro dependability. D'altra parte, i computer general-purpose sono sempre più chiamati a interagire con processi fisici (integrano video/audio, vengono usati su dispositivi personali e pervasivi che devono percepire dinamiche fisiche e controllare dispositivi fisici).

### Cyber-Physical Systems (CPS)
Le fondamenta del calcolo restano radicate in Turing, Church e von Neumann: riguardano la trasformazione di dati, non si occupano della dinamica dei processi fisici. I **sistemi cyber-fisici (CPS)** emergono dall'integrazione di sistemi e processi fisici con il calcolo in rete: incorporano profondamente calcolo e comunicazione che interagiscono con processi fisici, per aggiungere nuove capacità ai sistemi fisici. Esempi notevoli di CPS: dispositivi medici ad alta affidabilità, assistenza alla vita autonoma, controllo e sicurezza del traffico, sistemi automotive avanzati, controllo di processo, conservazione energetica, controllo ambientale, avionica e strumentazione, controllo di infrastrutture critiche (rete elettrica, risorse idriche, sistemi di comunicazione), robotica distribuita (telepresenza, telemedicina), sistemi di difesa, manifattura, strutture intelligenti.

### Misconcezioni sul tempo nel calcolo (secondo Lee)
- *"il calcolo richiede tempo"* — non è solo questione di efficienza limitata: il tempo viene sempre astratto via dal calcolo, quindi il calcolo tradizionalmente omette sempre il tempo.
- *"il tempo è una risorsa"* — sì, ma di tipo diverso: è praticamente illimitato e viene comunque consumato; mentre va bene avere modi generici per gestire le risorse nei linguaggi di programmazione, il tempo deve essere una proprietà semantica.
- *"il tempo è una proprietà non funzionale"* — con la macchina di Turing, una funzione può essere calcolata astraendo dal tempo: tuttavia, la funzione di una computazione in un CPS è definita attraverso azioni che avvengono nel tempo fisico, con una durata.
- *"il tempo reale è un problema di qualità del servizio (QoS)"* — il tempo nei CPS non riguarda principalmente l'efficienza: riguarda piuttosto la prevedibilità e la ripetibilità; precisione e variabilità nella temporizzazione sono questioni di QoS, ma il tempo in sé è molto di più — dovrebbe far parte della semantica dei programmi.

Conclusione: le astrazioni fondamentali del calcolo dovrebbero essere ripensate per includere il tempo.

### Tempo dopo la relatività
Dopo Einstein, non esiste più un'unica nozione di tempo "vero" o unico; la fisica non descrive più come le cose evolvono "nel tempo", ma piuttosto come le cose evolvono nei propri tempi e come i tempi evolvono uno rispetto all'altro. Non esiste più una direzione del tempo, né un "adesso" privilegiato; il tempo non è indipendente, ma legato al cambiamento: gli eventi accadono, e il tempo può essere usato per mettere in relazione le loro dinamiche.

### Il problema del tempo nei sistemi distribuiti
Nei sistemi centralizzati e non distribuiti, il tempo è univoco. In un sistema distribuito, non esiste una nozione naturale di tempo (il calcolo concorrente distribuito è il modello computazionale più naturale e generale per i sistemi distribuiti). Domande chiave: è possibile costruire una nozione globale di tempo in un sistema distribuito qualsiasi? È utile farlo? Se non è possibile/utile, come sincronizzare le attività in un sistema distribuito?

### Tempo fisico

Un clock (orologio) in un computer è in realtà un **timer** (tipicamente un quarzo oscillante con un contatore e un registro di mantenimento; quando il contatore arriva a zero, viene generato un interrupt, e il contatore viene ricaricato — ogni interrupt è un "tick" dell'orologio).

- Nei **sistemi centralizzati** non serve sincronizzazione del clock fisico: generalmente esiste un singolo orologio, un processo ottiene il tempo tramite una system call al kernel, e quando un altro processo lo richiede successivamente ottiene un valore di tempo maggiore — ordinamento totale degli eventi garantito.
- Nei **sistemi distribuiti** non c'è un clock globale né memoria comune: ogni processo ha il proprio orologio interno e la propria nozione di tempo, ciascun orologio può "derivare" (drift) di diversi secondi al giorno, e anche se sincronizzati all'inizio, tick diversi possono portare a differenze nel tempo — serve quindi la **sincronizzazione dei clock**.

**Sincronizzazione del clock fisico**: il processo di garantire che processori fisicamente distribuiti abbiano una nozione comune di tempo. È necessaria per: conoscere l'orario del giorno in cui è avvenuto un evento su una specifica macchina della rete; conoscere l'intervallo di tempo tra due eventi avvenuti su macchine diverse; conoscere l'ordinamento relativo di eventi avvenuti su macchine diverse della rete.

**Definizioni e terminologia**: dati due macchine a, b con i loro clock Ca, Cb:
- **time**: la funzione Ca(t) restituisce il tempo del clock per la macchina a (Ca(t) = t per un clock perfetto);
- **frequency**: la velocità a cui un clock avanza (derivata prima rispetto al tempo);
- **offset**: la differenza tra clock e tempo reale (Ca(t) − t è l'offset del clock Ca; Ca(t) − Cb(t) è l'offset relativo tra due clock);
- **skew**: la differenza di frequenza tra il clock e il clock perfetto;
- **drift**: la derivata seconda rispetto al tempo del clock (Ca''(t) − Cb''(t) è il drift relativo tra due clock).

**Tempo globale assoluto**: per sincronizzarsi, i clock fisici hanno bisogno di uno standard accurato di tempo reale, es. il **Tempo Coordinato Universale (UTC)**, gestito dal BIPM (Bureau International des Poids et Mesures, Sèvres, Francia), che combina, analizza e fa la media degli standard ufficiali di tempo atomico delle nazioni membre; viene trasmesso come impulso radio (WWV) dal NIST ogni secondo UTC, e via satellite. Se una macchina nel sistema ha accesso a un servizio UTC, si può usare un algoritmo che sincronizza tutte le macchine basandosi su di essa. Esempio: il **Network Time Protocol (NTP)**: un time server ha il tempo assoluto globale, e le altre macchine si sincronizzano (gli orologi possono solo correre in avanti — le correzioni non possono mai far tornare indietro un orologio).

**Inaccuratezze del clock**: i produttori specificano tipicamente la velocità massima di skew ρ; un timer funziona "secondo specifica" se 1−ρ ≤ dC/dt ≤ 1+ρ.

**Tempo assoluto vs. relativo**: a volte serve effettivamente un tempo comune correlato al tempo fisico (tempo globale assoluto, es. UTC); altre volte basta solo condividere un tempo comune, anche non correlato al tempo fisico (**tempo relativo globale**), tramite algoritmi basati su server attivi che si interrogano a vicenda per scoprire il tempo medio e le correzioni stimate, senza che nessuna macchina debba avere il tempo UTC. Esempi: il **Berkeley Algorithm** (demoni del tempo su tutte le macchine si interrogano e rispondono, concordando su un tempo comune); **Reference Broadcast Synchronisation (RBS)** per il tempo relativo globale nelle reti wireless.

### Tempo logico

Spesso il tempo fisico non è necessario: il vero requisito è solo un orologio condiviso tra i processi, anche non legato al tempo reale — una nozione di **tempo logico** è possibile e utile.

**Esempio motivante**: esiste un database replicato dei conti di una banca a LA e NY; un cliente aggiunge 100$ al suo conto, mentre contemporaneamente un impiegato applica un incremento dell'1% al conto; partendo da un saldo originale di 1000$, può facilmente accadere che la replica LA registri 1110$ e quella NY 1111$ — inconsistenza dovuta ad aggiornamenti concorrenti su un database distribuito replicato.

**Logical Clocks (Lamport, 1978)**: la sincronizzazione è possibile senza bisogno che sia assoluta: se due processi non interagiscono, non c'è bisogno di sincronizzazione (la sua mancanza non sarebbe osservabile); spesso ciò che conta non è l'istante esatto in cui gli eventi accadono, ma l'**ordine** in cui accadono (esempi: UNIX `make`, Gradle). Quindi la sincronizzazione di orologi non fisici, logici, è ammissibile e utile. (Questo tema viene poi approfondito in dettaglio nel modulo C5 dedicato.)

### Verso il coordinamento
La comunicazione è solo metà della storia: l'interazione è un problema più generale. Governare l'(inter)azione è una questione fondamentale nei sistemi (distribuiti): fare la cosa giusta al momento giusto è essenziale, e "al momento giusto" è il problema critico.

Oltre la sincronizzazione: a volte ordinare gli eventi non basta; servono politiche più articolate, ad esempio per assicurare che accessi concorrenti a una risorsa condivisa non ne danneggino o corrompano la consistenza — da qui il problema della **mutua esclusione** (algoritmi centralizzati, decentralizzati, distribuiti, es. Token Ring) e degli **algoritmi di elezione** (per eleggere un coordinatore). La sincronizzazione riguarda *quando* accadono le cose, ma le azioni sono più che semplici invii di messaggi indifferenziati: hanno una natura, e l'interazione significativa in un sistema distribuito dipende tipicamente da tale natura. Governare l'interazione basandosi sia sul tempo sia sulla natura delle azioni, mirando al raggiungimento di un obiettivo globale per il sistema distribuito, è il **problema del coordinamento**.

---

## M7 — Computing with Space

### Lo spazio nel distributed computing
La distribuzione è prima di tutto distribuzione fisica, ossia essenzialmente distribuzione spaziale: come nel caso del tempo, serve capire cosa sia lo spazio, cosa intendiamo quando pensiamo e parliamo di spazio, come rappresentiamo lo spazio nel ragionamento e nel calcolo. Oggi un'enorme quantità di scenari applicativi richiede ragionamento spaziale e spatial computing.

### Spazio in matematica e logica

**Umani e spazio**: per gli umani primitivi, la consapevolezza dell'ambiente circostante era la premessa all'autoconsapevolezza; modellare e misurare l'ambiente era la premessa per le azioni orientate a obiettivi. Per gli umani lo spazio è uno strumento concettuale per modellare l'ambiente in cui viviamo e organizzare risorse e attività (e le loro dinamiche).

**Geometria**: astraendo dalla nostra percezione della realtà, si sviluppano concetti geometrici di base (punto, linea, angolo, cerchio...) e forme geometriche di base (triangolo, rettangolo, trapezio...), dai Babilonesi agli Egizi ai Greci. La **geometria euclidea** segue un approccio assiomatico (gli Elementi di Euclide): la geometria non è più vista come un insieme di osservazioni empiriche e metodi pratici per misurare distanze e aree, ma concepita come una teoria matematica astratta, radicata nella realtà percepita ma con un proprio diritto assoluto di esistenza e sviluppo. Oltre lo spazio euclideo esistono le **geometrie non euclidee** (Riemann/ellittica, Bolyai & Lobachevsky/iperbolica), che rappresentano lo spazio fisico vero al di là della nostra percezione sensoriale-cognitiva diretta.

**Logiche**: la logica modale si è rivelata particolarmente interessante per modellare, analizzare e ragionare sullo spazio, perché può essere più specifica e ha un migliore comportamento computazionale (spesso decidibile). La **logica modale della topologia** reinterpreta gli operatori modali: necessariamente come operatore di interno, possibilmente come operatore di chiusura di uno spazio topologico; il sistema S4 è sano e completo rispetto alla semantica topologica, ed è la logica modale di qualunque spazio euclideo. La **morfologia matematica** analizza forma, informazione spaziale ed elaborazione di immagini, sfruttando la similarità tra le proprietà algebriche degli operatori di morfologia matematica e degli operatori modali, utile per l'esplorazione dello spazio in processi di "focus of attention" e per compiti di riconoscimento e interpretazione.

### Spazio in informatica

**Sistemi distribuiti (recap)**: un nuovo spazio per i componenti software, con la distribuzione fisica dei sistemi computazionali (distribuzione di unità computazionali, canali di comunicazione, dati); le reti locali costruiscono i primi spazi virtuali, Internet e le posizioni basate su IP i primi spazi "globali", il World Wide Web come primo spazio globale condiviso da agenti e umani (uno spazio knowledge-intensive). Il middleware fornisce nozioni topologiche per i sistemi distribuiti, mappando la distribuzione logica sulla distribuzione fisica (es. JADE fornisce ai programmatori di agenti le nozioni topologiche di "container" e "platform" per rappresentare la località degli agenti). I **sistemi distribuiti situati**: la distribuzione fisica dei sistemi computazionali è essenziale per far fronte alla natura distribuita di molti ambienti operativi, e per la necessità di computazione situata (computazioni che avvengono localmente dove avvengono percezione o azione); quando i requisiti del sistema impongono computazioni situate in un ambiente fisico distribuito, i sistemi distribuiti situati sono l'unica via; l'IoT rende questa necessità ineludibile.

**Computational Geometry**: usare la geometria per rappresentare problemi (spaziali o non) e usare algoritmi per calcolarne le soluzioni (esempio: trovare il bar più vicino nel campus, per ogni punto, dividendo il campus in regioni attorno a ciascun bar).

**Geographic Information Systems (GIS)**: calcolare con la geografia — rappresentare informazione geografica, catturare/salvare/verificare/visualizzare dati che rappresentano posizioni sulla Terra. Un GIS è un sistema computer-based che supporta lo studio di fenomeni naturali e artificiali con una posizione esplicita nello spazio.

**Virtual Reality (VR)**: mondi artificiali, con spazio artificiale, digitalmente creati, rappresentati esclusivamente come ambienti computazionali, dove "persone reali" possono effettivamente svolgere attività sensomotorie e cognitive. Le piattaforme di gaming (es. Unity3D, Unreal Engine) forniscono i mezzi per costruire interi mondi virtuali esplorabili da diversi dispositivi.

**Location-based Services (LBS)** e **Augmented Reality (AR)**: i LBS usano informazioni sulla posizione di un utente/dispositivo per fornire informazione, intrattenimento, sicurezza (es. Around Me, Mobike, Ingress, Pokémon Go); l'AR integra spazio virtuale e fisico, fondendo informazione del mondo reale con contenuto digitale sensibile al contesto in modo significativo (lo strato virtuale e quello fisico si influenzano dinamicamente a vicenda); la gamification può portare ad applicazioni rilevanti in ambito medico, civico, educativo, turistico.

### Spatial Computing
Durante il workshop "Computing Media and Languages for Space-Oriented Computation" (Dagstuhl), sono state identificate tre classi di sistemi spaziali:
1. **distributed systems**, dove lo spazio è un mezzo o una risorsa (coping with space);
2. **situated systems**, dove la posizione nello spazio (e nel tempo) è essenziale per il calcolo (embedded in space);
3. **spatial systems**, dove lo spazio è fondamentale per il problema applicativo, è rappresentato e manipolato esplicitamente, ed è essenziale per esprimere il risultato di un calcolo (representing space).

Un **computer spaziale** (spatial computer/computing system) è un sistema computazionale dove la logica dello spazio è essenziale per rappresentare il problema, definire il calcolo ed esprimere il risultato; lo **spatial computing** è qualunque forma di calcolo dove la logica dello spazio è rilevante per esprimere ed eseguire il calcolo. I **Spatial Computing Languages (SCL)** sono nati per affrontare il problema di portare lo spazio nei linguaggi di programmazione, permettendo ai programmatori di gestire esplicitamente gli aspetti spaziali a livello di linguaggio.

### Conclusioni del modulo
Esistono strumenti matematici e logici per rappresentare, analizzare e ragionare sullo spazio; si può calcolare con lo spazio e la sua organizzazione; esistono diversi tipi di mobilità del codice (approfonditi nel modulo C6); lo spatial computing è un framework concettuale per i tanti tipi di calcoli e sistemi spaziali esistenti.
