import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const model = initModels(sequelize)

const register = async(req,res) =>{
    const {username, email} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt); 

    const checkEmail = await model.user.findOne({
        where: {
            email
        }
    });  
    
    const checkUsername = await model.user.findOne({
        where: {
            username : username
        }
    });    

    try{
        const newUser = {
            username : username,
            email : email,
            password : hashedPassword
        }

    if(checkUsername){
        return res.status(409).json({message : `duplicate username `})
    }else if (checkEmail)
    {
        return res.status(409).json({message : `duplicate email`})

    }else{
        await model.user.create(newUser);
        res.status(200).send(`User ${req.body.username} has been created`);
    }
    }catch(err){
        throw err    
    }
    }

const login = async(req,res) =>{
    const {username, password : loginPassword} = req.body;
    try{
        const foundUser = await model.user.findOne({
            where : {
                username : username
            }
        })
        
        if(!foundUser){
            res.status(404).json({message : `Cannot find user with username : ${username}`})
        }
        const isPassword = await bcrypt.compare(loginPassword, foundUser.password)
        if(!isPassword){
            res.status(404).json({message : `Wrong Password`})
        }
        const token = jwt.sign({id : foundUser.user_id, username : foundUser.username}, process.env.JWT)
        console.log(token)
        const {password,email, ...otherDetails} = foundUser.dataValues
        res.cookie("access_token" , token,{
            httpOnly : true
        })
        .status(200)
        .json({ message: "Login successful", user: otherDetails, access_token: token });
    }
    catch (err){
        throw err
    }
}
export {register,
        login
    }