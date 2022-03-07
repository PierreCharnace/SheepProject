const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator') //call mongoose-unique-validator 

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },//email user with unique validator
    password: { type: String, required: true },            //password registeration
    lastName: { type: String, required: true },
    firstName: { type: String, required: true},
    imageUrl: { type: String,default: 0, required: true},
    isAdmin: {type: Boolean,default: 0, required: false},
    isModo: {type: Boolean,default: 0, required: false},
    undisplay: { type: Boolean,default: 0, required: false},
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model ('User', userSchema)