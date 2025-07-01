const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String },
});

module.exports = mongoose.model("Contact", ContactSchema);
