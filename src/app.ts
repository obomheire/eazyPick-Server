import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "dotenv";
config();

const app: Application = express();
const api = process.env.API_URL;

app.get(`${api}/products`, (req: Request, res: Response) => {
    const products = {
        id: 1,
        name: "Product 1",
        price: 100,
    }
  res.send(products);
});

const PORT: number = Number(process.env.PORT) || 3000;

const server: Server = app.listen(PORT, () => {
    // console.log(api)
    console.log(`App listning on port ${PORT}`)
}
);
