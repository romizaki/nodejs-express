const User = require('../models/user');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      console.log(users);
      return res.status(200).json({
        status: 'ok',
        result: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch users',
      });
    }
  }

  static async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      
      return res.status(201).json({
        status: 'ok',
        result: savedUser,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create user',
      });
    }
  }
}

module.exports = UserController;
