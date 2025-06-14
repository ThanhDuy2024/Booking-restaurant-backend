import Order from "../../models/order.model.js";

export const orderStatusAllBranch = async (req, res) => {

  const recordInital = await Order.countDocuments({
    status: "inital",
    deleted: false
  })

  const recordCompleted = await Order.countDocuments({
    status: "completed",
    deleted: false
  })

  const recordCancel = await Order.countDocuments({
    status: "cancel",
    deleted: false
  })
  
  res.status(200).json({
    inital: recordInital,
    completed: recordCompleted,
    cancel: recordCancel
  })
}