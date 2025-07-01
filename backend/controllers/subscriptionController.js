const Subscription = require("../models/Subscription");

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    const savedSubscription = await subscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
