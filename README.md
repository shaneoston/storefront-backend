# Storefront backend
This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).
## Libraries used
The application uses the following libraries: 
* Runtime: Node.js (JavaScript)
* Web application framework: Express
* Language: TypeScript 
* Database: Postgres
* Testing: Jasmine and Supertest

## Installation Instructions
### Dev mode
To install the app's dependencies and use the app in dev mode, run the following: 

`yarn && yarn create-dev-db` 

To run the app in dev mode execute `yarn start`.
### Test mode
To install the app's dependencies and use the app in test mode, run the following:

`yarn && yarn create-test-db`

To run the tests execute `yarn test`.

### Ports
The application runs on port `3000` with database on `5432`.