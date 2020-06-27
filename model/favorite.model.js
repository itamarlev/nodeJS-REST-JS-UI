const sql = require("./db.js");

// constructor
const Favorite = function(favorite) {
  this.userId = favorite.userId;
  this.instrumentId = favorite.instrumentId;
};

Favorite.create = (newFavorite, result) => {
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


Favorite.remove = (favoriteToRemove, result) => {
  sql.query("DELETE FROM favorites WHERE userId = ? and instrumentId = ? ", [favoriteToRemove.userId, favoriteToRemove.instrumentId], (err, res) => {
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

    console.log("deleted favorites with id: ", favoriteToRemove.instrumentId);
    result(null, res);
  });
};

module.exports = Favorite;