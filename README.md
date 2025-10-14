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