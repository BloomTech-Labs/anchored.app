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

### Backend

[https://chainpoint-docusign-server.herokuapp.com/](https://chainpoint-docusign-server.herokuapp.com/)

Our backend consists of Node.js, Express.js, and utilizes the Chainpoint API for connecting to the blockchain, as well as Stripe for payment processing.

### API Endpoints

| Method | Endpoint | Request | Response |
| ------ | -------- | ------- | -------- |
|        |          |         |          |
|        |          |         |          |
|        |          |         |          |
|        |          |         |          |
|        |          |         |          |
|        |          |         |          |
