import User from "../models/User";

import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";
const { JWT_KEY } = require("../config/index")
const { Strategy } = passportJwt;

// const optionsJwt = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET,
// };

// export default (passport: PassportStatic) => {
//   passport.use(
//     new Strategy(optionsJwt, async (payload, done) => {
//       await User.findById(payload.uid)
//         .then((user) => {
//           user ? done(null, user) : done(null, false);
//         })
//         .catch(() => done(null, false));
//     })
//   );
// };

// for http only cookie system

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }
  console.log(jwt);
  
  return jwt;
};
const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      console.log(payload);
      
      await User.findById(payload.user)
        
        
        .then((user) => {
          console.log(payload.user);
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};