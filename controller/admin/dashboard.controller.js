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

export const orderStatusBranch = async (req, res) => {

  const recordInital = await Order.countDocuments({
    status: "inital",
    deleted: false,
    branchId: req.accountAdmin.branch
  })

  const recordCompleted = await Order.countDocuments({
    status: "completed",
    deleted: false,
    branchId: req.accountAdmin.branch
  })

  const recordCancel = await Order.countDocuments({
    status: "cancel",
    deleted: false,
    branchId: req.accountAdmin.branch
  })

  res.status(200).json({
    inital: recordInital,
    completed: recordCompleted,
    cancel: recordCancel
  })
}

export const orderPriceAllBranch = async (req, res) => {
  let price = 0;

  const record = await Order.find({
    status: "completed",
    deleted: false
  });

  for (const item of record) {
    price += item.totalPrice;
  }

  const priceFormat = price.toLocaleString("vi-VN");
  res.status(200).json({
    totalPriceAllBranch: priceFormat,
  })
}

export const orderPriceBranch = async (req, res) => {
  let price = 0;

  const record = await Order.find({
    status: "completed",
    deleted: false,
    branchId: req.accountAdmin.branch
  });

  for (const item of record) {
    price += item.totalPrice;
  }

  const priceFormat = price.toLocaleString("vi-VN");
  res.status(200).json({
    totalPriceBranch: priceFormat,
  })
}