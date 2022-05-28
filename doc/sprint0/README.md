# finalprojects22-conductor

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

### Front-End
Use a Node version manager [nvm](https://github.com/nvm-sh/nvm) to install Node.js and npm.

```
$ npm install -g npm
```

Use `npm` to install and run Orchestra.

```
$ npm install orchestra
$ npm run dev
```

## Contribution
GitHub will be used for the version control of this project.

### Git Flow

For agile software development, Git flow is used for this project. The Git branch structure will follow below:

```
main
└─ develop
   └─ feature
      └─ feature1
      └─ feature2
   └─ release
```

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