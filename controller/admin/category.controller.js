import Category from "../../models/category.model.js";

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