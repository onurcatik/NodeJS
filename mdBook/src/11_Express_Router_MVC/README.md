# Node.js - Express Router & MVC

In this tutorial, we will explore the Express Router and the Model-View-Controller (MVC) pattern to organize and modularize our Node.js applications. This will enhance the maintainability and scalability of our codebase.

## Overview

As applications grow, managing all routes and logic in a single file becomes cumbersome. By leveraging the Express Router and adopting the MVC pattern, we can cleanly separate concerns, making our code more modular and easier to manage.

## Objectives

1. Introduce the Express Router to manage routes efficiently.
2. Implement the MVC pattern to structure our application.

## Prerequisites

- Basic understanding of Node.js and Express.js.
- Node.js and npm installed.

## Setting Up the Express Router

## Step 1: Create the `routes` Folder

First, create a `routes` folder to organize our route files.

```bash
mkdir routes
```

## Step 2: Create the `blogRoutes.js` File

Create a new file called `blogRoutes.js` inside the `routes` folder.

```bash
touch routes/blogRoutes.js
```

## Step 3: Move Blog Routes to `blogRoutes.js`

Cut the blog routes from `app.js` and paste them into `blogRoutes.js`.

**app.js (before):**

```javascript
const express = require('express');
const app = express();
// other requires and middleware

// Blog routes
app.get('/blogs', (req, res) => {
  // logic
});

app.get('/blogs/:id', (req, res) => {
  // logic
});

app.post('/blogs', (req, res) => {
  // logic
});

// more routes

app.listen(3000, () => console.log('Server is running'));
```

**blogRoutes.js:**

```javascript
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // Assuming you have a Blog model

// Get all blogs
router.get('/blogs', (req, res) => {
  // logic
});

// Get a single blog by ID
router.get('/blogs/:id', (req, res) => {
  // logic
});

// Create a new blog
router.post('/blogs', (req, res) => {
  // logic
});

module.exports = router;
```

## Step 4: Use the Router in `app.js`

Import the `blogRoutes.js` file into `app.js` and use it with the Express app.

**app.js (after):**

```javascript
const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes'); // Import the blog routes

// other requires and middleware

// Use the blog routes
app.use(blogRoutes);

app.listen(3000, () => console.log('Server is running'));
```

## Implementing MVC

## Step 1: Create the `controllers` Folder

Create a `controllers` folder to organize controller files.

```bash
mkdir controllers
```

## Step 2: Create the `blogController.js` File

Create a new file called `blogController.js` inside the `controllers` folder.

```bash
touch controllers/blogController.js
```

## Step 3: Move Route Logic to `blogController.js`

Define the controller functions in `blogController.js`.

**blogController.js:**

```javascript
const Blog = require('../models/blog');

// Get all blogs
const blogIndex = (req, res) => {
  // logic
};

// Get a single blog by ID
const blogDetails = (req, res) => {
  // logic
};

// Create a new blog (GET request to render form)
const blogCreateGet = (req, res) => {
  // logic
};

// Create a new blog (POST request to handle form submission)
const blogCreatePost = (req, res) => {
  // logic
};

// Delete a blog
const blogDelete = (req, res) => {
  // logic
};

module.exports = {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete
};
```

## Step 4: Refactor `blogRoutes.js` to Use Controllers

Update `blogRoutes.js` to use the controller functions.

**blogRoutes.js (after):**

```javascript
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/blogs', blogController.blogIndex);

// Get a single blog by ID
router.get('/blogs/:id', blogController.blogDetails);

// Create a new blog (GET request to render form)
router.get('/blogs/create', blogController.blogCreateGet);

// Create a new blog (POST request to handle form submission)
router.post('/blogs', blogController.blogCreatePost);

// Delete a blog
router.delete('/blogs/:id', blogController.blogDelete);

module.exports = router;
```

## Step 5: Organize Views

Create a folder structure within `views` to organize templates.

```bash
mkdir views/blogs
```

Move blog-related templates to the `views/blogs` folder.

## Step 6: Update Controller to Reflect View Path Changes

Adjust the controller functions to reflect the new paths for the views.

**blogController.js (updated):**

```javascript
const Blog = require('../models/blog');

// Get all blogs
const blogIndex = (req, res) => {
  Blog.find()
    .then(result => res.render('blogs/index', { blogs: result }))
    .catch(err => console.log(err));
};

// Get a single blog by ID
const blogDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => res.render('blogs/details', { blog: result }))
    .catch(err => console.log(err));
};

// Create a new blog (GET request to render form)
const blogCreateGet = (req, res) => {
  res.render('blogs/create');
};

// Create a new blog (POST request to handle form submission)
const blogCreatePost = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => res.redirect('/blogs'))
    .catch(err => console.log(err));
};

// Delete a blog
const blogDelete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => res.json({ redirect: '/blogs' }))
    .catch(err => console.log(err));
};

module.exports = {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete
};
```

