require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => console.log('Connected to DB'))
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
