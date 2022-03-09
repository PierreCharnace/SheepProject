const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleCtrl');
const multer = require('../middleware/multer-admin');
const auth = require('../middleware/auth');
//const adminConnection = require ('../middleware/admin-connection');

router.post('/new/:isAdmin',auth, multer , articleCtrl.createArticles);
//router.put('/:isAdmin/modify/:id', auth, multer, articleCtrl.modifyArticles);
//router.delete('/delete/:id', auth, articleCtrl.deleteArticles);
//router.get('/getOneArticles/:id', auth, articleCtrl.GetOneArticles);
//router.get('/getAll/', auth, articleCtrl.getAllArticles);

module.exports = router;