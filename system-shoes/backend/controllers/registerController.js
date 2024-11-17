const UserRepository = require('../repository/userRepository');

exports.register = async (req, res) => {
    try {
        const userData = req.body;
        console.log("datos del body" + userData)
        const user = await UserRepository.registerUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
