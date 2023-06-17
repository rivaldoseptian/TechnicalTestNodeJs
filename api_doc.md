# Task API Documentaion

## Run LocalHost:

- npm run dev

## Run Unit Test:

- npm run rest-db
- npm run test

## EndPoints :

- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

&nbsp;

## 1. POST /auth/register

Description: - register User

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "string"
}
```

&nbsp;

## 2. POST /auth/login

Description:

- register User

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email required"
}
```

```json
{
  "message": "Password required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Invalid Email/Password"
}
```

&nbsp;

## 3. GET /tasks

Description:

- GET tasks

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "completed": "boolean"
  },
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "completed": "boolean"
  }
]
```

&nbsp;

## 4.POST /tasks

Description:

- CreateTask

headers:

```json
{
  "access_token": "string (required)"
}
```

Request:

- body:

```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "title required"
}
```

&nbsp;

## 5.GET /tasks/:id

Description:

- GET One Task

headers:

```json
{
  "access_token": "string (required)"
}
```

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

&nbsp;

## 6.PATCH /tasks/:id

Description:

- Update Task

headers:

```json
{
  "access_token": "string (required)"
}
```

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "completed": "boolean"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Task Not Found"
}
```

&nbsp;

## 7.DELETE /tasks/:id

Description:

- Delete Task

headers:

```json
{
  "access_token": "string (required)"
}
```

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Task Not Found"
}
```

&nbsp;
