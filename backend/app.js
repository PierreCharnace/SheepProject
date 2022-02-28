const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Ervan_ST:Poups.123@cluster0.qzdrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next ) => {
    console.log("ok");
    next();
});


module.exports = app;