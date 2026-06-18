# Complementi pratici: basi di Git, QA concreta, delivery e indice del corso

> Questo file raccoglie i contenuti che compaiono nelle lezioni di richiamo/applicate del corso e che **non sono duplicati** rispetto agli altri moduli: in particolare il **ripasso base di Git** (dato per scontato nel modulo "Git avanzato"), alcuni **esempi concreti di configurazione QA**, i **target di pubblicazione (delivery)** e la **struttura ufficiale del corso**.

## Le basi di Git (ripasso essenziale)

Git è il DVCS (Distributed Version Control System) di riferimento de-facto: distribuito, con tracciamento differenziale, nato nel 2005 per sostituire BitKeeper come SCM del kernel Linux (sviluppato da Linus Torvalds, oggi mantenuto principalmente da Junio Hamano), orientato a Unix (traccia i permessi dei file), molto veloce (alla nascita 10 volte più veloce di Mercurial e 100 volte più veloce di Bazaar).

| Concetto/comando | Significato |
|---|---|
| **Repository** | la collezione di metadati con la storia del progetto, reificata nella cartella `.git`; la sua posizione segna la radice del repository |
| **Working tree** | la cartella associata alla radice del repository e il suo contenuto; non tutti i file nella working tree sono tracciati |
| `git init` | inizializza un nuovo repository nella cartella corrente |
| **Stage** (indice) | le modifiche che verranno salvate al prossimo commit |
| `git add <file>` / `git reset <file>` | sposta le modifiche correnti nello stage / le rimuove dallo stage |
| `.gitignore` | elenco di pathspec che git deve ignorare anche se si tenta di aggiungerli (forzabile con `--force`) |
| `.gitattributes` | definisce attributi per i pathspec: es. forzare il fine-riga corretto (`text=auto eol=lf`), abilitare il diff di file binari tramite conversione a testo |
| `git commit` | crea un changeset col contenuto dello stage; richiede un messaggio (usare messaggi appropriati è fondamentale) |
| **HEAD** | puntatore al commit corrente; può essere agganciato a un branch o "detached" |
| `git tag -a` | associa un nome simbolico a un commit (tipicamente per il versioning) |
| **Branch** | una linea di sviluppo con nome; il branch di default si chiama tradizionalmente `master` (retaggio di BitKeeper; le versioni moderne di git permettono di sceglierne il nome, alcuni preferiscono `main`) |
| `git checkout` | sposta `HEAD` tra i commit, si usa per cambiare branch o (con `-b`) per crearne uno nuovo; se `HEAD` non è sull'ultimo commit di un branch si entra in modalità **detached HEAD** (i commit fatti in questo stato non vengono salvati su nessun branch) |
| `git branch` | crea/visualizza/elimina (`-d`) i branch |
| `git merge` | unisce un branch target col branch corrente, creando un merge commit (algoritmo configurabile, conflitti da risolvere a mano); in modalità **fast-forward** (attiva di default, disattivabile con `--no-ff`) se il branch corrente è "indietro" rispetto al target, l'aggiornamento avviene senza creare un commit |
| **Remote** | (possibilmente remote) location che ospitano copie dei branch del repository; `git remote` le configura; **upstream branch** = il branch remoto di default per le operazioni di rete (al massimo uno per branch locale) |
| `git clone` | copia un repository da una location remota (alternativa a `init`); importa solo il branch di default remoto (dove punta `HEAD`) e imposta automaticamente l'upstream del branch locale |
| `git fetch <remote>` | aggiorna lo stato di `<remote>` (se omesso, aggiorna il remote dell'upstream del branch corrente) |
| `git pull <remote> <branch>` | scorciatoia per `git fetch && git merge FETCH_HEAD` |
| `git push <remote> <branch>` | invia le modifiche locali al branch remoto (richiede una storia comune; se omessi remote/branch, va all'upstream) |

**Argomenti Git avanzati** (trattati in dettaglio nel modulo "Git avanzato e workflow DVCS"): tag leggeri, commit firmati, stash, submodule, bisezione, rebase, squash, cherry-pick, hook, sotto-comandi git custom.

**Best practice consigliate**: la CLI è la "fonte di verità" (attenzione alle GUI, e non copiare/incollare comandi da un LLM senza capirli); preparare presto una ignore-list e mantenerla (idealmente scritta a mano, non copiata da template); quando ci sono file non tracciati, decidere esplicitamente se tracciarli o ignorarli; fare molta attenzione a cosa si traccia; preparare un file di attributi.

**GitHub**: hosting per repository git, gratuito per progetti open source (con alcune limitazioni per il codice proprietario, e account accademici dedicati); standard de-facto per i progetti open source; offre un sito statico per progetto/utente/organizzazione con supporto di prim'ordine per Jekyll (framework Ruby per siti statici).

## Esempi concreti di configurazione QA con Gradle

A complemento della trattazione generale della Quality Assurance (vista nel modulo Build Automation), ecco due configurazioni concrete:

**JUnit 5 con Gradle** (progetto Scala/Java):
```kotlin
dependencies {
    implementation("org.scala-lang:scala3-library_3:3.7.4")
    // Il BOM (Bill of Materials) sincronizza coerentemente tutte le versioni di JUnit
    testImplementation(platform("org.junit:junit-bom:6.1.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
tasks.named<Test>("test") { useJUnitPlatform() } // necessario per JUnit 5
```

**ScalaTest + Scoverage con Gradle** (cambiando framework di test e abilitando la code coverage):
```kotlin
plugins {
    java
    scala
    id("com.github.maiflai.scalatest") version "0.33"
}
dependencies {
    val scalaVersion = "3.8.4"
    implementation("org.scala-lang:scala3-library_3:$scalaVersion")
    testImplementation("org.scalatest:scalatest_3:3.2.12")
    testRuntimeOnly("com.vladsch.flexmark:flexmark-all:0.64.8") // necessario per generare i report HTML
}
```
```scala
// src/test/scala/Test.scala
class MyTests extends AnyFunSuite:
  test("An empty Set should have size 0") {
    assert(Set.empty.isEmpty)
  }
```

In entrambi i casi il task standard `test` (introdotto dal plugin `java`, applicato anche dal plugin `scala`) esegue tutti i test, mentre `check` esegue l'intera suite di quality assurance.

**Servizi esterni per QA e reportistica aggiuntiva**: Codecov.io (code coverage, supporta i report JaCoCo XML, buon sistema di reportistica dati), SonarCloud (misure multiple: affidabilità, sicurezza, manutenibilità, duplicazione, complessità...), Codacy e CodeFactor (QA automatizzata multi-linguaggio).

## Delivery automatizzata: dove pubblicare gli artefatti

Una volta che l'ambiente di riferimento in CI ha completato build e test, il software va firmato e consegnato (delivery), eventualmente fino al deploy effettivo. Possibili **target di delivery**:

| Target | Note |
|---|---|
| **GitHub Releases** | supporta il *retract* (si può rimuovere), agnostico rispetto al linguaggio, ottimo per le release generiche |
| **Sonatype OSSRH (Maven Central)** | standard de-facto per i prodotti JVM, **nessuna politica di retract** |
| **GitHub Packages** | nessun retract, richiede autenticazione anche solo in lettura, prodotto ancora immaturo |
| **JFrog Bintray** *(dismesso dal 2021-05-01)* | offriva Maven Central + altro, citato come riferimento storico |

**Perché di solito non si può fare retract**: una volta pubblicato, un errore in una release resterà nel repository per sempre — bisogna pubblicare una nuova versione con un numero diverso, non correggere quella esistente. Aneddoto esemplificativo: nel marzo 2016 lo sviluppatore Azer Koçulu rimosse da NPM oltre 250 suoi moduli (in seguito a una disputa sul nome del modulo `kik`); tra questi c'era **`left-pad`**, un modulo JavaScript di appena 11 righe ma usato da migliaia di progetti come dipendenza transitiva — la sua sparizione causò la rottura di numerosi prodotti JavaScript (tra cui Node e Babel), tanto che NPM dovette "ripubblicare" il pacchetto contro la volontà dell'autore. Questo episodio è l'esempio classico a sostegno delle politiche di no-retract.

## Struttura ufficiale del corso (indice)

Le slide del corso si articolano in due moduli principali:

**Modulo 1**: la filosofia DevOps · Kotlin per sviluppatori Scala (incluso costruzione di DSL interni) · Build automation · Condivisione (versioning e licensing del software) · Continuous integration/delivery/deployment · Version control avanzato.

**Modulo 2**: Domain Driven Design · Model Driven Development · Containerizzazione e Orchestrazione · Programmazione multi-piattaforma · *Performance engineering*.

> **Nota importante**: la *Performance engineering*, pur elencata tra i temi ufficiali del corso (anche nella sezione "Course themes" introduttiva, insieme a "Bug hunting"), **non risulta accompagnata da slide dedicate** nel materiale fornito — verosimilmente trattata a lezione con modalità diverse (live coding, guest lecture) o non ancora coperta nell'export disponibile. Si raccomanda di verificarne la trattazione effettiva con i docenti, specialmente in vista dell'esame.

Il corso, in breve: **6 CFU**, primo semestre, docenti Danilo Pianini e Giovanni Ciatto, lezioni in laboratorio con pratica immediata (giovedì e venerdì, 11:00–14:00).
