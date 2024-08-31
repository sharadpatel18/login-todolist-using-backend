const jwt = require('jsonwebtoken');
const Authenticated = (req,res,next) => {
    const auth = req.headers['authorization'];
        if(!auth){
            return res.status(401)
                .json({message:"unauthorized , jwt token is require"});
        }
        try {
            const decode = jwt.verify(auth , process.env.JWT_TOKEN);
            req.user = decode;
            next()
        } catch (error) {
            console.log(error);
            return res.status(401)
                .json({message:'unauthorized , jwt token is require'})
        }
}

module.exports = {Authenticated}