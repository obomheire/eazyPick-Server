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
// import cookieParser from "cookie-parser";
// import session from "express-session";
import { config } from "dotenv";
config();
import morgan from "morgan";

const app: Application = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: "secretkey",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

const api = process.env.API_URL;

app.get(`${api}/products`, (req: Request, res: Response) => {
    const products = {
        id: 1,
        name: "Product 1",
        price: 100,
    }
  res.send(products);
});

app.post(`${api}/products`, (req: Request, res: Response) => {
    const newProduct = req.body;
    console.log(newProduct)
  res.send(newProduct);
});

const PORT: number = Number(process.env.PORT) || 3000;

const server: Server = app.listen(PORT, () => {
    // console.log(api)
    console.log(`App listning on port ${PORT}`)
}
);
