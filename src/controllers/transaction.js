import CoreController from "./core.js";
import TransactionDatamapper from "../datamappers/transaction.js";
import TransactionSchema from "../schemas/transaction.js";

export default class TransactionController extends CoreController {
  static datamapper = TransactionDatamapper;
  static className = "Transaction";
  static schema = TransactionSchema;
}