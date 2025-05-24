import AccountAdmin from "../../models/accountAdmin.model.js";
import { Branch } from "../../models/branch.model.js";
import moment from "moment";
import { slugGenerate } from "../../helpers/slugGenerate.js";
import slugify from "slugify";

export const branchCreateController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trức năng này"
    })
    return;
  }
  try {

    const branch = await Branch.findOne({
      email: req.body.email
    })

    if (branch) {
      res.status(400).json({
        message: "Email đã tồn tại"
      })
      return;
    }

    if (req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    req.body.createdBy = req.accountAdmin.id;
    req.body.updatedBy = req.accountAdmin.id;

    const newBranch = new Branch(req.body);
    await newBranch.save();

    res.status(200).json({
      message: "Tạo chi nhánh thành công",
    })
  } catch (error) {
    res.status(400).json({
      message: "Tạo chi nhánh thất bại"
    })
  }
}

export const branchEditController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trức năng này"
    })
    return;
  }
  try {
    const id = req.params.id;
    const branch = await Branch.findOne({
      _id: id,
      status: "active",
      deleted: false
    });

    if (!branch) {
      res.status(404).json({
        message: "Không tìm thấy thông tin chi nhánh",
      })
      return;
    }

    if (req.body.email != branch.email) {
      const findNewEmail = await Branch.findOne({
        _id: { $ne: branch.id },
        email: req.body.email
      })

      if (findNewEmail) {
        res.status(404).json({
          message: "Email đã tồn tại",
        })
        return;
      }
    }



    if (req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    req.body.updatedBy = req.accountAdmin.id;

    if (branch.name != req.body.name) {
      req.body.slug = await slugGenerate(Branch, req.body.name);
    }

    await Branch.updateOne({
      _id: branch.id
    }, req.body);

    res.status(200).json({
      message: "Cập nhật thông tin chi nhánh thành công",
    })

  } catch (error) {
    res.status(400).json({
      message: "Cập nhật thông tin chi nhánh thất bại",
    })
  }
}

export const branchListController = async (req, res) => {
  if (req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trức năng này"
    })
    return;
  }

  try {
    const find = {
      deleted: false
    }

    //Tinh nang tim kiem
    const search = req.query.search;
    if (search) {
      const slugVerify = slugify(search, {
        lower: true,
      })
      const regex = new RegExp(slugVerify);
      find.slug = regex;
    }
    //Ket thuc tinh nang tiem kiem

    const branch = await Branch.find(find).sort({
      createdAt: "desc"
    }).lean();

    if (branch.length == 0) {
      res.status(404).json({
        message: "Không tìm thấy chi nhánh bạn đang tìm kiếm"
      })
      return;
    }

    for (const item of branch) {
      if (item.updatedAt) {
        item.createdAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
      }

      if (item.updatedAt) {
        item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
      }

      if (item.updatedBy) {
        const account = await AccountAdmin.findOne({
          _id: item.updatedBy,
        })
        if (account) {
          item.updatedByName = account.fullName
        } else {
          item.updatedByName = "Tài khoản đã bị xóa hoặc không tồn tại";
        }
      }

      if (item.createdBy) {
        const account = await AccountAdmin.findOne({
          _id: item.createdBy,
        })
        if (account) {
          item.createdByName = account.fullName;
        } else {
          item.createdByName = "Tài khoản đã bị xóa hoặc không tồn tại";
        }
      }
    }
    res.status(200).json(branch);

  } catch (error) {
    res.status(400).json({
      message: "Lấy dữ liệu không thành công",
    })
  }
}
