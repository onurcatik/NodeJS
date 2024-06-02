# Node.js - MongoDB

In this tutorial, we will explore how to integrate MongoDB, a NoSQL database, into our Node.js application. This will allow us to store, retrieve, update, and delete data in a structured manner. We will use Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, to simplify our interactions with the database.

## Introduction to MongoDB

MongoDB is a NoSQL database that stores data in collections and documents. Unlike SQL databases that use tables, rows, and columns, MongoDB uses a flexible schema model to store data in a format similar to JSON. Each document in a collection is a record and contains key-value pairs.

## Key Concepts:

- **Collection:** Analogous to a table in SQL databases. It stores documents of a particular type.
- **Document:** A single record in a collection. It is similar to a JSON object and contains data in key-value pairs.
- **MongoDB Atlas:** A cloud-hosted MongoDB service, making it easier to manage and scale our database.

## Step 1: Create a MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. After signing up, log in with your credentials.

## Step 2: Create a Cluster

1. Click on "Build a New Cluster."
2. Choose the free tier and the default settings for provider and region.
3. Name your cluster (e.g., "NodeCluster") and create it.

## Step 3: Create a Database and Collection

1. After the cluster is created, click on "Collections."
2. Click on "Add My Own Data" to create a new database and collection.
3. Name your database (e.g., "node_tutorial") and collection (e.g., "blogs").

## Step 4: Create a Database User

1. Navigate to "Database Access" and create a new user.
2. Set a username (e.g., "net_ninja") and a password (e.g., "test1234").
3. Grant the user read and write access to any database.

## Step 5: Obtain Connection String

1. Go back to the cluster and click on "Connect."
2. Choose "Connect your application" and copy the provided connection string.

## Connecting to MongoDB with Mongoose

First, we need to install Mongoose:

```bash
npm install mongoose
```

## Step 1: Set Up the Connection

Create a new variable for the connection string in your `app.js` file:

```javascript
const mongoose = require('mongoose');

const dbURI = 'your-connection-string-here';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));
```

Replace `your-connection-string-here` with the actual connection string, replacing `<username>` and `<password>` with your MongoDB username and password, and `<dbname>` with your database name.

## Step 2: Define a Schema and Model

Create a folder named `models` and a file `blog.js` inside it:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
```

## Step 3: Interact with the Database

Now, let's create some routes to interact with our database.

### Adding a Blog

In your `app.js` file, create a route to add a blog:

```javascript
const express = require('express');
const app = express();
const Blog = require('./models/blog');

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'New Blog',
    snippet: 'About my new blog',
    body: 'More about my new blog'
  });

  blog.save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
```

### Fetching All Blogs

Create a route to fetch all blogs:

```javascript
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
```

### Fetching a Single Blog

Create a route to fetch a single blog by ID:

```javascript
app.get('/single-blog/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
```


