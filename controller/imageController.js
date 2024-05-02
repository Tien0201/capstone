import sharp from "sharp";
import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
import path from "path";
import url from 'url'
import { is } from "date-fns/locale";
import user from "../model/user.js";
import { Op } from 'sequelize';

const model = initModels(sequelize)

const getImages = async(req,res) =>{
    const images = await model.image.findAll()
    const {path, user_id, ...otherDetails} = images
    res.status(200).json({...otherDetails})
}


const uploadImage = async(req,res) =>{

    const { fileURLToPath } = url;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let file= req.file
    const userId = req.user.id
    const imageBuffer = req.file.buffer;

    try{
        if(!file){
            return res.status(400).send('No files were uploaded.');
        }
       
        const uploadPath = path.join(__dirname, ".." ,'uploads');
        const resizedImageBuffer = await sharp(imageBuffer).resize({ width: 300, height: 300 }).toBuffer();
        const filename = Date.now() + '-' + req.file.originalname;
        const imagePath = path.join("uploads", filename);

        await sharp(resizedImageBuffer).toFile(path.join(uploadPath, filename));

        const image = await model.image.create({ 
            title : filename,
            user_id : userId,
            created_at : Date.now(),
            path : imagePath,
            isDelete : 1,
            // saved_users : []
         });

         res.send(`File uploaded and resized successfully. Image ID: ${image.image_id}`);

    }catch(err){
        throw err
    }  
}

const getImgDetails = async(req,res) =>{
    const {imageId} = req.params;
    const foundImage = await model.image.findByPk(imageId,{ include: "user" })

    const filteredImage = {
        image_id: foundImage.image_id,
        title: foundImage.title,
        user: {
            user_id: foundImage.user.user_id,
            username: foundImage.user.username,
            email : foundImage.user.email
        }
    }
     res.status(200).json(filteredImage)
}

const getComments = async(req,res) =>{
    const {imageId} = req.params;
    const comments = await model.comment.findAll({
        where: {
            image_id : imageId
        }
    })
    res.status(200).json(comments)
}


const Comment  = async(req,res) =>{
    const { imageId } = req.params;
    const userId = req.user.id;
    const {content} = req.body;

    try{
        const newComment = {
            user_id : userId,
            image_id : imageId,
            content : content
        }
    await model.comment.create(newComment)
    res.status(200).json({message : "Comments has been add"})
    }catch(err){
        throw err
    }
}


const getImageById = async (req, res) => {
    try {
        const { imageId } = req.params;
        const foundImage = await model.image.findByPk(imageId);

        if (!foundImage) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(foundImage);
    } catch (err) {
        throw err
    }
};
const deleteImage = async(req,res) =>{
    const { imageId } = req.params;

    try{
        const foundImage = await model.image.findOne({
            where: {
                image_id : imageId,
                isDelete : 1
            }
        });     
    
        if (!foundImage) {
            return res.status(404).json({ message: "Image not found" });
        }
         await foundImage.update({ isDelete : 0 })
        res.status(200).json({message: `image ${imageId} has been delete`})
    
    }catch(err)
    {
        throw err
    }    
}

const getUser = async(req,res) =>{
    const userId = req.user.id
    console.log(userId)
    const foundUser = await model.user.findOne({
        where:{
            user_id : userId
        }
    })

    if(!foundUser){
        return res.status(404).json({ message: `User with ID ${userId} not found` });
    }
    res.status(200).json(foundUser)
}

//danh sách ảnh đã tạo
const getImgByUserID = async(req,res) =>{
    const userId = req.user.id

    const foundImg = await model.image.findAll({
        where:{
            user_id : userId
        }
    })
    if(!foundImg){
        return res.status(404).json({ message: `No data` });
    }

    const filteredImages = foundImg.map(image => {
        const { user_id, path,isDelete,saved_users, ...otherDetails } = image.dataValues;
        return otherDetails;

    });    res.status(200).json(filteredImages);
}

// thêm vào danh sách ảnh lưu
const saveImg = async(req,res) =>{
    const userId = req.user.id
    const { imageId } = req.params
    try {
        const foundImg = await model.image.findOne({
            where: {
                image_id : imageId,
                isDelete : 1
            }
        });
        if (foundImg) {
            const foundImg = await model.image.findOne({
                where: {
                    image_id: imageId,
                    isDelete: 1
                }
            });
            if (foundImg) {
                let savedUsers = foundImg.saved_users ? JSON.parse(foundImg.saved_users) : []; // Chuyển đổi saved_users thành một mảng nếu nó không phải là một mảng
                const index = savedUsers.indexOf(userId);
                if (index === -1) {
                    // Nếu không tìm thấy userId, thêm userId vào mảng saved_users
                    savedUsers.push(userId);
                } else {
                    // Nếu tìm thấy userId, loại bỏ userId khỏi mảng saved_users
                    savedUsers.splice(index, 1);
                }
                const savedUsersString = JSON.stringify(savedUsers);
                await model.image.update({ saved_users: savedUsersString }, { where: { image_id: imageId } });
                if (index === -1) {
                    res.status(200).json({ message: `Added image ${imageId} to saved images of user ${userId}` });
                } else {
                    res.status(200).json({ message: `Unsaved image ${imageId} of user ${userId}` });
                }
            } else {
                res.status(404).json({ message: `Cannot find image with id ${imageId}` });
            }

        }

    }catch(err){
        throw err
        
    }
}

const getSaveImg = async(req,res) =>{
    const userId = req.user.id

    try {
        // Tìm các ảnh đã lưu của người dùng dựa trên userId
        const savedImages = await model.image.findAll({
            where: {
                saved_users: {
                    [Op.or]: [
                        { [Op.eq]: '' }, // Chỉ làm một truy vấn rỗng
                        { [Op.like]: `%${userId}%` }
                    ]               
                 }
            }
        });

        if (!savedImages || savedImages.length === 0) {
            return res.status(404).json({ message: 'No saved images found for this user' });
        }
        
        const filteredImages = savedImages.map(image => {
            const { isDelete, saved_users, ...otherDetails } = image.dataValues;
            return otherDetails;
        });
        
        res.status(200).json({savedImg : filteredImages});


    }catch (err){
        throw err
    }
}

const searchByName = async(req,res) =>{
    const { name } = req.body;

    try {
        // Tìm kiếm các ảnh có tên chứa từ khóa name
        const images = await model.image.findAll({
            where: {
                title: {
                    [Op.like]: `%${name}%`
                }
            }
        });

        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found with the specified name' });
        }

        res.status(200).json(images);
    } catch (err) {
        throw err
    }
};


export {
        getImages,
        uploadImage,
        getImgDetails,
        getComments,
        Comment,
        getImageById,
        deleteImage,
        getUser,
        getImgByUserID,
        saveImg,
        getSaveImg,
        searchByName
    }