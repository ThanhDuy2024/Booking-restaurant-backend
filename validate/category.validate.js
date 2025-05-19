import Joi from "joi";

export const categoryValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(200)
      .messages({
        "string.empty": "Tên không được bỏ trống",
        "string.max": "Tên chỉ chứa tối đa 200 ký tự"
      }),
    status: Joi.string().required()
      .messages({
        "string.empty": "Trạng thái không được bỏ trống",
      }),
    avatar: Joi.string().allow(""),
    position: Joi.string().allow(""),
  })

  const { error } = schema.validate(req.body);

  if(error) {
    res.status(400).json({
      message: error.details[0].message
    })
    return;
  }
  next();
}