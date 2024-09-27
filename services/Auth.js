const jwt = require("jsonwebtoken");

const secretKey = "pavan1907@";

const setUser =(user)=>{

    const payload={
        id:user._id,
        email:user.email,
        name:user.name
    }
    return jwt.sign(payload,secretKey);
}

const getUser=(token)=>{
    if(!token) return null;
    return jwt.verify(token,secretKey);

}

module.exports = {getUser,setUser};
