// Desc: Middleware to check if user is authenticated
const jwt = require('jsonwebtoken');

// function to check if user is authenticated
function auth(req, res, next){
    const token = req.header('x-auth-token');
    
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    let id;

    //check if token is valid
    try{
        const{ userId }= jwt.verify(token, process.env.JWT_SECRET_KEY)
        id = userId;
    } catch(err){
        return res.status(401).json({ error: 'Invalid token.' });
    }

    //check if user is authenticated
    if(id){
        req.user = {id};
        return next();
    }

    res.status(401).json({ error: 'Access denied.' });
}

// Export the function
module.exports = auth;

//-------------------...ooo000 End of file 000ooo...------------------------//