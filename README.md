# Temperature Display Application

To Run:

- `npm run db:restart` - starts the db
- `npm run db:view` - to view the db
- `npm run dev` - to run the development server

## To Do

- create local docker db and db access software (ie docker postgres & adminer)
- access local db, setup db and tables, import data into db via svelteKit
  - use npm package pg-promise (used to use postgres)
- install k8s kind locally, create yaml file and test applicaton locally
  - setup k8s pv and pvc for database data
  - create docker images for the postgres, adminer and temprature-app
- create linode k8s yaml files and deploy application
  - create linode k8s pv and pvc

## Code Creation

```bash
npm create svelte@latest temperature-app
cd temperature-app
npm install
npm i @skeletonlabs/skeleton --save-dev
npx svelte-add@latest tailwindcss
npm install
```

## Code History

tbd
