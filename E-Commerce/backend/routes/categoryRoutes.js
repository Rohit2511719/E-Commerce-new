const express = require('express');
const {savecategory, getCategories,deleteCategories} = require('../controllers/categoryController');

const router = express.Router();
//Save Route
router.post('/save',savecategory);
//get route
router.get("/getcategory",getCategories);
// delete
router.delete("/delete/:id",deleteCategories);

module.exports = router;