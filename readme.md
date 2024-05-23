Carteira-Virtual is a personal Full Stack application that simulates a virtual wallet and was designed inspired by NG.CASH. It is possible to Login if you already have a user or register, it is possible to make transfers between valid users, it is also possible to see all transfers that the logged in user participated in.

<details>
<summary><strong>Technologies</strong></summary><br />

**Frontend:**
  - React 
  - Typescript
  - HTML CSS
  - Bootstrap
  - Responsividade
  - React Testing Library
  - Jest


**Backend:**
  - Node
  - Typescript
  - Express
  - Sequelize
  - Docker
  - Jsonwebtoken
  - Bcrypt

</details>

<details>
<summary><strong>How to run</strong></summary><br />

**Docker:**
  - Run the `docker-compose up` command to create your docker-compose.

**Database:**
  - It will be a Postgres docker container already configured in docker-compose through a service defined as `db`.
  - Has the role of providing data to the _backend_ service.
  - Run on port `5432`.
  
**Back-end:**
 - It will be a docker container in docker-compose through a service defined as `backend`.
 - When starting Docker-compose the backend will structure and populate the database with initial information defined by sequelize.
 - Run on port `3001`.

**Front-end:**
 - It will be a docker container in docker-compose through a service defined as `frontend`.
 - When starting Docker-compose, the frontend generates a terminal that starts your frontend application, you can access it via the route `http://localhost:3000/`
 - Run on port `3000`.

</details>

<details>
<summary><strong>API</strong></summary><br />

**`GET /`**
 - Use the `GET /` endpoint to test the api, if successful it returns:
```json
{
  "ok": "Backend working"
}
```

**`POST /register`**
 - You must fill in the body with a valid `username` and `password`, example:
 ```json
{
  "username": "Carlos",
  "password": "Password1",
}
```
 - If successful, returns the information of the created user:
```json
{
  "id": 4,
  "username": "<Carlos>",
  "password": "$2a$10$ILdKzLspVXavt9GCrtqf8urcITmpFgPjdgJX.cM9zKKLk.JTX/Rk.",
  "accountId": 4
}
```

**`POST /login`**
 - You must fill in the body with a valid `username` and `password`, example:
 ```json
{
  "username": "Carlos",
  "password": "Password1",
}
```
 - If successful, it returns a token that lasts 24 hours and will be used in future requests:
```json
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQ2FybG9zIn0sImlhdCI6MTY2ODgxMjg4NywiZXhwIjoxNjY4ODk5Mjg3fQ.MQsfKi91O-1I1mwh9GZMXENGkCTmcvck9tF99xVD8l0"
```

**`GET /balance`**
 - You must fill in the `Authorization` Header with the token received when logging in.
 - If successful, returns the user name and account balance:
```json
{
  "username": "Carlos",
  "balance": 100000000,
}
```

**`POST /transaction`**
 - You must fill in the `Authorization` Header with the token received when logging in.
 - You must fill in the body with a valid `value` and `username`, example:
 ```json
{
  "value": 1000,
  "username": "Rosa"
}
```
 - If successful, it returns the information about the transaction carried out:
```json
  "successful Transaction of <valor> from <who sent> to <who received>"
```

**`GET /transactions`**
 - You must fill in the `Authorization` Header with the token received when logging in.
 - If successful, returns information on all transactions that the user participated in (sending or receiving):
```json
[
  {
     "id": 1,
     "debitedAccountId": 3,
     "creditedAccountId": 2,
     "value": 1000000,
     "createdAt": "2022-11-17T15:48:08.202Z"
  },
  {
     "id": 2,
     "debitedAccountId": 3,
     "creditedAccountId": 1,
     "value": 1000000,
     "createdAt": "2022-11-17T15:48:18.184Z"
  }
]
```

</details>

<details>
<summary><strong>Tests</strong></summary><br />

**Frontend:**
  - To run the Frontend tests, go to the `./Frontend` folder, open a terminal and run the `npm run test` command.
  - The tests were created with the React Testing Library and Jest

**Backend (EM construção):**
  - To run the Backend tests, go to the `./Backend` folder, open a terminal and run the `npm run test` command.
</details>
