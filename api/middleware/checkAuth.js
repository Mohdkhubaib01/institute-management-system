const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,'iics offline classes')
        console.log(verify)
        next();
    }
    catch{
        return res.status(401).json({
            msg: 'invalid token'
        })
    }
}