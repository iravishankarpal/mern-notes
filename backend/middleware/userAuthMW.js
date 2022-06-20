const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../modules/userModule");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  // console.log("token :", req.headers);
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.jwt_secret);

      req.user = await User.findById(decoded.id).select("-password");

      // console.log("decoded req.user :", req.user, decoded.id);
      next();
    }

    if (!token) {
      res.json({
        status: 401,
        messsage: "Not authorized , no token",
      });
    }
  } catch (error) {
    res.json({
      status: 401,
      message: "not authorized , token failed",
    });
  }
});

module.exports = protect;
