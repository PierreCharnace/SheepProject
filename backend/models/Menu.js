const mongoose = require ('mongoose');

const menuSchema = mongoose.Schema({ 
    menu: { type : String, required : true },
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Menu', menuSchema)