REST API /w Node.js, Express, TypeScript, Drizzle, Postgres, Valibot

TODO: Postman Setup

/_ PART 1 _/

```
pnpm init
```

```
pnpm add typescript --save-dev
```

```
pnpm tsc --init
```

<!-- clear comments in tsconfig.json -->

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

```
mkdir src
```

|| Setup Node - Express Server

```
pnpm add express
pnpm add @types/node @types/express --save-dev
```

```ts
// server.ts
```

```ts
// index.ts
```

```json
// package.json
"dev": "node --watch --env-file=.env -r tsconfig-paths/register -r ts-node/register src/index.ts",
```

|| Test /healthcheck

|| Setup Neon.db / Postgres / Drizzle

```
touch .env
```

```
DATABASE_URL=
```

In neon.tech create new project, new role, new database `mangadb`

|| Setup drizzle

```
pnpm add drizzle-orm postgres
pnpm add drizzle-kit --save-dev
```

|| start drizzle.config.ts

|| create env-config in src/lib

|| simple valibot schema

```
pnpm add valibot
```

|| continue drizzle.config.ts
|| create src/drizzle/schema
|| create src/drizzle/migrate

```
"db:generate": drizzle-kit generate
"db:migrate": "node --env-file=.env -r tsconfig-paths/register -r ts-node/register src/drizzle/migrate.ts"
```

**resources/users**

-- users.controllers
-- users.routes
-- users.service

morgan middleware

```
pnpm add morgan
pnpm add @types/morgan --save-dev
```

-- create full rest for users

-- hash password

```
pnpm argon 2
```

```
git init
.gitignore
```

```
build and test
```

> > PART 2 < <

logger (winston)
validator with valibot
