// redis.js
const Redis = require("ioredis");


// default localhost:6379
const redis = new Redis(process.env.REDIS_URL); 
// const redis = new Redis(); 
module.exports = redis;
