# Oink :pig_nose:

Anti-fitness app.

## Env variables

Create next files with credentials, URLs and ports of your desire.

**/apps/api/.env**

```
POSTGRES_URL=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWD=secretPasswd!5000
POSTGRES_DB=oink
POSTGRES_PORT=5432

PRISMA_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}
PRISMA_DATABASE_URL_WITH_SCHEMA=${PRISMA_DATABASE_URL}?schema=public
```

**/apps/web/.env**

```
API_URL=http://localhost:3001
```

## Develop

Build and run containers with:

```
npm run docker:up
```

On another terminal to start API and web app:

```
npm run dev
```
