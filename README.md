# CZ3002 - Advanced Software Engineering Project

# Toohakai - A classroom learning tool

This is an official starter Turborepo with multiple meta-frameworks all working in harmony and sharing packages.

This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

    Run the following command to insall dependencies

```sh
pnpm install
```

Then populate the following files:
- apps/server/.env
- apps/web/.env
- packages/api/.env

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

Apps:

- `sevrer`: an [Express](https://expressjs.com/) server
- `web`: a [Next.js](https://nextjs.org/) app

Packages:

- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library (which contains a single `<CounterButton>` component)
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
