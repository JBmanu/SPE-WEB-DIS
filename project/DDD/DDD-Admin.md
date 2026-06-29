#### Card-Forge-Context	
Gestisce il sistema per creare nuovi mazzi di default e nuove carte tramite espansioni, quindi contiene la documentazione delle carte

| Term      | Block-Type | Motivation |
|---|---|---|
| CardDefinition | Aggregate Root | Governa la definizione coerente di una carta, validando i dati e le regole necessarie alla creazione e pubblicazione. Può includere un metodo/factory interno per creare istanze valide. Attributi: ID, nome, descrizione, insieme di azioni (valide e compatibili fra loro), tipologia di carta |
| DeckDefinition | Aggregate Root| Governa la definizione di un deck, garantendo coerenza di composizione, quantità delle carte e vincoli di formato. Può includere un metodo/factory interno per creare deck validi. Attributi: ID, nome, elenco di altri deck inseriti, insieme di CardDefinition inserite |
| CardRepository | Repository | Recupera e salva le *Card-definition* disponibili nel gioco |
| DeckRepository | Repository | Recupera e salva le *Deck-Definition* prefatti dall'admin |
| | | |
| CardCreated | Event | Una nuova *Card* è stata creata (salvata) |
| DeckCreated | Event | Un nuovo *Deck* è stato creato (salvata) |

**NOTA:**
Per esempio, dentro CardDefinition puoi imporre regole tipo:
- una certa tipologiaCarta ammette solo alcune azioni;
- alcune azioni non possono coesistere tra loro;
- una carta pubblicabile deve avere campi obbligatori completi.


#### Game-Observatory-Context	
Gestisce la raccolta delle statistiche del sistema di gioco (giocatori online, partite in corso, carte più giocate, ...)

| Term      | Block-Type | Motivation |
|---|---|---|



