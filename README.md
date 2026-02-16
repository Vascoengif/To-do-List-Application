# To-do-List-Application
Simple To-do List Application to register my to-do tickets.

This To-Do List fullstack application is a challenge, and because of it's small scope (this won't be a giant application maintained by hundreds of people), this is build with a Monorepo architecture. Everything is closer together, and serves its purpose. This will be no more than a CRUD system with a user-friendly interface.

## Project Architecture
- Frontend(/frontend): A user friendly UI built with React, Typescript, and Vite.
- Backend(/backend): A structured REST API built with NestJS (Node 20) and Typescript.
- Database(/db): A PostgreSQL instance managed via TypeORM migrations.

## Tech Stack / Requirements

- [Nodejs 20](https://nodejs.org/en/)
- [NestJs 11](https://nestjs.com/)
- [Yarn 1.22](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)



# Clone the repo
```sh
mkdir <folder-to-hold-the-cloned-repo>
git clone <repo-url>
cd To-do-List-Application
```

# Install Frontend dependencies
Go to the root path of the project
```sh
cd frontend && yarn install
```

# Install Backend dependencies
Go to the root path of the project
```sh
cd backend && yarn install
```

# Database tip
For the database Volume store, in the same path of the project, create a "Volumes" folder, in order for the database Volumes be stored there.

# Run the app
The following commands to launch the app are supposed to be executed in the root of the project

Initialize the entire app at the same time, with only one command:
```sh
docker-compose up -d
```

Initialize only database:
```sh
docker-compose up -d db
```

Initialize backend
```sh
cd backend && yarn start:dev
```

# Add new migration based on changes made on entity models
Important: this commands should be executed inside backend path
```sh
cd backend
```

```sh
yarn migration:generate -- <path-to-store-migration-file>
```

# Run migration
```sh
yarn migration:run
```

# Revert migration
```sh
yarn migration:revert
```