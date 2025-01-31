const express = require('express');
const { contactForm, getContact } = require('../controllers/contactController');

const router = express.Router();
//Contact Route
router.post('/save',contactForm);
// get api
router.get('/getcontact', getContact);

module.exports= router;