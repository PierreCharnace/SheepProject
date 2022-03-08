const mongoose = require ('mongoose');

const commentSchema = mongoose.Schema({ 
    comment: { type: String, required: true},
    imageDescription: { type: String, required: false},
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Comment', commentSchema)