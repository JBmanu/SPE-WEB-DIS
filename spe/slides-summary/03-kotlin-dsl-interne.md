# Modulo 3 — Kotlin 203: DSL interne (Domain-Specific Languages)

> Continuazione diretta del modulo 2 (stesso deck di slide "Kotlin"): qui Kotlin viene usato come linguaggio ospite per costruire **DSL interne** (type-safe builder), sfruttando i meccanismi visti nella sezione "funzioni di estensione e tipi funzione con receiver" del modulo 2.

### Cosa sono le DSL
Linguaggi che catturano uno specifico dominio: di solito non pensati per il calcolo general-purpose (anche se alcuni potrebbero supportarlo), forniscono supporto a livello di linguaggio per esprimere le entità del dominio, la loro struttura, il loro comportamento e le loro interazioni. Poter esprimere una DSL richiede una formalizzazione del dominio, che a sua volta richiede una comprensione profonda del dominio stesso.

**Linguaggi con sintassi flessibile** sono buoni candidati per ospitare DSL: Scala (implicit, infixing, currying, parentesi mescolate), Groovy (trailing lambda, extension method, convenzione invoke), Ruby (metaprogrammazione potente, dinamicità), e naturalmente Kotlin (la cui sintassi è un mix di Groovy e Scala).

**Feature chiave per costruire DSL in Kotlin**: convenzione `invoke`, trailing lambda, definizione/overload di operatori, chiamate infix, funzioni di estensione, lambda/tipi funzione con receiver, membri di estensione.

### Approccio: prima il dominio, poi la DSL
1. Modellare il dominio (prerequisito), preferibilmente con interfacce, con focus su un'API di programmazione pulita.
2. Fornire un'implementazione per le entità del dominio.
3. Comporre gli elementi dell'API in blocchi DSL.

### Caso di studio: una DSL HTML

**Sintassi desiderata:**
```kotlin
html {
    head { title { -"A link to the unibo webpage" } }
    body {
        p("class" to "myCustomCssClass") {
            a(href = "http://www.unibo.it") { -"Unibo Website" }
        }
    }
}.render()
```

**Modello del dominio astratto**:
```kotlin
interface Element { fun render(indent: String = ""): String }
interface RepeatableElement : Element
interface Tag : Element {
    val name: String
    val children: List<Element>
    val attributes: Map<String, String>
}
interface RepeatableTag : Tag, RepeatableElement
interface TextElement : RepeatableElement { val text: String }
```
Un documento HTML è composto di `Element` (testo o tag), alcuni elementi sono "ripetibili" (il testo lo è sempre, alcuni tag lo sono).

**Implementazione**: si introduce un type alias `Attribute = Pair<String, String>` per maggiore chiarezza; `Text` implementa `TextElement` in modo banale; `AbstractTag` fattorizza la parte comune di tutti i tag — registra gli attributi al momento della creazione (con `vararg`), mantiene una lista mutabile (privatamente) di `children`, e durante la registrazione di un nuovo elemento controlla se è ripetibile o se è già presente un elemento dello stesso tipo concreto (in tal caso lancia un errore). Il rendering produce l'HTML con indentazione tramite multi-line string (`"""..."""`.trimMargin()`).

**Entry point della DSL**: una funzione top-level che applica un blocco di configurazione (funzione con receiver) sull'oggetto creato:
```kotlin
class HTML(vararg attributes: Attribute = arrayOf()) : AbstractTag("html", *attributes)
fun html(vararg attributes: Attribute, init: HTML.() -> Unit): HTML = HTML(*attributes).apply(init)
```
Si aggiungono via via gli altri tag (`Head`, `Title`, `Body`, ecc.), ognuno con il proprio metodo per registrare figli tipizzati, e si introduce un operatore `unaryMinus` su `String` (scoperto come membro di estensione di `TagWithText`) per scrivere testo semplice con la sintassi `-"testo"`.

**Riuso tramite ereditarietà**: tag comuni (es. `<a>` e `<p>`, validi ovunque nel `<body>`) si fattorizzano in una classe astratta intermedia (`BodyTag`) da cui le classi concrete derivano.

### Evitare le "fughe di scope" (scope leakage)
Senza precauzioni, è possibile scrivere codice sintatticamente valido ma semanticamente sbagliato, perché Kotlin risolve i metodi cercando anche nei receiver impliciti "esterni":
```kotlin
html { head { head { title { title { } } } } } // valido sintatticamente, ma produce HTML non valido!
```
Per impedirlo, Kotlin offre l'annotazione meta `@DslMarker`: si definisce una propria annotazione di scope (es. `@HtmlTagMarker`) e si annotano tutte le entità il cui `this` non deve essere richiamabile automaticamente dall'esterno del proprio scope immediato. Con il marker attivo, il codice sopra **non compila più**; resta comunque possibile accedere esplicitamente a un receiver esterno con la sintassi qualificata (`this@html.head { ... }`), ma bisogna farlo consapevolmente.

### Riepilogo del processo di costruzione di una DSL
1. Modellare prima il dominio.
2. Fornire un'implementazione per gli elementi del dominio.
3. Comporre gli elementi dell'API in blocchi DSL, usando: funzioni con receiver come blocchi di configurazione, membri di estensione per controllare lo scope, riuso tramite ereditarietà, e prevenzione delle fughe di receiver tramite `@DslMarker`.

