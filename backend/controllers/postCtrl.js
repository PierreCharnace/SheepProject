const Post  = require('../models/Post');
const fs = require('fs');
const auth = require('../middleware/auth')

exports.createPosts = (req, res, next) => {

    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.params.id
    //const imageUrl = req.body.imageUrl;
    if ( description == null && title == null && imageUrl == null && userId == null) {
        
    }
    if (description == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }
    const post = new Post ({ 
        title : title,  //copy fields inside req
        description : description,
     //   imageUrl : req.body.imageUrl,       
        imageUrl: imageUrl,
        userId : userId
        
    })

    /*const postObject = JSON.parse(req.body.post);
    delete postObject._id; // delete _id in requeste body 
    console.log(postObject);
   
 /*  if ( req.body == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }*/
    post.save()
        .then(() => res.status(201).json({ message : 'Post bien enregistée !'}),
        )
        .catch(error => res.status(400).json({ 'error' : 'impossible' }));
};

exports.modifyPosts = (req, res, next) => {
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.params.id
    //const imageUrl = req.body.imageUrl;
    if ( description == null && title == null && imageUrl == null && userId == null) {
        
    }
    if (description == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }
  
    Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(403).json({ error }));
};
/*
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