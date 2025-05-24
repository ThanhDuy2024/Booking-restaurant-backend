import AccountAdmin from "../../models/accountAdmin.model.js";
import { Branch } from "../../models/branch.model.js";
import bcrypt from "bcryptjs";
import moment from "moment";

export const accountStaffListController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền dùng chức năng này"
    })
    return;
  }

  const find = {
    _id: { $ne: req.accountAdmin.id },
    deleted: false,
  }

  const accountAdmin = await AccountAdmin.find(find, { password: 0 }).sort({
    createdAt: "desc"
  }).lean();

  for (const item of accountAdmin) {
    if (item.createdAt) {
      item.createdAtFormat = moment(item.createdAt).format("DD/MM/YYYY");
    }

    if (item.updatedAt) {
      item.updatedAtFormat = moment(item.updatedAt).format("DD/MM/YYYY");
    }

    if (item.createdBy) {
      const account = await AccountAdmin.findOne({
        _id: item.createdBy
      })
      if (account) {
        item.createdByName = account.fullName
      }
    }

    if (item.updatedBy) {
      const account = await AccountAdmin.findOne({
        _id: item.updatedBy
      })
      if (account) {
        item.updatedByName = account.fullName
      }
    }

    if(item.branch) {
      const branch = await Branch.findOne({
        _id: item.branch,
        status: "active",
        deleted: false
      })
      if(branch) {
        item.branchName = branch.name;
      }
    }
  }

  res.status(200).json(accountAdmin);
}

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
    return;
  }

  const branch = await Branch.findOne({
    _id: req.body.branch,
    deleted: false,
    status: "active"
  })

  if(!branch) {
    res.status(200).json({
      message: "Không tìm thấy chi nhánh"
    })
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

    if (account.email != req.body.email) {
      const emailAllAccount = await AccountAdmin.findOne({
        email: req.body.email,
      })

      if (emailAllAccount) {
        res.status(400).json({
          message: "Email bạn muốn cập nhận đã tồn tại trong hệ thống"
        })
        return;
      }
    }

    const branch = await Branch.findOne({
      _id: req.body.branch,
      deleted: false,
      status: "active"
    })

    if(!branch) {
      res.status(200).json({
        message: "Không tìm thấy chi nhánh"
      })
      return;
    }

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    } else {
      delete req.body.password
    }

    if (req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    req.body.updatedBy = req.accountAdmin.id;

    if(account.fullName != req.body.fullName) {
      req.body.slug = await slugGenerate(AccountAdmin, req.body.name);
    }

    await AccountAdmin.updateOne({
      _id: account.id
    }, req.body);

    res.status(200).json({
      message: "Chỉnh sửa thành công",
    })
  } catch (error) {
    res.status(404).json({
      message: "Tài khoản không tồn tại"
    })
  }
}

export const accountStaffDeleteController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền dùng chức năng này"
    })
    return;
  }

  try {
    const id = req.params.id;
    const account = await AccountAdmin.findOne({
      _id: id,
      deleted: false
    })

    if (!account) {
      res.status(400).json({
        message: "Xóa tài khoản thất bại thành công"
      })
      return;
    } 

    await AccountAdmin.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: req.accountAdmin.id
    })

    res.status(200).json({
      message: "Xóa tài khoản thành công"
    })
  } catch (error) {
    res.status(400).json({
      message: "Xóa tài khoản thất bại thành công"
    })
  }
}