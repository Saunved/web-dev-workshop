const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const { config } = require("./configs/config");

// Server
const port = config.server.port;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
