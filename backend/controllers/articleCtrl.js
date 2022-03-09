const Post  = require('../models/Post');
const fs = require('fs');
const Article = require('../models/Article')

exports.createArticles = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    delete articleObject._id; // delete _id in requeste body 
    const adminParams = req.params.isAdmin;

    if (articleObject !== true) {
        return res.status(401).json({ 'error': `${adminParams}` });
    } else {
        next()
    }
    const article = new Article ({ 
        ...articleObject,
        imageDescription : `${req.protocol}://${req.get('host')}/imageAdmin/${req.file.filename}`
    })

    article.save()
        .then((article) => res.status(201).json({ message : article}),
        )
        .catch(error => res.status(400).json({ error : error }));

};

exports.modifyArticles = (req, res, next) => {
   
    const articleObject = req.file ?
    {...JSON.parse(req.body.article),
    imageDescription : `${req.protocol}://${req.get('host')}/imageAdmin/${req.file.filename}`} : {...req.body };
    
    const adminParams = req.params.isAdmin
    console.log(adminParams);

    if (adminParams !== true) {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }
  
    Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(403).json({ error }));
};

exports.deletePosts = (req, res, next) => {

    Post.findOne({ _id: req.params.id }, )

    .then(article => {
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
        .then(post => res.status(200).json(post)) //If it's Ok send back one sauce
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllPosts = (req, res, next) => {
    Post.find() // find all objects
        .then(post => res.status(200).json(post)) //send back array of all sauces
        .catch( error => res.status(400).json({ error })); // send back an error
};
