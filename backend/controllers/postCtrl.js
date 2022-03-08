const Post  = require('../models/Post');
const fs = require('fs');
const auth = require('../middleware/auth');
//const { features, title } = require('process');

exports.createPosts = (req, res, next) => {

    console.log('req', req.file)
    //const description = req.post.description;
    const userIdUrl = req.originalUrl.split('=')[1];
    const postObject = JSON.parse(req.body.post)
    const description = postObject.description

    if (description == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }
    
    delete postObject._id; // delete _id in requeste body 
    const post = new Post ({ 

        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        ,title : postObject.title
        ,userId :  userIdUrl
        ,description : postObject.description
    })
    //console.log('POST',post);
    delete post._id
    console.log('POST--',post._id);
    console.log('--->POST2',post);
    post.save()
        .then((post) => res.status(201).json({ message : post}),
        )
        .catch(error => res.status(400).json({ 'error' : post }));
};

exports.modifyPosts = (req, res, next) => {
   // const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
   // const title = req.body.title;
    const description = req.body.description;
   // const userId = req.params.id
    //const imageUrl = req.body.imageUrl;

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