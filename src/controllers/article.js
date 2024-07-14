import CoreController from "./core.js";
import ArticleDatamapper from "../datamappers/article.js";
import ArticleSchema from "../schemas/article.js";


export default class ArticleController extends CoreController {
  static datamapper = ArticleDatamapper;
  static className = "Article";
  static schema = ArticleSchema;
}