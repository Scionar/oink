# Oink :pig_nose:

Anti-fitness app.

## Develop

For running database container, /apps/content-api/.env variables need to be set. Build and run containers with:

```
npm run docker:up
```

On another terminal to start API and web app:

```
npm run dev
```

Default ports:

| App         | Port |
| ----------- | ---- |
| web         | 3000 |
| content-api | 3001 |
| auth-web    | 3003 |
| auth-api    | 3002 |

## Generate keys for Auth API

Auth API needs private & public keys to be generated. Keys are used to generate and verify access tokens. You need to have OpenSSL installed.

```
npm run keys:generate-private
npm run keys:generate-public
```

## Env variables

Create next files with credentials, URLs and ports of your desire.

**/apps/web/.env**

```
NEXT_PUBLIC_API_URL=""
NEXT_PUBLIC_AUTH0_ISSUER_URL=""
NEXT_PUBLIC_AUTH0_CLIENT_ID=""
NEXT_PUBLIC_AUTH0_RETURN_URL=""
```

**/apps/content-api/.env**

```
CONTENTDB_URL=""
CONTENTDB_PORT=""
CONTENTDB_USER=""
CONTENTDB_PASSWD=""
CONTENTDB_DB=""

AUTH0_ISSUER_URL=""
AUTH0_AUDIENCE=""
```

**/apps/auth-api/.env**

```
AUTHDB_URL=""
AUTHDB_PORT=""
AUTHDB_USER=""
AUTHDB_PASSWD=""
AUTHDB_DB=""
```
