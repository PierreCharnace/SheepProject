const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator') //call mongoose-unique-validator 

const user = mongoose.Schema({
    email: { type: String, required: true, unique: true },//email user with unique validator
    password: { type: String, required: true }            //password registeration
});

userSchema.plugin(uniqueValidator)

module.exports = user.model ('User', user)