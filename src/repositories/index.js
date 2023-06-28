const User = require('../models/user');

class UserRepository {
  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByName(name) {
    try {
      const users = await User.find({ userName: name });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByAccountNumber(accountNumber) {
    try {
      const users = await User.find({ accountNumber });
      return users;
    } catch (error) {
      throw error;
    }
  }
  

  static async createUser(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, updatedData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserName(userId, newUserName) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userName: newUserName },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
