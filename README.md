# <span style="color:#6699FF">Cycling together API</span>

[![npm](./doc/static/badges/npm.svg)](https://www.npmjs.com) ![javascript](./doc/static/badges/javascript.svg) [![node](./doc/static/badges/node.svg)](https://github.com/nodejs/node) [![jest](./doc/static/badges/jest_1.svg)](https://jestjs.io) [![github](./doc/static/badges/github.svg)](https://github.com) [![openapi](./doc/static/badges/openapis-ar21.svg)](https://www.openapis.org) [![express](./doc/static/badges/expressjs-ar21.svg)](https://expressjs.com)

<!--[![Build Status](https://avatars3.githubusercontent.com/u/16343502?v=2&s=70)](https://github.com/OAI)-->

---

## <span style="color:#3893cb">Introduction</span>

In the scenario where we would own a store, our business is to actually have an API where you iterate over the bycicles your store has. Considering that, imagine that you have:

- Bycicles
- Stores attached to your store

You can be attached to other stores, that stores give you a bunch of bycicles to rent them, sell them or whatever.

This API is about that, iterating over the bycicles, making some CRUD and applying filters to get the kind of bycicle that the user wants, and then you can see which stores are afiliated with you and even afiliate with more stores, you can also make reservations of bikes.

---

## <span style="color:#3893cb">Get started</span>

To start running the project, make sure to do these steps:

- Install all the dependencies:

  - <span style="color:yellow">npm install</span> <!-- This should install dependencies and devDependencies -->

- If you want to use Docker to set up your database:

  - <span style="color:yellow">npm run db:start</span>

Creating the database container will create a new directory that will store all the data that you will put into the database.

- Configure the environments for the database configuration

That environment files must be inside the directory "./app/src/config", there's a **configuration-example.env** that you can use in order to help you configure correctly.

**I recommend to change the name of configuration-example.env to prod.env**

- <span style="color:#66ff66">NODE_ENV=prod</span>

  - The node environment, this with the DB parameter will determine which database are you going to operate

<br>

- <span style="color:#66ff66">HOST=localhost</span>

  - The hostname

<br>

- <span style="color:#66ff66">DBUSER=postgres</span>

  - The database user, if you use the docker-compose.yaml you must specificate the value of the "POSTGRES_USER"

<br>

- <span style="color:#66ff66">PASSWORD=postgres</span>

  - The database password, if you use the docker-compose.yaml you must specificate the value of the "POSTGRES_PASSWORD"

<br>

- <span style="color:#66ff66">PORT=5432</span>

  - Port by default that postgres uses

<br>

- <span style="color:#66ff66">DB=cycling_together</span>

  - The name of the database you are going to operate with

<br>

- <span style="color:#66ff66">DIALECT=postgres</span>

  - The dialect you are going to use in Sequelize, basically to know which driver the ORM will need.

<br>

- <span style="color:#66ff66">LOGGING=true</span>
  - Set true if you want to see the database operations on the console.

There are three types of .env files:

- **test**: Used just for testing, is not actually required if you don't want to do any tests.
- **dev**: Used to develope the app
- **prod**: For deployment use

If you don't want to make any development, you can just change the name of the configuration-example.env file to prod.file. **Consider that if you want to put different names to the env files, you will have to change the "cross-env NODE_ENV=xx" in the package.json** (see FAQs).

- Before running, you will have to seed the database and create the apropiate tables, there are different commands for this, that depends on which .env will the project use to know which database will connect, if you changed the example .env file to "prod.env", you can use:

  npm run seed:prod

- And finally:

  <span style="color:yellow">npm run start</span>

---

## <span style="color:#3893cb">Technologies</span>

| Characteristics    | Technologies     |
| ------------------ | ---------------- |
| Languages          | JavaScript       |
| Framework          | Express          |
| Testing frameworks | Jest & Supertest |
| ORM                | Sequelize        |
| Database           | PostgreSQL       |
| Development rulers | eslint           |
| Documentation      | OpenAPI          |

---

## <span style="color:#3893cb">Database scheme</span>

![scheme](./doc/static/scheme.png)

---

## <span style="color:#3893cb">Development methodology</span>

I've been using an incremental methodology for the development, I've been writing all the code just by myself, so the way I actually did was to push changes to the development branch and then merge them to the main branch, to make the merge I was asking myself if it was completely functional.

- My first merge was when I acomplished models, routers and controllers and leaving the database for the last, just working with mocks.

- Then the following merge was much more complete, I added more routes to the existing routers and implemented a database with Docker.

- For last, I added OpenAPI to document all the endpoints in an easy and very graphic way.

---

## <span style="color:#3893cb">FAQs</span>

<span style="color:#fafa00">How can I create a .env file with a different name?</span>

Well, imagine that you want to write a .env file called "production.env", you will need to change a few things:

In order to know why do you have to do this, is because in the **dbconfig.js** the environment variables are resolved with the name that you set up with the NODE_ENV parameter on the package json:

```js
// dbconfig.js

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
```

- So first of all, create or change the file name to "production.env"
- Then, change the script in the package json, change NODE_ENV=prod to NODE_ENV=production

```json
// package.json

"scripts": {
    "test": "cross-env NODE_ENV=test npm run seed:test && jest --detectOpenHandles",
    "test:models": "jest ./app/test/models",
    "test:coverage": "cross-env NODE_ENV=test npm run seed:test && jest --detectOpenHandles --coverage",
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www",
    "start": "cross-env NODE_ENV=production node ./bin/www", // CHANGE HERE
    "db:start": "docker compose up -d",
    "db:stop": "docker compose down",
    "seed:test": "cross-env NODE_ENV=test node ./app/src/db/seeders/dbSeeder.js",
    "seed:dev": "cross-env NODE_ENV=dev node ./app/src/db/seeders/dbSeeder.js",
    "seed:prod": "cross-env NODE_ENV=production node ./app/src/db/seeders/dbSeeder.js", // AND HERE
    "lint": "./node_modules/.bin/eslint ./",
    "lint:fix": "./node_modules/.bin/eslint ./ --fix",
    "precommit": "npm run lint:fix && npm run test"
  }
```

<span style="color:#fafa00">What are the scripts that start with "seed"?</span>

These are actually seeders! These are used if you want to have actual data in the database, what they do is to connect to the database (configured in the env files), create the proper tables and insert data.

There are three of them because there are three diferent databases:

- cycling_together_test: Used when tests are running.
- cycling_together_dev: Used in development of the app.
- cycling_together: Used in production

Again, these database names are susceptible to change, you just have to change the parameter DB in the .env file and change the init.sql that is stored inside the ./docker directory:

```env
// .env

... Settings

DB=new_database_name

...
```

```sql
DROP DATABASE IF EXISTS new_database_name; -- change here!
DROP DATABASE IF EXISTS cycling_together_dev;
DROP DATABASE IF EXISTS cycling_together_test;

CREATE DATABASE new_database_name; -- and here!
CREATE DATABASE cycling_together_dev;
CREATE DATABASE cycling_together_test;
```
