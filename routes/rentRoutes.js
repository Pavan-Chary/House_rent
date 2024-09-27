const { createUser, handleLogin, houseCreate, getCurrentUser,
    getHouse,
    deleteHouse,
    userLogout,
    cityHouses,
    userHouses,getAllCities } = require("../controllers/rentMethods")
const express = require("express");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const signinRouter = express.Router();
const homeRouter = express.Router();

signinRouter.route("/signin").post(createUser);
signinRouter.route("/login").post(handleLogin);
signinRouter.route("/getCities").get(getAllCities);

homeRouter.route("/addHome").post(upload.array('pic'), houseCreate);
homeRouter.route("/getUser").get(getCurrentUser);
homeRouter.route("/getHouse/:id").get(getHouse);
homeRouter.route("/deleteHouse/:id").get(deleteHouse);
homeRouter.route("/logout").get(userLogout);
homeRouter.route("/cityHouses/:id").get(cityHouses);
homeRouter.route("/userHouses/:id").get(userHouses);

module.exports = {
    signinRouter,
    homeRouter,
}