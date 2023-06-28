const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const authenticateToken = require("../middleware")

router.post("/generate-token", Controller.generateToken);

router.get("/users", authenticateToken, Controller.getAllUsers);
router.post("/user", authenticateToken, Controller.createUser)
router.delete("/user/:user_id", authenticateToken, Controller.deleteUser)
router.put("/user/:user_id", authenticateToken, Controller.updateUser)

module.exports = router;
