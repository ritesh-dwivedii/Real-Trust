const Client = require("../models/Client");

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
