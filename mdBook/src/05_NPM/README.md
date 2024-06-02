# Node.js - NPM

In this tutorial, we will delve into NPM (Node Package Manager), a vital tool for Node.js developers. NPM allows us to install, update, and manage packages that are not part of the Node.js core. This tutorial will guide you through the process of using NPM, installing packages globally and locally, and understanding the `package.json` file.

## Introduction to NPM

NPM is a package manager for Node.js, installed automatically when you install Node.js. It allows you to manage dependencies for your Node.js projects and facilitates the installation of third-party packages.

### Installing Packages Globally

Global packages can be used across multiple projects on your computer. One such package is `nodemon`, which aids in development by automatically restarting the server when code changes are detected.

```bash
# Install nodemon globally
npm install -g nodemon
```

After installation, you can use `nodemon` instead of `node` to run your server, and it will automatically restart whenever you make changes to your code.

```bash
# Run server with nodemon
nodemon server.js
```

### Installing Packages Locally

Local packages are installed within the project directory and are project-specific. To manage local dependencies, you should create a `package.json` file in your project.

#### Initializing `package.json`

The `package.json` file is created using the `npm init` command, which prompts you to enter details about your project.

```bash
# Initialize package.json
npm init
```

You will be asked a series of questions, such as the project name, version, description, entry point, and more. You can accept the default values by pressing Enter.

### Example: Installing Lodash

Lodash is a popular utility library that provides helpful functions for common programming tasks. To install Lodash locally in your project, you can use the following command:

```bash
# Install lodash locally
npm install lodash
```

This command will add Lodash to your project's dependencies and create a `node_modules` folder where Lodash and its dependencies are stored. The `package.json` file will be updated to include Lodash in the `dependencies` section.

```json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

#### Using Lodash in Your Project

To use Lodash in your Node.js project, require it at the top of your JavaScript file.

```javascript
// Require Lodash
const _ = require('lodash');

// Use Lodash to get a random number between 0 and 20
const randomNum = _.random(0, 20);
console.log(randomNum);
```

### Understanding `package-lock.json`

Alongside `package.json`, you will also see a `package-lock.json` file. This file locks the versions of installed packages and their dependencies, ensuring consistent installs across different environments. You do not need to edit this file manually.

### Sharing Projects Without `node_modules`

When sharing your project, you should exclude the `node_modules` folder to avoid transferring unnecessary files. Instead, include the `package.json` and `package-lock.json` files. Anyone cloning your project can run `npm install` to install all required dependencies listed in `package.json`.

```bash
# Install all dependencies listed in package.json
npm install
```

### Example: Creating a Project and Installing Dependencies

1. **Initialize the Project**

   ```bash
   npm init -y
   ```

   The `-y` flag accepts all default values.

2. **Install Dependencies**

   ```bash
   npm install lodash
   ```

3. **Use Lodash in Your Project**

   Create a `server.js` file:

   ```javascript
   const _ = require('lodash');

   const greet = _.once(() => {
     console.log('Hello');
   });

   greet(); // Logs: Hello
   greet(); // Does not log anything
   ```

4. **Run the Project**

   Use `nodemon` to run the project and observe live reloading:

   ```bash
   nodemon server.js
   ```
