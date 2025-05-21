import AccountAdmin from "../../models/accountAdmin.model.js";
import bcrypt from "bcryptjs";

export const accountStaffCreateController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền dùng chức năng này"
    })
    return;
  }

  const findEmail = await AccountAdmin.findOne({
    email: req.body.email
  })

  if (findEmail) {
    res.status(400).json({
      message: "email đã tồn tại"
    })
    console.log(findEmail);
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  if (req.file) {
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

export const accountStaffEditController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền dùng chức năng này"
    })
    return;
  }

  try {
    const id = req.params.id
    const account = await AccountAdmin.findOne({
      _id: id,
      status: "active",
      deleted: false
    })

    if (!account) {
      res.status(404).json({
        message: "Tài khoản không tồn tại"
      })
      return;
    }

    if(account.email != req.body.email) {
      const emailAllAccount = await AccountAdmin.findOne({
        email: req.body.email,
      })

      if(emailAllAccount) {
        res.status(400).json({
          message: "Email bạn muốn cập nhận đã tồn tại trong hệ thống"
        })
        return;
      }
    }

    if(req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    } else {
      delete req.body.password
    }

    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    req.body.updatedBy = req.accountAdmin.id;

    await AccountAdmin.updateOne({
      _id: account.id
    }, req.body);

    res.status(200).json({
      message: "Chỉnh sửa thành công",
      data: req.body
    })
  } catch (error) {
    res.status(404).json({
      message: "Tài khoản không tồn tại"
    })
  }
}