const UserRepository = require("../repositories");
const User = require("../models/user");
const JwtRepository = require("../repositories/jwt.repository");
const redis = require("../helper")

class UserController {
  static async getAllUsers(req, res) {
    try {
      let data = null 
      data = await redis.getRedisData("users_data");
      
      if (!data || data.length === 0) {
        data = await UserRepository.getAllUsers();
        await redis.setRedisData("users_data", data, 60);
      } 
      
      return res.status(200).json({
        status: "ok",
        result: data,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch users",
      });
    }
  }
  

  static async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = new User(userData);
      let check1 = await UserRepository.getUserByName(newUser.userName);
      let check2 = await UserRepository.getUserByAccountNumber(
        newUser.accountNumber
      );
      if ((check1 && check1.length > 0) || (check2 && check2.length > 0)) {
        return res.status(400).json({
          status: "error",
          message: `${
            check1.length > 0 ? "user name" : "account number"
          } already registered`,
        });
      }
      const savedUser = await UserRepository.createUser(newUser);

      await redis.deleteRedisData("users_data")
      return res.status(201).json({
        status: "ok",
        result: savedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Failed to create user",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.user_id;
      const deletedUser = await UserRepository.deleteUser(userId);

      if (!deletedUser) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      await redis.deleteRedisData("users_data")
      return res.status(200).json({
        status: "ok",
        result: deletedUser,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete user",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.user_id;
      const updatedData = req.body;

      const updatedUser = await UserRepository.updateUser(userId, updatedData);

      if (!updatedUser) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      await redis.deleteRedisData("users_data")
      return res.status(200).json({
        status: "ok",
        result: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to update user",
      });
    }
  }

  static async generateToken(req, res) {
    const { accountNumber } = req.body;
    if (!accountNumber) 
      return res.status(400).json({
        status: "error",
        message: "accountNumber should not be empty",
      });
    const payload = { accountNumber: accountNumber };
    const data = await JwtRepository.generateToken(payload)
    return res.status(200).json({
      status: 'ok',
      result: data
    })
  }
}

module.exports = UserController;
