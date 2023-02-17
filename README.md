# Oink :pig_nose:

Anti-fitness app.

## Env variables

Create next files with credentials, URLs and ports of your desire.

**/packages/database/.env**

```
POSTGRES_URL=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWD=secretPasswd!5000
POSTGRES_DB=oink
POSTGRES_PORT=5432

PRISMA_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWD}@${POSTGRES_URL}:${POSTGRES_PORT}/${POSTGRES_DB}
PRISMA_DATABASE_URL_WITH_SCHEMA=${PRISMA_DATABASE_URL}?schema=public
```

**/apps/api/.env**

```
AUTH0_ISSUER_URL=issuer_url
AUTH0_AUDIENCE=audience_identifier
```

**/apps/web/.env**

```
NEXT_PUBLIC_API_URL=http://localhost:3001

NEXT_PUBLIC_AUTH0_ISSUER_URL=auth0_issuer_url
NEXT_PUBLIC_AUTH0_CLIENT_ID=auth0_client_id
NEXT_PUBLIC_AUTH0_RETURN_URL="http://localhost:3000"

AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL='https://superman.us.auth0.com'
AUTH0_CLIENT_ID='RANDOM_HASH'
AUTH0_CLIENT_SECRET='RANDOM_HASH'
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
