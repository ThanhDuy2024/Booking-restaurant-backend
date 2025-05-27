import { Booking } from "../../models/booking.model.js";
import { Branch } from "../../models/branch.model.js";
import { nodemailerHelper } from "../../helpers/nodemailer.helper.js";
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

    const subject = '[Nhà hàng Susano] - Xin được xác nhận đơn hàng';
    const htm = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <p style="font-size: 16px;">Xin chào quý khách <b style="color: #d2691e;">${req.body.fullName}</b>,</p>
    
    <p style="font-size: 16px;">
      Cảm ơn bạn đã đặt bàn tại 
      <strong style="color: #d2691e;">nhà hàng Susano</strong>!
    </p>
    
    <p style="font-size: 16px;">Dưới đây là thông tin đặt bàn của bạn:</p>
    
    <ul style="font-size: 16px; line-height: 1.6;">
      <li><strong>Ngày:</strong> ${req.body.arriveDay}</li>
      <li><strong>Giờ:</strong> ${req.body.timeToArrive}</li>
      <li><strong>Số lượng khách:</strong> ${req.body.totalPerson}</li>
      <li><strong>Yêu cầu đặc biệt:</strong> ${req.body.note || "Không có"}</li>
    </ul>
    
    <p style="font-size: 16px;">
      Chúng tôi rất mong được chào đón bạn!
    </p>
    
    <p style="font-size: 16px; margin-top: 20px;">Trân trọng,</p>
    <p style="font-size: 16px; font-weight: bold; color: #d2691e;">Nhà hàng Susano</p>
    <p style="font-size: 14px; color: #555;">Hotline: ${branchCheck.phone}</p>
  </div>
`;

    nodemailerHelper(req.body.email, subject, htm);

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