# Nest Template

- [Description](#description)
- [Template added features](#template-added-features)
- [Steps to run the app](#steps-to-run-the-app)
  - [Installation](#installation)
  - [Run docker](#run-docker)
  - [Apply database migrations](#apply-database-migrations)
  - [Run the app](#run-the-app)
  - [Test](#test)
- [CRUD generator](#crud-generator)
- [Prisma](#prisma)
  - [Development](#development)
    - [Create migration](#create-migration)
    - [Update Prisma Client](#update-prisma-client)
  - [Production](#production)
  - [Prisma Studio](#prisma-studio)
    - [Steps to run migrations on production environment](#steps-to-run-migrations-on-production-environment)
- [Swagger](#swagger)
  - [Open documentation](#open-documentation)
  - [Group endpoints](#group-endpoints)
  - [Update Swagger response types](#update-swagger-response-types)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript template repository.

## Template added features

- Environment variables (using [Nest config](https://docs.nestjs.com/techniques/configuration#configuration))
- Validation pipes (Using [Nest Validation](https://docs.nestjs.com/techniques/validation))
- Prisma ORM and nest-js prisma library
- Authentication (Using hashing with salting)
- [Authorization](https://docs.nestjs.com/security/authorization#authorization) (RBAC Implementation)
- Swagger documentation using [Swagger Plugin](https://docs.nestjs.com/openapi/cli-plugin#cli-plugin)
- [Versioning](https://docs.nestjs.com/techniques/versioning#usage) and [Global Prefix](https://docs.nestjs.com/faq/global-prefix)
- Users entity example (src/users: including module, controller, service, entity and DTOs)
- Logger middleware (src/middlewares/logger.middleware.ts)
- Provided example of throwing built-in exception (src/app.controller.ts)

## Steps to run the app

### Installation

```bash
$ yarn install
```

### Run docker

```bash
$ yarn d:dev
```

### Apply database migrations

```bash
$ npx prisma migrate dev
```

### Run the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## CRUD generator

Following this link: [Nest CRUD generator](https://docs.nestjs.com/recipes/crud-generator)

To create a new resource, simply run the following command in the root directory of your project:

```bash
$ nest g resource
```

The console will then ask you for the resource's name and the transport layer (choose REST API).

This generates a folder inside /src with the following things of the resource:

- module (it defines the controller and the provider automatically)
- controller (with post, get, patch and delete operations)
- service
- entity class
- DTO classes (for creating and updating operations)
- testing files (for controller and service)

It will also import the resource module inside the app module (src/app.module.ts)

If wished, you can use --no-spec flag to avoid generating testing files. For example:

```bash
$ nest g resource users --no-spec
```

Warning: Take into account that the CRUD generated does not have endpoint validations or versioning added

## Prisma

### Development

#### Create migration

Once you have changed the Prisma model (inside prisma/schema.prisma), you can generate a migration file using the following command:

```bash
$ npx prisma migrate dev --name [name]
```

#### Update Prisma Client

Prisma Client JS is a type-safe database client auto-generated based on the data model.
You need to run this command after every change to your Prisma models to update your generated Prisma Client:

```bash
$ npx prisma generate
```

### Production

If you are happy with your database changes you want to deploy those changes to your production database. Use prisma migrate deploy to apply all pending migrations, can also be used in CI/CD pipelines as it works without prompts.

```bash
$ npx prisma migrate deploy
```

### Prisma Studio

Run `yarn prisma` to open Prisma Studio UI.

#### Steps to run migrations on production environment

- Connect to an EC2 instance of the Beanstalk application
- Run `sudo docker ps`
- Copy the ID of the container that runs the app (There should be only one container running)
- Run the command `sudo docker exec -it <ContainerId> /bin/sh` to connect to the container shell
- Run `npx prisma migrate deploy`

## Swagger

### Open documentation

To open Swagger documentation go to http://localhost:{PORT}/api

### Group endpoints

Add an @ApiTags decorator to each Controller class, to group all the articles endpoints together in Swagger

Look this [link](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#group-endpoints-together-in-swagger) to know more
