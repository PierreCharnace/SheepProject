const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]; //return array with bearer for catch seconde element

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // decode token for verify if it's true

        const userId = decodedToken.userId;
      //  console.log(userId);
/*
      console.log('originaleUrl-->',req.originalUrl);
      userIdUrl = req.originalUrl.split("=")[1];
      console.log('id-->',userIdUrl);
      console.log();*/
     
        if (req.body.userId && req.body.userId !== userId) {    //  compare UserID  if it's ok
            throw 'user ID non valable ! ';
        } else {
            next ();
        } 
    } catch (error){             
        res.status(401).json({ error: 'requête non authentifiée !'});
    }


    
}
