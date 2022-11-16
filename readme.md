# REST API

### Request `GET /`

### Response
    {
	    "ok": "Backend working"
    }

### Request `POST /register`

    Body: JSON
    {
        "username": "<yourUsername>",
        "password": "<yourPassword>"
    }

### Response
    {
        "id": <id>,
        "username": "<yourUsername>",
        "password": "<HashPassword>",
        "accountId": <accountId>
    }

### Request `POST /login`

    Body: JSON
    {
        "username": "<yourUsername>",
        "password": "<yourPassword>"
    }

### Response
    {
        "token": "<new Token>";
    }

### Request `GET /balance`

    Headers:
    Authorization: "<valid Token>"

### Response
    {
        "balance": <user balance>;
    }

### Request `POST /transaction`

    Headers:
    Authorization: "<valid Token>"

    Body: JSON
    {
        "value": <Money value>,
        "username": "<Receiver Username>"
    }

### Response
    "successful Transaction of <Money> from <Sender> to <Receiver>"

### Request `GET /transactions`

    Headers:
    Authorization: "<valid Token>"

### Response
    [
        {
            "id": <id>,
            "debitedAccountId": <senderId>,
            "creditedAccountId": <receiverId>,
            "value": <Money value>,
            "createdAt": <"2022-11-16T17:18:04.514Z">  // created date 
        }
    ]

### Request `GET /filtredTransactions`

    Headers:
    Authorization: "<valid Token>"

### Response
    [
        {
            "id": <id>,
            "debitedAccountId": <senderId>,
            "creditedAccountId": <receiverId>,
            "value": <Money value>,
            "createdAt": <"2022-11-16T17:18:04.514Z">  // created date 
        }
    ]
    