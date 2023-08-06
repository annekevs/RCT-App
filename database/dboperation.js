// opération CRUD sur la base de données
class DBoperation {
  /**
   * construit l'objet pour les queries à la base de données
   * @param {*} dao Objet pour la connexion à la bd
   * @param {*string} tableName Nom de la table
   * @param {*string} tableCreate requete pour la creation de la table
   * @param {*} getModelFields champs de la table
   * @param {*} getlikeFields champs de la table pour des requetes de type like
   */
  constructor(dao, tableName, tableCreate, getModelFields, getlikeFields) {
    this.dao = dao;
    this.TABLE_NAME = tableName;
    this.TABLE_CREATE = tableCreate;
    this.getModelFields = getModelFields;
    this.getlikeFields = getlikeFields;
  }

  async run(query, data = []) {
    return await this.dao.run(query, data);
  }

  // async createTable() {
  //   console.log(`creating table ${this.TABLE_NAME} if not exists...`);
  //   const result = await this.dao.run(this.TABLE_CREATE).then((res, err) => {
  //     if (err) {
  //       console.log(err);
  //       return `error occured while creating table ${this.TABLE_NAME}...`;
  //     }
  //     // console.log(res);
  //     return res;
  //   });
  //   return result;
  // }

  /* CREATE METHOD */
  async save(dataObject) {
    var query = `INSERT INTO ${this.TABLE_NAME} `;
    var queryParam = [];

    // construct query
    var keys = Object.keys(dataObject);
    var lengthkeys = keys.length;
    if (lengthkeys > 0) {
      var columnNames = "";
      var columnValues = "";

      for (var i = 0; i < lengthkeys; i++) {
        if (i == 0) {
          columnNames += keys[i];
          columnValues += "?";
        } else {
          columnNames += ", " + keys[i];
          columnValues += ", ?";
        }
        queryParam.push(dataObject[keys[i]]);
      }
      query += "(" + columnNames + ") VALUE (" + columnValues + ")";
    }

    const result = await this.dao
      .run(query, queryParam)
      .then((r) => {
        //console.log("create result : ", r);
        return new Number(r.insertId);
      })
      .catch((err) => {
        //console.log("insert failed --", this.TABLE_NAME, err);
        throw err;
      });

    return result;
  }
  /* FIND ALL METHOD */
  async find(dataObject = [], order = null, limit = null) {
    var query = `SELECT * FROM ${this.TABLE_NAME}`;
    var queryParam = [];
    //console.log('dataObject', this.TABLE_NAME, dataObject)

    // construct query
    var keys = Object.keys(dataObject);
    var lengthkeys = keys.length;
    if (lengthkeys > 0) {
      query += " WHERE ";
      let likeFields = this.getlikeFields();
      let objectFields = this.getModelFields();
      //console.log("keys ", this.TABLE_NAME, objectFields, likeFields)
      for (var i = 0; i < lengthkeys; i++) {
        var index = Object.values(likeFields).indexOf(keys[i]);
        if (index != -1) {
          var indexKey = Object.keys(likeFields)[index];
          if (i == 0) query += objectFields[indexKey] + " LIKE ?";
          else query += " OR " + objectFields[indexKey] + " LIKE ?";

          queryParam.push("%" + dataObject[keys[i]] + "%");
        } else {
          if (i == 0) query += keys[i] + " = ?";
          else query += " AND " + keys[i] + " = ?";

          queryParam.push(dataObject[keys[i]]);
        }
      }
    }

    if (!(order === null || order.length == 0)) {
      query += " ORDER BY ";
      for (var i in order) {
        // console.log(i+": "+order[i], this.TABLE_NAME);
        if (i == 0) query += order[i];
        else query += ", " + order[i];
      }
    }

    if (!(limit === null || limit.trim() === "")) query += " LIMIT " + limit;
    console.log("query in find operation: ", query, queryParam);

    // execute query
    const result = await this.dao
      .run(query, queryParam)
      .then((r) => {
        // console.log("get all results  : ", r);
        return limit === "1" ? r[0] : r;
      })
      .catch((err) => {
        // console.log("get all failed --", this.TABLE_NAME, err);
        throw err;
      });

    return result;
  }
  /*UPDATE METHOD */
  async update(newObject = [], dataObject = []) {
    var query = `UPDATE ${this.TABLE_NAME} SET `;
    var queryParam = [];

    var _keys = Object.keys(newObject);
    var _lengthkeys = _keys.length;
    if (_lengthkeys > 0) {
      for (var i = 0; i < _lengthkeys; i++) {
        if (i == 0) query += _keys[i] + " = '" + newObject[_keys[i]] + "'";
        else query += ", " + _keys[i] + " = '" + newObject[_keys[i]] + "'";
      }
    }
    // construct query
    var keys = Object.keys(dataObject);
    var lengthkeys = keys.length;
    if (lengthkeys > 0) {
      query += " WHERE ";

      for (var i = 0; i < lengthkeys; i++) {
        if (i == 0) query += keys[i] + " = ?";
        else query += ", " + keys[i] + " = ?";
        queryParam.push(dataObject[keys[i]]);
      }
    }
    console.log("insert query: ", query);
    console.log("queryParam: ", queryParam);

    // execute query
    const result = await this.dao
      .run(query, queryParam)
      .then((r) => {
        return { insertId: new Number(r.insertId) };
      })
      .catch((err) => {
        // console.log(`update failed --`, this.TABLE_NAME, err);
        throw err;
      });

    return result;
  }
  /*DELETE METHOD */
  async delete(dataObject = []) {
    var query = `DELETE FROM ${this.TABLE_NAME}`;
    var queryParam = [];

    // construct query
    var keys = Object.keys(dataObject);
    var lengthkeys = keys.length;
    if (lengthkeys > 0) {
      query += " WHERE ";
      let likeFields = this.getlikeFields();
      let objectFields = this.getModelFields();
      //console.log("keys ", this.TABLE_NAME, objectFields, likeFields)
      for (var i = 0; i < lengthkeys; i++) {
        var index = Object.values(likeFields).indexOf(keys[i]);
        if (index != -1) {
          var indexKey = Object.keys(likeFields)[index];
          if (i == 0) query += objectFields[indexKey] + " LIKE ?";
          else query += " OR " + objectFields[indexKey] + " LIKE ?";

          queryParam.push("%" + dataObject[keys[i]] + "%");
        } else {
          if (i == 0) query += keys[i] + " = ?";
          else query += " AND " + keys[i] + " = ?";

          queryParam.push(dataObject[keys[i]]);
        }
      }
    }

    console.log("query : ", query, queryParam);

    // execute query
    const result = await this.dao
      .run(query, queryParam)
      .then((r) => {
        return { insertId: new Number(r.insertId) };
      })
      .catch((err) => {
        // console.log("delete failed --", this.TABLE_NAME, err);
        throw err;
      });

    return result;
  }
}

module.exports = DBoperation;
