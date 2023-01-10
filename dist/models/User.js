"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    root_id: { type: String },
    user_type: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    created: { type: Date, default: Date.now },
    created_by: { type: String },
    update: { type: Date },
    updated_by: { type: String },
    isActive: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
