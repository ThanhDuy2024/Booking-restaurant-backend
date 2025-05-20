import { Food } from "../../models/food.model.js";
import Category from "../../models/category.model.js";
import AccountAdmin from "../../models/accountAdmin.model.js";
import moment from "moment";
export const foodListController = async (req, res) => {
	const find = {
		deleted: false,
	}
	const food = await Food.find(find).sort({
		position: "desc"
	}).lean();

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

		if (item.price) {
			item.priceFormat = item.price.toLocaleString("vi-vn");
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

		if(item.createdAt) {
			item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
		}

		if(item.updatedAt) {
			item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
		}
	}

	res.status(200).json(food);
}

export const foodCreateController = async (req, res) => {
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