# Kanban Express Webix

## Prerequisites

* NodeJS
* PostgreSQL

## Usage

* Configure .env file. Example is in the repository.
* Then:

```bash
# install deps
npm i

# apply migrations
npm run db:migrate

# seed fake data
npm run db:seed

# launch app
npm run dev

```

* For drop database use:
```bash
npm run db:drop
```
