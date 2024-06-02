# Node.js  - Wrap Up

In this final tutorial of our Node.js crash course, we will cover the last few enhancements for our Node.js project using Express and MongoDB. The enhancements include replacing the delete link with a trashcan icon and handling 404 errors more gracefully. This tutorial aims to maintain the precision and rigor of professional standards, ensuring a comprehensive understanding of the steps involved.

## Replacing the Delete Link with a Trashcan Icon

To enhance the user interface, we will replace the plain delete link with a trashcan icon. The steps to achieve this are as follows:

1. **Obtain the Trashcan Icon:**
   Download the trashcan icon from the Material Icons website or obtain it from the GitHub repository. Save the SVG file into the `public` folder of your project. The `public` folder serves as the static files directory accessible from the front end.

   ```plaintext
   public/
   ├── images/
   │   └── trashcan.svg
   ├── css/
   ├── js/
   └── ...
   ```

2. **Reference the Icon in the Details View:**
   Update the `details` view to reference the trashcan icon instead of the delete link. Modify the view file (`views/details.ejs` or `views/details.hbs` depending on your templating engine) as shown below:

   ```html
   <!-- Old delete link -->
   <!-- <a href="/delete/<%= blog._id %>">Delete</a> -->

   <!-- New delete icon -->
   <img src="/images/trashcan.svg" alt="Delete Icon" onclick="deleteBlog('<%= blog._id %>')" style="cursor: pointer;">
   ```

3. **Add JavaScript for Delete Functionality:**
   Ensure that the delete functionality is handled correctly by adding a JavaScript function to manage the delete operation:

   ```html
   <script>
       function deleteBlog(blogId) {
           if (confirm('Are you sure you want to delete this blog?')) {
               fetch(`/delete/${blogId}`, { method: 'DELETE' })
                   .then(response => response.json())
                   .then(data => {
                       if (data.success) {
                           window.location.href = '/';
                       } else {
                           alert('Failed to delete the blog.');
                       }
                   });
           }
       }
   </script>
   ```

## Handling 404 Errors

To improve the user experience, we need to handle cases where a requested blog post does not exist. We will create a custom 404 page and update the controller logic to render this page when necessary.

1. **Create a 404 View:**
   Add a new view for the 404 error page (`views/404.ejs` or `views/404.hbs`):

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Blog Not Found</title>
   </head>
   <body>
       <h1>404 - Blog Not Found</h1>
       <p>The blog you are looking for does not exist.</p>
       <a href="/">Go back to Home</a>
   </body>
   </html>
   ```

2. **Update the Controller Logic:**
   Modify the controller logic to render the 404 page when a blog post is not found. Update the relevant controller file (e.g., `controllers/blogController.js`):

   ```javascript
   const Blog = require('../models/blog');

   module.exports.blog_details = (req, res) => {
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
   ```

## Extending the Project

While this tutorial series covers the basics, there are numerous ways to extend and improve your project:

- **Add Categories:** Introduce categories to filter blogs.
- **Add Authors:** Include an author property in the blog model.
- **Display Dates:** Show the creation date of each blog post on the front end.

## Conclusion

This concludes the Node.js crash course tutorial series. Throughout this journey, we have built a comprehensive project using Node.js, Express, and MongoDB. The knowledge gained here sets a solid foundation for exploring more advanced topics in Node.js, such as Firebase integration, authentication, payments, and full-stack development with modern front-end frameworks like React or Vue.

We hope this series has been informative and beneficial. Continue to build upon this project, explore new features, and deepen your understanding of Node.js. Thank you for following along, and we look forward to seeing you in future advanced courses.

## Final Code Snippets

**Details View (details.ejs):**
```html
<!-- Updated delete icon -->
<img src="/images/trashcan.svg" alt="Delete Icon" onclick="deleteBlog('<%= blog._id %>')" style="cursor: pointer;">
```

**JavaScript for Delete Functionality:**
```html
<script>
    function deleteBlog(blogId) {
        if (confirm('Are you sure you want to delete this blog?')) {
            fetch(`/delete/${blogId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/';
                    } else {
                        alert('Failed to delete the blog.');
                    }
                });
        }
    }
</script>
```

**404 View (404.ejs):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Not Found</title>
</head>
<body>
    <h1>404 - Blog Not Found</h1>
    <p>The blog you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
</body>
</html>
```

**Controller Logic (blogController.js):**
```javascript
const Blog = require('../models/blog');

module.exports.blog_details = (req, res) => {
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
```

By following these steps and using the provided code snippets, you can enhance your Node.js project and ensure it meets high standards of functionality and user experience.s