const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-comment');
const commentCtrl = require('../controllers/commentCtrl');

router.post('/new', auth, multer, commentCtrl.createComments);
router.put('/modify/:id', auth, multer, commentCtrl.modifyComments);
router.delete('/delete/:id', auth, multer, commentCtrl.deleteComments);
router.get('/getOne/:id', auth, commentCtrl.getOneComments);
router.get('/getAll/', auth, commentCtrl.getAllComments);

module.exports = router;