const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");


const createPost = async (req, res) => {
    try {
        const { title, description, username, hashtags, mentions } = req.body;
        const files = req.files;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const mediaUrls = files.map(file => `/assets/${username}/${file.filename}`);

        const hashtagsArray = hashtags?.split(',').map(tag => tag.trim().toLowerCase()) || [];
        const mentionUsernames = mentions?.split(',').map(u => u.trim());
        const mentionedUsers = await User.find({ username: { $in: mentionUsernames } });
        const mentionIds = mentionedUsers.map(u => u._id);

        const newPost = new Post({
            author: user._id,
            title, // ✅ saving title
            description, // ✅ saving description
            media: mediaUrls,
            hashtags: hashtagsArray,
            mentions: mentionIds,
            privacy: "public",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await newPost.save();
        res.status(200).json({ message: "Post created successfully", post: newPost });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createPost };
