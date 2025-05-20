import Joi from "joi";

export const foodValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(200)
      .messages({
        "string.empty": "Tên món ăn không được để trống",
        "string.max": "Tên không được dài quá 200 ký tự",
      }),
    categoryId: Joi.string().required()
      .messages({
        "string.empty": "Id danh mục không được để trống",
      }),
    position: Joi.string().allow(""),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được để trống",
      }),
    avatar: Joi.string().allow(""),
    price: Joi.string().required().min(1)
      .messages({
        "string.empty": "Giá tiền không được để trống",
      }),
  })

  const { error } = schema.validate(req.body);

  if(error) {
    res.status(400).json({
      message: error.details[0].message,
    })
    return;
  }
  next();
}