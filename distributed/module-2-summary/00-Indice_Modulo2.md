# Distributed Systems / Distributed Software Systems — Modulo 2: Indice e Struttura

## Nota sul file caricato

Il PDF `merge_-_module2.pdf` (281 pagine) contiene in realtà **4 documenti unici** (204 pagine), poiché il file presenta un'intera sezione duplicata (il documento "Preliminaries about Distributed Systems Engineering" appare due volte identico, per un probabile errore di merge). Il contenuto unico è interamente coperto da questo riassunto.

A differenza del Modulo 1 (teorico, prof. Omicini, prof. Ciatto), il **Modulo 2** (prof. Giovanni Ciatto, tutor Matteo Magnini) è un **modulo di laboratorio pratico**: l'obiettivo non è la teoria dei sistemi distribuiti in sé, ma l'applicazione pratica dei concetti teorici già visti nel Modulo 1 alla progettazione e implementazione di un vero sistema distribuito, sviluppato in Python attraverso un running example: una versione distribuita del gioco **Pong**.

## Struttura del materiale

| # | Documento | Pagine | Argomento |
|---|-----------|--------|-----------|
| 1 | About the Course | 14 | Organizzazione del Modulo 2: docenti, regole, workflow del progetto |
| 2 | Preliminaries about Distributed Systems Engineering | 77 | Definizioni di sistema distribuito, SE workflow per DS, nomenclatura infrastrutturale, pattern di interazione, stili architetturali in pratica, feature di design (redundancy, failover, consensus, ecc.) |
| 3 | Communication Mechanisms for Distributed Systems | 52 | Socket programming in Python: datagram (UDP) e stream (TCP) sockets, esempi pratici (chat UDP/TCP) |
| 4 | Distributed Pong | 61 | Caso di studio completo: dal game loop locale alla versione distribuita di Pong, con analisi architetturale e protocolli |

## File del riassunto

1. `00_Indice_Modulo2.md` — questo file
2. `01_About_Course_Mod2.md` — organizzazione del Modulo 2 (docenti, regole del progetto, workflow)
3. `02_Preliminaries_DS_Engineering.md` — definizioni, SE workflow per DS, nomenclatura infrastrutturale, pattern di interazione, stili architetturali applicati, feature di design avanzate
4. `03_Communication_Mechanisms.md` — socket programming (UDP/TCP) in Python, con esempi di chat
5. `04_Distributed_Pong_Case_Study.md` — il caso di studio completo: modello del gioco, I/O, architetture distribuite (locale/centralizzata/brokered/replicata), protocolli, analisi finale
6. `05_Requisiti_Esame_Progetto_Mod2.md` — requisiti pratici per il progetto finale del corso, integrato con quanto già visto nel Modulo 1

## Collegamento con il Modulo 1

Il Modulo 2 richiama esplicitamente più volte concetti già visti nel Modulo 1, in particolare:
- gli **stili architetturali** (layered, object-based, event-based, shared data-space) di M8, qui applicati a casi pratici concreti con pro/contro/opinione del docente;
- i temi di **dependability, fault tolerance, consenso, replicazione** (M1, M3, C2, C3), qui tradotti in "feature di design" concrete (redundancy, failover, checkpoint/rollback, consensus, heart-beat/timeout/retry, autenticazione/autorizzazione, data partitioning);
- il trade-off **CAP / availability vs. consistency** (C1), qui applicato concretamente alla scelta architetturale per Distributed Pong (UDP vs TCP, scelta di prioritizzare l'availability).

Il progetto finale del corso (unico per entrambi i moduli, come spiegato in A0 del Modulo 1) deve quindi dimostrare la capacità di applicare concretamente questi concetti teorici a un sistema software reale, seguendo lo stesso percorso metodologico illustrato con Distributed Pong.
