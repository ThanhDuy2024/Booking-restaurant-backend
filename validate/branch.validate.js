import Joi from "joi";

export const branchValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required()
      .messages({
        "string.empty": "Tên không được để trống"
      }),
    address: Joi.string().required()
      .messages({
        "string.empty": "Địa chỉ không được để trống"
      }),
    email: Joi.string().email().allow("")
      .messages({
        "string.email": "Email sai định dạng"
      }),
    avatar: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được để trống"
      }),
    totalTable: Joi.string().required()
      .messages({
        "string.empty": "Số lượng bản trong quán không được để trống"
      })
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