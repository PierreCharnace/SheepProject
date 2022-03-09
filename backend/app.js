const express = require('express')
const app = express();
const mongoose = require('mongoose');
//router
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');
const menuRoutes = require('./routes/menu');

const path = require('path');
//db connect

mongoose.connect('mongodb+srv://Ervan_ST:Poups.123@cluster0.qzdrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/imagesComment', express.static(path.join(__dirname, 'imagesComment')));
app.use('/imageAdmin', express.static(path.join(__dirname, 'imageAdmin')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/menu', menuRoutes);


module.exports = app;