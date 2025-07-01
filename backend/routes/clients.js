const express = require("express");
const { getClients, createClient, deleteClient } = require("../controllers/clientController");
const Joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

const clientSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  designation: Joi.string().required(),
  image: Joi.string().optional(),
});

function validateClient(req, res, next) {
  const { error } = clientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

router.get("/", getClients);
router.post("/", auth, validateClient, createClient);
router.delete("/:id", auth, deleteClient);

module.exports = router;
