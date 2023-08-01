import express from "express";
import { User } from "../models/user.js";
import { register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get('/all', getAllUsers);
router.post('/new', register);
router.post('/login', login);
router.get('/logout', logout);


// 1st Way(preffered)
router.get("/me", isAuthenticated, getMyProfile)

// 2nd way
// router.get("/userid", findbyidInBody);
// router.put("/userid", findbyidInBodyU);
// router.delete("/userid", findbyidInBodyD);

export default router;