import {Branch} from "../../models/branch.model.js";
export const branchListController = async (req, res) => {

  try {
    const branches = await Branch.find({
      status: "active",
      deleted: false
    })
    res.status(200).json({
         data: branches
    });
  } catch (error) {
    res.status(400).json({
      message: "Lấy danh sách chi nhánh thất bại"
    });
  }
}