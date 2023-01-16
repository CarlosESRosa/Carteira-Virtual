A Carteira-Virtual é uma aplicação Full Stack pessoal que simula uma carteira virtual e foi inspirada na NG.CASH. Nela é possível fazer Login caso já tenha um usuário ou se registrar, é possível efetuar transferências entre usuários válidos, também é possível ver todas as transferências que o usuário logado participou. 

<details>
<summary><strong>Como rodar</strong></summary><br />

**Docker:**
  - Rode o comando `docker-compose up` para criar seu docker-compose.

**Banco de dados:**
  - Será um container docker Postgres já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Roda na pota `5432`.
  
**Back-end:**
 - Será um container docker no docker-compose através de um serviço definido como `backend`.
 - Ao iniciar o Docker-compose o backend irá estruturar e popular o banco de dados com informações iniciais definidas pelo sequelize.
 - Roda na porta `3001`.

**Front-end:**
 - Será um container docker no docker-compose através de um serviço definido como `frontend`.
 - Ao iniciar o Docker-compose o frontend gera um terminal que já inicia sua aplicação frontend, você pode acessa-la na rota `http://localhost:3000/`
 - Roda na porta `3000`.

</details>

<details>
<summary><strong>API</strong></summary><br />

**`GET /`**
 - Use o endpoint `GET /` para testar a api, em caso de sucesso retorna:
```json
{
  "ok": "Backend working"
}
```

**`POST /register`**
 - Você deve preencher o body com um `username` e um `password` validos, exemplo:
 ```json
{
  "username": "Carlos",
  "password": "Password1",
}
```
 - Em caso de sucesso, retorna as informações do usuário criado:
```json
{
  "id": 4,
  "username": "<Carlos>",
  "password": "$2a$10$ILdKzLspVXavt9GCrtqf8urcITmpFgPjdgJX.cM9zKKLk.JTX/Rk.",
  "accountId": 4
}
```

**`POST /login`**
 - Você deve preencher o body com um `username` e um `password` validos, exemplo:
 ```json
{
  "username": "Carlos",
  "password": "Password1",
}
```
 - Em caso de sucesso, retorna um token que tem duração de 24h e será utilizado em requisições futuras:
```json
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQ2FybG9zIn0sImlhdCI6MTY2ODgxMjg4NywiZXhwIjoxNjY4ODk5Mjg3fQ.MQsfKi91O-1I1mwh9GZMXENGkCTmcvck9tF99xVD8l0"
```

**`GET /balance`**
 - Você deve preencher o Header `Authorization` com o token recebido ao efetuar Login.
 - Em caso de sucesso, retorna o nome do usuário e o balance da conta:
```json
{
  "username": "Carlos",
  "balance": 100000000,
}
```

**`POST /transaction`**
 - Você deve preencher o Header `Authorization` com o token recebido ao efetuar Login.
 - Você deve preencher o body com um `value` e um `username` validos, exemplo:
 ```json
{
  "value": 1000,
  "username": "Rosa"
}
```
 - Em caso de sucesso, retorna as informações da transação realizada:
```json
  "successful Transaction of <valor> from <quem enviou> to <quem recebeu>"
```

**`GET /transactions`**
 - Você deve preencher o Header `Authorization` com o token recebido ao efetuar Login.
 - Em caso de sucesso, retorna informações de todas as transações que o usuário participou (enviando ou recebendo):
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
<summary><strong>Testes</strong></summary><br />

**Frontend:**
  - Para rodar os testes do Frontend entre na pasta `./Frontend`, abra um terminal e rode o comando `npm run test`.
  - Os testes foram criados com a React Testing Library e Jest

**Backend (EM construção):**
  - Para rodar os testes do Backend entre na pasta `./Backend`, abra um terminal e rode o comando `npm run test`.
</details>
