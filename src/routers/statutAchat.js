import { Router } from "express";

import statutAchatController from "../controllers/statutAchat.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(statutAchatController.getAll.bind(statutAchatController)));
//   .post(eh(statutAchatController.create.bind(statutAchatController)));

// router.route("/:id")
//   .get(eh(statutAchatController.getByPk.bind(statutAchatController)))
//   .patch(eh(statutAchatController.update.bind(statutAchatController)))
//   .delete(eh(statutAchatController.delete.bind(statutAchatController)));

export default router;