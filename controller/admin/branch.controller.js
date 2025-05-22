import { Branch } from "../../models/branch.model.js";
export const branchCreateController = async (req, res) => {
  if(req.accountAdmin.role != "admin") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trức năng này"
    })
    return;
  }
  try {

    if(req.file) {
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


