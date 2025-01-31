const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveslider, getSlider } = require('../controllers/sliderController');

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
router.post('/save', upload.single('sliderImage'), saveslider);

// Get slider
router.get('/slider', getSlider);

// Export the router
module.exports = router;
