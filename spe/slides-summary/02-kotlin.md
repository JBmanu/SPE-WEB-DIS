# Modulo 2 — Kotlin (per sviluppatori Scala)

## 2.1 Perché Kotlin

Kotlin è un linguaggio moderno creato da JetBrains, orientato all'"uso pratico". Ha guadagnato slancio da quando Google lo ha adottato come linguaggio ufficiale per Android (inizialmente insieme a Java e C++, oggi Android è "Kotlin-first"). È chiaramente influenzato da un mix di Java, C#, Scala e Groovy. Nel corso serve principalmente per Gradle e per la realizzazione di DSL interne.

**Filosofia, Kotlin vs Scala**:
- **Scala** è un linguaggio "scalabile": pochi costrutti core che abilitano una grande varietà di pattern di programmazione; nato in accademia, adottato da alcune industrie; type checker allo stato dell'arte con feature avanzate (Higher Kinded Types, type lambda, macro).
- **Kotlin** è "un Java migliore": nato nell'industria per l'industria; molti più costrutti/parole chiave "core" rispetto a Scala; focalizzato sulla produttività rapida e sulla riduzione degli errori di programmazione; forte attenzione al multi-target (compila verso JVM, JavaScript, WASM e nativo, incluso iOS), con cura per la compatibilità bidirezionale.

## 2.2 Kotlin 101 — le basi

### Funzioni, costanti, variabili
Sintassi simile a Scala, ma `def` è sostituito da `fun`:
```kotlin
val x = 10 // costante
var y = 20 // variabile, può essere riassegnata
fun foo() = 20 // definizione di funzione, espressione singola
fun bar(): Int { // come sopra ma con più espressioni, richiede return
    return 20
}
fun baz() { } // a meno che ritorni Unit
```

### Parametri e tipi di ritorno
Come in Scala: tutti i parametri sono nominati ma possono essere invocati posizionalmente; possono avere valori di default; i tipi si annotano dopo il nome del parametro; l'invocazione può essere posizionale o nominale, con la regola che una volta usato un parametro nominale, anche i successivi devono essere nominali.
```kotlin
fun foo(a: Int = 0, b: String = "foo"): Int = TODO()
foo(1, "bar")        // OK, posizionale
foo(a = 1, b = "bar") // OK, nominale
foo(1, b = "bar")     // OK, ibrido
foo(a = 1, "bar")     // errore
```

### Funzioni top-level
Simile a Scala 3 (non supportato in Scala 2). Quando il target è la JVM, Kotlin genera dietro le quinte una classe `NomeFileKt` dove la funzione viene memorizzata (comportamento controllabile via annotazioni).

### Entry point del programma
Una funzione chiamata `main` è un entry point valido, con o senza il parametro `Array<String>`.

### Tipi nullable
Ogni tipo Kotlin esiste in due forme: normale e **nullable** (probabilmente ispirato a Ceylon). I tipi nullable sono suffissati da `?` e richiedono gestione speciale; `null` non può essere assegnato a tipi non-nullable. I nullable sono il modo Kotlin di gestire i tipi Option.
- **Safe call `?.`**: accede a runtime a un membro di un oggetto nullable se non è null, altrimenti ritorna null (simile a `map` su Option in Scala, ma senza coinvolgere una monade).
- **Non-null assertion `!!`**: asserisce che l'oggetto nullable non è null a runtime, "invalidando" il senso di avere tipi nullable — da non usare quasi mai (lancia `KotlinNullPointerException` se il valore è null).
- **Operatore Elvis `?:`**: ritorna l'operando sinistro se non è null, altrimenti il destro: `baz?.length ?: 0`.
- **Platform types**: i tipi provenienti da piattaforme senza nullable (JVM/JS/nativo) hanno nullability sconosciuta. Kotlin li marca con `!` (es. `java.util.Date!`); al primo uso vengono implicitamente disambiguati e il compilatore inserisce controlli runtime fail-fast. I platform type non possono essere creati direttamente in Kotlin, derivano solo dall'interazione con codice "di piattaforma"; se la piattaforma offre un modo per asserire la non-nullabilità (es. annotazione `@NotNull` in Java) Kotlin la sfrutta.

### Gerarchia dei tipi
| Linguaggio | Top type | Bottom type |
|---|---|---|
| Java | `Object` | nessuno |
| Scala | `Any` | `Nothing` |
| Kotlin | `Any` / `Any?` | `Nothing` |

### Booleani e tipi numerici
`Boolean`/`Boolean?` come in Java/Scala ma con nullability (i `Boolean?` sono sempre boxed). Tipi numerici come Scala più nullability e tipi unsigned sperimentali (`UByte`, `UShort`, `UInt`, `ULong`).

**Conversioni implicite — il problema di Scala**: in Scala, boxing + singleton rendono l'uguaglianza inconsistente (`Double.NaN == Double.NaN` è `false` ma `Double.NaN equals Double.NaN` è `true`; `val a: Int = 1; val b: Long = a; a == b` è `true` ma `a equals b` è `false`). **Kotlin previene questo**: le conversioni numeriche sono manuali — `val l: Long = i` dà errore di compilazione, bisogna scrivere `i.toLong()`; gli operatori sono però overloaded per i confronti misti (`i + l` funziona).

### Letterali numerici
```kotlin
1_234_567   // Int con underscore (preferibile)
123L        // Long
1.0         // Double
123e4       // Double notazione scientifica
1f          // Float (1d NON è valido)
1u          // UInt
0xCAFE      // Hex Int
0b111...    // Binario
```

### Stringhe e template
Sintassi `$variabile` / `${espressione}` in stile Groovy (templating) oltre alla concatenazione in stile Java. Le **raw string** (`"""..."""`) trattano `\` come carattere normale, includono i newline letteralmente, sono comode per le regex, e supportano comunque il templating con `$`.

Da **Kotlin 2.2.20**, per evitare l'escaping scomodo di `$` nelle stringhe (es. negli schemi JSON), si può prefissare la stringa multi-linea con più simboli `$` consecutivi (es. `$$"""..."""`) per specificare quanti `$` consecutivi servono per attivare l'interpolazione.

### Package, import, varargs, naming
Package e import come Java (con possibilità di alias `as`), import sempre in testa al file (niente import locali come in Scala — non esistendo gli implicit, l'import non modifica il contesto). I parametri **vararg** mappano su `Array<out T>`. Kotlin è meno permissivo di Scala sui nomi: simboli arbitrari richiedono i backtick (es. ``` `##°@??%&@^^`() ```), utile per interoperabilità o per nomi di test molto descrittivi (`` `404 errors should cause a wait and retry` ``).

### Funzioni locali
Funzioni possono contenere altre funzioni (come in Scala); la parola chiave `tailrec` forza l'ottimizzazione della ricorsione di coda (e blocca la compilazione se la ricorsione non è in coda). Le funzioni locali tendono a ridurre la chiarezza, vanno usate con moderazione.

### Controllo di flusso
- **`if`/`else`**: è un'espressione (come in Scala); non esiste l'operatore ternario; `if` da solo non è un'espressione; non esistono funzioni parziali.
- **`for`**: solo nella forma `for (element in collection) { }`, non è un combinatore potente come il `for` di Scala, usato raramente.
- **`while`/`do-while`**: come Java, ma con visibilità delle variabili definite nel blocco `do` anche nella condizione.
- **`when`**: Kotlin non supporta il pattern matching come Scala; `when` è un surrogato, più simile a uno "switch potenziato". Senza soggetto è un elegante if/else-if/else; con soggetto (`when(x)`) confronta il valore, supporta range (`in 0u..7u`) e controllo di sottotipo con smart-cast automatico (`is Int -> ...`). `when` è sempre un'espressione.
- **Jumping**: `break`/`continue` come Java; `return` si comporta diversamente nelle lambda (vedi sezione funzionale). Le espressioni possono essere etichettate (`label@`) e `break`/`continue`/`return` possono essere qualificati con l'etichetta (es. `break@outerloop`).

## 2.3 Kotlin 102 — OOP

### Classi
Come Scala, `class` introduce una classe; la costruzione di oggetti non richiede `new` (`new` non è nemmeno una keyword Kotlin): `Foo()` crea una nuova istanza.

### Membri: metodi e proprietà
A differenza di Java/Scala (che hanno *campi* e *metodi*), Kotlin ha solo **metodi** e **proprietà**, i campi sono completamente nascosti.

| Linguaggio | Campi | Metodi | Proprietà |
|---|---|---|---|
| Java | Sì | Sì | No |
| Scala | Sì | Sì | No |
| Kotlin | No (nascosti) | Sì | Sì |
| C# | Sì | Sì | Sì |

In Scala, lato chiamante, metodi e campi sono difficili da distinguere per lo *Uniform Access Principle*. In Kotlin i metodi/funzioni richiedono parentesi obbligatorie (eccetto se `infix`), mentre le proprietà si invocano senza parentesi.

**Proprietà vs campi**: i campi sono lo stato dell'oggetto, le proprietà sono un modo per accedervi/modificarlo. Nascondere (incapsulare) i campi esponendo solo get/set è buona pratica nei linguaggi senza proprietà (Java); in Kotlin i campi sono interamente nascosti, imponendo questa convenzione a livello di linguaggio.

```kotlin
class Foo {
    val bar = 1
    var baz: String? = null
    val bazLength: Int // proprietà senza "backing field": ricalcolata ogni volta
        get() = baz?.length ?: 0
    var stringRepresentation: String = "" // backing field generato
        get() = baz ?: field
        set(value) {
            field = "custom: $value" // accesso al backing field con `field`
        }
}
```
Il compilatore genera il backing field solo quando serve effettivamente (cioè quando si usa `field` in get/set). Quando si progetta con Kotlin, bisogna pensare in termini di metodi e proprietà, **non** di campi.

### Metodi, interfacce, ereditarietà
I metodi sono funzioni nello scope di una classe, con un parametro implicito (`this`, il receiver). Le **interfacce** possono ospitare metodi e proprietà (entrambi possono essere implementati di default; le proprietà non hanno backing field), ma **non** sono supportati i mixin in stile Scala (un'interfaccia Kotlin non può estendere una classe).

L'implementazione segue lo stile Java (`:` per il subtyping, `override` obbligatorio per gli override). Il `super` qualificato (`super<A>.foo()`) risolve l'ambiguità tra dichiarazioni conflittuali di interfacce diverse.

### Costruttori
Il costruttore primario va scritto nei parametri della classe; il codice del corpo della classe non fa parte del costruttore — va in un blocco `init`:
```kotlin
class Foo(val bar: String, var baz: Int, greeting: String = "Hello from constructor") {
    init { println(greeting) }
}
```
I costruttori secondari devono delegare a un altro costruttore (con `:`), e il costruttore primario deve far parte della catena di delega.

### `lateinit` e dipendenze circolari
Quando una proprietà `var` deve essere inizializzata dopo la costruzione dell'oggetto (es. due classi che si riferiscono a vicenda), una soluzione "brutta" è renderla nullable; una soluzione migliore è `lateinit var` — si toglie la responsabilità al compilatore, e si lancia un'eccezione (`UninitializedPropertyAccessException`) se accede prima dell'inizializzazione.

### Ereditarietà: `open`/`abstract`/`final`
Citando J. Bloch (*Effective Java*, Item 17): *"Design and document for inheritance or else prohibit it"*. **Kotlin applica questo principio di default**: tutte le classi sono `final` a meno di marcarle `open`. `abstract` ottiene lo stesso effetto di `open` ma impedisce di istanziare direttamente la superclasse (e dovrebbe avere membri abstract). A differenza di Scala, l'invocazione del costruttore della superclasse al momento dell'estensione richiede sempre le parentesi (`: A()`).

### Singleton object e companion
Come Scala ma con companion espliciti: in Kotlin il `companion object` è interno alla classe (`class A { companion object }`); un `object A` indipendente è un oggetto separato, distinto dal companion.

### Visibilità (information hiding)
- `public` — default, visibile ovunque (API).
- `internal` — visibile in tutto il "modulo" (insieme di file Kotlin compilati insieme).
- `protected` — visibile alle sottoclassi (ma non al resto del package).
- `private` — visibile solo dentro la classe e i suoi membri.

## 2.4 Kotlin 102 — convenzioni OOP

### Uguaglianza
`==` chiama `equals`; il confronto per riferimento (lo `==` di Java) in Kotlin è `===`. Kotlin **non** soffre dei problemi di uguaglianza di Scala perché non c'è conversione automatica di tipo: `val b: Long = a` (con `a: Int`) è un errore di compilazione, va scritto `a.toLong() == b`.

### Chiamate infix
A differenza di Scala (dove ogni metodo unario è invocabile come operatore infisso, es. `1 equals 1`), Kotlin richiede la keyword `infix` esplicita sul metodo. Le funzioni `infix` hanno precedenza più bassa degli operatori.

### Niente operatori custom arbitrari
Scala permette nomi di metodo arbitrari usabili come operatori (es. `:/`, `~+#>`), il che può degenerare in operatori esoterici. **Kotlin non lo permette**: si possono solo overloadare un set fisso di operatori predefiniti, marcando il metodo con `operator` e rispettando la convenzione di naming.

### Tabelle di overload degli operatori

**Unari:**

| Espressione | Nome metodo | Traduzione |
|---|---|---|
| `+x` | `unaryPlus` | `x.unaryPlus()` |
| `-x` | `unaryMinus` | `x.unaryMinus()` |
| `++x` / `x++` | `inc` | `x.inc().also{x=it}` / `x.also{x=it.inc()}` |
| `--x` / `x--` | `dec` | analogo a `inc` |
| `!x` | `not` | `x.not()` |
| `x()` | `invoke` | `x.invoke()` |

**Binari aritmetici:** `x+y→plus`, `x-y→minus`, `x*y→times`, `x/y→div`, `x%y→rem`.

**Binari assegnamento:** `x+=y→plusAssign`, analoghi per `-=`,`*=`,`/=`,`%=`. Le funzioni `*Assign` possono essere definite solo se l'equivalente aritmetico non lo è; se l'operatore aritmetico è definito, il compilatore inferisce `a op= b` come `a = a op b`.

**Binari di confronto:** `x==y→equals` (`x?.equals(y) ?: (y===null)`), `x>y / x<y / x>=y / x<=y → compareTo`.

**Altri binari:** `x..y→rangeTo`, `x in y→contains` (chiamato su `y`), `x[y]→get`, `x(y)→invoke`.

**Ternari/n-ari:** `x[y,z]→get`, `x[y]=z→set`, `x(y,z)→invoke`, generalizzabili a n argomenti.

```kotlin
class Complex(val real: Double, val imaginary: Double) {
    operator fun plus(other: Complex) = Complex(real + other.real, imaginary + other.imaginary)
    operator fun plus(other: Double) = plus(Complex(other, 0.0))
}
Complex(1.0, 1.0) + 3.4 // 4.4+1.0i
```

## 2.5 Kotlin 103 — Generics

Il sistema di tipi generici di Kotlin è più comodo di quello di Java ma molto meno potente di quello di Scala: niente Higher Kinded Types, niente type lambda. In compenso offre **varianza dichiarata a livello di sito di dichiarazione** (assente in Java) e **reificazione tramite inlining** (non presente in Java, parzialmente ottenibile in Scala 3).

```kotlin
class Foo<A, B : CharSequence> // upper bound con :
fun <T> className(receiver: T) = receiver::class.simpleName // attenzione: T è nullable se non c'è bound!
```

**`where`**: per specificare bound multipli separatamente dal resto della firma, utile con molti parametri di tipo (esempio tratto da un'interfaccia reale di Alchemist con 7 parametri di tipo vincolati).

**Varianza e proiezione di tipo**: `<out T>` per la covarianza (come `? extends T` in Java), `<in T>` per la controvarianza (come `? super T`), `<*>` quando si conosce solo il bound (come `?`). In Kotlin la varianza si esprime **al sito di dichiarazione** della classe/interfaccia (in Java solo sui metodi).

**Reificazione**: a runtime i generici possono essere gestiti per *erasure* (Java/Scala: l'informazione è usata dal compilatore ma scartata a runtime) o *monomorfizzazione* (Rust/C#: vengono emessi tipi concreti). Kotlin usa l'erasure, ma permette il controllo locale tramite `inline` + `reified`:
```kotlin
inline fun <reified T> checkIsType(a: Any): Boolean = a is T
checkIsType<Long>(1)  // false
checkIsType<Long>(1L) // true
```
Nota di interoperabilità: le funzioni inline vengono effettivamente "inlineate" solo se il chiamante è codice compilato Kotlin; i tipi reified richiedono l'inlining (la funzione viene copiata al sito di chiamata) e non sono usabili se l'interoperabilità con altri compilatori JVM è un requisito (o serve un wrapper).

### Collezioni
Simili a Scala ma basate (per il target JVM) sull'implementazione Java: niente `toJava()`/`toScala()`. `List`/`Set`/`Map` sono *non modificabili* ma non garantite immutabili (a runtime potrebbero essere backed da un `ArrayList`; sotto la JVM le interfacce immutabili vengono erasate, quindi il codice Java chiamante le vede mutabili). Le collezioni mutabili sono disponibili con `Mutable(List/Set/Map)`. Le manipolazioni funzionali tornano una nuova collezione, ma a differenza di Scala il tipo di ritorno è di solito `List` (il tipo specifico si perde, niente higher-kinded types per esprimerlo). `Sequence` evita la creazione di una collezione intermedia a ogni passo; `Flow` rappresenta collezioni elaborate in modo asincrono/a stream. Creazione tipica via `listOf`/`mapOf`/`setOf`/`sequenceOf`/`flowOf`.

## 2.6 Kotlin 201 — OOP avanzato

### Data class
Molto simili alle *case class* di Scala: l'ereditarietà è proibita (Scala invece permette a classi non-case di estendere una case class); generano gratis `equals`, `hashCode`, `toString`; offrono `copy()` per generare nuovi oggetti immutabili modificati, e funzioni `component1`, `component2`, ..., `componentN` per il destructuring. La libreria standard fornisce `Pair` e `Triple` (a differenza di Scala, non ci sono `Tuple4`, `Tuple5`, ecc.).

### Destructuring
Se una classe ha funzioni operatore `componentX` (X = 1, 2, 3...) può essere "destrutturata" — molto meno potente del pattern matching di Scala:
```kotlin
val ferrari2021 = "Ferrari" to Pair("Sainz", "Leclerc") // `to` crea una Pair
val (team, lineup) = ferrari2021
val (driver1, driver2) = lineup
```

### Gerarchie sealed
Simili ai `sealed trait` di Scala: applicabili a classi (alle interfacce solo da Kotlin 1.5.0), i sottotipi devono essere definiti dentro la classe sealed, e abilitano il controllo di esaustività nei `when`.
```kotlin
sealed interface Booze {
    object Rum : Booze
    object Whisky : Booze
    object Vodka : Booze
}
fun goGetMeSome(beverage: Booze) = when (beverage) {
    is Booze.Rum -> "Diplomatico"
    is Booze.Whisky -> "Caol Ila"
    is Booze.Vodka -> "Zubrowka"
} // nessun `else` necessario: il compilatore sa che i casi sono esaustivi
```

### Classi nidificate vs. interne
Nidificare una classe non dà accesso ai membri della classe esterna (equivalente alla *static inner class* di Java). Per creare una vera classe interna serve il modificatore esplicito `inner`, e va istanziata tramite un'istanza della classe esterna: `Outer().Inner()`.

### Enum, espressioni object, type alias
Gli `enum class` sono come in Java con sintassi Kotlin. Le **object expression** sostituiscono le classi anonime (`object : Test { override fun first() {...} }`). I **type alias** (solo a livello top-level) non sono equivalenti ai type member di Scala — Kotlin non ha un vero analogo del `type` di Scala.

### Delegazione (composizione)
Citando J. Bloch (Item 16): *"Favour composition over inheritance"*. La delegazione è uno dei meccanismi per implementare la composizione, ma è spesso verbosa e meccanica da implementare manualmente. **Kotlin supporta la delegazione a livello di linguaggio** con `by`:
```kotlin
class Exam : MutableCollection<Student> by mutableListOf<Student>() {
    fun register(name: String, surname: String, id: String) = add(Student(name, surname, id))
    override fun toString() = toList().toString() // niente accesso diretto al delegato!
}
```

### Proprietà delegate
Anche proprietà e variabili possono essere delegate; `lazy` è un delegato built-in che inizializza la proprietà solo al primo accesso. Un delegato custom per `val` deve definire `operator fun getValue(thisRef: T, property: KProperty<*>): R`; per `var` serve anche `operator fun setValue(...)`. È una forma (eccezionale, dato che Kotlin è tipicamente nominale) di **tipizzazione strutturale**. Si può anche delegare a una `Map`/`MutableMap` (utile per serializzazione non tipizzata da JSON/YAML — la modifica della proprietà aggiorna anche la mappa sottostante, in modo bidirezionale).

## 2.7 Kotlin 202 — Programmazione funzionale

### Lambda e tipi funzione
La sintassi delle lambda è ispirata a Groovy (e simile a Smalltalk/Ceylon/Xtend/Ruby): un blocco tra `{}`, parametri seguiti da `->`; con un solo parametro implicito si usa `it`.

I **tipi funzione** evitano interfacce verbose come `Function<T,R>`: `() -> Any`, `(String) -> Any`, `(String, Int) -> Unit`, `(String, Int?) -> Any?`.

```kotlin
fun <T, I, R> compose(f: (I) -> R, g: (T) -> I): (T) -> R = { f(g(it)) }
compose({v: Int -> v * v}, {v: Double -> v.toInt()})(3.9) // 9
```

Le funzioni possono essere referenziate con `::` (`compose(::square, ::floor)`).

### Trailing lambda
Se una lambda è l'ultimo parametro di una chiamata, può essere scritta fuori dalle parentesi — sintassi che, usata bene, sembra aggiungere blocchi custom al linguaggio (es. `delayed { println("...") }`).

### Closures
Supportate sia su `val` che su `var` (attenzione: produrre effetti collaterali da manipolazioni funzionali è considerato una cattiva pratica).

### `return` dalle lambda: `inline`, `crossinline`, `noinline`
Normalmente `return` in una lambda è proibito. Se la funzione che la riceve è dichiarata `inline` (codice copiato al sito di chiamata), `return` è permesso e ritorna dalla funzione *contenitore*; per ritornare solo dalla lambda si usa il `return` qualificato (`return@map`). `crossinline` disabilita il `return` quando la lambda viene chiamata da un altro contesto di esecuzione (es. dentro un `Runnable`); `noinline` disabilita del tutto l'inlining quando la lambda deve essere passata altrove o conservata per un uso successivo.

### Destructuring nei parametri lambda
```kotlin
mapOf(46 to "Rossi", 4 to "Dovizioso").map { (number, rider) -> "$rider has number $number" }
```

### Funzioni e proprietà di estensione
Kotlin permette di estendere qualsiasi tipo da qualunque punto del codice:
```kotlin
fun String.containsBatman(): Boolean = ".*b.*a.*t.*m.*a.*n.*".toRegex().matches(this)
```
Si possono estendere anche tipi nullable, `object` e companion. **Importante**: la risoluzione delle chiamate a metodi di estensione è **statica** (il tipo del receiver è determinato a compile-time) e le estensioni **non possono "ombreggiare" i membri reali**, che hanno sempre priorità. Le proprietà di estensione non possono avere backing field né essere inizializzate (il comportamento è specificato interamente da `get`/`set`).

### Tipi funzione con receiver e DSL
Una funzione di estensione è comunque una funzione, quindi il suo tipo si esprime prefissando il tipo del receiver seguito da `.`:
```kotlin
fun <T> MutableList<T>.configure(configuration: MutableList<T>.() -> Unit): MutableList<T> {
    configuration()
    return this
}
```
Questo pattern (funzioni/lambda con receiver) è la base per scrivere DSL.

**Receiver multipli per le estensioni-membro**: quando un'estensione è definita come membro di un'altra classe/object, ci sono due receiver impliciti: il *dispatch receiver* (l'istanza della classe in cui l'estensione è dichiarata) e l'*extension receiver* (l'istanza del tipo su cui l'estensione è chiamata). L'extension receiver ha priorità; per accedere al dispatch receiver serve `this@NomeClasse`. Questo abilita un potente **controllo dello scope per le DSL**: i membri di estensione sono visibili solo quando il dispatch receiver è quello giusto.

### Scope functions
Funzioni built-in che eseguono una lambda in uno scope personalizzato:

| Funzione | Firma | Comportamento |
|---|---|---|
| `let` | `T.((T) -> R) -> R` | il parametro lambda è il receiver, ritorna il risultato della lambda |
| `run` | `T.(T.() -> R) -> R` | il receiver del metodo è legato a `this` implicito, ritorna il risultato |
| `with` | `(T, T.() -> R) -> R` | versione non-extension di `run`, l'oggetto è il primo parametro |
| `apply` | `T.(T.() -> Unit) -> T` | come `run` ma ritorna l'oggetto di contesto (side effect + ritorno dell'originale) |
| `also` | `T.((T) -> Unit) -> T` | come `apply` ma il contesto è legato al parametro lambda (`it`), non a `this` |

```kotlin
1.let { "${it + 1}1" }   // "21": String
1.run { "${this + 1}1" } // "21": String
with(1) { "${this + 1}1" } // "21": String
1.apply { println("${this + 1}1") } // stampa 21, ritorna 1
1.also { println("${it + 1}1") }    // stampa 21, ritorna 1
```

### Contenuti extra non approfonditi
Il corso segnala esplicitamente che alcuni argomenti **non sono coperti** in dettaglio: array, enum class (oltre il base), spread operator, annotazioni, coroutine, interoperabilità con Java/JavaScript/C, value class, context parameter.
