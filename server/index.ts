import express from "express";
import mongoose from "mongoose";
import * as TableController from "./controllers/tableController";

require('dotenv').config();

const app: express.Express = express();

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// body-parserに基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: false,
  useUnifiedTopology: false
}

mongoose.connect("mongodb://mongo:27017/schedule", options);

// GetとPostのルーティング
const router: express.Router = express.Router();
router.get('/api/v1/events/:event', TableController.getEvent);
router.post('/api/v1/events/:event', TableController.joinEvent);
router.post('/api/v1/check/:event', TableController.checkPassword);
router.post('/api/v1/event', TableController.createEvent);
app.use(router);

// 3333番ポートでAPIサーバ起動
app.listen(3333, ()=>{ console.log('listening on port 3333!') });