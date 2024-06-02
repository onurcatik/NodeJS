# Node.js - GET, POST & DELETE Requests

In this tutorial, we will discuss handling different types of HTTP requests in a Node.js application using the Express framework. We will focus on three main types of requests: GET, POST, and DELETE. We will also see how to implement these requests in a simple blog application.

## Overview

HTTP requests are the foundation of web communication between clients and servers. Different request types serve different purposes:

- **GET**: Retrieve data from the server.
- **POST**: Send data to the server, typically to create new resources.
- **DELETE**: Remove resources from the server.

## Setting Up the Environment

Before we dive into the code, ensure you have Node.js and Express installed. You can set up a new Express project using the following commands:

```bash
npm init -y
npm install express
```

Create an `app.js` file and set up a basic Express server:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Handling GET Requests

GET requests are used to retrieve data. In our blog application, we will handle GET requests to fetch all blogs and individual blog details.

## Fetching All Blogs

```javascript
// Dummy data for blogs
const blogs = [
  { id: 1, title: 'First Blog', snippet: 'This is the first blog' },
  { id: 2, title: 'Second Blog', snippet: 'This is the second blog' },
];

// Route to get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});
```

## Fetching a Single Blog

```javascript
// Route to get a single blog by ID
app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).send('Blog not found');
  }
});
```

## Handling POST Requests

POST requests are used to send data to the server to create new resources. We will create a new blog post via a POST request.

## Creating a New Blog

1. **HTML Form for Creating a Blog**:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Create Blog</title>
</head>
<body>
  <form action="/blogs" method="POST">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title">
    <br>
    <label for="snippet">Snippet:</label>
    <input type="text" id="snippet" name="snippet">
    <br>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

2. **Handling the POST Request in Express**:

```javascript
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/blogs', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    snippet: req.body.snippet,
  };
  blogs.push(newBlog);
  res.redirect('/blogs');
});
```

## Handling DELETE Requests

DELETE requests are used to remove resources from the server. We will implement a route to delete a blog post.

## Deleting a Blog

1. **HTML for Delete Button**:

```html
<!-- Part of the blog details page -->
<button class="delete-btn" data-id="<%= blog.id %>">Delete</button>
```

2. **Client-Side JavaScript to Send DELETE Request**:

```html
<script>
document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', function () {
    const id = this.getAttribute('data-id');
    fetch(`/blogs/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        window.location.href = '/blogs';
      } else {
        console.error('Failed to delete blog');
      }
    });
  });
});
</script>
```

3. **Handling the DELETE Request in Express**:

```javascript
// Route to handle delete request
app.delete('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex(b => b.id === blogId);
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
    res.json({ redirect: '/blogs' });
  } else {
    res.status(404).send('Blog not found');
  }
});
```

## Complete Code

Combining all the parts, our `app.js` file looks like this:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const blogs = [
  { id: 1, title: 'First Blog', snippet: 'This is the first blog' },
  { id: 2, title: 'Second Blog', snippet: 'This is the second blog' },
];

app.get('/blogs', (req, res) => {
  res.json(blogs);
});

app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).send('Blog not found');
  }
});

app.post('/blogs', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    snippet: req.body.snippet,
  };
  blogs.push(newBlog);
  res.redirect('/blogs');
});

app.delete('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex(b => b.id === blogId);
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
    res.json({ redirect: '/blogs' });
  } else {
    res.status(404).send('Blog not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
