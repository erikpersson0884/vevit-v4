# vevIT-v4


# Server

## Types

### vev
```typescript
{
    id: number
    challangerId: number
    challangedId: number
    winnerId: number
    time: date
    bookedTime: date
}
```

### users
```typescript
{
    id: number
    name: string
    nick: string
    createdAt: date
}
```


### 

## Api Endpoints

### vev

```bash
GET /api/vev/:id
```

Response:
```json
{
    data
}
```

```bash
POST /api/vev/
```

Parameters:
```json
{
    challengedId
}
```


Response:


```bash
DELETE /api/vev/:id
```

### Users 

get all user ids
```bash
GET /api/users
```

### User

get user info
```bash
GET /api/user/:id
```

add a new user
```bash
POST /api/user
```

Parameters:
```json
{
    username,
    password
}
```

Response:
```json
{
    userId: string // id of the newly created user
}
```




update a user
```bash
PATCH /api/user:id
```

Parameters:
```json
{
    name: string,
    nick: string
}
```



delete a user
```bash
DELETE /api/user:id
```

