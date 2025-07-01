const express = require("express");
const { getProjects, createProject, deleteProject } = require("../controllers/projectController");
const Joi = require("joi");

const router = express.Router();

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
});

function validateProject(req, res, next) {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

router.get("/", getProjects);
router.post("/", validateProject, createProject);
router.delete("/:id", deleteProject);

module.exports = router;
