import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json({message :"Unautherize"})
   }
   jwt.verify(token, process.env.JWT, (err,user)=>{
    if(err)  res.status(403).json({message :"Token is not valid"})
    req.user = user; 
    next();
   });
};

export const verifyUser = (req,res,next) =>{
    verifyToken(req,res,next, () =>{
        if(req.user.id){
            next();
        } else{
            return res.status(401).json({message :"Unautherize"})
        }
    });
};
