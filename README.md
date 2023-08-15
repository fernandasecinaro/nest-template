# Table of Content

- [Description](#description)
- [Template added features](#template-added-features)
- [Steps to run the app](#steps-to-run-the-app)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Run docker](#run-docker)
  - [Apply database migrations](#apply-database-migrations)
  - [Run the app](#run-the-app)
  - [Test](#test)
- [Guide to do a new controller or endpoint](#guide-to-do-a-new-controller-or-endpoint)
- [CRUD generator](#crud-generator)
- [Prisma](#prisma)
  - [Connection string](#connection-string)
  - [Development](#development)
    - [Create migration](#create-migration)
    - [Update Prisma Client](#update-prisma-client)
  - [Production](#production)
    - [Steps to run migrations on production environment](#steps-to-run-migrations-on-production-environment)
  - [Prisma Studio](#prisma-studio)
- [Swagger](#swagger)
  - [Open documentation](#open-documentation)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript template repository.

## Template added features

- Environment variables (using [Nest config](https://docs.nestjs.com/techniques/configuration#configuration))
- Validation pipes (Using [Nest Validation](https://docs.nestjs.com/techniques/validation))
- Prisma ORM and nest-js prisma library
- Authentication (Using hashing with salting)
- [Authorization](https://docs.nestjs.com/security/authorization#authorization) (RBAC Implementation)
- Swagger documentation (Using [Swagger Plugin](https://docs.nestjs.com/openapi/cli-plugin#cli-plugin))
- [Versioning](https://docs.nestjs.com/techniques/versioning#usage) and [Global Prefix](https://docs.nestjs.com/faq/global-prefix)
- Users entity example (src/users: including module, controller, service, entity and DTOs)
- Logger middleware (src/middlewares/logger.middleware.ts)
- Provided example of throwing built-in exception (src/app.controller.ts)

## Steps to run the app

### Environment Variables

Create and complete .env file with proper variable values

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

## Guide to do a new controller or endpoint

**On Controller**

- If wished, add versioning on Controller decorator
- Add @ApiTags decorator to controller (to group endpoints on Swagger)

**On Endpoint**

- If wished, add @Version decorator on endpoint
- Add @HttpCode decorator to endpoint if response’s status code is different to 200 OK (for Swagger)
- If needed, annotate a DTO or entity property with @ApiHideProperty to exclude it on Swagger
- Add decorators of class-validator to DTOs’ properties, eg: @MinLength(8), to enforce validation rules for all incoming client payloads
- Add response type to endpoint (so Swagger could infer the response type)
- In case the endpoint needs authentication use @UseGuards(AuthGuard) and @ApiBearerAuth() for the endpoint
- If authorization needed, use @Roles decorator to authorize access to an endpoint only to users with a determined role. Eg. @Roles($Enums.Role.admin)

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

### Connection string

See the [documentation](https://pris.ly/d/connection-strings) to find the proper connection string

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

#### Steps to run migrations on production environment

- Connect to an EC2 instance of the Beanstalk application
- Run `sudo docker ps`
- Copy the ID of the container that runs the app (There should be only one container running)
- Run the command `sudo docker exec -it <ContainerId> /bin/sh` to connect to the container shell
- Run `npx prisma migrate deploy`

### Prisma Studio

Run `yarn prisma` to open Prisma Studio UI.

## Swagger

### Open documentation

To open Swagger documentation go to http://localhost:{PORT}/api
