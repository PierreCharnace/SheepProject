const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')

router.post('/new', auth, multer, postCtrl.createPosts);/////
//router.put('/modify/:id', auth, multer,  postCtrl.modifyposts);///////
//router.delete('/delete/:id', auth, postCtrl.deletePosts);////// ALL ROUTES AND WHAT THEY DOING
//router.get('/getOne/:id', auth, postCtrl.getOnePosts);///
//router.get('/getAll/', auth, postCtrl.getAllPosts);////


module.exports = router;