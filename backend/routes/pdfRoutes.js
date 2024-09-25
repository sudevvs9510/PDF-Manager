import express from "express"
import fileUpload from '../config/multerConfig.js';
// import {uploadPDF,getPDF, extractPages,getUserPDFs} from "../controllers/pdfController.js"
import {uploadPDF, getPDF} from "../controllers/pdfController.js"
import auth from "../middlewares/auth.js"


const pdfRouter = express.Router()

pdfRouter.post('/upload',auth, fileUpload.array('files'), uploadPDF);
pdfRouter.get('/:userId',auth, getPDF)



export default pdfRouter