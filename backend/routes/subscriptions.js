const express = require("express");
const { getSubscriptions, createSubscription } = require("../controllers/subscriptionController");
const Joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

const subscriptionSchema = Joi.object({
  email: Joi.string().email().required(),
});

function validateSubscription(req, res, next) {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

router.get("/", auth, getSubscriptions);
router.post("/", validateSubscription, createSubscription);

module.exports = router;
