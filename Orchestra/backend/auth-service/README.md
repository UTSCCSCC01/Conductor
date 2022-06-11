# auth microservice

**auth-service** is a backend microservice whoses main job is to issue or revoke firebase authentication tokens. These tokens are used by other microservices to authorize actions by the

## Installation standalone

Ensure you pass in the enviromental variables for the following, either via .env or through docker.
1. FIREBASE_API_KEY= API_KEY
1. FIREBASE_AUTH_ENDPOINT= https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=

##### Commands
#
#
```sh
cd auth-service
npm i
npm run start
```

## Libraries
1. axios
2. cors
3. express
4. firebase-admin

## API usage

## Route: /auth
This is a wrapper route that validates the user entered values and sends the payload to a firebase rest api. The reason for this is to
hide the API_KEY from the client as its required for obtaining a token.

The api results returned can be found here. https://cloud.google.com/identity-platform/docs/use-rest-api#section-create-email-password