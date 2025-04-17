const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/postController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.body.username;
        const postId = new Date().getTime().toString(); // Unique
        const uploadPath = path.join(
            __dirname, '../../client/public/assets', username, postId
        );

        fs.mkdirSync(uploadPath, { recursive: true });
        req.postPath = uploadPath;
        req.relativePath = `/assets/${username}/${postId}`;
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


router.post("/create", upload.array("images", 4), createPost);

module.exports = router;
