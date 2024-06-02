# Example: Basics

## Project Structure

```sh
nodejs-basics/
├── data/
│   └── users.txt
├── modules/
│   └── userProcessor.js
├── main.js
└── output/
    └── processed-users.txt
```

## Step 1: Setting Up the Project

1. **Create the directory structure** as shown above.

2. **Create `users.txt` in the `data` directory** with the following content:

```
Alice,30
Bob,25
Charlie,35
```

3. **Create `userProcessor.js` in the `modules` directory** with the following content:

```javascript
// modules/userProcessor.js

const processUser = (user) => {
    const [name, age] = user.split(',');
    return {
        name: name.trim(),
        age: parseInt(age.trim(), 10)
    };
};

const formatUser = (user) => {
    return `Name: ${user.name}, Age: ${user.age}`;
};

module.exports = { processUser, formatUser };
```

## Step 2: Create the Main Application File

4. **Create `main.js` in the root directory** with the following content:

```javascript
// main.js

const fs = require('fs');
const path = require('path');
const { processUser, formatUser } = require('./modules/userProcessor');

const inputFilePath = path.join(__dirname, 'data', 'users.txt');
const outputFilePath = path.join(__dirname, 'output', 'processed-users.txt');

const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outputFilePath);

readStream.on('data', (chunk) => {
    const users = chunk.split('\n');
    users.forEach(user => {
        if (user.trim()) {
            const processedUser = processUser(user);
            const formattedUser = formatUser(processedUser);
            writeStream.write(formattedUser + '\n');
        }
    });
});

readStream.on('end', () => {
    console.log('Data processing completed. Check the output file for results.');
});

readStream.on('error', (err) => {
    console.error('Error reading input file:', err);
});

writeStream.on('error', (err) => {
    console.error('Error writing to output file:', err);
});
```

## Step 3: Running the Application

5. Open a terminal in the project directory and run the following command:

```bash
node main.js
```

## Explanation

1. **Modules**:
    - `userProcessor.js` contains functions to process and format user data.
    - `processUser`: Parses a user string into an object.
    - `formatUser`: Formats a user object into a string.

2. **File System Operations**:
    - `fs.createReadStream`: Reads the `users.txt` file in chunks.
    - `fs.createWriteStream`: Writes processed user data to `processed-users.txt`.

3. **Streams**:
    - The `readStream` reads data from `users.txt` and processes each line.
    - The `writeStream` writes the formatted data to `processed-users.txt`.

## Output

After running the application, `processed-users.txt` in the `output` directory should contain:

```
Name: Alice, Age: 30
Name: Bob, Age: 25
Name: Charlie, Age: 35
```

This example demonstrates how to use Node.js to read, process, and write data using modules, file system operations, and streams.
