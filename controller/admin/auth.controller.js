import AccountAdmin from "../../models/accountAdmin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  const accountAdmin = await AccountAdmin.findOne({
    email: req.body.email,
    status: "active"
  })

  if (!accountAdmin) {
    res.status(404).json({
      message: "Email không tồn tại hoặc tài khoản của bạn đã bị khóa"
    })
    return;
  }

  const checkPassword = bcrypt.compareSync(req.body.password, accountAdmin.password);

  if (!checkPassword) {
    res.status(404).json({
      message: "Mật khẩu không đúng"
    })
    return;
  }

  const { fullName, email, role} = accountAdmin;

  const authToken = jwt.sign({
    fullName,
    email,
  }, process.env.PRIVATE_KEY,
    {
      expiresIn: 30 * 24 * 60 * 60 * 1000
    }
  );

  res.cookie("authToken", authToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  
  res.status(200).json({
    message: "Đăng nhập thành công",
    token: authToken
  })
}

export const registerController = async (req, res) => {

  const accountExisted = await AccountAdmin.findOne({
    email: req.body.email
  })

  if (accountExisted) {
    res.json({
      code: "error"
    })
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  req.body.password = hash;

  const newAccountAdmin = new AccountAdmin(req.body);
  const accountAdmin = await newAccountAdmin.save();
  const { fullName, email } = accountAdmin;
  res.json({
    code: "success",
    data: {
      fullName,
      email
    }
  })
}

export const logoutController = (req, res) => {
  
  res.clearCookie("authToken");

  res.status(200).json({
    message: "Đăng xuất thành công",
  })
}