import AccountAdmin from "../../models/accountAdmin.model.js";
export const profileGetController = async (req, res) => {
  if(req.accountAdmin.role != "admin" && req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào trước năng này"
    })
    return;
  }

  const account = await AccountAdmin.findOne({
    _id: req.accountAdmin.id,
    deleted: false
  }, { password: 0 });


  res.status(200).json(account)
}