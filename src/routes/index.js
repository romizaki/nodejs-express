const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", (req, res) => {
  res.send("ini home page");
});

router.get("/users", Controller.getAllUsers);
router.post("/user", Controller.createUser)

module.exports = router;
