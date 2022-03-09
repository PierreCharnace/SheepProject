const Article = require('../models/Menu')
const fs = require('fs');

exports.createMenu = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    delete articleObject._id; // delete _id in requeste body 
    const admin = req.params.isAdmin;
console.log(admin);

    if (admin !== "1") {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
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
    
    const admin = req.params.isAdmin;

    if (admin!== "1") {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }
  
    Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(403).json({ error }));
};

exports.deleteArticles = (req, res, next) => {
    const admin = req.params.isAdmin;

    if (admin !== "1") {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }

    Article.findOne({ _id: req.params.id }, )

    .then(article => {
        const filename = article.imageDescription.split('/imageAdmin/')[1];//extract name to delete
        fs.unlink(`imageAdmin/${filename}`, () => { // delete with fs.unlink
            Article.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Article supprimé !'}))
        .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
    
};

exports.getOneArticles = (req, res, next) => {
    
    Article.findOne({ _id: req.params.id })  //  find one object with the id
        .then(article => res.status(200).json(article)) //If it's Ok send back one article
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllArticles = (req, res, next) => {
    Article.find() // find all objects
        .then(article => res.status(200).json(article)) //send back array of all article
        .catch( error => res.status(400).json({ error })); // send back an error
};
