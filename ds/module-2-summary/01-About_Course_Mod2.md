# About the Course — Modulo 2

## Docenti
- **Prof. Giovanni Ciatto** — giovanni.ciatto@unibo.it — office hours su appuntamento (via email).
- **Tutor Matteo Magnini** — matteo.magnini@unibo.it — office hours su appuntamento (via email).

## Canali di comunicazione
Priorità al **forum generale**: per qualunque domanda tecnica e per qualunque altra domanda non personale. Se si usa l'email, includere sempre tutti i docenti in CC, incluso il prof. Omicini, e chiarire nell'oggetto l'anno accademico e il nome del corso.

## Pagine del corso
Pagina istituzionale del corso, pagina Virtuale (iscriversi se non già fatto), pagina APICe, queste slide, repository di esempi ed esercizi, e una guida "Python Programming 101" per chi ha bisogno di rinfrescare le basi di Python.

## Organizzazione del Modulo 2
Lezioni in laboratorio con applicazione pratica immediata; esercizi ed esempi in Python; la sottomissione degli esercizi via GitHub può garantire punti extra; il lavoro di progetto finale può essere svolto in qualunque linguaggio di programmazione a scelta, con un report in inglese che segue un template LaTeX fornito.

## Orario
Venerdì 9:00–11:00 (2h) — Lab 3.1 (verificare l'orario ufficiale per eventuali cambiamenti, pubblicati sul forum News).

## Il workflow per il lavoro di progetto

### Parte 1
1. Proporre l'idea di progetto sul forum Projects (1-3 studenti per gruppo), aprendo una discussione intitolata `[Cognome1, Cognome2, ...] Project Proposal: <nome progetto>`, indicando: nomi ed email dei membri del gruppo; la visione del progetto (cosa si vuole realizzare, le funzionalità del sistema previsto); una motivazione di come/perché il progetto esplora i temi del corso (es. consistency, fault-tolerance, ecc.); quali tecnologie (linguaggi, librerie) si intende usare e perché; quali deliverable si intende produrre (applicazione, libreria, presentazione, ecc.) oltre al report finale; eventuali vincoli temporali stringenti.
2. Ogni comunicazione successiva sul progetto deve avvenire sullo stesso thread, usato come backlog ufficiale; per discussioni private, menzionare l'URL del thread nell'email.
3. Attendere l'approvazione dei docenti, che probabilmente stimeranno lo sforzo richiesto (chiedendo modifiche se eccessivo o insufficiente) e controlleranno sovrapposizioni con altri gruppi.

### Parte 2
4. Creare un repository GitHub per sviluppare il progetto, postandone l'URL sul thread; rendere tutti i membri del gruppo collaboratori del repository; dare diritti di amministratore completi ai docenti (username: `gciatto`, `matteomagnini`).
5. Lavorare sul progetto: fare commit e push frequentemente (solo il branch `master`/`main` verrà considerato per la valutazione); in parallelo, o successivamente, scrivere il report seguendo il template LaTeX fornito.
6. Una volta completato, postare un messaggio sul thread del progetto per segnalarne la fine: i docenti cloneranno il repository e valuteranno il codice.
7. I docenti possono richiedere modifiche, al codice o al report (o entrambi).
8. Una volta soddisfatti, sarà richiesto di presentare il lavoro al prof. Omicini, dopo aver fissato un appuntamento privato con lui: presentazione di 12-15 minuti + 5-10 minuti di domande e risposte.

## Obiettivi del Modulo 2
Insegnare a progettare e sviluppare sistemi distribuiti, in pratica, tramite un esempio guidato (il Pong distribuito); fornire un riferimento per lo sviluppo del progetto finale.

## Argomenti
Architetture e protocolli distribuiti; meccanismi di comunicazione (socket TCP/UDP); presentazione (serializzazione e deserializzazione — sezione non presente in questo PDF, probabilmente non ancora tenuta al momento dell'esportazione); problematiche della programmazione di sistemi distribuiti; [auspicabilmente] testing di sistemi distribuiti; [auspicabilmente] panoramica su framework/librerie per la programmazione distribuita.

## Prerequisiti
Conoscenza di base di Python (vedi "Python Programming 101" se mancante); conoscenza di base di Git; conoscenza di base della shell Linux; comprensione di base delle reti di computer, del modello ISO/OSI, dello stack TCP/IP.

## Requisiti software
**Richiesti**: una connessione internet funzionante; un'installazione Python 3.10+ funzionante.
**Raccomandati**: PyCharm oppure Visual Studio Code; un buon terminale Unix (preferire Git Bash su Windows).
