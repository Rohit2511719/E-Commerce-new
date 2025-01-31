const Category = require('../models/categorymodels');
const savecategory = async(req, res)=>{
    try{
        const{categoryname} = req.body;
        // create a new user
        const category = new Category({categoryname});
        await category.save();
        res.status(201).json({message:"Category saved Successfully!!!", category:category});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server errorr"});
    }
};

//get api
const getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json({message:"Categories fetch Sucessfull", categories});
    }
    catch(error){
        console.error("Error in fetching categories", error);
        res.status(500).json({message:"Internal Server Error"});
    };
}
// delete Api
const deleteCategories = async (req, res) => {
    try {
        const { id } = req.params;
        // Find category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(id);

        // Check if category was found and deleted
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Respond with a success message and the deleted category
        res.status(200).json({ message: 'Category deleted successfully', category: deletedCategory });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting category:', error);

        // Send a generic error response
        res.status(500).json({ message: 'Error deleting category' });
    }
};


module.exports = { savecategory, getCategories,deleteCategories};