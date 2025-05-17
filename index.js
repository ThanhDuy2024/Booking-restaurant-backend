import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from "cors";
import { databaseConnect } from "./config/database.js";
import adminRouter from "./router/admin/index.route.js";
const app = express();
const port = process.env.PORT;

//Kết nối cơ sở dữ liệu
databaseConnect();
//Cho phép nhận kiểu dữ liệu JSON
app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.use("/api/admin", adminRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})