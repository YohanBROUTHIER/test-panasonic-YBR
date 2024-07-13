import api from "../services/api";

export default class Core {
  static apiName;
  static resultName;
  static otherGetOneList = [];
  static otherGetManyList = [];

  static async one({params}) {
    const getList = this.otherGetOneList;

    if (params.id) {
      getList.push([this.apiName, this.resultName, params.id]);
    }
    const results = await Promise.all(
      getList.map(([apiName, _, id]) =>
        id ?
          new Promise((resolve) => resolve(api[apiName].get(id)))
          :
          new Promise((resolve) => resolve(api[apiName].getAll()))
      )
    );

    return results
      .map((result, index) => [getList[index][1], result])
      .reduce((previousValue, [key, value]) => {
        const newResult = previousValue;
        newResult[key] = value;
        return newResult;
      }, {});
  }

  static async many() {
    const getList = [[this.apiName, this.resultName], ...this.otherGetManyList];

    const results = await Promise.all(
      getList.map(([apiName, _]) =>
        new Promise((resolve) => resolve(api[apiName].getAll()))
      )
    );

    return results
      .map((result, index) => [getList[index][1], result])
      .reduce((previousValue, [key, value]) => {
        const newResult = previousValue;
        newResult[key] = value;
        return newResult;
      }, {});
  }
  
}