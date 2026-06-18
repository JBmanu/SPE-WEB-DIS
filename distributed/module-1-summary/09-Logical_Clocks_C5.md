# C5 — Logical Clocks

## Azioni, eventi e cause

Qualunque sistema computazionale può essere modellato come una sequenza di **azioni** eseguite, dove un'azione è definita da cambiamenti nello stato del sistema, o più in generale del mondo (es. leggere dalla memoria, scrivere su un file, accendere una lampada). In un sistema distribuito, le azioni vengono eseguite in più posizioni; in questo contesto sono spesso rappresentate in termini di **eventi** (es. inviare o ricevere messaggi, modificare un record in un database). La distribuzione fisica può variare enormemente: gli eventi in un sistema distribuito possono avvenire in una posizione vicina (es. processi diversi sulla stessa macchina), oppure essere sparsi geograficamente in tutto il mondo (o anche su scala più ampia in futuro).

Non tutti gli eventi sono correlati, ma alcuni eventi possono causare/influenzare il modo in cui altri eventi (successivi) si verificano (es. la risposta a un'email ricevuta è influenzata da quel messaggio — magari anche da messaggi precedenti ricevuti). Rilevare potenziali relazioni causa-effetto tra eventi è fondamentale per il design degli algoritmi distribuiti: oggi praticamente ogni servizio si basa, nel suo nucleo, su qualche forma di algoritmo distribuito (es. per mantenere la consistenza nei database replicati, eseguire il garbage collection, costruire checkpoint, analizzare la concorrenza...).

### Causalità interna ed esterna
Per dare senso alle relazioni causa-effetto, dovremmo limitarne la portata a ciò che può essere percepito all'interno del sistema distribuito stesso (**causalità interna**). Tuttavia, un sistema distribuito interagisce con il mondo fisico esterno, dove esistono altre relazioni causa-effetto su larga scala (**causalità esterna**) — esempio: Alice prenota una cena per due e lo dice a Bob, poi Bob prenota due biglietti del cinema per dopo cena; anche se entrambi i sistemi fanno parte dello stesso sistema più grande (es. ristorante in un multiplex), i due sistemi di prenotazione non sanno nulla della relazione causale esterna (Alice che lo dice a Bob). La causalità esterna in genere non può essere rilevata da un sistema distribuito e può essere approssimata solo dal tempo fisico, se si prescinde dalla conoscenza specifica del dominio.

## Rilevare la causalità

Per rilevare potenziali relazioni di causalità, serve una qualche relazione temporale tra eventi altrimenti non correlati in un sistema distribuito. Si parte dalla nozione che un evento c può causare un evento e se e solo se: con c, e che avvengono nello stesso processo, c è stato eseguito per primo; oppure, con c, e che avvengono in processi diversi, e potrebbe sapere di c sulla base di qualche messaggio ricevuto da qualche processo che sa di c. Altrimenti, non c'è modo che c possa funzionare come causa di e.

### La relazione happens-before (Lamport, 1978)
Nel 1978, Leslie Lamport definì un ordine parziale, indicato come la relazione **happens-before**. Date generiche azioni a, b, c: `a → b` rappresenta la relazione "a accade prima di b" — significa che (tutti i processi concordano sul fatto che) a si verifica per primo, poi si verifica b. `a → b` può essere osservato direttamente in due situazioni:
1. se a e b sono eventi dello stesso processo, e a viene prima di b, allora `a → b` — gli eventi locali sono ordinati dal tempo locale;
2. se un messaggio viene inviato da un processo con un evento a, e ricevuto da un altro processo con un evento b, allora `a → b` — un messaggio richiede una quantità di tempo finita, positiva, non nulla per propagarsi dal mittente al destinatario.

`a → b` è una relazione transitiva: `a → b`, `b → c` implicano `a → c`. La relazione happens-before definisce un **ordinamento parziale** sugli eventi di un sistema distribuito: quando né `a → b` né `b → a` possono essere osservati, allora non si può dire nulla sul loro ordinamento — a e b sono detti **concorrenti**: `a ∥ b`.

### Percorsi causali (causal paths)
In una computazione distribuita, un modo semplice per verificare se un evento c potrebbe aver causato un altro evento e è trovare almeno un percorso diretto da c a e, basato sulla relazione happens-before (opportunamente definita come relazione transitiva). Se viene trovato un tale percorso diretto, c è una possibile causa per e: `c → e`. Se non esiste alcun percorso causale in nessuna delle due direzioni, gli eventi sono concorrenti.

### Storie causali (causal histories)
Per ciascun evento si può costruire una **storia causale**: l'insieme di tutti gli eventi che potrebbero averlo causalmente preceduto (cioè tutti gli eventi raggiungibili percorrendo a ritroso le relazioni happens-before). Le storie causali crescono via via che il sistema evolve, e ogni volta che un messaggio viene scambiato, la storia causale del destinatario incorpora quella del mittente.

### Tempo, cause, eventi
Nei sistemi distribuiti, il tempo potrebbe funzionare come un'approssimazione della causalità (qualcosa che accade prima nel tempo potrebbe essere la causa di qualcosa che accade dopo); tuttavia, in questo modo si perde traccia di qualunque connessione esplicita tra eventi in processi distribuiti (cioè un messaggio), e una nozione di tempo comune in un sistema distribuito potrebbe semplicemente non esistere. Una nozione **logica** di tempo può essere d'aiuto.

## Il tempo logico

### Definizione
Connettendo tempo ed eventi: per un evento a, esiste un valore di tempo condiviso C(a) tale che ogni processo concordi su di esso (il valore di tempo dovrebbe essere pensato come il valore di un orologio logico su cui i processi concordano). Più formalmente: se H è il dominio degli eventi, e T il dominio del tempo (logico), un **orologio logico** è una funzione C : H → T tale che sia soddisfatta la seguente proprietà di monotonicità (**condizione di consistenza dell'orologio**):

∀a, b ∈ H, a → b ⟹ C(a) < C(b)

Quando T e C soddisfano inoltre la condizione più forte ∀a, b ∈ H, a → b ⟺ C(a) < C(b), il sistema di orologi è detto **strongly consistent (fortemente consistente)**.

### Implementare gli orologi logici
Implementare orologi logici richiede di affrontare due questioni: (1) ogni processo necessita di strutture dati locali per rappresentare il tempo logico; (2) serve un protocollo condiviso per aggiornare le strutture dati garantendo la consistenza. Ogni processo pi mantiene un orologio logico locale e un orologio logico globale: l'orologio locale rappresenta il progresso del processo nel tempo, l'orologio globale rappresenta la vista del processo sul tempo globale. Servono due regole per gestire consistentemente gli orologi logici, definendo come l'orologio locale e quello globale vengono aggiornati.

I sistemi di orologi logici differiscono nella rappresentazione del tempo logico e nel protocollo per aggiornarlo; tuttavia tutti i sistemi di orologi logici implementano le due regole sopra menzionate, garantendo così la fondamentale proprietà di monotonicità associata alla causalità; inoltre, ciascun sistema di orologi logici fornisce alcune proprietà specifiche (es. il tempo scalare).

## L'algoritmo di Lamport: il tempo scalare

### Implementazione
Ogni processo pi mantiene un orologio locale `lci` (e un incremento locale δi). Gli orologi locali vengono aggiornati seguendo tre passi:
1. prima di ogni evento locale, pi incrementa `lci`: `lci ← lci + δi` (δi può essere 1, nel qual caso altre proprietà sono garantite dal protocollo);
2. quando invia un messaggio m a pj, il processo pi allega (piggyback) a m il valore `lci`, dopo averlo aggiornato;
3. alla ricezione di un messaggio m, il processo pj aggiusta il proprio contatore locale `lcj` per essere coerente con il valore `lci` ricevuto come timestamp di m: `lcj ← max(lcj, lci)`.

### Tempo globale distribuito
`lci` è il tempo locale del processo pi; a ∈ H è un evento nel sistema distribuito; per ogni i, per ogni a ∈ pi: `C(a) ← lci(a)`. Allora C(a) è il **tempo globale (logico)** per il sistema distribuito.

### Consistenza degli orologi scalari
Gli orologi scalari sono monotoni per costruzione, quindi soddisfano la proprietà di consistenza: ∀a, b ∈ H, a → b ⟹ C(a) < C(b).

### Ordinamento totale degli eventi
Gli orologi scalari possono essere usati per stabilire una relazione di **ordinamento totale** tra gli eventi, usando un meccanismo di "tie-breaking" per gli eventi concorrenti (quando a, b ∈ H, C(a) = C(b)), ad esempio fornendo ai processi identificatori linearmente ordinati (con l'assunzione che gli eventi concorrenti siano indipendenti, quindi nessuna relazione di causalità viene violata). Le proprietà di liveness tipicamente si basano sull'ordinamento totale e su code di eventi.

### Conteggio degli eventi (event counting)
Se l'incremento δ è sempre 1, gli orologi scalari hanno la seguente proprietà: se un evento a ha timestamp h, allora h−1 rappresenta la durata logica minima in termini di numero di eventi — cioè il numero di eventi necessari per produrre l'evento a è h−1, chiamato l'**altezza** dell'evento. In altre parole, h−1 eventi sono stati prodotti sequenzialmente prima dell'evento a, indipendentemente dai processi che li hanno prodotti.

### Mancanza di forte consistenza
Il sistema degli orologi scalari **non è fortemente consistente**: non vale ∀a, b ∈ H, C(a) < C(b) ⟹ a → b (cioè può accadere che C(a) < C(b) senza che a → b sia vero). Questo accade perché l'orologio logico locale e quello globale di un processo vengono "schiacciati" (squashed) in un unico valore, perdendo informazione sulla dipendenza causale tra eventi su processi diversi. Esempio tipico: quando un processo riceve un primo messaggio da un altro processo e aggiorna il proprio orologio al massimo tra il proprio valore e quello ricevuto, dimentica il timestamp esatto dell'evento più recente da cui dipende sul processo mittente.

## I Vector Clocks (orologi vettoriali)

### Il problema
In sostanza: `a → b` implica `C(a) < C(b)`, ma `C(a) < C(b)` non implica `a → b` — quindi, ad esempio, i valori di tempo potrebbero essere totalmente ordinati anche quando gli eventi non lo sono; quando gli eventi non sono correlati, il confronto dei valori di tempo è privo di significato. Gli orologi scalari non dicono nulla su questo. Serve qualcosa in più (vedi le storie causali sopra), per dire in particolare se a e b sono (non) correlati / concorrenti.

### Definizione
Un **vector clock (orologio vettoriale)** di un sistema di n processi è un array/vettore di n orologi logici, uno per ciascun processo (ipotesi: il numero n di processi è noto; si possono usare vettori più piccoli, ma tutte le proprietà sono dimostrate valere con n). Ogni processo pi mantiene un vettore `vci` tale che:
- `vci[i]` è il numero di eventi accaduti finora in pi (sostanzialmente l'orologio scalare locale di pi) — ogni nuovo evento in pi incrementa `vci[i]`;
- `vci[j] = k` significa che pi sa che (almeno) k eventi sono accaduti in pj (sostanzialmente l'orologio scalare di pj secondo la migliore conoscenza di pi) — ogni messaggio inviato da pi è accompagnato (piggyback) dal vettore corrente `vci` come timestamp.

### Regole
- Prima che qualunque azione venga eseguita in pi, `vci` viene aggiornato: `vci[i] ← vci[i] + 1`.
- Quando un messaggio m viene inviato da pi a pj, m viene marcato con timestamp dal vettore `vci`: `ts(m) ← vci`.
- Quando un messaggio m viene ricevuto da pj, `vcj` viene aggiustato di conseguenza: per ogni k, `vcj[k] ← max(vcj[k], ts(m)[k])` (se m proviene da pi con timestamp `vci`, per ogni k: `vcj[k] ← max(vcj[k], vci[k])`).

### Ordinamento
Etichettando ogni evento m con `vc(m)`, e definendo una relazione di ordinamento per gli orologi vettoriali:

`vc(m1) < vc(m2)` ⟺ (∀i: `vc(m1)i ≤ vc(m2)i`) ∧ (∃i′: `vc(m1)i′ < vc(m2)i′`)

Questa relazione è antisimmetrica e transitiva; cattura gli orologi logici semplici, ma soprattutto cattura una relazione **causale** tra due eventi, tale che `vc(m1) < vc(m2) ⟹ m1 → m2`. Di conseguenza, **gli orologi vettoriali garantiscono la forte consistenza**: `vc(m1) < vc(m2) ⟺ m1 → m2`, anche se la relazione di ordinamento su vc non è di per sé totale.

### Risultato
Ogni processo sa quanti eventi hanno preceduto l'invio del messaggio ricevuto presso il processo mittente: l'informazione sulla "catena di eventi" è in qualche modo preservata e condivisa tra i processi. Ciascun `ts(m)[i]` si riferisce agli eventi che causalmente precedono m all'interno di ciascun processo pi; `ts(m)` tiene traccia di tutti gli eventi che possono aver causalmente preceduto l'invio di m, da cui m può dipendere causalmente.

### Matrix Time (cenno)
Anche con gli orologi vettoriali avviene ancora un po' di "schiacciamento" (squashing) dell'informazione; i **matrix clocks (orologi a matrice)** estendono ulteriormente il tempo logico, ma il corso si ferma qui.

## Conclusioni del modulo
Azioni ed eventi nei sistemi distribuiti possono essere osservati attraverso la lente della causalità; la relazione happens-before può catturare la causalità potenziale; orologi logici, orologi vettoriali e orologi a matrice possono fornire tempo logico a un sistema distribuito per tenere conto dell'ordinamento temporale e della causalità.

> **Nota di collegamento**: questo modulo approfondisce in dettaglio quanto introdotto in modo discorsivo nel modulo M6 (Computing with Time), dove si era già osservato che, in assenza di un tempo fisico globale affidabile, il vero requisito per molti sistemi distribuiti è solo un ordinamento condiviso degli eventi — non necessariamente legato al tempo reale.
