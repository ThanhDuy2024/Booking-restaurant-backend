import Category from "../../models/category.model.js";
import moment from "moment";

export const categoryListController = async (req, res) => {
  const find = {
    deleted: false,
  }
  const categories = await Category.find(find).sort({
    position: 'desc'
  }).lean();

  for (const item of categories) {
    if(item.createdAt) {
      item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
      delete item.createdAt;
    }

    if(item.updatedAt) {
      item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");
      delete item.updatedAt;
    }
  }
  res.status(200).json(categories);
}

export const categoryCreateController = async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    if (!req.body.position) {
      const count = await Category.countDocuments({}) + 1;
      req.body.position = parseInt(count);
    }

    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(200).json({
      message: "Tạo danh mục thành công"
    })
  } catch (error) {
    res.status(401).json({
      message: "Tạo danh mục thất bại"
    })
  }
}

export const categoryEditController = async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.path;
    } else {
      delete req.body.avatar;
    }

    if (!req.body.position) {
      delete req.body.position;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    const category = await Category.findOne({
      _id: req.params.id,
      deleted: false
    })

    if (!category) {
      res.status(404).json({
        message: "Danh mục không tồn tại"
      })
      return;
    }

    await Category.updateOne({
      _id: category.id
    }, req.body);

    res.status(200).json({
      message: "Chỉnh sửa thành công"
    })

  } catch (error) {
    res.status(404).json({
      message: "Danh mục không tồn tại"
    })
  }
}

export const categoryDeleteController = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      deleted: false
    })

    if (!category) {
      res.status(404).json({
        message: "Danh mục không tồn tại"
      })
      return;
    }

    await Category.updateOne({
      _id: category.id
    }, {
      deleted: true,
      deletedAt: Date.now()
    });

    res.status(200).json({
      message: "Xóa thành công"
    })

  } catch (error) {
    res.status(404).json({
      message: "Danh mục không tồn tại"
    })
  }
}