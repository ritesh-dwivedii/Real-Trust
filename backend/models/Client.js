const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Client", ClientSchema);
