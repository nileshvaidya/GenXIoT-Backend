"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post("/signup", userControllers_1.signupUser);
router.post("/signin", userControllers_1.signinUser);
exports.default = router;
