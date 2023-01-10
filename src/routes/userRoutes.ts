import { signupUserValidation, signinUserValidation } from './../validation/userValidation/userValidation';

import { Router } from 'express';
import { getAllUsers, signinUser, signupUser } from "../controllers/userControllers";

const router = Router();

router.post("/signup",signupUserValidation, signupUser);
router.post("/signin",signinUserValidation, signinUser);
router.post("/getAllUsers", getAllUsers);

export default router;