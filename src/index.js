// Import NPM dependencies
import express from "express";
import cors from "cors";

// Import local dependencies
import apiRouter from "./routers/index.js";
import { bodySanitizer, errorManager, notFound, queryParser, redirectToApp } from "./middlewares/index.js";

// Create Express App
const app = express();

// Allow some Cross origin requests
app.use(cors({ origin: process.env.CORS, credentials: true }));

// Statically serve the /dist folder
app.use(express.static(new URL('../dist', import.meta.url).pathname));

// Parse query in object
app.set('query parser', queryParser);

// Add body parser
app.use(express.urlencoded({ extended: true })); // Body parser for application/x-www-urlencoded
app.use(express.json()); // Body parser for application/json

// XSS injection protection in req.body
app.use(bodySanitizer);

// Prefix api routes with "/api"
app.use("/api", apiRouter);

// If se client get path with no file rediect to react App
app.get(/\/[A-Za-z0-9-]*$/, redirectToApp);

// Not Found Middleware (404)
app.use(notFound);

// Centralized error manager
app.use(errorManager);

export default app;