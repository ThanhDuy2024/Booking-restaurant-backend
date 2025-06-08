import Joi from "joi";

export const orderCreateValidate = (req, res, next) => {
  const foodSchema = Joi.object({
  foodId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.base': 'foodId phải là chuỗi',
      'string.length': 'foodId phải có đúng 24 ký tự',
      'string.hex': 'foodId phải là định dạng hex',
      'any.required': 'foodId là bắt buộc'
    }),
  quantity: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.base': 'quantity phải là chuỗi',
      'string.pattern.base': 'quantity phải là số',
      'any.required': 'quantity là bắt buộc'
    })
  });

  const schema = Joi.object({
    foodObject: Joi.array()
      .items(foodSchema)
      .required()
      .messages({
        'array.base': 'foodObject phải là một mảng',
        'any.required': 'foodObject là bắt buộc'
      }),
    discount: Joi.string().allow(""),
    tableNumber: Joi.string().required()
      .messages({
        "string.empty": "Số bàn không được để trống"
      }),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được để trống"
      })
  });

  const { error } = schema.validate(req.body);

  if(error) {
    res.status(400).json({
      message: error.details[0].message
    })
    return;
  }
  next();
}
