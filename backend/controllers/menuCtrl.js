const Article = require('../models/Menu')
const fs = require('fs');
const Menu = require('../models/Menu')

exports.createMenu = (req, res, next) => {
    const menuObject = req.body.menu;
    const admin = req.params.isAdmin;

    if (admin !== "1") { /// condition admin obligatory
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }
    
    const menu = new Menu ({  // new menu created
        menu : menuObject
    })

    menu.save() // save menu in database
        .then((menu) => res.status(201).json({ message : menu}),
        )
        .catch(error => res.status(400).json({ error : error }));
};

exports.modifyMenu = (req, res, next) => {
   
    const menuObject = req.body.menu;
    const admin = req.params.isAdmin;

    if (admin!== "1") {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }

    const menu = new Menu ({
        _id: req.params.id,
        menu: menuObject
    });
  
    Menu.updateOne({ _id: req.params.id }, menu)
        .then(article => res.status(200).json(article))
        .catch(error => res.status(403).json({ error }));
};

exports.deleteMenu = (req, res, next) => {
    const admin = req.params.isAdmin;

    if (admin !== "1") {
        return res.status(401).json({ 'error': "Vous n'avez pas les droits nécessaires" });
    }

    Menu.findOne({ _id: req.body.id }, )
    .then(menu => {
        Menu.deleteOne({_id: req.params.id })
            .then(() => res.status(200).json({ message: 'Menu supprimé !'}))
            .catch(error => res.status(404).json({ error }));
        })

    .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
    
};

exports.getOneMenu = (req, res, next) => {
    
    Menu.findOne({ _id: req.params.id })  //  find one object with the id
        .then(menu => res.status(200).json(menu)) //If it's Ok send back one article
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllMenu = (req, res, next) => {
    Menu.find() // find all objects
        .then(menu => res.status(200).json(menu)) //send back array of all article
        .catch( error => res.status(400).json({ error })); // send back an error
};
