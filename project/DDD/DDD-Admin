#### Card-Forge-Context	
Gestisce il sistema per creare nuovi mazzi di default e nuove carte tramite espansioni, quindi contiene la documentazione delle carte

| Term      | Block-Type | Motivation |
|---|---|---|
| CardDefinition | Governa la definizione coerente di una carta, validando i dati e le regole necessarie alla creazione e pubblicazione. Può includere un metodo/factory interno per creare istanze valide|
| DeckDefinition | Aggregate Root| Governa la definizione di un deck prefabbricato, garantendo coerenza di composizione, quantità delle carte e vincoli di formato. Può includere un metodo/factory interno per creare deck validi|
| CardRepository | Repository | Recupera e salva le *Card-definition* disponibili nel gioco |
| DeckRepository | Repository | Recupera e salva le *Deck-Definition* prefatti dall'admin |
| | | |
| CardCreated | Event | Una nuova *Card* è stata creata (salvata) |
| DeckCreated | Event | Un nuovo *Deck* è stato creato (salvata) |


#### Game-Observatory-Context	
Gestisce la raccolta delle statistiche del sistema di gioco (giocatori online, partite in corso, carte più giocate, ...)

| Term      | Block-Type | Motivation |
|---|---|---|



