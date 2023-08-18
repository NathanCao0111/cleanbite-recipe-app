const userRouter = require("./user");
const recipesRouter = require("./recipes");
const meRouter = require("./me");
const siteRouter = require("./site");
const auth = require("../middlewares/auth");
const logger = require("../middlewares/logger");

function route(app) {
  app.use(logger);

  app.use("/users", userRouter);
  app.use("/recipes", recipesRouter);
  app.use("/", siteRouter);

  app.use(auth);

  app.use("/me", meRouter);
}

module.exports = route;
