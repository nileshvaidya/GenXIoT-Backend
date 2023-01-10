import  createHttpError, {InternalServerError} from 'http-errors';
import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const {JWT_KEY} = require("../config/index")

export const signupUser: RequestHandler = async (req, res, next) => {
  const { root_name, user_type, name, email, password, created_by } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exists!"));
    const root_id = "SB005HG"; // Get Client ID from Client Table --- TODO

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ root_id, user_type, name, email, password: hashedPassword, created_by });
    await user.save();

    res.json({ message: "User Created" });
  } catch (error) {
    return next(InternalServerError)
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { root_name, email, password } = req.body;
  try {
    
  // Get Client ID from Client Name and Check Client ID and Email -- TODO
  const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ name: user.name, email: user.email, user: user.id, }, JWT_KEY, { expiresIn: "200d", });

    res.cookie("jwt",token)

    if (!isValidPassword) return next(createHttpError(401, "Not Valid Password"));

    res.json({ name:user.name, token });
  } catch (error) {
    return next(InternalServerError);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  
  return await User.find()
    .populate({ path: 'email', strictPopulate: false })
    .then((email) => (email ? res.status(200).json({ email }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error: error.message }));
    
  
    
  
};