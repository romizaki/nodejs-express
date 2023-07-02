"use strict";

let library = {
  getRedisData: async (key) => {
    var Container = require('typedi').Container;
    var redisClient = Container.get("redispool");

    let redis_data = null;
    try {
      let redis_data = await redisClient.get(key);
      return redis_data
    } catch (err) {
      console.error(err);
    } finally {
      return redis_data;
    }
  },
  setRedisData: async (key, data, timeout = 0) => {
    var Container = require('typedi').Container;
    var redisClient = Container.get("redispool");
    try {
      await redisClient.set(key, JSON.stringify(data));
      if (timeout > 0) {
        await redisClient.expire(key, timeout);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteRedisData: async (key) => {
    var Container = require('typedi').Container;
    var redisClient = Container.get("redispool");
    try {
      await redisClient.del(key);
    } catch (error) {
      console.log(error);
      return false;
    };
  },
}

module.exports = library;
