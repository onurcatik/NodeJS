const fs = require('fs');
const path = require('path');
const { processUser, formatUser } = require('./modules/userProcessor');

const inputFilePath = path.join(__dirname, 'data', 'users.txt');
const outputFilePath = path.join(__dirname, 'output', 'processed-users.txt');

// Debugging logs
console.log('Current directory:', __dirname);
console.log('Input file path:', inputFilePath);
console.log('Output file path:', outputFilePath);

// Ensure the output directory exists
if (!fs.existsSync(path.join(__dirname, 'output'))) {
    fs.mkdirSync(path.join(__dirname, 'output'));
}

// Verify the input file exists
if (!fs.existsSync(inputFilePath)) {
    console.error('Input file does not exist:', inputFilePath);
    process.exit(1);
}

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
