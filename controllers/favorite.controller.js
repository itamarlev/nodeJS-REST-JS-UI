const Favorite = require("../model/favorite.model");

module.exports = {
  create: (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Favorite
    const favorite = new Favorite({
      userId: req.body.userId,
      instrumentId: req.body.instrumentId
    });

    // Save Favorite in the database
    Favorite.create(favorite, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Favorite."
        });
      else res.send(data);
    });
  },

  findAllByUserId: (req, res) => {
    Favorite.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Favorite for user id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Favorite  for user id " + req.params.favoriteId
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

    Favorite.updateById(
      req.params.favoriteId,
      new Favorite(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Favorite with id ${req.params.favoriteId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Favorite with id " + req.params.favoriteId
            });
          }
        } else res.send(data);
      }
    );
  },
  delete: (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create Favorite to delete
    const favorite = new Favorite({
      userId: req.body.userId,
      instrumentId: req.body.instrumentId
    });

    // Save Favorite in the database
    Favorite.remove(favorite,  (err, data) => {
      if (err){
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Instrument with id ${req.params.instrumentId} for user id  ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Instrument with id" + req.params.instrumentId + " for user id " + req.params.userId
          });
        }
      } else res.status(200).send({ message: `Instrument was deleted successfully!` });
    });
  }
}