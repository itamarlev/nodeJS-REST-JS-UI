const Instrument = require("../model/instrument.model");

module.exports = {
  create: (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Instrument
    const instrument = new Instrument({
      name: req.body.name,
      symbol: req.body.symbol,
      instrumentType: req.body.instrumentType
    });
  
    // Save Instrument in the database
    Instrument.create(instrument, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Instrument."
        });
      else res.send(data);
    });
  },

  findAll: (req, res) => {
    Instrument.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving instruments."
        });
      else res.send(data);
    });
  },

  findOne:  (req, res) => {
    Instrument.findById(req.params.instrumentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Instrument with id ${req.params.instrumentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Instrument with id " + req.params.instrumentId
          });
        }
      } else res.send(data);
    });
  },

  update: (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Instrument.updateById(
      req.params.instrumentId,
      new Instrument(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Instrument with id ${req.params.instrumentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Instrument with id " + req.params.instrumentId
            });
          }
        } else res.send(data);
      }
    );
  },

  delete: (req, res) => {
    Instrument.remove(req.params.instrumentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Instrument with id ${req.params.instrumentId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Instrument with id " + req.params.instrumentId
          });
        }
      } else res.send({ message: `Instrument was deleted successfully!` });
    });
  },

  deleteAll: (req, res) => {
    Instrument.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all instruments."
        });
      else res.send({ message: `All Instruments were deleted successfully!` });
    });
  }
}