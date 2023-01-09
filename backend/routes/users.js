const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const userCtrl = require('../controllers/userCtrl');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/allProfile', auth, userCtrl.getAllProfile);
router.get('/userProfile', auth, userCtrl.getUserProfile);
router.put('/updateUserProfile', auth, multer, userCtrl.updateProfile);
router.delete('/deleteProfile/:id', auth, userCtrl.deleteProfile);

module.exports = router;