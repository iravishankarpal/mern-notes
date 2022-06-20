const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const generateToken = require("../util/jwt_token");
var userRegisterHandler = asyncHandler(async (req, res) => {
  const { name, email, pic, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.json({
      status: 400,
      message: "user alredy exites",
    });
  } else {
    const user = await User.create({ name, email, pic, password });
    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
        timestamp: user.createdAt,
      });
      // console.log(user);
    } else {
      res.json({
        status: 400,
        message: "error occured while summiting",
      });
    }
  }
});

module.exports = { userRegisterHandler };
