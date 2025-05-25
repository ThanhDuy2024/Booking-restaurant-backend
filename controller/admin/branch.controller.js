import AccountAdmin from "../../models/accountAdmin.model.js";
import { Branch } from "../../models/branch.model.js";
import moment from "moment";
import { slugGenerate } from "../../helpers/slugGenerate.js";
import slugify from "slugify";
import { paginationHelper } from "../../helpers/paginationHelper.js";

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

    //Chuc nang phan trang
    let skip = 0;
    const limit = 5;
    const countDocuments = await Branch.countDocuments(find); //Dem ra nhung item co thuoc thuoc tinh trong find
    const pagesPagination = Math.ceil(countDocuments / limit);

    if (req.query.page) {
      const pages = paginationHelper(parseInt(req.query.page), pagesPagination, limit, skip);
      skip = pages.skip;
    }
    //Ket thuc chuc nang phan trang

    const branch = await Branch.find(find).sort({
      createdAt: "desc"
    }).limit(limit).skip(skip).lean();

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
    res.status(200).json({
      branchList: branch,
      pages: pagesPagination
    });

  } catch (error) {
    res.status(400).json({
      message: "Lấy dữ liệu không thành công",
    })
  }
}

export const branchDeleteController = async (req, res) => {
  try {
    const id = req.params.id;

    const branch = await Branch.findOne({
      _id: id,
      status: "active",
      deleted: false
    })

    if (!branch) {
      res.status(400).json({
        message: "Không tìm thấy chi nhánh"
      })
      return;
    }

    await Branch.updateOne({
      _id: branch.id
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: req.accountAdmin.id,
    })
    res.status(200).json({
      message: "Xóa chi nhánh thành công"
    })
  } catch (error) {

  }
}