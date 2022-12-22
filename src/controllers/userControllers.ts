import  createHttpError, {InternalServerError} from 'http-errors';
import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const signupUser: RequestHandler = async (req, res, next) => {
  const { client_name, name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exists!"));
    const client_id = "SB005HG"; // Get Client ID from Client Table --- TODO

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ client_id, name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User Created" });
  } catch (error) {
    return next(InternalServerError)
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { client_name, email, password } = req.body;
  try {
    
  // Get Client ID from Client Name and Check Client ID and Email -- TODO
  const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return next(createHttpError(401, "Not Valid Password"));

    res.json({ message: "User Logged In!" });
  } catch (error) {
    return next(InternalServerError);
  }
};