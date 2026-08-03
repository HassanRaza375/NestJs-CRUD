<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prisma + PostgreSQL setup (Prisma ORM v7)

NestJS → PrismaService → Prisma Client → PostgreSQL

Prisma v7 changed a few things from older guides: it requires a driver adapter for SQL
databases, no longer auto-loads `.env`, and its client generator defaults to ESM output.
Follow these steps in order to avoid a client that silently fails to start.

### 1. Install Prisma, the client, the Postgres driver adapter, and dotenv

```bash
npm install --save-dev prisma
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

### 2. Initialize Prisma

```bash
npx prisma init --datasource-provider postgresql
```

This creates `prisma/schema.prisma`, `prisma.config.ts`, and a starter `.env`.

### 3. Configure the generator for a CommonJS (Nest) project

In `prisma/schema.prisma`, the `prisma-client` generator defaults to ESM output
(`import.meta.url`), which crashes silently when `require()`-d from a CommonJS Nest build.
Force CommonJS output explicitly:

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}
```

### 4. Configure the PostgreSQL connection

In `.env`:

```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nest_practice?schema=public"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password. This maps to:

```
username: postgres
password: YOUR_PASSWORD
host:     localhost
port:     5432
database: nest_practice
```

Prisma v7 does not auto-load `.env` files anymore, so load it explicitly in
`prisma.config.ts`:

```typescript
import 'dotenv/config'; // must be the first import
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL },
});
```

`prisma.config.ts` only covers the Prisma CLI. Your app's own entry point (`src/main.ts`)
needs the same `import 'dotenv/config';` as its **first line**, or `DATABASE_URL` will be
`undefined` at runtime and the app will fail to connect (or, depending on the bug, fail to
boot at all with no error printed).

### 5. Define your first model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  firstName String?
  lastName  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 6. Create the migration and generate the client

```bash
npx prisma migrate dev --name init
```

(`prisma generate` runs automatically after a migration; run it manually after any later
schema change with `npx prisma generate`.)

### 7. Wire up PrismaService with the driver adapter

SQL providers require an explicit driver adapter in v7 — `new PrismaClient()` alone will not
connect:

```typescript
// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({ adapter });
  }
}
```

### 8. Inspect your data

```bash
npx prisma studio
```

### Checklist if the API refuses to connect after setup

- `moduleFormat = "cjs"` is set in the generator block (unless the whole project is ESM).
- `import 'dotenv/config';` is the first line of `src/main.ts`, not just `prisma.config.ts`.
- `dotenv` is a direct dependency in `package.json`, not just transitive.
- PostgreSQL is actually running and listening on the port in `DATABASE_URL`.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).