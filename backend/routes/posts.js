const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')

router.post('/new', auth, multer, postCtrl.createPosts);/////
router.put('/modify/:id', auth, multer, postCtrl.modifyPosts);///////
router.delete('/delete/:id', auth, postCtrl.deletePosts);////// ALL ROUTES AND WHAT THEY DOING
router.get('/getOne/:id', auth, postCtrl.getOnePosts);///
router.get('/getAll/', auth, postCtrl.getAllPosts);////
//6222827b83ed235322d0c7ff
//62275bdc8a28d3c42bb28ff5
module.exports = router;