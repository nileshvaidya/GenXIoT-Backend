
// import { PORT } from './config/index';
import express, { ErrorRequestHandler } from "express";
import createHttpError, { CreateHttpError } from "http-errors";
import exampleRoute from "./routes/exampleRoutes";
import userRoute from "./routes/userRoutes";
import mongoose, { connect } from "mongoose";
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';
import cors from 'cors';

const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DBNAME, PORT} = require("./config/index")
// const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const dbURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;
// console.log(dbURL);

const app = express();
app.use(express.json());
app.use(cors({}));
app.use("/api", exampleRoute);
app.use("/api/v1/user", userRoute);
app.use(morgan("dev"));
app.enable("trust proxy");

app.use(() => {
  throw createHttpError(404, "Route Not Found");
});
const options = {
  //dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  
};
mongoose.set('strictQuery', true);
const connectWithRetry = () => {

  mongoose
    
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
      setTimeout(connectWithRetry, 5000)
    });

}

connectWithRetry();


app.use(errorHandler);