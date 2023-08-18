const logger = (req, res, next) => {
  console.log("req date: " + new Date());

  next();
};

module.exports = logger;
