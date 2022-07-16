require("dotenv").config();
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
server.listen(PORT, () => `Server running on http://localhost:${PORT}`);
