const Favorite = require("../model/favorite.model.js");

module.exports = app => {
    const instruments = require("../controllers/instrument.controller.js");
    const favorites = require("../controllers/favorite.controller");
  

    // Retrieve favorites for user 
    app.get("/favorites/:userId", favorites.findAllByUserId);

    // create a new favorite 
    app.post("/favorite", favorites.create);

    // Delete a favorite 
    app.delete("/favorite", favorites.delete);

    // Create a new instrument
    app.post("/instrument", instruments.create);
  
    // Retrieve all instruments
    app.get("/instruments", instruments.findAll);
  
    // Retrieve a single instrument with instrumentId
    app.get("/instruments/:instrumentId", instruments.findOne);
  
    // Update a instrument with instrumentId
    app.put("/instruments/:instrumentId", instruments.update);
  
    // Delete a instrument with instrumentId
    app.delete("/instruments/:instrumentId", instruments.delete);
  
    // Delete all instruments
    app.delete("/instruments", instruments.deleteAll);
  };