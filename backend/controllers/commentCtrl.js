const Comment  = require('../models/Comment');
const fs = require('fs');
const auth = require('../middleware/auth');


exports.createComments = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id; // delete _id in requeste body 
    const comment = commentObject.comment;
    const userIdInObject = commentObject.userId;
    const postIdInObject = commentObject.postId;

    if (comment == null || userIdInObject == null || postIdInObject == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }
    
    const commentSend = new Comment ({ 
        ...commentObject,
        imageComment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    commentSend.save()
        .then((commentSend) => res.status(201).json({ message : commentSend}),
        )
        .catch(error => res.status(400).json({ error : error }));
};

exports.modifyComments = (req, res, next) => {
   
    const commentObject = req.file ?
    {...JSON.parse(req.body.comment),
    imageComment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body };
    
    const comment = commentObject.comment;
    const userId = commentObject.userId;
    const postId = commentObject.postId;
        console.log("-->", commentObject);
    if (comment == null || userId == null || postId == null) {
        return res.status(401).json({ 'error': 'missing parameters' });
    }
    Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id})
        .then(commentSend => res.status(200).json(commentSend))
        .catch(error => res.status(403).json({ error }));
       };  

exports.deleteComments = (req, res, next) => {

    Comment.findOne({ _id: req.params.id }, )

    .then(comment => {
        const filename = comment.imageComment.split('/imagesComment/')[1];//extract name to delete
        fs.unlink(`imagesComment/${filename}`, () => { // delete with fs.unlink
            Comment.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ message: 'Problème pour effacer le commentaire' }))
    
};

exports.getOneComments = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })  //  find one object with the id
        .then(comment => res.status(200).json(comment)) //If it's Ok send back one sauce
        .catch( error => res.status(404).json({ meesage : 'Impossible de charger les commentaires' })); // If isn't Ok send back an error
};

exports.getAllComments = (req, res, next) => {
    Comment.find() // find all objects
        .then(comment => res.status(200).json(comment)) //send back array of all sauces
        .catch( error => res.status(400).json({ error })); // send back an error
};
