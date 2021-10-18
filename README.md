# Kost App

Kost allows users to track the products their organisation is using and track insights on their spending.

## Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting started

1. Clone the repo to your local.

```
git clone https://github.com/egecavusoglu/kost.git
```

2. Install dependencies.

- navigate to the project folder in your terminal and run
  - make sure `yarn` is installed on your computer.

```
yarn
```

3. Start the development server with

```
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

- `/package.json`: Find project dependencies and scripts here. Learn more about package.json [here](https://heynode.com/tutorial/what-packagejson/#:~:text=Recap-,The%20package.,entry%20point%20to%20our%20package.)

- `.env`: This file is where we keep the environment variables. Purpose of using this is to not hard code static variables in our code.

- `/pages`: This where all the different pages (screens) of the app uses. To add new pages to app add files here. Learn more [here](https://nextjs.org/docs/basic-features/pages).

  - `/api`: This is where all the serverless backend functions reside. This folder is basically our entire REST API. Here we make database CRUD (create-read-update-delete) operations. Code in this folder is not shipped to client side.

- `/prisma`: [Prisma](https://www.prisma.io/) is a SQL ORM to manage database schemas. This allows us to NOT write raw SQL statements but instead use prisma JS SDK to write safer queries easier.

  - Any change made on the `prisma.schema` must be pushed to the database and `@prisma/client` has to be updated. This means that you need to run `yarn update-prisma` if you change `prisma.schema` file.

- `/public`: Used to serve static files, learn more [here](https://nextjs.org/docs/basic-features/static-file-serving)

- `/src`: This is where all the source code lies.

  - `/components`: This is where all the React components are written. React components are used in building modular and extensible UIs.

  - `/config`: This is where we keep configuration files for various libraries. eg. Chakra theme config is declared here.

  - `/lib`: Short for _library_, this is where all helper methods lie. This can include date parsing functions to networking functions like making get or post requests to email validation functions.

  - `/requests`: This is where all the helper functions for network requests from frontend are made to backend. They are grouped by type such as `auth`, `organisation` and etc.

  - `/store`: This is where global state management of the entire application is kept. Global state means data that can be accessed from any component or place in our React application that is reactive (UI will update if global state is changed). We are using [Zustand](https://github.com/pmndrs/zustand) for global state management since it is one of the simplest to implement. An example would be the logged in user data since it can be used across many places in our app so it is convenient to keep it in global state where every component can easily access it.

## Conventions to follow

### Naming

It is advised to use [kebab-case](https://www.theserverside.com/definition/Kebab-case) with non-capitalized letters to ensure consistency across the repo.

Also doing `folder-name/index.js` allows us to create more files under folder `folder-name` without changing our import statements in the code since `index.js` is a special name that doesn't need to be included in the import source. This means that:

```js
import ThisModule from './folder-name/index.js';
// is the same as
import ThisModule from './folder-name/';
// or this
import ThisModule from './folder-name';
```

## Developing New Features

Branch protection rules ensures that no developer is pushing code directly to `main` branch so that we do not introduce changes to the production without testing them.

1. When developing new features or fixing bugs, branch out from `main` to a branch name you choose (eg. `your-branch`).

2. Commit your changes in this new branch and push them to remote (aka our repo on GitHub).

3. Work on `your-branch` for as much as you want. You can push to this branch as regularly as you like, `main` branch will not be affected.

4. Once your code changes are complete, [create a **Pull Request**](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) (sometimes referred to as PR) from `your-branch` to `main` on our repo's Github page.

   - This means that your are requesting to merge your changes on `your-branch` to the `main` branch. Let other developers know about this change so that they can review your code, test and approve.
   - Once a PR is opened, our application is deployed to a special url automatically where we can preview the changes on this branch on the actual web app.

5. Once your PR is approved, **squash and merge** (this is the only allowed merge strategy so don't worry about this if it sounds confusing) your branch to `main` and voila! You can delete your branch now since it is already merged to `main`. Your changes will be deployed to `kost.vercel.app` in a few minutes automatically.
