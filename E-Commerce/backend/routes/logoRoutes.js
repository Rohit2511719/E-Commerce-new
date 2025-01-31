const express = require('express');
const multer = require('multer');
const path = require('path');
const { savelogo, getLogo, deleteLogos } = require('../controllers/logoController.js');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' ' + file.originalname);
    },
});

const upload = multer({ storage });
const router = express.Router();

// Save slider
router.post('/save', upload.single('logoImage'), savelogo);

// Get slider
router.get('/logo', getLogo);

// delete
router.delete("/delete/:id",deleteLogos);

// Export the router
module.exports = router;
