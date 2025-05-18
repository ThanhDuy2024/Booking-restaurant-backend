import joi from "joi"

export const loginValidate = async (req, res, next) => {
  const schema = joi.object({
    email: joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        "string.empty": "Email bắt buộc phải có",
        "string.email": "Email sai định dạng"
      }),
    password: joi.string().min(4).max(50).required()
      .messages({
        "string.empty": "Password bắt buộc phải có",
        "string.min": "Password phải chứa ít nhất 4 ký tự",
        "string.max": "Password chỉ chứa nhiều nhất 50 ký tự"
      })
  })

  const { error } = schema.validate(req.body);

  if(error) {
    res.status(400).json({
      code: "error",
      message: error.details[0].message
    })
    return;
  }

  next();
}