import express from "express";
import 'dotenv/config';
import { databaseConnect } from "./config/database.js";
import adminRouter from "./router/admin/index.route.js";
const app = express();
const port = process.env.PORT;

//Kết nối cơ sở dữ liệu
databaseConnect();

app.use("/api/admin", adminRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})