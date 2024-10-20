const { registerUser } = require('../operators/user')

const register = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const result = registerUser(username, email, password);
        console.log(result)
        res.status(201).json(result);
    } catch(error) {
        res.status(400).json({ message: 'Unsuccessful registration!' });
    }
};

module.exports({ register });