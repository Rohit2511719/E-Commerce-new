const mongoose = require('mongoose');
const sliderSchema = new mongoose.Schema({
    slidername:{
        type:String,
        required:true
    },
    sliderImage:{
        type:String,
    },
});
const Slider = mongoose.model('Slider', sliderSchema);
module.exports=Slider;