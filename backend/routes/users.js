const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/allProfile', auth, userCtrl.getAllProfile);
router.get('/userProfile/:id', auth, userCtrl.getUserProfile);
router.put('/updateUserProfile/:id', auth, userCtrl.updateProfile);
//router.delete('/delete', auth, userCtrl.delete);

module.exports = router;