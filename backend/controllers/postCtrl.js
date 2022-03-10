const Post  = require('../models/Post');
const fs = require('fs');

exports.createPosts = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id; // delete _id in requeste body 
    const description = postObject.description
    const userIdInObject = postObject.userId

    if (description == null || userIdInObject == null) {            ///// fields control
        return res.status(401).json({ 'error': 'missing parameters' });
    }
    
    const post = new Post ({ //create new post
        ...postObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    post.save() ////////////save post in db
        .then((post) => res.status(201).json({ message : post}),
        )
        .catch(error => res.status(400).json({ error : error }));
};

exports.modifyPosts = (req, res, next) => {
   
    const postObject = req.file ?
    {...JSON.parse(req.body.post),//////copy fields and translate with JSON.parse
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body };
    
    const description = postObject.description;
    const userId = postObject.userId;

    if (description == null || userId == null) {    /////fields control
        return res.status(401).json({ 'error': 'missing parameters' });
    }
  
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(403).json({ error }));
};

exports.deletePosts = (req, res, next) => {

    Post.findOne({ _id: req.params.id }, )

    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];//extract name to delete
        fs.unlink(`images/${filename}`, () => { // delete with fs.unlink
            Post.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
    
};

exports.getOnePosts = (req, res, next) => {
    Post.findOne({ _id: req.params.id })  //  find one object with the id
        .then(post => res.status(200).json(post)) //If it's Ok send back one article
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllPosts = (req, res, next) => {
    Post.find() // find all objects
        .then(post => res.status(200).json(post)) //send back array of all article
        .catch( error => res.status(400).json({ error })); // send back an error
};
