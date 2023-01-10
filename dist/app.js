"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PORT } from './config/index';
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("./middleware/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DBNAME, PORT } = require("./config/index");
const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;
// const dbURL = "mongodb://admin:pass123@mongo:27017/test";
console.log(dbURL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
(0, passport_2.default)(passport_1.default);
app.use((0, cors_1.default)({}));
app.use("/api", exampleRoutes_1.default);
app.use("/api/v1/user", userRoutes_1.default);
app.use((0, morgan_1.default)("dev"));
app.enable("trust proxy");
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route Not Found");
});
const options = {
    //dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.set('strictQuery', true);
const connectWithRetry = () => {
    mongoose_1.default
        .connect(dbURL)
        .then(() => {
        console.log("Connected to DB...");
        app.listen(PORT, () => {
            console.log(`Server Started on Port ${PORT}`);
        });
    })
        .catch((e) => {
        // throw createHttpError(501, "Unable to connect database");
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
app.use(errorHandler_1.errorHandler);
