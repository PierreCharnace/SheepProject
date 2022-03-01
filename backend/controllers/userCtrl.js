const User = require ('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('../middleware/auth');
const cryptojs = require('crypto-js');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //crypt password
    .then(hash => {
        const user = new User ({    //
            email: req.body.email, //-->> take pasword and create new user with password crypted and mail adresse in req.body
            password: hash,          //
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        user.save()                                                                 //
            .then(() => res.status(201).json({ message: 'utilisateur créé !' }))    // save user in bd
            .catch(error => res.status(400).json({ error }))                        //
    })
    .catch(error => res.status(500).json({ error }));
};

// connection with current user 
exports.login = (req, res, next) => {
    console.log('Connecté en tant que : ' + req.body.email);
    User.findOne({ email: req.body.email }) // collect user with email
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
              }
            bcrypt.compare(req.body.password, user.password) //compare password registered in bd(hash) with new entry
                .then( valid => {
                 if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });// If isn't good send an error
                 }
                res.status(200).json({//
                    userId: user._id,// If it's OK send back user ID ands token
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',  //secret key for encode
                        { expiresIn: '24h' }
                    )
                        
                });
            })
            .catch(error => res.status(500).json({ error }));
    })

       .catch(error => res.status(500).json({ error }));
};

