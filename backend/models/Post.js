const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: false },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
    userId: { type: String, required: false },
    undisplay: { type: Boolean, required: false}
});
 module.exports = mongoose.model('Post', postSchema);