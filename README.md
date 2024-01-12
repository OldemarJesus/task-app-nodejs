# Task App

This is an idea of an app that will give to the user the ability to create and manage their task in the same way that a note works.

## Technology

For this app we use the following technology:

- MongoDB
- NodeJS
- Express

## Features

**User End-Points**

|   Path                |   Method  |   Description
|   ------              |   ------  |   ------
|   /users/login        |   POST    |   Login in the system where the auth token is retrieved
|   /users/logout       |   POST    |   Logout in the system with the provided token
|   /users/logout/all   |   POST    |   Logout in the system with the provided token
|   /users              |   POST    |   Register new user
|   /users/me           |   GET     |   Retrieve authenticated user profile
|   /users/me           |   PATCH   |   Update authenticated user data
|   /users/me           |   DELETE  |   Delete authenticated user
|   /users/:id/avatar   |   GET     |   Retrieve the user profile image by user id

***Required Headers***
|   Header          |   Example
|   -----           |   -----
|   Authorization   |   Bearer \<token\>

Note:
This required header does not apply to endpoint POST /users

Example of user structure:

```js
{
    "name": String,
    "email": String,
    "password": String,
    "age": Number
}
```

**Task End-Points**

|   Path        |   Method  |   Description
|   ------      |   ------  |   ------
|   /task       |   GET     |   Retrieve all registed tasks and makes able to filter out associated with authenticated user
|   /task       |   POST    |   Register new task associated with authenticated user
|   /task/:id   |   GET     |   Retrieve one task by ID associated with authenticated user
|   /task/:id   |   PATCH   |   Update one task by ID associated with authenticated user
|   /task/:id   |   DELETE  |   Delete one task by ID associated with authenticated user

***Required Headers***
|   Header          |   Example
|   -----           |   -----
|   Authorization   |   Bearer \<token\>


Example of task structure:

```js
{
    "description": String,
    "completed": Boolean
}
```