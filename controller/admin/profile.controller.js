import AccountAdmin from "../../models/accountAdmin.model.js";
import { Branch } from "../../models/branch.model.js";
import { slugGenerate } from "../../helpers/slugGenerate.js";
export const profileGetController = async (req, res) => {
  if (req.accountAdmin.role != "admin" && req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trước năng này"
    })
    return;
  }

  const account = await AccountAdmin.findOne({
    _id: req.accountAdmin.id,
    deleted: false,
    status: "active"
  }, { password: 0 }).lean();

  if(account.branch) {
    const branch = await Branch.findOne({
      _id: account.branch,
      deleted: false,
      status: "active"
    })
    if(!branch) {
      res.status(404).json({
        message: "Thông tin chi nhánh của bạn không tồn tại trong hệ thống, vui lòng nhờ quản trị viên để sửa lại"
      })
      return;
    }
    account.branchName = branch.name;
  }


  res.status(200).json(account);
}

export const profileEditController = async (req, res) => {
  if (req.accountAdmin.role != "admin" && req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trước năng này"
    })
    return;
  }

  try {
    if(req.accountAdmin.email != req.body.email) {
      const account = await AccountAdmin.findOne({
        email: req.body.email,
      })
      if(account) {
        res.status(400).json({
          message: "Email bạn muốn cập nhật đã tồn tại"
        })
        return;
      }
    }

    if(!req.body.password) {
      delete req.body.password;
    }

    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }
    
    req.body.updatedBy = req.accountAdmin.id;
    
    if(req.accountAdmin.fullName != req.body.fullName) {
      req.body.slug = await slugGenerate(AccountAdmin, req.body.fullName);
    }

    await AccountAdmin.updateOne({
      _id: req.accountAdmin.id,
    }, req.body);

    res.status(200).json({
      message: "Chỉnh sửa thông tin cá nhân thành công"
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Chỉnh sửa thông tin cá nhân thất bại"
    })
  }
}