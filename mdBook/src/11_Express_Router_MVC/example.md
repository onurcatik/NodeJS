# Example: Express Router MVC

## Directory Structure

Here's the directory structure we'll use:

```sh
my-blog-app/
├── controllers/
│   └── blogController.js
├── models/
│   └── blog.js
├── routes/
│   └── blogRoutes.js
├── views/
│   └── blogs/
│       ├── create.ejs
│       ├── details.ejs
│       ├── index.ejs
├── app.js
└── package.json
```

## Step 1: Initialize the Project

First, initialize a new Node.js project and install the required dependencies:

```bash
mkdir my-blog-app
cd my-blog-app
npm init -y
npm install express mongoose ejs
```

## Step 2: Create the `app.js` File

Create the main application file `app.js`:

**app.js:**

```javascript
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myblog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use(blogRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Step 3: Create the Blog Model

Create the `models/blog.js` file to define the Blog model:

**models/blog.js:**

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
```

## Step 4: Create the Blog Controller

Create the `controllers/blogController.js` file to handle blog-related logic:

**controllers/blogController.js:**

```javascript
const Blog = require('../models/blog');

// Get all blogs
const blogIndex = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
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

## Step 5: Create the Blog Routes

Create the `routes/blogRoutes.js` file to define blog-related routes:

**routes/blogRoutes.js:**

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

## Step 6: Create the Views

Create EJS templates in the `views/blogs` folder.

**views/blogs/index.ejs:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>All Blogs</title>
</head>
<body>
  <h1>All Blogs</h1>
  <% blogs.forEach(blog => { %>
    <div>
      <h2><%= blog.title %></h2>
      <p><%= blog.snippet %></p>
      <a href="/blogs/<%= blog._id %>">Read more</a>
      <form action="/blogs/<%= blog._id %>?_method=DELETE" method="POST">
        <button type="submit">Delete</button>
      </form>
    </div>
  <% }) %>
  <a href="/blogs/create">Create a new blog</a>
</body>
</html>
```

**views/blogs/details.ejs:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= blog.title %></title>
</head>
<body>
  <h1><%= blog.title %></h1>
  <p><%= blog.body %></p>
  <a href="/blogs">Back to all blogs</a>
</body>
</html>
```

**views/blogs/create.ejs:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Create a New Blog</title>
</head>
<body>
  <h1>Create a New Blog</h1>
  <form action="/blogs" method="POST">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <label for="snippet">Snippet:</label>
    <input type="text" id="snippet" name="snippet" required>
    <label for="body">Body:</label>
    <textarea id="body" name="body" required></textarea>
    <button type="submit">Submit</button>
  </form>
  <a href="/blogs">Back to all blogs</a>
</body>
</html>
```

## Step 7: Test the Application

Start your server:

```bash
node app.js
```

Visit `http://localhost:3000/blogs` in your browser. You should see the list of blogs, and you can create, view, and delete blogs using the provided routes and forms.

