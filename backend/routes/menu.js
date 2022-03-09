const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menuCtrl');
const auth = require('../middleware/auth')

router.post('/new/:isAdmin', auth , menuCtrl.createMenu);
router.put('/:isAdmin/modify/:id', auth, menuCtrl.modifyMenu);
router.delete('/:isAdmin/delete/:id', auth, menuCtrl.deleteMenu);
router.get('/getOneMenu/:id', auth, menuCtrl.getOneMenu);
router.get('/getAllMenu/', auth, menuCtrl.getAllMenu);

module.exports = router;