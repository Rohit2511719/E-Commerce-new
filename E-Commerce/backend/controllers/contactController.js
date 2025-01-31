const Contact = require('../models/contactmodels');
const contactForm = async(req, res)=>{
    try{
        const{name, email, phone,address,message} = req.body;
        // create a new user
        const user = new Contact({name, email, phone,address,message});
        await user.save();
        res.status(201).json({message:"Contact form Successfully!!!", user:user});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server errorr"});
    }
};

// get api
const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ message: 'Contact fetched successfully', contacts });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={contactForm,getContact};