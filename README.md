# vevIT-v4


# Setup

## clone the repo

```sh

git clone 
cd vevIT-v4

# Install dependencies
npm install
```

## Set up database

```sh
docker run --name vevit-v4 -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_USER=myuser -e POSTGRES_DB=mydb -p 5432:5432 -d postgres


```

```sh

# This command generates the migration file with the necessary SQL to create the tables in your PostgreSQL database.
npx prisma migrate dev --name vevit4

# This command will apply the generated migration to your database:
npx prisma migrate dev
```

# Usage 
```sh


# Start the database
docker start vevit-v4

# Stop the database
docker stop vevit-v4


```


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

