const {getUser,setUser} = require("../services/Auth");

async function validateUser(req,res,next){

    if(req.cookies["hnd"]){
        res.user=getUser(req.cookies["hnd"])
    }
    else{
        res.user=""
    }
    next();
}

module.exports={
    validateUser
}