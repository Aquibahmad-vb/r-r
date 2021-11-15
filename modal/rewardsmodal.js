const mongoose = require("mongoose");

// creating rewards schema
const rewardsSchema = mongoose.Schema({

});

// creating rewards collection with rewardsSchema 
const rewardsModal = mongoose.model("rewards", rewardsSchema);

// exporting collections
module.exports = rewardsModal;