const express = require("express");
const router = express.Router();
router.use(express.json());
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");


// Get  

router.get("/", (req, res) => {
    Projects.get()
      .then(allprojects => {
        return res.status(200).json(allprojects);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "There was a problem retreiving the data, sorry. "
        });
      });
  });
  
//GET/id

router.get("/:id", validateProjectId, (req, res) => {
    Projects.get(req.params.id)
      .then(project => {
        return res.status(200).json(project);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "Project Info not retrieved."
        });
      });
  });
  
  // POST ID
  
  
  router.post("/", (req, res) => {
    const { name, description } = req.body;
  
    if (!name) {
      return res.status(400).json({
        errorMessage: "Insert project name and try again."
      });
    }
    if (!description) {
      return res.status(400).json({
        errorMessage: "Insert project description and try again."
      });
    }
    Projects.insert(req.body)
      .then(project => {
        return res.status(201).json(project);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "Project addition error, try again."
        });
      });
  });
  //POST ID ACTION
  
  router.post("/:id/actions", (req, res) => {
    const projectInfo = { ...req.body, project_id: req.params.id };
    const { description, notes } = req.body;
  
    if (!description || !notes) {
      return res.status(404).json({
        errorMessage: "Insert description and try again."
      });
    }
  
    Projects.get(req.params.id)
      .then(project => {
        if (!project) {
          return res.status(404).json({
            errorMessage: "Project ID not found, try again."
          });
        } else {
          Actions.insert(projectInfo).then(action => {
            return res.status(201).json(action);
          });
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "Post addition error, try again."
        });
      });
  });
  
  //___PUT ID
  router.put("/:id", (req, res) => {
    const { name, description } = req.body;
    Projects.update(req.params.id, req.body)
      .then(updated => {
        if (!updated) {
          return res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
        if (!name) {
          return res.status(400).json({
            errorMessage: "Insert project name and try again."
          });
        }
        if (!description) {
          return res.status(400).json({
            errorMessage: "Insert project description and try again."
          });
        } else {
          res.status(200).json(updated);
        }
      })
      .catch(error => {
        console.log(error);
        return res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  });
  //DEL 
  router.delete("/:id", validateProjectId, (req, res) => {
    Projects.get(req.params.id)
      .then(project => {
        if (!project) {
          return res.status(404).json({
            errorMessage: "ID not found, try again."
          });
        }
        Projects.remove(req.params.id).then(deleted => {
          return res.status(200).json({
            deleted: `${deleted}`,
            url: `api/project/${req.params.id}`,
            operation: `DElETE for project with id ${req.params.id}`
          });
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "Project failed to delete."
        });
      });
  });
  
  function validateProjectId(req, res, next) {
    Projects.get(req.params.id).then(project => {
      if (!req.params.id) {
        res.status(404).json({ message: "invalid user id" });
      } else {
        req.project = project;
      }
    });
    next();
  }
  
  

module.exports = router;