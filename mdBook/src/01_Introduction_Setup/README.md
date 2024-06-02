# Node.js - Introduction & Setup

## Introduction

In this tutorial, we will embark on a detailed journey to understand Node.js, its setup, and its fundamental concepts. We will avoid informal language and focus on a precise and scientific approach, ensuring the content reflects the rigor and standards of the field.

## What is Node.js?

Node.js is a runtime environment that allows JavaScript to be executed on the server-side, outside the browser. Traditionally, JavaScript was confined to the browser, where it was used to add interactivity to web pages. However, Node.js enables JavaScript to run directly on a computer or server, providing a powerful tool for backend development.

## The V8 Engine

The V8 engine, developed by Google, is a key component of Node.js. It is a high-performance JavaScript engine written in C++ that compiles JavaScript into machine code at runtime. This allows JavaScript to be executed efficiently outside the browser.

## Node.js and the V8 Engine

Node.js is essentially a wrapper around the V8 engine. By incorporating the V8 engine, Node.js allows JavaScript to be compiled and executed directly on a computer or server. Additionally, Node.js provides extra functionality, enabling JavaScript to perform tasks typically associated with server-side languages, such as reading and writing files, connecting to databases, and acting as a server.

## Why Use Node.js?

Node.js offers several advantages for web development:

1. **Single Language for Frontend and Backend**: If you are already familiar with JavaScript, there is no need to learn a new server-side language. Node.js allows you to use JavaScript on both the frontend and backend.
2. **Community and Ecosystem**: Node.js has a vast and active community, providing a wealth of third-party packages and tools to aid in web development.
3. **Performance**: The V8 engine compiles JavaScript into machine code, ensuring high performance.

## Installing Node.js

To begin using Node.js, you need to install it on your computer.

## Checking Existing Installation

First, check if Node.js is already installed:

1. Open a terminal.
2. Type `node -v` and press Enter.
3. If Node.js is installed, you will see the version number. If not, or if the version is outdated, follow the steps below to install or update Node.js.

## Installing Node.js

1. Go to the [Node.js website](https://nodejs.org).
2. Click on the download button to install the latest version.
3. Run the installer and follow the prompts to complete the installation.
4. After installation, close and reopen the terminal.
5. Verify the installation by typing `node -v` again.

## Running JavaScript with Node.js

With Node.js installed, you can now run JavaScript directly on your computer.

## Running JavaScript in the Terminal

1. Open a terminal.
2. Type `node` and press Enter to start the Node.js REPL (Read-Eval-Print Loop).
3. You can now type JavaScript code directly into the terminal. For example:

   ```javascript
   5 + 5
   ```

   Press Enter, and you will see the result `10`.

## Creating and Running a JavaScript File

1. Create a new file named `test.js`.
2. Open the file in a text editor (e.g., Visual Studio Code, Sublime Text, Atom).
3. Add the following code:

   ```javascript
   const name = 'Mario';
   console.log(name);
   ```

4. Save the file.
5. In the terminal, navigate to the directory containing `test.js`.
6. Run the file with the command:

   ```bash
   node test.js
   ```

   You should see `Mario` printed in the terminal.

## Setting Up a Development Environment

## Visual Studio Code

Visual Studio Code (VS Code) is a popular and powerful text editor for JavaScript and Node.js development.

1. Download and install VS Code from [code.visualstudio.com](https://code.visualstudio.com).
2. Open VS Code and create a new project folder.
3. Open the terminal in VS Code (`View > Terminal`).

## Creating a Project Directory

1. In the terminal, navigate to your desired location and create a new directory:

   ```bash
   mkdir node-crash-course
   cd node-crash-course
   ```

2. Open the directory in VS Code:

   ```bash
   code .
   ```

## Writing and Running JavaScript in VS Code

1. Create a new file named `test.js`.
2. Add the following code:

   ```javascript
   const name = 'Yoshi';
   console.log(name);
   ```

3. Save the file.
4. In the VS Code terminal, run the file:

   ```bash
   node test.js
   ```

   You should see `Yoshi` printed in the terminal.
