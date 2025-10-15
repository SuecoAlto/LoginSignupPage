# MERN Stack Autentisering Boilerplate

Detta är en fullstack-webbapplikation byggd med MERN-stacken (MongoDB, Express.js, React, Node.js) som tillhandahåller en komplett, säker och modern grund för användarautentisering. Projektet innehåller användarregistrering, inloggning, lösenordsåterställning, tillståndslös sessionshantering med hjälp av JWT:er i `httpOnly`-cookies, skyddade rutter och ett dynamiskt gränssnitt som reagerar på användarens autentiseringsstatus.

Det fungerar som en robust startpunkt för alla applikationer som kräver ett säkert användarautentiseringssystem.

![Skärmbild av inloggningssida](./1.Loginpage.png)

## Live Demo

Du kan prova appen live, hostade på Render.com.

👉 [**Klicka här för att öppna live demon!**](https://loginsignuppage-9ztx.onrender.com/)  

⚠️ **Observera:**
Eftersom appen är hostade på Renders kostnadsfria nivå, "sover" servern när den är inaktiv.
Detta betyder att det kan ta upp till 1–2 minuter för applikationen att starta helt första gången du öppnar den. När den väl är vaken körs den smidigt.

---

## Teknikstack

Projektet är arkitekterat med en tydlig separation mellan backend-servern och frontend-klienten, och använder följande teknologier:

### Backend
* **Node.js**: JavaScript runtime-miljö för att köra serversidkod.
* **Express.js**: Ramverket som används för att bygga vår webbserver och API, hanterar routing och middleware.
* **MongoDB & Mongoose**: En NoSQL-databas (hanterad via MongoDB Atlas) och ett ODM-bibliotek för att förenkla datamodellering och interaktion.
* **JSON Web Tokens (JWT)**: Används för att skapa säkra åtkomsttoken för tillståndslös autentisering och lösenordsåterställningsflöden.
* **bcrypt.js**: Ett bibliotek för att hasha användarlösenord innan de lagras i databasen.
* **Nodemailer**: Ett bibliotek för att skicka e-post, används för lösenordsåterställningsfunktionaliteten.
* **cookie-parser**: Middleware för att tolka cookies som är kopplade till klientbegäran, väsentlig för vårt autentiseringsflöde.
* **CORS**: Middleware för att aktivera Cross-Origin Resource Sharing mellan klient och server.
* **Dotenv**: Hanterar miljövariabler för att hålla känslig information säker.
* **ES Modules (ESM)**: Projektet använder modern ES-modulsyntax genomgående för bättre kompatibilitet och standardisering.

### Frontend
* **React**: Ett JavaScript-bibliotek för att bygga dynamiska och interaktiva användargränssnitt.
* **Vite**: Ett modernt och extremt snabbt byggverktyg för frontend-utvecklingsupplevelsen.
* **React Router**: För att hantera klientsidrouting, möjliggör en Single-Page Application (SPA) upplevelse.
* **Axios**: En promise-baserad HTTP-klient för sömlös kommunikation med backend-API:et.
* **React Context**: Används för global tillståndshantering för att spåra användarens autentiseringsstatus över hela applikationen.
* **Tailwind CSS**: Ett utility-first CSS-ramverk för snabb och responsiv UI-utveckling.
* **DaisyUI**: Ett komponentbibliotek för Tailwind CSS som tillhandahåller förbyggda och anpassningsbara UI-komponenter med "sunset"-tema centralt hanterat.
* **lucid-react**: Ett bibliotek för rena och vackra ikoner.
* **react-hot-toast**: För att visa användarvänliga notifieringar och feedback.

---

## Kärnfunktioner & Koncept

* **Användarregistrering**: Nya användare kan registrera sig med namn, e-post, telefonnummer och lösenord, med backend-validering.
* **Säker användarinloggning**: Registrerade användare kan logga in, med lösenordsverifiering hanterad av `bcrypt.js`.
* **Lösenordsåterställningsflöde**: Ett komplett, säkert flöde för användare som har glömt sitt lösenord. Det innebär att generera en unik, engångs-, tidsbegränsad token och skicka ett e-postmeddelande med återställningsinstruktioner via Nodemailer.
* **Tillståndslös autentisering**: Applikationen använder JWT:er lagrade i säkra, `httpOnly`-sessionscookies, ett modernt tillvägagångssätt som skyddar mot XSS-attacker.
* **Skyddade rutter**: Applikationen har en `protect`-middleware på backend för att säkra specifika endpoints, vilket säkerställer att de endast är tillgängliga för autentiserade användare.
* **Global tillståndshantering**: React Context tillhandahåller ett globalt tillstånd för användaren, vilket säkerställer att gränssnittet omedelbart reagerar på inloggnings- och utloggningshändelser utan att behöva uppdatera sidan.
* **Dynamiskt gränssnitt**: Navigeringsfältet och andra komponenter ändras dynamiskt baserat på användarens autentiseringsstatus.
* **Klientsidrouting (SPA)**: Applikationen fungerar som en Single-Page Application, där sidinnehållet ändras utan fullständiga sidomladdningar. Detta möjliggörs av tre nyckelkomponenter från **React Router**:
    * **`<BrowserRouter>`**: Fungerar som "hjärnan", använder webbläsarens History API för att hålla gränssnittet och URL:en synkroniserade.
    * **`<Link>`**: "Navigatören" som fångar upp klick, förhindrar standardsidomladdningar och uppdaterar URL:en via History API.
    * **`<Routes>` & `<Route>`**: "Innehållsväxlaren" som lyssnar efter URL-ändringar och renderar rätt sidkomponent som matchar den aktuella sökvägen.

---

## Autentiseringsflöde förklarat

Denna applikation använder JWT:er, transporterade via säkra `httpOnly`-cookies, för att hantera användarsessioner.

1.  **Inloggning:** Användaren skickar sin e-post och sitt lösenord till servern.
2.  **Verifiering & Cookie-skapande:** Servern verifierar inloggningsuppgifterna. Om de är korrekta skapar den en unik JWT och placerar den inuti en säker, `httpOnly`-cookie som skickas tillbaka till användarens webbläsare.
3.  **Webbläsarlagring (sessionscookie):** Webbläsaren lagrar automatiskt cookien. Eftersom det är en sessionscookie raderas den automatiskt när webbläsaren stängs. `httpOnly`-flaggan förhindrar att någon klientsida JavaScript får åtkomst till den.
4.  **Autentiserade begäranden:** För varje framtida API-begäran bifogar webbläsaren **automatiskt** cookien. Klientsidkoden behöver inte hantera tokens manuellt.
5.  **Serververifiering:** Servern använder `cookie-parser`-middleware för att läsa token från cookien och verifierar sedan dess signatur. Om den är giltig bearbetar servern begäran.

Detta system är mycket effektivt eftersom servern inte behöver lagra någon sessionsinformation. Den litar fullt ut på den digitalt signerade informationen som finns inom den säkert transporterade token.

---

## Komma igång lokalt

Följ dessa steg för att klona och köra projektet på din lokala maskin.

### Förutsättningar
* Node.js (LTS-version rekommenderas)
* NPM (kommer med Node.js)
* Git

### Installationssteg

1.  **Klona repositoryt:**
    ```bash
    git clone https://github.com/SuecoAlto/Mern_Stack_Login_and_Signup_Page.git
    cd Mern_Stack_Login_and_Signup_Page
    ```

2.  **Installera backend-beroenden:**
    ```bash
    cd Backend
    npm install
    ```

3.  **Installera frontend-beroenden:**
    ```bash
    cd ../Frontend
    npm install
    ```

4.  **Konfigurera miljövariabler (Backend):**
    * Navigera till `Backend`-katalogen.
    * Skapa en fil med namnet `.env`.
    * Lägg till följande variabler. Du behöver tillhandahålla dina egna inloggningsuppgifter för MongoDB Atlas och en e-posttjänst (som Mailtrap för utveckling).

        ```
        # Serverkonfiguration
        PORT=5001

        # MongoDB
        MONGO_URI=din_mongodb_atlas_anslutningssträng

        # JWT
        JWT_SECRET=din_super_hemliga_jwt_sträng

        # Frontend URL (för att generera korrekta lösenordsåterställningslänkar)
        FRONTEND_URL=http://localhost:5173

        # E-posttjänst (t.ex. Mailtrap för utveckling)
        EMAIL_HOST=sandbox.smtp.mailtrap.io
        EMAIL_PORT=2525
        EMAIL_USER=ditt_mailtrap_användarnamn
        EMAIL_PASS=ditt_mailtrap_lösenord
        EMAIL_FROM=noreply@yourapp.com
        ```
    * Du kan generera en stark hemlig nyckel genom att köra detta kommando i din terminal:
        ```bash
        node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
        ```

5.  **Kör applikationen:**
    * **Starta backend-servern:** Öppna en terminal i `Backend`-katalogen och kör:
        ```bash
        npm run dev
        ```
        Servern startar på `http://localhost:5001`.

    * **Starta frontend-klienten:** Öppna en *ny* terminal i `Frontend`-katalogen och kör:
        ```bash
        npm run dev
        ```
        Applikationen kommer att vara tillgänglig på `http://localhost:5173`.

---

## Utvecklingsresa & Viktiga felsökningssteg

Under utvecklingen påträffades och löstes flera vanliga men lärorika problem, vilket demonstrerar en praktisk förståelse av fullstack-utvecklingsutmaningar.

* **Problem 1: `404 Not Found` på API-anrop**
    * **Problem:** Initiala API-anrop från frontend misslyckades med ett 404-fel.
    * **Diagnos:** Axios `baseURL` på klienten pekade felaktigt på frontend Vite-servern (`:5173`) istället för backend Express-servern (`:5000`).
    * **Lösning:** `axios.defaults.baseURL` i `main.jsx` korrigerades för att peka på rätt backend-adress.

* **Problem 2: CORS-fel med cookies**
    * **Problem:** Efter att ha fixat `baseURL`, blockerades API-anrop av webbläsaren på grund av CORS-policy.
    * **Diagnos:** En standard `cors()`-konfiguration är otillräcklig när frontend skickar inloggningsuppgifter (`withCredentials: true`). Servern måste explicit lita på klientens ursprung.
    * **Lösning:** CORS-middleware på servern uppdaterades för att specificera frontend ursprung och tillåta inloggningsuppgifter.

* **Problem 3: `ERR_HTTP_HEADERS_SENT` serverkrasch**
    * **Problem:** Backend-servern kraschade när en begäran gjordes till en skyddad rutt.
    * **Diagnos:** `protect`-middleware-funktionen kallade `next()` men stoppade inte sin egen exekvering, vilket ledde till ett försök att skicka två svar på en enda begäran.
    * **Lösning:** Logiken i `protect`-middleware refaktorerades till ett tydligt `if/else`-block, vilket säkerställer att endast en svarsväg någonsin tas.

* **Problem 4: React-varning: "Controlled to Uncontrolled Input"**
    * **Problem:** En konsolvarning dök upp efter en framgångsrik formulärinlämning.
    * **Diagnos:** Formulärets tillstånd återställdes med ett tomt objekt (`setData({})`), vilket fick `value`-prop för input att ändras från en tom sträng (`''`) till `undefined`.
    * **Lösning:** Tillståndsåterställningslogiken korrigerades för att återställa tillståndet till sin ursprungliga objektstruktur, vilket säkerställer att input förblir "kontrollerade" av React.

* **Problem 5: Lösenordsåterställning e-postlänkar pekar på fel URL**
    * **Problem:** När användare klickade på lösenordsåterställningslänkar i e-post fick de 404-fel eftersom länkarna pekade på backend-servern (`localhost:5001`) istället för frontend-applikationen.
    * **Diagnos:** `forgotPassword`-kontrollern genererade återställnings-URL:er med `req.protocol` och `req.get('host')`, vilket löstes till backend-serverns adress.
    * **Lösning:** Uppdaterade URL-genereringen för att använda en `FRONTEND_URL`-miljövariabel som pekar på React-applikationen (`http://localhost:5173` i utveckling), vilket säkerställer att återställningslänkar korrekt navigerar användare till frontend återställningslösenordssidan.

* **Problem 6: Portkonfigurationsuppdateringar**
    * **Problem:** Applikationen använde initialt port 5000 för backend, vilket står i konflikt med AirPlay på macOS.
    * **Diagnos:** macOS Monterey och senare versioner reserverar port 5000 för AirPlay Receiver, vilket orsakar `EADDRINUSE`-fel.
    * **Lösning:** Ändrade backend för att köras på port 5001 och uppdaterade alla relaterade konfigurationer, inklusive Axios baseURL och CORS-inställningar.

* **Problem 7: CORS Preflight Request-fel för lösenordsåterställning**
    * **Problem:** `POST`-begäranden till `/forgot-password` misslyckades med CORS preflight-fel, även om andra endpoints fungerade.
    * **Diagnos:** Komplexa begäranden (som `POST` med `application/json`) kräver explicit hantering av `OPTIONS` preflight-begäranden.
    * **Lösning:** Lade till `app.options('*', cors(corsOptions))` för att explicit hantera alla preflight-begäranden före annan middleware, vilket säkerställer att rätt CORS-headers skickas för alla begärantyper.