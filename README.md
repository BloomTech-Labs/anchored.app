# Proofd

![Proofd Logo](/client/src/assets/Proofd_3.png)

**_A blockchain enabled verification platform_**

Proofd utilizes [Chainpoint's](https://chainpoint.org/) innovative technology which allows users to securely link a hash of their data, such as important documents, to the [Bitcoin](https://bitcoin.org/en/) blockchain. After logging in, users can connect with third party applications such as [DocuSign](https://www.docusign.com/) and get timestamp proofs for any file. By associating data to a tamper-proof, immutable ledger, it can be mathematically proven that the data existed at an exact time and place.

## Team

### Developers

- [Jeremy A. Jones](https://github.com/crypto-jones)
- [Zack Hitchcock](https://github.com/zackhitch)
- [Brandon Aguirre](https://github.com/DirupT)
- [Randy Calderon](https://github.com/RandyCalderon)
- [Sean Chavez](https://github.com/seanchavez)

### Project Manager

- [Jared Cuffe](https://github.com/jcuffe)

### UI/UX Designer

- [Suniti Thapa](https://www.linkedin.com/in/suniti-thapa-10688355/)

## Tech Stack

Proofd utilizes [Heroku](https://www.heroku.com/) and [Netlify](https://www.netlify.com/) for deployment, and is built in full stack JavaScript with a [React.js](https://reactjs.org/) frontend, a [Node.js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/) backend, a [PostgreSQL](https://www.postgresql.org) database in production, and a [SQLite3](https://www.sqlite.org/index.html) database in development.

### Rationale

#### Frontend

[https://chainpoint-docusign.netlify.com/](https://chainpoint-docusign.netlify.com/)

- React

  - Blazing fast rendering with the virtual DOM
  - Robust developer tools for debugging
  - Component based structure maximizes reusablity and makes codebase more maintainable
  - JSX allows for code optimization, type safety and faster creation of templates
  - Unidirectional data flow increases app performance and makes debugging easier
  - API friendly library works seamlessly with and is extendable across numerous frameworks to leverage advanced UI development

- Redux

  - Global app store allows components to listen for change from one source of truth
  - Pure reducer functions make logic easier to test
  - Robust developer tools make it easy to find bugs
  - Strict organization makes code more understandable and easily maintainable

- Styled Components
  - Scopes styles to a component to avoid style leaks
  - Linters will show unused components so they can be removed
  - Source order independence eliminates the need to import files in a certain order
  - Compose new styles from existing components
  - Passing properties to the component allows for more flexibility

#### Backend

[https://chainpoint-docusign-server.herokuapp.com/](https://chainpoint-docusign-server.herokuapp.com/)

- Node.js

  - Utilizes Google's V8 JS engine which is lightening fast, highly performant, and more scalable
  - Event loop allows non-blocking I/O operations which enhances speed of code execution
  - Integrates seamlessly with microservices architecture
  - Fullstack JS allows JS developers to work on both client and server sides potentially increasing productivity and saving money for startups

- Express

  - Includes numerous routing features and separate handlers for HTTP methods
  - Serves static files such as images and CSS / JS files
  - Integrates seamlessly with many popular template engine and NPM module plugins

- PostgreSQL
  - Supports many data types
  - Strongly typed schemas leaves little room for errors
  - Superior query optimizer for more complex data models

## API

### Third Party API

- [DocuSign](https://developers.docusign.com/)

  - We pull in user documents via DocuSign's API to our database, flag them, and then filter them on the client-side based on five categories:
    - All Documents
    - Proofed Documents
    - Documents Pending Proof
    - Signed Documents Awaiting Proof
    - Unsigned Documents Awaiting Signatures

- [Chainpoint](https://chainpoint.org/)

  - When a user verifies they would like to proof their document, we send a hash of that data to Chainpoint, which is aggregrated with other hashes using a Merkle tree. The root of the tree is published in a Bitcoin transaction, which cryptographically links the given data to a block on the Bitcoin blockchain.

- [Stripe](https://stripe.com/docs/api)

  - Users can purchase the number of credits they want with a valid credit card, which is verified and charged via Stripe.

- [Auth0](https://auth0.com/docs/api/info)
  - Users can sign up / log in using a social media or enterprise account or their own email address. Auth0 handles authentication and authorization for more secure sign ups and log ins.

### API Endpoints

| Method | Endpoint                | Request               | Response                                             |
| ------ | ----------------------- | --------------------- | ---------------------------------------------------- |
| GET    | /users/profile          |                       | Object of logged in user.                            |
| GET    | /users/subscription     | email\*               | Object with subscription type and remaining credits. |
| PUT    | /users/image            | uploaded_picture\*    | Count of updated users.                              |
| GET    | /documents              | id\*                  | Single document object.                              |
| GET    | /envelopes/all          | user                  | Array of Envelopes                                   |
| GET    | /payment                |                       | Array of Invoice objects                             |
| GET    | /payment/:id            | id\*                  | Single Invoice Object                                |
| POST   | /payment                | userId, stripeCharges | Invoice                                              |
| GET    | /chainpoint/:id         | id\*                  | Object with document status                          |
| GET    | /chainpoint/:id/loading | id\*                  | Object with envelope status                          |
| GET    | /auth/logout            |                       | 200 on successful logout                             |

\* denotes required field.
