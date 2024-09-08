const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const generatorToken = (user) =>{
    
    return jwt.sign({user : user.id},process.env.SECRET, {expiresIn : '1h'})
}
const verifToken = (req,res,next ) => {
    const userToken = req.session.token;
    
    
    if (!userToken) {
        res.status(401).json({Message : 'not authorized'})
    }else{
        jwt.verify(userToken,process.env.SECRET,(error,decoded) => {
            if (error) {
                return res.status(401).json({message : 'Token not found'})
            }
            req.user = decoded.user
            next()
        })
    }
   
}
module.exports = {
    generatorToken,
    verifToken
}