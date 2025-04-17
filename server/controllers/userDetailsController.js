const User = require('../models/User');

const userDetailsController = async (req, res) => {
    try {
        const { username } = req.body; // ✅ Fix here
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
const path = require('path');

const updateUser = async (req, res) => {
    try {
        const { _id } = req.body;

        // Extract user fields excluding _id
        const updatedFields = { ...req.body };
        delete updatedFields._id;

        // If image is uploaded
        if (req.file) {
            const username = req.body.username;
            const imagePath = `/assets/${username}/pfp.jpg`;
            updatedFields.profileImage = imagePath;
        }

        const user = await User.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { userDetailsController , updateUser };
