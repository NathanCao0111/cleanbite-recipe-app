const logger = (req, res, next) => {
  console.log("req ip: " + req.ip);
  console.log("req method: " + req.method);
  console.log("req date: " + new Date());

  next();
};

module.exports = logger;
