const mongoose = require ('mongoose');

const articleSchema = mongoose.Schema({ 
    menu: { type : String, require : false },
    title: { type: String, required: false },
    description: { type: String, required: false},
    imageDescription: { type: String, required: false},
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Article', articleSchema)