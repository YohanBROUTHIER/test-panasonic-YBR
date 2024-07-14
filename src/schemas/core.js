import ApiError from "../helpers/apiError.js";

export default class CoreSchema {
  static posInt(data, message="L'id n'est pas valide.", httpStatus=400) {
    if (!data || !String(data).match(/^[1-9]\d*$/)) {
      throw new ApiError(message, {httpStatus});
    }
  }
  
  static checkQueryForGet({where, orderBy, limit, offset}={}) {
    if (where) {
      this.checkQueryWhere(where);      
    }
    if (orderBy) {
      if (!Array.isArray(orderBy) || orderBy.length === 0) {
        throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
      }
      orderBy.forEach(condition => {
        if (!Array.isArray(condition) || condition.length !== 2) {
          throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
        }
        if (!String(condition[0]).match(/^[a-z][A-Za-z_]+$/)) {
          throw new ApiError(`Invalid order by property name`, { httpStatus: 400 });          
        }
        if (!condition[1].match(/^(asc|desc)$/)) {
          throw new ApiError(`Invalid order by condition`, { httpStatus: 400 });
        }
      });
    }
    if (limit) {
      this.posInt(limit, "limit n'est pas valide.");
    }
    if (offset) {
      this.posInt(offset, "limit n'est pas valide.");
    }


    return {where, orderBy, limit, offset};
  }
  static checkQueryWhere(where) {
    if (!where.separator.match(/^(or|and)$/)) {
      throw new ApiError(`Where's separator is not valid`, {httpStatus:400});
    }

    where.conditions.map((condition) => {
      if (condition.separator) {
        return this.checkQueryWhere(condition);
      }

      if (!condition.tableName.match(/^[a-z][a-z_]+$/)) {
        throw new ApiError(`Table's name is not valid`, {httpStatus:400});
      }
      if (!condition.propertyName.match(/^[a-z][A-Za-z_]+$/)) {
        throw new ApiError(`field name is not valid`, {httpStatus:400});
      }
      if (!condition.operator.match(/^(=|!=|<|>|<=|>=|is|like|ilike)$/)) {
        throw new ApiError(`operator is not valid`, {httpStatus:400});
      }
      if (!String(condition.value).match(/^.+$/)) {
        throw new ApiError(`value is not valid`, { httpStatus: 400 });
      }
    });
  }
}