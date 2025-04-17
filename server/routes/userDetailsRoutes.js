const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { userDetailsController, updateUser } = require('../controllers/userDetailsController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.body.username;
        const dir = path.join(__dirname, '../../client/public/assets', username);
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, 'pfp.jpg');
    }
});

const upload = multer({ storage });

// Routes
router.post('/userdetails', userDetailsController);
router.patch('/updateUser', upload.single('image'), updateUser);

module.exports = router;
