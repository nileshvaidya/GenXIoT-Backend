"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
var passport = require("passport");
exports.authChecker = passport.authenticate("jwt", { session: false });
