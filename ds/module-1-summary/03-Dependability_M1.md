# M1 — Dependability in Distributed Systems

## Perché conta la dependability
I sistemi distribuiti hanno un ruolo sempre più importante nella società, nei governi, nelle aziende e nella vita degli individui: servizi finanziari (online banking, trading), e-commerce, infrastrutture civili (rete elettrica, controllo del traffico), intrattenimento (gaming online, streaming), storage personale (Dropbox, Google Drive...). Il costo dei guasti (failure) è enorme: per un data center, il costo medio del downtime può variare da decine a centinaia di migliaia di euro l'ora. Tuttavia anche la dependability ha un costo elevato: quasi il 60% delle aziende Fortune 500 soffre di più di un'ora e mezza di downtime a settimana; il costo dei data center dipende molto dal livello di disponibilità richiesto (da 450$/sq.ft per il 99,671% di disponibilità, cioè 28,8 ore di downtime/anno, fino a 1.100$/sq.ft per il 99,995%, cioè 0,4 ore di downtime/anno). Da qui la domanda guida del modulo: come ridurre il costo della dependability? Una risposta pratica è formare ingegneri competenti nel progettare, implementare e mantenere sistemi distribuiti affidabili.

## Concetti base: dependability e i suoi modelli

La dependability (affidabilità complessiva) è collegata al concetto di reliability, ma **non sono la stessa cosa** (il dizionario la definisce come "la qualità di poter essere considerati affidabili nel fare ciò che qualcuno vuole o necessita"). Nel contesto del distributed computing, la dependability si riferisce alla capacità di un sistema distribuito di fornire servizi corretti ai suoi utenti nonostante diverse minacce (difetti software non rilevati, guasti hardware, attacchi malevoli...). Per ragionare sulla dependability servono: un modo di modellare opportunamente un sistema distribuito, e un modo di modellare le minacce al sistema.

### Modello di sistema
Un sistema distribuito è progettato per fornire un insieme di servizi ai suoi utenti (spesso chiamati client); ogni servizio ha un'interfaccia utilizzabile dal client per richiederlo; una specifica funzionale definisce cosa dovrebbe fare un servizio. In ogni istante un sistema si trova in un dato **stato**: per un sistema distribuito questo è complicato, perché tipicamente consiste di uno o più processi distribuiti su uno o più nodi di rete, ciascun processo composto da uno o più thread. Lo stato del sistema è determinato collettivamente dallo stato di processi e thread (registri, stack, heap, file descriptor, stato del kernel...). Parte dello stato può diventare visibile (implicitamente o esplicitamente) attraverso l'interazione con l'utente: questo si chiama **stato esterno o osservabile** (lo stato astratto definito dalla specifica funzionale); la parte restante, non visibile agli utenti, è lo **stato interno**.

Bisogna sempre definire il **confine** del sistema, cioè la linea fisica/logica che separa il sistema dal suo ambiente circostante (dentro il confine: i componenti del sistema; fuori: l'ambiente, ossia tutti gli altri sistemi con cui il sistema corrente interagisce in qualunque modo lo influenzino). Ogni definizione di componente vs. sistema dipende dal livello di astrazione scelto.

### Modello delle minacce (threat model)
Quando un sistema non rispetta la sua specifica funzionale, si dice che si è verificato un **failure (guasto/fallimento)**. Il fallimento di un sistema è causato da (parte del) suo stato che ha valori sbagliati, cioè **errori** nel suo stato. Il modello causale assume che gli errori siano causati da alcuni **fault (difetti)**. In sintesi: un sistema **fallisce** (failure) quando non si comporta come promesso; un **errore** è una parte dello stato del sistema che potrebbe aver causato un fallimento; la causa di un errore è un **fault**.

Un fault può essere **dormiente** (non si manifesta subito come errore, es. un bug che non causa problemi finché il codice corrispondente non viene eseguito, oppure una variabile condivisa non protetta da lock finché due o più thread non provano ad aggiornarla concorrentemente). Quando si verifica la condizione specifica, il fault viene **attivato**, causando un errore nel componente. Quando il componente interagisce con altri componenti, l'errore **si propaga** attraverso il sistema. Quando l'errore si propaga fino all'interfaccia, facendo deviare il servizio fornito a un client dalla specifica, si verifica un **service failure**.

### La "catena delle minacce" (chain of threats)
Data la natura ricorsiva tipica della composizione dei sistemi, il fallimento di un sistema può causare un fault in un sistema più grande, quando il primo costituisce un componente del secondo. Questa relazione tra fault, errore e fallimento è chiamata "catena delle minacce", e per questo motivo nella letteratura i termini "fault" e "failure" sono spesso usati in modo intercambiabile (in modo un po' improprio).

## Classificazione dei fault

I fault possono essere classificati secondo diversi criteri:

| Criterio | Categorie |
|---|---|
| Source (fonte) | hardware, software, operator |
| Intent (intenzione) | non-malicious, malicious |
| Duration (durata) | transient, intermittent, permanent |
| Manifestation (manifestazione) | content, timing |
| Reproducibility (riproducibilità) | reproducible (deterministic), nondeterministic |
| Relationship (relazione con altri fault) | independent, correlated |

- **Source**: hardware fault (causati da guasti hardware come blackout, guasti del disco, chip di memoria difettosi), software fault (causati da bug, come race condition o array senza controllo dei limiti), operator fault (causati dall'operatore del sistema, es. configurazione errata o procedure di aggiornamento sbagliate).
- **Intent**: non-malicious (non causati da intento malevolo, es. fault hardware naturali o bug non intenzionali), malicious (causati da chi ha intenzione di danneggiare il sistema, es. negare servizio a client legittimi o compromettere l'integrità del servizio — vedi anche commission fault o Byzantine fault).
- **Duration**: transient (attivato momentaneamente, poi torna dormiente, es. un picco di tensione che colpisce un componente hardware e poi scompare), intermittent (si verifica, scompare spontaneamente, poi riappare, es. una race condition), permanent (una volta attivato, resta tale finché il componente non viene riparato o la fonte del fault non viene risolta, es. un blackout, oppure un crash di processo).
- **Manifestation**: content fault (causano valori errati passati ad altri componenti — un componente difettoso può sempre restituire lo stesso valore errato, oppure restituire valori diversi a componenti diversi: quest'ultimo caso è specificamente modellato come **Byzantine fault**), timing fault (il componente difettoso risponde troppo presto o troppo tardi; caso estremo: il componente smette di rispondere del tutto, cioè impiega un tempo infinito a restituire una risposta, es. quando va in crash o si blocca per un loop infinito o un deadlock).
- **Reproducibility**: reproducible/deterministic fault (si verifica deterministicamente e può essere facilmente riprodotto, es. l'accesso a un puntatore nullo; di solito facili da identificare e riparare), nondeterministic fault (sembra verificarsi in modo non deterministico ed è difficile da riprodurre, es. causato da una specifica interleaving di più thread che accedono a una variabile condivisa; sono chiamati anche **Heisenbug** per sottolinearne l'incertezza).
- **Relationship**: independent fault (nessuna relazione causale tra i fault: dato il fault A e il fault B, B non è causato da A e viceversa), correlated fault (i fault sono causalmente collegati; se più componenti falliscono per una causa comune, si parla di **common mode failure**).

### Modelli di failure (classificazione alternativa, secondo Tanenbaum & van Steen)
- **Fail-stop systems**: sistemi che, quando falliscono, smettono di rispondere alle richieste (le conseguenze catastrofiche del fallimento vengono attenuate da meccanismi di dependability che impongono l'arresto).
- **Fail-safe systems**: sistemi il cui fallimento non causa grandi danni a vite umane o all'ambiente; un sistema fail-safe definisce un insieme di stati sicuri, in cui può transitare quando non può più operare secondo la specifica (es. il sistema che controlla una centrale nucleare deve essere fail-safe).
- **Fail fast**: pratica ingegneristica che fa sì che un sistema interrompa immediatamente la sua operazione quando si trova in uno stato di errore o incontra una condizione inattesa; consente una diagnosi precoce dei fault (perché quando un fault si è propagato a molti altri componenti, è molto più difficile individuarne la fonte).

## Attributi della dependability ed evaluation metrics

Caratteristiche principali di un sistema dependable (secondo Tanenbaum & van Steen): **availability**, **reliability**, **safety**, **maintainability**.

- **Availability (disponibilità)**: proprietà secondo cui un sistema è pronto per l'uso immediato; si riferisce alla probabilità che il sistema sia operativo correttamente in un dato istante, pronto a fornire le sue funzioni agli utenti. Un sistema altamente disponibile è il più delle volte pronto e funzionante in qualsiasi istante.
- **Reliability (affidabilità)**: proprietà secondo cui un sistema può funzionare continuamente senza guasti; è definita rispetto a un **intervallo di tempo**, anziché a un istante (come l'availability). Un sistema altamente affidabile è il più delle volte capace di restare operativo per un lungo periodo di tempo.
- **Safety**: situazione in cui, quando un sistema fallisce temporaneamente, non accade nulla di catastrofico. È una proprietà difficile da definire e garantire (catastrofico significa qui che non esiste un percorso definito dal fault al ritorno alla normale operazione). Rilevante per sistemi come centrali nucleari o sale operatorie ospedaliere, ma non per sistemi come l'e-commerce.
- **Maintainability**: facilità con cui un sistema guasto può essere riparato; strettamente legata all'availability, quindi un sistema altamente manutenibile mostra spesso anche un alto grado di disponibilità.

Un'ulteriore classificazione (secondo Zhao) aggiunge l'**integrity**: la capacità di un sistema di proteggere il proprio stato dall'essere compromesso sotto varie minacce (nel campo del dependable computing, l'integrity si traduce tipicamente nella consistenza delle repliche del server, se si sfrutta la ridondanza: finché il numero di repliche difettose non supera una soglia predefinita, la consistenza delle repliche corrette implica naturalmente l'integrità del sistema).
- Alcuni attributi possono essere usati come metriche di valutazione: availability, reliability.
- Altri sono difficili da quantificare: integrity, maintainability, safety.
- Alcuni sono fondamentali per tutti i sistemi distribuiti: availability, reliability, integrity.
- Altri sono secondari o non applicabili a tutti i sistemi: maintainability, safety.

### Formule e metriche quantitative
- **MTTF** (Mean Time To Failure): tempo medio prima che un sistema fallisca.
- **MTTR** (Mean Time To Repair): tempo medio necessario per riparare un sistema.
- **MTBF** (Mean Time Between Failures) = MTTF + MTTR.
- **Availability** = MTTF / (MTTF + MTTR) = MTTF / MTBF.
- La disponibilità è tipicamente espressa in termini di "quanti 9": ad esempio, se un sistema offre **five 9s availability** (99,999%), significa che è disponibile con probabilità 99,999%, cioè ha probabilità 10⁻⁵ di essere indisponibile quando un client tenta di accedere al servizio, il che equivale a un massimo di 5,256 minuti di downtime all'anno.
- **Reliability** è spesso rappresentata come la probabilità che il sistema fornisca servizi corretti per un dato periodo Δt: R(Δt) = e^(−λΔt), dove λ ∈ [0, ∞) è il tasso di guasto (failure rate), approssimativamente proporzionale a 1/MTTF.
  - **Attenzione**: availability ≠ reliability! Un sistema che fallisce frequentemente ma si riprende molto rapidamente può avere alta disponibilità ma, allo stesso tempo, bassa affidabilità.

## Mezzi per ottenere la dependability

Approcci per migliorare la dependability dei sistemi distribuiti (Zhao):
1. **Fault avoidance**: costruire e usare componenti software/hardware di qualità, meno inclini a fallire; per il software significa progettazione corretta (eventualmente con metodi formali per verificare proprietà) e test rigoroso per identificare e rimuovere bug.
2. **Fault detection & diagnosis**: il rilevamento può essere complesso (i crash fault sono banali da rilevare con un controllo periodico, ma i componenti possono fallire in altri modi più subdoli, dove il controllo periodico non aiuta); se un fault non viene rilevato, l'integrità del sistema non può essere garantita. Una volta rilevato il fault, serve la **diagnosi** per determinare che si è effettivamente verificato e localizzarne la sorgente (modelli formali e strumenti statistici sono usati a questo scopo). Un esempio di rilevamento/gestione dei fault è la gestione delle eccezioni nei linguaggi di programmazione moderni.
3. **Fault removal**: una volta rilevato e localizzato, il fault va isolato e rimosso dal sistema; il componente difettoso viene riparato o sostituito e reintrodotto nel sistema, tipicamente richiedendo una **riconfigurazione**. In un sistema distribuito ciò richiede tipicamente la nozione di **membership** (il componente difettoso viene escluso dal sistema; quello riparato torna a far parte della membership). Un caso speciale è l'aggiornamento software.
4. **Fault tolerance**: poiché i guasti hardware esistono, il solo software robusto non basta per garantire alta dependability; a meno che il sistema sia completamente stateless, semplicemente riavviarlo dopo un fallimento non ne ripristina automaticamente lo stato precedente. Per questo le tecniche di fault tolerance sono essenziali per portare la dependability al livello successivo. Diverse tecniche servono a diversi livelli di requisiti: applicazioni che hanno bisogno di alta availability ma non necessariamente alta reliability possono accontentarsi di **logging e checkpointing** (vedi modulo C2); applicazioni più esigenti possono adottare tecniche di **recovery oriented computing**; entrambe le classi di tecniche si basano su **rollback recovery**, cioè tornare allo stato corretto più recente registrato.

### Mascheramento dei fault tramite ridondanza
L'idea è nascondere i fallimenti agli altri processi; la tecnica chiave per mascherare i fault è la **ridondanza**. Tre tipi di ridondanza:
- **information redundancy**: es. bit extra (codici di correzione).
- **time redundancy**: es. ripetere un'operazione dopo l'abort di una transazione.
- **physical redundancy**: tipica nei sistemi biologici (es. componenti hardware duplicati).

## Conclusioni del modulo
La dependability è una caratteristica essenziale per i sistemi distribuiti. Servono modelli per i sistemi e per le minacce per poterla gestire correttamente. Le tecniche per gestire i fallimenti determinano il livello di dependability di un sistema distribuito.
