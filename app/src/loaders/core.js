import api from "../services/api" 

export default class Core {
  static apiName;
  static resultName;
  static otherGetOneList = [];
  static otherGetManyList = [];

  static async one() {
    const getList = [[this.apiName, this.resultName], ...this.otherGetOneList]
    const results = await Promise.all(
      this.getList.map(([apiName, _]) =>
        new Promise((resolve) => resolve(api[apiName].getAll()))
      )
    );

    return results
      .map((result, index) => [this.getList[index][1], result])
      .reduce((previousValue, [key, value]) => {
        const newResult = previousValue;
        newResult[key] = value;
        return newResult;
      }, {});
  }

  static async many() {
    const getList = [[this.apiName, this.resultName], ...this.otherGetManyList]
    const results = await Promise.all(
      this.getList.map(([apiName, _]) =>
        new Promise((resolve) => resolve(api[apiName].getAll()))
      )
    );

    return results
      .map((result, index) => [this.getList[index][1], result])
      .reduce((previousValue, [key, value]) => {
        const newResult = previousValue;
        newResult[key] = value;
        return newResult;
      }, {});
  }
  
}