import http from "node:http";

import "./src/helpers/envLoad.js"; //Load env variable

import app from "./src/index.js"; //Module express


const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
