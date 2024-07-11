import { Router } from "express";

import ArticleController from "../controllers/article.js";
import { errorHandler as eh } from "../middlewares/index.js";

const router = Router();

router.route("/")
  .get(eh(ArticleController.getAll.bind(ArticleController)));
  // .post(eh(ArticleController.create.bind(ArticleController)));

// router.route("/:id")
//   .get(eh(ArticleController.getByPk.bind(ArticleController)))
//   .patch(eh(ArticleController.update.bind(ArticleController)))
//   .delete(eh(ArticleController.delete.bind(ArticleController)));

export default router;