import { Branch } from "../../models/branch.model.js";
import { Food } from "../../models/food.model.js";
import Order from "../../models/order.model.js";
import AccountAdmin from "../../models/accountAdmin.model.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";
import moment from "moment";
export const orderControllerCreate = async (req, res) => {
  if (req.accountAdmin.role != "staff") {
    res.status(400).json({
      message: "Bạn không có quyền truy cập vào nội dung này"
    })
    return;
  }
  try {
    if (parseInt(req.body.tableNumber) < 1) {
      res.status(400).json({
        message: "Sai định dạng gửi"
      })
      return;
    }

    const branch = await Branch.findOne({
      _id: req.accountAdmin.branch,
      deleted: false
    })

    if (!branch) {
      res.status(400).json({
        message: "Không tìm thấy chi nhánh của bạn"
      })
      return;
    }

    if (parseInt(req.body.tableNumber) > branch.totalTable) {
      res.status(400).json({
        message: "Số bàn bạn nhập vượt quá số bàn đang có trong chi nhánh"
      })
      return;
    }

    const checkTable = await Order.findOne({
      branchId: req.accountAdmin.branch,
      tableNumber: parseInt(req.body.tableNumber),
      status: "inital"
    })

    if (checkTable) {
      res.status(400).json({
        message: "Bàn này đã tạo hóa đơn và đang có trạng thái khởi tạo"
      })
      return;
    }

    let arrayFoodId = []
    for (const item of req.body.foodObject) {
      arrayFoodId.push(item.foodId);
    }

    const food = await Food.find({
      _id: { $in: arrayFoodId },
      deleted: false,
      status: "active"
    }).lean();

    for (const item of food) {
      const foodItem = req.body.foodObject.find(items => items.foodId == item._id)
      item.quantity = parseInt(foodItem.quantity);

    }

    req.body.totalOrigin = food.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    req.body.totalPrice = req.body.totalOrigin * (1 - (parseFloat(req.body.discount) / 100))
    req.body.foods = food
    req.body.branchId = req.accountAdmin.branch
    delete req.body.foodObject

    req.body.createdBy = req.accountAdmin.id;
    req.body.updatedBy = req.accountAdmin.id;

    const newRecord = new Order(req.body);

    await newRecord.save();

    res.status(200).json({
      message: "Tạo thành công"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Tạo thất bại"
    })
  }
}

export const orderControllerList = async (req, res) => {
  if (req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Bạn không có quyền truy cập vào nội dung này"
    })
    return;
  }
  try {
    const find = {
      deleted: false,
      branchId: req.accountAdmin.branch
    }

    //Tinh nang tim kiem theo ban an
    if (req.query.search) {
      find.tableNumber = parseInt(req.query.search);
    }
    //Ket thuc tinh nang tim kiem ban an

    //Tinh nang tim kiem hoa don theo ngay
    const dataFinal = {}
    if (req.query.date) {
      const startDay = moment(req.query.date).startOf('date').toDate(); //Bat dau ngay
      const endDay = moment(req.query.date).endOf('date').toDate(); //Ket thuc ngay
      dataFinal.$gte = startDay;
      dataFinal.$lte = endDay;
    }

    if (Object.keys(dataFinal).length > 0) {
      find.createdAt = dataFinal
    }
    //Ket thuc tinh nang tim kiem hoa don theo ngay

    const sortMethod = {
      createdAt: "desc"
    }
    //Sap xep theo gia hoa don
    if (req.query.priceSort) {
      switch (req.query.priceSort) {
        case "inital":
          sortMethod.totalPrice = req.query.priceSort;
          break;
        case "cancel":
          sortMethod.totalPrice = req.query.priceSort;
        case "completed":
          sortMethod.totalPrice = req.query.priceSort;
        default:
          break;
      }
    }
    //end sap xep theo gia hoa don

    //Tinh nang loc hoa don theo trang thai
    if(req.query.status) {
      const status = req.query.status;
      find.status = status;
    }
    //Ket thuc tinh nang loc hoa don theo trang thai

    //Tinh nang phan trang
    const limit = 10;
    const countRecord = await Order.countDocuments(find);
    const limitPage = Math.ceil(countRecord / limit);
    let skip = 0
    if (req.query.page) {
      const pagination = paginationHelper(parseInt(req.query.page), limitPage, limit);
      skip = pagination.skip
    }
    //Ket thuc tinh nang phan trang

    const record = await Order.find(find).sort(sortMethod).skip(skip).limit(limit).lean();

    if (record.length === 0) {
      res.status(400).json({
        message: "Không tìm thấy bàn trong hệ thống"
      })
      return;
    }

    for (const item of record) {
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
      if(item.totalOrigin) {
        item.totalOriginVND = item.totalOrigin.toLocaleString("vi-VN");
      }
      if(item.totalPrice) {
        item.totalPriceVND = item.totalPrice.toLocaleString("vi-VN");
      }
    }

    res.status(200).json({
      data: record,
      pages: limitPage
    })
  } catch (error) {
    console.log(error);
    res.status.json({
      message: "Lấy danh sách thất bại"
    })
  }
}