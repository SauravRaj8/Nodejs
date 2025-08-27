const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token)  res.sendStatus(401);

    const jwtToken = process.env.JWT_SECRET || "anclknlksncklnlkcnlknkcn";
    try{
        const userData = jwt.verify(token, jwtToken);
        req.userId = userData.userId;
        next();
    } catch(err){
        res.sendStatus(401);
    }
}