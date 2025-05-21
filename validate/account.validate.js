import Joi from "joi";

export const accountValidateCreateForm = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required()
      .messages({
        "string.empty": "Tên không được để trống"
      }),
    email: Joi.string().required().email()
      .messages({
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng"
      }),
    password: Joi.string().required().min(4)
      .messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất 4 ký tự"
      }),
    avatar: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được để trống"
      }),
    role: Joi.string().required()
      .messages({
        "string.empty": "Vai trò không được để trống"
      }),
  })

  const { error} = schema.validate(req.body);
  if(error) {
    res.status(400).json({
      message: error.details[0].message,
    })
    return;
  }

  next();
}

export const accountValidateEditForm = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required()
      .messages({
        "string.empty": "Tên không được để trống"
      }),
    email: Joi.string().required().email()
      .messages({
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng"
      }),
    password: req.body.password ? Joi.string().required().min(4)
      .messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất 4 ký tự"
      }) : Joi.string().allow(""),
    avatar: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    address: Joi.string().allow(""),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được để trống"
      }),
    role: Joi.string().required()
      .messages({
        "string.empty": "Vai trò không được để trống"
      }),
  })

  const { error} = schema.validate(req.body);
  if(error) {
    res.status(400).json({
      message: error.details[0].message,
    })
    return;
  }

  next();
}