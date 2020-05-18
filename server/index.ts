import express from "express";
import * as TableController from "./controllers/tableController";

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

const data = {
  name: "taro",
  age: 50
};

// GetとPostのルーティング
const router: express.Router = express.Router();
router.get('/', TableController.getEvent);
router.post('/', (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.send(data);
});
app.use(router);


// 3333番ポートでAPIサーバ起動
app.listen(3333, ()=>{ console.log('Example app listening on port 3333!') });