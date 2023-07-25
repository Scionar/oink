#!/bin/sh

AUTH_API_PRIVATE_KEY_PATH=apps/auth-api/private.pem
AUTH_API_PUBLIC_KEY_PATH=apps/auth-api/public.pem
CONTENT_API_PUBLIC_KEY_PATH=apps/content-api/public.pem

openssl genrsa -out "${AUTH_API_PRIVATE_KEY_PATH}" 2048
openssl rsa -in "${AUTH_API_PRIVATE_KEY_PATH}" -pubout -outform PEM -out "${AUTH_API_PUBLIC_KEY_PATH}"

cp "${AUTH_API_PUBLIC_KEY_PATH}" "${CONTENT_API_PUBLIC_KEY_PATH}"


