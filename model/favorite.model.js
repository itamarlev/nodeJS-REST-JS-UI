const sql = require("./db.js");

// constructor
const Favorite = function(favorite) {
  this.userId = favorite.userId;
  this.instrumentId = favorite.instrumentId;
};

Favorite.create = (newFavorite, result) => {
  console.log(newFavorite);
  sql.query("INSERT INTO favorites SET ?", newFavorite, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created favorite: ", { id: res.userId, ...newFavorite });
    result(null, { id: res.userId, ...newFavorite });
  });
};

Favorite.findById = (userId, result) => {
  sql.query(`SELECT * FROM favorites f join instrument i on f.instrumentId = i.instrumentId and f.userId = ${userId} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found favorite: ", res);
      result(null, res);
      return;
    }

    // not found Favorite with the id
    result({ kind: "not_found" }, null);
  });
};


Favorite.remove = (userId, instrumentId, result) => {
  sql.query("DELETE FROM favorites WHERE userId = ? and instrumentId = ? ", id,instrumentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Favorite with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted favorites with id: ", id);
    result(null, res);
  });
};

Favorite.removeAll = (userId, result) => {
  sql.query("DELETE FROM favorites where userId = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} favorite`);
    result(null, res);
  });
};

module.exports = Favorite;