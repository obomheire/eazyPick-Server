import express, { Application, Request, Response, ErrorRequestHandler } from "express";
import { Server } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "dotenv";
config();
import morgan from "morgan";
import { connect, mongoose } from "./connection/mongoConnect";
import { connectTestDB } from "./connection/mongoMemoryServer";
const MongoStore = require("connect-mongodb-session")(session);
import errorHandler from "./utils/errorHandler";
import authJwt from "./utils/jwt";
import path from "path";

//Routers
import productsRoutes from "./routes/productsRoute";
import categoriesRoutes from "./routes/categoriesRoute";
import ordersRoutes from "./routes/ordersRoute";
import usersRoutes from "./routes/usersRoute";

//App variables
const app: Application = express();
const api = process.env.API_URL;

//Middlewares
app.use(cors());
app.use(authJwt());
app.use(morgan("dev"));
app.use(errorHandler());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/uploads", express.static(path.join(__dirname, "/public/uploads")));
app.use( "/public/uploads", express.static(__dirname + "/public/uploads") );
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
app.get("/", (req: Request, res: Response) => { 
  res.send({sucess: true, message: "Welcome to eazyPick API"});  
})

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
