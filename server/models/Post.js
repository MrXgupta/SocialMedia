const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    media: [String], // URLs or relative paths
    hashtags: [String],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    location: {
        name: String,
        coordinates: {
            latitude: Number,
            longitude: Number,
        },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    privacy: { type: String, default: "public" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
