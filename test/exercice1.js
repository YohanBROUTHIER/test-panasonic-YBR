import { faker } from "@faker-js/faker";
import "../src/helpers/envLoad.js";

import datamappers from "../src/datamappers/index.js";
import pool from "../src/helpers/pgClient.js";

// Suivi du stock dans le script pour ne pas généré d'erreur de requête
const articlesDB = await datamappers.Article.findAll();
const uniteDeStockList = articlesDB.reduce((previousValue, currentValue) => {
  const result = previousValue;
  result[currentValue.id] = parseInt(currentValue.unite_de_stock);
  return result;
}, {})

const emplacementListDB = await datamappers.Emplacement.findAll();

// Creer 200 fausses transactions
const transactionList = faker.helpers.multiple(createRandomTransaction, {
  count: 200
});

// L'ajout des transactions doit se faire de manière synchrone afin de garantir qu'à tout instant on ne peux pas avoir de stock négatif
for (let index = 0; index < transactionList.length; index++) {
  await datamappers.Transaction.create(transactionList[index]);
}

function createRandomTransaction() {
  // Récupère un emplacement qui doit contenir au moins un stock 
  let emplacement;
  while (!emplacement?.stocks?.length > 0 || emplacement.stocks[0] === null) {
    emplacement = getRandomElement(emplacementListDB);
  }

  // Récupère un stock aleatoirement pour la transaction
  const stock = getRandomElement(emplacement.stocks);
  const articleId = stock.article_id;

  // Quantité dans l'intervalee [-20, 20] et dans la limite du stock disponnible
  let quantityMvt = getRandomInt( Math.max( -uniteDeStockList[articleId], -stock.quantity, -20 ), 20);

  // Si la quantité est 0 alors ce n'est pas une transaction, forcé la valeur à 1
  quantityMvt = quantityMvt !== 0 ? quantityMvt : 1

  // Mise à jour du stock dans le script pour ne pas généré d'erreur de requête
  uniteDeStockList[articleId] += quantityMvt;

  // Choix d'un type compatible aves le sens du mouvement
  let listType
  if (quantityMvt > 0) {
    listType = ["INV", "RCPT", "OFP"]
  } else {
    listType = ["INV", "VNT", "OFC"]
  }

  const typeMvt = listType[getRandomInt(0, listType.length - 1)]

  return {
    articleId,
    typeMvt,
    quantityMvt,
    emplacementId: emplacement.id,
    description: faker.lorem.sentence(),
    stockId: stock.id
  }
}

// Génère un entier entre les deux limites
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Récupère un element aléatoire d'une liste
function getRandomElement(data) {
  return data[Math.floor(Math.random() * data.length)];
}

const result = await pool.query("SELECT * FROM article_global_view");

console.table(result.rows);

process.exit();