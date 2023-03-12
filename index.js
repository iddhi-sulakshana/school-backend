require("./startup/config")();
const app = require("express")();
const winston = require("./startup/logging")();
require("./startup/database")();
require("./startup/routes")(app);

const server = app.listen(process.env.PORT || 3000, () => {
  winston.info(
    `Listening on port: http://localhost:${process.env.PORT || 3000}`
  );
});
