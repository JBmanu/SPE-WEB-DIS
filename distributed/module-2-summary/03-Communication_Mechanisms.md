# Communication Mechanisms for Distributed Systems

## Contesto
I sistemi distribuiti richiedono che i nodi comunichino sulla rete. Finora si è descritta la comunicazione come "invio di messaggi" tra nodi, ma come si inviano/ricevono esattamente messaggi? Dal corso di reti si sa che i protocolli di rete sono la risposta (es. TCP e UDP) — ma come si usano questi protocolli nei programmi, in pratica?

## Socket

La maggior parte dei sistemi operativi supporta la **Berkeley sockets API**, e virtualmente tutti i linguaggi di programmazione forniscono un wrapper attorno a questa API (incluso Python, tramite il modulo `socket`). I socket sono: un'API antica e stabile per il networking di basso livello in TCP/UDP (e oltre); molto didattici (supportano meccanismi di comunicazione molto comuni, ritrovabili in molte altre tecnologie: comunicazione connection-less vs. connection-oriented, message-based vs. stream-based); molto elementari (astrazioni di comunicazione di livello più alto possono essere costruite sopra di essi: RPC, HTTP, e virtualmente qualunque protocollo di livello applicativo).

### Definizione
Un socket è una rappresentazione astratta dell'endpoint locale di un percorso di comunicazione di rete. **Interpretazione**: il gateway di un processo verso la rete, che fornisce un mezzo di comunicazione full-duplex, multiplexabile, punto-punto o punto-multipunto verso altri processi distribuiti sulla rete.

Caratteristiche: **distributed processes** (i socket mirano a far comunicare i processi, ma anche più processi sulla stessa macchina possono comunicare via socket; lo stesso socket sulla stessa macchina può essere condiviso tra thread); **communication** (lo scambio di informazione è esplicito: i dati vengono inviati/ricevuti tramite metodi specifici del socket); **point-to-point** (ogni socket media l'interazione tra due — e solo due — processi, a differenza della comunicazione point-to-multipoint, dove un socket può comunicare con più processi); **multiplexable** (più socket indipendenti possono essere creati, su porte diverse — le porte sono interi positivi a 2 byte, range riservato per protocolli noti, range per uso personalizzato); **full-duplex** (i dati scambiati possono fluire in entrambe le direzioni simultaneamente — il ricevente può inviare dati mentre riceve, e il mittente può ricevere dati mentre invia).

### Due tipi di socket
**Stream socket**: permettono lo scambio di flussi (possibilmente illimitati) di byte; tipicamente basati su TCP, tipicamente operano in modo connection-oriented. **Datagram socket**: permettono lo scambio di pacchetti di byte di dimensione finita; tipicamente basati su UDP, tipicamente operano in modo connectionless. Sia i pacchetti sia gli stream sono mezzi di comunicazione orientati al byte (l'unità di comunicazione è il byte); i socket non si curano del contenuto dei dati scambiati — è compito dell'applicazione interpretare i byte.

### Gergo
**Client vs. Server**: client socket (il socket che inizia la comunicazione), server socket (il socket che accetta la comunicazione). **Local vs. Remote**: local socket (il socket sulla macchina locale), remote socket (il socket sulla macchina remota — agli occhi del client socket, il server socket è remoto, e viceversa). **Address e Port**: l'indirizzo è l'indirizzo IP della macchina (una macchina può avere più indirizzi IP, uno per interfaccia di rete); la porta è il numero di porta del socket; la coppia indirizzo:porta è l'endpoint del percorso di comunicazione.

## Datagram socket (UDP)

I datagram socket mirano a scambiare pacchetti di byte, chiamati **datagrammi**, tra endpoint. Un datagramma è un pacchetto autocontenuto di una data dimensione (in UDP il limite superiore è 64 KiB). Nessuna connessione viene stabilita tra gli endpoint: ogni invio/ricezione di datagramma è indipendente dagli altri. Non c'è differenza tra socket client e server: ogni datagram socket può agire da client o server in qualunque momento. Ogni datagramma è autocontenuto e può essere usato per comunicare con molti altri socket (la coppia indirizzo:porta è specificata a ogni invio) — questo supporta la comunicazione broadcast e multicast.

### Datagram socket in Python
```python
import socket
# creazione di un nuovo socket datagram
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# AF_INET specifica la famiglia di indirizzi (IPv4), SOCK_DGRAM il tipo (datagram)

# binding: associare il socket a un indirizzo e porta locali
sock.bind(('W.X.Y.Z', 12345))
# binding necessario per ricevere datagrammi; usare '0.0.0.0' per tutti gli indirizzi locali, 0 per far scegliere la porta all'OS

# invio di un datagramma
payload = 'Hello, world!'
recipient = ('A.B.C.D', 54321)
sock.sendto(payload.encode(), recipient)

# ricezione di un datagramma
data, sender = sock.recvfrom(bufsize=4096)
data = data.decode()
print(f'Received: "{data}" from "{sender}"')
```

Note: `sendto` invia un datagramma a un destinatario remoto (argomenti: la sequenza di byte da inviare, l'endpoint destinatario come tupla); `recvfrom` riceve un datagramma da un mittente remoto (argomento: la dimensione del buffer, "una potenza di 2 relativamente piccola", es. 4096) e restituisce una tupla con i dati ricevuti e l'endpoint del mittente.

**Encoding/decoding**: i socket inviano/ricevono sequenze di byte (tipo `bytes`), non stringhe (tipo `str`); i letterali di sequenze di byte si creano col prefisso `b`, es. `b'Hello, world!'`; i metodi `encode`/`decode` convertono tra sequenze di byte e stringhe; l'encoding di default è UTF-8, ma altri encoding sono possibili — l'encoding/decoding deve essere consistente tra mittente e ricevente. Il socket deve essere chiuso quando non più necessario: `sock.close()`.

### Esempio: UDP Group Chat
Implementazione di una semplice chat di gruppo con datagram socket: comunicazione **peer-to-peer**, ogni partecipante invia messaggi a tutti gli altri; ogni partecipante identificato da un nickname e/o endpoint; ogni messaggio contiene il nickname del mittente, il testo del messaggio, e il timestamp; UI a riga di comando.

**Funzioni di utilità**: una funzione `address()` per validare/parsare indirizzo e porta da una stringa; una funzione `message()` per comporre i messaggi in stringhe con timestamp; una funzione `local_ips()` per ottenere tutti gli indirizzi IP della macchina corrente (tramite il modulo `psutil`, non parte della libreria standard ma disponibile su PyPI).

**Classe `Peer`**: incapsula il socket e i peer di un partecipante; il socket viene creato dietro le quinte e collegato alla porta specificata nel costruttore; 1 partecipante = 1 peer; espone `local_address` (proprietà read-only), `send_all(message)` (invia un messaggio a tutti i peer), `receive()`, `close()`.

**Attempt 1 (`example1_udp_chat_wrong`)** — implementazione ingenua, con diversi problemi:
1. **Operazioni di input bloccanti**: la ricezione bloccante (il peer resta bloccato in attesa di un messaggio, non potendo inviare messaggi né raccogliere input locali) e l'input bloccante (il peer resta bloccato in attesa che l'utente digiti un messaggio, non potendo ricevere messaggi).
2. **Partecipanti come peer a runtime, ma inizialmente uno client e uno server**: il client deve conoscere l'indirizzo del server, ma l'indirizzo del server non è noto in anticipo — il primo partecipante non può avviare la conversazione, il secondo deve conoscere l'indirizzo del primo.
3. **Mancanza di terminazione controllata**: l'unico modo per uscire è terminare forzatamente il programma (es. Ctrl+C); il peer remoto non viene notificato della terminazione.
4. **Mancanza di autenticazione**: i peer dichiarano la propria identità in modo onesto, includendola nel payload dei messaggi, senza alcuna verifica (es. nessun controllo che lo username sia unico, o che l'indirizzo corrisponda allo username — peer malevoli potrebbero impersonare altri peer).
5. **UDP è inaffidabile**: i messaggi possono andare persi, ritardati, consegnati fuori ordine, o duplicati — il codice non gestisce affatto questi casi.

**Possibili miglioramenti**: (1) usare più thread per gestire l'input (uno per fonte di input + un altro); (2) avere un server centrale che agisce da broker per i partecipanti; (3) catturare la chiusura del terminale, inviare un messaggio di terminazione agli altri peer, chiudere il socket ed uscire — al ricevimento del messaggio di terminazione, fare qualcosa (es. stampare un messaggio di addio); (4) crittografia a chiave pubblica (fuori scopo per questo corso) o un server centrale con un protocollo di autenticazione; (5) implementare meccanismi di retry, o usare un protocollo affidabile (es. TCP).

**Attempt 2 (`example2_udp_chat`)** — risolve il problema del blocco usando thread per gestire input e ricezione: una classe `AsyncPeer`, sottoclasse di `Peer`, che espone una **callback** (concetto importante: una funzione salvata come dato/riferimento, progettata per essere chiamata da un'altra funzione, spesso ritornando al livello di astrazione originale) per gestire asincronamente i messaggi in arrivo; il ricevitore lavora in un thread separato in background, invocando la callback alla ricezione.

**Attempt 3 (`example4_udp_chat_graceful`)** — risolve il problema della terminazione controllata: si definisce un messaggio speciale `EXIT_MESSAGE`; al ricevimento, il mittente viene rimosso dalla lista locale di peer; si catturano `EOFError` (Ctrl+D, terminazione "pulita" dell'input) e `KeyboardInterrupt` (Ctrl+C) per inviare il messaggio di terminazione prima di chiudere. Razionale: non serve terminare l'intera applicazione quando un peer lascia la chat — la chat continua, e il peer uscente viene dimenticato; altri peer possono unirsi in qualunque momento.

**Problemi rimanenti dopo l'Attempt 3**: i partecipanti sono peer a runtime, ma inizialmente uno deve essere client e l'altro server; manca l'autenticazione; UDP resta inaffidabile (messaggi persi, ritardati, fuori ordine, duplicati) — quest'ultimo problema viene lasciato esplicitamente irrisolto ed è oggetto di stress-test con `example3_udp_streamer`.

## Stream socket (TCP)

I stream socket mirano a scambiare flussi di byte tra endpoint: uno stream è una sequenza di byte senza limite di lunghezza (grazie a TCP, lo stream è affidabile e ordinato), ed è direzionale (dal client al server, o viceversa). Una connessione deve essere stabilita tra 2 (e solo 2) endpoint: la connessione è full-duplex (i dati possono fluire in entrambe le direzioni simultaneamente), e ogni connessione coinvolge 2 stream. C'è una distinzione netta tra socket client e server (con funzionalità/API diverse). Gli stream socket supportano solo comunicazione uno-a-uno: per comunicare con più peer, servono più connessioni.

### Stream socket in Python

**Creazione**: stesso modulo `socket`, ma con tipo diverso: `sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)`. Come per i datagram socket, va fatto il binding prima dell'uso: `sock.bind(('W.X.Y.Z', 12345))` (usare `"0.0.0.0"` per tutti gli indirizzi, `0` per far scegliere la porta all'OS — comunemente fatto dai client).

**Lato client (connessione)**: per connettersi a un server, il client deve conoscere l'indirizzo IP e la porta:
```python
try:
    sock.connect(('A.B.C.D', 54321))
except ConnectionRefusedError:
    print("The server is reachable but not willing to accept the connection")
except TimeoutError:
    print("The server is not reachable")
```
`connect` è bloccante finché la connessione non viene stabilita; il timeout può essere regolato con `socket.setdefaulttimeout(SECONDS)` (globale) o `s.settimeout(SECONDS)` (per singolo socket); `None` significa nessun timeout.

**Lato client (comunicazione)**: una volta stabilita la connessione, il client può inviare/ricevere dati (scrivendo/leggendo blocchi di byte sullo stream di output/input del socket). **Regola d'oro**: essere sempre consapevoli di quanti byte vengono inviati/ricevuti per volta (evitare letture/scritture illimitate, che possono saturare la rete o la memoria locale).
```python
data: bytes = b'My very important payload'
sock.sendall(data)  # bloccante finché tutti i dati non sono inviati
sock.shutdown(socket.SHUT_WR)  # segnala che non verranno inviati altri dati

BUFFER_SIZE = 4096
data: bytes = sock.recv(BUFFER_SIZE)  # bloccante finché non si riceve qualche dato
if not data:  # data == b''
    print("The remote is over with the data")
sock.shutdown(socket.SHUT_RD)
```

**Lato client (chiusura)**: `sock.close()` chiude la connessione (bloccante ma veloce); il server viene notificato della chiusura.

**Lato server**: i server socket iniziano ad ascoltare connessioni in ingresso e le accettano una alla volta:
```python
sock.listen(5)  # massimo 5 connessioni pendenti in coda
while True:
    client_sock, client_address = sock.accept()  # accetta una nuova connessione
    # ... operazioni con il client ...
    client_sock.close()
```
`listen(BACKLOG_LENGTH)` non è bloccante: imposta solo la lunghezza della coda di connessioni non ancora accettate (le connessioni rifiutate riceveranno un `ConnectionRefusedError` lato remoto); `accept()` estrae la prima connessione pendente dalla coda, o blocca finché non ne arriva una nuova; restituisce un nuovo socket connesso al client e l'indirizzo del client. Il socket server (`sock`) viene usato solo per accettare nuove connessioni; il nuovo socket (`client_sock`) viene usato esattamente come nel lato client, eccetto che è già connesso.

### Scambio di messaggi orientato alla connessione
Gli stream sono ottimi per inviare dati in modo affidabile e ordinato, ma cosa fare se si vuole inviare una sequenza di messaggi? Pattern comune: stabilire una connessione tra due peer, mantenerla aperta il più a lungo possibile, inviare messaggi avanti e indietro senza bisogno di riconnettersi ogni volta. Pattern comune per delimitare i messaggi: **prefissare ogni messaggio con la sua lunghezza** — così il ricevente sa quanti byte leggere dallo stream; il mittente invia la lunghezza del messaggio prima del messaggio stesso, il ricevente legge la lunghezza prima di leggere il messaggio stesso.
```python
# Mittente
for message in messages:
    length = len(message)
    payload = length.to_bytes(4, 'big') + message.encode()
    sock.sendall(payload)
sock.shutdown(socket.SHUT_WR)

# Ricevente
while True:
    length = sock.recv(4)
    if not length:
        break
    length = int.from_bytes(length, 'big')
    message = sock.recv(length).decode()
sock.shutdown(socket.SHUT_RD)
```

### Esempio: TCP Echo
Applicazione echo con stream socket: il client inoltra il proprio standard input al server, che lo rimanda indietro, e il client lo stampa — essenzialmente come il comando `cat` di Unix-like, ma con il server come intermediario. Esempio molto didattico, nessuna applicazione reale, ma utile per capire gli stream socket; serve a studiare cosa succede quando lo stream di dati è troppo lungo.

**Server**: ascolta connessioni, ne accetta una alla volta (una connessione singola: `server.listen(1)`); per ogni connessione, legge blocchi di dati di dimensione fissa dal client (se non legge byte, l'interazione è finita), rimanda al client il blocco ricevuto, registra quanti byte ha ricevuto.

**Client, Attempt 1**: si connette al server, inoltra il proprio standard input al server (`BUFFER_SIZE` byte alla volta, finché non si raggiunge la fine dello stream, es. Ctrl+D); segnala di non avere più dati da inviare (chiudendo la parte di scrittura del socket); riceve i dati "echoed" dal server, stampandoli; chiude la connessione.

**Problema dell'Attempt 1**: se lo stream di input del client è troppo lungo, e il client inizia a ricevere i dati "echoed" solo dopo aver inviato tutti i dati, anche se il server fa l'echo un blocco alla volta, il buffer in ingresso del client può saturarsi e rallentare/fermare l'invio — questo è semplicemente come funziona TCP (cf. flow control di TCP). Quindi: uno stream molto lungo + questa particolare implementazione del client = **deadlock**. **Soluzione**: far sì che il client interlevi invio e ricezione.

**Client, Attempt 2**: a ogni iterazione, il client invia un blocco (se presente) e immediatamente riceve l'echo, confrontando i dati inviati con quelli ricevuti (se differiscono, stampa un errore e interrompe); quando lo stream di input finisce e l'ultimo blocco è stato ricevuto, il client chiude la connessione. Questa versione funziona correttamente anche con stream lunghi.

### Esempio: TCP Chat
TL;DR: rifare la chat UDP, ma con TCP, e senza gruppi (1-a-1). Implementazione di una chat 1-a-1: comunicazione client-server, ogni partecipante invia messaggi all'altro, ogni messaggio contiene nickname, testo, timestamp; UI a riga di comando.

**Classi di utilità**:
- **`Connection`**: un canale di comunicazione tra 2 endpoint, per inviare e ricevere asincronamente messaggi via TCP. Backed da uno stream socket; usa un thread per la ricezione asincrona; fornisce una callback per gestire i messaggi in arrivo; fornisce un metodo per inviare messaggi. Genera eventi: `'message'` (quando un messaggio viene ricevuto), `'close'` (quando la connessione si chiude), `'error'` (quando si verifica un errore).
- **`Client`**: un caso particolare di `Connection` che si connette a un server alla creazione.
- **`Server`**: una facility per ascoltare connessioni in ingresso e accettarle, creando una `Connection` per ciascuna. Backed da uno stream socket per l'ascolto; usa un thread per l'accettazione asincrona; fornisce una callback per gestire le nuove connessioni. Genera eventi: `'listen'` (quando il server inizia ad ascoltare), `'connect'` (quando una nuova connessione si stabilisce), `'stop'` (quando il server smette di ascoltare), `'error'`.

**Lato client**: registra una callback `on_message_received` che gestisce gli eventi `'message'`, `'close'`, `'error'`; stabilisce la connessione con `Client(server_address=..., callback=on_message_received)`; raccoglie input dalla console e li invia al peer remoto, gestendo `EOFError`/`KeyboardInterrupt` per chiudere la connessione in modo controllato.

**Lato server**: simmetrico, con in aggiunta una callback `on_new_connection` specifica del server, che gestisce gli eventi `'listen'`, `'connect'` (allegando la callback `on_message_received` alla nuova connessione), `'stop'`, `'error'`; il server viene avviato con `Server(port=..., callback=on_new_connection)`.

**Test manuale**: funziona più o meno come la chat UDP, ma senza i problemi di dispatching dei messaggi; grazie all'orientamento alla connessione, i peer possono reagire alla chiusura della connessione (es. Ctrl+D su un peer fa sì che l'altro se ne accorga).

## Esercizio: TCP Group Chat
**Prerequisiti**: comprendere gli stream socket, l'esempio UDP group chat, l'esempio TCP chat, e il codice Python fornito (`snippets/lab3/__init__.py`, `snippets/lab3/example3_tcp_chat.py`).

**Obiettivo**: supportare chat di gruppo in TCP, dove i client possono apparire e scomparire in qualunque momento (similmente a quanto avviene per l'esempio UDP group chat), in modo che ogni peer trasmetta in broadcast i messaggi a tutti gli altri peer con cui è stato in contatto finora.

**Suggerimenti**: si può e si dovrebbe riusare il codice fornito, eventualmente modificandolo; non serve più distinguere tra server e client: tutti i peer agiscono simultaneamente come entrambi; i peer possono essere informati sugli endpoint degli altri peer al lancio (via argomenti da linea di comando).

**Scadenza**: 31 dicembre 2025. **Incentivo**: +1 punto sul voto finale (se la soluzione è soddisfacente). **Sottomissione**: fork del repository `lab-snippets`, creazione di un branch `exercise-lab3`, commit della soluzione nella directory `snippets/lab3`, push e pull request al repository originale, intitolata `[A.Y. 2025/2026 Cognome, Nome] Exercise: TCP Group Chat`, descrivendo la soluzione, motivando le scelte e spiegando come testarla.
