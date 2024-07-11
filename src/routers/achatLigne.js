import { Router } from "express";

import AchatLigneController from "../controllers/achatLigne.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(AchatLigneController.getAll.bind(AchatLigneController)))
  .post(eh(AchatLigneController.create.bind(AchatLigneController)));

// router.route("/:id")
//   .get(eh(AchatLigneController.getByPk.bind(AchatLigneController)))
//   .patch(eh(AchatLigneController.update.bind(AchatLigneController)))
//   .delete(eh(AchatLigneController.delete.bind(AchatLigneController)));

export default router;