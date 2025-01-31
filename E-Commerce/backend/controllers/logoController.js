const Logo = require('../models/logoModels.js');

// Save logo
const savelogo = async (req, res) => {
    try {
        const { logoname } = req.body;
        const logoImage = req.file ? req.file.filename : null;

        // Validation: Both Logoname and logoImage are required
        if (!logoname || !logoImage) {
            return res.status(400).json({ message: 'logo name and image are required' });
        }

        // Create a new logo object and save it to the database
        const logo = new Logo({ logoname: logoname, logoImage: logoImage });
        await logo.save();

        // Respond with a success message and the saved logo data
        res.status(201).json({ message: 'logo saved successfully', logo });
    } catch (error) {
        console.error('Error saving logo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all logo
const getLogo = async (req, res) => {
    try {
        const logos = await Logo.find();
        res.status(200).json({ message: 'logo fetched successfully', logos });
    } catch (error) {
        console.error('Error fetching logo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//delete Api
const deleteLogos = async (req, res) => {
    try {
        const { id } = req.params;
        // Find category by ID and delete it
        const deletedLogo = await Logo.findByIdAndDelete(id);

        // Check if category was found and deleted
        if (!deletedLogo) {
            return res.status(404).json({ message: 'Logo not found' });
        }

        // Respond with a success message and the deleted category
        res.status(200).json({ message: 'Logo deleted successfully', logo: deletedLogo });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting logo:', error);

        // Send a generic error response
        res.status(500).json({ message: 'Error deleting logo' });
    }
};

module.exports = { savelogo, getLogo,deleteLogos };
