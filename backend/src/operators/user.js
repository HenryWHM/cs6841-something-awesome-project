const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const users = [];

const registerUser = async(username, email, password) => {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ id, username, email, password: hashedPassword });
    return { message: 'User registered successfully!', userID: id };
};

module.exports = { registerUser };