const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  identityNumber: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
