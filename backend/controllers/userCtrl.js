const User = require ('../models/User');

const bcrypt = require('bcryptjs');
const jwtUtils = require('../middleware/jwt.utils');
const cryptojs = require('crypto-js');