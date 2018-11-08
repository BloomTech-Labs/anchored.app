# NotaryChain (app name is a work in progress)

## A Lambda School Production.

### Backend README for the Lambda Labs 8 - Chainpoint-DocuSign Project.

## API

| Method | Endpoint                         | Request                         | Response                      |
| ------ | -------------------------------- | ------------------------------- | ----------------------------- |
| GET    | /users                           |                                 | Array of user Objects.        |
| GET    | /users/:email                    | email\*                         | Single user Object.           |
| GET    | /users/id/:id                    | id\*                            | Single user Object.           |
| POST   | /users NOT CURRENTLY WORKING     | email\*, first_name, last_name, | ID of newly created user.     |
| PUT    | /users/:id                       | id\*                            | Count of updated users.       |
| DELETE | /users/:id                       | id\*                            | Count of removed users.       |
| GET    | /documents                       |                                 | Array of document Objects.    |
| GET    | /documents/:userId               | userId\*                        | Array of document Objects.    |
| GET    | /documents/id/:id                | id\*                            | A single document Object.     |
| POST   | /documents                       | document id, document body      | ID of newly created document. |
| POST   | /documents/:document_id/:user_id | document_id, user_id            | ID of new user document.      |
| PUT    | /documents/:id                   | id\*                            | Count of updated documents.   |
| DELETE | /documents/:id                   | id\*                            | Count of removed documents.   |

\* - indicates required field
