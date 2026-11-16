# Focus_Rooms_Group3
Team wide repository to be used for coding the Focus Rooms applicaiton

## Pokretanje lokalno

### Potrebno instalirati
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (mora biti upaljen)
- Java 17 (npr. `winget install EclipseAdoptium.Temurin.17.JDK`)
- [Node.js](https://nodejs.org/) (za frontend)

Maven nije potrebno instalirati, u `Backend` mapi je `mvnw`.

### 1. Baza (PostgreSQL)
Iz glavne mape repozitorija:
```bash
docker compose up -d
```
Zadani podaci za bazu su u `.env.example` (baza, korisnik i lozinka: `focusrooms`, port `5432`).
Ako ih želiš promijeniti, kopiraj `.env.example` u `.env` i uredi ga.

### 2. Backend (Spring Boot)
```bash
cd Backend
./mvnw spring-boot:run
```
Backend radi na http://localhost:8080. Tablice se u bazi naprave same pri pokretanju.

### 3. Frontend (React + Vite)
```bash
cd Frontend
npm install
npm run dev
```
Frontend radi na http://localhost:5173.

### Gašenje
- Backend i frontend: `Ctrl + C` u terminalu
- Baza: `docker compose down` (podaci ostaju spremljeni)
- Baza i brisanje svih podataka: `docker compose down -v`
