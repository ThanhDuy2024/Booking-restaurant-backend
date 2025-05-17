import AccountAdmin from "../../models/accountAdmin.model.js";

export const loginController = (req, res) => {
  res.send("Login completed");
}

export const registerController = async (req, res) => {

    const accountExisted = await AccountAdmin.findOne({
      email: req.body.email
    })

    if(accountExisted) {
      res.json({
        code: "error"
      })
      return;
    }

    const newAccountAdmin = new AccountAdmin(req.body);
    const accountAdmin = await newAccountAdmin.save();
    const {fullName, email} = accountAdmin;
    res.json({
      code: "success",
      data: {
        fullName,
        email
      }
    })
}