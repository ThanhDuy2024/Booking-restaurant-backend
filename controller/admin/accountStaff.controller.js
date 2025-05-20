import AccountAdmin from "../../models/accountAdmin.model.js";
import bcrypt from "bcryptjs";

export const accountStaffCreateController = async (req, res) => {
  if(req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền dùng chức năng này"
    })
    return;
  }

  const findEmail = await AccountAdmin.findOne({
    email: req.body.email
  })

  if(findEmail) {
    res.status(400).json({
      message: "email đã tồn tại"
    })
    console.log(findEmail);
    return;
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  if(req.file) {
    req.body.avatar = req.file.path;
  } else {
    delete req.body.avatar;
  }

  req.body.createdBy = req.accountAdmin.id;
  req.body.updatedBy = req.accountAdmin.id;

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.status(200).json({
    message: "Tạo tài khoản nhân viên thành công"
  })
}