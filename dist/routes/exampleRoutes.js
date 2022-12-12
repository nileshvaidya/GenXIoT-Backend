"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exampleValidation_1 = require("./../validation/exampleValidation/exampleValidation");
const express_1 = require("express");
const exampleControllers_1 = require("../controllers/exampleControllers");
const router = (0, express_1.Router)();
router.get("/", exampleControllers_1.getExample);
router.post("/", exampleValidation_1.getExampleDataValidation, exampleControllers_1.getExampleData);
exports.default = router;
