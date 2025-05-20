import { Food } from "../../models/food.model.js";
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