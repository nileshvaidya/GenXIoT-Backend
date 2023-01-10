var passport = require("passport");
export const authChecker = passport.authenticate("jwt", { session: false });