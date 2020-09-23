![DevHub npm test](https://github.com/mongodb/devhub/workflows/DevHub%20npm%20test/badge.svg)
![DevHub CI test](https://github.com/mongodb/devhub/workflows/DevHub%20ci%20test/badge.svg)

# MongoDB Developer Hub Front-End

Uses [Gatsby](https://www.gatsbyjs.org/) to build static site.

## Installation

```shell
npm ci
```

### .env file setup

You'll need to set some environment variables in two separate files at the root of this directory for separate production/development environments.

#### `.env.production`

Snooty's `build` and `serve` stages use the `production` environment. Your `.env.production` file should be as follows:

```
GATSBY_SITE=<SITE>
GATSBY_PARSER_USER=<USER>
GATSBY_PARSER_CI_USER=jordanstapinski
GATSBY_PARSER_BRANCH=<BRANCH>
GATSBY_SNOOTY_DEV=true
```

#### `.env.development`

Snooty's `develop` stage uses the `development` environment. Your `.env.development` file should be as follows:

```
GATSBY_SITE=<SITE>
GATSBY_PARSER_USER=<USER>
GATSBY_PARSER_CI_USER=jordanstapinski
GATSBY_PARSER_BRANCH=<BRANCH>
GATSBY_SNOOTY_DEV=true
```

The `GATSBY_SNOOTY_DEV` variable is what allows Gatsby to know that when the application is built it should use the snooty branch name as part of the file paths. When not set, the file paths will use the value of `GATSBY_PARSER_BRANCH`.

It should be set to `true` when working on snooty locally.

## Running locally

To serve a "hot-reloadable" development build of the site at `localhost:8000`, run:

```shell
npm run develop
```

To build and serve a production build of the site, run the following commands:

```shell
$ npm run build
$ npm run serve
```

To production build and serve without using Gatsby prefix-paths:

```shell
$ npm run buildTest
$ npm run serveTest
```

This will then serve the site at `localhost:9000`

## Staging

Install [mut](https://github.com/mongodb/mut) and ensure that you have properly configured your Giza/AWS keys. Then, from root, run:

```shell
make stage
```

### Unit tests

Unit tests are located in the `tests/unit/` directory. To run only unit tests, use:

```shell
npm run test:unit
```

### Integration tests

Integration tests are located in the `cypress` directory and are run on the Cypress framework. First, build a production build of the site without prefix-paths using the following command:

```shell
$ npm run buildTest
$ npm run serveTest
```

and then load the Cypress UI using:

```shell
$ npm run test:e2e:start
```

or run headless with:

```shell
$ npm run test:e2e:headless
```

### Running individual suites

Jest includes configurations for running individual test suites:

```shell
npm test -- my-test   # or
npm test -- path/to/my-test.js
```

For more information, see the [Jest CLI Options](https://jestjs.io/docs/en/cli) documentation, or run `npm test -- --help`.

## Linting & Style

We use [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to help with linting and style.

### Style

To format code using Prettier, run the following command:

```shell
npm run format:fix
```

We have set up a precommit hook that will format staged files. Prettier also offers a variety of editor integrations to automatically format your code.

Check out the [internal wiki](https://wiki.corp.mongodb.com/display/DE/Developer+Hub+Front-End) for more information.
