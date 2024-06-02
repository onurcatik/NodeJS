# Example: Building a Simple Server with Express and Using Lodash

In this example, we will build a simple Node.js server using Express and demonstrate the use of Lodash for utility functions.

## Step 1: Initialize the Project

First, create a new directory for your project and navigate into it. Then, initialize a new Node.js project.

```bash
mkdir my-node-project
cd my-node-project
npm init -y
```

This will create a `package.json` file with default values.

## Step 2: Install Dependencies

Next, install Express and Lodash as dependencies.

```bash
npm install express lodash
```

This will install both packages locally and add them to the `dependencies` section of your `package.json` file.

## Step 3: Create the Server

Create a file named `server.js` and add the following code:

```javascript
// server.js

const express = require('express');
const _ = require('lodash');

const app = express();
const port = 3000;

// Sample data array
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

// Endpoint to get a random user
app.get('/random-user', (req, res) => {
  const randomUser = _.sample(users);
  res.json(randomUser);
});

// Endpoint to get all users sorted by age
app.get('/sorted-users', (req, res) => {
  const sortedUsers = _.sortBy(users, ['age']);
  res.json(sortedUsers);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Step 4: Run the Server with Nodemon

To use `nodemon` for automatic server restarts, install it globally if you haven't already:

```bash
npm install -g nodemon
```

Then, run the server using `nodemon`:

```bash
nodemon server.js
```

## Step 5: Test the Endpoints

Open your browser or a tool like Postman and test the endpoints:

- **Random User Endpoint:** `http://localhost:3000/random-user`

  This should return a random user from the users array, e.g.,

  ```json
  {
    "id": 2,
    "name": "Bob",
    "age": 30
  }
  ```

- **Sorted Users Endpoint:** `http://localhost:3000/sorted-users`

  This should return the users sorted by age, e.g.,

  ```json
  [
    {
      "id": 1,
      "name": "Alice",
      "age": 25
    },
    {
      "id": 2,
      "name": "Bob",
      "age": 30
    },
    {
      "id": 3,
      "name": "Charlie",
      "age": 35
    }
  ]
  ```

## Explanation

1. **Initializing the Project:** We start by initializing a new Node.js project with `npm init -y`, which creates a `package.json` file.

2. **Installing Dependencies:** We install Express for creating the server and Lodash for utility functions.

3. **Creating the Server:** In `server.js`, we set up a basic Express server with two endpoints:
   - `/random-user`: Uses Lodash's `sample` method to return a random user.
   - `/sorted-users`: Uses Lodash's `sortBy` method to return users sorted by age.

4. **Running the Server with Nodemon:** We use `nodemon` to run the server, which automatically restarts the server whenever we make changes to the code.

This example demonstrates how to set up a simple Node.js server using Express and integrate Lodash for additional functionality.