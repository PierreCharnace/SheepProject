const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/allProfile', auth, userCtrl.getAllProfile);
router.get('/userProfile/:id', auth, userCtrl.getUserProfile);
router.put('/updateUserProfile/:id', auth, userCtrl.updateProfile);
router.delete('/deleteProfile/:id', auth, userCtrl.deleteProfile);
//router.delete('deleteProfileAdmin/:id', auth, userCtrl.deleteProfileAdmin);

module.exports = router;

//6222013d4ddd60ae390e0a1a