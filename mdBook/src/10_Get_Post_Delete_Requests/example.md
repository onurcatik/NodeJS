# Example: Get, Post, Delete Request

## Code

```sh
blog-app/
├── public/
│   ├── styles.css
│   └── scripts.js
├── views/
│   ├── index.ejs
│   ├── create.ejs
│   └── details.ejs
├── app.js
└── package.json
```

## 1. `app.js`

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

let blogs = [
  { id: 1, title: 'First Blog', snippet: 'This is the first blog', body: 'Content of the first blog' },
  { id: 2, title: 'Second Blog', snippet: 'This is the second blog', body: 'Content of the second blog' },
];

// Route to get all blogs
app.get('/blogs', (req, res) => {
  res.render('index', { blogs });
});

// Route to create a new blog (form)
app.get('/blogs/create', (req, res) => {
  res.render('create');
});

// Route to handle form submission
app.post('/blogs', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  };
  blogs.push(newBlog);
  res.redirect('/blogs');
});

// Route to get a single blog by ID
app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (blog) {
    res.render('details', { blog });
  } else {
    res.status(404).send('Blog not found');
  }
});

// Route to handle delete request
app.delete('/blogs/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  blogs = blogs.filter(b => b.id !== blogId);
  res.json({ redirect: '/blogs' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## 2. `views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blogs</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1>All Blogs</h1>
  <a href="/blogs/create">Create a new blog</a>
  <div class="blogs">
    <% blogs.forEach(blog => { %>
      <div class="blog">
        <h3><a href="/blogs/<%= blog.id %>"><%= blog.title %></a></h3>
        <p><%= blog.snippet %></p>
      </div>
    <% }) %>
  </div>
</body>
</html>
```

## 3. `views/create.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Blog</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1>Create a New Blog</h1>
  <form action="/blogs" method="POST">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <br>
    <label for="snippet">Snippet:</label>
    <input type="text" id="snippet" name="snippet" required>
    <br>
    <label for="body">Body:</label>
    <textarea id="body" name="body" required></textarea>
    <br>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

## 4. `views/details.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Details</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1><%= blog.title %></h1>
  <p><%= blog.body %></p>
  <button class="delete-btn" data-id="<%= blog.id %>">Delete</button>
  <script src="/scripts.js"></script>
</body>
</html>
```

## 5. `public/styles.css`

```css
body {
  font-family: Arial, sans-serif;
}

.blog {
  margin-bottom: 20px;
}

.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
```

## 6. `public/scripts.js`

```javascript
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
```

## Running the Application

1. Initialize your project and install the necessary dependencies:
   ```bash
   npm init -y
   npm install express
   ```

2. Create the project structure and files as shown above.

3. Start the server:
   ```bash
   node app.js
   ```

4. Open your browser and navigate to `http://localhost:3000/blogs` to see the list of blogs. You can create new blogs and delete existing ones using the provided form and delete button.

This example demonstrates the basic CRUD operations using GET, POST, and DELETE requests in a Node.js application with Express, along with client-side JavaScript for handling form submissions and deletions.