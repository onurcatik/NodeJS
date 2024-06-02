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
