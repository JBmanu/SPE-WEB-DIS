# Requisiti per l'esame di Software Process Engineering

> Basato sulle slide ufficiali del corso (sezioni "Organization", "Goals", "Prerequisites", "Exam", "Project Work", "Software", "Course details"). Verificare sempre eventuali aggiornamenti sul forum/Virtuale del corso, poiché regole d'esame possono cambiare.

## 1. Informazioni generali sul corso

- **Docenti**: Danilo Pianini (danilo.pianini@unibo.it) e Giovanni Ciatto (giovanni.ciatto@unibo.it).
- **Crediti**: 6 CFU, primo semestre.
- **Modalità lezioni**: in laboratorio, con pratica immediata (hands-on). Orario tipico: giovedì 11:00–14:00 (Aula 2.5) e venerdì 11:00–14:00 (Lab 4.2) — eventuali cambi vengono pubblicati sul forum.
- **Canali di comunicazione**: usare **prioritariamente il forum** di Virtuale per ogni domanda tecnica o non personale; se si scrive via email, includere **sempre entrambi i docenti**.
- **Materiali**: le slide del corso dovrebbero contenere tutto il necessario; il codice mostrato a lezione viene reso disponibile subito dopo (gran parte è già su GitHub); nessun libro è obbligatorio, ma sono indicate letture consigliate e libri aggiuntivi sulla pagina del corso.

## 2. Obiettivi del corso

1. Imparare a progettare sistemi software seguendo un approccio domain-, model- e/o test-driven.
2. Zero overhead dalla definizione del dominio al codice eseguibile.
3. Pratiche di sviluppo agile, filosofia DevOps.
4. Alta automazione + eccellenza tecnica.
5. Comprendere analogie e differenze tra piattaforme di programmazione.

## 3. Prerequisiti

- Conoscenza di **Java**; la conoscenza di **Scala** è un plus (molte spiegazioni di Kotlin nel corso confrontano direttamente con Scala).
- Conoscenza minima di **git**: inizializzazione/gestione del repository, commit, branching e merging, fetch e push.
- Una mentalità curiosa: "non fermarti quando funziona, fermati quando sai *perché* funziona" — principio esplicitamente rimarcato come ancora più importante "nell'era degli LLM".

## 4. Software necessario

**Richiesto**:
- Connessione internet funzionante.
- Installazione JDK funzionante (è consigliato l'uso di **Jabba** per gestire le versioni).
- **Docker**.

**Consigliato**:
- Kotlin, Gradle.
- IntelliJ IDEA, Visual Studio Code.
- Un terminale Unix decente (consigliata una shell **zsh** ben configurata).
- **ki-shell** (Kotlin Interactive Shell).

**Scorciatoie pratiche**: i docenti forniscono un **container Docker con tutto il software del corso preinstallato** (`docker hub: danysk/linux-didattica`, istruzioni su `github.com/DanySK/docker-linux-didattica`), convertibile anche in una distribuzione **WSL2** su Windows. I PC del laboratorio sono già equipaggiati con l'immagine WSL2 (icona sul desktop, attendere che il primo terminale sia pronto prima di aprirne altri).

## 5. L'esame: requisiti obbligatori del progetto

L'esame consiste nella **discussione di un progetto di gruppo**. Il progetto **deve obbligatoriamente includere**:

1. **Domain-Driven Design**: applicazione concreta delle tecniche DDD viste a lezione (identificazione del dominio, linguaggio ubiquo, building block — entity, value object, aggregate root, repository, factory, service, domain event — e idealmente un'architettura a layer/esagonale).
2. **Un processo di sviluppo chiaro e pratiche DevOps**: workflow di versionamento ben definito (es. Gitflow, trunk-based, fork+PR), responsabilità condivise, automazione del processo.
3. **Automazione a tutto tondo (full-scale automation)**, che include esplicitamente:
   - **Continuous Integration**;
   - **Continuous Delivery**.
4. **Automazione del deploy tramite containerizzazione e/o orchestrazione** (es. Docker, Docker Compose, Docker Swarm, Kubernetes).
5. **Coinvolgimento tecnico di almeno 2 piattaforme target** (es. JVM, NodeJS, Python, C, C++, Rust, Go...). Regole precise per stabilire se due target sono "diversi":
   - due target sono **diversi** se girano su runtime diversi (es. nativo + JVM);
   - due target sono **probabilmente diversi** se usano sistemi di build diversi — **ma con eccezioni**: ad esempio Scala/sbt + Java/Gradle **non** sono considerati target diversi dai docenti.

### Varianti accettate per il progetto

- **Progetto condiviso con altri corsi**: è esplicitamente permesso portare un progetto sviluppato per un altro corso e applicarvi le tecniche DDD/DevOps richieste da Software Process Engineering — va bene, perché ciò che conta per SPE è la modellazione del dominio e l'applicazione delle tecniche DevOps, non l'originalità del progetto in sé.
- **Progetto creato solo per SPE**: se manca un'idea di progetto, i docenti offrono supporto per trovarne una.
- **Progetto che copre SPE + tesi**: è possibile far coincidere il progetto del corso con il lavoro di tesi.
- **"Project Work" con azienda committente**: il progetto può essere svolto come collaborazione con un'azienda reale che fornisce i requisiti (agendo da committente). In questo caso lo studente applica il DDD su un pezzo di software reale interagendo con l'azienda, il progetto risultante deve essere **open source**, e **tutti i requisiti del progetto "normale" restano validi**. È un'opportunità di "imparare facendo" in un contesto vicino all'industria. I project work disponibili vengono pubblicati sul sito del corso (`virtuale.unibo.it`).

## 6. Requisiti facoltativi e suggerimenti per massimizzare il voto

Quanto segue **non è esplicitamente richiesto** dalla slide "EXAM", ma rappresenta l'insieme delle tecniche e pratiche più avanzate insegnate nel corso: includerle nel progetto (in modo pertinente e ben motivato, non "a caso") è il modo più naturale per dimostrare padronanza completa del programma e puntare al massimo dei voti.

### Versionamento e workflow
- Versionamento **automatico** basato sul DVCS (`git describe`) o sui messaggi di commit (**Conventional Commits** + **semantic-release**), invece di scegliere i numeri di versione a mano.
- Uso di tecniche Git avanzate dove pertinente: tag annotati, commit firmati (GPG), rebase interattivo per una storia pulita, cherry-picking, bisezione per il bug hunting, eventuali submodule per dipendenze multi-repo.
- Adozione di un modello di branching esplicito e motivato (Gitflow completo con feature/release/hotfix branch, oppure trunk-based se il team è piccolo e affiatato) invece di un workflow improvvisato.

### Build automation e qualità del codice
- Build completamente automatizzata con Gradle: gestione esplicita degli **scope delle dipendenze**, eventuale **dependency locking**, uso di **version catalog** per la DRY-ness.
- **Quality Assurance oltre il testing**: analizzatori statici, coverage (JaCoCo/Scoverage), reportistica con servizi esterni (**SonarCloud**, **Codecov**, **Codacy**, **CodeFactor**).
- Tentare l'autocertificazione tramite la **CII Best Practices Badge Program** (Linux Foundation) — è una checklist gratuita di auto-certificazione per progetti FLOSS di alta qualità, che produce un badge da poter mostrare nella home del progetto: seguirla è un ottimo modo per dimostrare attenzione alla qualità.
- Pubblicazione reale di artefatti su un repository pubblico (Maven Central, npm...) con relativa firma/credenziali, invece di limitarsi a una build locale.

### CI/CD
- Pipeline CI **multi-piattaforma e multi-OS** (matrice di build su più versioni/OS), non solo un singolo job su Ubuntu.
- Uso di **secret** gestiti correttamente (mai in chiaro), **DRY in CI** tramite composite actions o reusable workflow invece di duplicare YAML.
- Vera **Continuous Delivery/Deployment**: pipeline che produce e pubblica artefatti automaticamente (non solo build/test), idealmente con strategie di rilascio progressivo (blue-green, canary).
- Template per issue e pull request ben strutturati (dimostra attenzione alla collaborazione, non solo al codice).

### Containerizzazione e orchestrazione
- Andare oltre un singolo `Dockerfile`: gestione corretta di **volumi** (persistenza dati) e **reti** Docker, immagini multi-stage e ottimizzate (layer caching).
- Vera **orchestrazione** (Docker Compose per ambienti complessi, Swarm o **Kubernetes** con Deployment/Service/autoscaling) invece del singolo container isolato — Kubernetes in particolare dimostra di aver assimilato argomenti più avanzati del corso (non richiesti esplicitamente, ma disponibili come modulo dedicato).

### Domain-Driven Design avanzato
- Utilizzo dei **pattern di integrità del modello** (Shared Kernel, Customer-Supplier, Conformist, Anti-corruption layer) se il progetto ha più contesti delimitati che interagiscono.
- **Event Sourcing** e/o **CQRS** se il dominio si presta a un caso d'uso con separazione lettura/scrittura o storicizzazione degli eventi.
- Un'**architettura esagonale** ben strutturata in moduli separati (es. sotto-progetti Gradle `:domain`, `:application`, `:storage`, `:presentation`).

### Model-Driven Development e DSL
- Se pertinente al dominio, costruire un **DSL interno** in Kotlin (sfruttando trailing lambda, infix, extension function) per configurare o esprimere parte del dominio in modo elegante — è un argomento specificamente enfatizzato dai docenti come distintivo del corso.
- In alternativa/aggiunta, un **DSL esterno** con Xtext per casi d'uso più complessi che richiedono una sintassi del tutto custom.

### Programmazione multi-piattaforma
- Oltre al requisito minimo di 2 piattaforme target, valutare se applicare consapevolmente uno dei due approcci visti ("write once build anywhere" con **Kotlin Multiplatform**, oppure "write first wrap elsewhere" con bridge come **JPype**) e motivare la scelta nella discussione del progetto.

### Licensing e documentazione
- Scelta di una **licenza open source** esplicita e motivata (es. MIT, Apache 2.0, GPL...) coerente con gli obiettivi del progetto, invece di lasciarlo "unlicensed".
- Documentazione del repository tramite **GitHub Pages**, README curato, eventuale generazione automatica della documentazione del codice.

### In sintesi: la checklist per il voto massimo

Il progetto "minimo" copre i 5 punti obbligatori della sezione 5. Per puntare al massimo (30L) conviene mostrare che ogni pratica è stata **scelta consapevolmente e motivata**, non solo applicata meccanicamente: in sede di discussione, sapere spiegare *perché* si è scelto un certo pattern DDD, un certo modello di branching, una certa strategia di delivery, è probabilmente più importante che spuntare quante più voci possibili dalla lista dei "facoltativi".
