"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.signinUser = exports.signupUser = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_KEY } = require("../config/index");
const signupUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { root_name, user_type, name, email, password, created_by } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return next((0, http_errors_1.default)(422, "Email Already Exists!"));
        const root_id = "SB005HG"; // Get Client ID from Client Table --- TODO
        const hashedPassword = yield bcrypt_1.default.hash(password, 8);
        const user = new User_1.default({ root_id, user_type, name, email, password: hashedPassword, created_by });
        yield user.save();
        res.json({ message: "User Created" });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signupUser = signupUser;
const signinUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { root_name, email, password } = req.body;
    try {
        // Get Client ID from Client Name and Check Client ID and Email -- TODO
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return next((0, http_errors_1.default)(404, "User not Found!"));
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, user: user.id, }, JWT_KEY, { expiresIn: "200d", });
        res.cookie("jwt", token);
        if (!isValidPassword)
            return next((0, http_errors_1.default)(401, "Not Valid Password"));
        res.json({ name: user.name, token });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signinUser = signinUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find()
        .populate({ path: 'email', strictPopulate: false })
        .then((email) => (email ? res.status(200).json({ email }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
});
exports.getAllUsers = getAllUsers;
