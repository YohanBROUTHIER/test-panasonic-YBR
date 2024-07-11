import { Router } from "express";

import StockController from "../controllers/stock.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

// router.route("/")
//   .get(eh(StockController.getAll.bind(StockController)))
//   .post(eh(StockController.create.bind(StockController)));

// router.route("/:id")
//   .get(eh(StockController.getByPk.bind(StockController)))
//   .patch(eh(StockController.update.bind(StockController)))
//   .delete(eh(StockController.delete.bind(StockController)));

export default router;