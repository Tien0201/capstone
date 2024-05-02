import express from 'express'
import { getImages, uploadImage, getImgDetails, getComments, Comment, getImageById, deleteImage, getUser, getImgByUserID, saveImg , getSaveImg,searchByName} from '../controller/imageController.js';
import { verifyUser } from '../middleware/verifyToken..js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/get-images", getImages)

router.post("/upload-image",verifyUser, upload.single('image'), uploadImage)

router.get("/get-image-detail/:imageId", getImgDetails)

router.get("/get-comments/:imageId", getComments)

router.post("/comments/:imageId",verifyUser, Comment)

router.get("/get-image-by-id/:imageId", getImageById)

router.delete("/delete-image/:imageId", deleteImage)

router.get("/get-image-by-id/:imageId", getImageById)

router.get("/get-user",verifyUser, getUser)

router.get("/get-img-by-userId",verifyUser, getImgByUserID)

router.post("/:imageId/save",verifyUser, saveImg)

router.get("/saved-img",verifyUser, getSaveImg)

router.get("/search-img", searchByName)

export default router