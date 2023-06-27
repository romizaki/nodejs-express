require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    console.log('Trying to connect to MongoDB...');

    const mongodbUri = process.env.MONGODB_URI;
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  connection: mongoose.connection,
};
