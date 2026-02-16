# To-do List Application

A fullstack To-Do List application that allows users to create, manage, and organize their tasks efficiently. This application provides a user-friendly interface for managing tasks with features like priority levels, task completion tracking, and task editing capabilities.

## Features

- Create tasks with title, description, and priority level (High, Medium, Low)
- Edit existing tasks (title, description, and priority)
- Mark tasks as completed or incomplete
- Delete tasks (soft delete)
- Automatic task sorting by completion status and priority
- Responsive and intuitive user interface
- Real-time task updates

## Project Architecture

This application follows a **Monorepo architecture**, keeping all components in a single repository for easier management and development.

- **Frontend** (`/frontend`): A user-friendly UI built with React, TypeScript, and Vite
- **Backend** (`/backend`): A structured REST API built with NestJS (Node 20) and TypeScript
- **Database**: A PostgreSQL instance managed via TypeORM migrations

## Tech Stack / Requirements

### Required Software

- [Node.js 20](https://nodejs.org/en/)
- [NestJS 11](https://nestjs.com/)
- [Yarn 1.22](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for containerized deployment)
- [PostgreSQL 17](https://www.postgresql.org/) (managed via Docker)

### Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: NestJS 11, TypeScript, TypeORM
- **Database**: PostgreSQL 17
- **Containerization**: Docker, Docker Compose

## Clone the Repository

Create a local folder on your machine to host the repo
```sh
mkdir <folder-to-store-cloned-repo>
```

Since this is a public repository, you can clone it directly without needing any credentials:

```sh
git clone <repo-url>
cd To-do-List-Application
```

## Installation

### Install Frontend Dependencies

Navigate to the frontend directory and install dependencies:

```sh
cd frontend
yarn install
```

### Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```sh
cd backend
yarn install
```

## Configuration

Before running the application, you need to set up environment variables. In the root directory of the project, rename the `.env.example` file to `.env`:

```sh
cp .env.example .env
```

Then edit the `.env` file and fill in your configuration values (database credentials, ports, etc.).

## Running the Application

All commands should be executed from the root of the project directory.

### Using Docker (Recommended)

Docker Compose allows you to run the entire application stack (database, backend, and frontend) with a single command.

#### Start All Services

Initialize the entire application (database, backend, and frontend) at once:

```sh
docker-compose up -d
```

#### Start Individual Services

You can also start services individually:

**Start only the database:**
```sh
docker-compose up -d db
```

**Start only the backend:**
```sh
docker-compose up -d api
```

**Start only the frontend:**
```sh
docker-compose up -d frontend
```

#### Docker Management Commands

**View logs:**
```sh
docker-compose logs -f
```

**Stop all services:**
```sh
docker-compose down
```

**Note**: For the database volume storage, create a `Volumes` folder in the same directory as the project root to store database volumes.

### Running without Docker

If you prefer to run the application without Docker, you'll need to set up PostgreSQL separately.

**Start the backend:**
```sh
cd backend
yarn start:dev
```

**Start the frontend:**
```sh
cd frontend
yarn frontend:run
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3003

## Database Migrations

Migrations are managed using TypeORM. All migration commands should be executed from the backend directory.

### Generate a New Migration

After making changes to entity models, generate a new migration:

```sh
cd backend
yarn migration:generate -- <path-to-store-migration-file>
```

**Example:**
```sh
yarn migration:generate -- src/database/migrations/CreateNewTable
```

### Run Migrations

Apply all pending migrations to the database:

```sh
cd backend
yarn migration:run
```

### Revert Migrations

Revert the last executed migration:

```sh
cd backend
yarn migration:revert
```

## Deployment to GCP

No instructions here since this wasn't handled in this project.

## Using the Application

### Getting Started

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173` (or the port configured in your environment)

2. **Create a New Task**:
   - Fill in the task title (required)
   - Optionally add a description
   - Select a priority level (High, Medium, or Low)
   - Click "Add Task" to create the task

3. **Manage Tasks**:
   - **Mark as Complete**: Click the checkbox next to a task to mark it as completed
   - **Edit Task**: Click the edit button to modify the task's title, description, or priority
   - **Delete Task**: Click the delete button to remove a task from your list

### Task Organization

Tasks are automatically organized by:
- **Completion Status**: Incomplete tasks appear first
- **Priority**: Within each status group, tasks are sorted by priority (High → Medium → Low)

### Task Features

- **Priority Levels**: Assign High, Medium, or Low priority to help organize your tasks
- **Task Completion**: Toggle tasks between completed and incomplete states
- **Task Editing**: Update task details at any time
- **Soft Delete**: Deleted tasks are soft-deleted, preserving data integrity
