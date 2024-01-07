# Task App

This is an idea of an app that will give to the user the ability to create and manage their task in the same way that a note works.

## Technology

For this app we use the following technology:

- MongoDB
- NodeJS
- Express

## Features

**User End-Points**

| Path | Method | Description
|------|--------|------------
|/user | GET | Retrieve all registed users
|/user | POST | Register new user
|/user/:id| GET | Retrieve one user by ID
|/user/:id| PATCH | Update one user by ID
|/user/:id| DELETE | Delete one user by ID

Example of user structure:

```json
{
    "name": String,
    "email": String,
    "password": String,
    "age": Number
}
```

**Task End-Points**

| Path | Method | Description
|------|--------|------------
|/task | GET | Retrieve all registed tasks
|/task | POST | Register new task
|/task/:id| GET | Retrieve one task by ID
|/task/:id| PATCH | Update one task by ID
|/task/:id| DELETE | Delete one task by ID

Example of task structure:

```json
{
    "description": String,
    "completed": Boolean
}
```