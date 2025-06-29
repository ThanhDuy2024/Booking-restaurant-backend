import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from "cors";
import { databaseConnect } from "./config/database.js";
import adminRouter from "./router/admin/index.route.js";
import clientRouter from "./router/client/index.route.js";

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, //cho phep gui cookie
}));

//Kết nối cơ sở dữ liệu
databaseConnect();
//Cho phép nhận kiểu dữ liệu JSON
app.use(express.json());

app.use(cookieParser());

app.use("/api/admin", adminRouter);
app.use("/api/client", clientRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})