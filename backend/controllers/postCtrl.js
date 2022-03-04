const Post  = require('../models/Post');
const fs = require('fs');

exports.createPosts = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id; // delete _id in requeste body 
    const post = new Post ({ 
        title : postObject.title,  //copy fields inside req
        description : postObject.description,
       // imageUrl : postObject.imageUrl,
        userId : postObject.userId,
       
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        
    })
    post.save()
        .then(() => res.status(201).json({ message : 'Post bien enregistée !'}),
        )
        .catch(error => res.status(400).json({ 'error' : 'impossible' }));
};
/*
exports.modifySauces = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(403).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];//extract name to delete
        fs.unlink(`images/${filename}`, () => { // delete with fs.unlink
            Sauce.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
    
};

exports.getOneSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })  //  find one object with the id
        .then(sauce => res.status(200).json(sauce)) //If it's Ok send back one sauce
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // find all objects
        .then(sauce => res.status(200).json(sauce)) //send back array of all sauces
        .catch( error => res.status(400).json({ error })); // send back an error
};*/