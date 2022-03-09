const mongoose = require ('mongoose');

const articleSchema = mongoose.Schema({ 
    menuId: { type: String, required: true},
   // isAdmin: { type: Boolean, required: true, default: 0},
    title: { type: String, required: false },
    description: { type: String, required: true},
    imageDescription: { type: String, required: false},
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Article', articleSchema)