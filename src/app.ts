import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import { Server } from "http";
// import createHttpError from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "dotenv";
config();
import morgan from "morgan";
import { connect, mongoose } from "./connection/mongoConnect";
import { connectTestDB } from "./connection/mongoMemoryServer";
const MongoStore = require("connect-mongodb-session")(session);
import { Product } from "./models/productModel";

import productsRoute from "./routes/productsRoute";

const app: Application = express();
const api = process.env.API_URL;

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Routers
app.use(`${api}/products`, productsRoute);


if (process.env.NODE_ENV === "test") {
  connectTestDB();
  console.log(process.env.NODE_ENV);
} else {
  connect();
  console.log(process.env.NODE_ENV);
}

// app.get(`${api}/products`, async (req: Request, res: Response) => {
//   const productLists = await Product.find();

//   if (!productLists) {
//     res.status(500).json({ success: false });
//   }
//   res.send(productLists);
// });

// app.post(`${api}/products`, (req: Request, res: Response) => {
//   const { name, image, countInStock } = req.body;
//   const product = new Product({
//     name,
//     image,
//     countInStock,
//   });
//   product
//     .save()
//     .then((createdProduct) => {
//       res.status(201).json(createdProduct);
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error,
//         success: false,
//       });
//     });
// });

const PORT: number = Number(process.env.PORT) || 3000;

const server: Server = app.listen(PORT, () => {
  console.log(api);
  console.log(`App listning on port ${PORT}`);
});
