const express = require("express");
const { getContacts, createContact } = require("../controllers/contactController");
const Joi = require("joi");
const auth = require("../middleware/auth");

const router = express.Router();

const contactSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  city: Joi.string().required(),
});

function validateContact(req, res, next) {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

router.get("/", auth, getContacts);
router.post("/", validateContact, createContact);

module.exports = router;
