var expressLoader = require('./express');
var Container = require('typedi').Container;
const redis = require("redis")
const { connectToDatabase, connection } = require("./mongodb")

module.exports = async (expressApp) => {

  const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  });
  await client.connect()
  client.on("error", (error) => {
    console.error(error);
  });
  await connectToDatabase();
  Container.set("mongopool", connection)
  Container.set("redispool", client);

  await expressLoader(expressApp);
};
