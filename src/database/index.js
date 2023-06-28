require('dotenv').config();
const mongoose = require('mongoose');
const redis = require('redis');

// Create a Redis client and establish a connection
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Handle Redis connection errors
redisClient.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

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
  redisClient: redisClient, // Export the Redis client
};
