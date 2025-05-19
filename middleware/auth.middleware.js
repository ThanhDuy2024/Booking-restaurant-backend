import AccountAdmin from "../models/accountAdmin.model.js";
import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  if (req.cookies.authToken) {
    const token = req.cookies.authToken
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decoded.email) {
      res.clearCookie("authToken");
      res.status(401).json({
        message: "Bạn không có quyền truy cập vào chức năng này"
      })
      return;
    }

    const accountAdmin = await AccountAdmin.findOne({
      email: decoded.email,
      deleted: false,
      status: "active"
    })

    if (!accountAdmin) {
      res.clearCookie("authToken");
      res.status(401).json({
        message: "Bạn không có quyền truy cập vào chức năng này"
      })
      return;
    }
    req.accountAdmin = accountAdmin;
  } else {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào chức năng này"
    })
    return;
  }
  next();
}