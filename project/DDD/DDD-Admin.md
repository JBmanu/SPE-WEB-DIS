#### Card-Forge-Context	
Gestisce il sistema per creare nuovi mazzi di default e nuove carte tramite espansioni, quindi contiene la documentazione delle carte

| Term                  | Block-Type     | Motivation                                                                                                                                                                                                                                                                                       |
|-----------------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CardDefinition        | Aggregate Root | Governa la definizione coerente di una carta, validando i dati e le regole necessarie alla creazione e pubblicazione. Può includere un metodo/factory interno per creare istanze valide. Attributi: ID, nome, descrizione, insieme di azioni (valide e compatibili fra loro), tipologia di carta |
| Action                | Value Object   | Modella una singola azione della carta, con parametri e vincoli propri.                                                                                                                                                                                                                          |
| Attribute             | Value Object   | Raccogli attributi/caratteristiche della carta come AttackType, CardType, ecc...                                                                                                                                                                                                                 |
|                       |                |                                                                                                                                                                                                                                                                                                  |
| DeckDefinition        | Aggregate Root | Governa la definizione di un deck, garantendo coerenza di composizione, quantità delle carte e vincoli di formato. Può includere un metodo/factory interno per creare deck validi. Attributi: ID, nome, elenco di altri deck inseriti, insieme di CardDefinition inserite                        |
| DeckEntry             | Value Object   | Rappresenta una riga del deck: DeckDefinitionId + qunatity                                                                                                                                                                                                                                       |
| CardEntry             | Value Object   | Rappresenta: CardDefinitionId + quantity                                                                                                                                                                                                                                                         |
|                       |                |                                                                                                                                                                                                                                                                                                  |
| CardDefinitionFactory | Factory        | Crea CardDefinition factory                                                                                                                                                                                                                                                                      |
| DeckDefinitionFactory | Factory        | Crea DeckDefinition factory                                                                                                                                                                                                                                                                      |
|                       |                |                                                                                                                                                                                                                                                                                                  |
| CardRepository        | Repository     | Recupera e salva le *CardDefinition* disponibili nel gioco                                                                                                                                                                                                                                       |
| DeckRepository        | Repository     | Recupera e salva le *DeckDefinition* prefatti dall'admin                                                                                                                                                                                                                                         |
|                       |                |                                                                                                                                                                                                                                                                                                  |
| CardCreated           | Event          | Una nuova *Card* è stata creata (salvata)                                                                                                                                                                                                                                                        |
| DeckCreated           | Event          | Un nuovo *Deck* è stato creato (salvata)                                                                                                                                                                                                                                                         |
| CardEdited            | Event          | La CardDefinition è stata modificata                                                                                                                                                                                                                                                             |
| DeckEdited            | Event          | Un Deckdefinition è sttao modificato/aggiornato                                                                                                                                                                                                                                                  |


**NOTA:**
Per esempio, dentro CardDefinition puoi imporre regole tipo:
- una certa tipologiaCarta ammette solo alcune azioni;
- alcune azioni non possono coesistere tra loro;
- una carta pubblicabile deve avere campi obbligatori completi.


#### Game-Observatory-Context	
Gestisce la raccolta delle statistiche del sistema di gioco (giocatori online, partite in corso, carte più giocate, ...)

| Term      | Block-Type | Motivation |
|---|---|---|



