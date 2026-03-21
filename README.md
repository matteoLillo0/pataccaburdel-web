# 🍷 PataccaBurdel - Fictional Restaurant Landing Page

Una landing page moderna e containerizzata per "Pataccaburdel", un ristorante fittizio situato a Bertinoro, il "Balcone della Romagna". 

Il progetto nasce con l'obiettivo di applicare i principi di **Separation of Concerns** e **Infrastructure as Code**, isolando un frontend statico moderno all'interno di un web server Node.js leggero, il tutto orchestrato tramite Docker.

## 🏗️ Architettura e Tech Stack

L'infrastruttura è progettata per essere modulare, sicura e facilmente replicabile in qualsiasi ambiente:

* **Frontend:** HTML5 semantico e CSS modulare (Tailwind CSS via CDN), focalizzato su performance e design responsive (Mobile-First).
* **Backend Server:** **Node.js** con **Express**. Il server agisce esclusivamente come File Server statico agnostico, applicando il middleware `express.static()` per gestire correttamente le richieste HTTP e i MIME types.
* **Containerizzazione:** **Docker**. L'immagine è basata su `node:20-alpine` (musl libc) per minimizzare la superficie di attacco e il peso del container (~5MB base). Il processo Node sfrutta la *exec form* (`CMD ["node", "server.js"]`) assumendo il PID 1 per garantire un *graceful shutdown* in ricezione dei segnali di sistema (SIGINT/SIGTERM).

## 📂 Struttura del Progetto

```text
pataccaburdel/
├── public/                 # Document Root (Frontend Assets)
│   └── index.html          # Entry point UI
├── server.js               # Express Server & Network Socket
├── package.json            # Node.js dependencies manifest
├── package-lock.json       # Determinstic dependency tree
├── Dockerfile              # Immagine di produzione (IaC)
└── .dockerignore           # Ottimizzazione del context di build
```
## 🚀 Setup e Installazione (Docker Compose)

Questo progetto utilizza **Docker Compose** per l'orchestrazione e la configurazione dell'ambiente di runtime, garantendo una riproducibilità immediata senza dover gestire complessi flag da riga di comando.

### 1. Avvio dell'Applicazione
Assicurati di avere il demone Docker in esecuzione. Per compilare l'immagine (se necessario) e avviare il container in background (detached mode), esegui dalla root del progetto:

```bash
docker compose up -d
```
*Il server sarà accessibile all'indirizzo `http://localhost:8080` (o sulla porta definita nel tuo `docker-compose.yml`).*

### 2. Riavvio e Ricompilazione
Se modifichi le dipendenze in `package.json`, il `Dockerfile`, o il `server.js`, devi forzare la ricompilazione dell'immagine e ricreare il container:

```bash
docker compose up -d --build
```

### 3. Gestione e Spegnimento
Per ispezionare l'output del processo Node (PID 1) in tempo reale:
```bash
docker compose logs -f
```

Per arrestare il container in modo pulito e distruggere la rete virtuale creata:
```bash
docker compose down
```
