const User = require('../models/User');

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already in use.' });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })

        if (!user) return res.status(404).json({ message: 'User not found' })
        if (user.password !== password)
            return res.status(401).json({ message: 'Invalid password' })

        res.status(200).json({ message: 'Login successful' , user })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = { signupUser, loginUser }
