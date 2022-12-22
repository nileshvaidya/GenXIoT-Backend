"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    client_id: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isUserVerified: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
