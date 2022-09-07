# Conductor

**Orchestra** is a scheduler app that can be used as an event management system that instructs robots to perform coordinated actions.

## Motivation

> *"Can't you just do it yourself? Why is this useful?"*

### Programmers POV

Suppose you have multiple tasks in different orders, based on a specific day. As a programmer, you would write the program for each task. Now, if you want to modify or cancel some tasks, re-writing the server code won't be the best option.

If **robot** implements _how_ and **Orchestra** implements _when_, then the problem would be simpler.

### Users POV

Suppose you have multiple tasks in different orders, based on a specific day. As a user, you would want to schedule the events on the calendar. Now, if some tasks are limited to prebuilt options of the google home mini, you would be stuck at that point.

If there are **robots** that can perform the desired _function_ and **Orchestra** which sets up robots when _condition_, then the user would be satisfied.

## Installation

### Database
Install [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).
Install [Docker](https://www.docker.com/get-started/).

### Front-End
Use a Node version manager [nvm](https://github.com/nvm-sh/nvm) to install Node.js and npm. `npm` will be used to install and run Orchestra.

Move into `/Orchestra/frontend` and type in the following commands:

```
# Install dependencies
$ npm install

# Execute react-app
$ npm start
```

### Back-end

Move into '/Orchestra/backend' and insert your own api tokens in the'docker-compose.yml'
```
- FIREBASE_API_KEY = <Firebase API KEY>
- MONGO_DB_URI = <Mongodb URI>
```

Move into '/Orchestra/backend' and type in the following commands:
```
# Creates and run the backend containers.
$ docker-compose up --build
```

### Cognitavit Client Application

Move into `/Cognitavit` and type in the following commands:

```
# Install dependencies
$ npm install

# Execute electron-app
$ npm start
```


## Documentation

### Frontend

The frontend documentation uses a tool called **Storybook**.

Steps to execute documentation:

1. Move into `/doc/sprint1/documentation/Orchestra`.
1. On shell, type `yarn` to install dependencies.
1. On shell, type `yarn storybook` to execute the storybook.
1. The documentation page will be available on http://localhost:6006/.

## Contribution
GitHub will be used for the version control of this project.

### Git Flow

For agile software development, Git flow is used for this project. The Git branch structure will follow below:

```
main
└─ develop
   └─ CON-28
   └─ CON-35
   └─ CON-61
   └─ release
```

* `CON-28`: Features for User Story 3 in `/doc/sprint0/PB.md`
* `CON-35`: Features for User Story 10 in `/doc/sprint0/PB.md`
* `CON-61`: Sub-task for user Story 10 in `/doc/sprint0/PB.md`

### GitHub Issues

The core issues will be discussed in [discord](https://discord.gg/34SwEz83) server. Some of the changes and error reports will be controlled through GitHub issues.

### Pull Requests

If you make some changes to the code, a pull request should be made, following the steps below:

1. push the changes into a branch.
1. Create a pull request from your branch into the develop branch. Please follow the template when you create a pull request.
1. Wait until the other developers to review and approve the pull request.
1. After being approved, then merge your pull request. **Squash and merge** option is recommended.

Following Git flow, if you make some changes to the code, please push the changes into a branch. Then, create a pull request from your branch into the develop branch.

## License

[MIT](https://choosealicense.com/licenses/mit/)
