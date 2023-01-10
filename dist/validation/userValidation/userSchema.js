"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = {
    signupUser: joi_1.default.object({
        // root_name: Joi.string().required(),
        user_type: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        created_by: joi_1.default.string().required(),
    }),
    signinUser: joi_1.default.object({
        // root_name: Joi.string().required(),
        user_type: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
