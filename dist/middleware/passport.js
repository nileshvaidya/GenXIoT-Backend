"use strict";
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
const User_1 = __importDefault(require("../models/User"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const { JWT_KEY } = require("../config/index");
const { Strategy } = passport_jwt_1.default;
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
const cookieExtractor = (req) => {
    var _a;
    let jwt = null;
    if (req && req.cookies) {
        jwt = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
    }
    console.log(jwt);
    return jwt;
};
const optionsCookie = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_KEY,
};
exports.default = (passport) => {
    passport.use(new Strategy(optionsCookie, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(payload);
        yield User_1.default.findById(payload.user)
            .then((user) => {
            console.log(payload.user);
            user ? done(null, user) : done(null, false);
        })
            .catch(() => done(null, false));
    })));
};
