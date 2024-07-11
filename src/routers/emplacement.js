import { Router } from "express";

import EmplacementController from "../controllers/emplacement.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(EmplacementController.getAll.bind(EmplacementController)));
//   .post(eh(EmplacementController.create.bind(EmplacementController)));

// router.route("/:id")
//   .get(eh(EmplacementController.getByPk.bind(EmplacementController)))
//   .patch(eh(EmplacementController.update.bind(EmplacementController)))
//   .delete(eh(EmplacementController.delete.bind(EmplacementController)));

export default router;