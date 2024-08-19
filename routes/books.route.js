import express from "express";
import { topbooks, getallbooks, getuserbooks} from "../controllers/books.controller.js";

const router = express.Router();

router.post("/create", topbooks)
router.get("/find", getallbooks)
router.get("/finduser", getuserbooks)


export default router;