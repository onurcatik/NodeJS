# Example : Wrap Up


## 1. Project Setup

**Project Structure:**
```
node-express-mongodb
├── models
│   └── blog.js
├── public
│   └── images
│       └── trashcan.svg
├── views
│   ├── 404.ejs
│   ├── details.ejs
│   └── index.ejs
├── controllers
│   └── blogController.js
├── routes
│   └── blogRoutes.js
├── app.js
└── package.json
```

## 2. File Contents

**app.js:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch(err => console.log(err));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/blogs', blogRoutes);

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Not Found' });
});
```

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

**controllers/blogController.js:**
```javascript
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch(err => {
            console.log(err);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            if (!result) {
                res.status(404).render('404', { title: 'Blog Not Found' });
            } else {
                res.render('details', { blog: result, title: 'Blog Details' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: 'Blog Not Found' });
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_delete
};
```

**routes/blogRoutes.js:**
```javascript
const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', blogController.blog_index);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;
```

**views/index.ejs:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
    <h1>All Blogs</h1>
    <% blogs.forEach(blog => { %>
        <div>
            <h2><%= blog.title %></h2>
            <p><%= blog.snippet %></p>
            <a href="/blogs/<%= blog._id %>">Read more</a>
        </div>
    <% }) %>
</body>
</html>
```

**views/details.ejs:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
    <h1><%= blog.title %></h1>
    <p><%= blog.body %></p>
    <img src="/images/trashcan.svg" alt="Delete Icon" onclick="deleteBlog('<%= blog._id %>')" style="cursor: pointer;">
    <script>
        function deleteBlog(blogId) {
            if (confirm('Are you sure you want to delete this blog?')) {
                fetch(`/blogs/${blogId}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(data => {
                        if (data.redirect) {
                            window.location.href = data.redirect;
                        } else {
                            alert('Failed to delete the blog.');
                        }
                    });
            }
        }
    </script>
</body>
</html>
```

**views/404.ejs:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
    <h1>404 - Blog Not Found</h1>
    <p>The blog you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
</body>
</html>
```

## Running the Application

1. **Install Dependencies:**
   Ensure you have Node.js and MongoDB installed. Initialize the project and install required dependencies:
   ```bash
   npm init -y
   npm install express mongoose ejs
   ```

2. **Start MongoDB:**
   Ensure your MongoDB server is running. You can start it using:
   ```bash
   mongod
   ```

3. **Run the Application:**
   Start the Node.js application:
   ```bash
   node app.js
   ```

   Navigate to `http://localhost:3000/blogs` to view the blog application. You can add blogs directly to your MongoDB database to test the application. The delete functionality now uses a trashcan icon, and 404 errors are properly handled with a custom 404 page.

This example illustrates the final enhancements to the Node.js project, ensuring the application is more user-friendly and robust.