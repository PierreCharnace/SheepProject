const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleCtrl');
const multer = require('../middleware/multer-admin');
const auth = require('../middleware/auth');

router.post('/newArticle/:isAdmin', auth, multer, articleCtrl.createArticles);
router.put('/:isAdmin/modify/:id', auth, multer, articleCtrl.modifyArticles);
router.delete('/:isAdmin/delete/:id', auth, articleCtrl.deleteArticles);
router.get('/getOneArticles/:id', auth, articleCtrl.getOneArticles);
router.get('/getAll/', auth, articleCtrl.getAllArticles);

module.exports = router;