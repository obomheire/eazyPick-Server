import express, { Application, ErrorRequestHandler } from "express";
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

//Routers
import productsRoutes from "./routes/productsRoute";
import categoriesRoutes from "./routes/categoriesRoute";
import ordersRoutes from "./routes/ordersRoute";
import usersRoutes from "./routes/usersRoute";

//App variables
const app: Application = express();
const api = process.env.API_URL;

//Middlewares
app.use('*', cors());
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

//Routes
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

//MongoDB Connection
if (process.env.NODE_ENV === "test") {
  connectTestDB();
  console.log(process.env.NODE_ENV);
} else {
  connect();
  console.log(process.env.NODE_ENV);
}

//App Port
const PORT: number = Number(process.env.PORT) || 3000;

//App Server
const server: Server = app.listen(PORT, () => {
  console.log(api);
  console.log(`App listning on port ${PORT}`);
});
