const mongoose = require ('mongoose');

const commentSchema = mongoose.Schema({ 
    comment: { type: String, required: true},
    userId: {type: String, required: true },
    postId: {type: String, required: true},
    imageComment: { type: String, required: false},
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false},
})

module.exports = mongoose.model ('Comment', commentSchema)