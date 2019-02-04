# Content Commons Adminstation Server

Serves the adminstative backend of Content Commons (Publisher)

## Getting Started

### Prerequisites

Clone repository `git clone git@github.com:IIP-Design/content-commons-server.git`

Install the following if not already installed

- [Prisma](https://www.prisma.io/) cli

  ```
  npm install -g prisma
  ```

- [Docker](https://www.docker.com/products/docker-desktop)

### Installation

- Run `docker-compose up -d`
- Create an .env file and add the following variables (use .env.tmpl as a guide)

  - **NODE_ENV** : environment, i.e. development, staging, production
  - **FRONTEND_URL** : url to the React app client
  - **PRISMA_ENDPOINT** : url to the Prisma db
  - **PRISMA_SECRET:** : secret that secures connection between prisma services and db
  - **GOOGLE_CLIENT_ID:** : google client id used for Google authentication
  - **PUBLISHER_APP_SECRET** : secret to sign authentication token

  Mail configuration for sending emails via nodemailer. For testing purposes, you can use [mailtrap](https://mailtrap.io/). The config options will be available after you create an account

  - **MAIL_PORT**
  - **MAIL_USER**
  - **MAIL_PASS**
  - **MAIL_RETURN_ADDRESS**

  Mail configuration for sending emails via AWS SES.
  - **AWS_REGION** : us-east-1
  - **AWS_ACCESS_KEY_ID** : AWS IAM programmatic access key with full SES permissions
  - **AWS_SECRET_ACCESS_KEY** : Secret key corresponding to the above access key

- Deploy prisma schema, install dependencies and start development server

```
 prisma deploy
 npm install
 npm run dev
```

GraphQL Playground should now be accessible at:

- Public api endpoint (based on application schema) : http://localhost:4000/graphql
- Prisma database endpoint : http://localhost:4466

**NOTE:**
Prisma database endpoint requires authorization. To add authorization to the playground:

- Generate a token : `prisma token`
- Add authorization header to the playground via hte Headers tab

  ![Add Headers to playground](docs/headers.jpg)

## Running Tests

[TODO]

## Built With

- [Express](https://expressjs.com/)
- [Apollo Server v2](https://www.apollographql.com/docs/apollo-server/)
- [Prisma](https://www.prisma.io/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/IIP-Design/content-commons-server/tags).


Bye
