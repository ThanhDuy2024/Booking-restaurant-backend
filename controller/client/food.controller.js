import slugify from "slugify";
import { Food } from "../../models/food.model.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";
export const foodControllerList = async (req, res) => {
  const find = {
    deleted: false,
    status: "active"
  }

  //Tinh nang tim kiem do an
  if (req.query.search) {
    const keyword = slugify(req.query.search, {
      lower: true
    });
    const regex = new RegExp(keyword);
    find.slug = regex;
  }
  //Ket thuc tinh nang tim kiem do an

  //Tim kiem mon an them danh muc
  if (req.query.categoryid) {
    find.categoryId = req.query.categoryid;
  }
  //Ket thuc tim kiem mon an theo danh muc

  //Tinh nang phan trang
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page)
  }
  const limit = 4;
  const countRecord = await Food.countDocuments(find);
  const pages = Math.ceil(countRecord / limit);
  const pagination = paginationHelper(page, pages, limit);
  //Ket thuc tinh nang phan trang

  const record = await Food.find(find).sort({
    position: "desc"
  }).limit(limit).skip(pagination.skip);

  res.status(200).json({
    data: record,
    pages: pagination.pages
  })
}