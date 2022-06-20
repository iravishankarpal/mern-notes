const bcrypt = require("bcryptjs");
const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const generateToken = require("../util/jwt_token");

const userLoginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  // console.log("userExist :", userExist, email, password);
  if (!userExist) {
    res.json({
      status: 400,
      message: "Email is Wrong",
    });
  } else {
    bcrypt.compare(password, userExist.password, (err, result) => {
      if (err)
        res.json({
          status: 400,
          message: `error check password  ${err}`,
        });

      //if both match than you can do anything
      if (result) {
        return res.json({
          _id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          pic: userExist.pic,
          timeStamp: userExist.createdAt,
          token: generateToken(userExist._id),
        });
      } else {
        return res.json({ status: 400, message: "password is Wrong" });
      }
    });
  }
});

module.exports = userLoginHandler;
