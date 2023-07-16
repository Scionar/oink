# Oink :pig_nose:

Anti-fitness app.

## Env variables

Create next files with credentials, URLs and ports of your desire.

**/packages/database/.env**

```
POSTGRES_URL=""
POSTGRES_USER=""
POSTGRES_PASSWD=""
POSTGRES_DB=""
POSTGRES_PORT=""

PRISMA_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}
PRISMA_DATABASE_URL_WITH_SCHEMA=${PRISMA_DATABASE_URL}?schema=public
```

**/packages/database-orm/.env**

```
AUTHDB_URL=""
AUTHDB_USER=""
AUTHDB_PASSWD=""
AUTHDB_DB=""
AUTHDB_PORT=""
```

**/apps/api/.env**

```
POSTGRES_URL=""
POSTGRES_USER=""
POSTGRES_PASSWD=""
POSTGRES_DB=""
POSTGRES_PORT=""

PRISMA_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}
PRISMA_DATABASE_URL_WITH_SCHEMA=${PRISMA_DATABASE_URL}?schema=public

AUTH0_ISSUER_URL=""
AUTH0_AUDIENCE=""

PORT=""
```

**/apps/web/.env**

```
NEXT_PUBLIC_API_URL=""
NEXT_PUBLIC_AUTH0_ISSUER_URL=""
NEXT_PUBLIC_AUTH0_CLIENT_ID=""
NEXT_PUBLIC_AUTH0_RETURN_URL=""
```

## Develop

For running database container, /apps/api/.env variables need to be set. Build and run containers with:

```
npm run docker:up
```

On another terminal to start API and web app:

```
npm run dev
```

Default ports:

| App      | Port |
|----------|------|
| web      | 3000 |
| api      | 3001 |
| auth-web | 3003 |
| auth     | 3002 |

## Initialize databases

Environment variables are set under database-orm package. Create database manually into Postgres instance. Then run command:

```
cd packages/database-orm
npm run migration:run
```
