import { Food } from "../../models/food.model.js";
import Category from "../../models/category.model.js";
import AccountAdmin from "../../models/accountAdmin.model.js";
import moment from "moment";
import slugify from "slugify";
import { slugGenerate } from "../../helpers/slugGenerate.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";

export const foodListController = async (req, res) => {
	if (req.accountAdmin.role != "admin") {
		res.status(401).json({
			message: "Bạn không có quyền truy cập vào chức năng này"
		})
		return;
	}
	const find = {
		deleted: false,
	}

	//Tinh nang tim kiem
	const search = req.query.search;
	if (search) {
		const slugVerify = slugify(search, {
			lower: true,
		})
		const regex = new RegExp(slugVerify);
		find.slug = regex;
	}
	//Ket thuc tinh nang tiem kiem

	//Chuc nang phan trang
  let skip = 0;
  const limit = 5;
  const countDocuments = await Food.countDocuments(find);
	const pagesPagination = Math.ceil(countDocuments / limit);

  if (req.query.page) {
    const pages = paginationHelper(parseInt(req.query.page), pagesPagination, limit, skip);
    skip = pages.skip;
  }
  //Ket thuc chuc nang phan trang

	const food = await Food.find(find).sort({
		position: "desc"
	})

	if (food.length == 0) {
    res.status(404).json({
      message: "Không tìm thấy món ăn bạn đang tìm kiếm"
    })
    return;
  }

	for (const item of food) {
		if (item.categoryId) {
			const nameCategory = await Category.findOne({
				_id: item.categoryId,
				deleted: false
			})

			if (nameCategory) {
				item.categoryName = nameCategory.name;
			}
		}

		if (item.createdBy) {
			const findAccount = await AccountAdmin.findOne({
				_id: item.createdBy
			})

			if (findAccount) {
				item.createdByName = findAccount.fullName;
			}
		}

		if (item.updatedBy) {
			const findAccount = await AccountAdmin.findOne({
				_id: item.updatedBy
			})

			if (findAccount) {
				item.updatedByName = findAccount.fullName;
			}
		}

		if (item.createdAt) {
			item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
		}

		if (item.updatedAt) {
			item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
		}
	}

	res.status(200).json({
		foodList: food,
		pages: pagesPagination
	});
}

export const foodCreateController = async (req, res) => {
	if (req.accountAdmin.role != "admin") {
		res.status(401).json({
			message: "Bạn không có quyền truy cập vào chức năng này"
		})
		return;
	}
	try {
		if (req.file) {
			req.body.avatar = req.file.path;
		} else {
			delete req.body.avatar;
		}

		if (!req.body.position) {
			req.body.position = await Food.countDocuments({}) + 1;
			req.body.position = parseInt(req.body.position);
		} else {
			req.body.position = parseInt(req.body.position);
		}

		req.body.price = parseInt(req.body.price);
		req.body.createdBy = req.accountAdmin.id;
		req.body.updatedBy = req.accountAdmin.id;

		const newFood = Food(req.body);
		await newFood.save();

		res.status(200).json({
			message: "Tạo món ăn thành công",
		})
	} catch (error) {
		res.status(400).json({
			message: "Tạo món ăn thất bại",
		})
	}
}

export const foodEditController = async (req, res) => {
	if (req.accountAdmin.role != "admin") {
		res.status(401).json({
			message: "Bạn không có quyền truy cập vào chức năng này"
		})
		return;
	}
	try {
		const findFood = await Food.findOne({
			_id: req.params.id,
			deleted: false
		})

		if (!findFood) {
			res.status(400).json({
				message: "Món ăn không tồn tại"
			})
			return;
		}

		if (req.file) {
			req.body.avatar = req.file.path;
		} else {
			delete req.body.avatar;
		}

		if (!req.body.position) {
			req.body.position = await Food.countDocuments({}) + 1;
			req.body.position = parseInt(req.body.position);
		} else {
			req.body.position = parseInt(req.body.position);
		}

		req.body.price = parseInt(req.body.price);

		req.body.updatedBy = req.accountAdmin.id;

		if (findFood.name != req.body.name) {
			req.body.slug = await slugGenerate(Food, req.body.name);
		}

		await Food.updateOne({
			_id: findFood.id
		}, req.body);

		res.status(200).json({
			message: "Chỉnh sửa thành công"
		})
	} catch (error) {
		res.status(400).json({
			message: "Chỉnh sửa không thành công"
		})
	}
}

export const foodDeleteController = async (req, res) => {
	if (req.accountAdmin.role != "admin") {
		res.status(401).json({
			message: "Bạn không có quyền truy cập vào chức năng này"
		})
		return;
	}
	try {

		const findFood = await Food.findOne({
			_id: req.params.id,
			deleted: false
		})

		if (!findFood) {
			res.status(400).json({
				message: "Món ăn không tồn tại"
			})
			return;
		}

		await Food.updateOne({
			_id: findFood.id,
		}, {
			deleted: true,
			deletedAt: Date.now(),
			deletedBy: req.accountAdmin.id
		})

		res.status(200).json({
			message: "Xóa món ăn thành công"
		})
	} catch (error) {
		res.status(400).json({
			message: "Xóa món ăn không thành công"
		})
	}
}