import express from "express"
import { addfav, getfavbook, removefav, addtocart, getcart,removecart, updatebuyed} from "../controllers/function.controller.js"
import { verifyToken } from "../utils/Verifyuser.js";

const router = express.Router();

router.post('/addfav',verifyToken, addfav);
router.get('/getfavbook',verifyToken, getfavbook);
router.post('/removefav',verifyToken, removefav);
router.post('/addtocart',verifyToken, addtocart);
router.get('/getcart',verifyToken, getcart);
router.post('/removecart',verifyToken, removecart);
router.post('/updatebuyed',verifyToken, updatebuyed);
export default router;