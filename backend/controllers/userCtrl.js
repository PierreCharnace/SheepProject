const User = require ('../models/User');
const asyncLib = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');

//REGEX
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const encryptEmail = cryptojs.HmacSHA256(req.body.email, "SECRET_KEY_FOR_EMAIL").toString();
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const password = req.body.password;

    if (email == null || lastName == null || firstName == null || password == null) {
        return res.status(400).json({ 'error': 'paramètres manquants' });
    }
    if (lastName.length >= 30 || lastName.length <= 1) {
        return res.status(400).json({ 'error': 'Nom non comformes il doit être compris entre 2 et 30 caractères'});
    }
    if (firstName.length >= 20 || firstName.length <= 1) {
        return res.status(400).json({ 'error': 'Prénom non comformes il doit être compris entre 2 et 20 caractères'});
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'email non valide' })
    }
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'mot de passe non valide il doit être compris entre 4 et 8 caractères et contenir au moins 1 nombre'})
    }

    bcrypt.hash(password, 10) //crypt password
    .then(hash => {
        const user = new User ({    //
            email: encryptEmail, //-->> take pasword and create new user with password crypted and mail adresse in req.body
            password: hash,          //
            firstName: firstName,
            lastName: lastName,
        });
        user.save()                                                                 //
            .then(() => res.status(201).json({ message: 'utilisateur créé !' }))    // save user in bd
            .catch(error => res.status(400).json({ error }))                        //
    })
    .catch(error => res.status(500).json({ error }));
};

// connection with current user 
/*
exports.login = (req, res, next) => {
    //params   
const email = req.body.email;
const password = req.body.password;
const encryptEmail = cryptojs.HmacSHA256(req.body.email, 'SECRET_KEY_FOR_EMAIL').toString();

if (email == null || password == null) {
    return res.status(400).json({ 'error': 'paramètres manquants' });
}

asyncLib.waterfall([
function(done) {
User.findOne({ 
  where: { email: encryptEmail }})
.then(function(userFound) {
  done(null, userFound);
})
.catch(function(err) {
  return res.status(500).json({ 'error': 'unable to verify user' });
});
},
function(userFound, done) {
if (userFound) {
  bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
    done(null, userFound, resBycrypt);
  });
} else {
  return res.status(404).json({ 'error': 'user not exist in DB' });
}
},
function(userFound, resBycrypt, done) {
if(resBycrypt) {
  done(userFound);
} else {
  return res.status(403).json({ 'error': 'invalid password' });
}
}
], function(userFound) {
if (userFound) {
 res.status(200).json({
    userId: userFound._id,// If it's OK send back user ID ands token
    token: jwt.sign(
        { userId: userFound._id },
        'RANDOM_TOKEN_SECRET',  //secret key for encode
        { expiresIn: '24h' }
    )
});
} else {
return res.status(500).json({ 'error': 'cannot log on user' });
}
});
};*/

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const encryptEmail = cryptojs.HmacSHA256(req.body.email, "SECRET_KEY_FOR_EMAIL").toString();
    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'paramètres manquants' });
    }
    User.findOne({ email: encryptEmail }) // collect user with email
     
        .then(user => {
           
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
                bcrypt.compare(req.body.password, user.password) //compare password registered in bd(hash) with new entry
                .then( valid => {
                 if (!valid) {
                    return res.status(401).json({ error: 'mot de passe incorrect' });// If isn't good send an error
                 }
                 
                res.status(200).json({//
                    
                    userId: user._id,// If it's OK send back user ID ands token
                    token : jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',  //secret key for encode
                        { expiresIn: '24h' }
                    )
                        
                });console.log(user._id)
            })
                .catch(error => res.status(500).json({ error: 'problème' }));
    })

       .catch(error => res.status(500).json({ error }));
};

