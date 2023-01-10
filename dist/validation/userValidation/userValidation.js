"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUserValidation = exports.signupUserValidation = void 0;
const userSchema_1 = require("./userSchema");
const validator_1 = __importDefault(require("../utils/validator"));
const signupUserValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.signupUser, req.body, next);
exports.signupUserValidation = signupUserValidation;
const signinUserValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.signinUser, req.body, next);
exports.signinUserValidation = signinUserValidation;
