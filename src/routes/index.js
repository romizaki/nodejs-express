const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const authenticateToken = require("../middleware")

router.get("/", (req, res) => {
  res.send("ini home page");
});

router.get("/users", authenticateToken, Controller.getAllUsers);
router.post("/user", Controller.createUser)
router.delete("/user/:user_id", Controller.deleteUser)
router.put("/user/:user_id", Controller.updateUser)

module.exports = router;
