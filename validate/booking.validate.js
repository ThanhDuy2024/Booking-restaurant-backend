import Joi from "joi";

export const bookingValidate = (req, res, next) => {
  const schema = Joi.object({
    branchId: Joi.string().required()
      .messages({
        "string.empty": "Tên chi nhánh không được bỏ trống"
      }),
    fullName: Joi.string().required()
      .messages({
        "string.empty": "Tên người đặt không được để trống"
      }),
    email: Joi.string().required()
      .messages({
        "string.empty": "Email không được để trống"
      }),
    phone: Joi.string().required()
      .messages({
        "string.empty": "Số điện thoại không được bỏ trống"
      }),
    totalPerson: Joi.string().required()
      .messages({
        "string.empty": "Số lượng khách đi không được để trống"
      }),
    arriveDay: Joi.string().required()
      .messages({
        "string.empty": "Ngày tháng đến không được để trống"
      }),
    timeToArrive: Joi.string().required()
      .messages({
        "string.empty": "Thời gian đến không được để trống"
      }),
    note: Joi.string().allow(""),
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