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
