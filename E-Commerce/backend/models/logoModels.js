const mongoose = require('mongoose');
const logoSchema = new mongoose.Schema({
    logoname:{
        type:String,
        required:true
    },
    logoImage:{
        type:String,
    },
});
const Logo = mongoose.model('Logo', logoSchema);
module.exports=Logo;