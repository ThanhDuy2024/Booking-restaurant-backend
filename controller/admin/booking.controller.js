import moment from "moment";
import slugify from "slugify";
import { Booking } from "../../models/booking.model.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";

export const bookingControllerList = async (req, res) => {
  if (req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Vui lòng đăng nhập vào tài khoảng staff để xem"
    })
    return;
  }

  const find = {
    branchId: req.accountAdmin.branch,
    deleted: false
  }

  //Tinh nang tim kiem theo ten
  if (req.query.search) {
    const keyword = slugify(req.query.search, {
      lower: true
    })
    const regex = new RegExp(keyword);
    find.slug = regex;
  }
  //Ket thuc tinh nang tim kiem theo ten

  //Tinh nang tim kiem theo sdt
  if (req.query.phone) {
    find.phone = req.query.phone;
  }
  //Ket thuc tinh nang tim kiem theo sdt

  //Tinh nang phan trang
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  const countRecord = await Booking.countDocuments(find);
  const limit = 5;
  const pages = Math.ceil(countRecord / limit);
  const pagination = paginationHelper(page, pages, limit);
  //Ket thuc tinh nang phan trang

  const record = await Booking.find(find).sort({
    createdAt: "desc"
  }).limit(limit).skip(pagination.skip).lean();

  if (record.length < 1) {
    res.status(404).json({
      message: "Không tìm thấy thông tin khách hàng"
    })
    return;
  }

  for (const item of record) {
    if (item.timeAll) {
      item.timeAll = moment(item.timeAll).format("HH:mm - DD/MM/YYYY");
    }
  }

  res.status(200).json({
    data: record,
    pages: pagination.pages,
  })
}

export const bookingControllerDetail = async (req, res) => {
  if (req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Vui lòng đăng nhập vào tài khoảng staff để xem"
    })
    return;
  }
  try {
    const id = req.params.id;
    const branchId = req.accountAdmin.branch;

    const record = await Booking.findOne({
      _id: id,
      branchId: branchId,
      deleted: false
    }).lean();

    if (!record) {
      res.status(404).json({
        message: "Không tìm thấy thông tin khách hàng"
      })
      return;
    }

    record.timeAll = moment(record.timeAll).format("HH:mm - DD/MM/YYYY");

    res.status(200).json(record)
  } catch (error) {
    res.status(404).json({
      message: "Không tìm thấy thông tin"
    })
  }
}

export const bookingControllerDelete = async (req, res) => {
  if (req.accountAdmin.role != "staff") {
    res.status(401).json({
      message: "Vui lòng đăng nhập vào tài khoảng staff để xem"
    })
    return;
  }
  try {
    const id = req.params.id;
    const record = await Booking.findOne({
      _id: id,
      deleted: false,
    });

    if (!record) {
      res.status(404).json({
        message: "Xóa đơn đặt lịch không thành công"
      })
    }

    await Booking.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now(),
      deletedBy: req.accountAdmin.id
    });
    
    res.status(200).json({
      message: "Xóa đơn đặt lịch thành công"
    })
  } catch (error) {
    res.status(400).json({
      message: "Xóa đơn đặt lịch không thành công"
    })
  }
}