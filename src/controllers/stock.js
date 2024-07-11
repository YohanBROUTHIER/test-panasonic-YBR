import CoreController from "./core.js";
import StockDatamapper from "../datamappers/stock.js";

export default class StockController extends CoreController {
  static datamapper = StockDatamapper;
  static className = "Stock";
}