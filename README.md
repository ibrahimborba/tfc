# Welcome to Trybe Futebol Clube (TFC) project!
A RESTful API that uses MSC architecture to visualize, search and filter soccer matches and team's scores. Developed at [Trybe's](https://www.betrybe.com/) Back-end Module, OOP and SOLID.


# Summary
- [Welcome to Trybe Futebol Clube (TFC) project!](#welcome-to-trybe-futebol-clube-tfc-project)
- [Summary](#summary)
- [Context](#context)
- [Technologies, tools and architectures used](#technologies-tools-and-architectures-used)
- [Installing and running the app](#installing-and-running-the-app)
- [Notes](#notes)
  - [Documentation](#documentation)
  - [Code quality](#code-quality)
  - [Git, GitHub and Commits](#git-github-and-commits)


# Context
This project is a __Soccer Club__ that uses Sequlize to connect with a MySQL database to manage teams, matches and users. Main features:
 * __Authentication and Authorization__ | Logged users can add and update matches progress. Visualizations doesn't require login.
 * __Visualize and Filter__ | Users can visualize all matches, or filter if they're in progress or not. And visualize the full leaderboard or filter by team origin (home or away).

# Technologies, tools and architectures used
This project used the following technologies, tools and patterns:
  * __Node.js, Express, JWT__ | [Create a HTTP API](http://expressjs.com/), [API routing](https://expressjs.com/en/guide/routing.html), [authentication and authorization](https://jwt.io/).
  * __Sequelize__ | [ORM](https://sequelize.org/v5/manual/getting-started.html), [create relationships between entities](https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554).
  * __Mocha, Chai, Sinon__ | [Integration and unit testing for Node.js](https://mochajs.org/), [testing honeycomb](https://engineering.atspotify.com/2018/01/testing-of-microservices/), [test coverage](https://martinfowler.com/bliki/TestCoverage.html).
  * __MSC Architecture__ | [Improve code organization, maintenance and scalability](https://martinfowler.com/architecture/).
  * __REST Architecture__ | [Simple architecture and highly popular](https://restfulapi.net/).
  * __OOP and SOLID__ | [SOLID with TypeScript](https://medium.com/@matheusbessa_44838/princ%C3%ADpios-solid-com-typescript-4f8a9d5d1ef8).

# Installing and running the app
### Install dependencies
```
cd tfc
npm install
```

### Run the application with Docker (compose configs were developed by Trybe's team)
```
cd app
docker-compose up -d
```

### Run back-end application after running Docker
```
cd backend
npm run dev
```
### Run front-end application after running Docker
*Front-end was developed by Trybe's team*
```
cd frontend
npm start
```
### Run back-end tests
*Run all tests*
```
backend
npm run test
```
*See test coverage*
```
npm run test:coverage
```

# Notes
## Documentation
API's documentation can be [found here](https://documenter.getpostman.com/view/22534963/2s83zdx74x).
## Code quality
To enforce Clean Code and good practices, the following standards and resources were used in this project:
* __Linter__ | Developed following the Clean Code standards specified by [Trybe's ESLint](https://github.com/betrybe/eslint-config-trybe).
## Git, GitHub and Commits
Commited using the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) with some types from [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

