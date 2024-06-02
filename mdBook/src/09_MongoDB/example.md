# Example: MongoDB - Project Setup

1. **Initialize a new Node.js project:**

    ```bash
    mkdir node-mongodb-example
    cd node-mongodb-example
    npm init -y
    ```

2. **Install necessary packages:**

    ```bash
    npm install express mongoose
    ```

3. **Create the necessary files and folders:**

    ```bash
    touch app.js
    mkdir models
    touch models/blog.js
    ```

## Step 2: Set Up Mongoose and MongoDB

1. **Create the Mongoose connection and define the Blog schema in `models/blog.js`:**

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

2. **Set up the Express server and Mongoose connection in `app.js`:**

    ```javascript
    const express = require('express');
    const mongoose = require('mongoose');
    const Blog = require('./models/blog');

    const app = express();

    const dbURI = 'your-connection-string-here';
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => console.log('Connected to DB'))
      .catch((err) => console.log(err));

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Routes
    // Add a new blog
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

    // Fetch all blogs
    app.get('/all-blogs', (req, res) => {
      Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    });

    // Fetch a single blog by ID
    app.get('/single-blog/:id', (req, res) => {
      Blog.findById(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    });

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    ```

## Step 3: Replace Placeholder with Actual Connection String

Replace `your-connection-string-here` in the `app.js` file with your actual MongoDB connection string from MongoDB Atlas. The connection string should look something like this:

```javascript
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
```

Make sure to replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials and database name.

## Step 4: Run the Application

1. **Start your Node.js application:**

    ```bash
    node app.js
    ```

2. **Test the Routes:**

    - **Add a New Blog:**
        Open your browser and go to `http://localhost:3000/add-blog`. This will add a new blog post to your MongoDB database.

    - **Fetch All Blogs:**
        Open your browser and go to `http://localhost:3000/all-blogs`. This will fetch and display all blog posts stored in your database.

    - **Fetch a Single Blog by ID:**
        First, get an ID from one of the blog posts returned by `/all-blogs`. Then, go to `http://localhost:3000/single-blog/<id>` to fetch a specific blog post by its ID.

## Full Example Code

Here is the full code for `app.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'your-connection-string-here';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.use(express.json());

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

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get('/single-blog/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

And the code for `models/blog.js`:

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

This comprehensive example should give you a solid foundation to start working with MongoDB and Mongoose in your Node.js applications.