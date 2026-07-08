# Distributed Systems / Distributed Software Systems — Indice e Struttura del Corso

> **Nota preliminare**: il file PDF caricato (`merge_-_module1.pdf`) in realtà non contiene solo un "Modulo 1", ma l'**intero set di slide del corso** (950 slide, prodotte con LaTeX Beamer), organizzato in **17 sezioni distinte**. Di seguito la mappa completa, nell'ordine in cui le sezioni appaiono fisicamente nel PDF.

## Struttura del PDF (ordine di apparizione)

| # | Codice | Titolo | N. slide | Argomento macro |
|---|--------|--------|----------|------------------|
| 1 | A0 | About the Course | 28 | Organizzazione del corso (orari, esame, progetto) |
| 2 | C1 | The CAP Theorem | 42 | Availability, Consistency, Partition tolerance |
| 3 | C2 | Logging & Checkpointing | 54 | Recovery, dependability, protocolli di checkpoint/log |
| 4 | C3 | Distributed Consensus | 47 | Agreement, FLP, Paxos, Raft, SMR |
| 5 | C4 | DLT & BCT | 166 | Distributed Ledger / Blockchain Technology, Smart Contract |
| 6 | C5 | Logical Clocks | 37 | Causalità, Lamport clock, Vector clock |
| 7 | C6 | Code Mobility | 22 (+ 56 seminario Kubernetes) | Mobilità del codice + seminario Kubernetes |
| 8 | M0 | Why Distributed Systems? | 15 | Motivazioni di base |
| 9 | M1 | Dependability | 55 | Fault, errori, failure, attributi di dependability |
| 10 | M2 | Roots of Distributed Systems | 66 | Fondamenti epistemologici: cos'è il calcolo, la scienza, il sistema |
| 11 | M3 | Replication & Consistency | 51 | Modelli di consistenza, replica dei dati |
| 12 | M4 | Definitions & Goals | 67 | Definizioni di sistema distribuito, goal (trasparenza, openness, scalabilità, situatedness) |
| 13 | M5 | Sorts of Distributed Systems | 48 | Computing systems, information systems, pervasive systems |
| 14 | M6 | Computing with Time | 48 | Tempo fisico/logico, CPS, sincronizzazione |
| 15 | M7 | Computing with Space | 43 | Spazio in matematica/logica/informatica, spatial computing |
| 16 | M8 | Software & System Architectures | 32 | Stili architetturali (layered, object-based, data-centred, event-based) |
| 17 | M7(bis) | Process Algebra | 29 | Modelli formali per la concorrenza |

## Ordine logico-didattico consigliato per lo studio

Il professore segue, nel corso reale, un ordine diverso da quello fisico del PDF. Per lo studio è più efficiente seguire questo ordine concettuale (dal generale al particolare):

### Parte 0 — Organizzazione
- **A0** – About the Course

### Parte 1 — Fondamenti dei Sistemi Distribuiti (moduli "M")
- **M0** – Why Distributed Systems?
- **M2** – Roots of Distributed Systems (epistemologia, cos'è il calcolo)
- **M4** – Definitions & Goals (definizioni classiche, i 5 goal: resource availability, transparency, openness, scalability, situatedness)
- **M5** – Sorts of Distributed Systems (computing/information/pervasive systems)
- **M1** – Dependability (fault, error, failure, attributi)
- **M3** – Replication & Consistency (modelli di consistenza data-centric e client-centric)
- **M6** – Computing with Time (tempo fisico e logico, introduzione)
- **M7** – Computing with Space (spazio, spatial computing)
- **M8** – Software & System Architectures (stili architetturali)
- **M7(bis)** – Process Algebra (modelli formali per la concorrenza)

### Parte 2 — Casi di Studio (moduli "C", più tecnici/specialistici)
- **C1** – The CAP Theorem
- **C2** – Logging & Checkpointing
- **C5** – Logical Clocks (causalità, Lamport, Vector Clock — approfondisce M6)
- **C3** – Distributed Consensus (FLP, Paxos, Raft, SMR — approfondisce i temi di C1/M1)
- **C6** – Code Mobility (+ seminario pratico su Kubernetes)
- **C4** – DLT & BCT (Blockchain, Smart Contract — la sezione più ampia, sintetizza SMR, consenso, crittografia)

## File del riassunto

Il riassunto completo è diviso nei seguenti file Markdown, per facilità di consultazione:

1. `00_Indice_e_Struttura.md` — questo file
2. `01_A0_Organizzazione_Corso.md`
3. `02_Fondamenti_M0_M2_M4_M5.md` — Perché i sistemi distribuiti, radici epistemologiche, definizioni e goal, tipologie di sistemi
4. `03_Dependability_M1.md` — Fault, errori, failure, attributi di dependability
5. `04_Replication_Consistency_M3.md` — Modelli di consistenza e replica
6. `05_Tempo_Spazio_M6_M7.md` — Tempo fisico/logico e spazio nei sistemi distribuiti
7. `06_Architetture_ProcessAlgebra_M8_M7bis.md` — Stili architetturali e process algebra
8. `07_CAP_Theorem_C1.md`
9. `08_Logging_Checkpointing_C2.md`
10. `09_Logical_Clocks_C5.md` — (approfondimento di M6)
11. `10_Distributed_Consensus_C3.md`
12. `11_Code_Mobility_Kubernetes_C6.md`
13. `12_DLT_Blockchain_SmartContracts_C4.md`
14. `13_Requisiti_Esame_e_Progetto.md` — requisiti obbligatori e facoltativi per l'esame/progetto

## Bibliografia di riferimento del corso

Il libro di testo base è:
- Tanenbaum, A. S., van Steen, M. (2017). *Distributed Systems. Principles and Paradigms*, 3rd edition, Pearson Prentice Hall.

Altri testi citati come supplementari (non obbligatori):
- Coulouris, Dollimore, Kindberg, Blair (2012). *Distributed Systems. Concepts and Design*, 5th ed., Pearson.
- Kshemkalyani, Singhal (2011). *Distributed Computing: Principles, Algorithms, and Systems*, Cambridge University Press.
- Birman (2005). *Reliable Distributed Systems*, Springer.
- Zhao (2014). *Building Dependable Distributed Systems*, Wiley.
- Ghosh (2014). *Distributed Systems: An Algorithmic Approach*, 2nd ed., CRC Press.
