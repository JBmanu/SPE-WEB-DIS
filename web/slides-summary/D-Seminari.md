# Blocco D — Seminari

> Corso: Applicazioni e Servizi Web (magistrale) — Prof.ssa Silvia Mirri
> Riassunto da slide: *D - seminari*
> Questo file raccoglie **5 seminari distinti** tenuti da relatori esterni o dal docente/tutor del corso, su temi diversi ma tutti collegati alla materia. A differenza dei blocchi A/B/C, qui non c'è un filo conduttore teorico unico: ogni sezione va trattata come argomento a sé.

---

# Seminario 1 — Sustainable Web Development

## 1. Introduzione alla sostenibilità

**Definizione classica (Brundtland, 1987)**: la sostenibilità è la capacità di soddisfare i bisogni del presente senza compromettere la possibilità delle future generazioni di soddisfare i propri.

Il concetto si è evoluto da un focus quasi esclusivamente ambientale a una visione integrata sui **tre pilastri**: ambientale, economico, sociale — interconnessi e complementari.

### Agenda 2030 e SDG
L'Agenda 2030 per lo Sviluppo Sostenibile è il programma d'azione per persone, pianeta e prosperità, sottoscritto il 25 settembre 2015 da 193 paesi membri ONU. Contiene **17 SDG** (Sustainable Development Goals), articolati in **169 target**, monitorati continuamente. Caratteristiche: universali per tutti i paesi, focus sui mezzi di attuazione, partnership come componente chiave, **non giuridicamente vincolanti**.

**I 17 SDG** (uno per ciascuna pagina dettagliata nelle slide, con target e strumenti di attuazione):
1. Sconfiggere la povertà
2. Sconfiggere la fame
3. Salute e benessere
4. Istruzione di qualità
5. Parità di genere
6. Acqua pulita e servizi igienico-sanitari
7. Energia pulita e accessibile
8. Lavoro dignitoso e crescita economica
9. Imprese, innovazione e infrastrutture
10. Ridurre le disuguaglianze
11. Città e comunità sostenibili
12. Consumo e produzione responsabili
13. Lotta contro il cambiamento climatico
14. Vita sott'acqua
15. Vita sulla terra
16. Pace, giustizia e istituzioni solide
17. Partnership per gli obiettivi

### Sostenibilità Digitale
Si basa su due domande correlate ma contrapposte: come rendere lo sviluppo sostenibile **tramite** il digitale, e come rendere **sostenibile il digitale stesso**. Da un lato si vuole massimizzare il digitale come leva di sviluppo sostenibile sui tre pilastri; dall'altro minimizzare gli impatti negativi del digitale sugli stessi tre pilastri.

## 2. Web Sustainability — alcuni numeri

- Internet è responsabile di circa il **4%** delle emissioni totali di CO2
- Una singola ricerca Google: 1-10g di CO2; Google elabora ~47.000 ricerche/secondo (~3,5 miliardi/giorno)
- I siti web emettono in media **1,76g di CO2** per pagina visitata
- Confronto: i trasporti causano l'8% delle emissioni globali, il traffico aereo il 2%, una sigaretta emette 14g di CO2

**Variabili coinvolte**: acqua (raffreddamento), energia (client, server, rete), rifiuti prodotti — moltissime variabili da considerare.

## 3. Il contesto: pubblico, regolamentazione, industria

- **Pubblico**: crescente consapevolezza, denuncia di greenwashing, premi ai brand etici, attenzione giornalistica crescente.
- **Regolamentazione**: standard (GRI, ISO), best practice (GR491, SDGs), regolamenti UE su sostenibilità digitale (CSRD, ESRS, GCD).
- **Industria del Web**: il **W3C** è emerso come ente centralizzante (come già fatto per accessibilità con WAI e privacy con PING).

### Sustainable Web Manifesto
Dichiarazione pubblica di impegno condiviso, basata su 6 principi:
1. **Clean** — alimentati da energia rinnovabile
2. **Efficient** — minor consumo possibile di energia/risorse
3. **Open** — accessibili, libero scambio di informazioni, controllo dei propri dati
4. **Honest** — non ingannare né sfruttare gli utenti
5. **Regenerative** — sostenere un'economia che nutre persone e pianeta
6. **Resilient** — funzionare quando e dove serve di più

### Sustainable Web Design Community Group (W3C)
Gruppo (>200 partecipanti, chair Tim Frick e Alexander Dawson) poi confluito nel **Sustainable Web Interest Group** del W3C (w3.org/groups/ig/sustainableweb).

## 4. Web Sustainability Guidelines (WSG)

**94 raccomandazioni** create dal gruppo W3C Sustainable Web Design, ispirate strutturalmente alle WCAG (le linee guida sull'accessibilità). Organizzate in **4 categorie**: UX Design, Web Development, Hosting & Infrastructure, Business & Product Strategy.

**Struttura di ogni guideline**: titolo numerato (X.X), motivazione, Success Criterion (requisiti minimi), Impact & Effort (beneficio atteso / lavoro richiesto), Benefits (per categoria: ambientale, privacy, accessibilità, performance, economico, conversione...), Reporting (conformità GRI), Example, Resources, Tags.

### UX Design Guidelines (2.1 - 2.29) — selezione
Elenco completo dei titoli (per riferimento/indice):
2.1 Undertake Systemic Impacts Mapping · 2.2 Assess and Research Visitor Needs · 2.3 Research Non-Visitor's Needs · 2.4 Consider Sustainability in Early Ideation · 2.5 Account for Stakeholder Issues · 2.6 Create a Lightweight Experience by Default · 2.7 Avoid Unnecessary or an Overabundance of Assets · 2.8 Ensure Navigation and Way-Finding Are Well-Structured · 2.9 Respect the Visitor's Attention · **2.10 Use Recognized Design Patterns** · **2.11 Avoid Manipulative Patterns** · 2.12 Document and Share Project Outputs · 2.13 Use a Design System To Prioritize Interface Consistency · 2.14 Write With Purpose, in an Accessible, Easy To Understand Format · **2.15 Take a More Sustainable Approach to Image Assets** · 2.16 Take a More Sustainable Approach to Media Assets · 2.17 Take a More Sustainable Approach to Animation · 2.18 Take a More Sustainable Approach to Typefaces · 2.19 Provide Suitable Alternatives to Web Assets · **2.20 Provide Accessible, Usable, Minimal Web Forms** · 2.21 Support Non-Graphic Ways To Interact With Content · 2.22 Provide Useful Notifications · 2.23 Reduce the Impact of Downloadable or Physical Documents · 2.24 Create a Stakeholder-Focused Testing & Prototyping Policy · 2.25 Conduct Regular Audits, Regression, and Non-Regression Tests · 2.26 Incorporate Performance Testing Into Each Major Release-Cycle · 2.27 Incorporate Value Testing Into Each Major Release-Cycle · 2.28 Incorporate Usability Testing Into Each Minor Release-Cycle · 2.29 Incorporate Compatibility Testing Into Each Release-Cycle

**Esempi rappresentativi approfonditi nelle slide:**

- **2.10 Use Recognized Design Patterns** (Impact: Medium, Effort: Low): usare componenti visivi facilmente riconoscibili riduce tempo di navigazione e quindi emissioni; aiuta anche persone con disabilità cognitive.
- **2.11 Avoid Manipulative Patterns** (Impact: High, Effort: Medium): evitare dark pattern (anti-right-click, no-copy, account obbligatorio per acquistare), advertising ingannevole, tracking non consensuale, SEO manipolativa. Manipolare l'utente è "un guadagno a breve termine, una perdita a lungo termine" — eticamente sbagliato e insostenibile.
- **2.15 Sustainable Image Assets**: le immagini sono spesso la componente più pesante del trasferimento dati; criteri: valutare la reale necessità, ottimizzare/comprimere fuori dal browser, offrire dimensioni diverse per risoluzioni diverse, **lazy loading**.
- **2.20 Accessible, Usable, Minimal Web Forms**: principio di minimizzazione dei dati richiesti (etica + GDPR), form ben validati migliorano conversione e riducono emissioni (meno richieste di correzione).
- **2.21 Non-Graphic Interaction**: supportare speech browsing e interfacce non visive (es. Amazon Alexa) — utile per accessibilità e riduce consumo energetico (lo schermo è spesso il maggior consumo di batteria).

### Web Development Guidelines (3.1 - 3.24)
Elenco completo: 3.1 Identify Relevant Technical Indicators · **3.2 Minify HTML/CSS/JS** · 3.3 Use Code-Splitting · 3.4 Apply Tree Shaking · 3.5 Ensure Solutions Are Accessible · 3.6 Avoid Code Duplication · **3.7 Rigorously Assess Third-Party Services** · 3.8 Use HTML Elements Correctly · 3.9 Resolve Render Blocking Content · 3.10 Provide Code-Based Way-Finding Mechanisms · 3.11 Validate Form Errors and External Input · 3.12 Use Metadata Correctly · 3.13 Adapt to User Preferences · **3.14 Develop a Mobile-First Layout** · 3.15 Use Beneficial JavaScript and Its APIs · 3.16 Ensure Scripts Are Secure · 3.17 Manage Dependencies Appropriately · 3.18 Include Files That Are Automatically Expected · 3.19 Use Plaintext Formats When Appropriate · 3.20 Avoid Deprecated or Proprietary Code · 3.21 Align Technical Requirements With Sustainability Goals · 3.22 Use the Latest Stable Language Version · 3.23 Take Advantage of Native Features · **3.24 Run Fewer, Simpler Queries As Possible**

**Esempi approfonditi:**
- **3.1 Identify Relevant Technical Indicators** (Impact/Effort: Medium): performance chiave per sostenibilità — meno richieste HTTP e meno nodi DOM riducono cicli CPU/GPU/RAM. Nota: non tutto il payload ha lo stesso costo energetico — testo non renderizzato < CSS < JavaScript < WebGL in termini di intensità computazionale.
- **3.2 Minify**: rimozione di whitespace inutile dal codice sorgente compilato. Basso impatto ecologico diretto (il whitespace è ignorato dai motori di rendering) ma utile per i tempi di caricamento percepiti.
- **3.7 Rigorously Assess Third-Party Services** (Impact: High): preferire self-hosting a contenuti embedded di terze parti, valutare attentamente librerie/framework pesanti, dare all'utente controllo su funzionalità non-first-party (come per i cookie).
- **3.14 Mobile-First Layout** (Impact: Medium, Effort: Low): riduce consumo energetico, migliora equità sociale (device a basse prestazioni nei paesi in via di sviluppo), accessibilità (bottoni grandi, font leggibili).
- **3.17 Manage Dependencies**: rimuovere dipendenze JS inutilizzate da `package.json`, preferire API native quando possibile, aggiornare regolarmente.
- **3.18-3.19 File standard attesi**: `favicon.ico`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, e anche file plaintext come `carbon.txt`, `humans.txt`, `security.txt`, `ads.txt`.
- **3.24 Fewer, Simpler Queries**: ridurre richieste HTTP/database ripetute, accedere una sola volta ai dati e mantenerli localmente quando servono più volte nel codice.

### Hosting & Infrastructure Guidelines (4.1 - 4.9+)
Elenco titoli: 4.1 Choose a Sustainable Hosting Provider · 4.2 Optimize Browser Caching · 4.3 Compress Your Files · 4.4 Use Error Pages and Redirects Carefully · 4.5 Limit Usage of Additional Environments · 4.6 Automate To Fit the Needs · 4.7 Maintain a Relevant Refresh Frequency · 4.8 Be Mindful of Duplicate Data · 4.9 Enable Asynchronous Processing and Communication

### Business & Product Strategy Guidelines (5.1 - 5.27+)
Elenco titoli: 5.1 Have an Ethical and Sustainability Product Strategy · 5.2 Assign a Sustainability Representative · 5.3 Raise Awareness and Inform · 5.4 Communicate the Ecological Impact of User Choices · 5.5 Estimate a Product or Service's Environmental Impact · 5.6 Define Clear Organizational Sustainability Goals and Metrics · 5.7 Verify Your Efforts Using Established Third-Party Business Certifications · 5.10 Create One or More Impact Business Models · 5.11 Follow a Product Management and Maintenance Strategy · 5.12 Implement Continuous Improvement Procedures · 5.13 Document Future Updates and Evolutions · 5.14 Establish if a Digital Product or Service Is Necessary · 5.15 Determine the Functional Unit · 5.16 Create a Supplier Standards of Practice · 5.17 Share Economic Benefits · 5.20 Promote Responsible Data Practices · 5.21 Implement Appropriate Data Management Procedures · 5.22 Promote and Implement Responsible Emerging Technology Practices · 5.23 Include Responsible Financial Policies · 5.24 Include Organizational Philanthropy Policies · 5.25 Plan for a Digital Product or Service's Care and End-of-Life · 5.26 Include E-Waste, Right-To-Repair, and Recycling Policies · 5.27 Define Performance and Environmental Budgets

> Nota: le slide presentano queste due ultime categorie soprattutto come elenco (poco testo descrittivo aggiuntivo rispetto a UX/Web Dev, che invece sono molto dettagliate).

## 5. Tools per misurare la sostenibilità di un sito

- **Website Carbon Calculator** — stima le emissioni di CO2 generate dal caricamento di una pagina web.
- **Ecograder** — strumento di valutazione complessiva della sostenibilità di un sito (performance, design, hosting green, etc).

*(Le slide mostrano le interfacce di questi tool; utili da usare in fase di valutazione del proprio progetto d'esame.)*

## 6. Web per la sostenibilità (e non solo "Web sostenibile")

Domanda chiave posta dal docente: abbiamo visto come rendere sostenibile il web, ma come si può utilizzare il web per la sostenibilità? Potete proporre voi idee di progetto per l'esame.

Risorsa suggerita: **AI for Sustainable Development Goals (AI4SDGs) Think Tank** — raccoglie progetti dove l'AI è usata per raggiungere uno o più SDG (ai-for-sdgs.academy/observatory, filtrabile per SDG). Per scegliere su quali SDG concentrarsi: quiz su globalgoals.org/quiz.

### Risorse utili (bibliografia)
Greenwood T., *Sustainable Web Design* (2021, A Book Apart) · McGovern G., *World Wide Waste* (2020) · Shedroff N., *Design Is the Solution* (2019) · Frick T., *Designing for Sustainability* (2016, O'Reilly) · Andersen M., *Sustainable Web Design In 20 Lessons* (2023) · Falbe/Andersen/Frederiksen, *Ethical Design Handbook* (2020) · risorse aggiuntive su w3.org/community/sustyweb/wiki/References

---

# Seminario 2 — Reimagining HRI: LLMs as Robotic Controllers

> Relatori: Kelvin Olaiya, Giovanni Delnevo (Università di Bologna)

## Motivazione
I recenti progressi nell'AI, in particolare i **LLM (Large Language Model)**, hanno il potenziale di rivoluzionare la **HRI (Human-Robot Interaction)**: i LLM permettono ai robot di comprendere il linguaggio umano in modo "human-like", processando linguaggio naturale per estrarne l'intento e tradurlo in azioni robotiche eseguibili — riducendo la necessità di programmazione manuale task-specifica. Resta una sfida garantire affidabilità, interpretabilità ed efficacia nel mondo reale.

## Obiettivi della ricerca
- Investigare capacità e limiti dei LLM in HRI, con focus su **zero-shot navigation and exploration**
- Analizzare come i LLM interpretano goal definiti dall'utente, eseguendo ragionamento spaziale, identificazione di target e azioni di movimento in ambiente simulato
- Investigare come gli utenti comunicano istintivamente con i robot, analizzando pattern di comunicazione naturale (linguaggio direttivo vs conversazionale)

## Domande di ricerca (RQ)
- **RQ1**: i LLM possono raggiungere goal di ricerca/esplorazione "zero-knowledge" con tecnica di zero-shot prompting?
- **RQ2**: l'architettura proposta è sufficientemente generale da controllare efficacemente diversi tipi di robot?
- **RQ3**: quanto efficacemente gli utenti usano il linguaggio naturale per comandare un robot su task predefiniti?

## Architettura del sistema
Ciclo iterativo:
1. L'utente definisce un goal
2. Un **Adapter** cattura uno snapshot della scena dal robot
3. Prompt + snapshot vengono inoltrati al LLM
4. Il LLM genera un (sotto-)piano
5. L'Adapter interpreta il piano e invia comandi al controller del robot
6. Il LLM richiede feedback visivo
7. Il processo continua iterativamente finché il LLM determina che il goal è stato raggiunto

**Modello usato**: Gemini-2.0-flash (multimodale, >1M token di contesto, ~8K token di output, bassa latenza). Il **system prompt** specifica: ruolo del LLM, capacità ad alto livello del robot, policy per la generazione del (sub)piano, formato di output atteso, necessità di esplicitare il goal di ogni subplan, richiesta di descrivere la scena/identificare cambiamenti/esprimere il ragionamento.

## Metodo sperimentale
Questionario somministrato via Google Forms (partecipazione volontaria), in due parti: (1) demografia/atteggiamenti (genere, età, settore di studio, livello di entusiasmo tecnologico, fiducia nel delegare task a robot, uso di assistenti vocali); (2) scenario HRI — i partecipanti osservano una stanza con un robot e scrivono comandi + feedback atteso per 7 task predefiniti.

## Risultati

**RQ1 — esperimenti su robot PR2:**
- Tasso di successo: **~22%**
- Principali modalità di fallimento: misidentificazione di oggetti (errori di percezione visiva), scarso obstacle avoidance, allucinazioni e ragionamento scenico errato
- Conclusione: una forte comprensione del linguaggio non basta — servono integrazione robusta della percezione, controllo affidabile a basso livello, loop più stretti tra percezione e ragionamento

**RQ2 — esperimenti su robot Khepera IV (piattaforma a trazione differenziale):**
- Tasso di successo: ~26% (meno esperimenti)
- Sforzo di adattamento minimo tra piattaforme (solo mapping del controller e parametri camera, nessun re-training del prompt necessario)
- Conclusione: l'architettura **generalizza tra piattaforme diverse**, ma vincoli di sensing/movimento specifici della piattaforma vanno affrontati

**RQ3 — studio utenti:**
- Prompt semplici e diretti hanno successo più alto; task ambigui/complessi falliscono in larga parte
- **78%** dei prompt di successo proviene da utenti con esperienza pregressa di smart assistant
- Modalità di fallimento principali: incapacità di ancorare il linguaggio a geometria fisica, ragionamento spaziale debole, errori di percezione, fallimenti nell'evitare ostacoli

## Conclusioni
I LLM mostrano forte potenziale in HRI (specialmente per navigazione/esplorazione zero-shot) ma **non sono ancora sufficienti per un dispiegamento completamente autonomo**.

| Punti di forza | Limiti |
|---|---|
| Generalizzano tra task e piattaforme senza retraining | Riconoscimento target impreciso |
| Controllo basato su linguaggio naturale | Ragionamento spaziale debole, allucinazioni frequenti |
| Adattamento minimo tra piattaforme robot | Robustezza e situational awareness limitate |

**Lavori futuri**: loop interattivi di disambiguazione (chiedere, confermare, raffinare), benchmark migliori per action grounding e robustezza del prompt, studio del prompt design centrato sull'utente per usabilità/sicurezza nel mondo reale.

> Nota: i relatori hanno esplicitamente invitato gli studenti interessati a contattarli per progetti di gruppo o tesi su questo tema (kelvin.olaiya@unibo.it).

---

# Seminario 3 — Ruby on Rails: Hands-on Workshop

> Relatore: Alessandro Rodi (Renuo AG, Rails Foundation)

## Cos'è Ruby on Rails
**Full stack web framework** per costruire applicazioni web. Altri framework full-stack citati per confronto: Django, Laravel, Express, Flask, Phoenix.

Filosofia: **"the menu is omakase"** (come al ristorante giapponese, lo chef sceglie per te) — Rails fa molte scelte al posto dello sviluppatore.

**Chi sostiene Rails**: Rails Foundation, Rails core team, 5000+ contributor, aziende come Shopify, 37signals, GitHub.

## HTML-First vs JavaScript-First Architecture
Confronto centrale del workshop:

| | JavaScript-First | HTML-First (Rails) |
|---|---|---|
| Costrutto primario | JavaScript | HTML |
| Comunicazione client/server | JSON | HTML |
| Client | "Smart" — costruisce la UI | "Stupido" — riceve pagine pronte |
| Server | "Stupido" — fornisce solo dati | Costruisce le pagine |

Rails è un framework **HTML-First**: la distinzione tra SPA e Multi-Page Application diventa "obsoleta" grazie a **Hotwire** (in particolare **Turbo**), gli strumenti JS che permettono di costruire SPA mantenendo un'architettura HTML-First.

## Filosofia: "One person framework" e Convention over Configuration
Rails punta a essere usabile efficacemente anche da un singolo sviluppatore. Il principio **Convention over Configuration**: molte decisioni/configurazioni sono già prese per te di default — critica comune: "troppa magia".

## Costruzione pratica (live demo: applicazione blog)

```bash
rails new blog
rails g scaffold post title:string body:text   # genera CRUD completo per "post"
rails g resource comment post:references content:text   # aggiunge commenti collegati ai post
```

**Componenti Rails mostrati nel workshop:**
- **ActionText** — editor di rich text
- **ActiveStorage** — gestione upload di file
- **ActionMailbox** — ricezione email
- **ActionMailer** — invio email
- **ActionCable** — websocket
- **ActiveJob** — background job

### Hotwire (Turbo + Stimulus)
- **Turbo**: caricamenti di pagina molto veloci grazie a due tecniche — preload dei link al passaggio del mouse (hover) e sostituzione di HTML/body senza reload completo della pagina.
- **Stimulus**: permette di definire controller JavaScript per elementi HTML, integrandosi bene con la strategia di prefetching/aggiornamento parziale di Turbo.

### Nobuild
Rails di default **non** fa transpiling/bundling/compressione/tree-shaking (approccio "nobuild"). Reso possibile da **importmap** e **propshaft**.

### Websocket e live update
Supporto nativo: **Websockets** (tecnologia di base), **ActionCable** (gem Rails per il supporto websocket), **TurboStreams** (gem per il supporto agli aggiornamenti live) — permettono di inviare aggiornamenti al client senza reload completo della pagina (demo: commenti con aggiornamento live).

## Deployment ("Go live!")
Messaggio chiave: la tua web app non esiste finché gira solo sulla tua macchina; il web è un posto libero, non serve il permesso di Google o Apple per essere visibili al mondo.

**Opzioni PaaS** (Platform as a Service): Heroku, AWS, Google Cloud, Render, Fly.io.

**Opzione "nopaas"**: Rails include **Kamal** — non serve un PaaS, basta una macchina con accesso a Internet. Risultato: applicazione web completa (storage, database, websocket) senza dipendenze esterne, bundling, limiti o vincoli.

## Altri argomenti trattati
- **Autenticazione**: aggiunta nativa all'applicazione (demo).
- **Database**: di default **SQLite**, sia in sviluppo sia in produzione — sufficiente per gestire traffico considerevole prima di servire un DB più potente (serve comunque gestire i backup).
- **PWA (Progressive Web App)**: setup nativo/out-of-the-box in Rails.
- **Native App**: il workshop ha mostrato quanto poco codice serva per impostare un'app nativa con Ruby on Rails (bonus finale).

### Risorse
rubyonrails.org · martinfowler.com/eaaCatalog/activeRecord.html (pattern ActiveRecord) · hotwired.dev · rubyonrails.org/docs/tutorials · rubycon.it (conferenza Ruby in Italia, 8 maggio 2026)

---

# Seminario 4 — State of the Art of Sustainability IT

> Relatore: Francesco Fullone (SustainableIT.org) — 24/07/2025

## Definizione e framework ESG
Sostenibilità come capacità di durare nel tempo, soddisfacendo i bisogni del presente senza compromettere la capacità delle generazioni future di soddisfare i propri (UN, WCED, 1987).

**I tre pilastri ESG applicati all'IT (SustainableIT.org)**: Environment (carbon-neutral green IT infrastructure, circular technology lifecycle, e-waste elimination), Social (technology accessibility, inclusiveness, digital divide, upskilling/reskilling, sustainable AI), Governance (data usage/privacy/security management, innovazione tecnologica responsabile).

**Quattro dimensioni di impatto interconnesse** (mostrate come overview iniziale): Business Impact on stakeholders, Accessibility/Usability/Inclusion, Impact on the environment + E-waste, Energy Consumption, Technical Debt, CyberSecurity, Infrastructure Resilience.

## Dimensione Sociale
- **Inside the company**: D.E.I. (Diversity, Equity, Inclusion)
- **Outside**: A.U.I. (Accessibility, Usability, Inclusion)

## Dimensione Governance
Temi chiave: GDPR e data management, **EU's Cyber Resilience Act**, rischi di cybersecurity (supply chain attack, scam/fraud), BYOD (Bring Your Own Device), resilienza infrastrutturale (scalabilità, backup/replica dei dati, uptime), **knowledge risk** (chi conosce software e processi, employee retention, documentazione aggiornata), **obsolescence risk** (debito tecnico, manutenzione software, obsolescenza pianificata da vendor, librerie di terze parti non più supportate) — tutto nel quadro di un **(continuous) risk assessment**.

## Dimensione Ambientale

**Dati chiave citati:**
- Il footprint carbonico globale dell'ICT è di **39,9 miliardi di tonnellate**, pari al **3,9% delle emissioni GHG** globali — stimato in crescita al 5% entro il 2025 e 14% entro il 2040
- Footprint carbonico di Bitcoin: **71,52 Mt di CO2**, paragonabile alle emissioni totali della Grecia
- Footprint medio di una email: **17g di CO2**, moltiplicato per ~275 miliardi di email inviate ogni giorno
- E-waste UE 2023: **700 milioni di dispositivi**, di cui solo il **5%** viene riciclato
- Confronto energetico: una ricerca Google tradizionale consuma ~0,3 watt/richiesta, una ricerca con Google AI Search ne consuma ~7 watt/richiesta — i data center Google triplicheranno, superando il consumo dell'Irlanda

### I sei principi del Green Software (Green Software Foundation)
1. **Carbon Efficiency** — emettere la minor quantità possibile di carbonio per unità di lavoro
2. **Energy Efficiency** — non sprecare energia, scegliere la più pulita
3. **Carbon Awareness** — fare di più quando l'elettricità è pulita, meno quando è "sporca"
4. **Hardware Efficiency** — minimizzare il carbonio incorporato (embodied carbon)
5. **Measurement** — "ciò che non si può misurare non si può migliorare"
6. **Climate Commitments** — comprendere i meccanismi esatti di riduzione delle emissioni

### Datacenter: metriche chiave

| Metrica | Formula | Significato |
|---|---|---|
| **PUE** (Power Usage Effectiveness) | Energia totale datacenter / Energia usata dall'IT | Efficienza energetica complessiva (1.0 = ideale) |
| **WUE** (Water Usage Effectiveness) | Energia IT (kWh) / Litri d'acqua consumati | Efficienza idrica |
| **RUE** (Renewable Usage Effectiveness) | (Energia rinnovabile / Energia totale) × 100 | Quota di energia rinnovabile |
| **CUE** (Carbon Usage Effectiveness) | CO₂ emessa (kg) / Energia totale consumata (kWh) | Intensità carbonica |
| **DESS** (Datacenter Energy Sustainability Score) | f(PUE + WUE + RUE + CUE) | Score sintetico aggregato |

**Benchmark PUE 2023 per provider**: Google Cloud 1.10-1.12 (ideale), Microsoft Azure/Meta 1.12-1.15 (molto efficiente), AWS 1.13-1.20 (efficiente), IBM Cloud 1.30 (inefficiente).

### GHG Protocol — i tre Scope di misurazione

| Scope | Tipo di emissioni | Esempi |
|---|---|---|
| **Scope 1** | Dirette | Combustione di fossili, veicoli aziendali, produzione energia non rinnovabile |
| **Scope 2** | Indirette da energia acquistata | Uffici, centri di produzione, riscaldamento/vapore |
| **Scope 3** | Indirette "a valle/monte" (catena del valore) | Supply chain, commuting dipendenti, viaggi di lavoro, distribuzione prodotti finiti, franchising |

**SCI (Software Carbon Intensity)**: metrica specifica per calcolare le emissioni del software (un *tasso*, non un totale). L'unità di misura funzionale non è prescritta dal protocollo e va scelta in base alla propria applicazione.

**Carbon Awareness — strategie**: "non always-on ma always-available", **demand shifting** (spaziale e temporale) e **demand shaping**.

**Embodied carbon / Hardware Efficiency**: il carbonio incorporato è quello emesso durante creazione e smaltimento di un dispositivo. Estendere la vita utile di un dispositivo "ammortizza" il carbonio emesso (riduce il CO2eq/anno). Il cloud computing è più efficiente di un server on-premise perché può applicare demand shifting/shaping. ~120 milioni di dispositivi prodotti tra 2019-2020. Pratiche utili: refurbishing, orchestratori come Kubernetes per massimizzare l'utilizzo hardware.

**Formula eMbodiement Calculator**: `M = TE × TS × RS`, dove:
- TE = Total Embodied emissions (somma emissioni LCA di tutti i componenti hardware)
- TS = Time-Share = TR / EL (tempo riservato all'uso software / vita utile attesa dell'hardware)
- RS = Resource-Share = RR / TR (risorse riservate al software / risorse totali disponibili)

### Strumenti di misurazione per categoria d'uso
- **Pagina web**: Website Carbon (JS, proprietario), WebPageTest (PHP+JS, open source), Sitespeed.io (JS, open source, usato da Wikipedia)
- **AI training run**: Code Carbon (open source, usato in molti paper AI)
- **Parte del sistema**: Firefox Profiler (browser), Scaphandre (Rust, server-side), Datavizta (Python, embodied carbon)
- **Sistema intero**: Green Metrics Tool (Python, simula scenari d'uso), KEPLER (production/Kubernetes-focused)
- **Bolletta cloud**: calcolatori nativi (Microsoft/Google/AWS), Cloud Carbon Footprint (primo grande progetto open source su Scope 1/2/3), Green Pixie

### The Sustainable Web Design Model — formula completa
```
Average Emissions per Page View (gCO2e) =
  ([(OPDC × (1 - Green Hosting Factor) + EMDC) + (OPN + EMN) + (OPUD + EMUD)] × New Visitor Ratio)
  + ([(OPDC × (1 - Green Hosting Factor) + EMDC) + (OPN + EMN) + (OPUD + EMUD)] × Return Visitor Ratio × (1 - Data Cache Ratio))
```
dove: OPDC/EMDC = emissioni operative/incorporate dei data center; OPN/EMN = emissioni operative/incorporate delle reti; OPUD/EMUD = emissioni operative/incorporate dei device utente; Green Hosting Factor = quota di hosting alimentata da rinnovabili; New/Return Visitor Ratio = quota di visitatori nuovi/di ritorno; Data Cache Ratio = quota di dati caricata da cache per i visitatori di ritorno.

## AI e sostenibilità (framework "Reflect, Reframe, Reimagine")
Framework di SustainableIT.org per affrontare l'AI in modo sostenibile:
- **Reflect** — due diligence su rischi, impatto ambientale, persone
- **Reframe** — dati ottimizzati, affidabili, verificabili
- **Reimagine** — approccio human-first, accessibile, sostenibile, responsabile

**Dati su AI**: il **training** di modelli AI è responsabile del **15% delle emissioni globali dei data center**. Aree di attenzione nel ciclo di vita AI-driven: **Bias** (governance dei dati e standard di riferimento), **Data Collection** (energia, server, dati anonimizzati), **Usage** (data transfer, query, caching), **MLOps** (intersezione tra ML + Data Engineering + DevOps).

## Messaggio conclusivo
**Earth Overshoot Day 2025: 24 luglio** — la data in cui l'umanità ha consumato tutte le risorse che la Terra è in grado di rigenerare in un anno. Invito a essere consapevoli dell'impatto delle proprie scelte tecnologiche ("Pick your pillar").

---

# Seminario 5 — Docker e Docker Compose per progetti di ASW

> Relatore: Prof. Vittorio Ghini — 12/12/2025
> **Seminario operativo fondamentale per il progetto d'esame**: mostra un'applicazione di riferimento completa (Node.js + Express + MongoDB, containerizzata con Docker) molto simile a quanto richiesto per l'elaborato.

## L'applicazione di esempio

```
            client (browser)
                  |
                  | external network
                  v
      +----------------------------------+
      |  physical host / Linux o.s.       |
      |  +-----------+   +-------------+  |
      |  |  nodejs    |   |  mongodb   |  |
      |  |  service   |<->|  service   |  |
      |  | porta 3000 |   | porta 27017|  |
      |  +-----------+   +-------------+  |
      +----------------------------------+
```

**Funzionalità dell'applicazione (server nodejs):**
- `POST /submit` — riceve due parametri `seq1`/`seq2`, calcola due nuove stringhe derivate, salva nel DB la quadrupla (s1, s2, as1, as2), la restituisce al client
- `GET /show` — restituisce il contenuto del database
- `GET /` — pagina HTML con form (gestita con Express, Mongoose, **Vue**, Axios — definita "primitiva" dal docente, da migliorare come parte del lavoro di progetto)

**Architettura in container**: ciascun componente (nodejs+express, mongodb) è pacchettizzato nel proprio container Docker; l'applicazione completa viene costruita ed eseguita con **docker** e **docker-compose** su una macchina Linux (anche dentro una VM VirtualBox, con eventuale port forwarding configurato per esporre la porta 3000 del container sulla porta 8080 della VM).

## Struttura del documento (10 parti)
1. Installazione di docker e docker-compose
2. Creazione delle reti virtuali "interna" (tra i due container) ed "esterna" (verso l'host)
3. Perché modificare l'immagine base di MongoDB (rimuovere i volumi anonimi)
4. Costruzione dell'immagine del container MongoDB + database
5. Esecuzione del container MongoDB e debugging
6. Costruzione del container Node.js/Express, collegamento via rete virtuale e DNS implicito di Docker
7. Esecuzione del container Node.js/Express/Mongoose
8. Automatizzazione completa con docker-compose
9. Salvataggio e pacchettizzazione per la consegna del progetto
10. Riassunto comandi

## 1. Installazione Docker su Ubuntu
```bash
sudo apt-get update && sudo apt-get install curl
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo docker -v                    # verifica installazione
docker compose version            # verifica sotto-comando compose (no trattino, versioni recenti)
docker buildx version             # verifica sotto-comando buildx

# eseguire docker senza sudo:
sudo usermod -aG docker ${USER}
su - ${USER}
```

## 2. Reti virtuali
```bash
# rete "interna" (tra container nodejs e mongodb) - DNS implicito Docker
docker network create -d bridge --internal interna
# rete "esterna" (container web server <-> host)
docker network create -d bridge esterna
```
Il vantaggio della rete virtuale: i container possono usare i **nomi degli altri container come hostname** (risolti dal DNS implicito di Docker), senza dover gestire IP statici.

## 3. Perché modificare l'immagine MongoDB
MongoDB salva dati in `/data/db` e `/data/configdb`. Per garantire la **persistenza** anche dopo la terminazione del container, queste directory vengono normalmente mappate su directory esterne (dell'host). Tre tipi di directory esterna:
- **Bind**: definita esplicitamente dall'utente (`docker run -v /home/.../data:/data`)
- **Named volume**: creato dal daemon Docker, sopravvive al container, riutilizzabile da più container (`--mount source=nomevolume,target=...`)
- **Anonymous volume** (default): creato automaticamente, nuovo ad ogni esecuzione

**Problema per la consegna del progetto**: i volumi anonimi non vanno bene per consegnare un progetto pacchettizzato — serve un **trucco** per evitarli (vedi sezione 4.2).

## 4. Costruzione dell'immagine MongoDB con database integrato

Da DockerHub: quando un container viene avviato per la prima volta, esegue i file con estensione .sh e .js trovati in /docker-entrypoint-initdb.d, in ordine alfabetico; i file .js vengono eseguiti da mongosh usando il database specificato dalla variabile MONGO_INITDB_DATABASE.

Dockerfile minimo per un'immagine MongoDB funzionante:
```dockerfile
FROM mongo:8.0.1-noble
...
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 27017
CMD ["mongod"]
```

### "Trucco": creare un'immagine MongoDB senza volumi anonimi
Lo script `FORCE_CREATE_NOVOLUME_BASE_IMAGE.sh` automatizza la procedura:
1. Avvia un container dall'immagine base `mongo:8.0.1-noble`
2. Identifica gli ID dei volumi anonimi creati
3. Stoppa il container (senza rimuoverlo)
4. Esporta lo stato del container stoppato in un file (`docker export`) — **i volumi montati non vengono esportati**
5. Importa il file come nuova immagine nel registry locale (`docker import`), chiamata `mongonovolume`
6. Pulizia: elimina il file esportato, il container stoppato, i volumi anonimi

```bash
docker run -itd --name mongodb mongo:8.0.1-noble
docker stop mongodb
docker export mongodb > mongodb_export.tar
docker import mongodb_export.tar mongonovolume
docker rm mongodb
docker volume rm -f <volumi_anonimi>
```

**Attenzione**: l'immagine `mongonovolume` risultante **non avvia automaticamente** il demone `mongod` — serve aggiungere `ENTRYPOINT`/`CMD` in un Dockerfile successivo, oppure specificare il comando in `docker-compose.yml`.

### Script di inizializzazione del database (`mydbinit.js`)
```javascript
// mydbinit.js - inizializza e popola il database
var conn = new Mongo();
var db = conn.getDB('dbsa');
db.createCollection('alignments', function(err, collection) {});
try { db.alignments.deleteMany({}); } catch (e) { print(e); }
db.alignments.insertOne({"s1": "GCATGCU", "s2": "GATTACA", "as1": "GCATGC-U", "as2": "G-ATTACA"})
```

### Dockerfile finale per l'immagine `mymongo`
```dockerfile
FROM mongonovolume
COPY ./mydbinit.js /docker-entrypoint-initdb.d/
WORKDIR /usr/local/bin/
RUN chmod 777 /docker-entrypoint-initdb.d/ mydbinit.js
EXPOSE 27017 27018 27019
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mongod"]
```
```bash
docker build -t "mymongo" .       # NB: punto finale obbligatorio
docker images | grep mymongo      # verifica
```

## 5. Esecuzione e debugging di MongoDB
```bash
docker network ls -f name=interna   # verifica esistenza rete
docker run -itd --network interna -p 27017-27019:27017-27019 --name mongodb mymongo
docker ps -a                        # verifica stato (Up / Exited)
docker logs mongodb                 # debugging in caso di errore (status Exited)

# debug interno: entra nella shell mongosh del container
docker exec -it mongodb /usr/bin/mongosh
# comandi utili dentro la shell:
use dbsa
db.alignments.find()
exit
```

**Debug dall'esterno del container** (richiede porta esposta + container collegato a rete esterna):
```bash
mongosh 127.0.0.1:27017/dbsa
db.alignments.insertOne({"s1": "pippo", "s2": "ponzio", "as1": "pilato", "as2": "attila"})
```

### Salvataggio dello stato del database al termine
```bash
# opzione 1: termina e perde le modifiche (rimane solo l'immagine base)
docker stop mongodb && docker rm mongodb

# opzione 2: salva lo stato in una nuova immagine prima di rimuovere
docker stop mongodb
docker commit -m "saved mongo" -a "autore" mongodb mymongo.1
docker rm mongodb
# per riusare le modifiche: docker run ... mymongo.1 (non più mymongo)

# opzione 3: sostituisce l'immagine vecchia con la nuova (script commit_mongo_image.sh)
docker stop mongodb
docker commit -m "saved mongo" -a "autore" mongodb mymongo.1
docker rm mongodb
docker rmi mymongo
docker tag mymongo.1 mymongo
docker rmi mymongo.1
```

## 6-7. Container Node.js + Express + Mongoose

**Struttura tipica dei file applicativi:**
```
./app/package.json, package-lock.json, index.js
./app/src/controllers/controller.js
./app/src/lib/sequences_alignment.js
./app/src/routes/routes.js
./app/src/models/alignmentModels.js
./Dockerfile
```

**`index.js` essenziale:**
```javascript
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var Alignment = require('./src/models/alignmentModels')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// IMPORTANTE: 'mongodb' qui e' il nome del container/servizio,
// risolto dal DNS implicito della rete virtuale "interna"
mongoose.connect('mongodb://mongodb/dbsa', { useNewUrlParser: true, useFindAndModify: false });

var routes = require('./src/routes/routes');
routes(app);

app.listen(3000, function () {
  console.log('Node API server started on port 3000!');
});
```

**Dockerfile per l'app Node.js:**
```dockerfile
FROM ubuntu:focal
ENV WORKINGDIR=/root/app
WORKDIR ${WORKINGDIR}
RUN mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}
COPY ./app ${WORKINGDIR}/
RUN apt-get -y update && \
    apt-get -y install apt-utils && \
    apt-get -y install nodejs && \
    apt-get -y install npm && \
    apt-get -y clean
RUN npm install
EXPOSE 3000
CMD nodejs index.js
```

```bash
docker build -t nodejsapp .
docker run -itd --rm --network interna --name nodejsapp -p 3000:3000 nodejsapp
docker network connect esterna nodejsapp   # collega anche alla rete esterna

# test rapido
curl --header "Content-Type: application/x-www-form-urlencoded" \
     --request POST --data 'seq1=ALFABETAGAMMA&seq2=VAFFA' \
     0.0.0.0:3000/submit
curl http://0.0.0.0:3000/show
```

## 8. Automazione completa con docker-compose

**Problema da risolvere**: nodejsapp deve attendere che mongodb sia pronto. Soluzione minimale mostrata (pausa fissa + gestione errore di connessione):
```javascript
function pausecomp(millis) {
  var date = new Date(); var curDate = null;
  do { curDate = new Date(); } while (curDate - date < millis);
}
pausecomp(10000);  // attesa "rozza" di 10 secondi

mongoose.set('useFindAndModify', false);
mongoose.set('connectTimeoutMS', 30);
mongoose.connect('mongodb://mongodb:27017/dbsa', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));
```

**`docker-compose.yml` completo:**
```yaml
# project name "aswl4" da var COMPOSE_PROJECT_NAME in file .env
services:
  nodejsapp:
    build:
      context: ./nodejs
      dockerfile: Dockerfile
    image: nodejsapp
    command: [ "nodejs", "index.js" ]
    depends_on:
      - mongodb
    ports:
      - 3000:3000
    networks:
      - interna
      - esterna
  mongodb:
    build:
      context: ./mongodb
      dockerfile: Dockerfile
    image: mymongo
    command: [ "docker-entrypoint.sh", "mongod" ]
    networks:
      - interna

networks:
  interna:
    driver: bridge
    internal: true
    driver_opts:
       com.docker.network.bridge.name: "br-interna00000"
  esterna:
    driver: bridge
    internal: false
    driver_opts:
       com.docker.network.bridge.name: "br-esterna000000"
```

```bash
docker compose build              # build di tutte le immagini
docker compose up -d              # avvia tutti i container (crea anche le reti)
docker compose stop               # ferma tutti i container
docker compose down               # ferma e rimuove container+reti (mantiene immagini)
docker compose down --rmi all     # ferma e rimuove tutto, incluse le immagini
```

**Naming automatico**: con progetto `ASWl4`, servizio `mongodb`, rete `interna` -> Docker Compose crea `aswl4-mongodb-1` come nome container, `aswl4-interna-1` come nome rete. Il nome del progetto è personalizzabile tramite file `.env`:
```
COMPOSE_PROJECT_NAME=aswl4
```

## 9. Pacchettizzazione e consegna del progetto
Obiettivo: evitare che i docenti debbano rifare il build delle immagini.

```bash
docker compose build
docker save nodejsapp > nodejsapp_save.tar
docker save mymongo > mymongo_save.tar
cd ../
tar cvzf ASWl4_saved.tgz ASWl4/
# -> copiare ASWl4_saved.tgz su chiavetta USB e consegnare
```

**Per chi riceve il progetto:**
```bash
tar xvzf ASWl4_saved.tgz
cd ASWl4/
docker load < mymongo_save.tar
docker load < nodejsapp_save.tar
docker images   # verifica che le immagini siano caricate
docker compose up -d   # avvia senza fare build
```

**Nota importante — differenza `docker save` vs `docker export`:**
- `docker save` salva un'**immagine** presente nel registry locale
- `docker export` salva lo stato di un **container** stoppato (ma non ancora eliminato), senza includere i volumi montati

## 10. Riassunto comandi (cheat-sheet)
```bash
# BUILD
cd ./ASWl4
./mongodb/FORCE_CREATE_NOVOLUME_BASE_IMAGE.sh
docker compose build

# RUN
docker compose up -d

# USO (POST per inserire, GET per leggere)
curl --header "Content-Type: application/x-www-form-urlencoded" \
     --request POST --data 'seq1=LANCIA&seq2=DELTA' http://0.0.0.0:3000/submit
curl http://0.0.0.0:3000/show

# SALVATAGGIO STATO mongodb (sovrascrivendo l'immagine)
docker compose stop
docker commit -m "saved" -a "autore" aswl4-mongodb-1 mymongo.1
docker compose down
docker rmi mymongo
docker tag mymongo.1 mymongo
docker rmi mymongo.1

# CONSEGNA
docker save nodejsapp > nodejsapp_save.tar
docker save mymongo > mymongo_save.tar
docker compose down --rmi all
cd ../ && tar cvzf ASWl4_saved.tgz ASWl4/

# UTILIZZO DEL PROGETTO RICEVUTO
tar xvzf ASWl4_saved.tgz && cd ASWl4
docker load < mymongo_save.tar
docker load < nodejsapp_save.tar
docker compose up -d
```

**Comandi utili durante lo sviluppo** (modificare solo nodejsapp senza toccare mongodb):
```bash
docker compose stop nodejsapp
docker compose rm -f nodejsapp
# ... modifico il codice ...
docker compose build nodejsapp
docker compose up -d nodejsapp
```

---

## Punti chiave da ricordare per l'esame

- **Seminario 1 (Sustainable Web)**: conoscere i 3 pilastri della sostenibilità, gli SDG (17, non vincolanti), il Sustainable Web Manifesto (6 principi), la struttura delle WSG (94 guideline, 4 categorie: UX/Web Dev/Hosting/Business), e soprattutto **alcuni esempi concreti di guideline** (es. dark pattern da evitare, mobile-first, lazy loading immagini) — molto probabile materiale spendibile sia in teoria sia nel progetto pratico.
- **Seminario 2 (LLM/HRI)**: comprendere il paradigma zero-shot prompting applicato alla robotica, l'architettura a ciclo (goal -> snapshot -> LLM -> piano -> comando -> feedback), e i risultati chiave (successo ~22-26%, limiti di grounding spaziale).
- **Seminario 3 (Ruby on Rails)**: utile soprattutto come **termine di paragone** con lo stack MEAN/MEVN visto nel corso — il concetto di HTML-First vs JavaScript-First Architecture è concettualmente molto vicino al confronto MVC server-side vs SPA client-side del Blocco A.
- **Seminario 4 (Sustainability IT)**: conoscere a memoria almeno alcuni numeri-shock (ICT 3,9% delle emissioni globali, Bitcoin = Grecia, email 17g CO2, e-waste 5% riciclato), i 6 principi del Green Software, e le metriche datacenter (PUE soprattutto).
- **Seminario 5 (Docker)**: **è probabilmente il materiale più direttamente operativo per superare l'esame**, poiché fornisce un'applicazione di riferimento completa (Node+Express+MongoDB in Docker) molto vicina ai requisiti del progetto. Vale la pena padroneggiare: creazione reti virtuali Docker, gestione dei volumi MongoDB, scrittura di Dockerfile, e soprattutto **docker-compose.yml** completo con build/run/down, e la procedura di pacchettizzazione/consegna del progetto.
