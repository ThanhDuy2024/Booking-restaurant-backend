import { Booking } from "../../models/booking.model.js";
import { Branch } from "../../models/branch.model.js";
export const bookingController = async (req, res) => {
  try {
    const branchId = req.body.branchId;
    const branchCheck = await Branch.findOne({
      _id: branchId,
      deleted: false
    })

    if (!branchCheck) {
      res.status(404).json({
        message: "Chi nhánh không tồn tại"
      })
      return;
    }

    req.body.totalPerson = parseInt(req.body.totalPerson);
    const [day, month, year] = req.body.arriveDay.split("/");
    const [hours, minutes] = req.body.timeToArrive.split(":");
    const newDateFormat = new Date(year, month - 1, day, hours, minutes); //thang bat dau tu 0 nen phai tru di 1

    req.body.timeAll = newDateFormat;

    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(200).json({
      message: "Đặt bàn thành công",
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Đơn đặt bàn của bạn không thành công"
    })
  }
}