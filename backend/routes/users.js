const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);
//router.get('/userProfile',userCtrl.getUserProfile);
//router.get('/allProfile', userCtrl.getAllProfile);
//router.put('/updateUserProfile', userCtrl.updateProfile);
//router.delete('/delete', userCtrl.delete);

module.exports = router;