# LoginSignupPage
Full-Stack Mern login and signup configuration page 



### Let’s quickly go through what each package does:

* **express:** The framework used to build our web server and API.  
* **mongoose:** Makes it easy to communicate with our MongoDB database.  
* **cors:** Middleware that allows requests from our frontend (which runs on a different port).  
* **nodemon:** A tool that automatically restarts our server when we make changes to the code.  
* **bcryptjs:** A library used to *hash* (cryptographically protect) users’ passwords before they’re stored in the database.  
* **jsonwebtoken (JWT):** Used to create authentication tokens that help keep users logged in and protect certain parts of our API.  
* **dotenv:** Used to manage secret keys and connection strings in a `.env` file.
* vite: 
* axios:
* react-router:
* lucid-react:
* react-hot-toast:
* Tailwind CSS: 
* DaisyUI



###
Create a JSON Web Token (JWT) secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
````
and add to the .env file as JWT_SECRET=

### Authentication Flow with JSON Web Tokens (JWT)

This application uses **JSON Web Tokens (JWT)** to manage user sessions in a secure and stateless way.  
This is the standard method used by modern APIs and web applications.

---

#### How It Works: Step-by-Step

The authentication flow follows a simple and robust process:

1. **Login:** The user sends their email and password to the server.  
2. **Verification & Token Creation:** The server verifies the credentials. If they are correct, it creates a unique JWT (a “key”) that contains the user’s ID and an expiration date. This token is then sent back to the client.  
3. **Client-Side Storage:** The client (React app) receives the token and stores it securely (e.g., in `localStorage`).  
4. **Authenticated Requests:** For every future API request that requires authentication (e.g., fetching profile data), the client includes the stored JWT in the request’s `Authorization` header.  
5. **Server Verification:** The server receives the request, extracts the token, and verifies its signature using its secret key.  
   If the signature is valid and the token hasn’t expired, the server knows exactly who the user is and can grant access to the requested resource.

This system is highly efficient because the server does **not** need to store any session information.  
It fully trusts the digitally signed information contained within each token.

---

#### Anatomy of a JWT

A JWT is not just a random string — it has a specific, decodable structure consisting of **three parts** separated by dots:  
**Header.Payload.Signature**

Let’s analyze an example token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWQ5ZDAxNTc2ZjU5MGJmOTQ3ODViZSIsImlhdCI6MTc2MDQwNjc1NiwiZXhwIjoxNzYyOTk4NzU2fQ.bjTn7PLMFR8U3oLwIRzw5uOJ00wihIeE9dZ_LjZTSgI

---

**1. Header**  
* **Part:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`  
* **Decoded:** `{"alg":"HS256","typ":"JWT"}`  
* **Explanation:** This is metadata about the token itself.  
  * `alg` specifies the signing algorithm used (in this case, HMAC SHA-256).  
  * `typ` confirms that it is a JWT.

---

**2. Payload**  
* **Part:** `eyJpZCI6IjY4ZWQ5ZDAxNTc2ZjU5MGJmOTQ3ODViZSIsImlhdCI6MTc2MDQwNjc1NiwiZXhwIjoxNzYyOTk4NzU2fQ`  
* **Decoded:** `{"id":"68ed9d01576f590bf94785be","iat":1760406756,"exp":1762998756}`  
* **Explanation:** This contains the actual data carried by the token.
  * `"id"` — The user’s unique ID from the database. This is how the server identifies who is making the request.  
  * `"iat"` (Issued At) — A timestamp indicating when the token was created.  
  * `"exp"` (Expiration Time) — A timestamp indicating when the token expires and becomes invalid (set to 30 days in this project).

---

**3. Signature**  
* **Part:** `bjTn7PLMFR8U3oLwIRzw5uOJ00wihIeE9dZ_LjZTSgI`  
* **Explanation:** This is the most critical security component.  
  The signature is created by combining the header, payload, and a secret key (`JWT_SECRET`, known only to the server), then hashing them using the specified algorithm.  
  The signature ensures two vital security properties:
  * **Integrity:** The data inside the token has not been tampered with.  
    If an attacker modifies the user ID in the payload, the signature will no longer match, and the server will reject the token.  
  * **Authenticity:** The token was issued by *our server*, since only it has access to the secret key.


## Authentication Flow with JSON Web Tokens (JWT)

This application uses **JSON Web Tokens (JWT)**, transported via **secure `httpOnly` cookies**, to manage user sessions in a stateless and secure manner.  
This is a best-practice approach for modern web applications.

---

### How It Works: Step-by-Step

The authentication flow follows a simple and robust process:

1. **Login:**  
   The user sends their email and password to the server.

2. **Verification & Cookie Creation:**  
   The server verifies the credentials. If they are correct, it creates a unique JWT and sets it inside a **secure, `httpOnly` cookie** that is sent back in the response to the user's browser.

3. **Browser Storage (Session Cookie):**  
   The browser receives the response and automatically stores the cookie.  
   Since it's configured as a **session cookie**, the browser automatically deletes it when the session ends (i.e., when the browser is closed).  
   The **`httpOnly` flag** prevents any client-side JavaScript from accessing the cookie — a critical security feature to mitigate XSS attacks.

4. **Authenticated Requests:**  
   For every future API request to the server, the browser **automatically includes the cookie** with the request.  
   The client-side code does not need to manually manage tokens or `Authorization` headers.

5. **Server Verification:**  
   The server receives the request, uses the **`cookie-parser`** middleware to read the token from the cookie, and then verifies its signature using its secret key.  
   If the signature is valid and the token hasn’t expired, the server knows who the user is and can grant access to the requested resource.

---

This system is highly efficient because the server does **not** need to store any session information.  
It fully trusts the digitally signed information contained within the securely transported token.

---

## Anatomy of a JWT

While the token is transported in a cookie, the structure of the token itself remains the same.  
A JWT is not just a random string — it has a specific, decodable structure consisting of three parts separated by dots:

**Header.Payload.Signature**

---







This commit scaffolds the initial client-side application using Vite for a fast and modern development experience. It sets up the basic project structure and installs the core dependencies required for the login/signup application.

- Initialized a new React project in the `/client` directory with Vite.
- Installed primary dependencies: `axios` for making HTTP requests to the backend API, and `react-router-dom` for handling client-side routing.
- Cleaned up the default Vite boilerplate files, including removing default assets, styles, and component code from `App.jsx` to establish a clean foundation for the project.


URL:en i adressfältet ändras (/login, /register) och att texten på sidan byts ut (till "Login", "Register") — allt utan att sidan laddas om - tre huvudkomponenter från react-router som gör detta möjligt:

<BrowserRouter> (Hjärnan/Chefen):

Denna komponent, som vi la i main.jsx, är den övergripande chefen. Den använder webbläsarens inbyggda "History API" för att hålla koll på URL:en och ser till att din React-app och adressfältet alltid är synkroniserade. Den möjliggör hela systemet.

<Link> (Navigatören/Dörröppnaren):

När du klickar på en <Link to="/login">-komponent, gör den två saker:

Den förhindrar webbläsarens standardbeteende, vilket skulle vara att göra en fullständig sidomladdning.

Den talar om för <BrowserRouter> att "nu ska URL:en vara /login".

<Routes> och <Route> (Växlaren/Innehållsvisaren):

<Routes>-komponenten fungerar som en växel. Den tittar ständigt på den aktuella URL:en (som hanteras av <BrowserRouter>).

Den letar sedan bland sina <Route>-barn för att hitta den vars path matchar den aktuella URL:en.

När den hittar en match (t.ex. <Route path="/login" ... />), renderar den den komponent som anges i element-propen (i detta fall, vår Login-komponent).

Så sammanfattningsvis: BrowserRouter är grunden, <Link> är det som initierar en URL-ändring utan omladdning, och <Routes>/<Route> är det som faktiskt byter ut innehållet på sidan som svar på den ändringen.


Implementing Protected Routes and Global State

To create a complete authentication experience, a system was implemented to manage the user's logged-in state across the application and protect certain routes from unauthorized access. This was achieved in three main parts:

Part A: Backend Endpoints & Security Middleware

The backend was enhanced with the necessary endpoints to manage a user's session:

protect Middleware: A crucial security middleware was created to act as a gatekeeper for private routes. It works by:

Extracting the JWT from the incoming httpOnly cookie on a request.

Verifying the token's signature and expiration against the JWT_SECRET.

If valid, it fetches the corresponding user from the database and attaches their data to the req object.

If the token is missing or invalid, it immediately sends a 401 Unauthorized error, blocking access to the intended route.

/profile Endpoint (GET): A new, protected route that utilizes the protect middleware. It allows the frontend to ask the server, "Who is the currently logged-in user?" and receive their profile data back.

/logout Endpoint (GET): A public route that securely logs a user out by clearing the session cookie in their browser.

Part B: Global State with React Context

To manage the user's authentication status across all frontend components without "prop drilling," React Context was implemented:

UserContext: A global context was created to serve as a single source of truth for the authenticated user's data.

UserContextProvider: This provider component wraps the entire application. It holds the user state (user, setUser).

Automatic Session Check: The provider contains a useEffect hook that runs once on initial application load. This hook makes a request to the /profile endpoint. If the request is successful (meaning a valid session cookie was sent by the browser), the user's data is populated into the global state, automatically logging them in.

Part C: Dynamic UI and User Interaction

The global state from UserContext was then used to make the UI dynamic and responsive to the user's authentication status:

Dynamic Navbar: The navigation bar now uses useContext to check if a user is logged in.

If logged out, it displays links to "Login" and "Register".

If logged in, it displays a welcome message with the user's name, a link to the "Dashboard," and a "Logout" button.

Protected Dashboard Page: A new dashboard page was created that is accessible to all users but only displays profile information if the user object in the context is populated.

Logout Functionality: The "Logout" button in the navbar triggers a function that calls the /logout endpoint on the backend and simultaneously sets the global user state on the frontend to null, instantly updating the UI to a logged-out state.

Key Troubleshooting Steps During Implementation

During development, several common but educational issues were encountered and resolved. This debugging journey was critical to achieving a stable and functional authentication flow.

Issue 1: 404 Not Found on API Calls

Problem: Initial registration attempts from the frontend failed with a 404 error.

Diagnosis: The browser's developer console showed that requests were being sent to the frontend's Vite server (:5173) instead of the backend's Express server (:5000).

Solution: The axios.defaults.baseURL in main.jsx was corrected to point to the proper backend address (http://localhost:5000/api/auth).

Issue 2: CORS Error with Cookies

Problem: After fixing the baseURL, API calls were being blocked by the browser due to CORS policy.

Diagnosis: Standard app.use(cors()) on the backend is insufficient when the frontend sends credentials (cookies). The browser requires a more explicit trust policy from the server.

Solution: The CORS middleware on the server (server/index.js) was updated to explicitly specify the frontend's origin and allow credentials: cors({ origin: 'http://localhost:5173', credentials: true }).

Issue 3: ERR_HTTP_HEADERS_SENT Server Crash

Problem: The backend server crashed whenever a request was made to a protected route by a logged-in user.

Diagnosis: The protect middleware function was calling next() to pass control to the controller but did not stop its own execution. It then proceeded to a final check that also tried to send a response, resulting in an attempt to send two responses to a single request.

Solution: The logic in the protect middleware was refactored into a clear if/else block, ensuring that for any given request, the function would either call next() OR send an error response, but never both.

Issue 4: React Warning: "Controlled to Uncontrolled Input"

Problem: A console warning appeared after a successful registration.

Diagnosis: The form's state was being reset with an empty object (setData({})), which caused the value prop of the inputs to change from an empty string ('') to undefined.

Solution: The state reset logic was corrected to setData({ name: '', ... }), preserving the object's structure and ensuring the inputs remained "controlled" by React throughout their lifecycle.