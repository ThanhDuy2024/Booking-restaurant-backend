import { Branch } from "../../models/branch.model.js";
import { Food } from "../../models/food.model.js";
import Order from "../../models/order.model.js";
export const orderControllerCreate = async (req, res) => {
  if(req.accountAdmin.role != "staff") {
    res.status(400).json({
      message: "Bạn không có quyền truy cập vào nội dung này"
    })
    return;
  }
  try {
    if(parseInt(req.body.tableNumber) < 1) {
      res.status(400).json({
        message: "Sai định dạng gửi"
      })
      return;
    } 

    const branch = await Branch.findOne({
      _id: req.accountAdmin.branch,
      deleted: false
    })

    if(!branch) {
      res.status(400).json({
        message: "Không tìm thấy chi nhánh của bạn"
      })
      return;
    }

    if(parseInt(req.body.tableNumber) > branch.totalTable) {
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

    if(checkTable) {
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
      _id: { $in: arrayFoodId},
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