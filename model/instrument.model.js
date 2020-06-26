const sql = require("./db.js");

// constructor
const Instrument = function(instrument) {
  this.name = instrument.name;
  this.symbol = instrument.symbol;
  this.instrumentType = instrument.instrumentType;
};

Instrument.create = (newInstrument, result) => {
  sql.query("INSERT INTO instrument SET ?", newInstrument, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created instrument: ", { id: res.insertId, ...newInstrument });
    result(null, { id: res.insertId, ...newInstrument });
  });
};

Instrument.findById = (instrumentId, result) => {
  sql.query(`SELECT * FROM instrument WHERE instrumentId = ${instrumentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found instrument: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Instrument with the id
    result({ kind: "not_found" }, null);
  });
};

Instrument.getAll = result => {
  sql.query("SELECT * FROM instrument", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("instruments: ", res);
    result(null, res);
  });
};

Instrument.updateById = (id, Instrument, result) => {
  sql.query(
    "UPDATE instrument SET name = ?, symbol = ?, instrumentType = ? WHERE instrumentId = ?",
    [instrument.name, instrument.symbol, instrument.type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated instrument: ", { id: id, ...instrument });
      result(null, { id: id, ...instrument });
    }
  );
};

Instrument.remove = (id, result) => {
  sql.query("DELETE FROM instrument WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Instrument with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted instrument with id: ", id);
    result(null, res);
  });
};

Instrument.removeAll = result => {
  sql.query("DELETE FROM instrument", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} instrument`);
    result(null, res);
  });
};

module.exports = Instrument;