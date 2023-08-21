const userRouter = require("./user");
const recipesRouter = require("./recipes");
const meRouter = require("./me");
const siteRouter = require("./site");
const auth = require("../middlewares/auth");
const logger = require("../middlewares/logger");

function route(app) {
  app.use(logger);

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/recipes", recipesRouter);
  app.use("/api/v1/", siteRouter);

  app.use(auth);

  app.use("/api/v1/me", meRouter);
}

module.exports = route;
