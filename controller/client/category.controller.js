import Category from "../../models/category.model.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";
export const categoryControllerList = async (req, res) => {
  const find = {
    deleted: false,
    status: "active"
  }

  //Tinh nang phan trang
  let page = 1;
  if(req.query.page) {
    page = parseInt(req.query.page)
  }
  const limit = 6;
  const countRecord = await Category.countDocuments(find);
  const pages = Math.ceil(countRecord / limit);
  const pagination = paginationHelper(page, pages, limit);
  //Ket thuc tinh nang phan trang

  const record = await Category.find(find).sort({
    position: "desc"
  }).limit(limit).skip(pagination.skip);

  res.status(200).json({
    data: record,
    pages: pagination.pages
  })
}