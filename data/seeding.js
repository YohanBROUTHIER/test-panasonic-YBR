import { faker } from "@faker-js/faker";
import "../src/helpers/envLoad.js";

import datamappers from "../src/datamappers/index.js";

// Génère 5 articles
const articleList = faker.helpers.multiple(createRandomArticle, {
  count: 5
});

//Génère 20 articles
const emplacementList = faker.helpers.multiple(createRandomEmplacement, {
  count: 50
});

// Creation d'une promesse qui sera résolu si tout les articles sont crée
const createArticles = Promise.all(
  articleList.map(article =>
    new Promise(resolve => {
      resolve(datamappers.Article.create(article))
    })
  )
);

// Creation d'une promesse qui sera résolu si tout les emplacements sont crée
const createEmplacements = Promise.all(
  emplacementList.map(emplacement =>
    new Promise(resolve => {
      resolve(datamappers.Emplacement.create(emplacement))
    })
  )
);

// Parallèlise la créastion des articles et des emplacements
const [articleListDB, emplacementListDB] = await Promise.all([
  createArticles,
  createEmplacements
])

// Créer les stock
await Promise.all(
  emplacementListDB.map(emplacement =>
    new Promise(resolve => {
      const newStock = {
        "emplacement_id": emplacement.id,
        "article_id": getRandomElement(articleListDB).id,
        "quantity": 0,
        "statut_dispo": true
      };
      resolve(datamappers.Stock.create(newStock))
    })
  )
);

// Fonction qui génère un article aléatoire
function createRandomArticle() {
  return {
    description: faker.lorem.sentence(),
    unite_de_stock: 0
  };
}

// Fonction qui génère un Emplacement aléatoire
function createRandomEmplacement() {
  return {
    description: faker.lorem.sentence(),
    statut_dispo: true
  };
}

function getRandomElement(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function getMultipleRandomElement(data,min,max) {
  max = max ? max : min;
  const nbResult = Math.floor(Math.random() * (max-min + 1)) + min;
  let result = [];
  while (result.length !== nbResult) {
    const newElement = getRandomElement(data);
    if (!result.some(element => element.id === newElement.id)) {
      result.push(newElement);
    }
  } 
  return result;
}

process.exit();