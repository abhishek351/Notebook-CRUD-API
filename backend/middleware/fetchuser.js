var jwt = require('jsonwebtoken');

secret_data="abhishekis$boy"

const fetchuser =(req,res,next)=>{
    
    const token = req.header("auth-token")
    if (!token){
        res.status(401).send({error:"authentcate using valid tokene"})
    }

    try {
        const data =jwt.verify(token,secret_data)
        req.user=data.user;
        next()

        
    } catch (error) {
        
        res.status(401).send({error:"authentcate using valid tokene"})
    }


}


module.exports=fetchuser;
