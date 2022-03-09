const mongoose = require ('mongoose');

const menuSchema = mongoose.Schema({ 
    menu: { type : String, require : false },
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Menu', menuSchema)