const Slider = require('../models/sliderModels');

// Save slider
const saveslider = async (req, res) => {
    try {
        const { slidername } = req.body;
        const sliderImage = req.file ? req.file.filename : null;

        // Validation: Both Slidername and sliderImage are required
        if (!slidername || !sliderImage) {
            return res.status(400).json({ message: 'Slider name and image are required' });
        }

        // Create a new slider object and save it to the database
        const slider = new Slider({ slidername: slidername, sliderImage: sliderImage });
        await slider.save();

        // Respond with a success message and the saved slider data
        res.status(201).json({ message: 'Slider saved successfully', slider });
    } catch (error) {
        console.error('Error saving slider:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all sliders
const getSlider = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json({ message: 'Sliders fetched successfully', sliders });
    } catch (error) {
        console.error('Error fetching sliders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { saveslider, getSlider };
