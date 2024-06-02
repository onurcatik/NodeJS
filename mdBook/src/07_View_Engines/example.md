
# Example: View Engines

## Project Setup

1. **Initialize a new Node.js project:**

   ```bash
   mkdir node-ejs-example
   cd node-ejs-example
   npm init -y
   ```

2. **Install the required packages:**

   ```bash
   npm install express ejs
   ```

## Create Project Structure

Create the following directory structure:

```
node-ejs-example/
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── nav.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── 404.ejs
│   └── create.ejs
│
├── app.js
└── package.json
```

## Step-by-Step Implementation

## 1. `app.js` - Main Application File

```javascript
const express = require('express');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    const blogs = [
        { title: 'First Blog', snippet: 'This is the first blog snippet.' },
        { title: 'Second Blog', snippet: 'This is the second blog snippet.' },
        { title: 'Third Blog', snippet: 'This is the third blog snippet.' }
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## 2. `views/partials/header.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            max-width: 1200px;
            margin: 0 auto;
        }
        nav {
            background: #333;
            color: #fff;
            padding: 1em;
        }
        nav a {
            color: #fff;
            margin-right: 1em;
            text-decoration: none;
        }
        .content {
            padding: 1em;
        }
        footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 1em;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
```

## 3. `views/partials/nav.ejs`

```html
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/blogs/create">New Blog</a>
</nav>
```

## 4. `views/partials/footer.ejs`

```html
<footer>
    <p>&copy; 2023 My App</p>
</footer>
</body>
</html>
```

## 5. `views/index.ejs`

```html
<%- include('partials/header') %>
<%- include('partials/nav') %>
<div class="content">
    <h1>Welcome to My App</h1>
    <p>This is a Node.js application using EJS.</p>
    <div class="blogs">
        <h2>All Blogs</h2>
        <% if (blogs.length > 0) { %>
            <% blogs.forEach(blog => { %>
                <div class="blog">
                    <h3><%= blog.title %></h3>
                    <p><%= blog.snippet %></p>
                </div>
            <% }) %>
        <% } else { %>
            <p>There are no blogs to display.</p>
        <% } %>
    </div>
</div>
<%- include('partials/footer') %>
```

## 6. `views/about.ejs`

```html
<%- include('partials/header') %>
<%- include('partials/nav') %>
<div class="content">
    <h1>About Us</h1>
    <p>Learn more about our application and team.</p>
</div>
<%- include('partials/footer') %>
```

## 7. `views/404.ejs`

```html
<%- include('partials/header') %>
<%- include('partials/nav') %>
<div class="content">
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
</div>
<%- include('partials/footer') %>
```

## 8. `views/create.ejs`

```html
<%- include('partials/header') %>
<%- include('partials/nav') %>
<div class="content">
    <h1>Create a New Blog</h1>
    <form action="/blogs" method="POST">
        <label for="title">Blog Title:</label>
        <input type="text" id="title" name="title" required>
        <label for="snippet">Blog Snippet:</label>
        <input type="text" id="snippet" name="snippet" required>
        <label for="body">Blog Body:</label>
        <textarea id="body" name="body" required></textarea>
        <button type="submit">Submit</button>
    </form>
</div>
<%- include('partials/footer') %>
```

## Running the Application

1. **Start the application:**

   ```bash
   node app.js
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

You should see the home page with a list of blogs. Navigate to `/about` and `/blogs/create` to see the respective pages. Try visiting a non-existent URL to see the custom 404 page.
