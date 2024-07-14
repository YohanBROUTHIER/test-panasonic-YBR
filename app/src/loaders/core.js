import api from "../services/api";

export default class Core {
  static apiName;
  static resultName;
  static otherGetOneList = [];
  static otherGetManyList = [];
  static queryMapper;
  static defaultSort;

  static async one({params}) {
    const getList = [...this.otherGetOneList];

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

  static async many({request}) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    if (!params.get("page")) {
      params.set("page", 1);
    }
    if (this.defaultSort && !params.get("order")) {
      params.set("order",this.defaultSort);
    }
    const urlLimited = new URL(url.href.split("?")[0] + "?" + params.toString());
    const query = this.queryMapper.advancedParser(urlLimited);

    const getList = [[this.apiName, this.resultName, query], ...this.otherGetManyList];

    const results = await Promise.all(
      getList.map(([apiName, _, queryString]) =>
        new Promise((resolve) => resolve(api[apiName].getAll(queryString)))
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