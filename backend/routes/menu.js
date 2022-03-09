const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menuCtrl');
const auth = require('../middleware/auth')

router.post('/new', auth , menuCtrl.createMenu);
//router.put('modify/:id', auth, menuCtrl.modifyMenu);
//router.delete('/delete/:id', auth, menuCtrl.deleteMenu);
//router.get('/getOneArticles/:id', auth, menuCtrl.GetOneMenu);
//router.get('/getAll/', auth, menuCtrl.getAllMenu);

module.exports = router;