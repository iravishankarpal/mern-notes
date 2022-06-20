const express = require("express");
const backendRoutes = express.Router();
const {
  userRegisterHandler,
} = require("../RoutesControllers/handleUserRegistration");
const userLoginHandler = require("../RoutesControllers/handleUserLogin");
backendRoutes.route("/Register").post(userRegisterHandler);

backendRoutes.route("/").post(userLoginHandler);

module.exports = backendRoutes;
