import { Router } from "express";

import TransactionController from "../controllers/transaction.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(TransactionController.getAll.bind(TransactionController)))
  .post(eh(TransactionController.create.bind(TransactionController)));

// router.route("/:id")
//   .get(eh(TransactionController.getByPk.bind(TransactionController)))
//   .patch(eh(TransactionController.update.bind(TransactionController)))
//   .delete(eh(TransactionController.delete.bind(TransactionController)));

export default router;