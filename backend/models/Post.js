const mongoose = require ('mongoose');

const Post = mongoose.Schema({
    title: { type: String, required: false },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
    userId: { type: String, required: true },
});
 module.exports = mongoose.model('Post', Post);