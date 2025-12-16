import express from "express";
import { submitLogin } from "../controllers/loginController.js";


const router = express.Router();


router.post("/submit", submitLogin);


export default router;