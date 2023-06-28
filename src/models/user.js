const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);
userSchema.index({ userName: 1, accountNumber: 1 });

module.exports = User;