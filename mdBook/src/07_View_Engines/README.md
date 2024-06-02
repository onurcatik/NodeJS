# Node.js - View Engines

In this tutorial, we will explore how to use a view engine with a Node.js and Express application to dynamically generate HTML pages. By leveraging view engines, we can inject dynamic data into our HTML templates, making our web applications more interactive and responsive to user data and database content. We will specifically focus on the EJS (Embedded JavaScript) view engine due to its simplicity and powerful features.


## Step 1: Install EJS

First, we need to install the EJS package. Open your terminal and navigate to your project directory. Run the following command:

```bash
npm install ejs
```

This will add EJS to your project's dependencies in `package.json`.

## Step 2: Register the View Engine

Next, we need to configure our Express application to use EJS as the view engine. In your main application file (e.g., `app.js`), add the following code after initializing your Express app:

```javascript
const express = require('express');
const app = express();

// Register the view engine
app.set('view engine', 'ejs');
```

By setting the view engine to EJS, Express will automatically look for `.ejs` files in a `views` directory within your project.

## Step 3: Create the Views Directory

Create a directory named `views` in your project's root directory. This is where we will place our EJS templates.

```bash
mkdir views
```

## Creating EJS Templates

## Step 4: Create an Index View

Create a new file named `index.ejs` in the `views` directory. This will be our main template file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blogs/create">New Blog</a>
    </nav>
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
    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

This template includes placeholders for dynamic data using EJS tags (`<%= %>` and `<% %>`).

## Step 5: Render the Index View

In your main application file, create a route to render the `index.ejs` template and pass dynamic data to it:

```javascript
app.get('/', (req, res) => {
    const blogs = [
        { title: 'First Blog', snippet: 'This is the first blog snippet.' },
        { title: 'Second Blog', snippet: 'This is the second blog snippet.' },
        { title: 'Third Blog', snippet: 'This is the third blog snippet.' }
    ];
    res.render('index', { title: 'Home', blogs });
});
```

This route handler fetches blog data and renders the `index.ejs` template, injecting the `title` and `blogs` variables.

## Creating Additional Views

## Step 6: Create About and 404 Views

Create additional EJS templates for the "About" page and a custom 404 error page.

### `views/about.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blogs/create">New Blog</a>
    </nav>
    <div class="content">
        <h1>About Us</h1>
        <p>Learn more about our application and team.</p>
    </div>
    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

### `views/404.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blogs/create">New Blog</a>
    </nav>
    <div class="content">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    </div>
    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

## Step 7: Render Additional Views

Add route handlers for the "About" page and the 404 error page:

```javascript
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
```

## Step 8: Create a Form View for New Blogs

Create a new EJS template for creating a new blog:

### `views/create.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blogs/create">New Blog</a>
    </nav>
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
    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

Add a route handler to render this view:

```javascript
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});
```

## Using Partials

To avoid redundancy in our templates, we can use partials to reuse common sections like the header, navigation, and footer.

## Step 9: Create Partials Directory and Files

Create a directory named `partials` within the `views` directory. Then, create three files: `header.ejs`, `nav.ejs`, and `footer.ejs`.

```bash
mkdir views/partials
touch views/partials/header.ejs views/partials/nav.ejs views/partials/footer.ejs
```

### `views/partials/header.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %> | My App</title>
</head>
<body>
```

### `views/partials/nav.ejs`

```html
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/blogs/create">New Blog</a>
</nav>
```

### `views/partials/footer.ejs`

```html
    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

## Step 10: Include Partials in Templates

Update the existing templates to include these partials using the EJS `include` function.

### `views/index.ejs`

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
                <div class="

blog">
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

### `views/about.ejs`, `views/404.ejs`, `views/create.ejs`

Update similarly by including the `header`, `nav`, and `footer` partials.

## Adding CSS

For simplicity, we can add CSS directly to the `header.ejs` partial. However, in a real application, you would typically serve static CSS files.

### `views/partials/header.ejs`

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

